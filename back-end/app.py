import json
from flask import Flask
from flask.wrappers import Response
from flask.globals import request
import requests
from dotenv import load_dotenv
from werkzeug.exceptions import abort
from werkzeug.utils import redirect
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
import os, pathlib
import google
import jwt
from functools import wraps
from flask_cors import CORS
import traceback

from database import tables
from services import registrar_ou_obter_usuario,\
    criar_ou_atualizar_session,\
    refresh_data_session,\
    consultar_usuario,\
    validar_login,\
    salvar_foto_perfil,\
    salvar_usuario,\
    logout_session,\
    loggers,\
    resolve_error,\
    resolve_all_errors,\
    logger

# Configurações do Google e JWT
app = Flask(__name__)

load_dotenv()
CORS(app)

app.config['JSON_AS_ASCII'] = False
app.config['JSON_SORT_KEYS'] = False
app.config['Access-Control-Allow-Origin'] = '*'
app.config["Access-Control-Allow-Headers"]="Content-Type"
app.secret_key = os.getenv("SECRET_KEY")

os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
CLIENT_SECRETS_FILE = os.path.join(pathlib.Path(__file__).parent, "client-secret.json")
ALGORITHM = os.getenv("ALGORITHM")
BACKEND_URL=os.getenv("BACKEND_URL")
FRONTEND_URL=os.getenv("FRONTEND_URL")
MEGAS_ARQUIVO_PICTURE=int(os.getenv("MEGAS_ARQUIVO_PICTURE"))

flow = Flow.from_client_secrets_file(
    client_secrets_file=CLIENT_SECRETS_FILE,
    scopes=[
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
        "openid",
    ],
    redirect_uri=BACKEND_URL+"/api/callback",
)

# Código Wrapper
"""
def login_required(function):
    def wrapper(*args, **kwargs):
        encoded_jwt=request.headers.get("Authorization").split("Bearer ")[1]
        if encoded_jwt==None:
            return abort(401)
        else:
            return function()
    return wrapper
"""

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'Authorization' in request.headers:
            token = request.headers.get("Authorization")

        if not token or token == 'undefined' or token == 'null':
            return Response(
                response=json.dumps({"message":'Acesso não autorizado!', "exception":{'token': token}}),
                status=401,
                mimetype='application/json'
            )

        try:
            encoded_jwt = token.split("Bearer ")[1]
            decoded_jwt = jwt.decode(encoded_jwt, app.secret_key, algorithms=[ALGORITHM,])
            email = decoded_jwt['email']

            if (decoded_jwt and email):

                # Retorno dos dados decriptados
                return  f(email, decoded_jwt, *args, **kwargs)

            else:
                return Response(
                    response=json.dumps({"message":'Erro ao obter dados do token!', "exception":{'token': token}}),
                    status=401,
                    mimetype='application/json'
                )

        except Exception as error:
            logger('xPD7vK',str(error))

            if str(error) == 'Signature has expired':
                return Response(
                    response=json.dumps({"message":"Acesso não autorizado!", "exception":e.args}),
                    status=401,
                    mimetype='application/json'
                )
            else:
                return Response(
                    response=json.dumps({"message":"Falha ao decriptar JWT!", "exception":e.args}),
                    status=500,
                    mimetype='application/json'
                )

    return decorated

# Retornar JSON em UTF-8
def dumps(data,status):
    return Response(
        response=json.dumps(data, ensure_ascii=False).encode('utf8'),
        status=status,
        mimetype='application/json'
    )

# Código Apoio
def Generate_JWT(payload):
    encoded_jwt = jwt.encode(payload, app.secret_key, algorithm=ALGORITHM)
    return encoded_jwt

# Verifica se é Administrador
def isAdministrator(decoded_jwt):

    if (decoded_jwt['perfil'] == 'Administrador') and (decoded_jwt['status'] == 'Ativo'):
        return True

    return False

# Código Auth Google
@app.route("/api/callback")
def callback():
    try:
        # This need change to True in production XXX
        verify=False
        stepAuth="1: Try get token by Google"

        flow.fetch_token(authorization_response=request.url,verify=verify) #, expires_in=3600

        stepAuth="2: Try get credentials by Google"
        credentials = flow.credentials

        stepAuth="3: Try get session by Google"
        request_session = requests.session()

        stepAuth="4: Try request token by Google"
        token_request = google.auth.transport.requests.Request(session=request_session)

        stepAuth="5: Call oauth2 method by Google"
        id_info = id_token.verify_oauth2_token(
            id_token=credentials._id_token,
            request=token_request,
            audience=GOOGLE_CLIENT_ID,
            clock_skew_in_seconds=3600
        )

        # removing the specific audience, as it is throwing error
        del id_info['aud']
        del id_info['iat']

        #print(id_info)

        stepAuth="6: Get user in database"
        # Criar ou obter usuário do banco
        registro_valido, mensagem_usuario, dados = registrar_ou_obter_usuario(
            None,
            id_info['email'],
            id_info['name'],
            None,
            id_info['picture'],
            id_info['given_name'],
            id_info['family_name']
        )

        stepAuth="7: Verify record of user"
        if not registro_valido:
            print(mensagem_usuario)
            return redirect(f"{FRONTEND_URL}/error")

        stepAuth="8: Generate JWT with data"
        email = dados['email']
        jwt_token=Generate_JWT(dados)

        stepAuth="9: Create session in database"
        sessao_valida, mensagem_sessao = criar_ou_atualizar_session(email,jwt_token)

        if not sessao_valida:
            print(mensagem_sessao)
            return redirect(f"{FRONTEND_URL}/error")

        stepAuth="10: Return JWT to client"
        return redirect(f"{FRONTEND_URL}/login?jwt={jwt_token}")

    except Exception as e:
        mensagem_de_erro = "Step Auth: " + stepAuth + " >> " + str(e)
        logger('w7h7YZ',mensagem_de_erro)
        return redirect(f"{FRONTEND_URL}/error")


@app.route("/api/auth")
def login():
    authorization_url, state = flow.authorization_url()

    return Response(
        response=json.dumps({'auth_url':authorization_url}),
        status=200,
        mimetype='application/json'
    )


@app.route("/api/logout")
@token_required
def logout(email, decoded_jwt):

    valido, mensagem, session = logout_session(email)

    if valido == False:
        return dumps({"message":mensagem, "exception":session},500)

    return dumps(session,202)


@app.route("/api/session")
@token_required
def home_page_user(email, decoded_jwt):
    try:
        registro_valido, mensagem, dados = consultar_usuario(email)

        if registro_valido == False:
            return dumps({"message":mensagem, "exception":dados},500)

        logado, mensagem_sessao, dados = refresh_data_session(dados)

        if logado == False:
            return dumps({"message":mensagem_sessao, "exception":sessao},401)

        return dumps(dados,200)

    except Exception as e:
        logger('wbqe8a',str(e))
        return dumps({"message":"Falha ao obter a sessão do usuário!", "exception":e.args},500)


@app.route('/api/uploader/', methods = ['POST'])
@token_required
def upload_file(email, decoded_jwt):
   try:
       valido, mensagem, error = salvar_foto_perfil(request.files,email)

       if valido == False:
           return dumps({"message":mensagem, "exception":error},409)

       return dumps({'url': mensagem},200)

   except Exception as e:
       logger('Vey1RI',str(e))
       return dumps({"message":"Falha ao obter a sessão do usuário!", "exception":e.args},500)


@app.route("/api/validar-nome-usuario")
def check_user():
    try:
        login = request.args.get('login')
        email = request.args.get('email')

        valido, mensagem = validar_login(login,email)

        data = {
            'login': login,
            'email': email,
            'valido': valido,
        }

        if valido:
            return dumps(data,200)
        else:
            return dumps({"message":mensagem, "exception":data},409)

    except Exception as e:
        logger('WYpTMh',str(e))
        return dumps({"message":str(e), "exception":e.args},500)


@app.route('/api/salvar-usuario', methods=['POST'])
@token_required
def post_salvar_usuario(email, decoded_jwt):
    try:
        json = request.get_json()

        if email != json['email']:
            return dumps({"message":'Acesso não autorizado!', "exception":json},401)

        valido, mensagem, dados = salvar_usuario(json['login'],json['email'],json['nome_completo'],json['nome_social'])

        if valido:
            return dumps(json,200)
        else:
            return dumps({"message":mensagem, "exception":dados},400)

    except Exception as e:
        logger('GuaR0c',str(e))
        return dumps({"message":str(e), "exception":e.args},500)


@app.route("/api/lists")
def categorias():
    try:
        data = {
            'categorias': tables.select_categorias(),
            'modalidades': tables.select_modalidades(),
            'version': tables.app_version(),
            'tamanho_arquivo_picture': MEGAS_ARQUIVO_PICTURE,
        }
        return dumps(data,200)

    except Exception as e:
        logger('4q7d7u',str(e))
        return dumps({"message":str(e), "exception":e.args},500)


@app.route("/api/logger")
@token_required
def api_resolve_errors(email, decoded_jwt):
    try:
        if not isAdministrator(decoded_jwt):
            return dumps({"message":'Acesso não autorizado!', "exception":decoded_jwt},401)

        data = loggers()
        return dumps(data,200)

    except Exception as e:
        return dumps({"message":str(e), "exception":e.args},500)


@app.route("/api/logger", methods=['PUT'])
@token_required
def errors(email, decoded_jwt):
    try:
        if not isAdministrator(decoded_jwt):
            return dumps({"message":'Acesso não autorizado!', "exception":decoded_jwt},401)

        json = request.get_json()

        if not json['id']:
            return dumps({"message":'Código do erro não informado!', "exception":json},400)

        data = resolve_error(json['id'])

        return dumps(data,200)

    except Exception as e:
        return dumps({"message":str(e), "exception":e.args},500)


@app.route("/api/logger", methods=['DELETE'])
@token_required
def all_errors(email, decoded_jwt):
    try:
        if not isAdministrator(decoded_jwt):
            return dumps({"message":'Acesso não autorizado!', "exception":decoded_jwt},401)

        data = resolve_all_errors()

        return dumps(data,200)

    except Exception as e:
        return dumps({"message":str(e), "exception":e.args},500)


@app.route('/', methods=['GET'])
def hello_world():
    return "API OneRing Match!"

if __name__ == "__main__":
    app.run(debug=True, port=5000, host="0.0.0.0")


import re
from database import tables,\
    picture,\
    mongo

import ntpath
from werkzeug.utils import secure_filename

import os
from dotenv import load_dotenv

import traceback

load_dotenv()
SEGUNDOS_LOGIN = os.getenv("SEGUNDOS_LOGIN")
SEGUNDOS_REFRESH = os.getenv("SEGUNDOS_REFRESH")
SEGUNDOS_ESTA_LOGADO = os.getenv("SEGUNDOS_ESTA_LOGADO")
MEGAS_ARQUIVO_PICTURE = int(os.getenv("MEGAS_ARQUIVO_PICTURE"))

def __validar_login(login):
    if login and (len(login) > 3):
        if (True if re.match("^[a-z0-9_]+$", login) else False):
            if (True if re.match("^[a-z_]\w*$", login) else False):
                return True, 'Nome de usuário válido!'
            else:
                return False, 'Não pode iniciar com números!'
        else:
            return False, 'São permitidas letras minúsculas, números ou \'_\'!'
    else:
        return False, 'O nome de usuário deve ter mais de 3 caracteres!'


def __validar_nome_completo(nome):
    return nome and (len(nome) > 1)


def __validar_nome_social(nome):
    if nome == '':
        return True
    return (len(nome) > 1)


def __obter_login_valido(login,email):
    if login:
        return login
    else:
        new_login = email.split("@")[0]
        return re.sub(r"[^a-zA-Z0-9]+",'',new_login)

def validar_login(login,email):
    try:
        # Validar Login
        login_valido, login_valido_mensagem = __validar_login(login)

        if not login_valido:
            return False, login_valido_mensagem

        login_valido = tables.verificar_login(login,email)

        if login_valido == False:
            # Obter login ou sugestão de login
            sugestao = tables.obter_sugestao_login(login)

            return False, 'Nome de usuário já existe! Sugestão: ' + sugestao

        """
        login_mudou = tables.login_mudou(login,email)

        if login_mudou:
            if tables.login_existe(login):

                # Obter login ou sugestão de login
                sugestao = tables.obter_sugestao_login(login)

                return False, 'Nome de usuário já existe! Sugestão: ' + sugestao
        """

        return True, 'Nome de usuário válido!'

    except Exception as error:
        logger()
        mensagem_de_erro = str(error)
        print('>> ERROR: ' + mensagem_de_erro)
        return False, 'Ocorreu um erro ao validar o nome de usuário!', [mensagem_de_erro]


def excluir_picture(usuarios,inicio_path_computador):
    try:

        if len(usuarios) == 1:
            usuario = usuarios[0]
            if inicio_path_computador and usuario['picture']:
                url_picture = usuario['picture']
                arquivo_para_apagar = os.path.join(inicio_path_computador, url_picture)
                os.remove(arquivo_para_apagar)
            else:
                return False, '>> ERROR: Não foi possível excluir a imagem por não conter a picture no usuário'
        else:
            return False, '>> ERROR: Não foi possível excluir a imagem por haver vários usuários na busca'

        return True, 'Picture excluída com sucesso!'

    except Exception as error:
        logger()
        mensagem_de_erro = '>> ERROR: ' + str(error)
        return False, mensagem_de_erro


def salvar_foto_perfil(files,email):
    try:
        if (not files) and len(files) != 1:
            return False, 'Quantidade de arquivos inválida!', []

        if not files['file']:
            return False, 'Arquivo não encontrado no servidor!', []

        file = files['file']

        # Validar tipo do arquivo
        tipos_validos = ['image/png','image/jpeg']
        mimetype = file.content_type
        if mimetype not in tipos_validos:
            return False, "Tipo de arquivo inválido. Os tipos permitidos são JPG e PNG.", []

        url_arquivo , path_computador_e_arquivo , nome_arquivo , inicio_path_computador = picture.gerar_nome_arquivo()

        # Salvar imagem no disco
        file.save(path_computador_e_arquivo)

        tamanho_arquivo = os.path.getsize(path_computador_e_arquivo)
        if tamanho_arquivo > (MEGAS_ARQUIVO_PICTURE * 1024 * 1024):
            os.remove(path_computador_e_arquivo)
            return False, "Tamanho máximo do arquivo: {}MB".format(MEGAS_ARQUIVO_PICTURE), []

        # Obter path do antigo arquivo para apagar
        usuarios = tables.select_usuario(email)

        # Atualizar no banco
        tables.update_picture(email,url_arquivo)

        # Apagar arquivo antigo
        exluido, mensagem_excluido = excluir_picture(usuarios,inicio_path_computador)
        if not exluido:
            print('>> ERROR: ' + mensagem_excluido)

        return True, url_arquivo, []

    except Exception as error:
        logger()
        mensagem_de_erro = str(error)
        print('>> ERROR: ' + mensagem_de_erro)
        return False, 'Ocorreu um erro ao salvar o arquivo!', [mensagem_de_erro]


def registrar_ou_obter_usuario(login,email,nome_completo,nome_social,url_picture,given_name,family_name):
    try:

        # Verificar se precisa inserir ou atualizar
        usuario_existe = tables.usuario_existe(email)

        # Usuário precisa ser inserido
        if usuario_existe == False:

            # Caso login vazio, obter do email
            login = __obter_login_valido(login,email)

            # Validar Login
            login_valido, login_valido_mensagem = __validar_login(login)

            if not login_valido:
                return False, login_valido_mensagem, []

            # Preencher nome, se necessário
            if not __validar_nome_completo(nome_completo):
                if given_name and family_name:
                    nome_completo = given_name + ' ' + family_name
                elif given_name:
                    nome_completo = given_name
                elif family_name:
                    nome_completo = family_name
                else:
                    nome_completo = login_valido

            # Obter login ou sugestão de login
            login = tables.obter_sugestao_login(login)

            if given_name:
                nome_social = given_name
            else:
                nome_social = nome_completo

            # Salvando imagem localmente e obtendo URLs
            url, url_original, url_original_existe = picture.download(url_picture)

            usuario = tables.insert_usuario(
                login,
                email,
                nome_completo,
                nome_social,
                url,
                url_original,
                url_original_existe
            )

            if len(usuario) == 1:
                return True, 'Usuário criado com sucesso!', usuario[0]
            else:
                return False, 'Ocorreu um erro ao obter os dados do usuário!', usuario

        # Obter Usuário
        else:
            usuario = tables.select_usuario(email)

            if len(usuario) == 1:
                return True, 'Dados obtidos com sucesso!', usuario[0]
            else:
                return False, 'Ocorreu um erro ao obter os dados do usuário!', usuario

    except Exception as error:
        logger()
        mensagem_de_erro = str(error)
        print('>> ERROR: ' + mensagem_de_erro)
        return False, 'Ocorreu um erro ao registrar o usuário!', [mensagem_de_erro]


def criar_ou_atualizar_session(email,jwt_token):
    try:
        session_existe = tables.session_existe(email)

        # Session precisa ser inserida
        if session_existe == False:
            session = tables.insert_session(email,jwt_token)
        else:
            session = tables.update_session(email,jwt_token)

        if len(session) == 1:
            return True, 'Session criada com sucesso!'
        else:
            return False, 'Ocorreu um erro ao criar a sessão!'

    except Exception as error:
        logger()
        mensagem_de_erro = str(error)
        print('>> ERROR: ' + mensagem_de_erro)
        return False, 'Ocorreu um erro ao gerenciar a sessão!', [mensagem_de_erro]


def refresh_data_session(user):
    try:
        if user['logado'] == False:
            return False, 'Acesso não autorizado!', user

        if user['segundos_refresh'] >= int(SEGUNDOS_REFRESH):
            tables.logout_session(user['email'])
            return False, 'Sessão expirada!', user

        if user['segundos_login'] >= int(SEGUNDOS_LOGIN):
            tables.logout_session(user['email'])
            return False, 'Sessão de login expirada!', user

        sessao_array = tables.refresh_session(user['email'])

        if len(sessao_array) != 1:
            return False, 'Acesso não autorizado!', user

        session = sessao_array[0]

        user['esta_logado'] = (session['segundos_refresh'] < int(SEGUNDOS_ESTA_LOGADO))

        return True, 'Acesso autorizado!', user

    except Exception as error:
        logger()
        mensagem_de_erro = str(error)
        print('>> ERROR: ' + mensagem_de_erro)
        return False, 'Ocorreu um erro ao gerenciar a sessão!', [mensagem_de_erro]

# apagar, nao usado
def refresh_session(email):
    try:
        sessao_array = tables.select_session(email)

        if len(sessao_array) != 1:
            return False, 'Acesso não autorizado!', sessao_array

        session = sessao_array[0]

        if session['logado'] == False:
            return False, 'Acesso não autorizado!', session

        if session['segundos_refresh'] >= int(SEGUNDOS_REFRESH):
            tables.logout_session(email)
            return False, 'Sessão expirada!', session

        if session['segundos_login'] >= int(SEGUNDOS_LOGIN):
            tables.logout_session(email)
            return False, 'Sessão de login expirada!', session

        tables.refresh_session(email)

        return True, 'Acesso autorizado!', session

    except Exception as error:
        logger()
        mensagem_de_erro = str(error)
        print('>> ERROR: ' + mensagem_de_erro)
        return False, 'Ocorreu um erro ao gerenciar a sessão!', [mensagem_de_erro]


def logout_session(email):
    try:
        sessao_array = tables.logout_session(email)

        if len(sessao_array) != 1:
            return False, 'Acesso não autorizado!', sessao_array

        session = sessao_array[0]

        return True, 'Logout realizado com sucesso!', session

    except Exception as error:
        logger()
        mensagem_de_erro = str(error)
        print('>> ERROR: ' + mensagem_de_erro)
        return False, 'Ocorreu um erro ao fechar a sessão!', [mensagem_de_erro]


def consultar_usuario(email):
    try:
        usuario_array = tables.select_usuario(email)

        if len(usuario_array) != 1:
            return False, 'Ocorreu um erro ao buscar os dados do usuário!', usuario_array

        usuario = usuario_array[0]

        return True, 'Dados do usuário obtidos com sucesso!', usuario

    except Exception as error:
        logger()
        mensagem_de_erro = str(error)
        print('>> ERROR: ' + mensagem_de_erro)
        return False, 'Ocorreu um erro ao buscar os dados do usuário!', [mensagem_de_erro]


def salvar_usuario(login,email,nome_completo,nome_social):
    try:

        login_valido, login_mensagem = validar_login(login,email)

        if not login_valido:
            return False, login_mensagem, { 'campo': 'login' }

        if not __validar_nome_completo(nome_completo):
            return False, 'Nome Completo inválido! Deve ter no mínimo 2 caracteres.', { 'campo': 'nome_completo' }

        if not nome_social:
            nome_social = ''

        if not __validar_nome_social(nome_social):
            return False, 'Nome Social inválido! Se preenchido, deve ter no mínimo 2 caracteres.', { 'campo': 'nome_social' }

        tables.update_usuario(login,email,nome_completo,nome_social)

        return True, 'Dados alterados com sucesso!', {}

    except Exception as error:
        logger()
        mensagem_de_erro = str(error)
        print('>> ERROR: ' + mensagem_de_erro)
        return False, 'Ocorreu um erro ao salvar o usuário!', { 'erro' : mensagem_de_erro }


# Log de erros do sistema (no MongoDB)

def __loggers(db):
    valido, mensagem, erros = mongo.get_errors(db)

    for error in erros:
        timestamp = error['timestamp'].strftime('%Y-%m-%d %H:%M:%S.%f%z')
        error['timestamp'] = timestamp

    if valido == False:
        print('>> ERROR: ' + mensagem)

    return erros


def loggers():
    try:
        db=mongo.connection()
        return __loggers(db)
    except Exception as error:
        mensagem_de_erro = str(error)
        print('>> ERROR: ' + mensagem_de_erro)
        return []


def resolve_error(_id):
    try:
        db=mongo.connection()
        valido, mensagem = mongo.resolve_error(db,_id)

        if valido == False:
            print('>> ERROR: ' + mensagem)

        return __loggers(db)

    except Exception as error:
        mensagem_de_erro = str(error)
        print('>> ERROR: ' + mensagem_de_erro)
        return []


def resolve_all_errors():
    try:
        db=mongo.connection()
        valido, mensagem = mongo.resolve_all_errors(db)

        if valido == False:
            print('>> ERROR: ' + mensagem)

        return __loggers(db)

    except Exception as error:
        mensagem_de_erro = str(error)
        print('>> ERROR: ' + mensagem_de_erro)
        return []


def logger():
    try:
        db=mongo.connection()
        valido, mensagem = mongo.insert_error(db)

        if not valido:
            print('>> ERROR: ' + mensagem)

    except Exception as error:
        mensagem_de_erro = str(error)
        print('>> ERROR: ' + mensagem_de_erro)

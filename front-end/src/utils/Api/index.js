import { SEVERITY } from '../../utils/Snackbar';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const get = (path,success,error) => {
  Ajax(`${BACKEND_URL}/${path}`, 'GET', {}, success, error);
}

export const post = (path,json,success,error) => {
  Ajax(`${BACKEND_URL}/${path}`, 'POST', json, success, error);
}

export const put = (path,json,success,error) => {
  Ajax(`${BACKEND_URL}/${path}`, 'PUT', json, success, error);
}

export const del = (path,json,success,error) => {
  Ajax(`${BACKEND_URL}/${path}`, 'DELETE', json, success, error);
}

export const STATUSCODE = {
  HTTP_200_OK: 200,
  HTTP_201_CREATED: 201,
  HTTP_202_ACCEPTED: 202,
  HTTP_205_RESET_CONTENT: 205,

  HTTP_400_BAD_REQUEST: 400,
  HTTP_401_UNAUTHORIZED: 401,
  HTTP_402_PAYMENT_REQUIRED: 402,
  HTTP_404_NOT_FOUND: 404,
  HTTP_405_METHOD_NOT_ALLOWED: 405,
  HTTP_408_REQUEST_TIMEOUT: 408,
  HTTP_409_CONFLICT: 409,

  HTTP_500_INTERNAL_SERVER_ERROR: 500,
};

function getMessageByStatusCode(statusCode) {
  switch (statusCode) {
    case STATUSCODE.HTTP_200_OK: return {message: "Solicitação realizada com sucesso!", ok: true, severity: SEVERITY.INFO};
    case STATUSCODE.HTTP_201_CREATED: return {message: "Cadastro realizado com sucesso!", ok: true, severity: SEVERITY.SUCCESS};
    case STATUSCODE.HTTP_202_ACCEPTED: return {message: "Logout realizado com sucesso!", ok: true, severity: SEVERITY.INFO};
    case STATUSCODE.HTTP_205_RESET_CONTENT: return {message: "Logout realizado com sucesso!", ok: true, severity: SEVERITY.INFO};
    case STATUSCODE.HTTP_400_BAD_REQUEST: return {message: "Solicitação inválida!", ok: false, severity: SEVERITY.WARNING};
    case STATUSCODE.HTTP_401_UNAUTHORIZED: return {message: "Acesso não autorizado!", ok: false, severity: SEVERITY.WARNING};
    case STATUSCODE.HTTP_402_PAYMENT_REQUIRED: return {message: "Pagamento necessário para continuar!", ok: false, severity: SEVERITY.WARNING};
    case STATUSCODE.HTTP_404_NOT_FOUND: return {message: "Dados não encontrados!", ok: false, severity: SEVERITY.WARNING};
    case STATUSCODE.HTTP_405_METHOD_NOT_ALLOWED: return {message: "Método de acesso não permitido!", ok: false, severity: SEVERITY.WARNING};
    case STATUSCODE.HTTP_408_REQUEST_TIMEOUT: return {message: "Solicitação não atendida!", ok: false, severity: SEVERITY.WARNING};
    case STATUSCODE.HTTP_409_CONFLICT: return {message: "Conflito de dados no servidor!", ok: false, severity: SEVERITY.WARNING};
    case STATUSCODE.HTTP_500_INTERNAL_SERVER_ERROR: return {message: "Erro ao obter dados do servidor!", ok: false, severity: SEVERITY.ERROR};
    default: return {message: "Erro desconhecido no servidor!", ok: false, severity: SEVERITY.ERROR};
  }
}

export function Ajax(url, method, json, success, error) {
  try {

    let options = {
      method: method,
      headers: {
        "Access-Control-Allow-Origin": "* ",
        "Access-Control-Allow-Headers": "Content-Type",
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('JWT')}`
      }
    };

    if ( (method === 'POST') || (method === 'PUT') ) {
      options.body = JSON.stringify(json);
    }

    fetch(
      url,
      options
    )
    .then(response => {
      return {response: response, json: response.json()};
    })
    .then(retorno => {
      retorno.json.then((json) => {
        if (retorno.response.ok) {
          let status = getMessageByStatusCode(retorno.response.status);
          success(json,status.message,status.severity);
        } else {
          let status = getMessageByStatusCode(retorno.response.status);
          error(json,status.message,status.severity);
        }
      });
    })
    .catch(err => {
      let status = getMessageByStatusCode(STATUSCODE.HTTP_500_INTERNAL_SERVER_ERROR);
      error(err,status.message,status.severity);
    });
  } catch(err) {
    let status = getMessageByStatusCode(STATUSCODE.HTTP_500_INTERNAL_SERVER_ERROR);
    error(err,status.message,status.severity);
  }
}

export function uploadFile(path, file, success, error) {
  try {
    let url = `${BACKEND_URL}/${path}`;

    if (file == null) {
      let status = getMessageByStatusCode(STATUSCODE.HTTP_409_CONFLICT);
      error(file,'Arquivo carregado inválido!',status.severity);
    } else { // VALIDO

      var newFile = new File([file], file.name, {
        type: file.type,
      });

      let formData = new FormData();
      formData.append("file", newFile);
      fetch(url, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "* ",
          "Access-Control-Allow-Headers": "Content-Type",
          'Accept': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem('JWT')}`
        },
        body: formData
      }).then(response => {
        return {response: response, json: response.json()};
      })
      .then(retorno => {
        retorno.json.then((json) => {
          if (retorno.response.ok) {
            let status = getMessageByStatusCode(retorno.response.status);
            success(json,status.message,status.severity);
          } else {
            let status = getMessageByStatusCode(retorno.response.status);
            error(json,status.message,status.severity);
          }
        });
      })
      .catch(err => {
        let status = getMessageByStatusCode(STATUSCODE.HTTP_500_INTERNAL_SERVER_ERROR);
        error(err,status.message,status.severity);
      });

    } // VALIDO

  } catch(err) {
    let status = getMessageByStatusCode(STATUSCODE.HTTP_500_INTERNAL_SERVER_ERROR);
    error(err,status.message,status.severity);
  }
}

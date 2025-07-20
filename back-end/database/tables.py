from database import connection
from database import uuid

def app_version():    
    v = connection.version()
    e = connection.environment()
    if (e == 'DEV'):
        v = v + ' ' + e
    return { 'version': v }


def select_categorias():
    return connection.select("""
        select nome from categorias
        where status_uuid = %s
        order by ordem
        """,
        ('c1709625-a1ac-4740-b839-a5ea6be6e42b', ),
        ['nome']
    )


def select_modalidades():
    return connection.select("""
        select nome from modalidades
        where status_uuid = %s
        order by ordem
        """,
        ('c1709625-a1ac-4740-b839-a5ea6be6e42b', ),
        ['nome']
    )


def usuario_existe(email):
    linhas = connection.select("""
        SELECT EXISTS
            (select email from usuarios where email = %s)
        as usuario_existe
        """,
        (email, ),
        [
            'usuario_existe',
        ]
    )
    if linhas and len(linhas) == 1:
        return linhas[0]['usuario_existe'] == 1
    else:
        return False


def login_existe(login):
    linhas = connection.select("""
        SELECT EXISTS
            (select login from usuarios where login = %s)
        as login_existe
        """,
        (login, ),
        [
            'login_existe',
        ]
    )
    if linhas and len(linhas) == 1:
        return linhas[0]['login_existe'] == 1
    else:
        return False


def obter_sugestao_login(login):
    existe = True
    contador = 0
    login_sugerido = login

    while existe:
        existe = login_existe(login_sugerido)
        if existe:
            contador += 1
            login_sugerido = login + str(contador)

    return login_sugerido


def login_mudou(login,email):
    linhas = connection.select("""select login from usuarios where email = %s""",
        (email, ),
        [
            'login',
        ]
    )
    if linhas and len(linhas) == 1:
        return (login != linhas[0]['login'])
    else:
        raise Exception('Ocorreu um erro ao consultar o Nome do Usuário!')


def verificar_login(login,email):
    linhas = connection.select("""
    select
    	CASE
    		when (
    			select
    				(login != %s) as login_mudou
    				from usuarios where email = %s) = 1
    			then -- LOGIN MUDOU
    			(
    				CASE
    					when (
    						SELECT EXISTS
    						(select login from usuarios where login = %s)
    						as login_existe
    					) = 1 then 'LOGIN EXISTE'
    					else 'LOGIN NAO EXISTE'
    				END
    			)
    		else 'LOGIN NAO MUDOU'
    	END as resultado
    """,
        (login,email,login, ),
        [
            'resultado',
        ]
    )
    if linhas and len(linhas) == 1:

        if (linhas[0]['resultado'] == 'LOGIN NAO MUDOU'):
            return True

        if (linhas[0]['resultado'] == 'LOGIN NAO EXISTE'):
            return True

        return False

    else:
        raise Exception('Ocorreu um erro ao consultar o Nome do Usuário!')


def select_usuario(email):
    return connection.select("""
        select
        	login,
            usuarios.email,
            nome_completo,
            nome_social,
            CASE
        	  WHEN nome_social <> '' THEN nome_social
        	  WHEN nome_social = '' THEN SUBSTRING_INDEX(nome_completo, ' ', 1)
              WHEN nome_social is null THEN SUBSTRING_INDEX(nome_completo, ' ', 1)
        	ELSE
        	  login
        	END as nome_ajustado,
        	status.nome as status,
        	perfis.nome as perfil,
        	usuarios_pictures.url as picture,
        	usuarios_pictures.url_original_existe as url_original_existe,
        	usuarios_pictures.arquivo_carregado as arquivo_carregado,
            DATE_FORMAT(data_cadastro, '%Y-%m-%d %H:%i:%S') as data_cadastro,
            DATE_FORMAT(ultima_alteracao, '%Y-%m-%d %H:%i:%S') as ultima_alteracao,
            atualizado_pelo_usuario,
            vezes_acessado,
			(select count(id) from usuarios_curtidas where usuario_curtido_uuid = usuarios.uuid) as total_curtidas,
			(select count(id) from usuarios_seguidos where usuario_seguido_uuid = usuarios.uuid) as total_seguidores,
            COALESCE(logado,0),
        	DATE_FORMAT(data_login, '%Y-%m-%d %H:%i:%S') as data_login,
        	COALESCE((SELECT TIMESTAMPDIFF(SECOND,now(),data_login)),0) as segundos_login,
        	DATE_FORMAT(data_refresh, '%Y-%m-%d %H:%i:%S') as data_refresh,
        	COALESCE((SELECT TIMESTAMPDIFF(SECOND,now(),data_refresh)),0) as segundos_refresh,
            false as esta_logado
        from usuarios
        inner join status on status.uuid = usuarios.status_uuid
        inner join perfis on perfis.uuid = usuarios.perfil_uuid
        inner join usuarios_pictures on usuarios_pictures.usuario_uuid = usuarios.uuid
        left join usuarios_sessions on usuarios_sessions.email = usuarios.email
        where usuarios.email = %s
        """,
        (email, ),
        [
            'login',
            'email',
            'nome_completo',
            'nome_social',
            'nome_ajustado',
        	'status',
        	'perfil',
        	'picture',
        	'url_original_existe',
        	'arquivo_carregado',
        	'data_cadastro',
        	'ultima_alteracao',
            'atualizado_pelo_usuario',
        	'vezes_acessado',
            'total_curtidas',
            'total_seguidores',
            'logado',
            'data_login',
            'segundos_login',
            'data_refresh',
            'segundos_refresh',
            'esta_logado',
        ]
    )


def insert_usuario(login,email,nome_completo,nome_social,url,url_original,url_original_existe):
    try:
        conn = connection.connect()
        cursor = conn.cursor()

        new_uuid = str(uuid.new())

        sql = """
        insert into usuarios (
          uuid,
          login,
          email,
          nome_completo,
          nome_social,
          data_cadastro,
          ultima_alteracao,
          atualizado_pelo_usuario,
          vezes_acessado,
          perfil_uuid,
          status_uuid
        ) values (
          %s, -- uuid
          %s, -- login
          %s, -- email
          %s, -- nome_completo
          %s, -- nome_social
          now(), -- data_cadastro
          now(), -- ultima_alteracao
          False, -- atualizado_pelo_usuario
          0, -- vezes_acessado
          'be4b6f6a-061d-4631-adbe-df61b54951e3', -- perfil_uuid,
          'c1709625-a1ac-4740-b839-a5ea6be6e42b' -- status_uuid
        );
        """

        connection.dml_cursor(cursor, sql, (
            new_uuid,
            login,
            email,
            nome_completo,
            nome_social,
        ));

        new_uuid_picture = str(uuid.new())

        sql_pictures = """
            insert into usuarios_pictures (
                uuid,
                usuario_uuid,
                url,
                url_original,
                url_original_existe,
                arquivo_carregado
            ) values (
                %s, -- uuid
                %s, -- usuario_uuid
                %s, -- url
                %s, -- url_original
                %s, -- url_original_existe
                false -- arquivo_carregado
            )
        """

        connection.dml_cursor(cursor, sql_pictures, (
            new_uuid_picture,
            new_uuid,
            url,
            url_original,
            url_original_existe
        ));

        conn.commit()

        return select_usuario(email)

    except Exception as error:
        print(str(error))
        raise Exception(error)

    finally:
        if (conn):
            cursor.close()
            #conn.close()


def update_usuario(login,email,nome_completo,nome_social):
    try:
        conn = connection.connect()
        cursor = conn.cursor()

        sql = """
        update usuarios set
            login = %s,
            nome_completo = %s,
            nome_social = %s,
            ultima_alteracao = now(),
            atualizado_pelo_usuario = 1
        where email = %s
        """

        connection.dml_cursor(cursor, sql, (
            login,
            nome_completo,
            nome_social,
            email,
        ));

        conn.commit()

    except Exception as error:
        print(str(error))
        raise Exception(error)
    finally:
        if (conn):
            cursor.close()
            #conn.close()

def update_picture(email,picture):
    try:
        conn = connection.connect()
        cursor = conn.cursor()

        sql_picture = """
        update usuarios_pictures set
            url = %s,
            arquivo_carregado = %s
        where usuario_uuid = (select uuid from usuarios where email = %s)
        """

        connection.dml_cursor(cursor, sql_picture, (
            picture,
            True,
            email,
        ));

        sql = """
        update usuarios set
            ultima_alteracao = now()
        where email = %s
        """

        connection.dml_cursor(cursor, sql, (
            email,
        ));

        conn.commit()

    except Exception as error:
        print(str(error))
        raise Exception(error)
    finally:
        if (conn):
            cursor.close()
            #conn.close()

def select_session(email):
    return connection.select("""
        select
        	email,
        	jwt_token,
            logado,
        	DATE_FORMAT(data_login, '%Y-%m-%d %H:%i:%S') as data_login,
        	COALESCE((SELECT TIMESTAMPDIFF(SECOND,now(),data_login)),0) as segundos_login,
        	DATE_FORMAT(data_refresh, '%Y-%m-%d %H:%i:%S') as data_refresh,
        	COALESCE((SELECT TIMESTAMPDIFF(SECOND,now(),data_refresh)),0) as segundos_refresh
        from usuarios_sessions
        where email = %s
        """,
        (email, ),
        [
            'email',
            'jwt_token',
            'logado',
            'data_login',
            'segundos_login',
            'data_refresh',
        	'segundos_refresh',
        ]
    )


def insert_session(email,jwt_token):
    try:
        conn = connection.connect()
        cursor = conn.cursor()

        new_uuid = str(uuid.new())

        sql = """
        insert into usuarios_sessions (
            uuid,
            email,
            jwt_token,
            logado,
            data_login,
            data_refresh
        ) values (
          %s, -- uuid
          %s, -- email
          %s, -- jwt_token
          1, -- logado
          now(), -- data_login
          now() -- data_refresh
        );
        """

        connection.dml_cursor(cursor, sql, (
            new_uuid,
            email,
            jwt_token
        ));

        conn.commit()

        return select_session(email)

    except Exception as error:
        print(str(error))
        raise Exception(error)
    finally:
        if (conn):
            cursor.close()
            #conn.close()

def update_session(email,jwt_token):
    try:
        conn = connection.connect()
        cursor = conn.cursor()

        sql = """
        update usuarios_sessions set
            jwt_token = %s,
            logado = 1,
            data_login = now(),
            data_refresh = now()
        where email = %s
        """

        connection.dml_cursor(cursor, sql, (
            jwt_token,
            email
        ));

        conn.commit()

        return select_session(email)

    except Exception as error:
        print(str(error))
        raise Exception(error)
    finally:
        if (conn):
            cursor.close()
            #conn.close()

def refresh_session(email):
    try:
        conn = connection.connect()
        cursor = conn.cursor()

        sql = """
        update usuarios_sessions set
            data_refresh = now()
        where email = %s and logado = %s
        """

        connection.dml_cursor(cursor, sql, (
            email,
            1,
        ));

        conn.commit()

        return select_session(email)

    except Exception as error:
        print(str(error))
        raise Exception(error)
    finally:
        if (conn):
            cursor.close()
            #conn.close()

def logout_session(email):
    try:
        conn = connection.connect()
        cursor = conn.cursor()

        sql = """
        update usuarios_sessions set
            logado = %s
        where email = %s
        """

        connection.dml_cursor(cursor, sql, (
            False,
            email,
        ));

        conn.commit()

        return select_session(email)

    except Exception as error:
        print(str(error))
        raise Exception(error)
    finally:
        if (conn):
            cursor.close()
            #conn.close()

def session_existe(email):
    linhas = connection.select("""
        SELECT EXISTS
            (select email from usuarios_sessions where email = %s)
        as session_existe
        """,
        (email, ),
        [
            'session_existe',
        ]
    )
    if linhas and len(linhas) == 1:
        return linhas[0]['session_existe'] == 1
    else:
        return False

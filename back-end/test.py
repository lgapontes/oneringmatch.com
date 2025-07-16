from database import tables,\
    picture,\
    mongo
from services import registrar_ou_obter_usuario,\
    __obter_login_valido

#print(tables.insert_usuario('lgapontes4','lgapontes4@gmail.com','Luis Pontes','SirLockee','https://lh3.googleusercontent.com/a/ACg8ocJpzGDYvUbWDbGLBD4f8pwl4vhrrxmRCVggkPGSpShsOwT8UdQx=s96-c'))
#print(tables.select_categorias())
#print(tables.login_existe('lgapontes'))

#mongo.teste_inserir_log()
#mongo.teste_buscar_modelos()
#mongo.teste_atualizar_log()

#print(registrar_ou_obter_usuario('flechamagica','contato.flechamagica@gmail.com','Flecha Mágica','','https://lh3.googleusercontent.com/a/ACg8ocJpzGDYvUbWDbGLBD4f8pwl4vhrrxmRCVggkPGSpShsOwT8UdQx=s96-c','Flecha','Mágica'))

#print(__obter_login_valido('','lga ,´á[]{}"''-_pontes2@gmail.com'))

#print(tables.obter_sugestao_login('flecha'))

#print(tables.insert_session('contato.flechamagica@gmail.com','aaa'))

#print(tables.update_session('contato.flechamagica@gmail.com','bbb'))

#print(tables.refresh_session('contato.flechamagica@gmail.com'))

#print(tables.logout_session('contato.flechamagica@gmail.com'))

#print(tables.session_existe('contato.flechamagica@gmail.com'))

import pymongo
from pymongo.mongo_client import MongoClient
from pymongo import errors as mongoerrors
from database import uuid
import datetime
import hashlib
from json import dumps
from traceback import format_exc

from dotenv import load_dotenv
import os
load_dotenv()

DISABLE_MONGO = (os.getenv("MONGO_DISABLE") == 'True')
database = os.getenv("MONGO_DATABASE")
maxSevSelDelay = int(os.getenv("MONGO_DELAY"))

def connection():
    #uri = "mongodb+srv://flechamagica:jHpm0HPhXcu1grgq@lootbook.cm2kvwc.mongodb.net/?retryWrites=true&w=majority&appName=lootbook"
    uri = os.getenv("MONGO_URI")
    client = MongoClient(uri)
    return client[database]

"""
Exemplo modelo

{
    _id: "651d506c948e49d78ba09d5bd350b7a3"
    traceback: ""
    timestamp: 2024-08-02T15:18:59.019+00:00
    resolved: false
}

"""

def insert_error(db):
    if DISABLE_MONGO:
        return True, 'Log salvo com sucesso!'

    try:
        _id=str(uuid.__create_uuid().hex)
        traceback=format_exc()
        timestamp=datetime.datetime.now()
        resolved=False

        with pymongo.timeout(maxSevSelDelay):

            content=dict({
                'traceback': traceback,
                'timestamp': timestamp,
                'resolved': resolved,
            })
            content.update({ "_id":_id })

            result = db.errors.insert_one(content)

            if not result.inserted_id:
                return False, 'Não foi possível salvar o log de erro!'

            return True, 'Log salvo com sucesso!'

    except mongoerrors.PyMongoError as exc:
        if exc.timeout:
            print(f"block timed out: {exc!r}")
        else:
            print(f"failed with non-timeout error: {exc!r}")

        return False, 'Não foi possível salvar o log de erro!'


def get_errors(db):
    if DISABLE_MONGO:
        return True, 'Erros obtidos com sucesso!', []

    try:
        with pymongo.timeout(maxSevSelDelay):

            cursor=db.errors.find(
                {'resolved': False},
                {'_id': 1, 'traceback': 1, 'timestamp': 1, 'resolved': 1}
            ).sort('timestamp',pymongo.ASCENDING)

            errors = list(cursor)

            return True, "Erros obtidos com sucesso!", errors

    except mongoerrors.PyMongoError as exc:
        if exc.timeout:
            msg = (f"block timed out: {exc!r}")
        else:
            msg = (f"failed with non-timeout error: {exc!r}")
        return False, msg, []


def resolve_error(db,_id):
    if DISABLE_MONGO:
        return True, "Log atualizado com sucesso!"

    try:
        with pymongo.timeout(1):
            filter = { '_id': _id }
            newvalues = { "$set": { 'resolved': True } }
            updateResult = db.errors.update_one(filter, newvalues)

            if updateResult.modified_count != 1:
                return False, "Ocorreu um erro ao atualizar o log!"

            return True, "Log atualizado com sucesso!"

    except mongoerrors.PyMongoError as exc:
        if exc.timeout:
            msg = (f"block timed out: {exc!r}")
        else:
            msg = (f"failed with non-timeout error: {exc!r}")
        return False, msg


def resolve_all_errors(db):
    if DISABLE_MONGO:
        return True, "Logs apagados com sucesso!"

    try:
        with pymongo.timeout(1):
            # filter = { 'resolved': False }
            # newvalues = { "$set": { 'resolved': True } }
            # updateResult = db.errors.update_many(filter, newvalues)

            db.errors.delete_many({})

            return True, "Logs apagados com sucesso!"

    except mongoerrors.PyMongoError as exc:
        if exc.timeout:
            msg = (f"block timed out: {exc!r}")
        else:
            msg = (f"failed with non-timeout error: {exc!r}")
        return False, msg





"""
def teste_inserir_log():

    db=connection()
    print(db)

    try:
        a = 400/0
    except Exception as e:
        print(repr(e))
        print(insert_error(db))


def teste_atualizar_log():
    db=connection()
    print(resolve_error(db,'04db4d7ce3624830ba4a9d1f5f82ba42'))


def teste_buscar_logs():
    db=connection()
    valido, mensagem, erros = get_errors(db)
    print(erros)
"""

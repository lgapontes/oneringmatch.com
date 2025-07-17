import psycopg2
import json
from dotenv import load_dotenv
import os
#load_dotenv("..\.env")
load_dotenv()

import mysql.connector

class Database(object):
    connection = None

    def __init__(self):
        Database.connection = mysql.connector.connect(
            user=os.getenv("DATABASE_USER"),
            password=os.getenv("DATABASE_PASSWORD"),
            host=os.getenv("DATABASE_HOST"),
            port=int(os.getenv("DATABASE_PORT")),
            database=os.getenv("DATABASE_NAME")
        )

database = Database()

def version():
    return os.getenv("BACKEND_VERSION")

def environment():
    return os.getenv("ENVIRONMENT")

def connect():
    global database
    if database.connection is None or not database.connection.is_connected():
        database = Database()
    return database.connection

"""
def protect_sql_injection(value):
    if isinstance(value, str):
        new = value.replace("'", "")
        new = new.replace("--", "")
        new = new.replace('""', "")
        new = new.replace(';', "")
        return new
    else:
        return value
"""

def select(sql,columns,columns_return):
    try:
        connection = connect()
        cursor = connection.cursor()
        cursor.execute(sql,columns)
        results = []
        for row in cursor.fetchall():
            results.append(dict(zip(columns_return, row)))
        return results
    except Exception as error:
        print(str(error))
        raise Exception(error)

    finally:
        if (connection):
            cursor.close()
            # connection.close()


def select_cursor(cursor,sql,columns,columns_return):
    cursor.execute(sql,columns)
    results = []
    for row in cursor.fetchall():
        results.append(dict(zip(columns_return, row)))
    return results


def dml(sql,columns):
    try:
        connection = connect()
        cursor = connection.cursor()
        cursor.execute(sql,columns)
        connection.commit()

    except Exception as error:
        print(str(error))
        raise Exception(error)

    finally:
        if (connection):
            cursor.close()
            # connection.close()

def dml_cursor(cursor,sql,columns):
    cursor.execute(sql,columns)

import os
import requests
import ssl
import urllib
from dotenv import load_dotenv

from database import uuid

load_dotenv("..\.env")
PICTURE_FOLDER=os.getenv("PICTURE_FOLDER")
RELATIVE_PICTURE_FOLDER=os.getenv("RELATIVE_PICTURE_FOLDER")
DEFAULT_URL = 'img/user.jpg'

def __gerar_nome_arquivo():
    try:
        filename=uuid.filename() # Nome do arquivo
        path_filename=RELATIVE_PICTURE_FOLDER + filename # URL do Arquivo
        dest_folder=PICTURE_FOLDER + RELATIVE_PICTURE_FOLDER # PATH no computador
        file_path = os.path.join(dest_folder, filename) # Path no computador + nome do arquivo

        return True, filename, path_filename, dest_folder, file_path, PICTURE_FOLDER

    except Exception as e:
        print(str(e))
        return False, filename, path_filename, dest_folder, file_path

def gerar_nome_arquivo():
    valido, filename, path_filename, dest_folder, file_path, picture_folder = __gerar_nome_arquivo()
    # URL do Arquivo , Path no computador + nome do arquivo , nome do arquivo, Inicio do PATH do arquivo
    return path_filename, file_path, filename, picture_folder


def download(url):
    if not url:
        return DEFAULT_URL, '', False

    try:
        valido, filename, path_filename, dest_folder, file_path, picture_folder = __gerar_nome_arquivo()

        if not valido:
            return url, url, False

        file_path = os.path.join(dest_folder, filename)

        urllib.request.urlretrieve(url, file_path)

        return path_filename, url, True

    except Exception as e:
        print(str(e))
        return url, url, False

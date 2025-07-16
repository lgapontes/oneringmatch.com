import uuid

def __create_uuid():
    return uuid.uuid4()

def new():
    return __create_uuid()

def filename():
    return __create_uuid().hex

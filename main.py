
from fastapi import HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from passlib.context import CryptContext
from datetime import datetime, timedelta
from fastapi.responses import JSONResponse
from typing import Optional
import re

from fastapi import FastAPI
from pydantic import BaseModel
import jwt
from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from fastapi import APIRouter
from fastapi.responses import JSONResponse
import json
from fastapi import HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from passlib.context import CryptContext


SECERT_KEY = "YOUR_FAST_API_SECRET_KEY"
ALGORITHM ="HS256"
ACCESS_TOKEN_EXPIRES_MINUTES = 800

test_user = {
   "username": "temitope",
    "password": "temipassword",

}

app = FastAPI()

origins = {
    "http://localhost",
    "http://localhost:3000",
}

app.add_middleware(
   CORSMiddleware,
    allow_origins = origins,
    allow_credentials =True,
    allow_methods = ["*"],
    allow_headers= ["*"],
)


class LoginItem(BaseModel):
    username: str
    password: str
    usersurname: str
    nickname: str
    password_repeat: str
    email: str


class Login_Item(BaseModel):
    username: str
    password: str


@app.get("/")
def read_root():
    return {"Hello": "World"}

# @app.post("/l")
# async def user_login(loginitem:LoginItem):
#
#     data = jsonable_encoder(loginitem)


@app.post("/login")
async def user_login(login_item: Login_Item):

    data = jsonable_encoder(login_item)
    print(f'{data}ыыыыыыыыыыыыыыыы')

    # if data['username'] == test_user['username'] and data['password']== test_user['password']:

    encoded_jwt = 4
    return {"token": encoded_jwt}

    # else:
    #     return {"message": "login failed"}



@app.post("/register")
async def user_login(loginitem:LoginItem):


    data = jsonable_encoder(loginitem)
    print(f'{data}00000')
    encoded_jwt = 4
    return {"token": encoded_jwt}


# @app.post("/register", status_code=201)
# async def register():
#     """Handle user registration"""
#
#     print('added')
#     user_query = 'me'
#     # user_query = await Mongoify.find_one("users", {"email": auth_details.email})
#     # Check if the user is already in DB
#     if user_query is not None:
#         return JSONResponse(
#             status_code=400,
#             content={"message": f"Аккаунт с этой почтой уже создан.", "ok": False},
#         )
#
#     # Check if the password and repeated password same
#     if auth_details.password != auth_details.password_check:
#         return JSONResponse(
#             status_code=400,
#             content={"message": f"Пароли не совпадают.", "ok": False},
#         )
#
#     password_object = 89
#     # Check if password is valid
#     if not password_object.valid:
#         return JSONResponse(
#             status_code=400, content={"message": password_object.message}
#         )
#
#
#     return {"status": "created", "ok": True}
#

from fastapi import APIRouter
from fastapi.responses import JSONResponse
from app.utils.auth import AuthHandler
from app.models.user import LoginUser, RegisterUser
from app.utils.mongo import Mongoify
import json

app = FastAPI()
origins = ["http://localhost:8888"]

bd = []

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "test"}


@app.on_event("startup")
async def startup_event():
    pass



@router.post("/register", status_code=201)
async def register(auth_details: RegisterUser):
    """Handle user registration"""

    print('added')
    user_query = 'me'
    # user_query = await Mongoify.find_one("users", {"email": auth_details.email})
    # Check if the user is already in DB
    if user_query is not None:
        return JSONResponse(
            status_code=400,
            content={"message": f"Аккаунт с этой почтой уже создан.", "ok": False},
        )

    # Check if the password and repeated password same
    if auth_details.password != auth_details.password_check:
        return JSONResponse(
            status_code=400,
            content={"message": f"Пароли не совпадают.", "ok": False},
        )

    password_object = auth_handler.validate_password(auth_details.password)
    # Check if password is valid
    if not password_object.valid:
        return JSONResponse(
            status_code=400, content={"message": password_object.message}
        )

    # Create hashed password and add user in DB
    hashed_password = auth_handler.get_password_hash(auth_details.password)
    await Mongoify.insert(
        "users", {"email": auth_details.email,
                  "password": hashed_password,
                  "name": auth_details.name,
                  "surname": auth_details.surname,
                  "nickname": auth_details.nickname}
    )
    return {"status": "created", "ok": True}


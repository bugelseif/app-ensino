import uvicorn

from typing import List
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .sql_api import crud, models, schemas
from .sql_api.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# setar locais
origins = [
  "http://127.0.0.1:19006/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # verificar e substituir * por origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/") 
async def main_route():     
  return {
    "message": "World"
    }


@app.get("/teste") 
async def teste():     
  return {"message": "teste"}


# Conexão banco

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="email already registered")
    return crud.create_user(db=db, user=user)

@app.get("/users/", response_model=List[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    print(users)
    return users

@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


def start():
  uvicorn.run("api.main:app", host="0.0.0.0", port=80, reload=True)

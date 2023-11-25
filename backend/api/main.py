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


# rota cria um usuário
@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="email already registered")
    return crud.create_user(db=db, user=user)

# rota retorna todos os usuários
@app.get("/users/", response_model=List[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    print(users)
    return users

# rota retorna usuário por id
@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    print(f"USER>>>{db_user}")
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# rota verifica login
@app.post("/users/login", response_model=schemas.User)
def login_user(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user is None:
        print(f"None>>>")
        raise HTTPException(status_code=404, detail="User not found")
    if db_user.password != user.password:
        print(f"Password>>>{db_user.email}")
        raise HTTPException(status_code=404, detail="Password incorrect")
    return db_user

# rota atualiza pontos do usuário
@app.put("/users/{user_id}/point", response_model=schemas.User)
def update_user_point(user_id: int, user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    print(f"USER>>>{db_user}")
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.update_user_point(db=db, user_id=user_id, user=user)

# rota deleta usuário
@app.delete("/users/{user_id}", response_model=schemas.User)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    print(f"USER>>>{db_user.id_user}")
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.delete_user(db=db, user_id=user_id)

# rota cria categoria
@app.post("/category/", response_model=schemas.Category)
def create_category(category: schemas.CategoryCreate, db: Session = Depends(get_db)):
    db_category = crud.create_category(db=db, category=category)
    return db_category

# rota retorna todas as categorias
@app.get("/category/", response_model=List[schemas.Category])
def read_categorys(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    categories = crud.get_categorys(db, skip=skip, limit=limit)
    return categories

# rota retorna categoria por id
@app.get("/category/{category_id}", response_model=schemas.Category)
def read_category(category_id: int, db: Session = Depends(get_db)):
    db_category = crud.get_category(db, category_id=category_id)
    if db_category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return db_category

# rota atualiza categoria
@app.put("/category/{category_id}", response_model=schemas.Category)
def update_category(category_id: int, category: schemas.CategoryCreate, db: Session = Depends(get_db)):
    db_category = crud.get_category(db, category_id=category_id)
    if db_category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return crud.update_category(db=db, category_id=category_id, category=category)

# rota deleta categoria
@app.delete("/category/{category_id}", response_model=schemas.Category)
def delete_category(category_id: int, db: Session = Depends(get_db)):
    db_category = crud.get_category(db, category_id=category_id)
    if db_category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return crud.delete_category(db=db, category_id=category_id)

# rota cria relacionamento com id de usuário e categoria
@app.post("/user_category/", response_model=schemas.UserCategory)
def create_user_category(user_category: schemas.UserCategoryCreate, db: Session = Depends(get_db)):
    db_user_category = crud.create_user_category(db=db, user_category=user_category)
    return db_user_category

# rota retorna todos os relacionamentos
@app.get("/user_category/", response_model=List[schemas.UserCategory])
def read_user_categorys(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    user_categorys = crud.get_user_categorys(db, skip=skip, limit=limit)
    return user_categorys

# rota retorna relacionamento por id
@app.get("/user_category/{user_category_id}", response_model=schemas.UserCategory)
def read_user_category(user_category_id: int, db: Session = Depends(get_db)):
    db_user_category = crud.get_user_category(db, user_category_id=user_category_id)
    if db_user_category is None:
        raise HTTPException(status_code=404, detail="UserCategory not found")
    return db_user_category

# rota retorna relacionamento por id de usuário
@app.get("/user_category/user/{user_id}", response_model=List[schemas.UserCategory])
def read_user_category_by_user(user_id: int, db: Session = Depends(get_db)):
    db_user_category = crud.get_user_category_by_user(db, user_id=user_id)
    if db_user_category is None:
        raise HTTPException(status_code=404, detail="UserCategory not found")
    return db_user_category

# rota retorna relacionamento por id de categoria
@app.get("/user_category/category/{category_id}", response_model=List[schemas.UserCategory])
def read_user_category_by_category(category_id: int, db: Session = Depends(get_db)):
    db_user_category = crud.get_user_category_by_category(db, category_id=category_id)
    if db_user_category is None:
        raise HTTPException(status_code=404, detail="UserCategory not found")
    return db_user_category


def start():
  uvicorn.run("api.main:app", host="0.0.0.0", reload=False)
#   uvicorn.run("api.main:app", host="127.0.0.1", reload=False)

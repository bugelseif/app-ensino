from sqlalchemy.orm import Session

from . import models, schemas

# CRUD usuário
# criar usuário
def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
        name=user.name,
        email=user.email,
        point=0,
        password=user.password
        )
    print(db_user)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# retorna todos os usuários
def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

# retorna usuário por id
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id_user == user_id).first()

# retorna usuário por email
def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

# retorna pontos do usuário por id
def get_user_point(db: Session, user_id: int):
    return db.query(models.User.point).filter(models.User.id_user == user_id).first()

# atualiza pontos do usuário
def update_user_point(db: Session, user_id: int, user: schemas.UserCreate):
    db_user = db.query(models.User).filter(models.User.id_user == user_id).first()
    db_user.point = user.point
    db.commit()
    db.refresh(db_user)
    return db_user

# deleta usuário por id
def delete_user(db: Session, user_id: int):
    db_user = db.query(models.User).filter(models.User.id_user == user_id).first()
    db.delete(db_user)
    db.commit()
    return db_user

# CRUD categoria
# cria categoria
def create_category(db: Session, category: schemas.CategoryCreate):
    db_category = models.Category(
        name=category.name
        )
    print(db_category)
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

# retorna todas as categorias
def get_categorys(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Category).offset(skip).limit(limit).all()

# retorna categoria por id
def get_category(db: Session, category_id: int):
    return db.query(models.Category).filter(models.Category.id_category == category_id).first()

# atualiza categoria
def update_category(db: Session, category_id: int, category: schemas.CategoryCreate):
    db_category = db.query(models.Category).filter(models.Category.id_category == category_id).first()
    db_category.name = category.name
    db.commit()
    db.refresh(db_category)
    return db_category

# deleta categoria
def delete_category(db: Session, category_id: int):
    db_category = db.query(models.Category).filter(models.Category.id_category == category_id).first()
    db.delete(db_category)
    db.commit()
    return db_category

# CRUD relacionamento entre usuário e categoria
# cria relacionamento entre usuário e categoria
def create_user_category(db: Session, user_category: schemas.UserCategoryCreate):
    db_user_category = models.UserCategory(
        id_user=user_category.id_user,
        id_category=user_category.id_category
        )
    print(db_user_category)
    db.add(db_user_category)
    db.commit()
    db.refresh(db_user_category)
    return db_user_category

# retorna todos os relacionamentos entre usuário e categoria
def get_user_categorys(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.UserCategory).offset(skip).limit(limit).all()

# retorna relacionamento entre usuário e categoria por id
def get_user_category(db: Session, user_category_id: int):
    return db.query(models.UserCategory).filter(models.UserCategory.id_user_category == user_category_id).first()

# retorna relacionamento entre usuário e categoria por id de usuário
def get_user_category_by_user(db: Session, user_id: int):
    return db.query(models.UserCategory).filter(models.UserCategory.id_user == user_id).all()

# retorna relacionamento entre usuário e categoria por id de categoria
def get_user_category_by_category(db: Session, category_id: int):
    return db.query(models.UserCategory).filter(models.UserCategory.id_category == category_id).all()

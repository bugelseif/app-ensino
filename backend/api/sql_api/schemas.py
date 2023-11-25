from pydantic import BaseModel


# schemas de usuário
class UserBase(BaseModel):
    name: str
    email: str
    point: int

class UserCreate(UserBase):
    password: str


class User(UserBase):
    id_user: int

    class Config:
        orm_mode = True

# schema verifica login
class UserLogin(BaseModel):
    email: str
    password: str

    class Config:
        orm_mode = True

# schemas de categoria
class CategoryBase(BaseModel):
    name: str

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id_category: int

    class Config:
        orm_mode = True

# schema de categoria e usuário
class UserCategoryBase(BaseModel):
    id_user: int
    id_category: int

class UserCategoryCreate(UserCategoryBase):
    pass

class UserCategory(UserCategoryBase):
    id_user_category: int

    class Config:
        orm_mode = True

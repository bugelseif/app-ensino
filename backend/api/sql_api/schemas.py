from pydantic import BaseModel


class CategoryBase(BaseModel):
    name: str

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id_category: int

    class Config:
        orm_mode = True


class QuestionBase(BaseModel):
    id_category: int
    explanation: str
    description: str
    options: str
    answer: str

class QuestionCreate(QuestionBase):
    pass

class Question(QuestionBase):
    id_question: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    name: str
    email: str
    point: int

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id_user: int
    questions: str

    class Config:
        orm_mode = True

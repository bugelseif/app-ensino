from sqlalchemy import Boolean, Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .database import Base


   
class Category(Base):
    __tablename__ = "category"

    id_category = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    time_created = Column(DateTime(timezone=True), server_default=func.now())

    questions = relationship("Question", back_populates="categorys")


class Question(Base):
    __tablename__ = "question"

    id_question = Column(Integer, primary_key=True, index=True)
    id_category = Column(Integer, ForeignKey("category.id_category"))
    explanation = Column(String)
    description = Column(String)
    options = Column(String)
    answer = Column(String)
    time_created = Column(DateTime(timezone=True), server_default=func.now())

    categorys = relationship("Category", back_populates="questions")


class User(Base):
    __tablename__ = "user_app"

    id_user = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    password = Column(String)
    point = Column(Integer)
    questions = Column(String)
    time_created = Column(DateTime(timezone=True), server_default=func.now())

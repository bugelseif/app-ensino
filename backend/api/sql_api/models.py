from sqlalchemy import Boolean, Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .database import Base

# criar tabela de usuário
class User(Base):
    __tablename__ = "user_app"

    id_user = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    password = Column(String)
    point = Column(Integer)
    time_created = Column(DateTime(timezone=True), server_default=func.now())
    time_updated = Column(DateTime(timezone=True), onupdate=func.now())

    user_category = relationship("UserCategory", back_populates="user")


# criar tabela de categoria
class Category(Base):
    __tablename__ = "category"

    id_category = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    time_created = Column(DateTime(timezone=True), server_default=func.now())
    time_updated = Column(DateTime(timezone=True), onupdate=func.now())

    user_category = relationship("UserCategory", back_populates="category")

# criar tabela de relacionamento entre categoria e usuário
class UserCategory(Base):
    __tablename__ = "user_category"

    id_user_category = Column(Integer, primary_key=True, index=True)
    id_user = Column(Integer, ForeignKey("user_app.id_user"))
    id_category = Column(Integer, ForeignKey("category.id_category"))
    time_created = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="user_category")
    category = relationship("Category", back_populates="user_category")
    
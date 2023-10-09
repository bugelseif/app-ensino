from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

#from ..config import STRINGDB


SQLALCHEMY_DATABASE_URL = "postgresql://bugelseif:ZbOJnw6GlfNj08GU5jr79O5HXVKGTisi@dpg-cgm22g1mbg56g41ltop0-a.oregon-postgres.render.com/tcc_y5is"

engine = create_engine(
    # SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False} # SQLite
    SQLALCHEMY_DATABASE_URL
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


# https://fastapi.tiangolo.com/tutorial/sql-databases/
# Backend

## comandos
### create
- cd backend
- poetry init

### clone
- poetry install
  
### run
- poetry run start

### verificar dependencias
- python = "^3.11"
- fastapi = "^0.95.0"
- uvicorn = {extras = ["standard"], version = "^0.21.1"}
- sqlalchemy = "^2.0.8"
- pydantic = "^1.10.7"
- psycopg2-binary = "^2.9.6"
  > pode ser que precise refazer o poetry.lock
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import uvicorn

app = FastAPI()

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


def start():
  uvicorn.run("api.main:app", host="127.0.0.1", port=8000, reload=True)
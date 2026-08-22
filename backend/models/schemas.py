# backend/models/schemas.py
from pydantic import BaseModel, Field

class UsuarioSchema(BaseModel):
    login: str = Field(..., min_length=3, description="Login do usuário")
    senha: str = Field(..., min_length=4, description="Senha do usuário")

class UsuarioResposta(BaseModel):
    id: int
    login: str

    class Config:
        from_attributes = True
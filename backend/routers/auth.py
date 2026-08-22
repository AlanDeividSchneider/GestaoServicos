# backend/routers/auth.py
from fastapi import APIRouter, HTTPException, status, Depends
from models.schemas import UsuarioSchema, UsuarioResposta
from database.queries import criar_usuario, buscar_usuario_por_login
from security import gerar_hash_senha, verificar_senha, criar_token_acesso, obter_usuario_atual

router = APIRouter(prefix="/auth", tags=["Autenticação"])

@router.post("/cadastrar", response_model=UsuarioResposta, status_code=status.HTTP_201_CREATED)
def cadastrar_usuario(usuario: UsuarioSchema, usuario_logado: str = Depends(obter_usuario_atual)):   # Verifica se o login já existe no SQLite
    usuario_existente = buscar_usuario_por_login(usuario.login)
    if usuario_existente:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Este login já está cadastrado."
        )
    
    # Criptografa a senha antes de salvar no banco
    hash_senha = gerar_hash_senha(usuario.senha)
    usuario_id = criar_usuario(usuario.login, hash_senha)
    
    return {"id": usuario_id, "login": usuario.login}

@router.post("/login")
def login(usuario: UsuarioSchema):
    usuario_bd = buscar_usuario_por_login(usuario.login)
    
    # Valida login e senha de forma segura
    if not usuario_bd or not verificar_senha(usuario.senha, usuario_bd["senha_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Login ou senha incorretos."
        )
    token = criar_token_acesso({"sub": usuario_bd["login"]})
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "login": usuario_bd["login"]
    }
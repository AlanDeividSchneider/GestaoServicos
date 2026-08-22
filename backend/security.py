# backend/security.py
import os
from datetime import datetime, timedelta, timezone
import jwt
from dotenv import load_dotenv
from pwdlib import PasswordHash
from pwdlib.hashers.bcrypt import BcryptHasher
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

load_dotenv()  # Carrega o arquivo .env automaticamente

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 480))

# Configura o hasher com Bcrypt
password_hash = PasswordHash((BcryptHasher(),))

def gerar_hash_senha(senha_limpa: str) -> str:
    """Transforma a senha em texto puro em um hash seguro."""
    return password_hash.hash(senha_limpa)

def verificar_senha(senha_limpa: str, senha_hash: str) -> bool:
    """Compara a senha enviada pelo usuário com o hash salvo no banco."""
    return password_hash.verify(senha_limpa, senha_hash)

def criar_token_acesso(dados: dict) -> str:
    """Gera o token JWT com prazo de expiração."""
    para_codificar = dados.copy()
    expiracao = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    para_codificar.update({"exp": expiracao})
    return jwt.encode(para_codificar, SECRET_KEY, algorithm=ALGORITHM)

security_scheme = HTTPBearer()

def obter_usuario_atual(credenciais: HTTPAuthorizationCredentials = Depends(security_scheme)) -> str:
    """Extrai e valida o Token JWT enviado no Header da requisição."""
    token = credenciais.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        login: str = payload.get("sub")
        if login is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token inválido ou expirado."
            )
        return login
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido ou expirado."
        )
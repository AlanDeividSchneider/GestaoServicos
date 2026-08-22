from .connection import get_db

def criar_usuario(login: str, senha_hash: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO usuarios (login, senha_hash) VALUES (?, ?)",
        (login, senha_hash)
    )
    conn.commit()
    novo_id = cursor.lastrowid
    conn.close()
    return novo_id

def buscar_usuario_por_login(login: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM usuarios WHERE login = ?", (login,))
    usuario = cursor.fetchone()
    conn.close()
    return dict(usuario) if usuario else None
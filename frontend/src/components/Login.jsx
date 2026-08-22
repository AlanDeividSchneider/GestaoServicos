// frontend/src/components/Login.jsx
import { useState } from 'react';
import api from '../services/api';

export function Login({ onLoginSuccess }) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const response = await api.post('/auth/login', { login, senha });
      
      // Salva o Token e o Login do usuário no navegador
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('usuario', response.data.login);

      if (onLoginSuccess) {
        onLoginSuccess(response.data.login);
      }
    } catch (err) {
      if (err.response && err.response.data.detail) {
        setErro(err.response.data.detail);
      } else {
        setErro('Erro ao conectar com o servidor.');
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.titulo}>Acesso ao Sistema</h2>
        
        {erro && <div style={styles.alertaErro}>{erro}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.campo}>
            <label style={styles.label}>Login</label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
              style={styles.input}
              placeholder="Digite seu usuário"
            />
          </div>

          <div style={styles.campo}>
            <label style={styles.label}>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              style={styles.input}
              placeholder="Digite sua senha"
            />
          </div>

          <button type="submit" disabled={carregando} style={styles.botao}>
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f6f8',
    fontFamily: 'sans-serif'
  },
  card: {
    width: '100%',
    maxWidth: '380px',
    padding: '30px',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  titulo: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  campo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  label: {
    fontSize: '14px',
    color: '#555'
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '14px'
  },
  botao: {
    padding: '12px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px'
  },
  alertaErro: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '15px',
    textAlign: 'center',
    fontSize: '14px'
  }
};
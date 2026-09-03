import { useState } from 'react';
import api from '../services/api';
import styles from './Login.module.css';

export function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const MIN_USER_LENGTH = 3;
  const MIN_PASS_LENGTH = 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (username.length < MIN_USER_LENGTH) {
      setError(`O usuário deve ter pelo menos ${MIN_USER_LENGTH} caracteres.`);
      return;
    }

    if (password.length < MIN_PASS_LENGTH) {
      setError(`A senha deve ter pelo menos ${MIN_PASS_LENGTH} caracteres.`);
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/login', {
        login: username,
        senha: password,
      });

      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('usuario', username);

      if (onLoginSuccess) {
        onLoginSuccess(username);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.detail) {
        const detail = err.response.data.detail;
        setError(typeof detail === 'string' ? detail : 'Dados inválidos.');
      } else {
        setError('Usuário ou senha incorretos.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Servify</h1>
          <p className={styles.subtitle}>Gestão de Serviços Prestados</p>
        </div>

        {error && (
          <div className={styles.errorBox}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Usuário</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu usuário"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className={styles.input}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={styles.button}
          >
            {loading ? 'Entrando...' : 'Entrar no Sistema'}
          </button>
        </form>
      </div>
    </div>
  );
}
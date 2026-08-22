// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import { Login } from './components/Login';

function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Verifica se já existe um usuário logado no localStorage ao carregar a página
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
      setUsuario(usuarioSalvo);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
  };

  if (!usuario) {
    return <Login onLoginSuccess={(nomeUsuario) => setUsuario(nomeUsuario)} />;
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Bem-vindo, {usuario}!</h1>
      <p>Você está autenticado e com acesso total ao sistema.</p>
      
      <button 
        onClick={handleLogout}
        style={{
          padding: '10px 15px',
          backgroundColor: '#dc3545',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Sair
      </button>
    </div>
  );
}

export default App;
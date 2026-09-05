import { useState, useEffect } from 'react';
import { Login } from './pages/Login';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Clientes } from './pages/Clientes';
import { TiposServico } from './pages/TiposServico';
import { HorasAdicionais } from './pages/HorasAdicionais';

export function App() {
  const [usuario, setUsuario] = useState(null);
  const [telaAtual, setTelaAtual] = useState('home');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const usuarioSalvo = localStorage.getItem('usuario');
    if (token && usuarioSalvo) {
      setUsuario(usuarioSalvo);
    }
  }, []);

  const handleLoginSuccess = (nomeUsuario) => {
    setUsuario(nomeUsuario);
    setTelaAtual('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
  };

  if (!usuario) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
      <Header 
        usuario={usuario} 
        onLogout={handleLogout} 
        telaAtual={telaAtual} 
        setTelaAtual={setTelaAtual} 
      />

      {telaAtual === 'home' && <Home setTelaAtual={setTelaAtual} />}
      {telaAtual === 'clientes' && <Clientes setTelaAtual={setTelaAtual} />}
      {telaAtual === 'tipos-servico' && <TiposServico setTelaAtual={setTelaAtual} />}
      {telaAtual === 'horas-adicionais' && <HorasAdicionais setTelaAtual={setTelaAtual} />}
      {telaAtual === 'servicos-prestados' && <div style={{ padding: '2rem' }}><h2>Tela em construção...</h2></div>}
      {telaAtual === 'dashboards' && <div style={{ padding: '2rem' }}><h2>Tela de Dashboards em construção...</h2></div>}
    </div>
  );
}

export default App;
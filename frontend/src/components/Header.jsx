import styles from './Header.module.css';

export function Header({ usuario, onLogout, telaAtual, setTelaAtual }) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.logoText}>Servify</span>
      </div>

      <nav className={styles.nav}>
        <button 
          className={`${styles.navLink} ${telaAtual === 'home' ? styles.active : ''}`}
          onClick={() => setTelaAtual('home')}
        >
          Início
        </button>
        <button 
          className={`${styles.navLink} ${telaAtual === 'cadastros' ? styles.active : ''}`}
          onClick={() => setTelaAtual('cadastros')}
        >
          Cadastros
        </button>
        <button 
          className={`${styles.navLink} ${telaAtual === 'dashboards' ? styles.active : ''}`}
          onClick={() => setTelaAtual('dashboards')}
        >
          Dashboards
        </button>
      </nav>

      <div className={styles.userInfo}>
        <span className={styles.userName}>Olá, <strong>{usuario}</strong></span>
        <button className={styles.logoutBtn} onClick={onLogout}>
          Sair
        </button>
      </div>
    </header>
  );
}
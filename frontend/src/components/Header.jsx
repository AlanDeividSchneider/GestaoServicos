import { useState } from 'react';
import styles from './Header.module.css';

export function Header({ usuario, onLogout, telaAtual, setTelaAtual }) {
  const [dropdownAberto, setDropdownAberto] = useState(false);

  const toggleDropdown = () => {
    setDropdownAberto((prev) => !prev);
  };

  const handleNavegacao = (novaTela) => {
    setTelaAtual(novaTela);
    setDropdownAberto(false);
  };

  const telasDeCadastro = ['clientes', 'tipos-servico', 'horas-adicionais', 'servicos-prestados'];
  const isCadastroAtivo = telasDeCadastro.includes(telaAtual);

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.logoText}>Servify</span>
      </div>

      <nav className={styles.nav}>
        <button
          className={`${styles.navLink} ${telaAtual === 'home' ? styles.active : ''}`}
          onClick={() => handleNavegacao('home')}
        >
          Início
        </button>

        {/* Menu Dropdown de Cadastros */}
        <div className={styles.dropdownContainer}>
          <button
            className={`${styles.navLink} ${styles.dropdownTrigger} ${isCadastroAtivo ? styles.active : ''}`}
            onClick={toggleDropdown}
          >
            Cadastros
            <span className={`${styles.arrow} ${dropdownAberto ? styles.arrowOpen : ''}`}>▼</span>
          </button>

          {dropdownAberto && (
            <div className={styles.dropdownMenu}>
              <button
                className={`${styles.dropdownItem} ${telaAtual === 'clientes' ? styles.dropdownItemActive : ''}`}
                onClick={() => handleNavegacao('clientes')}
              >
                Clientes
              </button>
              <button
                className={`${styles.dropdownItem} ${telaAtual === 'tipos-servico' ? styles.dropdownItemActive : ''}`}
                onClick={() => handleNavegacao('tipos-servico')}
              >
                Tipos de Serviço
              </button>
              <button
                className={`${styles.dropdownItem} ${telaAtual === 'horas-adicionais' ? styles.dropdownItemActive : ''}`}
                onClick={() => handleNavegacao('horas-adicionais')}
              >
                Horas Adicionais
              </button>
              <button
                className={`${styles.dropdownItem} ${telaAtual === 'servicos-prestados' ? styles.dropdownItemActive : ''}`}
                onClick={() => handleNavegacao('servicos-prestados')}
              >
                Serviços Prestados
              </button>
            </div>
          )}
        </div>

        <button
          className={`${styles.navLink} ${telaAtual === 'dashboards' ? styles.active : ''}`}
          onClick={() => handleNavegacao('dashboards')}
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
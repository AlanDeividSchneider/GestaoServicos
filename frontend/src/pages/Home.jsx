import styles from './Home.module.css';

export function Home({ setTelaAtual }) {
  return (
    <main className={styles.mainContainer}>
      <div className={styles.welcomeCard}>
        <h1 className={styles.title}>Painel de Controle</h1>
        <p className={styles.subtitle}>Bem-vindo ao Servify. Selecione uma opção para começar a gerenciar seus serviços.</p>

        <div className={styles.gridCards}>
          <div className={styles.actionCard} onClick={() => setTelaAtual('servicos')}>
            <h3 className={styles.cardTitle}>📋 Gestão de Serviços</h3>
            <p className={styles.cardDesc}>Cadastre novos lançamentos, liste históricos e atualize registros prestados.</p>
          </div>

          <div className={styles.actionCard} onClick={() => setTelaAtual('dashboards')}>
            <h3 className={styles.cardTitle}>📊 Dashboards & Métricas</h3>
            <p className={styles.cardDesc}>Visualize indicadores em gráficos detalhados sobre o volume e faturamento.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
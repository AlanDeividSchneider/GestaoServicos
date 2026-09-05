// frontend/src/pages/HorasAdicionais.jsx
import { useState } from 'react';
import styles from './HorasAdicionais.module.css';

export function HorasAdicionais() {
  // Lista temporária de simulação para apresentação
  const [horasAdicionais, setHorasAdicionais] = useState([
    { id: 1, nome: 'Hora Extra Noturna (50%)', valor: 90.00, status: 'Ativo' },
    { id: 2, nome: 'Hora Extra Fim de Semana (100%)', valor: 120.00, status: 'Ativo' },
    { id: 3, nome: 'Adicional de Deslocamento', valor: 60.00, status: 'Inativo' },
  ]);

  // Estados do Formulário e Edição
  const [idEmEdicao, setIdEmEdicao] = useState(null);
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [status, setStatus] = useState('Ativo');

  // Estados da Pesquisa
  const [termoBusca, setTermoBusca] = useState('');
  const [termoAplicado, setTermoAplicado] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome || !valor) return;

    if (idEmEdicao) {
      // Atualizar registro existente
      setHorasAdicionais(horasAdicionais.map((hora) =>
        hora.id === idEmEdicao
          ? { ...hora, nome, valor: parseFloat(valor), status }
          : hora
      ));
    } else {
      // Cadastrar nova hora adicional
      const novaHora = {
        id: Date.now(),
        nome,
        valor: parseFloat(valor),
        status,
      };
      setHorasAdicionais([novaHora, ...horasAdicionais]);
    }

    limparFormulario();
  };

  const handleEditar = (hora) => {
    setIdEmEdicao(hora.id);
    setNome(hora.nome);
    setValor(hora.valor.toString());
    setStatus(hora.status);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const limparFormulario = () => {
    setIdEmEdicao(null);
    setNome('');
    setValor('');
    setStatus('Ativo');
  };

  const formatarMoeda = (valorNumerico) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valorNumerico);
  };

  // Ações de Pesquisa
  const handlePesquisar = (e) => {
    e.preventDefault();
    setTermoAplicado(termoBusca.trim().toLowerCase());
  };

  const handleLimparPesquisa = () => {
    setTermoBusca('');
    setTermoAplicado('');
  };

  // Filtragem dos dados pelas colunas: Nome, Valor da Hora e Status
  const horasFiltradas = horasAdicionais.filter((hora) => {
    if (!termoAplicado) return true;

    const nomeMatch = hora.nome.toLowerCase().includes(termoAplicado);
    const statusMatch = hora.status.toLowerCase().includes(termoAplicado);
    
    const valorStr = hora.valor.toString();
    const valorFormatado = formatarMoeda(hora.valor).toLowerCase();
    const valorMatch = valorStr.includes(termoAplicado) || valorFormatado.includes(termoAplicado);

    return nomeMatch || statusMatch || valorMatch;
  });

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <div>
          <h1 className={styles.title}>Horas Adicionais</h1>
          <p className={styles.subtitle}>Gerencie os tipos e valores de horas excedentes praticados nos atendimentos</p>
        </div>
      </div>

      {/* Formulário de Cadastro / Edição */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>
            {idEmEdicao ? '✏️ Editando Hora Adicional' : 'Nova Hora Adicional'}
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Nome / Descrição *</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Ex: Hora Noturna / Feriado"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Valor (R$) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                className={styles.input}
                placeholder="0,00"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Status</label>
              <select
                className={styles.select}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
            </div>
          </div>

          <div className={styles.buttonRow}>
            <button type="button" className={styles.btnSecondary} onClick={limparFormulario}>
              {idEmEdicao ? 'Cancelar Edição' : 'Limpar'}
            </button>
            <button type="submit" className={styles.btnPrimary}>
              {idEmEdicao ? 'Atualizar Hora Adicional' : 'Salvar Hora Adicional'}
            </button>
          </div>
        </form>
      </div>

      {/* Tabela de Listagem com Pesquisa */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Horas Cadastradas ({horasFiltradas.length})</h2>
          
          <form className={styles.searchBox} onSubmit={handlePesquisar}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Buscar"
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
            />
            <button type="submit" className={styles.btnSearch}>
              Pesquisar
            </button>
            {termoAplicado && (
              <button type="button" className={styles.btnClearSearch} onClick={handleLimparPesquisa}>
                Limpar Busca
              </button>
            )}
          </form>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Valor da Hora</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {horasFiltradas.length > 0 ? (
                horasFiltradas.map((hora) => (
                  <tr key={hora.id}>
                    <td><strong>{hora.nome}</strong></td>
                    <td>{formatarMoeda(hora.valor)}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${hora.status === 'Ativo' ? styles.statusAtivo : styles.statusInativo}`}>
                        {hora.status}
                      </span>
                    </td>
                    <td className={styles.actionsCell}>
                      <button 
                        className={styles.btnIcon} 
                        title="Editar"
                        onClick={() => handleEditar(hora)}
                      >
                        ✏️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className={styles.emptyState}>
                    Nenhum registro encontrado para "{termoAplicado}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
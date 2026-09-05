// frontend/src/pages/TiposServico.jsx
import { useState } from 'react';
import styles from './TiposServico.module.css';

export function TiposServico() {
  const [tiposServico, setTiposServico] = useState([
    { id: 1, nome: 'Manutenção Preventiva', descricao: 'Revisão periódica de infraestrutura e sistemas.', valorPadrao: '150.00', status: 'Ativo' },
    { id: 2, nome: 'Suporte Técnico Presencial', descricao: 'Atendimento e solução de problemas no local do cliente.', valorPadrao: '200.00', status: 'Ativo' },
    { id: 3, nome: 'Consultoria TI', descricao: 'Análise e otimização de processos de tecnologia.', valorPadrao: '350.00', status: 'Inativo' },
  ]);

  // Estados do Formulário e Edição
  const [idEmEdicao, setIdEmEdicao] = useState(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valorPadrao, setValorPadrao] = useState('');
  const [status, setStatus] = useState('Ativo');

  // Estados de Pesquisa
  const [termoBusca, setTermoBusca] = useState('');
  const [termoAplicado, setTermoAplicado] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome) return;

    if (idEmEdicao) {
      // Atualizar existente
      setTiposServico(tiposServico.map(item =>
        item.id === idEmEdicao
          ? { ...item, nome, descricao, valorPadrao, status }
          : item
      ));
    } else {
      // Cadastrar novo
      const novoTipo = {
        id: Date.now(),
        nome,
        descricao,
        valorPadrao,
        status,
      };
      setTiposServico([novoTipo, ...tiposServico]);
    }

    limparFormulario();
  };

  const handleEditar = (item) => {
    setIdEmEdicao(item.id);
    setNome(item.nome);
    setDescricao(item.descricao || '');
    setValorPadrao(item.valorPadrao || '');
    setStatus(item.status);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const limparFormulario = () => {
    setIdEmEdicao(null);
    setNome('');
    setDescricao('');
    setValorPadrao('');
    setStatus('Ativo');
  };

  const handlePesquisar = (e) => {
    e.preventDefault();
    setTermoAplicado(termoBusca.trim().toLowerCase());
  };

  const tiposFiltrados = tiposServico.filter((item) => {
    if (!termoAplicado) return true;

    return (
      item.nome.toLowerCase().includes(termoAplicado) ||
      item.descricao.toLowerCase().includes(termoAplicado) ||
      item.valorPadrao.toString().includes(termoAplicado) ||
      item.status.toLowerCase().includes(termoAplicado)
    );
  });

  const formatarMoeda = (valor) => {
    if (!valor) return 'R$ 0,00';
    const numero = parseFloat(valor);
    return isNaN(numero) ? 'R$ 0,00' : numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <div>
          <h1 className={styles.title}>Tipos de Serviço</h1>
          <p className={styles.subtitle}>Gerencie o catálogo de serviços prestados pelo Servify</p>
        </div>
      </div>

      {/* Card do Formulário */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>
            {idEmEdicao ? '✏️ Editando Tipo de Serviço' : 'Novo Tipo de Serviço'}
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Nome do Serviço *</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Ex: Suporte Remoto"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Valor Padrão (R$)</label>
              <input
                type="number"
                step="0.01"
                className={styles.input}
                placeholder="0,00"
                value={valorPadrao}
                onChange={(e) => setValorPadrao(e.target.value)}
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

            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Descrição</label>
              <textarea
                className={styles.textarea}
                placeholder="Detalhes ou escopo geral do serviço..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.buttonRow}>
            <button type="button" className={styles.btnSecondary} onClick={limparFormulario}>
              {idEmEdicao ? 'Cancelar Edição' : 'Limpar'}
            </button>
            <button type="submit" className={styles.btnPrimary}>
              {idEmEdicao ? 'Atualizar Serviço' : 'Salvar Serviço'}
            </button>
          </div>
        </form>
      </div>

      {/* Card da Tabela e Barra de Busca */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Serviços Cadastrados ({tiposFiltrados.length})</h2>

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
          </form>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Valor Padrão</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {tiposFiltrados.length > 0 ? (
                tiposFiltrados.map((item) => (
                  <tr key={item.id}>
                    <td><strong>{item.nome}</strong></td>
                    <td>{item.descricao || '-'}</td>
                    <td>{formatarMoeda(item.valorPadrao)}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${item.status === 'Ativo' ? styles.statusAtivo : styles.statusInativo}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className={styles.actionsCell}>
                      <button
                        className={styles.btnIcon}
                        title="Editar"
                        onClick={() => handleEditar(item)}
                      >
                        ✏️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className={styles.emptyState}>
                    Nenhum tipo de serviço encontrado.
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
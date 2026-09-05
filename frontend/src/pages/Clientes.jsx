// frontend/src/pages/Clientes.jsx
import { useState } from 'react';
import styles from './Clientes.module.css';

export function Clientes() {
  const [clientes, setClientes] = useState([
    { id: 1, nome: 'Empresa Alfa Ltda', doc: '12.345.678/0001-90', email: 'contato@alfa.com', telefone: '(49) 99999-1111', cidade: 'Chapecó', status: 'Ativo' },
    { id: 2, nome: 'Tech Beta S.A.', doc: '98.765.432/0001-10', email: 'suporte@beta.com', telefone: '(49) 98888-2222', cidade: 'Chapecó', status: 'Ativo' },
  ]);

  // Estados do Formulário e Controle de Edição
  const [idEmEdicao, setIdEmEdicao] = useState(null);
  const [nome, setNome] = useState('');
  const [doc, setDoc] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cidade, setCidade] = useState('Chapecó');
  const [status, setStatus] = useState('Ativo');

  // Estados de Pesquisa
  const [termoBusca, setTermoBusca] = useState('');
  const [termoAplicado, setTermoAplicado] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome) return;

    if (idEmEdicao) {
      // Atualizar cliente existente
      setClientes(clientes.map(cliente => 
        cliente.id === idEmEdicao 
          ? { ...cliente, nome, doc, email, telefone, cidade, status }
          : cliente
      ));
    } else {
      // Cadastrar novo cliente
      const novoCliente = {
        id: Date.now(),
        nome,
        doc,
        email,
        telefone,
        cidade,
        status,
      };
      setClientes([novoCliente, ...clientes]);
    }

    limparFormulario();
  };

  const handleEditar = (cliente) => {
    setIdEmEdicao(cliente.id);
    setNome(cliente.nome);
    setDoc(cliente.doc || '');
    setEmail(cliente.email || '');
    setTelefone(cliente.telefone || '');
    setCidade(cliente.cidade || 'Chapecó');
    setStatus(cliente.status);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const limparFormulario = () => {
    setIdEmEdicao(null);
    setNome('');
    setDoc('');
    setEmail('');
    setTelefone('');
    setCidade('Chapecó');
    setStatus('Ativo');
  };

  const handlePesquisar = (e) => {
    e.preventDefault();
    setTermoAplicado(termoBusca.trim().toLowerCase());
  };

  const handleLimparPesquisa = () => {
    setTermoBusca('');
    setTermoAplicado('');
  };

  const clientesFiltrados = clientes.filter((cliente) => {
    if (!termoAplicado) return true;

    return (
      cliente.nome.toLowerCase().includes(termoAplicado) ||
      cliente.doc.toLowerCase().includes(termoAplicado) ||
      cliente.email.toLowerCase().includes(termoAplicado) ||
      cliente.telefone.toLowerCase().includes(termoAplicado) ||
      cliente.cidade.toLowerCase().includes(termoAplicado) ||
      cliente.status.toLowerCase().includes(termoAplicado)
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <div>
          <h1 className={styles.title}>Cadastro de Clientes</h1>
          <p className={styles.subtitle}>Gerencie os clientes atendidos pelo Servify</p>
        </div>
      </div>

      {/* Card do Formulário */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>
            {idEmEdicao ? '✏️ Editando Cliente' : 'Novo Cliente'}
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Razão Social / Nome *</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Ex: Empresa X"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>CPF / CNPJ</label>
              <input
                type="text"
                className={styles.input}
                placeholder="00.000.000/0000-00"
                value={doc}
                onChange={(e) => setDoc(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>E-mail</label>
              <input
                type="email"
                className={styles.input}
                placeholder="contato@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Telefone / WhatsApp</label>
              <input
                type="text"
                className={styles.input}
                placeholder="(00) 00000-0000"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Cidade</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Ex: Chapecó"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
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
              {idEmEdicao ? 'Atualizar Cliente' : 'Salvar Cliente'}
            </button>
          </div>
        </form>
      </div>

      {/* Card da Tabela e Barra de Busca */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Clientes Cadastrados ({clientesFiltrados.length})</h2>
          
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
                <th>CPF/CNPJ</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Cidade</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientesFiltrados.length > 0 ? (
                clientesFiltrados.map((cliente) => (
                  <tr key={cliente.id}>
                    <td><strong>{cliente.nome}</strong></td>
                    <td>{cliente.doc || '-'}</td>
                    <td>{cliente.email || '-'}</td>
                    <td>{cliente.telefone || '-'}</td>
                    <td>{cliente.cidade || '-'}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${cliente.status === 'Ativo' ? styles.statusAtivo : styles.statusInativo}`}>
                        {cliente.status}
                      </span>
                    </td>
                    <td className={styles.actionsCell}>
                      <button 
                        className={styles.btnIcon} 
                        title="Editar"
                        onClick={() => handleEditar(cliente)}
                      >
                        ✏️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className={styles.emptyState}>
                    Nenhum cliente encontrado para "{termoAplicado}".
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
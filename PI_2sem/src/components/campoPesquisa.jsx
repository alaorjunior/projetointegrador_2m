import { useState } from "react";

const CampoPesquisa = ({ type }) => {
  const [orgao, setOrgao] = useState("");
  const [ano, setAno] = useState("");
  const [loading, setLoading] = useState(false);
  const [dados, setDados] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint =
        type === "despesas"
          ? `https://gateway.apilib.prefeitura.sp.gov.br/sf/sof/v4/despesas`
          : `https://gateway.apilib.prefeitura.sp.gov.br/sf/sof/v4/empenhos`;

      const url = `${endpoint}?orgao=${orgao}&ano=${ano}`;
      const resposta = await fetch(url);
      const json = await resposta.json();
      setDados(json || []);
    } catch (erro) {
      console.error("Erro ao buscar dados:", erro);
      setDados([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card pesquisa-section">
      <h2 className="titulo-secao">
        {type === "despesas"
          ? "Consulta de Despesas Públicas"
          : "Consulta de Empenhos"}
      </h2>

      <p className="descricao-secao">
        {type === "despesas"
          ? "Veja como os recursos públicos são aplicados de forma transparente."
          : "Acompanhe os compromissos e valores empenhados pelo governo municipal."}
      </p>

      <form onSubmit={handleSubmit} className="filtro-form" aria-label="Formulário de pesquisa">
        <div className="campo-form">
          <label htmlFor={`orgao-${type}`} className="label-form">Órgão:</label>
          <input
            type="text"
            id={`orgao-${type}`}
            name="orgao"
            value={orgao}
            onChange={(e) => setOrgao(e.target.value)}
            placeholder="Digite o nome do órgão"
            aria-label="Campo para inserir o nome do órgão"
          />
        </div>

        <div className="campo-form">
          <label htmlFor={`ano-${type}`} className="label-form">Ano:</label>
          <select
            id={`ano-${type}`}
            name="ano"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            aria-label="Selecione o ano"
          >
            <option value="">Selecione o ano</option>
            {[2025, 2024, 2023, 2022, 2021].map((ano) => (
              <option key={ano} value={ano}>
                {ano}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Consultando..." : "Consultar"}
        </button>
      </form>

      <div className="resultados">
        {loading && <p>Carregando resultados...</p>}
        {!loading && dados.length === 0 && (
          <p className="small">Nenhum dado encontrado.</p>
        )}
        {!loading && dados.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Órgão</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Ano</th>
              </tr>
            </thead>
            <tbody>
              {dados.map((item, index) => (
                <tr key={index}>
                  <td>{item.orgao || "-"}</td>
                  <td>{item.descricao || "-"}</td>
                  <td>{item.valor || "-"}</td>
                  <td>{item.ano || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default CampoPesquisa;

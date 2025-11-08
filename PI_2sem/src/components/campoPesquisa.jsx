import { useState } from "react";
import "../styles/style.css";

const CampoPesquisa = () => {
  const [ano, setAno] = useState("");
  const [orgao, setOrgao] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSearch = () => {
    if (!ano && !orgao) {
      setMensagem("Por favor, preencha ao menos um campo para buscar.");
    } else {
      setMensagem(`Buscando despesas do órgão "${orgao}" no ano ${ano || "todos"}.`);
    }
  };

  const handleClear = () => {
    setAno("");
    setOrgao("");
    setMensagem("");
  };

  return (
    <section className="campoPesquisa">
      <input
        type="text"
        placeholder="Buscar órgão (ex: Saúde)"
        value={orgao}
        onChange={(e) => setOrgao(e.target.value)}
      />

      <select value={ano} onChange={(e) => setAno(e.target.value)}>
        <option value="">Ano (todos)</option>
        <option value="2025">2025</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
      </select>

      <button className="btnSearch" onClick={handleSearch}>
        Buscar
      </button>
      <button className="btnClear secondary" onClick={handleClear}>
        Limpar
      </button>

      {mensagem && <p className="small" style={{ marginLeft: "10px" }}>{mensagem}</p>}
    </section>
  );
};

export default CampoPesquisa;

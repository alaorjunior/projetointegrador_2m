import CampoPesquisa from "../components/campoPesquisa";

const ConsultaEmpenhos = () => {
  return (
    <section className="page-wrap">
      <h2 className="page-title">Consulta de Empenhos</h2>
      <p className="page-subtitle">
        Pesquise os empenhos registrados e acompanhe a destinação dos recursos públicos.
      </p>

      <div className="filters-area">
        <CampoPesquisa type="empenhos" />

        <div className="filter-buttons">
          <button className="btn-primary">Consultar Empenhos</button>
          <button className="btn-secondary">Limpar Filtros</button>
        </div>
      </div>
    </section>
  );
};

export default ConsultaEmpenhos;

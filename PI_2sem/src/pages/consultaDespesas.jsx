import CampoPesquisa from "../components/campoPesquisa";

const ConsultaDespesas = () => {
  return (
    <section className="page-wrap">
      <h2 className="page-title">Consulta de Despesas Públicas</h2>
      <p className="page-subtitle">
        Utilize os filtros abaixo para consultar os gastos públicos de forma transparente.
      </p>

      <div className="filters-area">
        <CampoPesquisa type="despesas" />

        <div className="filter-buttons">
          <button className="btn-primary">Consultar Despesas</button>
          <button className="btn-secondary">Limpar Filtros</button>
        </div>
      </div>
    </section>
  );
};

export default ConsultaDespesas;

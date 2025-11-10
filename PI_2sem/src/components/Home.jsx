import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="home-section" role="region" aria-label="Página inicial">
      <div className="home-content">
        <h2>Consulta de Despesas Públicas</h2>
        <p>
          Veja como os recursos públicos são aplicados de forma transparente e acessível.
        </p>
      </div>

      <div className="home-buttons">
        <Link to="/consulta-despesas" className="btn-acesso">
          Consultar Despesas
        </Link>
        <Link to="/consulta-empenhos" className="btn-acesso">
          Consultar Empenhos
        </Link>
      </div>
    </section>
  );
};

export default Home;

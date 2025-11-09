import React from "react";
import "../styles/style.css";

const Home = () => {
  return (
    <>
      <section aria-labelledby="home-title">
        <h2 id="home-title">Consulta de Despesas Públicas</h2>
      </section>

      <section aria-labelledby="sec-o-que-sao">
        <div className="section1">
          <h3 id="sec-o-que-sao">Você sabe o que são Despesas Públicas?</h3>
          <p><i>Despesas públicas são todos os gastos que o governo faz para cuidar do país — como pagar salários de servidores, construir escolas, hospitais, estradas e oferecer serviços à população.</i></p>
        </div>
      </section>

      <section aria-labelledby="sec-prototipo">
        <div className="section2">
          <h3 id="sec-prototipo">Protótipo</h3>
          <p className="small">Protótipo para demonstração de integração com API SOF-v4.</p>
        </div>
      </section>
    </>
  );
}

export default Home;

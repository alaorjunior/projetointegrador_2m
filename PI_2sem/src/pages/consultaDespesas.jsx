// src/pages/consultaDespesas.jsx
import Header from "../components/header";
import BarraNavegacao from "../components/barraNavegacao";
import CampoPesquisa from "../components/campoPesquisa";
import Card from "../components/card";
import Footer from "../components/footer";

const ConsultaDespesas = () => {
  return (
    <>
      <Header />
      <BarraNavegacao />
      <CampoPesquisa />
      <Card>
        <h2>Resultados da Consulta</h2>
        <p>Preencha os campos e clique em “Buscar” para ver os resultados.</p>
      </Card>
      <Footer />
    </>
  );
};

export default ConsultaDespesas;


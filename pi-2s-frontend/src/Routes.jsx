import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homePage";
import ConsultaDespesas from "./pages/consultaDespesas";
import consultaEmpenhos from "./pages/consultaEmpenhos";

const RotasSite = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/consultar-despesas" element={<ConsultaDespesas />} />
        <Route path="/consultar-empenhos" element={<consultaEmpenhos />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RotasSite;
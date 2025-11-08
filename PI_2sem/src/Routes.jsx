import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homePage";
import ConsultaDespesas from "./pages/consultaDespesas";


const RotasSite = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/consultar-despesas" element={<ConsultaDespesas />} />

      </Routes>
    </BrowserRouter>
  );
};

export default RotasSite;

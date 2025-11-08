import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homePage";
import PageConsultas from "./pages/pageConsultas";

const RotasSite = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/consultar-despesas" element={<PageConsultas />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RotasSite;

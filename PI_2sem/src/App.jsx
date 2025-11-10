// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import ConsultaDespesas from "./pages/consultaDespesas";
import consultaEmpenhos from "./pages/consultaEmpenhos";
import "./styles/style.css"; // mantém seu CSS + Tailwind

function App() {
  return (
    <Router>
      <div className="app-container">
        <main className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/consulta-despesas" element={<ConsultaDespesas />} />
            <Route path="/consulta-empenhos" element={<consultaEmpenhos />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

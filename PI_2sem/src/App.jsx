// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import ConsultaDespesas from "./pages/consultaDespesas";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/style.css"; // mantém seu CSS + Tailwind

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/consulta-despesas" element={<ConsultaDespesas />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/style.css";

const BarraNavegacao = () => {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("site-theme") || document.body.getAttribute("data-theme") || "dark"; }
    catch { return "dark"; }
  });

  useEffect(() => {
    document.body.setAttribute("data-theme", theme === "light" ? "light" : "dark");
    try { localStorage.setItem("site-theme", theme); } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === "light" ? "dark" : "light"));

  return (
    <nav aria-label="Menu principal" role="navigation">
      <NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>Home</NavLink>
      <NavLink to="/consultar-despesas" className={({isActive}) => isActive ? "active" : ""}>Consultar Despesas</NavLink>
      <NavLink to="/consultar-empenhos" className={({isActive}) => isActive ? "active" : ""}>Consultar Empenhos</NavLink>

      <div style={{ marginLeft: "auto" }} aria-hidden="true" />
      <button
        onClick={toggleTheme}
        className="secondary"
        aria-pressed={theme === "light"}
        aria-label="Alternar tema claro ou escuro"
      >
        {theme === "light" ? "Tema: Claro" : "Tema: Escuro"}
      </button>
    </nav>
  );
};

export default BarraNavegacao;


import { NavLink } from "react-router-dom";
import "../styles/style.css";

const BarraNavegacao = () => {
  const toggleTheme = () => {
    const currentTheme = document.body.getAttribute("data-theme");
    document.body.setAttribute("data-theme", currentTheme === "light" ? "dark" : "light");
  };

  return (
    <nav>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Home
      </NavLink>

      <NavLink
        to="/consultar-despesas"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Consultar Despesas
      </NavLink>

      <button
        onClick={toggleTheme}
        className="secondary"
        style={{ marginLeft: "auto" }}
      >
        Alternar Tema
      </button>
    </nav>
  );
};

export default BarraNavegacao;

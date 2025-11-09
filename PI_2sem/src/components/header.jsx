import { useEffect, useState } from "react";

export default function Header() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  // Aplica o tema ao body
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <header className="headerContainer container">
      <h1 className="text-xl font-semibold tracking-tight">Painel de Controle</h1>

      <nav>
        <a href="#" className="active">
          Início
        </a>
        <a href="#">Relatórios</a>
        <a href="#">Configurações</a>
      </nav>

      <div className="theme-switcher">
        <button onClick={toggleTheme} className="themeButton">
          <span className="themeIcon">
            {theme === "dark" ? "🌙" : "☀️"}
          </span>
          <span className="themeText">
            {theme === "dark" ? "Modo Escuro" : "Modo Claro"}
          </span>
        </button>
      </div>
    </header>
  );
}

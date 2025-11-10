import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="headerContainer container" role="banner">
      <div className="header-center">
        <h1 className="site-title">Portal de Transparência Pública</h1>
        <div className="theme-switcher">
          <button
            onClick={toggleTheme}
            className="themeButton"
            aria-label="Alternar tema"
          >
            <span className="themeIcon">{theme === "dark" ? "🌙" : "☀️"}</span>
            <span className="themeText">
              {theme === "dark" ? "Modo Escuro" : "Modo Claro"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

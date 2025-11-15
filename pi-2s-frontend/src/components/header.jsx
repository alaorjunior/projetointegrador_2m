import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const { theme } = useTheme(); // ← ainda lemos o tema para ajustar o estilo se precisar

  return (
    <header className="headerContainer" role="banner">
      <div className="header-center">
        <h1 className="site-title">Portal de Transparência Pública</h1>
      </div>
    </header>
  );
}

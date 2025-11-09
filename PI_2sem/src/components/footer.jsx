export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-column">
          <h4>Acessibilidade</h4>
          <a href="#">Modo Alto Contraste</a>
          <a href="#">Tamanho da Fonte</a>
          <a href="#">Leitor de Tela</a>
        </div>

        <div className="footer-column">
          <h4>Mapa do Site</h4>
          <a href="#">Início</a>
          <a href="#">Relatórios</a>
          <a href="#">Configurações</a>
        </div>

        <div className="footer-column">
          <h4>Contato</h4>
          <a href="#">Suporte</a>
          <a href="#">Privacidade</a>
          <a href="#">Termos de Uso</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Seu Projeto — Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

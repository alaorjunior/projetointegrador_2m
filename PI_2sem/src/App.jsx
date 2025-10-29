import React from 'react';

// REMOVENDO imports não usados (useState, reactLogo, viteLogo, './App.css')

// Mantendo e corrigindo o Case Sensitivity (seus arquivos são minúsculos)
import Header from './components/header'
import viteLogo from '/vite.svg'
import Card from './components/card';
import Footer from './components/footer';

function App() {
  // REMOVENDO: const [count, setCount] = useState(0)

  return (
    // A div.container deve ser o ÚNICO elemento raiz (substituindo o <>)
    // Isso garante que seu CSS de largura e margem funcione
    <div className="container">
      
      {/* O LAYOUT DA APLICAÇÃO COMEÇA AQUI */}
      
      {/* Chamando o componente Header */}
      <header>
        <Header />
      </header>

      {/* Conteúdo principal */}
      <main>
        <div className="card">
          <Card>
            <h2>Busca de Dados</h2>
            <p>Este é o conteúdo principal da busca.</p>
          </Card>
        </div>

        <div className="card">
          <Card>
            <h3>Favoritos/Instruções</h3>
            <p>Conteúdo da coluna lateral.</p>
          </Card>
        </div>
      </main>

      {/* Rodapé */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
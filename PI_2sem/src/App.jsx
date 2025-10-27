import React from 'react';

// REMOVENDO imports não usados (useState, reactLogo, viteLogo, './App.css')

// Mantendo e corrigindo o Case Sensitivity (seus arquivos são minúsculos)
import Header from './components/header'
import viteLogo from '/vite.svg'

function App() {
  // REMOVENDO: const [count, setCount] = useState(0)

  return (
    // A div.container deve ser o ÚNICO elemento raiz (substituindo o <>)
    // Isso garante que seu CSS de largura e margem funcione
    <div className="container">
      
      {/* O LAYOUT DA APLICAÇÃO COMEÇA AQUI */}
      
      {/* Chamando o componente Header */}
      <div id="header">
        <Header />
      </div>

      <main>
        {/* Aqui é onde a coluna de busca e resultados deve ir */}
        
        {/* Chamando o componente Card (Busca e Filtros) */}
        <div id="card-busca">
          <Card>
            <h2>Busca de Dados (Card)</h2>
            <p>Este é o conteúdo principal da busca.</p>
          </Card>
        </div>

        {/* Chamando o componente Card (Favoritos/Instruções) */}
        <div id="card-fav">
          <Card>
            <h3>Favoritos/Instruções</h3>
            <p>Conteúdo da coluna lateral.</p>
          </Card>
        </div>
      </main>


      {/* Chamando o componente Footer */}
      <div id="footer">
        <Footer />
      </div>

    </div>
  );
}

export default App;
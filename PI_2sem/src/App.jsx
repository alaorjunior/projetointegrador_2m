import { useState } from 'react'
import './App.css'
import reactLogo from './assets/react.svg'
import Card from './components/card'
import Footer from './components/footer'
import Header from './components/header'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {/* ---------------------------------------------------- */}
      {/* 2. CHAMADA DOS NOVOS COMPONENTES COM DIV ID (Solicitado) */}
      
      {/* Chamando o componente Header */}
      <div id="header">
        <Header />
      </div>

      {/* Chamando o componente Footer */}
      <div id="footer">
        <Footer />
      </div>

      {/* Chamando o componente Card (Exemplo de uso, pois o Card exige conteúdo 'children') */}
      <div id="card">
        <Card>
          <h2>Conteúdo de Teste do Card</h2>
          <p>Este é o conteúdo passado para o componente Card.</p>
        </Card>
      </div>

      {/* ---------------------------------------------------- */}
    </>
  )
}

export default App

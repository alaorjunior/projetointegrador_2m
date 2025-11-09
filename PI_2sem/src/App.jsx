import Footer from "./components/footer";
import Header from "./components/header";
import RotasSite from "./Routes";
import "./styles/style.css";

function App() {
  return (
    <div className="container">
      <main>
        <RotasSite />
      </main>
      <Footer />
    </div>
  );
}

export default App;


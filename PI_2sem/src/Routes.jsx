import Homepage from "./pages/Homepage";
import pageConsultas from "./pages/pageConsultas";

const rotasSite = () => {
    return (
        <BrowserRoutes>
            <nav>
                <link to="/"><Homepage /></link>
                <link to="/"><pageConsultas /></link>
            </nav>

            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/ConsultasDespesas" element={<pageConsultas />} />
            </Routes>
        </BrowserRoutes>
    );
}

export default rotasSite;
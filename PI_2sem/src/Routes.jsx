import Homepage from "./pages/Homepage";
import pageConsultas from "./pages/pageConsultas";

const routasSite = () => {
    return (
        <BrowserRoutes>
            <nav>
                <link to="/"><Home/></link>
                <link to="/"><pageConsultas/></link>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ConsultasDespesas" element={<pageConsultas />} />
            </Routes>
        </BrowserRoutes>
    );
}
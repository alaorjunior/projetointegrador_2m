import consultaDespesas from './pages/consultaDespesas';
import Homepage from './pages/Homepage';

const Routes = () => {
    return (
        <BrowserRoutes>
            <nav>
                <link to="/"><Homepage /></link>
                <link to="/"><consultaDespesas /></link>
            </nav>

            <Routes>
                <Route path="/Home" element={<Homepage />} />
                <Route path="/ConsultasDespesas" element={<consultaDespesas />} />
            </Routes>
        </BrowserRoutes>
    );
}

export default Routes;


const Header = () => {
    return (
        <header>
            {/* Primeira div: Títulos */}
            <div>
                <h1>Consulta Orçamentária (protótipo) — SOF-v4</h1>
                <div className="small">Consuma dados públicos da Prefeitura para visualizar despesas por órgão</div>
            </div>

            {/*Controles e Tema */}
            <div className="controls">
                <div 
                    className="card" 
                    
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    <label 
                        className="small" 
                        style={{ marginRight: '6px' }}
                    >
                        Tema:
                    </label>
                    <div className="badge">Transparência Orçamentária</div>
                    <button 
                        id="toggleTheme" 
                        className="secondary" 
                        style={{ marginLeft: '12px' }}
                    >
                        Alternar Tema
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
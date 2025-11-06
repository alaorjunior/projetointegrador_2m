import "../styles/style.css";

const barraNavegacao = () => {
    const barraItems = ['Home', 'Consultar despesas']

    return(
        <Routes key={barraItems}>
            <NavLink to="/">{`Home`}</NavLink>
            <NavLink to="/">{`Consultar despesas`}</NavLink>F
        </Routes>
    );
}

export default barraNavegacao;
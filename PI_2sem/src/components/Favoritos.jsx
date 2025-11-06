import "../styles/style.css";

const Favoritos = () => {
    return (
        <section
            className="card"
            style={style}
        >
        <h3>Favoritos</h3>
        <div id="favList" class="small">
        <div class="empty">Nenhum favorito salvo.</div>
        </div>
            </section>
    );
};

export default Favoritos;
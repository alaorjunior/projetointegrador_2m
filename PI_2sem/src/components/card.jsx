import "../styles/style.css";

>>>>>>> 04361eda80f100378089fb77785e3e85356b17b4

const Card = ({ children, style = {} }) => {
    return (
        <section 
            className="card" 
            style={style}
        >
            {children}
        </section>
    );
};

export default Card;
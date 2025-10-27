import './src\styles\index.cssact';

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
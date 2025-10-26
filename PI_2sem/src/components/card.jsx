import React from 'react';


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
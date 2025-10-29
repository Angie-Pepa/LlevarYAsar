// src/components/ProductoCard.jsx
import { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';

export function ProductoCard({ producto }) {
    const { agregarAlCarrito } = useContext(CarritoContext);

    return (
    <article className="producto">
        <div className="producto__contenido">
        <figure className="producto__media">
            <img src={producto.imagen} alt={producto.nombre} />
        </figure>
        <div className="producto__info">
            <span className="producto__categoria">{producto.categoria}</span>
            <h3 className="producto__titulo">{producto.nombre}</h3>
            <p className="producto__descripcion">{producto.descripcion}</p>
            <p className="producto__precio">${producto.precio.toLocaleString('es-CL')}</p>
            <p>Stock: {producto.stock} {producto.stock <= producto.stockCritico ? '⚠' : ''}</p>
            <button 
            className="producto__btn" 
            onClick={() => agregarAlCarrito(producto)}
            >
            Agregar al carrito
            </button>
        </div>
        </div>
    </article>
    );
}
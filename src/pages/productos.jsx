// src/pages/Productos.jsx
import { productos } from '../data/productos';
import { useCarrito } from '../context/CarritoContext';

export function Productos() {
    const { agregarAlCarrito } = useCarrito();

    return (
        <main>
            <section>
                <h1>Nuestros Productos</h1>
                <p>Selecciona tu favorito y llévalo a casa. ¡Todo listo para asar!</p>

                <div id="productos-container" className="product-grid">
                    {productos.map(producto => (
                        <article key={producto.id} className="producto">
                            <div className="producto__contenido">
                                <figure className="producto__media">
                                    <img 
                                        src={producto.imagen} 
                                        alt={producto.nombre}
                                        loading="lazy"
                                        style={{maxWidth: '200px', borderRadius: '8px'}}
                                    />
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
                    ))}
                </div>
            </section>
        </main>
    );
}
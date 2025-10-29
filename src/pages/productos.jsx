// src/pages/Productos.jsx
import { productos } from '../data/productos';
import { ProductoCard } from '../components/ProductoCard';

export function Productos() {
    return (
    <main>
        <section id="featured-products">
        <h2>Nuestros Productos</h2>
        <div id="productos-container">
            {productos.map(producto => (
            <ProductoCard key={producto.id} producto={producto} />
            ))}
        </div>
        </section>
    </main>
    );
}
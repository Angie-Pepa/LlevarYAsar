// src/components/Header.jsx
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';

export function Header() {
    const location = useLocation();
    const { getCantidadItems } = useContext(CarritoContext);
    const cantidadItems = getCantidadItems();

    const isActive = (path) => location.pathname === path ? 'is-active' : '';

    return (
    <header>
        <div className="logo">Llevar & Asar</div>
        <nav>
        <ul>
            <li><Link to="/" className={isActive('/')}>Inicio</Link></li>
            <li><Link to="/productos" className={isActive('/productos')}>Productos</Link></li>
            <li><Link to="/nosotros" className={isActive('/nosotros')}>Nosotros</Link></li>
            <li><Link to="/blog" className={isActive('/blog')}>Blog</Link></li>
            <li><Link to="/contacto" className={isActive('/contacto')}>Contacto</Link></li>
            <li><Link to="/login" className={isActive('/login')}>Iniciar Sesión</Link></li>
            <li><Link to="/registro" className={isActive('/registro')}>Registro</Link></li>
            <li>
            <Link to="/carrito" className={`cart-icon ${isActive('/carrito')}`}>
                🛒 <span className="cart-count">{cantidadItems}</span>
            </Link>
            </li>
        </ul>
        </nav>
    </header>
    );
}
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Home } from './pages/home';
import { Productos } from './pages/productos';
import { Registro } from './pages/registro';
import { Login } from './pages/login';
import Admin from './pages/Admin';
import { Nosotros } from './pages/Nosotros';
import { Blog } from './pages/Blog';
import { Contacto } from './pages/Contacto';
import { CarritoProvider } from './context/CarritoContext';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <CarritoProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </CarritoProvider>
    </BrowserRouter>
  );
}
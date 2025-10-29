// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Home } from './pages/Home';
import { Productos } from './pages/productos';
import { Registro } from './pages/registro';
import { Login } from './pages/login';
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
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </CarritoProvider>
    </BrowserRouter>
  );
}
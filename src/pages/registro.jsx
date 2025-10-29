// src/pages/Registro.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validarFormularioRegistro } from '../utils/validaciones';

export function Registro() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
    rut: '',
    nombre: '',
    apellidos: '',
    email: '',
    direccion: '',
    region: '',
    comuna: ''
    });
    
    const [errores, setErrores] = useState({});

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: value
    }));
    // Limpiar error cuando el usuario escribe
    if (errores[name]) {
        setErrores(prev => ({
        ...prev,
        [name]: ''
        }));
    }
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    
    const { isValid, errores: erroresValidacion } = validarFormularioRegistro(formData);
    
    if (isValid) {
        alert('✅ Registro completado exitosamente');
        localStorage.setItem('usuario', JSON.stringify(formData));
        setFormData({ rut: '', nombre: '', apellidos: '', email: '', direccion: '', region: '', comuna: '' });
        navigate('/login');
    } else {
        setErrores(erroresValidacion);
    }
    };

    return (
    <main>
        <section>
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleSubmit} id="form-usuario">
            <label>RUT</label>
            <input
            type="text"
            name="rut"
            value={formData.rut}
            onChange={handleChange}
            placeholder="12345678-9"
            className={errores.rut ? 'error-field' : ''}
            />
            {errores.rut && <div className="error">{errores.rut}</div>}

            <label>Nombre</label>
            <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={errores.nombre ? 'error-field' : ''}
            />
            {errores.nombre && <div className="error">{errores.nombre}</div>}

            <label>Apellidos</label>
            <input
            type="text"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            className={errores.apellidos ? 'error-field' : ''}
            />
            {errores.apellidos && <div className="error">{errores.apellidos}</div>}

            <label>Email</label>
            <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errores.email ? 'error-field' : ''}
            />
            {errores.email && <div className="error">{errores.email}</div>}

            <label>Dirección</label>
            <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            className={errores.direccion ? 'error-field' : ''}
            />
            {errores.direccion && <div className="error">{errores.direccion}</div>}

            <button type="submit">Registrar</button>
        </form>
        </section>
    </main>
    );
}
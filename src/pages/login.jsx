// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validarFormularioLogin } from '../utils/validaciones';

export function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
    email: '',
    password: ''
    });

    const [errores, setErrores] = useState({});

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: value
    }));
    if (errores[name]) {
        setErrores(prev => ({
        ...prev,
        [name]: ''
        }));
    }
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    
    const { isValid, errores: erroresValidacion } = validarFormularioLogin(formData);
    
    if (isValid) {
        alert('✅ ¡Bienvenido a Llevar & Asar!');
        localStorage.setItem('usuarioLogeado', JSON.stringify(formData));
        navigate('/');
    } else {
        setErrores(erroresValidacion);
    }
    };

    return (
        <main>
        <section>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} id="form-login">
            <label>Email</label>
            <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errores.email ? 'error-field' : ''}
            />
            {errores.email && <div className="error">{errores.email}</div>}

            <label>Contraseña</label>
            <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errores.password ? 'error-field' : ''}
            />
            {errores.password && <div className="error">{errores.password}</div>}

            <button type="submit">Ingresar</button>
        </form>
        </section>
    </main>
    );
}
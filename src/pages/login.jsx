// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { validarFormularioLogin } from '../utils/helpers';

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
        
        const erroresValidacion = validarFormularioLogin(formData);
        
        if (Object.keys(erroresValidacion).length === 0) {
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
                <h1>Iniciar Sesión</h1>
                <p>Ingresa tus datos para acceder a tu cuenta y realizar pedidos.</p>
                <form id="form-login" onSubmit={handleSubmit}>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        maxLength="100"
                        placeholder="usuario@mail.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errores.email && <div className="error">{errores.email}</div>}

                    <label>Contraseña:</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errores.password && <div className="error">{errores.password}</div>}

                    <button type="submit">Iniciar Sesión</button>
                    <p>¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
                </form>
            </section>
        </main>
    );
}
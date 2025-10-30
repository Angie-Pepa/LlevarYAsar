// src/pages/Registro.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validarFormularioRegistro, regionesYComunas } from '../utils/helpers';

export function Registro() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        run: '',
        nombre: '',
        apellidos: '',
        email: '',
        fechaNacimiento: '',
        region: '',
        comuna: '',
        direccion: ''
    });
    
    const [errores, setErrores] = useState({});
    const [comunas, setComunas] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Si cambia región, actualizar comunas
        if (name === 'region') {
            setComunas(regionesYComunas[value] || []);
            setFormData(prev => ({
                ...prev,
                comuna: ''
            }));
        }

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
        
        const erroresValidacion = validarFormularioRegistro(formData);
        
        if (Object.keys(erroresValidacion).length === 0) {
            alert('✅ Registro completado exitosamente');
            localStorage.setItem('usuario', JSON.stringify(formData));
            setFormData({ 
                run: '', nombre: '', apellidos: '', email: '', 
                fechaNacimiento: '', region: '', comuna: '', direccion: '' 
            });
            navigate('/login');
        } else {
            setErrores(erroresValidacion);
        }
    };

    useEffect(() => {
        // Cargar comunas de la región por defecto si existe
        if (formData.region) {
            setComunas(regionesYComunas[formData.region] || []);
        }
    }, []);

    return (
        <main>
            <section>
                <h1>Registro de Usuario</h1>
                <p>Regístrate para realizar pedidos, guardar tus datos y acceder a promociones exclusivas.</p>
                
                <form id="form-usuario" onSubmit={handleSubmit}>
                    <label>RUT (sin puntos ni guión):</label>
                    <input 
                        type="text" 
                        name="run" 
                        placeholder="Ej: 19011022K" 
                        maxLength="9" 
                        value={formData.run}
                        onChange={handleChange}
                        required 
                    />
                    {errores.run && <div className="error">{errores.run}</div>}
                    
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        name="nombre" 
                        maxLength="50" 
                        placeholder="Tu nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required 
                    />
                    {errores.nombre && <div className="error">{errores.nombre}</div>}
                    
                    <label>Apellidos:</label>
                    <input 
                        type="text" 
                        name="apellidos" 
                        maxLength="100" 
                        placeholder="Tus apellidos"
                        value={formData.apellidos}
                        onChange={handleChange}
                        required 
                    />
                    {errores.apellidos && <div className="error">{errores.apellidos}</div>}
                    
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
                    
                    <label>Fecha de Nacimiento:</label>
                    <input 
                        type="date" 
                        name="fechaNacimiento"
                        value={formData.fechaNacimiento}
                        onChange={handleChange}
                    />

                    <label>Región:</label>
                    <select 
                        name="region" 
                        value={formData.region}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione una región</option>
                        {Object.keys(regionesYComunas).map(region => (
                            <option key={region} value={region}>{region}</option>
                        ))}
                    </select>
                    
                    <label>Comuna:</label>
                    <select 
                        name="comuna" 
                        value={formData.comuna}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione una comuna</option>
                        {comunas.map(comuna => (
                            <option key={comuna} value={comuna}>{comuna}</option>
                        ))}
                    </select>
                    
                    <label>Dirección:</label>
                    <input 
                        type="text" 
                        name="direccion" 
                        maxLength="300" 
                        placeholder="Calle, número, depto."
                        value={formData.direccion}
                        onChange={handleChange}
                        required 
                    />
                    {errores.direccion && <div className="error">{errores.direccion}</div>}
                    
                    <button type="submit">Registrarse</button>
                    <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a></p>
                </form>
            </section>
        </main>
    );
}
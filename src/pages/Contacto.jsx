import { useState } from 'react';
import { validarFormularioContacto } from '../utils/helpers';

export function Contacto() {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        comentario: ''
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
        const erroresValidacion = validarFormularioContacto(formData);
        
        if (Object.keys(erroresValidacion).length === 0) {
            alert('✅ Mensaje enviado. Nos contactaremos contigo pronto.');
            setFormData({ nombre: '', email: '', comentario: '' });
            setErrores({});
        } else {
            setErrores(erroresValidacion);
        }
    };

    return (
        <main>
            <section>
                <h1>Contáctanos</h1>
                <p>¿Tienes dudas, sugerencias o quieres hacer un pedido especial? ¡Escríbenos!</p>
                <form id="form-contacto" onSubmit={handleSubmit}>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        maxLength="100"
                        required
                        placeholder="Tu nombre completo"
                        value={formData.nombre}
                        onChange={handleChange}
                    />
                    {errores.nombre && <div className="error">{errores.nombre}</div>}

                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        maxLength="100"
                        placeholder="nombre@mail.com"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errores.email && <div className="error">{errores.email}</div>}

                    <label>Comentario:</label>
                    <textarea
                        name="comentario"
                        maxLength="500"
                        required
                        placeholder="Cuéntanos cómo podemos ayudarte..."
                        value={formData.comentario}
                        onChange={handleChange}
                    />
                    {errores.comentario && <div className="error">{errores.comentario}</div>}

                    <button type="submit">Enviar Mensaje</button>
                </form>
            </section>
        </main>
    );
}
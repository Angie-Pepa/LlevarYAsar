import { useState } from 'react'

export default function AdminProductos({ productos, onAddProducto, onDeleteProducto }) {
    const [formData, setFormData] = useState({
    nombre: '',
    descripción: '',
    precio: '',
    stock: '',
    })

    const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.nombre && formData.precio) {
        onAddProducto({
        id: Date.now(),
        ...formData,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock) || 0,
        })
        setFormData({ nombre: '', descripción: '', precio: '', stock: '' })
    }
    }

    return (
    <div className="admin-section">
        <h2>📦 Gestionar Productos</h2>

        <form onSubmit={handleSubmit} className="admin-form">
        <input
            type="text"
            name="nombre"
            placeholder="Nombre del producto"
            value={formData.nombre}
            onChange={handleChange}
            required
        />
        <input
            type="text"
            name="descripción"
            placeholder="Descripción"
            value={formData.descripción}
            onChange={handleChange}
        />
        <input
            type="number"
            name="precio"
            placeholder="Precio"
            value={formData.precio}
            onChange={handleChange}
            required
        />
        <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
        />
        <button type="submit">➕ Agregar Producto</button>
        </form>

        <table className="admin-table">
        <thead>
            <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acción</th>
            </tr>
        </thead>
        <tbody>
            {productos.map(prod => (
            <tr key={prod.id}>
                <td>{prod.nombre}</td>
                <td>${prod.precio}</td>
                <td>{prod.stock}</td>
                <td>
                <button onClick={() => onDeleteProducto(prod.id)} className="btn-delete">
                    🗑️ Eliminar
                </button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    )
}
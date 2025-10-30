import { useState, useEffect } from 'react'
import AdminHeader from '../components/admin/AdminHeader'
import AdminProductos from '../components/admin/AdminProductos'
import AdminOrdenes from '../components/admin/AdminOrdenes'
import '../../css/admin.css'

export default function Admin() {
    const [productos, setProductos] = useState(() => {
    const saved = localStorage.getItem('admin_productos')
    return saved ? JSON.parse(saved) : []
    })

    const [ordenes, setOrdenes] = useState(() => {
    const saved = localStorage.getItem('ordenes')
    return saved ? JSON.parse(saved) : []
    })

  // Guardar productos en localStorage
    useEffect(() => {
    localStorage.setItem('admin_productos', JSON.stringify(productos))
    }, [productos])

    const handleAddProducto = (nuevoProducto) => {
    setProductos([...productos, nuevoProducto])
    alert('✅ Producto agregado exitosamente')
    }

    const handleDeleteProducto = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
        setProductos(productos.filter(p => p.id !== id))
        alert('✅ Producto eliminado')
    }
    }

    return (
    <div className="admin-container">
        <AdminHeader />
        <div className="admin-content">
        <AdminProductos
            productos={productos}
            onAddProducto={handleAddProducto}
            onDeleteProducto={handleDeleteProducto}
        />
        <AdminOrdenes ordenes={ordenes} />
        </div>
    </div>
    )
}
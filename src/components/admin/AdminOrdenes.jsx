export default function AdminOrdenes({ ordenes = [] }) {
    const totalVentas = ordenes.reduce((sum, orden) => sum + (orden.total || 0), 0)

    return (
    <div className="admin-section">
        <h2>📋 Órdenes Recientes</h2>

        <div className="admin-stats">
        <div className="stat-card">
            <h3>Total de Órdenes</h3>
            <p className="stat-number">{ordenes.length}</p>
        </div>
        <div className="stat-card">
            <h3>Ventas Totales</h3>
            <p className="stat-number">${totalVentas.toFixed(2)}</p>
        </div>
        </div>

        {ordenes.length === 0 ? (
        <p>No hay órdenes registradas</p>
        ) : (
        <table className="admin-table">
            <thead>
            <tr>
                <th>ID Orden</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Fecha</th>
            </tr>
            </thead>
            <tbody>
            {ordenes.map(orden => (
                <tr key={orden.id}>
                <td>#{orden.id}</td>
                <td>{orden.cliente || 'Anónimo'}</td>
                <td>${orden.total?.toFixed(2)}</td>
                <td>{new Date(orden.fecha).toLocaleDateString()}</td>
                </tr>
            ))}
            </tbody>
        </table>
        )}
    </div>
    ) 
}
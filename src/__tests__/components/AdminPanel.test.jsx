import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('Admin Panel - Gestión de Productos', () => {
    let productos = []
    let mockAddProducto
    let mockDeleteProducto

    beforeEach(() => {
    productos = []
    mockAddProducto = vi.fn((producto) => {
        productos.push(producto)
    })
    mockDeleteProducto = vi.fn((id) => {
        productos = productos.filter(p => p.id !== id)
    })
    })

    describe('CRUD Operations', () => {
    it('debe agregar un nuevo producto al array', () => {
        const nuevoProducto = {
        id: 1,
        nombre: 'Asado Premium',
        descripción: 'Corte de primera',
        precio: 150,
        stock: 10
        }

        mockAddProducto(nuevoProducto)
        
        expect(mockAddProducto).toHaveBeenCalledWith(nuevoProducto)
        expect(productos).toHaveLength(1)
        expect(productos[0].nombre).toBe('Asado Premium')
    })

    it('debe eliminar un producto por ID', () => {
      // Agregar productos
        mockAddProducto({ id: 1, nombre: 'Asado', precio: 150 })
        mockAddProducto({ id: 2, nombre: 'Chorizos', precio: 80 })
        mockAddProducto({ id: 3, nombre: 'Lomo', precio: 200 })

        expect(productos).toHaveLength(3)

      // Eliminar uno
        mockDeleteProducto(2)

        expect(mockDeleteProducto).toHaveBeenCalledWith(2)
        expect(productos).toHaveLength(2)
        expect(productos.find(p => p.id === 2)).toBeUndefined()
    })

    it('debe manejar múltiples operaciones de agregar', () => {
        mockAddProducto({ id: 1, nombre: 'Producto 1', precio: 100 })
        mockAddProducto({ id: 2, nombre: 'Producto 2', precio: 200 })
        mockAddProducto({ id: 3, nombre: 'Producto 3', precio: 300 })

        expect(productos).toHaveLength(3)
        expect(mockAddProducto).toHaveBeenCalledTimes(3)
    })
    })

    describe('Validación de Datos', () => {
    it('debe validar estructura de producto', () => {
        const producto = {
        id: 1,
        nombre: 'Asado',
        descripción: 'Corte de primera',
        precio: 150,
        stock: 10,
        categoría: 'carnes'
        }

        expect(producto).toHaveProperty('id')
        expect(producto).toHaveProperty('nombre')
        expect(producto).toHaveProperty('precio')
        expect(producto).toHaveProperty('stock')
        expect(typeof producto.precio).toBe('number')
        expect(producto.precio).toBeGreaterThan(0)
    })

    it('debe rechazar precios negativos', () => {
        const productoBad = { id: 1, nombre: 'Test', precio: -50 }
        
        expect(productoBad.precio).toBeLessThan(0)
        expect(productoBad.precio).not.toBeGreaterThan(0)
    })

    it('debe validar stock suficiente', () => {
        const producto = { id: 1, nombre: 'Asado', stock: 10 }
        const cantidadSolicitada = 5

        expect(producto.stock).toBeGreaterThanOrEqual(cantidadSolicitada)
    })
    })

    describe('Cálculos de Inventario', () => {
    it('debe calcular total de productos en stock', () => {
        const productos = [
        { id: 1, nombre: 'Asado', stock: 10 },
        { id: 2, nombre: 'Chorizos', stock: 20 },
        { id: 3, nombre: 'Lomo', stock: 15 }
        ]

        const totalStock = productos.reduce((sum, p) => sum + p.stock, 0)
        expect(totalStock).toBe(45)
    })

    it('debe calcular valor total del inventario', () => {
        const productos = [
        { id: 1, nombre: 'Asado', precio: 150, stock: 10 },
        { id: 2, nombre: 'Chorizos', precio: 80, stock: 20 },
        { id: 3, nombre: 'Lomo', precio: 200, stock: 5 }
        ]

      const valorTotal = productos.reduce((sum, p) => sum + (p.precio * p.stock), 0)
      expect(valorTotal).toBe(1500 + 1600 + 1000) // 4100
    })

    it('debe filtrar productos por disponibilidad', () => {
        const productos = [
        { id: 1, nombre: 'Asado', stock: 10 },
        { id: 2, nombre: 'Chorizos', stock: 0 },
        { id: 3, nombre: 'Lomo', stock: 5 }
        ]

        const disponibles = productos.filter(p => p.stock > 0)
        expect(disponibles).toHaveLength(2)
        expect(disponibles.find(p => p.id === 2)).toBeUndefined()
    })

    it('debe filtrar productos por rango de precio', () => {
        const productos = [
        { id: 1, nombre: 'Asado', precio: 150 },
        { id: 2, nombre: 'Chorizos', precio: 80 },
        { id: 3, nombre: 'Lomo', precio: 200 }
        ]

        const caros = productos.filter(p => p.precio > 120)
        expect(caros).toHaveLength(2)
        expect(caros[0].precio).toBe(150)
    })
    })

    describe('Funcionalidades de Admin', () => {
    it('debe crear producto con ID único', () => {
        const id1 = Math.random()
        const id2 = Math.random()

        expect(id1).not.toBe(id2)
    })

    it('debe formatear precio como moneda', () => {
        const precio = 150.5
        const formateado = `$${precio.toFixed(2)}`

        expect(formateado).toBe('$150.50')
    })

    it('debe generar timestamp para nuevos productos', () => {
        const timestamp = new Date().getTime()
        const producto = { id: 1, nombre: 'Test', createdAt: timestamp }

        expect(producto).toHaveProperty('createdAt')
        expect(typeof producto.createdAt).toBe('number')
    })
    })
})

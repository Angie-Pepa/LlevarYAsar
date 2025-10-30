import { describe, it, expect } from 'vitest'

// Funciones de ejemplo a testear
function sumar(a, b) {
    return a + b
}

function restar(a, b) {
    return a - b
}

function multiplicar(a, b) {
  return a * b
}

function calcularDescuento(precio, descuento) {
  return precio * (1 - descuento / 100)
}

function formatearPrecio(precio) {
    return `$${precio.toFixed(2)}`
}

describe('Funciones de Utilidad', () => {
  // Tests de operaciones matemáticas básicas
    describe('Operaciones matemáticas', () => {
    it('debe sumar dos números correctamente', () => {
        expect(sumar(2, 3)).toBe(5)
        expect(sumar(-1, 1)).toBe(0)
        expect(sumar(0, 0)).toBe(0)
        expect(sumar(100, 50)).toBe(150)
    })

    it('debe restar dos números correctamente', () => {
        expect(restar(10, 3)).toBe(7)
        expect(restar(5, 5)).toBe(0)
        expect(restar(0, 10)).toBe(-10)
    })

    it('debe multiplicar dos números correctamente', () => {
        expect(multiplicar(3, 4)).toBe(12)
        expect(multiplicar(0, 100)).toBe(0)
        expect(multiplicar(-5, 2)).toBe(-10)
        expect(multiplicar(2.5, 2)).toBe(5)
    })
    })

  // Tests de cálculos comerciales
    describe('Cálculos comerciales', () => {
    it('debe calcular descuento correctamente', () => {
        expect(calcularDescuento(100, 10)).toBe(90)
        expect(calcularDescuento(200, 25)).toBe(150)
        expect(calcularDescuento(50, 50)).toBe(25)
        expect(calcularDescuento(1000, 0)).toBe(1000)
    })

    it('debe formatear precio como moneda', () => {
        expect(formatearPrecio(100)).toBe('$100.00')
        expect(formatearPrecio(99.5)).toBe('$99.50')
        expect(formatearPrecio(0)).toBe('$0.00')
        expect(formatearPrecio(1234.567)).toBe('$1234.57')
    })
    })

  // Tests de casos extremos
    describe('Casos extremos y errores', () => {
    it('debe manejar números negativos', () => {
        expect(sumar(-5, -3)).toBe(-8)
        expect(multiplicar(-2, -3)).toBe(6)
    })

    it('debe manejar decimales', () => {
        expect(sumar(1.5, 2.5)).toBe(4)
        expect(multiplicar(1.1, 10)).toBeCloseTo(11, 1)
    })

    it('debe calcular descuento del 100%', () => {
        expect(calcularDescuento(100, 100)).toBe(0)
    })
    })
})

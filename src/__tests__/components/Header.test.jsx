import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Header } from '../../components/header'
import { CarritoProvider } from '../../context/CarritoContext'

describe('Header Component', () => {
    it('debe renderizar el header correctamente', () => {
    render(
        <BrowserRouter>
        <CarritoProvider>
            <Header />
        </CarritoProvider>
        </BrowserRouter>
    )
    
    // Verifica que el header se renderice
    const header = screen.getByRole('banner', { hidden: true })
    expect(header).toBeInTheDocument()
    })

    it('debe mostrar elementos de navegación', () => {
    render(
        <BrowserRouter>
        <CarritoProvider>
            <Header />
        </CarritoProvider>
        </BrowserRouter>
    )
    
    // Busca elementos de navegación
    const nav = screen.getByRole('navigation', { hidden: true })
    expect(nav).toBeInTheDocument()
    })

    it('debe renderizar sin errores', () => {
    expect(() => {
        render(
        <BrowserRouter>
            <CarritoProvider>
            <Header />
            </CarritoProvider>
        </BrowserRouter>
        )
    }).not.toThrow()
    })
})
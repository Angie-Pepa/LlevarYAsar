
// Array de productos 
const productos = [
    {
        id: 1,
        nombre: "Asado de Tira Premium",
        descripcion: "Corte jugoso y bien marmoleado, ideal para asar a la parrilla.",
        precio: 8990,
        imagen: "img/asado.jpg",
        stock: 15,
        stockCritico: 3,
        categoria: "Cortes Premium"
    },
    {
        id: 2,
        nombre: "Pollo Asado Completo",
        descripcion: "Pollo entero asado con especias secretas, listo para llevar.",
        precio: 6500,
        imagen: "img/pollo.jpg",
        stock: 20,
        stockCritico: 5,
        categoria: "Pollos"
    },
    {
        id: 3,
        nombre: "Chorizos Artesanales x6",
        descripcion: "Elaborados con carne de cerdo y especias naturales. ¡Irresistibles!",
        precio: 3990,
        imagen: "img/chorizos.jpg",
        stock: 30,
        stockCritico: 10,
        categoria: "Embutidos"
    },
    {
        id: 4,
        nombre: "Parrillada Familiar",
        descripcion: "Combo para 4 personas: asado, chorizos, pollo y ensaladas.",
        precio: 24990,
        imagen: "img/parrillada.jpg",
        stock: 8,
        stockCritico: 2,
        categoria: "Combos"
    }
];

// Función para obtener el carrito desde localStorage
function obtenerCarrito() {
    const carrito = localStorage.getItem('carrito');
    return carrito ? JSON.parse(carrito) : [];
}

// Función para guardar el carrito en localStorage
function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para agregar producto al carrito
function agregarAlCarrito(id) {
    const carrito = obtenerCarrito();
    const producto = productos.find(p => p.id === id);
    
    if (!producto) {
        console.error('Producto no encontrado');
        return;
    }
    
    if (producto.stock <= 0) {
        alert('❌ Producto agotado');
        return;
    }
    
    const itemExistente = carrito.find(item => item.id === id);
    
    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1,
            imagen: producto.imagen
        });
    }
    
    // Actualizar stock (simulado)
    producto.stock -= 1;
    
    guardarCarrito(carrito);
    actualizarContadorCarrito();
    alert('✅ Producto agregado al carrito');
}

// Función para actualizar el contador del carrito en el header
function actualizarContadorCarrito() {
    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    const contador = document.querySelector('.cart-count');
    
    if (contador) {
        contador.textContent = totalItems;
    }
}

// Función para mostrar productos en la página de productos
function mostrarProductos() {
    const contenedor = document.getElementById('productos-container');
    if (!contenedor) return;
    
    contenedor.innerHTML = productos.map(producto => `
        <div class="product-card">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p class="price">$${producto.precio.toLocaleString()}</p>
            <p>Stock: ${producto.stock} ${producto.stock <= producto.stockCritico ? '⚠' : ''}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
        </div>
    `).join('');
}

// Función para mostrar detalle de producto
function mostrarDetalleProducto() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));
    const producto = productos.find(p => p.id === id);
    const contenedor = document.getElementById('detalle-producto');
    
    if (!producto || !contenedor) return;
    
    contenedor.innerHTML = `
        <div style="text-align: center; max-width: 600px; margin: 0 auto; padding: 20px;">
            <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
            <h2>${producto.nombre}</h2>
            <p><strong>Descripción:</strong> ${producto.descripcion}</p>
            <p><strong>Precio:</strong> <span style="font-size: 1.5rem; color: #D2691E; font-weight: 700;">$${producto.precio.toLocaleString()}</span></p>
            <p><strong>Stock disponible:</strong> ${producto.stock} ${producto.stock <= producto.stockCritico ? '⚠ STOCK CRÍTICO' : ''}</p>
            <p><strong>Categoría:</strong> ${producto.categoria}</p>
            <button onclick="agregarAlCarrito(${producto.id})" style="margin-top: 25px; padding: 15px 30px; font-size: 1.1rem;">Añadir al carrito ($${producto.precio.toLocaleString()})</button>
        </div>
    `;
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    actualizarContadorCarrito();
    if (document.getElementById('productos-container')) {
        mostrarProductos();
    }
    if (document.getElementById('detalle-producto')) {
        mostrarDetalleProducto();
    }
});
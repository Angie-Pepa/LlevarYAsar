// js/productos.js

// ========= Catálogo =========
const productos = [
  // Cortes / combos iniciales
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
    nombre: "Chorizos Artesanales x6",
    descripcion: "Elaborados con carne de cerdo y especias naturales. ¡Irresistibles!",
    precio: 3990,
    imagen: "img/chorizos.jpg",
    stock: 30,
    stockCritico: 10,
    categoria: "Embutidos"
  },
  {
    id: 3,
    nombre: "Parrillada Familiar",
    descripcion: "Combo para 4 personas: asado, chorizos y ensaladas.",
    precio: 24990,
    imagen: "img/parrillada.jpg",
    stock: 8,
    stockCritico: 2,
    categoria: "Combos"
  },

  // Entrañas
  {
    id: 5, nombre: "Entraña", descripcion: "Perfecta para un asado familiar, gran sabor.",
    precio: 13490, imagen: "img/entrania2.jpg", stock: 10, stockCritico: 3, categoria: "Entrañas"
  },
  // Lomo Liso
  {
    id: 7, nombre: "Lomo Liso", descripcion: "Clásico corte magro, jugoso al grill.",
    precio: 15990, imagen: "img/lomo-liso2.jpg", stock: 15, stockCritico: 4, categoria: "Lomo Liso"
  },

  // Longanizas
  {
    id: 10, nombre: "Longaniza ", descripcion: "Artesanal con especias tradicionales.",
    precio: 6990, imagen: "img/longaniza2.jpg", stock: 25, stockCritico: 8, categoria: "Longanizas"
  },

  // Punta de Ganso
  {
    id: 13, nombre: "Punta de Ganso ", descripcion: "Tradicional chileno, jugoso y sabroso.",
    precio: 18990, imagen: "img/punta-ganso1.jpg", stock: 12, stockCritico: 3, categoria: "Punta de Ganso"
  },
];

// ========= Carrito =========
function obtenerCarrito() {
  const carrito = localStorage.getItem('carrito');
  return carrito ? JSON.parse(carrito) : [];
}
function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}
function agregarAlCarrito(id) {
  const carrito = obtenerCarrito();
  const producto = productos.find(p => p.id === id);

  if (!producto) { console.error('Producto no encontrado'); return; }
  if (producto.stock <= 0) { alert('❌ Producto agotado'); return; }

  const item = carrito.find(i => i.id === id);
  if (item) {
    item.cantidad += 1;
  } else {
    carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1, imagen: producto.imagen });
  }

  producto.stock = Math.max(0, producto.stock - 1);
  guardarCarrito(carrito);
  actualizarContadorCarrito();
  alert('✅ Producto agregado al carrito');
}
function actualizarContadorCarrito() {
  const carrito = obtenerCarrito();
  const totalItems = carrito.reduce((t, i) => t + i.cantidad, 0);
  const contador = document.querySelector('.cart-count');
  if (contador) contador.textContent = totalItems;
}

// ========= Render catálogo y detalle =========
function mostrarProductos() {
  const contenedor = document.getElementById('productos-container');
  if (!contenedor) return;

  contenedor.innerHTML = productos.map(p => `
    <article class="product-card">
      <a href="producto.html?id=${p.id}" title="Ver detalle de ${p.nombre}">
        <img src="${p.imagen}" alt="${p.nombre}" onerror="this.src='img/placeholder.jpg'">
      </a>
      <h3>${p.nombre}</h3>
      <p class="price">$${p.precio.toLocaleString('es-CL')}</p>
      <p>Stock: ${p.stock} ${p.stock <= p.stockCritico ? '⚠' : ''}</p>
      <div class="card-actions">
        <button onclick="agregarAlCarrito(${p.id})">Añadir al carrito</button>
        <a class="btn-link" href="producto.html?id=${p.id}">Ver detalle</a>
      </div>
    </article>
  `).join('');
}

function mostrarDetalleProducto() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get('id'));
  const p = productos.find(x => x.id === id);
  const contenedor = document.getElementById('detalle-producto');
  if (!p || !contenedor) return;

  contenedor.innerHTML = `
    <div class="detalle-box">
      <img src="${p.imagen}" alt="${p.nombre}" class="detalle-img" onerror="this.src='img/placeholder.jpg'">
      <h2>${p.nombre}</h2>
      <p><strong>Descripción:</strong> ${p.descripcion}</p>
      <p><strong>Categoría:</strong> ${p.categoria}</p>
      <p><strong>Precio:</strong> <span class="detalle-precio">$${p.precio.toLocaleString('es-CL')}</span></p>
      <p><strong>Stock disponible:</strong> ${p.stock} ${p.stock <= p.stockCritico ? '⚠ STOCK CRÍTICO' : ''}</p>
      <button onclick="agregarAlCarrito(${p.id})">Añadir al carrito ($${p.precio.toLocaleString('es-CL')})</button>
    </div>
  `;
}

// ========= Init =========
document.addEventListener('DOMContentLoaded', () => {
  actualizarContadorCarrito();
  if (document.getElementById('productos-container')) mostrarProductos();
  if (document.getElementById('detalle-producto')) mostrarDetalleProducto();
});

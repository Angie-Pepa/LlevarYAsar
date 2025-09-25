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
    id: 4, nombre: "Entraña 1", descripcion: "Corte tierno y jugoso, ideal para la parrilla.",
    precio: 12990, imagen: "img/entrania1.jpg", stock: 12, stockCritico: 3, categoria: "Entrañas"
  },
  {
    id: 5, nombre: "Entraña 2", descripcion: "Perfecta para un asado familiar, gran sabor.",
    precio: 13490, imagen: "img/entrania2.jpg", stock: 10, stockCritico: 3, categoria: "Entrañas"
  },
  {
    id: 6, nombre: "Entraña 3", descripcion: "Corte premium con marmoleo equilibrado.",
    precio: 13990, imagen: "img/entrania3.jpg", stock: 8, stockCritico: 2, categoria: "Entrañas"
  },

  // Lomo Liso
  {
    id: 7, nombre: "Lomo Liso 1", descripcion: "Clásico corte magro, jugoso al grill.",
    precio: 15990, imagen: "img/lomo-liso1.jpg", stock: 15, stockCritico: 4, categoria: "Lomo Liso"
  },
  {
    id: 8, nombre: "Lomo Liso 2", descripcion: "Versátil, perfecto para asar o al sartén.",
    precio: 16490, imagen: "img/lomo-liso2.jpg", stock: 10, stockCritico: 3, categoria: "Lomo Liso"
  },
  {
    id: 9, nombre: "Lomo Liso 3", descripcion: "Textura suave y excelente sabor.",
    precio: 16990, imagen: "img/lomo-liso3.jpg", stock: 7, stockCritico: 2, categoria: "Lomo Liso"
  },

  // Longanizas
  {
    id: 10, nombre: "Longaniza 1", descripcion: "Artesanal con especias tradicionales.",
    precio: 6990, imagen: "img/longaniza1.jpg", stock: 25, stockCritico: 8, categoria: "Longanizas"
  },
  {
    id: 11, nombre: "Longaniza 2", descripcion: "Sabor intenso, perfecta para la parrilla.",
    precio: 7490, imagen: "img/longaniza2.jpg", stock: 20, stockCritico: 6, categoria: "Longanizas"
  },
  {
    id: 12, nombre: "Longaniza 3", descripcion: "Receta casera, ideal para picoteo o sándwich.",
    precio: 7990, imagen: "img/longaniza3.jpg", stock: 18, stockCritico: 5, categoria: "Longanizas"
  },

  // Punta de Ganso
  {
    id: 13, nombre: "Punta de Ganso 1", descripcion: "Tradicional chileno, jugoso y sabroso.",
    precio: 18990, imagen: "img/punta-ganso1.jpg", stock: 12, stockCritico: 3, categoria: "Punta de Ganso"
  },
  {
    id: 14, nombre: "Punta de Ganso 2", descripcion: "Gran sabor y suavidad, especial parrilla.",
    precio: 19490, imagen: "img/punta-ganso2.jpg", stock: 10, stockCritico: 3, categoria: "Punta de Ganso"
  },
  {
    id: 15, nombre: "Punta de Ganso 3", descripcion: "Premium, equilibrio de grasa y carne.",
    precio: 19990, imagen: "img/punta-ganso3.jpg", stock: 9, stockCritico: 2, categoria: "Punta de Ganso"
  },
  {
    id: 16, nombre: "Punta de Ganso 4", descripcion: "Sabor intenso, ideal para asados largos.",
    precio: 20490, imagen: "img/punta-ganso4.jpg", stock: 6, stockCritico: 2, categoria: "Punta de Ganso"
  }
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

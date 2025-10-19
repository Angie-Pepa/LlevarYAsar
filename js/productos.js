// js/productos.js

const productos = [
    {
    id: 1,
    nombre: "Asado de Tira Premium",
    descripcion: "Corte jugoso y bien marmoleado, ideal para asar a la parrilla.",
    precio: 8990,
    imagen: "img/entrania2.jpg",
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
    {
    id: 4,
    nombre: "Entraña ",
    descripcion: "Corte de entraña sabroso y tierno para la parrilla.",
    precio: 11990,
    imagen: "img/entrania1.jpg",
    stock: 12,
    stockCritico: 3,
    categoria: "Entrañas"
    },
    {
    id: 8,
    nombre: "Lomo Liso ",
    descripcion: "Segunda variedad de lomo liso jugoso.",
    precio: 15500,
    imagen: "img/lomo-liso2.jpg",
    stock: 11,
    stockCritico: 3,
    categoria: "Lomo Liso"
    },
    {
    id: 9,
    nombre: "Lomo",
    descripcion: "Lomo liso especial para asados familiares.",
    precio: 16000,
    imagen: "img/punta-ganso4.jpg",
    stock: 10,
    stockCritico: 2,
    categoria: "Lomo Liso"
    },
    {
    id: 10,
    nombre: "Longaniza ",
    descripcion: "Longaniza tradicional para la parrilla.",
    precio: 4990,
    imagen: "img/longaniza2.jpg",
    stock: 20,
    stockCritico: 5,
    categoria: "Embutidos"
    },
    {
    id: 13,
    nombre: "Punta de Ganso 1",
    descripcion: "Punta ganso tierna y jugosa para asados.",
    precio: 13990,
    imagen: "img/punta-ganso2.jpg",
    stock: 10,
    stockCritico: 2,
    categoria: "Punta Ganso"
    },
];


function mostrarProductos() {
  const contenedor = document.getElementById('productos-container');
  contenedor.innerHTML = '';

  productos.forEach(p => {
    const card = document.createElement('article');
    card.classList.add('producto');

    card.innerHTML = `
      <figure class="producto__media">
        <img src="${p.imagen}" alt="${p.nombre}" style="max-width:200px; border-radius:8px;">
      </figure>
      <h3 class="producto__titulo">${p.nombre}</h3>
      <p class="producto__descripcion">${p.descripcion}</p>
      <p class="producto__precio">$${p.precio.toLocaleString('es-CL')}</p>
      <p>Stock: ${p.stock} ${p.stock <= p.stockCritico ? '⚠' : ''}</p>
      <button class="producto__btn" onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
    `;

    contenedor.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', mostrarProductos);
// js/productos.js
<<<<<<< HEAD
const productos = [
  {
=======

const productos = [
    {
>>>>>>> d1c7fad31143824a861650f648891f9dac06132e
    id: 1,
    nombre: "Asado de Tira Premium",
    descripcion: "Corte jugoso y bien marmoleado, ideal para asar a la parrilla.",
    precio: 8990,
    imagen: "img/entrania2.jpg",
    stock: 15,
    stockCritico: 3,
    categoria: "Cortes Premium"
<<<<<<< HEAD
  },
  {
=======
    },
    {
>>>>>>> d1c7fad31143824a861650f648891f9dac06132e
    id: 2,
    nombre: "Chorizos Artesanales x6",
    descripcion: "Elaborados con carne de cerdo y especias naturales. ¡Irresistibles!",
    precio: 3990,
    imagen: "img/chorizos.jpg",
    stock: 30,
    stockCritico: 10,
    categoria: "Embutidos"
<<<<<<< HEAD
  },
  {
=======
    },
    {
>>>>>>> d1c7fad31143824a861650f648891f9dac06132e
    id: 3,
    nombre: "Parrillada Familiar",
    descripcion: "Combo para 4 personas: asado, chorizos y ensaladas.",
    precio: 24990,
    imagen: "img/parrillada.jpg",
    stock: 8,
    stockCritico: 2,
    categoria: "Combos"
<<<<<<< HEAD
  },
  {
    id: 4,
    nombre: "Entraña",
=======
    },
    {
    id: 4,
    nombre: "Entraña ",
>>>>>>> d1c7fad31143824a861650f648891f9dac06132e
    descripcion: "Corte de entraña sabroso y tierno para la parrilla.",
    precio: 11990,
    imagen: "img/entrania1.jpg",
    stock: 12,
    stockCritico: 3,
    categoria: "Entrañas"
<<<<<<< HEAD
  },
  {
    id: 5,
    nombre: "Lomo Liso",
=======
    },
    {
    id: 8,
    nombre: "Lomo Liso ",
>>>>>>> d1c7fad31143824a861650f648891f9dac06132e
    descripcion: "Segunda variedad de lomo liso jugoso.",
    precio: 15500,
    imagen: "img/lomo-liso2.jpg",
    stock: 11,
    stockCritico: 3,
    categoria: "Lomo Liso"
<<<<<<< HEAD
  },
  {
    id: 6,
=======
    },
    {
    id: 9,
>>>>>>> d1c7fad31143824a861650f648891f9dac06132e
    nombre: "Lomo",
    descripcion: "Lomo liso especial para asados familiares.",
    precio: 16000,
    imagen: "img/punta-ganso4.jpg",
    stock: 10,
    stockCritico: 2,
    categoria: "Lomo Liso"
<<<<<<< HEAD
  },
  {
    id: 7,
    nombre: "Longaniza",
=======
    },
    {
    id: 10,
    nombre: "Longaniza ",
>>>>>>> d1c7fad31143824a861650f648891f9dac06132e
    descripcion: "Longaniza tradicional para la parrilla.",
    precio: 4990,
    imagen: "img/longaniza2.jpg",
    stock: 20,
    stockCritico: 5,
    categoria: "Embutidos"
<<<<<<< HEAD
  },
  {
    id: 8,
    nombre: "Punta de Ganso",
=======
    },
    {
    id: 13,
    nombre: "Punta de Ganso 1",
>>>>>>> d1c7fad31143824a861650f648891f9dac06132e
    descripcion: "Punta ganso tierna y jugosa para asados.",
    precio: 13990,
    imagen: "img/punta-ganso2.jpg",
    stock: 10,
    stockCritico: 2,
    categoria: "Punta Ganso"
<<<<<<< HEAD
  }
];


function mostrarProductos() {
  const contenedor = document.getElementById('productos-container');
  if (!contenedor) return;

  contenedor.innerHTML = '';

  productos.forEach(p => {
    const card = document.createElement('article');
    card.classList.add('producto');

    card.innerHTML = `
      <figure class="producto__media">
        <img src="${p.imagen}" alt="${p.nombre}">
      </figure>
      <div class="producto__info">
        <h3 class="producto__titulo">${p.nombre}</h3>
        <p class="producto__descripcion">${p.descripcion}</p>
        <p class="producto__precio">$${p.precio.toLocaleString('es-CL')}</p>
        <p>Stock: ${p.stock} ${p.stock <= p.stockCritico ? '⚠' : ''}</p>
        <button class="producto__btn" onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
      </div>
    `;

    contenedor.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', mostrarProductos);
=======
    },
];
>>>>>>> d1c7fad31143824a861650f648891f9dac06132e

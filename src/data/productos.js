export const productos = [
    {
    id: 1,
    nombre: "Asado de Tira Premium",
    descripcion: "Corte jugoso y bien marmoleado, ideal para asar a la parrilla.",
    precio: 8990,
    imagen: new URL('../assets/image/entrania2.jpg', import.meta.url).href,
    stock: 15,
    stockCritico: 3,
    categoria: "Cortes Premium"
    },
    {
    id: 2,
    nombre: "Chorizos Artesanales x6",
    descripcion: "Elaborados con carne de cerdo y especias naturales. ¡Irresistibles!",
    precio: 3990,
    imagen: new URL('../assets/image/chorizos.jpg', import.meta.url).href,
    stock: 30,
    stockCritico: 10,
    categoria: "Embutidos"
    },
    {
    id: 3,
    nombre: "Parrillada Familiar",
    descripcion: "Combo para 4 personas: asado, chorizos y ensaladas.",
    precio: 24990,
    imagen: new URL('../assets/image/parrillada.jpg', import.meta.url).href,
    stock: 8,
    stockCritico: 2,
    categoria: "Combos"
    },
    {
    id: 4,
    nombre: "Entraña",
    descripcion: "Corte de entraña sabroso y tierno para la parrilla.",
    precio: 11990,
    imagen: new URL('../assets/image/entrania1.jpg', import.meta.url).href,
    stock: 12,
    stockCritico: 3,
    categoria: "Entrañas"
    },
    {
    id: 5,
    nombre: "Lomo Liso",
    descripcion: "Segunda variedad de lomo liso jugoso.",
    precio: 15500,
    imagen: new URL('../assets/image/lomo-liso2.jpg', import.meta.url).href,
    stock: 11,
    stockCritico: 3,
    categoria: "Lomo Liso"
    },
    {
    id: 6,
    nombre: "Lomo",
    descripcion: "Lomo liso especial para asados familiares.",
    precio: 16000,
    imagen: new URL('../assets/image/punta-ganso4.jpg', import.meta.url).href,
    stock: 10,
    stockCritico: 2,
    categoria: "Lomo Liso"
    },
    {
    id: 7,
    nombre: "Longaniza",
    descripcion: "Longaniza tradicional para la parrilla.",
    precio: 4990,
    imagen: new URL('../assets/image/longaniza2.jpg', import.meta.url).href,
    stock: 20,
    stockCritico: 5,
    categoria: "Embutidos"
    },
    {
    id: 8,
    nombre: "Punta de Ganso",
    descripcion: "Punta ganso tierna y jugosa para asados.",
    precio: 13990,
    imagen: new URL('../assets/image/punta-ganso2.jpg', import.meta.url).href,
    stock: 10,
    stockCritico: 2,
    categoria: "Punta Ganso"
    }
];
Llevar & Asar – Tienda Online de Productos Cárnicos
Evaluación Parcial 1 – Desarrollo FullStack II
Equipo: Pablo Ignacio García Mondaca, [Nombre del otro integrante]

Descripción del Proyecto
Desarrollo de la tienda pública de una tienda online de productos cárnicos, utilizando únicamente tecnologías frontend: HTML5, CSS3 y JavaScript. Este proyecto cumple con los requisitos de la Evaluación Parcial 1 y sienta las bases para futuras integraciones (panel de administración, base de datos).

Páginas Desarrolladas
Home: Página principal con menú, banner, listado de productos y carrito.
Productos: Listado dinámico de productos (asado, pollo, chorizos, parrillada).
Detalle de Producto: Vista individual de cada producto.
Nosotros: Información sobre la empresa y el equipo de desarrollo.
Blogs: Listado de 2 artículos con recetas y consejos.
Detalle de Blog: Contenido completo de cada blog.
Contacto: Formulario con validaciones.
Login: Inicio de sesión con validación de email y contraseña.
Registro: Registro de usuario con validación de RUT, email, región/comuna y dirección.
Funcionalidades Implementadas
HTML5 Semántico: Uso de <header>, <nav>, <main>, <section>, <footer>.
CSS Externo: Diseño consistente, responsivo y atractivo en todas las páginas.
Validaciones en JavaScript:
Registro: RUT válido (sin puntos/guion, 7–9 caracteres, dígito verificador).
Login/Contacto: Solo emails de @duoc.cl, @profesor.duoc.cl o @gmail.com.
Formularios: Mensajes de error personalizados y en contexto.
Carrito de Compras:
Productos cargados desde un array en JavaScript.
Añadir productos al carrito.
Persistencia mediante localStorage.
Navegación Fluida: Todos los enlaces funcionan y conectan las páginas correctamente.
Herramientas Utilizadas
Lenguajes: HTML5, CSS3, JavaScript (ES6)
Editor: Visual Studio Code
Servidor Local: Live Server (extensión de VS Code)
Control de Versiones: Git + GitHub
Trabajo Colaborativo
Repositorio público en GitHub con commits descriptivos.
Distribución equitativa de tareas:
Integrante 1: Estructura HTML, navegación, páginas Home, Productos, Nosotros, Blogs.
Integrante 2: Diseño CSS, validaciones JavaScript, formularios, carrito de compras.
Revisión mutua del código antes de cada entrega.
Estructura del Proyecto
llevar-y-asar/
├── index.html
├── productos.html
├── detalle-producto.html
├── nosotros.html
├── blogs.html
├── detalle-blog.html
├── contacto.html
├── login.html
├── registro.html
├── css/
│ └── styles.css
├── js/
│ └── script.js
└── img/
├── asado.jpg
├── pollo.jpg
├── chorizos.jpg
├── parrillada.jpg
├── blog1.jpg
└── blog2.jpg


Este README resume los alcances y funcionalidads del proyecto
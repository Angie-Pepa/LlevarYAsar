
// Validar RUT 
function validarRut(rut) {
    rut = rut.replace(/\./g, '').replace('-', '');
    if (rut.length < 7 || rut.length > 9) return false;
    
    let cuerpo = rut.slice(0, -1);
    let dv = rut.slice(-1).toUpperCase();
    if (cuerpo.length < 7) return false;
    
    let suma = 0;
    let multiplo = 2;
    for (let i = 1; i <= cuerpo.length; i++) {
        let index = cuerpo.length - i;
        let digito = parseInt(cuerpo.charAt(index), 10);
        if (isNaN(digito)) return false;
        suma += digito * multiplo;
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }
    
    let dvEsperado = 11 - (suma % 11);
    dvEsperado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
    return dv === dvEsperado;
}

// Validar dominios de correo permitidos
function validarDominioCorreo(email) {
    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
    return dominiosPermitidos.some(dominio => email.endsWith(dominio));
}

// Mostrar mensaje de error
function mostrarError(campo, mensaje) {
    const contenedor = campo.parentElement;
    let errorDiv = contenedor.querySelector('.error');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        contenedor.appendChild(errorDiv);
    }
    errorDiv.textContent = mensaje;
    campo.classList.add('error-field');
}

// Limpiar mensaje de error
function limpiarError(campo) {
    const contenedor = campo.parentElement;
    const errorDiv = contenedor.querySelector('.error');
    if (errorDiv) errorDiv.remove();
    campo.classList.remove('error-field');
}

// Validar formulario de registro / nuevo usuario
function validarFormularioUsuario(form) {
    let valido = true;
    
    const rut = form.querySelector('input[name="run"]');
    if (rut) {
        if (!rut.value.trim()) {
            mostrarError(rut, '❌ El RUT es obligatorio');
            valido = false;
        } else if (rut.value.length < 7 || rut.value.length > 9) {
            mostrarError(rut, '❌ El RUT debe tener entre 7 y 9 caracteres');
            valido = false;
        } else if (!validarRut(rut.value)) {
            mostrarError(rut, '❌ RUT inválido');
            valido = false;
        } else {
            limpiarError(rut);
        }
    }
    
    const nombre = form.querySelector('input[name="nombre"]');
    if (nombre && (!nombre.value.trim() || nombre.value.length > 50)) {
        mostrarError(nombre, '❌ Nombre obligatorio, máximo 50 caracteres');
        valido = false;
    } else if (nombre) {
        limpiarError(nombre);
    }
    
    const apellidos = form.querySelector('input[name="apellidos"]');
    if (apellidos && (!apellidos.value.trim() || apellidos.value.length > 100)) {
        mostrarError(apellidos, '❌ Apellidos obligatorios, máximo 100 caracteres');
        valido = false;
    } else if (apellidos) {
        limpiarError(apellidos);
    }
    
    const email = form.querySelector('input[name="email"]');
    if (email) {
        if (!email.value.trim()) {
            mostrarError(email, '❌ El correo es obligatorio');
            valido = false;
        } else if (email.value.length > 100) {
            mostrarError(email, '❌ Máximo 100 caracteres');
            valido = false;
        } else if (!validarDominioCorreo(email.value)) {
            mostrarError(email, '❌ Solo correos @duoc.cl, @profesor.duoc.cl o @gmail.com');
            valido = false;
        } else {
            limpiarError(email);
        }
    }
    
    const direccion = form.querySelector('input[name="direccion"]');
    if (direccion && (!direccion.value.trim() || direccion.value.length > 300)) {
        mostrarError(direccion, '❌ Dirección obligatoria, máximo 300 caracteres');
        valido = false;
    } else if (direccion) {
        limpiarError(direccion);
    }
    
    return valido;
}

// Validar formulario de login
function validarFormularioLogin(form) {
    let valido = true;
    
    const email = form.querySelector('input[name="email"]');
    if (!email.value.trim() || email.value.length > 100) {
        mostrarError(email, '❌ Correo obligatorio, máximo 100 caracteres');
        valido = false;
    } else if (!validarDominioCorreo(email.value)) {
        mostrarError(email, '❌ Solo dominios @duoc.cl, @profesor.duoc.cl, @gmail.com');
        valido = false;
    } else {
        limpiarError(email);
    }
    
    const password = form.querySelector('input[name="password"]');
    if (!password.value.trim() || password.value.length < 4 || password.value.length > 10) {
        mostrarError(password, '❌ Contraseña entre 4 y 10 caracteres');
        valido = false;
    } else {
        limpiarError(password);
    }
    
    return valido;
}

// Validar formulario de contacto
function validarFormularioContacto(form) {
    let valido = true;
    
    const nombre = form.querySelector('input[name="nombre"]');
    if (!nombre.value.trim() || nombre.value.length > 100) {
        mostrarError(nombre, '❌ Nombre obligatorio, máximo 100 caracteres');
        valido = false;
    } else {
        limpiarError(nombre);
    }
    
    const email = form.querySelector('input[name="email"]');
    if (email.value && email.value.length > 100) {
        mostrarError(email, '❌ Máximo 100 caracteres');
        valido = false;
    } else if (email.value && !validarDominioCorreo(email.value)) {
        mostrarError(email, '❌ Solo dominios permitidos');
        valido = false;
    } else {
        limpiarError(email);
    }
    
    const comentario = form.querySelector('textarea[name="comentario"]');
    if (!comentario.value.trim() || comentario.value.length > 500) {
        mostrarError(comentario, '❌ Comentario obligatorio, máximo 500 caracteres');
        valido = false;
    } else {
        limpiarError(comentario);
    }
    
    return valido;
}

// Selects dinámicos de Región/Comuna
const regionesYComunas = {
    "Región Metropolitana": ["Santiago", "Providencia", "Las Condes", "Ñuñoa", "Maipú", "La Florida", "Puente Alto"],
    "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "San Antonio"],
    "Biobío": ["Concepción", "Talcahuano", "Los Ángeles", "Chillán", "Coronel"]
};

function cargarRegiones() {
    const selectRegion = document.querySelector('select[name="region"]');
    const selectComuna = document.querySelector('select[name="comuna"]');
    if (!selectRegion || !selectComuna) return;
    
    Object.keys(regionesYComunas).forEach(region => {
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        selectRegion.appendChild(option);
    });
    
    selectRegion.addEventListener('change', function() {
        selectComuna.innerHTML = '<option value="">Seleccione una comuna</option>';
        if (this.value) {
            regionesYComunas[this.value].forEach(comuna => {
                const option = document.createElement('option');
                option.value = comuna;
                option.textContent = comuna;
                selectComuna.appendChild(option);
            });
        }
    });
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    cargarRegiones();
    
    // Validar formularios al enviar
    const formUsuario = document.querySelector('form#form-usuario');
    if (formUsuario) {
        formUsuario.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validarFormularioUsuario(this)) {
                alert('✅ Registro completado exitosamente');
                // Aquí podrías redirigir o guardar datos
            }
        });
    }
    
    const formLogin = document.querySelector('form#form-login');
    if (formLogin) {
        formLogin.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validarFormularioLogin(this)) {
                alert('✅ ¡Bienvenido a Llevar & Asar!');
                window.location.href = 'index.html';
            }
        });
    }
    
    const formContacto = document.querySelector('form#form-contacto');
    if (formContacto) {
        formContacto.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validarFormularioContacto(this)) {
                alert('✅ Mensaje enviado. Nos contactaremos contigo pronto.');
                this.reset();
            }
           });
    }
});


// ==========================
// Inicialización del carrito
// ==========================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// ==========================
// Funciones del carrito
// ==========================
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto) return;

  const item = carrito.find(p => p.id === id);
  if (item) {
    item.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  renderCarrito();
}

function quitarDelCarrito(id) {
  const item = carrito.find(p => p.id === id);
  if (item) {
    item.cantidad--;
    if (item.cantidad === 0) {
      carrito = carrito.filter(p => p.id !== id);
    }
  }
  renderCarrito();
}

function vaciarCarrito() {
  carrito = [];
  localStorage.removeItem("carrito");
  renderCarrito();
}

function finalizarCompra() {
  if (carrito.length === 0) {
    alert("⚠ Tu carrito está vacío. Agrega productos antes de finalizar la compra.");
    return;
  }

  // Guardamos un mensaje en localStorage para mostrarlo en la siguiente página
  localStorage.setItem("mensajeCompra", "✅ ¡Gracias por tu compra! Tu pedido ha sido procesado con éxito.");

  // Vaciar carrito después de la compra
  carrito = [];
  localStorage.removeItem("carrito");
  renderCarrito();

  // Redirigir al usuario
  window.location.href = "index.html"; 
}

// ==========================
// Renderizado del carrito
// ==========================
function renderCarrito() {
  // Guardar carrito en localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));

  // Actualizar numerito del ícono 🛒
  const contador = document.querySelector(".cart-count");
  if (contador) {
    const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    contador.textContent = totalItems;
  }

  // Si estamos en carrito.html, actualizar la tabla
  renderCarritoDetalle();
}

function renderCarritoDetalle() {
  const lista = document.getElementById("carrito-lista");
  const totalEl = document.getElementById("carrito-total");
  if (!lista || !totalEl) return; // seguridad si no estamos en carrito.html

  lista.innerHTML = "";
  let total = 0;

  carrito.forEach(p => {
    const fila = document.createElement("tr");
    const subtotal = p.precio * p.cantidad;
    total += subtotal;

    fila.innerHTML = `
      <td>${p.nombre}</td>
      <td>$${p.precio.toLocaleString('es-CL')}</td>
      <td>${p.cantidad}</td>
      <td>$${subtotal.toLocaleString('es-CL')}</td>
      <td><button onclick="quitarDelCarrito(${p.id})">Quitar</button></td>
    `;

    lista.appendChild(fila);
  });

  totalEl.textContent = total.toLocaleString('es-CL');
}

// ==========================
// Renderizado de productos
// ==========================
function mostrarProductos() {
  const contenedor = document.getElementById('productos-container');
  if (!contenedor) return; // seguridad por si no existe el div en otra página

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

// ==========================
// Inicialización al cargar
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos();   // si estamos en productos.html
  renderCarrito();      // siempre actualiza el numerito y carrito.html

  // Activar botones en carrito.html
  const btnVaciar = document.getElementById("vaciar-carrito");
  if (btnVaciar) {
    btnVaciar.addEventListener("click", vaciarCarrito);
  }

  const btnFinalizar = document.getElementById("finalizar-compra");
  if (btnFinalizar) {
    btnFinalizar.addEventListener("click", finalizarCompra);
  }

  // Mostrar mensaje de compra si existe
  const mensaje = localStorage.getItem("mensajeCompra");
  if (mensaje) {
    const banner = document.getElementById("mensaje-banner");
    const texto = document.getElementById("mensaje-texto");
    const cerrar = document.getElementById("cerrar-banner");

    if (banner && texto && cerrar) {
      texto.textContent = mensaje;
      banner.style.display = "flex";

      cerrar.addEventListener("click", () => {
        banner.style.display = "none";
      });

      // Ocultar automáticamente después de 5 segundos
      setTimeout(() => {
        banner.style.display = "none";
      }, 5000);
    } else {
      alert(mensaje); // fallback si no existe el banner
    }

    localStorage.removeItem("mensajeCompra"); // limpiar para que no se repita
  }
});
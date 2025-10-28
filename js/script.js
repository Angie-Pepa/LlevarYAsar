// ===== utilidades de validación =====
function validarRut(rut) {
  rut = rut.replace(/\./g, '').replace('-', '');
  if (rut.length < 7 || rut.length > 9) return false;

  const cuerpo = rut.slice(0, -1);
  let dv = rut.slice(-1).toUpperCase();
  if (cuerpo.length < 7) return false;

  let suma = 0, multiplo = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    const digito = parseInt(cuerpo.charAt(i), 10);
    if (isNaN(digito)) return false;
    suma += digito * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }

  let dvEsperado = 11 - (suma % 11);
  dvEsperado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : String(dvEsperado);
  return dv === dvEsperado;
}

function validarDominioCorreo(email) {
  const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
  return dominiosPermitidos.some(d => email.toLowerCase().endsWith(d));
}

function mostrarError(campo, mensaje) {
  const cont = campo.parentElement;
  let errorDiv = cont.querySelector('.error');
  if (!errorDiv) {
    errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    cont.appendChild(errorDiv);
  }
  errorDiv.textContent = mensaje;
  campo.classList.add('error-field');
}

function limpiarError(campo) {
  const cont = campo.parentElement;
  const errorDiv = cont.querySelector('.error');
  if (errorDiv) errorDiv.remove();
  campo.classList.remove('error-field');
}

// ===== validación de formularios =====
function validarFormularioUsuario(form) {
  let ok = true;
  const rut = form.querySelector('input[name="run"]');
  if (rut) {
    if (!rut.value.trim()) { mostrarError(rut, '❌ El RUT es obligatorio'); ok = false; }
    else if (rut.value.length < 7 || rut.value.length > 9) { mostrarError(rut, '❌ El RUT debe tener entre 7 y 9 caracteres'); ok = false; }
    else if (!validarRut(rut.value)) { mostrarError(rut, '❌ RUT inválido'); ok = false; }
    else limpiarError(rut);
  }

  const nombre = form.querySelector('input[name="nombre"]');
  if (nombre) {
    if (!nombre.value.trim() || nombre.value.length > 50) { mostrarError(nombre, '❌ Nombre obligatorio, máximo 50 caracteres'); ok = false; }
    else limpiarError(nombre);
  }

  const apellidos = form.querySelector('input[name="apellidos"]');
  if (apellidos) {
    if (!apellidos.value.trim() || apellidos.value.length > 100) { mostrarError(apellidos, '❌ Apellidos obligatorios, máximo 100 caracteres'); ok = false; }
    else limpiarError(apellidos);
  }

  const email = form.querySelector('input[name="email"]');
  if (email) {
    if (!email.value.trim()) { mostrarError(email, '❌ El correo es obligatorio'); ok = false; }
    else if (email.value.length > 100) { mostrarError(email, '❌ Máximo 100 caracteres'); ok = false; }
    else if (!validarDominioCorreo(email.value)) { mostrarError(email, '❌ Solo correos @duoc.cl, @profesor.duoc.cl o @gmail.com'); ok = false; }
    else limpiarError(email);
  }

  const direccion = form.querySelector('input[name="direccion"]');
  if (direccion) {
    if (!direccion.value.trim() || direccion.value.length > 300) { mostrarError(direccion, '❌ Dirección obligatoria, máximo 300 caracteres'); ok = false; }
    else limpiarError(direccion);
  }

  return ok;
}

function validarFormularioLogin(form) {
  let ok = true;
  const email = form.querySelector('input[name="email"]');
  if (!email.value.trim() || email.value.length > 100) { mostrarError(email, '❌ Correo obligatorio, máximo 100 caracteres'); ok = false; }
  else if (!validarDominioCorreo(email.value)) { mostrarError(email, '❌ Solo dominios @duoc.cl, @profesor.duoc.cl, @gmail.com'); ok = false; }
  else limpiarError(email);

  const password = form.querySelector('input[name="password"]');
  if (!password.value.trim() || password.value.length < 4 || password.value.length > 10) { mostrarError(password, '❌ Contraseña entre 4 y 10 caracteres'); ok = false; }
  else limpiarError(password);

  return ok;
}

function validarFormularioContacto(form) {
  let ok = true;
  const nombre = form.querySelector('input[name="nombre"]');
  if (!nombre.value.trim() || nombre.value.length > 100) { mostrarError(nombre, '❌ Nombre obligatorio, máximo 100 caracteres'); ok = false; }
  else limpiarError(nombre);

  const email = form.querySelector('input[name="email"]');
  if (email.value && email.value.length > 100) { mostrarError(email, '❌ Máximo 100 caracteres'); ok = false; }
  else if (email.value && !validarDominioCorreo(email.value)) { mostrarError(email, '❌ Solo dominios permitidos'); ok = false; }
  else limpiarError(email);

  const comentario = form.querySelector('textarea[name="comentario"]');
  if (!comentario.value.trim() || comentario.value.length > 500) { mostrarError(comentario, '❌ Comentario obligatorio, máximo 500 caracteres'); ok = false; }
  else limpiarError(comentario);

  return ok;
}

// ===== regiones / comunas =====
const regionesYComunas = {
  "Región Metropolitana": ["Santiago","Providencia","Las Condes","Ñuñoa","Maipú","La Florida","Puente Alto"],
  "Valparaíso": ["Valparaíso","Viña del Mar","Quilpué","Villa Alemana","San Antonio"],
  "Biobío": ["Concepción","Talcahuano","Los Ángeles","Chillán","Coronel"]
};

function cargarRegiones() {
  const selectRegion = document.querySelector('select[name="region"]');
  const selectComuna = document.querySelector('select[name="comuna"]');
  if (!selectRegion || !selectComuna) return;

  // opciones de región
  Object.keys(regionesYComunas).forEach(region => {
    const op = document.createElement('option');
    op.value = region; op.textContent = region;
    selectRegion.appendChild(op);
  });

  // al cambiar región, llenar comunas
  selectRegion.addEventListener('change', function() {
    selectComuna.innerHTML = '<option value="">Seleccione una comuna</option>';
    (regionesYComunas[this.value] || []).forEach(com => {
      const op = document.createElement('option');
      op.value = com; op.textContent = com;
      selectComuna.appendChild(op);
    });
  });
}

// ===== carrito =====
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function actualizarContadorCarrito() {
  const contador = document.querySelector('.cart-count');
  if (contador) {
    const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    contador.textContent = totalItems;
  }
}

function agregarAlCarrito(id) {
  // requiere que "productos" esté cargado previamente
  const producto = (typeof productos !== 'undefined') ? productos.find(p => p.id === id) : null;
  if (!producto) return;

  const item = carrito.find(p => p.id === id);
  if (item) item.cantidad++;
  else carrito.push({ ...producto, cantidad: 1 });

  guardarCarrito();
  renderCarrito();
}

function quitarDelCarrito(id) {
  const item = carrito.find(p => p.id === id);
  if (item) {
    item.cantidad--;
    if (item.cantidad <= 0) carrito = carrito.filter(p => p.id !== id);
    guardarCarrito();
    renderCarrito();
  }
}

function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
  renderCarrito();
}

function finalizarCompra() {
  if (carrito.length === 0) {
    alert('⚠ Tu carrito está vacío. Agrega productos antes de finalizar la compra.');
    return;
  }
  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  localStorage.setItem('totalCompra', total);
  window.location.href = 'pago.html';
}

function renderCarritoDetalle() {
  const lista = document.getElementById('carrito-lista');
  const totalEl = document.getElementById('carrito-total');
  if (!lista || !totalEl) return;

  lista.innerHTML = '';
  let total = 0;

  carrito.forEach(p => {
    const fila = document.createElement('tr');
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

function renderCheckout() {
  const lista = document.getElementById('checkout-lista');
  const totalEl = document.getElementById('total-pago');
  if (!lista || !totalEl) return;

  lista.innerHTML = '';
  let total = 0;

  carrito.forEach(p => {
    const fila = document.createElement('tr');
    const subtotal = p.precio * p.cantidad;
    total += subtotal;
    fila.innerHTML = `
      <td>${p.nombre}</td>
      <td>$${p.precio.toLocaleString('es-CL')}</td>
      <td>${p.cantidad}</td>
      <td>$${subtotal.toLocaleString('es-CL')}</td>
    `;
    lista.appendChild(fila);
  });

  totalEl.textContent = total.toLocaleString('es-CL');
}

function renderCarrito() {
  guardarCarrito();
  actualizarContadorCarrito();
  renderCarritoDetalle(); // si estamos en carrito.html
}

// ===== render de productos (catálogo) =====
function mostrarProductos() {
  const contenedor = document.getElementById('productos-container');
  if (!contenedor || typeof productos === 'undefined') return;

  contenedor.innerHTML = '';
  productos.forEach(p => {
    const card = document.createElement('article');
    card.classList.add('producto');
    card.innerHTML = `
      <div class="producto__contenido">
        <figure class="producto__media">
          <img src="${p.imagen}" alt="${p.nombre}">
        </figure>
        <div class="producto__info">
          <span class="producto__categoria">${p.categoria}</span>
          <h3 class="producto__titulo">${p.nombre}</h3>
          <p class="producto__descripcion">${p.descripcion}</p>
          <p class="producto__precio">$${p.precio.toLocaleString('es-CL')}</p>
          <p>Stock: ${p.stock} ${p.stock <= p.stockCritico ? '⚠' : ''}</p>
          <button class="producto__btn" onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
        </div>
      </div>
    `;
    contenedor.appendChild(card);
  });
}

// ===== arranque único =====
document.addEventListener('DOMContentLoaded', () => {
  // regiones/comunas
  cargarRegiones();

  // formularios
  const formUsuario = document.querySelector('form#form-usuario');
  if (formUsuario) {
    formUsuario.addEventListener('submit', e => {
      e.preventDefault();
      if (validarFormularioUsuario(formUsuario)) {
        alert('✅ Registro completado exitosamente');
        // redirigir / guardar si corresponde
      }
    });
  }

  const formLogin = document.querySelector('form#form-login');
  if (formLogin) {
    formLogin.addEventListener('submit', e => {
      e.preventDefault();
      if (validarFormularioLogin(formLogin)) {
        alert('✅ ¡Bienvenido a Llevar & Asar!');
        window.location.href = 'index.html';
      }
    });
  }

  const formContacto = document.querySelector('form#form-contacto');
  if (formContacto) {
    formContacto.addEventListener('submit', e => {
      e.preventDefault();
      if (validarFormularioContacto(formContacto)) {
        alert('✅ Mensaje enviado. Nos contactaremos contigo pronto.');
        formContacto.reset();
      }
    });
  }

  // catálogo (solo si existe contenedor y productos)
  mostrarProductos();

  // carrito (contador y vista)
  renderCarrito();

  // botones de carrito (si estamos en carrito.html)
  const btnVaciar = document.getElementById('vaciar-carrito');
  if (btnVaciar) btnVaciar.addEventListener('click', vaciarCarrito);

  const btnFinalizar = document.getElementById('finalizar-compra');
  if (btnFinalizar) btnFinalizar.addEventListener('click', finalizarCompra);

  // checkout (checkout.html)
  const formCheckout = document.getElementById('form-checkout');
  if (formCheckout) {
    renderCheckout();
    formCheckout.addEventListener('submit', e => {
      e.preventDefault();
      alert('✅ ¡Compra confirmada! Gracias por tu pedido.');
      carrito = [];
      guardarCarrito();
      renderCarrito();
      window.location.href = 'index.html';
    });
  }

  // pago (pago.html)
  const formPago = document.getElementById('form-pago');
  if (formPago) {
    renderCheckout();
    formPago.addEventListener('submit', e => {
      e.preventDefault();
      alert('✅ Pago realizado con éxito. ¡Gracias por tu compra!');
      carrito = [];
      guardarCarrito();
      renderCarrito();
      window.location.href = 'index.html';
    });
  }

  // invitado en pago.html
  const invitadoCheck = document.getElementById('invitado');
  const usuarioInput = document.getElementById('usuario');
  const passwordInput = document.getElementById('password');
  if (invitadoCheck && usuarioInput && passwordInput) {
    invitadoCheck.addEventListener('change', () => {
      const disabled = invitadoCheck.checked;
      usuarioInput.disabled = disabled;
      passwordInput.disabled = disabled;
      if (disabled) { usuarioInput.value = ''; passwordInput.value = ''; }
    });
  }
});

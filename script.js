
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
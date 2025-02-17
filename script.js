document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const loginLink = document.getElementById("loginLink");
    const registerLink = document.getElementById("registerLink");
    const logoutBtn = document.getElementById("logout");
    const loginPage = document.getElementById("loginPage");
    const registerPage = document.getElementById("registerPage");
    const mainPage = document.getElementById("mainPage");
    const inicioLink = document.getElementById("inicioLink");
    const productosLink = document.getElementById("productosLink");
    const ofertasLink = document.getElementById("ofertasLink");
    const carritoLink = document.getElementById("carritoLink");
    const carritoPage = document.getElementById("carritoPage");
    
    function actualizarCarrito() {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const carritoContenido = carritoPage.querySelector("p");
        
        if (carrito.length === 0) {
            carritoContenido.textContent = "Aún no tienes productos en tu carrito.";
        } else {
            carritoContenido.innerHTML = "<ul>" + carrito.map((item, index) => `
                <li>${item.nombre} - $${item.precio} 
                    <button class='eliminar' data-index='${index}'>Eliminar</button>
                </li>`).join("") + "</ul>";
        }
        
        document.querySelectorAll(".eliminar").forEach(boton => {
            boton.addEventListener("click", function() {
                eliminarDelCarrito(boton.dataset.index);
            });
        });
    }

    function eliminarDelCarrito(index) {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
    }

    document.querySelectorAll(".product button").forEach((boton, index) => {
        boton.addEventListener("click", function() {
            const producto = boton.parentElement;
            const nombre = producto.querySelector("h3").textContent;
            const precio = producto.querySelector("p").textContent.replace("Precio: $", "");
            
            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
            carrito.push({ nombre, precio });
            localStorage.setItem("carrito", JSON.stringify(carrito));
            alert("Producto agregado al carrito");
        });
    });

    carritoLink.addEventListener("click", function() {
        showPage('carritoPage');
        actualizarCarrito();
    });

    // Verificar si hay una sesión activa
    if (localStorage.getItem("loggedUser")) {
        loginPage.style.display = "none";
        mainPage.style.display = "block";
    }

    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        
        const storedUser = JSON.parse(localStorage.getItem(username));
        
        if (storedUser && storedUser.password === password) {
            localStorage.setItem("loggedUser", username);
            loginPage.style.display = "none";
            mainPage.style.display = "block";
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    });

    registerForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const newUsername = document.getElementById("newUsername").value;
        const newPassword = document.getElementById("newPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        
        if (localStorage.getItem(newUsername)) {
            alert("El usuario ya existe");
            return;
        }
        
        if (newPassword !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        
        const userData = { username: newUsername, password: newPassword };
        localStorage.setItem(newUsername, JSON.stringify(userData));
        alert("Registro exitoso. Ahora puedes iniciar sesión");
        registerPage.style.display = "none";
        loginPage.style.display = "block";
    });

    loginLink.addEventListener("click", function() {
        registerPage.style.display = "none";
        loginPage.style.display = "block";
    });

    registerLink.addEventListener("click", function() {
        loginPage.style.display = "none";
        registerPage.style.display = "block";
    });

    logoutBtn.addEventListener("click", function() {
        localStorage.removeItem("loggedUser");
        mainPage.style.display = "none";
        loginPage.style.display = "block";
    });

    function showPage(pageId) {
        document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
        document.getElementById(pageId).style.display = 'block';
    }

    inicioLink.addEventListener("click", function() { showPage('inicioPage'); });
    productosLink.addEventListener("click", function() { showPage('productosPage'); });
    ofertasLink.addEventListener("click", function() { showPage('ofertasPage'); });
    carritoLink.addEventListener("click", function() { showPage('carritoPage'); });
});


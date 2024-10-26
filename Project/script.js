document.addEventListener('DOMContentLoaded', function () {
    // Simulando una base de datos con localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Guardar usuario y contraseña
    function saveUser(username, password) {
        users.push({ username: username, password: password });
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Actualizar contraseña de usuario
    function updateUserPassword(username, newPassword) {
        const userIndex = users.findIndex(user => user.username === username);
        if (userIndex !== -1) {
            users[userIndex].password = newPassword;
            localStorage.setItem('users', JSON.stringify(users));
            return true;
        }
        return false;
    }

    // Función de registro
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const newUsername = document.getElementById('newUsername').value;
            const newPassword = document.getElementById('newPassword').value;

            const userExists = users.some(user => user.username === newUsername);

            if (userExists) {
                alert('El usuario ya existe. Por favor, elige un nombre de usuario diferente.');
            } else {
                saveUser(newUsername, newPassword);
                alert('Registro exitoso. Ahora puedes iniciar sesión.');
                window.location.href = 'login.html';
            }
        });
    }

    // Función de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const user = users.find(user => user.username === username && user.password === password);

            if ((username === 'admin' && password === 'admin') || user) {
                alert('Login exitoso');
                window.location.href = 'home.html'; // Redirigir a la página principal
            } else {
                alert('Usuario o contraseña incorrectos');
            }
        });
    }

    // Función de restablecimiento de contraseña
    const resetForm = document.getElementById('resetForm');
    if (resetForm) {
        resetForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const username = prompt('Introduce tu nombre de usuario');
            const newPassword = prompt('Introduce tu nueva contraseña');

            // Actualizar la contraseña del usuario
            const success = updateUserPassword(username, newPassword);
            if (success) {
                alert(`La contraseña se ha actualizado para el usuario ${username}`);
                window.location.href = 'login.html';
            } else {
                alert('No se encontró el usuario. Por favor, verifica tu nombre de usuario.');
            }
        });
    }
});

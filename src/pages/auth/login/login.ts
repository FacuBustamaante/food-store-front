const login = async () => {
    const emailInput = (document.getElementById('email') as HTMLInputElement).value;
    const passwordInput = (document.getElementById('password') as HTMLInputElement).value;

    if (!emailInput || !passwordInput) {
        console.error('Email and password must not be empty.');
        alert('Por favor, ingresa tu email y contraseña.');
        return;
    }

    try {
        const response = await fetch('http://localhost:8081/api/usuarios/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "mail": emailInput,
                "contrasena": passwordInput
            }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        console.log(data.rol)
        alert('Login exitoso. ¡Bienvenido!');

        localStorage.setItem('userData', JSON.stringify({
            nombre: data.nombre,
            mail: data.mail,
            rol: data.rol
        }));
        
        if(data.rol === 'ADMIN') {
            window.location.href = '/src/pages/admin/adminHome/adminHome.html';
        }else{
            window.location.href = '/src/pages/store/home/home.html';
        }

    } catch (error) {
        console.error('Error during login:', error);
    }
}

const loginButton = document.getElementById('login-button');
loginButton?.addEventListener('click', (event) => {
    event.preventDefault();
    login();
});
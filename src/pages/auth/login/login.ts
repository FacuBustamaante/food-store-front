const login = async () => {
    const emailInput = (document.getElementById('email') as HTMLInputElement).value;
    const passwordInput = (document.getElementById('password') as HTMLInputElement).value;
    const API = import.meta.env.VITE_API_URL;

    if (!emailInput || !passwordInput) {
        console.error('Email and password must not be empty.');
        alert('Por favor, ingresa tu email y contraseña.');
        return;
    }

    try {
        const response = await fetch(`${API}/usuarios/login`, {
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

        localStorage.setItem('userData', JSON.stringify({
            id: data.id,
            nombre: data.nombre,
            mail: data.mail,
            rol: data.rol
        }));
        handleModal(data);

    } catch (error) {
        console.error('Error during login:', error);
    }
}

const loginButton = document.getElementById('login-button');
loginButton?.addEventListener('click', (event) => {
    event.preventDefault();
    login();
});

const handleModal = (data: { rol: string }) => {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'block';
        setTimeout(() => {
            modal.style.display = 'none';
            if(data.rol === 'ADMIN') {
                window.location.href = '/src/pages/admin/adminHome/adminHome.html';
            } else {
                window.location.href = '/src/pages/store/home/home.html';
            }
        }, 3000);
    }
}
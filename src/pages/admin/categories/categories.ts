const API = import.meta.env.VITE_API_URL;
const form = document.getElementById('add-category-form') as HTMLFormElement;

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {
        nombre: formData.get('nombre') as string,
    };

    try {
        console.log(API)
        const response = await fetch(`${API}/categorias`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Error al agregar la categoría');
        }

        alert('Categoría agregada con éxito');
        window.location.href = '/src/pages/admin/adminHome/adminHome.html';
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al agregar la categoría. Por favor, inténtelo de nuevo.');
    }
});
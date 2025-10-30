//Obtener nombre de usuario
export const recuperarNombreUsuario = () => {
    const userDataJSON = localStorage.getItem('userData');

    if (!userDataJSON) {
        console.warn("No se encontraron datos de 'userData' en localStorage.");
        return null; 
    }

    try {
        const userData = JSON.parse(userDataJSON);

        if (userData && userData.nombre) {
            return userData.nombre;
        } else {
            console.warn("La propiedad 'nombre' no existe en los datos de usuario.");
            return null;
        }

    } catch (error) {
        console.error("Error al parsear los datos de sesión de localStorage:", error);
        return null;
    }
}

//Mostrar nombre de usuario en header
const span = document.getElementById('userName');
const nombreUsuario = recuperarNombreUsuario();

if(span && nombreUsuario) {
    span.textContent = nombreUsuario;
}
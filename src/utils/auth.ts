export const checkUser = () => {
    if (!localStorage.getItem('user')) {
        window.location.href = '/src/pages/auth/login/login.html';
    }
}
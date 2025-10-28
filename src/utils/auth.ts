export const checkUser = () => {
    if (!localStorage.getItem('userData')) {
        window.location.href = '/src/pages/auth/login/login.html';
    }
}
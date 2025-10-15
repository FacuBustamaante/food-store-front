import type { UserLogin } from "../../../types/IUser";
import type { Role } from "../../../types/roles";

const loginForm = document.getElementById('login-form') as HTMLFormElement;

const emailInput = document.getElementById('email') as HTMLInputElement;
const roleInput = document.getElementById('role') as HTMLSelectElement;
const passwordInput = document.getElementById('password') as HTMLInputElement;

loginForm.addEventListener('submit', (e: SubmitEvent) => {
    e.preventDefault();

    const email = emailInput.value;
    const role: Role = roleInput.value as Role;
    const password = passwordInput.value;

    if (!email || !password || !role) {
        alert('Please enter both email and password.');
        return;
    } else {

        const userData: UserLogin = {
            email,
            role,
            logged: true
        };

        localStorage.setItem('userData', JSON.stringify(userData));
        console.log(userData);
        window.location.href = '../../store/home/home.html';
    }
}
);
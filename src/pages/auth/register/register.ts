const registerForm = document.getElementById("register-form") as HTMLFormElement;
import type { UserRegister } from "../../../types/IUser";


const nameInput = document.getElementById("name") as HTMLInputElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const passwordInput = document.getElementById("password") as HTMLInputElement;

registerForm.addEventListener("submit", (e: SubmitEvent) => {
    e.preventDefault();

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    const data: UserRegister = {
        name,
        email,
        role: "client",
        logged: true
    };

    console.log(data);
    window.localStorage.setItem("user", JSON.stringify(data));
    window.location.href = "/src/pages/store/home/home.html";
});

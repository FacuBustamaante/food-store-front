const registerForm = document.getElementById("register-form") as HTMLFormElement;
import type { UserRegister, sessionUser } from "../../../types/IUser";

const nameInput = document.getElementById("name") as HTMLInputElement;
const lastNameInput = document.getElementById("lastname") as HTMLInputElement;
const celularInput = document.getElementById("celular") as HTMLInputElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const passwordInput = document.getElementById("password") as HTMLInputElement;

const createNewUser = async (data: UserRegister) => {
    try {
        const response = await fetch("http://localhost:8081/api/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log("User registered successfully:", result);
        window.location.href = "/src/pages/store/home/home.html";
    } catch (error) {
        console.error("Error registering user:", error);
    }
};

registerForm.addEventListener("submit", (e: SubmitEvent) => {
    e.preventDefault();

    const nombre = nameInput.value;
    const apellido = lastNameInput.value;
    const celular = celularInput.value;
    const password = passwordInput.value;
    const mail = emailInput.value;

    const sessionData: sessionUser = {
        mail,
        nombre,
        role: "USUARIO"
    }

    const data: UserRegister = {
        nombre,
        apellido,
        celular: Number(celular),
        contrasena: password,
        mail: emailInput.value,
        role: "USUARIO",
    };
    createNewUser(data);
    window.localStorage.setItem("userData", JSON.stringify(sessionData));
});

// src/utils/api.ts

const API_BASE = "http://localhost:8080"; // Hay que cambiarlo si el backend corre en otro puerto o URL

// Helper GET genérico
export async function apiGet<T>(endpoint: string): Promise<T> {
  const token = localStorage.getItem("token"); // si usamos auth
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    throw new Error(`Error GET ${endpoint}: ${res.statusText}`);
  }

  return await res.json();
}

// Helper PUT genérico
export async function apiPut<T = unknown>(endpoint: string, data: any): Promise<T> {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Error PUT ${endpoint}: ${res.statusText}`);
  }

  return await res.json();
}

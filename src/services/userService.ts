import type { User } from "../interfaces/User";

const API_BASE = "http://localhost:8080/api";

function getToken() {
  return sessionStorage.getItem("token");
}

export async function getUsers(): Promise<User[]> {
  const token = getToken();

  const response = await fetch(`${API_BASE}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "No se pudieron cargar los usuarios");
  }

  return response.json();
}

export async function getUserById(id: string): Promise<User> {
  const token = getToken();

  const response = await fetch(`${API_BASE}/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "No se pudo cargar el usuario");
  }

  return response.json();
}

export async function createUser(user: User): Promise<User> {
  const token = getToken();

  const response = await fetch(`${API_BASE}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "No se pudo crear el usuario");
  }

  return response.json();
}

export async function updateUser(user: User): Promise<void> {
  const token = getToken();

  const response = await fetch(`${API_BASE}/users/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "No se pudo actualizar el usuario");
  }
}

export async function deleteUser(id: string): Promise<void> {
  const token = getToken();

  const response = await fetch(`${API_BASE}/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "No se pudo eliminar el usuario");
  }
}

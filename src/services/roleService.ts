import type { Role } from "../interfaces/Role";
import type { Permissions } from "../interfaces/Permissions";

const API_BASE = "http://localhost:8080/api";

function getToken() {
  return sessionStorage.getItem("token");
}

export async function getRoles(): Promise<Role[]> {
  const token = getToken();

  const response = await fetch(`${API_BASE}/roles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "No se pudieron cargar los roles");
  }

  return response.json();
}

export async function getRoleById(id: string): Promise<Role> {
  const token = getToken();

  const response = await fetch(`${API_BASE}/roles/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "No se pudo cargar el rol");
  }

  return response.json();
}

export async function createRole(roleData: {
  name: string;
  description: string;
  permissions: Role["permissions"];
}): Promise<Role> {
  const token = getToken();

  const response = await fetch(`${API_BASE}/roles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(roleData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "No se pudo crear el rol");
  }

  return response.json();
}

export async function updateRole(role: Role): Promise<void> {
  const token = getToken();

  const response = await fetch(`${API_BASE}/roles/${role.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(role),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "No se pudo actualizar el rol");
  }
}

export async function deleteRole(id: string): Promise<void> {
  const token = getToken();

  const response = await fetch(`${API_BASE}/roles/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "No se pudo eliminar el rol");
  }
}

export async function getAllPermissions(): Promise<Permissions[]> {
  const token = getToken();

  const response = await fetch(`${API_BASE}/permissions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "No se pudieron cargar los permisos");
  }

  return response.json();
}

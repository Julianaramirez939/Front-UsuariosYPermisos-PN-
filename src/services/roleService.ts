
export interface Role {
  id: number;
  name: string;
  description: string;
}

export async function getRoles(): Promise<Role[]> {
  const response = await fetch("http://localhost:8080/api/roles", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Si usas auth token, aquí lo agregarías, ejemplo:
      // "Authorization": `Bearer ${token}`
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "No se pudieron cargar los roles");
  }

  return response.json();
}

export async function loginUser(data: {
  username: string;
  password: string;
}) {
  const response = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "No se pudo iniciar sesión");
  }

  const result = await response.json();

  // Guardar token en sessionStorage
  if (result.token) {
    sessionStorage.setItem("token", result.token);
  }

  return result;
}

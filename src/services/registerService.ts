
export async function registerUser(data: {
  username: string;
  email: string;
  password: string;
}) {
  const response = await fetch('http://localhost:8080/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'No se pudo registrar');
  }

  return response.json();
}

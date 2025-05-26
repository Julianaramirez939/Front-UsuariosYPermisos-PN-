// ...otros imports
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/loginService";
import Swal from "sweetalert2";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // 👈 Nuevo estado

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      username: "",
      password: "",
    };

    if (!formData.username.trim())
      newErrors.username = "El usuario es obligatorio";
    if (!formData.password.trim())
      newErrors.password = "La contraseña es obligatoria";

    if (newErrors.username || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    try {
      await loginUser({
        username: formData.username,
        password: formData.password,
      });

      Swal.fire({
        icon: "success",
        title: "Inicio de sesión exitoso",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/Dashboard");
      }, 2000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Error al iniciar sesión",
          text: "El usuario o la contraseña no coinciden",
        });
      }
    }
  };

  return (
    <div className="login-container">
      <img src="/logocue.png" alt="Logo" className="login-logo" />
      <h2 className="login-title">Gestión de Horarios Humboldt - Ing Soft</h2>

      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="username" className="login-label">
            Usuario
          </label>
          <input
            type="text"
            id="username"
            className={`login-input ${errors.username ? "input-error" : ""}`}
            value={formData.username}
            onChange={handleChange}
            aria-describedby="username-error"
          />
          {errors.username && (
            <p id="username-error" className="error-message">
              {errors.username}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="login-label">
            Contraseña
          </label>
          <input
            type={showPassword ? "text" : "password"} // 👈 Alternar visibilidad
            id="password"
            className={`login-input ${errors.password ? "input-error" : ""}`}
            value={formData.password}
            onChange={handleChange}
            aria-describedby="password-error"
          />
          {errors.password && (
            <p id="password-error" className="error-message">
              {errors.password}
            </p>
          )}
          <label className="show-password-checkbox">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
            />
            Mostrar contraseña
          </label>
        </div>

        <button type="submit" className="btn-login">
          Iniciar Sesión
        </button>

        <button
          type="button"
          className="btn-register"
          onClick={() => navigate("/registro")}
        >
          Registrarse
        </button>
        <div className="forgot-password">
          <Link
            to="/recuperar"
            className="text-sm text-blue-600 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </form>
    </div>
  );
}

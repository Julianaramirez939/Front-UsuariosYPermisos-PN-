import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/registerService";
import "./Registro.css";
import Swal from "sweetalert2";

export default function Registro() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    usuario: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    usuario: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validateEmailDomain = (email: string) => {
    return email.endsWith("@cue.edu.co") || email.endsWith("@unihumboldt.co");
  };

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      usuario: "",
      email: "",
      password: "",
    };

    if (!formData.usuario.trim()) newErrors.usuario = "El usuario es obligatorio";

    if (!formData.email.trim()) {
      newErrors.email = "El correo es obligatorio";
    } else if (!validateEmailDomain(formData.email)) {
      newErrors.email =
        "El correo debe terminar en @cue.edu.co o @unihumboldt.co";
    }

    if (!formData.password.trim()) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (!validatePassword(formData.password)) {
      newErrors.password =
        "La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial";
    }

    if (newErrors.usuario || newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    try {
      await registerUser({
        username: formData.usuario,
        email: formData.email,
        password: formData.password,
      });

      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "Ya puedes iniciar sesión.",
        timer: 2000,
        showConfirmButton: false,
      });

      setFormData({ usuario: "", email: "", password: "" });
      setErrors({ usuario: "", email: "", password: "" });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        const msg = error.message.toLowerCase();

        if (msg.includes("usuario ya existe") || msg.includes("username")) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "El nombre de usuario ya está en uso",
          });
          setErrors((prev) => ({
            ...prev,
            usuario: "El nombre de usuario ya está en uso",
          }));
        } else if (msg.includes("correo ya existe") || msg.includes("email")) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "El correo ya está registrado",
          });
          setErrors((prev) => ({
            ...prev,
            email: "El correo ya está registrado",
          }));
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message,
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al registrar.",
        });
      }
    }
  };

  return (
    <div className="register-container">
      <img src="/logocue.png" alt="Logo" className="register-logo" />
      <form className="register-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="usuario" className="register-label">
          Usuario
        </label>
        <input
          type="text"
          id="usuario"
          className={`register-input ${errors.usuario ? "input-error" : ""}`}
          value={formData.usuario}
          onChange={handleChange}
          aria-describedby="usuario-error"
        />
        {errors.usuario && (
          <p id="usuario-error" className="error-message">
            {errors.usuario}
          </p>
        )}

        <label htmlFor="email" className="register-label">
          Correo
        </label>
        <input
          type="email"
          id="email"
          className={`register-input ${errors.email ? "input-error" : ""}`}
          value={formData.email}
          onChange={handleChange}
          aria-describedby="email-error"
        />
        {errors.email && (
          <p id="email-error" className="error-message">
            {errors.email}
          </p>
        )}

        <label htmlFor="password" className="register-label">
          Contraseña
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          className={`register-input ${errors.password ? "input-error" : ""}`}
          value={formData.password}
          onChange={handleChange}
          aria-describedby="password-error"
        />
        {errors.password && (
          <p id="password-error" className="error-message">
            {errors.password}
          </p>
        )}

        <div className="checkbox-container">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
          />
          <label htmlFor="showPassword">Mostrar contraseña</label>
        </div>

        <button type="submit" className="btn-register-submit">
          Registrarse
        </button>

        <div className="back-to-login">
          <Link to="/">Volver al inicio</Link>
        </div>
      </form>
    </div>
  );
}

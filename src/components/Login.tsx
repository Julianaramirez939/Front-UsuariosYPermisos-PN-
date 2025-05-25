import "./login.css";
import { Link } from "react-router-dom";
//...
export default function Login() {
  return (
    <div className="login-container">
      {/* Logo */}
      <img src="/logocue.png" alt="Logo" className="login-logo" />

      {/* Título */}
      <h2 className="login-title">Gestión de Horarios Humboldt - Ing Soft</h2>

      {/* Formulario */}
      <form className="login-form">
        <div>
          <label htmlFor="email" className="login-label">
            Correo
          </label>
          <input type="email" id="email" className="login-input" />
        </div>

        <div>
          <label htmlFor="password" className="login-label">
            Contraseña
          </label>
          <input type="password" id="password" className="login-input" />
        </div>

        <button type="submit" className="btn-login">
          Iniciar Sesión
        </button>

        <Link
          to="/registro"
          className="btn-register"
          style={{ display: "inline-block", textAlign: "center" }}
        >
          Registrarse
        </Link>

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

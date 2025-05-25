import { Link } from 'react-router-dom'
import './Registro.css'

export default function Registro() {
  return (
    <div className="register-container">
      <img 
        src="/logocue.png" 
        alt="Logo" 
        className="register-logo" 
      />
      <form className="register-form">
        <label htmlFor="nombre" className="register-label">Nombre</label>
        <input
          type="text"
          id="nombre"
          className="register-input"
        />

        <label htmlFor="email" className="register-label">Correo</label>
        <input
          type="email"
          id="email"
          className="register-input"
        />

        <label htmlFor="password" className="register-label">Contraseña</label>
        <input
          type="password"
          id="password"
          className="register-input"
        />

        <button type="submit" className="btn-register-submit">
          Registrarse
        </button>

        <div className="back-to-login">
          <Link to="/">Volver al inicio</Link>
        </div>
      </form>
    </div>
  )
}

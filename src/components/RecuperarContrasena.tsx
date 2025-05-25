import { Link } from 'react-router-dom'
import './RecuperarContrasena.css'

export default function RecuperarContraseña() {
  return (
    <div className="forgot-container">
      {/* Logo */}
      <img 
        src="/logocue.png" 
        alt="Logo" 
        className="forgot-logo"
      />
      <div className="forgot-content">
        <h2 className="forgot-title">Recuperar Contraseña</h2>
        <form>
          <label htmlFor="email" className="forgot-label">Correo</label>
          <input
            type="email"
            id="email"
            className="forgot-input"
          />
          <button type="submit" className="btn-send">Enviar</button>
        </form>
        <Link to="/" className="back-to-login">Volver al inicio</Link>
      </div>
    </div>
  )
}

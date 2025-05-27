import { useState } from "react";
import "./MiPerfil.css";

export default function MiPerfil() {
  const [correo, setCorreo] = useState("santiago@cue.edu.co");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Correo actualizado:", correo);
    console.log("Contraseña:", password);
    // Aquí podrías agregar lógica para enviar los cambios al backend
  };

  return (
    <div className="perfil-container">
      <h1>Mi Perfil</h1>
      <form className="perfil-form" onSubmit={handleSubmit}>
        <div className="perfil-group">
          <label>Nombre:</label>
          <input type="text" value="Santiago Rincón" disabled />
        </div>

        <div className="perfil-group">
          <label>Correo:</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

        <div className="perfil-group">
          <label>Rol:</label>
          <input type="text" value="Coordinador" disabled />
        </div>

        <div className="perfil-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="perfil-actions">
          <button type="submit">Guardar Cambios</button>
        </div>
      </form>
    </div>
  );
}

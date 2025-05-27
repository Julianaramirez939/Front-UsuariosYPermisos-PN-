import { useState, type ChangeEvent, type FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faUsers,
  faPlus,
  faBars,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCircleUser,
  faUser as faUserRegular,
} from "@fortawesome/free-regular-svg-icons";

import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

interface User {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
  estado: string;
}

interface Role {
  id: number;
  nombre: string;
}

export default function DashboardUser() {
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const roles: Role[] = [
    { id: 1, nombre: "Administrador" },
    { id: 2, nombre: "Usuario" },
  ];

  const usuarios: User[] = [
    {
      id: 1,
      nombre: "Juan Perez",
      correo: "juan.perez@email.com",
      rol: "Administrador",
      estado: "Activo",
    },
    {
      id: 2,
      nombre: "Maria Gomez",
      correo: "maria.gomez@email.com",
      rol: "Usuario",
      estado: "Inactivo",
    },
  ];

  const estados = ["Activo", "Inactivo"];

  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleUserMenuToggle = () => {
    setShowUserMenu((prev) => !prev);
  };

  const handleLogout = () => {
    console.log("Cerrar sesión");
    navigate("/login");
  };

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    rol: roles[0].nombre,
    estado: estados[0],
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
    setShowModal(false);
    setFormData({
      nombre: "",
      correo: "",
      rol: roles[0].nombre,
      estado: estados[0],
    });
  };

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <nav className="sidebar-menu">
          <ul>
            <li onClick={() => navigate("/horarios")}>
              <FontAwesomeIcon icon={faCalendar} className="sidebar-icon" />
              <span>Ver Horarios</span>
            </li>
            <li onClick={() => navigate("/roles")}>
              <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
              <span>Roles</span>
            </li>
            <li onClick={() => navigate("/usuarios")}>
              <FontAwesomeIcon icon={faUserRegular} className="sidebar-icon" />
              <span>Usuarios</span>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-role">Administración</div>
          <div className="header-user">
            <button onClick={handleUserMenuToggle} className="user-dropdown-toggle">
              <FontAwesomeIcon icon={faCircleUser} className="user-icon" />
              <span>Santiago Rincon</span>
            </button>

            {showUserMenu && (
              <div className="user-dropdown-menu">
                <button onClick={() => navigate("/miperfil")}>
                  <FontAwesomeIcon icon={faCircleUser} style={{ marginRight: "8px" }} />
                  Mi perfil
                </button>
                <button onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: "8px" }} />
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </header>

        <section className="dashboard-content">
          <h1 className="roles-title">Usuarios</h1>

          <div className="roles-toolbar">
            <button className="btn-crear-rol" onClick={() => setShowModal(true)}>
              <FontAwesomeIcon icon={faPlus} style={{ marginRight: "8px" }} />
              Crear Usuario
            </button>
          </div>

          <table className="roles-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((user) => (
                <tr key={user.id}>
                  <td>{user.nombre}</td>
                  <td>{user.correo}</td>
                  <td>{user.rol}</td>
                  <td>{user.estado}</td>
                  <td className="acciones-cell">
                    <div className="menu-container">
                      <button
                        className="menu-button"
                        onClick={() => toggleMenu(user.id)}
                      >
                        <FontAwesomeIcon icon={faBars} />
                      </button>
                      {openMenuId === user.id && (
                        <div className="menu-dropdown">
                          <button className="btn-accion editar">Editar</button>
                          <button className="btn-accion eliminar">Eliminar</button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>Crear Usuario</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                      id="nombre"
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="correo">Correo:</label>
                    <input
                      id="correo"
                      type="email"
                      name="correo"
                      value={formData.correo}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="rol">Rol:</label>
                    <select
                      id="rol"
                      name="rol"
                      value={formData.rol}
                      onChange={handleChange}
                    >
                      {roles.map((role) => (
                        <option key={role.id} value={role.nombre}>
                          {role.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="estado">Estado:</label>
                    <select
                      id="estado"
                      name="estado"
                      value={formData.estado}
                      onChange={handleChange}
                    >
                      {estados.map((estado) => (
                        <option key={estado} value={estado}>
                          {estado}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="modal-buttons">
                    <button type="submit" className="btn-aceptar">
                      Aceptar
                    </button>
                    <button
                      type="button"
                      className="btn-cancelar"
                      onClick={() => setShowModal(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

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

interface Role {
  id: number;
  nombre: string;
  descripcion: string;
  estado: string;
}

type Permisos = "Lectura" | "Escritura" | "Administración" | "Acceso Total";

export default function DashboardRole() {
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const roles: Role[] = [
    {
      id: 1,
      nombre: "Administrador",
      descripcion: "Acceso total al sistema",
      estado: "Activo",
    },
  ];

  const permisosOptions: Permisos[] = [
    "Lectura",
    "Escritura",
    "Administración",
    "Acceso Total",
  ];

  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleUserMenuToggle = () => {
    setShowUserMenu((prev) => !prev);
  };

  const handleLogout = () => {
    console.log("Cerrar sesión");
    navigate("/login"); // o tu ruta de logout
  };

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    permisos: permisosOptions[0],
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
      descripcion: "",
      permisos: permisosOptions[0],
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
          <h1 className="roles-title">Roles</h1>

          <div className="roles-toolbar">
            <button
              className="btn-crear-rol"
              onClick={() => setShowModal(true)}
            >
              <FontAwesomeIcon icon={faPlus} style={{ marginRight: "8px" }} />
              Crear Rol
            </button>
          </div>

          <table className="roles-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.id}>
                  <td>{role.nombre}</td>
                  <td>{role.descripcion}</td>
                  <td>{role.estado}</td>
                  <td className="acciones-cell">
                    <div className="menu-container">
                      <button
                        className="menu-button"
                        onClick={() => toggleMenu(role.id)}
                      >
                        <FontAwesomeIcon icon={faBars} />
                      </button>
                      {openMenuId === role.id && (
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
                <h2>Crear Rol</h2>
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
                    <label htmlFor="descripcion">Descripción:</label>
                    <textarea
                      id="descripcion"
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="permisos">Permisos del rol:</label>
                    <select
                      id="permisos"
                      name="permisos"
                      value={formData.permisos}
                      onChange={handleChange}
                    >
                      {permisosOptions.map((perm) => (
                        <option key={perm} value={perm}>
                          {perm}
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

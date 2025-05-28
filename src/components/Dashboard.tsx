  import "./Dashboard.css";
  import { useState } from "react";
  import { useNavigate, Outlet, useLocation } from "react-router-dom";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import {
    faCalendar,
    faUsers,
    faSignOutAlt,
  } from "@fortawesome/free-solid-svg-icons";
  import {
    faCircleUser,
    faUser as faUserRegular,
  } from "@fortawesome/free-regular-svg-icons";

  export default function Dashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleUserMenuToggle = () => {
      setShowUserMenu((prev) => !prev);
    };

    const handleLogout = () => {
      navigate("/login");
    };

    return (
      <div className="dashboard-container">
        <aside className="dashboard-sidebar">
          <nav className="sidebar-menu">
            <ul>
              <li onClick={() => navigate("horarios")}>
                <FontAwesomeIcon icon={faCalendar} className="sidebar-icon" />
                <span>Ver Horarios</span>
              </li>
              <li onClick={() => navigate("roles")}>
                <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
                <span>Roles</span>
              </li>
              <li onClick={() => navigate("usuarios")}>
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
              <button
                onClick={handleUserMenuToggle}
                className="user-dropdown-toggle"
              >
                <FontAwesomeIcon icon={faCircleUser} className="user-icon" />
                <span>Santiago Rincón</span>
              </button>

              {showUserMenu && (
                <div className="user-dropdown-menu">
                  <button onClick={() => navigate("/miperfil")}>
                    <FontAwesomeIcon
                      icon={faCircleUser}
                      style={{ marginRight: "8px" }}
                    />
                    Mi perfil
                  </button>
                  <button onClick={handleLogout}>
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      style={{ marginRight: "8px" }}
                    />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </header>

          <section className="dashboard-content">
            {
              // Si está en /dashboard o ruta raíz, muestra el mensaje de bienvenida
              location.pathname === "/dashboard" || location.pathname === "/" ? (
                <h1>Bienvenido al panel de administración</h1>
              ) : (
                <Outlet />
              )
            }
          </section>
        </main>
      </div>
    );
  }

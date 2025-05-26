// src/pages/Dashboard.tsx
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCircleUser,
  faUser as faUserRegular,
} from "@fortawesome/free-regular-svg-icons";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <nav className="sidebar-menu">
          <ul>
            <li>
              <FontAwesomeIcon icon={faCalendar} className="sidebar-icon" />
              <span>Ver Horarios</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
              <span>Roles</span>
            </li>
            <li>
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
            <FontAwesomeIcon icon={faCircleUser} className="user-icon" />
            <span>Santiago Rincon</span>
          </div>
        </header>

        <section className="dashboard-content">
          <h1>Bienvenido al panel de administración</h1>
        </section>
      </main>
    </div>
  );
}

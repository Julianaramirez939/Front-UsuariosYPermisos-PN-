import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Role } from "../interfaces/Role";

import { getRoles, deleteRole } from "../services/roleService";

import {
  faPlus,
  faBars,
  faEye,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "./Dashboard.css";

export default function DashboardRole() {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rolesFromApi = await getRoles();

        setRoles(rolesFromApi);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchData();
  }, []);

  const handleVerDetalles = (role: Role) => {
    setSelectedRole(role);
    setShowDetailsModal(true);
    setOpenMenuId(null);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedRole(null);
  };

  const handleEliminar = async (role: Role) => {
    const result = await Swal.fire({
      title: "¿Estás seguro de eliminar este rol?",
      text: role.name,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteRole(role.id);
      setRoles((prev) => prev.filter((r) => r.id !== role.id));
      Swal.fire("Eliminado", "Rol eliminado exitosamente", "success");
      setOpenMenuId(null);
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar el rol", "error");
      console.error(error);
    }
  };

  return (
    <section className="dashboard-content">
      <h1 className="roles-title">Roles</h1>

      <div className="roles-toolbar">
        <button
          className="btn-crear-rol"
          onClick={() => {
            /* Vacío: no hace nada */
          }}
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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {roles.length === 0 && (
            <tr>
              <td colSpan={3}>No hay roles disponibles</td>
            </tr>
          )}
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>{role.description}</td>
              <td className="acciones-cell">
                <div className="menu-container">
                  <button
                    className="menu-button"
                    onClick={() =>
                      setOpenMenuId(role.id === openMenuId ? null : role.id)
                    }
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </button>
                  {openMenuId === role.id && (
                    <div className="menu-dropdown">
                      <button
                        className="btn-accion detalles"
                        onClick={() => handleVerDetalles(role)}
                      >
                        <FontAwesomeIcon icon={faEye} /> Ver permisos
                      </button>
                      <button
                        className="btn-accion editar"
                        onClick={() => {
                          /* No hace nada */
                        }}
                        style={{ marginTop: "8px" }} // un poco de espacio entre botones
                      >
                        <FontAwesomeIcon icon={faPen} /> Editar
                      </button>
                      <button
                        className="btn-accion eliminar"
                        onClick={() => handleEliminar(role)}
                        style={{ marginTop: "8px" }}
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDetailsModal && selectedRole && (
        <div className="modal-overlay" onClick={handleCloseDetailsModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Permisos del rol: {selectedRole.name}</h2>
            <ul>
              {selectedRole.permissions.map((perm) => (
                <li key={perm._id}>
                  <strong>{perm.code}</strong>: {perm.description}
                </li>
              ))}
            </ul>
            <button className= "btn-accion eliminar"onClick={handleCloseDetailsModal}>Cerrar</button>
          </div>
        </div>
      )}
    </section>
  );
}

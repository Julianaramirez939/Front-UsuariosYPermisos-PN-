import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBars } from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.css";

import { getUsers } from "../services/userService";
import type { User } from "../interfaces/User";
import type { Role } from "../interfaces/Role";

export default function DashboardUser() {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [usuarios, setUsuarios] = useState<(User & { estado: string })[]>([]);

  // Roles fijos (puedes cargarlos desde un servicio si quieres)
  const roles: Role[] = [
    { id: "1", name: "Administrador", description: "", permissions: [] },
    { id: "2", name: "Usuario", description: "", permissions: [] },
  ];

  const estados = ["Activo", "Inactivo"];

  useEffect(() => {
    async function fetchUsers() {
      try {
        const usersFromAPI = await getUsers();

        // Agregamos estado por defecto "Activo" a cada usuario
        const mappedUsers = usersFromAPI.map((u) => ({
          ...u,
          estado: "Activo",
        }));

        setUsuarios(mappedUsers);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    }

    fetchUsers();
  }, []);

  const toggleMenu = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    rol: roles[0].name,
    estado: "Activo", // Estado por defecto al crear nuevo usuario
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
      rol: roles[0].name,
      estado: "Activo",
    });
  };

  return (
    <div className="dashboard-container">
      <main className="dashboard-main" >
        <section>
          <h1 className="roles-title">Usuarios</h1>

          <div className="roles-toolbar">
            <button
              className="btn-crear-rol"
              onClick={() => setShowModal(true)}
            >
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
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role?.name ?? "N/A"}</td>
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
                          <button className="btn-accion eliminar">
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
                        <option key={role.id} value={role.name}>
                          {role.name}
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

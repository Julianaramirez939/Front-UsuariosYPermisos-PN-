import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBars } from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.css";

import { getUsers, deleteUser, createUser } from "../services/userService";
import { getRoles } from "../services/roleService";
import type { User, NewUser } from "../interfaces/User";
import type { Role } from "../interfaces/Role";

// Fix de estilos para evitar que Swal quede debajo del modal
Swal.mixin({ heightAuto: false });

export default function DashboardUser() {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [usuarios, setUsuarios] = useState<(User & { estado: string })[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  const estados = ["Activo", "Inactivo"];

  const initialFormData = {
    nombre: "",
    correo: "",
    rol: "",
    estado: "Activo",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    async function fetchData() {
      try {
        const usersFromAPI = await getUsers();
        const rolesFromAPI = await getRoles();
        setRoles(rolesFromAPI);
        setUsuarios(usersFromAPI.map((u) => ({ ...u, estado: "Activo" })));
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    }

    fetchData();
  }, []);

  const toggleMenu = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const isValidEmail = (email: string) =>
    /@(cue\.edu\.co|unihumboldt\.co)$/.test(email);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { nombre, correo, password } = formData;

    if (!isValidEmail(correo)) {
      Swal.fire(
        "Error",
        "El correo debe terminar en @cue.edu.co o @unihumboldt.co",
        "error"
      );
      return;
    }

    const usuarioExistente = usuarios.some(
      (u) => u.email === correo || u.username === nombre
    );

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

    if (usuarioExistente) {
      Swal.fire(
        "Error",
        "Ya existe un usuario con ese nombre o correo.",
        "error"
      );
      return;
    }

    if (!passwordRegex.test(password)) {
      Swal.fire(
        "Error",
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.",
        "error"
      );
      return;
    }

    const selectedRole = roles.find((r) => r.name === formData.rol);
    if (!selectedRole) {
      Swal.fire("Error", "Rol seleccionado no válido.", "error");
      return;
    }

    try {
      const newUserData: NewUser = {
        username: nombre,
        email: correo,
        password,
        role: selectedRole,
      };

      const newUser = await createUser(newUserData);

      Swal.fire("Éxito", "Usuario creado exitosamente", "success");

      setUsuarios((prev) => [...prev, { ...newUser, estado: formData.estado }]);
      setShowModal(false);
      setFormData(initialFormData);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo crear el usuario.", "error");
    }
  };

  const handleOpenModal = () => {
    setFormData({
      ...initialFormData,
      rol: roles.length > 0 ? roles[0].name : "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "¿Estás seguro de eliminar este usuario?",
      text: "No podrás revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(id);
        Swal.fire("Eliminado!", "El usuario ha sido eliminado.", "success");
        setUsuarios((prev) => prev.filter((user) => user.id !== id));
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Error desconocido";
        Swal.fire(
          "Error",
          `Error al eliminar el usuario: ${errorMessage}`,
          "error"
        );
        console.error("Error al eliminar el usuario:", error);
      }
    }
  };

  return (
    <div className="dashboard-container">
      <main className="dashboard-main">
        <section>
          <h1 className="roles-title">Usuarios</h1>

          <div className="roles-toolbar">
            <button className="btn-crear-rol" onClick={handleOpenModal}>
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
                          <button className="btn-accion">Ver contraseña</button>{" "}
                          <button className="btn-accion editar">Editar</button>
                          <button
                            className="btn-accion eliminar"
                            onClick={() => handleDelete(user.id)}
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

                  <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
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

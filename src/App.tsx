import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import RecuperarContraseña from "./components/RecuperarContrasena";
import Registro from "./components/Registro";
import Dashboard from "./components/Dashboard";
import DashboardRole from "./components/DashboardRole";
import DashboardUser from "./components/DashboardUser";
import MiPerfil from "./components/MiPerfil";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recuperar" element={<RecuperarContraseña />} />
        <Route path="/registro" element={<Registro />} />

        {/* Rutas anidadas dentro de Dashboard */}
        <Route path="/Dashboard" element={<Dashboard />}>
          <Route index element={<h1>Bienvenido al panel de administración</h1>} />
          <Route path="roles" element={<DashboardRole />} />
          <Route path="usuarios" element={<DashboardUser />} />
          <Route path="miperfil" element={<MiPerfil />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

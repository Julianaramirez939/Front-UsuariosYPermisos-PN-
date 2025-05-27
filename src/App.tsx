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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/roles" element={<DashboardRole />} />
        <Route path="/usuarios" element={<DashboardUser />} />
        <Route path="/miperfil" element={<MiPerfil />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

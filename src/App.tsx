import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import RecuperarContraseña from './components/RecuperarContrasena'
import Registro from './components/Registro' 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recuperar" element={<RecuperarContraseña />} />
        <Route path="/registro" element={<Registro />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App

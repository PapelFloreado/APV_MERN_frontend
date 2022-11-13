import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "./layout/AuthLayout"
import Login from "./pages/Login"
import OlvidePassword from "./pages/OlvidePassword"
import RegistrarCuenta from "./pages/RegistrarCuenta"
import ConfirmarCuenta from "./pages/ConfirmarCuenta"
import ResetearPassword from "./pages/ResetearPassword"

import { AuthProvider } from "./context/AuthProvider"
import { PacientesProvider } from "./context/PacientesProvider"

import RutaProtegida from "./layout/RutaProtegida"
import AdministrarPacientes from "./pages/AdministrarPacientes"
import EditarPerfil from "./pages/EditarPerfil"
import CambiarPassword from "./pages/CambiarPassword"

function App() {
 

    return (
        <BrowserRouter>
            <AuthProvider>
                <PacientesProvider>
                    <Routes>
                        <Route path="/" element={<AuthLayout/>}>
                            <Route index element={<Login/>}/>
                            <Route path="registrar" element={<RegistrarCuenta/>}/>
                            <Route path="olvide-password" element={<OlvidePassword/>}/>
                            <Route path="olvide-password/:token" element={<ResetearPassword/>}/>
                            <Route path="confirmar/:token" element={<ConfirmarCuenta/>}/>
                        </Route>
                        <Route path="/admin" element={<RutaProtegida/>}>
                            <Route index element={<AdministrarPacientes/>}/>
                            <Route path="perfil" element={<EditarPerfil/>}/>
                            <Route path="actualizar-password" element={<CambiarPassword/>}/>
                        </Route>
                    </Routes>
                </PacientesProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App

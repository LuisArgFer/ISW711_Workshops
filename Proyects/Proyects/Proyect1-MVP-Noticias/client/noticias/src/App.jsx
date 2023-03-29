import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthLayout from './layouts/AuthLayout'
import RutaProtegida from './layouts/RutaProtegida'

import Login from './paginas/Login'
import Registrar from './paginas/Registrar'
import OlvidePassword from './paginas/OlvidePassword'
import NuevoPassword from './paginas/NuevoPassword'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'

import {AuthProvider} from './context/AuthProvider'
import Noticias from './paginas/Noticias'
import Perfil from './paginas/Perfil'
import NewSourse from './paginas/NewSourse'
//import {ProyectosProvider} from './context/ProyectosProvider'

function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
        
          <Routes>
              <Route path="/" element={<AuthLayout />}>
                  <Route path="/login" element={<Login />} />
                  <Route path="registrarse" element={<Registrar />} />
                  <Route path="olvide-password" element={<OlvidePassword />} />
                  <Route path="olvide-password/:token" element={<NuevoPassword />} />
                  <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
              </Route>

              <Route path="/dashboard" element={<RutaProtegida />}>
                  <Route index element={<Noticias />} />
                  <Route path="newsourse" element={<NewSourse />} />
                  <Route path="perfil" element={<Perfil />} />
              </Route>
          </Routes>
        
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App


// Routing de Todoapp

import Login from './pages/login'
import Home from './pages/home'
import Signup from './pages/signup'
import PrivateRoute from './Components/privateRoute'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        
        <Route element={<PrivateRoute />}>
                    <Route path="/home" element={<Home />} />
                </Route>

                {/* Redirection par défaut */}
                <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App

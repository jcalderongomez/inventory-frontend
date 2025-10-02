// Importamos componentes de React Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Importamos nuestras páginas
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
// Importamos componente para rutas privadas (protege rutas de usuarios no autenticados)
import PrivateRoute from "./components/PrivateRoute";

// Componente principal de la aplicación
function App() {
    return (
        // Router principal de la app
        <Router>
            {/* Contenedor de rutas */}
            <Routes>
                {/* Ruta pública de login */}
                <Route path="/login" element={<Login />} />
                
                {/* Ruta privada para Dashboard */}
                <Route 
                    path="/" 
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    } 
                />
                
                {/* Ruta privada para Products */}
                <Route 
                    path="/products" 
                    element={
                        <PrivateRoute>
                            <Products />
                        </PrivateRoute>
                    } 
                />
            </Routes>
        </Router>
    );
}

// Exportamos App para usarlo en index.js
export default App;

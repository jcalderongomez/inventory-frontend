// Importamos Navigate para redirigir rutas
import { Navigate } from "react-router-dom";

// Componente que protege rutas privadas
export default function PrivateRoute({ children }) {
    // Obtenemos el token almacenado en localStorage
    const token = localStorage.getItem('token');

    // Si existe token, renderiza los hijos (la página protegida)
    // Si no hay token, redirige al login
    return token ? children : <Navigate to="/login" />;
}

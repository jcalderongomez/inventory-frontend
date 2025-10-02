// Importamos los hooks y componentes necesarios
import { useState } from "react"; // useState nos permite manejar estado dentro del componente
import { login } from "../services/api"; // Función que llama al backend para autenticar
import { useNavigate } from "react-router-dom"; // Hook para redireccionar a otra ruta
import { TextField, Button, Paper } from "@mui/material"; // Componentes de Material-UI para inputs, botones y contenedor

// Definimos el componente Login como función
export default function Login() {
  // Estado para almacenar el email ingresado por el usuario
  const [email, setEmail] = useState('juan@mail.com'); // Valor inicial de prueba
  // Estado para almacenar la contraseña ingresada
  const [password, setPassword] = useState('123456'); // Valor inicial de prueba
  // Hook para navegar a otras rutas
  const navigate = useNavigate();

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página al enviar
    try {
      // Llamamos a la función login del API pasando email y password
      const res = await login(email, password);
      // Guardamos el token JWT recibido del backend en el localStorage
      localStorage.setItem('token', res.data.token);
      // Redirigimos al usuario a la ruta principal (dashboard)
      navigate('/');
    } catch {
      // Si ocurre un error (usuario o contraseña incorrectos), mostramos alerta
      alert("Credenciales incorrectas");
    }
  }

  // Renderizado del componente
  return (
    // Contenedor principal centrado en pantalla
    <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
      {/* Contenedor tipo tarjeta usando Paper de Material-UI */}
      <Paper style={{ padding: 30, width: 350 }}>
        <h2 style={{ textAlign: "center" }}>Login</h2>
        {/* Formulario que ejecuta handleSubmit al enviar */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Input de email controlado */}
          <TextField
            label="Email"
            type="email"
            value={email} // valor del estado
            onChange={e => setEmail(e.target.value)} // actualiza el estado al escribir
            required
          />
          {/* Input de contraseña controlado */}
          <TextField
            label="Password"
            type="password"
            value={password} // valor del estado
            onChange={e => setPassword(e.target.value)} // actualiza el estado al escribir
            required
          />
          {/* Botón de envío */}
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
}

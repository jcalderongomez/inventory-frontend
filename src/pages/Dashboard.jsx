// Importamos hooks y componentes necesarios
import { useEffect, useState } from "react"; // useState para manejar estado, useEffect para efectos secundarios
import { getProducts } from "../services/api"; // Función para traer productos del backend
import { useNavigate } from "react-router-dom"; // Hook para redireccionar a otras rutas
import { Grid, Paper, Typography, Button, CircularProgress } from "@mui/material"; // Componentes de MUI

// Componente funcional Dashboard
export default function Dashboard() {
  // Estado para almacenar productos
  const [products, setProducts] = useState([]);
  // Estado para manejar indicador de carga
  const [loading, setLoading] = useState(true);
  // Estado para manejar errores
  const [error, setError] = useState(null);
  // Hook para navegación
  const navigate = useNavigate();

  // Función para traer productos del backend
  const fetchProducts = () => {
    setLoading(true); // activamos indicador de carga
    getProducts()
      .then(res => setProducts(Array.isArray(res.data) ? res.data : [])) // guardamos productos si vienen como arreglo
      .catch(err => {
        console.error(err);
        setError("No se pudieron cargar los productos."); // capturamos error
      })
      .finally(() => setLoading(false)); // desactivamos indicador de carga
  };

  // useEffect se ejecuta una vez al montar el componente para cargar productos
  useEffect(() => { fetchProducts(); }, []);

  // Calculamos estadísticas
  const totalProducts = products.length; // total de productos
  const totalStock = products.reduce((acc, p) => acc + p.quantity, 0); // suma de cantidades

  // Manejo de estados visuales
  if (loading) return <CircularProgress style={{ margin: 50 }} />; // muestra spinner si está cargando
  if (error) return <Typography color="error">{error}</Typography>; // muestra mensaje de error

  // Renderizado principal del dashboard
  return (
    <div style={{ padding: 20 }}>
      {/* Título */}
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Botón para ir a la página de productos */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate("/products")} 
        style={{ marginBottom: 20 }}
      >
        Administrar Productos
      </Button>

      {/* Grid de estadísticas */}
      <Grid container spacing={3}>
        {/* Total de productos */}
        <Grid item xs={12} sm={6}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Total de Productos</Typography>
            <Typography variant="h4">{totalProducts}</Typography>
          </Paper>
        </Grid>
        {/* Total de stock */}
        <Grid item xs={12} sm={6}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Stock Total</Typography>
            <Typography variant="h4">{totalStock}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

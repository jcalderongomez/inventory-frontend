// Importamos hooks y componentes necesarios
import { useEffect, useState } from "react"; // useState para manejar estado, useEffect para efectos secundarios
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, TextField, Snackbar, Alert
} from "@mui/material"; // Componentes de Material-UI para tabla, inputs, botones y notificaciones
import { getProducts, createProduct, deleteProduct } from "../services/api"; // Funciones para llamar al backend

// Componente funcional Products
export default function Products() {
  // Estado para almacenar la lista de productos
  const [products, setProducts] = useState([]);
  // Estado para el nombre de un nuevo producto
  const [name, setName] = useState("");
  // Estado para la cantidad de un nuevo producto
  const [quantity, setQuantity] = useState(0);
  // Estado para manejar carga de datos
  const [loading, setLoading] = useState(true);
  // Estado para manejar errores
  const [error, setError] = useState(null);
  // Estado para Snackbar (notificaciones)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Función para traer productos desde el backend
  const fetchProducts = () => {
    setLoading(true); // activamos indicador de carga
    getProducts()
      .then(res => setProducts(Array.isArray(res.data) ? res.data : [])) // guardamos productos si vienen como arreglo
      .catch(err => setError("No se pudieron cargar los productos")) // capturamos error
      .finally(() => setLoading(false)); // desactivamos indicador de carga
  };

  // useEffect se ejecuta una vez al montar el componente para cargar productos
  useEffect(() => { fetchProducts(); }, []);

  // Función para crear un nuevo producto
  const handleCreate = async () => {
    try {
      // Llamada al backend para crear producto
      await createProduct({ name, quantity, description: "", price: 0 });
      setName(""); // limpiamos input de nombre
      setQuantity(0); // limpiamos input de cantidad
      fetchProducts(); // recargamos productos
      setSnackbar({ open: true, message: "Producto agregado", severity: "success" }); // mostramos notificación
    } catch {
      setSnackbar({ open: true, message: "Error al crear producto", severity: "error" }); // error en notificación
    }
  };

  // Función para eliminar un producto por id
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id); // llamada al backend para eliminar
      fetchProducts(); // recargamos productos
      setSnackbar({ open: true, message: "Producto eliminado", severity: "info" }); // notificación
    } catch {
      setSnackbar({ open: true, message: "Error al eliminar producto", severity: "error" }); // error
    }
  };

  // Renderizado del componente
  return (
    <div style={{ padding: 20 }}>
      <h2>Productos</h2>

      {/* Formulario para agregar productos */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <TextField
          label="Nombre"
          value={name} // valor del input controlado por estado
          onChange={(e) => setName(e.target.value)} // actualiza estado al escribir
        />
        <TextField
          label="Cantidad"
          type="number"
          value={quantity} // valor controlado
          onChange={(e) => setQuantity(Number(e.target.value))} // actualiza estado y convierte a número
        />
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Agregar
        </Button>
      </div>

      {/* Manejo de estados: carga, error, vacío o tabla */}
      {loading ? (
        <p>Cargando productos...</p>
      ) : error ? (
        <p>{error}</p>
      ) : products.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.quantity}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(p.id)} // elimina producto al hacer click
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000} // se cierra solo en 3s
        onClose={() => setSnackbar({ ...snackbar, open: false })} // cierra Snackbar
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })} // cierra alerta
          severity={snackbar.severity} // tipo de alerta: success, error, info
          sx={{ width: "100%" }}
        >
          {snackbar.message} {/* Mensaje dinámico */}
        </Alert>
      </Snackbar>
    </div>
  );
}

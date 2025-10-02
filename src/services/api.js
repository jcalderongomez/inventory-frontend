// Importamos axios para hacer peticiones HTTP
import axios from 'axios';

// URL base del backend
const API_URL = 'http://localhost:8080/api';

// Creamos una instancia de axios con la URL base
export const api = axios.create({
    baseURL: API_URL,
});

// Interceptor para agregar el token a cada request automáticamente
api.interceptors.request.use(config => {
    // Obtenemos el token del localStorage
    const token = localStorage.getItem('token');
    // Si existe token, lo agregamos al header Authorization como Bearer
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// ==================== AUTH ==================== //
// Función para hacer login, recibe email y password
export const login = (email, password) => api.post('/auth/login', { email, password });

// Función para registrar un nuevo usuario
export const register = (name, email, password) => api.post('/auth/register', { name, email, password });

// ==================== PRODUCTOS ==================== //
// Traer todos los productos
export const getProducts = () => api.get('/products');

// Crear un producto, recibe un objeto product {name, quantity, description, price}
export const createProduct = (product) => api.post('/products', product);

// Actualizar producto por id
export const updateProduct = (id, product) => api.put(`/products/${id}`, product);

// Eliminar producto por id
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// Usuarios de prueba (Admin y Cliente) para cumplir la consigna de roles
export const USERS_MOCK = [
  {
    id: 1,
    username: "admin",
    password: "123",
    role: "admin",
    name: "Tiago Administrador"
  },
  {
    id: 2,
    username: "cliente",
    password: "123",
    role: "client",
    name: "Ana Clienta"
  }
];

// Inventamos productos para la tienda de "EcoHuerto" (empresa chica/inventada)
export const INITIAL_PRODUCTS = [
  { id: 1, name: "Monstera Deliciosa", price: 1500, stock: 10, category: "Interior" },
  { id: 2, name: "Suculenta Echeveria", price: 450, stock: 25, category: "Exterior" },
  { id: 3, name: "Sustrato Orgánico 5L", price: 800, stock: 15, category: "Accesorios" }
];
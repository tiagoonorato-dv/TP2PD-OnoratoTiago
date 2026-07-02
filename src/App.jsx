import React, { useState } from 'react';
import { USERS_MOCK, INITIAL_PRODUCTS } from './data/mockData';
import LoginView from './views/LoginView';
import AdminDashboard from './views/AdminDashboard';
import ClientDashboard from './views/ClientDashboard';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  // Función encargada de validar el login de forma manual (hardcoded)
  const handleLogin = (username, password) => {
    const foundUser = USERS_MOCK.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      setCurrentUser(foundUser);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Función para que el administrador agregue productos gráficamente
  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleDecreaseStock = (cartItems) => {
    setProducts(prevProducts => 
      prevProducts.map(prod => {
        // Contamos cuántas veces se compró este artículo en el carrito actual
        const cantidadComprada = cartItems.filter(item => item.id === prod.id).length;
        return {
          ...prod,
          stock: Math.max(0, prod.stock - cantidadComprada) // Restamos sin bajar de 0
        };
      })
    );
  };

  // 1. Si no hay usuario logueado, se muestra el Login
  if (!currentUser) {
    return <LoginView onLogin={handleLogin} />;
  }

  // 2. Si es administrador, ve el panel de administración
  if (currentUser.role === 'admin') {
    return (
      <AdminDashboard 
        user={currentUser} 
        onLogout={handleLogout} 
        products={products}
        onAddProduct={handleAddProduct}
      />
    );
  }

  // 3. Si no, ve la tienda de cliente (CORREGIDO: user={currentUser})
  return (
    <ClientDashboard 
      user={currentUser} 
      onLogout={handleLogout} 
      products={products} 
      onConfirmPurchase={handleDecreaseStock} 
    />
  );
}

export default App;
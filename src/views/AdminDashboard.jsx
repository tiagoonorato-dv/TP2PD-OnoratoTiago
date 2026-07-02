import React, { useState } from 'react';
import '../styles/AdminDashboard.css';

function AdminDashboard({ user, onLogout, products, onAddProduct }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('Interior');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !price || !stock) return alert('Por favor, completá todos los campos');
    
    onAddProduct({
      id: Date.now(),
      name,
      price: parseFloat(price),
      stock: parseInt(stock),
      category: category 
    });

    setName('');
    setPrice('');
    setStock('');
    setCategory('Interior');
  };

  return (
    <div className="admin-bg">
      <nav className="admin-nav">
        <div className="nav-brand">
          <span style={{ fontSize: '28px' }}>🛠️</span>
          <h2>EcoHuerto <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 'normal', backgroundColor: '#f1f5f9', padding: '2px 8px', borderRadius: '10px', marginLeft: '5px' }}>Panel Control</span></h2>
        </div>
        
        <div className="nav-menu">
          <span className="nav-link-active">Gestión de Stock</span>
          <span className="nav-link">Reporte de Ventas</span>
          <span className="nav-link">Logs de Consola</span>
        </div>

        <div className="nav-right">
          <span className="status-indicator">
            <span className="dot-online"></span>
            Conectado como: <strong>Administrador</strong>
          </span>
          <button onClick={onLogout} className="btn-logout">
            Cerrar Sesión
          </button>
        </div>
      </nav>

      <div className="main-container">
        <div className="form-card">
          <h3 style={{ margin: '0 0 20px 0', color: '#1e293b' }}>Cargar nuevo artículo al inventario</h3>
          <form onSubmit={handleAdd} className="admin-form">
            <div className="form-field-large">
              <label>Nombre de la especie o insumo</label>
              <input type="text" placeholder="Ej: Helecho Serrucho" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-field">
              <label>Categoría</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Interior">Interior</option>
                <option value="Exterior">Exterior</option>
                <option value="Accesorios">Accesorios</option>
              </select>
            </div>
            <div className="form-field">
              <label>Precio ($)</label>
              <input type="number" placeholder="0.00" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="form-field">
              <label>Stock disponible</label>
              <input type="number" placeholder="Unidades" value={stock} onChange={(e) => setStock(e.target.value)} />
            </div>
            <button type="submit" className="btn-submit">+ Registrar</button>
          </form>
        </div>

        <div className="table-card">
          <h3 style={{ margin: '0 0 16px 0', color: '#1e293b' }}>Visualización General de Existencias (Módulo de Control)</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID Referencia</th>
                <th>Nombre Comercial</th>
                <th>Categoría</th>
                <th>Precio Unitario</th>
                <th>Stock Actual</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod.id}>
                  <td style={{ color: '#718096', fontSize: '14px' }}>#{prod.id.toString().slice(-5)}</td>
                  <td style={{ color: '#1a202c', fontWeight: '500' }}>{prod.name}</td>
                  <td>{prod.category}</td>
                  <td>${prod.price}</td>
                  <td>
                    <span className="badge-stock" style={{ backgroundColor: prod.stock > 5 ? '#e6fffa' : '#fff5f5', color: prod.stock > 5 ? '#319795' : '#e53e3e' }}>
                      {prod.stock} uds
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
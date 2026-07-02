import React, { useState } from 'react';
import '../styles/ClientDashboard.css';

function ClientDashboard({ user, onLogout, products, onConfirmPurchase }) {
  const [cart, setCart] = useState([]);
  const [plantType, setPlantType] = useState('Interior');
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [riegoConsejo, setRiegoConsejo] = useState('💡 Selecciona un tipo de planta para ver la recomendación.');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const [currentSection, setCurrentSection] = useState('inicio');


  const [clientName, setClientName] = useState('Cliente');
  const [inputName, setInputName] = useState(clientName);
  const [purchaseHistory, setPurchaseHistory] = useState([
    { id: '10244', fecha: '01/07/2026', items: 'Monstera Deliciosa x1', total: 1500 }
  ]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleCalcularRiego = (e) => {
    const tipo = e.target.value;
    setPlantType(tipo);
    if (tipo === 'Interior') {
      setRiegoConsejo('💡 Regar 1 vez por semana. Ideal para departamentos o ambientes de semisombra.');
    } else if (tipo === 'Exterior') {
      setRiegoConsejo('💡 Requiere luz directa. Regar de 2 a 3 veces por semana en épocas estivales.');
    } else {
      setRiegoConsejo('💡 Riego escaso. Mojar el sustrato únicamente cuando se encuentre 100% seco.');
    }
  };

  const handleConfirmarCompra = () => {
    if (cart.length === 0) return;

    // Guardar en el historial de compras
    const nuevaCompra = {
      id: Math.floor(10000 + Math.random() * 90000).toString(),
      fecha: new Date().toLocaleDateString('es-AR'),
      items: cart.map(i => i.name).join(', '),
      total: totalCarrito
    };

    if (onConfirmPurchase) {
      onConfirmPurchase(cart);
    }

    setPurchaseHistory([nuevaCompra, ...purchaseHistory]);
    setPurchaseSuccess(true);
    setCart([]);
    setTimeout(() => setPurchaseSuccess(false), 4000);
  };

  const handleUpdateName = (e) => {
    e.preventDefault();
    if (!inputName.trim()) return;
    setClientName(inputName);
    alert('¡Nombre actualizado correctamente!');
  };

  const totalCarrito = cart.reduce((acc, item) => acc + item.price, 0);

  const filteredProducts = selectedCategory === 'Todos' 
    ? products 
    : products.filter(prod => prod.category === selectedCategory);

  const categories = ['Todos', 'Interior', 'Exterior', 'Accesorios'];

  return (
    <div className="client-bg">
      {/* Navbar Superior Dinámico */}
      <nav className="client-nav">
        <div className="client-brand" onClick={() => setCurrentSection('inicio')}>
          <span style={{ fontSize: '28px' }}>🌿</span>
          <h2>EcoHuerto</h2>
        </div>

        <div className="client-menu">
          <span 
            onClick={() => setCurrentSection('inicio')} 
            style={{ color: currentSection === 'inicio' ? '#10b981' : '#64748b', cursor: 'pointer', borderBottom: currentSection === 'inicio' ? '2px solid #10b981' : 'none', paddingBottom: '4px', fontWeight: '600' }}
          >
            Inicio
          </span>
          <span 
            onClick={() => setCurrentSection('catalogo')} 
            style={{ color: currentSection === 'catalogo' ? '#10b981' : '#64748b', cursor: 'pointer', borderBottom: currentSection === 'catalogo' ? '2px solid #10b981' : 'none', paddingBottom: '4px', fontWeight: '600' }}
          >
            Catálogo
          </span>
          <span 
            onClick={() => setCurrentSection('perfil')} 
            style={{ color: currentSection === 'perfil' ? '#10b981' : '#64748b', cursor: 'pointer', borderBottom: currentSection === 'perfil' ? '2px solid #10b981' : 'none', paddingBottom: '4px', fontWeight: '600' }}
          >
            Mi Perfil / Historial
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div className="client-user-info" style={{ cursor: 'pointer' }} onClick={() => setCurrentSection('perfil')}>
            <span style={{ fontSize: '14px' }}>👤</span>
            <span>¡Hola, <strong>{clientName}</strong>!</span>
          </div>
          <button onClick={onLogout} className="btn-client-logout">
            Cerrar Sesión
          </button>
        </div>
      </nav>

      {/* RENDERIZADO CONDICIONAL DE SECCIONES DE PÁGINA */}
      <div style={{ padding: '40px 20px', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* SECCIÓN 1: INICIO */}
        {currentSection === 'inicio' && (
          <div className="welcome-container">
            <h1 className="welcome-title">Bienvenido a EcoHuerto!</h1>
            <p className="welcome-text">
              Somos una plataforma digital diseñada para conectar tu pasión por la naturaleza con la gestión 
              inteligente de tus espacios verdes. En EcoHuerto vas a encontrar las mejores especies botánicas, 
              sustratos orgánicos y herramientas esenciales para tu huerta urbana, acompañados de un asistente automatizado 
              que garantiza las condiciones de riego óptimas para cada una de tus plantas.
            </p>
            <button className="btn-submit" onClick={() => setCurrentSection('catalogo')}>
              Explorar el Catálogo Digital ➡️
            </button>

            <div className="features-grid">
              <div className="feature-card">
                <h3>🌱 Especies Variadas</h3>
                <p style={{ fontSize: '14px', color: '#64748b' }}>Variedades adaptadas tanto para interiores con semisombra como exteriores exigentes.</p>
              </div>
              <div className="feature-card">
                <h3>💧 Asistente Técnico</h3>
                <p style={{ fontSize: '14px', color: '#64748b' }}>Calculadora en tiempo real que previene el estrés hídrico de tus cultivos.</p>
              </div>
              <div className="feature-card">
                <h3>📦 Gestión unificada</h3>
                <p style={{ fontSize: '14px', color: '#64748b' }}>Panel administrativo transparente sincronizado con la experiencia final de compra.</p>
              </div>
            </div>
          </div>
        )}

        {/* SECCIÓN 2: CATÁLOGO Y CARRITO */}
        {currentSection === 'catalogo' && (
          <div className="grid-layout" style={{ margin: 0, padding: 0 }}>
            <div className="catalog-section">
              <div className="filter-bar">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="filter-btn"
                    style={{
                      backgroundColor: selectedCategory === cat ? '#10b981' : '#ffffff',
                      color: selectedCategory === cat ? '#ffffff' : '#475569',
                    }}
                  >
                    {cat === 'Todos' ? '📋 Ver Todo' : cat}
                  </button>
                ))}
              </div>

              <h3 style={{ color: '#1e293b', marginBottom: '20px' }}>Especies Disponibles ({filteredProducts.length})</h3>
              
              <div className="product-grid">
                {filteredProducts.map(prod => (
                  <div key={prod.id} className="product-card">
                    <div>
                      <div style={{ fontSize: '32px', marginBottom: '10px', textAlign: 'center' }}>{prod.category === 'Accesorios' ? '📦' : '🪴'}</div>
                      <h4 style={{ margin: '0 0 6px 0', color: '#0f172a', fontSize: '16px', fontWeight: '600' }}>{prod.name}</h4>
                      <span className="category-tag">{prod.category}</span>
                    </div>
                    <div>
                      <p className="price-text">${prod.price}</p>
                      <button onClick={() => addToCart(prod)} className="btn-add-cart">Agregar al Carrito</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-section">
              <div className="cart-box">
                <h3 style={{ margin: '0 0 15px 0', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>🛒 Pedido Actual</h3>
                
                {purchaseSuccess && (
                  <div className="success-alert">
                    🎉 ¡Pedido simulado con éxito! El historial de compras ha sido actualizado.
                  </div>
                )}

                {cart.length === 0 ? (
                  <p style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'center', padding: '20px 0' }}>El carrito está vacío</p>
                ) : (
                  <>
                    <ul style={{ paddingLeft: '20px', margin: '0 0 20px 0', fontSize: '14px', color: '#334155' }}>
                      {cart.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: '6px' }}>{item.name} (${item.price})</li>
                      ))}
                    </ul>
                    <div className="cart-total-row">
                      <span>Monto Total:</span>
                      <span style={{ color: '#059669', fontSize: '18px' }}>${totalCarrito}</span>
                    </div>
                    <button onClick={handleConfirmarCompra} className="btn-checkout">Confirmar Compra</button>
                  </>
                )}
              </div>

              <div className="assistant-box">
                <h3 style={{ margin: '0 0 12px 0', color: '#065f46', fontSize: '16px' }}>💧 Asistente de Riego Automatizado</h3>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#047857', fontWeight: '500' }}>Seleccionar Variedad:</label>
                <select value={plantType} onChange={handleCalcularRiego} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #a7f3d0', backgroundColor: '#ffffff', outline: 'none', marginBottom: '12px' }}>
                  <option value="Interior">Plantas de Interior</option>
                  <option value="Exterior">Plantas de Exterior</option>
                  <option value="Accesorios">Suculentas / Cactus</option>
                </select>
                <div style={{ backgroundColor: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                  <p style={{ fontSize: '13px', margin: 0, color: '#1e293b', lineHeight: '1.5' }}>{riegoConsejo}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECCIÓN 3: PERFIL DE USUARIO E HISTORIAL */}
        {currentSection === 'perfil' && (
          <div>
            <div className="profile-card">
              <h2 style={{ margin: '0 0 8px 0', color: '#0f172a' }}>Configuración de la Cuenta</h2>
              <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 20px 0' }}>Modificá tus datos de visualización en la plataforma local.</p>
              
              <form onSubmit={handleUpdateName}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155', display: 'block' }}>Nombre del Cliente</label>
                <div className="profile-form">
                  <input 
                    type="text" 
                    value={inputName} 
                    onChange={(e) => setInputName(e.target.value)}
                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', flex: 1, outline: 'none' }}
                  />
                  <button type="submit" className="btn-submit">Guardar Cambios</button>
                </div>
              </form>
            </div>

            <div className="profile-card">
              <h2 style={{ margin: '0 0 15px 0', color: '#0f172a' }}>Historial de Transacciones Simuladas</h2>
              {purchaseHistory.length === 0 ? (
                <p style={{ color: '#94a3b8', fontSize: '14px' }}>No has realizado ninguna compra todavía.</p>
              ) : (
                <table className="history-table">
                  <thead>
                    <tr>
                      <th>Código Pedido</th>
                      <th>Fecha de Compra</th>
                      <th>Detalle de Productos</th>
                      <th>Total Abonado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchaseHistory.map((compra) => (
                      <tr key={compra.id}>
                        <td style={{ color: '#64748b', fontWeight: '600' }}>#{compra.id}</td>
                        <td>{compra.fecha}</td>
                        <td style={{ color: '#334155' }}>{compra.items}</td>
                        <td style={{ color: '#059669', fontWeight: '700' }}>${compra.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default ClientDashboard;
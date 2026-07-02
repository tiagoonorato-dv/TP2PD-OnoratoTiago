import React, { useState } from 'react';
import '../styles/LoginView.css';  

function LoginView({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onLogin(username, password);
    if (!success) setError('Usuario o contraseña incorrectos.');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <span className="login-logo">🌿</span>
        <h2 className="login-title">EcoHuerto</h2>
        <p className="login-subtitle">Plataforma de Gestión Local</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Usuario</label>
            <input 
              type="text" 
              placeholder="admin o cliente" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              placeholder="•••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          {error && <p className="error-message">{error}</p>}
          
          <button type="submit" className="login-btn">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginView;
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './adminLogin.css'; // Updated CSS import

const AdminLogin = () => { // Updated component name
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { AdminLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/AdminLogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include', 
      });

      if (response.ok) {
        const data = await response.json();
        AdminLogin(data.user); 
        navigate('/dashboard'); 
      } else {
        const errorData = await response.json();
        setError(errorData.message); 
      }
    } catch (err) {
      setError('Server error. Please try again later.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-container"> {/* Updated class name */}
      <div className="login-form"> {/* Updated class name */}
        <h1>Admin Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
      <div className="login-image"></div> {/* Updated class name */}
    </div>
  );
};

export default AdminLogin; // Updated export
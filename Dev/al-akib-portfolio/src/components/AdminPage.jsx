import { useState } from 'react';
import AdminPanel from './AdminPanel';
import './AdminPanel.css';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

const AdminPage = ({ data, onSave, onReset }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    setError('');

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      return;
    }

    setError('Invalid username or password.');
  };

  if (isAuthenticated) {
    return (
      <div className="app">
        <AdminPanel data={data} onSave={onSave} onReset={onReset} />
      </div>
    );
  }

  return (
    <section className="admin section">
      <div className="container">
        <div className="admin-auth terminal-card">
          <div className="node-label">NODE-ADMIN :: AUTH_GATE</div>
          <h2 className="section-title">Admin <span>Login</span></h2>
          <p className="section-sub">$ auth --target=/admin</p>
          <form onSubmit={handleLogin} className="admin-auth-form">
            <label>
              <span>Username</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </label>
            <label>
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </label>
            {error && <div className="admin-msg error">{error}</div>}
            <button type="submit" className="btn btn-primary">$ login --execute</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminPage;

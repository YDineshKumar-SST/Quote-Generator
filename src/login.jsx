import { useState } from 'react';
import Navbar from './Navbar';

function Login({ onLogin, theme, onToggleTheme }) {
  const [name, setName] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (name.trim()) onLogin(name.trim());
  };

  return (
    <div className="app-container">
      <Navbar title="Welcome!" theme={theme} onToggleTheme={onToggleTheme} onLogout={() => {}} />
      <div className="cord">
        <div className="login-card">
          <h2>Get ready for endless motivation!</h2>
          <form onSubmit={submit}>
            <input
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className="btn-primary">Enter</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
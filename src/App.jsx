import { useState, useEffect } from 'react';
import Login from './login';
import Quote from './Quote';
import './App.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => (t === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app-container">
      {user ? (
        <Quote
          user={user}
          onLogout={() => setUser(null)}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      ) : (
        <Login onLogin={setUser} theme={theme} onToggleTheme={toggleTheme} />
      )}
    </div>
  );
}
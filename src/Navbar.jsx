function Navbar({ title, onLogout, theme, onToggleTheme }) {
  return (
    <nav className="navbar-container">
      <div className="navuba">
        <h1>{theme === 'light' ? '🌞' : '🌙'}</h1>
        <h2 className="linecenter">{title.toUpperCase()}</h2>
      </div>
      <div>
        <button className="theme-toggle" onClick={onToggleTheme} aria-label="toggle theme">
          {theme === 'light' ? '🌙' : '🌞'}
        </button>
        <button className="logout-nav" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
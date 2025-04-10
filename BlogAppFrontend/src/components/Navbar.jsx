import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = location.pathname === '/signup' || location.pathname === '/login';

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isNavVisible, setIsNavVisible] = useState(false); // State to toggle nav visibility

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.className = isDarkMode ? 'light-mode' : 'dark-mode';
  };

  useEffect(() => {
    // Set the initial theme to dark mode
    document.body.className = 'dark-mode';
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('token'); // Check login status true or false

  const handleToggleNav = () => {
    setIsNavVisible(!isNavVisible); // Toggle the nav visibility
  };

  return (
    <nav className="nav-container">
      <div className="logo">
        <Link to="/">EchoBlog</Link>
      </div>

      {/* Toggle Button */}
      {!isAuthPage && (
        <button className="nav-toggle-btn" onClick={handleToggleNav}>
          {isNavVisible ? 'Close' : 'Menu'}
        </button>
      )}

      {!isAuthPage && (
        <div className={`nav-right ${isNavVisible ? 'visible' : ''}`}>
          <input type="text" placeholder="Search..." />
          <Link to="/category" className="category-btn">Categories</Link>
          <Link to="/tag" className="tag-btn">Tags</Link>
          {isLoggedIn && (
            <Link to="/drafts" className="tag-btn">Drafts</Link>
          )}
          {isLoggedIn ? (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="login-btn">Login</Link>
          )}
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
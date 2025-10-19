import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import './Navigation.css';

const Navigation = () => {
  const { isAuthenticated, logout, user } = useAuth();
  return (
    <header className="nav-wrapper glass-panel">
      <div className="nav-content">
        <Link to="/" className="logo">
          Glow<span>Up</span>
        </Link>
        <nav className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/salons">Salons</NavLink>
          {isAuthenticated && <NavLink to="/dashboard">Dashboard</NavLink>}
        </nav>
        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <div className="user-chip">
                <span>{user?.name}</span>
                <small>{user?.role}</small>
              </div>
              <button className="text-button" onClick={logout}>
                Log out
              </button>
            </>
          ) : (
            <Link className="gradient-button" to="/auth">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;

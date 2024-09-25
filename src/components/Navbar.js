import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');
  
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container">
    <Link className="navbar-brand" to="/">
      Home
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
        {token ? (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/todos">
                Todos
              </Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-danger" onClick={logout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  </div>
</nav>

  );
};

export default Navbar;

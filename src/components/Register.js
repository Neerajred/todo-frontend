import React, { useState } from 'react';
import { register } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(user);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="container mt-5">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <div className="card">
        <div className="card-body">
          <h2 className="text-center mb-4">Register</h2>
          <form onSubmit={handleRegister}>
            <div className="form-group mb-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block w-100">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Register;

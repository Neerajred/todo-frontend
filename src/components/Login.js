import React, { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      console.log(response);
      localStorage.setItem('token', response.token);
      navigate('/todos');
      window.location.reload();

    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container mt-5">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <div className="card">
        <div className="card-body">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Login;

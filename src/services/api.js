const API_URL = 'http://localhost:5500'; // Replace with your backend URL

// Helper to get token from localStorage
const getToken = () => localStorage.getItem('token');

// Helper for setting Authorization headers
const authHeader = () => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  },
});

// Helper for checking response status
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

// User Authentication

export const login = async (data) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

export const register = async (data) => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

// Todo APIs

export const getTodos = async () => {
  const response = await fetch(`${API_URL}/todos`, {
    method: 'GET',
    ...authHeader(),
  });
  return handleResponse(response);
};

export const addTodo = async (data) => {
    console.log(data);
  const response = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

export const updateTodo = async (id, data) => {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

export const deleteTodo = async (id) => {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
    ...authHeader(),
  });
  return handleResponse(response);
};

// Profile APIs

export const getProfile = async () => {
  const response = await fetch(`${API_URL}/profile`, {
    method: 'GET',
    ...authHeader(),
  });
  return handleResponse(response);
};

export const updateProfile = async (data) => {
  const response = await fetch(`${API_URL}/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

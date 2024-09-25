import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTodoById, updateTodo } from '../services/api';

const EditTodo = () => {
  const { id } = useParams(); // Get the todo ID from the URL
  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTodo = async () => {
      try {
        const response = await fetchTodoById(id);
        setStatus(response.status); // Only load the status
        setLoading(false);
      } catch (err) {
        setError('Failed to load todo status');
        setLoading(false);
      }
    };

    loadTodo();
  }, [id]);

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateTodo(id, { status });
      navigate('/todos'); 
    } catch (err) {
      setError('Failed to update todo status');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-5">
  <h2 className="text-center">Update Todo Status</h2>
  <form onSubmit={handleSubmit} className="mt-4">
    <div className="mb-3">
      <label htmlFor="status" className="form-label">Status:</label>
      <select
        name="status"
        value={status}
        onChange={handleChange}
        className="form-select"
        id="status"
        required
      >
        <option value="pending">Pending</option>
        <option value="in progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
    <button type="submit" className="btn btn-primary">Save Status</button>
  </form>
</div>

  );
};

export default EditTodo;

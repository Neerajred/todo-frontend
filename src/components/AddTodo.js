import React, { useState } from 'react';
import { addTodo } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AddTodo = () => {
  const [task, setTask] = useState({task: '', status: 'pending' });
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addTodo(task);
      navigate('/todos');
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  return (
    <div className="container mt-5">
  <h2 className="text-center">Add Todo</h2>
  <form onSubmit={handleAdd} className="mt-4">
    <div className="mb-3">
      <textarea 
        className="form-control" 
        placeholder="Task" 
        rows="3" 
        onChange={(e) => setTask({ ...task, task: e.target.value })} 
      />
    </div>
    <div className="mb-3">
      <select 
        className="form-select" 
        onChange={(e) => setTask({ ...task, status: e.target.value })}
      >
        <option value="pending">Pending</option>
        <option value="in progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
    <button type="submit" className="btn btn-primary">Add Task</button>
  </form>
</div>

  );
};

export default AddTodo;

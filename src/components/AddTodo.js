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
    <div>
      <h2>Add Todo</h2>
      <form onSubmit={handleAdd}>
        <textarea placeholder="Task" onChange={(e) => setTask({ ...task, task: e.target.value })} />
        <select onChange={(e) => setTask({ ...task, status: e.target.value })}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTodo;

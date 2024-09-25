import React, { useEffect, useState } from 'react';
import { getTodos, deleteTodo } from '../services/api';
import { Link } from 'react-router-dom';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await getTodos();
        setTodos(response);
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      }
    };
    fetchTodos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };
  console.log(todos);
  return (
    <div className="container mt-5">
  <h2 className="text-center">Your Todos</h2>
  <Link to="/add-todo" className="btn btn-primary mb-3">Add New Todo</Link>
  <ul className="list-group">
    {todos.map(todo => (
      <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
        <span>
          {todo.task} - <span className={`badge ${todo.status === 'completed' ? 'bg-success' : 'bg-warning'}`}>{todo.status}</span>
        </span>
        <div>
          <button onClick={() => handleDelete(todo.id)} className="btn btn-danger btn-sm me-2">Delete</button>
          <Link to={`/todos/${todo.id}`} className="btn btn-secondary btn-sm ml-2">Edit</Link>
        </div>
      </li>
    ))}
  </ul>
</div>

  );
};

export default TodoList;

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
    <div>
      <h2>Your Todos</h2>
      <Link to="/add-todo">Add New Todo</Link>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.task} - {todo.status}
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
            <Link to={`/edit-todo/${todo.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

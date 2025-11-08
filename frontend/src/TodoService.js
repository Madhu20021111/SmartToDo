// src/TodoService.js
const API_URL = process.env.REACT_APP_API_URL;

export const getTodos = async () => {
  const res = await fetch(`${API_URL}/api/todos`);
  return res.json();
};

export const addTodo = async (todo) => {
  const res = await fetch(`${API_URL}/api/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  return res.json();
};

export const deleteTodo = async (id) => {
  const res = await fetch(`${API_URL}/api/todos/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};

export const toggleTodo = async (id, completed) => {
  const res = await fetch(`${API_URL}/api/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  });
  return res.json();
};


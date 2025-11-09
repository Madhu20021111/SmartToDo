import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { getTodos, addTodo, deleteTodo, toggleTodo } from "./TodoService";
import "./App.css";

// Login Page Component
function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin({ email, password });
      navigate("/todos");
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>SmartToDo</h1>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

// ToDo Page Component
function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      console.error("Failed to fetch todos:", err);
    }
  };

  const handleAdd = async () => {
    if (!task.trim()) return;
    try {
      await addTodo({ task });
      setTask("");
      fetchTodos();
    } catch (err) {
      console.error("Failed to add todo:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      fetchTodos();
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  };

  const handleToggle = async (id, currentStatus) => {
    try {
      await toggleTodo(id, !currentStatus);
      fetchTodos();
    } catch (err) {
      console.error("Failed to toggle todo:", err);
    }
  };

  return (
    <div className="App">
      <h1>SmartToDo</h1>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul>
        {todos.length === 0 && <li>No tasks yet!</li>}
        {todos.map((t) => (
          <li key={t._id}>
            <span
              onClick={() => handleToggle(t._id, t.completed)}
              style={{
                textDecoration: t.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {t.task}
            </span>
            <button onClick={() => handleDelete(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Main App Component with Router
function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={setUser} />} />
        <Route path="/todos" element={<TodoPage />} />
      </Routes>
    </Router>
  );
}

export default App;

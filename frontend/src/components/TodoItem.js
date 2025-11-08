// src/components/TodoItem.js
import React from 'react';

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li style={styles.item}>
      <div style={styles.left}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span
          style={{
            ...styles.text,
            textDecoration: todo.completed ? 'line-through' : 'none',
            color: todo.completed ? '#777' : '#000'
          }}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        style={styles.deleteButton}
      >
        Delete
      </button>
    </li>
  );
}

const styles = {
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '8px'
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  text: {
    fontSize: '1rem'
  },
  deleteButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'red',
    cursor: 'pointer'
  }
};

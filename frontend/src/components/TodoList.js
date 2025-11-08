// src/components/TodoList.js
import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return <p style={{ textAlign: 'center' }}>No tasks yet. Add one!</p>;
  }

  return (
    <ul style={styles.list}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

const styles = {
  list: {
    listStyle: 'none',
    padding: 0
  }
};

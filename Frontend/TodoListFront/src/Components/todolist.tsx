import React, { useState } from 'react';
import './styles/todolist.sass';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <aside className="sidebar">
        <h2>Menu</h2>
        <nav>
          <ul>
            <li><a href="#home">Accueil</a></li>
            <li><a href="#tasks">Mes tâches</a></li>
            <li><a href="#completed">Terminées</a></li>
            <li><a href="#settings">Paramètres</a></li>
          </ul>
        </nav>
      </aside>
      
      <main className="main-content">
        <h1>Ma Liste de Tâches</h1>
        
        <div className="todo-input">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ajouter une nouvelle tâche"
          />
          <button onClick={addTodo}>Ajouter</button>
        </div>

        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <span>{todo.text}</span>
              <button 
                className={`check-button ${todo.completed ? 'checked' : ''}`}
                onClick={() => toggleTodo(todo.id)}
                aria-label={todo.completed ? 'Marquer comme non terminée' : 'Marquer comme terminée'}
              >
                {todo.completed ? '✓' : ''}
              </button>
              <button onClick={() => deleteTodo(todo.id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default TodoList;

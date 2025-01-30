import React, { useState, useEffect } from 'react';
import './styles/todolist.sass';

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  // Récupérer les tâches depuis le back-end
  const fetchTodos = async () => {
    try {
      // Récupérer le token depuis le localStorage
      const token = localStorage.getItem('token'); // 'token' est la clé avec laquelle tu as stocké le token
  
      if (!token) {
        throw new Error('Token manquant');
      }
  
      const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Utiliser le token récupéré
        },
      });
  
      if (!response.ok) {
        throw new Error('Erreur de connexion');
      }
  
      const data = await response.json();
      console.log('Tâches récupérées:', data);
    } catch (error) {
      console.error('Erreur de récupération des tâches:', error);
    }
  };
  
  
  
 // Ajouter une nouvelle tâche
const addTodo = async () => {
  if (inputValue.trim() !== '') {
    try {
      const newTodo = {
        title: inputValue,
        description: inputValue,
        completed: false,
      };
      const token = localStorage.getItem('token'); // Récupérer le token du localStorage
      if (!token) {
        console.error('Token manquant');
        return;
      }

      const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Utiliser le vrai token ici
        },
        body: JSON.stringify(newTodo),
      });

      const data = await response.json();
      if (response.ok) {
        setTodos([...todos, data.task]);
        setInputValue('');
      } else {
        console.error('Erreur lors de l\'ajout de la tâche:', data.error);
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
    }
  }
};
// Supprimer une tâche
const deleteTodo = async (id: string) => {
  console.log("ID de la tâche à supprimer:", id); // DEBUG

  if (!id) {
    console.error("Erreur: ID de la tâche est indéfini !");
    return;
  }

  try {
    const token = localStorage.getItem('token'); 
    if (!token) {
      console.error('Token manquant');
      return;
    }

    const response = await fetch(`http://localhost:3000/tasks/${id}`, { // <-- Correction de l'URL
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      setTodos(todos.filter(todo => todo.id !== id));
    } else {
      const data = await response.json();
      console.error('Erreur lors de la suppression de la tâche:', data);
    }
  } catch (error) {
    console.error('Erreur de connexion:', error);
  }
};

// Marquer une tâche comme complétée
const toggleTodo = async (id: string) => {
  try {
    const token = localStorage.getItem('token'); // Récupérer le token du localStorage
    if (!token) {
      console.error('Token manquant');
      return;
    }

    const response = await fetch(`http://localhost:3000/api/tasks/${id}/toggle`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Utiliser le vrai token ici
      },
    });

    const data = await response.json();
    if (response.ok) {
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ));
    } else {
      console.error('Erreur lors de la mise à jour de la tâche:', data.error);
    }
  } catch (error) {
    console.error('Erreur de connexion:', error);
  }
};

  // Récupérer les tâches lors du chargement du composant
  useEffect(() => {
    fetchTodos();
  }, []);

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
  {todos.map((todo) => (
    <li key={todo.id || Math.random()} className={todo.completed ? 'completed' : ''}>
      <span>{todo.title}</span>
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


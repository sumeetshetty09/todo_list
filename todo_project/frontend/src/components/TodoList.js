// frontend/src/components/TodoList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoList.css'; // Import the CSS file

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('/todos/');
            setTodos(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Add a new todo
    const handleAddTodo = async () => {
        if (newTodo.trim()) {
            try {
                const response = await axios.post('/todos/', { title: newTodo, completed: false });
                setTodos([...todos, response.data]);
                setNewTodo('');
            } catch (error) {
                console.error("Error adding todo:", error);
            }
        }
    };

    // Update a todo's completed status
    const handleToggleCompleted = async (id, completed) => {
        try {
            const response = await axios.put(`/todos/${id}/`, { 
                title: title, // Include the title in the PUT request 
                completed: !completed });
            setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    // Delete a todo
    const handleDeleteTodo = async (id) => {
        try {
            await axios.delete(`/todos/${id}/`);
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    return (
        <div className="todo-container">
            <h1>To-Do List</h1>
            <ul className="todo-list">
                {todos.map(todo => (
                    <li key={todo.id} className="todo-item">
                        <span
                            className={`todo-title ${todo.completed ? 'completed' : ''}`}
                            onClick={() => handleToggleCompleted(todo.id, todo.completed, todo.title)}
                        >
                            {todo.title}
                        </span>
                        <button onClick={() => handleDeleteTodo(todo.id)} className="delete-button">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <div className="add-todo">
                <input
                    type="text"
                    placeholder="Add a new task"
                    value={newTodo}
                    onChange={e => setNewTodo(e.target.value)}
                />
                <button onClick={handleAddTodo}>Add</button>
            </div>
        </div>
    );
};

export default TodoList;

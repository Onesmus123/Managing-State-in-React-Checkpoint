// src/App.js
import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  const initialTasks = [
    { id: 1, number: 1, name: 'Practice dribbling', description: 'Spend 30 minutes on dribbling drills', completed: false },
    { id: 2, number: 2, name: 'Watch game footage', description: 'Analyze last match to improve performance', completed: false },
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [currentTask, setCurrentTask] = useState(null);
  const [nextTaskNumber, setNextTaskNumber] = useState(initialTasks.length + 1);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
      setNextTaskNumber(savedTasks.length + 1);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (name, description) => {
    const newTask = { id: Date.now(), number: nextTaskNumber, name, description, completed: false };
    setTasks([...tasks, newTask]);
    setNextTaskNumber(nextTaskNumber + 1);
  };

  const editTask = (id, name, description) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, name, description } : task
    );
    setTasks(updatedTasks);
  };

  const completeTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
    }
  };

  return (
    <div className="App">
      <Header />
      <TaskForm
        addTask={addTask}
        editTask={editTask}
        currentTask={currentTask}
        setCurrentTask={setCurrentTask}
      />
      <TaskList
        tasks={tasks}
        completeTask={completeTask}
        deleteTask={deleteTask}
        editTask={(task) => setCurrentTask(task)}
      />
      <Footer />
    </div>
  );
};

export default App;
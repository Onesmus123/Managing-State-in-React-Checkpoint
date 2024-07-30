// src/components/TaskForm.js
import React, { useState, useEffect } from 'react';

const TaskForm = ({ addTask, editTask, currentTask, setCurrentTask }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  useEffect(() => {
    if (currentTask) {
      setTaskName(currentTask.name);
      setTaskDescription(currentTask.description);
    }
  }, [currentTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName || !taskDescription) {
      alert('Both fields are required');
      return;
    }

    if (currentTask) {
      editTask(currentTask.id, taskName, taskDescription);
    } else {
      addTask(taskName, taskDescription);
    }

    setTaskName('');
    setTaskDescription('');
    setCurrentTask(null);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Task Description"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        required
      />
      <button type="submit">{currentTask ? 'Edit Task' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;

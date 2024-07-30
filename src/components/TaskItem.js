// src/components/TaskItem.js
import React from 'react';

const TaskItem = ({ task, completeTask, deleteTask, editTask }) => {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <h3>{task.number}. {task.name}</h3>
      <p>{task.description}</p>
      <button onClick={() => completeTask(task.id)}>Complete</button>
      <button onClick={() => editTask(task)}>Edit</button>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
};

export default TaskItem;

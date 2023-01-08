import React, { useState, useRef } from 'react';
import Task from './Task';

function List(props: { tasks: any[]; }) {
    const [tasks, setTasks] = useState(props.tasks);
    const [newTask, setNewTask] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        setTasks([...tasks, newTask]);
        setNewTask('');
    }

    return (
        <><p>To-do List:</p>
            {tasks.length === 0 ? (
                <p>No tasks to display</p>
            ) : (
                <ul>
                    {tasks.map((task, index) => (
                        <li key={index}>{task}</li>
                    ))}
                </ul>
            )}
            <form onSubmit={handleSubmit}>
                <input value={newTask} onChange={event => setNewTask(event.target.value)} />
                <button type="submit">Add task</button>
            </form></>);
}

export default List;
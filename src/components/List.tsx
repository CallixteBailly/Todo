import React, { useState, useRef } from 'react';
import Task from './Task';

function List(props: { tasks: any[]; }) {
    const [tasks, setTasks] = useState(props.tasks);
    const [newTask, setNewTask] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        if (newTask.trim().length !== 0) {
            setTasks([...tasks, newTask]);
            setNewTask('');
        }

    }

    return (
        <><p>To-do List:</p>
            {tasks.length === 0 ? (
                <p>No tasks to display</p>
            ) : (
                <ul>
                    {tasks.map((task: any, index: any) => (
                        <Task item={task}></Task>
                    ))}
                </ul>
            )}
            <form onSubmit={handleSubmit}>
                <input value={newTask} onChange={event => setNewTask(event.target.value)} />
                <button type="submit">Add task</button>
            </form></>);
}

export default List;
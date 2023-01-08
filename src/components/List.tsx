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
        <><p>To-do List:</p><ul>
            {tasks.map((item: any, index: any) => (
                <Task key={index} item={item} />
            ))}
        </ul>
        <form onSubmit={handleSubmit}>
        <input value={newTask} onChange={event => setNewTask(event.target.value)} />
        <button type="submit">Add task</button>
      </form></>);
}

export default List;
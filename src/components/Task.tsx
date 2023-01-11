import React, { useState } from 'react';

function Task(props) {
    const [isCompleted, setIsCompleted] = useState(false);

    function handleClick() {
        setIsCompleted(prevState => !prevState);
    }

    return (
        <li style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
            {props.item}
            <button onClick={handleClick}>
                {isCompleted ? 'Completed' : 'Work in progress'}
            </button>
        </li>
    )
}

export default Task;
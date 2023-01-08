import React, { useState } from 'react';

function Task(props) {
    const [isCompleted, setIsCompleted] = useState(false);

    function handleClick() {
        setIsCompleted(prevState => !prevState);
      }
    
      return (
        <li onClick={handleClick} style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
          {props.item}
        </li>)
}

export default Task;
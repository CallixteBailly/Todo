import { useState } from 'react';

interface Props{
    item: string;
}

const Task: React.FC<Props> = (props) => {
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
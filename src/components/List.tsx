import Task from './Task';

function List(props: { tasks: any[]; }) {
    return (
        <><p>To-do List:</p><ul>
            {props.tasks.map((item: any, index: any) => (
                <Task key={index} item={item} />
            ))}
        </ul></>);
}

export default List;
import * as ReactDOM from "react-dom";
import List from "./components/List";
const tasks = ['task 1', 'task 2', 'task 3'];

ReactDOM.render(<List tasks={tasks} />, document.getElementById("root"));
import * as ReactDOM from "react-dom";
import List from "./components/List";
const tasks = [];

ReactDOM.render(<List tasks={tasks} />, document.getElementById("root"));
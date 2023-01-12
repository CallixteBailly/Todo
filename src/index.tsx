import * as ReactDOM from "react-dom";

import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom'
import List from "./components/List";

const Home: React.FC = () => {
    return <h2>Accueil</h2>;
}

const tasks = [];

ReactDOM.render(
    <Router>
        <nav>
            <Link to="/">Accueil</Link>
            <Link to="/list">List</Link>
        </nav>
        
        <Route exact path="/" component={Home} />
        <Route path="/list" render={() => <List tasks={tasks} />} />
    </Router>
    , document.getElementById("root"));
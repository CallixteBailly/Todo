import * as ReactDOM from "react-dom";
import { useEffect } from "react";
import { BrowserRouter as Router, Link, Route, useHistory } from 'react-router-dom'
import {
    QueryClient,
    QueryClientProvider,
    useQuery
} from 'react-query';
import List from "./components/List";
import Login from "./components/Login";
import api from "./api";
import { getUserData } from "./components/AuthenticationServices";

const queryClient = new QueryClient();

const Home: React.FC = () => {
    return <h2>Accueil</h2>;
}
export default function App() {
    const { lastname, firstname } = getUserData() || {};

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        }
    }, []);

    return (
        <Router>
            {lastname && firstname ? ( // On vérifie si la liste de tâches est vide,
                <nav>
                    <Link to="/">Accueil</Link>
                    <Link to="/list">List</Link>
                    <Link to="/logout">Logout</Link>
                    <Link to={""}>{firstname} {lastname}</Link>
                </nav>
            ) : (
                <nav>
                    <Link to="/">Accueil</Link>
                    <Link to="/list">List</Link>
                    <Link to="/login">Login</Link>
                </nav>
            )}
            <Route exact path="/" component={Home} />
            <Route path="/list" render={() => <List />} />
            <Route path="/login" render={() => <Login />} />
            <Route path="/logout" render={() => {
                localStorage.clear();
                return <div>Logout</div>;
            }} />
        </Router>
    );
}

ReactDOM.render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>, document.getElementById("root"));
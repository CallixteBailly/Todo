import * as ReactDOM from "react-dom";

import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import List from "./components/List";
import {
    QueryClient,
    QueryClientProvider
} from 'react-query';

const queryClient = new QueryClient();

const Home: React.FC = () => {
    return <h2>Accueil</h2>;
}

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <nav>
                    <Link to="/">Accueil</Link>
                    <Link to="/list">List</Link>
                </nav>

                <Route exact path="/" component={Home} />
                <Route path="/list" render={() => <List />} />
            </Router>
        </QueryClientProvider>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
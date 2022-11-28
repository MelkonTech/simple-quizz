import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Container} from "@mui/material";
import HomePage from "./pages/HomePage.js"
import Settings from "./pages/Settings";
import Questions from "./pages/Questions";
import FinalScreen from "./pages/FinalScreen";

function App() {
    return (
        <Router>
            <Container maxWidth="md">
                <Switch>
                    <Route path="/" exact>
                        <HomePage/>
                    </Route>
                    <Route path="/settings">
                        <Settings/>
                    </Route>
                    <Route path="/questions">
                        <Questions/>
                    </Route>
                    <Route path="/score">
                        <FinalScreen/>
                    </Route>
                </Switch>
            </Container>
        </Router>
    );
}

export default App;

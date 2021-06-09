import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect, 
} from "react-router-dom";
import Login from '../login/login';
import Home from '../home/Home';

function App() {
  return (
    <section className="container">
      <div className="header">todos</div>
    <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
    </section>
  );
}

export default App;

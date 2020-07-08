import React, { Component } from "react"
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateTodos from "./components/create-todo.component"
import TodosList from "./components/todo-list.component"
import EditTodos from "./components/edit-todo.component"

class App extends Component {
  render(){ 
     return (
    <Router>
          <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="https://codingthesmartway.com" target="_blank" rel="noopener noreferrer">
              <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
            </a>
            <Link to="/" className="navbar-brand">MERN-Stack Todo</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Todos</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
        <h2>MERN-Todos App</h2>
        <Route path="/" exact component={TodosList} />
        <Route path="/edit/:id" component={EditTodos} />
        <Route path="/create" component={CreateTodos} />
        </div>
    </Router>
  );
}
}
export default App;

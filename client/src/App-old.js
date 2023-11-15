import React from "react"; 
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap"; 
import "bootstrap/dist/css/bootstrap.css"; 
import "./index.css"; 
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; 
import CreateTask from "./components/taskComponents/CreateTask"; 
import EditTask from "./components/taskComponents/EditTask"; 
import TaskList from "./components/taskComponents/TaskList";

const App = () => { 
  return ( 
    <Router> 
    <div className="App"> 
      <header className="App-header"> 
      <Navbar bg="dark" variant="dark"> 
        <Container> 
        <Navbar.Brand> 
          <Link to={"/create-task"} 
            className="nav-link"> 
            React App 
          </Link>
        </Navbar.Brand> 

        <Nav className="justify-content-end"> 
          <Nav> 
            <Link to={"/create-task"} 
              className="nav-link"> 
              Create Task
            </Link> 
          </Nav> 

          <Nav> 
            <Link to={"/task-list"}
              className="nav-link">
              Task List 
            </Link> 
          </Nav> 
        </Nav> 
        </Container> 
      </Navbar> 
      </header> 

      <Container> 
      <Row> 
        <Col md={12}> 
        <div className="wrapper"> 
          <Routes> 
            <Route exact path="/"
              element={(<CreateTask />)} /> 
            <Route path="/create-task"
              element={(<CreateTask />)} /> 
            <Route path="/edit-task/:id"
              element={(<EditTask />)} /> 
            <Route path="/task-list"
              element={(<TaskList />)} /> 
          </Routes> 
        </div> 
        </Col> 
      </Row> 
      </Container> 
    </div> 
    </Router> 
  ); 
}; 

export default App;

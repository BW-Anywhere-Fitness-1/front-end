import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ClassProvider } from "./Components/ClassContext";
import "./App.scss";
import PrivateRoute from "./Components/PrivateRoute";
import Nav from "./Components/Nav";
import ClassData from "./Components/ClassData";
import Login from "./Components/Login";
import InstructorInvitation from "./Components/InstructorInvitation";
import CreateClass from "./Components/CreateClass";
import Home from "./Components/Home";
import RegistrationForm from "./Components/RegistrationForm";
import InstructorLogin from "./Components/InstructorLogin";

function App() {
  return (
    <div className="App">
      <ClassProvider>
        <Router>
          <Nav />

          <Switch>
            <PrivateRoute path="/classes" component={ClassData} />
            <Route path="/instructorLogin" component={InstructorLogin} />
            <Route path="/login" component={Login} />
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/register" component={RegistrationForm} />
            <Route path="/auth-code" component={InstructorInvitation} />
            <PrivateRoute path="/create-class" component={CreateClass} />
          </Switch>
        </Router>
      </ClassProvider>
    </div>
  );
}

export default App;

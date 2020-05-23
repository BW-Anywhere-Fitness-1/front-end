import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import RegistrationForm from './Components/RegistrationForm';
import InstructorLogin from './Components/InstructorLogin';
import Nav from './Components/Nav';
import ClassData from './Components/ClassData';

function App() {
  return (
    <div className="App">
      <Nav />
      <Route exact path = "/">
        <Home />
      </Route>
      <Route exact path = "/register">
        <RegistrationForm />
      </Route>
      <Route exact path = "/login">
        <InstructorLogin />
      </Route>
      <Route exact path= "/classes">
        <ClassData />
      </Route>
    </div>
  );
}

export default App;

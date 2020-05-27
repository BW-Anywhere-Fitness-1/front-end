import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import RegistrationForm from "./Components/RegistrationForm";
import InstructorLogin from "./Components/InstructorLogin";
import Nav from "./Components/Nav";
import ClassData from "./Components/ClassData";
import Login from "./Components/Login";
import { ClassProvider } from "./Components/ClassContext";
import ClassList from "./Components/ClassList";
import PrivateRoute from "./Components/PrivateRoute";
import InstructorInvitation from "./Components/InstructorInvitation";

function App() {
	return (
		<div className='App'>
			<ClassProvider>
				<Router>
					<Nav />

					<Switch>
						<PrivateRoute path='/classes' component={ClassData} />
						<Route path='/instructorLogin' component={InstructorLogin} />
						<Route path='/login' component={Login} />
						<Route exact path='/' component={Home} />
						<Route exact path='/register' component={RegistrationForm} />
						<Route path='/auth-code' component={InstructorInvitation} />
					</Switch>
				</Router>
			</ClassProvider>
		</div>
	);
}

export default App;

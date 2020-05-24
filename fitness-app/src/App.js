import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import RegistrationForm from "./Components/RegistrationForm";
import InstructorLogin from "./Components/InstructorLogin";
import Nav from "./Components/Nav";
import ClassData from "./Components/ClassData";
import Login from "./Components/Login";
import { ClassProvider } from "./Components/ClassContext";
import ClassList from './Components/ClassList'

function App() {
	return (
		<div className='App'>
			<ClassProvider>
				<Nav />
				
				<Route exact path='/'>
					<Home />
				</Route>
				<Route exact path='/register'>
					<RegistrationForm />
				</Route>
				<Route exact path='/login'>
					<InstructorLogin />
					<Login />
				</Route>
				<Route exact path='/classes'>
					{/* <ClassData /> */}
					<ClassList/>
				</Route>
			</ClassProvider>
		</div>
	);
}

export default App;

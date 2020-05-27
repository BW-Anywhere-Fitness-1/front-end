import React, { useState } from "react";
import { Link } from "react-router-dom";

import { AxiosWithAuth } from "./utils/AxiosWithAuth";

const Login = (props) => {
	const [credentials, setCredentilas] = useState({
		username: "",
		password: "",
	});
	const handleChange = (e) => {
		setCredentilas({
			...credentials,
			[e.target.name]: e.target.value,
		});
	};
	const login = (e) => {
		e.preventDefault();
		console.log(credentials);
		AxiosWithAuth()
			.post("/login", credentials)
			.then((res) => {
				localStorage.setItem("token", res.data.access_token);
				props.history.push("/classes");
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div className='loginForm'>
			<form onSubmit={login} className='registerForm'>
				<h2>For Clients</h2>
				<input
					className='inputForm'
					type='text'
					name='username'
					placeholder='User Name'
					value={credentials.username}
					onChange={handleChange}
				/>
				<br />
				<input
					className='inputForm'
					type='password'
					name='password'
					placeholder='Password'
					value={credentials.password}
					onChange={handleChange}
				/>
				<br />
				<button type='submit' className='form-btn'>
					Log In
				</button>
			</form>
			<button className='nav-btn'>
				<Link to='/register' className='nav-link'>
					Register
				</Link>
			</button>
		</div>
	);
};

export default Login;

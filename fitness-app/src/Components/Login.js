import React, { useState } from "react";

// import { AxiosWithAuth } from "../utils/AxiosWithAuth";

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
	// const login = (e) => {
	// 	e.preventDefault();
	// 	console.log(credentials);
	// 	AxiosWithAuth()
	// 		.post("/login", credentials)
	// 		.then((res) => {
	// 			localStorage.setItem("token", res.data.payload);
	// 			props.history.push("/bubbles");
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };
	return (
		<section className='loginForm'>
			{/* <form onSubmit={login}> */}
			<form className='registerForm'>
				<h2>For Clients</h2>
				<input
				 className='inputForm'
					type='text'
					name='username'
					placeholder='User Name'
					value={credentials.username}
					onChange={handleChange}
					className='form'
				/>
				<br />
				<input
					className='inputForm'
					type='password'
					name='password'
					placeholder='Password'
					value={credentials.password}
					onChange={handleChange}
					className='form'
				/>
				<br />
				<button type='submit' className='form-btn'>
					Log In
				</button>
			</form>
		</section>
	);
};

export default Login;

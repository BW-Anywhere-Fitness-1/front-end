import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function InstructorInvitation() {
	const [email, setEmail] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("https://any-fitness.herokuapp.com/api/v1/auth/auth-code", {
				email,
			})
			.then((res) => console.log(res.data))
			.catch((err) => console.log(err.response.data));
	};

	return (
		<div className='invitation'>
			<form onSubmit={handleSubmit}>
				<input
					className='inputForm'
					type='email'
					name='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				></input>
				<button className='form-btn'>Submit</button>
			</form>
			<button className='nav-btn-create'>
				<Link to='/classes' className='nav-link'>
					Back to Classes
				</Link>
			</button>
		</div>
	);
}

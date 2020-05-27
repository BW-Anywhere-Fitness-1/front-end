import React, { useState } from "react";
import axios from "axios";

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
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type='email'
					name='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				></input>
				<button>Submit</button>
			</form>
		</div>
	);
}

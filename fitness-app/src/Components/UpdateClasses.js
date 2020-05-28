import React, { useContext, useEffect } from "react";
import { AxiosWithAuth } from "./utils/AxiosWithAuth";
import { ClassContext } from "./ClassContext";
import { Link } from "react-router-dom";

function UpdateClasses(props) {
	console.log("props are:", props);
	const [classes, setClasses] = useContext(ClassContext);

	// useEffect(() => {
	// 	AxiosWithAuth.get(`/classes/${props.match.params.id}`)
	// 		.then((result) => {
	// 			setClasses(result.data);
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});
	// 	// we're subscribing to the param, just in case it ever changes
	// 	// so it'll re-fetch with the new ID
	// }, [props.match.params.id]);

	const handleChange = (event) => {
		setClasses({
			...classes,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(classes);
		AxiosWithAuth()
			.put(`/classes/${classes.id}`, classes)
			.then((result) => {
				// redirect to the classes page after the success was successful,
				// which will re-fetch the classes (and the updated data)
				props.history.push("/classes");
				// console.log(result)
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<h1>Manage Classes</h1>
			<button className='nav-btn-create'>
				<Link to='/classes' className='nav-link'>
					Back to Classes
				</Link>
			</button>

			<form onSubmit={handleSubmit}>
				<input
                className='inputForm'
					type='text'
					name='name'
					placeholder='Name'
					value={classes.name}
					onChange={handleChange}
				/>
				<input
                className='inputForm'
					type='text'
					name='duration'
					placeholder='Duration'
					value={classes.duration}
					onChange={handleChange}
				/>

				<button type='submit' className='form-btn'>Save</button>
			</form>
		</>
	);
}

export default UpdateClasses;

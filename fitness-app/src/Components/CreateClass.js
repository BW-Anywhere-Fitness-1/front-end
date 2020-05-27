import React, { useState } from "react";
import {AxiosWithAuth} from './utils/AxiosWithAuth'

export default function CreateClass() {
	const [classes, setClasses] = useState({
		name: "",
		type: "",
		start_time: "",
		duration: "",
		level: "",
		location: "",
		attendees: "",
		max_size: "",
		schedule: "",
		description: "",
	});

	const handleChange = (e) => {
		e.preventDefault();
		setClasses({
			...classes,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(classes);
		const payload = {
			...classes,
			type: parseInt(classes.type),
			level: parseInt(classes.level),
			schedule: classes.schedule.split(","),
		};
		AxiosWithAuth()
			.post("/classes", payload)
			.then((res) => console.log(res))
			.catch((err) => console.log(err.response.data));
	};

	return (
		<div className='create-class'>
			<h1> Create a Class</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor='type' className='labelForm'>
					Select type:
					<select
						className='inputForm'
						value={classes.type}
						name='type'
						id='type'
						onChange={handleChange}
					>
						<option value='select'>Select One</option>
						<option value='1'>Yoga</option>
						<option value='2'>Martial Arts</option>
						<option value='3'>Pilates</option>
					</select>
				</label>
				<label htmlFor='name'>
					Name:
					<input
						type='text'
						name='name'
						value={classes.name}
						onChange={handleChange}
					></input>
				</label>
				<label htmlFor='start_time'>
					Start time:
					<input
						type='text'
						name='start_time'
						value={classes.start_time}
						onChange={handleChange}
					></input>
				</label>
				<label htmlFor='duration'>
					Duration:
					<input
						type='text'
						name='duration'
						value={classes.duration}
						onChange={handleChange}
					></input>
				</label>
				<label htmlFor='level' className='labelForm'>
					Select level:
					<select
						className='inputForm'
						value={classes.level}
						name='level'
						id='level'
						onChange={handleChange}
					>
						<option value='select'>Select One</option>
						<option value='1'>Beginner</option>
						<option value='2'>Intermediate</option>
						<option value='3'>Advanced</option>
					</select>
				</label>
				<label htmlFor='location'>
					Location:
					<input
						type='text'
						name='location'
						value={classes.location}
						onChange={handleChange}
					></input>
				</label>
				<label htmlFor='atendees'>
					Atendees:
					<input
						type='number'
						name='atendees'
						value={classes.atendees}
						onChange={handleChange}
					></input>
				</label>
				<label htmlFor='max_size'>
					Max Size:
					<input
						type='number'
						name='max_size'
						value={classes.max_size}
						onChange={handleChange}
					></input>
				</label>
				<label htmlFor='schedule'>
					Schedule:
					<input
						type='text'
						name='schedule'
						value={classes.schedule}
						onChange={handleChange}
					></input>
				</label>
				<label htmlFor='description'>
					Description:
					<textarea
						name='description'
						value={classes.description}
						onChange={handleChange}
					/>
				</label>
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
}

// to create a class in database by axios.post

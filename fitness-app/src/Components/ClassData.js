import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ClassCard from "./ClassCard";
import homeImg from "../Assets/home_img.jpg";
import { AxiosWithAuth } from "./utils/AxiosWithAuth";

const initialClass = {
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
};

export default function ClassData() {
	const [classes, setClasses] = useState([]);
	const [editing, setEditing] = useState(false);
	const [classToEdit, setClassToEdit] = useState(initialClass);

	const getClasses = () => {
		AxiosWithAuth()
			.get("/classes")
			.then((res) => setClasses(res.data));
	};
	useEffect(() => {
		getClasses();
	}, []);

	//Editing class
	const editClass = (item) => {
		console.log(item);
		setEditing(true);
		setClassToEdit(item);
	};
	// Saving edited class
	const saveEdit = (e) => {
		e.preventDefault();
        console.log(classToEdit)
		// const payload = {
		// 	...classToEdit,
		// 	type: parseInt(classToEdit.type),
		// 	level: parseInt(classToEdit.level),
		// 	attendees: parseInt(classToEdit.attendees),
		// 	max_size: parseInt(classToEdit.max_size),
		// 	schedule: classToEdit.schedule.split(",").map((day) => day.trim()),
		// };
		// console.log('payload', payload);
        const id = classToEdit.id;
    

		// AxiosWithAuth()
		// 	.put(`/classes/${id}`, payload)

		// 	.then((res) => {
		// 		setEditing(false);
		// 		getClasses();
		// 	})
		// 	.catch((err) => console.log("Edit Error: ", err));
	};

	const handleChange = (e) => {
		e.preventDefault();
		setClassToEdit({ [e.target.name]: e.target.value });
	};

	//deleting classes
	const handleDelete = (event, id) => {
		event.preventDefault();
		const item = classes.find((item) => item.id === id);
		//ask for confirmation before deleting
		if (window.confirm("Are you sure you want to delete this user?")) {
			AxiosWithAuth()
				.delete(`/classes/${id}`)
				.then((result) => {
					console.log("Item was deleted");
					setClasses(classes.filter((item) => item.id !== id));
				})
				.catch((error) => {
					console.log(error);

					// put class back if the request wasn't successful
					setClasses([...classes, item]);
				});
		}
	};

	return (
		<div>
			<button className='nav-btn-create'>
				<Link to='/create-class' className='nav-link'>
					Create Class
				</Link>
			</button>
			<h1 className='card-title'>Trending Classes</h1>

			<div className='class-list'>
				{classes.map((item) => (
					<div className='class-item' key={item.id}>
						<button
							onClick={(e) => handleDelete(e, item.id)}
							className='class-btn'
						>
							Delete
						</button>
						<button onClick={() => editClass(item)} className='class-btn'>
							Update
						</button>
						<img src={homeImg} alt='woman boxing' className='class-img' />
						<ClassCard
							key={item.id}
							name={item.name}
							type={item.type}
							schedule={item.schedule}
							instructor={item.instructor}
							duration={item.duration}
							start_time={item.start_time}
							max_size={item.max_size}
							level={item.level}
						/>
					</div>
				))}
			</div>

			{editing && (
				// <form onSubmit={saveEdit}>
				// 	<legend>Edit Class</legend>
				// 	<label>
				// 		Class name:
				// 		<input
				// 			onChange={(e) =>
				// 				setClassToEdit({ ...classToEdit, name: e.target.value })
				// 			}
				// 			value={classToEdit.name}
				// 		/>
				// 	</label>
				//     <label>
				// 		Class type:
				// 		<input
				// 			onChange={(e) =>
				// 				setClassToEdit({ ...classToEdit, type: e.target.value })
				// 			}
				// 			value={classToEdit.type}
				// 		/>
				// 	</label>
				//     <label>
				// 		Schedule:
				// 		<input
				// 			onChange={(e) =>
				// 				setClassToEdit({ ...classToEdit, schedule: e.target.value })
				// 			}
				// 			value={classToEdit.schedule}
				// 		/>
				// 	</label>
				//     <button type='submit'>Submit</button>
				// </form>
				<form onSubmit={saveEdit} className='registerForm'>
					<label htmlFor='type' className='labelForm'>
						Select type:
						<select
							className='inputForm'
							value={classToEdit.type}
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
					<label htmlFor='name' className='labelForm'>
						Name:
						<input
							type='text'
							name='name'
							value={classToEdit.name}
							onChange={handleChange}
						></input>
					</label>
					<label htmlFor='start_time' className='labelForm'>
						Start time:
						<input
							type='text'
							name='start_time'
							value={classToEdit.start_time}
							onChange={handleChange}
						></input>
					</label>
					<label htmlFor='duration' className='labelForm'>
						Duration:
						<input
							type='text'
							name='duration'
							value={classToEdit.duration}
							onChange={handleChange}
						></input>
					</label>
					<label htmlFor='level' className='labelForm'>
						Select level:
						<select
							className='inputForm'
							value={classToEdit.level}
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
					<label htmlFor='location' className='labelForm'>
						Location:
						<input
							type='text'
							name='location'
							value={classToEdit.location}
							onChange={handleChange}
						></input>
					</label>
					<label htmlFor='attendees' className='labelForm'>
						Attendees:
						<input
							type='number'
							name='attendees'
							value={classToEdit.attendees}
							onChange={handleChange}
						></input>
					</label>
					<label htmlFor='max_size' className='labelForm'>
						Max Size:
						<input
							type='number'
							name='max_size'
							value={classToEdit.max_size}
							onChange={handleChange}
						></input>
					</label>
					<label htmlFor='schedule' className='labelForm'>
						Schedule:
						<input
							type='text'
							name='schedule'
							value={classToEdit.schedule}
							onChange={handleChange}
						></input>
					</label>
					<label htmlFor='description' className='labelForm'>
						Description:
						<textarea
							name='description'
							value={classToEdit.description}
							onChange={handleChange}
						/>
					</label>
					<button type='submit' className='form-btn'>
						Submit
					</button>
				</form>
			)}
		</div>
	);
}

import React, { useContext, useEffect } from "react";
import axios from "axios";
import ClassCard from "./ClassCard";
import { ClassContext } from "./ClassContext";
import UpdateClasses from "./UpdateClasses";
import homeImg from "../Assets/home_img.jpg";

export default function ClassData() {
	const [classes, setClasses] = useContext(ClassContext);

	useEffect(() => {
		axios
			.get("https://any-fitness.herokuapp.com/api/v1/search/classes?q=")
			.then((res) => {
				console.log(res.data);
				setClasses(res.data);
			})
			.catch((err) => {
				console.log("Error", err);
			});
	}, []);

	const handleDelete = (event, id) => {
		event.preventDefault();
		const item = classes.find((item) => item.id === id);
		if (window.confirm("Are you sure you want to delete this user?")) {
			// an optimistic update, assuming the request was successful
			// so we don't have to wait for it to complete
			setClasses(classes.filter((item) => item.id !== id));

			axios
				.delete(`/classes/${id}`)
				.then((result) => {
					console.log("Item was deleted");
				})
				.catch((error) => {
					console.log(error);

					// put user back if the request wasn't successful
					setClasses([...classes, item]);
				});
		}
	};

	return (
		<div>
			<h1 className='card-title'>Trending Classes</h1>
			<UpdateClasses />
			<div className='class-list'>
				{classes.map((item) => (
					<div className='class-item'>
						<button onClick={(e) => handleDelete(e, classes.id)}>Delete</button>
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
		</div>
	);
}

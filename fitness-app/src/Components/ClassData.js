import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ClassCard from "./ClassCard";
import { ClassContext } from "./ClassContext";
import homeImg from "../Assets/home_img.jpg";
import { AxiosWithAuth } from "./utils/AxiosWithAuth";

export default function ClassData() {
	const [classes, setClasses] = useState([])

	useEffect(() => {
		AxiosWithAuth()
			.get("/classes")
			.then((res) => setClasses(res.data));
	}, []);

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
					<div className='class-item'>
						<button onClick={(e) => handleDelete(e, item.id)}>Delete</button>
						<button>
							<Link to='/update'>Update</Link>
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
		</div>
	);
}

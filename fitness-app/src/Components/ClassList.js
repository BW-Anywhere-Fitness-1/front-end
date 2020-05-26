import React, { useContext } from "react";
import ClassCard from "./ClassCard";
import { ClassContext } from "./ClassContext";
import homeImg from "../Assets/home_img.jpg";
import UpdateClasses from './UpdateClasses'

const ClassList = () => {
	const [classes] = useContext(ClassContext);
	return (
		<div>
			<h1 className='card-title'>Trending Classes</h1>
			<div className='class-list'>
				<UpdateClasses/>
				{classes.map((item) => (
					<div className='class-item'>
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
};

export default ClassList;

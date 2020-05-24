import React, { useState, createContext } from "react";

export const ClassContext = createContext();

export const ClassProvider = (props) => {
	const [classes, setClasses] = useState([
		{
			id: 0,
            max_size: "15 people",
            level: 'intermediate',
			start_time: "10 am",
			name: "Zen Meditation",
			instructor: "John Doe",
			duration: "10 min",
		},
		{
            id: 1,
            max_size: "10 people",
            level: 'beginner',
			start_time: "10 am",
			name: "Triceps Dip",
			instructor: "Jerry Colen",
			duration: "7 min",
		},
		{
            id: 2,
            max_size: "15 people",
            level: 'intermediate',
			start_time: "10 am",
			name: "Barbell Lifting",
			instructor: "Sarah Conner",
			duration: "15 min",
		},
		{
            id: 3,
            max_size: "20 people",
            level: 'advanced',
			start_time: "10 am",
			name: "Cycling Cardio",
			instructor: "Jake Jolper",
			duration: "30 min",
		},
	]);
	return (
		<ClassContext.Provider value={[classes, setClasses]}>
			{props.children}
		</ClassContext.Provider>
	);
};

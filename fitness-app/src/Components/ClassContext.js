import React, { useState, createContext } from "react";

export const ClassContext = createContext();

export const ClassProvider = (props) => {
	const [classes, setClasses] = useState([
		{
            id: 0,
            type: 'Yoga & Meditation',
            schedule: 'Mondays & Wednesdays',
            max_size: "15 people",
            level: 'Intermediate',
			start_time: "7 pm",
			name: "Zen Meditation",
			instructor: "John Doe",
			duration: "10 min",
		},
		{
            id: 1,
            type: 'Pilates',
            schedule: 'Saturdays',
            max_size: "10 people",
            level: 'Beginner',
			start_time: "10 am",
			name: "Triceps Dip",
			instructor: "Jerry Colen",
			duration: "7 min",
		},
		{
            id: 2,
            type: 'Weightlifting',
            schedule: 'Mondays & Thursdays',
            max_size: "15 people",
            level: 'Intermediate',
			start_time: "8 pm",
			name: "Barbell Lifting",
			instructor: "Sarah Conner",
			duration: "15 min",
		},
		{
            id: 3,
            type: 'Cardio',
            schedule: 'Tuesdays & Fridays',
            max_size: "20 people",
            level: 'Advanced',
			start_time: "7 pm",
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

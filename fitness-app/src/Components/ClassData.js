import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ClassCard from './ClassCard';
// import { ClassContext } from "./ClassContext";

export default function ClassData() {
    const [classData, setClassData] = useState([{
        id: "",
        name: "",
        city: "",
        state: ""
    }]);

    useEffect(() => {
        axios
            .get("https://any-fitness.herokuapp.com/api/v1/search/classes?q=")
            .then(res => {
                console.log(res.data)
                setClassData(res.data);
            })
            .catch(err => {
                console.log("Error", err)
            });
    }, []);
    return (
        <div>
            {classData.map(attr => {
                return (
                    <ClassCard
                    key={attr.id}
                    name={attr.name}
                    start_time={attr.start_time}
                    duration={attr.duration}
                    schedule={attr.schedule}
                    type={attr.type}
                    level={attr.level}
                    max_size={attr.max_size}
                    />
                )
            })}
        </div>
    );
}

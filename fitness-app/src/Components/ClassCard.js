import React from 'react';

const ClassCard = props => {

    return (
        <div className="outer-container">
            <div className="inner-container">
                <h1>Class Name: {props.name}</h1>
                <p>Start Time: {props.start_time}</p>
                <p>Duration: {props.duration}</p>
                <p>Schedule: {props.schedule}</p>
                <p>Class Type: {props.type}</p>
                <p>Intensity Level: {props.level}</p>
                <p>Max Class Size: {props.max_size}</p>
            </div>
        </div>
    )
};

export default ClassCard;

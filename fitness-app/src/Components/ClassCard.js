import React from 'react';

const ClassCard = props => {

    return (
        <div className="outer-container">
            <div className="inner-container">
                <h1>Class Name: {props.name}</h1>
                <p>City: {props.city}</p>
                <p>State: {props.state}</p>
            </div>
        </div>
    )
};

export default ClassCard;

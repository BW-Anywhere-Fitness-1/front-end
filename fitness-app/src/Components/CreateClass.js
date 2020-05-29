import React, { useState } from "react";
import { AxiosWithAuth } from "./utils/AxiosWithAuth";
import { Link, useHistory } from "react-router-dom";

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
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(classes);
    const payload = {
      ...classes,
      type: parseInt(classes.type),
      level: parseInt(classes.level),
      attendees: parseInt(classes.attendees),
      max_size: parseInt(classes.max_size),
      schedule: classes.schedule.split(",").map((day) => day.trim()),
    };
    console.log(payload);
    AxiosWithAuth()
      .post("/classes", payload)
      .then((res) => {
        console.log(res);
        history.push("/classes");
      })
      .catch((err) => console.log(err.response.data));
  };

  return (
    <div className="container create-class">
      <h1> Create a Class</h1>
      <form onSubmit={handleSubmit} className="registerForm">
        <label htmlFor="type" className="labelForm">
          Select type:
          <select
            className="inputForm"
            value={classes.type}
            name="type"
            id="type"
            onChange={handleChange}
          >
            <option value="select">Select One</option>
            <option value="1">Yoga</option>
            <option value="2">Martial Arts</option>
            <option value="3">Pilates</option>
          </select>
        </label>
        <label htmlFor="name" className="labelForm">
          Name:
          <input
            type="text"
            name="name"
            value={classes.name}
            onChange={handleChange}
          ></input>
        </label>
        <label htmlFor="start_time" className="labelForm">
          Start time:
          <input
            type="text"
            name="start_time"
            value={classes.start_time}
            onChange={handleChange}
          ></input>
        </label>
        <label htmlFor="duration" className="labelForm">
          Duration:
          <input
            type="text"
            name="duration"
            value={classes.duration}
            onChange={handleChange}
          ></input>
        </label>
        <label htmlFor="level" className="labelForm">
          Select level:
          <select
            className="inputForm"
            value={classes.level}
            name="level"
            id="level"
            onChange={handleChange}
          >
            <option value="select">Select One</option>
            <option value="1">Beginner</option>
            <option value="2">Intermediate</option>
            <option value="3">Advanced</option>
          </select>
        </label>
        <label htmlFor="location" className="labelForm">
          Location:
          <input
            type="text"
            name="location"
            value={classes.location}
            onChange={handleChange}
          ></input>
        </label>
        <label htmlFor="attendees" className="labelForm">
          Attendees:
          <input
            type="number"
            name="attendees"
            value={classes.attendees}
            onChange={handleChange}
          ></input>
        </label>
        <label htmlFor="max_size" className="labelForm">
          Max Size:
          <input
            type="number"
            name="max_size"
            value={classes.max_size}
            onChange={handleChange}
          ></input>
        </label>
        <label htmlFor="schedule" className="labelForm">
          Schedule:
          <input
            type="text"
            name="schedule"
            value={classes.schedule}
            onChange={handleChange}
          ></input>
        </label>
        <label htmlFor="description" className="labelForm">
          Description:
          <textarea
            name="description"
            value={classes.description}
            onChange={handleChange}
          />
        </label>
        <div className="form-action">
          <button type="submit" className="form-btn">
            Submit
          </button>
          <button className="nav-btn-create">
            <Link to="/classes" className="nav-link">
              Back to Classes
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
}

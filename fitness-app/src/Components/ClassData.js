import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ClassCard from "./ClassCard";
import homeImg from "../Assets/home_img.jpg";
import { AxiosWithAuth } from "./utils/AxiosWithAuth";
import Search from "./Search";
import { useLocalStorage } from "./../hooks";

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
  const [registrations, setRegistrations] = useState([]);
  const [editing, setEditing] = useState(false);
  const [classToEdit, setClassToEdit] = useState(initialClass);
  const [user, setUser] = useLocalStorage("user", null);

  useEffect(() => {
    getClasses();
    getRegistrations();
  }, []);

  const getClasses = () => {
    AxiosWithAuth()
      .get("/classes")
      .then((res) => setClasses(res.data));
  };

  const getRegistrations = () => {
    AxiosWithAuth()
      .get("/registrations")
      .then((res) => setRegistrations(res.data));
  };

  const isRegister = (classes) => {
    if (classes.max_size === classes.attendees) return true;
    if (classes && classes.id) {
      const reg = registrations.filter(
        (reg) =>
          reg.class_id === classes.id && reg.student_id === user.payload.subject
      );
      return reg.length && reg[0].id ? true : false;
    }
    return false;
  };

  const handleCancel = (classes) => {
    if (classes && classes.id) {
      const reg = registrations.filter(
        (reg) =>
          reg.class_id === classes.id && reg.student_id === user.payload.subject
      );
      if (reg.length && reg[0].id) {
        AxiosWithAuth()
          .delete(`/registrations/${reg[0].id}`)
          .then((res) => {
            getClasses();
            getRegistrations();
          })
          .catch((error) => console.log(error.response.data));
      }
    }
  };

  //Editing class
  const editClass = (item) => {
    console.log(item);
    setEditing(true);
    setClassToEdit({
      ...item,
      schedule: item.schedule.replace(" |", ","),
    });
  };
  // Saving edited class
  const saveEdit = (e) => {
    e.preventDefault();
    console.log(classToEdit);
    const payload = {
      ...classToEdit,
      type: parseInt(classToEdit.type),
      level: parseInt(classToEdit.level),
      attendees: parseInt(classToEdit.attendees),
      max_size: parseInt(classToEdit.max_size),
      schedule: classToEdit.schedule.split(",").map((day) => day.trim()),
    };
    console.log("payload", payload);
    const id = classToEdit.id;

    AxiosWithAuth()
      .put(`/classes/${id}`, payload)

      .then((res) => {
        setEditing(false);
        getClasses();
        getRegistrations();
      })
      .catch((err) => console.log("Edit Error: ", err));
  };

  const handleChange = (e) => {
    e.preventDefault();
    setClassToEdit({ ...classToEdit, [e.target.name]: e.target.value });
  };

  const handleEnroll = (e, item) => {
    e.preventDefault();
    AxiosWithAuth()
      .post("/registrations", { class_id: item.id })
      .then((res) => {
        console.log(res.data);
        getClasses();
      })
      .catch((error) => console.log(error.response.data));
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
    <div className="container">
      {editing === false && (
        <>
          <Search setClassList={setClasses} />
          {user.payload.role_id === 3 && (
            <button className="nav-btn-create">
              <Link to="/create-class" className="nav-link">
                Create Class
              </Link>
            </button>
          )}
          <h1 className="card-title">Trending Classes</h1>

          <div className="class-list">
            {classes.map((item) => (
              <div className="class-item" key={item.id}>
                <img src={homeImg} alt="woman boxing" className="class-img" />
                <ClassCard key={item.id} {...item} />
                {user.payload.role_id === 3 && (
                  <div className="card-actions">
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="class-btn"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => editClass(item)}
                      className="class-btn"
                    >
                      Update
                    </button>
                  </div>
                )}
                {user.payload.role_id === 2 && (
                  <div className="card-actions">
                    <button
                      onClick={(e) => handleEnroll(e, item)}
                      className="class-btn"
                      disabled={isRegister(item)}
                    >
                      Enroll
                    </button>
                    {isRegister(item) && (
                      <button
                        onClick={(e) => handleCancel(e, item)}
                        className="class-btn danger"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
      {/* Editing Form*/}
      {editing && (
        <form onSubmit={saveEdit} className="registerForm">
          <label htmlFor="type" className="labelForm">
            Select type:
            <select
              className="inputForm"
              value={classToEdit.type}
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
              value={classToEdit.name}
              onChange={handleChange}
            ></input>
          </label>
          <label htmlFor="start_time" className="labelForm">
            Start time:
            <input
              type="text"
              name="start_time"
              value={classToEdit.start_time}
              onChange={handleChange}
            ></input>
          </label>
          <label htmlFor="duration" className="labelForm">
            Duration:
            <input
              type="text"
              name="duration"
              value={classToEdit.duration}
              onChange={handleChange}
            ></input>
          </label>
          <label htmlFor="level" className="labelForm">
            Select level:
            <select
              className="inputForm"
              value={classToEdit.level}
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
              value={classToEdit.location}
              onChange={handleChange}
            ></input>
          </label>
          <label htmlFor="attendees" className="labelForm">
            Attendees:
            <input
              type="number"
              name="attendees"
              value={classToEdit.attendees}
              onChange={handleChange}
            ></input>
          </label>
          <label htmlFor="max_size" className="labelForm">
            Max Size:
            <input
              type="number"
              name="max_size"
              value={classToEdit.max_size}
              onChange={handleChange}
            ></input>
          </label>
          <label htmlFor="schedule" className="labelForm">
            Schedule:
            <input
              type="text"
              name="schedule"
              value={classToEdit.schedule}
              onChange={handleChange}
            ></input>
          </label>
          <label htmlFor="description" className="labelForm">
            Description:
            <textarea
              name="description"
              value={classToEdit.description}
              onChange={handleChange}
            />
          </label>
          <div className="form-action">
            <button type="submit" className="form-btn">
              Submit
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

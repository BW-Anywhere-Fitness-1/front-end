import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";

const formSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a vlaid email")
    .required("Must include email address"),
  password: yup.string().required("Password is a required field"),
});

export default function InstructorLogin() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    formSchema.isValid(user).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [user]);

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const validate = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setError({
          ...error,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        console.log("error", err);
        setError({
          ...error,
          [e.target.name]: err.errors[0],
        });
      });

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const inputChange = (e) => {
    e.persist();
    validate(e);
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  //redirect to login page by using useHistory !!!!
  const formSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    axios
      .post("https://any-fitness.herokuapp.com/api/v1/auth/login/", user)
      .then((res) => localStorage.setItem("token", res.data.access_token))

      // console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={formSubmit} className="login registerForm">
      <h2>For Instructors</h2>
      <label htmlFor="email" className="labelForm">
        Email:
        <input
          className="inputForm"
          type="email"
          name="email"
          id="email"
          value={user.email}
          onChange={inputChange}
        />
      </label>
      {error.email.length > 0 ? <p className="error">{error.email}</p> : null}
      <label htmlFor="password" className="labelForm">
        Password:
        <input
          className="inputForm"
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={inputChange}
        />
      </label>
      {error.password.length > 0 ? (
        <p className="error">{error.password}</p>
      ) : null}
      <button disabled={buttonDisabled} className="form-btn">
        Login
      </button>
      <button className="nav-btn">
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </button>
    </form>
  );
}

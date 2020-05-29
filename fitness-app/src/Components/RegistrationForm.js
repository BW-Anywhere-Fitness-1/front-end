import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";

const formSchema = yup.object().shape({
  first_name: yup
    .string()
    .min(2, "Name must contain at least 2 characters")
    .required("First name is required"),
  last_name: yup
    .string()
    .min(2, "Name must contain at least 2 characters")
    .required("Last name is required"),
  email: yup
    .string()
    .email("Must be a valid email address")
    .required("Must include email address"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords must match"),
  role_id: yup.string().required("Please select how you'd like to register"),
  gender: yup.string().required(),
  terms: yup.boolean().oneOf([true], "Please agree to Terms & Conditions"),
  authCode: yup.number().required(),
});

export default function RegistrationForm() {
  // set state for form input
  const [users, setUsers] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    role_id: "",
    gender: "",
    terms: "",
    authCode: "",
  });
  const history = useHistory();

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    formSchema.isValid(users).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [users]);

  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    role_id: "",
    gender: "",
    terms: "",
    authCode: "",
  });

  const validate = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    yup
      .reach(formSchema, e.target.name)
      .validate(value)
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0],
        });
      });
    setUsers({
      ...users,
      [e.target.name]: e.target.value,
    });
  };

  const inputChange = (e) => {
    e.persist();
    console.log("input changed", e.target.value, e.target.checked);
    validate(e);
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setUsers({
      ...users,
      [e.target.name]: value,
    });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    const { passwordConfirmation, terms, ...rest } = users;
    axios
      .post("https://any-fitness.herokuapp.com/api/v1/auth/signup", {
        ...rest,
        role_id: parseInt(users.role_id),
      })
      .then((res) => {
        console.log(res);
        history.push("/login");
      })
      .catch((err) => console.log(err));
  };
  console.log(errors.passwordConfirmation);

  return (
    <form onSubmit={formSubmit} className="container registerForm">
      <h1 className="form-title">Register</h1>
      <label htmlFor="first_name" className="labelForm">
        First Name:
        <input
          className="inputForm"
          type="text"
          name="first_name"
          id="first_name"
          placeholder="First Name"
          value={users.first_name}
          onChange={inputChange}
        />
        {errors.first_name.length > 0 ? (
          <p className="error">{errors.name}</p>
        ) : null}
      </label>
      <label htmlFor="last_name" className="labelForm">
        Last Name:
        <input
          className="inputForm"
          type="text"
          name="last_name"
          id="last_name"
          placeholder="Last Name"
          value={users.last_name}
          onChange={inputChange}
        />
        {errors.last_name.length > 0 ? (
          <p className="error">{errors.last_name}</p>
        ) : null}
      </label>
      <label htmlFor="email" className="labelForm">
        Email:
        <input
          className="inputForm"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={users.email}
          onChange={inputChange}
        />
        {errors.email.length > 0 ? (
          <p className="error">{errors.email}</p>
        ) : null}
      </label>
      <label htmlFor="password" className="labelForm">
        Password:
        <input
          className="inputForm"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={users.password}
          onChange={inputChange}
        />
        {errors.password.length > 8 ? (
          <p className="error">{errors.password}</p>
        ) : null}
      </label>
      <label htmlFor="passwordConfirmation" className="labelForm">
        Password:
        <input
          className="inputForm"
          type="password"
          name="passwordConfirmation"
          id="passwordConfirmation"
          placeholder="Confirm Password"
          value={users.passwordConfirmation}
          onChange={inputChange}
        />
        {errors.passwordConfirmation.length > 0 ? (
          <p className="error">{errors.passwordConfirmation}</p>
        ) : null}
      </label>
      <label htmlFor="role_id" className="labelForm">
        Select Role:
        <select
          className="inputForm"
          value={users.role_id}
          name="role_id"
          id="role_id"
          onChange={inputChange}
        >
          <option value="select">Select One</option>
          <option value="3">Instructor</option>
          <option value="2">Client</option>
        </select>
        {errors.role_id.length > 0 ? (
          <p className="error">{errors.role_id}</p>
        ) : null}
      </label>
      <label htmlFor="gender" className="labelForm">
        Gender:
        <select
          className="inputForm"
          value={users.gender}
          name="gender"
          id="gender"
          onChange={inputChange}
        >
          <option value="select">Select One</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="non_binary">Non-binary</option>
        </select>
        {errors.gender.length > 0 ? (
          <p className="error">{errors.gender}</p>
        ) : null}
      </label>
      {users.role_id === "3" && (
        <label>
          Authentication code
          <input
            type="number"
            id="authCode"
            name="authCode"
            onChange={inputChange}
            value={users.authCode}
            placeholder="000000"
          ></input>
        </label>
      )}
      <label htmlFor="terms" className="labelForm term">
        <input
          className="inputForm"
          type="checkbox"
          id="terms"
          name="terms"
          checked={users.terms}
          onChange={inputChange}
        />
        <Link to="/terms" onClick={(e) => e.preventDefault()}>
          Terms & Conditions
        </Link>
        {errors.terms.length > 0 ? (
          <>
            <p className="error">{errors.terms}</p>
          </>
        ) : null}
      </label>

      <button className="form-btn">Submit</button>

      <div className="go-to">
        <p>
          I have an account <Link to="/login">go to login.</Link>
        </p>
      </div>
      <div className="invitation-link">
        <p>
          If you would like to join our team of instructors follow the link below to
          get the One-Time authentication code:
          <Link to="/auth-code">Get code</Link>
        </p>
      </div>
    </form>
  );
}

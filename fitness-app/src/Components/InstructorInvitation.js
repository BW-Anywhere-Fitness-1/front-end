import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function InstructorInvitation() {
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://any-fitness.herokuapp.com/api/v1/auth/auth-code", {
        email,
      })
      .then((res) => {
        axios
          .get(
            `https://any-fitness.herokuapp.com/api/v1/auth/auth-code?email=${email}`
          )
          .then((res) => setAuthCode(res.data.code));
      })
      .catch((err) => console.log(err.response.data));
  };

  return (
    <div className="container invitation">
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            className="inputForm"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@fake.com"
          ></input>
        </label>
        {authCode && (
          <div className="alert success">
            Please go the register and enter the following One-Time
            authentication to sign up: <br />
            <br />
            {authCode}
          </div>
        )}
        <div className="form-action">
          <button className="form-btn">Submit</button>
          <button className="nav-btn-create">
            <Link to="/register" className="nav-link">
              Go to register
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
}

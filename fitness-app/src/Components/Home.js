import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-page">
      <div className="home-title">
        <h1>Welcome to Anywhere Fitness!</h1>
        <h1>
          The world is your gym. <br /> Welcome.
        </h1>
        <div className="separator"></div>
        <Link to="/classes" className="btn-default">
          Let Get Started
        </Link>
      </div>
    </div>
  );
}

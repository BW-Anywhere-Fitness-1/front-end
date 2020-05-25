import React, { useState } from "react";

const ClientLogin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (event) => {
    setForm({
        ...form,
        [event.target.name]: event.target.value
    })
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <label htmlFor="email">Email: </label>
      <input
        id="email"
        type="text"
        name="email"
        placeholder="Please Enter Your Email"
        value={form.email}
        onChange={changeHandler}
      />
      <label htmlFor="password"> Password: </label>
      <input
        id="password"
        type="text"
        name="password"
        placeholder="Please Enter Your Password"
        value={form.password}
        onChange={changeHandler}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default ClientLogin;

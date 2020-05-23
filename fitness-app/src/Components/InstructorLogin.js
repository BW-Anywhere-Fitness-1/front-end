import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';

const formSchema = yup.object().shape({
    email: yup
        .string()
        .email("Must be a vlaid email")
        .required("Must include email address"),
    password: yup
        .string()
        .required("Password is a required field")
});


export default function InstructorLogin() {

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        formSchema.isValid(user).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [user])

    const [error, setError] = useState({
        email: "",
        password: ""
    });

    const validate = e => {
        yup
          .reach(formSchema, e.target.name)
          .validate(e.target.value)
          .then(valid => {
              setError({
                  ...error, [e.target.name]: ""
              });
          })
          .catch(err => {
              console.log("error", err);
              setError({
                  ...error, [e.target.name]: err.error[0]});
          });

          setUser({
              ...user,
              [e.target.name]: e.target.value
          });
    };

    const inputChange = e => {
        e.persist();
        validate(e);
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    };

    const formSubmit = e => {
        e.preventDefault();
        console.log("submitted");
        axios
            .post("https://any-fitness.herokuapp.com/api/v1/auth/login/", user)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    return (
       <form onSubmit={formSubmit}>
           <label htmlFor="email">
               Email: 
               <input
                type="email"
                name="email"
                id="email"
                value={user.email}
                onChange={inputChange}
                />
           </label>
           {error.email.length > 0 ? (<p className="error">{error.email}</p>) : null}
           <label htmlFor="password">
               Password:
               <input
                type="password"
                name="password"
                id="password"
                value={user.password}
                onChange={inputChange}
                />
           </label>
           {error.password.length > 0 ? (<p className="error">{error.password}</p>) : null}
            <button disabled={buttonDisabled}>Login</button>
       </form>
    )
}

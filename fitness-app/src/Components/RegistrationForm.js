import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';

const formSchema = yup.object().shape({
    name: yup
        .string()
        .min(2, "Name must contain at least 2 characters")
        .required("Name is a required field"),
    email: yup
        .string()
        .email("Must be a valid email address")
        .required("Must include email address"),
    password: yup
        .string()
        .min(8, "Password must contain a minumin of 8 characters")
        .required("Password is required"),
    passwordConfirmation: yup
        .string()
        .required()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    role: yup
        .string()
        .required("Please select how you'd like to register"),
    terms: yup
        .boolean()
        .oneOf([true], "Please agree to Terms & Conditions")
});


export default function RegistrationForm() {
    // set state for form input
    const [users, setUsers] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        role: "",
        terms: ""
    }); 

    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        formSchema.isValid(users).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [users]);

    const [errors, setErrors] = useState ({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        role: "",
        terms: ""
    });

    const validate = e => {
        const value = 
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                });
            })
            .catch(err => {
                setErrors({
                    ...errors,
                    [e.target.name]: err.errors[0]
                });
            });
            setUsers({
                ...users,
                [e.target.name]: e.target.value
            });
    };

    const inputChange = e => {
        e.persist();
        console.log("input changed", e.target.value, e.target.checked);
        validate(e);
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setUsers({
            ...users,
            [e.target.name]: value
        });
    };

    const formSubmit = e => {
        e.preventDefault();
        console.log("submitted");
        axios
            .post("https://reqres.in/api/users", users)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };
    return (
       <form onSubmit={formSubmit}>
           <label htmlFor="name">
               Full Name:
               <input
               type="text"
               name="name"
               id="name"
               placeholder="Full Name"
               value={users.name}
               onChange={inputChange}
               />
               {errors.name.length > 0 ? (<p className="error">{errors.name}</p>) : null}
           </label>
           <label htmlFor="email">
               Email: 
               <input
               type="email"
               name="email"
               id="email"
               placeholder="Email"
               value={users.email}
               onChange={inputChange}
               />
                {errors.email.length > 0 ? (<p className="error">{errors.email}</p>) : null}
           </label>
           <label htmlFor="password">
               Password:
               <input
               type="password"
               name="password"
               id="password"
               placeholder="Password"
               value={users.password}
               onChange={inputChange}
               />
               {errors.password.length > 8 ? (<p className="error">{errors.password}</p>) : null}
           </label>
           <label htmlFor="passwordConfirmation">
               Password:
               <input
               type="passwordConfirmation"
               name="passwordConfirmation"
               id="passwordConfirmation"
               placeholder="Confirm Password"
               value={users.passwordConfirmation}
               onChange={inputChange}
               />
               {errors.passwordConfirmation.length > 0 ? (<p className="error">{errors.password}</p>) : null}
           </label>
           <label htmlFor="role">
               Select Role:
               <select
               value={users.role}
               name="role"
               id="role"
               onChange={inputChange}
               >
                <option value="instructor">Instructor</option>
                <option value="client">Client</option>
               </select>
               {errors.role.length > 0 ? (<p className="error">{errors.role}</p>) : null}
           </label>
           <label htmlFor="terms">
                <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={users.terms}
                onChange={inputChange}
                />
                Terms & Conditions
                {errors.terms.length > 0 ? (
                <p className="error">{errors.terms}</p>
                ) : null}
            </label>
            <button disabled={buttonDisabled}>Submit</button>

       </form>
    )
}

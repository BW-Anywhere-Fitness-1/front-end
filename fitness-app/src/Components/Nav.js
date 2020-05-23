import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
    return (
        <div>
            <nav>
                <button> <Link to="/">Home</Link></button>
                <button> <Link to="/register">Register</Link></button>
                <button> <Link to="/login">Login</Link></button>
                {/* <button> <Link to="/classes">Classes</Link></button> */}
            </nav>
            
        </div>
    )
}

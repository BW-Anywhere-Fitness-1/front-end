import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
    return (
        <div>
            <nav className='nav'> 
                <button className='nav-btn'> <Link to="/" className='nav-link'>Home</Link></button>
                {/* <button className='nav-btn'> <Link to="/register" className='nav-link'>Register</Link></button> */}
                <button className='nav-btn'> <Link to="/login" className='nav-link'>For Clients</Link></button>
                <button className='nav-btn'> <Link to="/instructorLogin" className='nav-link'>For Instructors</Link></button>
                <button className='nav-btn'> <Link to="/classes" className='nav-link'>Classes</Link></button>
            </nav>
            
        </div>
    )
}

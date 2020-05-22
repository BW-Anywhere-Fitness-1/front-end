import React from 'react';
import homeImg from '../Assets/home_img.jpg';

export default function Home() {
    return (
        <div>
             <img className="homeImg" src={homeImg} alt="woman boxing" />
            <h1>Welcome to Anywhere Fitness!</h1>
        </div>
    )
}

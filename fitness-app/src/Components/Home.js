import React from "react";
import homeImg from "../Assets/home_img.jpg";

export default function Home() {
	return (
		<div className='home-page'>
			{/* <div className='homeImg home-item' ><img src={homeImg} alt='woman boxing' /></div> */}
			<div className='home-title'>
				<h1>Welcome to Anywhere Fitness!</h1>
				<h2>The world is your gym. Welcome.</h2>
			</div>
		</div>
	);
}

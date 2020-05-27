import React from "react";
import homeImg from "../Assets/home_img.jpg";

export default function Home() {
	return (
		<div className='home-page'>
			{/* <div className='homeImg home-item' ><img src={homeImg} alt='woman boxing' /></div> */}
			<div className='home-title'>
				<h1>Welcome to Anywhere Fitness!</h1>
				<h1>
					The world is your gym. <br /> Welcome.
				</h1>
			</div>
		</div>
	);
}

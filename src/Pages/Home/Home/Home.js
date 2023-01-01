import React from "react";
import Banner from "../Banner/Banner";
import bannerBg from "../../../assets/images/bg.png";

const Home = () => {
	return (
		<div
			className="mx-5"
			style={{
				backgroundImage: `url(${bannerBg})`,
				backgroundPosition: `center`,
				backgroundSize: `cover`,
				backgroundRepeat: "no-repeat",
				width: "100%",
			}}
		>
			<Banner></Banner>
		</div>
	);
};

export default Home;

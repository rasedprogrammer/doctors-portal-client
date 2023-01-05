import React from "react";
import bannerBg from "../../../assets/images/bg.png";
import homeImg from "../../../assets/images/chair.png";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";

const Banner = () => {
	return (
		<div
			className="hero my-48"
			style={{
				backgroundImage: `url(${bannerBg})`,
				backgroundPosition: `center`,
				backgroundSize: `cover`,
				backgroundRepeat: "no-repeat",
				width: "100%",
			}}
		>
			<div className="hero-content flex-col lg:flex-row-reverse">
				<img src={homeImg} className="rounded-lg lg:w-1/2 shadow-2xl" alt="" />
				<div>
					<h1 className="text-5xl font-bold">Your New Smile Starts Here</h1>
					<p className="py-6">
						Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
						excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
						a id nisi.
					</p>
					<PrimaryButton>Get Started</PrimaryButton>
				</div>
			</div>
		</div>
	);
};

export default Banner;

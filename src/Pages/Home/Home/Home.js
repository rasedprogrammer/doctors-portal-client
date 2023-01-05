import React from "react";
import Testimonial from "../../Testimonial/Testimonial";
import Banner from "../Banner/Banner";
import Exceptional from "../Exceptional/Exceptional";
import InfoCards from "../InfoCard/InfoCards";
import MakeAppointment from "../MakeAppointment/MakeAppointment";
import Services from "../Services/Services";

const Home = () => {
	return (
		<div className="mx-5">
			<Banner></Banner>
			<InfoCards></InfoCards>
			<Services></Services>
			<Exceptional></Exceptional>
			<MakeAppointment></MakeAppointment>
			<Testimonial></Testimonial>
		</div>
	);
};

export default Home;

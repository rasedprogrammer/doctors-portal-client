import React from "react";
import fluoride from "../../../assets/images/fluoride.png";
import cavity from "../../../assets/images/cavity.png";
import whitening from "../../../assets/images/whitening.png";
import ServiceCard from "./ServiceCard";

const Services = () => {
	const servicesData = [
		{
			id: 1,
			name: "Fluoride Treatment",
			description:
				"Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
			icon: fluoride,
		},
		{
			id: 2,
			name: "Cavity Filling",
			description:
				"Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
			icon: cavity,
		},
		{
			id: 3,
			name: "Teeth Whitening",
			description:
				"Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
			icon: whitening,
		},
	];
	return (
		<div className="my-32 text-center">
			<h3 className="text-xl text-success font-bold uppercase">Our Services</h3>
			<h2 className="text-4xl my-2">Services We Provide</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 drop-shadow-3xl">
				{servicesData.map((service) => (
					<ServiceCard key={service.id} service={service}></ServiceCard>
				))}
			</div>
		</div>
	);
};

export default Services;

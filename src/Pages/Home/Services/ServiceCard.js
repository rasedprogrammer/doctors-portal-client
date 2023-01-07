import React from "react";

const ServiceCard = ({ service }) => {
	const { name, description, icon } = service;
	return (
		<div className="card w-96 bg-base-100 shadow-xl">
			<figure className="px-10 pt-10">
				<img src={icon} alt="Shoes" className="rounded-xl" />
			</figure>
			<div className="card-body items-center text-center">
				<h2 className="card-title">{name}</h2>
				<p>{description}</p>
				<div className="card-actions">
					<button className="btn btn-primary text-white">Buy Now</button>
				</div>
			</div>
		</div>
	);
};

export default ServiceCard;

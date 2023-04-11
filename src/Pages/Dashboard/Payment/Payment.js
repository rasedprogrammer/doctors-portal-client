import React from "react";
import { useLoaderData } from "react-router-dom";

const Payment = () => {
	const data = useLoaderData();
	console.log(data);
	return (
		<div>
			<h1>Payment.</h1>
		</div>
	);
};

export default Payment;

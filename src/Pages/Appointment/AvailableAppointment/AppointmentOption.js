import React from "react";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";

const AppointmentOption = ({ appointmentOption }) => {
	const { name, slots } = appointmentOption;
	return (
		<div className="card shadow-xl py-5">
			<div className="card-body items-center text-center">
				<h2 className="card-title text-secondary">{name}</h2>
				<p>{slots.length > 0 ? slots[0] : "Try Another Day"}</p>
				<p>
					{slots.length} {slots.length > 1 ? "Spaces" : "Space"} Available
				</p>
				<div className="card-actions justify-end">
					<PrimaryButton>Book Appointment</PrimaryButton>
				</div>
			</div>
		</div>
	);
};

export default AppointmentOption;

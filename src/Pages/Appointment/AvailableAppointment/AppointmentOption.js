import React from "react";

const AppointmentOption = ({ appointmentOption, setTreatment }) => {
	const { name, price, slots } = appointmentOption;
	return (
		<div className="card shadow-xl py-5">
			<div className="card-body items-center text-center">
				<h2 className="card-title text-secondary">{name}</h2>
				<p>{slots.length > 0 ? slots[0] : "Try Another Day"}</p>
				<p>
					{slots.length} {slots.length > 1 ? "Spaces" : "Space"} Available
				</p>
				<p>
					<small>Price: ${price}</small>
				</p>
				<div className="card-actions justify-end">
					<label
						disabled={slots.length === 0}
						htmlFor="bookingModal"
						className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white mt-3"
						onClick={() => setTreatment(appointmentOption)}
					>
						Book Appointment
					</label>
				</div>
			</div>
		</div>
	);
};

export default AppointmentOption;

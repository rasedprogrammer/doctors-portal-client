import { format } from "date-fns";
import React from "react";

const BookingModal = ({ treatment, setTreatment, selectedDate }) => {
	const { name, slots } = treatment; // treatment is appointment options
	const date = format(selectedDate, "PPP");
	const handleBooking = (event) => {
		event.preventDefault();
		const form = event.target;
		const slot = form.slot.value;
		const patientName = form.name.value;
		const email = form.email.value;
		const phone = form.phone.value;
		const booking = {
			appointmentDate: date,
			treatment: name,
			patientName,
			slot,
			email,
			phone,
		};
		console.log(booking);
		setTreatment(null);
	};
	return (
		<>
			<input type="checkbox" id="bookingModal" className="modal-toggle" />
			<div className="modal text-center">
				<div className="modal-box relative">
					<label
						htmlFor="bookingModal"
						className="btn btn-sm btn-circle absolute right-2 top-2"
					>
						✕
					</label>
					<h3 className="text-lg font-bold">{name}</h3>
					<form onSubmit={handleBooking}>
						<input
							type="text"
							value={date}
							disabled
							className="input input-bordered w-full mt-2"
						/>
						<select name="slot" className="select select-bordered w-full mt-2">
							{slots.map((slot, index) => (
								<option key={index} value={slot}>
									{slot}
								</option>
							))}
						</select>
						<input
							type="text"
							name="name"
							placeholder="Your Name"
							className="input input-bordered w-full mt-2"
						/>
						<input
							type="email"
							name="email"
							required
							placeholder="Email Address"
							className="input input-bordered w-full mt-2"
						/>
						<input
							type="text"
							name="phone"
							placeholder="Phone Number"
							className="input input-bordered w-full mt-2"
						/>
						<input className="btn w-full mt-3" type="submit" value="Submit" />
					</form>
				</div>
			</div>
		</>
	);
};

export default BookingModal;

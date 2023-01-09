import { format } from "date-fns";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../context/AuthProvier";

const BookingModal = ({ treatment, setTreatment, selectedDate }) => {
	const { name, slots } = treatment; // treatment is appointment options
	const { user } = useContext(AuthContext);
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
		fetch("http://localhost:5000/bookings", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(booking),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				if (data.acknowledged) {
					<div class=" flex justify-center items-center">
						<div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
					</div>;
					setTreatment(null);
					toast.success("Booking Confirm");
				}
			})
			.catch((error) => {
				console.log(error);
			});
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
							defaultValue={user?.displayName}
							disabled
							placeholder="Your Name"
							className="input input-bordered w-full mt-2"
						/>
						<input
							type="email"
							name="email"
							placeholder="Email Address"
							defaultValue={user?.email}
							disabled
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

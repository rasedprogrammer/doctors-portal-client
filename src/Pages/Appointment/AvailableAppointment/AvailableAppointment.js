import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import BookingModal from "../BookingModal/BookingModal";
import AppointmentOption from "./AppointmentOption";

const AvailableAppointment = ({ selectedDate }) => {
	const [appointmentOptions, setAppointmentOptions] = useState([]);
	const [treatment, setTreatment] = useState(null);
	useEffect(() => {
		fetch("appointmentOptions.json")
			.then((response) => response.json())
			.then((data) => setAppointmentOptions(data));
	}, []);
	return (
		<div className="mt-20">
			<p className="text-center text-xl text-secondary font-bold">
				Available Services on {format(selectedDate, "PPP")}
			</p>
			<p className="text-center text-xl text-slate-400 mt-5">
				Please select a service
			</p>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16 mt-5">
				{appointmentOptions.map((option) => (
					<AppointmentOption
						key={option._id}
						appointmentOption={option}
						setTreatment={setTreatment}
					></AppointmentOption>
				))}
			</div>
			{treatment && (
				<BookingModal
					treatment={treatment}
					selectedDate={selectedDate}
					setTreatment={setTreatment}
				></BookingModal>
			)}
		</div>
	);
};

export default AvailableAppointment;
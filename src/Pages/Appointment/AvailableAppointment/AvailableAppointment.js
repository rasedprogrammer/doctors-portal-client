import { format } from "date-fns";
import React, { useEffect, useState } from "react";

const AvailableAppointment = ({ selectedDate }) => {
	const [appointmentOptions, setAppointmentOptions] = useState([]);
	useEffect(() => {
		fetch("appointmentOptions.json")
			.then((response) => response.json())
			.then((data) => setAppointmentOptions(data));
	}, []);
	return (
		<div className="mt-20">
			<p className="text-center text-secondary font-bold">
				Available Services on {format(selectedDate, "PPP")}
			</p>
			<div></div>
		</div>
	);
};

export default AvailableAppointment;

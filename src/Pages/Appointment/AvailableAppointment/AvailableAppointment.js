import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useState } from "react";
import Loading from "../../../Shared/Loading/Loading";
import BookingModal from "../BookingModal/BookingModal";
import AppointmentOption from "./AppointmentOption";

const AvailableAppointment = ({ selectedDate }) => {
	// const [appointmentOptions, setAppointmentOptions] = useState([]);
	const [treatment, setTreatment] = useState(null);
	const date = format(selectedDate, "PPP");

	const {
		data: appointmentOptions = [],
		refetch,
		isLoading,
	} = useQuery({
		queryKey: ["appointmentOptions", date],
		queryFn: async () => {
			const res = await fetch(
				`http://localhost:5000/appointmentOptions?date=${date}`
			);
			const data = await res.json();
			return data;
		},
	});
	if (isLoading) {
		return <Loading></Loading>;
	}
	// const { data: appointmentOptions = [] } = useQuery({
	// 	// const { data: appointmentOptions = [], isLoading } = useQuery({
	// 	queryKey: "appointmentOptions",
	// 	queryFn: () =>
	// 		fetch("http://localhost:5000/appointmentOptions").then((response) =>
	// 			response.json()
	// 		),
	// });

	// useEffect(() => {
	// 	fetch("http://localhost:5000/appointmentOptions")
	// 		.then((response) => response.json())
	// 		.then((data) => setAppointmentOptions(data));
	// }, []);
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
					refetch={refetch}
				></BookingModal>
			)}
		</div>
	);
};

export default AvailableAppointment;

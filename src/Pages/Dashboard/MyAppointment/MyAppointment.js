import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvier";

const MyAppointment = () => {
	const { user } = useContext(AuthContext);
	const url = `http://localhost:5000/bookings?email=${user?.email}`;

	const { data: bookings = [] } = useQuery({
		queryKey: ["bookings", user?.email],
		queryFn: async () => {
			const res = await fetch(url, {
				headers: {
					authorization: `bearer ${localStorage.getItem("accessToken")}`,
				},
			});
			const data = await res.json();
			return data;
		},
	});
	return (
		<div>
			<h3 className="text-3xl">My Appointment</h3>
			<div className="overflow-x-auto mt-5">
				<table className="table w-full">
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Treatment</th>
							<th>Date</th>
							<th>Time</th>
						</tr>
					</thead>
					<tbody>
						{bookings &&
							bookings?.map((booking, i) => (
								<tr key={booking._id}>
									<th>{i + 1}</th>
									<td>{booking.patientName}</td>
									<td>{booking.treatment}</td>
									<td>{booking.appointmentDate}</td>
									<td>{booking.slot}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MyAppointment;

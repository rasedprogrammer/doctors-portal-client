import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import ConfirmationModal from "../../../Shared/ConfirmationModal/ConfirmationModal";
import Loading from "../../../Shared/Loading/Loading";

const ManageDoctors = () => {
	const [deletingDoctor, setDeletingDoctor] = useState(null);
	const closeModal = () => {
		setDeletingDoctor(null);
	};

	const {
		data: doctors,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["doctors"],
		queryFn: async () => {
			try {
				const res = await fetch("http://localhost:5000/doctors", {
					headers: {
						authorization: `bearer ${localStorage.getItem("accessToken")}`,
					},
				});
				const data = await res.json();
				return data;
			} catch (error) {
				console.log(error);
			}
		},
	});
	const handleDeleteDoctor = (doctor) => {
		console.log(doctor);
		fetch(`http://localhost:5000/doctors/${doctor._id}`, {
			method: "DELETE",
			headers: {
				authorization: `bearer ${localStorage.getItem("accessToken")}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.deletedCount > 0) {
					refetch();
					toast.success(`Doctor ${doctor.name} deleted successfully`);
				}
			});
	};
	if (isLoading) {
		return <Loading></Loading>;
	}
	return (
		<div>
			<h2 className="text-4xl">Manage Doctors Page ${doctors?.length}</h2>
			<div className="overflow-x-auto mt-5">
				<table className="table w-full">
					{/* head */}
					<thead>
						<tr>
							<th></th>
							<th>Avatar</th>
							<th>Name</th>
							<th>Email</th>
							<th>Specialty</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{doctors?.map((doctor, i) => (
							<tr key={doctor._id}>
								<th>{i + 1}</th>
								<td>
									<div className="avatar">
										<div className="w-8 rounded-full">
											<img src={doctor.image} alt="" />
										</div>
									</div>
								</td>
								<td>{doctor.name}</td>
								<td>{doctor.email}</td>
								<td>{doctor.specialty}</td>
								<td>
									<label
										onClick={() => setDeletingDoctor(doctor)}
										htmlFor="confirmation-modal"
										className="btn btn-xs btn-error"
									>
										Delete
									</label>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{deletingDoctor && (
				<ConfirmationModal
					title={`Are you sure you want to delete this`}
					message={`If you delete this ${deletingDoctor.name}. It can not be undone.`}
					successAction={handleDeleteDoctor}
					successButtonName="Delete"
					modalData={deletingDoctor}
					closeModal={closeModal}
				></ConfirmationModal>
			)}
		</div>
	);
};

export default ManageDoctors;

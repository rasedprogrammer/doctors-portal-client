import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Shared/Loading/Loading";

const AddDoctor = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();
	const imageHostKey = process.env.REACT_APP_imgbb_Key;
	const { data: specialties, isLoading } = useQuery({
		queryKey: ["spcialty"],
		queryFn: async () => {
			const res = await fetch(
				"https://doctors-portal-server-two-mocha.vercel.app/appointmentSpecialty"
			);
			const data = await res.json();
			return data;
		},
	});
	const handleAddDoctor = (data) => {
		const image = data.image[0];
		const formData = new FormData();
		formData.append("image", image);
		const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
		fetch(url, {
			method: "POST",
			body: formData,
		})
			.then((response) => response.json())
			.then((imgData) => {
				if (imgData.success) {
					console.log(imgData.data.url);
					const doctor = {
						name: data.name,
						email: data.email,
						specialty: data.specialty,
						image: imgData.data.url,
					};
					// Post doctor data server
					fetch("https://doctors-portal-server-two-mocha.vercel.app/doctors", {
						method: "POST",
						headers: {
							"content-type": "application/json",
							authorization: `bearer ${localStorage.getItem("accessToken")}`,
						},
						body: JSON.stringify(doctor),
					})
						.then((response) => response.json())
						.then((result) => {
							toast.success(`${data.name} added successfully`);
							navigate("/dashboard/manageDoctors");
						});
				}
			});
	};
	if (isLoading) {
		return <Loading></Loading>;
	}
	return (
		<div className="w-96 p-7">
			<h2 className="text-4xl">Add Doctor Page</h2>
			<form onSubmit={handleSubmit(handleAddDoctor)}>
				<div className="form-control w-full">
					<label className="label">
						<span className="label-text font-bold">Name</span>
					</label>
					<input
						type="text"
						{...register("name", { required: "Please Give Me Your Name" })}
						placeholder="Name"
						className="input input-bordered w-full"
					/>
				</div>
				{errors.name && <p className="text-red-600">{errors.name?.message}</p>}
				<div className="form-control w-full">
					<label className="label">
						<span className="label-text font-bold">Email</span>
					</label>
					<input
						type="email"
						{...register("email", {
							required: "Please Insert Your Email Address",
						})}
						placeholder="Email"
						className="input input-bordered w-full"
					/>
				</div>
				{errors.email && (
					<p className="text-red-600">{errors.email?.message}</p>
				)}
				<div className="form-control w-full">
					<label className="label">
						<span className="label-text font-bold">Specialty</span>
					</label>
					<select
						{...register("specialty")}
						className="select input-bordered w-full"
					>
						{specialties.map((specialty) => (
							<option key={specialty._id} value={specialty.name}>
								{specialty.name}
							</option>
						))}
					</select>
				</div>
				<div className="form-control w-full">
					<label className="label">
						<span className="label-text font-bold">Photo</span>
					</label>
					<input
						type="file"
						{...register("image", {
							required: "Please Insert Your Email Address",
						})}
						placeholder="Img"
						className="input input-bordered w-full"
					/>
				</div>
				<input
					className="btn btn-accent w-full mt-3"
					type="submit"
					value="Add Doctor"
				/>
				{/* {signUpError && <p className="text-red-600">{signUpError}</p>} */}
			</form>
		</div>
	);
};

export default AddDoctor;

import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvier";
import useToken from "../../hooks/useToken";

const SignUp = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { createUser, updateUserName } = useContext(AuthContext);
	const [signUpError, setSignUpError] = useState("");
	const [createdUserEmail, setCreatedUserEmail] = useState("");

	const [token] = useToken(createdUserEmail);
	if (token) {
		navigate("/");
	}

	const handleSignUp = (data) => {
		setSignUpError("");
		createUser(data?.email, data?.password)
			.then((result) => {
				const user = result.user;
				console.log(user);
				toast("User Created Successfully.");
				const userInfo = {
					displayName: data.name,
				};
				updateUserName(userInfo)
					.then(() => {
						saveUser(data.name, data.email);
					})
					.catch((err) => console.log(err));
			})
			.catch((error) => {
				console.log(error);
				setSignUpError(error?.message);
			});
	};

	const saveUser = (name, email) => {
		const user = { name, email };
		fetch("http://localhost:5000/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setCreatedUserEmail(email);
			});
	};

	return (
		<div className="h-[800px] flex justify-center items-center">
			<div className="w-96 p-7">
				<h2 className="text-xl text-center font-bold mb-5">Sign Up</h2>
				<form onSubmit={handleSubmit(handleSignUp)}>
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
					{errors.name && (
						<p className="text-red-600">{errors.name?.message}</p>
					)}
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
							<span className="label-text font-bold">Password</span>
						</label>
						<input
							type="password"
							{...register("password", {
								required: "Password Is Requeird",
								pattern: {
									value:
										/(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}/,
									message: "Password Must Be Strong Like-(AAbbb22@)",
								},
							})}
							placeholder="Name"
							className="input input-bordered w-full"
						/>
					</div>
					{errors.password && (
						<p className="text-red-600">{errors.password?.message}</p>
					)}
					<input
						className="btn btn-accent w-full mt-3"
						type="submit"
						value="Sign Up"
					/>
					{signUpError && <p className="text-red-600">{signUpError}</p>}
				</form>
				<p className="mt-3">
					Already Have An Account{" "}
					<Link to="/login" className="text-secondary">
						Please Login
					</Link>
				</p>
				<div className="divider">OR</div>
				<button className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
			</div>
		</div>
	);
};

export default SignUp;

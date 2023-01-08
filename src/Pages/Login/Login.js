import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
	const { register, handleSubmit } = useForm();
	const handleLogin = (data) => {
		console.log(data);
	};
	return (
		<div className="h-[800px] flex justify-center items-center">
			<div className="w-96 p-7">
				<h2 className="text-xl text-center font-bold mb-5">Login</h2>
				<form onSubmit={handleSubmit(handleLogin)}>
					<div className="form-control w-full">
						<label className="label">
							<span className="label-text font-bold">Email</span>
						</label>
						<input
							type="email"
							{...register("email")}
							placeholder="Name"
							className="input input-bordered w-full"
						/>
					</div>
					<div className="form-control w-full">
						<label className="label">
							<span className="label-text font-bold">Password</span>
						</label>
						<input
							type="password"
							{...register("password")}
							placeholder="Name"
							className="input input-bordered w-full"
						/>
						<label className="label">
							<span className="label-text-alt">Forgot Password</span>
						</label>
					</div>
					<input
						className="btn btn-accent w-full"
						type="submit"
						value="Login"
					/>
				</form>
				<p className="mt-3">
					New to Doctors Portal{" "}
					<Link to="/signup" className="text-secondary">
						Create New Account
					</Link>
				</p>
				<div className="divider">OR</div>
				<button className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
			</div>
		</div>
	);
};

export default Login;

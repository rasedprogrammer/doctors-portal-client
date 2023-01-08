import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvier";

const Login = () => {
	const { login } = useContext(AuthContext);
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const [loginError, setLoginError] = useState();
	const location = useLocation();
	const navigate = useNavigate();

	const form = location.state?.form?.pathname || "/";

	const handleLogin = (data) => {
		setLoginError("");
		login(data.email, data.password)
			.then((result) => {
				const user = result.user;
				console.log(user);
				navigate(form, { replace: true });
			})
			.catch((err) => {
				console.log(err);
				setLoginError(err?.message);
			});
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
							{...register("email", { required: "Email Address is required" })}
							aria-invalid={errors.email ? "true" : "false"}
							placeholder="Name"
							className="input input-bordered w-full"
						/>
						{errors.email && (
							<p className="text-red-600" role="alert">
								{errors.email?.message}
							</p>
						)}
					</div>
					<div className="form-control w-full">
						<label className="label">
							<span className="label-text font-bold">Password</span>
						</label>
						<input
							type="password"
							{...register("password", {
								required: "Password Is Required",
								minLength: {
									value: 6,
									message: "Password Must Be 6 Characters or Longer",
								},
							})}
							placeholder="Name"
							className="input input-bordered w-full"
						/>
						{errors.password && (
							<p className="text-red-600" role="alert">
								{errors.password?.message}
							</p>
						)}
						<label className="label">
							<span className="label-text-alt">Forgot Password</span>
						</label>
					</div>
					<input
						className="btn btn-accent w-full"
						type="submit"
						value="Login"
					/>
					{loginError && (
						<p className="text-red-600 mt-3 text-center">{loginError}</p>
					)}
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

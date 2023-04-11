import React, { useContext } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvier";

const DisplayError = () => {
	const error = useRouteError();
	const { logout } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSignOut = () => {
		logout()
			.then(() => {
				navigate("/login");
			})
			.catch((error) => console.log(error));
	};
	return (
		<div>
			<p className="text-red-500">Something went wrong</p>
			<p className="text-red-400">{error.statusText || error.message}</p>
			<h4 className="text-2xl">
				Please <button onClick={handleSignOut}>Sign Out</button> And Sign In
				Again
			</h4>
		</div>
	);
};

export default DisplayError;

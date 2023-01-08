import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvier";

const PrivateRoute = ({ children }) => {
	const { user, loading } = useContext(AuthContext);
	const location = useLocation();
	if (user) {
		return children;
	}
	if (loading) {
		return (
			<div class=" flex justify-center items-center">
				<div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
			</div>
		);
	}
	return <Navigate state={{ form: location }} replace></Navigate>;
};

export default PrivateRoute;

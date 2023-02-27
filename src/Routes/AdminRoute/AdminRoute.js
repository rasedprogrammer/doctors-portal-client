import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvier";
import useAdmin from "../../hooks/useAdmin";

const AdminRoute = ({ children }) => {
	const { user, loading } = useContext(AuthContext);
	const [isAdmin, isAdminLoading] = useAdmin(user?.email);
	const location = useLocation();
	if (user && isAdmin) {
		return children;
	}
	if (loading || isAdminLoading) {
		return (
			<div className=" flex justify-center items-center">
				<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
			</div>
		);
		// return <h1>Loading...</h1>;
	}
	return <Navigate to="/login" state={{ form: location }} replace></Navigate>;
};

export default AdminRoute;

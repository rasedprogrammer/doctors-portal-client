import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvier";
import useAdmin from "../hooks/useAdmin";
import Navber from "../Shared/Navber/Navber";

const DashboardLayout = () => {
	const { user } = useContext(AuthContext);
	const [isAdmin] = useAdmin(user?.email);
	return (
		<div>
			<Navber></Navber>
			<div className="drawer drawer-mobile">
				<input
					id="dashboard-drawer"
					type="checkbox"
					className="drawer-toggle"
				/>
				<div className="drawer-content">
					<Outlet></Outlet>
				</div>
				<div className="drawer-side">
					<label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
					<ul className="menu p-4 w-80 text-base-content">
						<li>
							<Link to="/dashboard">My Appointment</Link>
						</li>
						{isAdmin && (
							<>
								<li>
									<Link to="/dashboard/users">All Users</Link>
								</li>
								<li>
									<Link to="/dashboard/add-doctor">Add Doctor</Link>
								</li>
								<li>
									<Link to="/dashboard/manageDoctors">Manage Doctors</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;

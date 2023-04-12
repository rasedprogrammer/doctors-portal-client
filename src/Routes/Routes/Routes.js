import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import Main from "../../layout/Main";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import AddDoctor from "../../Pages/Dashboard/AddDoctor/AddDoctor";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import ManageDoctors from "../../Pages/Dashboard/ManageDoctors/ManageDoctors";
import MyAppointment from "../../Pages/Dashboard/MyAppointment/MyAppointment";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import DisplayError from "../../Shared/DisplayError/DisplayError";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Main></Main>,
		errorElement: <DisplayError></DisplayError>,
		children: [
			{
				path: "/",
				element: <Home></Home>,
			},
			{
				path: "/login",
				element: <Login></Login>,
			},
			{
				path: "/signup",
				element: <SignUp></SignUp>,
			},
			{
				path: "/appointment",
				element: <Appointment></Appointment>,
			},
		],
	},
	{
		path: "/dashboard",
		element: (
			<PrivateRoute>
				<DashboardLayout></DashboardLayout>
			</PrivateRoute>
		),
		errorElement: <DisplayError></DisplayError>,
		children: [
			{
				path: "/dashboard",
				element: <MyAppointment></MyAppointment>,
			},
			{
				path: "/dashboard/users",
				element: (
					<AdminRoute>
						<AllUsers></AllUsers>
					</AdminRoute>
				),
			},
			{
				path: "/dashboard/add-doctor",
				element: (
					<AdminRoute>
						<AddDoctor></AddDoctor>
					</AdminRoute>
				),
			},
			{
				path: "/dashboard/manageDoctors",
				element: (
					<AdminRoute>
						<ManageDoctors></ManageDoctors>
					</AdminRoute>
				),
			},
			{
				path: "/dashboard/payment/:id",
				element: (
					<AdminRoute>
						<Payment></Payment>
					</AdminRoute>
				),
				loader: ({ params }) => {
					return fetch(
						`https://doctors-portal-server-two-mocha.vercel.app/bookings/${params.id}`
					);
				},
			},
		],
	},
]);

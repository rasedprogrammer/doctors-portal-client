import { useQuery } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-hot-toast";

const AllUsers = () => {
	const { data: users = [], refetch } = useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			const res = await fetch(
				`https://doctors-portal-server-two-mocha.vercel.app/users`
			);
			const data = await res.json();
			return data;
		},
	});

	const handleMakeAdmin = (id) => {
		fetch(
			`https://doctors-portal-server-two-mocha.vercel.app/users/admin/${id}`,
			{
				method: "PUT",
				headers: {
					authorization: `bearer ${localStorage.getItem("asscessToken")}`,
				},
			}
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.modifiedCount > 0) {
					toast.success("User Admin Role Set Successfully");
					refetch();
				}
			});
	};
	return (
		<div>
			<h3 className="text-3xl">All Users</h3>
			<div className="overflow-x-auto mt-5">
				<table className="table w-full">
					<thead>
						<tr>
							<th></th>
							<th>User Name</th>
							<th>User Email</th>
							<th>Admin</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user, i) => (
							<tr key={user._id}>
								<th>{i + 1}</th>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>
									{user?.role !== "admin" && (
										<button
											onClick={() => handleMakeAdmin(user._id)}
											className="btn btn-secondary btn-xs"
										>
											Make Admin
										</button>
									)}
								</td>
								<td>
									<button className="btn btn-xs btn-accent btn-outline">
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AllUsers;

import React from "react";
import { useSelector } from "react-redux";

export const CustomersPage = () => {
	const customers = useSelector((state) => state.customers);

	return (
		<div>
			<h1>Customers Page</h1>

			{customers.map((c) => (
				<div key={c.id}>
					<div>Name: {c.name}</div>
					<div>Email: {c.email}</div>
				</div>
			))}
		</div>
	);
};

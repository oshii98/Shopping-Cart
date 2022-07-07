import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/slices/auth.slice";

const Buttons = () => {
	const dispatcher = useDispatch();
	const navigate = useNavigate();

	return (
		<>
			<button
				onClick={() => {
					dispatcher(authActions.logoutUser());
					navigate("/");
				}}
			>
				Logout
			</button>
			<Link to="/">View Customers</Link>
			<Link to="/promotions">View Promotions</Link>
			<Link to="/items">View Inventory</Link>
		</>
	);
};

export const TraderHome = () => {
	return (
		<div>
			<h1>Trader Home</h1>
			<div>
				<Buttons />
			</div>
			<Outlet />
		</div>
	);
};

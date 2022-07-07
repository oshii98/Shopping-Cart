import React from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
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
			<Link to="/">View Inventory</Link>
			<Link to="/cart">View Cart</Link>
			<Link to="/wishlist">View Whishlist</Link>
		</>
	);
};

export const CustomerHome = () => {
	return (
		<div>
			<h1>Customer Home</h1>
			<div>
				<Buttons />
			</div>
			<Outlet />
		</div>
	);
};

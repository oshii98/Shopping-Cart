import React, { useState } from "react";
import { useApiFunctions } from "../hooks/api-functions.hook";
import { useSelector } from "react-redux";
import { ItemsView } from "../components/ItemsView";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
	const [form, setForm] = useState({
		address: "",
	});
	const cartItems = useSelector((state) => state.cartItems);
	const customerId = useSelector((state) => state.auth.userId);
	const { removeItemFromCart } = useApiFunctions();
	const navigate = useNavigate();

	const onSubmit = (e) => {
		e.preventDefault();
		cartItems.forEach((item) => removeItemFromCart(customerId, item.id));
		navigate("/");
	};

	return (
		<div>
			<h3>Checkout</h3>

			<form onSubmit={onSubmit}>
				<div>
					<label htmlFor="address">Address</label>
					<input
						type="text"
						name="address"
						required
						value={form.address}
						onChange={(e) =>
							setForm({ ...form, address: e.target.value })
						}
					/>
					<button type="submit">Checkout</button>
				</div>
			</form>
		</div>
	);
};

export const CartPage = () => {
	const cartItems = useSelector((state) => state.cartItems);
	const customerId = useSelector((state) => state.auth.userId);
	const { removeItemFromCart } = useApiFunctions();

	return (
		<div>
			<h2>Cart</h2>

			<ItemsView
				items={cartItems}
				onRemove={(item) => removeItemFromCart(customerId, item.id)}
			/>

			{cartItems.length > 0 && <Checkout />}
		</div>
	);
};

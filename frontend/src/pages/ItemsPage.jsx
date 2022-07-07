import React, { useEffect, useState } from "react";
import { useApiFunctions } from "../hooks/api-functions.hook";
import { useSelector } from "react-redux";

const AddOrUpdateItem = ({ existingItem, onUpdated }) => {
	const { createItem, updateItem } = useApiFunctions();
	const [form, setForm] = useState({
		name: "",
		price: 0,
	});

	useEffect(() => {
		if (Boolean(existingItem)) {
			setForm({
				name: existingItem.name,
				price: existingItem.price,
			});
		} else {
			clearForm();
		}
	}, [existingItem]);

	const isUpdate = Boolean(existingItem);

	const onSubmit = (e) => {
		e.preventDefault();
		if (isUpdate) {
			updateItem(existingItem.id, form);
		} else {
			createItem(form);
		}
		clearForm();
	};

	const clearForm = () => {
		setForm({
			name: "",
			price: 0,
		});
	};

	const onCancel = () => {
		onUpdated();
		clearForm();
	};

	return (
		<div>
			<h3>Add Item</h3>

			<form onSubmit={onSubmit}>
				<div>
					<label htmlFor="name">Name</label>
					<input
						type="text"
						name="name"
						required
						value={form.name}
						onChange={(e) =>
							setForm({ ...form, name: e.target.value })
						}
					/>
				</div>
				<div>
					<label htmlFor="price">Price</label>
					<input
						type="number"
						name="price"
						required
						value={form.price}
						onChange={(e) =>
							setForm({ ...form, price: e.target.value })
						}
					/>
				</div>

				<div>
					{isUpdate && (
						<>
							<button type="submit">Update</button>
							<button onClick={onCancel}>Cancel</button>
						</>
					)}
					{!isUpdate && <button type="submit">Create New</button>}
				</div>
			</form>
		</div>
	);
};

const ItemsView = ({ onUpdateItem }) => {
	const items = useSelector((state) => state.items);
	const wishList = useSelector((state) => state.wishlistItems);
	const cartItems = useSelector((state) => state.cartItems);
	const userRole = useSelector((state) => state.auth.role);
	const customerId = useSelector((state) => state.auth.userId);
	const { addItemToCart, addItemToWishlist } = useApiFunctions();

	const displayItems =
		userRole === "customer"
			? items.filter(
					(i) =>
						!wishList.find((w) => w.id === i.id) &&
						!cartItems.find((c) => c.id === i.id)
			  )
			: items;

	return (
		<div>
			<h3>Items</h3>
			{displayItems.map((item) => (
				<div key={item.id}>
					<div>Item Name: {item.name}</div>
					<div>Item Price: {item.price}</div>
					<div>
						{userRole === "trader" && (
							<button onClick={() => onUpdateItem(item)}>
								edit
							</button>
						)}
						{userRole === "customer" && (
							<>
								<button
									onClick={() =>
										addItemToCart(customerId, item.id)
									}
								>
									Add to Cart
								</button>
								<button
									onClick={() =>
										addItemToWishlist(customerId, item.id)
									}
								>
									Add to Wishlist
								</button>
							</>
						)}
					</div>
				</div>
			))}
		</div>
	);
};

export const ItemsPage = () => {
	const [updatingItem, setUpdatingItem] = useState(null);
	const userRole = useSelector((state) => state.auth.role);

	return (
		<div>
			<h1>Items Page</h1>

			{userRole === "trader" && (
				<AddOrUpdateItem
					existingItem={updatingItem}
					onUpdated={() => setUpdatingItem(null)}
				/>
			)}

			<ItemsView onUpdateItem={(item) => setUpdatingItem(item)} />
		</div>
	);
};

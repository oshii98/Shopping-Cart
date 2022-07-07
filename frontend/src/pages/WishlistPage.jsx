import React from "react";
import { useApiFunctions } from "../hooks/api-functions.hook";
import { useSelector } from "react-redux";
import { ItemsView } from "../components/ItemsView";

export const WishlistPage = () => {
	const wishItems = useSelector((state) => state.wishlistItems);
	const customerId = useSelector((state) => state.auth.userId);
	const { removeItemFromWishlist } = useApiFunctions();

	return (
		<div>
			<h2>Wishlist</h2>

			<ItemsView
				items={wishItems}
				onRemove={(item) => removeItemFromWishlist(customerId, item.id)}
			/>
		</div>
	);
};

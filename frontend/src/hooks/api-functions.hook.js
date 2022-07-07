import { useDispatch } from "react-redux";
import { authActions } from "../redux/slices/auth.slice";
import { cartActions } from "../redux/slices/cart.slice";
import { customersActions } from "../redux/slices/customers.slice";
import { itemsActions } from "../redux/slices/items.slice";
import { promotionsActions } from "../redux/slices/promotions.slice";
import { wishlistActions } from "../redux/slices/wishlist.slice";

const BASE_URL = "http://localhost:3001/";

const getCustomersApi = async () => {
	const data = await fetch(`${BASE_URL}customers`);
	return data.json();
};

const createItemApi = async (item) => {
	await fetch(`${BASE_URL}items`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(item),
	});
};

const getItemsApi = async () => {
	const data = await fetch(`${BASE_URL}items`);
	return data.json();
};

const updateItemsApi = async (id, newItemData) => {
	await fetch(`${BASE_URL}items/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newItemData),
	});
};

const getPromotionsApi = async () => {
	const data = await fetch(`${BASE_URL}promotions`);
	return data.json();
};

const createPromotionApi = async (promotion) => {
	await fetch(`${BASE_URL}promotions`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(promotion),
	});
};

const addItemToCartApi = async (customerId, itemId, wishList = false) => {
	const base = wishList ? "wishlist" : "cart";

	await fetch(`${BASE_URL}${base}/add`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ customerId, itemId }),
	});
};

const removeItemFromCartApi = async (customerId, itemId, wishList = false) => {
	const base = wishList ? "wishlist" : "cart";

	await fetch(`${BASE_URL}${base}/remove`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ customerId, itemId }),
	});
};

const getCartItemsApi = async (customerId, wishList = false) => {
	const base = wishList ? "wishlist" : "cart";

	const data = await fetch(`${BASE_URL}${base}?customerId=${customerId}`);
	return data.json();
};

const addToCartFromWishListApi = async (customerId, itemId) => {
	await addItemToCartApi(customerId, itemId);
	await removeItemFromCartApi(customerId, itemId, true);
};

export const useApiFunctions = () => {
	const dispatcher = useDispatch();

	const createAccount = async (type, data) => {
		const url = `${BASE_URL}${
			type == "customer" ? "customers" : "traders"
		}`;

		const newUserData = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		const newUser = await newUserData.json();

		const authUser = {
			userId: newUser.id,
			role: type,
		};
		dispatcher(authActions.logUser(authUser));

		await updateCustomersList();
	};

	const updateItemsList = async () => {
		const items = await getItemsApi();
		dispatcher(itemsActions.setItems(items));
	};

	const createItem = async (item) => {
		await createItemApi(item);
		await updateItemsList();
	};

	const updateItem = async (id, newData) => {
		await updateItemsApi(id, newData);
		await updateItemsList();
	};

	const updatePromotionsList = async () => {
		const promotions = await getPromotionsApi();
		dispatcher(promotionsActions.setPromotions(promotions));
	};

	const createPromotion = async (promotion) => {
		await createPromotionApi(promotion);
		await updatePromotionsList();
	};

	const updateCart = async (customerId) => {
		const items = await getCartItemsApi(customerId);
		dispatcher(cartActions.setCartItems(items));
	};

	const addItemToCart = async (customerId, itemId) => {
		await addItemToCartApi(customerId, itemId);
		await updateCart(customerId);
	};

	const removeItemFromCart = async (customerId, itemId) => {
		await removeItemFromCartApi(customerId, itemId);
		await updateCart(customerId);
	};

	const updateWishlist = async (customerId) => {
		const items = await getCartItemsApi(customerId, true);
		dispatcher(wishlistActions.setWishlistItems(items));
	};

	const addItemToWishlist = async (customerId, itemId) => {
		await addItemToCartApi(customerId, itemId, true);
		await updateWishlist(customerId);
	};

	const removeItemFromWishlist = async (customerId, itemId) => {
		await removeItemFromCartApi(customerId, itemId, true);
		await updateWishlist(customerId);
	};

	const addToCartFromWishList = async (customerId, itemId) => {
		await addToCartFromWishListApi(customerId, itemId);
		await updateCart(customerId);
		await updateWishlist(customerId);
	};

	const updateCustomersList = async () => {
		const customers = await getCustomersApi();
		dispatcher(customersActions.setCustomers(customers));
	};

	return {
		createAccount,
		createItem,
		updateItemsList,
		updateItem,
		updatePromotionsList,
		createPromotion,
		updateCart,
		addItemToCart,
		removeItemFromCart,
		updateWishlist,
		addItemToWishlist,
		removeItemFromWishlist,
		addToCartFromWishList,
		updateCustomersList,
	};
};

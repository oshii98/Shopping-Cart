import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const wishlistSlice = createSlice({
	name: "wishlist",
	initialState,
	reducers: {
		setWishlistItems: (state, action) => {
			state.length = 0;
			state.push(...action.payload);
		},
	},
});

export const wishlistActions = {
	...wishlistSlice.actions,
};

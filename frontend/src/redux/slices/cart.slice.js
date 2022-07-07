import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		setCartItems: (state, action) => {
			state.length = 0;
			state.push(...action.payload);
		},
	},
});

export const cartActions = {
	...cartSlice.actions,
};

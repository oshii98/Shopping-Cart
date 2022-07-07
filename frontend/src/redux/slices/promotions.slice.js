import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const promotionsSlice = createSlice({
	name: "promotions",
	initialState,
	reducers: {
		setPromotions: (state, action) => {
			state.length = 0;
			state.push(...action.payload);
		},
	},
});

export const promotionsActions = {
	...promotionsSlice.actions,
};

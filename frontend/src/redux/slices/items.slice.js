import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const itemsSlice = createSlice({
	name: "items",
	initialState,
	reducers: {
		setItems: (state, action) => {
			state.length = 0;
			state.push(...action.payload);
		},
	},
});

export const itemsActions = {
	...itemsSlice.actions,
};

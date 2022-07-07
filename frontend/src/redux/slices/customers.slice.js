import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const customersSlice = createSlice({
	name: "customers",
	initialState,
	reducers: {
		setCustomers: (state, action) => {
			state.length = 0;
			state.push(...action.payload);
		},
	},
});

export const customersActions = {
	...customersSlice.actions,
};

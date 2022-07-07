import { createSlice } from "@reduxjs/toolkit";

/**
 * @type { {userId: number, role: 'customer' | 'trader', loggedIn: boolean} }
 */
const initialState = {
	userId: null,
	role: null,
	loggedIn: false,
};

export const authSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		logUser: (state, action) => {
			state.userId = action.payload.userId;
			state.role = action.payload.role;
			state.loggedIn = true;
		},
		logoutUser: (state) => {
			state.userId = null;
			state.role = null;
			state.loggedIn = false;
		},
	},
});

export const authActions = {
	...authSlice.actions,
};

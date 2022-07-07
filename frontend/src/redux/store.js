import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth.slice";
import { cartSlice } from "./slices/cart.slice";
import { customersSlice } from "./slices/customers.slice";
import { itemsSlice } from "./slices/items.slice";
import { promotionsSlice } from "./slices/promotions.slice";
import { wishlistSlice } from "./slices/wishlist.slice";

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		customers: customersSlice.reducer,
		promotions: promotionsSlice.reducer,
		items: itemsSlice.reducer,
		cartItems: cartSlice.reducer,
		wishlistItems: wishlistSlice.reducer,
	},
});

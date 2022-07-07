import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StartPage } from "./pages/StartPage";
import { useSelector, useDispatch } from "react-redux";
import { CustomerHome } from "./pages/CustomerHome";
import { TraderHome } from "./pages/TraderHome";
import { CustomersPage } from "./pages/CustomersPage";
import { PromotionsPage } from "./pages/PromotionsPage";
import { ItemsPage } from "./pages/ItemsPage";
import { useApiFunctions } from "./hooks/api-functions.hook";
import { CartPage } from "./pages/CartPage";
import { WishlistPage } from "./pages/WishlistPage";

export const App = () => {
	const { loggedIn, role } = useSelector((state) => state.auth);
	const { updateItemsList, updatePromotionsList, updateCustomersList } =
		useApiFunctions();

	useEffect(() => {
		updateItemsList();
		updatePromotionsList();
		updateCustomersList();
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				{!loggedIn && <Route path="/" element={<StartPage />} />}
				{loggedIn && role == "customer" && (
					<Route path="/" element={<CustomerHome />}>
						<Route path="/" element={<ItemsPage />} />
						<Route path="cart" element={<CartPage />} />
						<Route path="wishlist" element={<WishlistPage />} />
					</Route>
				)}
				{loggedIn && role == "trader" && (
					<Route path="/" element={<TraderHome />}>
						<Route path="/" element={<CustomersPage />} />
						<Route path="promotions" element={<PromotionsPage />} />
						<Route path="items" element={<ItemsPage />} />
					</Route>
				)}
			</Routes>
		</BrowserRouter>
	);
};

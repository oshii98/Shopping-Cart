import KoaRouter from "koa-router";
import { customers, items } from "../db.js";

export const cartController = new KoaRouter();

// add item to cart
cartController.post("/cart/add", async (ctx) => {
	const { customerId, itemId } = ctx.request.body;

	// get customer
	const customer = customers.find((c) => c.id === customerId);

	// add item to cart
	customer.cartItems.push(itemId);

	ctx.body = null;
});

// remove item from cart
cartController.post("/cart/remove", async (ctx) => {
	const { customerId, itemId } = ctx.request.body;

	// get customer
	const customer = customers.find((c) => c.id === customerId);

	// remove item from cart
	customer.cartItems = customer.cartItems.filter((i) => i !== itemId);

	ctx.body = null;
});

// get all items from the cart
cartController.get("/cart", async (ctx) => {
	const customerId = parseInt(ctx.request.query.customerId);

	// get customer
	const customer = customers.find((c) => c.id === customerId);

	// get items from cart
	const myItems = customer.cartItems.map((i) =>
		items.find((item) => item.id === i)
	);

	ctx.body = myItems;
});

// add item from wishlist to cart
cartController.post("/cart/addFromWishlist", async (ctx) => {
	const { customerId, itemId } = ctx.request.body;

	// get customer
	const customer = customers.find((c) => c.id === customerId);

	// add item from wishlist to cart
	customer.cartItems.push(itemId);

	// remove item from wishlist
	customer.wishListItems = customer.wishListItems.filter((i) => i !== itemId);

	ctx.body = null;
});

import KoaRouter from "koa-router";
import { customers, items } from "../db.js";

export const wishlistController = new KoaRouter();

// add an item to the wishlist
wishlistController.post("/wishlist/add", async (ctx) => {
	const { customerId, itemId } = ctx.request.body;

	// get customer
	const customer = customers.find((c) => c.id === customerId);

	// add item to wishlist
	customer.wishListItems.push(itemId);

	ctx.body = null;
});

// remove an item from the wishlist
wishlistController.post("/wishlist/remove", async (ctx) => {
	const { customerId, itemId } = ctx.request.body;

	// get customer
	const customer = customers.find((c) => c.id === customerId);

	// remove item from wishlist
	customer.wishListItems = customer.wishListItems.filter((i) => i !== itemId);

	ctx.body = null;
});

// get all items from the wishlist
wishlistController.get("/wishlist", async (ctx) => {
	const customerId = parseInt(ctx.request.query.customerId);

	// get customer
	const customer = customers.find((c) => c.id === customerId);

	// get items from wishlist
	const myItems = customer.wishListItems.map((i) =>
		items.find((item) => item.id === i)
	);

	ctx.body = myItems;
});

import KoaRouter from "koa-router";
import { items } from "../db.js";
import { getMaxId } from "../helpers/db.helpers.js";

export const itemsController = new KoaRouter();

// get single item
itemsController.get("/items/:id", (ctx) => {
	const item = items.find((i) => i.id === parseInt(ctx.params.id));
	ctx.body = item;
});

// get all items
itemsController.get("/items", (ctx) => {
	ctx.body = items;
});

// create item
itemsController.post("/items", (ctx) => {
	const newItem = {
		id: getMaxId(items) + 1,
		name: ctx.request.body.name,
		price: ctx.request.body.price,
	};

	items.push(newItem);

	ctx.body = newItem;
});

// update item
itemsController.put("/items/:id", (ctx) => {
	const item = items.find((i) => i.id === parseInt(ctx.params.id));

	if (item) {
		item.name = ctx.request.body.name;
		item.price = ctx.request.body.price;

		ctx.body = item;
	} else {
		ctx.status = 404;
	}
});

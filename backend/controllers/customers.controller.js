import KoaRouter from "koa-router";
import { customers, User } from "../db.js";
import { getMaxId } from "../helpers/db.helpers.js";

export const customersController = new KoaRouter();

// create customer
customersController.post("/customers", (ctx) => {
	const newCustomer = new User();
	newCustomer.id = getMaxId(customers) + 1;
	newCustomer.name = ctx.request.body.name;
	newCustomer.email = ctx.request.body.email;
	newCustomer.password = ctx.request.body.password;

	customers.push(newCustomer);

	ctx.body = newCustomer;
});

// get customers
customersController.get("/customers", (ctx) => {
	ctx.body = customers;
});

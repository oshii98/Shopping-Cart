import KoaRouter from "koa-router";
import { traders, User } from "../db.js";
import { getMaxId } from "../helpers/db.helpers.js";

export const traderController = new KoaRouter();

// create trader
traderController.post("/traders", (ctx) => {
	const newTrader = new User();
	newTrader.id = getMaxId(traders) + 1;
	newTrader.name = ctx.request.body.name;
	newTrader.email = ctx.request.body.email;
	newTrader.password = ctx.request.body.password;

	traders.push(newTrader);

	ctx.body = newTrader;
});

// get traders
traderController.get("/traders", (ctx) => {
	ctx.body = traders;
});

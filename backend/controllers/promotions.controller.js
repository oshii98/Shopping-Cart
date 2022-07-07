import KoaRouter from "koa-router";
import { Promotion, promotions } from "../db.js";
import { getMaxId } from "../helpers/db.helpers.js";

export const promotionsController = new KoaRouter();

// add promotion
promotionsController.post("/promotions", (ctx) => {
	const newPromotion = new Promotion();
	newPromotion.id = getMaxId(promotions) + 1;
	newPromotion.discount = ctx.request.body.discount;
	newPromotion.minAmount = ctx.request.body.minAmount;

	promotions.push(newPromotion);

	ctx.body = newPromotion;
});

// get promotions
promotionsController.get("/promotions", (ctx) => {
	ctx.body = promotions;
});

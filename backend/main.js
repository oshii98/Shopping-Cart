import Koa from "koa";
import koaBodyparser from "koa-bodyparser";
import cors from "@koa/cors";

import { traderController } from "./controllers/trader.controller.js";
import { itemsController } from "./controllers/items.controller.js";
import { promotionsController } from "./controllers/promotions.controller.js";
import { customersController } from "./controllers/customers.controller.js";
import { wishlistController } from "./controllers/wishlist.controller.js";
import { cartController } from "./controllers/cart.controller.js";

// create koa js app
const app = new Koa();

// add middlewares
app.use(cors());
app.use(koaBodyparser());

// add controllers
app.use(traderController.routes());
app.use(itemsController.routes());
app.use(promotionsController.routes());
app.use(customersController.routes());
app.use(wishlistController.routes());
app.use(cartController.routes());

app.listen(3001, () => console.log("Server srated..."));

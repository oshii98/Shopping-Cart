export class User {
	id = 0;
	name = "";
	email = "";
	password = "";

	/**
	 * @type {Array<number>}
	 */
	cartItems = [];

	/**
	 * @type {Array<number>}
	 */
	wishListItems = [];
}

export class Item {
	id = 0;
	name = "";
	price = 0;
}

export class Promotion {
	id = 0;
	minAmount = 0;
	discount = 0;
}

/**
 * @type {User[]}
 */
export const traders = [];

/**
 * @type {User[]}
 */
export const customers = [];

/**
 * @type {Item[]}
 */
export const items = [];

/**
 * @type {Promotion[]}
 */
export const promotions = [];

import React, { useState } from "react";
import { useApiFunctions } from "../hooks/api-functions.hook";
import { useSelector } from "react-redux";

const AddPromotion = () => {
	const { createPromotion } = useApiFunctions();
	const [form, setForm] = useState({
		minAmount: 0,
		discount: 0,
	});

	const onSubmit = (e) => {
		e.preventDefault();
		createPromotion(form);
		clearForm();
	};

	const clearForm = () => {
		setForm({
			minAmount: "",
			discount: 0,
		});
	};

	return (
		<div>
			<h3>Add Promotion</h3>

			<form onSubmit={onSubmit}>
				<div>
					<label htmlFor="minAmount">Minimum Amount</label>
					<input
						type="number"
						name="minAmount"
						required
						value={form.minAmount}
						onChange={(e) =>
							setForm({ ...form, minAmount: e.target.value })
						}
					/>
				</div>
				<div>
					<label htmlFor="discount">Discount</label>
					<input
						type="number"
						name="disocunt"
						required
						value={form.discount}
						onChange={(e) =>
							setForm({ ...form, discount: e.target.value })
						}
					/>
				</div>

				<div>
					<button type="submit">Create New</button>
				</div>
			</form>
		</div>
	);
};

const PromotionsView = () => {
	const promotions = useSelector((state) => state.promotions);

	return (
		<div>
			<h3>Promotions</h3>
			{promotions.map((promo) => (
				<div key={promo.id}>
					<div>Promotion minimum amount: {promo.minAmount}</div>
					<div>Promotion discount: {promo.discount}</div>
				</div>
			))}
		</div>
	);
};

export const PromotionsPage = () => {
	return (
		<div>
			<h1>Promotions</h1>

			<AddPromotion />

			<PromotionsView />
		</div>
	);
};

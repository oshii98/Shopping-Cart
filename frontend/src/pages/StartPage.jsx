import React, { useState } from "react";
import { useApiFunctions } from "../hooks/api-functions.hook";

// account create component
const CreateAccount = ({ title, onCreate }) => {
	const [form, setForm] = useState({
		name: null,
		email: null,
		password: null,
	});

	const onSubmit = (e) => {
		e.preventDefault();
		onCreate(form);
	};

	return (
		<div>
			<h2>{title}</h2>
			<form onSubmit={onSubmit}>
				<div>
					<label>Name</label>
					<input
						type="text"
						placeholder="Enter Name"
						required
						onChange={(e) =>
							setForm({ ...form, name: e.target.value })
						}
					/>
				</div>
				<div>
					<label>Email</label>
					<input
						type="email"
						placeholder="Enter Email"
						required
						onChange={(e) =>
							setForm({ ...form, email: e.target.value })
						}
					/>
				</div>
				<div>
					<label>Password</label>
					<input
						type="password"
						placeholder="Enter Password"
						required
						onChange={(e) =>
							setForm({ ...form, password: e.target.value })
						}
					/>
				</div>
				<button type="submit">Create</button>
			</form>
		</div>
	);
};

export const StartPage = () => {
	const apiFuncs = useApiFunctions();

	const createAccount = (type, data) => {
		apiFuncs.createAccount(type, data);
	};

	return (
		<>
			<CreateAccount
				title="Create Customer"
				onCreate={(data) => createAccount("customer", data)}
			/>
			<CreateAccount
				title="Create Trader"
				onCreate={(data) => createAccount("trader", data)}
			/>
		</>
	);
};

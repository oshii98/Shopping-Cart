import React from "react";

export const ItemsView = ({ items, onRemove }) => {
	return (
		<div>
			<h3>Items</h3>
			{items.map((item) => (
				<div key={item.id}>
					<div>Item Name: {item.name}</div>
					<div>Item Price: {item.price}</div>
					<div>
						<button onClick={() => onRemove(item)}>Remove</button>
					</div>
				</div>
			))}
		</div>
	);
};

/**
 * Get max ID from the array
 * @param {{id : number}[]} arr
 */
export const getMaxId = (arr) => {
	return arr.length > 0
		? arr.map((item) => item.id).reduce((a, b) => Math.max(a, b))
		: 0;
};

export const wrapFull = (ang) => {
	return ang % (2 * Math.PI);
};

export const wrapHalf = (ang) => {
	return ang % Math.PI;
};

export const wrapQuarter = (ang) => {
	return ang % (Math.PI / 2);
};
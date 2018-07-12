const wrapFull = (ang) => {
	return ang % (2 * Math.PI);
};

const wrapHalf = (ang) => {
	return ang % Math.PI;
};

const wrapQuarter = (ang) => {
	return ang % (Math.PI / 2);
};

export default {
	wrapFull,
	wrapHalf,
	wrapQuarter
};
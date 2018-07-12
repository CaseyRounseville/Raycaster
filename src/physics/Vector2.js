const create = (x, y) => {
	return {
		x,
		y
	};
};

const add = (dest, src1, src2) => {
	dest.x = src1.x + src2.x;
	dest.y = src1.y + src2.y;
	return dest;
};

const subtract = (dest, src1, src2) => {
	dest.x = src1.x - src2.x;
	dest.y = src1.y - src2.y;
	return dest;
};

const multiply = (dest, src1, src2) => {
	dest.x = src1.x * src2.x;
	dest.y = src1.y * src2.y;
	return dest;
};

const divide = (dest, src1, src2) => {
	dest.x = src1.x / src2.x;
	dest.y = src1.y / src2.y;
	return dest;
};

export default {
	create,
	add,
	subtract,
	multiply,
	divide
};
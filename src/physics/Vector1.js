const create = (v) => {
	return {
		v
	};
};

const add = (dest, src1, src2) => {
  dest.v = src1.v + src2.v;
  return dest;
};

const subtract = (dest, src1, src2) => {
  dest.v = src1.v - src2.v;
  return dest;
};

const multiply = (dest, src1, src2) => {
  dest.v = src1.v * src2.v;
  return dest;
};

const divide = (dest, src1, src2) => {
  dest.v = src1.v / src2.v;
  return dest;
};

export default {
	create,
  add,
  subtract,
  multiply,
  divide
};
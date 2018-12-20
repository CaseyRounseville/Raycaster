export function Vector2(x, y) {
  this.x = x;
  this.y = y;
}

Vector2.prototype.normalize = function() {
  const euclideanDist = Math.sqrt(this.x * this.x + this.y * this.y);
  this.x /= euclideanDist;
  this.y /= euclideanDist;
};

export const add = (dest, src1, src2) => {
	dest.x = src1.x + src2.x;
	dest.y = src1.y + src2.y;
	return dest;
};

export const subtract = (dest, src1, src2) => {
	dest.x = src1.x - src2.x;
	dest.y = src1.y - src2.y;
	return dest;
};

export const multiply = (dest, src1, src2) => {
	dest.x = src1.x * src2.x;
	dest.y = src1.y * src2.y;
	return dest;
};

export const divide = (dest, src1, src2) => {
	dest.x = src1.x / src2.x;
	dest.y = src1.y / src2.y;
	return dest;
};
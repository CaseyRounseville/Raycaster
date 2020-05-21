import { equalsWithinTol as floatEqualsWithinTol } from "../util/FloatUtil";

export function Vector2(x, y) {
  this.x = x;
  this.y = y;
}

Vector2.prototype.normalize = function() {
  const euclideanDist = Math.sqrt(this.x * this.x + this.y * this.y);
  this.x /= euclideanDist;
  this.y /= euclideanDist;
};

Vector2.prototype.magnitude = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y);
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

export const copy = (dest, src) => {
	dest.x = src.x;
	dest.y = src.y;
};

export const equals = (a, b) => {
	return a.x == b.x && a.y == b.y;
};

export const equalsWithinTol = (a, b, tol) => {
	return floatEqualsWithinTol(a.x, b.x, tol) &&
			floatEqualsWithinTol(a.y, b.y, tol);
};

import { equalsWithinTol as floatEqualsWithinTol } from "../util/FloatUtil";

export function Vector3(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
}

Vector3.prototype.normalize = function() {
  const euclideanDist = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  this.x /= euclideanDist;
  this.y /= euclideanDist;
  this.z /= euclideanDist;
};

Vector3.prototype.magnitude = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
};

export const add = (dest, src1, src2) => {
  dest.x = src1.x + src2.x;
	dest.y = src1.y + src2.y;
  dest.z = src1.z + src2.z;
	return dest;
};

// maybe add scale function?

export const subtract = (dest, src1, src2) => {
  dest.x = src1.x - src2.x;
	dest.y = src1.y - src2.y;
  dest.z = src1.z - src2.z;
	return dest;
};

export const multiply = (dest, src1, src2) => {
  dest.x = src1.x * src2.x;
	dest.y = src1.y * src2.y;
  dest.z = src1.z * src2.z;
	return dest;
};

export const divide = (dest, src1, src2) => {
  dest.x = src1.x / src2.x;
	dest.y = src1.y / src2.y;
  dest.z = src1.z / src2.z;
	return dest;
};

export const copy = (dest, src) => {
	dest.x = src.x;
	dest.y = src.y;
	dest.z = src.z;
};

export const equals = (a, b) => {
  return a.x == b.x && a.y == b.y && a.z == b.z;
};

export const equalsWithinTol = (a, b, tol) => {
  return floatEqualsWithinTol(a.x, b.x, tol) &&
      floatEqualsWithinTol(a.y, b.y, tol) &&
      floatEqualsWithinTol(a.z, b.z, tol);
};

export const distBetween = (a, b) => {
  const diffX = a.x - b.x;
  const diffY = a.y - b.y;
  const diffZ = a.z - b.z;
  return Math.sqrt(diffX * diffX + diffY * diffY + diffZ * diffZ);
};

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
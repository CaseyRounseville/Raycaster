export function Vector4(x, y, z, w) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.w = w;
}

Vector4.prototype.normalize = function() {
  const euclideanDist = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  this.x /= euclideanDist;
  this.y /= euclideanDist;
  this.z /= euclideanDist;
  this.w /= euclideanDist;
};

export const add = (dest, src1, src2) => {
  dest.x = src1.x + src2.x;
	dest.y = src1.y + src2.y;
  dest.z = src1.z + src2.z;
  dest.w = src1.w + src2.w;
	return dest;
};

// maybe add scale function?

export const subtract = (dest, src1, src2) => {
  dest.x = src1.x - src2.x;
	dest.y = src1.y - src2.y;
  dest.z = src1.z - src2.z;
  dest.w = src1.w - src2.w;
	return dest;
};

export const multiply = (dest, src1, src2) => {
  dest.x = src1.x * src2.x;
	dest.y = src1.y * src2.y;
  dest.z = src1.z * src2.z;
  dest.w = src1.w * src2.w;
	return dest;
};

export const divide = (dest, src1, src2) => {
  dest.x = src1.x / src2.x;
	dest.y = src1.y / src2.y;
  dest.z = src1.z / src2.z;
  dest.w = src1.w / src2.w;
	return dest;
};
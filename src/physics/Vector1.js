export function Vector1(v) {
  this.v = v;
}

Vector1.prototype.normalize = function() {
  // can this be done?
};

export const add = (dest, src1, src2) => {
  dest.v = src1.v + src2.v;
  return dest;
};

export const subtract = (dest, src1, src2) => {
  dest.v = src1.v - src2.v;
  return dest;
};

export const multiply = (dest, src1, src2) => {
  dest.v = src1.v * src2.v;
  return dest;
};

export const divide = (dest, src1, src2) => {
  dest.v = src1.v / src2.v;
  return dest;
};
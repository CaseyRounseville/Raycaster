import { equalsWithinTol as floatEqualsWithinTol } from "../util/FloatUtil";

export function Vector1(v) {
  this.v = v;
}

Vector1.prototype.normalize = function() {
  // can this be done?
};

Vector1.prototype.magnitude = function() {
  return Math.abs(this.v);
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

export const copy = (dest, src) => {
  dest.v = src.v;
};

export const equals = (a, b) => {
  return a.v == b.v;
};

export const equalsWithinTol = (a, b, tol) => {
  return floatEqualsWithinTol(a.v, b.v, tol);
};

import * as ArrayUtil from "../util/ArrayUtil";

export function Body(pos, vel, acc, hitBox) {
  this.pos = pos;
  this.vel = acc;
  this.hitBox = hitBox;
  this.cbs = [];
}

Body.prototype.registerCallback = function(cb) {
  this.cbs.push(cb);
};

Body.prototype.unregisterCallback = function(cb) {
  return ArrayUtil.remove(this.cbs, cb);
};
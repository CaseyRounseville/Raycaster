import * as ArrayUtil from "../util/ArrayUtil";

/*
functions
  wire: void
  unwire: void
  tick: bool
*/
export function Task() {
  this.cbs = [];
}

Task.prototype.registerCallback = function(cb) {
  this.cbs.push(cb);
};

Task.prototype.unregisterCallback = function(cb) {
  ArrayUtil.remove(this.cbs, cb);
};
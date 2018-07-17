import * as ArrayUtil from "../util/ArrayUtil";

export function Task() {
  this.cbs = [];
}

Task.prototype.registerCallback = function(cb) {
  this.cbs.push(cb);
};

Task.prototype.unregisterCallback = function(cb) {
  ArrayUtil.remove(this.cbs, cb);
};
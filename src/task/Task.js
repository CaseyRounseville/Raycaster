import * as ArrayUtil from "../util/ArrayUtil";

export const create = (tick) => {
	return {
		cbs: [],
    tick
	};
};

export const registerCallback = (self, cb) => {
  ArrayUtil.add(self.cbs, cb);
};

export const unregisterCallback = (self, cb) => {
  ArrayUtil.remove(self.cbs, cb);
};
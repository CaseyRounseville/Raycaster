import ArrayUtil from "../util/ArrayUtil";

/*
subtypes must implement method bool tick(self)
*/
const create = () => {
	return {
		cbs: []
	};
};

const registerCallback = (self, cb) => {
  ArrayUtil.add(self.cbs, cb);
};

const unregisterCallback = (self, cb) => {
  ArrayUtil.remove(self.cbs, cb);
};

export default {
	create,
  registerCallback,
  unregisterCallback
};
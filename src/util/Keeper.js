const findVacancy = (self) => {
	for (var i = 0; i < self.max; i++) {
		if (!self.objs[i]) {
			return i;
		}
	}
	return -1;
};

export const add = (self, obj) => {
	var handle = findVacancy(self);
	if (handle == -1) {
		console.log("Keeper.add: OVERFLOW");
	}
	objs[handle] = obj;
	return handle;
};

export const remove = (self, handle) => {
  let obj = self.objs[handle];
	delete self.objs[handle];
  return obj;
};

export const create = (max) => {
	return {
		max,
		objs: []
	};
};
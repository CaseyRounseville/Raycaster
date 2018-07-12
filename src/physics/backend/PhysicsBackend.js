export const registerBody = (self, body) => {
	self.bodies.push(body);
};

export const unregisterBody = (self, body) => {
	self.bodies.remove(body);
};

export const create = (process) => {
	return {
		bodies: [],
		process
	};
};
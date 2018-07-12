const registerBody = (self, body) => {
	self.bodies.push(body);
};

const unregisterBody = (self, body) => {
	self.bodies.remove(body);
};

const create = (process) => {
	return {
		bodies: [],
		
		registerBody,
		unregisterBody,
		
		process
	};
};

export default {
	create
};
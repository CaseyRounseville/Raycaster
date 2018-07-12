export const BTN_UP	= 0,
             BTN_DOWN	= 1,
             BTN_LEFT	= 2,
             BTN_RIGHT	= 3;

export const registerInputHandler = (self, inputHandler) => {
	self.inputHandlers.push(inputHandler);
};

export const unregisterInputHandler = (self, inputHandler) => {
	self.inputHandlers.remove(inputHandler);
};

export const isDown = (self, btn) => {
	if (btn < 0 || btn > 3) {
		return false;
	}
	return ((self.currFrame >> btn) & 1) == 1;
};

export const wasDown = (self, btn) => {
	if (btn < 0 || btn > 3) {
		return false;
	}
	return ((self.prevFrame >> btn) & 1) == 1;
};

export const process = (self) => {
	// process current frame of input
	for (var i = 0; i < self.inputHandlers.length; i++) {
		let inputHandler = self.inputHandlers[i];
		inputHandler.handleInput(inputHandler, self);
	}
	
	// set previous to current
	self.prevFrame = self.currFrame;
};

export const press = (self, btn) => {
	if (btn < 0 || btn > 3) {
		return;
	}
	self.currFrame |= 1 << btn;
};

export const release = (self, btn) => {
	if (btn < 0 || btn > 3) {
		return;
	}
	self.currFrame &= ~(1 << btn);
};

export const create = () => {
	return {
		currFrame: 0,
		prevFrame: 0,
		inputHandlers: []
	};
};
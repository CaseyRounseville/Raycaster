const BTN_UP	= 0,
      BTN_DOWN	= 1,
      BTN_LEFT	= 2,
      BTN_RIGHT	= 3;

const registerInputHandler = (self, inputHandler) => {
	self.inputHandlers.push(inputHandler);
};

const unregisterInputHandler = (self, inputHandler) => {
	self.inputHandlers.remove(inputHandler);
};

const isDown = (self, btn) => {
	if (btn < 0 || btn > 3) {
		return false;
	}
	return ((self.currFrame >> btn) & 1) == 1;
};

const wasDown = (self, btn) => {
	if (btn < 0 || btn > 3) {
		return false;
	}
	return ((self.prevFrame >> btn) & 1) == 1;
};

const process = (self) => {
	// process current frame of input
	for (var i = 0; i < self.inputHandlers.length; i++) {
		let inputHandler = self.inputHandlers[i];
		inputHandler.handleInput(inputHandler, self);
	}
	
	// set previous to current
	self.prevFrame = self.currFrame;
};

const press = (self, btn) => {
	if (btn < 0 || btn > 3) {
		return;
	}
	self.currFrame |= 1 << btn;
};

const release = (self, btn) => {
	if (btn < 0 || btn > 3) {
		return;
	}
	self.currFrame &= ~(1 << btn);
};

const create = () => {
	return {
		currFrame: 0,
		prevFrame: 0,
		inputHandlers: [],
		
		press,
		release,
		isDown,
		wasDown,
		registerInputHandler,
		unregisterInputHandler,
		process
	};
};

export default {
	BTN_UP,
	BTN_DOWN,
	BTN_LEFT,
	BTN_RIGHT,
	
	create
};
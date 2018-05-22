const BTN_UP	= 0;
const BTN_DOWN	= 1;
const BTN_LEFT	= 2;
const BTN_RIGHT	= 3;

function InputBackend() {
	this.currFrame = 0;
	this.prevFrame = 0;
	
	this.inputHandlers = [];
}

InputBackend.prototype.registerInputHandler = function(inputHandler) {
	this.inputHandlers.push(inputHandler);
};

InputBackend.prototype.unregisterInputHandler = function(inputHandler) {
	this.inputHandlers.remove(inputHandler);
};

InputBackend.prototype.isDown = function(btn) {
	if (btn < 0 || btn > 3) {
		return false;
	}
	return ((this.currFrame >> btn) & 1) == 1;
};

InputBackend.prototype.wasDown = function(btn) {
	if (btn < 0 || btn > 3) {
		return false;
	}
	return ((this.prevFrame >> btn) & 1) == 1;
};

InputBackend.prototype.processInput = function() {
	// process current frame of input
	for (var i = 0; i < this.inputHandlers.length; i++) {
		this.inputHandlers[i].handleInput();
	}
	
	// set previous to current
	this.prevFrame = this.currFrame;
};

InputBackend.prototype.press = function(btn) {
	if (btn < 0 || btn > 3) {
		return;
	}
	this.currFrame |= 1 << btn;
};

InputBackend.prototype.release = function(btn) {
	if (btn < 0 || btn > 3) {
		return;
	}
	this.currFrame &= ~(1 << btn);
};
export const BTN_UP	= 0,
             BTN_DOWN	= 1,
             BTN_LEFT	= 2,
             BTN_RIGHT	= 3;

export function InputBackend() {
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

InputBackend.prototype.process = function() {
  // process current frame of input
	for (let i = 0; i < this.inputHandlers.length; i++) {
		const inputHandler = this.inputHandlers[i];
		inputHandler.handleInput(this);
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
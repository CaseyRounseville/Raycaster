// movement buttons
export const BTN_UP			= 0;
export const BTN_DOWN		= 1;
export const BTN_LEFT		= 2;
export const BTN_RIGHT		= 3;

// rotation buttons
export const BTN_ROT_LEFT	= 4;
export const BTN_ROT_RIGHT	= 5;

/**
 * Initialize this input backend.
 * 
 * Parameters:
 * None.
 * 
 * Returns:
 * Nothing.
 */
export function InputBackend() {
	this.currFrame = 0;
	this.prevFrame = 0;
	this.inputHandlers = [];
}

/**
 * Register an input handler to this input backend, so it is called on to
 * examine the state of the input each frame.
 * 
 * Parameters:
 * inputHandler -- The input handler to register.
 * 
 * Returns:
 * Nothing.
 */
InputBackend.prototype.registerInputHandler = function(inputHandler) {
	this.inputHandlers.push(inputHandler);
};

/**
 * Unregister an input handler from this input backend, so it is no longer
 * called upon to examine the state of the input each frame.
 * 
 * Parameters:
 * inputHandler -- The input handler to unregister.
 * 
 * Returns:
 * Nothing.
 */
InputBackend.prototype.unregisterInputHandler = function(inputHandler) {
	this.inputHandlers.remove(inputHandler);
};

/**
 * Return whether the specified button is down right now, in the current frame.
 * 
 * Parameters:
 * btn -- The button to check if it is currently down.
 * 
 * Returns:
 * Whether the specified button is currently down.
 */
InputBackend.prototype.isDown = function(btn) {
	if (btn < 0 || btn > 5) {
		return false;
	}
	return ((this.currFrame >> btn) & 1) == 1;
};

/**
 * Return whether the specified button was down on the previous frame.
 * 
 * Parameters:
 * btn -- The button to check if it was down last frame.
 * 
 * Returns:
 * Whether the specified button was down last frame.
 */
InputBackend.prototype.wasDown = function(btn) {
	if (btn < 0 || btn > 5) {
		return false;
	}
	return ((this.prevFrame >> btn) & 1) == 1;
};

/**
 * Call all registered input handlers, and update the record of input by
 * copying the current input state into the state for the previous frame.
 * 
 * Parameters:
 * None.
 * 
 * Returns:
 * Nothing.
 */
InputBackend.prototype.process = function() {
	// process current frame of input
	for (let i = 0; i < this.inputHandlers.length; i++) {
		const inputHandler = this.inputHandlers[i];
		inputHandler.handleInput(this);
	}
	
	// set previous to current
	this.prevFrame = this.currFrame;
};

/**
 * Programatically cause a button press, of the specified button.
 * 
 * Parameters:
 * btn -- The button to press.
 * 
 * Returns:
 * Nothing.
 */
InputBackend.prototype.press = function(btn) {
	if (btn < 0 || btn > 5) {
		return;
	}
	this.currFrame |= 1 << btn;
};

/**
 * Programatically cause a button release, of the specified button.
 * 
 * Parameters:
 * btn -- The button to release.
 * 
 * Returns:
 * Nothing.
 */
InputBackend.prototype.release = function(btn) {
	if (btn < 0 || btn > 5) {
		return;
	}
	this.currFrame &= ~(1 << btn);
};

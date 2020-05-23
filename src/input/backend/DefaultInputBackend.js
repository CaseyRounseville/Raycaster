import {
	InputBackend,
	BTN_LEFT,
	BTN_UP,
	BTN_RIGHT,
	BTN_DOWN,
	BTN_ROT_LEFT,
	BTN_ROT_RIGHT
} from "./InputBackend";

// map keyboard event codes to button constants
const keyToBtn = {
	37: BTN_LEFT,
	38: BTN_UP,
	39: BTN_RIGHT,
	40: BTN_DOWN,
	65: BTN_ROT_LEFT,
	68: BTN_ROT_RIGHT
};

DefaultInputBackend.prototype = Object.create(InputBackend.prototype);
DefaultInputBackend.prototype.constructor = DefaultInputBackend;

/**
 * Initialize this default input backend. Set up key event listeners for the
 * document, and record when one of the game buttons is pressed or released.
 * 
 * Parameters:
 * None.
 * 
 * Returns:
 * Nothing.
 */
export function DefaultInputBackend() {
	InputBackend.call(this);

	// listen for key presses
	document.onkeydown = (event) => {
		// extract the key code from the event, and see if it is one we are
		// interested in
		const key = event.keyCode;
		if (keyToBtn[key] == undefined) {
			return;
		}

		// determine which button it was, and press it
		const btn = keyToBtn[key];
		this.press(btn);
	};
	
	// listen for key releases
	document.onkeyup = (event) => {
		// extract the key code from the event, and see if it is one we are
		// interested in
		const key = event.keyCode;
		if (keyToBtn[key] == undefined) {
			return;
		}

		// determine which button it was, and release it
		const btn = keyToBtn[key];
		this.release(btn);
	};

	// listen for mouse movements
	/*document.onmousemove = (event) => {
		// if the magnitude of the movement was small, turn off rotation
		if (Math.abs(event.offsetX) < 3) {
			this.release(BTN_ROT_LEFT);
			this.release(BTN_ROT_RIGHT);
			return;
		}

		// determine if we should rotate left or right
		if (event.offsetX < 0) {
			this.release(BTN_ROT_RIGHT);
			this.press(BTN_ROT_LEFT);
		} else if (event.offsetX > 0) {
			this.release(BTN_ROT_LEFT);
			this.press(BTN_ROT_RIGHT);
		}
	};

	// turn off rotation if the mouse leaves the document
	document.onmouseleave = (event) => {
			this.release(BTN_ROT_LEFT);
			this.release(BTN_ROT_RIGHT);
	};*/
}

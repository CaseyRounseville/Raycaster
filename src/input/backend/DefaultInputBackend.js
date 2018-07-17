import { InputBackend, BTN_LEFT, BTN_UP, BTN_RIGHT, BTN_DOWN } from "./InputBackend";

const keyToBtn = {
	37: BTN_LEFT,
	38: BTN_UP,
	39: BTN_RIGHT,
	40: BTN_DOWN
};

DefaultInputBackend.prototype = Object.create(InputBackend.prototype);
DefaultInputBackend.prototype.constructor = DefaultInputBackend;

export function DefaultInputBackend() {
  InputBackend.call(this);
  
  document.onkeydown = (event) => {
		const key = event.keyCode;
		if (keyToBtn[key] == undefined) {
			return;
		}
		
		const btn = keyToBtn[key];
		
		this.press(btn);
	};
	
	document.onkeyup = (event) => {
		const key = event.keyCode;
		if (keyToBtn[key] == undefined) {
			return;
		}
		
		const btn = keyToBtn[key];
		
		this.release(btn);
	};
}
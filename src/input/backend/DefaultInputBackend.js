import * as InputBackend from "./InputBackend";

const keyToBtn = {
	37: InputBackend.BTN_LEFT,
	38: InputBackend.BTN_UP,
	39: InputBackend.BTN_RIGHT,
	40: InputBackend.BTN_DOWN
};

export const create = () => {
	let self = InputBackend.create();
	
	document.onkeydown = (event) => {
		let key = event.keyCode;
		if (keyToBtn[key] == undefined) {
			return;
		}
		
		let btn = keyToBtn[key];
		
		InputBackend.press(self, btn);
	};
	
	document.onkeyup = (event) => {
		let key = event.keyCode;
		if (keyToBtn[key] == undefined) {
			return;
		}
		
		let btn = keyToBtn[key];
		
		InputBackend.release(self, btn);
	};
	
	return self;
};
import InputBackend from "./InputBackend";

const keyToBtn = {
	37: InputBackend.BTN_LEFT,
	38: InputBackend.BTN_UP,
	39: InputBackend.BTN_RIGHT,
	40: InputBackend.BTN_DOWN
};

const create = () => {
	let defaultInputBackend = InputBackend.create();
	
	document.onkeydown = (event) => {
		let key = event.keyCode;
		if (keyToBtn[key] == undefined) {
			return;
		}
		
		let btn = keyToBtn[key];
		
		defaultInputBackend.press(defaultInputBackend, btn);
	};
	
	document.onkeyup = (event) => {
		let key = event.keyCode;
		if (keyToBtn[key] == undefined) {
			return;
		}
		
		let btn = keyToBtn[key];
		
		defaultInputBackend.release(defaultInputBackend, btn);
	};
	
	return defaultInputBackend;
};

export default {
	create
};
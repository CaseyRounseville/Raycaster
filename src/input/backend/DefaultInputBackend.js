const keyToBtn = {
	37: BTN_LEFT,
	38: BTN_UP,
	39: BTN_RIGHT,
	40: BTN_DOWN
};

//DefaultInputBackend.prototype = new InputBackend();
DefaultInputBackend.prototype = Object.create(InputBackend.prototype);
DefaultInputBackend.prototype.constructor = DefaultInputBackend;

function DefaultInputBackend() {
	InputBackend.call(this);
	
	document.onkeydown = this.onkeydown;
	document.onkeyup = this.onkeyup;
}

DefaultInputBackend.prototype.onkeydown = function(event) {
	var key = event.keyCode;
	if (keyToBtn[key] == undefined) {
		return;
	}
	
	var btn = keyToBtn[key];
	
	inputBackend.press(btn);
};

DefaultInputBackend.prototype.onkeyup = function(event) {
	var key = event.keyCode;
	if (keyToBtn[key] == undefined) {
		return;
	}
	
	var btn = keyToBtn[key];
	
	inputBackend.release(btn);
};
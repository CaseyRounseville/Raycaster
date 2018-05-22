function TestInputHandler() {
	InputHandler.call(this);
	
	this.handleInput = function() {
		if (inputBackend.isDown(BTN_DOWN)) {
			alert("BTN_DOWN JUST PRESSED");
		}
	};
}
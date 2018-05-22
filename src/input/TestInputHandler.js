TestInputHandler.prototype = Object.create(InputHandler.prototype);
TestInputHandler.prototype.constructor = TestInputHandler;

function TestInputHandler() {
	InputHandler.call(this);
}

TestInputHandler.prototype.handleInput = function() {
	if (inputBackend.isDown(BTN_DOWN)) {
		alert("BTN_DOWN JUST PRESSED");
	}
};
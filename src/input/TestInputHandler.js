import * as InputBackend from "./backend/InputBackend";

export function TestInputHandler() {
  
}

TestInputHandler.prototype.handleInput = function(backend) {
  if (backend.isDown(backend, InputBackend.BTN_DOWN)) {
		console.log("BTN_DOWN JUST PRESSED");
	}
};
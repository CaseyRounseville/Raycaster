import * as InputHandler from "./InputHandler";
import * as InputBackend from "./backend/InputBackend";

const handleInput = (self, backend) => {
	if (InputBackend.isDown(backend, InputBackend.BTN_DOWN)) {
		console.log("BTN_DOWN JUST PRESSED");
	}
};

export const create = () => {
	let testInputHandler = InputHandler.create(handleInput);
	
	return testInputHandler;
};
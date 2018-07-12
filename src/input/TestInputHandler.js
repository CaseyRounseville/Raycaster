import InputHandler from "./InputHandler";
import InputBackend from "./backend/InputBackend";

const handleInput = (self, backend) => {
	if (backend.isDown(backend, InputBackend.BTN_DOWN)) {
		console.log("BTN_DOWN JUST PRESSED");
	}
};

const create = () => {
	let testInputHandler = InputHandler.create(handleInput);
	
	return testInputHandler;
};

export default {
	create
};
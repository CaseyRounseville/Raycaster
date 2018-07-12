import InputHandler from "../../input/InputHandler";

import InputBackend from "../../input/backend/InputBackend";

function PlayerInputHandler(player) {
	this.player = player;
}

const create = (player) => {
	let inputHandler = InputHandler.create(handleInput);
	
	inputHandler.player = player;
	
	return inputHandler;
};

const handleInput = (self, backend) => {
	if (backend.isDown(backend, InputBackend.BTN_LEFT)) {
		self.player.pos.x -= 1;
	}
	if (backend.isDown(backend, InputBackend.BTN_RIGHT)) {
		self.player.pos.x += 1;
	}
	if (backend.isDown(backend, InputBackend.BTN_UP)) {
		self.player.pos.y -= 1;
	}
	if (backend.isDown(backend, InputBackend.BTN_DOWN)) {
		self.player.pos.y += 1;
	}
};

export default {
	create
};
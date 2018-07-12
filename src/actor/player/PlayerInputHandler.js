import * as InputHandler from "../../input/InputHandler";

import * as InputBackend from "../../input/backend/InputBackend";

export const create = (player) => {
	let self = InputHandler.create(handleInput);
	
	self.player = player;
	
	return self;
};

const handleInput = (self, backend) => {
	if (InputBackend.isDown(backend, InputBackend.BTN_LEFT)) {
		self.player.pos.x -= 1;
	}
	if (InputBackend.isDown(backend, InputBackend.BTN_RIGHT)) {
		self.player.pos.x += 1;
	}
	if (InputBackend.isDown(backend, InputBackend.BTN_UP)) {
		self.player.pos.y -= 1;
	}
	if (InputBackend.isDown(backend, InputBackend.BTN_DOWN)) {
		self.player.pos.y += 1;
	}
};
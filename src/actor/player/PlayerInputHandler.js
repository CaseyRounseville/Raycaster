import * as InputBackend from "../../input/backend/InputBackend";

export function PlayerInputHandler(player) {
  this.player = player;
}

PlayerInputHandler.prototype.handleInput = function(backend) {
  if (backend.isDown(InputBackend.BTN_LEFT)) {
    this.player.pos.x -= 1;
  }
  if (backend.isDown(InputBackend.BTN_RIGHT)) {
		this.player.pos.x += 1;
	}
	if (backend.isDown(InputBackend.BTN_UP)) {
		this.player.pos.y -= 1;
	}
	if (backend.isDown(InputBackend.BTN_DOWN)) {
		this.player.pos.y += 1;
	}
};
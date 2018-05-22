PlayerInputHandler.prototype = new InputHandler();
PlayerInputHandler.prototype.constructor = PlayerInputHandler;

function PlayerInputHandler(player) {
	this.player = player;
}

PlayerInputHandler.prototype.handleInput = function() {
	if (inputBackend.isDown(BTN_LEFT)) {
		this.player.pos.x -= 1;
	}
};
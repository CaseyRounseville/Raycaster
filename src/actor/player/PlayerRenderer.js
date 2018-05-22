PlayerRenderer.prototype = new Renderer();
PlayerRenderer.prototype.constructor = PlayerRenderer;

function PlayerRenderer(player) {
	this.player = player;
}

PlayerRenderer.prototype.render = function() {
	graphicsBackend.setColor(0, 255, 0, 1);
	graphicsBackend.fillRect(player.pos.x - 10, player.pos.y - 10, 20, 20);
};
export function PlayerRenderer(player) {
  this.player = player;
}

PlayerRenderer.prototype.render = function(backend) {
  backend.setFillColor(0xFF0000FF);
	backend.fillRect(this.player.pos.x - 10, this.player.pos.y - 10, 20, 20, 0xFF0000FF);
  backend.renderTexture("test-0",
                        this.player.pos.x,
                        this.player.pos.y,
                        32,
                        32,
                        0,
                        0,
                        32,
                        32);
};
Player.prototype = new Actor();
Player.prototype.constructor = Player;

function Player(x, y) {
	Actor.call(this, x, y);
	
	this.pos = new Vector2f(x, y);
	
	this.renderer = new PlayerRenderer(this);
	
	this.inputHandler = new PlayerInputHandler(this);
}

Player.prototype.wire = function() {
	alert("wiring player");
	
	graphicsBackend.registerRenderer(this.renderer);
	
	inputBackend.registerInputHandler(this.inputHandler);
};

Player.prototype.unwire = function() {
	graphicsBackend.unregisterRenderer(this.renderer);
	
	inputBackend.unregisterInputHandler(this.inputHandler);
};
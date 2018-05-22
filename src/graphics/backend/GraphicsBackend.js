function GraphicsBackend() {
	this.renderers = [];
	
}

GraphicsBackend.prototype.registerRenderer = function(renderer) {
	this.renderers.push(renderer);
};

GraphicsBackend.prototype.unregisterRenderer = function(renderer) {
	this.renderers.remove(renderer);
};

GraphicsBackend.prototype.render = function() {
	this.clearScreen();
	for (var i = 0; i < this.renderers.length; i++) {
		this.renderers[i].render(this);// is "this" refer to gfxbknd or fn?
	}
};

GraphicsBackend.prototype.setColor = function(r, g, b, a) {
	// empty
};

GraphicsBackend.prototype.fillRect = function(tlx, tly, w, h) {
	// empty
};

GraphicsBackend.prototype.clearScreen = function() {
	// empty
};
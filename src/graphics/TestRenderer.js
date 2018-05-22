function TestRenderer() {
	Renderer.call(this);
	
	this.render = function() {
		graphicsBackend.setColor(255, 0, 255, 1);
		graphicsBackend.fillRect(0, 0, 10, 10);
	}
}
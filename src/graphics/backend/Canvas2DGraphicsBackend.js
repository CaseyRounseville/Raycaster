Canvas2DGraphicsBackend.prototype = new GraphicsBackend();
Canvas2DGraphicsBackend.prototype.constructor = Canvas2DGraphicsBackend;

function Canvas2DGraphicsBackend() {
	GraphicsBackend.call(this);
	
	this.canvas = document.getElementById("canvas");
	this.ctxt = this.canvas.getContext("2d");
	
	window.addEventListener("resize", this.resize);
	
	this.setColor(255, 0, 255, 1);
	this.resize();
}

Canvas2DGraphicsBackend.prototype.resize = function() {
	this.canvas.width = window.innerWidth;
	this.canvas.height = window.innerHeight;
	this.ctxt = this.canvas.getContext("2d");
	this.ctxt.scale(window.innerWidth / 320, window.innerHeight / 240);
};

Canvas2DGraphicsBackend.prototype.setColor = function(r, g, b, a) {
	this.ctxt.fillStyle = "rgb(" + r + ", " + g + ", " + b + ", " + a + ")";
};

Canvas2DGraphicsBackend.prototype.fillRect = function(tlx, tly, w, h) {
	this.ctxt.fillRect(tlx, tly, w, h);
};

Canvas2DGraphicsBackend.prototype.clearScreen = function() {
	this.setColor(0, 0, 0, 1);
	this.fillRect(0, 0, 320, 240);
	//this.fillRect(0, 0, this.canvas.width, this.canvas.height);
};
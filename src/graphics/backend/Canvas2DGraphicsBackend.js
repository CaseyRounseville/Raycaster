import { GraphicsBackend, INTERNAL_WIDTH, INTERNAL_HEIGHT } from "./GraphicsBackend";

import * as Color from "../util/Color.js";

/*const renderTexture = (self,
                       imgHandle,
                       dest_tlx,
                       dest_tly,
                       dest_w,
                       dest_h,
                       src_tlx,
                       src_tly,
                       src_w,
                       src_h,
                       opacity,
                       color) => {
	// get context
	let ctxt = self.ctxt;
	
	// get img
	let img = self.idToImg[imgHandle];
	
	// set opacity
	ctxt.setGlobalAlpha(opacity);
	
	// draw image
	ctxt.drawImage(img,
                 src_tlx,
                 src_tly,
                 src_w,
                 src_h,
                 dest_tlx,
                 dest_tly,
                 dest_w,
                 dest_h);
	
	// handle tinting(multiplication), if needed
	if (color != Color.WHITE) {
		// preserve previous state
		let oldFillColor = getFillColor(self);
		let oldGlobalCompositeOperation = ctxt.globalCompositeOperation;
		
		// set new state
		setFillColor(self, color);
		ctxt.setGlobalCompositeOperation("multiply");
		
		// render
		fillRect(self, dest_tlx, dest_tly, dest_w, dest_h);
		
		// restore previous state
		setFillColor(oldFillColor);
		ctxt.globalCompositeOperation = oldGlobalCompositeOperation;
	}
};*/

Canvas2DGraphicsBackend.prototype = Object.create(GraphicsBackend.prototype);
Canvas2DGraphicsBackend.prototype.constructor = Canvas2DGraphicsBackend;

export function Canvas2DGraphicsBackend() {
  GraphicsBackend.call(this);
  
  this.ctxt = document.getElementById("canvas").getContext("2d");
  this.fillColor = Color.BLACK;
  this.tintColor = Color.WHITE;
  this.idToImg = {};
}

Canvas2DGraphicsBackend.prototype.getFillColor = function() {
  return this.fillColor;
};

Canvas2DGraphicsBackend.prototype.setFillColor = function(color) {
  const r = Color.getComp1i(color);
	const g = Color.getComp2i(color);
	const b = Color.getComp3i(color);
	const a = Color.getComp4f(color);
  
	this.ctxt.fillStyle = "rgb(" + r + ", " + g + ", " + b + ", " + a + ")";
  this.fillColor = color;
};

Canvas2DGraphicsBackend.prototype.fillRect = function(x, y, w, h) {
  this.ctxt.fillRect(x, y, w, h);
};

Canvas2DGraphicsBackend.prototype.getTintColor = function() {
  return this.tintColor;
};

Canvas2DGraphicsBackend.prototype.setTintColor = function(tintColor) {
  this.tintColor = tintColor;
};

Canvas2DGraphicsBackend.prototype.renderTexture = function(id,
                                                           destX,
                                                           destY,
                                                           destW,
                                                           destH,
                                                           srcX,
                                                           srcY,
                                                           srcW,
                                                           srcH) {
  this.ctxt.drawImage(this.idToImg[id],
                      srcX,
                      srcY,
                      srcW,
                      srcH,
                      destX,
                      destY,
                      destW,
                      destH);
};

Canvas2DGraphicsBackend.prototype.clearScreen = function() {
  this.ctxt.clearRect(0, 0, INTERNAL_WIDTH, INTERNAL_HEIGHT);
};

Canvas2DGraphicsBackend.prototype.loadTexture = function(id, b64) {
  const img = new Image();
  img.src = b64;
  this.idToImg[id] = img;
};

Canvas2DGraphicsBackend.prototype.destroyTexture = function(id) {
  delete this.idToImg[id];
};

Canvas2DGraphicsBackend.prototype.destroy = function() {
  
};
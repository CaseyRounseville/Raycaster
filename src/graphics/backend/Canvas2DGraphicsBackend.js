import { GraphicsBackend, INTERNAL_WIDTH, INTERNAL_HEIGHT } from "./GraphicsBackend";

import { Canvas2DTexture } from "../texture/Canvas2DTexture";

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

/**
 * Initialize this graphics backend.
 * 
 * Parameters:
 * None.
 * 
 * Returns:
 * Nothing.
 */
export function Canvas2DGraphicsBackend() {
	GraphicsBackend.call(this);

	// get the canvas graphics context, and disable image smoothing to make it
	// less blurry
	this.ctxt = document.getElementById("canvas").getContext("2d");
	this.ctxt.imageSmoothingEnabled = false;

	this.fillColor = Color.BLACK;
	this.tintColor = Color.WHITE;
	this.id2texture = {};
}

/**
 * Return the current fill color of this graphics backend.
 * 
 * Parameters:
 * None.
 * 
 * Returns:
 * The current fill color of this graphics backend.
 */
Canvas2DGraphicsBackend.prototype.getFillColor = function() {
	return this.fillColor;
};

/**
 * Set the current fill color of this graphics backend.
 * 
 * Parameters:
 * color -- The color to use for the current fill color.
 * 
 * Returns:
 * None.
 */
Canvas2DGraphicsBackend.prototype.setFillColor = function(color) {
	const r = Color.getComp1i(color);
	const g = Color.getComp2i(color);
	const b = Color.getComp3i(color);
	const a = Color.getComp4f(color);

	this.ctxt.fillStyle = "rgb(" + r + ", " + g + ", " + b + ", " + a + ")";
	this.fillColor = color;
};

/**
 * Draw a filled rectangle of the specified width and height, with its top-left
 * corner at the specified location. Dimensions are in pixels.
 * 
 * Parameters:
 * x -- The x-coordinate of the top-left corner, in pixels.
 * y -- The y-coordinate of the top-left corner, in pixels.
 * w -- The width, in pixels.
 * h -- The height, in pixels.
 * 
 * Returns:
 * Nothing.
 */
Canvas2DGraphicsBackend.prototype.fillRect = function(x, y, w, h) {
	this.ctxt.fillRect(x, y, w, h);
};

Canvas2DGraphicsBackend.prototype.getTintColor = function() {
	return this.tintColor;
};

Canvas2DGraphicsBackend.prototype.setTintColor = function(tintColor) {
	this.tintColor = tintColor;
};

/**
 * Draw the specified rectangle of source texture to the specified rectangle of
 * the screen, performing any necessary scaling. Dimensions are in pixels. The
 * x and y coordinates for source and destination are of the top-left corner of
 * the rectangles.
 * 
 * Parameters:
 * id -- The id of the texture to use.
 * destX -- The x-coordinate of the top-left corner of the destination
 * rectangle, in pixels, on the screen.
 * destY -- The y-coordinate of the top-left corner of the destination
 * rectangle, in pixels, on the screen.
 * destW -- The width of the destination rectangle, in pixels.
 * destH -- The height of the destination rectangle, in pixels.
 * srcX -- The x-coordinate of the top-left corner of the source rectangle, in
 * pixels, on the source texture.
 * srcY -- The y-coordinate of the top-left corner of the source rectangle, in
 * pixels, on the source texture.
 * srcW -- The width of the source rectangle, in pixels.
 * srcH -- The height of the source rectangle, in pixels.
 * 
 * Returns:
 * Nothing.
 */
Canvas2DGraphicsBackend.prototype.renderTexture = function(id, destX, destY,
		destW, destH, srcX, srcY, srcW, srcH) {
	// retrieve texture from table
	const texture = this.id2texture[id];

	// make sure the underlying image is loaded;
	// attempting to draw an unloaded image(with size zero) could cause an
	// IndexSizeError to be thrown
	if (texture.isLoaded()) {
		this.ctxt.drawImage(this.id2texture[id].getImg(), srcX, srcY, srcW,
				srcH, destX, destY, destW, destH);
	}
};

/**
 * Clear the screen.
 * 
 * Parameters:
 * None.
 * 
 * Returns:
 * Nothing.
 */
Canvas2DGraphicsBackend.prototype.clearScreen = function() {
	this.ctxt.clearRect(0, 0, INTERNAL_WIDTH, INTERNAL_HEIGHT);
};

/**
 * Load a texture of the given id from the given base64 string.
 * 
 * Parameters:
 * id -- The id of the texture to be loaded.
 * b64 -- A string of the texture encoded in base64 format.
 * 
 * Returns:
 * Nothing.
 */
Canvas2DGraphicsBackend.prototype.loadTexture = function(id, b64) {
	const img = new Image();
	img.src = b64;
	const texture = new Canvas2DTexture(id, img.width, img.height, img);
	this.id2texture[id] = texture;

	// we have to wait until the image is done loading in order to read the
	// width and height, otherwise it will gladly return us a zero
	img.onload = function() {
		texture.setWidth(img.width);
		texture.setHeight(img.height);
	};
};

/**
 * Return the texture of the specified id. If no such texture exists, undefined
 * is returned.
 * 
 * Parameters:
 * id -- The id of the texture to return.
 * 
 * Returns:
 * The requested texture, or undefined if there is no texture by the given id.
 */
Canvas2DGraphicsBackend.prototype.getTexture = function(id) {
	return this.id2texture[id];
}

/**
 * Destroy the texture of the specified id.
 * 
 * Parameters:
 * id -- The id of the texture to destroy.
 * 
 * Returns:
 * Nothing.
 */
Canvas2DGraphicsBackend.prototype.destroyTexture = function(id) {
	delete this.id2texture[id];
};

Canvas2DGraphicsBackend.prototype.destroy = function() {

};

import { Texture } from "./Texture";

// inherit from texture;
// canvas2d texture is just like texture, but also stores an img field
Canvas2DTexture.prototype = Object.create(Texture.prototype);
Canvas2DTexture.prototype.constructor = Canvas2DTexture;

/**
 * Initialize this canvas2d texture.
 * 
 * Parameters:
 * texId -- The texture id of this canvas2d texture.
 * width -- The width of this canvas2d texture.
 * height -- The height of this canvas2d texture.
 * img -- The canvas2d image associated with this texture.
 * 
 * Returns:
 * Nothing.
 */
export function Canvas2DTexture(texId, width, height, img) {
    Texture.call(this, texId, width, height);
    this.img = img;
}

/**
 * Return the canvas2d image associated with this texture.
 * 
 * Parameters:
 * None.
 * 
 * Returns:
 * The canvas2d image associated with this texture.
 */
Canvas2DTexture.prototype.getImg = function() {
    return this.img;
};

/**
 * Return whether the underlying image has finished loading.
 *
 * Parameters:
 * None.
 *
 * Returns:
 * Whether the underlying image has finished loading.
 */
Canvas2DTexture.prototype.isLoaded = function() {
	// some browsers correctly report if the image is fully loaded by setting
	// the completion flag;
	// others do not, so we must check one of the natural width or height to
	// see if it is non-zero
	return this.img.complete && this.img.naturalWidth > 0;
};

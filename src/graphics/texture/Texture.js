/**
 * Initialize a texture object.
 * 
 * Parameters:
 * id -- The texture id of this texture.
 * width -- The width, in pixels, of this texture.
 * height -- The height, in pixels, of this texture.
 * 
 * Returns:
 * Nothing.
 */
export function Texture(id, width, height) {
	this.id = id;
	this.width = width;
	this.height = height;
}

/**
 * Return the id of this texture.
 * 
 * Parameters:
 * None.
 * 
 * Returns:
 * The texture id of this texture.
 */
Texture.prototype.getId = function() {
	return this.id;
};

/**
 * Return the width, in pixels, of this texture.
 * 
 * Parameters:
 * None.
 * 
 * Returns:
 * The width, in pixels, of this texture.
 */
Texture.prototype.getWidth = function() {
	return this.width;
};

/**
 * Return the height, in pixels, of this texture.
 * 
 * Parameters:
 * None.
 * 
 * Returns:
 * The height, in pixels, of this texture.
 */
Texture.prototype.getHeight = function() {
	return this.height;
};

/**
 * Set the width of this texture.
 * 
 * Parameters:
 * width -- The new width of this texture.
 * 
 * Returns:
 * Nothing.
 */
Texture.prototype.setWidth = function(width) {
	this.width = width;
};

/**
 * Set the height of this texture.
 * 
 * Parameters:
 * height -- The new height of this texture.
 * 
 * Returns:
 * Nothing.
 */
Texture.prototype.setHeight = function(height) {
	this.height = height;
};

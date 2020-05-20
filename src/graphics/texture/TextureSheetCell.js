/**
 * Initialize a texture sheet cell. A texture sheet cell represents one cell in
 * a texture sheet. Basically, it is a sprite in a sprite sheet.
 * 
 * Parameters:
 * x -- The x-coordinate of the top-left corner of this cell, in pixels.
 * y -- The y-coordinate of the top-left corner of this cell, in pixels.
 * width -- The width of this cell, in pixels.
 * height -- The height of this cell, in pixels.
 * 
 * Returns:
 * Nothing.
 */
export function TextureSheetCell(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

/**
 * Return this cell's x-coordinate of the top-left corner, in pixels.
 * 
 * Parameters:
 * None.
 * 
 * Returns:
 * The x-coordinate of this cell's top-left corner, in pixels.
 */
TextureSheetCell.prototype.getX = function() {
    return this.x;
};

/**
 * Return this cell's y-coordinate of the top-left corner, in pixels.
 * 
 * Parameters:
 * None.
 * 
 * Returns:
 * The y-coordinate of this cell's top-left corner, in pixels.
 */
TextureSheetCell.prototype.getY = function() {
    return this.y;
};

/**
 * Return this cell's width, in pixels.
 * 
 * Parameters:
 * None.
 * 
 * Returns:
 * The width of this cell, in pixels.
 */
TextureSheetCell.prototype.getWidth = function() {
    return this.width;
};

/**
 * Return this cell's height, in pixels.
 * 
 * Parameters:
 * None.
 * 
 * Returns:
 * The height of this cell, in pixels.
 */
TextureSheetCell.prototype.getHeight = function() {
    return this.height;
};

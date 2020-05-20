import { TextureSheetCell } from "./TextureSheetCell";

/**
 * Initialize this texture sheet.
 * 
 * Parameters:
 * texture -- The texture object that this sheet divides into cells.
 * cellWidth -- The width, in pixels, of each cell of the sheet.
 * cellHeight -- The height, in pixels, of each cell of the sheet.
 * numCellsWide -- How many cells wide is the sheet.
 * numCellsTall -- How many cells tall is the sheet.
 * cellSpacingHoriz -- The horizontal spacing, in pixels, between adjacent
 * cells.
 * cellSpacingVert -- The vertival spacing, in pixels, between adjacent cells.
 * 
 * Returns:
 * Nothing.
 */
export function TextureSheet(texture, cellWidth, cellHeight, numCellsWide,
		numCellsTall, cellSpacingHoriz, cellSpacingVert) {
	this.texture = texture;
	this.cellWidth = cellWidth;
	this.cellHeight = cellHeight;
	this.numCellsWide = numCellsWide;
	this.numCellsTall = numCellsTall;
	this.cellSpacingHoriz = cellSpacingHoriz;
	this.cellSpacingVert = cellSpacingVert;
	this.cells = [];

	// fill in the texture sheet cells
	for (let row = 0; row < numCellsTall; row++) {
		for (let col = 0; col < numCellsWide; col++) {
			// calculate the location in the texture of the top-left corner of
			// the current cell, taking into account spacing in between cells
			const cellX = (cellWidth + cellSpacingHoriz) * col;
			const cellY = (cellHeight + cellSpacingVert) * row;
			this.cells.push(new TextureSheetCell(cellX, cellY, cellWidth,
					cellHeight));
		}
	}
}

/**
 * Return this texture sheet's texture object.
 * 
 * Parameters:
 * None.
 * 
 * Returns:
 * This texture sheet's texture object.
 */
TextureSheet.prototype.getTexture = function() {
	return this.texture;
};

/**
 * Return the texture sheet cell at the specified index.
 * 
 * Parameters:
 * cellIndex -- The index of the desired texture sheet cell.
 * 
 * Returns:
 * The texture sheet cell at the specified index.
 */
TextureSheet.prototype.getCell = function(cellIndex) {
	return this.cells[cellIndex];
};

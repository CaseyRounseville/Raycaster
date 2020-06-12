const fs = require("fs");
const canvas = require("canvas");

const FILL_CLEAR = "black";
const FILL_SOLID = "blue";

/**
 * Initialize a minimal in-memory representation of a map, to base a minimap
 * off of.
 *
 * Parameters:
 * width -- How many blocks wide is the map.
 * height -- How many blocks tall is the map.
 * collData -- The collision data for the map, in the form of a one-dimensional
 * array of integers.
 *
 * Returns:
 * Nothing.
 */
function SrcMap(width, height, collData) {
	this.width = width;
	this.height = height;
	this.collData = collData;
}

/**
 * Load a map from the specified file.
 *
 * Parameters:
 * mapSrcPath -- The path where to find the map we want to load.
 *
 * Returns:
 * A minimal in-memory representation of the map located at the specified file.
 */
function loadSrcMap(mapSrcPath) {
	// load the whole json file into a javascript object
	const entireObj = JSON.parse(fs.readFileSync(mapSrcPath, "utf8"));

	// just take the parts we need
	const srcMap = new SrcMap(entireObj.width, entireObj.height,
			entireObj.collData);

	return srcMap;
}

/**
 * Generate an image buffer, in png format, containing image data for a minimap
 * based on the given source map.
 *
 * Parameters:
 * srcMap -- The source map to base the minimap on.
 *
 * Returns:
 * A png image buffer containing the minimap image data.
 */
function genMiniMap(srcMap) {
	// create a canvas object so we can draw our minimap image;
	// each cell on the source map is one pixel on the minimap
	const miniCanvas = canvas.createCanvas(srcMap.width, srcMap.height);
	const ctxt = miniCanvas.getContext("2d");

	// draw the minimap
	for (let row = 0; row < srcMap.height; row++) {
		for (let col = 0; col < srcMap.width; col++) {
			// determine if we are looking at a clear or solid tile, and draw
			// the appropriate color
			const collType = srcMap.collData[row * srcMap.width + col];
			if (collType == 0) {
				ctxt.fillStyle = FILL_CLEAR;
			} else {
				ctxt.fillStyle = FILL_SOLID;
			}
			ctxt.fillRect(col, row, 1, 1);
		}
	}

	// obtain an image buffer object from our canvas
	return miniCanvas.toBuffer("image/png");
}

/**
 * The entry point for the script.
 *
 * Parameters:
 * mapSrcPath -- The path to the map to generate a minimap image for.
 * destPath -- The path where to save the minimap image.
 *
 * Returns:
 * Nothing.
 */
function main(mapSrcPath, destPath) {
	// load the map we want to make a minimap for
	const srcMap = loadSrcMap(mapSrcPath);

	// make the minimap
	const pngBuffer = genMiniMap(srcMap);

	// write the minimap to disk
	fs.writeFileSync(destPath, pngBuffer);
}

// command line arguments
// argv[0] -- The name of the executable "node".
// argv[1] -- The path to this script file.
// argv[2] -- The path to the map to generate a minimap image for.
// argv[3] -- The path where to save the minimap image.
const mapSrcPath = process.argv[2];
const destPath = process.argv[3];
main(mapSrcPath, destPath);

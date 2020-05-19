import * as Color from "../../graphics/util/Color";

// a couple of size constants specific to this debug renderer
const BLOCK_WIDTH = 5;
const BLOCK_HEIGHT = 5;

export function DebugBlockMapRenderer(blockMap) {
	this.blockMap = blockMap;
};

DebugBlockMapRenderer.prototype.render = function(backend) {
    // save some typing
    const blockMap = this.blockMap;

    // draw the blockmap in 2d, like an over-head view;
    // use white for clear(0) and black for obstacles
	for (let row = 0; row < blockMap.height; row++) {
        for (let col = 0; col < blockMap.width; col++) {
            // get the collision value for the current cell
            let collVal = blockMap.getCollData(row, col);

            // render the appropriately colored rectangle at the correct
            // position
            let xpix = BLOCK_WIDTH * col;
            let ypix = BLOCK_HEIGHT * row;
            let color = undefined;
            if (collVal == 0) {
                color = Color.WHITE;
            } else {
                color = Color.BLACK;
            }
            backend.setFillColor(color);
            backend.fillRect(xpix, ypix, BLOCK_WIDTH, BLOCK_HEIGHT);
        }
    }
};

import * as Color from "../../graphics/util/Color";

import {
    INTERNAL_WIDTH,
    INTERNAL_HEIGHT
} from "../../graphics/backend/GraphicsBackend";

import { globalCtxt } from "../../main/GlobalContext";

// a couple of size constants specific to this minimap renderer
const BLOCK_WIDTH = 2;
const BLOCK_HEIGHT = 2;

export function MiniMapRenderer(blockMap) {
	this.blockMap = blockMap;
};

MiniMapRenderer.prototype.render = function(backend) {
    // save some typing
    const blockMap = this.blockMap;

    // determine the screen coordinates, in pixels, of the top-left corner of
    // the minimap
    const topLeftX = INTERNAL_WIDTH - BLOCK_WIDTH * blockMap.width;
    const topLeftY = INTERNAL_HEIGHT - BLOCK_HEIGHT * blockMap.height;

    // draw the blockmap in 2d, like an over-head view;
    // use white for clear(0) and black for obstacles
	for (let row = 0; row < blockMap.height; row++) {
        for (let col = 0; col < blockMap.width; col++) {
            // get the collision value for the current cell
            let collVal = blockMap.getCollData(row, col);

            // render the appropriately colored rectangle at the correct
            // position
            let xpix = topLeftX + BLOCK_WIDTH * col;
            let ypix = topLeftY + BLOCK_HEIGHT * row;
            let color = undefined;
            if (collVal == 0) {
                color = 0x008C6A7F;
            } else {
                color = 0x00EBCCBF;
            }
            backend.setFillColor(color);
            backend.fillRect(xpix, ypix, BLOCK_WIDTH, BLOCK_HEIGHT);
        }
    }

    // draw the player, if there is one
    const player = globalCtxt.player;
    if (player) {
        backend.setFillColor(Color.RED);
        backend.fillRect(topLeftX + player.pos.x * BLOCK_WIDTH, topLeftY +
                player.pos.y * BLOCK_HEIGHT, BLOCK_WIDTH, BLOCK_HEIGHT);
    }
};

import * as Color from "../../graphics/util/Color";

import {
    INTERNAL_WIDTH,
    INTERNAL_HEIGHT
} from "../../graphics/backend/GraphicsBackend";

import { globalCtxt } from "../../main/GlobalContext";

// a couple of size constants specific to this minimap renderer
const BLOCK_WIDTH = 2;
const BLOCK_HEIGHT = 2;

// offset of the minimap from the edges of the screen
const PAD_HORIZ = 10;
const PAD_VERT = 10;

export function MiniMapRenderer(blockMap) {
	this.blockMap = blockMap;
};

MiniMapRenderer.prototype.render = function(backend) {
    // save some typing
    const blockMap = this.blockMap;
	const miniMapWidth = blockMap.getMinMapTex().getWidth();
	const miniMapHeight = blockMap.getMinMapTex().getHeight();

    // determine the screen coordinates, in pixels, of the top-left corner of
    // the minimap
    const topLeftX = INTERNAL_WIDTH - PAD_HORIZ - miniMapWidth * BLOCK_WIDTH;
    const topLeftY = INTERNAL_HEIGHT - PAD_VERT - miniMapHeight * BLOCK_HEIGHT;

	// draw the minimap texture in the bottom right corner of the screen
	backend.renderTexture(blockMap.miniMapTex.getId(), topLeftX, topLeftY,
			miniMapWidth * BLOCK_WIDTH, miniMapHeight * BLOCK_HEIGHT, 0, 0,
			miniMapWidth, miniMapHeight);

    // draw the player, if there is one
    const player = globalCtxt.player;
    if (player) {
        backend.setFillColor(Color.RED);
		backend.fillRect(topLeftX + Math.round(player.pos.x * BLOCK_WIDTH) -
				Math.round(0.5 * BLOCK_WIDTH),
				topLeftY + Math.round(player.pos.y * BLOCK_HEIGHT) -
				Math.round(0.5 * BLOCK_HEIGHT),
				BLOCK_HEIGHT, BLOCK_WIDTH, BLOCK_HEIGHT);
    }

    // draw the actors of the current scene(besides the player)
    if (globalCtxt.scene) {
        backend.setFillColor(Color.YELLOW);
        const actors = globalCtxt.scene.actors;
        actors.forEach((actor) => {
			backend.fillRect(topLeftX + Math.round(actor.pos.x - 0.5) *
					BLOCK_WIDTH, topLeftY + Math.round(actor.pos.y - 0.5) *
					BLOCK_HEIGHT, 1, 1);
        });
    }
};

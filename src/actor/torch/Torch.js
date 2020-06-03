import { Vector1 } from "../../physics/Vector1";

import { Vector2 } from "../../physics/Vector2";

import { Billboard } from "../../graphics/Billboard";

import { globalCtxt } from "../../main/GlobalContext";

/**
 * Initialize a torch object.
 *
 * Parameters:
 * protoActor -- The torch protoactor, most likely specified in a scene file.
 *
 * Returns:
 * Nothing.
 */
export function Torch(protoActor) {
	// extract position from protoactor
	this.pos = new Vector2(protoActor.x, protoActor.y);

	// extract rotation from protoactor
	this.rot = new Vector1(0);

	// create a billboard for this torch, but don't wire it up yet
    const graphicsBackend = globalCtxt.graphicsBackend;
    const texture = graphicsBackend.getTexture("torch");
    this.billboard = new Billboard(texture, this.pos);
}

/**
 * Wire up this torch.
 *
 * Parameters:
 * None.
 *
 * Returns:
 * Nothing.
 */
Torch.prototype.wire = function() {
    // wire up the billboard
    const renderer = globalCtxt.renderer;
    renderer.registerBillboard(this.billboard);
};

/**
 * Unwire this torch.
 *
 * Parameters:
 * None.
 *
 * Returns:
 * Nothing.
 */
Torch.prototype.unwire = function() {
    // unwire the billboard
    const renderer = globalCtxt.renderer;
    renderer.unregisterBillboard(this.billboard);
};

/**
 * Create a torch based on the given protoactor.
 *
 * Parameters:
 * protoActor -- The protoactor to base the torch on.
 *
 * Returns:
 * A torch object, based on the given protoactor.
 */
export const create = (protoActor) => {
	return new Torch(protoActor);
};

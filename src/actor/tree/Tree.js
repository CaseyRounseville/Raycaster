import {
    Vector1,
    copy as vec1Copy
} from "../../physics/Vector1";

import {
    Vector2,
    copy as vec2Copy
} from "../../physics/Vector2";

import { Billboard } from "../../graphics/Billboard";

import { globalCtxt } from "../../main/GlobalContext";

/**
 * Initialize a tree object.
 *
 * Parameters:
 * protoActor -- The tree protoactor, most likely speficied in a scene file.
 *
 * Returns:
 * Nothing.
 */
export function Tree(protoActor) {
    // extract position from protoactor
    this.pos = new Vector2(protoActor.x, protoActor.y);

    // extract rotation from protoactor
    this.rot = new Vector1(0);
    //vec1Copy(this.rot, protoActor.rot);

    // create a billboard for this tree, but don't wire it up yet
    const graphicsBackend = globalCtxt.graphicsBackend;
    const texture = graphicsBackend.getTexture("tree");
    this.billboard = new Billboard(texture, this.pos);
}

/**
 * Wire up this tree.
 *
 * Parameters:
 * None.
 *
 * Returns:
 * Nothing.
 */
Tree.prototype.wire = function() {
    // wire up the billboard
    const renderer = globalCtxt.renderer;
    renderer.registerBillboard(this.billboard);
};

/**
 * Unwire this tree.
 *
 * Parameters:
 * None.
 *
 * Returns:
 * Nothing.
 */
Tree.prototype.unwire = function() {
    // unwire the billboard
    const renderer = globalCtxt.renderer;
    renderer.unregisterBillboard(this.billboard);
};

/**
 * Create a tree based on the given protoactor.
 *
 * Parameters:
 * protoActor -- The protoactor to base the tree on.
 *
 * Returns:
 * A tree object, based on the given protoactor.
 */
export const create = (protoActor) => {
    return new Tree(protoActor);
};
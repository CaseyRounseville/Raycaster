import { Vector2 } from "../physics/Vector2";

/**
 * Initialize a billboard graphics object.
 *
 * Parameters:
 * texture -- The texture to display on this billboard.
 * pos -- The position of this billboard.
 *
 * Returns:
 * None.
 *
 * Note:
 * The position passed here is "bound", so when changes are made to the pos
 * object somewhere else, those changes are updated automatically in this
 * billboard.
 */
export function Billboard(texture, pos) {
  this.texture = texture;
  this.pos = pos;
}

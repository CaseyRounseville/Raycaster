/**
 * Initialize an animation frame object.
 *
 * Parameters:
 * texCellNum -- Which texture cell to use for this animation frame.
 * duration -- How many game frames does this animation frame last.
 *
 * Returns:
 * Nothing.
 */
export function AnimationFrame(texCellNum, duration) {
    this.texCellNum = texCellNum;
    this.duration = duration;
}

/**
 * Retrieve this animation frame's texture cell number.
 *
 * Parameters:
 * None.
 *
 * Returns:
 * This animation frame's texture cell number.
 */
AnimationFrame.prototype.getTexCellNum = function() {
    return this.texCellNum;
};

/**
 * Retrieve this animation frame's duration, in game frames.
 *
 * Parameters:
 * None.
 *
 * Returns:
 * This animation frame's duration, in game frames.
 */
AnimationFrame.prototype.getDuration = function() {
    return this.duration;
};

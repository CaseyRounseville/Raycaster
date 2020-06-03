/**
 * Initialize an animation object.
 *
 * Parameters:
 * None.
 *
 * Returns:
 * Nothing.
 */
export function Animation() {
	// an animation is pretty much just an array of animation frames
	this.animFrames = [];
}

/**
 * Retrieve the animation frame at the specified index.
 *
 * Parameters:
 * index -- The index of the frame to retrieve.
 *
 * Returns:
 * The animation frame object at the specified index.
 */
Animation.prototype.getFrame = function(index) {
	return this.animFrames[index];
};

/**
 * Return how many frames are in this animation.
 *
 * Parameters:
 * None.
 *
 * Returns:
 * The number of animation frames in this animation.
 */
Animation.prototype.getNumFrames = function() {
	return this.animFrames.length;
};

/**
 * Append the given animation frame to the end of this animation.
 *
 * Parameters:
 * animFrame -- The animation frame to add to the end of this animation.
 *
 * Returns:
 * Nothing.
 */
Animation.prototype.appendFrame = function(animFrame) {
	this.animFrames.push(animFrame);
};

/**
 * Insert the given animation frame into this animation at the specified index.
 *
 * Parameters:
 * index -- The index to insert the animation frame at.
 * animFrame -- The animation frame to insert.
 *
 * Returns:
 * Nothing.
 */
Animation.prototype.insertFrame = function(index, animFrame) {
	this.animFrames.splice(index, 0, animFrame);
};

/**
 * Remove the animation frame the specified index.
 *
 * Paremeters:
 * index -- The index of the animation frame to remove.
 *
 * Returns:
 * Nothing.
 */
Animation.prototype.removeFrame = function(index) {
	this.animFrames.splice(index, 1);
};

import * as ArrayUtil from "../../util/ArrayUtil";

// some constants to enumerate the ways to play an animation;
// looping will loop the animation, and freeze will hang the animation on the
// last frame until the current animation is changed
export const PLAY_LOOP = 0;
export const PLAY_FREEZE = 1;

// inherit from task
Animator.prototype = Object.create(Task.prototype);
Animator.prototype.constructor = Animator;

/**
 * Initialize an animator object.
 *
 * Parameters:
 * None.
 *
 * Returns:
 * None.
 */
export function Animator() {
	this.currAnim = undefined;
	this.playType = PLAY_LOOP;
	this.currFrame = 0;
	this.delayCounter = 0;
	this.callbacks = [];
}

/**
 * Process one game frame for this animation.
 *
 * Parameters:
 * None.
 *
 * Returns:
 * (bool) false. Animator task does not complete on its own.
 */
Animator.prototype.tick = function() {
	// make sure there is a current animation
	if (!this.currAnim) {
		return false;
	}

	// increment the delay counter by one frame
	this.delayCounter++;

	// see if it is time to move on to the next animation frame
	const currFrameObj = this.currAnim.getFrame(this.currFrame);
	if (this.delayCounter == currFrameObj.getDuration()) {
		switch (this.playType) {
			case PLAY_LOOP:
				// move to the next animation frame
				this.currFrame++;
				this.delayCounter = 0;

				// if we have gone one past the last animation frame, then loop
				// back to the first frame
				if (this.currFrame == this.currAnim.getNumFrames()) {
					this.currFrame = 0;
				}
				break;
			case PLAY_FREEZE:
				// we need to freeze the animation on the last frame;
				// so, if we are currently on the last frame, then we will stay
				// there
				const finalFrameNum = this.currAnim.getNumFrames() - 1;
				if (this.currAnim < finalFrameNum) {
					// move to the next animation frame
					this.currFrame++;
					this.delayCounter = 0;
				}
				break;
		}

	}

	return false;
};

/**
 * Set the current animation.
 *
 * Parameters:
 * anim -- The animation object to use as the current animation.
 *
 * Returns;
 * Nothing.
 *
 * Note:
 * Calling this function resets the current animation frame to the first one in
 * the new current animation, and resets the delay counter to zero.
 */
Animator.prototype.setCurrAnim = function(anim) {
	this.currAnim = anim;

	// reset the frame and delay counters
	this.currFrame = 0;
	this.delayCounter = 0;
};

/**
 * Set the play type of this animator.
 *
 * Parameters:
 * type -- The play type for this animator.
 *
 * Returns:
 * Nothing.
 */
Animator.prototype.setPlayType = function(type) {
	this.playType = type;
};

Animator.prototype.registerCallback = function(cb) {
	this.callbacks.push(cb);
};

Animator.prototype.unregisterCallback = function(cb) {
	ArrayUtil.remove(this.callbacks, cb);
};

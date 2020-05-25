import { Task } from "../../task/Task";

import {
    Vector1,
    copy as vector1Copy,
    equalsWithinTol as vector1EqualsWithinTol
} from "../../physics/Vector1";

import {
    Vector2,
    copy as vector2Copy,
    equalsWithinTol as vector2EqualsWithinTol
} from "../../physics/Vector2";

import {
    intSinVal,
    intSinVec1,
    intSinVec2
} from "../../physics/Interpolation";

// how many frames to spend returning to neutral
const RET_NEUTRAL_FRAMES = 13;

// how many frames it takes to go from wherever the current position offset is
// to the max up, down, left, and right position offsets
const POS_BOB_UP_FRAMES = 13;
const POS_BOB_DOWN_FRAMES = 13;
const POS_BOB_LEFT_FRAMES = 13;
const POS_BOB_RIGHT_FRAMES = 13;

// how many frames it takes to go from wherever the current angle offset is to
// the max left and right angle offsets
const ANG_BOB_LEFT_FRAMES = 26;
const ANG_BOB_RIGHT_FRAMES = 26;

// tolerance for when the position and angle offsets are close enough to
// neutral, in pixels and radians respectively
const POS_OFFSET_TOLERANCE = 0.00001;
const ANG_OFFSET_TOLERANCE = 0.00001;

// inherit from task
HeadBob.prototype = Object.create(Task.prototype);
HeadBob.prototype.constructor = HeadBob;

/**
 * Initialize this head bob effect.
 * 
 * Parameters:
 * posBobUp -- The amount to bob the position up from neutral, in pixels.
 * posBobDown -- The amount to bob the position down from neutral, in pixels.
 * posBobLeft -- The amount to bob the position left from neutral, in pixels.
 * posBobRight -- The amount to bob the position right from neutral, in pixels.
 * angBobLeft -- The amount to bob the angle left from neutral, in randians.
 * angBobRight -- The amount to bob the angle right from neutral, in radians.
 * isMovingForward -- A function that when called tells whether we are moving
 * forward.
 * isMovingBackward -- A function that when called tells whether we are moving
 * backward.
 * isMovingLeft -- A function that when called tells whether we are moving
 * left.
 * isMovingRight -- A function that when called tells whether we are moving
 * right.
 * 
 * Returns:
 * Nothing.
 */
export function HeadBob(posBobUp, posBobDown, posBobLeft, posBobRight,
        angBobLeft, angBobRight, isMovingForward, isMovingBackward,
        isMovingLeft, isMovingRight) {
    // the amounts to bob the position up, down, left, and right, in pixels
    this.posBobUp = posBobUp;
    this.posBobDown = posBobDown;
    this.posBobLeft = posBobLeft;
    this.posBobRight = posBobRight;

    // the amounts to bob the angle left and right, in radians
    this.angBobLeft = angBobLeft;
    this.angBobRight = angBobRight;

    // functions that, upon being called, will tell us if we are moving
    // forward, backward, left, and right
    this.isMovingForward = isMovingForward;
    this.isMovingBackward = isMovingBackward;
    this.isMovingLeft = isMovingLeft;
    this.isMovingRight = isMovingRight;

    // store the position and angle offset from neutral, in pixels and radians
    // respectively
    this.currPosOffset = new Vector2(0, 0);
    this.currAngOffset = new Vector1(0);

    // when we change bobbing directions, we will need to store the offsets at
    // that moment, to use them as the starting values in interplation
    // calculations
    this.posBobUpStartOffset = 0;
    this.posBobDownStartOffset = 0;
    this.posBobLeftStartOffset = 0;
    this.posBobRightStartOffset = 0;
    this.angBobLeftStartOffset = 0;
    this.angBobRightStartOffset = 0;

    // store the number of frames we have been moving forward, backward, left,
    // and right
    this.currForwardFrame = 0;
    this.currBackwardFrame = 0;
    this.currLeftFrame = 0;
    this.currRightFrame = 0;

    // store the number of frames we have been bobbing the position up, down,
    // left, and right, and the number of frames we have been bobbing the angle
    // left and right
    this.currPosBobUpFrame = 0;
    this.currPosBobDownFrame = 0;
    this.currPosBobLeftFrame = 0;
    this.currPosBobRightFrame = 0;
    this.currAngBobLeftFrame = 0;
    this.currAngBobRightFrame = 0;

    // store whether we are currently bobbing the position up or down(true
    // means up, false means down), left or right(true means left, false means
    // right), and whether we are currently bobbing the angle left or
    // right(true means left, false means right)
    this.posBobbingUp = true;
    this.posBobbingLeft = true;
    this.angBobbingLeft = true;

    // store the position and angle offset at neutral(no offset)
    this.neutralPosOffset = new Vector2(0, 0);
    this.neutralAngOffset = new Vector1(0);

    // store some information for the return to neutral animation;
    // the retNeutralFrame is the current frame of the animation, to be used
    // with some interpolation to return smoothly to neutral;
    // the max position and angle offsets are where the offsets were at the
    // start of the return to neutral(so, they are the starting points of the
    // interpolations)
    this.currRetNeutralFrame = 0;
    this.retNeutralMaxPosOffset = this.currPosOffset;
    this.retNeutralMaxAngOffset = this.currAngOffset;
}

/**
 * Return the current position offset of this head bob effect.
 * 
 * Parameters:
 * None.
 * 
 * Returns:
 * The current position offset of this head bob effect.
 */
HeadBob.prototype.getPosOffset = function() {
    return this.currPosOffset;
}

/**
 * Return the current angle offset of this head bob effect.
 * 
 * Parameters:
 * None.
 * 
 * Returns:
 * The current angle offset of this head bob effect.
 */
HeadBob.prototype.getAngOffset = function() {
    return this.currAngOffset;
}

// TODO: implement angle bobbing
HeadBob.prototype.tick = function() {
    // read the movement states
    const movingForward = this.isMovingForward();
    const movingBackward = this.isMovingBackward();
    const movingLeft = this.isMovingLeft();
    const movingRight = this.isMovingRight();

    // if we are not moving at all, gradually return to the neutral position
    // using sinusoidal interpolation
    if (!movingForward && !movingBackward && !movingLeft && !movingRight) {
        // reset all movement and bobbing frames
        this.currForwardFrame = 0;
        this.currBackwardFrame = 0;
        this.currLeftFrame = 0;
        this.currRightFrame = 0;
        this.currPosBobUpFrame = 0;
        this.currPosBobDownFrame = 0;
        this.currPosBobLeftFrame = 0;
        this.currPosBobRightFrame = 0;
        this.currAngBobLeftFrame = 0;
        this.currAngBobRightFrame = 0;

        // reset which directions we are bobbing in
        this.posBobbingUp = true;
        this.posBobbingLeft = true;
        this.angBobbingLeft = true;

        // only interpolate toward the neutral position and angle if we are not
        // already there
        if (this.currRetNeutralFrame < RET_NEUTRAL_FRAMES) {
            // interpolate the position offset
            intSinVec2(this.currPosOffset, this.retNeutralMaxPosOffset,
                    this.neutralPosOffset, RET_NEUTRAL_FRAMES,
                    this.currRetNeutralFrame);

            // interpolate the angle offset
            intSinVec1(this.currAngOffset, this.retNeutralMaxAngOffset,
                    this.neutralAngOffset, RET_NEUTRAL_FRAMES,
                    this.currRetNeutralFrame);

            // increment the return to neutral frame counter
            this.currRetNeutralFrame++;
        }
    } else {
        // we are moving;
        // reset the return to neutral animation frame counter
        this.currRetNeutralFrame = 0;

        // now, handle the bobbing for forward and backward movement
        if (movingForward || movingBackward) {
            // reset the forward or backward frame appropriately, depending on
            // which direction we are moving
            if (movingForward) {
                this.currBackwardFrame = 0;
            } else {
                this.currForwardFrame = 0;
            }

            // first, we bob up, then we bob down;
            // so, we need to find out if we are currently going up or down
            if (this.posBobbingUp) {
                // if we have just started bobbing up, we need to record the
                // current position offset, which we will be using as the
                // starting position offset for our interpolations
                if (this.currPosBobUpFrame == 0) {
                    this.posBobUpStartOffset = this.currPosOffset.y;
                }

                // sinusiodally interpolate the current position offset, in the
                // upward direction
                this.currPosOffset.y = intSinVal(this.posBobUpStartOffset,
                        this.posBobUp, POS_BOB_UP_FRAMES,
                        this.currPosBobUpFrame);

                // increment the bob up frame, and switch to bobbing down if we
                // have bobbed all the way up
                this.currPosBobUpFrame++;
                if (this.currPosBobUpFrame == POS_BOB_UP_FRAMES) {
                    this.currPosBobUpFrame = 0;
                    this.posBobbingUp = false;
                }
            } else {
                // if we have just started bobbing down, we need to record the
                // current position offset, which we will be using as the
                // starting position offset for our interpolations
                if (this.currPosBobDownFrame == 0) {
                    this.posBobDownStartOffset = this.currPosOffset.y;
                }

                // sinusoidally interpolate the current position offset, in the
                // downward direction
                this.currPosOffset.y = intSinVal(this.posBobDownStartOffset,
                        this.posBobDown, POS_BOB_DOWN_FRAMES,
                        this.currPosBobDownFrame);

                // increment the bob down frame, and switch to bobbing up if we
                // have bobbed all the way down
                this.currPosBobDownFrame++;
                if (this.currPosBobDownFrame == POS_BOB_DOWN_FRAMES) {
                    this.currPosBobDownFrame = 0;
                    this.posBobbingUp = true;
                }
            }

            // increment the forward or backward frame appropriately, depending
            // on which direction we are moving
            if (movingForward) {
                this.currForwardFrame++;
            } else {
                this.currBackwardFrame++;
            }
        }

        // and now we will handle the left/right movement;
        // leftward movement causes the gaze to shift gradually a little more
        // to the right, and rightward movement causes the gaze to shift
        // gradually a little more the left
        if (movingLeft || movingRight) {
            // reset the left or right frame appropriately, depending on which
            // direction we are moving
            if (movingLeft) {
                this.currRightFrame = 0;
            } else {
                this.currLeftFrame = 0;
            }

            // first we bob left, then we bob right;
            // so, we need to find out if we are currently going left or right
            if (this.posBobbingLeft) {
                // if we have just started bobbing left, we need to record the
                // current position offset, which we will be using as the
                // starting position offset for our interpolations
                if (this.currPosBobLeftFrame == 0) {
                    this.posBobLeftStartOffset = this.currPosOffset.x;
                }

                // sinusoidally interpolate the current position offset, in the
                // leftward direction
                this.currPosOffset.x = intSinVal(this.posBobLeftStartOffset,
                        this.posBobLeft, POS_BOB_LEFT_FRAMES,
                        this.currPosBobLeftFrame);

                // increment the bob left frame, and switch to bobbing right if
                // we have bobbed all the way left
                this.currPosBobLeftFrame++;
                if (this.currPosBobLeftFrame == POS_BOB_LEFT_FRAMES) {
                    this.currPosBobLeftFrame = 0;
                    this.posBobbingLeft = false;
                }
            } else {
                // if we have just started bobbing right, we need to record the
                // current position offset, which we will be using as the
                // starting position offset for our interpolations
                if (this.currPosBobRightFrame == 0) {
                    this.posBobRightStartOffset = this.currPosOffset.x;
                }

                // sinusoidally interpolate the current position offset, in the
                // rightward direction
                this.currPosOffset.x = intSinVal(this.posBobRightStartOffset,
                    this.posBobRight, POS_BOB_RIGHT_FRAMES,
                    this.currPosBobRightFrame);

                // increment the bob right frame, and switch to bobbing left if
                // we have bobbed all the way right
                this.currPosBobRightFrame++;
                if (this.currPosBobRightFrame == POS_BOB_RIGHT_FRAMES) {
                    this.currPosBobRightFrame = 0;
                    this.posBobbingLeft = true;
                }

            }

            // increment the left or right frame, depending on which direction
            // we are moving
            if (movingLeft) {
                this.currLeftFrame++;
            } else {
                this.currRightFrame++;
            }
        }

        // we will handle angle bobbing the same, regardless of the direction
        // of movement
        if (this.angBobbingLeft) {
            // if we have just started bobbing left, we need to record the
            // current angle offset, which we will be using as the starting
            // angle offset for our interpolations
            if (this.currAngBobLeftFrame == 0) {
                this.angBobLeftStartOffset = this.currAngOffset.v;
            }

            // sinusoidally interpolate the current angle offset, in the
            // leftward direction
            this.currAngOffset.v = intSinVal(this.angBobLeftStartOffset,
                    this.angBobLeft, ANG_BOB_LEFT_FRAMES,
                    this.currAngBobLeftFrame);

            // increment the bob left frame, and switch to bobbing right if we
            // have bobbed all the way left
            this.currAngBobLeftFrame++;
            if (this.currAngBobLeftFrame == ANG_BOB_LEFT_FRAMES) {
                this.currAngBobLeftFrame = 0;
                this.angBobbingLeft = false;
            }
        } else {
            // if we have just started bobbing right, we need to record the
            // current angle offset, which we will be using as the starting
            // angle offset for our interpolations
            if (this.currAngBobRightFrame == 0) {
                this.angBobRightStartOffset = this.currAngOffset.v;
            }

            // sinusoidally interpolate the current angle offset, in the
            // rightward direction
            this.currAngOffset.v = intSinVal(this.angBobRightStartOffset,
                this.angBobRight, ANG_BOB_RIGHT_FRAMES,
                this.currAngBobRightFrame);

            // increment the bob right frame, and switch to bobbing left if we
            // have bobbed all the way right
            this.currAngBobRightFrame++;
            if (this.currAngBobRightFrame == ANG_BOB_RIGHT_FRAMES) {
                this.currAngBobRightFrame = 0;
                this.angBobbingLeft = true;
            }
        }

        // just in case this is the last frame we are moving, we must update
        // the starting position and angle offsets for the return to neutral
        vector2Copy(this.retNeutralMaxPosOffset, this.currPosOffset);
        vector1Copy(this.retNeutralMaxAngOffset, this.currAngOffset);
    }

    // head bobbing task does not terminate on its own
    return false;
}

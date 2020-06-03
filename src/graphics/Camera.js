import { Vector1 } from "../physics/Vector1";
import { Vector2 } from "../physics/Vector2";

import { INTERNAL_WIDTH } from "./backend/GraphicsBackend";

import {
	radToDeg,
	degToRad,
	wrapHalfDeg,
	wrapFullDeg
} from "../physics/Angle";

import { pixelsToBlocks } from "../physics/block/Block";

import { tabulateFunction } from "../physics/Interpolation";

// the visibility, in blocks, in the x and y directions
export const VISIBILITY = 50;

// the field of view of the camera, in degrees
export const FOV = 90;

// the perpendicular distance bewtween the camera and the screen plane, in
// blocks
// export const DIST_TO_PLANE = Block.pixelsToBlocks(INTERNAL_WIDTH / 2) /
// Math.sin(FOV / 2);
export const DIST_TO_PLANE = pixelsToBlocks(320 / 2) /
		Math.tan(degToRad(FOV / 2));

export function Camera() {
	this.pos = new Vector2(0, 0);
	this.rot = new Vector1(0);
	this.height = new Vector1(0.5);

	// generate a tabulation of the atan2 function for use in calcRayAng, to
	// avoid calculating arctan in hot loops;
	// the angles stored in this table are in units of degrees
	this.relativeRayAngTable = tabulateFunction((strip) => {
		// take the signed distance between the strip index and the horizontal
		// center of the screen plane
		let x = pixelsToBlocks(INTERNAL_WIDTH / 2 - strip);

		// calculate the angle that the ray makes with respect to the line
		// perpendicular to the screen plane, passing through its center;
		// make sure to convert to degrees, and remember to wrap the angle
		// between 0 inclusive and 360 exclusive, since the range of atan2 is
		// -pi inclusive to pi inclusive.
		let ang = wrapFullDeg(radToDeg(Math.atan2(x, DIST_TO_PLANE)));

		// return that angle
		return ang;
	}, 0, INTERNAL_WIDTH - 1);

	// generate a tabulation of the cosines of the relatve ray angles, indexed
	// by the strip number of the ray;
	// this is for use with the "fish-bowl" correction code, to use the
	// perpendicular distance of a wall from the camera instead of the actual
	// euclidean distance
	this.relativeRayAngCosTable = tabulateFunction((strip) => {
		// careful, the relative ray angle table stores the angles in degrees,
		// so a conversion to radians is needed
		return Math.cos(degToRad(this.relativeRayAngTable[strip]));
	}, 0, INTERNAL_WIDTH - 1);

	// generate a tabulation of the tangents of the ray angles;
	// this is a two-dimensional tabulation, with the outer table indexed by
	// the integer-degree direction the camera is facing, and the inner table
	// indexed by the strip number
	this.rayAngTanTable = tabulateFunction((deg) => {
		return tabulateFunction((strip) => {
			// take the tangent of the sum of the camera direction and the
			// relative ray angle of the ray which goes through the current
			// strip
			return Math.tan(degToRad(deg + this.relativeRayAngTable[strip]));
		}, 0, INTERNAL_WIDTH - 1);
	}, 0, 359);

	// generate a tabulation of the slopes the screen plane, dependent on the
	// angle that the camera is facing;
	// the slope is in terms of blocks, however the slope in blocks will equal
	// the slope in pixels if the width and height, in pixels, of a block are
	// the same
	this.planeSlopeTable = tabulateFunction((deg) => {
		// the angle of the plane is the rotation of the camera, plus 90
		// degrees;
		// note that we only need to look at the upper two quadrants
		const planeAng = wrapHalfDeg(deg + 90);

		// handle edge case
		if (planeAng == 90) {
			return Infinity;
		}

		// we will pretend we pass through the origin to make it easy;
		// also imagine we are making a right triangle, and the bottom leg of
		// the triangle has length of one;
		// remember to take the negative tangent, since the y-axis is inverted;
		// also remember to convert to radians
		return -Math.tan(degToRad(planeAng));
	}, 0, 359);
};

/**
 * Return this camera's position. Changes to the position vector returned by
 * this function will be reflected in this camera.
 *
 * Parameters:
 * None.
 *
 * Returns:
 * This camera's position vector.
 */
Camera.prototype.getPos = function() {
	return this.pos;
};

/**
 * Return this camera's rotation, in degrees. Changes to the rotation vector
 * returned by this function will be reflected in this camera.
 *
 * Parameters:
 * None.
 *
 * Returns:
 * This camera's rotation vector, in degrees.
 */
Camera.prototype.getRot = function() {
	return this.rot;
};

/**
 * Return this camera's height vector. Changes to the height vector returned by
 * this function will be reflected in this camera.
 */
Camera.prototype.getHeight = function() {
	return this.height;
};

/**
 * Bind the given position vector to this camera. Changes to the position
 * vector will be reflected in this camera.
 *
 * Parameters:
 * pos -- The position to bind to this camera.
 *
 * Returns:
 * Nothing.
 */
Camera.prototype.bindPos = function(pos) {
	this.pos = pos;
};


/**
 * Bind the given rotation vector to this camera, in degrees. Changes to the
 * rotation vector will be reflected in this camera.
 *
 * Parameters:
 * rot -- The rotation to bind to this camera, in degrees.
 *
 * Returns:
 * Nothing.
 */
Camera.prototype.bindRot = function(rot) {
	this.rot = rot;
};

/**
 * Bind the given height vector to this camera. Changes to the height vector
 * will be reflected in this camera.
 *
 * Parameters:
 * height -- The height to bind to this camera.
 *
 * Returns:
 * Nothing.
 */
Camera.prototype.bindHeight = function(height) {
	this.height = height;
};

/**
 * Calculate the angle between the camera's facing direction and a ray which
 * starts at the camera posistion, and passes through the screen plane at the
 * given vertical strip index.
 *
 * Parameters:
 * strip -- The vertical strip index on the screen plane.
 *
 * Returns:
 * The angle that the ray makes with the camera's facing direction, wrapped
 * between 0 degrees inclusive and 360 degrees exclusive.
 */
Camera.prototype.calcRayAng = function(strip) {
	// pull from the table the angle that the ray through the given strip makes
	// with respect to the line perpendicular to the screen plane, passing
	// through its center
	const ang = this.relativeRayAngTable[strip];

	// now, add in the camera's rotation
	return wrapFullDeg(ang + this.rot.v);
};

/**
 * Return the cosine of the relative ray angle given by the ray through the
 * specified strip. These values are tabulated, so this call is fast.
 *
 * Parameters:
 * strip -- The strip that the ray passes through.
 *
 * Returns:
 * The cosine of the angle between the ray throguh the given strip and the
 * direction the camera is facing.
 */
Camera.prototype.cosRelativeRayAng = function(strip) {
	return this.relativeRayAngCosTable[strip];
};

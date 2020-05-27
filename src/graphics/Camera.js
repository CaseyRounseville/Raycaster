import { Vector1 } from "../physics/Vector1";
import { Vector2 } from "../physics/Vector2";

import { INTERNAL_WIDTH } from "./backend/GraphicsBackend";

import * as Angle from "../physics/Angle";

import { pixelsToBlocks } from "../physics/block/Block";

import { tabulateFunction } from "../physics/Interpolation";

// the visibility, in blocks, in the x and y directions
export const VISIBILITY = 50;

// the field of view of the camera, in radians
export const FOV = Math.PI / 2;

// the perpendicular distance bewtween the camera and the screen plane, in
// blocks
// export const DIST_TO_PLANE = Block.pixelsToBlocks(INTERNAL_WIDTH / 2) /
// Math.sin(FOV / 2);
export const DIST_TO_PLANE = pixelsToBlocks(320 / 2) / Math.tan(FOV / 2);

export function Camera() {
	this.pos = new Vector2(0, 0);
	this.rot = new Vector1(0);
	this.height = new Vector1(0.5);
	this.depthBuffer = [];

	// generate a tabulation of the atan2 function for use in calcRayAng, to
	// avoid calculating arctan in hot loops
	this.relativeRayAngTable = tabulateFunction((strip) => {
		// take the signed distance between the strip index and the horizontal
		// center of the screen plane
		let x = pixelsToBlocks(INTERNAL_WIDTH / 2 - strip);

		// calculate the angle that the ray makes with respect to the line
		// perpendicular to the screen plane, passing through its center
		let ang = Math.atan2(x, DIST_TO_PLANE);

		// return that angle
		return ang;
	}, 0, INTERNAL_WIDTH - 1);

	// generate a tabulation of the cosines of the relatve ray angles, indexed
	// by the strip number of the ray;
	// this is for use with the "fish-bowl" correction code, to use the
	// perpendicular distance of a wall from the camera instead of the actual
	// euclidean distance
	this.relativeRayAngCosTable = tabulateFunction((strip) => {
		return Math.cos(this.relativeRayAngTable[strip]);
	}, 0, INTERNAL_WIDTH - 1);
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
 * Return this camera's rotation, in radians. Changes to the rotation vector
 * returned by this function will be reflected in this camera.
 *
 * Parameters:
 * None.
 *
 * Returns:
 * This camera's rotation vector, in radians.
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
 * Bind the given rotation vector to this camera, in radians. Changes to the
 * rotation vector will be reflected in this camera.
 *
 * Parameters:
 * rot -- The rotation to bind to this camera, in radians.
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
	return Angle.wrapFull(ang + this.rot.v);
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

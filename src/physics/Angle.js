import { tabulateFunction } from "./Interpolation";

const TWO_PI = 2 * Math.PI;
const HALF_PI = 0.25 * Math.PI;

// sine table, indexed by integer degrees wrapped between 0 degrees inclusive
// and 360 degrees exclusive
export const sinTable = tabulateFunction((deg) => {
	return Math.sin(deg * Math.PI / 180.0);
}, 0, 359);

// cosine table, indexed by integer degrees wrapped between 0 degrees inclusive
// and 360 degrees exclusive
export const cosTable = tabulateFunction((deg) => {
	return Math.cos(deg * Math.PI / 180.0);
}, 0, 359);

// tangent table, indexed by integer degrees wrapped between 0 degrees
// inclusive and 360 degrees exclusive
export const tanTable = tabulateFunction((deg) => {
	return Math.tan(deg * Math.PI / 180.0);
}, 0, 359);

/**
 * Convert degrees to radians.
 *
 * Parameters:
 * deg -- The degrees to convert to radians.
 *
 * Returns:
 * The given amount of degrees, converted to radians.
 */
export const degToRad = (deg) => {
	return deg * Math.PI / 180.0;
};

/**
 * Convert radians to degrees.
 *
 * Parameters:
 * rad -- The radians to convert to degrees.
 *
 * Returns:
 * The given amount to radians, converted to degrees.
 */
export const radToDeg = (rad) => {
	return rad * 180.0 / Math.PI;
};

/**
 * Return whether ang is between low and high, inclusive. Angles must be given
 * in radians. The difference between low and high must be strictly less than
 * pi radians.
 *
 * Parameters:
 * ang -- The angle, in radians, to test if it is between low and high.
 * low -- The lower bound, inclusive, in radians, of the range of angles.
 * high -- The upper bound, inclusive, in radians, of the range of angles.
 *
 * Returns:
 * Whether ang is between low and high, inclusive.
 */
export const isBetween = (ang, low, high) => {
	// determine the difference between the bounding angles, making sure to
	// wrap it
	const diff = wrapFull(high - low);

	// in order for ang to lie between low and high, the difference from high
	// to ang, and the difference from ang to low, must both be no larger than
	// the difference from high to low
	return wrapFull(high - ang) <= diff && wrapFull(ang - low) <= diff;
};

/**
 * Return whether ang is between low and high, inclusive. Angles must be given
 * in degrees. The difference between low and high must be strictly less than
 * 180 degrees.
 *
 * Parameters:
 * ang -- The angle, in degrees, to test if it is between low and high.
 * low -- The lower bound, inclusive, in degrees, of the range of angles.
 * high -- The upper bound, inclusive, in degrees, of the range of angles.
 *
 * Returns:
 * Whether ang is between low and high, inclusive.
 */
export const isBetweenDeg = (ang, low, high) => {
	// determine the difference between the bounding angles, making sure to
	// wrap it
	const diff = wrapFullDeg(high - low);

	// in order for ang to lie between low and high, the difference from high
	// to ang, and the difference from ang to low, must both be no larger than
	// the difference from high to low
	return wrapFullDeg(high - ang) <= diff && wrapFullDeg(ang - low) <= diff;
};

/**
 * Wrap the given angle between 0 radians inclusive and 2 pi radians exclusive.
 *
 * Parameters:
 * ang -- The angle to wrap, in radians.
 *
 * Returns:
 * The given angle, wrapped between 0 radians inclusive and 2 pi radians
 * exclusive.
 */
export const wrapFull = (ang) => {
	// get out of the negative
	while (ang < 0) {
		ang += TWO_PI;
	}

	// get down below two pi
	while (ang >= TWO_PI) {
		ang -= TWO_PI;
	}

	return ang;
};

/**
 * Wrap the given angle between 0 degrees inclusive and 360 degrees exclusive.
 *
 * Parameters:
 * ang -- The angle to wrap, in degrees.
 *
 * Returns:
 * The given angle, wrapped between 0 degrees inclusive and 360 degrees
 * exclusive.
 */
export const wrapFullDeg = (ang) => {
	// get out of the negative
	while (ang < 0) {
		ang += 360;
	}

	// get down below 360
	while (ang >= 360) {
		ang -= 360;
	}

	return ang;
};

/**
 * Wrap the given angle between 0 radians inclusive and pi radians exclusive.
 *
 * Parameters:
 * ang -- The angle to wrap, in radians.
 *
 * Returns:
 * The given angle, wrapped between 0 radians inclusive and pi radians
 * exclusive.
 */
export const wrapHalf = (ang) => {
	// get out of the negative
	while (ang < 0) {
		ang += Math.PI;
	}

	// get down below pi
	while (ang >= Math.PI) {
		ang -= Math.PI;
	}

	return ang;
};

/**
 * Wrap the given angle between 0 degrees inclusive and 180 degrees exclusive.
 *
 * Parameters:
 * ang -- The angle to wrap, in degrees.
 *
 * Returns:
 * The given angle, wrapped between 0 degrees inclusive and 180 degrees
 * exclusive.
 */
export const wrapHalfDeg = (ang) => {
	// get out of the negative
	while (ang < 0) {
		ang += 180;
	}

	// get down below 180
	while (ang >= 180) {
		ang -= 180;
	}

	return ang;
};

/**
 * Wrap the given angle between 0 radians inclusive and pi / 2 radians
 * exclusive.
 *
 * Parameters:
 * ang -- The angle to wrap, in radians.
 *
 * Returns:
 * The given angle, wrapped between 0 radians inclusive and pi / 2 radians
 * exclusive.
 */
export const wrapQuarter = (ang) => {
	// get out of the negative
	while (ang < 0) {
		ang += Math.PI;
	}

	// get down below half pi
	while (ang >= HALF_PI) {
		ang -= HALF_PI;
	}

	return ang;
};

/**
 * Wrap the given angle between 0 degrees inclusive and 90 degrees exclusive.
 *
 * Parameters:
 * ang -- The angle to wrap, in degrees.
 *
 * Returns:
 * The given angle, wrapped between 0 degrees inclusive and 90 degrees
 * exclusive.
 */
export const wrapQuarterDeg = (ang) => {
	// get out of the negative
	while (ang < 0) {
		ang += 90;
	}

	// get down below 90
	while (ang >= 90) {
		ang -= 90;
	}

	return ang;
};

const TWO_PI = 2 * Math.PI;
const HALF_PI = 0.25 * Math.PI;

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
	return deg * 180.0 / Math.PI;
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
	return rad * Math.PI / 180.0;
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

const TWO_PI = 2 * Math.PI;
const HALF_PI = 0.25 * Math.PI;

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
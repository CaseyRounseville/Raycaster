/**
 * Return whether the floating point values a and b are equal, within some
 * given tolerance, inclusive.
 * 
 * Parameters:
 * a -- One of the values to compare.
 * b -- The other value to compare.
 * tol -- The amount by which a and b can differ and still be considered
 * as equal, inclusive.
 * 
 * Returns:
 * Whether a and b are equal within the given tolerance, inclusive.
 */
export const equalsWithinTol = (a, b, tol) => {
    return Math.abs(a - b) <= Math.abs(tol);
};

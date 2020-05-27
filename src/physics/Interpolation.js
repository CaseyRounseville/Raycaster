/**
 * Generate a mapping of integer inputs to outputs of the given function. This
 * can be used for computationally expensive functions which we know that the
 * inputs will always be in a fixed range, and we want to avoid recalculating
 * the value of the function frequently.
 * 
 * Parameters:
 * fn -- The function we want to tabulate.
 * startInput -- The smallest input in the range of integer inputs, inclusive.
 * endInput -- The largest input in the range of integer inputs, inclusive.
 * 
 * Returns:
 * An array containing the tabulated values. The value in index 0 corresponds
 * to the value of the function when called using startInput, and the value in
 * index (endInput - startInput), which is one less than the size of the range
 * of inputs, corresponds to the value of the function when called using
 * endInput.
 */
export const tabulateFunction = (fn, startInput, endInput) => {
    // create the table, initially just an empty array
    const intTable = [];

    // fill up the table with all inputs from the input range, in order from
    // smallest to largest
    for (let input = startInput; input <= endInput; input++) {
        intTable.push(fn(input));
    }

    return intTable;
};

/**
 * Linearly interpolate between the start and end values inclusive, over the
 * given number of steps(frames), giving the next value based on what step we
 * are on(the currStep).
 * 
 * Parameters:
 * startVal -- The starting value.
 * endVal -- The ending value.
 * numSteps -- How many steps does it take to get from start to end.
 * currStep -- The current step number we want to calculate the value for.
 * 
 * Returns:
 * The value of the interpolation at the given current step number.
 * 
 * Note:
 * The first step number is considered as zero. So, the last step is actually
 * numSteps - 1.
 */
export const intLinVal = (startVal, endVal, numSteps, currStep) => {
    // the final step is one less than the total number of steps, since step
    // number zero counts as a step
    const lastStep = numSteps - 1;

    // calculate how close we are to the last step, as a percentage;
    // be careful to avoid division by zero(if there was only one step)
    const percentProgress = lastStep > 0 ? currStep / lastStep : 1;

    // calculate the linearly interpolated value
    return startVal + percentProgress * (endVal - startVal);
};

/**
 * Linearly interpolate between the start and end vectors inclusive, over the
 * given number of steps(frames), writing the next value based on what step we
 * are on(the currStep) into the destVec.
 * 
 * Parameters:
 * destVec -- The vector to write the interpolated value to.
 * startVec -- The vector containing the starting value.
 * endVec -- The vector containing the ending value.
 * numSteps -- How many steps does it take to get from start to end.
 * currStep -- The current step number we want to calculate the value for.
 * 
 * Returns:
 * The destVec, for convenience.
 * 
 * Note:
 * The first step number is considered as zero. So, the last step is actually
 * numSteps - 1.
 */
export const intLinVec1 = (destVec, startVec, endVec, numSteps, currStep) => {
    // linearly interpolate the sole component of the 1D vector
    destVec.v = intLinVal(startVec.v, endVec.v, numSteps, currStep);

    // return the vector we wrote to for convenience
    return destVec;
};

/**
 * Linearly interpolate between the start and end vectors inclusive, over the
 * given number of steps(frames), writing the next value based on what step we
 * are on(the currStep) into the destVec.
 * 
 * Parameters:
 * destVec -- The vector to write the interpolated values to.
 * startVec -- The vector containing the starting values for x and y.
 * endVec -- The vector containing the ending values for x and y.
 * numSteps -- How many steps does it take to get from start to end.
 * currStep -- The current step number we want to calculate the values for.
 * 
 * Returns:
 * The destVec, for convenience.
 * 
 * Note:
 * The first step number is considered as zero. So, the last step is actually
 * numSteps - 1.
 */
export const intLinVec2 = (destVec, startVec, endVec, numSteps, currStep) => {
    // linearly interpolate the x and y components of the 2D vector
    destVec.x = intLinVal(startVec.x, endVec.x, numSteps, currStep);
    destVec.y = intLinVal(startVec.y, endVec.y, numSteps, currStep);

    // return the vector we wrote to for convenience
    return destVec;
};

/**
 * Interpolate from start to end using the sine function from x-values of 0 to
 * PI / 2. The interpolated value at x = 0(currStep = 0) is startVal, and the
 * interpolated value at x = PI / 2(currStep = numSteps - 1) is endVal. Start
 * and end values are inclusive.
 * 
 * Parameters:
 * startVal -- The starting value.
 * endVal -- The ending value.
 * numSteps -- How many steps does it take to get from start to end.
 * currStep -- The current step number we want to calculate the value for.
 * 
 * Returns:
 * The value of the interpolation at the given current step number.
 * 
 * Note:
 * The first step number is considered as zero. So, the last step is actually
 * numSteps - 1.
 */
export const intSinVal = (startVal, endVal, numSteps, currStep) => {
    // linearly interpolate our current step from 0 to PI / 2 in order to get
    // our x-value to use with the sine function
    const x = intLinVal(0, Math.PI / 2, numSteps, currStep);

    // calculate the sinusoidally interpolated value;
    // recall that the range of sine is [0, 1], so it acts as a percentage in a
    // way
    return startVal + Math.sin(x) * (endVal - startVal);
};

/**
 * Interpolate from start to end using the sine function from x-values of 0 to
 * PI / 2. The interpolated vector at x = 0(currStep = 0) is startVec, and the
 * interpolated vector at x = PI / 2(currStep = numSteps - 1) is endVec. Start
 * and end vectors are inclusive.
 * 
 * Parameters:
 * destVec -- The vector to write the interpolated value to.
 * startVec -- The vector containing the starting value.
 * endVec -- The vector containing the ending value.
 * numSteps -- How many steps does it take to get from start to end.
 * currStep -- The current step number we want to calculate the value for.
 * 
 * Returns:
 * The destVec, for convenience.
 * 
 * Note:
 * The first step number is considered as zero. So, the last step is actually
 * numSteps - 1.
 */
export const intSinVec1 = (destVec, startVec, endVec, numSteps, currStep) => {
    // sinusoidally interpolate the sole component of the 1D vector
    destVec.v = intSinVal(startVec.v, endVec.v, numSteps, currStep);

    // return the vector we wrote to for convenience
    return destVec;
};

/**
 * Interpolate from start to end using the sine function from x-values of 0 to
 * PI / 2. The interpolated vector at x = 0(currStep = 0) is startVec, and the
 * interpolated vector at x = PI / 2(currStep = numSteps - 1) is endVec. Start
 * and end vectors are inclusive.
 * 
 * Parameters:
 * destVec -- The vector to write the interpolated value to.
 * startVec -- The vector containing the starting x and y values.
 * endVec -- The vector containing the ending x and y values.
 * numSteps -- How many steps does it take to get from start to end.
 * currStep -- The current step number we want to calculate the value for.
 * 
 * Returns:
 * The destVec, for convenience.
 * 
 * Note:
 * The first step number is considered as zero. So, the last step is actually
 * numSteps - 1.
 */
export const intSinVec2 = (destVec, startVec, endVec, numSteps, currStep) => {
    // linearly interpolate the x and y components of the 2D vector
    destVec.x = intSinVal(startVec.x, endVec.x, numSteps, currStep);
    destVec.y = intSinVal(startVec.y, endVec.y, numSteps, currStep);

    // return the vector we wrote to for convenience
    return destVec;
};

// TODO
// export const interpolateCircle = () => {

// };

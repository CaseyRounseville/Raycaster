export const SIZE = 32;

export const CLEAR = 0;

export const create = (north, south, west, east, flat, height, arg1, arg2, arg3, arg4) => {
	return {
		north,
		south,
		west,
		east,
		flat,
    height,
		arg1,
		arg2,
		arg3,
		arg4
	};
};

export const pixelsToBlocks = (pixels) => {
	return pixels / SIZE;
};

export const blocksToPixels = (blocks) => {
	return blocks * SIZE;
};

const SIZE = 32;

const CLEAR = 0;

const create = (north, south, west, east, flat, height, arg1, arg2, arg3, arg4) => {
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

const pixelsToBlocks = (pixels) => {
	return pixels / SIZE;
};

const blocksToPixels = (blocks) => {
	return blocks * SIZE;
};

export default {
	SIZE,
	CLEAR,
  
	create,
	pixelsToBlocks,
	blocksToPixels
};

// consider making room just group of actors
// with special "room local" flags
// and maybe bounds for visibility limit

export const create = (pos, blockMap, protoActors) => {
	return {
		pos,
		blockMap,
		protoActors
	};
};
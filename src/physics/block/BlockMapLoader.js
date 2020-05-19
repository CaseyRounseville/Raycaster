import * as BlockMapLoaderStrat0 from "./BlockMapLoaderStrat0";

const strats = [
  BlockMapLoaderStrat0.loadBlockMap
];

// should this take an id?
// maybe not, if it will be embedded in the scene file
export const loadBlockMap = (obj) => {
	return strats[obj.version](obj);
};
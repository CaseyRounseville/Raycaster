import * as BlockMapLoaderStrat0 from "./BlockMapLoaderStrat0";

const strats = [
  BlockMapLoaderStrat0.loadBlockMap
];

export const loadBlockMap = (self, obj) => {
	return strats[obj.version].loadBlockMap(obj);
};
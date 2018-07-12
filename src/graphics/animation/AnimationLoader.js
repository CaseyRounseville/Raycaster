import * as AnimationLoaderStrat0 from "./AnimationLoaderStrat0";

const strats = [ AnimationLoaderStrat0.loadAnimation ];

export const loadAnimation = (self, obj) => {
  return strats[obj.version](obj);
};
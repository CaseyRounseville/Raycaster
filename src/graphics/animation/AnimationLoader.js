import { loadAnimation as strat0 } from "./AnimationLoaderStrat0";

const strats = [ strat0 ];

export const loadAnimation = (self, obj) => {
  return strats[obj.version](obj);
};
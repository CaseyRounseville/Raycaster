import { loadProtoActors as strat0 } from "./ProtoActorsLoaderStrat0";

const strats = [ strat0 ];

export const loadProtoActors = (obj) => {
  return strats[obj.version](obj);
};
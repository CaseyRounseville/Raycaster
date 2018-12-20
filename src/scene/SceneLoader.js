import { globalCtxt } from "../main/GlobalContext";

import { loadScene as strat0 } from "./SceneLoaderStrat0";

const strats = [ strat0 ];

export const loadScene = (id) => {  
  // read from network
  const resourceBackend = globalCtxt.resourceBackend;
  const obj = resourceBackend.loadResource()
  
  return strats[obj.version](obj);
};
import { globalCtxt } from "../main/GlobalContext";

import { loadScene as strat0 } from "./SceneLoaderStrat0";

// provide a way fro the resource system to give the scene loader the
// information needed to load a scene;
// this is necessary because the way a scene is loaded is a bit messy.
// first, loadScene is called with a resource group id and a scene id;
// the scene with the specified id lives inside the resource group;
// loadScene calls loadResource, which registers a sceneSrcObj(protoscene);
// loadScene then uses the scene id to retrieve the protoscene from the table
const id2protoScene = {};
export const regProtoScene = (id, protoScene) => {
  id2protoScene[id] = protoScene;
};
export const unregProtoScene = (id) => {
  delete id2protoScene[id];
};

// map strat number(version of scene format) to loading strategy function
const strats = [ strat0 ];

// TODO: actually load a scene instead of generating one
export const loadScene = (resId, sceneId) => {
  // load up the resource in which the scene lives
  const resBackend = globalCtxt.resourceBackend;
  resBackend.loadResource(resId);

  // that call to load resource should have registered a protoscene in the
  // table
  const protoScene = id2protoScene[sceneId];

  // pass the scene source object on to the appropriate loader for the version
  // of the format
  return strats[protoScene.version](protoScene);
};
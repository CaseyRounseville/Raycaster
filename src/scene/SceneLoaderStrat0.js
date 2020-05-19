import { Scene } from "./Scene";

import { loadBlockMap } from "../physics/block/BlockMapLoader";
import { loadProtoActors } from "../actor/ProtoActorsLoader";

export const loadScene = (obj) => {
  // extract block map
  const blockMap = loadBlockMap(obj.blockMap);
  
  // extract actors
  const protoActors = loadProtoActors(obj.actors);
  
  // extract entrances
  const entrances = loadProtoActors(obj.entrances);
  
  // construct scene
  return new Scene(blockMap, protoActors, entrances);
};
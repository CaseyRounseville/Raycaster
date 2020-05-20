import { Scene } from "./Scene";

import { loadBlockMap } from "../physics/block/BlockMapLoader";
import { loadProtoActors } from "../actor/ProtoActorsLoader";
import { globalCtxt } from "../main/GlobalContext";
import { SkyBox } from "../graphics/SkyBox";

export const loadScene = (obj) => {
  // set the skybox
  const graphicsBackend = globalCtxt.graphicsBackend;
  const renderer = globalCtxt.renderer;
  const skyBoxTex = graphicsBackend.getTexture(obj.skyBox.texId);
  const skyBox = new SkyBox(skyBoxTex);
  renderer.setSkyBox(skyBox);

  // extract block map
  const blockMap = loadBlockMap(obj.blockMap);
  
  // extract actors
  const protoActors = loadProtoActors(obj.actors);
  
  // extract entrances
  const entrances = loadProtoActors(obj.entrances);
  
  // construct scene
  return new Scene(blockMap, protoActors, entrances);
};
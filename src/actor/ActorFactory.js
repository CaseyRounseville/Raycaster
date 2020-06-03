import { create as createPlayer } from "./player/Player";
import { create as createTree } from "./tree/Tree";
import { create as createTorch } from "./torch/Torch";

const creators = {
  player: createPlayer,
  tree: createTree,
  torch: createTorch
};

export const createActor = (protoActor) => {
	let type = protoActor.type;
  if (!creators[type]) {
    console.error("ActorFactory.createActor: UNKNOWN ACTOR TYPE " + type);
  }
  return creators[type](protoActor);
};

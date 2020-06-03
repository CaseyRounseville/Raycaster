import { create as createPlayer } from "./player/Player";
import { create as createTree } from "./tree/Tree";

const creators = {
  player: createPlayer,
  tree: createTree
};

export const createActor = (protoActor) => {
	let type = protoActor.type;
  if (!creators[type]) {
    console.error("ActorFactory.createActor: UNKNOWN ACTOR TYPE " + type);
  }
  return creators[type](protoActor);
};
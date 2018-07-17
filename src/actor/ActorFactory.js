import { create as createPlayer } from "./player/Player";

const creators = {
  Player: createPlayer
};

export const createActor = (protoActor) => {
	let type = protoActor.type;
  if (!creators[type]) {
    console.error("ActorFactory.createActor: UNKNOWN ACTOR TYPE " + type);
  }
  return creators[type](protoActor);
};
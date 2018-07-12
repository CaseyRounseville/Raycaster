import * as Player from "./player/Player";

const creators = {
  player: Player.create
};

export const createActor = (protoActor) => {
	let type = protoActor.type;
  if (!creators[type]) {
    console.error("ActorFactory.createActor: UNKNOWN ACTOR TYPE " + type);
  }
  return creators[type](protoActor);
};
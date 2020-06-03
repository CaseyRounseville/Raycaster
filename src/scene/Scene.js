import { createActor } from "../actor/ActorFactory";

import { clear as arrayClear } from "../util/ArrayUtil";

export function Scene(blockMap, protoActors, entrances) {
	this.blockMap = blockMap;
	this.protoActors = protoActors;
	this.entrances = entrances;

	this.actors = [];
}

Scene.prototype.wire = function() {
	this.blockMap.wire();

	// create and wire actors
	this.protoActors.forEach((protoActor) => {
		// call the appropriate actor creation function, based on the type
		// information stored in the protoactor
		const actor = createActor(protoActor);

		// wire up the actor
		actor.wire();

		// add the actor to the list, so we can unwire it later if it is still
		// around when the scene is to be unwired
		this.actors.push(actor);
	});
}

Scene.prototype.unwire = function() {
	this.blockMap.unwire();

	// unwire the actors
	this.actors.forEach((actor) => {
		actor.unwire();
	});

	// clear the actor array
	arrayClear(this.actors);
}

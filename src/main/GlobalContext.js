import GraphicsBackend from "../graphics/backend/GraphicsBackend";
import Canvas2DGraphicsBackend from "../graphics/backend/Canvas2DGraphicsBackend";

import InputBackend from "../input/backend/InputBackend";
import DefaultInputBackend from "../input/backend/DefaultInputBackend";

import PhysicsBackend from "../physics/backend/PhysicsBackend";
import DefaultPhysicsBackend from "../physics/backend/DefaultPhysicsBackend";

const create = (config) => {
	let globalCtxt = {};
	
	// graphics
	switch (config.graphicsBackendName) {
	default:
		console.log("GlobalContext.create: UNRECOGNIZED OR UNSPECIFIED GRAPHICS BACKEND NAME " + config.graphicsBackendName + "; DEFAULTING TO canvas2D");
	case "canvas2D":
		globalCtxt.graphicsBackend = Canvas2DGraphicsBackend.create();
		break;
	}
	
	// input
	switch (config.inputBackendName) {
	default:
		console.log("GlobalContext.create: UNRECOGNIZED OR UNSPECIFIED INPUT BACKEND NAME " + config.graphicsBackendName + "; DEFAULTING TO default");
	case "default":
		globalCtxt.inputBackend = DefaultInputBackend.create();
		break;
	}
	
	// physics
	switch (config.physicsBackendName) {
	default:
		console.log("GlobalContext.create: UNRECOGNIZED OR UNSPECIFIED PHYSICS BACKEND NAME " + config.graphicsBackendName + "; DEFAULTING TO defualt");
	case "default":
		globalCtxt.physicsBackend = DefaultPhysicsBackend.create();
		break;
	}
	
	return globalCtxt;
};

export default {
	create
};
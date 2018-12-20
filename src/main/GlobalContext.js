import { GraphicsBackend } from "../graphics/backend/GraphicsBackend";
import { Canvas2DGraphicsBackend } from "../graphics/backend/Canvas2DGraphicsBackend";
import { WebGLGraphicsBackend } from "../graphics/backend/WebGLGraphicsBackend";

import { InputBackend } from "../input/backend/InputBackend";
import { DefaultInputBackend } from "../input/backend/DefaultInputBackend";

import { PhysicsBackend } from "../physics/backend/PhysicsBackend";
import { DefaultPhysicsBackend } from "../physics/backend/DefaultPhysicsBackend";

import { ResourceBackend } from "../resource/backend/ResourceBackend";
import { DefaultResourceBackend } from "../resource/backend/DefaultResourceBackend";

function GlobalContext(config) {
  // graphics
	switch (config.graphicsBackendName) {
	default:
		console.log("GlobalContext.create: UNRECOGNIZED OR UNSPECIFIED GRAPHICS BACKEND NAME " + config.graphicsBackendName + "; DEFAULTING TO canvas2D");
	case "canvas2D":
		this.graphicsBackend = new Canvas2DGraphicsBackend();
		break;
  case "webGL":
    this.graphicsBackend = new WebGLGraphicsBackend();
    break;
	}
	
	// input
	switch (config.inputBackendName) {
	default:
		console.log("GlobalContext.create: UNRECOGNIZED OR UNSPECIFIED INPUT BACKEND NAME " + config.inputBackendName + "; DEFAULTING TO default");
	case "default":
		this.inputBackend = new DefaultInputBackend();
		break;
	}
	
	// physics
	switch (config.physicsBackendName) {
	default:
		console.log("GlobalContext.create: UNRECOGNIZED OR UNSPECIFIED PHYSICS BACKEND NAME " + config.physicsBackendName + "; DEFAULTING TO defualt");
	case "default":
		//this.physicsBackend = new DefaultPhysicsBackend();
		break;
	}
  
  // resource
  this.resBaseUrl = config.resBaseUrl;
  this.resourceBackend = new DefaultResourceBackend();
  
  // scene
  this.scene = {};
}

// singleton
export let globalCtxt = undefined;
export const initGlobalCtxt = (config) => {
  globalCtxt =  new GlobalContext(config);
};
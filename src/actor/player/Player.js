import { PlayerRenderer } from "./PlayerRenderer";
import { PlayerInputHandler } from "./PlayerInputHandler";

import * as InputBackend from "../../input/backend/InputBackend";

import * as GraphicsBackend from "../../graphics/backend/GraphicsBackend";

import * as Actor from "../Actor";

import { Vector1 } from "../../physics/Vector1";
import { Vector2 } from "../../physics/Vector2";

import { globalCtxt } from "../../main/GlobalContext";

export function Player(x, y) {
  this.pos = new Vector2(x, y);
  this.vel = new Vector2(0, 0);
  this.rot = new Vector1(0);
  
  this.inputHandler = new PlayerInputHandler(this);
  this.renderer = new PlayerRenderer(this);
}

/**
 * Wire up the player.
 */
Player.prototype.wire = function() {
  alert("wiring player");
  
  // bind the player's movements to the camera
  const graphicsBackend = globalCtxt.graphicsBackend;
  const cam = graphicsBackend.getCamera();
  cam.bindPos(this.pos);
  cam.bindRot(this.rot);
  //graphicsBackend.registerRenderer(this.renderer);
  
  const renderer = globalCtxt.renderer;
  renderer.registerOverlay(this.renderer);
	
	const inputBackend = globalCtxt.inputBackend;
	inputBackend.registerInputHandler(this.inputHandler);
  
  const resourceBackend = globalCtxt.resourceBackend;
  resourceBackend.loadResource("test");
};

/**
 * Unwire the player.
 */
Player.prototype.unwire = function() {
  alert("unwiring player");
  
  //const graphicsBackend = globalCtxt.graphicsBackend;
	//graphicsBackend.unregisterRenderer(this.renderer);
  const renderer = globalCtxt.renderer;
  renderer.unregisterOverlay(this.renderer);
	
	const inputBackend = globalCtxt.inputBackend;
	inputBackend.unregisterInputHandler(this.inputHandler);
};

export const create = (protoActor) => {
  return new Player(protoActor.x, protoActor.y);
};
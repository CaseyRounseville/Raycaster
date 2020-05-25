import { PlayerRenderer } from "./PlayerRenderer";
import { PlayerInputHandler } from "./PlayerInputHandler";

import * as InputBackend from "../../input/backend/InputBackend";

import * as GraphicsBackend from "../../graphics/backend/GraphicsBackend";

import { registerTask, unregisterTask } from "../../task/TaskSystem";

import * as Actor from "../Actor";

import { Vector1 } from "../../physics/Vector1";
import { Vector2 } from "../../physics/Vector2";

import { HeadBob } from "../../graphics/effect/HeadBob";

import { globalCtxt } from "../../main/GlobalContext";

// head bob effect offset constants, in pixels for positions and radians for
// angles
const HEAD_BOB_POS_UP = 2;
const HEAD_BOB_POS_DOWN = -1;
const HEAD_BOB_POS_LEFT = -1;
const HEAD_BOB_POS_RIGHT = 1;
const HEAD_BOB_ANG_LEFT = 0.0872665 / 5;
const HEAD_BOB_ANG_RIGHT = -0.0872665 / 5;
//const HEAD_BOB_ANG_LEFT = 1;
//const HEAD_BOB_ANG_RIGHT = -1;


export function Player(x, y) {
  this.pos = new Vector2(x, y);
  this.vel = new Vector2(0, 0);
  this.rot = new Vector1(0);
  
  this.inputHandler = new PlayerInputHandler(this);
  this.renderer = new PlayerRenderer(this);

  // create the head bob effect
  const inputBackend = globalCtxt.inputBackend;
  this.headBobEffect = new HeadBob(HEAD_BOB_POS_UP, HEAD_BOB_POS_DOWN,
      HEAD_BOB_POS_LEFT, HEAD_BOB_POS_RIGHT, HEAD_BOB_ANG_LEFT,
      HEAD_BOB_ANG_RIGHT,
      () => { return inputBackend.isDown(InputBackend.BTN_UP); },
      () => { return inputBackend.isDown(InputBackend.BTN_DOWN); },
      () => { return inputBackend.isDown(InputBackend.BTN_LEFT); },
      () => { return inputBackend.isDown(InputBackend.BTN_RIGHT); },
      () => { return inputBackend.isDown(InputBackend.BTN_ROT_LEFT); },
      () => { return inputBackend.isDown(InputBackend.BTN_ROT_RIGHT); });
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

  // wire the head bobbing effect
  registerTask(this.headBobEffect);
  renderer.setHeadBob(this.headBobEffect);
	
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

  // unwire the head bobbing effect
  unregisterTask(this.headBobEffect);
  renderer.setHeadBob(undefined);

	const inputBackend = globalCtxt.inputBackend;
	inputBackend.unregisterInputHandler(this.inputHandler);
};

export const create = (protoActor) => {
  return new Player(protoActor.x, protoActor.y);
};

import { Vector1 } from "../physics/Vector1";
import { Vector2 } from "../physics/Vector2";

import * as GraphicsBackend from "./backend/GraphicsBackend";

import * as Angle from "../physics/Angle";

import * as Block from "../physics/block/Block";

export const VISIBILITY	    = 50,
             FOV			      = Math.PI / 2,
             DIST_TO_PLANE	= Block.pixelsToBlocks(GraphicsBackend.INTERNAL_WIDTH / 2) / Math.sin(FOV / 2);

export function Camera() {
  this.pos = new Vector2(0, 0);
  this.rot = new Vector1(0);
  this.height = new Vector1(0.5);
  this.depthBuffer = [];
}

Camera.prototype.bindPos = function(pos) {
  this.pos = pos;
};

Camera.prototype.bindRot = function(rot) {
  this.rot = rot;
};

Camera.prototype.bindHeight = function(height) {
  this.height = height;
};

Camera.prototype.calcRayAng = function(strip) {
  let x = Block.pixelsToBlocks(strip - GraphicsBackend.INTERNAL_WIDTH / 2);
	let ang = Angle.wrapFull(Math.atan2(DIST_TO_PLANE, x));
	return Angle.wrapFull(ang + this.rot.v);
};
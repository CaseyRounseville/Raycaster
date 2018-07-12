import * as Vector1 from "../physics/Vector1";
import * as Vector2 from "../physics/Vector2";

import * as GraphicsBackend from "./backend/GraphicsBackend";

import * as Angle from "../physics/Angle";

import * as Block from "../physics/block/Block";

export const VISIBILITY	    = 50,
             FOV			      = Math.PI / 2,
             DIST_TO_PLANE	= Block.pixelsToBlocks(GraphicsBackend.INTERNAL_WIDTH / 2) / Math.sin(FOV / 2);

export const bindPos = (self, pos) => {
	self.pos = pos;
};

export const bindRot = (self, rot) => {
	self.rot = rot;
};

export const bindHeight = (self, height) => {
	self.height = height;
};

export const calcRayAng = (self, strip) => {
	let x = Block.pixelsToBlocks(strip - GraphicsBackend.INTERNAL_WIDTH / 2);
	let ang = Angle.wrapFull(Math.atan2(DIST_TO_PLANE, x));
	return Angle.wrapFull(ang + self.rot.v);
};

export const create = () => {
	return {
		pos: Vector2.create(0, 0),
		rot: Vector1.create(0),
		height: Vector1.create(0.5),
		zbuf: [],
		
		bindPos,
		bindHeight,
		bindRot,
		calcRayAng
	};
};
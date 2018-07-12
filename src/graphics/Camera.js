import Vector1 from "../physics/Vector1";
import Vector2 from "../physics/Vector2";

import Angle from "../physics/Angle";

import Block from "../physics/block/Block";

const VISIBILITY	= 50,
      FOV			= Math.PI / 2,
      DIST_TO_PLANE	= Block.pixelsToBlocks(320 / 2) / Math.sin(FOV / 2);

const bindPos = (self, pos) => {
	self.pos = pos;
};

const bindRot = (self, rot) => {
	self.rot = rot;
};

const bindHeight = (self, height) => {
	self.height = height;
};

const calcRayAng = (self, strip) => {
	let x = Block.pixelsToBlocks(strip - 320 / 2);
	let ang = Angle.wrapFull(Math.atan2(DIST_TO_PLANE, x));
	return Angle.wrapFull(ang + self.rot.v);
};

const create = () => {
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

export default {
	VISIBILITY,
	FOV,
	DIST_TO_PLANE,
	
	create
};
import * as InputBackend from "../../input/backend/InputBackend";

import {
	sinTable,
	cosTable,
	wrapFullDeg
} from "../../physics/Angle";

import {
	setDebugPlayerX,
	setDebugPlayerY,
	setDebugPlayerR
} from "../../ui/DebugPanel";

/**
 * Initialize this player input handler.
 *
 * Parameters:
 * player -- The player that this input handler will handle input for.
 *
 * Returns:
 * Nothing.
 */
export function PlayerInputHandler(player) {
	this.player = player;
}

/**
 * Examine the input state each frame, and update the player's state based on
 * the input.
 *
 * Parameters:
 * backend -- The input backend to query the input state from.
 *
 * Returns:
 * Nothing.
 */
PlayerInputHandler.prototype.handleInput = function(backend) {
	// break the velocity down into components;
	// remember to invert the vertical component, since the y-axis increases
	// downward;
	// we will use trig tables for sine and cosine
	const velocity = 1 / 32;
	//const velocityX = velocity * Math.cos(this.player.rot.v);
	//const velocityY = velocity * -Math.sin(this.player.rot.v);
	const velocityX = velocity * cosTable[this.player.rot.v];
	const velocityY = velocity * -sinTable[this.player.rot.v];

	// handle walking forward and backwards
	if (backend.isDown(InputBackend.BTN_UP)) {
		this.player.pos.x += velocityX;
		this.player.pos.y += velocityY;
	}
	if (backend.isDown(InputBackend.BTN_DOWN)) {
		this.player.pos.x -= velocityX;
		this.player.pos.y -= velocityY;
	}

	// remember to invert the vertical component, since the y-axis increases
	// downward
	const strafeLeftVelocity = velocity;
	//const strafeLeftVelocityX = strafeLeftVelocity * Math.cos(Math.PI / 2 +
	//		this.player.rot.v);
	//const strafeLeftVelocityY = strafeLeftVelocity * -Math.sin(Math.PI / 2 +
	//		this.player.rot.v);
	const strafeLeftVelocityX = strafeLeftVelocity *
			cosTable[wrapFullDeg(90 + this.player.rot.v)];
	const strafeLeftVelocityY = strafeLeftVelocity *
			-sinTable[wrapFullDeg(90 + this.player.rot.v)];

	// handle strafing
	if (backend.isDown(InputBackend.BTN_LEFT)) {
		this.player.pos.x += strafeLeftVelocityX;
		this.player.pos.y += strafeLeftVelocityY;
	} else if (backend.isDown(InputBackend.BTN_RIGHT)) {
		this.player.pos.x -= strafeLeftVelocityX;
		this.player.pos.y -= strafeLeftVelocityY;
	}
	//console.log("camera rot " + this.player.rot.v);

	// handle any rotation, after the movement
	if (backend.isDown(InputBackend.BTN_ROT_LEFT)) {
		// counter-clockwise rotation is positive
		this.player.rot.v = wrapFullDeg(this.player.rot.v + 1);
	} else if (backend.isDown(InputBackend.BTN_ROT_RIGHT)) {
		// clockwise rotation is negative
		this.player.rot.v = wrapFullDeg(this.player.rot.v - 1);
	}

	// update debug display
	setDebugPlayerX(this.player.pos.x);
	setDebugPlayerY(this.player.pos.y);
	setDebugPlayerR(this.player.rot.v);
};

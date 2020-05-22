import { INTERNAL_WIDTH, INTERNAL_HEIGHT } from "../backend/GraphicsBackend";

import { VISIBILITY, DIST_TO_PLANE } from "../Camera";

import { BLUE, GREEN, GRAY, RED } from "../util/Color";

import { Renderer } from "./Renderer";

import { equalsWithinTol } from "../../util/FloatUtil";

import {
	SIZE as BLOCK_SIZE,
	blocksToPixels,
	pixelsToBlocks
} from "../../physics/block/Block";

import {
	add as vector1Add,
	copy as vector1Copy
} from "../../physics/Vector1";

import {
	add as vector2Add,
	copy as vector2Copy
} from "../../physics/Vector2";

import { wrapFull } from "../../physics/Angle"

// the tolerance of the ray's angle during raycasting calculations, in radians
const RAY_ANG_TOL = 0.00001;

const SIDE_NORTH = 0;
const SIDE_SOUTH = 1;
const SIDE_EAST = 2;
const SIDE_WEST = 3;

const isHorizWall = (side) => {
	return side == SIDE_NORTH || side == SIDE_SOUTH;
};

Canvas2DRaycaster.prototype = Object.create(Renderer.prototype);
Canvas2DRaycaster.prototype.constructor = Canvas2DRaycaster;

export function Canvas2DRaycaster(backend) {
	Renderer.call(this);
	
	this.backend = backend;
	
	
};

Canvas2DRaycaster.prototype.setSkyBox = function(skyBox) {
	Renderer.prototype.setSkyBox.call(this, skyBox);
};

Canvas2DRaycaster.prototype.registerBlockMap = function(blockMap) {
	this.blockMap = blockMap;
};

Canvas2DRaycaster.prototype.registerBillboard = function(billboard) {
	Renderer.prototype.registerBillboard.call(this, billboard);
};

Canvas2DRaycaster.prototype.unregisterBillboard = function(billboard) {
	Renderer.prototype.unregisterBillboard.call(this, billboard);
};

Canvas2DRaycaster.prototype.registerOverlay = function(overlay) {
	Renderer.prototype.registerOverlay.call(this, overlay);
};

Canvas2DRaycaster.prototype.unregisterOverlay = function(overlay) {
	Renderer.prototype.unregisterOverlay.call(this, overlay);
};

Canvas2DRaycaster.prototype.render = function() {
	// clear the screen
	this.backend.clearScreen();
	
	// render skyBox
	if (this.skyBox) {
		// we may need to render the skybox in two parts, depending on if we
		// need to wrap around the texture
		const skyBoxTex = this.skyBox.getTexture();
		const skyBoxTexWidth = skyBoxTex.getWidth();
		const skyBoxTexStartSrcX = this.skyBox.getStartX(this.backend.getCamera());

		// we need to wrap if we are starting more than 3/4 of the way along
		// the texture
		if (skyBoxTexStartSrcX / skyBoxTexWidth > 0.75) {
			// do the first render, as much as we can without wrapping
			const firstRenderWidth = skyBoxTexWidth - skyBoxTexStartSrcX;
			this.backend.renderTexture(skyBoxTex.getId(), 0, 0,
					firstRenderWidth, INTERNAL_HEIGHT, skyBoxTexStartSrcX, 0,
					firstRenderWidth, INTERNAL_HEIGHT);

			// do the second render, the wrapped part
			const leftOverWidth = INTERNAL_WIDTH - firstRenderWidth;
			this.backend.renderTexture(skyBoxTex.getId(), firstRenderWidth, 0,
					leftOverWidth, INTERNAL_HEIGHT, 0, 0, leftOverWidth,
					INTERNAL_HEIGHT);
		} else {
			// we can draw the whole skybox without wrapping
			this.backend.renderTexture(skyBoxTex.getId(), 0, 0, INTERNAL_WIDTH,
					INTERNAL_HEIGHT, skyBoxTexStartSrcX, 0, INTERNAL_WIDTH,
					INTERNAL_HEIGHT);
		}
	} else {
		this.backend.setFillColor(BLUE);
		this.backend.fillRect(0, 0, INTERNAL_WIDTH, INTERNAL_HEIGHT / 2);
	}

	// render floor
	this.backend.setFillColor(GRAY);
	this.backend.fillRect(0, INTERNAL_HEIGHT / 2, INTERNAL_WIDTH, INTERNAL_HEIGHT / 2);
	
	// only render the blockmap if it exists
	if (this.blockMap) {
		// render blockMap and billboards(need to do them at the same time);
		const camera = this.backend.getCamera();
		let camPos = camera.getPos();
		let camRot = camera.getRot();

		// take the left/right and angle head bobbing effect into account, if
		// there is one;
		// the up/down head bobbing will need to be done when each strip is
		// rendered
		if (this.headBob) {
			// we need to add the left/right position offset the same way we do
			// left/right strafing for player input;
			// first, we will convert the head bob's positon offset into units
			// of blocks, since it is given in pixels
			vector2Copy(this.headBobPosOffset, this.headBob.getPosOffset());
			this.headBobPosOffset.x = pixelsToBlocks(this.headBobPosOffset.x);
			console.log("head bob offset x is " + this.headBobPosOffset.x);

			// now, we will take into account that amount of horizontal
			// position bobbing, making sure to apply it in the proper
			// directions;
			// remember, we are only accounting for left/right position bobbing
			// right now
			const horizBobOffset = this.headBobPosOffset.x;
			this.headBobPosOffset.x = horizBobOffset * Math.cos(camRot.v -
					Math.PI / 2);
			this.headBobPosOffset.y = horizBobOffset * -Math.sin(camRot.v -
					Math.PI / 2);

			// next, we will apply left/right rotation bobbing to the camera;
			// this is simpler than the left/right position bobbing
			vector1Copy(this.headBobAngOffset, this.headBob.getAngOffset());
			vector1Add(this.headBobAngOffset, this.headBobAngOffset, camRot);
			camRot = this.headBobAngOffset;
			camRot.v = wrapFull(camRot.v);
			console.log("camrot v is " + camRot.v);
		}

		const mapWidth = this.blockMap.getWidth();
		const mapHeight = this.blockMap.getHeight();
		for (let strip = 0; strip < INTERNAL_WIDTH; strip++) {
			// keep track of our position on the map as we travel along this
			// ray;
			// the ray originates at the camera's position
			let rayOriginX = camPos.x;// + this.headBobPosOffset.x;
			let rayOriginY = camPos.y;// + this.headBobPosOffset.y;
			let rayx = rayOriginX;
			let rayy = rayOriginY;

			// calculate the ray's angle with respect to the positive x-axis;
			// we will treat counter-clockwise rotation as positive;
			// remember that going "up" is actually in the decreasing y-direction;
			// remember to take into account head rotation bobbing
			const rayAng = wrapFull(camera.calcRayAng(strip) + this.headBob.getAngOffset().v);

			// this will hold the block id of the first wall hit by the ray;
			// 0 means no wall was hit
			let firstBlockHitId = 0;

			// determine the edge cases, if the ray is going exactly vertically or
			// horizontally
			const exactlyRight = equalsWithinTol(rayAng, 0.0, RAY_ANG_TOL);
			const exactlyUp = equalsWithinTol(rayAng, Math.PI / 2,
					RAY_ANG_TOL);
			const exactlyLeft = equalsWithinTol(rayAng, Math.PI, RAY_ANG_TOL);
			const exactlyDown = equalsWithinTol(rayAng, 3 * Math.PI / 2,
					RAY_ANG_TOL);

			// keep track of how far we have traveled along this ray;
			// we will only go as far as the camera's visibility, in blocks, in
			// either direction
			let blocksTraveledX = 0;
			let blocksTraveledY = 0;
			
			// keep track of what side of a wall he hit closest;
			let sideOfWall;
			while (blocksTraveledX < VISIBILITY && blocksTraveledY < VISIBILITY) {
				// the grid lines to take the next wall query at
				let nextHorizLine = rayy;
				let nextVertLine = rayx;

				// see if we are in any of the edge cases, or somewhere in
				// between
				if (exactlyRight) {
					nextVertLine = Math.floor(rayx) + 1;
				} else if (exactlyUp) {
					nextHorizLine = Math.floor(rayy) - 1;
				} else if (exactlyLeft) {
					nextVertLine = Math.floor(rayx) - 1;
				} else if (exactlyDown) {
					nextHorizLine = Math.floor(rayy) + 1;
				} else {
					if (rayAng < Math.PI / 2) {
						// we are facing the upper-right quadrant
						nextHorizLine = Math.floor(rayy);
						if (nextHorizLine == rayy) {
							nextHorizLine  -= 1;
						}
						nextVertLine = Math.ceil(rayx);
						if (nextVertLine == rayx) {
							nextVertLine += 1;
						}
					} else if (rayAng < Math.PI) {
						// we are facing the upper-left quadrant
						nextHorizLine = Math.floor(rayy);
						if (nextHorizLine == rayy) {
							nextHorizLine  -= 1;
						}
						nextVertLine = Math.floor(rayx);
						if (nextVertLine == rayx) {
							nextVertLine -= 1;
						}
					} else if (rayAng < 3 * Math.PI / 2) {
						// we are facing the lower-left quadrant
						nextHorizLine = Math.ceil(rayy);
						if (nextHorizLine == rayy) {
							nextHorizLine  += 1;
						}
						nextVertLine = Math.floor(rayx);
						if (nextVertLine == rayx) {
							nextVertLine -= 1;
						}
					} else {
						// we are facing the lower-right quadrant
						nextHorizLine = Math.ceil(rayy);
						if (nextHorizLine == rayy) {
							nextHorizLine  += 1;
						}
						nextVertLine = Math.ceil(rayx);
						if (nextVertLine == rayx) {
							nextVertLine += 1;
						}
					}
				}

				// update the distance traveled in the horizontal and vertical
				// directions
				blocksTraveledX += Math.abs(nextHorizLine - rayx);
				blocksTraveledY += Math.abs(nextVertLine - rayy);

				// compute the intersections of the ray with the next
				// horizontal and vertical lines;
				// these intersections will be on grid lines of the map;
				// we will choose the closest one as our point to look at, and
				// to be the next starting point of the ray on the next
				// iteration
				if (exactlyRight) {
					// we move in the x-direction only, so we leave rayy alone
					rayx = nextVertLine;
					sideOfWall = SIDE_WEST;
				} else if (exactlyUp) {
					// we move in the y-direction only, so we leave rayx alone
					rayy = nextHorizLine;
					sideOfWall = SIDE_SOUTH;
				} else if (exactlyLeft) {
					// we move in the x-direction only, so we leave rayy alone
					rayx = nextVertLine;
					sideOfWall = SIDE_EAST;
				} else if (exactlyDown) {
					// we move in the y-direction only, so we leave rayx alone
					rayy = nextHorizLine;
					sideOfWall = SIDE_NORTH;
				} else {
					// slope is rise over run, however we must invert the rise,
					// since the y-axis increases in the downward direction;
					// so, we take the negative rise over run
					const raySlope = -Math.tan(rayAng);

					// we know the ray passes through the camera's position, so
					// we have enough information to calculate a y-intercept;
					const rayIntercept = rayOriginY - raySlope * rayOriginX;

					// now, we can plug in the next horizontal and vertical
					// lines to find where they intersect with the ray, and
					// choose the intersection that is closer
					const nextHorizLineX = (nextHorizLine - rayIntercept) /
							raySlope;
					const nextVertLineY = raySlope * nextVertLine +
							rayIntercept;

					// make sure to calculate the distance from the
					// intsersection points to the camera position, not the
					// origin of the map
					const nextHorizLineDistX = nextHorizLineX - rayOriginX;
					const nextHorizLineDistY = nextHorizLine - rayOriginY;
					const nextHorizLineDist = Math.sqrt(nextHorizLineDistX *
							nextHorizLineDistX + nextHorizLineDistY *
							nextHorizLineDistY);

					const nextVertLineDistX = nextVertLine - rayOriginX;
					const nextVertLineDistY = nextVertLineY - rayOriginY;
					const nextVertLineDist = Math.sqrt(nextVertLineDistX *
							nextVertLineDistX + nextVertLineDistY *
							nextVertLineDistY);

					// if the distances are equal, we have found a corner;
					// in this case, we will arbitrarily choose the horizontal
					// line instersection
					if (nextHorizLineDist <= nextVertLineDist) {
						rayx = nextHorizLineX;
						rayy = nextHorizLine;
						if (rayAng > 0 && rayAng < Math.PI) {
							sideOfWall = SIDE_SOUTH;
						} else {
							sideOfWall = SIDE_NORTH;
						}
					} else {
						rayx = nextVertLine;
						rayy = nextVertLineY;
						if (rayAng < Math.PI / 2 || rayAng > 3 * Math.PI / 2) {
							sideOfWall = SIDE_WEST;
						} else {
							sideOfWall = SIDE_EAST;
						}
					}
				}

				// make sure we are still on the map
				/*if (rayx < 0 || rayx > mapWidth - 1 || rayy < 0 ||
						rayy > mapHeight - 1) {
					break;
				}*/

				// see if we have hit something solid;
				// note that we have to be careful about which "side" of the
				// grid line we read our value from, depending on which way the
				// ray is going and what type of wall it is(horizontal or
				// vertical)
				let gridRow;
				let gridCol;
				if (exactlyRight) {
					// if we are going exactly right, the wall is guaranteed to
					// be vertical
					gridRow = Math.floor(rayy);
					gridCol = Math.floor(rayx);
				} else if (exactlyUp) {
					// if we are going exactly up, the wall is guaranteed to be
					// horizontal
					gridRow = Math.floor(rayy) - 1;
					gridCol = Math.floor(rayx);
				} else if (exactlyLeft) {
					// if we are going exactly left, the wall is guaranteed to
					// be vertical
					gridRow = Math.floor(rayy);
					gridCol = Math.floor(rayx) - 1;
				} else if (exactlyDown) {
					// if we are going exactly down, the wall is guaranteed to
					// be horizontal
					gridRow = Math.floor(rayy);
					gridCol = Math.floor(rayx);
				} else {
					if (rayAng < Math.PI / 2) {
						// upper-right quadrant
						if (isHorizWall(sideOfWall)) {
							gridRow = Math.floor(rayy) - 1;
							gridCol = Math.floor(rayx);
						} else {
							gridRow = Math.floor(rayy);
							gridCol = Math.floor(rayx);
						}
					} else if (rayAng < Math.PI) {
						// upper-left quadrant
						if (isHorizWall(sideOfWall)) {
							gridRow = Math.floor(rayy) - 1;
							gridCol = Math.floor(rayx);
						} else {
							gridRow = Math.floor(rayy);
							gridCol = Math.floor(rayx) - 1;
						}
					} else if (rayAng < 3 * Math.PI / 2) {
						// lower-left quadrant
						if (isHorizWall(sideOfWall)) {
							gridRow = Math.floor(rayy);
							gridCol = Math.floor(rayx);
						} else {
							gridRow = Math.floor(rayy);
							gridCol = Math.floor(rayx) - 1;
						}
					} else {
						// lower-right quadrant
						if (isHorizWall(sideOfWall)) {
							gridRow = Math.floor(rayy);
							gridCol = Math.floor(rayx);
						} else {
							gridRow = Math.floor(rayy);
							gridCol = Math.floor(rayx);
						}
					}
				}

				// read the value from the map
				if (!(gridRow < 0 || gridRow > mapHeight - 1 || gridCol < 0 ||
						gridCol > mapWidth - 1)) {
					let wallVal;
					switch (sideOfWall) {
						case SIDE_NORTH:
							wallVal = this.blockMap.getNorthData(gridRow,
									gridCol);
							break;
						case SIDE_SOUTH:
							wallVal = this.blockMap.getSouthData(gridRow,
									gridCol);
							break;
						case SIDE_EAST:
							wallVal = this.blockMap.getEastData(gridRow,
									gridCol);
							break;
						case SIDE_WEST:
							wallVal = this.blockMap.getWestData(gridRow,
									gridCol);
							break;
					}
					if (wallVal > 0) {
						firstBlockHitId = wallVal;
						break;
					}
				}
			}

			// see if we need to render this strip
			if (firstBlockHitId > 0) {
				// we will use the perpendicular distance from the camera
				// position to the wall that was hit in our calculation of the
				// strip's height on the screen
				let trueDistX = Math.abs(rayOriginX - rayx);
				let trueDistY = Math.abs(rayOriginY - rayy);
				let trueDistToWall = Math.sqrt(trueDistX * trueDistX +
						trueDistY * trueDistY);
				let relativeRayAng = Math.PI / 2 - Math.abs(rayAng - camRot.v);
				let perpDistToWall = trueDistToWall * Math.sin(relativeRayAng);

				// we will assume every wall is exactly the same height(the
				// BLOCK_SIZE), and that the camera is exactly halfway above
				// the ground and below the ceiling;
				// we multiply by the height of a block at the end to convert
				// from blocks to pixels
				let heightOnScreen = DIST_TO_PLANE * BLOCK_SIZE /
						perpDistToWall;
				//heightOnScreen *= BLOCK_SIZE;

				// now, we will take into account the up/down camera bobbing,
				// by adding the bobbing offset, in pixels, to where we are
				// considering as the center of the screen;
				// note that if we are bobbing up, we need to move the center
				// line of the screen down
				let bobCenterPosOffset;
				if (this.headBobPosOffset) {
					// remember that on-screen y-coordinate decreases as we go
					// upward, and increases as we go downward, but the headbob
					// offset is defined as opposite(positive offset means head
					// goes up)
					bobCenterPosOffset = this.headBob.getPosOffset().y;
				} else {
					bobCenterPosOffset = 0;
				}
			
				// render the strip
				const verticalCenter = INTERNAL_HEIGHT / 2 +
						bobCenterPosOffset;
				this.backend.setFillColor(GREEN);
				if (firstBlockHitId == 2) {
					this.backend.setFillColor(RED);
				}
				//this.backend.fillRect(strip, verticalCenter - heightOnScreen / 2,
				//		1, heightOnScreen);
				const texSheet = this.blockMap.getTexSheet();
				const texCell = texSheet.getCell(firstBlockHitId);
				let srcX;
				let srcY;
				switch (sideOfWall) {
					case SIDE_NORTH:
						// avoid texture bleeding
						srcX = texCell.getX() + Math.floor(blocksToPixels(1.0 - (rayx - Math.floor(rayx))));
						srcY = texCell.getY();
						this.backend.renderTexture(texSheet.getTexture().getId(), strip,
								verticalCenter - heightOnScreen / 2, 1,
								heightOnScreen, srcX, srcY, 1, BLOCK_SIZE);
						break;
					case SIDE_SOUTH:
						// avoid texture bleeding
						srcX = texCell.getX() + Math.floor(blocksToPixels(rayx - Math.floor(rayx)));
						srcY = texCell.getY();
						this.backend.renderTexture(texSheet.getTexture().getId(), strip,
								verticalCenter - heightOnScreen / 2, 1,
								heightOnScreen, srcX, srcY, 1, BLOCK_SIZE);
						break;
					case SIDE_EAST:
						// avoid texture bleeding
						srcX = texCell.getX() + Math.floor(blocksToPixels(1.0 - (rayy - Math.floor(rayy))));
						srcY = texCell.getY();
						this.backend.renderTexture(texSheet.getTexture().getId(), strip,
								verticalCenter - heightOnScreen / 2, 1,
								heightOnScreen, srcX, srcY, 1, BLOCK_SIZE);
						break;
					case SIDE_WEST:
						// avoid texture bleeding
						srcX = texCell.getX() + Math.floor(blocksToPixels(rayy - Math.floor(rayy)));
						srcY = texCell.getY();
						this.backend.renderTexture(texSheet.getTexture().getId(), strip,
								verticalCenter - heightOnScreen / 2, 1,
								heightOnScreen, srcX, srcY, 1, BLOCK_SIZE);
						break;
				}
			}
		}
	}
	
	// render all the overlays
	for (let i = 0; i < this.overlays.length; i++) {
		let overlay = this.overlays[i];
		overlay.render(this.backend);
	}
};

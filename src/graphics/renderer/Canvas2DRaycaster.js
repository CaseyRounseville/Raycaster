import { INTERNAL_WIDTH, INTERNAL_HEIGHT } from "../backend/GraphicsBackend";

import { VISIBILITY, DIST_TO_PLANE } from "../Camera";

import { BLUE, GREEN, GRAY, RED } from "../util/Color";

import { Renderer } from "./Renderer";

import { equalsWithinTol } from "../../util/FloatUtil";

import { SIZE as BLOCK_SIZE } from "../../physics/block/Block";

// the tolerance of the ray's angle during raycasting calculations, in radians
const RAY_ANG_TOL = 0.00001;

Canvas2DRaycaster.prototype = Object.create(Renderer.prototype);
Canvas2DRaycaster.prototype.constructor = Canvas2DRaycaster;

export function Canvas2DRaycaster(backend) {
	Renderer.call(this);
	
	this.backend = backend;
	
	
};

Canvas2DRaycaster.prototype.setSkyBox = function() {
	Renderer.prototype.setSkyBox.call(this);
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
	this.backend.setFillColor(BLUE);
	this.backend.fillRect(0, 0, INTERNAL_WIDTH, INTERNAL_HEIGHT / 2);
	this.backend.setFillColor(GRAY);
	this.backend.fillRect(0, INTERNAL_HEIGHT / 2, INTERNAL_WIDTH, INTERNAL_HEIGHT / 2);
	
	// only render the blockmap if it exists
	if (this.blockMap) {
		console.log("rendering the block map");
		// render blockMap and billboards(need to do them at the same time)
		const camera = this.backend.getCamera();
		const camPos = camera.getPos();
		const camRot = camera.getRot();
		const mapWidth = this.blockMap.getWidth();
		const mapHeight = this.blockMap.getHeight();
		for (let strip = 0; strip < INTERNAL_WIDTH; strip++) {
			// keep track of our position on the map as we travel along this ray;
			// the ray originates at the camera's position
			let rayx = camPos.x;
			let rayy = camPos.y;

			// calculate the ray's angle with respect to the positive x-axis;
			// we will treat counter-clockwise rotation as positive;
			// remember that going "up" is actually in the decreasing y-direction
			const rayAng = camera.calcRayAng(strip);

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
			while (blocksTraveledX < VISIBILITY && blocksTraveledY < VISIBILITY) {
				// the grid lines to take the next wall query at
				let nextHorizLine = rayy;
				let nextVertLine = rayx;

				// keep track of what kind of wall he hit closest;
				// true means horizontal, false means vertical
				let horizWall;

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
				if (exactlyLeft || exactlyRight) {
					// we move in the x-direction only, so we leave rayy alone
					rayx = nextVertLine;
					horizWall = false;
				} else if (exactlyUp || exactlyDown) {
					// we move in the y-direction only, so we leave rayx alone
					rayy = nextHorizLine;
					horizWall = true;
				} else {
					// slope is rise over run, however we must invert the rise,
					// since the y-axis increases in the downward direction;
					// so, we take the negative rise over run
					const raySlope = -Math.tan(rayAng);

					// we know the ray passes through the camera's position, so
					// we have enough information to calculate a y-intercept;
					const rayIntercept = camPos.y - raySlope * camPos.x;

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
					const nextHorizLineDistX = nextHorizLineX - camPos.x;
					const nextHorizLineDistY = nextHorizLine - camPos.y;
					const nextHorizLineDist = Math.sqrt(nextHorizLineDistX *
							nextHorizLineDistX + nextHorizLineDistY *
							nextHorizLineDistY);

					const nextVertLineDistX = nextVertLine - camPos.x;
					const nextVertLineDistY = nextVertLineY - camPos.y;
					const nextVertLineDist = Math.sqrt(nextVertLineDistX *
							nextVertLineDistX + nextVertLineDistY *
							nextVertLineDistY);

					// if the distances are equal, we have found a corner;
					// in this case, we will arbitrarily choose the horizontal
					// line instersection
					if (nextHorizLineDist <= nextVertLineDist) {
						rayx = nextHorizLineX;
						rayy = nextHorizLine;
						horizWall = true;
					} else {
						rayx = nextVertLine;
						rayy = nextVertLineY;
						horizWall = false;
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
						if (horizWall) {
							gridRow = Math.floor(rayy) - 1;
							gridCol = Math.floor(rayx);
						} else {
							gridRow = Math.floor(rayy);
							gridCol = Math.floor(rayx);
						}
					} else if (rayAng < Math.PI) {
						// upper-left quadrant
						if (horizWall) {
							gridRow = Math.floor(rayy) - 1;
							gridCol = Math.floor(rayx);
						} else {
							gridRow = Math.floor(rayy);
							gridCol = Math.floor(rayx) - 1;
						}
					} else if (rayAng < 3 * Math.PI / 2) {
						// lower-left quadrant
						if (horizWall) {
							gridRow = Math.floor(rayy);
							gridCol = Math.floor(rayx);
						} else {
							gridRow = Math.floor(rayy);
							gridCol = Math.floor(rayx) - 1;
						}
					} else {
						// lower-right quadrant
						if (horizWall) {
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
					const collVal = this.blockMap.getCollData(gridRow,
							gridCol);
					if (collVal > 0) {
						firstBlockHitId = collVal;
						break;
					}
				}
			}

			// see if we need to render this strip
			if (firstBlockHitId > 0) {
				// we will use the perpendicular distance from the camera
				// position to the wall that was hit in our calculation of the
				// strip's height on the screen
				let trueDistX = Math.abs(camPos.x - rayx);
				let trueDistY = Math.abs(camPos.y - rayy);
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
			
				// render the strip
				const verticalCenter = INTERNAL_HEIGHT / 2;
				this.backend.setFillColor(GREEN);
				if (firstBlockHitId == 2) {
					this.backend.setFillColor(RED);
				}
				this.backend.fillRect(strip, verticalCenter - heightOnScreen / 2,
						1, heightOnScreen);
			}
		}
	}
	
	// render all the overlays
	for (let i = 0; i < this.overlays.length; i++) {
		let overlay = this.overlays[i];
		overlay.render(this.backend);
	}
};
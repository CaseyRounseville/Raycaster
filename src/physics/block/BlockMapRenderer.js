import * as Renderer from "../../graphics/Renderer";
import * as Camera from "../../graphics/Camera";

import * as Angle from "../Angle";

import * as GraphicsBackend from "../../graphics/backend/GraphicsBackend";

import * as Block from "./Block";

const wallCast = (self, backend, strip) => {
	let camera = backend.camera;
	let blockMap = self.blockMap;
	let blockData = blockMap.blockData;
	let blockSet = blockMap.blockSet;
	let mapWidth = blockMap.width;
	let mapHeight = blockMap.height;

	/* stuff for camera
	 * x:					x coord of eye
	 * y:					y coord of eye
	 * r:					rot of eye(center of view plane)
	 * h:					how tall is the player
	 */
	
	let x = camera.pos.x;
	let y = camera.pos.y;
	let r = camera.rot.v;
	let h = camera.height.v;

	/* stuff for walls
	 * x_:					x coord of intersection
	 * y_:					y coord of intersection
	 * x_Prev:				x coord of last checked intersection
	 * y_Prev:				y coord of last checked intersection
	 * dx_:					displacement between x_ and 
	 * dy_:					displacement between y_ and 
	 * xBlock_:				integer column on block map
	 * yBlock_:				integer row on block map
	 * perpDistToWall_:		to avoid fish bowl effect
	 * distToWall_:			euclidean distance to wall
	 * blockType_:			to get block from block set
	 * hitWall_:			has the ray hit a solid wall yet?
	 * renderWall_:			should this wall be rendered?
	 */

	// stuff for horizontal walls
	let xHoriz = 0;
	let yHoriz = 0;
	let xHorizPrev = x;
	let yHorizPrev = y;
	let dxHoriz = 0;
	let dyHoriz = 0;
	let xBlockHoriz = 0;
	let yBlockHoriz = 0;
	let perpDistToWallHoriz = 0;
	let distToWallHoriz = 0;
	let blockTypeHoriz = Block.CLEAR;
	let hitWallHoriz = false;
	let renderWallHoriz = false;
	
	// stuff for vertical walls
	let xVert = 0;
	let yVert = 0;
	let xVertPrev = x;
	let yVertPrev = y;
	let dxVert = 0;
	let dyVert = 0;
	let xBlockVert = 0;
	let yBlockVert = 0;
	let perpDistToWallVert = 0;
	let distToWallVert = 0;
	let blockTypeVert = Block.CLEAR;
	let hitWallVert = false;
	let renderWallVert = false;

	// how tall the wall is on screen, in pixels
	let projWallHeight = 0;

	// to limit how far the rays can cast
	let iterations = 0;
	
	while (!hitWallVert && !hitWallHoriz && iterations < Camera.VISIBILITY) {
		if (r < 90) {
			/* quadrant i						
			 * +---------------+---------------+
			 * |               |               |
			 * |               |               |
			 * |               |    /          |
			 * |               |   /           |
			 * |               |  /            |
			 * |               | /             |
			 * |--------------|@|--------------|
			 * |               |               |
			 * |               |               |
			 * |               |               |
			 * |               |               |
			 * |               |               |
			 * |               |               |
			 * +---------------+---------------+
			 */
			
			
			// y block is same as integer part of y
			xVert = Math.ceil(xVertPrev);
			dxVert = xVert - xVertPrev;
			
			yVert = Math.tan(r) * xVert;
			dyVert = yVertPrev - yVert;// is it necessary to make positive?
			

			// add to distances to wall
			distToWallVert += Math.sqrt(dxVert * dxVert + dyVert * dyVert);
			perpDistToWallVert += dxVert;// this doesn't work in most cases; have to do some trig
			xBlockVert = xVert;
			yBlockVert = Math.floor(yVert);
			blockTypeVert = blockData[yBlockVert * mapWidth + xBlockVert];

			if (blockTypeVert != 0) {
				hitWallVert = true;
			}
			
			// x block is same as integer part of x
			yHoriz = Math.floor(yHorizPrev);
			xBlockHoriz = 
			dyHoriz = y - yHoriz;
			distToWallHoriz = dyHoriz / Math.sin(r);
			
			if () {
				
			}
			
			if (distToWallVert < distToWallHoriz) {
				// vertical wall is closer
				
			} else {
				// horizontal wall is closer
			}
		} else if (r < 180) {
			/* quadrant ii						
			 * +---------------+---------------+
			 * |               |               |
			 * |               |               |
			 * |          \    |               |
			 * |           \   |               |
			 * |            \  |               |
			 * |             \ |               |
			 * |--------------|@|--------------|
			 * |               |               |
			 * |               |               |
			 * |               |               |
			 * |               |               |
			 * |               |               |
			 * |               |               |
			 * +---------------+---------------+
			 */

			xVert = Math.floor(xVertPrev);
			dxVert = xVertPrev - xVert;
			
			yHoriz = Math.floor(yHorizPrev);
			dyHoriz = yHorizPrev - yHoriz;

			// add to distances to wall
			distToWallVert += Math.sqrt(dxVert * dxVert + dyVert * dyVert);
			distToWallHoriz += Math.sqrt(dxHoriz * dxHoriz + dyHoriz * dyHoriz);
			
			distToWallHoriz
		} else if (r < 270) {
			/* quadrant iii						
			 * +---------------+---------------+
			 * |               |               |
			 * |               |               |
			 * |               |               |
			 * |               |               |
			 * |               |               |
			 * |               |               |
			 * |--------------|@|--------------|
			 * |             / |               |
			 * |            /  |               |
			 * |           /   |               |
			 * |          /    |               |
			 * |               |               |
			 * |               |               |
			 * +---------------+---------------+
			 */
			xVert = Math.floor(xVertPrev);
			dxVert = xVertPrev - xVert;

			yHoriz = Math.ceil(yHorizPrev);
			dyHoriz = yHoriz - yHorizPrev;			
			
		} else {
			/* quadrant iv						
			 * +---------------+---------------+
			 * |               |               |
			 * |               |               |
			 * |               |               |
			 * |               |               |
			 * |               |               |
			 * |               |               |
			 * |--------------|@|--------------|
			 * |               | \             |
			 * |               |  \            |
			 * |               |   \           |
			 * |               |    \          |
			 * |               |               |
			 * |               |               |
			 * +---------------+---------------+
			 */
			xVert = Math.ceil(xVertPrev);
			dxVert = xVert - xVertPrev;

			yHoriz = Math.ceil(yHorizPrev);
			dyHoriz = yHoriz - yHorizPrev;			
			
		}

		distToWallVert += Math.sqrt(dxVert * dxVert + dyVert * dyVert);
		distToWallHoriz += Math.sqrt(dxHoriz * dxHoriz + dyHoriz * dyHoriz);
		
		xVertPrev = xVert;
		yVertPrev = yVert;

		xHorizPrev = xHoriz;
		yHorizPrev = yHoriz;
		
		iterations++;
	}

	// which wall to render?
	if (hitWallVert && hitWallHoriz) {
		// hit both; which on is closer?
		if (perpDistToWallVert < perpDistToWallHoriz) {
			renderWallVert = true;
			renderWallHoriz = false;
		} else {
			renderWallVert = false;
			renderWallHoriz = true;
		}
	} else if (hitWallVert) {
		// hit vert
		renderWallVert = true;
		renderWallHoriz = false;
	} else if (hitWallHoriz) {
		// hit horiz
		renderWallVert = false;
		renderWallHoriz = true;
	} else {
		// hit neither; went past visibility
		renderWallVert = false;
		renderWallHoriz = false;
	}

	// calculate projected wall height
	if (renderWallVert) {
		projWallHeight = Camera.DIST_TO_PLANE / perpDistToWallVert * Block.SIZE;
	} else {
		projWallHeight = Camera.DIST_TO_PLANE / perpDistToWallHoriz * Block.SIZE;
	}

	// render strip
	
};

const floorCast = (self, backend, strip, perpDistToWall) => {
	let camera = backend.camera;
	let blockMap = self.blockMap;
};

const ceilingCast = (self, backend, strip, perpDistToWall) => {
	let camera = backend.camera;
	let blockMap = self.blockMap;
};

const render = (self, backend) => {
	let camera = backend.camera;
	let r = camera.rot.v;
	
	//let ang = Angle.wrapFull(r - FOV / 2);
	
	for (let strip = 0; strip < GraphicsBackend.INTERNAL_WIDTH; strip++) {
		let perpDistToWall = wallCast(self, backend, strip);
		floorCast(self, backend, strip, perpDistToWall);
		ceilingCast(self, backend, strip, perpDistToWall);
		
	}
};

const create = (blockMap) => {
	let self = Renderer.create(render);
	
	self.blockMap = blockMap;
	
	return self;
};

export default {
	create
};

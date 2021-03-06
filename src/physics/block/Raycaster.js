/* result = {
 *     wallHeight
 *     blockValue
 *     N, S, E, or W
 *     texel
 * }
 */
const wallCast = (res, camera, blockData, strip) => {
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
			perpDistToWallVert += dxVert;

			// get block from map
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
			nx = Math.floor(x);
			ny = Math.floor(y);
			
			
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
			 nx = Math.floor(x);
			 ny = Math.ceil(y);
			
			
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
			nx = Math.ceil(x);
			ny = Math.ceil(y);
			
			
		}
		
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
};

/* result = {
 *     
 * }
 */
const floorCast = (floorCastRes, camera, strip, row) => {
	/* stuff for camera
	 * x
	 * y
	 * r
	 * h
	 */
	let x = camera.pos.x;
	let y = camera.pos.y;
	let r = camera.rot.v;
	let h = camera.height.v;
	
	/* floor stuff
	 * 
	 */
	let xFloor = 0;
	let yFloor = 0;
	let xTexel = 0;
	let yTexel = 0;
	let blockValue = 0;

	h/rowAboveGround = pdist2tex/distToPlane
};

const ceilCast = (camera, wallCastRes) => {
	/* stuff for camera
	 * x
	 * y
	 * r
	 * h
	 */
	let x = camera.pos.x;
	let y = camera.pos.y;
	let r = camera.rot.v;
	let h = camera.pos.h;
};

/* res {
 *     x:		intersection x
 *     y:		intersection y
 *     euc:		euclidean dist
 *     perp:	perpendicular dist(write to cam zbuf)
 * }
 * returns boolean(was there a wall in range?)
 * */
const findWallHoriz = (x, y, r, res) => {
	let hitWall = false;
	let dx = 0;
	let dy = 0;
	let deuc = 0;
	let dperp = 0;

	if (r < Math.PI / 2) {
		// going up and right
		let dx = 
		while (!hitWall) {
			if (Number.isInteger(y)) {
				y -= 1;
			} else {
				y = Math.floor(y);
			}
		}
	} else if (r == Math.PI / 2) {
	
	} else if (r < Math.PI) {
		// going down
		while (!hitWall) {
			
		}
	} else if (r == Math.PI) {

	} else if (r < 3 * Math.PI / 2) {
	} else if (r == 3 * Math.PI / 2) {
	} else {
		// going straight right
		return false;
	}
};

const findWallVert = (x, y, r, res) => {
	let hitWall = false;
	let dx = 0;
	let dy = 0;
	let deuc = 0;
	let dperp = 0;
	
	let euc = 0;
	let perp = 0;

	if (r < Math.PI / 2) {
		dx = Math.ceil(x) - x;
		dy = // trig stuff
		while (!hitWall) {
			deuc = Math.sqrt(dx * dx + dy * dy);
			dperp = deuc * Math.cos(r);
			
		}
	}
};

export default {
	wallCast,
	floorCast,
	ceilCast
};

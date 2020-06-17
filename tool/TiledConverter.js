const fs = require("fs");

const BLOCK_SIZE = 32;

/**
 * Extract the skybox from the exported json from the tiled map editor.
 *
 * Parameters:
 * tiledObj -- The json exported by tiled, stored as a javascript object.
 *
 * Returns:
 * The extracted skybox object.
 */
function extractSkyBox(tiledObj) {
	const skyBox = {
		version:	0,
		texId:		"FIXME AGAIN"
	};

	return skyBox;
}

/**
 * Extract the block map from the exported json from the tiled map editor.
 *
 * Parameters:
 * tiledObj -- The json exported by tiled, stored as a javascript object.
 *
 * Returns:
 * The extracted block map object.
 */
function extractBlockMap(tiledObj) {
	const blockMap = {
		version:	0,
		width:		tiledObj.width,
		height:		tiledObj.height,
		texId:		undefined,
		northData:	undefined,
		southData:	undefined,
		eastData:	undefined,
		westData:	undefined,
		flatData:	undefined,
		heightData:	undefined,
		collData:	undefined
	};

	// we need to loop over each custom property of the map, and pull out the
	// texId property
	tiledObj.properties.forEach(propertyObj => {
		if (propertyObj.name == "texId") {
			blockMap.texId = propertyObj.value;
		}
	});

	// we need to loop over each layer, and pull out the data from the ones we
	// are looking for
	tiledObj.layers.forEach(layer => {
		const augmentedLayerName = layer.name + "Data";
		if (augmentedLayerName in blockMap) {
			blockMap[augmentedLayerName] = layer.data;
		}
	});

	// make sure we found all the required properties in the map
	for (const propertyName in blockMap) {
		if (blockMap[propertyName] == undefined) {
			throw new Error("block map missing property " + propertyName);
		}
	}

	// now, we need to decrement each non-zero tile value by one, since the
	// tiled map editor counts zero as "no tile", and starts tile indices at
	// one instead of zero
	for (let row = 0; row < blockMap.height; row++) {
		for (let col = 0; col < blockMap.width; col++) {
			const cell = row * blockMap.width + col;
			if (blockMap.northData[cell] > 0)	blockMap.northData[cell]--;
			if (blockMap.southData[cell] > 0)	blockMap.southData[cell]--;
			if (blockMap.eastData[cell] > 0)	blockMap.eastData[cell]--;
			if (blockMap.westData[cell] > 0)	blockMap.westData[cell]--;
			if (blockMap.flatData[cell] > 0)	blockMap.heightData[cell]--;
			if (blockMap.heightData[cell] > 0)	blockMap.heightData[cell]--;
			if (blockMap.collData[cell] > 0)	blockMap.collData[cell]--;
		}
	}

	return blockMap;
}

/**
 * Extract the protoactors from the exported json from the tiled map editor.
 *
 * Parameters:
 * tiledObj -- The json exported by tiled, stored as a javascript object.
 *
 * Returns:
 * The extracted protoactors.
 */
function extractProtoActors(tiledObj) {
	// find the actors layer in the tiled map editor exported json
	let actorsLayer;
	tiledObj.layers.forEach(layer => {
		if (layer.name == "actors") {
			actorsLayer = layer;
		}
	});

	// extract each protoactor, which are "objects" in the tiled map editor
	const protoActors = [];
	actorsLayer.objects.forEach(object => {
		// extract all the information about the actor, except the
		// initialization arguments for now
		const protoActor = {
			room:		0,
			type:		object.type,
			x:			object.x,
			y:			object.y,
			arg:		{}
		};

		// extract the initialization arguments
		if (!("properties" in object)) {
			throw new Error("initialization arguments missing from actor");
		}
		object.properties.forEach(property => {
			protoActor.arg[property.name] = property.value;
		});

		// we need to divide the actor's x and y coordinates by the block size
		// in order to convert from pixels to blocks, since the tiled map
		// editor specifies object positions in terms of pixels, not blocks
		protoActor.x /= BLOCK_SIZE;
		protoActor.y /= BLOCK_SIZE;

		protoActors.push(protoActor);
	});

	return {
		version:	0,
		cast:		protoActors
	};
}

/**
 * Extract the entrances from the exported json from the tiled map editor.
 *
 * Parameters:
 * tiledObj -- The json exported by tiled, stored as a javascript object.
 *
 * Returns:
 * The extracted entrances.
 */
function extractEntrances(tiledObj) {
	// find the entrances layer in the tiled map editor exported json
	let entrancesLayer;
	tiledObj.layers.forEach(layer => {
		if (layer.name == "entrances") {
			entrancesLayer = layer;
		}
	});

	// extract each entrance
	const entrances = [];
	entrancesLayer.objects.forEach(object => {
		// extract all the information about the entrance, except the
		// initialization arguments for now
		const entrance = {
			room:		0,
			type:		object.type,
			x:			object.x,
			y:			object.y,
			arg:		{}
		};

		// extract the initialization arguments
		if (!("properties" in object)) {
			throw new Error("missing properties from entrance");
		}
		object.properties.forEach(property => {
			entrance.arg[property.name] = property.value;
		});

		// we need to divide the entrance's x and y coordinates by the block
		// size in order to convert from pixels to blocks, since the tiled map
		// editor specifies object positions in terms of pixels, not blocks
		entrance.x /= BLOCK_SIZE;
		entrance.y /= BLOCK_SIZE;

		entrances.push(entrance);
	});

	return {
		version:	0,
		cast:		entrances
	};
}

/**
 * Extract the block map, protoactors, and entrances from the output file of
 * the tiled map editor, and write each of these to the specified files.
 *
 * Parameters:
 * tiledPath -- The path to the json exported from the tiled map editor.
 * blockMapPath -- The path where to write the extracted block map.
 * protoActorsPath -- The path where to write the extracted protoactors.
 * entrancesPath -- The path where to write the extracted entrances.
 *
 * Returns:
 * None.
 */
function main(tiledPath, blockMapPath, protoActorsPath, entrancesPath) {
	// load the output of the tiled map editor, in json format, into a
	// javascript object
	const tiledObj = JSON.parse(fs.readFileSync(tiledPath), "utf8");

	// extract each needed component from the tiled object, but do not write
	// anything yet
	const blockMapObj = extractBlockMap(tiledObj);
	const protoActorsObj = extractProtoActors(tiledObj);
	const entrancesObj = extractEntrances(tiledObj);

	// write the extracted objects to their appropriate files
	fs.writeFileSync(blockMapPath, JSON.stringify(blockMapObj), "utf8");
	fs.writeFileSync(protoActorsPath, JSON.stringify(protoActorsObj), "utf8");
	fs.writeFileSync(entrancesPath, JSON.stringify(entrancesObj), "utf8");
}

// command line arguments
// argv[0] -- The name of the executable "node".
// argv[1] -- The path to this script file.
// argv[2] -- The path to the json exported from the tiled map editor.
// argv[3] -- The path where to write the extracted block map.
// argv[4] -- The path where to write the extracted protoactors.
// argv[5] -- The path where to write the extracted entrances.
const tiledPath = process.argv[2];
const blockMapPath = process.argv[3];
const protoActorsPath = process.argv[4];
const entrancesPath = process.argv[5];
main(tiledPath, blockMapPath, protoActorsPath, entrancesPath);

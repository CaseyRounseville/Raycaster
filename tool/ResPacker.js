const fs = require("fs");
const path = require("path");

/*
const packRes = (resIndex, srcDirName, DestDirName, fileNames) => {
	let resObj = {
		textures: []
	};
	fileNames.forEach((fileName) => {
		if (fileName == "index.json") {
			// skip
		} else if (fileName.endsWith("png")) {
			let b64Str = "data:image/png;base64," + fs.readFileSync(srcDirName + "\\" + fileName).toString("base64");
			let id = findTexId(fileName);
			resObj.textures.push({
				id,
				data: b64Str
			});
		}
	});
	fs.writeFileSync(destDirName + "\\" + srcDirName.substring(srcDirName.lastIndexOf("\\") + 1) + ".json", JSON.stringify(resObj), "utf8");
};

// find the id of the texture with the given file name
const findTexId = (resIndex, fileName) => {
	let id = "OH SHIT NOT FOUND";
	resIndex.textures.forEach((tex) => {
		if (tex.file.valueOf() === fileName.valueOf()) {
			id = tex.id;
		}
	});
	return id;
};*/

/**
 * Pack the textures in the resource index into the output object.
 *
 * Parameters:
 * resIndex -- The resource index of a directory.
 * srcDirName -- The name of the source resource directory.
 * outObj -- The output object to pack the textures into.
 *
 * Returns:
 * Nothing.
 */
const packTextures = (resIndex, srcDirName, outObj) => {
	outObj.textures = [];
	resIndex.textures.forEach((texObj) => {
		outObj.textures.push({
			id: texObj.id,
			data: "data:image/png;base64," + fs.readFileSync(srcDirName +
					path.sep + texObj.file).toString("base64")
		});
	});
};

/**
 * Pack the scenes in the resource index into the output object.
 *
 * Parameters:
 * resIndex -- The resource index of a directory.
 * srcDirName -- The name of the source resource directory.
 * outObj -- The output object to pack the scenes into.
 *
 * Returns:
 * Nothing.
 */
const packScenes = (resIndex, srcDirName, outObj) => {
	outObj.scenes = [];
	resIndex.scenes.forEach((sceneObj) => {
		// read in the initial data from the scene file;
		// this data contains the file names we need in order to obtain the
		// actual data for the scene
		const packedScene = {
			id: sceneObj.id,
			data: JSON.parse(fs.readFileSync(srcDirName + path.sep +
					sceneObj.file, "utf8"))
		};

		// load the block map, actors, and entrances data from the appropriate
		// files, and pack them into the scene data
		packedScene.data.blockMap = JSON.parse(fs.readFileSync(srcDirName +
				path.sep + packedScene.data.blockMapFile));
		packedScene.data.actors = JSON.parse(fs.readFileSync(srcDirName +
				path.sep + packedScene.data.actorsFile));
		packedScene.data.entrances = JSON.parse(fs.readFileSync(srcDirName +
				path.sep + packedScene.data.entrancesFile));

		// we don't need those file names in the scene object anymore, so we
		// can safely remove them so they don't appear in the packed scene
		delete packedScene.data.sceneSrcFile;
		delete packedScene.data.blockMapFile;
		delete packedScene.data.actorsFile;
		delete packedScene.data.entrancesFile;

		outObj.scenes.push(packedScene);
	});
};

// command line arguments
// argv[0] -- The name of the executable "node".
// argv[1] -- The path to this script file.
// argv[2] -- The path of the source directory.
// argv[3] -- The path of the destination directory.

// we will go ahead and normalize the paths, in order to avoid issues related
// to forward slash vs back slash for separators
let srcDirName = path.normalize(process.argv[2]);
let destDirName = path.normalize(process.argv[3]);

// read the index file in the source directory
let resIndex = {};
resIndex = JSON.parse(fs.readFileSync(srcDirName + path.sep + "index.json",
		"utf8"));
//console.log("tex: " + resIndex.textures);
//console.log(JSON.stringify(resIndex));

// create the output object, empty initially
const outObj = {};

// pack the textures
packTextures(resIndex, srcDirName, outObj);

// pack the scenes
packScenes(resIndex, srcDirName, outObj);

// get a list of the files in the source directory, and then pack them
//let fileNames = fs.readdirSync(srcDirName);
//console.log(JSON.stringify(fileNames));
//packRes(fileNames);

// write the output object to the pack file
fs.writeFileSync(destDirName + path.sep +
		srcDirName.substring(srcDirName.lastIndexOf(path.sep) + 1) + ".json",
		JSON.stringify(outObj), "utf8");

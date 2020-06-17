const fs = require("fs");
const childProcess = require("child_process");

/**
 * Initialize an index scene entry. This is the kind of objects returned by the
 * extractScenes function.
 *
 * Parameters:
 * id -- The id of the scene.
 * file -- The path to the scene file, relative to the resource folder that the
 * scene is in.
 *
 * Returns:
 * Nothing.
 */
function IndexSceneEntry(id, file) {
	this.id = id;
	this.file = file;
}

/**
 * Load the index from the specied resource folder. The index file is named
 * index.json.
 *
 * Parameters:
 * resFolderPath -- The path to the folder containing the index file.
 *
 * Returns:
 * The index object.
 */
function loadIndex(resFolderPath) {
	return JSON.parse(fs.readFileSync(resFolderPath + "\\" + "index.json",
			"utf8"));
}

/**
 * Load the specified scene from a json file into an object.
 *
 * Parameters:
 * resFolderPath -- The path to the resource folder containing the scene.
 * scenePath -- The path to the scene file, relative to the resouce folder.
 *
 * Returns:
 * The scene object.
 */
function loadScene(resFolderPath, scenePath) {
	return JSON.parse(fs.readFileSync(resFolderPath + "\\" + scenePath,
			"utf8"));
}

/**
 * Return an array of the scene entries found in the given index.
 *
 * Parameters:
 * indexObj -- An in-memory representation of the information in a resource's
 * index file.
 *
 * Returns:
 * An array of the scene entries found in the given index.
 */
function extractSceneEntries(indexObj) {
	const sceneEntries = [];
	indexObj.scenes.forEach(sceneEntry => {
		sceneEntries.push(new IndexSceneEntry(sceneEntry.id, sceneEntry.file));
	});
	return sceneEntries;
}

/**
 * Convert the data living in the sceneSrcFile into other files(the block map,
 * actors, and entrances files) that will later be packed into one big scene
 * file. This is so the sceneSrcFile can be edited with a third party existing
 * tool, such as tiled map editor, and the relevant data can be extracted and
 * converted from that.
 *
 * Parameters:
 * resFolderPath -- The path to the resource folder containing the scene.
 * sceneEntry -- The entry object from the resource index.
 *
 * Returns:
 * Nothing.
 */
function convertScene(resFolderPath, sceneEntry) {
	// load the scene file, and determine where we will save the block map,
	// actors list, and entrances list after they are extracted and converted
	const sceneObj = loadScene(resFolderPath, sceneEntry.file);
	const sceneSrcPath = resFolderPath + "\\" + sceneObj.sceneSrcFile;
	const blockMapPath = resFolderPath + "\\" + sceneObj.blockMapFile;
	const actorsPath = resFolderPath + "\\" + sceneObj.actorsFile;
	const entrancesPath = resFolderPath + "\\" + sceneObj.entrancesFile;

	// spawn a child nodejs process to convert the scene;
	// note that this is a separate process, and the current(parent) process
	// will not wait for it to complete
	childProcess.fork("./tool/TiledConverter.js", [sceneSrcPath, blockMapPath,
			actorsPath, entrancesPath]);
}

/**
 * Convert each scene in the specified resource group. This will involve
 * reading that resource group's index to determine what scenes are in that
 * group. Then, the scene file for each scene will be read to determine the
 * source file to use for the conversion. For example, this could be a file
 * produced by the tiled map editor.
 *
 * Parameters:
 * resFolderPath -- The path to a resource folder, containing an index.json
 * file.
 *
 * Returns:
 * Nothing.
 */
function main(resFolderPath) {
	// load the index
	const indexObj = loadIndex(resFolderPath);

	// extract the scene entries from the index
	const sceneEntries = extractSceneEntries(indexObj);

	// convert each scene
	sceneEntries.forEach(sceneEntry => {
		convertScene(resFolderPath, sceneEntry);
	});
}

// command line arguments
// argv[0] -- The name of the executable "node".
// argv[1] -- The path to this script file.
// argv[2] -- The path of a resource folder, containing an index.json file
const resFolderPath = process.argv[2];
main(resFolderPath);

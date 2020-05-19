const fs = require("fs");

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
					"\\" + texObj.file).toString("base64")
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
		outObj.scenes.push({
			id: sceneObj.id,
			data: fs.readFileSync(srcDirName + "\\" + sceneObj.file, "utf8")
		});
	});
};

// command line arguments
// argv[0] -- The name of the executable "node".
// argv[1] -- The path to this script file.
// argv[2] -- The path of the source directory.
// argv[3] -- The path of the destination directory.
let srcDirName = process.argv[2];
let destDirName = process.argv[3];

console.log("dest dir is" + destDirName);

// read the index file in the source directory
let resIndex = {};
resIndex = JSON.parse(fs.readFileSync(srcDirName + "\\" + "index.json", "utf8"));
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
fs.writeFileSync(destDirName + "\\" + srcDirName.substring(srcDirName.lastIndexOf("\\") + 1) + ".json", JSON.stringify(outObj), "utf8");

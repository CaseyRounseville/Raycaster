import { ResourceBackend } from "./ResourceBackend";

import { Resource } from "../Resource";

import { regProtoScene, unregProtoScene } from "../../scene/SceneLoader";

//import * as GraphicsBackend from "../../graphics/backend/GraphicsBackend";

/*import * as AnimationLoader from "../../graphics/animation/AnimationLoader";

import * as BlockMapLoader from "../../physics/block/BlockMapLoader";
import * as BlockSetLoader from "../../physics/block/BlockSetLoader";*/

import * as IOUtil from "../../util/IOUtil";

import { globalCtxt } from "../../main/GlobalContext";

DefaultResourceBackend.prototype = Object.create(ResourceBackend.prototype);
DefaultResourceBackend.prototype.constructor = DefaultResourceBackend;

export function DefaultResourceBackend() {
	ResourceBackend.call(this);
}

DefaultResourceBackend.prototype.loadResource = function(id) {
	const resObj = JSON.parse(IOUtil.readFileFromNetwork(
			globalCtxt.resBaseUrl + "res/packed/" + id + ".json"));
	const res = new Resource();
	
	// textures
	const graphicsBackend = globalCtxt.graphicsBackend;
	resObj.textures.forEach((texObj) => {
		const texId = texObj.id;
		const b64 = texObj.data;
		graphicsBackend.loadTexture(texId, b64);
		res.texIds.push(texId);
	});

	// scenes
	resObj.scenes.forEach((sceneSrcObj) => {
		const sceneId = sceneSrcObj.id;
		const protoScene = JSON.parse(sceneSrcObj.data);
		regProtoScene(sceneId, protoScene);
		res.sceneIds.push(sceneId);
	});
	
	this.idToRes[id] = res;
};

DefaultResourceBackend.prototype.destroyResource = function(id) {
	const res = idToRes[id];
	
	// textures
	const graphicsBackend = globalCtxt.graphicsBackend;
	res.texIds.forEach((texId) => {
		graphicsBackend.destroyTexture(texId);
	});

	// scenes
	res.sceneIds.forEach((sceneID) => {
		unregProtoScene(sceneId);
	});
	
	delete idToRes[id];
};

import { ResourceBackend } from "./ResourceBackend";

import { Resource } from "../Resource";

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
  const resObj = JSON.parse(IOUtil.readFileFromNetwork(globalCtxt.resBaseUrl + "res/packed/" + id + ".json"));
  const res = new Resource();
  
  // textures
  const graphicsBackend = globalCtxt.graphicsBackend;
  resObj.textures.forEach((texObj) => {
    const texId = texObj.id;
    const b64 = texObj.data;
    graphicsBackend.loadTexture(texId, b64);
    res.texIds.push(texId);
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
  
  delete idToRes[id];
};
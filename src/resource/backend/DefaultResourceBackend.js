import ResourceBackend from "./ResourceBackend";

import * as GraphicsBackend from "../../graphics/backend/GraphicsBackend";

import * as AnimationLoader from "../../graphics/animation/AnimationLoader";

import * as BlockMapLoader from "../../physics/block/BlockMapLoader";
import * as BlockSetLoader from "../../physics/block/BlockSetLoader";

import * as IOUtil from "../../util/IOUtil";
import * as Keeper from "../../util/Keeper";

import * as GlobalContext from "../../main/GlobalContext";

const loadResource = (self, resName) => {
  let resObj = IOUtil.readFileFromNetwork(GlobalContext.resBaseUrl + "/" + resName);
};

const destroyResource = (self, resName) => {
  
};

export const create = () => {
  let self = ResourceBackend.create(loadResource, destroyResource);
  
  self.resKeeper = Keeper.create(100);
  
  return self;
};
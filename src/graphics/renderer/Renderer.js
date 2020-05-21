import * as ArrayUtil from "../../util/ArrayUtil";

import { Vector1 } from "../../physics/Vector1";
import { Vector2 } from "../../physics/Vector2";

export function Renderer() {
  this.billboards = [];
  this.overlays = [];
  this.blockMap = undefined;
  this.skyBox = undefined;
  this.headBob = undefined;
  this.headBobPosOffset = new Vector2(0, 0);
  this.headBobAngOffset = new Vector1(0);
}

Renderer.prototype.registerBillboard = function(billboard) {
  this.billboards.push(billboard);
};

Renderer.prototype.unregisterBillboard = function(billboard) {
  ArrayUtil.remove(this.billboards, billboard);
};

Renderer.prototype.registerOverlay = function(overlay) {
  this.overlays.push(overlay);
};

Renderer.prototype.unregisterOverlay = function(overlay) {
  ArrayUtil.remove(this.overlays, overlay);
};

Renderer.prototype.setSkyBox = function(skyBox) {
  this.skyBox = skyBox;
}

Renderer.prototype.setHeadBob = function(headBob) {
  this.headBob = headBob;
}

/* to be implemented in Renderer implementations
Renderer.prototype.registerBlockMap = function(blockMap) {
  
};

Renderer.prototype.unregisterBlockMap = function(blockMap) {
  
};*/
import * as ArrayUtil from "../../util/ArrayUtil";

export function Renderer() {
  this.billboards = [];
  this.overlays = [];
  this.blockMap = undefined;
  this.skyBox = undefined;
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

/* to be implemented in Renderer implementations
Renderer.prototype.registerBlockMap = function(blockMap) {
  
};

Renderer.prototype.unregisterBlockMap = function(blockMap) {
  
};*/
import { Canvas2DGraphicsBackend } from "../backend/Canvas2DGraphicsBackend";

import { Renderer } from "./Renderer";

Canvas2DRaycaster.prototype = Object.create(Renderer.prototype);
Canvas2DRaycaster.prototype.constructor = Canvas2DRaycaster;

export function Canvas2DRaycaster() {
  Renderer.call(this);
  
  this.backend = new Canvas2DGraphicsBackend();
  
  
}

Canvas2DRaycaster.prototype.setSkyBox = function() {
  Renderer.prototype.setSkyBox.call(this);
};

Canvas2DRaycaster.prototype.setBlockMap = function() {
  Renderer.prototype.setBlockMap.call(this);
};

Canvas2DRaycaster.prototype.registerBillboard = function(billboard) {
  Renderer.prototype.registerBillboard.call(this, billboard);
};

Canvas2DRaycaster.prototype.unregisterBillboard = function(billboard) {
  Renderer.prototype.unregisterBillboard.call(this, billboard);
};

Canvas2DRaycaster.prototype.registerOverlay = function(overlay) {
  Renderer.prototype.registerOverlay.call(this, overlay);
};

Canvas2DRaycaster.prototype.unregisterOverlay = function(overlay) {
  Renderer.prototype.unregisterOverlay.call(this, overlay);
};

Canvas2DRaycaster.prototype.render = function() {
  
};
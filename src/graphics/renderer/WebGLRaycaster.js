import { WebGLGraphicsBackend } from "../backend/WebGLGraphicsBackend";

import { Renderer } from "./Renderer";

WebGLRaycaster.prototype = Object.create(Renderer.prototype);
WebGLRaycaster.prototype.constructor = WebGLRaycaster;

export function WebGLRaycaster() {
  Renderer.call(this);
  
  this.backend = new WebGLGraphicsBackend();
}

WebGLRaycaster.prototype.setSkyBox = function() {
  Renderer.prototype.setSkyBox.call(this);
};

WebGLRaycaster.prototype.setBlockMap = function() {
  Renderer.prototype.setBlockMap.call(this);
};

WebGLRaycaster.prototype.registerBillboard = function(billboard) {
  Renderer.prototype.registerBillboard.call(this, billboard);
};

WebGLRaycaster.prototype.unregisterBillboard = function(billboard) {
  Renderer.prototype.unregisterBillboard.call(this, billboard);
};

WebGLRaycaster.prototype.registerOverlay = function(overlay) {
  Renderer.prototype.registerOverlay.call(this, overlay);
};

WebGLRaycaster.prototype.unregisterOverlay = function(overlay) {
  Renderer.prototype.unregisterOverlay.call(this, overlay);
};

WebGLRaycaster.prototype.render = function() {
  
};
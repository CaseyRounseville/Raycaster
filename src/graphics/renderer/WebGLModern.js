import { WebGLGraphicsBackend } from "../backend/WebGLGraphicsBackend";

import { Renderer } from "./Renderer";

WebGLModern.prototype = Object.create(Renderer.prototype);
WebGLModern.prototype.constructor = WebGLModern;

export function WebGLModern() {
  Renderer.call(this);
  
  this.backend = new WebGLGraphicsBackend();
  
  this.blockMapMeshId = 0;
}

WebGLModern.prototype.setSkyBox = function() {
  
};

WebGLModern.setBlockMap = function(blockMap) {
  Renderer.prototype.setBlockMap.call(this, blockMap);
  
  // generate mesh
  // register mesh with backend,
  // unless !map, then unregister
  // current map
  if (blockMap) {
    const mesh = blockMap.generateMesh();
    this.blockMapMeshId = this.backend.registerMesh();
  } else {
    this.backend.unregisterMesh(this.blockMapMeshId);
  }
};

WebGLModern.prototype.registerBillboard = function(billboard) {
  Renderer.prototype.registerBillboard.call(this, billboard);
  
  // stuff with backend to set up billboard
};

WebGLModern.prototype.unregisterBillboard = function(billboard) {
  Renderer.prototype.unregisterBillboard.call(this, billboard);
};

WebGLModern.prototype.registerOverlay = function(overlay) {
  Renderer.prototype.registerOverlay.call(this, overlay);
};

WebGLModern.prototype.unregisterOverlay = function(overlay) {
  Renderer.prototype.unregisterOverlay.call(this, overlay);
};

WebGLModern.prototype.render = function() {
  // other webgl stuff
  // ...
  
  // overlays
  this.overlays.forEach((overlay) => {
    overlay.render(this);
  });
  
  // drawarrays or some other webgl function
  // ...
};
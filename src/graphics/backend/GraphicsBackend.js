import * as ArrayUtil from "../../util/ArrayUtil";

export const INTERNAL_WIDTH = 320;
export const INTERNAL_HEIGHT = 240;

// camera needs to be imported after the internal width and height are defined,
// since graphics backend and camera depend cyclically on each other
import { Camera } from "../Camera";

/*export const create = (fillRect,
                       clearScreen,
                       renderTexture,
                       loadTexture,
                       getTexture,
                       destroyTexture,
                       getFillColor,
                       setFillColor,
                       setBlockMap,
                       destroy) => {
	return {
		renderers: [],
    billboards: [],
    blockMap: undefined,
		idToTexture: [],
		camera: Camera.create(),
		
		render,
		
		fillRect,
		clearScreen,
		renderTexture,
		loadTexture,
		getTexture,
		destroyTexture,
		getFillColor,
		setFillColor,
    setBlockMap,
		destroy
	};
};*/

export function GraphicsBackend() {
  this.renderers = [];
  this.billboards = [];
  this.overlays = [];
  this.blockMap = undefined;
  this.idToTexture = [];// maybe {} or keeper?
  this.camera = new Camera();
}

GraphicsBackend.prototype.registerRenderer = function(renderer) {
  this.renderers.push(renderer);
};

GraphicsBackend.prototype.unregisterRenderer = function(renderer) {
  ArrayUtil.remove(this.renderers, renderer);
};

/*
maybe make "renderer" be like a world renderer, and have regbillboard on
renderer?

then, do webglRenderer-modern, webglRenderer-raycast, canvas2DRenderer-raycast,
which take webgl or canvas2D backend respectively
*/
GraphicsBackend.prototype.registerBillboard = function(billboard) {
  this.billboards.push(billboard);
};

GraphicsBackend.prototype.unregisterBillboard = function(billboard) {
  ArrayUtil.remove(this.billboards, billboard);
};

/*
maybe move the regbillboard and regoverlay functions to subtypes
because webgl will need to do more set up
*/
GraphicsBackend.prototype.registerOverlay = function(overlay) {
  this.overlays.push(overlay);
};

GraphicsBackend.prototype.unregisterOverlay = function(overlay) {
  ArrayUtil.remove(this.overlays, overlay);
};

GraphicsBackend.prototype.render = function() {
  this.clearScreen();
	for (var i = 0; i < this.renderers.length; i++) {
		let r = this.renderers[i];
     r.render(this);
	}
};

GraphicsBackend.prototype.getCamera = function() {
  return this.camera;
}

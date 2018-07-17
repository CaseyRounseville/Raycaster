import * as Camera from "../Camera";
import * as ArrayUtil from "../../util/ArrayUtil";

export const INTERNAL_WIDTH = 320;
export const INTERNAL_HEIGHT = 240;

export const registerRenderer = (self, renderer) => {
	self.renderers.push(renderer);
};

export const unregisterRenderer = (self, renderer) => {
	ArrayUtil.remove(self.renderers, renderer);
};

export const registerBillboard = (self, billboard) => {
  self.billboards.push(billboard);
};

export const unregisterBillboard = (self, billboard) => {
  ArrayUtil.remove(self.billboards, billboard);
};

const render = (self) => {
	self.clearScreen(self);
	for (var i = 0; i < self.renderers.length; i++) {
		let r = self.renderers[i];
		r.render(r, self);
	}
};

export const create = (fillRect,
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
};
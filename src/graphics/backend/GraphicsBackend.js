import * as Camera from "../Camera";

export const INTERNAL_WIDTH = 320;
export const INTERNAL_HEIGHT = 240;

export const registerRenderer = (self, renderer) => {
	self.renderers.push(renderer);
};

export const unregisterRenderer = (self, renderer) => {
	self.renderers.remove(renderer);
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
                       setTextColor,
                       renderText,
                       destroy) => {
	return {
		renderers: [],
		idToTexture: [],
		//camera: Camera.create(),
		
		registerRenderer,
		unregisterRenderer,
		render,
		
		fillRect,
		clearScreen,
		renderTexture,
		loadTexture,
		getTexture,
		destroyTexture,
		getFillColor,
		setFillColor,
		setTextColor,
		renderText,
		destroy
	};
};
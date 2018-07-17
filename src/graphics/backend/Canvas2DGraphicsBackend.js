import * as GraphicsBackend from "./GraphicsBackend";

import * as Color from "../util/Color.js";

import * as Keeper from "../../util/Keeper";

const MAX_IMAGES = 64;

const setFillColor = (self, color) => {
	var r = Color.getComp1i(color);
	var g = Color.getComp2i(color);
	var b = Color.getComp3i(color);
	var a = Color.getComp4f(color);
	self.ctxt.fillStyle = "rgb(" + r + ", " + g + ", " + b + ", " + a + ")";
	self.fillColor = color;
};

const getFillColor = (self) => {
	return self.fillColor;
};

const fillRect = (self, tlx, tly, w, h) => {
	let ctxt = self.ctxt;
	ctxt.fillRect(tlx, tly, w, h);
};

const renderTexture = (self,
                       imgHandle,
                       dest_tlx,
                       dest_tly,
                       dest_w,
                       dest_h,
                       src_tlx,
                       src_tly,
                       src_w,
                       src_h,
                       opacity,
                       color) => {
	// get context
	let ctxt = self.ctxt;
	
	// get img
	let img = self.imgKeeper[imgHandle];
	
	// set opacity
	ctxt.setGlobalAlpha(opacity);
	
	// draw image
	ctxt.drawImage(img,
                 src_tlx,
                 src_tly,
                 src_w,
                 src_h,
                 dest_tlx,
                 dest_tly,
                 dest_w,
                 dest_h);
	
	// handle tinting(multiplication), if needed
	if (color != Color.WHITE) {
		// preserve previous state
		let oldFillColor = getFillColor(self);
		let oldGlobalCompositeOperation = ctxt.globalCompositeOperation;
		
		// set new state
		setFillColor(self, color);
		ctxt.setGlobalCompositeOperation("multiply");
		
		// render
		fillRect(self, dest_tlx, dest_tly, dest_w, dest_h);
		
		// restore previous state
		setFillColor(oldFillColor);
		ctxt.globalCompositeOperation = oldGlobalCompositeOperation;
	}
};

const clearScreen = (self) => {
	self.setFillColor(self, Color.BLACK);
	self.fillRect(self, 0, 0, 320, 240);
};

const loadTexture = (self, id, url) => {
	let imgKeeper = self.imgKeeper;
	let imgHandle = ++imgKeeper.lastImgHandle;
	let img = new Image();
	img.src = url;
	imgKeeper[imgHandle] = img;
	
	self.idToTexture[id] = Texture.create();
	
	return imgHandle;
};

const getTexture = (self, id) => {
	return self.idToTexture[id];
};

const destroyTexture = (self, imgHandle) => {
	delete self.imgKeeper[imgHandle];
};

const setTextColor = (self, color) => {
	
};

const renderText = (self, text, x, y) => {
	
};

const destroy = (self) => {
	//window.removeEventListener("resize", self.resize);
}

export const create = () => {
	let canvas2DGraphicsBackend = GraphicsBackend.create(fillRect,
                                                       clearScreen,
                                                       renderTexture,
                                                       loadTexture,
                                                       getTexture,
                                                       destroyTexture,
                                                       getFillColor,
                                                       setFillColor,
                                                       setTextColor,
                                                       renderText,
                                                       destroy);
	
	canvas2DGraphicsBackend.canvas = document.getElementById("canvas");
	canvas2DGraphicsBackend.ctxt = canvas2DGraphicsBackend.canvas.getContext("2d");
	canvas2DGraphicsBackend.fillColor = Color.BLACK;
	//setFillColor(canvas2DGraphicsBackend, Color.PINK);
	canvas2DGraphicsBackend.imgKeeper = Keeper.create(MAX_IMAGES);
	
	const resize = (event) => {
		//canvas2DGraphicsBackend.canvas.width = window.innerWidth;
		//canvas2DGraphicsBackend.canvas.height = window.innerHeight;
		canvas2DGraphicsBackend.ctxt = canvas2DGraphicsBackend.canvas.getContext("2d");
		canvas2DGraphicsBackend.ctxt.scale(window.innerWidth / GraphicsBackend.INTERNAL_WIDTH, window.innerHeight / GraphicsBackend.INTERNAL_HEIGHT);
	}
	canvas2DGraphicsBackend.resize = resize;
	//window.addEventListener("resize", resize);
	
	return canvas2DGraphicsBackend;
};
import { globalCtxt } from "../../main/GlobalContext";

import { Vector2 } from "../Vector2";
import { Vector3 } from "../Vector3";
import { Vector4 } from "../Vector4";

import { Mesh } from "../../graphics/mesh/Mesh";
import { Vertex } from "../../graphics/mesh/Vertex";
import { MiniMapRenderer } from "./MiniMapRenderer";

export function BlockMap(width, height, texSheet, northData, southData,
		eastData, westData, flatData, heightData, collData) {
	this.width = width;
	this.height = height;
	this.texSheet = texSheet;
	this.northData = northData;
	this.southData = southData;
	this.eastData = eastData;
	this.westData = westData;
	this.flatData = flatData;
	this.heightData = heightData;
	this.collData = collData;
	this.renderer = new MiniMapRenderer(this);
}

BlockMap.prototype.wire = function() {
	console.log("wiring block map");
	let globalRenderer = globalCtxt.renderer;
	globalRenderer.registerBlockMap(this);
	//globalRenderer.registerOverlay(this.renderer);
};

BlockMap.prototype.unwire = function() {
	let globalRenderer = globalCtxt.renderer;
	globalRenderer.registerBlockMap(undefined);
	//globalRenderer.unregisterOverlay(this.renderer);
};

/*
for webgl:
  maybe use instanced rendering for better performance?
  have a 1x1x1 cube for a mesh, and use dimensions as
  instance attributes(since only height changes, and
  all start at 0)
	* textures and color stuff changes too.
*/
BlockMap.prototype.generateMesh = function() {
  // const numVertices = this.width * this.height * 8;
  // const vertices = [];
  
  // /*
  // each vertex is used by 6 triangles
		// +------+
	   // /      /|
	  // /      / |
	 // /      /  |
	// /      /   |
   // /      /    |
  // +------+--   |
  // |\     |  \--+
  // | \    |    /
  // |  \   |   /
  // |   \  |  /
  // |    \ | /
  // |     \|/
  // +------+
  // */
  // const numIndices = this.numVertices * 6;
  // const indices = [];
  // for (let row = 0; row < this.height; row++) {
	// for (let col = 0; col < this.width; col++) {
	  // const baseIndex = row * width + col;
	  
	  // const height = this.heightData[baseIndex];
	  // const north = this.northData[baseIndex];
	  // const south = this.southData[baseIndex];
	  // const east = this.eastData[baseIndex];
	  // const west = this.westData[baseIndex];
	  // const flat = this.flatData[baseIndex];
	  
	  // // bottom top left
	  // vertices[baseIndex + 0] = new Vertex(new Vector3(col, row, 0),
										// new Vector2(),
										// new Vector4(1.0, 1.0, 1.0, 1.0));
	  
	  // // bottom bottom left
	  // vertices[baseIndex + 1] = new Vertex(new Vector3(col, row + 1, 0),
										// new Vector2(),
										// new Vector4(1.0, 1.0, 1.0, 1.0));
	  
	  // // bottom bottom right
	  // vertices[baseIndex + 2] = new Vertex(new Vector3(col + 1, row + 1, 0),
										// new Vector2(),
										// new Vector4(1.0, 1.0, 1.0, 1.0));
	  
	  // // bottom top right
	  // vertices[baseIndex + 3] = new Vertex(new Vector3(col + 1, row, 0),
										// new Vector2(),
										// new Vector4(1.0, 1.0, 1.0, 1.0));
	  
	  // // top top left
	  // vertices[baseIndex + 4] = new Vertex(new Vector3(col, row, height),
										// new Vector2(),
										// new Vector4(1.0, 1.0, 1.0, 1.0));
	  
	  // // top bottom left
	  // vertices[baseIndex + 5] = new Vertex(new Vector3(col, row + 1, height),
										// new Vector2(),
										// new Vector4(1.0, 1.0, 1.0, 1.0));
	 
	  // // top bottom right
	  // vertices[baseIndex + 6] = new Vertex(new Vector3(col + 1, row + 1, height),
										// new Vector2(),
										// new Vector4(1.0, 1.0, 1.0, 1.0));
	  
	  // // top top right
	  // vertices[baseIndex + 7] = new Vertex(new Vector3(col + 1, row, height),
										// new Vector2(),
										// new Vector4(1.0, 1.0, 1.0, 1.0));
	// }
  // }
  
  // // should return new mesh obj
  // return vertices;
  return {};
};

BlockMap.prototype.getWidth = function() {
  return this.width;
};

BlockMap.prototype.getHeight = function() {
  return this.height;
};

BlockMap.prototype.getTexSheet = function() {
	return this.texSheet;
}

BlockMap.prototype.getNorthData = function(row, col) {
  return this.northData[row * this.width + col];
};

BlockMap.prototype.getSouthData = function(row, col) {
  return this.southData[row * this.width + col];
};

BlockMap.prototype.getEastData = function(row, col) {
  return this.eastData[row * this.width + col];
};

BlockMap.prototype.getWestData = function(row, col) {
  return this.westData[row * this.width + col];
};

BlockMap.prototype.getFlatData = function(row, col) {
  return this.flatData[row * this.width + col];
};

BlockMap.prototype.getHeightData = function(row, col) {
  return this.heightData[row * this.width + col];
};

BlockMap.prototype.getCollData = function(row, col) {
  return this.collData[row * this.width + col];
};

import { BlockMap } from "./BlockMap";

import { TextureSheet } from "../../graphics/texture/TextureSheet";

import { globalCtxt } from "../../main/GlobalContext";

export const loadBlockMap = (obj) => {
	/*
	format: JSON
	{
		"width": <number>,
		"height": <number>,
		"data": <number[width * height]>
	}
	*/

	const graphicsBackend = globalCtxt.graphicsBackend;
	const texSheet = new TextureSheet(graphicsBackend.getTexture(obj.texId),
			32, 32, 4, 4, 0, 0);

	return new BlockMap(obj.width, obj.height, texSheet, obj.northData,
		obj.southData, obj.eastData, obj.westData, obj.flatData,
		obj.heightData, obj.collData);
};
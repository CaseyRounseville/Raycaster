import { BlockMap } from "./BlockMap";

export const loadBlockMap = (obj) => {
	/*
	format: JSON
	{
		"width": <number>,
		"height": <number>,
		"data": <number[width * height]>
	}
	*/
  return new BlockMap(obj.width, obj.height, obj.northData, obj.southData,
      obj.eastData, obj.westData, obj.flatData, obj.heightData, obj.collData);
};
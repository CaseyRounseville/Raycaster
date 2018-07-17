export const create = (width, height, northData, southData, eastData, westData, flatData, heightData, collData) => {
	return {
		width,
		height,
    northData,
    southData,
    eastData,
    westData,
    flatData,
    heightData,
    collData
	};
};

export const generateMesh = (self) => {
  let numVerts = self.width * self.height * 8;
  let verts = [];
  for (let row = 0; row < self.height; row++) {
    for (let col = 0; col < self.width; col++) {
      let baseIndex = row * width + col;
      
      // bottom top left
      verts[baseIndex + 0] =  { x: col,     y: row,     z: 0 };
      
      // bottom bottom left
      verts[baseIndex + 1] =  { x: col,     y: row + 1, z: 0 };
      
      // bottom bottom right
      verts[baseIndex + 2] =  { x: col + 1, y: row + 1, z: 0 };
      
      // bottom top right
      verts[baseIndex + 3] =  { x: col + 1, y: row,     z: 0 };
      
      // top top left
      verts[baseIndex + 4] =  { x: col,     y: row,     z: self.heightData[baseIndex] };
      
      // top bottom left
      verts[baseIndex + 5] =  { x: col,     y: row + 1, z: self.heightData[baseIndex] };
     
      // top bottom right
      verts[baseIndex + 6] =  { x: col + 1, y: row + 1, z: self.heightData[baseIndex] };
      
      // top top right
      verts[baseIndex + 7] =  { x: col + 1, y: row,     z: self.heightData[baseIndex] };
    }
  }
  return verts;
};
const fs = require("fs");

let srcDirName = process.argv[2];
let destDirName = process.argv[3];
let resIndex = {};
resIndex = JSON.parse(fs.readFileSync(srcDirName + "\\" + "index.json", "utf8"));
console.log("tex: " + resIndex.textures);
console.log(JSON.stringify(resIndex));

const findTexId = (fileName) => {
  let id = "OH SHIT NOT FOUND";
  resIndex.textures.forEach((tex) => {
    if (tex.file.valueOf() === fileName.valueOf()) {
      id = tex.id;
    }
  });
  return id;
};

const packRes = (fileNames) => {
  let resObj = {
    textures: []
  };
  fileNames.forEach((fileName) => {
    if (fileName == "index.json") {
      // skip
    } else if (fileName.endsWith("png")) {
      let b64Str = "data:image/png;base64," + fs.readFileSync(srcDirName + "\\" + fileName).toString("base64");
      let id = findTexId(fileName);
      resObj.textures.push({
        id,
        data: b64Str
      });
    }
  });
  fs.writeFileSync(destDirName + "\\" + srcDirName.substring(srcDirName.lastIndexOf("\\") + 1) + ".json", JSON.stringify(resObj), "utf8");
};

let fileNames = fs.readdirSync(srcDirName);
console.log(JSON.stringify(fileNames));
packRes(fileNames);
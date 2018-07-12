import BlockSet from "./BlockSet";

const loadBlockSet = (obj) => {
  /*
  format: JSON {
    version: <number>,
    numBlocks: <number>,
    blocks: [
      {
        north: <number>,
        south: <number>,
        west: <number>,
        east: <number>,
        flat: <number>,
        height: <number>,
        arg1: <number>,
        arg2: <number>,
        arg3: <number>,
        arg4: <number>
      }, {
        ...
      }
    ]
  }
  */
  return BlockSet.create(obj.blocks);
};

export default {
  loadBlockSet
}
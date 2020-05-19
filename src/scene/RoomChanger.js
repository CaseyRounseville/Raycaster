import { globalCtxt } from "../main/GlobalCtxt";

export const changeRoom = (roomNum) => {
  // clear room flags, unload old actors(except for scene level
  // actors(room -1), and load new actors
  const scene = globalCtxt.scene;
  
  // load new actors
  
  if (roomNum == -1) {
    // don't unload prev room
  } else {
    // unload old actors
  }  
};
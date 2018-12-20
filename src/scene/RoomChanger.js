import { globalCtxt } from "../main/GlobalCtxt";

export const changeRoom = (roomNum) => {
  const scene = globalCtxt.scene;
  
  // load new actors
  
  if (roomNum == -1) {
    // don't unload prev room
  } else {
    // unload old actors
  }  
};
import { globalCtxt } from "../main/GlobalContext";

import { FadeIn } from "../graphics/effect/FadeIn";
import { FadeOut } from "../graphics/effect/FadeOut";

import { BLACK } from "../graphics/util/Color";

import { registerTask } from "../task/TaskSystem";

import { loadScene } from "./SceneLoader";

export const changeScene = (id) => {
  // load scene
  // probably will involve a task to fade screen to black,
  // then clear/swap out flags
  const fadeOut = new FadeOut(BLACK, 120);
  fadeOut.wire();
  fadeOut.registerCallback(() => {
    // destroy the old scene, if there is one
    // there wouldn't be an old scene if the game is just starting
    if (globalCtxt.scene) {
      // TODO: implement me
    }
    
    // load new scene
    let newScene = loadScene(id);
    newScene.wire();
    
    // retrieve backends
    let graphicsBackend = globalCtxt.graphicsBackend;
    let renderer = globalCtxt.renderer;
    
    const fadeIn = new FadeIn(BLACK, 120);
    fadeIn.wire();
    fadeIn.registerCallback(() => {
      // do something
      fadeIn.unwire();
    });
    
    // careful about registering from a callback
    registerTask(fadeIn);
    fadeOut.unwire();
  });
  
  registerTask(fadeOut);
};
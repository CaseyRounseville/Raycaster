import { globalCtxt } from "../main/GlobalContext";

import { FadeIn } from "../graphics/effect/FadeIn";
import { FadeOut } from "../graphics/effect/FadeOut";

import { registerTask } from "../task/TaskSystem";

import { loadScene } from "./SceneLoader";

export const changeScene = (id) => {
  // load scene
  // probably will involve a task to fade screen to black,
  // then clear/swap out flags
  const fadeOut = new FadeOut();
  fadeOut.registerCallback(() => {
    loadScene(id);
    
    const fadeIn = new FadeIn();
    fadeIn.registerCallback(() => {
      
    });
    
    // careful about registering from a callback
    registerTask(fadeIn);
  });
  
  registerTask(fadeOut);
};
import * as ArrayUtil from "../util/ArrayUtil";

tasks = [];

export const registerTask = (task) => {
  
};

export const unregisterTask = (task) => {
  
};

export const tick = () => {
  for (int i = 0; i < tasks.length; i++) {
    if (tasks[i].tick()) {
      
    }
  }
};
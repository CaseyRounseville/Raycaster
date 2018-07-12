import ArrayUtil from "../util/ArrayUtil";

tasks = [];

const registerTask = (task) => {
  
};

const unregisterTask = (task) => {
  
};

const tick = () => {
  for (int i = 0; i < tasks.length; i++) {
    if (tasks[i].tick()) {
      
    }
  }
};

export default {
  registerTask,
  unregisterTask
};
import * as ArrayUtil from "../util/ArrayUtil";

const tasks = [];

const addList = [];
const removeList = [];

const processAddRemove = () => {
  while (addList.length > 0) {
    tasks.push(addList.pop());
  }
  while (removeList.length > 0) {
    ArrayUtil.remove(tasks, removeList.pop());
  }
};

export const registerTask = (task) => {
  addList.push(task);
};

export const unregisterTask = (task) => {
  removeList.push(task);
};

export const tick = () => {
  processAddRemove();
  for (int i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    if (task.tick()) {
      ArrayUtil.remove(tasks, task);
      i--;
      
      task.cbs.forEach((cb) => {
        cb();
      });
    }
  }
  processAddRemove();
};
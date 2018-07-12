import * as Task from "./Task";

const tick = (self) => {
  self.counter++;
  if (self.counter == 60) {
    self.counter = 0;
    console.log("TestTask#tick: one second has passed");
  }
};

export const create = () => {
  let self = Task.create(tick);
  
  self.counter = 0;
  
  return self;
};
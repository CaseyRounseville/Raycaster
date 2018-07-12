import Task from "./Task";

const tick = (self) => {
  self.counter++;
  if (self.counter == 60) {
    self.counter = 0;
    console.log("TestTask#tick: one second has passed");
  }
};

const create = () => {
  let self = Task.create();
  
  self.counter = 0;
  self.tick = tick;
  
  return self;
};

export default {
  create
};
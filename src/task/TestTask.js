import { Task } from "./Task";

TestTask.prototype = Object.create(Task.prototype);
TestTask.prototype.constructor = TestTask;

export function TestTask() {
  Task.call(this);
  
  this.counter = 0;
}

TestTask.prototype.tick = function() {
  this.counter++;
  if (this.counter == 60) {
    this.counter = 0;
    console.log("TestTask#tick: one second has passed");
  }
};
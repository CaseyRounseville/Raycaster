import { globalCtxt } from "../../main.GlobalCtxt";

import { Task } from "../../task/Task";

FadeOut.prototype = Object.create(Task.prototype);
FadeOut.prototype.constructor = FadeOut;

export function FadeOut(time, color) {
  Task.call(this);
  
  this.color = color;
  this.time = time;
  
  this.timeElapsed = 0;
  this.currColor = color;
}

FadeOut.prototype.wire = function() {
  // set up graphics stuff
};

FadeOut.prototype.unwire = function() {
  
};

FadeOut.prototype.tick = function() {
  this.timeElapsed++;
  if (this.timeElapsed == this.time) {
    return true;
  } else {
    // do some wieghted average with the colors/alpha
    return false;
  }
};

// add in some renderer stuff
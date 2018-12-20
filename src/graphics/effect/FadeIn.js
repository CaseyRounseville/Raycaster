import { globalCtxt } from "../../main/GlobalContext";

import { Task } from "../../task/Task";

FadeIn.prototype = Object.create(Task.prototype);
FadeIn.prototype.constructor = FadeIn;

export function FadeIn(color, time) {
  Task.call(this);
  
  this.color = color;
  this.time = time;
  
  this.timeElapsed = 0;
  this.currColor = color;
}

FadeIn.prototype.wire = function() {
  // set up graphics stuff
};

FadeIn.prototype.unwire = function() {
  
};

FadeIn.prototype.tick = function() {
  this.timeElapsed++;
  if (this.timeElapsed == this.time) {
    return true;
  } else {
    // do some wieghted average with the colors/alpha
    return false;
  }
};

// add in some renderer stuff
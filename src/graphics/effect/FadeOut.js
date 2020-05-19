import { globalCtxt } from "../../main/GlobalContext";

import { INTERNAL_WIDTH, INTERNAL_HEIGHT } from "../backend/GraphicsBackend";

import { clearComp4, weightedAverage } from "../util/Color";

import { Task } from "../../task/Task";

FadeOut.prototype = Object.create(Task.prototype);
FadeOut.prototype.constructor = FadeOut;

export function FadeOut(color, time) {
  console.log("constructing fade out");
  Task.call(this);
  
  // the color starts out transparent
  this.color = clearComp4(color);
  this.time = time;
  
  this.timeElapsed = 0;
  this.currColor = this.color;
  
  // the target color, which is the same as the provided color, but opaque
  this.targetColor = color;
}

FadeOut.prototype.wire = function() {
  console.log("wiring fade out");
  let renderer = globalCtxt.renderer;
  renderer.registerOverlay(this);
};

FadeOut.prototype.unwire = function() {
  console.log("unwiring fade out");
  let renderer = globalCtxt.renderer;
  renderer.unregisterOverlay(this);
};

FadeOut.prototype.tick = function() {
  console.log("ticking fade out");
  this.timeElapsed++;
  if (this.timeElapsed == this.time) {
    return true;
  } else {
    // do some wieghted average with the colors/alpha
    this.currColor = weightedAverage(this.color, this.targetColor, 1 - this.timeElapsed / this.time);
    return false;
  }
};

FadeOut.prototype.render = function(backend) {
  backend.setFillColor(this.currColor);
  backend.fillRect(0, 0, INTERNAL_WIDTH, INTERNAL_HEIGHT);
};
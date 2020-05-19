import { globalCtxt } from "../../main/GlobalContext";

import { INTERNAL_WIDTH, INTERNAL_HEIGHT } from "../backend/GraphicsBackend";

import { clearComp4, weightedAverage } from "../util/Color";

import { Task } from "../../task/Task";

FadeIn.prototype = Object.create(Task.prototype);
FadeIn.prototype.constructor = FadeIn;

export function FadeIn(color, time) {
  console.log("constructing fade in");
  Task.call(this);
  
  this.color = color;
  this.time = time;
  
  this.timeElapsed = 0;
  this.currColor = color;
  
  // the target color, which is the same as the provided color, but transparent
  this.targetColor = clearComp4(color);
}

FadeIn.prototype.wire = function() {
  console.log("wiring fade in");
  let renderer = globalCtxt.renderer;
  renderer.registerOverlay(this);
};

FadeIn.prototype.unwire = function() {
  console.log("unwiring fade in");
  let renderer = globalCtxt.renderer;
  renderer.unregisterOverlay(this);
};

FadeIn.prototype.tick = function() {
  console.log("ticjing fade in");
  this.timeElapsed++;
  if (this.timeElapsed == this.time) {
    return true;
  } else {
    // do some wieghted average with the colors/alpha
    this.currColor = weightedAverage(this.color, this.targetColor, 1 - this.timeElapsed / this.time);
    return false;
  }
};

FadeIn.prototype.render = function(backend) {
  backend.setFillColor(this.currColor);
  backend.fillRect(0, 0, INTERNAL_WIDTH, INTERNAL_HEIGHT);
};
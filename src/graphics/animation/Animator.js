export const PLAY_LOOP   = 0,
             PLAY_FREEZE = 1;

export function Animator() {
  this.playType = PLAY_LOOP;
  this.currFrame = 0;
  this.delayCounter = 0;
}

Animator.prototype.setCurrAnim = function(anim) {
  
};

Animator.prototype.setPlayType = function(type) {
  
};

Animator.prototype.registerCallback = function(cb) {
  
};

Animator.prototype.unregisterCallback = function(cb) {
  
};
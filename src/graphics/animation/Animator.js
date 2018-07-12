export const PLAYBACK_LOOP   = 0,
             PLAYBACK_FREEZE = 1;

export const create = (anims) => {
  return {
    playbackType: PLAYBACK_LOOP,
    currFrame: 0,
    delayCounter: 0
  };
};

export const setCurrAnim = (self, animNum) => {
  
};

export const setPlaybackType = (self, type) => {
  
};

export const registerCallback(self, cb) => {
  
};

export const unregisterCallback(self, cb) => {
  
};
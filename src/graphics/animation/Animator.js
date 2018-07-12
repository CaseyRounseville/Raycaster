const PLAYBACK_LOOP   = 0,
      PLAYBACK_FREEZE = 1;

const create = (anims) => {
  return {
    playbackType: PLAYBACK_LOOP,
    currFrame: 0,
    delayCounter: 0
  };
};

const setCurrAnim = (animNum) => {
  
};

const setPlaybackType = (type) => {
  
};

const registerCallback(cb) => {
  
};

const unregisterCallback(cb) => {
  
};

export default {
  create,
  setCurrAnim,
  setPlaybackType,
  registerCallback
};
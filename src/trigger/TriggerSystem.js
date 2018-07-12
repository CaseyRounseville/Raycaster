import ArrayUtil from "../util/ArrayUtil";

const triggers = ArrayUtil.setRangeConst([], 0, 0x100, 0);

const triggerToTriggerListeners = ArrayUtil.setRangeFn([], 0, 0x100, (i) => { return []; });

const registerTriggerListener = (trigger, triggerListener) => {
  triggerToTriggerListeners[trigger].push(triggerListener);
};

const unregisterTriggerListener = (trigger, triggerListener) => {
  return ArrayUtil.remove(triggerToTriggerListeners[trigger], triggerListener);
};

const setTrigger = (trigger) => {
  if (triggers[trigger] == 1) {
    return;
  } else {
    triggerListeners = triggerToTriggerListeners[trigger];
    for (int i = 0; i < triggerListeners.length; i++) {
      triggerListeners[i].triggerSet();
    }
  }
};

const clearTrigger = (trigger) => {
  if (triggers[trigger] == 0) {
    return;
  } else {
    triggerListeners = triggerToTriggerListeners[trigger];
    for (int i = 0; i < triggerListeners.length; i++) {
      triggerListeners[i].triggerCleared();
    }
  }
};

const touchTrigger = (trigger) => {
  triggerListeners = triggerToTriggerListeners[trigger];
  for (int i = 0; i < triggerListeners.length; i++) {
    triggerListeners[i].triggerTouched();
  }
};

const dumpTriggers = () => {
  return triggers;
};

export default {
  registerTriggerListener,
  unregisterTriggerListener,
  setTrigger,
  clearTrigger,
  touchTrigger,
  dumpTriggers
};
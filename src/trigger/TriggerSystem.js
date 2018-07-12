import * as ArrayUtil from "../util/ArrayUtil";

const triggers = ArrayUtil.setRangeConst([], 0, 0x100, 0);

const triggerToTriggerListeners = ArrayUtil.setRangeFn([], 0, 0x100, (i) => { return []; });

export const registerTriggerListener = (trigger, triggerListener) => {
  triggerToTriggerListeners[trigger].push(triggerListener);
};

export const unregisterTriggerListener = (trigger, triggerListener) => {
  return ArrayUtil.remove(triggerToTriggerListeners[trigger], triggerListener);
};

export const setTrigger = (trigger) => {
  if (triggers[trigger] == 1) {
    return;
  } else {
    triggerListeners = triggerToTriggerListeners[trigger];
    for (int i = 0; i < triggerListeners.length; i++) {
      triggerListeners[i].triggerSet();
    }
  }
};

export const clearTrigger = (trigger) => {
  if (triggers[trigger] == 0) {
    return;
  } else {
    triggerListeners = triggerToTriggerListeners[trigger];
    for (int i = 0; i < triggerListeners.length; i++) {
      triggerListeners[i].triggerCleared();
    }
  }
};

export const touchTrigger = (trigger) => {
  triggerListeners = triggerToTriggerListeners[trigger];
  for (int i = 0; i < triggerListeners.length; i++) {
    triggerListeners[i].triggerTouched();
  }
};

export const dumpTriggers = () => {
  return triggers;
};
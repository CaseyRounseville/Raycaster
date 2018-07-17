export const create = (html) => {
  return {
    html,
    selectedOption: 0,
    active: true
  };
};

export const setActive = (self, active) => {
  self.active = active;
  if (active) {
    // register input listener,
    // or maybe dialog stack has a single listener,
    // and the events are applied only to the top of
    // the stack
    
    // maybe active can be used to dim/gray out
    // inactive boxes
  }
};
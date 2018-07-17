/*export const setActive = (self, active) => {
  self.active = active;
  if (active) {
    // register input listener,
    // or maybe dialog stack has a single listener,
    // and the events are applied only to the top of
    // the stack
    
    // maybe active can be used to dim/gray out
    // inactive boxes
  }
};*/

export function Dialog(html) {
  this.html = html;
  this.selectedOption = 0;
  this.active = true;
}
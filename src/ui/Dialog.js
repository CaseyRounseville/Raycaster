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

export function Dialog() {
  this.html = "";
  this.buttons = [];
}

export const createButton = (text, onclick) => {
  // create a button element
  const btn = document.createElement("button");

  // set the style
  btn.setAttribute("class", "ui-button");

  // set the text and click listener
  btn.innerHTML = text;
  btn.onclick = onclick;

  return btn;
};

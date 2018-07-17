import * as Dialog from "./Dialog";

const dialogStack = [];

export const pushDialog = (dialog) => {
  let prev = dialogStack[dialogStack.length - 1];
  Dialog.setActive(prev, false);
  
  dialogStack.push(dialog);
  Dialog.setActive(dialog, true);
  
  document.body.insertAdjacentHtml("beforeend", dialog.html);
};

export const popDialog = () => {
  return dialogStack.pop();
};
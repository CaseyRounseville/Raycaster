import * as Dialog from "./Dialog";

const dialogStack = [];

export const pushDialog = (dialog) => {
  const prev = dialogStack[dialogStack.length - 1];
  prev.setActive(false);
  
  dialogStack.push(dialog);
  dialog.setActive(true);
  
  document.body.insertAdjacentHtml("beforeend", dialog.html);
};

export const popDialog = () => {
  return dialogStack.pop();
};
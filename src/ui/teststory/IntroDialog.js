import { Dialog } from "../Dialog";

import { closeDialog, showDialog } from "../DialogSystem";

import { QuestionDialog } from "./QuestionDialog";

import { changeScene } from "../../scene/SceneChanger";

IntroDialog.prototype = Object.create(Dialog.prototype);
IntroDialog.prototype.constructor = IntroDialog;

export function IntroDialog() {
    Dialog.call(this);
    this.html = "This is the introduction of a story.";

    const btnOk = document.createElement("button");
    btnOk.innerHTML = "Ok";
    btnOk.onclick = (event) => {
        closeDialog();
        showDialog(new QuestionDialog());
    };
    this.buttons.push(btnOk);
}

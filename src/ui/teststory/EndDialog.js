import { Dialog } from "../Dialog";

import { closeDialog, showDialog } from "../DialogSystem";

import { QuestionDialog } from "./QuestionDialog";

import { changeScene } from "../../scene/SceneChanger";

EndDialog.prototype = Object.create(Dialog.prototype);
EndDialog.prototype.constructor = EndDialog;

export function EndDialog() {
    Dialog.call(this);
    this.html = "Me too!";

    const btnOk = document.createElement("button");
    btnOk.innerHTML = "Ok";
    btnOk.onclick = (event) => {
        closeDialog();
    };
    this.buttons.push(btnOk);
}

import { Dialog } from "../Dialog";

import { closeDialog, showDialog } from "../DialogSystem";

import { EndDialog } from "./EndDialog";

import { changeScene } from "../../scene/SceneChanger";

QuestionDialog.prototype = Object.create(Dialog.prototype);
QuestionDialog.prototype.constructor = QuestionDialog;

export function QuestionDialog() {
    Dialog.call(this);
    this.html = "Do you like pizza or hamburgers?";

    const btnPizza = document.createElement("button");
    btnPizza.innerHTML = "Pizza";
    btnPizza.onclick = (event) => {
        closeDialog();
        showDialog(new EndDialog());
    };
    this.buttons.push(btnPizza);

    const btnHam = document.createElement("button");
    btnHam.innerHTML = "Hamburgers";
    btnHam.onclick = (event) => {
        closeDialog();
        showDialog(new EndDialog());
    };
    this.buttons.push(btnHam);
}

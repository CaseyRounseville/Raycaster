import { Dialog } from "./Dialog";

import { closeDialog, showDialog } from "./DialogSystem";

import { changeScene } from "../scene/SceneChanger";

/**
 * The starting dialog of the story.
 */
export const createIntroDialog = () => {
    const dialog = new Dialog();
    dialog.html = "This is the introduction of a story. This is some text " +
            "to makethisdiadiadiaidadialog really long, so that the text wraps around " +
            "to the next line.";

    const btnOk = document.createElement("button");
    btnOk.innerHTML = "Ok";
    btnOk.onclick = (event) => {
        closeDialog();
        showDialog(createQuestionDialog());
    };
    dialog.buttons.push(btnOk);

    return dialog;
};

/**
 * A branch in the dialog.
 */
const createQuestionDialog = () => {
    const dialog = new Dialog();
    dialog.html = "Do you like pizza or hamburgers?";

    const btnPizza = document.createElement("button");
    btnPizza.innerHTML = "Pizza";
    btnPizza.onclick = (event) => {
        closeDialog();
        showDialog(createEndDialog());
    };
    dialog.buttons.push(btnPizza);

    const btnHam = document.createElement("button");
    btnHam.innerHTML = "Hamburgers";
    btnHam.onclick = (event) => {
        closeDialog();
        showDialog(createEndDialog());
    };
    dialog.buttons.push(btnHam);

    return dialog;
};

/**
 * The final dialog of the story.
 */
const createEndDialog = () => {
    const dialog = new Dialog();
    dialog.html = "Me too!";

    const btnOk = document.createElement("button");
    btnOk.innerHTML = "Ok";
    btnOk.onclick = (event) => {
        closeDialog();
    };
    dialog.buttons.push(btnOk);

    return dialog;
};

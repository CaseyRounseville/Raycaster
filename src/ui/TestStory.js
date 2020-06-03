import { Dialog, createButton } from "./Dialog";

import { closeDialog, showDialog } from "./DialogSystem";

import { changeScene } from "../scene/SceneChanger";
import { create } from "domain";

/**
 * The starting dialog of the story.
 */
export const createIntroDialog = () => {
    const dialog = new Dialog();
    dialog.html = "This is the introduction of a story. This is some text " +
            "to makethisdiadiadiaidadialog really long, so that the text wraps around " +
            "to the next line.";

    const btnOk = createButton("Ok", (event) => {
        closeDialog();
        showDialog(createQuestionDialog());
    });
    dialog.buttons.push(btnOk);

    return dialog;
};

/**
 * A branch in the dialog.
 */
const createQuestionDialog = () => {
    const dialog = new Dialog();
    dialog.html = "Do you like pizza or hamburgers?";

    const btnPizza = createButton("Pizza", (event) => {
        closeDialog();
        showDialog(createEndDialog());
    });
    dialog.buttons.push(btnPizza);

    const btnHam = createButton("Hamburgers", (event) => {
        closeDialog();
        showDialog(createEndDialog());
    });
    dialog.buttons.push(btnHam);

    return dialog;
};

/**
 * The final dialog of the story.
 */
const createEndDialog = () => {
    const dialog = new Dialog();
    dialog.html = "Me too!";

    const btnOk = createButton("Ok", (event) => {
        closeDialog();
    });
    dialog.buttons.push(btnOk);

    return dialog;
};

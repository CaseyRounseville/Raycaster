import { Dialog } from "./Dialog";

import { closeDialog } from "./DialogSystem";

import { changeScene } from "../scene/SceneChanger";

SceneSelectDialog.prototype = Object.create(Dialog.prototype);
SceneSelectDialog.prototype.constructor = SceneSelectDialog;

export function SceneSelectDialog() {
    Dialog.call(this);
    this.html = "Select a scene.";

    const btnScene0 = document.createElement("button");
    btnScene0.innerHTML = "Scene 0";
    btnScene0.onclick = (event) => {
        closeDialog();
        changeScene("scene-0", "scene-0");
    };
    this.buttons.push(btnScene0);

    const btnScene1 = document.createElement("button");
    btnScene1.innerHTML = "Scene 1";
    btnScene1.onclick = (event) => {
        closeDialog();
        changeScene("scene-0", "scene-0");
    };
    this.buttons.push(btnScene1);
}

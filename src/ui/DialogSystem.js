import { Dialog } from "./Dialog";

// retrieve elements from document
const dialogDiv = document.getElementById("dialogDiv");
const dialogTextBox = document.getElementById("dialogTextBox");
const dialogButtonBox = document.getElementById("dialogButtonBox");

export const showDialog = (dialog) => {
    // make the dialog div visible
    dialogDiv.style.visibility = "visible";

    // copy the dialog's data into the appropriate elements on the document
    dialogTextBox.innerHTML = dialog.html;
    dialog.buttons.forEach((btn) => {
        dialogButtonBox.appendChild(btn);
    });
};

export const closeDialog = () => {
    // make the dialog div hidden
    dialogDiv.style.visibility = "hidden";

    // remove any dialog data from the elements on the document
    dialogTextBox.innerHTML = "";
    while (dialogButtonBox.firstChild) {
        dialogButtonBox.removeChild(dialogButtonBox.lastChild);
    }
};

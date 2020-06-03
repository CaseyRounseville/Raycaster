import { Dialog } from "./Dialog";

// retrieve elements from document
const dialogDiv = document.getElementById("dialogDiv");
const dialogTextBox = document.getElementById("dialogTextBox");
const dialogButtonBox = document.getElementById("dialogButtonBox");

export const showDialog = (dialog) => {
    // make the dialog div visible
    dialogDiv.style.visibility = "visible";

    // first, we will roll out the text char by char, and then put the buttons
    // up for the player to pick
    let numCharsDisplaying = 0;
    let interval = undefined;
    const addChar = () => {
        let currChar;
        do {
            // add the next char to the display, as well as all whitespace
            // characters that come immediately before it;
            // this is to make words roll out more smoothly, so the rolling
            // does not look choppy between words
            currChar = dialog.html[numCharsDisplaying++];
            dialogTextBox.innerHTML += currChar;
        } while (/\s/.test(currChar) &&
                numCharsDisplaying < dialog.html.length);

        // see if we have added add the chars
        if (numCharsDisplaying == dialog.html.length) {
            // stop calling addChar repeatedly
            clearInterval(interval);

            // now that the text is done rolling out, we can add the buttons to
            // the dialog
            dialog.buttons.forEach((btn) => {
                dialogButtonBox.appendChild(btn);
            });
        }
    };

    // kick off the text rolling
    interval = setInterval(addChar, 1.0 * (1000.0 / 60));
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

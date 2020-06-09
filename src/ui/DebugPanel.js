// get references to the elements in the debug panel
const sceneNameElem = document.getElementById("debugSceneName");
const playerXElem = document.getElementById("debugPlayerX");
const playerYElem = document.getElementById("debugPlayerY");
const playerRElem = document.getElementById("debugPlayerR");
const fpsElem = document.getElementById("debugFps");

export const setDebugSceneName = (sceneName) => {
    sceneNameElem.innerHTML = sceneName;
};

export const setDebugPlayerX = (x) => {
    playerXElem.innerHTML = x.toFixed(6);
};

export const setDebugPlayerY = (y) => {
    playerYElem.innerHTML = y.toFixed(6);
};

export const setDebugPlayerR = (r) => {
    playerRElem.innerHTML = r.toFixed(6);
};

export const setDebugFps = (fps) => {
    fpsElem.innerHTML = fps.toFixed(1);
};

import * as GlobalContextConfig from "./GlobalContextConfig";
import { initGlobalCtxt, globalCtxt } from "./GlobalContext";

import { tick as tickTasks } from "../task/TaskSystem";

import { TestInputHandler } from "../input/TestInputHandler";

import { Player } from "../actor/player/Player";

import { changeScene } from "../scene/SceneChanger";

import { showDialog } from "../ui/DialogSystem";
import { SceneSelectDialog } from "../ui/SceneSelectDialog";
import { createIntroDialog } from "../ui/TestStory";

// set up global ctxt as a singleton
const globalCtxtStr = `{
	"graphicsBackendName":	"canvas2D",
	"rendererName": "canvas2DRaycaster",
	"inputBackendName":		"default",
	"physicsBackendName":	"default",
	"resBaseUrl": "http://localhost:8080/"
}`;
const globalCtxtConfig = GlobalContextConfig.create(globalCtxtStr);
initGlobalCtxt(globalCtxtConfig);

// retrieve backends
const graphicsBackend = globalCtxt.graphicsBackend;
const renderer = globalCtxt.renderer;
const inputBackend = globalCtxt.inputBackend;
const physicsBackend = globalCtxt.physicsBackend;
const resourceBackend = globalCtxt.resourceBackend;

// set up input handler
//const testInputHandler = new TestInputHandler();
//inputBackend.registerInputHandler(testInputHandler);

// set up player
resourceBackend.loadResource("player");
const player = new Player(0, 0);
player.wire();
globalCtxt.player = player;

// load resource for tree
resourceBackend.loadResource("tree");

// set up scene(title screen maybe)
changeScene("scene-0", "scene-0");

showDialog(createIntroDialog());

const loop = () => {
	inputBackend.process();
	tickTasks();
	//graphicsBackend.render();
	renderer.render();
};

// start game loop
setInterval(loop, 1000.0 / 60.0);

/*export {
	globalCtxt
};*/

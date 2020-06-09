import * as GlobalContextConfig from "./GlobalContextConfig";
import { initGlobalCtxt, globalCtxt } from "./GlobalContext";

import { tick as tickTasks } from "../task/TaskSystem";

import { TestInputHandler } from "../input/TestInputHandler";

import { Player } from "../actor/player/Player";

import { changeScene } from "../scene/SceneChanger";

import { showDialog } from "../ui/DialogSystem";
import { SceneSelectDialog } from "../ui/SceneSelectDialog";
import { createIntroDialog } from "../ui/TestStory";
import { setDebugFps } from "../ui/DebugPanel";

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

// load resource for torch
resourceBackend.loadResource("torch");

// set up scene(title screen maybe)
changeScene("scene-0", "scene-0");

showDialog(createIntroDialog());

let timeBeginPrevMs = 0;
let timeBeginCurrMs = 0;
let timeElapsedMs = 0;
let avgFps = 0;
let fps = 0;
let frameCount = 0;
const TARGET_FRAME_TIME_MS = 1000.0 / 60;
const loop = () => {
	// request an animation frame to be scheduled for the current frame
	requestAnimationFrame(loop);

	// timing calculations;
	// measure the time, in ms, between the start of consecutive frames
	timeBeginPrevMs = timeBeginCurrMs;
	timeBeginCurrMs = performance.now();
	timeElapsedMs = timeBeginCurrMs - timeBeginPrevMs;
	fps = 1000.0 / timeElapsedMs;
	frameCount++;

	// use a weighted average to calculate average fps, giving more weight to
	// the current instantaneous fps
	avgFps = 0.25 * avgFps + 0.75 * fps;

	// only update the fps counter sometimes, to avoid excessive flickering
	if (frameCount % 30 == 0) {
		setDebugFps(avgFps);
	}

	inputBackend.process();
	tickTasks();
	//graphicsBackend.render();
	renderer.render();

	// wait for the appropriate amount of time until the next frame begins,
	// taking into account the average amount of error in timing
	/*const timeToWaitMs = TARGET_FRAME_TIME_MS - timeElapsedMs -
			avgFrameTimeOffset;
	if (timeToWaitMs < 0) {
		// we took longer than we should have, so don't wait at all
		setTimeout(loop, 0);
	} else {
		// we have some time left over, so let the cpu rest for a few ms
		setTimeout(loop, timeToWaitMs);
	}*/
};

// start game loop
loop();

/*export {
	globalCtxt
};*/

import * as GlobalContextConfig from "./GlobalContextConfig";
import { initGlobalCtxt, globalCtxt } from "./GlobalContext";

import { TestInputHandler } from "../input/TestInputHandler";

import { Player } from "../actor/player/Player";

// set up global ctxt as a singleton
const globalCtxtStr = `{
	"graphicsBackendName":	"canvas2D",
	"inputBackendName":		"default",
	"physicsBackendName":	"default",
  "resBaseUrl": "http://localhost:3333/"
}`;
const globalCtxtConfig = GlobalContextConfig.create(globalCtxtStr);
initGlobalCtxt(globalCtxtConfig);

// retrieve backends
const graphicsBackend = globalCtxt.graphicsBackend;
const inputBackend = globalCtxt.inputBackend;
const physicsBackend = globalCtxt.physicsBackend;

const testInputHandler = new TestInputHandler();
inputBackend.registerInputHandler(testInputHandler);

const player = new Player(20, 20);
player.wire();

const loop = () => {
	inputBackend.process();
	graphicsBackend.render();
};

// start game loop
setInterval(loop, 1000.0 / 60.0);

/*export {
	globalCtxt
};*/

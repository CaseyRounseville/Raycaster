import GlobalContextConfig from "./GlobalContextConfig";
import GlobalContext from "./GlobalContext";

import TestInputHandler from "../input/TestInputHandler";

import { Player } from "../actor/player/Player";

// set up global ctxt
const globalCtxtStr = `{
	"graphicsBackendName":	"canvas2D",
	"inputBackendName":		"default",
	"physicsBackendName":	"default"	
}`;
const globalCtxtConfig = GlobalContextConfig.create(globalCtxtStr);
export const globalCtxt = GlobalContext.create(globalCtxtConfig);

// retrieve backends
const graphicsBackend = globalCtxt.graphicsBackend;
const inputBackend = globalCtxt.inputBackend;
const physicsBackend = globalCtxt.physicsBackend;

const testInputHandler = TestInputHandler.create();
inputBackend.registerInputHandler(inputBackend, testInputHandler);

const player = Player.create(20, 20);
player.wire(player);

// start game loop
setInterval(loop, 1000.0 / 60.0);
function loop() {
	inputBackend.process(inputBackend);
	graphicsBackend.render(graphicsBackend);
};

/*export {
	globalCtxt
};*/
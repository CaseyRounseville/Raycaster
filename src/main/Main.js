import * as GlobalContextConfig from "./GlobalContextConfig";
import * as GlobalContext from "./GlobalContext";

import * as TestInputHandler from "../input/TestInputHandler";

import * as InputBackend from "../input/backend/InputBackend";

import * as Player from "../actor/player/Player";

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
InputBackend.registerInputHandler(inputBackend, testInputHandler);

const player = Player.create(20, 20);
player.wire(player);

const loop = () => {
	InputBackend.process(inputBackend);
	graphicsBackend.render(graphicsBackend);
};

// start game loop
setInterval(loop, 1000.0 / 60.0);

/*export {
	globalCtxt
};*/
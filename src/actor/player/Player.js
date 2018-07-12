import PlayerRenderer from "./PlayerRenderer";
import PlayerInputHandler from "./PlayerInputHandler";

import Actor from "../Actor";

import Vector2 from "../../physics/Vector2";

import GlobalContext from "../../main/GlobalContext";
import { globalCtxt } from "../../main/Main";

const wire = (self) => {
	alert("wiring player");
	
	//let globalCtxt = Main.globalCtxt;
	
	let graphicsBackend = globalCtxt.graphicsBackend;
	graphicsBackend.registerRenderer(graphicsBackend, self.renderer);
	
	let inputBackend = globalCtxt.inputBackend;
	inputBackend.registerInputHandler(inputBackend, self.inputHandler);
};

const unwire = (self) => {
	alert("unwiring player");
	
	//let globalCtxt = Main.globalCtxt;
	
	let graphicsBackend = globalCtxt.graphicsBackend;
	graphicsBackend.unregisterRenderer(graphicsBackend, self.renderer);
	
	let inputBackend = globalCtxt.inputBackend;
	inputBackend.unregisterInputHandler(inputBackend, self.inputHandler);
};

const create = (x, y) => {
	let player = Actor.create(wire, unwire);
	
	player.pos = Vector2.create(x, y);
	player.vel = Vector2.create(0, 0);
	
	player.renderer = PlayerRenderer.create(player);
	
	player.inputHandler = PlayerInputHandler.create(player);
	
	return player;
};

/*
const create = (protoActor) => {
	...
	could return null/undef, so no need for separate creator class
};
*/

export const Player = {
	create
};
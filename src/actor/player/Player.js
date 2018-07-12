import * as PlayerRenderer from "./PlayerRenderer";
import * as PlayerInputHandler from "./PlayerInputHandler";

import * as InputBackend from "../../input/backend/InputBackend";

import * as GraphicsBackend from "../../graphics/backend/GraphicsBackend";

import * as Actor from "../Actor";

import * as Vector2 from "../../physics/Vector2";

import * as GlobalContext from "../../main/GlobalContext";
import { globalCtxt } from "../../main/Main";

const wire = (self) => {
	alert("wiring player");
	
	//let globalCtxt = Main.globalCtxt;
	
	let graphicsBackend = globalCtxt.graphicsBackend;
	GraphicsBackend.registerRenderer(graphicsBackend, self.renderer);
	
	let inputBackend = globalCtxt.inputBackend;
	InputBackend.registerInputHandler(inputBackend, self.inputHandler);
};

const unwire = (self) => {
	alert("unwiring player");
	
	//let globalCtxt = Main.globalCtxt;
	
	let graphicsBackend = globalCtxt.graphicsBackend;
	GraphicsBackend.unregisterRenderer(graphicsBackend, self.renderer);
	
	let inputBackend = globalCtxt.inputBackend;
	InputBackend.unregisterInputHandler(inputBackend, self.inputHandler);
};

export const create = (x, y) => {
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
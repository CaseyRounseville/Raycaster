import * as PhysicsBackend from "./PhysicsBackend";

const process = () => {
	console.log("DefaultPhysicsBackend.process");
};

export const create = () => {
	let defaultPhysicsBackend = PhysicsBackend.create(process);
	
	return defaultPhysicsBackend;
};
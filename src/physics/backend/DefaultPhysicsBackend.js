import PhysicsBackend from "./PhysicsBackend";

const process = () => {
	console.log("DefaultPhysicsBackend.process");
};

const create = () => {
	let defaultPhysicsBackend = PhysicsBackend.create(process);
	
	return defaultPhysicsBackend;
};

export default {
	create
};
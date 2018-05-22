function PhysicsBackend() {
	this.bodies = [];
}

PhysicsBackend.prototype.processPhysics = function() {
	// empty
};

PhysicsBackend.prototype.registerBody = function(body) {
	this.bodies.push(body);
};

PhysicsBackend.prototype.unregisterBody = function(body) {
	this.bodies.remove(body);
};
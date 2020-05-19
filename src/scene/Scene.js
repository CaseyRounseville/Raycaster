export function Scene(blockMap, protoActors, entrances) {
	this.blockMap = blockMap;
	this.protoActors = protoActors;
	this.entrances = entrances;
}

Scene.prototype.wire = function() {
	this.blockMap.wire();
}

Scene.prototype.unwire = function() {
	this.blockMap.unwire();
}

const create = () => {
	return {
		strats = [];
	};
};

const registerStrat = (self, ver, strat) => {
	self.strats[ver] = strat;
};

const unregisterStrat = (self, ver) => {
	delete self.strats[ver];
};

const loadBlockMap = (self, buf) => {
	let ver = 0;
	
	// read ver from buf
	// ...
	
	return self.strats[ver].loadBlockMap(buf);
};

export default {
	create,
	registerStrat,
	unregisterStrat,
	loadBlockMap
};
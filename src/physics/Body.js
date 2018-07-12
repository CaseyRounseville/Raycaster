export const create = (pos, vel, hitBox) => {
	return {
		pos,
		vel,
		hitBox,
    listeners: []
	};
}

export const registerListener = (self, l) => {
  
};

export const unregisterListener = (self, l) => {
  
};
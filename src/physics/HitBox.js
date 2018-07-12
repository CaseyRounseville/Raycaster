const create = (pos, size) => {
	return {
		pos,
		size
	};
};

const top = (self) => {
	return self.pos.y - self.size.y / 2;
};

const bottom = (self) => {
	return self.pos.y + self.size.y / 2;
};

const left = (self) => {
	return self.pos.x - self.size.x / 2;
};

const right = (self) => {
	return self.pos.x + self.size.x / 2;
};

const intersects = (self, other) => {
	return self.left()  <	other.right()	 &&
         self.right()	>	other.left()	 &&
         self.top()		<	other.bottom() &&
         self.bottom	>	other.top();
};

export default {
	create,
	top,
	bottom,
	left,
	right,
	intersects
};
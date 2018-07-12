export const create = (pos, size) => {
	return {
		pos,
		size
	};
};

export const top = (self) => {
	return self.pos.y - self.size.y / 2;
};

export const bottom = (self) => {
	return self.pos.y + self.size.y / 2;
};

export const left = (self) => {
	return self.pos.x - self.size.x / 2;
};

export const right = (self) => {
	return self.pos.x + self.size.x / 2;
};

export const intersects = (self, other) => {
	return self.left()  <	other.right()	 &&
         self.right()	>	other.left()	 &&
         self.top()		<	other.bottom() &&
         self.bottom	>	other.top();
};
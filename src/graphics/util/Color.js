const WHITE		= 0xFFFFFFFF,
	  BLACK		= 0x000000FF,
	  PINK		= 0xFF00FFFF,
	  YELLOW	= 0x00FFFFFF,
	  RED		= 0xFF0000FF,
	  GREEN		= 0x00FF00FF,
	  BLUE		= 0x0000FFFF,
	  GRAY		= 0x7F7F7FFF,
	  PURPLE	= 0x7F007FFF;

const getComp1i = (color) => {
	return (color >> 24) & 0xFF;
};

const getComp2i = (color) => {
	return (color >> 16) & 0xFF;
};

const getComp3i = (color) => {
	return (color >> 8) & 0xFF;
};

const getComp4i = (color) => {
	return color & 0xFF;
};

const getComp1f = (color) => {
	return getComp1i(color) / 0xFF;
};

const getComp2f = (color) => {
	return getComp2i(color) / 0xFF;
};

const getComp3f = (color) => {
	return getComp3i(color) / 0xFF;
};

const getComp4f = (color) => {
	return getComp4i(color) / 0xFF;
};

const setComp1i = (color, comp1i) => {
	return clearComp1(color) | (comp1i << 24);
};

const setComp2i = (color, comp2i) => {
	return clearComp2(color) | (comp2i << 16);
};

const setComp3i = (color, comp3i) => {
	return clearComp3(color) | (comp3i << 8);
};

const setComp4i = (color, comp4i) => {
	return clearComp1(color) | comp4i;
};

const setComp1f = (color, comp1f) => {
	return setComp1i(Math.floor(comp1f * 0xFF));
};

const setComp2f = (color, comp2f) => {
	return setComp2i(Math.floor(comp2f * 0xFF));
};

const setComp3f = (color, comp3f) => {
	return setComp3i(Math.floor(comp3f * 0xFF));
};

const setComp4f = (color, comp4f) => {
	return setComp4i(Math.floor(comp4f * 0xFF));
};

const clearComp1 = (color) => {
	return color & 0x00FFFFFF;
};

const clearComp2 = (color) => {
	return color & 0xFF00FFFF;
};

const clearComp3 = (color) => {
	return color & 0xFFFF00FF;
};

const clearComp4 = (color) => {
	return color & 0xFFFFFF00;
};

const add = (color1, color2) => {
	let comp1i = Math.min(getComp1i(color1) + getComp1i(color2), 0xFF);
	let comp2i = Math.min(getComp2i(color1) + getComp2i(color2), 0xFF);
	let comp3i = Math.min(getComp3i(color1) + getComp3i(color2), 0xFF);
	let comp4i = Math.min(getComp4i(color1) + getcomp4i(color2), 0xFF);

	let result = 0;
	result = setComp1i(result, comp1i);
	result = setComp2i(result, comp2i);
	result = setComp3i(result, comp3i);
	result = setComp4i(result, comp4i);
	
	return result;
};

const multiply = (color1, color2) => {
	let comp1f = getComp1f(color1) * getComp1f(color2);
	let comp2f = getComp2f(color1) * getComp2f(color2);
	let comp3f = getComp3f(color1) * getComp3f(color2);
	let comp4f = getComp4f(color1) * getComp4f(color2);
	
	let result = 0;
	result = setComp1f(result, comp1f);
	result = setComp2f(result, comp2f);
	result = setComp3f(result, comp3f);
	result = setComp4f(result, comp4f);
	
	return result;
};

const weightedAverage = (color1, color2, weight) => {
	let comp1f = getComp1f(color1) * weight + getComp1f(color2) * (1 - weight);
	let comp2f = getComp2f(color1) * weight + getComp2f(color2) * (1 - weight);
	let comp3f = getComp3f(color1) * weight + getComp3f(color2) * (1 - weight);
	let comp4f = getComp4f(color1) * weight + getComp4f(color2) * (1 - weight);
	
	let result = 0;
	result = setComp1f(result, comp1f);
	result = setComp2f(result, comp2f);
	result = setComp3f(result, comp3f);
	result = setComp4f(result, comp4f);
	
	return result;
};

export default {
	WHITE,
	BLACK,
	PINK,
	YELLOW,
	RED,
	GREEN,
	BLUE,
	GRAY,
	PURPLE,
	
	getComp1i,
	getComp1f,
	getComp2i,
	getComp2f,
	getComp3i,
	getComp3f,
	getComp4i,
	getComp4f,
	
	setComp1i,
	setComp1f,
	setComp2i,
	setComp2f,
	setComp3i,
	setComp3f,
	setComp4i,
	setComp4f,
	
	clearComp1,
	clearComp2,
	clearComp3,
	clearComp4,

	add,
	multiply,
	weightedAverage
};

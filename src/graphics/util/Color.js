export const WHITE		= 0xFFFFFFFF,
             BLACK		= 0x000000FF,
             PINK		= 0xFF00FFFF,
             YELLOW	    = 0xFFFF00FF,
             RED		= 0xFF0000FF,
             GREEN	    = 0x00FF00FF,
             BLUE		= 0x0000FFFF,
             GRAY		= 0x7F7F7FFF,
             PURPLE	    = 0x7F007FFF;

export const getComp1i = (color) => {
	return (color >> 24) & 0xFF;
};

export const getComp2i = (color) => {
	return (color >> 16) & 0xFF;
};

export const getComp3i = (color) => {
	return (color >> 8) & 0xFF;
};

export const getComp4i = (color) => {
	return color & 0xFF;
};

export const getComp1f = (color) => {
	return getComp1i(color) / 0xFF;
};

export const getComp2f = (color) => {
	return getComp2i(color) / 0xFF;
};

export const getComp3f = (color) => {
	return getComp3i(color) / 0xFF;
};

export const getComp4f = (color) => {
	return getComp4i(color) / 0xFF;
};

export const setComp1i = (color, comp1i) => {
	return clearComp1(color) | (comp1i << 24);
};

export const setComp2i = (color, comp2i) => {
	return clearComp2(color) | (comp2i << 16);
};

export const setComp3i = (color, comp3i) => {
	return clearComp3(color) | (comp3i << 8);
};

export const setComp4i = (color, comp4i) => {
	return clearComp1(color) | comp4i;
};

export const setComp1f = (color, comp1f) => {
	return setComp1i(Math.floor(comp1f * 0xFF));
};

export const setComp2f = (color, comp2f) => {
	return setComp2i(Math.floor(comp2f * 0xFF));
};

export const setComp3f = (color, comp3f) => {
	return setComp3i(Math.floor(comp3f * 0xFF));
};

export const setComp4f = (color, comp4f) => {
	return setComp4i(Math.floor(comp4f * 0xFF));
};

export const clearComp1 = (color) => {
	return color & 0x00FFFFFF;
};

export const clearComp2 = (color) => {
	return color & 0xFF00FFFF;
};

export const clearComp3 = (color) => {
	return color & 0xFFFF00FF;
};

export const clearComp4 = (color) => {
	return color & 0xFFFFFF00;
};

export const add = (color1, color2) => {
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

export const multiply = (color1, color2) => {
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

export const weightedAverage = (color1, color2, weight) => {
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

import AnimationLoaderStrat0 from "./AnimationLoaderStrat0";

const strats = [ AnimationLoaderStrat0.loadAnimation ];

const loadAnimation = (self, obj) => {
  return strats[obj.version](obj);
};

export default {
  loadAnimation
};
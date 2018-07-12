import BlockSetLoaderStrat from "./BlockSetLoaderStrat";
import BlockSetLoaderStrat0 from "./BlockSetLoaderStrat0";

const strats = [
  BlockSetLoaderStrat0.loadBlockSet
];

const loadBlockSet = (self, obj) => {
  return strats[obj.version](obj);
};

export default {
  loadBlockSet
}
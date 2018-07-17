export const add = (arr, i, val) => {
  arr.splice(i, 0, val);
};

export const remove = (arr, val) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      arr.splice(i, 1);
    }
  }
};

export const setRangeConst = (arr, start, end, val) => {
  for (let i = start; i < end; i++) {
    arr[i] = val;
  }
  return arr;
};

export const setRangeFn = (arr, start, end, fn) => {
  for (let i = start; i < end; i++) {
    arr[i] = fn();
  }
  return arr;
};
export const yearList = (begin, end) => {
  var yearArray = [];
  for (var i = end; i >= begin; i--) {
    yearArray.push(i);
  }
  return yearArray;
};

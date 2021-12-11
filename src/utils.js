const groupBy = function (data, key) {
  return data.reduce(function (storage, item) {
    var group = item[key];
    storage[group] = storage[group] || [];
    storage[group].push(item);
    return storage;
  }, {});
};

export { groupBy };

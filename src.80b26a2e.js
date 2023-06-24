// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Kyho":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appendAxes = appendAxes;
exports.generateG = generateG;
exports.setCanvasSize = setCanvasSize;
/**
 * Generates the SVG element g which will contain the data visualisation.
 *
 * @param {object} margin The desired margins around the graph
 * @returns {*} The d3 Selection for the created g element
 */
function generateG(margin) {
  return d3.select('.overview-graph').select('svg').append('g').attr('id', 'overview-graph-g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
}

/**
 * Sets the size of the SVG canvas containing the graph.
 *
 * @param {number} width The desired width
 * @param {number} height The desired height
 */
function setCanvasSize(width, height) {
  d3.select('#overview-heatmap').select('svg').attr('width', width).attr('height', height);
}

/**
 * Appends an SVG g element which will contain the axes.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
function appendAxes(g) {
  g.append('g').attr('class', 'x axis');
  g.append('g').attr('class', 'y axis');
}
},{}],"pbTI":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.append = append;
/**
 * Generates a media selection menu and appends it to the provided parent element.
 *
 * @param {Element} parent The parent element to which the menu will be appended
 * @param {string[]} items A list of strings to display in the dropdown menu
 * @param {Function} onSelection A function which takes a string of the selected media as a parameter
 */
function append(parent, items, onSelection) {
  var container = createContainer();
  createButton(container);
  createList(container);
  var buttons = container.appendChild(document.createElement('div'));
  createSelectAllButton(buttons);
  createRemoveAllButton(buttons);

  /**
   * Creates the container which will contain the dropdown menu.
   *
   * @returns {Element} The container element
   */
  function createContainer() {
    var container = document.createElement('div');
    container.setAttribute('class', 'dropdown-container');
    parent.appendChild(container);
    return container;
  }

  /**
   * Creates the button which shows the rest of the dropdown menu.
   *
   * @param {Element} container The container to create the button in
   */
  function createButton(container) {
    var selectBtn = document.createElement('div');
    selectBtn.setAttribute('class', 'dropdown-select-btn');
    selectBtn.addEventListener('click', function () {
      selectBtn.classList.toggle('open');
    });
    selectBtn.innerHTML = "\n      <span class=\"dropdown-btn-text\">Select Media</span>\n      <span class=\"dropdown-arrow-dwn\">\n        <i class=\"fa-solid fa-chevron-down\"></i>\n      </span>\n    ";
    container.appendChild(selectBtn);
  }

  /**
   * Creates the dropdown list.
   *
   * @param {Element} container The container to create the dropdown list in
   */
  function createList(container) {
    var list = document.createElement('ul');
    list.setAttribute('class', 'dropdown-list-items');
    items.forEach(function (item) {
      var listItem = document.createElement('li');
      listItem.setAttribute('class', 'dropdown-item');
      listItem.addEventListener('click', function () {
        listItem.classList.toggle('checked');
        var checkedElements = container.querySelectorAll('.checked');
        var checkedMedia = Array.from(checkedElements).map(function (element) {
          return element.innerText;
        });
        var btnText = container.querySelector('.dropdown-btn-text');
        if (checkedElements && checkedElements.length > 0) {
          btnText.innerText = "".concat(checkedElements.length, " Selected");
        } else {
          btnText.innerText = 'Select Media';
        }
        onSelection(checkedMedia);
      });
      listItem.innerHTML = "\n        <span class=\"dropdown-checkbox\">\n          <i class=\"fa-solid fa-check dropdown-check-icon\"></i>\n        </span>\n        <span class=\"dropdown-item-text\">".concat(item, "</span>\n      ");
      list.appendChild(listItem);
    });
    container.appendChild(list);
  }

  /**
   * Creates the 'Select all media' button.
   *
   * @param {*} container The container to create the button in
   */
  function createSelectAllButton(container) {
    var button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('select-all');
    button.innerText = 'Select all media';
    button.addEventListener('click', function () {
      var listItems = container.parentElement.querySelectorAll('li');
      var btnText = container.parentElement.querySelector('.dropdown-btn-text');
      listItems.forEach(function (listItem) {
        return listItem.classList.add('checked');
      });
      btnText.innerText = "".concat(items.length, " Selected");
      onSelection(items);
    });
    container.appendChild(button);
  }

  /**
   * Creates the 'Remove all media' button.
   *
   * @param {*} container The container to create the button in
   */
  function createRemoveAllButton(container) {
    var button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.innerText = 'Remove all media';
    button.classList.add('remove-all');
    button.addEventListener('click', function () {
      var listItems = container.parentElement.querySelectorAll('li');
      var btnText = container.parentElement.querySelector('.dropdown-btn-text');
      listItems.forEach(function (listItem) {
        return listItem.classList.remove('checked');
      });
      btnText.innerText = 'Select Media';
      onSelection([]);
    });
    container.appendChild(button);
  }
}
},{}],"I9no":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addTimeBlocks = addTimeBlocks;
exports.aggregateColumns = aggregateColumns;
exports.filterDataByDates = filterDataByDates;
exports.getMediaList = getMediaList;
exports.getUniqueTimeBlocks = getUniqueTimeBlocks;
exports.normalizeColumn = normalizeColumn;
exports.processDateTime = processDateTime;
exports.removeAfter = removeAfter;
exports.setYear = setYear;
exports.sortByColumns = sortByColumns;
exports.trim = trim;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Trims the data to only the wanted columns
 *
 * @param {object[]} data The data to analyze
 * @param {string[]} targets The columns to keep
 * @returns {object[]} The data with only the needed columns
 */
function trim(data, targets) {
  return data.map(function (row) {
    var trimmedRow = {};
    targets.forEach(function (target) {
      trimmedRow[target] = row[target];
    });
    return trimmedRow;
  });
}
function removeAfter(data, date) {
  return data.filter(function (row) {
    return new Date(row.date) < date;
  });
}
function setYear(data) {
  return data.map(function (row) {
    var year = new Date(row.date).getFullYear();
    return _objectSpread(_objectSpread({}, row), {}, {
      year: parseInt(year)
    });
  });
}
function getMediaList(data) {
  return _toConsumableArray(new Set(data.map(function (row) {
    return row["média"];
  })));
}

/**
 * Aggregates specific columns
 *
 * @param {object[]} data The data to analyze
 * @param {string} targets The columns to aggregate
 * @param {string[]} groupBy The columns to group by when aggregating
 * @returns {object[]} The data with the groupBy columns and the aggregated column
 */
function aggregateColumns(data, sumCols, listCols, groupBy) {
  data = trim(data, sumCols.concat(groupBy).concat(listCols));
  var groupedData = d3.group(data, function (d) {
    return groupBy.map(function (column) {
      return d[column];
    }).join("-");
  });
  var aggregatedData = Array.from(groupedData, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      values = _ref2[1];
    var aggregation = _objectSpread(_objectSpread({}, values[0]), {}, {
      count: values.length
    });
    sumCols.forEach(function (target) {
      var sum = d3.sum(values, function (d) {
        return d[target];
      });
      var average = sum / values.length;
      aggregation[target] = sum;
      aggregation["".concat(target, "Average")] = Math.floor(average);
    });
    listCols.forEach(function (column) {
      aggregation["".concat(column, "List")] = Array.from(new Set(values.map(function (value) {
        return value[column];
      })));
    });
    groupBy.forEach(function (column, index) {
      aggregation[column] = key.split("-")[index];
    });
    return aggregation;
  });
  return aggregatedData;
}

/**
 * Sorts the data by specific columns in order
 *
 * @param {object[]} data The data to analyze
 * @param {string[]} sortBy The columns to sort by, priority given to smallest index
 * @param {boolean} isDescending Determines if sort order is ascending or descending
 * @returns {object[]} The sorted data
 */
function sortByColumns(data, sortBy) {
  var isDescending = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var sortedData = _toConsumableArray(data); // Create a copy of the original data to avoid modifying it directly

  sortedData.sort(function (a, b) {
    for (var i = 0; i < sortBy.length; i++) {
      var column = sortBy[i];
      var result = 0;
      if (a[column] < b[column]) result = -1;else if (a[column] > b[column]) result = 1;
      if (isDescending) result = -result; // Reverse the sorting order for descending

      if (result !== 0) return result;
    }
    return 0;
  });
  return sortedData;
}

/**
 * Splits date into date and time and adds day of week
 *
 * @param {object[]} data The data to analyze
 * @returns {object[]} The data with the processed datetime and day of week
 */
function processDateTime(data) {
  var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var processedData = data.map(function (item) {
    var dateTimeParts = item.date.split(" ");
    var date = dateTimeParts[0];
    var time = dateTimeParts[1];
    var dayOfWeekIndex = new Date(date).getDay();
    var dayOfWeek = daysOfWeek[dayOfWeekIndex];
    return _objectSpread(_objectSpread({}, item), {}, {
      date: date,
      time: time,
      dayOfWeek: dayOfWeek
    });
  });
  return processedData;
}

/**
 * Filters the data by only keeping entries within the dates.THIS FUNCTION ASSUMES processDateTime was applied.
 *
 * @param {object[]} data The data
 * @param {string} startDate The start date
 * @param {string} endDate The end date
 * @returns {object[]} The data within the dates
 */
function filterDataByDates(data, startDate, endDate) {
  var filteredData = data.filter(function (obj) {
    var date = obj.date; // Assuming the date column is in the format "yyyy-mm-dd"
    return date >= startDate && date <= endDate;
  });
  return filteredData;
}
/**
 * Adds time block dpending on time of publication
 *
 * @param {object[]} data The data to analyze
 * @param {number} timeBlockLength the length of the time block. Default is 2
 * @returns {object[]} The data with the time block clomun added
 */
function addTimeBlocks(data) {
  var timeBlockLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var processedData = data.map(function (item) {
    var timeParts = item.time.split(":");
    var hour = Number(timeParts[0]);
    var minute = Number(timeParts[1]);

    // Calculate the total minutes from 00:00
    var totalMinutes = hour * 60 + minute;

    // Calculate the time block
    var timeBlockStart = Math.floor(totalMinutes / (timeBlockLength * 60)) * (timeBlockLength * 60);
    var timeBlockEnd = timeBlockStart + timeBlockLength * 60;

    // Format the time block as HH:MM - HH:MM
    var timeBlock = "".concat(String(Math.floor(timeBlockStart / 60)).padStart(2, "0"), ":").concat(String(timeBlockStart % 60).padStart(2, "0"), " to ").concat(String(Math.floor(timeBlockEnd / 60)).padStart(2, "0"), ":").concat(String(timeBlockEnd % 60).padStart(2, "0"));
    return _objectSpread(_objectSpread({}, item), {}, {
      timeBlock: timeBlock
    });
  });
  return processedData;
}

/**
 * Returns a list of unique time blocks (useful to get the domain)
 *
 * @param {object[]} data The data to analyze
 * @returns {string[]} The unique timeBlocks in the data
 */
function getUniqueTimeBlocks(data) {
  var uniqueTimeBlocks = new Set();
  data.forEach(function (item) {
    var timeBlock = item.timeBlock;
    uniqueTimeBlocks.add(timeBlock);
  });
  return Array.from(uniqueTimeBlocks);
}

/**
 * Normalizes a column
 *
 * @param {object[]} data The data to analyze
 * @param {string} targetColumn The column to normalize
 * @returns {object[]} The column with the normalized data
 */
function normalizeColumn(data, targetColumn) {
  var min = Math.min.apply(Math, _toConsumableArray(data.map(function (obj) {
    return obj[targetColumn];
  })));
  var max = Math.max.apply(Math, _toConsumableArray(data.map(function (obj) {
    return obj[targetColumn];
  })));
  data.forEach(function (obj) {
    obj["".concat(targetColumn, "Normalized")] = (obj[targetColumn] - min) / (max - min);
  });
  return data;
}
},{}],"lDuF":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prefix = exports.default = void 0;
var prefix = "$";
exports.prefix = prefix;
function Map() {}
Map.prototype = map.prototype = {
  constructor: Map,
  has: function (key) {
    return prefix + key in this;
  },
  get: function (key) {
    return this[prefix + key];
  },
  set: function (key, value) {
    this[prefix + key] = value;
    return this;
  },
  remove: function (key) {
    var property = prefix + key;
    return property in this && delete this[property];
  },
  clear: function () {
    for (var property in this) if (property[0] === prefix) delete this[property];
  },
  keys: function () {
    var keys = [];
    for (var property in this) if (property[0] === prefix) keys.push(property.slice(1));
    return keys;
  },
  values: function () {
    var values = [];
    for (var property in this) if (property[0] === prefix) values.push(this[property]);
    return values;
  },
  entries: function () {
    var entries = [];
    for (var property in this) if (property[0] === prefix) entries.push({
      key: property.slice(1),
      value: this[property]
    });
    return entries;
  },
  size: function () {
    var size = 0;
    for (var property in this) if (property[0] === prefix) ++size;
    return size;
  },
  empty: function () {
    for (var property in this) if (property[0] === prefix) return false;
    return true;
  },
  each: function (f) {
    for (var property in this) if (property[0] === prefix) f(this[property], property.slice(1), this);
  }
};
function map(object, f) {
  var map = new Map();

  // Copy constructor.
  if (object instanceof Map) object.each(function (value, key) {
    map.set(key, value);
  });

  // Index array by numeric index or specified key function.
  else if (Array.isArray(object)) {
    var i = -1,
      n = object.length,
      o;
    if (f == null) while (++i < n) map.set(i, object[i]);else while (++i < n) map.set(f(o = object[i], i, object), o);
  }

  // Convert object to map.
  else if (object) for (var key in object) map.set(key, object[key]);
  return map;
}
var _default = map;
exports.default = _default;
},{}],"kDkA":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _map = _interopRequireDefault(require("./map"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default() {
  var keys = [],
    sortKeys = [],
    sortValues,
    rollup,
    nest;
  function apply(array, depth, createResult, setResult) {
    if (depth >= keys.length) {
      if (sortValues != null) array.sort(sortValues);
      return rollup != null ? rollup(array) : array;
    }
    var i = -1,
      n = array.length,
      key = keys[depth++],
      keyValue,
      value,
      valuesByKey = (0, _map.default)(),
      values,
      result = createResult();
    while (++i < n) {
      if (values = valuesByKey.get(keyValue = key(value = array[i]) + "")) {
        values.push(value);
      } else {
        valuesByKey.set(keyValue, [value]);
      }
    }
    valuesByKey.each(function (values, key) {
      setResult(result, key, apply(values, depth, createResult, setResult));
    });
    return result;
  }
  function entries(map, depth) {
    if (++depth > keys.length) return map;
    var array,
      sortKey = sortKeys[depth - 1];
    if (rollup != null && depth >= keys.length) array = map.entries();else array = [], map.each(function (v, k) {
      array.push({
        key: k,
        values: entries(v, depth)
      });
    });
    return sortKey != null ? array.sort(function (a, b) {
      return sortKey(a.key, b.key);
    }) : array;
  }
  return nest = {
    object: function (array) {
      return apply(array, 0, createObject, setObject);
    },
    map: function (array) {
      return apply(array, 0, createMap, setMap);
    },
    entries: function (array) {
      return entries(apply(array, 0, createMap, setMap), 0);
    },
    key: function (d) {
      keys.push(d);
      return nest;
    },
    sortKeys: function (order) {
      sortKeys[keys.length - 1] = order;
      return nest;
    },
    sortValues: function (order) {
      sortValues = order;
      return nest;
    },
    rollup: function (f) {
      rollup = f;
      return nest;
    }
  };
}
function createObject() {
  return {};
}
function setObject(object, key, value) {
  object[key] = value;
}
function createMap() {
  return (0, _map.default)();
}
function setMap(map, key, value) {
  map.set(key, value);
}
},{"./map":"lDuF"}],"vFPv":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _map = _interopRequireWildcard(require("./map"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function Set() {}
var proto = _map.default.prototype;
Set.prototype = set.prototype = {
  constructor: Set,
  has: proto.has,
  add: function (value) {
    value += "";
    this[_map.prefix + value] = value;
    return this;
  },
  remove: proto.remove,
  clear: proto.clear,
  values: proto.keys,
  size: proto.size,
  empty: proto.empty,
  each: proto.each
};
function set(object, f) {
  var set = new Set();

  // Copy constructor.
  if (object instanceof Set) object.each(function (value) {
    set.add(value);
  });

  // Otherwise, assume it’s an array.
  else if (object) {
    var i = -1,
      n = object.length;
    if (f == null) while (++i < n) set.add(object[i]);else while (++i < n) set.add(f(object[i], i, object));
  }
  return set;
}
var _default = set;
exports.default = _default;
},{"./map":"lDuF"}],"DTc5":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(map) {
  var keys = [];
  for (var key in map) keys.push(key);
  return keys;
}
},{}],"KaQc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(map) {
  var values = [];
  for (var key in map) values.push(map[key]);
  return values;
}
},{}],"wnH6":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(map) {
  var entries = [];
  for (var key in map) entries.push({
    key: key,
    value: map[key]
  });
  return entries;
}
},{}],"S3hn":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "entries", {
  enumerable: true,
  get: function () {
    return _entries.default;
  }
});
Object.defineProperty(exports, "keys", {
  enumerable: true,
  get: function () {
    return _keys.default;
  }
});
Object.defineProperty(exports, "map", {
  enumerable: true,
  get: function () {
    return _map.default;
  }
});
Object.defineProperty(exports, "nest", {
  enumerable: true,
  get: function () {
    return _nest.default;
  }
});
Object.defineProperty(exports, "set", {
  enumerable: true,
  get: function () {
    return _set.default;
  }
});
Object.defineProperty(exports, "values", {
  enumerable: true,
  get: function () {
    return _values.default;
  }
});
var _nest = _interopRequireDefault(require("./nest"));
var _set = _interopRequireDefault(require("./set"));
var _map = _interopRequireDefault(require("./map"));
var _keys = _interopRequireDefault(require("./keys"));
var _values = _interopRequireDefault(require("./values"));
var _entries = _interopRequireDefault(require("./entries"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./nest":"kDkA","./set":"vFPv","./map":"lDuF","./keys":"DTc5","./values":"KaQc","./entries":"wnH6"}],"bQz2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appendLines = appendLines;
exports.drawXAxis = drawXAxis;
exports.drawYAxis = drawYAxis;
exports.generateGraphSubtitle = generateGraphSubtitle;
exports.generateGraphTitle = generateGraphTitle;
exports.rotateYTicks = rotateYTicks;
exports.setColorScaleDomain = setColorScaleDomain;
exports.updateLines = updateLines;
exports.updateXScale = updateXScale;
exports.updateYScale = updateYScale;
var d3Collection = _interopRequireWildcard(require("d3-collection"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Sets the domain of the color scale
 *
 * @param {*} colorScale The color scale used in the heatmap
 * @param {object[]} data The data to be displayed
 * @param {string} targetColumn The column to use as domain
 */
function setColorScaleDomain(colorScale, data, targetColumn) {
  var averageViews = data.map(function (entry) {
    return entry[targetColumn];
  });
  colorScale.domain(d3.extent(averageViews));
}

/**
 * For each data element, appends a group 'g' to which an SVG rect is appended
 *
 * @param {object[]} data The data to use for binding
 */
function appendLines(data) {
  // TODO : Append SVG rect elements
  // d3.select("svg").selectAll(".line").append("g").attr("class", "line");
  // // .data(sumstat)
  // // .enter()
  // // .append("path");
}

/**
 * Updates the domain and range of the scale for the x axis
 *
 * @param {*} xScale The scale for the x axis
 * @param {number} width The width of the diagram
 */
function updateXScale(data, xScale, width) {
  var xExtent = d3.extent(data, function (d) {
    return new Date(d.date);
  });
  xScale.domain(xExtent).range([0, width]);
}

/**
 * Updates the domain and range of the scale for the y axis
 *
 * @param {*} yScale The scale for the y axis
 * @param {object[]} timeBlocks The names of the neighborhoods
 * @param {number} height The height of the diagram
 */
function updateYScale(yScale, data, height, domainColumn) {
  var yExtent = d3.extent(data, function (row) {
    return row[domainColumn];
  });
  yScale.domain(yExtent).range([height, 0]);
}

/**
 *  Draws the X axis at the top of the diagram.
 *
 *  @param {*} xScale The scale to use to draw the axis
 */
function drawXAxis(xScale, height) {
  // TODO : Draw X axis
  var xAxisGenerator = d3.axisBottom().scale(xScale);
  d3.select("#overview-graph-g .x").attr("transform", "translate(0,".concat(height, ")")).attr("color", "white").call(xAxisGenerator);
}

/**
 * Draws the Y axis to the right of the diagram.
 *
 * @param {*} yScale The scale to use to draw the axis
 * @param {number} width The width of the graphic
 */
function drawYAxis(yScale, width) {
  // TODO : Draw Y axis
  var yAxisGenerator = d3.axisLeft().scale(yScale);
  d3.select("#overview-graph-g .y").attr("transform", "translate(".concat(0, ",0)")).attr("color", "white").call(yAxisGenerator);
}

/**
 * Rotates the ticks on the Y axis 30 degrees towards the left.
 */
function rotateYTicks() {
  // TODO : Rotate Y ticks.
  d3.selectAll("#overview-graph-g .y .tick").attr("transform", function () {
    return d3.select(this).attr("transform") + " rotate(".concat(-30, ")");
  });
}

/**
 * After the rectangles have been appended, this function dictates
 * their position, size and fill color.
 *
 * @param {*} xScale The x scale used to position the rectangles
 * @param {*} yScale The y scale used to position the rectangles
 * @param {*} colorScale The color scale used to set the rectangles' colors
 * @param {string} targetColumn The column to use as domain
 */
function updateLines(xScale, yScale, colorScale, data, domainColumn, displayPanel, selectedMediaList) {
  // TODO : Set position, size and fill of rectangles according to bound data

  var sumstat = d3Collection.nest().key(function (d) {
    return d["média"];
  }).entries(data);
  d3.selectAll(".drawn-line").remove();
  d3.select("svg").selectAll(".line").append("g").data(sumstat).enter().append("path").attr("class", "drawn-line").attr("d", function (d) {
    if (selectedMediaList.includes(d.key)) {
      return d3.line().x(function (d) {
        return xScale(new Date(d.date));
      }).y(function (d) {
        return yScale(d[domainColumn]);
      }).curve(d3.curveLinear)(d.values);
    }
    return null;
  }).attr("transform", "translate(50, 10)").style("fill", "none").style("stroke", "#803082").style("stroke-width", "1").on("mouseenter", function (d) {
    // draw other
    d3.select(this).style("stroke", "steelblue").style("stroke-width", "2");
    // draw the circles too
    d3.selectAll(".drawn-circle").filter(function (circleData) {
      return circleData["média"] === d.target.__data__.key;
    }).style("fill", "steelblue");
  }).on("mouseleave", function (d) {
    d3.select(this).style("stroke", "#803082").style("stroke-width", "1");
    // undraw the circles too
    d3.selectAll(".drawn-circle").filter(function (circleData) {
      return circleData["média"] === d.target.__data__.key;
    }).style("fill", "#803082");
  });
  d3.selectAll(".drawn-circle").remove();
  d3.select("svg").selectAll(".circle").append("g").data(data).join("circle").attr("class", "drawn-circle").filter(function (d) {
    return selectedMediaList.includes(d["média"]);
  }).attr("r", "2").attr("fill", "#803082").attr("transform", function (d) {
    return "translate(".concat(50 + xScale(new Date(d.date)), ", ").concat(10 + yScale(d[domainColumn]), ")");
  }).on("mouseenter", function (d) {
    // draw other circles too
    d3.selectAll(".drawn-circle").filter(function (circleData) {
      return circleData["média"] === d.target.__data__["média"];
    }).style("fill", "steelblue");

    // draw the line too
    d3.selectAll(".drawn-line").filter(function (lineData) {
      return lineData.key === d.target.__data__["média"];
    }).style("stroke", "steelblue");

    // set hovered circle with higher radius
    d3.select(this).style("fill", "steelblue").attr("r", "4");
    displayPanel(d);
  }).on("mouseleave", function (d) {
    d3.select(this).style("fill", "#803082").attr("r", "2");

    // undraw other circles too
    d3.selectAll(".drawn-circle").filter(function (circleData) {
      return circleData["média"] === d.target.__data__["média"];
    }).style("fill", "#803082");

    // undraw the line too
    d3.selectAll(".drawn-line").filter(function (lineData) {
      return lineData.key === d.target.__data__["média"];
    }).style("stroke", "#803082");
  });
}

/**
 * Generates the subtitle for the visualization.
 *
 * @param {Date} minDate The minimum displayed date
 * @param {Date} maxDate The maximum displayed date
 * @param {number} width The width of the g element containing the visualization
 */
function generateGraphSubtitle(minDate, maxDate, width) {
  var svg = d3.select('#overview-graph-g');
  var formattedMinDate = minDate.toLocaleDateString('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  var formattedMaxDate = maxDate.toLocaleDateString('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  var subtitle = d3.select('#overview .overview-subtitle');
  if (subtitle.node()) {
    subtitle.attr('x', width / 2).text("From ".concat(formattedMinDate, " to ").concat(formattedMaxDate));
  } else {
    svg.append('text').attr('class', 'overview-subtitle').attr('x', width / 2).attr('y', -10).attr('text-anchor', 'middle').attr('fill', '#a4a4a4').style('font-size', '14px').text("From ".concat(formattedMinDate, " to ").concat(formattedMaxDate));
  }
}

/**
 * Generates the title of the visualization.
 *
 * @param {string} title The title of the visualization
 * @param {number} width The width of the g element containing the visualization
 */
function generateGraphTitle(title, width) {
  var svg = d3.select('#overview-graph-g');
  var graphTitle = d3.select('#overview .overview-title');
  if (graphTitle.node()) {
    // update title if it already exists
    graphTitle.attr('x', width / 2).text(title);
  } else {
    svg.append('text').attr('class', 'overview-title').attr('x', width / 2).attr('y', -40).attr('text-anchor', 'middle').attr('fill', '#fff').style('font-size', '20px').style('font-weight', 'bold').text(title);
  }
}
},{"d3-collection":"S3hn"}],"xl4k":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayPanel = displayPanel;
exports.initPanelDiv = initPanelDiv;
/**
 * Initializes the div which will contain the information panel.
 */
function initPanelDiv() {
  d3.select("#overview-heatmap").append("div").attr("id", "overview-panel");
}

/**
 * Displays the information panel when a data point is clicked.
 *
 * @param {object} d The data bound to the clicked marker
 */
function displayPanel(d) {
  var panel = d3.select("#overview-panel").style("visibility", "visible");
  var data = d.target.__data__;
  panel.selectAll("*").remove();

  // Media name
  panel.append("div").style("font-family", "Roboto").style("font-size", "20px").style("font-weight", "bold").text(data["média"]);

  // Select year and month
  panel.append("div").style("font-family", "Roboto").style("font-size", "18px").text(data.date);

  // Number of videos
  panel.append("div").style("font-family", "Roboto").style("font-size", "16px").style("padding-top", "25px").text("Number of videos: ".concat(data.count));

  // Number of views
  panel.append("div").style("font-family", "Roboto").style("font-size", "16px").style("padding-top", "25px").text("Total Views: ".concat(data.vues));

  // Average views
  panel.append("div").style("font-family", "Roboto").style("font-size", "16px").style("padding-top", "3px").text("Total likes: ".concat(data.likes));

  // Average likes
  panel.append("div").style("font-family", "Roboto").style("font-size", "16px").style("padding-top", "3px").text("Total comments: ".concat(data.commentaires));

  // Average comments
  panel.append("div").style("font-family", "Roboto").style("font-size", "16px").style("padding-top", "3px").text("Total shares: ".concat(data.partages));
}
},{}],"qFBM":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.append = append;
/* eslint-disable no-undef */

/**
 * Generates a time range slider and appends it to the provided parent element.
 *
 * Slider documentation: http://ionden.com/a/plugins/ion.rangeSlider/
 *
 * @param {Element} parent The element to which the slider will be appended
 * @param {Date} min The minimum date
 * @param {Date} max The maximum date
 * @param {Function} onChange Callback function to call when the value of the slider changes.
 *                            This function takes one object parameter with "from" and "to" properties containing Date objects
 */
function append(parent, min, max, _onChange) {
  var slider = document.createElement('input');
  slider.setAttribute('type', 'text');
  parent.appendChild(slider);
  $(slider).ionRangeSlider({
    skin: 'round',
    type: 'double',
    min: min.valueOf(),
    max: max.valueOf(),
    hide_min_max: true,
    hide_from_to: false,
    force_edges: true,
    prettify: function prettify(ts) {
      return new Date(ts).toLocaleDateString('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    onChange: function onChange(data) {
      // transform data into Date objects
      _onChange({
        from: new Date(data.from),
        to: new Date(data.to)
      });
    }
  });
}
},{}],"Pwqr":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.append = append;
/**
 * Generates a "sort by" selection menu and appends it to the provided parent element.
 * The user can choose between four options: views, likes, comments and shares
 *
 * @param {Element} parent The parent element to which the menu will be appended
 * @param {object} items An object where each key is a string to display in the dropdown menu and where each value
 *                       will be passed to the onSelection callback upon selecting the corresponding string
 * @param {Function} onSelection A function which takes the selected item as a parameter
 */
function append(parent, items, onSelection) {
  var container = createContainer();
  createSelect(container);
  createList(container);

  /**
   * Creates the container which will contain the dropdown menu.
   *
   * @returns {Element} The container element
   */
  function createContainer() {
    var container = document.createElement('div');
    container.setAttribute('class', 'dropdown-container');
    parent.appendChild(container);
    return container;
  }

  /**
   * Creates the button which shows the rest of the dropdown menu.
   *
   * @param {Element} container The container to create the button in
   */
  function createSelect(container) {
    var select = document.createElement('div');
    select.setAttribute('class', 'dropdown-select-btn');
    select.addEventListener('click', function () {
      select.classList.toggle('open');
    });
    select.innerHTML = "\n      <span class=\"dropdown-btn-text\">".concat(Object.keys(items)[0], "</span>\n      <span class=\"dropdown-arrow-dwn\">\n        <i class=\"fa-solid fa-chevron-down\"></i>\n      </span>\n    ");
    container.appendChild(select);
  }

  /**
   * Creates the dropdown list.
   *
   * @param {Element} container The container to create the dropdown list in
   */
  function createList(container) {
    var list = document.createElement('ul');
    list.setAttribute('class', 'dropdown-list-items');
    Object.entries(items).forEach(function (item) {
      var listItem = document.createElement('li');
      listItem.setAttribute('class', 'dropdown-item');
      listItem.addEventListener('click', function () {
        onSelection(item[1]);
        var select = container.querySelector('.dropdown-select-btn');
        var btnText = container.querySelector('.dropdown-btn-text');
        btnText.innerText = listItem.innerText;
        select.classList.toggle('open');
      });
      listItem.innerHTML = "\n        <span class=\"dropdown-item-text\">".concat(item[0], "</span>\n      ");
      list.appendChild(listItem);
    });
    container.appendChild(list);
  }
}
},{}],"xz73":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(specifier) {
  var n = specifier.length / 6 | 0,
    colors = new Array(n),
    i = 0;
  while (i < n) colors[i] = "#" + specifier.slice(i * 6, ++i * 6);
  return colors;
}
},{}],"dTYe":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = (0, _colors.default)("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");
exports.default = _default;
},{"../colors.js":"xz73"}],"o8vx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = (0, _colors.default)("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666");
exports.default = _default;
},{"../colors.js":"xz73"}],"regV":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = (0, _colors.default)("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666");
exports.default = _default;
},{"../colors.js":"xz73"}],"E9sC":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = (0, _colors.default)("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928");
exports.default = _default;
},{"../colors.js":"xz73"}],"RCRU":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = (0, _colors.default)("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2");
exports.default = _default;
},{"../colors.js":"xz73"}],"QfGF":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = (0, _colors.default)("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc");
exports.default = _default;
},{"../colors.js":"xz73"}],"IldB":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = (0, _colors.default)("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999");
exports.default = _default;
},{"../colors.js":"xz73"}],"KR9o":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = (0, _colors.default)("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3");
exports.default = _default;
},{"../colors.js":"xz73"}],"XNXw":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = (0, _colors.default)("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f");
exports.default = _default;
},{"../colors.js":"xz73"}],"FyyB":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = (0, _colors.default)("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab");
exports.default = _default;
},{"../colors.js":"xz73"}],"JOJb":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.extend = extend;
function _default(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}
},{}],"oXN0":[function(require,module,exports) {

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Color = Color;
exports.Rgb = Rgb;
exports.darker = exports.brighter = void 0;
exports.default = color;
exports.hsl = hsl;
exports.hslConvert = hslConvert;
exports.rgb = rgb;
exports.rgbConvert = rgbConvert;
var _define = _interopRequireWildcard(require("./define.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function Color() {}
var darker = 0.7;
exports.darker = darker;
var brighter = 1 / darker;
exports.brighter = brighter;
var reI = "\\s*([+-]?\\d+)\\s*",
  reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  reHex = /^#([0-9a-f]{3,8})$/,
  reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
  reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
  reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
  reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
  reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
  reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};
(0, _define.default)(Color, color, {
  copy: function (channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable: function () {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
  : l === 3 ? new Rgb(m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, (m & 0xf) << 4 | m & 0xf, 1) // #f00
  : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
  : l === 4 ? rgba(m >> 12 & 0xf | m >> 8 & 0xf0, m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, ((m & 0xf) << 4 | m & 0xf) / 0xff) // #f000
  : null // invalid hex
  ) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
  : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
  : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
  : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
  : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
  : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
  : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
  : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}
function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}
function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
(0, _define.default)(Rgb, rgb, (0, _define.extend)(Color, {
  brighter: function (k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function (k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function () {
    return this;
  },
  displayable: function () {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return "#" + hex(this.r) + hex(this.g) + hex(this.b);
}
function rgb_formatRgb() {
  var a = this.opacity;
  a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
  return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
}
function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;else if (l <= 0 || l >= 1) h = s = NaN;else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}
function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl();
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
    g = o.g / 255,
    b = o.b / 255,
    min = Math.min(r, g, b),
    max = Math.max(r, g, b),
    h = NaN,
    s = max - min,
    l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;else if (g === max) h = (b - r) / s + 2;else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}
function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
(0, _define.default)(Hsl, hsl, (0, _define.extend)(Color, {
  brighter: function (k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function (k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function () {
    var h = this.h % 360 + (this.h < 0) * 360,
      s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
      l = this.l,
      m2 = l + (l < 0.5 ? l : 1 - l) * s,
      m1 = 2 * l - m2;
    return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
  },
  displayable: function () {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl: function () {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a === 1 ? ")" : ", " + a + ")");
  }
}));

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}
},{"./define.js":"JOJb"}],"kGlK":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rad2deg = exports.deg2rad = void 0;
var deg2rad = Math.PI / 180;
exports.deg2rad = deg2rad;
var rad2deg = 180 / Math.PI;
exports.rad2deg = rad2deg;
},{}],"oIKs":[function(require,module,exports) {

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hcl = Hcl;
exports.Lab = Lab;
exports.default = lab;
exports.gray = gray;
exports.hcl = hcl;
exports.lch = lch;
var _define = _interopRequireWildcard(require("./define.js"));
var _color = require("./color.js");
var _math = require("./math.js");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// https://observablehq.com/@mbostock/lab-and-rgb
var K = 18,
  Xn = 0.96422,
  Yn = 1,
  Zn = 0.82521,
  t0 = 4 / 29,
  t1 = 6 / 29,
  t2 = 3 * t1 * t1,
  t3 = t1 * t1 * t1;
function labConvert(o) {
  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl) return hcl2lab(o);
  if (!(o instanceof _color.Rgb)) o = (0, _color.rgbConvert)(o);
  var r = rgb2lrgb(o.r),
    g = rgb2lrgb(o.g),
    b = rgb2lrgb(o.b),
    y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn),
    x,
    z;
  if (r === g && g === b) x = z = y;else {
    x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
    z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
  }
  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
}
function gray(l, opacity) {
  return new Lab(l, 0, 0, opacity == null ? 1 : opacity);
}
function lab(l, a, b, opacity) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
}
function Lab(l, a, b, opacity) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity;
}
(0, _define.default)(Lab, lab, (0, _define.extend)(_color.Color, {
  brighter: function (k) {
    return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker: function (k) {
    return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb: function () {
    var y = (this.l + 16) / 116,
      x = isNaN(this.a) ? y : y + this.a / 500,
      z = isNaN(this.b) ? y : y - this.b / 200;
    x = Xn * lab2xyz(x);
    y = Yn * lab2xyz(y);
    z = Zn * lab2xyz(z);
    return new _color.Rgb(lrgb2rgb(3.1338561 * x - 1.6168667 * y - 0.4906146 * z), lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z), lrgb2rgb(0.0719453 * x - 0.2289914 * y + 1.4052427 * z), this.opacity);
  }
}));
function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}
function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
}
function lrgb2rgb(x) {
  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}
function rgb2lrgb(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}
function hclConvert(o) {
  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab)) o = labConvert(o);
  if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
  var h = Math.atan2(o.b, o.a) * _math.rad2deg;
  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}
function lch(l, c, h, opacity) {
  return arguments.length === 1 ? hclConvert(l) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}
function hcl(h, c, l, opacity) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}
function Hcl(h, c, l, opacity) {
  this.h = +h;
  this.c = +c;
  this.l = +l;
  this.opacity = +opacity;
}
function hcl2lab(o) {
  if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
  var h = o.h * _math.deg2rad;
  return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
}
(0, _define.default)(Hcl, hcl, (0, _define.extend)(_color.Color, {
  brighter: function (k) {
    return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
  },
  darker: function (k) {
    return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
  },
  rgb: function () {
    return hcl2lab(this).rgb();
  }
}));
},{"./define.js":"JOJb","./color.js":"oXN0","./math.js":"kGlK"}],"AKev":[function(require,module,exports) {

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cubehelix = Cubehelix;
exports.default = cubehelix;
var _define = _interopRequireWildcard(require("./define.js"));
var _color = require("./color.js");
var _math = require("./math.js");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var A = -0.14861,
  B = +1.78277,
  C = -0.29227,
  D = -0.90649,
  E = +1.97294,
  ED = E * D,
  EB = E * B,
  BC_DA = B * C - D * A;
function cubehelixConvert(o) {
  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof _color.Rgb)) o = (0, _color.rgbConvert)(o);
  var r = o.r / 255,
    g = o.g / 255,
    b = o.b / 255,
    l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
    bl = b - l,
    k = (E * (g - l) - C * bl) / D,
    s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)),
    // NaN if l=0 or l=1
    h = s ? Math.atan2(k, bl) * _math.rad2deg - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}
function cubehelix(h, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}
function Cubehelix(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
(0, _define.default)(Cubehelix, cubehelix, (0, _define.extend)(_color.Color, {
  brighter: function (k) {
    k = k == null ? _color.brighter : Math.pow(_color.brighter, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function (k) {
    k = k == null ? _color.darker : Math.pow(_color.darker, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function () {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * _math.deg2rad,
      l = +this.l,
      a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
      cosh = Math.cos(h),
      sinh = Math.sin(h);
    return new _color.Rgb(255 * (l + a * (A * cosh + B * sinh)), 255 * (l + a * (C * cosh + D * sinh)), 255 * (l + a * (E * cosh)), this.opacity);
  }
}));
},{"./define.js":"JOJb","./color.js":"oXN0","./math.js":"kGlK"}],"ai4z":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "color", {
  enumerable: true,
  get: function () {
    return _color.default;
  }
});
Object.defineProperty(exports, "cubehelix", {
  enumerable: true,
  get: function () {
    return _cubehelix.default;
  }
});
Object.defineProperty(exports, "gray", {
  enumerable: true,
  get: function () {
    return _lab.gray;
  }
});
Object.defineProperty(exports, "hcl", {
  enumerable: true,
  get: function () {
    return _lab.hcl;
  }
});
Object.defineProperty(exports, "hsl", {
  enumerable: true,
  get: function () {
    return _color.hsl;
  }
});
Object.defineProperty(exports, "lab", {
  enumerable: true,
  get: function () {
    return _lab.default;
  }
});
Object.defineProperty(exports, "lch", {
  enumerable: true,
  get: function () {
    return _lab.lch;
  }
});
Object.defineProperty(exports, "rgb", {
  enumerable: true,
  get: function () {
    return _color.rgb;
  }
});
var _color = _interopRequireWildcard(require("./color.js"));
var _lab = _interopRequireWildcard(require("./lab.js"));
var _cubehelix = _interopRequireDefault(require("./cubehelix.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
},{"./color.js":"oXN0","./lab.js":"oIKs","./cubehelix.js":"AKev"}],"euzQ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.basis = basis;
exports.default = _default;
function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1,
    t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
}
function _default(values) {
  var n = values.length - 1;
  return function (t) {
    var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
      v1 = values[i],
      v2 = values[i + 1],
      v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
      v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}
},{}],"PgRI":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _basis = require("./basis.js");
function _default(values) {
  var n = values.length;
  return function (t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
      v0 = values[(i + n - 1) % n],
      v1 = values[i % n],
      v2 = values[(i + 1) % n],
      v3 = values[(i + 2) % n];
    return (0, _basis.basis)((t - i / n) * n, v0, v1, v2, v3);
  };
}
},{"./basis.js":"euzQ"}],"XE5s":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(x) {
  return function () {
    return x;
  };
}
},{}],"cQdg":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = nogamma;
exports.gamma = gamma;
exports.hue = hue;
var _constant = _interopRequireDefault(require("./constant.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function linear(a, d) {
  return function (t) {
    return a + t * d;
  };
}
function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function (t) {
    return Math.pow(a + t * b, y);
  };
}
function hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : (0, _constant.default)(isNaN(a) ? b : a);
}
function gamma(y) {
  return (y = +y) === 1 ? nogamma : function (a, b) {
    return b - a ? exponential(a, b, y) : (0, _constant.default)(isNaN(a) ? b : a);
  };
}
function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : (0, _constant.default)(isNaN(a) ? b : a);
}
},{"./constant.js":"XE5s"}],"iN37":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rgbBasisClosed = exports.rgbBasis = exports.default = void 0;
var _d3Color = require("d3-color");
var _basis = _interopRequireDefault(require("./basis.js"));
var _basisClosed = _interopRequireDefault(require("./basisClosed.js"));
var _color = _interopRequireWildcard(require("./color.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = function rgbGamma(y) {
  var color = (0, _color.gamma)(y);
  function rgb(start, end) {
    var r = color((start = (0, _d3Color.rgb)(start)).r, (end = (0, _d3Color.rgb)(end)).r),
      g = color(start.g, end.g),
      b = color(start.b, end.b),
      opacity = (0, _color.default)(start.opacity, end.opacity);
    return function (t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
  rgb.gamma = rgbGamma;
  return rgb;
}(1);
exports.default = _default;
function rgbSpline(spline) {
  return function (colors) {
    var n = colors.length,
      r = new Array(n),
      g = new Array(n),
      b = new Array(n),
      i,
      color;
    for (i = 0; i < n; ++i) {
      color = (0, _d3Color.rgb)(colors[i]);
      r[i] = color.r || 0;
      g[i] = color.g || 0;
      b[i] = color.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color.opacity = 1;
    return function (t) {
      color.r = r(t);
      color.g = g(t);
      color.b = b(t);
      return color + "";
    };
  };
}
var rgbBasis = rgbSpline(_basis.default);
exports.rgbBasis = rgbBasis;
var rgbBasisClosed = rgbSpline(_basisClosed.default);
exports.rgbBasisClosed = rgbBasisClosed;
},{"d3-color":"ai4z","./basis.js":"euzQ","./basisClosed.js":"PgRI","./color.js":"cQdg"}],"XvOM":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.isNumberArray = isNumberArray;
function _default(a, b) {
  if (!b) b = [];
  var n = a ? Math.min(b.length, a.length) : 0,
    c = b.slice(),
    i;
  return function (t) {
    for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
    return c;
  };
}
function isNumberArray(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}
},{}],"tVds":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.genericArray = genericArray;
var _value = _interopRequireDefault(require("./value.js"));
var _numberArray = _interopRequireWildcard(require("./numberArray.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default(a, b) {
  return ((0, _numberArray.isNumberArray)(b) ? _numberArray.default : genericArray)(a, b);
}
function genericArray(a, b) {
  var nb = b ? b.length : 0,
    na = a ? Math.min(nb, a.length) : 0,
    x = new Array(na),
    c = new Array(nb),
    i;
  for (i = 0; i < na; ++i) x[i] = (0, _value.default)(a[i], b[i]);
  for (; i < nb; ++i) c[i] = b[i];
  return function (t) {
    for (i = 0; i < na; ++i) c[i] = x[i](t);
    return c;
  };
}
},{"./value.js":"zmtW","./numberArray.js":"XvOM"}],"hYph":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(a, b) {
  var d = new Date();
  return a = +a, b = +b, function (t) {
    return d.setTime(a * (1 - t) + b * t), d;
  };
}
},{}],"CE0h":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(a, b) {
  return a = +a, b = +b, function (t) {
    return a * (1 - t) + b * t;
  };
}
},{}],"woso":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _value = _interopRequireDefault(require("./value.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default(a, b) {
  var i = {},
    c = {},
    k;
  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};
  for (k in b) {
    if (k in a) {
      i[k] = (0, _value.default)(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }
  return function (t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
}
},{"./value.js":"zmtW"}],"XvaA":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _number = _interopRequireDefault(require("./number.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  reB = new RegExp(reA.source, "g");
function zero(b) {
  return function () {
    return b;
  };
}
function one(b) {
  return function (t) {
    return b(t) + "";
  };
}
function _default(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0,
    // scan index for next number in b
    am,
    // current match in a
    bm,
    // current match in b
    bs,
    // string preceding current number in b, if any
    i = -1,
    // index in s
    s = [],
    // string constants and placeholders
    q = []; // number interpolators

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Interpolate pairs of numbers in a & b.
  while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else {
      // interpolate non-matching numbers
      s[++i] = null;
      q.push({
        i: i,
        x: (0, _number.default)(am, bm)
      });
    }
    bi = reB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function (t) {
    for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
    return s.join("");
  });
}
},{"./number.js":"CE0h"}],"zmtW":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _d3Color = require("d3-color");
var _rgb = _interopRequireDefault(require("./rgb.js"));
var _array = require("./array.js");
var _date = _interopRequireDefault(require("./date.js"));
var _number = _interopRequireDefault(require("./number.js"));
var _object = _interopRequireDefault(require("./object.js"));
var _string = _interopRequireDefault(require("./string.js"));
var _constant = _interopRequireDefault(require("./constant.js"));
var _numberArray = _interopRequireWildcard(require("./numberArray.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default(a, b) {
  var t = typeof b,
    c;
  return b == null || t === "boolean" ? (0, _constant.default)(b) : (t === "number" ? _number.default : t === "string" ? (c = (0, _d3Color.color)(b)) ? (b = c, _rgb.default) : _string.default : b instanceof _d3Color.color ? _rgb.default : b instanceof Date ? _date.default : (0, _numberArray.isNumberArray)(b) ? _numberArray.default : Array.isArray(b) ? _array.genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? _object.default : _number.default)(a, b);
}
},{"d3-color":"ai4z","./rgb.js":"iN37","./array.js":"tVds","./date.js":"hYph","./number.js":"CE0h","./object.js":"woso","./string.js":"XvaA","./constant.js":"XE5s","./numberArray.js":"XvOM"}],"ySTN":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(range) {
  var n = range.length;
  return function (t) {
    return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
  };
}
},{}],"Fn7o":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _color = require("./color.js");
function _default(a, b) {
  var i = (0, _color.hue)(+a, +b);
  return function (t) {
    var x = i(t);
    return x - 360 * Math.floor(x / 360);
  };
}
},{"./color.js":"cQdg"}],"xWLV":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(a, b) {
  return a = +a, b = +b, function (t) {
    return Math.round(a * (1 - t) + b * t);
  };
}
},{}],"twtq":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.identity = void 0;
var degrees = 180 / Math.PI;
var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
exports.identity = identity;
function _default(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX: scaleX,
    scaleY: scaleY
  };
}
},{}],"r5lM":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseCss = parseCss;
exports.parseSvg = parseSvg;
var _decompose = _interopRequireWildcard(require("./decompose.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var cssNode, cssRoot, cssView, svgNode;
function parseCss(value) {
  if (value === "none") return _decompose.identity;
  if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
  cssNode.style.transform = value;
  value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
  cssRoot.removeChild(cssNode);
  value = value.slice(7, -1).split(",");
  return (0, _decompose.default)(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
}
function parseSvg(value) {
  if (value == null) return _decompose.identity;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return _decompose.identity;
  value = value.matrix;
  return (0, _decompose.default)(value.a, value.b, value.c, value.d, value.e, value.f);
}
},{"./decompose.js":"twtq"}],"cO5M":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interpolateTransformSvg = exports.interpolateTransformCss = void 0;
var _number = _interopRequireDefault(require("../number.js"));
var _parse = require("./parse.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function interpolateTransform(parse, pxComma, pxParen, degParen) {
  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({
        i: i - 4,
        x: (0, _number.default)(xa, xb)
      }, {
        i: i - 2,
        x: (0, _number.default)(ya, yb)
      });
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360;else if (b - a > 180) a += 360; // shortest path
      q.push({
        i: s.push(pop(s) + "rotate(", null, degParen) - 2,
        x: (0, _number.default)(a, b)
      });
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }
  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({
        i: s.push(pop(s) + "skewX(", null, degParen) - 2,
        x: (0, _number.default)(a, b)
      });
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }
  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({
        i: i - 4,
        x: (0, _number.default)(xa, xb)
      }, {
        i: i - 2,
        x: (0, _number.default)(ya, yb)
      });
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function (a, b) {
    var s = [],
      // string constants and placeholders
      q = []; // number interpolators
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null; // gc
    return function (t) {
      var i = -1,
        n = q.length,
        o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}
var interpolateTransformCss = interpolateTransform(_parse.parseCss, "px, ", "px)", "deg)");
exports.interpolateTransformCss = interpolateTransformCss;
var interpolateTransformSvg = interpolateTransform(_parse.parseSvg, ", ", ")", ")");
exports.interpolateTransformSvg = interpolateTransformSvg;
},{"../number.js":"CE0h","./parse.js":"r5lM"}],"RdVV":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var rho = Math.SQRT2,
  rho2 = 2,
  rho4 = 4,
  epsilon2 = 1e-12;
function cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}
function sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}
function tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}

// p0 = [ux0, uy0, w0]
// p1 = [ux1, uy1, w1]
function _default(p0, p1) {
  var ux0 = p0[0],
    uy0 = p0[1],
    w0 = p0[2],
    ux1 = p1[0],
    uy1 = p1[1],
    w1 = p1[2],
    dx = ux1 - ux0,
    dy = uy1 - uy0,
    d2 = dx * dx + dy * dy,
    i,
    S;

  // Special case for u0 ≅ u1.
  if (d2 < epsilon2) {
    S = Math.log(w1 / w0) / rho;
    i = function (t) {
      return [ux0 + t * dx, uy0 + t * dy, w0 * Math.exp(rho * t * S)];
    };
  }

  // General case.
  else {
    var d1 = Math.sqrt(d2),
      b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
      b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
      r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
      r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
    S = (r1 - r0) / rho;
    i = function (t) {
      var s = t * S,
        coshr0 = cosh(r0),
        u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
      return [ux0 + u * dx, uy0 + u * dy, w0 * coshr0 / cosh(rho * s + r0)];
    };
  }
  i.duration = S * 1000;
  return i;
}
},{}],"OlMV":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hslLong = exports.default = void 0;
var _d3Color = require("d3-color");
var _color = _interopRequireWildcard(require("./color.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function hsl(hue) {
  return function (start, end) {
    var h = hue((start = (0, _d3Color.hsl)(start)).h, (end = (0, _d3Color.hsl)(end)).h),
      s = (0, _color.default)(start.s, end.s),
      l = (0, _color.default)(start.l, end.l),
      opacity = (0, _color.default)(start.opacity, end.opacity);
    return function (t) {
      start.h = h(t);
      start.s = s(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  };
}
var _default = hsl(_color.hue);
exports.default = _default;
var hslLong = hsl(_color.default);
exports.hslLong = hslLong;
},{"d3-color":"ai4z","./color.js":"cQdg"}],"zDsP":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lab;
var _d3Color = require("d3-color");
var _color = _interopRequireDefault(require("./color.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function lab(start, end) {
  var l = (0, _color.default)((start = (0, _d3Color.lab)(start)).l, (end = (0, _d3Color.lab)(end)).l),
    a = (0, _color.default)(start.a, end.a),
    b = (0, _color.default)(start.b, end.b),
    opacity = (0, _color.default)(start.opacity, end.opacity);
  return function (t) {
    start.l = l(t);
    start.a = a(t);
    start.b = b(t);
    start.opacity = opacity(t);
    return start + "";
  };
}
},{"d3-color":"ai4z","./color.js":"cQdg"}],"Y8bk":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hclLong = exports.default = void 0;
var _d3Color = require("d3-color");
var _color = _interopRequireWildcard(require("./color.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function hcl(hue) {
  return function (start, end) {
    var h = hue((start = (0, _d3Color.hcl)(start)).h, (end = (0, _d3Color.hcl)(end)).h),
      c = (0, _color.default)(start.c, end.c),
      l = (0, _color.default)(start.l, end.l),
      opacity = (0, _color.default)(start.opacity, end.opacity);
    return function (t) {
      start.h = h(t);
      start.c = c(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  };
}
var _default = hcl(_color.hue);
exports.default = _default;
var hclLong = hcl(_color.default);
exports.hclLong = hclLong;
},{"d3-color":"ai4z","./color.js":"cQdg"}],"sK4S":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.cubehelixLong = void 0;
var _d3Color = require("d3-color");
var _color = _interopRequireWildcard(require("./color.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function cubehelix(hue) {
  return function cubehelixGamma(y) {
    y = +y;
    function cubehelix(start, end) {
      var h = hue((start = (0, _d3Color.cubehelix)(start)).h, (end = (0, _d3Color.cubehelix)(end)).h),
        s = (0, _color.default)(start.s, end.s),
        l = (0, _color.default)(start.l, end.l),
        opacity = (0, _color.default)(start.opacity, end.opacity);
      return function (t) {
        start.h = h(t);
        start.s = s(t);
        start.l = l(Math.pow(t, y));
        start.opacity = opacity(t);
        return start + "";
      };
    }
    cubehelix.gamma = cubehelixGamma;
    return cubehelix;
  }(1);
}
var _default = cubehelix(_color.hue);
exports.default = _default;
var cubehelixLong = cubehelix(_color.default);
exports.cubehelixLong = cubehelixLong;
},{"d3-color":"ai4z","./color.js":"cQdg"}],"K1ab":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = piecewise;
function piecewise(interpolate, values) {
  var i = 0,
    n = values.length - 1,
    v = values[0],
    I = new Array(n < 0 ? 0 : n);
  while (i < n) I[i] = interpolate(v, v = values[++i]);
  return function (t) {
    var i = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
    return I[i](t - i);
  };
}
},{}],"C8mx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(interpolator, n) {
  var samples = new Array(n);
  for (var i = 0; i < n; ++i) samples[i] = interpolator(i / (n - 1));
  return samples;
}
},{}],"VOA9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "interpolate", {
  enumerable: true,
  get: function () {
    return _value.default;
  }
});
Object.defineProperty(exports, "interpolateArray", {
  enumerable: true,
  get: function () {
    return _array.default;
  }
});
Object.defineProperty(exports, "interpolateBasis", {
  enumerable: true,
  get: function () {
    return _basis.default;
  }
});
Object.defineProperty(exports, "interpolateBasisClosed", {
  enumerable: true,
  get: function () {
    return _basisClosed.default;
  }
});
Object.defineProperty(exports, "interpolateCubehelix", {
  enumerable: true,
  get: function () {
    return _cubehelix.default;
  }
});
Object.defineProperty(exports, "interpolateCubehelixLong", {
  enumerable: true,
  get: function () {
    return _cubehelix.cubehelixLong;
  }
});
Object.defineProperty(exports, "interpolateDate", {
  enumerable: true,
  get: function () {
    return _date.default;
  }
});
Object.defineProperty(exports, "interpolateDiscrete", {
  enumerable: true,
  get: function () {
    return _discrete.default;
  }
});
Object.defineProperty(exports, "interpolateHcl", {
  enumerable: true,
  get: function () {
    return _hcl.default;
  }
});
Object.defineProperty(exports, "interpolateHclLong", {
  enumerable: true,
  get: function () {
    return _hcl.hclLong;
  }
});
Object.defineProperty(exports, "interpolateHsl", {
  enumerable: true,
  get: function () {
    return _hsl.default;
  }
});
Object.defineProperty(exports, "interpolateHslLong", {
  enumerable: true,
  get: function () {
    return _hsl.hslLong;
  }
});
Object.defineProperty(exports, "interpolateHue", {
  enumerable: true,
  get: function () {
    return _hue.default;
  }
});
Object.defineProperty(exports, "interpolateLab", {
  enumerable: true,
  get: function () {
    return _lab.default;
  }
});
Object.defineProperty(exports, "interpolateNumber", {
  enumerable: true,
  get: function () {
    return _number.default;
  }
});
Object.defineProperty(exports, "interpolateNumberArray", {
  enumerable: true,
  get: function () {
    return _numberArray.default;
  }
});
Object.defineProperty(exports, "interpolateObject", {
  enumerable: true,
  get: function () {
    return _object.default;
  }
});
Object.defineProperty(exports, "interpolateRgb", {
  enumerable: true,
  get: function () {
    return _rgb.default;
  }
});
Object.defineProperty(exports, "interpolateRgbBasis", {
  enumerable: true,
  get: function () {
    return _rgb.rgbBasis;
  }
});
Object.defineProperty(exports, "interpolateRgbBasisClosed", {
  enumerable: true,
  get: function () {
    return _rgb.rgbBasisClosed;
  }
});
Object.defineProperty(exports, "interpolateRound", {
  enumerable: true,
  get: function () {
    return _round.default;
  }
});
Object.defineProperty(exports, "interpolateString", {
  enumerable: true,
  get: function () {
    return _string.default;
  }
});
Object.defineProperty(exports, "interpolateTransformCss", {
  enumerable: true,
  get: function () {
    return _index.interpolateTransformCss;
  }
});
Object.defineProperty(exports, "interpolateTransformSvg", {
  enumerable: true,
  get: function () {
    return _index.interpolateTransformSvg;
  }
});
Object.defineProperty(exports, "interpolateZoom", {
  enumerable: true,
  get: function () {
    return _zoom.default;
  }
});
Object.defineProperty(exports, "piecewise", {
  enumerable: true,
  get: function () {
    return _piecewise.default;
  }
});
Object.defineProperty(exports, "quantize", {
  enumerable: true,
  get: function () {
    return _quantize.default;
  }
});
var _value = _interopRequireDefault(require("./value.js"));
var _array = _interopRequireDefault(require("./array.js"));
var _basis = _interopRequireDefault(require("./basis.js"));
var _basisClosed = _interopRequireDefault(require("./basisClosed.js"));
var _date = _interopRequireDefault(require("./date.js"));
var _discrete = _interopRequireDefault(require("./discrete.js"));
var _hue = _interopRequireDefault(require("./hue.js"));
var _number = _interopRequireDefault(require("./number.js"));
var _numberArray = _interopRequireDefault(require("./numberArray.js"));
var _object = _interopRequireDefault(require("./object.js"));
var _round = _interopRequireDefault(require("./round.js"));
var _string = _interopRequireDefault(require("./string.js"));
var _index = require("./transform/index.js");
var _zoom = _interopRequireDefault(require("./zoom.js"));
var _rgb = _interopRequireWildcard(require("./rgb.js"));
var _hsl = _interopRequireWildcard(require("./hsl.js"));
var _lab = _interopRequireDefault(require("./lab.js"));
var _hcl = _interopRequireWildcard(require("./hcl.js"));
var _cubehelix = _interopRequireWildcard(require("./cubehelix.js"));
var _piecewise = _interopRequireDefault(require("./piecewise.js"));
var _quantize = _interopRequireDefault(require("./quantize.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./value.js":"zmtW","./array.js":"tVds","./basis.js":"euzQ","./basisClosed.js":"PgRI","./date.js":"hYph","./discrete.js":"ySTN","./hue.js":"Fn7o","./number.js":"CE0h","./numberArray.js":"XvOM","./object.js":"woso","./round.js":"xWLV","./string.js":"XvaA","./transform/index.js":"cO5M","./zoom.js":"RdVV","./rgb.js":"iN37","./hsl.js":"OlMV","./lab.js":"zDsP","./hcl.js":"Y8bk","./cubehelix.js":"sK4S","./piecewise.js":"K1ab","./quantize.js":"C8mx"}],"MNyl":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _d3Interpolate = require("d3-interpolate");
function _default(scheme) {
  return (0, _d3Interpolate.interpolateRgbBasis)(scheme[scheme.length - 1]);
}
},{"d3-interpolate":"VOA9"}],"ArEB":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheme = exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
var _ramp = _interopRequireDefault(require("../ramp.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var scheme = new Array(3).concat("d8b365f5f5f55ab4ac", "a6611adfc27d80cdc1018571", "a6611adfc27df5f5f580cdc1018571", "8c510ad8b365f6e8c3c7eae55ab4ac01665e", "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e", "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e", "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e", "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30", "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30").map(_colors.default);
exports.scheme = scheme;
var _default = (0, _ramp.default)(scheme);
exports.default = _default;
},{"../colors.js":"xz73","../ramp.js":"MNyl"}],"kzYK":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheme = exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
var _ramp = _interopRequireDefault(require("../ramp.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var scheme = new Array(3).concat("af8dc3f7f7f77fbf7b", "7b3294c2a5cfa6dba0008837", "7b3294c2a5cff7f7f7a6dba0008837", "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837", "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837", "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837", "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837", "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b", "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b").map(_colors.default);
exports.scheme = scheme;
var _default = (0, _ramp.default)(scheme);
exports.default = _default;
},{"../colors.js":"xz73","../ramp.js":"MNyl"}],"PI8x":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheme = exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
var _ramp = _interopRequireDefault(require("../ramp.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var scheme = new Array(3).concat("e9a3c9f7f7f7a1d76a", "d01c8bf1b6dab8e1864dac26", "d01c8bf1b6daf7f7f7b8e1864dac26", "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221", "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221", "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221", "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221", "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419", "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419").map(_colors.default);
exports.scheme = scheme;
var _default = (0, _ramp.default)(scheme);
exports.default = _default;
},{"../colors.js":"xz73","../ramp.js":"MNyl"}],"h8TC":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheme = exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
var _ramp = _interopRequireDefault(require("../ramp.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var scheme = new Array(3).concat("998ec3f7f7f7f1a340", "5e3c99b2abd2fdb863e66101", "5e3c99b2abd2f7f7f7fdb863e66101", "542788998ec3d8daebfee0b6f1a340b35806", "542788998ec3d8daebf7f7f7fee0b6f1a340b35806", "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806", "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806", "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08", "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08").map(_colors.default);
exports.scheme = scheme;
var _default = (0, _ramp.default)(scheme);
exports.default = _default;
},{"../colors.js":"xz73","../ramp.js":"MNyl"}],"i3rG":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheme = exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
var _ramp = _interopRequireDefault(require("../ramp.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var scheme = new Array(3).concat("ef8a62f7f7f767a9cf", "ca0020f4a58292c5de0571b0", "ca0020f4a582f7f7f792c5de0571b0", "b2182bef8a62fddbc7d1e5f067a9cf2166ac", "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac", "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac", "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac", "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061", "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061").map(_colors.default);
exports.scheme = scheme;
var _default = (0, _ramp.default)(scheme);
exports.default = _default;
},{"../colors.js":"xz73","../ramp.js":"MNyl"}],"WaJg":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheme = exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
var _ramp = _interopRequireDefault(require("../ramp.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var scheme = new Array(3).concat("ef8a62ffffff999999", "ca0020f4a582bababa404040", "ca0020f4a582ffffffbababa404040", "b2182bef8a62fddbc7e0e0e09999994d4d4d", "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d", "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d", "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d", "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a", "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a").map(_colors.default);
exports.scheme = scheme;
var _default = (0, _ramp.default)(scheme);
exports.default = _default;
},{"../colors.js":"xz73","../ramp.js":"MNyl"}],"JvsS":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheme = exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
var _ramp = _interopRequireDefault(require("../ramp.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var scheme = new Array(3).concat("fc8d59ffffbf91bfdb", "d7191cfdae61abd9e92c7bb6", "d7191cfdae61ffffbfabd9e92c7bb6", "d73027fc8d59fee090e0f3f891bfdb4575b4", "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4", "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4", "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4", "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695", "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695").map(_colors.default);
exports.scheme = scheme;
var _default = (0, _ramp.default)(scheme);
exports.default = _default;
},{"../colors.js":"xz73","../ramp.js":"MNyl"}],"K9lw":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheme = exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
var _ramp = _interopRequireDefault(require("../ramp.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var scheme = new Array(3).concat("fc8d59ffffbf91cf60", "d7191cfdae61a6d96a1a9641", "d7191cfdae61ffffbfa6d96a1a9641", "d73027fc8d59fee08bd9ef8b91cf601a9850", "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850", "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850", "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850", "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837", "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837").map(_colors.default);
exports.scheme = scheme;
var _default = (0, _ramp.default)(scheme);
exports.default = _default;
},{"../colors.js":"xz73","../ramp.js":"MNyl"}],"rXym":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheme = exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
var _ramp = _interopRequireDefault(require("../ramp.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var scheme = new Array(3).concat("fc8d59ffffbf99d594", "d7191cfdae61abdda42b83ba", "d7191cfdae61ffffbfabdda42b83ba", "d53e4ffc8d59fee08be6f59899d5943288bd", "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd", "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd", "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd", "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2", "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2").map(_colors.default);
exports.scheme = scheme;
var _default = (0, _ramp.default)(scheme);
exports.default = _default;
},{"../colors.js":"xz73","../ramp.js":"MNyl"}],"KGBO":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheme = exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
var _ramp = _interopRequireDefault(require("../ramp.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var scheme = new Array(3).concat("e5f5f999d8c92ca25f", "edf8fbb2e2e266c2a4238b45", "edf8fbb2e2e266c2a42ca25f006d2c", "edf8fbccece699d8c966c2a42ca25f006d2c", "edf8fbccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b").map(_colors.default);
exports.scheme = scheme;
var _default = (0, _ramp.default)(scheme);
exports.default = _default;
},{"../colors.js":"xz73","../ramp.js":"MNyl"}],"lAoh":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheme = exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
var _ramp = _interopRequireDefault(require("../ramp.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var scheme = new Array(3).concat("e0ecf49ebcda8856a7", "edf8fbb3cde38c96c688419d", "edf8fbb3cde38c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b").map(_colors.default);
exports.scheme = scheme;
var _default = (0, _ramp.default)(scheme);
exports.default = _default;
},{"../colors.js":"xz73","../ramp.js":"MNyl"}],"ZoIf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheme = exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
var _ramp = _interopRequireDefault(require("../ramp.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var scheme = new Array(3).concat("e0f3dba8ddb543a2ca", "f0f9e8bae4bc7bccc42b8cbe", "f0f9e8bae4bc7bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081").map(_colors.default);
exports.scheme = scheme;
var _default = (0, _ramp.default)(scheme);
exports.default = _default;
},{"../colors.js":"xz73","../ramp.js":"MNyl"}],"SiOD":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheme = exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
var _ramp = _interopRequireDefault(require("../ramp.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var scheme = new Array(3).concat("fee8c8fdbb84e34a33", "fef0d9fdcc8afc8d59d7301f", "fef0d9fdcc8afc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000").map(_colors.default);
exports.scheme = scheme;
var _default = (0, _ramp.default)(scheme);
exports.default = _default;
},{"../colors.js":"xz73","../ramp.js":"MNyl"}],"vp6S":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheme = exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
var _ramp = _interopRequireDefault(require("../ramp.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var scheme = new Array(3).concat("ece2f0a6bddb1c9099", "f6eff7bdc9e167a9cf02818a", "f6eff7bdc9e167a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636").map(_colors.default);
exports.scheme = scheme;
var _default = (0, _ramp.default)(scheme);
exports.default = _default;
},{"../colors.js":"xz73","../ramp.js":"MNyl"}],"Wfss":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheme = exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
var _ramp = _interopRequireDefault(require("../ramp.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var scheme = new Array(3).concat("ece7f2a6bddb2b8cbe", "f1eef6bdc9e174a9cf0570b0", "f1eef6bdc9e174a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858").map(_colors.default);
exports.scheme = scheme;
var _default = (0, _ramp.default)(scheme);
exports.default = _default;
},{"../colors.js":"xz73","../ramp.js":"MNyl"}],"NZPG":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheme = exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
var _ramp = _interopRequireDefault(require("../ramp.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var scheme = new Array(3).concat("e7e1efc994c7dd1c77", "f1eef6d7b5d8df65b0ce1256", "f1eef6d7b5d8df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f").map(_colors.default);
exports.scheme = scheme;
var _default = (0, _ramp.default)(scheme);
exports.default = _default;
},{"../colors.js":"xz73","../ramp.js":"MNyl"}],"fzkB":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheme = exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
var _ramp = _interopRequireDefault(require("../ramp.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var scheme = new Array(3).concat("fde0ddfa9fb5c51b8a", "feebe2fbb4b9f768a1ae017e", "feebe2fbb4b9f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a").map(_colors.default);
exports.scheme = scheme;
var _default = (0, _ramp.default)(scheme);
exports.default = _default;
},{"../colors.js":"xz73","../ramp.js":"MNyl"}],"fL1Z":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheme = exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
var _ramp = _interopRequireDefault(require("../ramp.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var scheme = new Array(3).concat("edf8b17fcdbb2c7fb8", "ffffcca1dab441b6c4225ea8", "ffffcca1dab441b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58").map(_colors.default);
exports.scheme = scheme;
var _default = (0, _ramp.default)(scheme);
exports.default = _default;
},{"../colors.js":"xz73","../ramp.js":"MNyl"}],"xEGO":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheme = exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
var _ramp = _interopRequireDefault(require("../ramp.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var scheme = new Array(3).concat("f7fcb9addd8e31a354", "ffffccc2e69978c679238443", "ffffccc2e69978c67931a354006837", "ffffccd9f0a3addd8e78c67931a354006837", "ffffccd9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529").map(_colors.default);
exports.scheme = scheme;
var _default = (0, _ramp.default)(scheme);
exports.default = _default;
},{"../colors.js":"xz73","../ramp.js":"MNyl"}],"BmdO":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheme = exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
var _ramp = _interopRequireDefault(require("../ramp.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var scheme = new Array(3).concat("fff7bcfec44fd95f0e", "ffffd4fed98efe9929cc4c02", "ffffd4fed98efe9929d95f0e993404", "ffffd4fee391fec44ffe9929d95f0e993404", "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506").map(_colors.default);
exports.scheme = scheme;
var _default = (0, _ramp.default)(scheme);
exports.default = _default;
},{"../colors.js":"xz73","../ramp.js":"MNyl"}],"SHo5":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheme = exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
var _ramp = _interopRequireDefault(require("../ramp.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var scheme = new Array(3).concat("ffeda0feb24cf03b20", "ffffb2fecc5cfd8d3ce31a1c", "ffffb2fecc5cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026").map(_colors.default);
exports.scheme = scheme;
var _default = (0, _ramp.default)(scheme);
exports.default = _default;
},{"../colors.js":"xz73","../ramp.js":"MNyl"}],"jpg6":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheme = exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
var _ramp = _interopRequireDefault(require("../ramp.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var scheme = new Array(3).concat("deebf79ecae13182bd", "eff3ffbdd7e76baed62171b5", "eff3ffbdd7e76baed63182bd08519c", "eff3ffc6dbef9ecae16baed63182bd08519c", "eff3ffc6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map(_colors.default);
exports.scheme = scheme;
var _default = (0, _ramp.default)(scheme);
exports.default = _default;
},{"../colors.js":"xz73","../ramp.js":"MNyl"}],"rjqF":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheme = exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
var _ramp = _interopRequireDefault(require("../ramp.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var scheme = new Array(3).concat("e5f5e0a1d99b31a354", "edf8e9bae4b374c476238b45", "edf8e9bae4b374c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b").map(_colors.default);
exports.scheme = scheme;
var _default = (0, _ramp.default)(scheme);
exports.default = _default;
},{"../colors.js":"xz73","../ramp.js":"MNyl"}],"x8Iu":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheme = exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
var _ramp = _interopRequireDefault(require("../ramp.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var scheme = new Array(3).concat("f0f0f0bdbdbd636363", "f7f7f7cccccc969696525252", "f7f7f7cccccc969696636363252525", "f7f7f7d9d9d9bdbdbd969696636363252525", "f7f7f7d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000").map(_colors.default);
exports.scheme = scheme;
var _default = (0, _ramp.default)(scheme);
exports.default = _default;
},{"../colors.js":"xz73","../ramp.js":"MNyl"}],"MJdW":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheme = exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
var _ramp = _interopRequireDefault(require("../ramp.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var scheme = new Array(3).concat("efedf5bcbddc756bb1", "f2f0f7cbc9e29e9ac86a51a3", "f2f0f7cbc9e29e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d").map(_colors.default);
exports.scheme = scheme;
var _default = (0, _ramp.default)(scheme);
exports.default = _default;
},{"../colors.js":"xz73","../ramp.js":"MNyl"}],"DiEh":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheme = exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
var _ramp = _interopRequireDefault(require("../ramp.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var scheme = new Array(3).concat("fee0d2fc9272de2d26", "fee5d9fcae91fb6a4acb181d", "fee5d9fcae91fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d").map(_colors.default);
exports.scheme = scheme;
var _default = (0, _ramp.default)(scheme);
exports.default = _default;
},{"../colors.js":"xz73","../ramp.js":"MNyl"}],"O9hI":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheme = exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
var _ramp = _interopRequireDefault(require("../ramp.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var scheme = new Array(3).concat("fee6cefdae6be6550d", "feeddefdbe85fd8d3cd94701", "feeddefdbe85fd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704").map(_colors.default);
exports.scheme = scheme;
var _default = (0, _ramp.default)(scheme);
exports.default = _default;
},{"../colors.js":"xz73","../ramp.js":"MNyl"}],"SaPT":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(t) {
  t = Math.max(0, Math.min(1, t));
  return "rgb(" + Math.max(0, Math.min(255, Math.round(-4.54 - t * (35.34 - t * (2381.73 - t * (6402.7 - t * (7024.72 - t * 2710.57))))))) + ", " + Math.max(0, Math.min(255, Math.round(32.49 + t * (170.73 + t * (52.82 - t * (131.46 - t * (176.58 - t * 67.37))))))) + ", " + Math.max(0, Math.min(255, Math.round(81.24 + t * (442.36 - t * (2482.43 - t * (6167.24 - t * (6614.94 - t * 2475.67))))))) + ")";
}
},{}],"cI87":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _d3Color = require("d3-color");
var _d3Interpolate = require("d3-interpolate");
var _default = (0, _d3Interpolate.interpolateCubehelixLong)((0, _d3Color.cubehelix)(300, 0.5, 0.0), (0, _d3Color.cubehelix)(-240, 0.5, 1.0));
exports.default = _default;
},{"d3-color":"ai4z","d3-interpolate":"VOA9"}],"BkJF":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cool = void 0;
exports.default = _default;
exports.warm = void 0;
var _d3Color = require("d3-color");
var _d3Interpolate = require("d3-interpolate");
var warm = (0, _d3Interpolate.interpolateCubehelixLong)((0, _d3Color.cubehelix)(-100, 0.75, 0.35), (0, _d3Color.cubehelix)(80, 1.50, 0.8));
exports.warm = warm;
var cool = (0, _d3Interpolate.interpolateCubehelixLong)((0, _d3Color.cubehelix)(260, 0.75, 0.35), (0, _d3Color.cubehelix)(80, 1.50, 0.8));
exports.cool = cool;
var c = (0, _d3Color.cubehelix)();
function _default(t) {
  if (t < 0 || t > 1) t -= Math.floor(t);
  var ts = Math.abs(t - 0.5);
  c.h = 360 * t - 100;
  c.s = 1.5 - 1.5 * ts;
  c.l = 0.8 - 0.9 * ts;
  return c + "";
}
},{"d3-color":"ai4z","d3-interpolate":"VOA9"}],"ZXMu":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _d3Color = require("d3-color");
var c = (0, _d3Color.rgb)(),
  pi_1_3 = Math.PI / 3,
  pi_2_3 = Math.PI * 2 / 3;
function _default(t) {
  var x;
  t = (0.5 - t) * Math.PI;
  c.r = 255 * (x = Math.sin(t)) * x;
  c.g = 255 * (x = Math.sin(t + pi_1_3)) * x;
  c.b = 255 * (x = Math.sin(t + pi_2_3)) * x;
  return c + "";
}
},{"d3-color":"ai4z"}],"PX18":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(t) {
  t = Math.max(0, Math.min(1, t));
  return "rgb(" + Math.max(0, Math.min(255, Math.round(34.61 + t * (1172.33 - t * (10793.56 - t * (33300.12 - t * (38394.49 - t * 14825.05))))))) + ", " + Math.max(0, Math.min(255, Math.round(23.31 + t * (557.33 + t * (1225.33 - t * (3574.96 - t * (1073.77 + t * 707.56))))))) + ", " + Math.max(0, Math.min(255, Math.round(27.2 + t * (3211.1 - t * (15327.97 - t * (27814 - t * (22569.18 - t * 6838.66))))))) + ")";
}
},{}],"SfG7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plasma = exports.magma = exports.inferno = exports.default = void 0;
var _colors = _interopRequireDefault(require("../colors.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ramp(range) {
  var n = range.length;
  return function (t) {
    return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
  };
}
var _default = ramp((0, _colors.default)("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));
exports.default = _default;
var magma = ramp((0, _colors.default)("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"));
exports.magma = magma;
var inferno = ramp((0, _colors.default)("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"));
exports.inferno = inferno;
var plasma = ramp((0, _colors.default)("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));
exports.plasma = plasma;
},{"../colors.js":"xz73"}],"ado2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "interpolateBlues", {
  enumerable: true,
  get: function () {
    return _Blues.default;
  }
});
Object.defineProperty(exports, "interpolateBrBG", {
  enumerable: true,
  get: function () {
    return _BrBG.default;
  }
});
Object.defineProperty(exports, "interpolateBuGn", {
  enumerable: true,
  get: function () {
    return _BuGn.default;
  }
});
Object.defineProperty(exports, "interpolateBuPu", {
  enumerable: true,
  get: function () {
    return _BuPu.default;
  }
});
Object.defineProperty(exports, "interpolateCividis", {
  enumerable: true,
  get: function () {
    return _cividis.default;
  }
});
Object.defineProperty(exports, "interpolateCool", {
  enumerable: true,
  get: function () {
    return _rainbow.cool;
  }
});
Object.defineProperty(exports, "interpolateCubehelixDefault", {
  enumerable: true,
  get: function () {
    return _cubehelix.default;
  }
});
Object.defineProperty(exports, "interpolateGnBu", {
  enumerable: true,
  get: function () {
    return _GnBu.default;
  }
});
Object.defineProperty(exports, "interpolateGreens", {
  enumerable: true,
  get: function () {
    return _Greens.default;
  }
});
Object.defineProperty(exports, "interpolateGreys", {
  enumerable: true,
  get: function () {
    return _Greys.default;
  }
});
Object.defineProperty(exports, "interpolateInferno", {
  enumerable: true,
  get: function () {
    return _viridis.inferno;
  }
});
Object.defineProperty(exports, "interpolateMagma", {
  enumerable: true,
  get: function () {
    return _viridis.magma;
  }
});
Object.defineProperty(exports, "interpolateOrRd", {
  enumerable: true,
  get: function () {
    return _OrRd.default;
  }
});
Object.defineProperty(exports, "interpolateOranges", {
  enumerable: true,
  get: function () {
    return _Oranges.default;
  }
});
Object.defineProperty(exports, "interpolatePRGn", {
  enumerable: true,
  get: function () {
    return _PRGn.default;
  }
});
Object.defineProperty(exports, "interpolatePiYG", {
  enumerable: true,
  get: function () {
    return _PiYG.default;
  }
});
Object.defineProperty(exports, "interpolatePlasma", {
  enumerable: true,
  get: function () {
    return _viridis.plasma;
  }
});
Object.defineProperty(exports, "interpolatePuBu", {
  enumerable: true,
  get: function () {
    return _PuBu.default;
  }
});
Object.defineProperty(exports, "interpolatePuBuGn", {
  enumerable: true,
  get: function () {
    return _PuBuGn.default;
  }
});
Object.defineProperty(exports, "interpolatePuOr", {
  enumerable: true,
  get: function () {
    return _PuOr.default;
  }
});
Object.defineProperty(exports, "interpolatePuRd", {
  enumerable: true,
  get: function () {
    return _PuRd.default;
  }
});
Object.defineProperty(exports, "interpolatePurples", {
  enumerable: true,
  get: function () {
    return _Purples.default;
  }
});
Object.defineProperty(exports, "interpolateRainbow", {
  enumerable: true,
  get: function () {
    return _rainbow.default;
  }
});
Object.defineProperty(exports, "interpolateRdBu", {
  enumerable: true,
  get: function () {
    return _RdBu.default;
  }
});
Object.defineProperty(exports, "interpolateRdGy", {
  enumerable: true,
  get: function () {
    return _RdGy.default;
  }
});
Object.defineProperty(exports, "interpolateRdPu", {
  enumerable: true,
  get: function () {
    return _RdPu.default;
  }
});
Object.defineProperty(exports, "interpolateRdYlBu", {
  enumerable: true,
  get: function () {
    return _RdYlBu.default;
  }
});
Object.defineProperty(exports, "interpolateRdYlGn", {
  enumerable: true,
  get: function () {
    return _RdYlGn.default;
  }
});
Object.defineProperty(exports, "interpolateReds", {
  enumerable: true,
  get: function () {
    return _Reds.default;
  }
});
Object.defineProperty(exports, "interpolateSinebow", {
  enumerable: true,
  get: function () {
    return _sinebow.default;
  }
});
Object.defineProperty(exports, "interpolateSpectral", {
  enumerable: true,
  get: function () {
    return _Spectral.default;
  }
});
Object.defineProperty(exports, "interpolateTurbo", {
  enumerable: true,
  get: function () {
    return _turbo.default;
  }
});
Object.defineProperty(exports, "interpolateViridis", {
  enumerable: true,
  get: function () {
    return _viridis.default;
  }
});
Object.defineProperty(exports, "interpolateWarm", {
  enumerable: true,
  get: function () {
    return _rainbow.warm;
  }
});
Object.defineProperty(exports, "interpolateYlGn", {
  enumerable: true,
  get: function () {
    return _YlGn.default;
  }
});
Object.defineProperty(exports, "interpolateYlGnBu", {
  enumerable: true,
  get: function () {
    return _YlGnBu.default;
  }
});
Object.defineProperty(exports, "interpolateYlOrBr", {
  enumerable: true,
  get: function () {
    return _YlOrBr.default;
  }
});
Object.defineProperty(exports, "interpolateYlOrRd", {
  enumerable: true,
  get: function () {
    return _YlOrRd.default;
  }
});
Object.defineProperty(exports, "schemeAccent", {
  enumerable: true,
  get: function () {
    return _Accent.default;
  }
});
Object.defineProperty(exports, "schemeBlues", {
  enumerable: true,
  get: function () {
    return _Blues.scheme;
  }
});
Object.defineProperty(exports, "schemeBrBG", {
  enumerable: true,
  get: function () {
    return _BrBG.scheme;
  }
});
Object.defineProperty(exports, "schemeBuGn", {
  enumerable: true,
  get: function () {
    return _BuGn.scheme;
  }
});
Object.defineProperty(exports, "schemeBuPu", {
  enumerable: true,
  get: function () {
    return _BuPu.scheme;
  }
});
Object.defineProperty(exports, "schemeCategory10", {
  enumerable: true,
  get: function () {
    return _category.default;
  }
});
Object.defineProperty(exports, "schemeDark2", {
  enumerable: true,
  get: function () {
    return _Dark.default;
  }
});
Object.defineProperty(exports, "schemeGnBu", {
  enumerable: true,
  get: function () {
    return _GnBu.scheme;
  }
});
Object.defineProperty(exports, "schemeGreens", {
  enumerable: true,
  get: function () {
    return _Greens.scheme;
  }
});
Object.defineProperty(exports, "schemeGreys", {
  enumerable: true,
  get: function () {
    return _Greys.scheme;
  }
});
Object.defineProperty(exports, "schemeOrRd", {
  enumerable: true,
  get: function () {
    return _OrRd.scheme;
  }
});
Object.defineProperty(exports, "schemeOranges", {
  enumerable: true,
  get: function () {
    return _Oranges.scheme;
  }
});
Object.defineProperty(exports, "schemePRGn", {
  enumerable: true,
  get: function () {
    return _PRGn.scheme;
  }
});
Object.defineProperty(exports, "schemePaired", {
  enumerable: true,
  get: function () {
    return _Paired.default;
  }
});
Object.defineProperty(exports, "schemePastel1", {
  enumerable: true,
  get: function () {
    return _Pastel.default;
  }
});
Object.defineProperty(exports, "schemePastel2", {
  enumerable: true,
  get: function () {
    return _Pastel2.default;
  }
});
Object.defineProperty(exports, "schemePiYG", {
  enumerable: true,
  get: function () {
    return _PiYG.scheme;
  }
});
Object.defineProperty(exports, "schemePuBu", {
  enumerable: true,
  get: function () {
    return _PuBu.scheme;
  }
});
Object.defineProperty(exports, "schemePuBuGn", {
  enumerable: true,
  get: function () {
    return _PuBuGn.scheme;
  }
});
Object.defineProperty(exports, "schemePuOr", {
  enumerable: true,
  get: function () {
    return _PuOr.scheme;
  }
});
Object.defineProperty(exports, "schemePuRd", {
  enumerable: true,
  get: function () {
    return _PuRd.scheme;
  }
});
Object.defineProperty(exports, "schemePurples", {
  enumerable: true,
  get: function () {
    return _Purples.scheme;
  }
});
Object.defineProperty(exports, "schemeRdBu", {
  enumerable: true,
  get: function () {
    return _RdBu.scheme;
  }
});
Object.defineProperty(exports, "schemeRdGy", {
  enumerable: true,
  get: function () {
    return _RdGy.scheme;
  }
});
Object.defineProperty(exports, "schemeRdPu", {
  enumerable: true,
  get: function () {
    return _RdPu.scheme;
  }
});
Object.defineProperty(exports, "schemeRdYlBu", {
  enumerable: true,
  get: function () {
    return _RdYlBu.scheme;
  }
});
Object.defineProperty(exports, "schemeRdYlGn", {
  enumerable: true,
  get: function () {
    return _RdYlGn.scheme;
  }
});
Object.defineProperty(exports, "schemeReds", {
  enumerable: true,
  get: function () {
    return _Reds.scheme;
  }
});
Object.defineProperty(exports, "schemeSet1", {
  enumerable: true,
  get: function () {
    return _Set.default;
  }
});
Object.defineProperty(exports, "schemeSet2", {
  enumerable: true,
  get: function () {
    return _Set2.default;
  }
});
Object.defineProperty(exports, "schemeSet3", {
  enumerable: true,
  get: function () {
    return _Set3.default;
  }
});
Object.defineProperty(exports, "schemeSpectral", {
  enumerable: true,
  get: function () {
    return _Spectral.scheme;
  }
});
Object.defineProperty(exports, "schemeTableau10", {
  enumerable: true,
  get: function () {
    return _Tableau.default;
  }
});
Object.defineProperty(exports, "schemeYlGn", {
  enumerable: true,
  get: function () {
    return _YlGn.scheme;
  }
});
Object.defineProperty(exports, "schemeYlGnBu", {
  enumerable: true,
  get: function () {
    return _YlGnBu.scheme;
  }
});
Object.defineProperty(exports, "schemeYlOrBr", {
  enumerable: true,
  get: function () {
    return _YlOrBr.scheme;
  }
});
Object.defineProperty(exports, "schemeYlOrRd", {
  enumerable: true,
  get: function () {
    return _YlOrRd.scheme;
  }
});
var _category = _interopRequireDefault(require("./categorical/category10.js"));
var _Accent = _interopRequireDefault(require("./categorical/Accent.js"));
var _Dark = _interopRequireDefault(require("./categorical/Dark2.js"));
var _Paired = _interopRequireDefault(require("./categorical/Paired.js"));
var _Pastel = _interopRequireDefault(require("./categorical/Pastel1.js"));
var _Pastel2 = _interopRequireDefault(require("./categorical/Pastel2.js"));
var _Set = _interopRequireDefault(require("./categorical/Set1.js"));
var _Set2 = _interopRequireDefault(require("./categorical/Set2.js"));
var _Set3 = _interopRequireDefault(require("./categorical/Set3.js"));
var _Tableau = _interopRequireDefault(require("./categorical/Tableau10.js"));
var _BrBG = _interopRequireWildcard(require("./diverging/BrBG.js"));
var _PRGn = _interopRequireWildcard(require("./diverging/PRGn.js"));
var _PiYG = _interopRequireWildcard(require("./diverging/PiYG.js"));
var _PuOr = _interopRequireWildcard(require("./diverging/PuOr.js"));
var _RdBu = _interopRequireWildcard(require("./diverging/RdBu.js"));
var _RdGy = _interopRequireWildcard(require("./diverging/RdGy.js"));
var _RdYlBu = _interopRequireWildcard(require("./diverging/RdYlBu.js"));
var _RdYlGn = _interopRequireWildcard(require("./diverging/RdYlGn.js"));
var _Spectral = _interopRequireWildcard(require("./diverging/Spectral.js"));
var _BuGn = _interopRequireWildcard(require("./sequential-multi/BuGn.js"));
var _BuPu = _interopRequireWildcard(require("./sequential-multi/BuPu.js"));
var _GnBu = _interopRequireWildcard(require("./sequential-multi/GnBu.js"));
var _OrRd = _interopRequireWildcard(require("./sequential-multi/OrRd.js"));
var _PuBuGn = _interopRequireWildcard(require("./sequential-multi/PuBuGn.js"));
var _PuBu = _interopRequireWildcard(require("./sequential-multi/PuBu.js"));
var _PuRd = _interopRequireWildcard(require("./sequential-multi/PuRd.js"));
var _RdPu = _interopRequireWildcard(require("./sequential-multi/RdPu.js"));
var _YlGnBu = _interopRequireWildcard(require("./sequential-multi/YlGnBu.js"));
var _YlGn = _interopRequireWildcard(require("./sequential-multi/YlGn.js"));
var _YlOrBr = _interopRequireWildcard(require("./sequential-multi/YlOrBr.js"));
var _YlOrRd = _interopRequireWildcard(require("./sequential-multi/YlOrRd.js"));
var _Blues = _interopRequireWildcard(require("./sequential-single/Blues.js"));
var _Greens = _interopRequireWildcard(require("./sequential-single/Greens.js"));
var _Greys = _interopRequireWildcard(require("./sequential-single/Greys.js"));
var _Purples = _interopRequireWildcard(require("./sequential-single/Purples.js"));
var _Reds = _interopRequireWildcard(require("./sequential-single/Reds.js"));
var _Oranges = _interopRequireWildcard(require("./sequential-single/Oranges.js"));
var _cividis = _interopRequireDefault(require("./sequential-multi/cividis.js"));
var _cubehelix = _interopRequireDefault(require("./sequential-multi/cubehelix.js"));
var _rainbow = _interopRequireWildcard(require("./sequential-multi/rainbow.js"));
var _sinebow = _interopRequireDefault(require("./sequential-multi/sinebow.js"));
var _turbo = _interopRequireDefault(require("./sequential-multi/turbo.js"));
var _viridis = _interopRequireWildcard(require("./sequential-multi/viridis.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./categorical/category10.js":"dTYe","./categorical/Accent.js":"o8vx","./categorical/Dark2.js":"regV","./categorical/Paired.js":"E9sC","./categorical/Pastel1.js":"RCRU","./categorical/Pastel2.js":"QfGF","./categorical/Set1.js":"IldB","./categorical/Set2.js":"KR9o","./categorical/Set3.js":"XNXw","./categorical/Tableau10.js":"FyyB","./diverging/BrBG.js":"ArEB","./diverging/PRGn.js":"kzYK","./diverging/PiYG.js":"PI8x","./diverging/PuOr.js":"h8TC","./diverging/RdBu.js":"i3rG","./diverging/RdGy.js":"WaJg","./diverging/RdYlBu.js":"JvsS","./diverging/RdYlGn.js":"K9lw","./diverging/Spectral.js":"rXym","./sequential-multi/BuGn.js":"KGBO","./sequential-multi/BuPu.js":"lAoh","./sequential-multi/GnBu.js":"ZoIf","./sequential-multi/OrRd.js":"SiOD","./sequential-multi/PuBuGn.js":"vp6S","./sequential-multi/PuBu.js":"Wfss","./sequential-multi/PuRd.js":"NZPG","./sequential-multi/RdPu.js":"fzkB","./sequential-multi/YlGnBu.js":"fL1Z","./sequential-multi/YlGn.js":"xEGO","./sequential-multi/YlOrBr.js":"BmdO","./sequential-multi/YlOrRd.js":"SHo5","./sequential-single/Blues.js":"jpg6","./sequential-single/Greens.js":"rjqF","./sequential-single/Greys.js":"x8Iu","./sequential-single/Purples.js":"MJdW","./sequential-single/Reds.js":"DiEh","./sequential-single/Oranges.js":"O9hI","./sequential-multi/cividis.js":"SaPT","./sequential-multi/cubehelix.js":"cI87","./sequential-multi/rainbow.js":"BkJF","./sequential-multi/sinebow.js":"ZXMu","./sequential-multi/turbo.js":"PX18","./sequential-multi/viridis.js":"SfG7"}],"f1Mg":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = load;
var helper = _interopRequireWildcard(require("./scripts/helper.js"));
var menu = _interopRequireWildcard(require("../components/media-selection-menu.js"));
var preproc = _interopRequireWildcard(require("./scripts/preprocess.js"));
var viz = _interopRequireWildcard(require("./scripts/heatmap_viz.js"));
var addons = _interopRequireWildcard(require("./scripts/viz-addons.js"));
var slider = _interopRequireWildcard(require("../components/slider.js"));
var sortBySelect = _interopRequireWildcard(require("../components/sort-by-select.js"));
var d3Chromatic = _interopRequireWildcard(require("d3-scale-chromatic"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Loads the overview tab.
 *
 * @param {*} d3 The d3 library
 */
function load(d3) {
  var bounds;
  var svgSize;
  var graphSize;
  var domainColumn = 'vues';
  var selectedMediaList = [];
  var graphTitleMap = new Map().set('vues', 'Total view count of Various Media Outlets Over Time').set('likes', 'Total like count of Various Media Outlets Over Time').set('commentaires', 'Total comment count of Various Media Outlets Over Time').set('partages', 'Total share count of Various Media Outlets Over Time');
  var fromTo = {
    from: new Date(2018, 10, 30),
    to: new Date(2023, 3, 14)
  };
  var margin = {
    top: 10,
    right: 20,
    bottom: 35,
    left: 50
  };
  // TODO: Use this file for welcom vizs
  var xScale = d3.scaleTime();
  var yScale = d3.scaleLog();
  var colorScale = d3.scaleSequential(d3Chromatic.interpolateBuPu);
  d3.csv('./data_source.csv', d3.autoType).then(function (data) {
    // removes video in april 2023 because the month is not entirely covered in input data
    data = preproc.removeAfter(data, new Date('2023-03-30'));
    data = preproc.setYear(data);
    var mediaList = preproc.getMediaList(data);

    // creates the media selection component
    menu.append(document.querySelector('#overview-controls-media-selection'), mediaList, updateSelectedMedia);
    slider.append(document.querySelector('#overview-controls-time-range'), new Date(2018, 10, 30), new Date(2023, 3, 14), updateSelectedDates);
    sortBySelect.append(document.querySelector('#overview-controls-sort-by'), {
      'Total Views': 'vues',
      'Total Likes': 'likes',
      'Total Comments': 'commentaires',
      'Total Shares': 'partages'
    }, updateDomainColumn);
    data = data.map(function (row) {
      return _objectSpread(_objectSpread({}, row), {}, {
        yearMonth: row.year + '>' + new Date(row.date).getMonth()
      });
    });
    data = preproc.aggregateColumns(data, ['vues', 'likes', 'partages', 'commentaires'], ['date'], ['yearMonth', 'média']);
    var dataFromTo = data;

    // viz.setColorScaleDomain(colorScale, data, "vuesAverageNormalized");

    // legend.initGradient(colorScale);
    // legend.initLegendBar();
    // legend.initLegendAxis();

    var g = helper.generateG(margin);
    helper.appendAxes(g);
    viz.appendLines(data);

    // addons.initPanelDiv();
    // addons.initButtons(updateDomainColumn);

    setSizing();
    build();

    /**
     *   This function handles the graph's sizing.
     */
    function setSizing() {
      bounds = d3.select('.overview-graph').node().getBoundingClientRect();
      svgSize = {
        width: bounds.width,
        height: 550
      };
      graphSize = {
        width: svgSize.width - margin.right - margin.left,
        height: svgSize.height - margin.bottom - margin.top
      };
      helper.setCanvasSize(svgSize.width, svgSize.height);
    }

    /**
     * Callback function to update the column used for the x axis
     *
     * @param {*} column The new column to use
     */
    function updateDomainColumn(column) {
      domainColumn = column;
      build();
    }

    /**
     * Updates the plot with the selected media
     *
     * @param {string[]} mediaList The selected media
     */
    function updateSelectedMedia(mediaList) {
      selectedMediaList = mediaList;
      build();
    }

    /**
     * Updates the plot with the select date range
     *
     * @param {*} fromToDates Object with "from" and "to" properties containing Date objects
     */
    function updateSelectedDates(fromToDates) {
      fromTo.from = fromToDates.from;
      fromTo.to = fromToDates.to;
      dataFromTo = data;
      dataFromTo = dataFromTo.filter(function (row) {
        return new Date(row.date).getTime() >= fromToDates.from.getTime() && new Date(row.date).getTime() <= fromToDates.to.getTime();
      });
      build();
    }

    /**
     *   This function builds the graph.
     */
    function build() {
      viz.updateXScale(dataFromTo, xScale, graphSize.width);
      viz.updateYScale(yScale, dataFromTo, graphSize.height, domainColumn);
      viz.drawXAxis(xScale, graphSize.height);
      viz.drawYAxis(yScale, graphSize.width);
      viz.rotateYTicks();
      viz.generateGraphTitle(graphTitleMap.get(domainColumn), graphSize.width);
      viz.generateGraphSubtitle(fromTo.from, fromTo.to, graphSize.width);
      viz.updateLines(xScale, yScale, colorScale, dataFromTo, domainColumn, addons.displayPanel, selectedMediaList);
    }
    window.addEventListener('resize', function () {
      setSizing();
      build();
    });
  });
}
},{"./scripts/helper.js":"Kyho","../components/media-selection-menu.js":"pbTI","./scripts/preprocess.js":"I9no","./scripts/heatmap_viz.js":"bQz2","./scripts/viz-addons.js":"xl4k","../components/slider.js":"qFBM","../components/sort-by-select.js":"Pwqr","d3-scale-chromatic":"ado2"}],"O0HB":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appendAxes = appendAxes;
exports.generateG = generateG;
exports.getContents = getContents;
exports.setCanvasSize = setCanvasSize;
/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable jsdoc/require-returns */

/**
 * Generates the SVG element g which will contain the data visualisation.
 *
 * @param {object} margin The desired margins around the graph
 * @returns {*} The d3 Selection for the created g element
 */
function generateG(margin) {
  return d3.select('.hashtags-graph').select('svg').append('g').attr('id', 'hashtags-graph-g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
}

/**
 * Sets the size of the SVG canvas containing the graph.
 *
 * @param {number} width The desired width
 * @param {number} height The desired height
 */
function setCanvasSize(width, height) {
  d3.select('#hashtags-heatmap').select('svg').attr('width', width).attr('height', height);
}

/**
 * Appends an SVG g element which will contain the axes.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
function appendAxes(g) {
  g.append('g').attr('class', 'x axis').style('color', 'white');
  g.append('g').attr('class', 'y axis').style('color', 'white');
}
function getContents(d, engagementCategory) {
  var target = d3.select(d.target);
  if (engagementCategory === 'likes') {
    return "<div class='tooltip'>\n    <span class='tooltiptext' style=\"padding: 10px; width: 200px\">".concat(target.data()[0].hashtag, "\n        </br>\n        </br>\n        Average likes: ").concat(Math.round(target.data()[0].likes), "\n        </span>\n        </div>\n\n    ");
  } else if (engagementCategory === 'partages') {
    return "<div class='tooltip'>\n      <span class='tooltiptext' style=\"padding: 10px; width: 200px\">".concat(target.data()[0].hashtag, "\n        </br>\n        </br>\n        Average shares: ").concat(Math.round(target.data()[0].partages), "\n        </span>\n        </div>\n    ");
  } else if (engagementCategory === 'vues') {
    return "<div class='tooltip'>\n      <span class='tooltiptext' style=\"padding: 10px; width: 200px\">".concat(target.data()[0].hashtag, "\n        </br>\n        </br>\n        Average views: ").concat(Math.round(target.data()[0].vues), "\n        </span>\n        </div>\n\n    ");
  } else if (engagementCategory === 'commentaires') {
    return "<div class='tooltip'>\n      <span class='tooltiptext' style=\"padding: 10px; width: 200px\">".concat(target.data()[0].hashtag, "\n        </br>\n        </br>\n        Average comments: ").concat(Math.round(target.data()[0].commentaires), "\n\n        </span>\n        </div>\n    ");
  }
}
},{}],"FN8K":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.regrouperParHashtags = regrouperParHashtags;
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/* eslint-disable jsdoc/require-param */
/* eslint-disable jsdoc/check-param-names */

/**
 * Returns the list of the most popular hashtags with fromTo dates
 *
 * @param {object[]} data The data to analyze
 * @returns {object[]} The column with the normalized data
 */
function regrouperParHashtags(data, fromToDates) {
  var groupes = {};
  data.forEach(function (objet) {
    if (new Date(objet.date).getTime() >= fromToDates.from.getTime() && new Date(objet.date).getTime() <= fromToDates.to.getTime()) {
      var _match, _objet$description;
      var likes = objet.likes;
      var partages = objet.partages;
      var commentaires = objet.commentaires;
      var vues = objet.vues;
      var hashtags = (_match = ((_objet$description = objet.description) !== null && _objet$description !== void 0 ? _objet$description : '').match(/#\w+/g)) !== null && _match !== void 0 ? _match : [];
      var _iterator = _createForOfIteratorHelper(hashtags),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var hashtag = _step.value;
          if (groupes[hashtag]) {
            groupes[hashtag].likes += likes;
            groupes[hashtag].partages += partages;
            groupes[hashtag].commentaires += commentaires;
            groupes[hashtag].vues += vues;
            groupes[hashtag].count++;
          } else {
            groupes[hashtag] = {
              hashtag: hashtag,
              likes: likes,
              partages: partages,
              commentaires: commentaires,
              vues: vues,
              count: 1
            };
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  });
  var nouveauTableau = Object.values(groupes).map(function (groupe) {
    var moyenneLikes = groupe.likes / groupe.count;
    var moyennePartages = groupe.partages / groupe.count;
    var moyenneCommentaires = groupe.commentaires / groupe.count;
    var moyenneVues = groupe.vues / groupe.count;
    return {
      hashtag: groupe.hashtag,
      likes: moyenneLikes,
      partages: moyennePartages,
      commentaires: moyenneCommentaires,
      vues: moyenneVues
    };
  });
  return nouveauTableau;
}
},{}],"cGhw":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appendRects = appendRects;
exports.generateGraphSubtitle = generateGraphSubtitle;
exports.generateGraphTitle = generateGraphTitle;
/* eslint-disable jsdoc/require-param-type */
/* eslint-disable jsdoc/require-param-description */

/**
 * @param data
 * @param width
 * @param height
 * @param engagementCategory
 * @param tip
 */
function appendRects(data, width, height, engagementCategory, tip) {
  var svg = d3.select('#hashtags-graph-g');
  var x = d3.scaleBand().domain(data.map(function (d) {
    return d.hashtag;
  })).padding(0.2).range([0, width]);
  d3.select('#hashtags-graph-g .x.axis').attr('transform', "translate(0,".concat(height, ")")).call(d3.axisBottom(x)).selectAll('text').style('text-anchor', 'center').style('font-size', '14').style('font-weight', 'bold').style('fill', 'white');

  // Add Y axis

  if (engagementCategory === 'likes') {
    var y = d3.scaleLinear().domain([0, d3.max(data, function (d) {
      return d.likes;
    })]) // Utilisation de d3.max pour obtenir la valeur maximale des étoiles
    .range([height, 0]);
    d3.select('#hashtags-graph-g .y.axis').call(d3.axisLeft(y));

    // Create and fill the bars
    svg.selectAll('.bar').remove();
    svg.selectAll('.bar') // Utilisation de la classe ".bar" pour sélectionner les barres
    .data(data).join('rect').attr('class', 'bar') // Ajout de la classe "bar" pour les éléments <rect>
    .attr('x', function (d) {
      return x(d.hashtag);
    }).attr('y', function (d) {
      return y(d.likes);
    }).attr('width', x.bandwidth()).attr('height', function (d) {
      return height - y(d.likes);
    }).attr('fill', function (d) {
      return '#483248';
    }).on('mouseover', tip.show).on('mouseout', tip.hide);
  } else if (engagementCategory === 'partages') {
    var _y = d3.scaleLinear().domain([0, d3.max(data, function (d) {
      return d.partages;
    })]) // Utilisation de d3.max pour obtenir la valeur maximale des étoiles
    .range([height, 0]);
    d3.select('#hashtags-graph-g .y.axis').call(d3.axisLeft(_y));

    // Create and fill the bars
    svg.selectAll('.bar').remove();
    svg.selectAll('.bar') // Utilisation de la classe ".bar" pour sélectionner les barres
    .data(data).enter().append('rect').attr('class', 'bar') // Ajout de la classe "bar" pour les éléments <rect>
    .attr('x', function (d) {
      return x(d.hashtag);
    }).attr('y', function (d) {
      return _y(d.partages);
    }).attr('width', x.bandwidth()).attr('height', function (d) {
      return height - _y(d.partages);
    }).attr('fill', function (d) {
      return '#483248';
    }).on('mouseover', tip.show).on('mouseout', tip.hide);
  } else if (engagementCategory === 'commentaires') {
    var _y2 = d3.scaleLinear().domain([0, d3.max(data, function (d) {
      return d.commentaires;
    })]) // Utilisation de d3.max pour obtenir la valeur maximale des étoiles
    .range([height, 0]);
    d3.select('#hashtags-graph-g .y.axis').call(d3.axisLeft(_y2));

    // Create and fill the bars
    svg.selectAll('.bar').remove();
    svg.selectAll('.bar') // Utilisation de la classe ".bar" pour sélectionner les barres
    .data(data).enter().append('rect').attr('class', 'bar') // Ajout de la classe "bar" pour les éléments <rect>
    .attr('x', function (d) {
      return x(d.hashtag);
    }).attr('y', function (d) {
      return _y2(d.commentaires);
    }).attr('width', x.bandwidth()).attr('height', function (d) {
      return height - _y2(d.commentaires);
    }).attr('fill', function (d) {
      return '#483248';
    }).on('mouseover', tip.show).on('mouseout', tip.hide);
  } else if (engagementCategory === 'vues') {
    var _y3 = d3.scaleLinear().domain([0, d3.max(data, function (d) {
      return d.vues;
    })]) // Utilisation de d3.max pour obtenir la valeur maximale des étoiles
    .range([height, 0]);
    d3.select('#hashtags-graph-g .y.axis').call(d3.axisLeft(_y3));

    // Create and fill the bars
    svg.selectAll('.bar').remove();
    svg.selectAll('.bar') // Utilisation de la classe ".bar" pour sélectionner les barres
    .data(data).enter().append('rect').attr('class', 'bar') // Ajout de la classe "bar" pour les éléments <rect>
    .attr('x', function (d) {
      return x(d.hashtag);
    }).attr('y', function (d) {
      return _y3(d.vues);
    }).attr('width', x.bandwidth()).attr('height', function (d) {
      return height - _y3(d.vues);
    }).attr('fill', function (d) {
      return '#483248';
    }).on('mouseover', tip.show).on('mouseout', tip.hide);
  }
}

/**
 * Generates the subtitle for the visualization.
 *
 * @param {Date} minDate The minimum displayed date
 * @param {Date} maxDate The maximum displayed date
 * @param {number} width The width of the g element containing the visualization
 */
function generateGraphSubtitle(minDate, maxDate, width) {
  var svg = d3.select('#hashtags-graph-g');
  var formattedMinDate = minDate.toLocaleDateString('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  var formattedMaxDate = maxDate.toLocaleDateString('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  var subtitle = d3.select('#hashtags .hashtags-subtitle');
  if (subtitle.node()) {
    subtitle.attr('x', width / 2).text("From ".concat(formattedMinDate, " to ").concat(formattedMaxDate));
  } else {
    svg.append('text').attr('class', 'hashtags-subtitle').attr('x', width / 2).attr('y', -10).attr('text-anchor', 'middle').attr('fill', '#a4a4a4').style('font-size', '14px').text("From ".concat(formattedMinDate, " to ").concat(formattedMaxDate));
  }
}

/**
 * Generates the title of the visualization.
 *
 * @param {string} title The title of the visualization
 * @param {number} width The width of the g element containing the visualization
 */
function generateGraphTitle(title, width) {
  var svg = d3.select('#hashtags-graph-g');
  var graphTitle = d3.select('#hashtags .hashtags-title');
  if (graphTitle.node()) {
    // update title if it already exists
    graphTitle.attr('x', width / 2).text(title);
  } else {
    svg.append('text').attr('class', 'hashtags-title').attr('x', width / 2).attr('y', -40).attr('text-anchor', 'middle').attr('fill', '#fff').style('font-size', '20px').style('font-weight', 'bold').text(title);
  }
}
},{}],"BstJ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xhtml = exports.default = void 0;
var xhtml = "http://www.w3.org/1999/xhtml";
exports.xhtml = xhtml;
var _default = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
exports.default = _default;
},{}],"dGTM":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _namespaces = _interopRequireDefault(require("./namespaces"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default(name) {
  var prefix = name += "",
    i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return _namespaces.default.hasOwnProperty(prefix) ? {
    space: _namespaces.default[prefix],
    local: name
  } : name;
}
},{"./namespaces":"BstJ"}],"RtY4":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _namespace = _interopRequireDefault(require("./namespace"));
var _namespaces = require("./namespaces");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function creatorInherit(name) {
  return function () {
    var document = this.ownerDocument,
      uri = this.namespaceURI;
    return uri === _namespaces.xhtml && document.documentElement.namespaceURI === _namespaces.xhtml ? document.createElement(name) : document.createElementNS(uri, name);
  };
}
function creatorFixed(fullname) {
  return function () {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}
function _default(name) {
  var fullname = (0, _namespace.default)(name);
  return (fullname.local ? creatorFixed : creatorInherit)(fullname);
}
},{"./namespace":"dGTM","./namespaces":"BstJ"}],"obpk":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function none() {}
function _default(selector) {
  return selector == null ? none : function () {
    return this.querySelector(selector);
  };
}
},{}],"NFvr":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./index");
var _selector = _interopRequireDefault(require("../selector"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default(select) {
  if (typeof select !== "function") select = (0, _selector.default)(select);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }
  return new _index.Selection(subgroups, this._parents);
}
},{"./index":"ZUSK","../selector":"obpk"}],"oDLJ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function empty() {
  return [];
}
function _default(selector) {
  return selector == null ? empty : function () {
    return this.querySelectorAll(selector);
  };
}
},{}],"jNnW":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./index");
var _selectorAll = _interopRequireDefault(require("../selectorAll"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default(select) {
  if (typeof select !== "function") select = (0, _selectorAll.default)(select);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }
  return new _index.Selection(subgroups, parents);
}
},{"./index":"ZUSK","../selectorAll":"oDLJ"}],"ITmw":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(selector) {
  return function () {
    return this.matches(selector);
  };
}
},{}],"EOrj":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./index");
var _matcher = _interopRequireDefault(require("../matcher"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default(match) {
  if (typeof match !== "function") match = (0, _matcher.default)(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new _index.Selection(subgroups, this._parents);
}
},{"./index":"ZUSK","../matcher":"ITmw"}],"lo3F":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(update) {
  return new Array(update.length);
}
},{}],"iRCF":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnterNode = EnterNode;
exports.default = _default;
var _sparse = _interopRequireDefault(require("./sparse"));
var _index = require("./index");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default() {
  return new _index.Selection(this._enter || this._groups.map(_sparse.default), this._parents);
}
function EnterNode(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}
EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function (child) {
    return this._parent.insertBefore(child, this._next);
  },
  insertBefore: function (child, next) {
    return this._parent.insertBefore(child, next);
  },
  querySelector: function (selector) {
    return this._parent.querySelector(selector);
  },
  querySelectorAll: function (selector) {
    return this._parent.querySelectorAll(selector);
  }
};
},{"./sparse":"lo3F","./index":"ZUSK"}],"qVqJ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./index");
var _enter = require("./enter");
var _constant = _interopRequireDefault(require("../constant"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var keyPrefix = "$"; // Protect against keys like “__proto__”.

function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0,
    node,
    groupLength = group.length,
    dataLength = data.length;

  // Put any non-null nodes that fit into update.
  // Put any null nodes into enter.
  // Put any remaining data into enter.
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new _enter.EnterNode(parent, data[i]);
    }
  }

  // Put any non-null nodes that don’t fit into exit.
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}
function bindKey(parent, group, enter, update, exit, data, key) {
  var i,
    node,
    nodeByKeyValue = {},
    groupLength = group.length,
    dataLength = data.length,
    keyValues = new Array(groupLength),
    keyValue;

  // Compute the key for each node.
  // If multiple nodes have the same key, the duplicates are added to exit.
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);
      if (keyValue in nodeByKeyValue) {
        exit[i] = node;
      } else {
        nodeByKeyValue[keyValue] = node;
      }
    }
  }

  // Compute the key for each datum.
  // If there a node associated with this key, join and add it to update.
  // If there is not (or the key is a duplicate), add it to enter.
  for (i = 0; i < dataLength; ++i) {
    keyValue = keyPrefix + key.call(parent, data[i], i, data);
    if (node = nodeByKeyValue[keyValue]) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue[keyValue] = null;
    } else {
      enter[i] = new _enter.EnterNode(parent, data[i]);
    }
  }

  // Add any remaining nodes that were not bound to data to exit.
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && nodeByKeyValue[keyValues[i]] === node) {
      exit[i] = node;
    }
  }
}
function _default(value, key) {
  if (!value) {
    data = new Array(this.size()), j = -1;
    this.each(function (d) {
      data[++j] = d;
    });
    return data;
  }
  var bind = key ? bindKey : bindIndex,
    parents = this._parents,
    groups = this._groups;
  if (typeof value !== "function") value = (0, _constant.default)(value);
  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j],
      group = groups[j],
      groupLength = group.length,
      data = value.call(parent, parent && parent.__data__, j, parents),
      dataLength = data.length,
      enterGroup = enter[j] = new Array(dataLength),
      updateGroup = update[j] = new Array(dataLength),
      exitGroup = exit[j] = new Array(groupLength);
    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

    // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
        previous._next = next || null;
      }
    }
  }
  update = new _index.Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}
},{"./index":"ZUSK","./enter":"iRCF","../constant":"XE5s"}],"huLM":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _sparse = _interopRequireDefault(require("./sparse"));
var _index = require("./index");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default() {
  return new _index.Selection(this._exit || this._groups.map(_sparse.default), this._parents);
}
},{"./sparse":"lo3F","./index":"ZUSK"}],"aaTS":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(onenter, onupdate, onexit) {
  var enter = this.enter(),
    update = this,
    exit = this.exit();
  enter = typeof onenter === "function" ? onenter(enter) : enter.append(onenter + "");
  if (onupdate != null) update = onupdate(update);
  if (onexit == null) exit.remove();else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}
},{}],"JTmu":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./index");
function _default(selection) {
  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new _index.Selection(merges, this._parents);
}
},{"./index":"ZUSK"}],"GdYa":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default() {
  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }
  return this;
}
},{}],"esM3":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./index");
function _default(compare) {
  if (!compare) compare = ascending;
  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }
  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }
  return new _index.Selection(sortgroups, this._parents).order();
}
function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
},{"./index":"ZUSK"}],"JNBw":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}
},{}],"r2SH":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default() {
  var nodes = new Array(this.size()),
    i = -1;
  this.each(function () {
    nodes[++i] = this;
  });
  return nodes;
}
},{}],"oOSo":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }
  return null;
}
},{}],"UkRw":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default() {
  var size = 0;
  this.each(function () {
    ++size;
  });
  return size;
}
},{}],"ziIZ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default() {
  return !this.node();
}
},{}],"osXg":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(callback) {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }
  return this;
}
},{}],"jS6M":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _namespace = _interopRequireDefault(require("../namespace"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function attrRemove(name) {
  return function () {
    this.removeAttribute(name);
  };
}
function attrRemoveNS(fullname) {
  return function () {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant(name, value) {
  return function () {
    this.setAttribute(name, value);
  };
}
function attrConstantNS(fullname, value) {
  return function () {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}
function attrFunction(name, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);else this.setAttribute(name, v);
  };
}
function attrFunctionNS(fullname, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}
function _default(name, value) {
  var fullname = (0, _namespace.default)(name);
  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
  }
  return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
}
},{"../namespace":"dGTM"}],"vD4n":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(node) {
  return node.ownerDocument && node.ownerDocument.defaultView // node is a Node
  || node.document && node // node is a Window
  || node.defaultView; // node is a Document
}
},{}],"VLLC":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.styleValue = styleValue;
var _window = _interopRequireDefault(require("../window"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function styleRemove(name) {
  return function () {
    this.style.removeProperty(name);
  };
}
function styleConstant(name, value, priority) {
  return function () {
    this.style.setProperty(name, value, priority);
  };
}
function styleFunction(name, value, priority) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);else this.style.setProperty(name, v, priority);
  };
}
function _default(name, value, priority) {
  return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
}
function styleValue(node, name) {
  return node.style.getPropertyValue(name) || (0, _window.default)(node).getComputedStyle(node, null).getPropertyValue(name);
}
},{"../window":"vD4n"}],"hfrR":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function propertyRemove(name) {
  return function () {
    delete this[name];
  };
}
function propertyConstant(name, value) {
  return function () {
    this[name] = value;
  };
}
function propertyFunction(name, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];else this[name] = v;
  };
}
function _default(name, value) {
  return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
}
},{}],"C2sl":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function classArray(string) {
  return string.trim().split(/^|\s+/);
}
function classList(node) {
  return node.classList || new ClassList(node);
}
function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}
ClassList.prototype = {
  add: function (name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function (name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function (name) {
    return this._names.indexOf(name) >= 0;
  }
};
function classedAdd(node, names) {
  var list = classList(node),
    i = -1,
    n = names.length;
  while (++i < n) list.add(names[i]);
}
function classedRemove(node, names) {
  var list = classList(node),
    i = -1,
    n = names.length;
  while (++i < n) list.remove(names[i]);
}
function classedTrue(names) {
  return function () {
    classedAdd(this, names);
  };
}
function classedFalse(names) {
  return function () {
    classedRemove(this, names);
  };
}
function classedFunction(names, value) {
  return function () {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}
function _default(name, value) {
  var names = classArray(name + "");
  if (arguments.length < 2) {
    var list = classList(this.node()),
      i = -1,
      n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }
  return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
}
},{}],"xXMy":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function textRemove() {
  this.textContent = "";
}
function textConstant(value) {
  return function () {
    this.textContent = value;
  };
}
function textFunction(value) {
  return function () {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}
function _default(value) {
  return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
}
},{}],"vSEN":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function htmlRemove() {
  this.innerHTML = "";
}
function htmlConstant(value) {
  return function () {
    this.innerHTML = value;
  };
}
function htmlFunction(value) {
  return function () {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}
function _default(value) {
  return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
}
},{}],"ISQT":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}
function _default() {
  return this.each(raise);
}
},{}],"XxVt":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function _default() {
  return this.each(lower);
}
},{}],"mFTb":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _creator = _interopRequireDefault(require("../creator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default(name) {
  var create = typeof name === "function" ? name : (0, _creator.default)(name);
  return this.select(function () {
    return this.appendChild(create.apply(this, arguments));
  });
}
},{"../creator":"RtY4"}],"SBDd":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _creator = _interopRequireDefault(require("../creator"));
var _selector = _interopRequireDefault(require("../selector"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function constantNull() {
  return null;
}
function _default(name, before) {
  var create = typeof name === "function" ? name : (0, _creator.default)(name),
    select = before == null ? constantNull : typeof before === "function" ? before : (0, _selector.default)(before);
  return this.select(function () {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
}
},{"../creator":"RtY4","../selector":"obpk"}],"pfc1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}
function _default() {
  return this.each(remove);
}
},{}],"rXH4":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function selection_cloneShallow() {
  var clone = this.cloneNode(false),
    parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_cloneDeep() {
  var clone = this.cloneNode(true),
    parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function _default(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}
},{}],"xbnU":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(value) {
  return arguments.length ? this.property("__data__", value) : this.node().__data__;
}
},{}],"oPjo":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customEvent = customEvent;
exports.default = _default;
exports.event = void 0;
var filterEvents = {};
var event = null;
exports.event = event;
if (typeof document !== "undefined") {
  var element = document.documentElement;
  if (!("onmouseenter" in element)) {
    filterEvents = {
      mouseenter: "mouseover",
      mouseleave: "mouseout"
    };
  }
}
function filterContextListener(listener, index, group) {
  listener = contextListener(listener, index, group);
  return function (event) {
    var related = event.relatedTarget;
    if (!related || related !== this && !(related.compareDocumentPosition(this) & 8)) {
      listener.call(this, event);
    }
  };
}
function contextListener(listener, index, group) {
  return function (event1) {
    var event0 = event; // Events can be reentrant (e.g., focus).
    exports.event = event = event1;
    try {
      listener.call(this, this.__data__, index, group);
    } finally {
      exports.event = event = event0;
    }
  };
}
function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function (t) {
    var name = "",
      i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {
      type: t,
      name: name
    };
  });
}
function onRemove(typename) {
  return function () {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.capture);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;else delete this.__on;
  };
}
function onAdd(typename, value, capture) {
  var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
  return function (d, i, group) {
    var on = this.__on,
      o,
      listener = wrap(value, i, group);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.capture);
        this.addEventListener(o.type, o.listener = listener, o.capture = capture);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, capture);
    o = {
      type: typename.type,
      name: typename.name,
      value: value,
      listener: listener,
      capture: capture
    };
    if (!on) this.__on = [o];else on.push(o);
  };
}
function _default(typename, value, capture) {
  var typenames = parseTypenames(typename + ""),
    i,
    n = typenames.length,
    t;
  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }
  on = value ? onAdd : onRemove;
  if (capture == null) capture = false;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, capture));
  return this;
}
function customEvent(event1, listener, that, args) {
  var event0 = event;
  event1.sourceEvent = event;
  exports.event = event = event1;
  try {
    return listener.apply(that, args);
  } finally {
    exports.event = event = event0;
  }
}
},{}],"MP34":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _window = _interopRequireDefault(require("../window"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function dispatchEvent(node, type, params) {
  var window = (0, _window.default)(node),
    event = window.CustomEvent;
  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;else event.initEvent(type, false, false);
  }
  node.dispatchEvent(event);
}
function dispatchConstant(type, params) {
  return function () {
    return dispatchEvent(this, type, params);
  };
}
function dispatchFunction(type, params) {
  return function () {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}
function _default(type, params) {
  return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
}
},{"../window":"vD4n"}],"ZUSK":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Selection = Selection;
exports.root = exports.default = void 0;
var _select = _interopRequireDefault(require("./select"));
var _selectAll = _interopRequireDefault(require("./selectAll"));
var _filter = _interopRequireDefault(require("./filter"));
var _data = _interopRequireDefault(require("./data"));
var _enter = _interopRequireDefault(require("./enter"));
var _exit = _interopRequireDefault(require("./exit"));
var _join = _interopRequireDefault(require("./join"));
var _merge = _interopRequireDefault(require("./merge"));
var _order = _interopRequireDefault(require("./order"));
var _sort = _interopRequireDefault(require("./sort"));
var _call = _interopRequireDefault(require("./call"));
var _nodes = _interopRequireDefault(require("./nodes"));
var _node = _interopRequireDefault(require("./node"));
var _size = _interopRequireDefault(require("./size"));
var _empty = _interopRequireDefault(require("./empty"));
var _each = _interopRequireDefault(require("./each"));
var _attr = _interopRequireDefault(require("./attr"));
var _style = _interopRequireDefault(require("./style"));
var _property = _interopRequireDefault(require("./property"));
var _classed = _interopRequireDefault(require("./classed"));
var _text = _interopRequireDefault(require("./text"));
var _html = _interopRequireDefault(require("./html"));
var _raise = _interopRequireDefault(require("./raise"));
var _lower = _interopRequireDefault(require("./lower"));
var _append = _interopRequireDefault(require("./append"));
var _insert = _interopRequireDefault(require("./insert"));
var _remove = _interopRequireDefault(require("./remove"));
var _clone = _interopRequireDefault(require("./clone"));
var _datum = _interopRequireDefault(require("./datum"));
var _on = _interopRequireDefault(require("./on"));
var _dispatch = _interopRequireDefault(require("./dispatch"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var root = [null];
exports.root = root;
function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}
function selection() {
  return new Selection([[document.documentElement]], root);
}
Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: _select.default,
  selectAll: _selectAll.default,
  filter: _filter.default,
  data: _data.default,
  enter: _enter.default,
  exit: _exit.default,
  join: _join.default,
  merge: _merge.default,
  order: _order.default,
  sort: _sort.default,
  call: _call.default,
  nodes: _nodes.default,
  node: _node.default,
  size: _size.default,
  empty: _empty.default,
  each: _each.default,
  attr: _attr.default,
  style: _style.default,
  property: _property.default,
  classed: _classed.default,
  text: _text.default,
  html: _html.default,
  raise: _raise.default,
  lower: _lower.default,
  append: _append.default,
  insert: _insert.default,
  remove: _remove.default,
  clone: _clone.default,
  datum: _datum.default,
  on: _on.default,
  dispatch: _dispatch.default
};
var _default = selection;
exports.default = _default;
},{"./select":"NFvr","./selectAll":"jNnW","./filter":"EOrj","./data":"qVqJ","./enter":"iRCF","./exit":"huLM","./join":"aaTS","./merge":"JTmu","./order":"GdYa","./sort":"esM3","./call":"JNBw","./nodes":"r2SH","./node":"oOSo","./size":"UkRw","./empty":"ziIZ","./each":"osXg","./attr":"jS6M","./style":"VLLC","./property":"hfrR","./classed":"C2sl","./text":"xXMy","./html":"vSEN","./raise":"ISQT","./lower":"XxVt","./append":"mFTb","./insert":"SBDd","./remove":"pfc1","./clone":"rXH4","./datum":"xbnU","./on":"oPjo","./dispatch":"MP34"}],"dGfD":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./selection/index");
function _default(selector) {
  return typeof selector === "string" ? new _index.Selection([[document.querySelector(selector)]], [document.documentElement]) : new _index.Selection([[selector]], _index.root);
}
},{"./selection/index":"ZUSK"}],"mPbZ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _creator = _interopRequireDefault(require("./creator"));
var _select = _interopRequireDefault(require("./select"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default(name) {
  return (0, _select.default)((0, _creator.default)(name).call(document.documentElement));
}
},{"./creator":"RtY4","./select":"dGfD"}],"lPs7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = local;
var nextId = 0;
function local() {
  return new Local();
}
function Local() {
  this._ = "@" + (++nextId).toString(36);
}
Local.prototype = local.prototype = {
  constructor: Local,
  get: function (node) {
    var id = this._;
    while (!(id in node)) if (!(node = node.parentNode)) return;
    return node[id];
  },
  set: function (node, value) {
    return node[this._] = value;
  },
  remove: function (node) {
    return this._ in node && delete node[this._];
  },
  toString: function () {
    return this._;
  }
};
},{}],"sc1B":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _on = require("./selection/on");
function _default() {
  var current = _on.event,
    source;
  while (source = current.sourceEvent) current = source;
  return current;
}
},{"./selection/on":"oPjo"}],"T9nZ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(node, event) {
  var svg = node.ownerSVGElement || node;
  if (svg.createSVGPoint) {
    var point = svg.createSVGPoint();
    point.x = event.clientX, point.y = event.clientY;
    point = point.matrixTransform(node.getScreenCTM().inverse());
    return [point.x, point.y];
  }
  var rect = node.getBoundingClientRect();
  return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
}
},{}],"jvbX":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _sourceEvent = _interopRequireDefault(require("./sourceEvent"));
var _point = _interopRequireDefault(require("./point"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default(node) {
  var event = (0, _sourceEvent.default)();
  if (event.changedTouches) event = event.changedTouches[0];
  return (0, _point.default)(node, event);
}
},{"./sourceEvent":"sc1B","./point":"T9nZ"}],"j9UO":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./selection/index");
function _default(selector) {
  return typeof selector === "string" ? new _index.Selection([document.querySelectorAll(selector)], [document.documentElement]) : new _index.Selection([selector == null ? [] : selector], _index.root);
}
},{"./selection/index":"ZUSK"}],"tgqD":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _sourceEvent = _interopRequireDefault(require("./sourceEvent"));
var _point = _interopRequireDefault(require("./point"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default(node, touches, identifier) {
  if (arguments.length < 3) identifier = touches, touches = (0, _sourceEvent.default)().changedTouches;
  for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {
    if ((touch = touches[i]).identifier === identifier) {
      return (0, _point.default)(node, touch);
    }
  }
  return null;
}
},{"./sourceEvent":"sc1B","./point":"T9nZ"}],"VfrD":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _sourceEvent = _interopRequireDefault(require("./sourceEvent"));
var _point = _interopRequireDefault(require("./point"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default(node, touches) {
  if (touches == null) touches = (0, _sourceEvent.default)().touches;
  for (var i = 0, n = touches ? touches.length : 0, points = new Array(n); i < n; ++i) {
    points[i] = (0, _point.default)(node, touches[i]);
  }
  return points;
}
},{"./sourceEvent":"sc1B","./point":"T9nZ"}],"n1oy":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "clientPoint", {
  enumerable: true,
  get: function () {
    return _point.default;
  }
});
Object.defineProperty(exports, "create", {
  enumerable: true,
  get: function () {
    return _create.default;
  }
});
Object.defineProperty(exports, "creator", {
  enumerable: true,
  get: function () {
    return _creator.default;
  }
});
Object.defineProperty(exports, "customEvent", {
  enumerable: true,
  get: function () {
    return _on.customEvent;
  }
});
Object.defineProperty(exports, "event", {
  enumerable: true,
  get: function () {
    return _on.event;
  }
});
Object.defineProperty(exports, "local", {
  enumerable: true,
  get: function () {
    return _local.default;
  }
});
Object.defineProperty(exports, "matcher", {
  enumerable: true,
  get: function () {
    return _matcher.default;
  }
});
Object.defineProperty(exports, "mouse", {
  enumerable: true,
  get: function () {
    return _mouse.default;
  }
});
Object.defineProperty(exports, "namespace", {
  enumerable: true,
  get: function () {
    return _namespace.default;
  }
});
Object.defineProperty(exports, "namespaces", {
  enumerable: true,
  get: function () {
    return _namespaces.default;
  }
});
Object.defineProperty(exports, "select", {
  enumerable: true,
  get: function () {
    return _select.default;
  }
});
Object.defineProperty(exports, "selectAll", {
  enumerable: true,
  get: function () {
    return _selectAll.default;
  }
});
Object.defineProperty(exports, "selection", {
  enumerable: true,
  get: function () {
    return _index.default;
  }
});
Object.defineProperty(exports, "selector", {
  enumerable: true,
  get: function () {
    return _selector.default;
  }
});
Object.defineProperty(exports, "selectorAll", {
  enumerable: true,
  get: function () {
    return _selectorAll.default;
  }
});
Object.defineProperty(exports, "style", {
  enumerable: true,
  get: function () {
    return _style.styleValue;
  }
});
Object.defineProperty(exports, "touch", {
  enumerable: true,
  get: function () {
    return _touch.default;
  }
});
Object.defineProperty(exports, "touches", {
  enumerable: true,
  get: function () {
    return _touches.default;
  }
});
Object.defineProperty(exports, "window", {
  enumerable: true,
  get: function () {
    return _window.default;
  }
});
var _create = _interopRequireDefault(require("./create"));
var _creator = _interopRequireDefault(require("./creator"));
var _local = _interopRequireDefault(require("./local"));
var _matcher = _interopRequireDefault(require("./matcher"));
var _mouse = _interopRequireDefault(require("./mouse"));
var _namespace = _interopRequireDefault(require("./namespace"));
var _namespaces = _interopRequireDefault(require("./namespaces"));
var _point = _interopRequireDefault(require("./point"));
var _select = _interopRequireDefault(require("./select"));
var _selectAll = _interopRequireDefault(require("./selectAll"));
var _index = _interopRequireDefault(require("./selection/index"));
var _selector = _interopRequireDefault(require("./selector"));
var _selectorAll = _interopRequireDefault(require("./selectorAll"));
var _style = require("./selection/style");
var _touch = _interopRequireDefault(require("./touch"));
var _touches = _interopRequireDefault(require("./touches"));
var _window = _interopRequireDefault(require("./window"));
var _on = require("./selection/on");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./create":"mPbZ","./creator":"RtY4","./local":"lPs7","./matcher":"ITmw","./mouse":"jvbX","./namespace":"dGTM","./namespaces":"BstJ","./point":"T9nZ","./select":"dGfD","./selectAll":"j9UO","./selection/index":"ZUSK","./selector":"obpk","./selectorAll":"oDLJ","./selection/style":"VLLC","./touch":"tgqD","./touches":"VfrD","./window":"vD4n","./selection/on":"oPjo"}],"L7nD":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _d3Collection = require("d3-collection");
var _d3Selection = require("d3-selection");
/**
 * d3.tip
 * Copyright (c) 2013-2017 Justin Palmer
 *
 * Tooltips for d3.js SVG visualizations
 */
// eslint-disable-next-line no-extra-semi

// Public - constructs a new tooltip
//
// Returns a tip
function _default() {
  var direction = d3TipDirection,
    offset = d3TipOffset,
    html = d3TipHTML,
    rootElement = document.body,
    node = initNode(),
    svg = null,
    point = null,
    target = null;
  function tip(vis) {
    svg = getSVGNode(vis);
    if (!svg) return;
    point = svg.createSVGPoint();
    rootElement.appendChild(node);
  }

  // Public - show the tooltip on the screen
  //
  // Returns a tip
  tip.show = function () {
    var args = Array.prototype.slice.call(arguments);
    if (args[args.length - 1] instanceof SVGElement) target = args.pop();
    var content = html.apply(this, args),
      poffset = offset.apply(this, args),
      dir = direction.apply(this, args),
      nodel = getNodeEl(),
      i = directions.length,
      coords,
      scrollTop = document.documentElement.scrollTop || rootElement.scrollTop,
      scrollLeft = document.documentElement.scrollLeft || rootElement.scrollLeft;
    nodel.html(content).style('opacity', 1).style('pointer-events', 'all');
    while (i--) nodel.classed(directions[i], false);
    coords = directionCallbacks.get(dir).apply(this);
    nodel.classed(dir, true).style('top', coords.top + poffset[0] + scrollTop + 'px').style('left', coords.left + poffset[1] + scrollLeft + 'px');
    return tip;
  };

  // Public - hide the tooltip
  //
  // Returns a tip
  tip.hide = function () {
    var nodel = getNodeEl();
    nodel.style('opacity', 0).style('pointer-events', 'none');
    return tip;
  };

  // Public: Proxy attr calls to the d3 tip container.
  // Sets or gets attribute value.
  //
  // n - name of the attribute
  // v - value of the attribute
  //
  // Returns tip or attribute value
  // eslint-disable-next-line no-unused-vars
  tip.attr = function (n, v) {
    if (arguments.length < 2 && typeof n === 'string') {
      return getNodeEl().attr(n);
    }
    var args = Array.prototype.slice.call(arguments);
    _d3Selection.selection.prototype.attr.apply(getNodeEl(), args);
    return tip;
  };

  // Public: Proxy style calls to the d3 tip container.
  // Sets or gets a style value.
  //
  // n - name of the property
  // v - value of the property
  //
  // Returns tip or style property value
  // eslint-disable-next-line no-unused-vars
  tip.style = function (n, v) {
    if (arguments.length < 2 && typeof n === 'string') {
      return getNodeEl().style(n);
    }
    var args = Array.prototype.slice.call(arguments);
    _d3Selection.selection.prototype.style.apply(getNodeEl(), args);
    return tip;
  };

  // Public: Set or get the direction of the tooltip
  //
  // v - One of n(north), s(south), e(east), or w(west), nw(northwest),
  //     sw(southwest), ne(northeast) or se(southeast)
  //
  // Returns tip or direction
  tip.direction = function (v) {
    if (!arguments.length) return direction;
    direction = v == null ? v : functor(v);
    return tip;
  };

  // Public: Sets or gets the offset of the tip
  //
  // v - Array of [x, y] offset
  //
  // Returns offset or
  tip.offset = function (v) {
    if (!arguments.length) return offset;
    offset = v == null ? v : functor(v);
    return tip;
  };

  // Public: sets or gets the html value of the tooltip
  //
  // v - String value of the tip
  //
  // Returns html value or tip
  tip.html = function (v) {
    if (!arguments.length) return html;
    html = v == null ? v : functor(v);
    return tip;
  };

  // Public: sets or gets the root element anchor of the tooltip
  //
  // v - root element of the tooltip
  //
  // Returns root node of tip
  tip.rootElement = function (v) {
    if (!arguments.length) return rootElement;
    rootElement = v == null ? v : functor(v);
    return tip;
  };

  // Public: destroys the tooltip and removes it from the DOM
  //
  // Returns a tip
  tip.destroy = function () {
    if (node) {
      getNodeEl().remove();
      node = null;
    }
    return tip;
  };
  function d3TipDirection() {
    return 'n';
  }
  function d3TipOffset() {
    return [0, 0];
  }
  function d3TipHTML() {
    return ' ';
  }
  var directionCallbacks = (0, _d3Collection.map)({
      n: directionNorth,
      s: directionSouth,
      e: directionEast,
      w: directionWest,
      nw: directionNorthWest,
      ne: directionNorthEast,
      sw: directionSouthWest,
      se: directionSouthEast
    }),
    directions = directionCallbacks.keys();
  function directionNorth() {
    var bbox = getScreenBBox(this);
    return {
      top: bbox.n.y - node.offsetHeight,
      left: bbox.n.x - node.offsetWidth / 2
    };
  }
  function directionSouth() {
    var bbox = getScreenBBox(this);
    return {
      top: bbox.s.y,
      left: bbox.s.x - node.offsetWidth / 2
    };
  }
  function directionEast() {
    var bbox = getScreenBBox(this);
    return {
      top: bbox.e.y - node.offsetHeight / 2,
      left: bbox.e.x
    };
  }
  function directionWest() {
    var bbox = getScreenBBox(this);
    return {
      top: bbox.w.y - node.offsetHeight / 2,
      left: bbox.w.x - node.offsetWidth
    };
  }
  function directionNorthWest() {
    var bbox = getScreenBBox(this);
    return {
      top: bbox.nw.y - node.offsetHeight,
      left: bbox.nw.x - node.offsetWidth
    };
  }
  function directionNorthEast() {
    var bbox = getScreenBBox(this);
    return {
      top: bbox.ne.y - node.offsetHeight,
      left: bbox.ne.x
    };
  }
  function directionSouthWest() {
    var bbox = getScreenBBox(this);
    return {
      top: bbox.sw.y,
      left: bbox.sw.x - node.offsetWidth
    };
  }
  function directionSouthEast() {
    var bbox = getScreenBBox(this);
    return {
      top: bbox.se.y,
      left: bbox.se.x
    };
  }
  function initNode() {
    var div = (0, _d3Selection.select)(document.createElement('div'));
    div.style('position', 'absolute').style('top', 0).style('opacity', 0).style('pointer-events', 'none').style('box-sizing', 'border-box');
    return div.node();
  }
  function getSVGNode(element) {
    var svgNode = element.node();
    if (!svgNode) return null;
    if (svgNode.tagName.toLowerCase() === 'svg') return svgNode;
    return svgNode.ownerSVGElement;
  }
  function getNodeEl() {
    if (node == null) {
      node = initNode();
      // re-add node to DOM
      rootElement.appendChild(node);
    }
    return (0, _d3Selection.select)(node);
  }

  // Private - gets the screen coordinates of a shape
  //
  // Given a shape on the screen, will return an SVGPoint for the directions
  // n(north), s(south), e(east), w(west), ne(northeast), se(southeast),
  // nw(northwest), sw(southwest).
  //
  //    +-+-+
  //    |   |
  //    +   +
  //    |   |
  //    +-+-+
  //
  // Returns an Object {n, s, e, w, nw, sw, ne, se}
  function getScreenBBox(targetShape) {
    var targetel = target || targetShape;
    while (targetel.getScreenCTM == null && targetel.parentNode != null) {
      targetel = targetel.parentNode;
    }
    var bbox = {},
      matrix = targetel.getScreenCTM(),
      tbbox = targetel.getBBox(),
      width = tbbox.width,
      height = tbbox.height,
      x = tbbox.x,
      y = tbbox.y;
    point.x = x;
    point.y = y;
    bbox.nw = point.matrixTransform(matrix);
    point.x += width;
    bbox.ne = point.matrixTransform(matrix);
    point.y += height;
    bbox.se = point.matrixTransform(matrix);
    point.x -= width;
    bbox.sw = point.matrixTransform(matrix);
    point.y -= height / 2;
    bbox.w = point.matrixTransform(matrix);
    point.x += width;
    bbox.e = point.matrixTransform(matrix);
    point.x -= width / 2;
    point.y -= height / 2;
    bbox.n = point.matrixTransform(matrix);
    point.y += height;
    bbox.s = point.matrixTransform(matrix);
    return bbox;
  }

  // Private - replace D3JS 3.X d3.functor() function
  function functor(v) {
    return typeof v === 'function' ? v : function () {
      return v;
    };
  }
  return tip;
}
},{"d3-collection":"S3hn","d3-selection":"n1oy"}],"C6dQ":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = load;
var helper = _interopRequireWildcard(require("./scripts/helper.js"));
var preproc = _interopRequireWildcard(require("./scripts/preprocess.js"));
var viz = _interopRequireWildcard(require("./scripts/heatmap_viz.js"));
var slider = _interopRequireWildcard(require("../components/slider.js"));
var sortBySelect = _interopRequireWildcard(require("../components/sort-by-select.js"));
var _d3Tip = _interopRequireDefault(require("d3-tip"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Loads the video length tab.
 *
 * @param {*} d3 The d3 library
 */
function load(d3) {
  var bounds;
  var svgSize;
  var engagementCategory = 'vues';
  var graphTitleMap = new Map().set('vues', 'The 10 most popular hashtags by average view count').set('likes', 'The 10 most popular hashtags by average like count').set('commentaires', 'The 10 most popular hashtags by average comment count').set('partages', 'The 10 most popular hashtags by average share count');
  var fromToDates = {
    from: new Date(2018, 10, 30),
    to: new Date(2023, 3, 14)
  };
  // eslint-disable-next-line no-unused-vars
  var graphSize;
  var tip = (0, _d3Tip.default)().attr('class', 'd3-tip').html(function (d) {
    return helper.getContents(d, engagementCategory);
  });
  d3.select('.hashtags-heatmap-svg').call(tip);
  var margin = {
    top: 35,
    right: 50,
    bottom: 50,
    left: 70
  };
  d3.csv('./data_source.csv', d3.autoType).then(function (csvData) {
    var g = helper.generateG(margin);
    var data = preproc.regrouperParHashtags(csvData, fromToDates).sort(function (a, b) {
      return b[engagementCategory] - a[engagementCategory];
    }).slice(0, 10);
    slider.append(document.querySelector('#hashtags-controls-time-range'), new Date(2018, 10, 30), new Date(2023, 3, 14), updateSelectedDates);
    sortBySelect.append(document.querySelector('#hashtags-controls-sort-by'), {
      'Average Views': 'vues',
      'Average Likes': 'likes',
      'Average Comments': 'commentaires',
      'Average Shares': 'partages'
    }, updateDomainColumn);
    helper.appendAxes(g);
    setSizing();
    build();

    /**
     *   This function handles the graph's sizing.
     */
    function setSizing() {
      bounds = d3.select('.hashtags-graph').node().getBoundingClientRect();
      svgSize = {
        width: bounds.width,
        height: 500
      };
      graphSize = {
        width: svgSize.width - margin.right - margin.left,
        height: svgSize.height - margin.bottom - margin.top
      };
      helper.setCanvasSize(svgSize.width, svgSize.height);
    }

    /**
     *   This function builds the graph.
     */
    function build() {
      data = preproc.regrouperParHashtags(csvData, fromToDates).sort(function (a, b) {
        return b[engagementCategory] - a[engagementCategory];
      }).slice(0, 10);
      viz.generateGraphTitle(graphTitleMap.get(engagementCategory), graphSize.width);
      viz.generateGraphSubtitle(fromToDates.from, fromToDates.to, graphSize.width);
      viz.appendRects(data, graphSize.width, graphSize.height, engagementCategory, tip);
    }

    /**
     * Updates the plot with the select date range
     *
     * @param {*} fromToDatesParam Object with "from" and "to" properties containing Date objects
     */
    function updateSelectedDates(fromToDatesParam) {
      fromToDates.from = fromToDatesParam.from;
      fromToDates.to = fromToDatesParam.to;
      var g = helper.generateG(margin);
      helper.appendAxes(g);
      setSizing();
      build();
    }

    /**
     * Callback function to update the column used for the x axis
     *
     * @param {*} column The new column to use
     */
    function updateDomainColumn(column) {
      engagementCategory = column;
      var g = helper.generateG(margin);
      helper.appendAxes(g);
      setSizing();
      build();
    }
    window.addEventListener('resize', function () {
      setSizing();
      build();
    });
  });
}
},{"./scripts/helper.js":"O0HB","./scripts/preprocess.js":"FN8K","./scripts/heatmap_viz.js":"cGhw","../components/slider.js":"qFBM","../components/sort-by-select.js":"Pwqr","d3-tip":"L7nD"}],"kFxm":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appendAxes = appendAxes;
exports.generateG = generateG;
exports.generateGLineChart = generateGLineChart;
exports.getContents = getContents;
exports.initButtons = initButtons;
exports.setCanvasSize = setCanvasSize;
exports.setCanvasSizeEvolve = setCanvasSizeEvolve;
/**
 * Generates the SVG element g which will contain the data visualisation.
 *
 * @param {object} margin The desired margins around the graph
 * @returns {*} The d3 Selection for the created g element
 */
function generateG(margin) {
  return d3.select('.video-length-graph').select('svg').append('g').attr('id', 'video-length-graph-g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
}
function generateGLineChart(margin) {
  return d3.select('.video-length-graph-evolve').select('svg').append('g').attr('id', 'video-length-graph-evolve-g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
}

/**
 * Sets the size of the SVG canvas containing the graph.
 *
 * @param {number} width The desired width
 * @param {number} height The desired height
 */
function setCanvasSize(width, height) {
  d3.select('#video-length-heatmap').select('svg').attr('width', width).attr('height', height);
}
function setCanvasSizeEvolve(width, height) {
  d3.select('#video-length-evolve-heatmap').select('svg').attr('width', width).attr('height', height);
}

/**
 * Appends an SVG g element which will contain the axes.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
function appendAxes(g) {
  g.append('g').attr('class', 'x axis');
  g.append('g').attr('class', 'y axis');
}
function initButtons(switchAxis) {
  var buttonDiv = d3.select('.video-viz-container').append('div');
  buttonDiv.append('button').text('likes').on('click', function () {
    return switchAxis('likes');
  });
  buttonDiv.append('button').text('commentaires').on('click', function () {
    return switchAxis('commentaires');
  });
  buttonDiv.append('button').text('partages').on('click', function () {
    return switchAxis('partages');
  });
  buttonDiv.append('button').text('vues').on('click', function () {
    return switchAxis('vues');
  });
}
function getContents(d, engagementCategory) {
  /* TODO : Define and return the tooltip contents including :
      + A title stating the hovered element's group, with:
        
  Font family: Grenze Gotish
  Font size: 24px
  Font weigth: normal+ A bold label for the player name followed
  by the hovered elements's player's name+ A bold label for the player's line count
  followed by the number of lines
  */

  var target = d3.select(d.target);
  return "<div class='tooltip'>\n<span class='tooltiptext'>".concat(target.data()[0].count, " </br>videos</br> posted\n</br>\n</br>\nAverage ").concat(engagementCategory, ": ").concat(Math.round(target.data()[0][engagementCategory]), "\n</span>\n</div>\n\n");
}
},{}],"sIlU":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addTimeBlocks = addTimeBlocks;
exports.aggregateColumns = aggregateColumns;
exports.filterDataByDates = filterDataByDates;
exports.findMax = findMax;
exports.findMin = findMin;
exports.genererTableauEquilibre = genererTableauEquilibre;
exports.getUniqueTimeBlocks = getUniqueTimeBlocks;
exports.normalizeColumn = normalizeColumn;
exports.processDateTime = processDateTime;
exports.regrouperParDuree = regrouperParDuree;
exports.sortByColumns = sortByColumns;
exports.topTenIdealVideo = topTenIdealVideo;
exports.trim = trim;
exports.weightFeatures = weightFeatures;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/**
 * Trims the data to only the wanted columns
 *
 * @param {object[]} data The data to analyze
 * @param {string[]} targets The columns to keep
 * @returns {object[]} The data with only the needed columns
 */
function trim(data, targets) {
  return data.map(function (row) {
    var trimmedRow = {};
    targets.forEach(function (target) {
      trimmedRow[target] = row[target];
    });
    return trimmedRow;
  });
}

/**
 * Aggregates specific columns
 *
 * @param {object[]} data The data to analyze
 * @param {string} targets The columns to aggregate
 * @param {string[]} groupBy The columns to group by when aggregating
 * @returns {object[]} The data with the groupBy columns and the aggregated column
 */
function aggregateColumns(data, targets, groupBy) {
  data = trim(data, targets.concat(groupBy));
  var groupedData = d3.group(data, function (d) {
    return groupBy.map(function (column) {
      return d[column];
    }).join('-');
  });
  var aggregatedData = Array.from(groupedData, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      values = _ref2[1];
    var aggregation = _objectSpread(_objectSpread({}, values[0]), {}, {
      count: values.length
    });
    targets.forEach(function (target) {
      var sum = d3.sum(values, function (d) {
        return d[target];
      });
      var average = sum / values.length;
      aggregation[target] = sum;
      aggregation["".concat(target, "Average")] = Math.floor(average);
    });
    groupBy.forEach(function (column, index) {
      aggregation[column] = key.split('-')[index];
    });
    return aggregation;
  });
  return aggregatedData;
}

/**
 * Sorts the data by specific columns in order
 *
 * @param {object[]} data The data to analyze
 * @param {string[]} sortBy The columns to sort by, priority given to smallest index
 * @param {boolean} isDescending Determines if sort order is ascending or descending
 * @returns {object[]} The sorted data
 */
function sortByColumns(data, sortBy) {
  var isDescending = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var sortedData = _toConsumableArray(data); // Create a copy of the original data to avoid modifying it directly

  sortedData.sort(function (a, b) {
    for (var i = 0; i < sortBy.length; i++) {
      var column = sortBy[i];
      var result = 0;
      if (a[column] < b[column]) result = -1;else if (a[column] > b[column]) result = 1;
      if (isDescending) result = -result; // Reverse the sorting order for descending

      if (result !== 0) return result;
    }
    return 0;
  });
  return sortedData;
}

/**
 * Splits date into date and time and adds day of week
 *
 * @param {object[]} data The data to analyze
 * @returns {object[]} The data with the processed datetime and day of week
 */
function processDateTime(data) {
  var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var processedData = data.map(function (item) {
    var dateTimeParts = item.date.split(' ');
    var date = dateTimeParts[0];
    var time = dateTimeParts[1];
    var dayOfWeekIndex = new Date(date).getDay();
    var dayOfWeek = daysOfWeek[dayOfWeekIndex];
    return _objectSpread(_objectSpread({}, item), {}, {
      date: date,
      time: time,
      dayOfWeek: dayOfWeek
    });
  });
  return processedData;
}

/**
 * Filters the data by only keeping entries within the dates.THIS FUNCTION ASSUMES processDateTime was applied.
 *
 * @param {object[]} data The data
 * @param {string} startDate The start date
 * @param {string} endDate The end date
 * @returns {object[]} The data within the dates
 */
function filterDataByDates(data, startDate, endDate) {
  var filteredData = data.filter(function (obj) {
    var date = obj.date; // Assuming the date column is in the format "yyyy-mm-dd"
    return date >= startDate && date <= endDate;
  });
  return filteredData;
}
/**
 * Adds time block dpending on time of publication
 *
 * @param {object[]} data The data to analyze
 * @param {number} timeBlockLength the length of the time block. Default is 2
 * @returns {object[]} The data with the time block clomun added
 */
function addTimeBlocks(data) {
  var timeBlockLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var processedData = data.map(function (item) {
    var timeParts = item.time.split(':');
    var hour = Number(timeParts[0]);
    var minute = Number(timeParts[1]);

    // Calculate the total minutes from 00:00
    var totalMinutes = hour * 60 + minute;

    // Calculate the time block
    var timeBlockStart = Math.floor(totalMinutes / (timeBlockLength * 60)) * (timeBlockLength * 60);
    var timeBlockEnd = timeBlockStart + timeBlockLength * 60;

    // Format the time block as HH:MM - HH:MM
    var timeBlock = "".concat(String(Math.floor(timeBlockStart / 60)).padStart(2, '0'), ":").concat(String(timeBlockStart % 60).padStart(2, '0'), " to ").concat(String(Math.floor(timeBlockEnd / 60)).padStart(2, '0'), ":").concat(String(timeBlockEnd % 60).padStart(2, '0'));
    return _objectSpread(_objectSpread({}, item), {}, {
      timeBlock: timeBlock
    });
  });
  return processedData;
}

/**
 * Returns a list of unique time blocks (useful to get the domain)
 *
 * @param {object[]} data The data to analyze
 * @returns {string[]} The unique timeBlocks in the data
 */
function getUniqueTimeBlocks(data) {
  var uniqueTimeBlocks = new Set();
  data.forEach(function (item) {
    var timeBlock = item.timeBlock;
    uniqueTimeBlocks.add(timeBlock);
  });
  return Array.from(uniqueTimeBlocks);
}

/**
 * Normalizes a column
 *
 * @param {object[]} data The data to analyze
 * @param {string} targetColumn The column to normalize
 * @returns {object[]} The column with the normalized data
 */
function normalizeColumn(data, targetColumn) {
  var min = Math.min.apply(Math, _toConsumableArray(data.map(function (obj) {
    return obj[targetColumn];
  })));
  var max = Math.max.apply(Math, _toConsumableArray(data.map(function (obj) {
    return obj[targetColumn];
  })));
  data.forEach(function (obj) {
    obj["".concat(targetColumn, "Normalized")] = (obj[targetColumn] - min) / (max - min);
  });
  return data;
}
function weightFeatures(data) {
  var numberOfLikes = 0;
  var numberOfShares = 0;
  var numberOfComments = 0;
  var numberOfViews = 0;
  for (var i = 0; i < data.length; i++) {
    numberOfLikes += data[i].likes;
    numberOfShares += data[i].partages;
    numberOfComments += data[i].commentaires;
    numberOfViews += data[i].vues;
  }
  var numberOfEngagementsData = numberOfLikes + numberOfShares + numberOfComments + numberOfViews;
  return [numberOfLikes / numberOfEngagementsData, numberOfShares / numberOfEngagementsData, numberOfComments / numberOfEngagementsData, numberOfViews / numberOfEngagementsData];
}
function regrouperParDuree(data) {
  var groupes = {};
  data.forEach(function (objet) {
    var duréeSecondes = objet.duréeSecondes;
    var likes = objet.likes;
    var partages = objet.partages;
    var commentaires = objet.commentaires;
    var vues = objet.vues;
    if (groupes[duréeSecondes]) {
      groupes[duréeSecondes].likes += likes;
      groupes[duréeSecondes].partages += partages;
      groupes[duréeSecondes].commentaires += commentaires;
      groupes[duréeSecondes].vues += vues;
      groupes[duréeSecondes].count++;
    } else {
      groupes[duréeSecondes] = {
        duréeSecondes: duréeSecondes,
        likes: likes,
        partages: partages,
        commentaires: commentaires,
        vues: vues,
        count: 1
      };
    }
  });
  var nouveauTableau = Object.values(groupes).map(function (groupe) {
    var moyenneLikes = groupe.likes / groupe.count;
    var moyennePartages = groupe.partages / groupe.count;
    var moyenneCommentaires = groupe.commentaires / groupe.count;
    var moyenneVues = groupe.vues / groupe.count;
    return {
      duréeSecondes: groupe.duréeSecondes,
      likes: moyenneLikes,
      partages: moyennePartages,
      commentaires: moyenneCommentaires,
      vues: moyenneVues
    };
  });
  return nouveauTableau;
}
function topTenIdealVideo(data) {
  var tab = [];
  var init = 0;
  for (var index = 0; index < 25; index++) {
    var temp = {
      intervalle1: init,
      intervalle2: init + 25,
      likes: 0,
      partages: 0,
      commentaires: 0,
      vues: 0,
      count: 0
    };
    init += 25;
    tab.push(temp);
  }

  //const newData = regrouperParDuree(data)

  data.forEach(function (objet) {
    for (var _i2 = 0, _tab = tab; _i2 < _tab.length; _i2++) {
      var el = _tab[_i2];
      if (el.intervalle1 <= objet.duréeSecondes && el.intervalle2 > objet.duréeSecondes) {
        el.likes += objet.likes;
        el.partages += objet.partages;
        el.commentaires += objet.commentaires;
        el.vues += objet.vues;
        el.count++;
      }
    }
  });
  tab.forEach(function (objet) {
    if (objet.count > 0) {
      objet.likes = objet.likes / objet.count;
      objet.partages = objet.partages / objet.count;
      objet.commentaires = objet.commentaires / objet.count;
      objet.vues = objet.vues / objet.count;
    }
  });
  return tab;
}
function findMax(tab) {
  var max = -1;
  tab.forEach(function (objet) {
    if (objet.count > max) {
      max = objet.count;
    }
  });
  return max;
}
function findMin(tab) {
  var min = 10000;
  tab.forEach(function (objet) {
    if (objet.count < min && objet.count != 0) {
      min = objet.count;
    }
  });
  if (min == 10000) {
    min = 0;
  }
  return min;
}
function genererTableauEquilibre(a, b) {
  var n = 6; // Nombre maximum d'éléments dans le tableau
  var difference = b - a;

  // Réduire le nombre d'éléments si la différence entre b et a n'est pas grande
  if (difference < 600) {
    var str = (a / b).toString();
    n = Number(str[0]);
  }
  var longueurIntervalle = difference / (n - 1);
  var tableau = [a]; // Premier élément est a

  if (n > 1) {
    for (var i = 1; i < n - 1; i++) {
      var element = Math.floor(a + i * longueurIntervalle + Math.random() * longueurIntervalle);
      tableau.push(element);
    }
  }
  tableau.push(b); // Dernier élément est b

  return tableau;
}
},{}],"HbWA":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appendRects = appendRects;
exports.appendRectsEvolve = appendRectsEvolve;
exports.generateGraphSubtitle = generateGraphSubtitle;
exports.generateGraphTitle = generateGraphTitle;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/**
 * Sets the domain of the color scale
 *
 * @param {*} colorScale The color scale used in the heatmap
 * @param {object[]} data The data to be displayed
 * @param {string} targetColumn The column to use as domain
 */
// export function setColorScaleDomain (colorScale, data, targetColumn) {
//   const averageViews = data.map((entry) => entry[targetColumn])
//   colorScale.domain(d3.extent(averageViews))
// }

/**
 * For each data element, appends a group 'g' to which an SVG rect is appended
 *
 * @param {object[]} data The data to use for binding
 */
// export function appendRects (data) {
//   // TODO : Append SVG rect elements
//   d3.select('#video-length-graph-g')
//     .selectAll('g.cell')
//     .data(data)
//     .enter()
//     .append('g')
//     .attr('class', 'cell')
//     .append('rect')
// }

/**
 * Updates the domain and range of the scale for the x axis
 *
 * @param {*} xScale The scale for the x axis
 * @param {number} width The width of the diagram
 */
// export function updateXScale (xScale, width) {
//   const daysOfWeekDomain = [
//     'Sunday',
//     'Monday',
//     'Tuesday',
//     'Wednesday',
//     'Thursday',
//     'Friday',
//     'Saturday'
//   ]
//   xScale.domain(daysOfWeekDomain).range([0, width])
// }

/**
 * Updates the domain and range of the scale for the y axis
 *
 * @param {*} yScale The scale for the y axis
 * @param {object[]} timeBlocks The names of the neighborhoods
 * @param {number} height The height of the diagram
 */
// export function updateYScale (yScale, timeBlocks, height) {
//   const sortedTimeBlocks = timeBlocks.sort()
//   yScale.domain(sortedTimeBlocks).range([0, height])
// }

/**
 *  Draws the X axis at the top of the diagram.
 *
 *  @param {*} xScale The scale to use to draw the axis
 */
// export function drawXAxis (xScale) {
//   // TODO : Draw X axis
//   const xAxisGenerator = d3.axisTop().scale(xScale)
//   d3.select('#video-length-graph-g .x').call(xAxisGenerator)
// }

/**
 * Draws the Y axis to the right of the diagram.
 *
 * @param {*} yScale The scale to use to draw the axis
 * @param {number} width The width of the graphic
 */
// export function drawYAxis (yScale, width) {
//   // TODO : Draw Y axis
//   const yAxisGenerator = d3.axisRight().scale(yScale)
//   d3.select('#video-length-graph-g .y')
//     .attr('transform', `translate(${width},0)`)
//     .call(yAxisGenerator)
// }

/**
 * Rotates the ticks on the Y axis 30 degrees towards the left.
 */
// export function rotateYTicks () {
//   // TODO : Rotate Y ticks.
//   d3.selectAll('#video-length-graph-g .y .tick').attr('transform', function () {
//     return d3.select(this).attr('transform') + ` rotate(${-30})`
//   })
// }

/**
 * After the rectangles have been appended, this function dictates
 * their position, size and fill color.
 *
 * @param {*} xScale The x scale used to position the rectangles
 * @param {*} yScale The y scale used to position the rectangles
 * @param {*} colorScale The color scale used to set the rectangles' colors
 * @param {string} targetColumn The column to use as domain
 * @param data
 */

/**
 * @param data
 * @param width
 * @param height
 * @param engagementCategory
 * @param tip
 */
function appendRects(data, width, height, engagementCategory, displayPanel) {
  var darkColor = '#74427c';
  var paleColor = '#e6d7f4';
  var echelleCouleurs = d3.scaleSequential().domain([0, d3.max(data, function (d) {
    return d.count;
  })]).interpolator(d3.interpolate(paleColor, darkColor)); // Utilisation de la palette de couleurs Viridis

  var svg = d3.select('#video-length-graph-g');
  var x = d3.scaleBand().domain(data.map(function (d) {
    return d.intervalle1 + 's - ' + d.intervalle2 + 's';
  })).padding(0.2).range([0, width]);
  d3.select('#video-length-graph-g .x.axis').attr('transform', "translate(0,".concat(height, ")")).call(d3.axisBottom(x)).selectAll('text').attr('transform', 'rotate(-45)').style('text-anchor', 'end');

  // Add Y axis

  var y = d3.scaleLinear().domain([0, d3.max(data, function (d) {
    return d[engagementCategory];
  })]) // Utilisation de d3.max pour obtenir la valeur maximale des étoiles
  .range([height, 0]);
  d3.select('#video-length-graph-g .y.axis').call(d3.axisLeft(y));

  // Create and fill the bars
  svg.selectAll('.bar').remove();
  svg.selectAll('.bar') // Utilisation de la classe ".bar" pour sélectionner les barres
  .data(data).join('rect').attr('class', 'bar') // Ajout de la classe "bar" pour les éléments <rect>
  .attr('x', function (d) {
    return x(d.intervalle1 + 's - ' + d.intervalle2 + 's');
  }).attr('y', function (d) {
    return y(d[engagementCategory]);
  }).attr('width', x.bandwidth()).attr('height', function (d) {
    return height - y(d[engagementCategory]);
  }).attr('fill', function (d) {
    return echelleCouleurs(d.count);
  }).on('click', function (d) {
    displayPanel(d);
  }).on('mouseover', function (d) {
    d3.select(this).attr('filter', 'brightness(40%)');
  }).on('mouseleave', function (d) {
    d3.select(this).attr('filter', 'brightness(100%)');
  });
}

/**
 * @param data
 * @param width
 * @param height
 * @param engagementCategory
 */
function appendRectsEvolve(data, width, height, engagementCategory) {
  var svg = d3.select('#video-length-graph-evolve-g');

  // Add Y axis

  // Regroupement des données par année
  var dataByYear = d3.group(data, function (d) {
    return d.date.toString().split('-')[0];
  });

  // Recherche de la vidéo avec le plus de vues par année
  var videosByYear = Array.from(dataByYear, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      year = _ref2[0],
      videos = _ref2[1];
    var maxViewsVideo = d3.max(videos, function (d) {
      return d[engagementCategory];
    });
    return {
      year: +year,
      maxViews: maxViewsVideo
    };
  });
  var x = d3.scaleLinear().domain(d3.extent(videosByYear, function (d) {
    return d.year;
  })).range([0, width]);
  d3.select('#video-length-graph-evolve-g .x.axis').attr('transform', "translate(0,".concat(height, ")")).call(d3.axisBottom(x).tickValues([2018, 2019, 2020, 2021, 2022, 2023])).selectAll('text').attr('transform', 'rotate(-45)').style('text-anchor', 'end');

  // Création de l'échelle en y
  var y = d3.scaleLinear().domain([0, d3.max(videosByYear, function (d) {
    return d.maxViews;
  })]).range([height, 0]);
  d3.select('#video-length-graph-evolve-g .y.axis').call(d3.axisLeft(y));
  var line = d3.line().x(function (d) {
    return x(d.year);
  }).y(function (d) {
    return y(d.maxViews);
  });
  d3.selectAll('.video-line-chart-line').remove();
  svg.append('path').attr('class', 'video-line-chart-line').datum(videosByYear).attr('fill', 'none').attr('stroke', 'steelblue').attr('stroke-width', 2).attr('d', line);
}

/**
 * Generates the subtitle for the visualization.
 *
 * @param {Date} minDate The minimum displayed date
 * @param {Date} maxDate The maximum displayed date
 * @param {number} width The width of the g element containing the visualization
 */
function generateGraphSubtitle(minDate, maxDate, width) {
  var svg = d3.select('#video-length-graph-g');
  var formattedMinDate = minDate.toLocaleDateString('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  var formattedMaxDate = maxDate.toLocaleDateString('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  var subtitle = d3.select('#video-length .video-length-subtitle');
  if (subtitle.node()) {
    subtitle.attr('x', width / 2).text("From ".concat(formattedMinDate, " to ").concat(formattedMaxDate));
  } else {
    svg.append('text').attr('class', 'video-length-subtitle').attr('x', width / 2).attr('y', -10).attr('text-anchor', 'middle').attr('fill', '#a4a4a4').style('font-size', '14px').text("From ".concat(formattedMinDate, " to ").concat(formattedMaxDate));
  }
}

/**
 * Generates the title of the visualization.
 *
 * @param {string} title The title of the visualization
 * @param {number} width The width of the g element containing the visualization
 */
function generateGraphTitle(title, width) {
  var svg = d3.select('#video-length-graph-g');
  var graphTitle = d3.select('#video-length .video-length-title');
  if (graphTitle.node()) {
    // update title if it already exists
    graphTitle.attr('x', width / 2).text(title);
  } else {
    svg.append('text').attr('class', 'video-length-title').attr('x', width / 2).attr('y', -40).attr('text-anchor', 'middle').attr('fill', '#fff').style('font-size', '20px').style('font-weight', 'bold').text(title);
  }
}
},{}],"KnAd":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.draw = draw;
exports.initGradient = initGradient;
exports.initLegendAxis = initLegendAxis;
exports.initLegendBar = initLegendBar;
exports.update = update;
/**
 * Initializes the definition for the gradient to use with the
 * given colorScale.
 *
 * @param {*} colorScale The color scale to use
 */
function initGradient(colorScale) {
  var svg = d3.select('.video-length-heatmap-svg');
  var defs = svg.append('defs');
  var linearGradient = defs.append('linearGradient').attr('id', 'video-length-gradient').attr('x1', 0).attr('y1', 1).attr('x2', 0).attr('y2', 0);
  linearGradient.selectAll('stop').data(colorScale.ticks().map(function (tick, i, nodes) {
    return {
      offset: "".concat(100 * (i / nodes.length), "%"),
      color: colorScale(tick)
    };
  })).join('stop').attr('offset', function (d) {
    return d.offset;
  }).attr('stop-color', function (d) {
    return d.color;
  });
}

/**
 * Initializes the SVG rectangle for the legend.
 */
function initLegendBar() {
  var svg = d3.select('.video-length-heatmap-svg');
  svg.append('rect').attr('class', 'legend bar');
}

/**
 *  Initializes the group for the legend's axis.
 */
function initLegendAxis() {
  var svg = d3.select('.video-length-heatmap-svg');
  svg.append('g').attr('class', 'legend axis');
  svg.append('g').attr('class', 'legend title');
}

/**
 * Draws the legend to the left of the graphic.
 *
 * @param {number} x The x position of the legend
 * @param {number} y The y position of the legend
 * @param {number} height The height of the legend
 * @param {number} width The width of the legend
 * @param {string} fill The fill of the legend
 * @param {*} colorScale The color scale represented by the legend
 */
function draw(x, y, height, width, fill, colorScale, tableau) {
  d3.select('.video-length-heatmap-svg .legend.axis').selectAll('text').remove();
  d3.select('.video-length-heatmap-svg .legend.title').selectAll('text').remove();
  d3.select('.video-length-heatmap-svg .legend.title').append('text').style('font', '12px sans-serif').style('fill', '#ccc').attr('transform', "translate(".concat(x - 25, ",").concat(y - 30, ")")).text('videos count');
  d3.select('.video-length-heatmap-svg .legend.bar').attr('x', x).attr('y', y - 5).attr('width', width).attr('height', height).attr('fill', fill);
  var ticks = tableau;
  d3.select('.video-length-heatmap-svg .legend.axis').selectAll('text').data(ticks).enter().append('text').style('font', '10px sans-serif').style('fill', '#ccc').attr('transform', "translate(".concat(x - 10, ",0)")).attr('text-anchor', 'end').attr('y', function (d, i) {
    return (ticks.length - 1 - i) * (height / (ticks.length - 1)) + y;
  }).text(function (d, i) {
    return d;
  });
}
/**
 * Updates the legend
 *
 * @param {number} x The x position of the legend
 * @param {number} y The y position of the legend
 * @param {number} height The height of the legend
 * @param {*} colorScale The color scale represented by the legend
 */
function update(x, y, height, colorScale) {
  var ticks = colorScale.ticks();

  // Remove existing ticks
  d3.select('.video-length-heatmap-svg .legend.axis').selectAll('text').remove();

  // Append new ticks
  d3.select('.video-length-heatmap-svg .legend.axis').selectAll('text').data(ticks).enter().append('text').style('font', '10px sans-serif').style('fill', '#ccc').attr('x', function (d, i) {
    return x - 10;
  }).attr('text-anchor', 'end').attr('y', function (d, i) {
    return (ticks.length - 1 - i) * (height / (ticks.length - 1)) + y;
  }).text(function (d, i) {
    if (i % 2 === 0) {
      if (d >= 1000) return Math.floor(d / 1000) + ',' + (d % 1000).toString().padStart(3, '0');
      return d;
    }
  });
}
},{}],"RD4j":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rectSelected = rectSelected;
exports.rectUnselected = rectUnselected;
exports.selectTicks = selectTicks;
exports.setRectHandler = setRectHandler;
exports.unselectTicks = unselectTicks;
/**
 * Sets up an event handler for when the mouse enters and leaves the squares
 * in the heatmap. When the square is hovered, it enters the "selected" state.
 *
 * The tick labels for the year and neighborhood corresponding to the square appear
 * in bold.
 *
 * @param {*} xScale The xScale to be used when placing the text in the square
 * @param {*} yScale The yScale to be used when placing the text in the square
 * @param {Function} rectSelected The function to call to set the mode to "selected" on the square
 * @param {Function} rectUnselected The function to call to remove "selected" mode from the square
 * @param {Function} selectTicks The function to call to set the mode to "selected" on the ticks
 * @param {Function} unselectTicks The function to call to remove "selected" mode from the ticks
 */
function setRectHandler(xScale, yScale, rectSelected, rectUnselected, selectTicks, unselectTicks) {
  // TODO : Select the squares and set their event handlers
}

/**
 * The function to be called when one or many rectangles are in "selected" state,
 * meaning they are being hovered
 *
 * The text representing the number of trees associated to the rectangle
 * is displayed in the center of the rectangle and their opacity is lowered to 75%.
 *
 * @param {*} element The selection of rectangles in "selected" state
 * @param {*} xScale The xScale to be used when placing the text in the square
 * @param {*} yScale The yScale to be used when placing the text in the square
 */
function rectSelected(element, xScale, yScale) {
  // TODO : Display the number of trees on the selected element
  // Make sure the nimber is centered. If there are 1000 or more
  // trees, display the text in white so it contrasts with the background.
}

/**
 * The function to be called when the rectangle or group
 * of rectangles is no longer in "selected state".
 *
 * The text indicating the number of trees is removed and
 * the opacity returns to 100%.
 *
 * @param {*} element The selection of rectangles in "selected" state
 */
function rectUnselected(element) {
  // TODO : Unselect the element
}

/**
 * Makes the font weight of the ticks texts with the given name and year bold.
 *
 * @param {string} name The name of the neighborhood associated with the tick text to make bold
 * @param {number} year The year associated with the tick text to make bold
 */
function selectTicks(name, year) {
  // TODO : Make the ticks bold
}

/**
 * Returns the font weight of all ticks to normal.
 */
function unselectTicks() {
  // TODO : Unselect the ticks
}
},{}],"nDGy":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayPanel = displayPanel;
/**
 * Displays the information panel when a data point is clicked.
 *
 * @param {object} d The data bound to the clicked marker
 */
function displayPanel(d) {
  var panel = d3.select("#video-panel").style("visibility", "visible");
  var data = d.target.__data__;
  panel.selectAll("*").remove();

  // Title
  panel.append("div").style("font-family", "Roboto").style("font-size", "18px").style("font-weight", "bold").style("padding-top", "25px").text("".concat(data.intervalle1, "s to ").concat(data.intervalle2, "s"));

  // Number of videos
  panel.append("div").style("font-family", "Roboto").style("font-size", "16px").style("padding-top", "25px").text("Number of videos: ".concat(Math.round(data.count)));

  // Number of views
  panel.append("div").style("font-family", "Roboto").style("font-size", "16px").style("padding-top", "25px").text("Total Views: ".concat(Math.round(data.vues)));

  // Average views
  panel.append("div").style("font-family", "Roboto").style("font-size", "16px").style("padding-top", "3px").text("Total likes: ".concat(Math.round(data.likes)));

  // Average likes
  panel.append("div").style("font-family", "Roboto").style("font-size", "16px").style("padding-top", "3px").text("Total comments: ".concat(Math.round(data.commentaires)));

  // Average comments
  panel.append("div").style("font-family", "Roboto").style("font-size", "16px").style("padding-top", "3px").text("Total shares: ".concat(Math.round(data.partages)));
}
},{}],"Dmqc":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = load;
var helper = _interopRequireWildcard(require("./scripts/helper.js"));
var preproc = _interopRequireWildcard(require("./scripts/preprocess.js"));
var viz = _interopRequireWildcard(require("./scripts/heatmap_viz.js"));
var legend = _interopRequireWildcard(require("./scripts/legend.js"));
var hover = _interopRequireWildcard(require("./scripts/hover.js"));
var slider = _interopRequireWildcard(require("../components/slider.js"));
var sortBySelect = _interopRequireWildcard(require("../components/sort-by-select.js"));
var addons = _interopRequireWildcard(require("./scripts/viz-addons.js"));
var d3Chromatic = _interopRequireWildcard(require("d3-scale-chromatic"));
var _d3Tip = _interopRequireDefault(require("d3-tip"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Loads the video length tab.
 *
 * @param {*} d3 The d3 library
 */

function load(d3) {
  var bounds;
  var svgSize;
  var engagementCategory;
  // eslint-disable-next-line no-unused-vars
  var graphSize;
  var graphTitleMap = new Map().set('vues', 'Average view count per video length').set('likes', 'Average like count per video length').set('commentaires', 'Average comment count per video length').set('partages', 'Average share count per video length');
  var fromToDates = {
    from: new Date(2018, 10, 30),
    to: new Date(2023, 3, 14)
  };
  var colorScale = d3.scaleSequential(d3.interpolateBuPu).domain([0, 1]); // Define the domain of the scale

  var darkColor = '#74427c';
  var paleColor = '#e6d7f4';
  var customInterpolator = function customInterpolator(t) {
    return d3.interpolate(paleColor, darkColor)(t);
  };
  colorScale.interpolator(customInterpolator);
  var tip = (0, _d3Tip.default)().attr('class', 'd3-tip').html(function (d) {
    return helper.getContents(d, engagementCategory);
  });
  d3.select('.video-length-heatmap-svg').call(tip);
  var margin = {
    top: 75,
    right: 200,
    bottom: 50,
    left: 50
  };
  // TODO: Use this file for welcom vizs

  d3.csv('./data_source.csv', d3.autoType).then(function (data) {
    var rawData = data;
    var dataVideoLengthCategory = preproc.topTenIdealVideo(data);
    var max = preproc.findMax(dataVideoLengthCategory);
    var min = preproc.findMin(dataVideoLengthCategory);
    slider.append(document.querySelector("#video-controls-time-range"), new Date(2018, 10, 30), new Date(2023, 3, 14), updateSelectedDates);
    sortBySelect.append(document.querySelector("#video-controls-sort-by"), {
      "Average Views": "vues",
      "Average Likes": "likes",
      "Average Comments": "commentaires",
      "Average Shares": "partages"
    }, updateDomainColumn);
    var dataFromTo = rawData;
    engagementCategory = 'vues';
    legend.initGradient(colorScale);
    legend.initLegendBar();
    legend.initLegendAxis();
    var g = helper.generateG(margin);

    //const gEvolve = helper.generateGLineChart(margin)

    //helper.appendAxes(gEvolve)

    helper.appendAxes(g);

    //helper.initButtons(switchAxis)

    setSizing();
    //setSizingEvolve()

    build();

    /**
     *   This function handles the graph's sizing.
     */
    function setSizing() {
      bounds = d3.select('.video-length-graph').node().getBoundingClientRect();
      svgSize = {
        width: bounds.width,
        height: 500
      };
      graphSize = {
        width: svgSize.width - margin.right - margin.left,
        height: svgSize.height - margin.bottom - margin.top
      };
      helper.setCanvasSize(svgSize.width, svgSize.height);
    }

    // function setSizingEvolve () {
    //   bounds = d3
    //     .select('.video-length-graph-evolve')
    //     .node()
    //     .getBoundingClientRect()

    //   svgSize = {
    //     width: bounds.width,
    //     height: 500
    //   }

    //   graphSize = {
    //     width: svgSize.width - margin.right - margin.left,
    //     height: svgSize.height - margin.bottom - margin.top
    //   }

    //   helper.setCanvasSizeEvolve(svgSize.width, svgSize.height)
    // }

    // function switchAxis (category) {
    //   engagementCategory = category
    //   const g = helper.generateG(margin)

    //   helper.appendAxes(g)
    //   // helper.initButtons()

    //   setSizing()
    //   viz.appendRects(dataVideoLengthCategory, graphSize.width, graphSize.height, engagementCategory, tip)
    //   //build()
    // }

    /**
     * Callback function to update the column used for the x axis
     *
     * @param {*} column The new column to use
     */
    function updateDomainColumn(column) {
      engagementCategory = column;
      build();
    }

    /**
     * Updates the plot with the selected media
     *
     * @param {string[]} mediaList The selected media
     */
    function updateSelectedMedia(mediaList) {
      selectedMediaList = mediaList;
      build();
    }

    /**
     * Updates the plot with the select date range
     *
     * @param {*} fromToDates Object with "from" and "to" properties containing Date objects
     */
    function updateSelectedDates(fromToDatesParam) {
      dataFromTo = rawData;
      fromToDates.from = fromToDatesParam.from;
      fromToDates.to = fromToDatesParam.to;
      dataFromTo = dataFromTo.filter(function (row) {
        return new Date(row.date).getTime() >= fromToDates.from.getTime() && new Date(row.date).getTime() <= fromToDates.to.getTime();
      });
      dataVideoLengthCategory = preproc.topTenIdealVideo(dataFromTo);
      max = preproc.findMax(dataVideoLengthCategory);
      min = preproc.findMin(dataVideoLengthCategory);
      build();
    }

    /**
     *   This function builds the graph.
     */
    function build() {
      viz.appendRects(dataVideoLengthCategory, graphSize.width, graphSize.height, engagementCategory, addons.displayPanel);
      viz.generateGraphTitle(graphTitleMap.get(engagementCategory), graphSize.width);
      viz.generateGraphSubtitle(fromToDates.from, fromToDates.to, graphSize.width);

      // Draw the updated legend
      legend.draw(svgSize.width - 90, margin.top + 5, graphSize.height - 10, 15, 'url(#video-length-gradient)', colorScale, preproc.genererTableauEquilibre(min, max));
      //viz.appendRectsEvolve(data, graphSize.width, graphSize.height, engagementCategory)
    }

    window.addEventListener('resize', function () {
      setSizing();
      //setSizingEvolve()
      build();
    });
  });
}
},{"./scripts/helper.js":"kFxm","./scripts/preprocess.js":"sIlU","./scripts/heatmap_viz.js":"HbWA","./scripts/legend.js":"KnAd","./scripts/hover.js":"RD4j","../components/slider.js":"qFBM","../components/sort-by-select.js":"Pwqr","./scripts/viz-addons.js":"nDGy","d3-scale-chromatic":"ado2","d3-tip":"L7nD"}],"jbTG":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addTimeBlocks = addTimeBlocks;
exports.aggregateColumns = aggregateColumns;
exports.filterDataByDates = filterDataByDates;
exports.filterOutRowsByValue = filterOutRowsByValue;
exports.getUniqueTimeBlocks = getUniqueTimeBlocks;
exports.normalizeColumn = normalizeColumn;
exports.processDateTime = processDateTime;
exports.sortByColumns = sortByColumns;
exports.trim = trim;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/**
 * Removes rows from the data if the value of the specified column matches the regular expression
 *
 * @param {object[]} data The data to from which rows need to be filtered
 * @param {string} column The column from which values will be matched
 * @param {RegExp} regex The regular expression to match
 * @returns {object[]} The data with matched rows filtered out
 */
function filterOutRowsByValue(data, column, regex) {
  return data.filter(function (row) {
    return String(row[column]).search(regex) === -1;
  });
}

/**
 * Trims the data to only the wanted columns
 *
 * @param {object[]} data The data to analyze
 * @param {string[]} targets The columns to keep
 * @returns {object[]} The data with only the needed columns
 */
function trim(data, targets) {
  return data.map(function (row) {
    var trimmedRow = {};
    targets.forEach(function (target) {
      trimmedRow[target] = row[target];
    });
    return trimmedRow;
  });
}

/**
 * Aggregates specific columns
 *
 * @param {object[]} data The data to analyze
 * @param {string[]} sumCols The columns to aggregate into a sum
 * @param {string[]} listCols The columns to aggregate into a list
 * @param {string[]} groupBy The columns to group by when aggregating
 * @returns {object[]} The data with the groupBy columns and the aggregated column
 */
function aggregateColumns(data, sumCols, listCols, groupBy) {
  data = trim(data, sumCols.concat(groupBy).concat(listCols));
  var groupedData = d3.group(data, function (d) {
    return groupBy.map(function (column) {
      return d[column];
    }).join('-');
  });
  var aggregatedData = Array.from(groupedData, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      values = _ref2[1];
    var aggregation = _objectSpread(_objectSpread({}, values[0]), {}, {
      count: values.length
    });
    sumCols.forEach(function (target) {
      var sum = d3.sum(values, function (d) {
        return d[target];
      });
      var average = sum / values.length;
      aggregation[target] = sum;
      aggregation["".concat(target, "Average")] = Math.floor(average);
    });
    listCols.forEach(function (column) {
      aggregation["".concat(column, "List")] = Array.from(new Set(values.map(function (value) {
        return value[column];
      })));
    });
    groupBy.forEach(function (column, index) {
      aggregation[column] = key.split('-')[index];
    });
    return aggregation;
  });
  return aggregatedData;
}

/**
 * Sorts the data by specific columns in order
 *
 * @param {object[]} data The data to analyze
 * @param {string[]} sortBy The columns to sort by, priority given to smallest index
 * @param {boolean} isDescending Determines if sort order is ascending or descending
 * @returns {object[]} The sorted data
 */
function sortByColumns(data, sortBy) {
  var isDescending = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var sortedData = _toConsumableArray(data); // Create a copy of the original data to avoid modifying it directly

  sortedData.sort(function (a, b) {
    for (var i = 0; i < sortBy.length; i++) {
      var column = sortBy[i];
      var result = 0;
      if (a[column] < b[column]) result = -1;else if (a[column] > b[column]) result = 1;
      if (isDescending) result = -result; // Reverse the sorting order for descending

      if (result !== 0) return result;
    }
    return 0;
  });
  return sortedData;
}

/**
 * Splits date into date and time and adds day of week
 *
 * @param {object[]} data The data to analyze
 * @returns {object[]} The data with the processed datetime and day of week
 */
function processDateTime(data) {
  var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var processedData = data.map(function (item) {
    var dateTimeParts = item.date.split(' ');
    var date = dateTimeParts[0];
    var time = dateTimeParts[1];
    var dayOfWeekIndex = new Date(date).getDay();
    var dayOfWeek = daysOfWeek[dayOfWeekIndex];
    return _objectSpread(_objectSpread({}, item), {}, {
      date: date,
      time: time,
      dayOfWeek: dayOfWeek
    });
  });
  return processedData;
}

/**
 * Filters the data by only keeping entries within the dates.THIS FUNCTION ASSUMES processDateTime was applied.
 *
 * @param {object[]} data The data
 * @param {string} startDate The start date
 * @param {string} endDate The end date
 * @returns {object[]} The data within the dates
 */
function filterDataByDates(data, startDate, endDate) {
  var filteredData = data.filter(function (obj) {
    var date = obj.date; // Assuming the date column is in the format "yyyy-mm-dd"
    return date >= startDate && date <= endDate;
  });
  return filteredData;
}

/**
 * Adds time block dpending on time of publication
 *
 * @param {object[]} data The data to analyze
 * @param {number} timeBlockLength the length of the time block. Default is 2
 * @returns {object[]} The data with the time block clomun added
 */
function addTimeBlocks(data) {
  var timeBlockLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var processedData = data.map(function (item) {
    var timeParts = item.time.split(':');
    var hour = Number(timeParts[0]);
    var minute = Number(timeParts[1]);

    // Calculate the total minutes from 00:00
    var totalMinutes = hour * 60 + minute;

    // Calculate the time block
    var timeBlockStart = Math.floor(totalMinutes / (timeBlockLength * 60)) * (timeBlockLength * 60);
    var timeBlockEnd = timeBlockStart + timeBlockLength * 60;

    // Format the time block as HH:MM - HH:MM
    var timeBlock = "".concat(String(Math.floor(timeBlockStart / 60)).padStart(2, '0'), ":").concat(String(timeBlockStart % 60).padStart(2, '0'), " to ").concat(String(Math.floor(timeBlockEnd / 60)).padStart(2, '0'), ":").concat(String(timeBlockEnd % 60).padStart(2, '0'));
    return _objectSpread(_objectSpread({}, item), {}, {
      timeBlock: timeBlock
    });
  });
  return processedData;
}

/**
 * Returns a list of unique time blocks (useful to get the domain)
 *
 * @param {object[]} data The data to analyze
 * @returns {string[]} The unique timeBlocks in the data
 */
function getUniqueTimeBlocks(data) {
  var uniqueTimeBlocks = new Set();
  data.forEach(function (item) {
    var timeBlock = item.timeBlock;
    uniqueTimeBlocks.add(timeBlock);
  });
  return Array.from(uniqueTimeBlocks);
}

/**
 * Normalizes a column
 *
 * @param {object[]} data The data to analyze
 * @param {string} targetColumn The column to normalize
 * @returns {object[]} The column with the normalized data
 */
function normalizeColumn(data, targetColumn) {
  var min = Math.min.apply(Math, _toConsumableArray(data.map(function (obj) {
    return obj[targetColumn];
  })));
  var max = Math.max.apply(Math, _toConsumableArray(data.map(function (obj) {
    return obj[targetColumn];
  })));
  data.forEach(function (obj) {
    obj["".concat(targetColumn, "Normalized")] = (obj[targetColumn] - min) / (max - min);
  });
  return data;
}
},{}],"IT4S":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addCoordinatesToData = addCoordinatesToData;
exports.appendAxis = appendAxis;
exports.appendGraphLabel = appendGraphLabel;
exports.appendPointG = appendPointG;
exports.drawXAxis = drawXAxis;
exports.generateG = generateG;
exports.generateGraphSubtitle = generateGraphSubtitle;
exports.generateGraphTitle = generateGraphTitle;
exports.getSimulation = getSimulation;
exports.setCanvasSize = setCanvasSize;
exports.setRadiusScale = setRadiusScale;
exports.setXScale = setXScale;
exports.updateCircles = updateCircles;
exports.updateXCoordinateInData = updateXCoordinateInData;
/**
 * Sets the size of the SVG canvas containing the graph.
 *
 * @param {number} width The desired width
 * @param {number} height The desired height
 */
function setCanvasSize(width, height) {
  d3.select('#songs-beeswarm-plot').select('svg').attr('width', width).attr('height', height);
}

/**
 * Generates the SVG element g which will contain the data visualisation.
 *
 * @param {object} margin The desired margins around the graph
 * @returns {*} The d3 Selection for the created g element
 */
function generateG(margin) {
  return d3.select('#songs-beeswarm-plot').select('svg').append('g').attr('id', 'songs-graph-g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
}

/**
 * Generates the title of the visualization.
 *
 * @param {string} title The title of the visualization
 * @param {number} width The width of the g element containing the visualization
 */
function generateGraphTitle(title, width) {
  var svg = d3.select('#songs-graph-g');
  var graphTitle = d3.select('#songs .songs-title');
  if (graphTitle.node()) {
    // update title if it already exists
    graphTitle.attr('x', width / 2).text(title);
  } else {
    svg.append('text').attr('class', 'songs-title').attr('x', width / 2).attr('text-anchor', 'middle').attr('fill', '#fff').style('font-size', '20px').style('font-weight', 'bold').text(title);
  }
}

/**
 * Generates the subtitle for the visualization.
 *
 * @param {Date} minDate The minimum displayed date
 * @param {Date} maxDate The maximum displayed date
 * @param {number} width The width of the g element containing the visualization
 */
function generateGraphSubtitle(minDate, maxDate, width) {
  var svg = d3.select('#songs-graph-g');
  var formattedMinDate = minDate.toLocaleDateString('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  var formattedMaxDate = maxDate.toLocaleDateString('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  var subtitle = d3.select('#songs .songs-subtitle');
  if (subtitle.node()) {
    subtitle.attr('x', width / 2).text("From ".concat(formattedMinDate, " to ").concat(formattedMaxDate));
  } else {
    svg.append('text').attr('class', 'songs-subtitle').attr('x', width / 2).attr('y', 30).attr('text-anchor', 'middle').attr('fill', '#a4a4a4').style('font-size', '14px').text("From ".concat(formattedMinDate, " to ").concat(formattedMaxDate));
  }
}

/**
 * Appends an SVG g element which will contain the data points.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
function appendPointG(g) {
  g.append('g').attr('class', 'points');
}

/**
 * Appends an SVG g element which will contain the axes.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
function appendAxis(g) {
  g.append('g').attr('class', 'x axis');
}

/**
 * Appends the label for the the x axis.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
function appendGraphLabel(g) {
  g.append('text').attr('class', 'x axis-text').attr('font-size', 12);
}

/**
 * Adds the appropriate x and y coordinates to each row of data
 *
 * @param {object[]} data The data to which coordinates must be bound
 * @param {*} xScale The scale to be used for the x coordinate
 * @param {number} yPosition The fixed y position for each data point
 * @param {string} domainColumn The column used to determine the domain of the scale
 */
function addCoordinatesToData(data, xScale, yPosition, domainColumn) {
  data.forEach(function (song) {
    var xPosition = xScale(song[domainColumn]);
    song.x = xPosition;
    song.y = yPosition;
  });
}

/**
 * Updates the x coordinate for each row of data
 *
 * @param {object[]} data The data to which coordinates must be bound
 * @param {*} xScale The scale to be used for the x coordinate
 * @param {string} domainColumn The column used to determine the domain of the scale
 */
function updateXCoordinateInData(data, xScale, domainColumn) {
  data.forEach(function (song) {
    var xPosition = xScale(song[domainColumn]);
    song.x = xPosition;
  });
}

/**
 * Defines the log scale used to position the center of the circles in X.
 *
 * @param {number} width The width of the graph
 * @param {object[]} data The data to be used
 * @param {string} domainColumn The column used to determine the domain of the scale
 * @returns {*} The logarithmic scale in X
 */
function setXScale(width, data, domainColumn) {
  var min = d3.min(Object.values(data), function (song) {
    return song[domainColumn];
  });
  var max = d3.max(Object.values(data), function (song) {
    return song[domainColumn];
  });

  // domain must be set manually for symlog since nice() does not extend the domain to nice values
  var scale = min === 0 ? d3.scaleSymlog().domain([0, 30000]) : d3.scaleLog().domain([min, max]);
  return scale.range([0, width]).nice();
}

/**
 * Defines the scale to use for the data points' radius.
 *
 * The area of the circle is proportional to the number of videos, which means that the
 * radius is proportional to the square root of the number of videos.
 *
 * @param {object} data The data to be displayed
 * @param {number} factor A factor to use for rescaling the circles
 * @returns {*} The square root scale used to determine the radius
 */
function setRadiusScale(data, factor) {
  var minCount = d3.min(Object.values(data), function (song) {
    return song.count;
  });
  var maxCount = d3.max(Object.values(data), function (song) {
    return song.count;
  });
  return d3.scalePow().exponent(0.5).domain([minCount, maxCount]).range([4 * factor, 10 * factor]);
}

/**
 * Initializes the simulation used to place the circles
 *
 * @param {object[]} data The data to be displayed
 * @param {*} xScale The scale to be used for the x coordinate
 * @param {number} yPosition The fixed y position for each data point
 * @param {string} domainColumn The column used to determine the domain of the scale
 * @param {*} radiusScale The scale used to calculate the radius of each point
 * @returns {*} The generated simulation
 */
function getSimulation(data, xScale, yPosition, domainColumn, radiusScale) {
  return d3.forceSimulation(data).force('collision', d3.forceCollide().strength(1).radius(function (d) {
    return radiusScale(d.count);
  }) // change this based on the radius of each circle
  ).force('x', d3.forceX(function (d) {
    return xScale(d[domainColumn]);
  }).strength(0) // proximity of points to their true x value
  ).force('y', d3.forceY(yPosition).strength(0.02) // proximity of points to the center y value
  );
}

/**
 * Draws the X axis at the bottom of the diagram.
 *
 * @param {*} xScale The scale to use to draw the axis
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 * @param {string} title The title for the x axis
 */
function drawXAxis(xScale, width, height, title) {
  var xAxisGenerator;
  if (isNaN(xScale(0))) {
    // check if xScale is a symlog scale, necessary since the default axis ticks are poorly formatted
    xAxisGenerator = d3.axisBottom(xScale).tickArguments([7, '~s']);
  } else {
    xAxisGenerator = d3.axisBottom(xScale).tickValues(d3.range(0, 4) // manually set tick values for symlog scale
    .reduce(function (acc, val) {
      return acc.concat(d3.range(Math.pow(10, val), Math.pow(10, val + 1), Math.pow(10, val)));
    }, [0]).concat([10000, 20000, 30000]));
  }
  d3.select('#songs-graph-g .x.axis').attr('transform', 'translate( 0, ' + height + ')').style('color', '#C7C7C7').call(xAxisGenerator);
  d3.select('#songs-graph-g .x.axis-text').attr('x', width / 2).attr('y', height + 30).text("".concat(title)).style('fill', '#C7C7C7');
  d3.select('#songs-graph-g .x.axis').selectAll('.tick line').attr('y1', -4);
  if (!isNaN(xScale(0))) {
    // remove minor tick labels for symlog scale
    d3.selectAll('#songs-graph-g .tick text').style('opacity', function (d) {
      return d === 0 || d3.range(0, 5).includes(Math.log10(d)) || d === 30000 ? 1 : 0;
    });
  }
}

/**
 * After the circles have been appended, this repositions and resizes them.
 *
 * @param {object[]} data The data to be displayed
 * @param {*} simulation The force simulation used for the points
 * @param {*} radiusScale The scale used to calculate the radius of each point
 * @param {Function} displayPanel The function that displays the panel when a circle is clicked
 */
function updateCircles(data, simulation, radiusScale, displayPanel) {
  d3.select('#songs-graph-g .points').selectAll('circle').data(data).join('circle').attr('fill', '#533458').attr('stroke', '#292929').attr('r', function (d) {
    return radiusScale(d.count);
  }).on('mouseover', function () {
    var element = d3.select(this);
    element.transition().duration(150) // Set the duration of the transition in milliseconds
    .attr('r', function (d) {
      return radiusScale(d.count) * 1.5;
    });
    element.node().parentElement.append(this);
  }).on('mouseout', function () {
    var element = d3.select(this);
    element.transition().duration(200).attr('r', function (d) {
      return radiusScale(d.count);
    });
  }).on('click', function (event, d) {
    d3.select('#songs-graph-g .points .selected').classed('selected', false);
    d3.select(event.target).classed('selected', true);
    displayPanel(d);
  });
  simulation.on('tick', function () {
    d3.select('#songs-graph-g .points').selectAll('circle').attr('cx', function (d) {
      return d.x;
    }).attr('cy', function (d) {
      return d.y;
    });
  });
}
},{}],"AmQo":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayPanel = displayPanel;
exports.initDropdown = initDropdown;
exports.initPanelDiv = initPanelDiv;
exports.initSlider = initSlider;
/**
 * Intialises the domain column selection dropdown in the control panel.
 *
 * @param {*} dropdown The dropdown to append
 * @param {Function} updateDomainColumn The callback function to call when a selection is made in the dropdown
 */
function initDropdown(dropdown, updateDomainColumn) {
  d3.select('#songs-control .songs-dropdown').append('div').attr('class', 'songs-dropdown-title').text('Sort by');
  dropdown.append(document.querySelector('#songs-control .songs-dropdown'), {
    'Average Views': 'vuesAverage',
    'Average Likes': 'likesAverage',
    'Average Comments': 'commentairesAverage',
    'Average Shares': 'partagesAverage'
  }, updateDomainColumn);
}

/**
 * Initializes the time range slider in the control panel.
 *
 * @param {*} slider The slider to append
 * @param {Date} minDate The minimum date
 * @param {Date} maxDate The maximum date
 * @param {Function} updateTimeRange The callback function to call when the time range is updated
 */
function initSlider(slider, minDate, maxDate, updateTimeRange) {
  d3.select('#songs-control .songs-slider').append('div').attr('class', 'songs-slider-title').text('Time range');
  slider.append(document.querySelector('#songs-control .songs-slider'), minDate, maxDate, updateTimeRange);
}

/**
 * Initializes the empty tooltip.
 */
function initPanelDiv() {
  d3.select('#songs-panel').classed('empty', true).append('div').text('Click on a dot to display the selected media\'s statistics').style('text-align', 'center').style('color', '#A4A4A4');
}

/**
 * Displays the information panel when a data point is clicked.
 *
 * @param {object} d The data bound to the clicked marker
 */
function displayPanel(d) {
  var panel = d3.select('#songs-panel').classed('empty', false);
  panel.selectAll('*').remove();

  // Song title
  panel.append('div').style('font-family', 'Roboto').style('font-size', '20px').style('font-weight', 'bold').style('text-align', 'center').style('color', '#fff').text(d.musiqueTitre);

  // Song artist
  panel.append('div').style('font-family', 'Roboto').style('font-size', '16px').style('text-align', 'center').style('color', '#A4A4A4').style('padding-top', '3px').text(d.musiqueArtiste);

  // Number of videos
  panel.append('div').attr('class', 'songs-tooltip-main-text').style('padding-top', '25px').text('Number of videos which used the song');
  panel.append('div').attr('class', 'songs-tooltip-sub-text').text("".concat(d.count));

  // Average views
  panel.append('div').attr('class', 'songs-tooltip-main-text').text('Average views per video');
  panel.append('div').attr('class', 'songs-tooltip-sub-text').text("".concat(d.vuesAverage));

  // Average likes
  panel.append('div').attr('class', 'songs-tooltip-main-text').text('Average likes per video');
  panel.append('div').attr('class', 'songs-tooltip-sub-text').text("".concat(d.likesAverage));

  // Average shares
  panel.append('div').attr('class', 'songs-tooltip-main-text').text('Average shares per video');
  panel.append('div').attr('class', 'songs-tooltip-sub-text').text("".concat(d.partagesAverage));

  // Media outlets
  var mediaDiv = panel.append('div');
  mediaDiv.append('div').attr('class', 'songs-tooltip-main-text').text("List of accounts that used the song (".concat(d.médiaList.length, ")")); // currently in our data, médiaList can have up to 19 elements

  var leftMediaList = d.médiaList.slice(0, (d.médiaList.length + 1) / 2);
  var rightMediaList = d.médiaList.slice((d.médiaList.length + 1) / 2);
  var listWrapper = mediaDiv.append('div').attr('class', 'songs-tooltip-list-wrapper');
  listWrapper.append('ul').attr('class', 'songs-tooltip-list').selectAll('li').data(leftMediaList).enter().append('li').text(function (d) {
    return d;
  });
  listWrapper.append('ul').attr('class', 'songs-tooltip-list').selectAll('li').data(rightMediaList).enter().append('li').text(function (d) {
    return d;
  });
}
},{}],"tl9U":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = load;
var preproc = _interopRequireWildcard(require("./scripts/preprocess.js"));
var viz = _interopRequireWildcard(require("./scripts/viz.js"));
var addons = _interopRequireWildcard(require("./scripts/viz-addons.js"));
var slider = _interopRequireWildcard(require("../components/slider.js"));
var dropdown = _interopRequireWildcard(require("../components/sort-by-select.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Loads the songs tab.
 *
 * @param {*} d3 The d3 library
 */
function load(d3) {
  var svgSize;
  var graphSize;
  var xScale;
  var radiusScale;
  var simulation;
  var nonAggregatedData;
  var timeBoundData;
  var minDate;
  var maxDate;
  var domainColumn = 'vuesAverage'; // by default, display songs according to average views

  var graphTitleMap = new Map().set('vuesAverage', 'Songs Used in TikTok Videos by Average View Count').set('likesAverage', 'Songs Used in TikTok Videos by Average Like Count').set('commentairesAverage', 'Songs Used in TikTok Videos by Average Comment Count').set('partagesAverage', 'Songs Used in TikTok Videos by Average Share Count');
  var axisTitleMap = new Map().set('vuesAverage', 'Average Views').set('likesAverage', 'Average Likes').set('commentairesAverage', 'Average Comments').set('partagesAverage', 'Average Shares');
  var margin = {
    top: 80,
    right: 100,
    bottom: 80,
    left: 100
  };
  var radiusModulator = 1100; // the greater the value, the smaller the circles at the same window width

  d3.csv('./data_source.csv', d3.autoType).then(function (data) {
    data = preproc.filterOutRowsByValue(data, 'musiqueTitre', /son original|original sound|sonido original|suono originale|sunet original|som original|오리지널 사운드/);
    nonAggregatedData = data;
    data = preproc.aggregateColumns(data, ['vues', 'likes', 'partages', 'commentaires'], ['média'], ['musiqueTitre', 'musiqueArtiste']);
    timeBoundData = data;
    var g = viz.generateG(margin);
    viz.appendPointG(g);
    viz.appendAxis(g);
    viz.appendGraphLabel(g);
    minDate = d3.min(nonAggregatedData, function (row) {
      return new Date(row.date);
    });
    maxDate = d3.max(nonAggregatedData, function (row) {
      return new Date(row.date);
    });
    addons.initPanelDiv();
    addons.initDropdown(dropdown, updateDomainColumn);
    addons.initSlider(slider, minDate, maxDate, updateTimeRange);
    setSizing();
    build();

    /**
     *   This function handles the graph's sizing.
     */
    function setSizing() {
      svgSize = {
        width: d3.select('#songs-beeswarm-plot').node().getBoundingClientRect().width,
        height: 500
      };
      graphSize = {
        width: svgSize.width - margin.right - margin.left,
        height: svgSize.height - margin.bottom - margin.top
      };
      radiusScale = viz.setRadiusScale(data, svgSize.width / radiusModulator);
      viz.setCanvasSize(svgSize.width, svgSize.height);
    }

    /**
     *   This function builds the graph for the first time.
     */
    function build() {
      xScale = viz.setXScale(graphSize.width, data, domainColumn);
      viz.addCoordinatesToData(data, xScale, graphSize.height / 2, domainColumn);
      viz.drawXAxis(xScale, graphSize.width, graphSize.height, axisTitleMap.get(domainColumn));
      viz.generateGraphTitle(graphTitleMap.get(domainColumn), graphSize.width);
      viz.generateGraphSubtitle(minDate, maxDate, graphSize.width);
      simulation = viz.getSimulation(timeBoundData, xScale, graphSize.height / 2, domainColumn, radiusScale);
      viz.updateCircles(data, simulation, radiusScale, addons.displayPanel);
    }

    /**
     *   This function rebuilds the graph after a window resize or when the date range slider changes.
     */
    function rebuild() {
      xScale = viz.setXScale(graphSize.width, data, domainColumn);
      viz.updateXCoordinateInData(timeBoundData, xScale, domainColumn);
      viz.drawXAxis(xScale, graphSize.width, graphSize.height, axisTitleMap.get(domainColumn));
      viz.generateGraphTitle(graphTitleMap.get(domainColumn), graphSize.width);
      viz.generateGraphSubtitle(minDate, maxDate, graphSize.width);
      simulation.stop();
      simulation = viz.getSimulation(timeBoundData, xScale, graphSize.height / 2, domainColumn, radiusScale);
      viz.updateCircles(timeBoundData, simulation, radiusScale, addons.displayPanel);
    }

    /**
     * Callback function to update the column used for the x axis
     *
     * @param {string} column The new column to use
     */
    function updateDomainColumn(column) {
      domainColumn = column;
      rebuild();
    }

    /**
     * Updates the time range for the upload dates of the data
     *
     * @param {*} range Object with "from" and "to" properties containing Date objects
     */
    function updateTimeRange(range) {
      minDate = range.from;
      maxDate = range.to;
      var oldCoordinates = saveCoordinates();
      aggregateFilteredData(range);
      applyCoordinatesToData(oldCoordinates);
      rebuild();

      /**
       * Saves previous coordinates of timeBoundData into a map.
       *
       * @returns {Map} The map containing the saved coordinates
       */
      function saveCoordinates() {
        return new Map(timeBoundData.map(function (song) {
          var fullSong = song.musiqueTitre.concat(song.musiqueArtiste);
          var coordinates = {
            x: song.x,
            y: song.y
          };
          return [fullSong, coordinates];
        }));
      }

      /**
       * Aggregates the data again with the new date range as a filter.
       *
       * @param {*} range Object with "from" and "to" properties containing Date objects
       */
      function aggregateFilteredData(range) {
        timeBoundData = nonAggregatedData.filter(function (row) {
          var uploadTime = new Date(row.date).getTime();
          return range.from.getTime() <= uploadTime && uploadTime <= range.to.getTime();
        });
        timeBoundData = preproc.aggregateColumns(timeBoundData, ['vues', 'likes', 'partages', 'commentaires'], ['média'], ['musiqueTitre', 'musiqueArtiste']);
      }

      /**
       * Applies coordinates to the new timeBoundData. This is necessary to prevent the position of the points
       * from resetting every time the state of the time range slider changes.
       *
       * @param {Map} coordinates The coordinates to apply to each song's data point
       */
      function applyCoordinatesToData(coordinates) {
        timeBoundData.forEach(function (song) {
          var fullSong = song.musiqueTitre.concat(song.musiqueArtiste);
          var songCoordinates = coordinates.get(fullSong);
          if (songCoordinates) {
            song.x = songCoordinates.x;
            song.y = songCoordinates.y;
          } else {
            song.y = graphSize.height / 2;
          }
        });
      }
    }
    window.addEventListener('resize', function () {
      setSizing();
      rebuild();
    });
  });
}
},{"./scripts/preprocess.js":"jbTG","./scripts/viz.js":"IT4S","./scripts/viz-addons.js":"AmQo","../components/slider.js":"qFBM","../components/sort-by-select.js":"Pwqr"}],"TdqG":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appendAxes = appendAxes;
exports.generateG = generateG;
exports.setCanvasSize = setCanvasSize;
/**
 * Generates the SVG element g which will contain the data visualisation.
 *
 * @param {object} margin The desired margins around the graph
 * @returns {*} The d3 Selection for the created g element
 */
function generateG(margin) {
  return d3.select('.video-posting-graph').select('svg').append('g').attr('id', 'video-posting-graph-g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
}

/**
 * Sets the size of the SVG canvas containing the graph.
 *
 * @param {number} width The desired width
 * @param {number} height The desired height
 */
function setCanvasSize(width, height) {
  d3.select('#video-posting-heatmap').select('svg').attr('width', width).attr('height', height);
}

/**
 * Appends an SVG g element which will contain the axes.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
function appendAxes(g) {
  g.append('g').attr('class', 'x axis').attr('color', 'white');
  g.append('g').attr('class', 'y axis').attr('color', 'white');
}
},{}],"RUWv":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addTimeBlocks = addTimeBlocks;
exports.aggregateColumns = aggregateColumns;
exports.computeAverageCount = computeAverageCount;
exports.fill = fill;
exports.filterDataByDates = filterDataByDates;
exports.getMediaList = getMediaList;
exports.getUniqueTimeBlocks = getUniqueTimeBlocks;
exports.normalizeColumn = normalizeColumn;
exports.processDateTime = processDateTime;
exports.sortByColumns = sortByColumns;
exports.trim = trim;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/**
 * Trims the data to only the wanted columns
 *
 * @param {object[]} data The data to analyze
 * @param {string[]} targets The columns to keep
 * @returns {object[]} The data with only the needed columns
 */
function trim(data, targets) {
  return data.map(function (row) {
    var trimmedRow = {};
    targets.forEach(function (target) {
      trimmedRow[target] = row[target];
    });
    return trimmedRow;
  });
}
/**
 * @param {object[]} data The data to get the list from
 * @returns {string[]} all medias
 */
function getMediaList(data) {
  return _toConsumableArray(new Set(data.map(function (row) {
    return row['média'];
  })));
}
/**
 * Aggregates specific columns
 *
 * @param {object[]} data The data to analyze
 * @param {string} targets The columns to aggregate
 * @param {string[]} groupBy The columns to group by when aggregating
 * @returns {object[]} The data with the groupBy columns and the aggregated column
 */
function aggregateColumns(data, targets, groupBy) {
  data = trim(data, targets.concat(groupBy));
  var groupedData = d3.group(data, function (d) {
    return groupBy.map(function (column) {
      return d[column];
    }).join('-');
  });
  var aggregatedData = Array.from(groupedData, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      values = _ref2[1];
    var aggregation = _objectSpread(_objectSpread({}, values[0]), {}, {
      count: values.length
    });
    targets.forEach(function (target) {
      var sum = d3.sum(values, function (d) {
        return d[target];
      });
      var average = sum / values.length;
      aggregation[target] = sum;
      aggregation["".concat(target, "Average")] = Math.floor(average);
    });
    groupBy.forEach(function (column, index) {
      aggregation[column] = key.split('-')[index];
    });
    return aggregation;
  });
  return aggregatedData;
}

/**
 * Sorts the data by specific columns in order
 *
 * @param {object[]} data The data to analyze
 * @param {string[]} sortBy The columns to sort by, priority given to smallest index
 * @param {boolean} isDescending Determines if sort order is ascending or descending
 * @returns {object[]} The sorted data
 */
function sortByColumns(data, sortBy) {
  var isDescending = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var sortedData = _toConsumableArray(data); // Create a copy of the original data to avoid modifying it directly

  sortedData.sort(function (a, b) {
    for (var i = 0; i < sortBy.length; i++) {
      var column = sortBy[i];
      var result = 0;
      if (a[column] < b[column]) result = -1;else if (a[column] > b[column]) result = 1;
      if (isDescending) result = -result; // Reverse the sorting order for descending

      if (result !== 0) return result;
    }
    return 0;
  });
  return sortedData;
}
/**
 * Returns the number of weeks between two dates
 *
 * @param {Date} startDate start
 * @param {Date} endDate end
 * @returns {number} - The number of weeks between the two dates
 */
function countWeeks(startDate, endDate) {
  // Calculate the difference in milliseconds
  var diffInMs = Math.abs(endDate - startDate);

  // Convert milliseconds to weeks
  var diffInWeeks = Math.ceil(diffInMs / (1000 * 60 * 60 * 24 * 7));
  return diffInWeeks;
}

/**
 * Returns the number of weeks between two dates
 *
 * @param {object[]} data the data
 * @param {Date} startDate start
 * @param {Date} endDate end
 * @returns {object[]} - The number of weeks between the two dates
 */
function computeAverageCount(data, startDate, endDate) {
  var weeksCount = countWeeks(startDate, endDate);
  // eslint-disable-next-line no-return-assign
  data.forEach(function (row) {
    return row.countAverage = row.count / weeksCount;
  });
  return data;
}
/**
 * Splits date into date and time and adds day of week
 *
 * @param {object[]} data The data to analyze
 * @returns {object[]} The data with the processed datetime and day of week
 */
function processDateTime(data) {
  var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var processedData = data.map(function (item) {
    var dateTimeParts = item.date.split(' ');
    var date = dateTimeParts[0];
    var time = dateTimeParts[1];
    var dayOfWeekIndex = new Date(date).getDay();
    var dayOfWeek = daysOfWeek[dayOfWeekIndex];
    return _objectSpread(_objectSpread({}, item), {}, {
      date: date,
      time: time,
      dayOfWeek: dayOfWeek
    });
  });
  return processedData;
}

/**
 * Filters the data by only keeping entries within the dates.THIS FUNCTION ASSUMES processDateTime was applied.
 *
 * @param {object[]} data The data
 * @param {Date} startDate The start date
 * @param {Date} endDate The end date
 * @returns {object[]} The data within the dates
 */
function filterDataByDates(data, startDate, endDate) {
  var filteredData = data.filter(function (obj) {
    var date = new Date(obj.date);
    return date >= startDate && date <= endDate;
  });
  return filteredData;
}
/**
 * Adds time block dpending on time of publication
 *
 * @param {object[]} data The data to analyze
 * @param {number} timeBlockLength the length of the time block. Default is 2
 * @returns {object[]} The data with the time block clomun added
 */
function addTimeBlocks(data) {
  var timeBlockLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var processedData = data.map(function (item) {
    var timeParts = item.time.split(':');
    var hour = Number(timeParts[0]);
    var minute = Number(timeParts[1]);

    // Calculate the total minutes from 00:00
    var totalMinutes = hour * 60 + minute;

    // Calculate the time block
    var timeBlockStart = Math.floor(totalMinutes / (timeBlockLength * 60)) * (timeBlockLength * 60);
    var timeBlockEnd = timeBlockStart + timeBlockLength * 60;

    // Format the time block as HH:MM - HH:MM
    var timeBlock = "".concat(String(Math.floor(timeBlockStart / 60)).padStart(2, '0'), ":").concat(String(timeBlockStart % 60).padStart(2, '0'), " to ").concat(String(Math.floor(timeBlockEnd / 60)).padStart(2, '0'), ":").concat(String(timeBlockEnd % 60).padStart(2, '0'));
    return _objectSpread(_objectSpread({}, item), {}, {
      timeBlock: timeBlock
    });
  });
  return processedData;
}

/**
 * Returns a list of unique time blocks (useful to get the domain)
 *
 * @param {object[]} data The data to analyze
 * @returns {string[]} The unique timeBlocks in the data
 */
function getUniqueTimeBlocks(data) {
  var uniqueTimeBlocks = new Set();
  data.forEach(function (item) {
    var timeBlock = item.timeBlock;
    uniqueTimeBlocks.add(timeBlock);
  });
  return Array.from(uniqueTimeBlocks);
}

/**
 * Normalizes a column
 *
 * @param {object[]} data The data to analyze
 * @param {string} targetColumn The column to normalize
 * @returns {object[]} The column with the normalized data
 */
function normalizeColumn(data, targetColumn) {
  var min = Math.min.apply(Math, _toConsumableArray(data.map(function (obj) {
    return obj[targetColumn];
  })));
  var max = Math.max.apply(Math, _toConsumableArray(data.map(function (obj) {
    return obj[targetColumn];
  })));
  data.forEach(function (obj) {
    obj["".concat(targetColumn, "Normalized")] = (obj[targetColumn] - min) / (max - min);
  });
  return data;
}

/**
 * Fills data summary to avoid undefined time blocks
 *
 * @param {object[]} data the data to be filled
 * @returns {object[]} the filled data
 */
function fill(data) {
  var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var timeBlocks = Array.from({
    length: 12
  }, function (_, i) {
    return "".concat((i * 2).toString().padStart(2, '0'), ":00 to ").concat((i * 2 + 2).toString().padStart(2, '0'), ":00");
  });
  var filler = {
    commentaires: 0,
    commentairesAverage: 0,
    count: 0,
    countAverage: 0,
    likes: 0,
    likesAverage: 0,
    partages: 0,
    partagesAverage: 0,
    vues: 0,
    vuesAverage: 0
  };
  var _loop = function _loop() {
    var dayOfWeek = _daysOfWeek[_i2];
    var _loop2 = function _loop2() {
      var timeBlock = _timeBlocks[_i3];
      var entry = data.find(function (item) {
        return item.dayOfWeek === dayOfWeek && item.timeBlock === timeBlock;
      });
      if (entry) {
        return "continue";
      }
      data.push(_objectSpread(_objectSpread({}, filler), {}, {
        dayOfWeek: dayOfWeek,
        timeBlock: timeBlock
      }));
    };
    for (var _i3 = 0, _timeBlocks = timeBlocks; _i3 < _timeBlocks.length; _i3++) {
      var _ret = _loop2();
      if (_ret === "continue") continue;
    }
  };
  for (var _i2 = 0, _daysOfWeek = daysOfWeek; _i2 < _daysOfWeek.length; _i2++) {
    _loop();
  }
  return data;
}
},{}],"XEQm":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appendRects = appendRects;
exports.drawXAxis = drawXAxis;
exports.drawYAxis = drawYAxis;
exports.generateGraphSubtitle = generateGraphSubtitle;
exports.generateGraphTitle = generateGraphTitle;
exports.rotateYTicks = rotateYTicks;
exports.setColorScaleDomain = setColorScaleDomain;
exports.updateRects = updateRects;
exports.updateXScale = updateXScale;
exports.updateYScale = updateYScale;
/**
 * Sets the domain of the color scale
 *
 * @param {*} colorScale The color scale used in the heatmap
 * @param {object[]} data The data to be displayed
 * @param {string} targetColumn The column to use as domain
 */
function setColorScaleDomain(colorScale, data, targetColumn) {
  var target = data.map(function (entry) {
    return entry[targetColumn];
  });
  colorScale.domain(d3.extent(target));
}

/**
 * For each data element, appends a group 'g' to which an SVG rect is appended
 *
 * @param {object[]} data The data to use for binding
 */
function appendRects(data) {
  d3.select('#video-posting-graph-g').selectAll('g.cell').data(data).enter().append('g').attr('class', 'cell').append('rect');
}

/**
 * Updates the domain and range of the scale for the x axis
 *
 * @param {*} xScale The scale for the x axis
 * @param {number} width The width of the diagram
 */
function updateXScale(xScale, width) {
  var daysOfWeekDomain = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  xScale.domain(daysOfWeekDomain).range([0, width]);
}

/**
 * Updates the domain and range of the scale for the y axis
 *
 * @param {*} yScale The scale for the y axis
 * @param {object[]} timeBlocks The names of the neighborhoods
 * @param {number} height The height of the diagram
 */
function updateYScale(yScale, timeBlocks, height) {
  var sortedTimeBlocks = timeBlocks.sort();
  yScale.domain(sortedTimeBlocks).range([0, height]);
}

/**
 *  Draws the X axis at the top of the diagram.
 *
 *  @param {*} xScale The scale to use to draw the axis
 */
function drawXAxis(xScale) {
  // TODO : Draw X axis
  var xAxisGenerator = d3.axisTop().scale(xScale);
  d3.select('#video-posting-graph-g .x').call(xAxisGenerator);
}

/**
 * Draws the Y axis to the right of the diagram.
 *
 * @param {*} yScale The scale to use to draw the axis
 * @param {number} width The width of the graphic
 */
function drawYAxis(yScale, width) {
  // TODO : Draw Y axis
  var yAxisGenerator = d3.axisRight().scale(yScale);
  d3.select('#video-posting-graph-g .y').attr('transform', "translate(".concat(width, ",0)")).call(yAxisGenerator);
}

/**
 * Rotates the ticks on the Y axis 30 degrees towards the left.
 */
function rotateYTicks() {
  // TODO : Rotate Y ticks.
  d3.selectAll('#video-posting-graph-g .y .tick').attr('transform', function () {
    return d3.select(this).attr('transform') + " rotate(".concat(-30, ")");
  });
}

/**
 * After the rectangles have been appended, this function dictates
 * their position, size and fill color.
 *
 * @param {*} xScale The x scale used to position the rectangles
 * @param {*} yScale The y scale used to position the rectangles
 * @param {*} colorScale The color scale used to set the rectangles' colors
 * @param {string} targetColumn The column to use as domain
 */
function updateRects(xScale, yScale, colorScale, targetColumn) {
  // TODO : Set position, size and fill of rectangles according to bound data
  d3.selectAll('#video-posting-graph-g .cell').attr('transform', function (d) {
    return "translate(".concat(xScale(d.dayOfWeek), ",").concat(yScale(d.timeBlock), ")");
  }).select('rect').attr('width', xScale.bandwidth()).attr('height', yScale.bandwidth()).attr('fill', function (d) {
    return colorScale(d[targetColumn]);
  });
}

/**
 * Generates the subtitle for the visualization.
 *
 * @param {Date} minDate The minimum displayed date
 * @param {Date} maxDate The maximum displayed date
 * @param {number} width The width of the g element containing the visualization
 */
function generateGraphSubtitle(minDate, maxDate, width) {
  var svg = d3.select('#video-posting-graph-g');
  var formattedMinDate = minDate.toLocaleDateString('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  var formattedMaxDate = maxDate.toLocaleDateString('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  var subtitle = d3.select('#video-posting .video-posting-subtitle');
  if (subtitle.node()) {
    subtitle.attr('x', width / 2).text("From ".concat(formattedMinDate, " to ").concat(formattedMaxDate));
  } else {
    svg.append('text').attr('class', 'video-posting-subtitle').attr('x', width / 2).attr('y', -50).attr('text-anchor', 'middle').attr('fill', '#a4a4a4').style('font-size', '14px').text("From ".concat(formattedMinDate, " to ").concat(formattedMaxDate));
  }
}

/**
 * Generates the title of the visualization.
 *
 * @param {string} title The title of the visualization
 * @param {number} width The width of the g element containing the visualization
 */
function generateGraphTitle(title, width) {
  var svg = d3.select('#video-posting-graph-g');
  var graphTitle = d3.select('#video-posting .video-posting-title');
  if (graphTitle.node()) {
    // update title if it already exists
    graphTitle.attr('x', width / 2).text(title);
  } else {
    svg.append('text').attr('class', 'video-posting-title').attr('x', width / 2).attr('y', -75).attr('text-anchor', 'middle').attr('fill', '#fff').style('font-size', '20px').style('font-weight', 'bold').text(title);
  }
}
},{}],"OkUF":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.draw = draw;
exports.initGradient = initGradient;
exports.initLegendAxis = initLegendAxis;
exports.initLegendBar = initLegendBar;
exports.update = update;
/**
 * Initializes the definition for the gradient to use with the
 * given colorScale.
 *
 * @param {*} colorScale The color scale to use
 */
function initGradient(colorScale) {
  var svg = d3.select('.video-posting-heatmap-svg');
  var defs = svg.append('defs');
  var linearGradient = defs.append('linearGradient').attr('id', 'video-posting-gradient').attr('x1', 0).attr('y1', 1).attr('x2', 0).attr('y2', 0);
  linearGradient.selectAll('stop').data(colorScale.ticks().map(function (tick, i, nodes) {
    return {
      offset: "".concat(100 * (i / nodes.length), "%"),
      color: colorScale(tick)
    };
  })).join('stop').attr('offset', function (d) {
    return d.offset;
  }).attr('stop-color', function (d) {
    return d.color;
  });
}

/**
 * Initializes the SVG rectangle for the legend.
 */
function initLegendBar() {
  var svg = d3.select('.video-posting-heatmap-svg');
  svg.append('rect').attr('class', 'legend bar');
}

/**
 *  Initializes the group for the legend's axis.
 */
function initLegendAxis() {
  var svg = d3.select('.video-posting-heatmap-svg');
  svg.append('g').attr('class', 'legend axis');
}

/**
 * Draws the legend to the left of the graphic.
 *
 * @param {number} x The x position of the legend
 * @param {number} y The y position of the legend
 * @param {number} height The height of the legend
 * @param {number} width The width of the legend
 * @param {string} fill The fill of the legend
 * @param {*} colorScale The color scale represented by the legend
 */
function draw(x, y, height, width, fill, colorScale) {
  d3.select('.video-posting-heatmap-svg .legend.bar').attr('x', x).attr('y', y).attr('width', width).attr('height', height).attr('fill', fill);
  var ticks = colorScale.ticks();
  d3.select('.video-posting-heatmap-svg .legend.axis').selectAll('text').data(ticks).enter().append('text').style('font', '10px sans-serif').style('fill', '#ccc').attr('x', function (d, i) {
    return x - 10;
  }).attr('text-anchor', 'end').attr('y', function (d, i) {
    return (ticks.length - 1 - i) * (height / (ticks.length - 1)) + y;
  }).text(function (d, i) {
    if (i % 2 === 0) {
      if (d >= 1000) return Math.floor(d / 1000) + ',' + (d % 1000).toString().padStart(3, '0');
      return d;
    }
  });
}
/**
 * Updates the legend
 *
 * @param {number} x The x position of the legend
 * @param {number} y The y position of the legend
 * @param {number} height The height of the legend
 * @param {*} colorScale The color scale represented by the legend
 */
function update(x, y, height, colorScale) {
  var ticks = colorScale.ticks();

  // Remove existing ticks
  d3.select('.video-posting-heatmap-svg .legend.axis').selectAll('text').remove();

  // Append new ticks
  d3.select('.video-posting-heatmap-svg .legend.axis').selectAll('text').data(ticks).enter().append('text').style('font', '10px sans-serif').style('fill', '#ccc').attr('x', function (d, i) {
    return x - 10;
  }).attr('text-anchor', 'end').attr('y', function (d, i) {
    return (ticks.length - 1 - i) * (height / (ticks.length - 1)) + y;
  }).text(function (d, i) {
    if (i % 2 === 0) {
      if (d >= 1000) return Math.floor(d / 1000) + ',' + (d % 1000).toString().padStart(3, '0');
      return d;
    }
  });
}
},{}],"pBGv":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}
(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }
  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  }
  // if setTimeout wasn't available but was latter defined
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  }
  // if clearTimeout wasn't available but was latter defined
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
};

// v8 likes predictible objects
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};
process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};
function noop() {}
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;
process.listeners = function (name) {
  return [];
};
process.binding = function (name) {
  throw new Error('process.binding is not supported');
};
process.cwd = function () {
  return '/';
};
process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};
process.umask = function () {
  return 0;
};
},{}],"Bt1K":[function(require,module,exports) {
var process = require("process");
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = load;
var helper = _interopRequireWildcard(require("./scripts/helper.js"));
var preproc = _interopRequireWildcard(require("./scripts/preprocess.js"));
var viz = _interopRequireWildcard(require("./scripts/heatmap_viz.js"));
var legend = _interopRequireWildcard(require("./scripts/legend.js"));
var hover = _interopRequireWildcard(require("./scripts/hover.js"));
var menu = _interopRequireWildcard(require("../components/media-selection-menu.js"));
var slider = _interopRequireWildcard(require("../components/slider.js"));
var sortBySelect = _interopRequireWildcard(require("../components/sort-by-select.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Loads the video posting tab.
 *
 * @param {*} d3 The d3 library
 */
function load(d3) {
  var bounds;
  var svgSize;
  var graphSize;
  var selectedMediaList = [];
  var targetColumn = 'vues';
  var startDate = new Date(2018, 10, 30);
  var endDate = new Date(2023, 3, 14);
  var showTotal = true;
  var currentData;
  var graphTitleMap = new Map().set('vuesAverage', 'Weekly Average views of Videos Uploaded during each time block').set('vues', 'Total of views during each time block').set('likesAverage', 'Weekly Average likes received during each time block').set('likes', 'Total likes received during each time block').set('commentaires', 'Total amount of comments received during each time block').set('commentairesAverage', 'Weekly Average Amount of comments received during each time block').set('countAverage', 'Weekly Average Amount of Videos Uploaded per Time of Day').set('partages', 'Total amount of comments received during each time block').set('partagesAverage', 'Weekly Average Amount of comments received during each time block').set('count', 'Amount of Videos Uploaded per Time of Day');
  var margin = {
    top: 50,
    right: 200,
    bottom: 35,
    left: 200
  };
  // TODO: Use this file for welcom vizs
  var xScale = d3.scaleBand().padding(0.05);
  var yScale = d3.scaleBand().padding(0.2);
  var colorScale = d3.scaleSequential(d3.interpolateBuPu).domain([0, 1]); // Define the domain of the scale

  var darkColor = '#74427c';
  var paleColor = '#e6d7f4';
  var customInterpolator = function customInterpolator(t) {
    return d3.interpolate(paleColor, darkColor)(t);
  };
  colorScale.interpolator(customInterpolator);
  d3.csv('./data_source.csv', d3.autoType).then(function (data) {
    // These are just examples
    var mediaList = preproc.getMediaList(data);

    // creates the media selection component
    menu.append(document.querySelector('#vp-controls-media-selection'), mediaList, updateSelectedMedia);
    slider.append(document.querySelector('#vp-controls-time-range'), startDate, endDate, updateSelectedDates);
    sortBySelect.append(document.querySelector('#vp-controls-sort-by'), {
      Views: 'vues',
      Likes: 'likes',
      Comments: 'commentaires',
      Shares: 'partages',
      'Posts count': 'count'
    }, updateTargetColumn);
    var radioButtons = d3.select('#vp-radio-buttons');
    radioButtons.selectAll('input[type="radio"]').on('change', updateMode);
    data = preproc.addTimeBlocks(preproc.processDateTime(data));
    legend.initGradient(colorScale);
    legend.initLegendBar();
    legend.initLegendAxis();
    var g = helper.generateG(margin);
    helper.appendAxes(g);
    setSizing();
    build();
    /**
     * Updates the plot with the select date range
     *
     * @param {*} fromToDates Object with "from" and "to" properties containing Date objects
     */
    function updateSelectedDates(fromToDates) {
      startDate = fromToDates.from;
      endDate = fromToDates.to;
      build();
    }
    /**
     * Toggle show mode when a button is clicked
     */
    function updateMode() {
      showTotal = !showTotal;
      updateTargetColumn(targetColumn);
    }
    /**
     *   This function handles the graph's sizing.
     */
    function setSizing() {
      bounds = d3.select('.video-posting-graph').node().getBoundingClientRect();
      svgSize = {
        width: bounds.width,
        height: 550
      };
      graphSize = {
        width: svgSize.width - margin.right - margin.left,
        height: svgSize.height - margin.bottom - margin.top
      };
      helper.setCanvasSize(svgSize.width, svgSize.height);
    }

    /**
     * Update target column and redraw
     *
     * @param {string} newTarget the new target column
     */
    function updateTargetColumn(newTarget) {
      if (showTotal) {
        targetColumn = newTarget.replace('Average', '');
      } else targetColumn = newTarget + 'Average';
      build();
    }
    /**
     * Updates the plot with the selected media
     *
     * @param {string[]} mediaList The selected media
     */
    function updateSelectedMedia(mediaList) {
      selectedMediaList = mediaList;
      build();
    }
    /**
     * function to process data before build
     */
    function process() {
      currentData = data;
      if (selectedMediaList.length > 0) {
        currentData = currentData.filter(function (row) {
          return selectedMediaList.includes(row['média']);
        });
      }
      currentData = preproc.filterDataByDates(currentData, startDate, endDate);
      currentData = preproc.aggregateColumns(currentData, ['vues', 'likes', 'partages', 'commentaires'], ['dayOfWeek', 'timeBlock']);
      if (targetColumn === 'countAverage') {
        currentData = preproc.computeAverageCount(currentData, startDate, endDate);
      }
      currentData = preproc.fill(currentData);
      currentData = preproc.sortByColumns(currentData, ['vuesAverage', 'vues', 'likes', 'partages', 'commentaires'], true);
      viz.setColorScaleDomain(colorScale, currentData, targetColumn);
      viz.appendRects(currentData);
      legend.initGradient(colorScale);
      legend.initLegendBar();
      legend.initLegendAxis();
      setSizing();

      // Draw the updated legend
      legend.draw(margin.left / 2, margin.top + 5, graphSize.height - 10, 15, 'url(#video-posting-gradient)', colorScale);
    }
    /**
     *   This function builds the graph.
     */
    function build() {
      process();
      viz.updateXScale(xScale, graphSize.width);
      viz.updateYScale(yScale, preproc.getUniqueTimeBlocks(currentData), graphSize.height);
      viz.drawXAxis(xScale);
      viz.drawYAxis(yScale, graphSize.width);
      viz.rotateYTicks();
      viz.updateRects(xScale, yScale, colorScale, targetColumn);
      viz.generateGraphTitle(graphTitleMap.get(targetColumn), graphSize.width);
      viz.generateGraphSubtitle(startDate, endDate, graphSize.width);
      hover.setRectHandler(xScale, yScale, hover.rectSelected, hover.rectUnselected, hover.selectTicks, hover.unselectTicks);
      legend.update(margin.left / 2, margin.top + 5, graphSize.height - 10, colorScale);
    }
    window.addEventListener('resize', function () {
      setSizing();
      build();
    });
  });
}
},{"./scripts/helper.js":"TdqG","./scripts/preprocess.js":"RUWv","./scripts/heatmap_viz.js":"XEQm","./scripts/legend.js":"OkUF","./scripts/hover.js":"RD4j","../components/media-selection-menu.js":"pbTI","../components/slider.js":"qFBM","../components/sort-by-select.js":"Pwqr","process":"pBGv"}],"Focm":[function(require,module,exports) {
/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable no-unused-vars */
'use strict';

var overview = _interopRequireWildcard(require("./overview/index.js"));
var hashtags = _interopRequireWildcard(require("./hashtags/index.js"));
var videoLength = _interopRequireWildcard(require("./video-length/index.js"));
var songs = _interopRequireWildcard(require("./songs/index.js"));
var videoPosting = _interopRequireWildcard(require("./video-posting/index.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @file This file is the entry-point for the the code for the data viz project of team 10
 * @author Team 10
 * @version v1.0.0
 */

(function (d3) {
  var tabContents = document.getElementsByClassName('tab-content');
  Array.from(tabContents).forEach(function (tab) {
    tab.style.display = 'none';
  });
  overview.load(d3);
  videoLength.load(d3);
  hashtags.load(d3);
  songs.load(d3);
  videoPosting.load(d3);
  document.getElementById('overview').style.display = 'block'; // default tab
  document.getElementById('overview-tab').style.background = '#ffffff11';
  document.getElementById('overview-tab').addEventListener('click', function () {
    displayTab('overview');
    resetStyles();
    document.getElementById('overview-tab').style.background = '#ffffff11';
  });
  document.getElementById('hashtags-tab').addEventListener('click', function () {
    displayTab('hashtags');
    resetStyles();
    document.getElementById('hashtags-tab').style.background = '#ffffff11';
  });
  document.getElementById('video-length-tab').addEventListener('click', function () {
    displayTab('video-length');
    resetStyles();
    document.getElementById('video-length-tab').style.background = '#ffffff11';
  });
  document.getElementById('songs-tab').addEventListener('click', function () {
    displayTab('songs');
    resetStyles();
    document.getElementById('songs-tab').style.background = '#ffffff11';
  });
  document.getElementById('video-posting-tab').addEventListener('click', function () {
    displayTab('video-posting');
    resetStyles();
    document.getElementById('video-posting-tab').style.background = '#ffffff11';
  });

  /**
   * Displays the tab with the corresponding id
   *
   * @param {*} id The id of the tab to display
   */
  function displayTab(id) {
    Array.from(tabContents).forEach(function (tab) {
      tab.style.display = 'none';
    });
    document.getElementById(id).style.display = 'block';
    window.dispatchEvent(new Event('resize'));
  }
  function resetStyles() {
    document.getElementById('overview-tab').style.background = '';
    document.getElementById('hashtags-tab').style.background = '';
    document.getElementById('video-length-tab').style.background = '';
    document.getElementById('songs-tab').style.background = '';
    document.getElementById('video-posting-tab').style.background = '';
  }
})(d3);
},{"./overview/index.js":"f1Mg","./hashtags/index.js":"C6dQ","./video-length/index.js":"Dmqc","./songs/index.js":"tl9U","./video-posting/index.js":"Bt1K"}]},{},["Focm"], null)
//# sourceMappingURL=/src.80b26a2e.js.map
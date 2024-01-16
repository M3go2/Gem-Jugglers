var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn2, res) => function __init() {
  return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to2, from2, except, desc) => {
  if (from2 && typeof from2 === "object" || typeof from2 === "function") {
    for (let key of __getOwnPropNames(from2))
      if (!__hasOwnProp.call(to2, key) && key !== except)
        __defProp(to2, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc(from2, key)) || desc.enumerable });
  }
  return to2;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/rollup-plugin-node-polyfills/polyfills/path.js
function normalizeArray(parts, allowAboveRoot) {
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === ".") {
      parts.splice(i, 1);
    } else if (last === "..") {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift("..");
    }
  }
  return parts;
}
function resolve() {
  var resolvedPath = "", resolvedAbsolute = false;
  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = i >= 0 ? arguments[i] : "/";
    if (typeof path !== "string") {
      throw new TypeError("Arguments to path.resolve must be strings");
    } else if (!path) {
      continue;
    }
    resolvedPath = path + "/" + resolvedPath;
    resolvedAbsolute = path.charAt(0) === "/";
  }
  resolvedPath = normalizeArray(filter(resolvedPath.split("/"), function(p2) {
    return !!p2;
  }), !resolvedAbsolute).join("/");
  return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
}
function normalize(path) {
  var isPathAbsolute = isAbsolute(path), trailingSlash = substr(path, -1) === "/";
  path = normalizeArray(filter(path.split("/"), function(p2) {
    return !!p2;
  }), !isPathAbsolute).join("/");
  if (!path && !isPathAbsolute) {
    path = ".";
  }
  if (path && trailingSlash) {
    path += "/";
  }
  return (isPathAbsolute ? "/" : "") + path;
}
function isAbsolute(path) {
  return path.charAt(0) === "/";
}
function join() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return normalize(filter(paths, function(p2, index) {
    if (typeof p2 !== "string") {
      throw new TypeError("Arguments to path.join must be strings");
    }
    return p2;
  }).join("/"));
}
function relative(from2, to2) {
  from2 = resolve(from2).substr(1);
  to2 = resolve(to2).substr(1);
  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== "")
        break;
    }
    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== "")
        break;
    }
    if (start > end)
      return [];
    return arr.slice(start, end - start + 1);
  }
  var fromParts = trim(from2.split("/"));
  var toParts = trim(to2.split("/"));
  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }
  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push("..");
  }
  outputParts = outputParts.concat(toParts.slice(samePartsLength));
  return outputParts.join("/");
}
function dirname(path) {
  var result = splitPath(path), root = result[0], dir = result[1];
  if (!root && !dir) {
    return ".";
  }
  if (dir) {
    dir = dir.substr(0, dir.length - 1);
  }
  return root + dir;
}
function basename(path, ext) {
  var f2 = splitPath(path)[2];
  if (ext && f2.substr(-1 * ext.length) === ext) {
    f2 = f2.substr(0, f2.length - ext.length);
  }
  return f2;
}
function extname(path) {
  return splitPath(path)[3];
}
function filter(xs2, f2) {
  if (xs2.filter)
    return xs2.filter(f2);
  var res = [];
  for (var i = 0; i < xs2.length; i++) {
    if (f2(xs2[i], i, xs2))
      res.push(xs2[i]);
  }
  return res;
}
var splitPathRe, splitPath, sep, delimiter, path_default, substr;
var init_path = __esm({
  "node_modules/rollup-plugin-node-polyfills/polyfills/path.js"() {
    splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
    splitPath = function(filename) {
      return splitPathRe.exec(filename).slice(1);
    };
    sep = "/";
    delimiter = ":";
    path_default = {
      extname,
      basename,
      dirname,
      sep,
      delimiter,
      relative,
      join,
      isAbsolute,
      normalize,
      resolve
    };
    substr = "ab".substr(-1) === "b" ? function(str, start, len) {
      return str.substr(start, len);
    } : function(str, start, len) {
      if (start < 0)
        start = str.length + start;
      return str.substr(start, len);
    };
  }
});

// polyfills/path.js
var path_exports = {};
__export(path_exports, {
  basename: () => basename2,
  default: () => path_default2,
  dirname: () => dirname2,
  extname: () => extname2,
  isAbsolute: () => isAbsolute2,
  join: () => join2,
  normalize: () => normalize2,
  posix: () => posix,
  relative: () => relative2,
  resolve: () => resolve2,
  sep: () => sep2,
  win32: () => win32
});
var resolve2, join2, dirname2, extname2, isAbsolute2, normalize2, sep2, basename2, relative2, win32, posix, path_default2;
var init_path2 = __esm({
  "polyfills/path.js"() {
    init_path();
    path_default.win32 = {
      sep: "\\"
    };
    path_default.posix = {
      sep: "/"
    };
    path_default.parse = (path) => {
      return __path__parse(path);
    };
    path_default.resolve = (...paths) => {
      return __path__resolve(...paths);
    };
    path_default.join = (...paths) => {
      return __path__join(...paths);
    };
    path_default.dirname = (path) => {
      return __path__dirname(path);
    };
    path_default.extname = (path) => {
      return __path__extname(path);
    };
    path_default.isAbsolute = (path) => {
      return __path__isAbsolute(path);
    };
    path_default.normalize = (path) => {
      return __path__normalize(path);
    };
    path_default.sep = __path__sep;
    path_default.basename = (path, extension) => {
      return __path__basename(path, extension);
    };
    path_default.relative = (from2, to2) => {
      return __path__relative(from2, to2);
    };
    resolve2 = path_default.resolve;
    join2 = path_default.join;
    dirname2 = path_default.dirname;
    extname2 = path_default.extname;
    isAbsolute2 = path_default.isAbsolute;
    normalize2 = path_default.normalize;
    sep2 = path_default.sep;
    basename2 = path_default.basename;
    relative2 = path_default.relative;
    win32 = path_default.win32;
    posix = path_default.posix;
    path_default2 = path_default;
  }
});

// node_modules/rollup-plugin-node-polyfills/polyfills/empty.js
var empty_exports = {};
__export(empty_exports, {
  default: () => empty_default
});
var empty_default;
var init_empty = __esm({
  "node_modules/rollup-plugin-node-polyfills/polyfills/empty.js"() {
    empty_default = {};
  }
});

// node_modules/builtin-modules/index.js
var require_builtin_modules = __commonJS({
  "node_modules/builtin-modules/index.js"(exports, module2) {
    "use strict";
    var { builtinModules } = (init_empty(), __toCommonJS(empty_exports));
    var ignoreList = [
      "sys"
    ];
    module2.exports = (builtinModules || (process.binding ? Object.keys(process.binding("natives")) : []) || []).filter((x2) => !/^_|^(internal|v8|node-inspect)\/|\//.test(x2) && !ignoreList.includes(x2)).sort();
  }
});

// node_modules/is-builtin-module/index.js
var require_is_builtin_module = __commonJS({
  "node_modules/is-builtin-module/index.js"(exports, module2) {
    "use strict";
    var builtinModules = require_builtin_modules();
    var moduleSet = new Set(builtinModules);
    var NODE_PROTOCOL = "node:";
    module2.exports = (moduleName) => {
      if (typeof moduleName !== "string") {
        throw new TypeError("Expected a string");
      }
      if (moduleName.startsWith(NODE_PROTOCOL)) {
        moduleName = moduleName.slice(NODE_PROTOCOL.length);
      }
      const slashIndex = moduleName.indexOf("/");
      if (slashIndex !== -1) {
        moduleName = moduleName.slice(0, slashIndex);
      }
      return moduleSet.has(moduleName);
    };
  }
});

// node_modules/deepmerge/dist/cjs.js
var require_cjs = __commonJS({
  "node_modules/deepmerge/dist/cjs.js"(exports, module2) {
    "use strict";
    var isMergeableObject = function isMergeableObject2(value) {
      return isNonNullObject(value) && !isSpecial(value);
    };
    function isNonNullObject(value) {
      return !!value && typeof value === "object";
    }
    function isSpecial(value) {
      var stringValue = Object.prototype.toString.call(value);
      return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value);
    }
    var canUseSymbol = typeof Symbol === "function" && Symbol.for;
    var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 60103;
    function isReactElement(value) {
      return value.$$typeof === REACT_ELEMENT_TYPE;
    }
    function emptyTarget(val) {
      return Array.isArray(val) ? [] : {};
    }
    function cloneUnlessOtherwiseSpecified(value, options) {
      return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
    }
    function defaultArrayMerge(target, source, options) {
      return target.concat(source).map(function(element) {
        return cloneUnlessOtherwiseSpecified(element, options);
      });
    }
    function getMergeFunction(key, options) {
      if (!options.customMerge) {
        return deepmerge;
      }
      var customMerge = options.customMerge(key);
      return typeof customMerge === "function" ? customMerge : deepmerge;
    }
    function getEnumerableOwnPropertySymbols(target) {
      return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
        return target.propertyIsEnumerable(symbol);
      }) : [];
    }
    function getKeys(target) {
      return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
    }
    function propertyIsOnObject(object, property) {
      try {
        return property in object;
      } catch (_2) {
        return false;
      }
    }
    function propertyIsUnsafe(target, key) {
      return propertyIsOnObject(target, key) && !(Object.hasOwnProperty.call(target, key) && Object.propertyIsEnumerable.call(target, key));
    }
    function mergeObject(target, source, options) {
      var destination = {};
      if (options.isMergeableObject(target)) {
        getKeys(target).forEach(function(key) {
          destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
        });
      }
      getKeys(source).forEach(function(key) {
        if (propertyIsUnsafe(target, key)) {
          return;
        }
        if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
          destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
        } else {
          destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
        }
      });
      return destination;
    }
    function deepmerge(target, source, options) {
      options = options || {};
      options.arrayMerge = options.arrayMerge || defaultArrayMerge;
      options.isMergeableObject = options.isMergeableObject || isMergeableObject;
      options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
      var sourceIsArray = Array.isArray(source);
      var targetIsArray = Array.isArray(target);
      var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
      if (!sourceAndTargetTypesMatch) {
        return cloneUnlessOtherwiseSpecified(source, options);
      } else if (sourceIsArray) {
        return options.arrayMerge(target, source, options);
      } else {
        return mergeObject(target, source, options);
      }
    }
    deepmerge.all = function deepmergeAll(array, options) {
      if (!Array.isArray(array)) {
        throw new Error("first argument should be an array");
      }
      return array.reduce(function(prev, next) {
        return deepmerge(prev, next, options);
      }, {});
    };
    var deepmerge_1 = deepmerge;
    module2.exports = deepmerge_1;
  }
});

// node_modules/is-module/index.js
var require_is_module = __commonJS({
  "node_modules/is-module/index.js"(exports, module2) {
    var ES6ImportExportRegExp = /(?:^\s*|[}{\(\);,\n]\s*)(import\s+['"]|(import|module)\s+[^"'\(\)\n;]+\s+from\s+['"]|export\s+(\*|\{|default|function|var|const|let|[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*))/;
    var ES6AliasRegExp = /(?:^\s*|[}{\(\);,\n]\s*)(export\s*\*\s*from\s*(?:'([^']+)'|"([^"]+)"))/;
    module2.exports = function(sauce) {
      return ES6ImportExportRegExp.test(sauce) || ES6AliasRegExp.test(sauce);
    };
  }
});

// polyfills/fs.js
var fs_exports = {};
__export(fs_exports, {
  access: () => access,
  accessSync: () => accessSync,
  default: () => fs_default,
  existsSync: () => existsSync,
  readFile: () => readFile,
  readFileSync: () => readFileSync,
  realpath: () => realpath,
  realpathSync: () => realpathSync,
  stat: () => stat,
  statSync: () => statSync
});
function wrap(task, cb) {
  try {
    cb(null, task());
  } catch (e) {
    cb(e);
  }
}
function realpath(path) {
  wrap(() => realpathSync(path), arguments[arguments.length - 1]);
}
function access(path) {
  wrap(() => accessSync(path), arguments[arguments.length - 1]);
}
function readFile(path) {
  wrap(() => readFileSync(path), arguments[arguments.length - 1]);
}
function stat(path) {
  wrap(() => statSync(path), arguments[arguments.length - 1]);
}
function realpathSync(path) {
  return __fs__realpath(path);
}
function accessSync(path) {
  return __fs__access(path);
}
function existsSync(path) {
  return __fs__exists(path);
}
function readFileSync(path) {
  return __fs__readFile(path);
}
function statSync(path) {
  return __fs__stat(path);
}
var fs_default;
var init_fs = __esm({
  "polyfills/fs.js"() {
    fs_default = {
      realpath,
      access,
      readFile,
      stat,
      realpathSync,
      existsSync,
      readFileSync,
      statSync
    };
  }
});

// node_modules/rollup-plugin-node-polyfills/polyfills/process-es6.js
function defaultSetTimout() {
  throw new Error("setTimeout has not been defined");
}
function defaultClearTimeout() {
  throw new Error("clearTimeout has not been defined");
}
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    return setTimeout(fun, 0);
  }
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e2) {
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    return clearTimeout(marker);
  }
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      return cachedClearTimeout.call(null, marker);
    } catch (e2) {
      return cachedClearTimeout.call(this, marker);
    }
  }
}
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
function nextTick(fun) {
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
}
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
function noop() {
}
function binding(name) {
  throw new Error("process.binding is not supported");
}
function cwd() {
  return "/";
}
function chdir(dir) {
  throw new Error("process.chdir is not supported");
}
function umask() {
  return 0;
}
function hrtime(previousTimestamp) {
  var clocktime = performanceNow.call(performance2) * 1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor(clocktime % 1 * 1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds, nanoseconds];
}
function uptime() {
  var currentTime = new Date();
  var dif = currentTime - startTime;
  return dif / 1e3;
}
var cachedSetTimeout, cachedClearTimeout, queue, draining, currentQueue, queueIndex, title, platform, browser, env, argv, version, versions, release, config, on2, addListener, once, off, removeListener, removeAllListeners, emit, performance2, performanceNow, startTime, browser$1, process_es6_default;
var init_process_es6 = __esm({
  "node_modules/rollup-plugin-node-polyfills/polyfills/process-es6.js"() {
    cachedSetTimeout = defaultSetTimout;
    cachedClearTimeout = defaultClearTimeout;
    if (typeof global.setTimeout === "function") {
      cachedSetTimeout = setTimeout;
    }
    if (typeof global.clearTimeout === "function") {
      cachedClearTimeout = clearTimeout;
    }
    queue = [];
    draining = false;
    queueIndex = -1;
    Item.prototype.run = function() {
      this.fun.apply(null, this.array);
    };
    title = "browser";
    platform = "browser";
    browser = true;
    env = {};
    argv = [];
    version = "";
    versions = {};
    release = {};
    config = {};
    on2 = noop;
    addListener = noop;
    once = noop;
    off = noop;
    removeListener = noop;
    removeAllListeners = noop;
    emit = noop;
    performance2 = global.performance || {};
    performanceNow = performance2.now || performance2.mozNow || performance2.msNow || performance2.oNow || performance2.webkitNow || function() {
      return new Date().getTime();
    };
    startTime = new Date();
    browser$1 = {
      nextTick,
      title,
      browser,
      env,
      argv,
      version,
      versions,
      on: on2,
      addListener,
      once,
      off,
      removeListener,
      removeAllListeners,
      emit,
      binding,
      cwd,
      chdir,
      umask,
      hrtime,
      platform,
      release,
      config,
      uptime
    };
    process_es6_default = browser$1;
  }
});

// node_modules/rollup-plugin-node-polyfills/polyfills/inherits.js
var inherits, inherits_default;
var init_inherits = __esm({
  "node_modules/rollup-plugin-node-polyfills/polyfills/inherits.js"() {
    if (typeof Object.create === "function") {
      inherits = function inherits2(ctor, superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      };
    } else {
      inherits = function inherits2(ctor, superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      };
    }
    inherits_default = inherits;
  }
});

// node_modules/rollup-plugin-node-polyfills/polyfills/util.js
function format(f2) {
  if (!isString(f2)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(" ");
  }
  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f2).replace(formatRegExp, function(x3) {
    if (x3 === "%%")
      return "%";
    if (i >= len)
      return x3;
    switch (x3) {
      case "%s":
        return String(args[i++]);
      case "%d":
        return Number(args[i++]);
      case "%j":
        try {
          return JSON.stringify(args[i++]);
        } catch (_2) {
          return "[Circular]";
        }
      default:
        return x3;
    }
  });
  for (var x2 = args[i]; i < len; x2 = args[++i]) {
    if (isNull(x2) || !isObject(x2)) {
      str += " " + x2;
    } else {
      str += " " + inspect(x2);
    }
  }
  return str;
}
function deprecate(fn2, msg) {
  if (isUndefined(global.process)) {
    return function() {
      return deprecate(fn2, msg).apply(this, arguments);
    };
  }
  if (process_es6_default.noDeprecation === true) {
    return fn2;
  }
  var warned2 = false;
  function deprecated() {
    if (!warned2) {
      if (process_es6_default.throwDeprecation) {
        throw new Error(msg);
      } else if (process_es6_default.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned2 = true;
    }
    return fn2.apply(this, arguments);
  }
  return deprecated;
}
function debuglog(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process_es6_default.env.NODE_DEBUG || "";
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp("\\b" + set + "\\b", "i").test(debugEnviron)) {
      var pid = 0;
      debugs[set] = function() {
        var msg = format.apply(null, arguments);
        console.error("%s %d: %s", set, pid, msg);
      };
    } else {
      debugs[set] = function() {
      };
    }
  }
  return debugs[set];
}
function inspect(obj, opts) {
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  if (arguments.length >= 3)
    ctx.depth = arguments[2];
  if (arguments.length >= 4)
    ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    ctx.showHidden = opts;
  } else if (opts) {
    _extend(ctx, opts);
  }
  if (isUndefined(ctx.showHidden))
    ctx.showHidden = false;
  if (isUndefined(ctx.depth))
    ctx.depth = 2;
  if (isUndefined(ctx.colors))
    ctx.colors = false;
  if (isUndefined(ctx.customInspect))
    ctx.customInspect = true;
  if (ctx.colors)
    ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];
  if (style) {
    return "\x1B[" + inspect.colors[style][0] + "m" + str + "\x1B[" + inspect.colors[style][1] + "m";
  } else {
    return str;
  }
}
function stylizeNoColor(str, styleType) {
  return str;
}
function arrayToHash(array) {
  var hash = {};
  array.forEach(function(val, idx) {
    hash[val] = true;
  });
  return hash;
}
function formatValue(ctx, value, recurseTimes) {
  if (ctx.customInspect && value && isFunction(value.inspect) && value.inspect !== inspect && !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);
  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }
  if (isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) {
    return formatError(value);
  }
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ": " + value.name : "";
      return ctx.stylize("[Function" + name + "]", "special");
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), "date");
    }
    if (isError(value)) {
      return formatError(value);
    }
  }
  var base2 = "", array = false, braces = ["{", "}"];
  if (isArray(value)) {
    array = true;
    braces = ["[", "]"];
  }
  if (isFunction(value)) {
    var n3 = value.name ? ": " + value.name : "";
    base2 = " [Function" + n3 + "]";
  }
  if (isRegExp(value)) {
    base2 = " " + RegExp.prototype.toString.call(value);
  }
  if (isDate(value)) {
    base2 = " " + Date.prototype.toUTCString.call(value);
  }
  if (isError(value)) {
    base2 = " " + formatError(value);
  }
  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base2 + braces[1];
  }
  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
    } else {
      return ctx.stylize("[Object]", "special");
    }
  }
  ctx.seen.push(value);
  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }
  ctx.seen.pop();
  return reduceToSingleString(output, base2, braces);
}
function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize("undefined", "undefined");
  if (isString(value)) {
    var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
    return ctx.stylize(simple, "string");
  }
  if (isNumber(value))
    return ctx.stylize("" + value, "number");
  if (isBoolean(value))
    return ctx.stylize("" + value, "boolean");
  if (isNull(value))
    return ctx.stylize("null", "null");
}
function formatError(value) {
  return "[" + Error.prototype.toString.call(value) + "]";
}
function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l2 = value.length; i < l2; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(
        ctx,
        value,
        recurseTimes,
        visibleKeys,
        String(i),
        true
      ));
    } else {
      output.push("");
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(
        ctx,
        value,
        recurseTimes,
        visibleKeys,
        key,
        true
      ));
    }
  });
  return output;
}
function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize("[Getter/Setter]", "special");
    } else {
      str = ctx.stylize("[Getter]", "special");
    }
  } else {
    if (desc.set) {
      str = ctx.stylize("[Setter]", "special");
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = "[" + key + "]";
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf("\n") > -1) {
        if (array) {
          str = str.split("\n").map(function(line) {
            return "  " + line;
          }).join("\n").substr(2);
        } else {
          str = "\n" + str.split("\n").map(function(line) {
            return "   " + line;
          }).join("\n");
        }
      }
    } else {
      str = ctx.stylize("[Circular]", "special");
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify("" + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, "name");
    } else {
      name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, "string");
    }
  }
  return name + ": " + str;
}
function reduceToSingleString(output, base2, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf("\n") >= 0)
      numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
  }, 0);
  if (length > 60) {
    return braces[0] + (base2 === "" ? "" : base2 + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
  }
  return braces[0] + base2 + " " + output.join(", ") + " " + braces[1];
}
function isArray(ar2) {
  return Array.isArray(ar2);
}
function isBoolean(arg) {
  return typeof arg === "boolean";
}
function isNull(arg) {
  return arg === null;
}
function isNullOrUndefined(arg) {
  return arg == null;
}
function isNumber(arg) {
  return typeof arg === "number";
}
function isString(arg) {
  return typeof arg === "string";
}
function isSymbol(arg) {
  return typeof arg === "symbol";
}
function isUndefined(arg) {
  return arg === void 0;
}
function isRegExp(re2) {
  return isObject(re2) && objectToString(re2) === "[object RegExp]";
}
function isObject(arg) {
  return typeof arg === "object" && arg !== null;
}
function isDate(d2) {
  return isObject(d2) && objectToString(d2) === "[object Date]";
}
function isError(e) {
  return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
}
function isFunction(arg) {
  return typeof arg === "function";
}
function isPrimitive(arg) {
  return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || typeof arg === "undefined";
}
function isBuffer(maybeBuf) {
  return Buffer.isBuffer(maybeBuf);
}
function objectToString(o2) {
  return Object.prototype.toString.call(o2);
}
function pad(n3) {
  return n3 < 10 ? "0" + n3.toString(10) : n3.toString(10);
}
function timestamp() {
  var d2 = new Date();
  var time = [
    pad(d2.getHours()),
    pad(d2.getMinutes()),
    pad(d2.getSeconds())
  ].join(":");
  return [d2.getDate(), months[d2.getMonth()], time].join(" ");
}
function log() {
  console.log("%s - %s", timestamp(), format.apply(null, arguments));
}
function _extend(origin, add) {
  if (!add || !isObject(add))
    return origin;
  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
}
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
var formatRegExp, debugs, debugEnviron, months;
var init_util = __esm({
  "node_modules/rollup-plugin-node-polyfills/polyfills/util.js"() {
    init_process_es6();
    init_inherits();
    formatRegExp = /%[sdj%]/g;
    debugs = {};
    inspect.colors = {
      "bold": [1, 22],
      "italic": [3, 23],
      "underline": [4, 24],
      "inverse": [7, 27],
      "white": [37, 39],
      "grey": [90, 39],
      "black": [30, 39],
      "blue": [34, 39],
      "cyan": [36, 39],
      "green": [32, 39],
      "magenta": [35, 39],
      "red": [31, 39],
      "yellow": [33, 39]
    };
    inspect.styles = {
      "special": "cyan",
      "number": "yellow",
      "boolean": "yellow",
      "undefined": "grey",
      "null": "bold",
      "string": "green",
      "date": "magenta",
      "regexp": "red"
    };
    months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
  }
});

// polyfills/util.js
var util_exports = {};
__export(util_exports, {
  _extend: () => _extend,
  debuglog: () => debuglog,
  deprecate: () => deprecate,
  format: () => format,
  inherits: () => inherits_default,
  inspect: () => inspect,
  isArray: () => isArray,
  isBoolean: () => isBoolean,
  isBuffer: () => isBuffer,
  isDate: () => isDate,
  isError: () => isError,
  isFunction: () => isFunction,
  isNull: () => isNull,
  isNullOrUndefined: () => isNullOrUndefined,
  isNumber: () => isNumber,
  isObject: () => isObject,
  isPrimitive: () => isPrimitive,
  isRegExp: () => isRegExp,
  isString: () => isString,
  isSymbol: () => isSymbol,
  isUndefined: () => isUndefined,
  log: () => log,
  promisify: () => promisify
});
function promisify(fn2) {
  return function() {
    return new Promise((resolve3, reject) => {
      fn2(...arguments, function(err, data) {
        if (err !== null) {
          return reject(err);
        }
        return resolve3(data);
      });
    });
  };
}
var init_util2 = __esm({
  "polyfills/util.js"() {
    init_util();
  }
});

// node_modules/rollup-plugin-node-polyfills/polyfills/os.js
var os_exports = {};
__export(os_exports, {
  EOL: () => EOL,
  arch: () => arch,
  cpus: () => cpus,
  default: () => os_default,
  endianness: () => endianness,
  freemem: () => freemem,
  getNetworkInterfaces: () => getNetworkInterfaces,
  hostname: () => hostname,
  loadavg: () => loadavg,
  networkInterfaces: () => networkInterfaces,
  platform: () => platform2,
  release: () => release2,
  tmpDir: () => tmpDir,
  tmpdir: () => tmpdir,
  totalmem: () => totalmem,
  type: () => type,
  uptime: () => uptime2
});
function endianness() {
  if (typeof _endianness === "undefined") {
    var a2 = new ArrayBuffer(2);
    var b2 = new Uint8Array(a2);
    var c2 = new Uint16Array(a2);
    b2[0] = 1;
    b2[1] = 2;
    if (c2[0] === 258) {
      _endianness = "BE";
    } else if (c2[0] === 513) {
      _endianness = "LE";
    } else {
      throw new Error("unable to figure out endianess");
    }
  }
  return _endianness;
}
function hostname() {
  if (typeof global.location !== "undefined") {
    return global.location.hostname;
  } else
    return "";
}
function loadavg() {
  return [];
}
function uptime2() {
  return 0;
}
function freemem() {
  return Number.MAX_VALUE;
}
function totalmem() {
  return Number.MAX_VALUE;
}
function cpus() {
  return [];
}
function type() {
  return "Browser";
}
function release2() {
  if (typeof global.navigator !== "undefined") {
    return global.navigator.appVersion;
  }
  return "";
}
function networkInterfaces() {
}
function getNetworkInterfaces() {
}
function arch() {
  return "javascript";
}
function platform2() {
  return "browser";
}
function tmpDir() {
  return "/tmp";
}
var _endianness, tmpdir, EOL, os_default;
var init_os = __esm({
  "node_modules/rollup-plugin-node-polyfills/polyfills/os.js"() {
    tmpdir = tmpDir;
    EOL = "\n";
    os_default = {
      EOL,
      tmpdir,
      tmpDir,
      networkInterfaces,
      getNetworkInterfaces,
      release: release2,
      type,
      cpus,
      totalmem,
      freemem,
      uptime: uptime2,
      loadavg,
      hostname,
      endianness
    };
  }
});

// node_modules/resolve/lib/homedir.js
var require_homedir = __commonJS({
  "node_modules/resolve/lib/homedir.js"(exports, module2) {
    "use strict";
    var os2 = (init_os(), __toCommonJS(os_exports));
    module2.exports = os2.homedir || function homedir() {
      var home = process.env.HOME;
      var user = process.env.LOGNAME || process.env.USER || process.env.LNAME || process.env.USERNAME;
      if (process.platform === "win32") {
        return process.env.USERPROFILE || process.env.HOMEDRIVE + process.env.HOMEPATH || home || null;
      }
      if (process.platform === "darwin") {
        return home || (user ? "/Users/" + user : null);
      }
      if (process.platform === "linux") {
        return home || (process.getuid() === 0 ? "/root" : user ? "/home/" + user : null);
      }
      return home || null;
    };
  }
});

// node_modules/resolve/lib/caller.js
var require_caller = __commonJS({
  "node_modules/resolve/lib/caller.js"(exports, module2) {
    module2.exports = function() {
      var origPrepareStackTrace = Error.prepareStackTrace;
      Error.prepareStackTrace = function(_2, stack2) {
        return stack2;
      };
      var stack = new Error().stack;
      Error.prepareStackTrace = origPrepareStackTrace;
      return stack[2].getFileName();
    };
  }
});

// node_modules/path-parse/index.js
var require_path_parse = __commonJS({
  "node_modules/path-parse/index.js"(exports, module2) {
    "use strict";
    var isWindows = process.platform === "win32";
    var splitWindowsRe = /^(((?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?[\\\/]?)(?:[^\\\/]*[\\\/])*)((\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))[\\\/]*$/;
    var win322 = {};
    function win32SplitPath(filename) {
      return splitWindowsRe.exec(filename).slice(1);
    }
    win322.parse = function(pathString) {
      if (typeof pathString !== "string") {
        throw new TypeError(
          "Parameter 'pathString' must be a string, not " + typeof pathString
        );
      }
      var allParts = win32SplitPath(pathString);
      if (!allParts || allParts.length !== 5) {
        throw new TypeError("Invalid path '" + pathString + "'");
      }
      return {
        root: allParts[1],
        dir: allParts[0] === allParts[1] ? allParts[0] : allParts[0].slice(0, -1),
        base: allParts[2],
        ext: allParts[4],
        name: allParts[3]
      };
    };
    var splitPathRe2 = /^((\/?)(?:[^\/]*\/)*)((\.{1,2}|[^\/]+?|)(\.[^.\/]*|))[\/]*$/;
    var posix2 = {};
    function posixSplitPath(filename) {
      return splitPathRe2.exec(filename).slice(1);
    }
    posix2.parse = function(pathString) {
      if (typeof pathString !== "string") {
        throw new TypeError(
          "Parameter 'pathString' must be a string, not " + typeof pathString
        );
      }
      var allParts = posixSplitPath(pathString);
      if (!allParts || allParts.length !== 5) {
        throw new TypeError("Invalid path '" + pathString + "'");
      }
      return {
        root: allParts[1],
        dir: allParts[0].slice(0, -1),
        base: allParts[2],
        ext: allParts[4],
        name: allParts[3]
      };
    };
    if (isWindows)
      module2.exports = win322.parse;
    else
      module2.exports = posix2.parse;
    module2.exports.posix = posix2.parse;
    module2.exports.win32 = win322.parse;
  }
});

// node_modules/resolve/lib/node-modules-paths.js
var require_node_modules_paths = __commonJS({
  "node_modules/resolve/lib/node-modules-paths.js"(exports, module2) {
    var path = (init_path2(), __toCommonJS(path_exports));
    var parse3 = path.parse || require_path_parse();
    var getNodeModulesDirs = function getNodeModulesDirs2(absoluteStart, modules) {
      var prefix = "/";
      if (/^([A-Za-z]:)/.test(absoluteStart)) {
        prefix = "";
      } else if (/^\\\\/.test(absoluteStart)) {
        prefix = "\\\\";
      }
      var paths = [absoluteStart];
      var parsed = parse3(absoluteStart);
      while (parsed.dir !== paths[paths.length - 1]) {
        paths.push(parsed.dir);
        parsed = parse3(parsed.dir);
      }
      return paths.reduce(function(dirs, aPath) {
        return dirs.concat(modules.map(function(moduleDir) {
          return path.resolve(prefix, aPath, moduleDir);
        }));
      }, []);
    };
    module2.exports = function nodeModulesPaths(start, opts, request) {
      var modules = opts && opts.moduleDirectory ? [].concat(opts.moduleDirectory) : ["node_modules"];
      if (opts && typeof opts.paths === "function") {
        return opts.paths(
          request,
          start,
          function() {
            return getNodeModulesDirs(start, modules);
          },
          opts
        );
      }
      var dirs = getNodeModulesDirs(start, modules);
      return opts && opts.paths ? dirs.concat(opts.paths) : dirs;
    };
  }
});

// node_modules/resolve/lib/normalize-options.js
var require_normalize_options = __commonJS({
  "node_modules/resolve/lib/normalize-options.js"(exports, module2) {
    module2.exports = function(x2, opts) {
      return opts || {};
    };
  }
});

// node_modules/function-bind/implementation.js
var require_implementation = __commonJS({
  "node_modules/function-bind/implementation.js"(exports, module2) {
    "use strict";
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var slice2 = Array.prototype.slice;
    var toStr = Object.prototype.toString;
    var funcType = "[object Function]";
    module2.exports = function bind(that) {
      var target = this;
      if (typeof target !== "function" || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slice2.call(arguments, 1);
      var bound;
      var binder = function() {
        if (this instanceof bound) {
          var result = target.apply(
            this,
            args.concat(slice2.call(arguments))
          );
          if (Object(result) === result) {
            return result;
          }
          return this;
        } else {
          return target.apply(
            that,
            args.concat(slice2.call(arguments))
          );
        }
      };
      var boundLength = Math.max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs.push("$" + i);
      }
      bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this,arguments); }")(binder);
      if (target.prototype) {
        var Empty = function Empty2() {
        };
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  }
});

// node_modules/function-bind/index.js
var require_function_bind = __commonJS({
  "node_modules/function-bind/index.js"(exports, module2) {
    "use strict";
    var implementation = require_implementation();
    module2.exports = Function.prototype.bind || implementation;
  }
});

// node_modules/has/src/index.js
var require_src = __commonJS({
  "node_modules/has/src/index.js"(exports, module2) {
    "use strict";
    var bind = require_function_bind();
    module2.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
  }
});

// node_modules/is-core-module/core.json
var require_core = __commonJS({
  "node_modules/is-core-module/core.json"(exports, module2) {
    module2.exports = {
      assert: true,
      "node:assert": [">= 14.18 && < 15", ">= 16"],
      "assert/strict": ">= 15",
      "node:assert/strict": ">= 16",
      async_hooks: ">= 8",
      "node:async_hooks": [">= 14.18 && < 15", ">= 16"],
      buffer_ieee754: ">= 0.5 && < 0.9.7",
      buffer: true,
      "node:buffer": [">= 14.18 && < 15", ">= 16"],
      child_process: true,
      "node:child_process": [">= 14.18 && < 15", ">= 16"],
      cluster: ">= 0.5",
      "node:cluster": [">= 14.18 && < 15", ">= 16"],
      console: true,
      "node:console": [">= 14.18 && < 15", ">= 16"],
      constants: true,
      "node:constants": [">= 14.18 && < 15", ">= 16"],
      crypto: true,
      "node:crypto": [">= 14.18 && < 15", ">= 16"],
      _debug_agent: ">= 1 && < 8",
      _debugger: "< 8",
      dgram: true,
      "node:dgram": [">= 14.18 && < 15", ">= 16"],
      diagnostics_channel: [">= 14.17 && < 15", ">= 15.1"],
      "node:diagnostics_channel": [">= 14.18 && < 15", ">= 16"],
      dns: true,
      "node:dns": [">= 14.18 && < 15", ">= 16"],
      "dns/promises": ">= 15",
      "node:dns/promises": ">= 16",
      domain: ">= 0.7.12",
      "node:domain": [">= 14.18 && < 15", ">= 16"],
      events: true,
      "node:events": [">= 14.18 && < 15", ">= 16"],
      freelist: "< 6",
      fs: true,
      "node:fs": [">= 14.18 && < 15", ">= 16"],
      "fs/promises": [">= 10 && < 10.1", ">= 14"],
      "node:fs/promises": [">= 14.18 && < 15", ">= 16"],
      _http_agent: ">= 0.11.1",
      "node:_http_agent": [">= 14.18 && < 15", ">= 16"],
      _http_client: ">= 0.11.1",
      "node:_http_client": [">= 14.18 && < 15", ">= 16"],
      _http_common: ">= 0.11.1",
      "node:_http_common": [">= 14.18 && < 15", ">= 16"],
      _http_incoming: ">= 0.11.1",
      "node:_http_incoming": [">= 14.18 && < 15", ">= 16"],
      _http_outgoing: ">= 0.11.1",
      "node:_http_outgoing": [">= 14.18 && < 15", ">= 16"],
      _http_server: ">= 0.11.1",
      "node:_http_server": [">= 14.18 && < 15", ">= 16"],
      http: true,
      "node:http": [">= 14.18 && < 15", ">= 16"],
      http2: ">= 8.8",
      "node:http2": [">= 14.18 && < 15", ">= 16"],
      https: true,
      "node:https": [">= 14.18 && < 15", ">= 16"],
      inspector: ">= 8",
      "node:inspector": [">= 14.18 && < 15", ">= 16"],
      "inspector/promises": [">= 19"],
      "node:inspector/promises": [">= 19"],
      _linklist: "< 8",
      module: true,
      "node:module": [">= 14.18 && < 15", ">= 16"],
      net: true,
      "node:net": [">= 14.18 && < 15", ">= 16"],
      "node-inspect/lib/_inspect": ">= 7.6 && < 12",
      "node-inspect/lib/internal/inspect_client": ">= 7.6 && < 12",
      "node-inspect/lib/internal/inspect_repl": ">= 7.6 && < 12",
      os: true,
      "node:os": [">= 14.18 && < 15", ">= 16"],
      path: true,
      "node:path": [">= 14.18 && < 15", ">= 16"],
      "path/posix": ">= 15.3",
      "node:path/posix": ">= 16",
      "path/win32": ">= 15.3",
      "node:path/win32": ">= 16",
      perf_hooks: ">= 8.5",
      "node:perf_hooks": [">= 14.18 && < 15", ">= 16"],
      process: ">= 1",
      "node:process": [">= 14.18 && < 15", ">= 16"],
      punycode: ">= 0.5",
      "node:punycode": [">= 14.18 && < 15", ">= 16"],
      querystring: true,
      "node:querystring": [">= 14.18 && < 15", ">= 16"],
      readline: true,
      "node:readline": [">= 14.18 && < 15", ">= 16"],
      "readline/promises": ">= 17",
      "node:readline/promises": ">= 17",
      repl: true,
      "node:repl": [">= 14.18 && < 15", ">= 16"],
      smalloc: ">= 0.11.5 && < 3",
      _stream_duplex: ">= 0.9.4",
      "node:_stream_duplex": [">= 14.18 && < 15", ">= 16"],
      _stream_transform: ">= 0.9.4",
      "node:_stream_transform": [">= 14.18 && < 15", ">= 16"],
      _stream_wrap: ">= 1.4.1",
      "node:_stream_wrap": [">= 14.18 && < 15", ">= 16"],
      _stream_passthrough: ">= 0.9.4",
      "node:_stream_passthrough": [">= 14.18 && < 15", ">= 16"],
      _stream_readable: ">= 0.9.4",
      "node:_stream_readable": [">= 14.18 && < 15", ">= 16"],
      _stream_writable: ">= 0.9.4",
      "node:_stream_writable": [">= 14.18 && < 15", ">= 16"],
      stream: true,
      "node:stream": [">= 14.18 && < 15", ">= 16"],
      "stream/consumers": ">= 16.7",
      "node:stream/consumers": ">= 16.7",
      "stream/promises": ">= 15",
      "node:stream/promises": ">= 16",
      "stream/web": ">= 16.5",
      "node:stream/web": ">= 16.5",
      string_decoder: true,
      "node:string_decoder": [">= 14.18 && < 15", ">= 16"],
      sys: [">= 0.4 && < 0.7", ">= 0.8"],
      "node:sys": [">= 14.18 && < 15", ">= 16"],
      "node:test": [">= 16.17 && < 17", ">= 18"],
      timers: true,
      "node:timers": [">= 14.18 && < 15", ">= 16"],
      "timers/promises": ">= 15",
      "node:timers/promises": ">= 16",
      _tls_common: ">= 0.11.13",
      "node:_tls_common": [">= 14.18 && < 15", ">= 16"],
      _tls_legacy: ">= 0.11.3 && < 10",
      _tls_wrap: ">= 0.11.3",
      "node:_tls_wrap": [">= 14.18 && < 15", ">= 16"],
      tls: true,
      "node:tls": [">= 14.18 && < 15", ">= 16"],
      trace_events: ">= 10",
      "node:trace_events": [">= 14.18 && < 15", ">= 16"],
      tty: true,
      "node:tty": [">= 14.18 && < 15", ">= 16"],
      url: true,
      "node:url": [">= 14.18 && < 15", ">= 16"],
      util: true,
      "node:util": [">= 14.18 && < 15", ">= 16"],
      "util/types": ">= 15.3",
      "node:util/types": ">= 16",
      "v8/tools/arguments": ">= 10 && < 12",
      "v8/tools/codemap": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/consarray": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/csvparser": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/logreader": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/profile_view": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/splaytree": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      v8: ">= 1",
      "node:v8": [">= 14.18 && < 15", ">= 16"],
      vm: true,
      "node:vm": [">= 14.18 && < 15", ">= 16"],
      wasi: ">= 13.4 && < 13.5",
      worker_threads: ">= 11.7",
      "node:worker_threads": [">= 14.18 && < 15", ">= 16"],
      zlib: ">= 0.5",
      "node:zlib": [">= 14.18 && < 15", ">= 16"]
    };
  }
});

// node_modules/is-core-module/index.js
var require_is_core_module = __commonJS({
  "node_modules/is-core-module/index.js"(exports, module2) {
    "use strict";
    var has = require_src();
    function specifierIncluded(current, specifier) {
      var nodeParts = current.split(".");
      var parts = specifier.split(" ");
      var op = parts.length > 1 ? parts[0] : "=";
      var versionParts = (parts.length > 1 ? parts[1] : parts[0]).split(".");
      for (var i = 0; i < 3; ++i) {
        var cur = parseInt(nodeParts[i] || 0, 10);
        var ver = parseInt(versionParts[i] || 0, 10);
        if (cur === ver) {
          continue;
        }
        if (op === "<") {
          return cur < ver;
        }
        if (op === ">=") {
          return cur >= ver;
        }
        return false;
      }
      return op === ">=";
    }
    function matchesRange(current, range) {
      var specifiers = range.split(/ ?&& ?/);
      if (specifiers.length === 0) {
        return false;
      }
      for (var i = 0; i < specifiers.length; ++i) {
        if (!specifierIncluded(current, specifiers[i])) {
          return false;
        }
      }
      return true;
    }
    function versionIncluded(nodeVersion, specifierValue) {
      if (typeof specifierValue === "boolean") {
        return specifierValue;
      }
      var current = typeof nodeVersion === "undefined" ? process.versions && process.versions.node : nodeVersion;
      if (typeof current !== "string") {
        throw new TypeError(typeof nodeVersion === "undefined" ? "Unable to determine current node version" : "If provided, a valid node version is required");
      }
      if (specifierValue && typeof specifierValue === "object") {
        for (var i = 0; i < specifierValue.length; ++i) {
          if (matchesRange(current, specifierValue[i])) {
            return true;
          }
        }
        return false;
      }
      return matchesRange(current, specifierValue);
    }
    var data = require_core();
    module2.exports = function isCore(x2, nodeVersion) {
      return has(data, x2) && versionIncluded(nodeVersion, data[x2]);
    };
  }
});

// node_modules/resolve/lib/async.js
var require_async = __commonJS({
  "node_modules/resolve/lib/async.js"(exports, module2) {
    var fs2 = (init_fs(), __toCommonJS(fs_exports));
    var getHomedir = require_homedir();
    var path = (init_path2(), __toCommonJS(path_exports));
    var caller = require_caller();
    var nodeModulesPaths = require_node_modules_paths();
    var normalizeOptions = require_normalize_options();
    var isCore = require_is_core_module();
    var realpathFS = process.platform !== "win32" && fs2.realpath && typeof fs2.realpath.native === "function" ? fs2.realpath.native : fs2.realpath;
    var homedir = getHomedir();
    var defaultPaths = function() {
      return [
        path.join(homedir, ".node_modules"),
        path.join(homedir, ".node_libraries")
      ];
    };
    var defaultIsFile = function isFile(file, cb) {
      fs2.stat(file, function(err, stat3) {
        if (!err) {
          return cb(null, stat3.isFile() || stat3.isFIFO());
        }
        if (err.code === "ENOENT" || err.code === "ENOTDIR")
          return cb(null, false);
        return cb(err);
      });
    };
    var defaultIsDir = function isDirectory2(dir, cb) {
      fs2.stat(dir, function(err, stat3) {
        if (!err) {
          return cb(null, stat3.isDirectory());
        }
        if (err.code === "ENOENT" || err.code === "ENOTDIR")
          return cb(null, false);
        return cb(err);
      });
    };
    var defaultRealpath = function realpath3(x2, cb) {
      realpathFS(x2, function(realpathErr, realPath) {
        if (realpathErr && realpathErr.code !== "ENOENT")
          cb(realpathErr);
        else
          cb(null, realpathErr ? x2 : realPath);
      });
    };
    var maybeRealpath = function maybeRealpath2(realpath3, x2, opts, cb) {
      if (opts && opts.preserveSymlinks === false) {
        realpath3(x2, cb);
      } else {
        cb(null, x2);
      }
    };
    var defaultReadPackage = function defaultReadPackage2(readFile3, pkgfile, cb) {
      readFile3(pkgfile, function(readFileErr, body) {
        if (readFileErr)
          cb(readFileErr);
        else {
          try {
            var pkg = JSON.parse(body);
            cb(null, pkg);
          } catch (jsonErr) {
            cb(null);
          }
        }
      });
    };
    var getPackageCandidates = function getPackageCandidates2(x2, start, opts) {
      var dirs = nodeModulesPaths(start, opts, x2);
      for (var i = 0; i < dirs.length; i++) {
        dirs[i] = path.join(dirs[i], x2);
      }
      return dirs;
    };
    module2.exports = function resolve3(x2, options, callback) {
      var cb = callback;
      var opts = options;
      if (typeof options === "function") {
        cb = opts;
        opts = {};
      }
      if (typeof x2 !== "string") {
        var err = new TypeError("Path must be a string.");
        return process.nextTick(function() {
          cb(err);
        });
      }
      opts = normalizeOptions(x2, opts);
      var isFile = opts.isFile || defaultIsFile;
      var isDirectory2 = opts.isDirectory || defaultIsDir;
      var readFile3 = opts.readFile || fs2.readFile;
      var realpath3 = opts.realpath || defaultRealpath;
      var readPackage = opts.readPackage || defaultReadPackage;
      if (opts.readFile && opts.readPackage) {
        var conflictErr = new TypeError("`readFile` and `readPackage` are mutually exclusive.");
        return process.nextTick(function() {
          cb(conflictErr);
        });
      }
      var packageIterator = opts.packageIterator;
      var extensions = opts.extensions || [".js"];
      var includeCoreModules = opts.includeCoreModules !== false;
      var basedir = opts.basedir || path.dirname(caller());
      var parent = opts.filename || basedir;
      opts.paths = opts.paths || defaultPaths();
      var absoluteStart = path.resolve(basedir);
      maybeRealpath(
        realpath3,
        absoluteStart,
        opts,
        function(err2, realStart) {
          if (err2)
            cb(err2);
          else
            init2(realStart);
        }
      );
      var res;
      function init2(basedir2) {
        if (/^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/.test(x2)) {
          res = path.resolve(basedir2, x2);
          if (x2 === "." || x2 === ".." || x2.slice(-1) === "/")
            res += "/";
          if (/\/$/.test(x2) && res === basedir2) {
            loadAsDirectory(res, opts.package, onfile);
          } else
            loadAsFile(res, opts.package, onfile);
        } else if (includeCoreModules && isCore(x2)) {
          return cb(null, x2);
        } else
          loadNodeModules(x2, basedir2, function(err2, n3, pkg) {
            if (err2)
              cb(err2);
            else if (n3) {
              return maybeRealpath(realpath3, n3, opts, function(err3, realN) {
                if (err3) {
                  cb(err3);
                } else {
                  cb(null, realN, pkg);
                }
              });
            } else {
              var moduleError = new Error("Cannot find module '" + x2 + "' from '" + parent + "'");
              moduleError.code = "MODULE_NOT_FOUND";
              cb(moduleError);
            }
          });
      }
      function onfile(err2, m2, pkg) {
        if (err2)
          cb(err2);
        else if (m2)
          cb(null, m2, pkg);
        else
          loadAsDirectory(res, function(err3, d2, pkg2) {
            if (err3)
              cb(err3);
            else if (d2) {
              maybeRealpath(realpath3, d2, opts, function(err4, realD) {
                if (err4) {
                  cb(err4);
                } else {
                  cb(null, realD, pkg2);
                }
              });
            } else {
              var moduleError = new Error("Cannot find module '" + x2 + "' from '" + parent + "'");
              moduleError.code = "MODULE_NOT_FOUND";
              cb(moduleError);
            }
          });
      }
      function loadAsFile(x3, thePackage, callback2) {
        var loadAsFilePackage = thePackage;
        var cb2 = callback2;
        if (typeof loadAsFilePackage === "function") {
          cb2 = loadAsFilePackage;
          loadAsFilePackage = void 0;
        }
        var exts = [""].concat(extensions);
        load(exts, x3, loadAsFilePackage);
        function load(exts2, x4, loadPackage) {
          if (exts2.length === 0)
            return cb2(null, void 0, loadPackage);
          var file = x4 + exts2[0];
          var pkg = loadPackage;
          if (pkg)
            onpkg(null, pkg);
          else
            loadpkg(path.dirname(file), onpkg);
          function onpkg(err2, pkg_, dir) {
            pkg = pkg_;
            if (err2)
              return cb2(err2);
            if (dir && pkg && opts.pathFilter) {
              var rfile = path.relative(dir, file);
              var rel = rfile.slice(0, rfile.length - exts2[0].length);
              var r2 = opts.pathFilter(pkg, x4, rel);
              if (r2)
                return load(
                  [""].concat(extensions.slice()),
                  path.resolve(dir, r2),
                  pkg
                );
            }
            isFile(file, onex);
          }
          function onex(err2, ex) {
            if (err2)
              return cb2(err2);
            if (ex)
              return cb2(null, file, pkg);
            load(exts2.slice(1), x4, pkg);
          }
        }
      }
      function loadpkg(dir, cb2) {
        if (dir === "" || dir === "/")
          return cb2(null);
        if (process.platform === "win32" && /^\w:[/\\]*$/.test(dir)) {
          return cb2(null);
        }
        if (/[/\\]node_modules[/\\]*$/.test(dir))
          return cb2(null);
        maybeRealpath(realpath3, dir, opts, function(unwrapErr, pkgdir) {
          if (unwrapErr)
            return loadpkg(path.dirname(dir), cb2);
          var pkgfile = path.join(pkgdir, "package.json");
          isFile(pkgfile, function(err2, ex) {
            if (!ex)
              return loadpkg(path.dirname(dir), cb2);
            readPackage(readFile3, pkgfile, function(err3, pkgParam) {
              if (err3)
                cb2(err3);
              var pkg = pkgParam;
              if (pkg && opts.packageFilter) {
                pkg = opts.packageFilter(pkg, pkgfile);
              }
              cb2(null, pkg, dir);
            });
          });
        });
      }
      function loadAsDirectory(x3, loadAsDirectoryPackage, callback2) {
        var cb2 = callback2;
        var fpkg = loadAsDirectoryPackage;
        if (typeof fpkg === "function") {
          cb2 = fpkg;
          fpkg = opts.package;
        }
        maybeRealpath(realpath3, x3, opts, function(unwrapErr, pkgdir) {
          if (unwrapErr)
            return cb2(unwrapErr);
          var pkgfile = path.join(pkgdir, "package.json");
          isFile(pkgfile, function(err2, ex) {
            if (err2)
              return cb2(err2);
            if (!ex)
              return loadAsFile(path.join(x3, "index"), fpkg, cb2);
            readPackage(readFile3, pkgfile, function(err3, pkgParam) {
              if (err3)
                return cb2(err3);
              var pkg = pkgParam;
              if (pkg && opts.packageFilter) {
                pkg = opts.packageFilter(pkg, pkgfile);
              }
              if (pkg && pkg.main) {
                if (typeof pkg.main !== "string") {
                  var mainError = new TypeError("package \u201C" + pkg.name + "\u201D `main` must be a string");
                  mainError.code = "INVALID_PACKAGE_MAIN";
                  return cb2(mainError);
                }
                if (pkg.main === "." || pkg.main === "./") {
                  pkg.main = "index";
                }
                loadAsFile(path.resolve(x3, pkg.main), pkg, function(err4, m2, pkg2) {
                  if (err4)
                    return cb2(err4);
                  if (m2)
                    return cb2(null, m2, pkg2);
                  if (!pkg2)
                    return loadAsFile(path.join(x3, "index"), pkg2, cb2);
                  var dir = path.resolve(x3, pkg2.main);
                  loadAsDirectory(dir, pkg2, function(err5, n3, pkg3) {
                    if (err5)
                      return cb2(err5);
                    if (n3)
                      return cb2(null, n3, pkg3);
                    loadAsFile(path.join(x3, "index"), pkg3, cb2);
                  });
                });
                return;
              }
              loadAsFile(path.join(x3, "/index"), pkg, cb2);
            });
          });
        });
      }
      function processDirs(cb2, dirs) {
        if (dirs.length === 0)
          return cb2(null, void 0);
        var dir = dirs[0];
        isDirectory2(path.dirname(dir), isdir);
        function isdir(err2, isdir2) {
          if (err2)
            return cb2(err2);
          if (!isdir2)
            return processDirs(cb2, dirs.slice(1));
          loadAsFile(dir, opts.package, onfile2);
        }
        function onfile2(err2, m2, pkg) {
          if (err2)
            return cb2(err2);
          if (m2)
            return cb2(null, m2, pkg);
          loadAsDirectory(dir, opts.package, ondir);
        }
        function ondir(err2, n3, pkg) {
          if (err2)
            return cb2(err2);
          if (n3)
            return cb2(null, n3, pkg);
          processDirs(cb2, dirs.slice(1));
        }
      }
      function loadNodeModules(x3, start, cb2) {
        var thunk = function() {
          return getPackageCandidates(x3, start, opts);
        };
        processDirs(
          cb2,
          packageIterator ? packageIterator(x3, start, thunk, opts) : thunk()
        );
      }
    };
  }
});

// node_modules/resolve/lib/core.json
var require_core2 = __commonJS({
  "node_modules/resolve/lib/core.json"(exports, module2) {
    module2.exports = {
      assert: true,
      "node:assert": [">= 14.18 && < 15", ">= 16"],
      "assert/strict": ">= 15",
      "node:assert/strict": ">= 16",
      async_hooks: ">= 8",
      "node:async_hooks": [">= 14.18 && < 15", ">= 16"],
      buffer_ieee754: ">= 0.5 && < 0.9.7",
      buffer: true,
      "node:buffer": [">= 14.18 && < 15", ">= 16"],
      child_process: true,
      "node:child_process": [">= 14.18 && < 15", ">= 16"],
      cluster: ">= 0.5",
      "node:cluster": [">= 14.18 && < 15", ">= 16"],
      console: true,
      "node:console": [">= 14.18 && < 15", ">= 16"],
      constants: true,
      "node:constants": [">= 14.18 && < 15", ">= 16"],
      crypto: true,
      "node:crypto": [">= 14.18 && < 15", ">= 16"],
      _debug_agent: ">= 1 && < 8",
      _debugger: "< 8",
      dgram: true,
      "node:dgram": [">= 14.18 && < 15", ">= 16"],
      diagnostics_channel: [">= 14.17 && < 15", ">= 15.1"],
      "node:diagnostics_channel": [">= 14.18 && < 15", ">= 16"],
      dns: true,
      "node:dns": [">= 14.18 && < 15", ">= 16"],
      "dns/promises": ">= 15",
      "node:dns/promises": ">= 16",
      domain: ">= 0.7.12",
      "node:domain": [">= 14.18 && < 15", ">= 16"],
      events: true,
      "node:events": [">= 14.18 && < 15", ">= 16"],
      freelist: "< 6",
      fs: true,
      "node:fs": [">= 14.18 && < 15", ">= 16"],
      "fs/promises": [">= 10 && < 10.1", ">= 14"],
      "node:fs/promises": [">= 14.18 && < 15", ">= 16"],
      _http_agent: ">= 0.11.1",
      "node:_http_agent": [">= 14.18 && < 15", ">= 16"],
      _http_client: ">= 0.11.1",
      "node:_http_client": [">= 14.18 && < 15", ">= 16"],
      _http_common: ">= 0.11.1",
      "node:_http_common": [">= 14.18 && < 15", ">= 16"],
      _http_incoming: ">= 0.11.1",
      "node:_http_incoming": [">= 14.18 && < 15", ">= 16"],
      _http_outgoing: ">= 0.11.1",
      "node:_http_outgoing": [">= 14.18 && < 15", ">= 16"],
      _http_server: ">= 0.11.1",
      "node:_http_server": [">= 14.18 && < 15", ">= 16"],
      http: true,
      "node:http": [">= 14.18 && < 15", ">= 16"],
      http2: ">= 8.8",
      "node:http2": [">= 14.18 && < 15", ">= 16"],
      https: true,
      "node:https": [">= 14.18 && < 15", ">= 16"],
      inspector: ">= 8",
      "node:inspector": [">= 14.18 && < 15", ">= 16"],
      _linklist: "< 8",
      module: true,
      "node:module": [">= 14.18 && < 15", ">= 16"],
      net: true,
      "node:net": [">= 14.18 && < 15", ">= 16"],
      "node-inspect/lib/_inspect": ">= 7.6 && < 12",
      "node-inspect/lib/internal/inspect_client": ">= 7.6 && < 12",
      "node-inspect/lib/internal/inspect_repl": ">= 7.6 && < 12",
      os: true,
      "node:os": [">= 14.18 && < 15", ">= 16"],
      path: true,
      "node:path": [">= 14.18 && < 15", ">= 16"],
      "path/posix": ">= 15.3",
      "node:path/posix": ">= 16",
      "path/win32": ">= 15.3",
      "node:path/win32": ">= 16",
      perf_hooks: ">= 8.5",
      "node:perf_hooks": [">= 14.18 && < 15", ">= 16"],
      process: ">= 1",
      "node:process": [">= 14.18 && < 15", ">= 16"],
      punycode: ">= 0.5",
      "node:punycode": [">= 14.18 && < 15", ">= 16"],
      querystring: true,
      "node:querystring": [">= 14.18 && < 15", ">= 16"],
      readline: true,
      "node:readline": [">= 14.18 && < 15", ">= 16"],
      "readline/promises": ">= 17",
      "node:readline/promises": ">= 17",
      repl: true,
      "node:repl": [">= 14.18 && < 15", ">= 16"],
      smalloc: ">= 0.11.5 && < 3",
      _stream_duplex: ">= 0.9.4",
      "node:_stream_duplex": [">= 14.18 && < 15", ">= 16"],
      _stream_transform: ">= 0.9.4",
      "node:_stream_transform": [">= 14.18 && < 15", ">= 16"],
      _stream_wrap: ">= 1.4.1",
      "node:_stream_wrap": [">= 14.18 && < 15", ">= 16"],
      _stream_passthrough: ">= 0.9.4",
      "node:_stream_passthrough": [">= 14.18 && < 15", ">= 16"],
      _stream_readable: ">= 0.9.4",
      "node:_stream_readable": [">= 14.18 && < 15", ">= 16"],
      _stream_writable: ">= 0.9.4",
      "node:_stream_writable": [">= 14.18 && < 15", ">= 16"],
      stream: true,
      "node:stream": [">= 14.18 && < 15", ">= 16"],
      "stream/consumers": ">= 16.7",
      "node:stream/consumers": ">= 16.7",
      "stream/promises": ">= 15",
      "node:stream/promises": ">= 16",
      "stream/web": ">= 16.5",
      "node:stream/web": ">= 16.5",
      string_decoder: true,
      "node:string_decoder": [">= 14.18 && < 15", ">= 16"],
      sys: [">= 0.4 && < 0.7", ">= 0.8"],
      "node:sys": [">= 14.18 && < 15", ">= 16"],
      "node:test": ">= 18",
      timers: true,
      "node:timers": [">= 14.18 && < 15", ">= 16"],
      "timers/promises": ">= 15",
      "node:timers/promises": ">= 16",
      _tls_common: ">= 0.11.13",
      "node:_tls_common": [">= 14.18 && < 15", ">= 16"],
      _tls_legacy: ">= 0.11.3 && < 10",
      _tls_wrap: ">= 0.11.3",
      "node:_tls_wrap": [">= 14.18 && < 15", ">= 16"],
      tls: true,
      "node:tls": [">= 14.18 && < 15", ">= 16"],
      trace_events: ">= 10",
      "node:trace_events": [">= 14.18 && < 15", ">= 16"],
      tty: true,
      "node:tty": [">= 14.18 && < 15", ">= 16"],
      url: true,
      "node:url": [">= 14.18 && < 15", ">= 16"],
      util: true,
      "node:util": [">= 14.18 && < 15", ">= 16"],
      "util/types": ">= 15.3",
      "node:util/types": ">= 16",
      "v8/tools/arguments": ">= 10 && < 12",
      "v8/tools/codemap": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/consarray": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/csvparser": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/logreader": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/profile_view": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/splaytree": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      v8: ">= 1",
      "node:v8": [">= 14.18 && < 15", ">= 16"],
      vm: true,
      "node:vm": [">= 14.18 && < 15", ">= 16"],
      wasi: ">= 13.4 && < 13.5",
      worker_threads: ">= 11.7",
      "node:worker_threads": [">= 14.18 && < 15", ">= 16"],
      zlib: ">= 0.5",
      "node:zlib": [">= 14.18 && < 15", ">= 16"]
    };
  }
});

// node_modules/resolve/lib/core.js
var require_core3 = __commonJS({
  "node_modules/resolve/lib/core.js"(exports, module2) {
    var current = process.versions && process.versions.node && process.versions.node.split(".") || [];
    function specifierIncluded(specifier) {
      var parts = specifier.split(" ");
      var op = parts.length > 1 ? parts[0] : "=";
      var versionParts = (parts.length > 1 ? parts[1] : parts[0]).split(".");
      for (var i = 0; i < 3; ++i) {
        var cur = parseInt(current[i] || 0, 10);
        var ver = parseInt(versionParts[i] || 0, 10);
        if (cur === ver) {
          continue;
        }
        if (op === "<") {
          return cur < ver;
        } else if (op === ">=") {
          return cur >= ver;
        }
        return false;
      }
      return op === ">=";
    }
    function matchesRange(range) {
      var specifiers = range.split(/ ?&& ?/);
      if (specifiers.length === 0) {
        return false;
      }
      for (var i = 0; i < specifiers.length; ++i) {
        if (!specifierIncluded(specifiers[i])) {
          return false;
        }
      }
      return true;
    }
    function versionIncluded(specifierValue) {
      if (typeof specifierValue === "boolean") {
        return specifierValue;
      }
      if (specifierValue && typeof specifierValue === "object") {
        for (var i = 0; i < specifierValue.length; ++i) {
          if (matchesRange(specifierValue[i])) {
            return true;
          }
        }
        return false;
      }
      return matchesRange(specifierValue);
    }
    var data = require_core2();
    var core = {};
    for (mod in data) {
      if (Object.prototype.hasOwnProperty.call(data, mod)) {
        core[mod] = versionIncluded(data[mod]);
      }
    }
    var mod;
    module2.exports = core;
  }
});

// node_modules/resolve/lib/is-core.js
var require_is_core = __commonJS({
  "node_modules/resolve/lib/is-core.js"(exports, module2) {
    var isCoreModule = require_is_core_module();
    module2.exports = function isCore(x2) {
      return isCoreModule(x2);
    };
  }
});

// node_modules/resolve/lib/sync.js
var require_sync = __commonJS({
  "node_modules/resolve/lib/sync.js"(exports, module2) {
    var isCore = require_is_core_module();
    var fs2 = (init_fs(), __toCommonJS(fs_exports));
    var path = (init_path2(), __toCommonJS(path_exports));
    var getHomedir = require_homedir();
    var caller = require_caller();
    var nodeModulesPaths = require_node_modules_paths();
    var normalizeOptions = require_normalize_options();
    var realpathFS = process.platform !== "win32" && fs2.realpathSync && typeof fs2.realpathSync.native === "function" ? fs2.realpathSync.native : fs2.realpathSync;
    var homedir = getHomedir();
    var defaultPaths = function() {
      return [
        path.join(homedir, ".node_modules"),
        path.join(homedir, ".node_libraries")
      ];
    };
    var defaultIsFile = function isFile(file) {
      try {
        var stat3 = fs2.statSync(file, { throwIfNoEntry: false });
      } catch (e) {
        if (e && (e.code === "ENOENT" || e.code === "ENOTDIR"))
          return false;
        throw e;
      }
      return !!stat3 && (stat3.isFile() || stat3.isFIFO());
    };
    var defaultIsDir = function isDirectory2(dir) {
      try {
        var stat3 = fs2.statSync(dir, { throwIfNoEntry: false });
      } catch (e) {
        if (e && (e.code === "ENOENT" || e.code === "ENOTDIR"))
          return false;
        throw e;
      }
      return !!stat3 && stat3.isDirectory();
    };
    var defaultRealpathSync = function realpathSync2(x2) {
      try {
        return realpathFS(x2);
      } catch (realpathErr) {
        if (realpathErr.code !== "ENOENT") {
          throw realpathErr;
        }
      }
      return x2;
    };
    var maybeRealpathSync = function maybeRealpathSync2(realpathSync2, x2, opts) {
      if (opts && opts.preserveSymlinks === false) {
        return realpathSync2(x2);
      }
      return x2;
    };
    var defaultReadPackageSync = function defaultReadPackageSync2(readFileSync2, pkgfile) {
      var body = readFileSync2(pkgfile);
      try {
        var pkg = JSON.parse(body);
        return pkg;
      } catch (jsonErr) {
      }
    };
    var getPackageCandidates = function getPackageCandidates2(x2, start, opts) {
      var dirs = nodeModulesPaths(start, opts, x2);
      for (var i = 0; i < dirs.length; i++) {
        dirs[i] = path.join(dirs[i], x2);
      }
      return dirs;
    };
    module2.exports = function resolveSync(x2, options) {
      if (typeof x2 !== "string") {
        throw new TypeError("Path must be a string.");
      }
      var opts = normalizeOptions(x2, options);
      var isFile = opts.isFile || defaultIsFile;
      var readFileSync2 = opts.readFileSync || fs2.readFileSync;
      var isDirectory2 = opts.isDirectory || defaultIsDir;
      var realpathSync2 = opts.realpathSync || defaultRealpathSync;
      var readPackageSync = opts.readPackageSync || defaultReadPackageSync;
      if (opts.readFileSync && opts.readPackageSync) {
        throw new TypeError("`readFileSync` and `readPackageSync` are mutually exclusive.");
      }
      var packageIterator = opts.packageIterator;
      var extensions = opts.extensions || [".js"];
      var includeCoreModules = opts.includeCoreModules !== false;
      var basedir = opts.basedir || path.dirname(caller());
      var parent = opts.filename || basedir;
      opts.paths = opts.paths || defaultPaths();
      var absoluteStart = maybeRealpathSync(realpathSync2, path.resolve(basedir), opts);
      if (/^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/.test(x2)) {
        var res = path.resolve(absoluteStart, x2);
        if (x2 === "." || x2 === ".." || x2.slice(-1) === "/")
          res += "/";
        var m2 = loadAsFileSync(res) || loadAsDirectorySync(res);
        if (m2)
          return maybeRealpathSync(realpathSync2, m2, opts);
      } else if (includeCoreModules && isCore(x2)) {
        return x2;
      } else {
        var n3 = loadNodeModulesSync(x2, absoluteStart);
        if (n3)
          return maybeRealpathSync(realpathSync2, n3, opts);
      }
      var err = new Error("Cannot find module '" + x2 + "' from '" + parent + "'");
      err.code = "MODULE_NOT_FOUND";
      throw err;
      function loadAsFileSync(x3) {
        var pkg = loadpkg(path.dirname(x3));
        if (pkg && pkg.dir && pkg.pkg && opts.pathFilter) {
          var rfile = path.relative(pkg.dir, x3);
          var r2 = opts.pathFilter(pkg.pkg, x3, rfile);
          if (r2) {
            x3 = path.resolve(pkg.dir, r2);
          }
        }
        if (isFile(x3)) {
          return x3;
        }
        for (var i = 0; i < extensions.length; i++) {
          var file = x3 + extensions[i];
          if (isFile(file)) {
            return file;
          }
        }
      }
      function loadpkg(dir) {
        if (dir === "" || dir === "/")
          return;
        if (process.platform === "win32" && /^\w:[/\\]*$/.test(dir)) {
          return;
        }
        if (/[/\\]node_modules[/\\]*$/.test(dir))
          return;
        var pkgfile = path.join(maybeRealpathSync(realpathSync2, dir, opts), "package.json");
        if (!isFile(pkgfile)) {
          return loadpkg(path.dirname(dir));
        }
        var pkg = readPackageSync(readFileSync2, pkgfile);
        if (pkg && opts.packageFilter) {
          pkg = opts.packageFilter(pkg, dir);
        }
        return { pkg, dir };
      }
      function loadAsDirectorySync(x3) {
        var pkgfile = path.join(maybeRealpathSync(realpathSync2, x3, opts), "/package.json");
        if (isFile(pkgfile)) {
          try {
            var pkg = readPackageSync(readFileSync2, pkgfile);
          } catch (e) {
          }
          if (pkg && opts.packageFilter) {
            pkg = opts.packageFilter(pkg, x3);
          }
          if (pkg && pkg.main) {
            if (typeof pkg.main !== "string") {
              var mainError = new TypeError("package \u201C" + pkg.name + "\u201D `main` must be a string");
              mainError.code = "INVALID_PACKAGE_MAIN";
              throw mainError;
            }
            if (pkg.main === "." || pkg.main === "./") {
              pkg.main = "index";
            }
            try {
              var m3 = loadAsFileSync(path.resolve(x3, pkg.main));
              if (m3)
                return m3;
              var n4 = loadAsDirectorySync(path.resolve(x3, pkg.main));
              if (n4)
                return n4;
            } catch (e) {
            }
          }
        }
        return loadAsFileSync(path.join(x3, "/index"));
      }
      function loadNodeModulesSync(x3, start) {
        var thunk = function() {
          return getPackageCandidates(x3, start, opts);
        };
        var dirs = packageIterator ? packageIterator(x3, start, thunk, opts) : thunk();
        for (var i = 0; i < dirs.length; i++) {
          var dir = dirs[i];
          if (isDirectory2(path.dirname(dir))) {
            var m3 = loadAsFileSync(dir);
            if (m3)
              return m3;
            var n4 = loadAsDirectorySync(dir);
            if (n4)
              return n4;
          }
        }
      }
    };
  }
});

// node_modules/resolve/index.js
var require_resolve = __commonJS({
  "node_modules/resolve/index.js"(exports, module2) {
    var async = require_async();
    async.core = require_core3();
    async.isCore = require_is_core();
    async.sync = require_sync();
    module2.exports = async;
  }
});

// node_modules/picomatch/lib/constants.js
var require_constants = __commonJS({
  "node_modules/picomatch/lib/constants.js"(exports, module2) {
    "use strict";
    var path = (init_path2(), __toCommonJS(path_exports));
    var WIN_SLASH = "\\\\/";
    var WIN_NO_SLASH = `[^${WIN_SLASH}]`;
    var DOT_LITERAL = "\\.";
    var PLUS_LITERAL = "\\+";
    var QMARK_LITERAL = "\\?";
    var SLASH_LITERAL = "\\/";
    var ONE_CHAR = "(?=.)";
    var QMARK = "[^/]";
    var END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
    var START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
    var DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
    var NO_DOT = `(?!${DOT_LITERAL})`;
    var NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
    var NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
    var NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
    var QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
    var STAR = `${QMARK}*?`;
    var POSIX_CHARS = {
      DOT_LITERAL,
      PLUS_LITERAL,
      QMARK_LITERAL,
      SLASH_LITERAL,
      ONE_CHAR,
      QMARK,
      END_ANCHOR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOTS,
      NO_DOT_SLASH,
      NO_DOTS_SLASH,
      QMARK_NO_DOT,
      STAR,
      START_ANCHOR
    };
    var WINDOWS_CHARS = {
      ...POSIX_CHARS,
      SLASH_LITERAL: `[${WIN_SLASH}]`,
      QMARK: WIN_NO_SLASH,
      STAR: `${WIN_NO_SLASH}*?`,
      DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
      NO_DOT: `(?!${DOT_LITERAL})`,
      NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
      NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
      START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
      END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
    };
    var POSIX_REGEX_SOURCE = {
      alnum: "a-zA-Z0-9",
      alpha: "a-zA-Z",
      ascii: "\\x00-\\x7F",
      blank: " \\t",
      cntrl: "\\x00-\\x1F\\x7F",
      digit: "0-9",
      graph: "\\x21-\\x7E",
      lower: "a-z",
      print: "\\x20-\\x7E ",
      punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
      space: " \\t\\r\\n\\v\\f",
      upper: "A-Z",
      word: "A-Za-z0-9_",
      xdigit: "A-Fa-f0-9"
    };
    module2.exports = {
      MAX_LENGTH: 1024 * 64,
      POSIX_REGEX_SOURCE,
      REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
      REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
      REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
      REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
      REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
      REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
      REPLACEMENTS: {
        "***": "*",
        "**/**": "**",
        "**/**/**": "**"
      },
      CHAR_0: 48,
      CHAR_9: 57,
      CHAR_UPPERCASE_A: 65,
      CHAR_LOWERCASE_A: 97,
      CHAR_UPPERCASE_Z: 90,
      CHAR_LOWERCASE_Z: 122,
      CHAR_LEFT_PARENTHESES: 40,
      CHAR_RIGHT_PARENTHESES: 41,
      CHAR_ASTERISK: 42,
      CHAR_AMPERSAND: 38,
      CHAR_AT: 64,
      CHAR_BACKWARD_SLASH: 92,
      CHAR_CARRIAGE_RETURN: 13,
      CHAR_CIRCUMFLEX_ACCENT: 94,
      CHAR_COLON: 58,
      CHAR_COMMA: 44,
      CHAR_DOT: 46,
      CHAR_DOUBLE_QUOTE: 34,
      CHAR_EQUAL: 61,
      CHAR_EXCLAMATION_MARK: 33,
      CHAR_FORM_FEED: 12,
      CHAR_FORWARD_SLASH: 47,
      CHAR_GRAVE_ACCENT: 96,
      CHAR_HASH: 35,
      CHAR_HYPHEN_MINUS: 45,
      CHAR_LEFT_ANGLE_BRACKET: 60,
      CHAR_LEFT_CURLY_BRACE: 123,
      CHAR_LEFT_SQUARE_BRACKET: 91,
      CHAR_LINE_FEED: 10,
      CHAR_NO_BREAK_SPACE: 160,
      CHAR_PERCENT: 37,
      CHAR_PLUS: 43,
      CHAR_QUESTION_MARK: 63,
      CHAR_RIGHT_ANGLE_BRACKET: 62,
      CHAR_RIGHT_CURLY_BRACE: 125,
      CHAR_RIGHT_SQUARE_BRACKET: 93,
      CHAR_SEMICOLON: 59,
      CHAR_SINGLE_QUOTE: 39,
      CHAR_SPACE: 32,
      CHAR_TAB: 9,
      CHAR_UNDERSCORE: 95,
      CHAR_VERTICAL_LINE: 124,
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
      SEP: path.sep,
      extglobChars(chars2) {
        return {
          "!": { type: "negate", open: "(?:(?!(?:", close: `))${chars2.STAR})` },
          "?": { type: "qmark", open: "(?:", close: ")?" },
          "+": { type: "plus", open: "(?:", close: ")+" },
          "*": { type: "star", open: "(?:", close: ")*" },
          "@": { type: "at", open: "(?:", close: ")" }
        };
      },
      globChars(win322) {
        return win322 === true ? WINDOWS_CHARS : POSIX_CHARS;
      }
    };
  }
});

// node_modules/picomatch/lib/utils.js
var require_utils = __commonJS({
  "node_modules/picomatch/lib/utils.js"(exports) {
    "use strict";
    var path = (init_path2(), __toCommonJS(path_exports));
    var win322 = process.platform === "win32";
    var {
      REGEX_BACKSLASH,
      REGEX_REMOVE_BACKSLASH,
      REGEX_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_GLOBAL
    } = require_constants();
    exports.isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    exports.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str);
    exports.isRegexChar = (str) => str.length === 1 && exports.hasRegexChars(str);
    exports.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
    exports.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, "/");
    exports.removeBackslashes = (str) => {
      return str.replace(REGEX_REMOVE_BACKSLASH, (match) => {
        return match === "\\" ? "" : match;
      });
    };
    exports.supportsLookbehinds = () => {
      const segs = process.version.slice(1).split(".").map(Number);
      if (segs.length === 3 && segs[0] >= 9 || segs[0] === 8 && segs[1] >= 10) {
        return true;
      }
      return false;
    };
    exports.isWindows = (options) => {
      if (options && typeof options.windows === "boolean") {
        return options.windows;
      }
      return win322 === true || path.sep === "\\";
    };
    exports.escapeLast = (input, char, lastIdx) => {
      const idx = input.lastIndexOf(char, lastIdx);
      if (idx === -1)
        return input;
      if (input[idx - 1] === "\\")
        return exports.escapeLast(input, char, idx - 1);
      return `${input.slice(0, idx)}\\${input.slice(idx)}`;
    };
    exports.removePrefix = (input, state = {}) => {
      let output = input;
      if (output.startsWith("./")) {
        output = output.slice(2);
        state.prefix = "./";
      }
      return output;
    };
    exports.wrapOutput = (input, state = {}, options = {}) => {
      const prepend = options.contains ? "" : "^";
      const append = options.contains ? "" : "$";
      let output = `${prepend}(?:${input})${append}`;
      if (state.negated === true) {
        output = `(?:^(?!${output}).*$)`;
      }
      return output;
    };
  }
});

// node_modules/picomatch/lib/scan.js
var require_scan = __commonJS({
  "node_modules/picomatch/lib/scan.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var {
      CHAR_ASTERISK,
      CHAR_AT,
      CHAR_BACKWARD_SLASH,
      CHAR_COMMA,
      CHAR_DOT,
      CHAR_EXCLAMATION_MARK,
      CHAR_FORWARD_SLASH,
      CHAR_LEFT_CURLY_BRACE,
      CHAR_LEFT_PARENTHESES,
      CHAR_LEFT_SQUARE_BRACKET,
      CHAR_PLUS,
      CHAR_QUESTION_MARK,
      CHAR_RIGHT_CURLY_BRACE,
      CHAR_RIGHT_PARENTHESES,
      CHAR_RIGHT_SQUARE_BRACKET
    } = require_constants();
    var isPathSeparator = (code) => {
      return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
    };
    var depth = (token) => {
      if (token.isPrefix !== true) {
        token.depth = token.isGlobstar ? Infinity : 1;
      }
    };
    var scan = (input, options) => {
      const opts = options || {};
      const length = input.length - 1;
      const scanToEnd = opts.parts === true || opts.scanToEnd === true;
      const slashes = [];
      const tokens = [];
      const parts = [];
      let str = input;
      let index = -1;
      let start = 0;
      let lastIndex = 0;
      let isBrace = false;
      let isBracket = false;
      let isGlob = false;
      let isExtglob = false;
      let isGlobstar = false;
      let braceEscaped = false;
      let backslashes = false;
      let negated = false;
      let negatedExtglob = false;
      let finished = false;
      let braces = 0;
      let prev;
      let code;
      let token = { value: "", depth: 0, isGlob: false };
      const eos = () => index >= length;
      const peek = () => str.charCodeAt(index + 1);
      const advance = () => {
        prev = code;
        return str.charCodeAt(++index);
      };
      while (index < length) {
        code = advance();
        let next;
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          code = advance();
          if (code === CHAR_LEFT_CURLY_BRACE) {
            braceEscaped = true;
          }
          continue;
        }
        if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
          braces++;
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (code === CHAR_LEFT_CURLY_BRACE) {
              braces++;
              continue;
            }
            if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (braceEscaped !== true && code === CHAR_COMMA) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (code === CHAR_RIGHT_CURLY_BRACE) {
              braces--;
              if (braces === 0) {
                braceEscaped = false;
                isBrace = token.isBrace = true;
                finished = true;
                break;
              }
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_FORWARD_SLASH) {
          slashes.push(index);
          tokens.push(token);
          token = { value: "", depth: 0, isGlob: false };
          if (finished === true)
            continue;
          if (prev === CHAR_DOT && index === start + 1) {
            start += 2;
            continue;
          }
          lastIndex = index + 1;
          continue;
        }
        if (opts.noext !== true) {
          const isExtglobChar = code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK;
          if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
            isGlob = token.isGlob = true;
            isExtglob = token.isExtglob = true;
            finished = true;
            if (code === CHAR_EXCLAMATION_MARK && index === start) {
              negatedExtglob = true;
            }
            if (scanToEnd === true) {
              while (eos() !== true && (code = advance())) {
                if (code === CHAR_BACKWARD_SLASH) {
                  backslashes = token.backslashes = true;
                  code = advance();
                  continue;
                }
                if (code === CHAR_RIGHT_PARENTHESES) {
                  isGlob = token.isGlob = true;
                  finished = true;
                  break;
                }
              }
              continue;
            }
            break;
          }
        }
        if (code === CHAR_ASTERISK) {
          if (prev === CHAR_ASTERISK)
            isGlobstar = token.isGlobstar = true;
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_QUESTION_MARK) {
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_LEFT_SQUARE_BRACKET) {
          while (eos() !== true && (next = advance())) {
            if (next === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              isBracket = token.isBracket = true;
              isGlob = token.isGlob = true;
              finished = true;
              break;
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
          negated = token.negated = true;
          start++;
          continue;
        }
        if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
          isGlob = token.isGlob = true;
          if (scanToEnd === true) {
            while (eos() !== true && (code = advance())) {
              if (code === CHAR_LEFT_PARENTHESES) {
                backslashes = token.backslashes = true;
                code = advance();
                continue;
              }
              if (code === CHAR_RIGHT_PARENTHESES) {
                finished = true;
                break;
              }
            }
            continue;
          }
          break;
        }
        if (isGlob === true) {
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
      }
      if (opts.noext === true) {
        isExtglob = false;
        isGlob = false;
      }
      let base2 = str;
      let prefix = "";
      let glob2 = "";
      if (start > 0) {
        prefix = str.slice(0, start);
        str = str.slice(start);
        lastIndex -= start;
      }
      if (base2 && isGlob === true && lastIndex > 0) {
        base2 = str.slice(0, lastIndex);
        glob2 = str.slice(lastIndex);
      } else if (isGlob === true) {
        base2 = "";
        glob2 = str;
      } else {
        base2 = str;
      }
      if (base2 && base2 !== "" && base2 !== "/" && base2 !== str) {
        if (isPathSeparator(base2.charCodeAt(base2.length - 1))) {
          base2 = base2.slice(0, -1);
        }
      }
      if (opts.unescape === true) {
        if (glob2)
          glob2 = utils.removeBackslashes(glob2);
        if (base2 && backslashes === true) {
          base2 = utils.removeBackslashes(base2);
        }
      }
      const state = {
        prefix,
        input,
        start,
        base: base2,
        glob: glob2,
        isBrace,
        isBracket,
        isGlob,
        isExtglob,
        isGlobstar,
        negated,
        negatedExtglob
      };
      if (opts.tokens === true) {
        state.maxDepth = 0;
        if (!isPathSeparator(code)) {
          tokens.push(token);
        }
        state.tokens = tokens;
      }
      if (opts.parts === true || opts.tokens === true) {
        let prevIndex;
        for (let idx = 0; idx < slashes.length; idx++) {
          const n3 = prevIndex ? prevIndex + 1 : start;
          const i = slashes[idx];
          const value = input.slice(n3, i);
          if (opts.tokens) {
            if (idx === 0 && start !== 0) {
              tokens[idx].isPrefix = true;
              tokens[idx].value = prefix;
            } else {
              tokens[idx].value = value;
            }
            depth(tokens[idx]);
            state.maxDepth += tokens[idx].depth;
          }
          if (idx !== 0 || value !== "") {
            parts.push(value);
          }
          prevIndex = i;
        }
        if (prevIndex && prevIndex + 1 < input.length) {
          const value = input.slice(prevIndex + 1);
          parts.push(value);
          if (opts.tokens) {
            tokens[tokens.length - 1].value = value;
            depth(tokens[tokens.length - 1]);
            state.maxDepth += tokens[tokens.length - 1].depth;
          }
        }
        state.slashes = slashes;
        state.parts = parts;
      }
      return state;
    };
    module2.exports = scan;
  }
});

// node_modules/picomatch/lib/parse.js
var require_parse = __commonJS({
  "node_modules/picomatch/lib/parse.js"(exports, module2) {
    "use strict";
    var constants = require_constants();
    var utils = require_utils();
    var {
      MAX_LENGTH,
      POSIX_REGEX_SOURCE,
      REGEX_NON_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_BACKREF,
      REPLACEMENTS
    } = constants;
    var expandRange = (args, options) => {
      if (typeof options.expandRange === "function") {
        return options.expandRange(...args, options);
      }
      args.sort();
      const value = `[${args.join("-")}]`;
      try {
        new RegExp(value);
      } catch (ex) {
        return args.map((v2) => utils.escapeRegex(v2)).join("..");
      }
      return value;
    };
    var syntaxError = (type2, char) => {
      return `Missing ${type2}: "${char}" - use "\\\\${char}" to match literal characters`;
    };
    var parse3 = (input, options) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected a string");
      }
      input = REPLACEMENTS[input] || input;
      const opts = { ...options };
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      let len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      const bos = { type: "bos", value: "", output: opts.prepend || "" };
      const tokens = [bos];
      const capture = opts.capture ? "" : "?:";
      const win322 = utils.isWindows(options);
      const PLATFORM_CHARS = constants.globChars(win322);
      const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);
      const {
        DOT_LITERAL,
        PLUS_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOT_SLASH,
        NO_DOTS_SLASH,
        QMARK,
        QMARK_NO_DOT,
        STAR,
        START_ANCHOR
      } = PLATFORM_CHARS;
      const globstar = (opts2) => {
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const nodot = opts.dot ? "" : NO_DOT;
      const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
      let star = opts.bash === true ? globstar(opts) : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      if (typeof opts.noext === "boolean") {
        opts.noextglob = opts.noext;
      }
      const state = {
        input,
        index: -1,
        start: 0,
        dot: opts.dot === true,
        consumed: "",
        output: "",
        prefix: "",
        backtrack: false,
        negated: false,
        brackets: 0,
        braces: 0,
        parens: 0,
        quotes: 0,
        globstar: false,
        tokens
      };
      input = utils.removePrefix(input, state);
      len = input.length;
      const extglobs = [];
      const braces = [];
      const stack = [];
      let prev = bos;
      let value;
      const eos = () => state.index === len - 1;
      const peek = state.peek = (n3 = 1) => input[state.index + n3];
      const advance = state.advance = () => input[++state.index] || "";
      const remaining = () => input.slice(state.index + 1);
      const consume = (value2 = "", num = 0) => {
        state.consumed += value2;
        state.index += num;
      };
      const append = (token) => {
        state.output += token.output != null ? token.output : token.value;
        consume(token.value);
      };
      const negate = () => {
        let count = 1;
        while (peek() === "!" && (peek(2) !== "(" || peek(3) === "?")) {
          advance();
          state.start++;
          count++;
        }
        if (count % 2 === 0) {
          return false;
        }
        state.negated = true;
        state.start++;
        return true;
      };
      const increment = (type2) => {
        state[type2]++;
        stack.push(type2);
      };
      const decrement = (type2) => {
        state[type2]--;
        stack.pop();
      };
      const push = (tok) => {
        if (prev.type === "globstar") {
          const isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
          const isExtglob = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
          if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob) {
            state.output = state.output.slice(0, -prev.output.length);
            prev.type = "star";
            prev.value = "*";
            prev.output = star;
            state.output += prev.output;
          }
        }
        if (extglobs.length && tok.type !== "paren") {
          extglobs[extglobs.length - 1].inner += tok.value;
        }
        if (tok.value || tok.output)
          append(tok);
        if (prev && prev.type === "text" && tok.type === "text") {
          prev.value += tok.value;
          prev.output = (prev.output || "") + tok.value;
          return;
        }
        tok.prev = prev;
        tokens.push(tok);
        prev = tok;
      };
      const extglobOpen = (type2, value2) => {
        const token = { ...EXTGLOB_CHARS[value2], conditions: 1, inner: "" };
        token.prev = prev;
        token.parens = state.parens;
        token.output = state.output;
        const output = (opts.capture ? "(" : "") + token.open;
        increment("parens");
        push({ type: type2, value: value2, output: state.output ? "" : ONE_CHAR });
        push({ type: "paren", extglob: true, value: advance(), output });
        extglobs.push(token);
      };
      const extglobClose = (token) => {
        let output = token.close + (opts.capture ? ")" : "");
        let rest;
        if (token.type === "negate") {
          let extglobStar = star;
          if (token.inner && token.inner.length > 1 && token.inner.includes("/")) {
            extglobStar = globstar(opts);
          }
          if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
            output = token.close = `)$))${extglobStar}`;
          }
          if (token.inner.includes("*") && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
            const expression = parse3(rest, { ...options, fastpaths: false }).output;
            output = token.close = `)${expression})${extglobStar})`;
          }
          if (token.prev.type === "bos") {
            state.negatedExtglob = true;
          }
        }
        push({ type: "paren", extglob: true, value, output });
        decrement("parens");
      };
      if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
        let backslashes = false;
        let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m2, esc, chars2, first, rest, index) => {
          if (first === "\\") {
            backslashes = true;
            return m2;
          }
          if (first === "?") {
            if (esc) {
              return esc + first + (rest ? QMARK.repeat(rest.length) : "");
            }
            if (index === 0) {
              return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : "");
            }
            return QMARK.repeat(chars2.length);
          }
          if (first === ".") {
            return DOT_LITERAL.repeat(chars2.length);
          }
          if (first === "*") {
            if (esc) {
              return esc + first + (rest ? star : "");
            }
            return star;
          }
          return esc ? m2 : `\\${m2}`;
        });
        if (backslashes === true) {
          if (opts.unescape === true) {
            output = output.replace(/\\/g, "");
          } else {
            output = output.replace(/\\+/g, (m2) => {
              return m2.length % 2 === 0 ? "\\\\" : m2 ? "\\" : "";
            });
          }
        }
        if (output === input && opts.contains === true) {
          state.output = input;
          return state;
        }
        state.output = utils.wrapOutput(output, state, options);
        return state;
      }
      while (!eos()) {
        value = advance();
        if (value === "\0") {
          continue;
        }
        if (value === "\\") {
          const next = peek();
          if (next === "/" && opts.bash !== true) {
            continue;
          }
          if (next === "." || next === ";") {
            continue;
          }
          if (!next) {
            value += "\\";
            push({ type: "text", value });
            continue;
          }
          const match = /^\\+/.exec(remaining());
          let slashes = 0;
          if (match && match[0].length > 2) {
            slashes = match[0].length;
            state.index += slashes;
            if (slashes % 2 !== 0) {
              value += "\\";
            }
          }
          if (opts.unescape === true) {
            value = advance();
          } else {
            value += advance();
          }
          if (state.brackets === 0) {
            push({ type: "text", value });
            continue;
          }
        }
        if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
          if (opts.posix !== false && value === ":") {
            const inner = prev.value.slice(1);
            if (inner.includes("[")) {
              prev.posix = true;
              if (inner.includes(":")) {
                const idx = prev.value.lastIndexOf("[");
                const pre = prev.value.slice(0, idx);
                const rest2 = prev.value.slice(idx + 2);
                const posix2 = POSIX_REGEX_SOURCE[rest2];
                if (posix2) {
                  prev.value = pre + posix2;
                  state.backtrack = true;
                  advance();
                  if (!bos.output && tokens.indexOf(prev) === 1) {
                    bos.output = ONE_CHAR;
                  }
                  continue;
                }
              }
            }
          }
          if (value === "[" && peek() !== ":" || value === "-" && peek() === "]") {
            value = `\\${value}`;
          }
          if (value === "]" && (prev.value === "[" || prev.value === "[^")) {
            value = `\\${value}`;
          }
          if (opts.posix === true && value === "!" && prev.value === "[") {
            value = "^";
          }
          prev.value += value;
          append({ value });
          continue;
        }
        if (state.quotes === 1 && value !== '"') {
          value = utils.escapeRegex(value);
          prev.value += value;
          append({ value });
          continue;
        }
        if (value === '"') {
          state.quotes = state.quotes === 1 ? 0 : 1;
          if (opts.keepQuotes === true) {
            push({ type: "text", value });
          }
          continue;
        }
        if (value === "(") {
          increment("parens");
          push({ type: "paren", value });
          continue;
        }
        if (value === ")") {
          if (state.parens === 0 && opts.strictBrackets === true) {
            throw new SyntaxError(syntaxError("opening", "("));
          }
          const extglob = extglobs[extglobs.length - 1];
          if (extglob && state.parens === extglob.parens + 1) {
            extglobClose(extglobs.pop());
            continue;
          }
          push({ type: "paren", value, output: state.parens ? ")" : "\\)" });
          decrement("parens");
          continue;
        }
        if (value === "[") {
          if (opts.nobracket === true || !remaining().includes("]")) {
            if (opts.nobracket !== true && opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("closing", "]"));
            }
            value = `\\${value}`;
          } else {
            increment("brackets");
          }
          push({ type: "bracket", value });
          continue;
        }
        if (value === "]") {
          if (opts.nobracket === true || prev && prev.type === "bracket" && prev.value.length === 1) {
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          if (state.brackets === 0) {
            if (opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("opening", "["));
            }
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          decrement("brackets");
          const prevValue = prev.value.slice(1);
          if (prev.posix !== true && prevValue[0] === "^" && !prevValue.includes("/")) {
            value = `/${value}`;
          }
          prev.value += value;
          append({ value });
          if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
            continue;
          }
          const escaped = utils.escapeRegex(prev.value);
          state.output = state.output.slice(0, -prev.value.length);
          if (opts.literalBrackets === true) {
            state.output += escaped;
            prev.value = escaped;
            continue;
          }
          prev.value = `(${capture}${escaped}|${prev.value})`;
          state.output += prev.value;
          continue;
        }
        if (value === "{" && opts.nobrace !== true) {
          increment("braces");
          const open = {
            type: "brace",
            value,
            output: "(",
            outputIndex: state.output.length,
            tokensIndex: state.tokens.length
          };
          braces.push(open);
          push(open);
          continue;
        }
        if (value === "}") {
          const brace = braces[braces.length - 1];
          if (opts.nobrace === true || !brace) {
            push({ type: "text", value, output: value });
            continue;
          }
          let output = ")";
          if (brace.dots === true) {
            const arr = tokens.slice();
            const range = [];
            for (let i = arr.length - 1; i >= 0; i--) {
              tokens.pop();
              if (arr[i].type === "brace") {
                break;
              }
              if (arr[i].type !== "dots") {
                range.unshift(arr[i].value);
              }
            }
            output = expandRange(range, opts);
            state.backtrack = true;
          }
          if (brace.comma !== true && brace.dots !== true) {
            const out = state.output.slice(0, brace.outputIndex);
            const toks = state.tokens.slice(brace.tokensIndex);
            brace.value = brace.output = "\\{";
            value = output = "\\}";
            state.output = out;
            for (const t of toks) {
              state.output += t.output || t.value;
            }
          }
          push({ type: "brace", value, output });
          decrement("braces");
          braces.pop();
          continue;
        }
        if (value === "|") {
          if (extglobs.length > 0) {
            extglobs[extglobs.length - 1].conditions++;
          }
          push({ type: "text", value });
          continue;
        }
        if (value === ",") {
          let output = value;
          const brace = braces[braces.length - 1];
          if (brace && stack[stack.length - 1] === "braces") {
            brace.comma = true;
            output = "|";
          }
          push({ type: "comma", value, output });
          continue;
        }
        if (value === "/") {
          if (prev.type === "dot" && state.index === state.start + 1) {
            state.start = state.index + 1;
            state.consumed = "";
            state.output = "";
            tokens.pop();
            prev = bos;
            continue;
          }
          push({ type: "slash", value, output: SLASH_LITERAL });
          continue;
        }
        if (value === ".") {
          if (state.braces > 0 && prev.type === "dot") {
            if (prev.value === ".")
              prev.output = DOT_LITERAL;
            const brace = braces[braces.length - 1];
            prev.type = "dots";
            prev.output += value;
            prev.value += value;
            brace.dots = true;
            continue;
          }
          if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
            push({ type: "text", value, output: DOT_LITERAL });
            continue;
          }
          push({ type: "dot", value, output: DOT_LITERAL });
          continue;
        }
        if (value === "?") {
          const isGroup = prev && prev.value === "(";
          if (!isGroup && opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("qmark", value);
            continue;
          }
          if (prev && prev.type === "paren") {
            const next = peek();
            let output = value;
            if (next === "<" && !utils.supportsLookbehinds()) {
              throw new Error("Node.js v10 or higher is required for regex lookbehinds");
            }
            if (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) {
              output = `\\${value}`;
            }
            push({ type: "text", value, output });
            continue;
          }
          if (opts.dot !== true && (prev.type === "slash" || prev.type === "bos")) {
            push({ type: "qmark", value, output: QMARK_NO_DOT });
            continue;
          }
          push({ type: "qmark", value, output: QMARK });
          continue;
        }
        if (value === "!") {
          if (opts.noextglob !== true && peek() === "(") {
            if (peek(2) !== "?" || !/[!=<:]/.test(peek(3))) {
              extglobOpen("negate", value);
              continue;
            }
          }
          if (opts.nonegate !== true && state.index === 0) {
            negate();
            continue;
          }
        }
        if (value === "+") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("plus", value);
            continue;
          }
          if (prev && prev.value === "(" || opts.regex === false) {
            push({ type: "plus", value, output: PLUS_LITERAL });
            continue;
          }
          if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
            push({ type: "plus", value });
            continue;
          }
          push({ type: "plus", value: PLUS_LITERAL });
          continue;
        }
        if (value === "@") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            push({ type: "at", extglob: true, value, output: "" });
            continue;
          }
          push({ type: "text", value });
          continue;
        }
        if (value !== "*") {
          if (value === "$" || value === "^") {
            value = `\\${value}`;
          }
          const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
          if (match) {
            value += match[0];
            state.index += match[0].length;
          }
          push({ type: "text", value });
          continue;
        }
        if (prev && (prev.type === "globstar" || prev.star === true)) {
          prev.type = "star";
          prev.star = true;
          prev.value += value;
          prev.output = star;
          state.backtrack = true;
          state.globstar = true;
          consume(value);
          continue;
        }
        let rest = remaining();
        if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
          extglobOpen("star", value);
          continue;
        }
        if (prev.type === "star") {
          if (opts.noglobstar === true) {
            consume(value);
            continue;
          }
          const prior = prev.prev;
          const before = prior.prev;
          const isStart = prior.type === "slash" || prior.type === "bos";
          const afterStar = before && (before.type === "star" || before.type === "globstar");
          if (opts.bash === true && (!isStart || rest[0] && rest[0] !== "/")) {
            push({ type: "star", value, output: "" });
            continue;
          }
          const isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace");
          const isExtglob = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
          if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob) {
            push({ type: "star", value, output: "" });
            continue;
          }
          while (rest.slice(0, 3) === "/**") {
            const after = input[state.index + 4];
            if (after && after !== "/") {
              break;
            }
            rest = rest.slice(3);
            consume("/**", 3);
          }
          if (prior.type === "bos" && eos()) {
            prev.type = "globstar";
            prev.value += value;
            prev.output = globstar(opts);
            state.output = prev.output;
            state.globstar = true;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && eos()) {
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)");
            prev.value += value;
            state.globstar = true;
            state.output += prior.output + prev.output;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
            const end = rest[1] !== void 0 ? "|$" : "";
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
            prev.value += value;
            state.output += prior.output + prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          if (prior.type === "bos" && rest[0] === "/") {
            prev.type = "globstar";
            prev.value += value;
            prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
            state.output = prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          state.output = state.output.slice(0, -prev.output.length);
          prev.type = "globstar";
          prev.output = globstar(opts);
          prev.value += value;
          state.output += prev.output;
          state.globstar = true;
          consume(value);
          continue;
        }
        const token = { type: "star", value, output: star };
        if (opts.bash === true) {
          token.output = ".*?";
          if (prev.type === "bos" || prev.type === "slash") {
            token.output = nodot + token.output;
          }
          push(token);
          continue;
        }
        if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === true) {
          token.output = value;
          push(token);
          continue;
        }
        if (state.index === state.start || prev.type === "slash" || prev.type === "dot") {
          if (prev.type === "dot") {
            state.output += NO_DOT_SLASH;
            prev.output += NO_DOT_SLASH;
          } else if (opts.dot === true) {
            state.output += NO_DOTS_SLASH;
            prev.output += NO_DOTS_SLASH;
          } else {
            state.output += nodot;
            prev.output += nodot;
          }
          if (peek() !== "*") {
            state.output += ONE_CHAR;
            prev.output += ONE_CHAR;
          }
        }
        push(token);
      }
      while (state.brackets > 0) {
        if (opts.strictBrackets === true)
          throw new SyntaxError(syntaxError("closing", "]"));
        state.output = utils.escapeLast(state.output, "[");
        decrement("brackets");
      }
      while (state.parens > 0) {
        if (opts.strictBrackets === true)
          throw new SyntaxError(syntaxError("closing", ")"));
        state.output = utils.escapeLast(state.output, "(");
        decrement("parens");
      }
      while (state.braces > 0) {
        if (opts.strictBrackets === true)
          throw new SyntaxError(syntaxError("closing", "}"));
        state.output = utils.escapeLast(state.output, "{");
        decrement("braces");
      }
      if (opts.strictSlashes !== true && (prev.type === "star" || prev.type === "bracket")) {
        push({ type: "maybe_slash", value: "", output: `${SLASH_LITERAL}?` });
      }
      if (state.backtrack === true) {
        state.output = "";
        for (const token of state.tokens) {
          state.output += token.output != null ? token.output : token.value;
          if (token.suffix) {
            state.output += token.suffix;
          }
        }
      }
      return state;
    };
    parse3.fastpaths = (input, options) => {
      const opts = { ...options };
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      const len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      input = REPLACEMENTS[input] || input;
      const win322 = utils.isWindows(options);
      const {
        DOT_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOTS,
        NO_DOTS_SLASH,
        STAR,
        START_ANCHOR
      } = constants.globChars(win322);
      const nodot = opts.dot ? NO_DOTS : NO_DOT;
      const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
      const capture = opts.capture ? "" : "?:";
      const state = { negated: false, prefix: "" };
      let star = opts.bash === true ? ".*?" : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      const globstar = (opts2) => {
        if (opts2.noglobstar === true)
          return star;
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const create = (str) => {
        switch (str) {
          case "*":
            return `${nodot}${ONE_CHAR}${star}`;
          case ".*":
            return `${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*.*":
            return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*/*":
            return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;
          case "**":
            return nodot + globstar(opts);
          case "**/*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;
          case "**/*.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "**/.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;
          default: {
            const match = /^(.*?)\.(\w+)$/.exec(str);
            if (!match)
              return;
            const source2 = create(match[1]);
            if (!source2)
              return;
            return source2 + DOT_LITERAL + match[2];
          }
        }
      };
      const output = utils.removePrefix(input, state);
      let source = create(output);
      if (source && opts.strictSlashes !== true) {
        source += `${SLASH_LITERAL}?`;
      }
      return source;
    };
    module2.exports = parse3;
  }
});

// node_modules/picomatch/lib/picomatch.js
var require_picomatch = __commonJS({
  "node_modules/picomatch/lib/picomatch.js"(exports, module2) {
    "use strict";
    var path = (init_path2(), __toCommonJS(path_exports));
    var scan = require_scan();
    var parse3 = require_parse();
    var utils = require_utils();
    var constants = require_constants();
    var isObject3 = (val) => val && typeof val === "object" && !Array.isArray(val);
    var picomatch = (glob2, options, returnState = false) => {
      if (Array.isArray(glob2)) {
        const fns = glob2.map((input) => picomatch(input, options, returnState));
        const arrayMatcher = (str) => {
          for (const isMatch of fns) {
            const state2 = isMatch(str);
            if (state2)
              return state2;
          }
          return false;
        };
        return arrayMatcher;
      }
      const isState = isObject3(glob2) && glob2.tokens && glob2.input;
      if (glob2 === "" || typeof glob2 !== "string" && !isState) {
        throw new TypeError("Expected pattern to be a non-empty string");
      }
      const opts = options || {};
      const posix2 = utils.isWindows(options);
      const regex2 = isState ? picomatch.compileRe(glob2, options) : picomatch.makeRe(glob2, options, false, true);
      const state = regex2.state;
      delete regex2.state;
      let isIgnored = () => false;
      if (opts.ignore) {
        const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
        isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
      }
      const matcher = (input, returnObject = false) => {
        const { isMatch, match, output } = picomatch.test(input, regex2, options, { glob: glob2, posix: posix2 });
        const result = { glob: glob2, state, regex: regex2, posix: posix2, input, output, match, isMatch };
        if (typeof opts.onResult === "function") {
          opts.onResult(result);
        }
        if (isMatch === false) {
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (isIgnored(input)) {
          if (typeof opts.onIgnore === "function") {
            opts.onIgnore(result);
          }
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (typeof opts.onMatch === "function") {
          opts.onMatch(result);
        }
        return returnObject ? result : true;
      };
      if (returnState) {
        matcher.state = state;
      }
      return matcher;
    };
    picomatch.test = (input, regex2, options, { glob: glob2, posix: posix2 } = {}) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected input to be a string");
      }
      if (input === "") {
        return { isMatch: false, output: "" };
      }
      const opts = options || {};
      const format3 = opts.format || (posix2 ? utils.toPosixSlashes : null);
      let match = input === glob2;
      let output = match && format3 ? format3(input) : input;
      if (match === false) {
        output = format3 ? format3(input) : input;
        match = output === glob2;
      }
      if (match === false || opts.capture === true) {
        if (opts.matchBase === true || opts.basename === true) {
          match = picomatch.matchBase(input, regex2, options, posix2);
        } else {
          match = regex2.exec(output);
        }
      }
      return { isMatch: Boolean(match), match, output };
    };
    picomatch.matchBase = (input, glob2, options, posix2 = utils.isWindows(options)) => {
      const regex2 = glob2 instanceof RegExp ? glob2 : picomatch.makeRe(glob2, options);
      return regex2.test(path.basename(input));
    };
    picomatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);
    picomatch.parse = (pattern, options) => {
      if (Array.isArray(pattern))
        return pattern.map((p2) => picomatch.parse(p2, options));
      return parse3(pattern, { ...options, fastpaths: false });
    };
    picomatch.scan = (input, options) => scan(input, options);
    picomatch.compileRe = (state, options, returnOutput = false, returnState = false) => {
      if (returnOutput === true) {
        return state.output;
      }
      const opts = options || {};
      const prepend = opts.contains ? "" : "^";
      const append = opts.contains ? "" : "$";
      let source = `${prepend}(?:${state.output})${append}`;
      if (state && state.negated === true) {
        source = `^(?!${source}).*$`;
      }
      const regex2 = picomatch.toRegex(source, options);
      if (returnState === true) {
        regex2.state = state;
      }
      return regex2;
    };
    picomatch.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
      if (!input || typeof input !== "string") {
        throw new TypeError("Expected a non-empty string");
      }
      let parsed = { negated: false, fastpaths: true };
      if (options.fastpaths !== false && (input[0] === "." || input[0] === "*")) {
        parsed.output = parse3.fastpaths(input, options);
      }
      if (!parsed.output) {
        parsed = parse3(input, options);
      }
      return picomatch.compileRe(parsed, options, returnOutput, returnState);
    };
    picomatch.toRegex = (source, options) => {
      try {
        const opts = options || {};
        return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
      } catch (err) {
        if (options && options.debug === true)
          throw err;
        return /$^/;
      }
    };
    picomatch.constants = constants;
    module2.exports = picomatch;
  }
});

// node_modules/picomatch/index.js
var require_picomatch2 = __commonJS({
  "node_modules/picomatch/index.js"(exports, module2) {
    "use strict";
    module2.exports = require_picomatch();
  }
});

// node_modules/commondir/index.js
var require_commondir = __commonJS({
  "node_modules/commondir/index.js"(exports, module2) {
    var path = (init_path2(), __toCommonJS(path_exports));
    module2.exports = function(basedir, relfiles) {
      if (relfiles) {
        var files = relfiles.map(function(r2) {
          return path.resolve(basedir, r2);
        });
      } else {
        var files = basedir;
      }
      var res = files.slice(1).reduce(function(ps2, file) {
        if (!file.match(/^([A-Za-z]:)?\/|\\/)) {
          throw new Error("relative path without a basedir");
        }
        var xs2 = file.split(/\/+|\\+/);
        for (var i = 0; ps2[i] === xs2[i] && i < Math.min(ps2.length, xs2.length); i++)
          ;
        return ps2.slice(0, i);
      }, files[0].split(/\/+|\\+/));
      return res.length > 1 ? res.join("/") : "/";
    };
  }
});

// node_modules/fs.realpath/old.js
var require_old = __commonJS({
  "node_modules/fs.realpath/old.js"(exports) {
    var pathModule = (init_path2(), __toCommonJS(path_exports));
    var isWindows = process.platform === "win32";
    var fs2 = (init_fs(), __toCommonJS(fs_exports));
    var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);
    function rethrow() {
      var callback;
      if (DEBUG) {
        var backtrace = new Error();
        callback = debugCallback;
      } else
        callback = missingCallback;
      return callback;
      function debugCallback(err) {
        if (err) {
          backtrace.message = err.message;
          err = backtrace;
          missingCallback(err);
        }
      }
      function missingCallback(err) {
        if (err) {
          if (process.throwDeprecation)
            throw err;
          else if (!process.noDeprecation) {
            var msg = "fs: missing callback " + (err.stack || err.message);
            if (process.traceDeprecation)
              console.trace(msg);
            else
              console.error(msg);
          }
        }
      }
    }
    function maybeCallback(cb) {
      return typeof cb === "function" ? cb : rethrow();
    }
    var normalize3 = pathModule.normalize;
    if (isWindows) {
      nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
    } else {
      nextPartRe = /(.*?)(?:[\/]+|$)/g;
    }
    var nextPartRe;
    if (isWindows) {
      splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
    } else {
      splitRootRe = /^[\/]*/;
    }
    var splitRootRe;
    exports.realpathSync = function realpathSync2(p2, cache) {
      p2 = pathModule.resolve(p2);
      if (cache && Object.prototype.hasOwnProperty.call(cache, p2)) {
        return cache[p2];
      }
      var original = p2, seenLinks = {}, knownHard = {};
      var pos;
      var current;
      var base2;
      var previous;
      start();
      function start() {
        var m2 = splitRootRe.exec(p2);
        pos = m2[0].length;
        current = m2[0];
        base2 = m2[0];
        previous = "";
        if (isWindows && !knownHard[base2]) {
          fs2.lstatSync(base2);
          knownHard[base2] = true;
        }
      }
      while (pos < p2.length) {
        nextPartRe.lastIndex = pos;
        var result = nextPartRe.exec(p2);
        previous = current;
        current += result[0];
        base2 = previous + result[1];
        pos = nextPartRe.lastIndex;
        if (knownHard[base2] || cache && cache[base2] === base2) {
          continue;
        }
        var resolvedLink;
        if (cache && Object.prototype.hasOwnProperty.call(cache, base2)) {
          resolvedLink = cache[base2];
        } else {
          var stat3 = fs2.lstatSync(base2);
          if (!stat3.isSymbolicLink()) {
            knownHard[base2] = true;
            if (cache)
              cache[base2] = base2;
            continue;
          }
          var linkTarget = null;
          if (!isWindows) {
            var id = stat3.dev.toString(32) + ":" + stat3.ino.toString(32);
            if (seenLinks.hasOwnProperty(id)) {
              linkTarget = seenLinks[id];
            }
          }
          if (linkTarget === null) {
            fs2.statSync(base2);
            linkTarget = fs2.readlinkSync(base2);
          }
          resolvedLink = pathModule.resolve(previous, linkTarget);
          if (cache)
            cache[base2] = resolvedLink;
          if (!isWindows)
            seenLinks[id] = linkTarget;
        }
        p2 = pathModule.resolve(resolvedLink, p2.slice(pos));
        start();
      }
      if (cache)
        cache[original] = p2;
      return p2;
    };
    exports.realpath = function realpath3(p2, cache, cb) {
      if (typeof cb !== "function") {
        cb = maybeCallback(cache);
        cache = null;
      }
      p2 = pathModule.resolve(p2);
      if (cache && Object.prototype.hasOwnProperty.call(cache, p2)) {
        return process.nextTick(cb.bind(null, null, cache[p2]));
      }
      var original = p2, seenLinks = {}, knownHard = {};
      var pos;
      var current;
      var base2;
      var previous;
      start();
      function start() {
        var m2 = splitRootRe.exec(p2);
        pos = m2[0].length;
        current = m2[0];
        base2 = m2[0];
        previous = "";
        if (isWindows && !knownHard[base2]) {
          fs2.lstat(base2, function(err) {
            if (err)
              return cb(err);
            knownHard[base2] = true;
            LOOP();
          });
        } else {
          process.nextTick(LOOP);
        }
      }
      function LOOP() {
        if (pos >= p2.length) {
          if (cache)
            cache[original] = p2;
          return cb(null, p2);
        }
        nextPartRe.lastIndex = pos;
        var result = nextPartRe.exec(p2);
        previous = current;
        current += result[0];
        base2 = previous + result[1];
        pos = nextPartRe.lastIndex;
        if (knownHard[base2] || cache && cache[base2] === base2) {
          return process.nextTick(LOOP);
        }
        if (cache && Object.prototype.hasOwnProperty.call(cache, base2)) {
          return gotResolvedLink(cache[base2]);
        }
        return fs2.lstat(base2, gotStat);
      }
      function gotStat(err, stat3) {
        if (err)
          return cb(err);
        if (!stat3.isSymbolicLink()) {
          knownHard[base2] = true;
          if (cache)
            cache[base2] = base2;
          return process.nextTick(LOOP);
        }
        if (!isWindows) {
          var id = stat3.dev.toString(32) + ":" + stat3.ino.toString(32);
          if (seenLinks.hasOwnProperty(id)) {
            return gotTarget(null, seenLinks[id], base2);
          }
        }
        fs2.stat(base2, function(err2) {
          if (err2)
            return cb(err2);
          fs2.readlink(base2, function(err3, target) {
            if (!isWindows)
              seenLinks[id] = target;
            gotTarget(err3, target);
          });
        });
      }
      function gotTarget(err, target, base3) {
        if (err)
          return cb(err);
        var resolvedLink = pathModule.resolve(previous, target);
        if (cache)
          cache[base3] = resolvedLink;
        gotResolvedLink(resolvedLink);
      }
      function gotResolvedLink(resolvedLink) {
        p2 = pathModule.resolve(resolvedLink, p2.slice(pos));
        start();
      }
    };
  }
});

// node_modules/fs.realpath/index.js
var require_fs = __commonJS({
  "node_modules/fs.realpath/index.js"(exports, module2) {
    module2.exports = realpath3;
    realpath3.realpath = realpath3;
    realpath3.sync = realpathSync2;
    realpath3.realpathSync = realpathSync2;
    realpath3.monkeypatch = monkeypatch;
    realpath3.unmonkeypatch = unmonkeypatch;
    var fs2 = (init_fs(), __toCommonJS(fs_exports));
    var origRealpath = fs2.realpath;
    var origRealpathSync = fs2.realpathSync;
    var version4 = process.version;
    var ok2 = /^v[0-5]\./.test(version4);
    var old = require_old();
    function newError(er2) {
      return er2 && er2.syscall === "realpath" && (er2.code === "ELOOP" || er2.code === "ENOMEM" || er2.code === "ENAMETOOLONG");
    }
    function realpath3(p2, cache, cb) {
      if (ok2) {
        return origRealpath(p2, cache, cb);
      }
      if (typeof cache === "function") {
        cb = cache;
        cache = null;
      }
      origRealpath(p2, cache, function(er2, result) {
        if (newError(er2)) {
          old.realpath(p2, cache, cb);
        } else {
          cb(er2, result);
        }
      });
    }
    function realpathSync2(p2, cache) {
      if (ok2) {
        return origRealpathSync(p2, cache);
      }
      try {
        return origRealpathSync(p2, cache);
      } catch (er2) {
        if (newError(er2)) {
          return old.realpathSync(p2, cache);
        } else {
          throw er2;
        }
      }
    }
    function monkeypatch() {
      fs2.realpath = realpath3;
      fs2.realpathSync = realpathSync2;
    }
    function unmonkeypatch() {
      fs2.realpath = origRealpath;
      fs2.realpathSync = origRealpathSync;
    }
  }
});

// node_modules/@rollup/plugin-commonjs/node_modules/minimatch/lib/path.js
var require_path = __commonJS({
  "node_modules/@rollup/plugin-commonjs/node_modules/minimatch/lib/path.js"(exports, module2) {
    var isWindows = typeof process === "object" && process && process.platform === "win32";
    module2.exports = isWindows ? { sep: "\\" } : { sep: "/" };
  }
});

// node_modules/balanced-match/index.js
var require_balanced_match = __commonJS({
  "node_modules/balanced-match/index.js"(exports, module2) {
    "use strict";
    module2.exports = balanced;
    function balanced(a2, b2, str) {
      if (a2 instanceof RegExp)
        a2 = maybeMatch(a2, str);
      if (b2 instanceof RegExp)
        b2 = maybeMatch(b2, str);
      var r2 = range(a2, b2, str);
      return r2 && {
        start: r2[0],
        end: r2[1],
        pre: str.slice(0, r2[0]),
        body: str.slice(r2[0] + a2.length, r2[1]),
        post: str.slice(r2[1] + b2.length)
      };
    }
    function maybeMatch(reg, str) {
      var m2 = str.match(reg);
      return m2 ? m2[0] : null;
    }
    balanced.range = range;
    function range(a2, b2, str) {
      var begs, beg, left, right, result;
      var ai2 = str.indexOf(a2);
      var bi2 = str.indexOf(b2, ai2 + 1);
      var i = ai2;
      if (ai2 >= 0 && bi2 > 0) {
        if (a2 === b2) {
          return [ai2, bi2];
        }
        begs = [];
        left = str.length;
        while (i >= 0 && !result) {
          if (i == ai2) {
            begs.push(i);
            ai2 = str.indexOf(a2, i + 1);
          } else if (begs.length == 1) {
            result = [begs.pop(), bi2];
          } else {
            beg = begs.pop();
            if (beg < left) {
              left = beg;
              right = bi2;
            }
            bi2 = str.indexOf(b2, i + 1);
          }
          i = ai2 < bi2 && ai2 >= 0 ? ai2 : bi2;
        }
        if (begs.length) {
          result = [left, right];
        }
      }
      return result;
    }
  }
});

// node_modules/@rollup/plugin-commonjs/node_modules/brace-expansion/index.js
var require_brace_expansion = __commonJS({
  "node_modules/@rollup/plugin-commonjs/node_modules/brace-expansion/index.js"(exports, module2) {
    var balanced = require_balanced_match();
    module2.exports = expandTop;
    var escSlash = "\0SLASH" + Math.random() + "\0";
    var escOpen = "\0OPEN" + Math.random() + "\0";
    var escClose = "\0CLOSE" + Math.random() + "\0";
    var escComma = "\0COMMA" + Math.random() + "\0";
    var escPeriod = "\0PERIOD" + Math.random() + "\0";
    function numeric(str) {
      return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
    }
    function escapeBraces(str) {
      return str.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod);
    }
    function unescapeBraces(str) {
      return str.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".");
    }
    function parseCommaParts(str) {
      if (!str)
        return [""];
      var parts = [];
      var m2 = balanced("{", "}", str);
      if (!m2)
        return str.split(",");
      var pre = m2.pre;
      var body = m2.body;
      var post = m2.post;
      var p2 = pre.split(",");
      p2[p2.length - 1] += "{" + body + "}";
      var postParts = parseCommaParts(post);
      if (post.length) {
        p2[p2.length - 1] += postParts.shift();
        p2.push.apply(p2, postParts);
      }
      parts.push.apply(parts, p2);
      return parts;
    }
    function expandTop(str) {
      if (!str)
        return [];
      if (str.substr(0, 2) === "{}") {
        str = "\\{\\}" + str.substr(2);
      }
      return expand(escapeBraces(str), true).map(unescapeBraces);
    }
    function embrace(str) {
      return "{" + str + "}";
    }
    function isPadded(el2) {
      return /^-?0\d/.test(el2);
    }
    function lte(i, y2) {
      return i <= y2;
    }
    function gte(i, y2) {
      return i >= y2;
    }
    function expand(str, isTop) {
      var expansions = [];
      var m2 = balanced("{", "}", str);
      if (!m2)
        return [str];
      var pre = m2.pre;
      var post = m2.post.length ? expand(m2.post, false) : [""];
      if (/\$$/.test(m2.pre)) {
        for (var k2 = 0; k2 < post.length; k2++) {
          var expansion = pre + "{" + m2.body + "}" + post[k2];
          expansions.push(expansion);
        }
      } else {
        var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m2.body);
        var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m2.body);
        var isSequence = isNumericSequence || isAlphaSequence;
        var isOptions = m2.body.indexOf(",") >= 0;
        if (!isSequence && !isOptions) {
          if (m2.post.match(/,.*\}/)) {
            str = m2.pre + "{" + m2.body + escClose + m2.post;
            return expand(str);
          }
          return [str];
        }
        var n3;
        if (isSequence) {
          n3 = m2.body.split(/\.\./);
        } else {
          n3 = parseCommaParts(m2.body);
          if (n3.length === 1) {
            n3 = expand(n3[0], false).map(embrace);
            if (n3.length === 1) {
              return post.map(function(p2) {
                return m2.pre + n3[0] + p2;
              });
            }
          }
        }
        var N2;
        if (isSequence) {
          var x2 = numeric(n3[0]);
          var y2 = numeric(n3[1]);
          var width = Math.max(n3[0].length, n3[1].length);
          var incr = n3.length == 3 ? Math.abs(numeric(n3[2])) : 1;
          var test = lte;
          var reverse = y2 < x2;
          if (reverse) {
            incr *= -1;
            test = gte;
          }
          var pad2 = n3.some(isPadded);
          N2 = [];
          for (var i = x2; test(i, y2); i += incr) {
            var c2;
            if (isAlphaSequence) {
              c2 = String.fromCharCode(i);
              if (c2 === "\\")
                c2 = "";
            } else {
              c2 = String(i);
              if (pad2) {
                var need = width - c2.length;
                if (need > 0) {
                  var z2 = new Array(need + 1).join("0");
                  if (i < 0)
                    c2 = "-" + z2 + c2.slice(1);
                  else
                    c2 = z2 + c2;
                }
              }
            }
            N2.push(c2);
          }
        } else {
          N2 = [];
          for (var j2 = 0; j2 < n3.length; j2++) {
            N2.push.apply(N2, expand(n3[j2], false));
          }
        }
        for (var j2 = 0; j2 < N2.length; j2++) {
          for (var k2 = 0; k2 < post.length; k2++) {
            var expansion = pre + N2[j2] + post[k2];
            if (!isTop || isSequence || expansion)
              expansions.push(expansion);
          }
        }
      }
      return expansions;
    }
  }
});

// node_modules/@rollup/plugin-commonjs/node_modules/minimatch/minimatch.js
var require_minimatch = __commonJS({
  "node_modules/@rollup/plugin-commonjs/node_modules/minimatch/minimatch.js"(exports, module2) {
    var minimatch = module2.exports = (p2, pattern, options = {}) => {
      assertValidPattern(pattern);
      if (!options.nocomment && pattern.charAt(0) === "#") {
        return false;
      }
      return new Minimatch(pattern, options).match(p2);
    };
    module2.exports = minimatch;
    var path = require_path();
    minimatch.sep = path.sep;
    var GLOBSTAR = Symbol("globstar **");
    minimatch.GLOBSTAR = GLOBSTAR;
    var expand = require_brace_expansion();
    var plTypes = {
      "!": { open: "(?:(?!(?:", close: "))[^/]*?)" },
      "?": { open: "(?:", close: ")?" },
      "+": { open: "(?:", close: ")+" },
      "*": { open: "(?:", close: ")*" },
      "@": { open: "(?:", close: ")" }
    };
    var qmark = "[^/]";
    var star = qmark + "*?";
    var twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
    var twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
    var charSet = (s) => s.split("").reduce((set, c2) => {
      set[c2] = true;
      return set;
    }, {});
    var reSpecials = charSet("().*{}+?[]^$\\!");
    var addPatternStartSet = charSet("[.(");
    var slashSplit = /\/+/;
    minimatch.filter = (pattern, options = {}) => (p2, i, list) => minimatch(p2, pattern, options);
    var ext = (a2, b2 = {}) => {
      const t = {};
      Object.keys(a2).forEach((k2) => t[k2] = a2[k2]);
      Object.keys(b2).forEach((k2) => t[k2] = b2[k2]);
      return t;
    };
    minimatch.defaults = (def) => {
      if (!def || typeof def !== "object" || !Object.keys(def).length) {
        return minimatch;
      }
      const orig = minimatch;
      const m2 = (p2, pattern, options) => orig(p2, pattern, ext(def, options));
      m2.Minimatch = class Minimatch extends orig.Minimatch {
        constructor(pattern, options) {
          super(pattern, ext(def, options));
        }
      };
      m2.Minimatch.defaults = (options) => orig.defaults(ext(def, options)).Minimatch;
      m2.filter = (pattern, options) => orig.filter(pattern, ext(def, options));
      m2.defaults = (options) => orig.defaults(ext(def, options));
      m2.makeRe = (pattern, options) => orig.makeRe(pattern, ext(def, options));
      m2.braceExpand = (pattern, options) => orig.braceExpand(pattern, ext(def, options));
      m2.match = (list, pattern, options) => orig.match(list, pattern, ext(def, options));
      return m2;
    };
    minimatch.braceExpand = (pattern, options) => braceExpand(pattern, options);
    var braceExpand = (pattern, options = {}) => {
      assertValidPattern(pattern);
      if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) {
        return [pattern];
      }
      return expand(pattern);
    };
    var MAX_PATTERN_LENGTH = 1024 * 64;
    var assertValidPattern = (pattern) => {
      if (typeof pattern !== "string") {
        throw new TypeError("invalid pattern");
      }
      if (pattern.length > MAX_PATTERN_LENGTH) {
        throw new TypeError("pattern is too long");
      }
    };
    var SUBPARSE = Symbol("subparse");
    minimatch.makeRe = (pattern, options) => new Minimatch(pattern, options || {}).makeRe();
    minimatch.match = (list, pattern, options = {}) => {
      const mm = new Minimatch(pattern, options);
      list = list.filter((f2) => mm.match(f2));
      if (mm.options.nonull && !list.length) {
        list.push(pattern);
      }
      return list;
    };
    var globUnescape = (s) => s.replace(/\\(.)/g, "$1");
    var regExpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    var Minimatch = class {
      constructor(pattern, options) {
        assertValidPattern(pattern);
        if (!options)
          options = {};
        this.options = options;
        this.set = [];
        this.pattern = pattern;
        this.windowsPathsNoEscape = !!options.windowsPathsNoEscape || options.allowWindowsEscape === false;
        if (this.windowsPathsNoEscape) {
          this.pattern = this.pattern.replace(/\\/g, "/");
        }
        this.regexp = null;
        this.negate = false;
        this.comment = false;
        this.empty = false;
        this.partial = !!options.partial;
        this.make();
      }
      debug() {
      }
      make() {
        const pattern = this.pattern;
        const options = this.options;
        if (!options.nocomment && pattern.charAt(0) === "#") {
          this.comment = true;
          return;
        }
        if (!pattern) {
          this.empty = true;
          return;
        }
        this.parseNegate();
        let set = this.globSet = this.braceExpand();
        if (options.debug)
          this.debug = (...args) => console.error(...args);
        this.debug(this.pattern, set);
        set = this.globParts = set.map((s) => s.split(slashSplit));
        this.debug(this.pattern, set);
        set = set.map((s, si2, set2) => s.map(this.parse, this));
        this.debug(this.pattern, set);
        set = set.filter((s) => s.indexOf(false) === -1);
        this.debug(this.pattern, set);
        this.set = set;
      }
      parseNegate() {
        if (this.options.nonegate)
          return;
        const pattern = this.pattern;
        let negate = false;
        let negateOffset = 0;
        for (let i = 0; i < pattern.length && pattern.charAt(i) === "!"; i++) {
          negate = !negate;
          negateOffset++;
        }
        if (negateOffset)
          this.pattern = pattern.slice(negateOffset);
        this.negate = negate;
      }
      matchOne(file, pattern, partial) {
        var options = this.options;
        this.debug(
          "matchOne",
          { "this": this, file, pattern }
        );
        this.debug("matchOne", file.length, pattern.length);
        for (var fi2 = 0, pi2 = 0, fl2 = file.length, pl2 = pattern.length; fi2 < fl2 && pi2 < pl2; fi2++, pi2++) {
          this.debug("matchOne loop");
          var p2 = pattern[pi2];
          var f2 = file[fi2];
          this.debug(pattern, p2, f2);
          if (p2 === false)
            return false;
          if (p2 === GLOBSTAR) {
            this.debug("GLOBSTAR", [pattern, p2, f2]);
            var fr2 = fi2;
            var pr2 = pi2 + 1;
            if (pr2 === pl2) {
              this.debug("** at the end");
              for (; fi2 < fl2; fi2++) {
                if (file[fi2] === "." || file[fi2] === ".." || !options.dot && file[fi2].charAt(0) === ".")
                  return false;
              }
              return true;
            }
            while (fr2 < fl2) {
              var swallowee = file[fr2];
              this.debug("\nglobstar while", file, fr2, pattern, pr2, swallowee);
              if (this.matchOne(file.slice(fr2), pattern.slice(pr2), partial)) {
                this.debug("globstar found match!", fr2, fl2, swallowee);
                return true;
              } else {
                if (swallowee === "." || swallowee === ".." || !options.dot && swallowee.charAt(0) === ".") {
                  this.debug("dot detected!", file, fr2, pattern, pr2);
                  break;
                }
                this.debug("globstar swallow a segment, and continue");
                fr2++;
              }
            }
            if (partial) {
              this.debug("\n>>> no match, partial?", file, fr2, pattern, pr2);
              if (fr2 === fl2)
                return true;
            }
            return false;
          }
          var hit;
          if (typeof p2 === "string") {
            hit = f2 === p2;
            this.debug("string match", p2, f2, hit);
          } else {
            hit = f2.match(p2);
            this.debug("pattern match", p2, f2, hit);
          }
          if (!hit)
            return false;
        }
        if (fi2 === fl2 && pi2 === pl2) {
          return true;
        } else if (fi2 === fl2) {
          return partial;
        } else if (pi2 === pl2) {
          return fi2 === fl2 - 1 && file[fi2] === "";
        }
        throw new Error("wtf?");
      }
      braceExpand() {
        return braceExpand(this.pattern, this.options);
      }
      parse(pattern, isSub) {
        assertValidPattern(pattern);
        const options = this.options;
        if (pattern === "**") {
          if (!options.noglobstar)
            return GLOBSTAR;
          else
            pattern = "*";
        }
        if (pattern === "")
          return "";
        let re2 = "";
        let hasMagic = !!options.nocase;
        let escaping = false;
        const patternListStack = [];
        const negativeLists = [];
        let stateChar;
        let inClass = false;
        let reClassStart = -1;
        let classStart = -1;
        let cs2;
        let pl2;
        let sp;
        const patternStart = pattern.charAt(0) === "." ? "" : options.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)";
        const clearStateChar = () => {
          if (stateChar) {
            switch (stateChar) {
              case "*":
                re2 += star;
                hasMagic = true;
                break;
              case "?":
                re2 += qmark;
                hasMagic = true;
                break;
              default:
                re2 += "\\" + stateChar;
                break;
            }
            this.debug("clearStateChar %j %j", stateChar, re2);
            stateChar = false;
          }
        };
        for (let i = 0, c2; i < pattern.length && (c2 = pattern.charAt(i)); i++) {
          this.debug("%s	%s %s %j", pattern, i, re2, c2);
          if (escaping) {
            if (c2 === "/") {
              return false;
            }
            if (reSpecials[c2]) {
              re2 += "\\";
            }
            re2 += c2;
            escaping = false;
            continue;
          }
          switch (c2) {
            case "/": {
              return false;
            }
            case "\\":
              clearStateChar();
              escaping = true;
              continue;
            case "?":
            case "*":
            case "+":
            case "@":
            case "!":
              this.debug("%s	%s %s %j <-- stateChar", pattern, i, re2, c2);
              if (inClass) {
                this.debug("  in class");
                if (c2 === "!" && i === classStart + 1)
                  c2 = "^";
                re2 += c2;
                continue;
              }
              this.debug("call clearStateChar %j", stateChar);
              clearStateChar();
              stateChar = c2;
              if (options.noext)
                clearStateChar();
              continue;
            case "(":
              if (inClass) {
                re2 += "(";
                continue;
              }
              if (!stateChar) {
                re2 += "\\(";
                continue;
              }
              patternListStack.push({
                type: stateChar,
                start: i - 1,
                reStart: re2.length,
                open: plTypes[stateChar].open,
                close: plTypes[stateChar].close
              });
              re2 += stateChar === "!" ? "(?:(?!(?:" : "(?:";
              this.debug("plType %j %j", stateChar, re2);
              stateChar = false;
              continue;
            case ")":
              if (inClass || !patternListStack.length) {
                re2 += "\\)";
                continue;
              }
              clearStateChar();
              hasMagic = true;
              pl2 = patternListStack.pop();
              re2 += pl2.close;
              if (pl2.type === "!") {
                negativeLists.push(pl2);
              }
              pl2.reEnd = re2.length;
              continue;
            case "|":
              if (inClass || !patternListStack.length) {
                re2 += "\\|";
                continue;
              }
              clearStateChar();
              re2 += "|";
              continue;
            case "[":
              clearStateChar();
              if (inClass) {
                re2 += "\\" + c2;
                continue;
              }
              inClass = true;
              classStart = i;
              reClassStart = re2.length;
              re2 += c2;
              continue;
            case "]":
              if (i === classStart + 1 || !inClass) {
                re2 += "\\" + c2;
                continue;
              }
              cs2 = pattern.substring(classStart + 1, i);
              try {
                RegExp("[" + cs2 + "]");
              } catch (er2) {
                sp = this.parse(cs2, SUBPARSE);
                re2 = re2.substring(0, reClassStart) + "\\[" + sp[0] + "\\]";
                hasMagic = hasMagic || sp[1];
                inClass = false;
                continue;
              }
              hasMagic = true;
              inClass = false;
              re2 += c2;
              continue;
            default:
              clearStateChar();
              if (reSpecials[c2] && !(c2 === "^" && inClass)) {
                re2 += "\\";
              }
              re2 += c2;
              break;
          }
        }
        if (inClass) {
          cs2 = pattern.slice(classStart + 1);
          sp = this.parse(cs2, SUBPARSE);
          re2 = re2.substring(0, reClassStart) + "\\[" + sp[0];
          hasMagic = hasMagic || sp[1];
        }
        for (pl2 = patternListStack.pop(); pl2; pl2 = patternListStack.pop()) {
          let tail;
          tail = re2.slice(pl2.reStart + pl2.open.length);
          this.debug("setting tail", re2, pl2);
          tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, (_2, $1, $2) => {
            if (!$2) {
              $2 = "\\";
            }
            return $1 + $1 + $2 + "|";
          });
          this.debug("tail=%j\n   %s", tail, tail, pl2, re2);
          const t = pl2.type === "*" ? star : pl2.type === "?" ? qmark : "\\" + pl2.type;
          hasMagic = true;
          re2 = re2.slice(0, pl2.reStart) + t + "\\(" + tail;
        }
        clearStateChar();
        if (escaping) {
          re2 += "\\\\";
        }
        const addPatternStart = addPatternStartSet[re2.charAt(0)];
        for (let n3 = negativeLists.length - 1; n3 > -1; n3--) {
          const nl2 = negativeLists[n3];
          const nlBefore = re2.slice(0, nl2.reStart);
          const nlFirst = re2.slice(nl2.reStart, nl2.reEnd - 8);
          let nlAfter = re2.slice(nl2.reEnd);
          const nlLast = re2.slice(nl2.reEnd - 8, nl2.reEnd) + nlAfter;
          const openParensBefore = nlBefore.split("(").length - 1;
          let cleanAfter = nlAfter;
          for (let i = 0; i < openParensBefore; i++) {
            cleanAfter = cleanAfter.replace(/\)[+*?]?/, "");
          }
          nlAfter = cleanAfter;
          const dollar = nlAfter === "" && isSub !== SUBPARSE ? "$" : "";
          re2 = nlBefore + nlFirst + nlAfter + dollar + nlLast;
        }
        if (re2 !== "" && hasMagic) {
          re2 = "(?=.)" + re2;
        }
        if (addPatternStart) {
          re2 = patternStart + re2;
        }
        if (isSub === SUBPARSE) {
          return [re2, hasMagic];
        }
        if (!hasMagic) {
          return globUnescape(pattern);
        }
        const flags = options.nocase ? "i" : "";
        try {
          return Object.assign(new RegExp("^" + re2 + "$", flags), {
            _glob: pattern,
            _src: re2
          });
        } catch (er2) {
          return new RegExp("$.");
        }
      }
      makeRe() {
        if (this.regexp || this.regexp === false)
          return this.regexp;
        const set = this.set;
        if (!set.length) {
          this.regexp = false;
          return this.regexp;
        }
        const options = this.options;
        const twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
        const flags = options.nocase ? "i" : "";
        let re2 = set.map((pattern) => {
          pattern = pattern.map(
            (p2) => typeof p2 === "string" ? regExpEscape(p2) : p2 === GLOBSTAR ? GLOBSTAR : p2._src
          ).reduce((set2, p2) => {
            if (!(set2[set2.length - 1] === GLOBSTAR && p2 === GLOBSTAR)) {
              set2.push(p2);
            }
            return set2;
          }, []);
          pattern.forEach((p2, i) => {
            if (p2 !== GLOBSTAR || pattern[i - 1] === GLOBSTAR) {
              return;
            }
            if (i === 0) {
              if (pattern.length > 1) {
                pattern[i + 1] = "(?:\\/|" + twoStar + "\\/)?" + pattern[i + 1];
              } else {
                pattern[i] = twoStar;
              }
            } else if (i === pattern.length - 1) {
              pattern[i - 1] += "(?:\\/|" + twoStar + ")?";
            } else {
              pattern[i - 1] += "(?:\\/|\\/" + twoStar + "\\/)" + pattern[i + 1];
              pattern[i + 1] = GLOBSTAR;
            }
          });
          return pattern.filter((p2) => p2 !== GLOBSTAR).join("/");
        }).join("|");
        re2 = "^(?:" + re2 + ")$";
        if (this.negate)
          re2 = "^(?!" + re2 + ").*$";
        try {
          this.regexp = new RegExp(re2, flags);
        } catch (ex) {
          this.regexp = false;
        }
        return this.regexp;
      }
      match(f2, partial = this.partial) {
        this.debug("match", f2, this.pattern);
        if (this.comment)
          return false;
        if (this.empty)
          return f2 === "";
        if (f2 === "/" && partial)
          return true;
        const options = this.options;
        if (path.sep !== "/") {
          f2 = f2.split(path.sep).join("/");
        }
        f2 = f2.split(slashSplit);
        this.debug(this.pattern, "split", f2);
        const set = this.set;
        this.debug(this.pattern, "set", set);
        let filename;
        for (let i = f2.length - 1; i >= 0; i--) {
          filename = f2[i];
          if (filename)
            break;
        }
        for (let i = 0; i < set.length; i++) {
          const pattern = set[i];
          let file = f2;
          if (options.matchBase && pattern.length === 1) {
            file = [filename];
          }
          const hit = this.matchOne(file, pattern, partial);
          if (hit) {
            if (options.flipNegate)
              return true;
            return !this.negate;
          }
        }
        if (options.flipNegate)
          return false;
        return this.negate;
      }
      static defaults(def) {
        return minimatch.defaults(def).Minimatch;
      }
    };
    minimatch.Minimatch = Minimatch;
  }
});

// node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  "node_modules/inherits/inherits_browser.js"(exports, module2) {
    if (typeof Object.create === "function") {
      module2.exports = function inherits2(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      module2.exports = function inherits2(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  }
});

// node_modules/rollup-plugin-node-polyfills/polyfills/events.js
var events_exports = {};
__export(events_exports, {
  EventEmitter: () => EventEmitter,
  default: () => events_default
});
function EventHandlers() {
}
function EventEmitter() {
  EventEmitter.init.call(this);
}
function $getMaxListeners(that) {
  if (that._maxListeners === void 0)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners2 = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners2[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners2 = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners2[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners2 = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners2[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners2 = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners2[i].call(self, arg1, arg2, arg3);
  }
}
function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners2 = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners2[i].apply(self, args);
  }
}
function _addListener(target, type2, listener, prepend) {
  var m2;
  var events;
  var existing;
  if (typeof listener !== "function")
    throw new TypeError('"listener" argument must be a function');
  events = target._events;
  if (!events) {
    events = target._events = new EventHandlers();
    target._eventsCount = 0;
  } else {
    if (events.newListener) {
      target.emit(
        "newListener",
        type2,
        listener.listener ? listener.listener : listener
      );
      events = target._events;
    }
    existing = events[type2];
  }
  if (!existing) {
    existing = events[type2] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === "function") {
      existing = events[type2] = prepend ? [listener, existing] : [existing, listener];
    } else {
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }
    if (!existing.warned) {
      m2 = $getMaxListeners(target);
      if (m2 && m2 > 0 && existing.length > m2) {
        existing.warned = true;
        var w2 = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + type2 + " listeners added. Use emitter.setMaxListeners() to increase limit");
        w2.name = "MaxListenersExceededWarning";
        w2.emitter = target;
        w2.type = type2;
        w2.count = existing.length;
        emitWarning(w2);
      }
    }
  }
  return target;
}
function emitWarning(e) {
  typeof console.warn === "function" ? console.warn(e) : console.log(e);
}
function _onceWrap(target, type2, listener) {
  var fired = false;
  function g2() {
    target.removeListener(type2, g2);
    if (!fired) {
      fired = true;
      listener.apply(target, arguments);
    }
  }
  g2.listener = listener;
  return g2;
}
function listenerCount(type2) {
  var events = this._events;
  if (events) {
    var evlistener = events[type2];
    if (typeof evlistener === "function") {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }
  return 0;
}
function spliceOne(list, index) {
  for (var i = index, k2 = i + 1, n3 = list.length; k2 < n3; i += 1, k2 += 1)
    list[i] = list[k2];
  list.pop();
}
function arrayClone(arr, i) {
  var copy2 = new Array(i);
  while (i--)
    copy2[i] = arr[i];
  return copy2;
}
function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}
var domain, events_default;
var init_events = __esm({
  "node_modules/rollup-plugin-node-polyfills/polyfills/events.js"() {
    "use strict";
    EventHandlers.prototype = /* @__PURE__ */ Object.create(null);
    events_default = EventEmitter;
    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.usingDomains = false;
    EventEmitter.prototype.domain = void 0;
    EventEmitter.prototype._events = void 0;
    EventEmitter.prototype._maxListeners = void 0;
    EventEmitter.defaultMaxListeners = 10;
    EventEmitter.init = function() {
      this.domain = null;
      if (EventEmitter.usingDomains) {
        if (domain.active && !(this instanceof domain.Domain)) {
          this.domain = domain.active;
        }
      }
      if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
        this._events = new EventHandlers();
        this._eventsCount = 0;
      }
      this._maxListeners = this._maxListeners || void 0;
    };
    EventEmitter.prototype.setMaxListeners = function setMaxListeners(n3) {
      if (typeof n3 !== "number" || n3 < 0 || isNaN(n3))
        throw new TypeError('"n" argument must be a positive number');
      this._maxListeners = n3;
      return this;
    };
    EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
      return $getMaxListeners(this);
    };
    EventEmitter.prototype.emit = function emit2(type2) {
      var er2, handler, len, args, i, events, domain2;
      var needDomainExit = false;
      var doError = type2 === "error";
      events = this._events;
      if (events)
        doError = doError && events.error == null;
      else if (!doError)
        return false;
      domain2 = this.domain;
      if (doError) {
        er2 = arguments[1];
        if (domain2) {
          if (!er2)
            er2 = new Error('Uncaught, unspecified "error" event');
          er2.domainEmitter = this;
          er2.domain = domain2;
          er2.domainThrown = false;
          domain2.emit("error", er2);
        } else if (er2 instanceof Error) {
          throw er2;
        } else {
          var err = new Error('Uncaught, unspecified "error" event. (' + er2 + ")");
          err.context = er2;
          throw err;
        }
        return false;
      }
      handler = events[type2];
      if (!handler)
        return false;
      var isFn = typeof handler === "function";
      len = arguments.length;
      switch (len) {
        case 1:
          emitNone(handler, isFn, this);
          break;
        case 2:
          emitOne(handler, isFn, this, arguments[1]);
          break;
        case 3:
          emitTwo(handler, isFn, this, arguments[1], arguments[2]);
          break;
        case 4:
          emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
          break;
        default:
          args = new Array(len - 1);
          for (i = 1; i < len; i++)
            args[i - 1] = arguments[i];
          emitMany(handler, isFn, this, args);
      }
      if (needDomainExit)
        domain2.exit();
      return true;
    };
    EventEmitter.prototype.addListener = function addListener2(type2, listener) {
      return _addListener(this, type2, listener, false);
    };
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.prototype.prependListener = function prependListener(type2, listener) {
      return _addListener(this, type2, listener, true);
    };
    EventEmitter.prototype.once = function once2(type2, listener) {
      if (typeof listener !== "function")
        throw new TypeError('"listener" argument must be a function');
      this.on(type2, _onceWrap(this, type2, listener));
      return this;
    };
    EventEmitter.prototype.prependOnceListener = function prependOnceListener(type2, listener) {
      if (typeof listener !== "function")
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type2, _onceWrap(this, type2, listener));
      return this;
    };
    EventEmitter.prototype.removeListener = function removeListener2(type2, listener) {
      var list, events, position, i, originalListener;
      if (typeof listener !== "function")
        throw new TypeError('"listener" argument must be a function');
      events = this._events;
      if (!events)
        return this;
      list = events[type2];
      if (!list)
        return this;
      if (list === listener || list.listener && list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = new EventHandlers();
        else {
          delete events[type2];
          if (events.removeListener)
            this.emit("removeListener", type2, list.listener || listener);
        }
      } else if (typeof list !== "function") {
        position = -1;
        for (i = list.length; i-- > 0; ) {
          if (list[i] === listener || list[i].listener && list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }
        if (position < 0)
          return this;
        if (list.length === 1) {
          list[0] = void 0;
          if (--this._eventsCount === 0) {
            this._events = new EventHandlers();
            return this;
          } else {
            delete events[type2];
          }
        } else {
          spliceOne(list, position);
        }
        if (events.removeListener)
          this.emit("removeListener", type2, originalListener || listener);
      }
      return this;
    };
    EventEmitter.prototype.removeAllListeners = function removeAllListeners2(type2) {
      var listeners2, events;
      events = this._events;
      if (!events)
        return this;
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = new EventHandlers();
          this._eventsCount = 0;
        } else if (events[type2]) {
          if (--this._eventsCount === 0)
            this._events = new EventHandlers();
          else
            delete events[type2];
        }
        return this;
      }
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        for (var i = 0, key; i < keys.length; ++i) {
          key = keys[i];
          if (key === "removeListener")
            continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = new EventHandlers();
        this._eventsCount = 0;
        return this;
      }
      listeners2 = events[type2];
      if (typeof listeners2 === "function") {
        this.removeListener(type2, listeners2);
      } else if (listeners2) {
        do {
          this.removeListener(type2, listeners2[listeners2.length - 1]);
        } while (listeners2[0]);
      }
      return this;
    };
    EventEmitter.prototype.listeners = function listeners(type2) {
      var evlistener;
      var ret;
      var events = this._events;
      if (!events)
        ret = [];
      else {
        evlistener = events[type2];
        if (!evlistener)
          ret = [];
        else if (typeof evlistener === "function")
          ret = [evlistener.listener || evlistener];
        else
          ret = unwrapListeners(evlistener);
      }
      return ret;
    };
    EventEmitter.listenerCount = function(emitter, type2) {
      if (typeof emitter.listenerCount === "function") {
        return emitter.listenerCount(type2);
      } else {
        return listenerCount.call(emitter, type2);
      }
    };
    EventEmitter.prototype.listenerCount = listenerCount;
    EventEmitter.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
    };
  }
});

// node_modules/rollup-plugin-node-polyfills/polyfills/buffer-es6.js
function init() {
  inited = true;
  var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }
  revLookup["-".charCodeAt(0)] = 62;
  revLookup["_".charCodeAt(0)] = 63;
}
function toByteArray(b64) {
  if (!inited) {
    init();
  }
  var i, j2, l2, tmp, placeHolders, arr;
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error("Invalid string. Length must be a multiple of 4");
  }
  placeHolders = b64[len - 2] === "=" ? 2 : b64[len - 1] === "=" ? 1 : 0;
  arr = new Arr(len * 3 / 4 - placeHolders);
  l2 = placeHolders > 0 ? len - 4 : len;
  var L2 = 0;
  for (i = 0, j2 = 0; i < l2; i += 4, j2 += 3) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[L2++] = tmp >> 16 & 255;
    arr[L2++] = tmp >> 8 & 255;
    arr[L2++] = tmp & 255;
  }
  if (placeHolders === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[L2++] = tmp & 255;
  } else if (placeHolders === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[L2++] = tmp >> 8 & 255;
    arr[L2++] = tmp & 255;
  }
  return arr;
}
function tripletToBase64(num) {
  return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
}
function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
    output.push(tripletToBase64(tmp));
  }
  return output.join("");
}
function fromByteArray(uint8) {
  if (!inited) {
    init();
  }
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3;
  var output = "";
  var parts = [];
  var maxChunkLength = 16383;
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  }
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[tmp << 4 & 63];
    output += "==";
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    output += lookup[tmp >> 10];
    output += lookup[tmp >> 4 & 63];
    output += lookup[tmp << 2 & 63];
    output += "=";
  }
  parts.push(output);
  return parts.join("");
}
function read(buffer, offset, isLE, mLen, nBytes) {
  var e, m2;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d2 = isLE ? -1 : 1;
  var s = buffer[offset + i];
  i += d2;
  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d2, nBits -= 8) {
  }
  m2 = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m2 = m2 * 256 + buffer[offset + i], i += d2, nBits -= 8) {
  }
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m2 ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m2 = m2 + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m2 * Math.pow(2, e - mLen);
}
function write(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m2, c2;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt2 = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d2 = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  value = Math.abs(value);
  if (isNaN(value) || value === Infinity) {
    m2 = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c2 = Math.pow(2, -e)) < 1) {
      e--;
      c2 *= 2;
    }
    if (e + eBias >= 1) {
      value += rt2 / c2;
    } else {
      value += rt2 * Math.pow(2, 1 - eBias);
    }
    if (value * c2 >= 2) {
      e++;
      c2 /= 2;
    }
    if (e + eBias >= eMax) {
      m2 = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m2 = (value * c2 - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m2 = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[offset + i] = m2 & 255, i += d2, m2 /= 256, mLen -= 8) {
  }
  e = e << mLen | m2;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 255, i += d2, e /= 256, eLen -= 8) {
  }
  buffer[offset + i - d2] |= s * 128;
}
function kMaxLength() {
  return Buffer2.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
}
function createBuffer(that, length) {
  if (kMaxLength() < length) {
    throw new RangeError("Invalid typed array length");
  }
  if (Buffer2.TYPED_ARRAY_SUPPORT) {
    that = new Uint8Array(length);
    that.__proto__ = Buffer2.prototype;
  } else {
    if (that === null) {
      that = new Buffer2(length);
    }
    that.length = length;
  }
  return that;
}
function Buffer2(arg, encodingOrOffset, length) {
  if (!Buffer2.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer2)) {
    return new Buffer2(arg, encodingOrOffset, length);
  }
  if (typeof arg === "number") {
    if (typeof encodingOrOffset === "string") {
      throw new Error(
        "If encoding is specified then the first argument must be a string"
      );
    }
    return allocUnsafe(this, arg);
  }
  return from(this, arg, encodingOrOffset, length);
}
function from(that, value, encodingOrOffset, length) {
  if (typeof value === "number") {
    throw new TypeError('"value" argument must not be a number');
  }
  if (typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length);
  }
  if (typeof value === "string") {
    return fromString(that, value, encodingOrOffset);
  }
  return fromObject(that, value);
}
function assertSize(size) {
  if (typeof size !== "number") {
    throw new TypeError('"size" argument must be a number');
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative');
  }
}
function alloc(that, size, fill2, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(that, size);
  }
  if (fill2 !== void 0) {
    return typeof encoding === "string" ? createBuffer(that, size).fill(fill2, encoding) : createBuffer(that, size).fill(fill2);
  }
  return createBuffer(that, size);
}
function allocUnsafe(that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
  if (!Buffer2.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }
  return that;
}
function fromString(that, string, encoding) {
  if (typeof encoding !== "string" || encoding === "") {
    encoding = "utf8";
  }
  if (!Buffer2.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding');
  }
  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);
  var actual = that.write(string, encoding);
  if (actual !== length) {
    that = that.slice(0, actual);
  }
  return that;
}
function fromArrayLike(that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }
  return that;
}
function fromArrayBuffer(that, array, byteOffset, length) {
  array.byteLength;
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError("'offset' is out of bounds");
  }
  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError("'length' is out of bounds");
  }
  if (byteOffset === void 0 && length === void 0) {
    array = new Uint8Array(array);
  } else if (length === void 0) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }
  if (Buffer2.TYPED_ARRAY_SUPPORT) {
    that = array;
    that.__proto__ = Buffer2.prototype;
  } else {
    that = fromArrayLike(that, array);
  }
  return that;
}
function fromObject(that, obj) {
  if (internalIsBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);
    if (that.length === 0) {
      return that;
    }
    obj.copy(that, 0, 0, len);
    return that;
  }
  if (obj) {
    if (typeof ArrayBuffer !== "undefined" && obj.buffer instanceof ArrayBuffer || "length" in obj) {
      if (typeof obj.length !== "number" || isnan(obj.length)) {
        return createBuffer(that, 0);
      }
      return fromArrayLike(that, obj);
    }
    if (obj.type === "Buffer" && isArray4(obj.data)) {
      return fromArrayLike(that, obj.data);
    }
  }
  throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
}
function checked(length) {
  if (length >= kMaxLength()) {
    throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength().toString(16) + " bytes");
  }
  return length | 0;
}
function internalIsBuffer(b2) {
  return !!(b2 != null && b2._isBuffer);
}
function byteLength(string, encoding) {
  if (internalIsBuffer(string)) {
    return string.length;
  }
  if (typeof ArrayBuffer !== "undefined" && typeof ArrayBuffer.isView === "function" && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength;
  }
  if (typeof string !== "string") {
    string = "" + string;
  }
  var len = string.length;
  if (len === 0)
    return 0;
  var loweredCase = false;
  for (; ; ) {
    switch (encoding) {
      case "ascii":
      case "latin1":
      case "binary":
        return len;
      case "utf8":
      case "utf-8":
      case void 0:
        return utf8ToBytes(string).length;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return len * 2;
      case "hex":
        return len >>> 1;
      case "base64":
        return base64ToBytes(string).length;
      default:
        if (loweredCase)
          return utf8ToBytes(string).length;
        encoding = ("" + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
function slowToString(encoding, start, end) {
  var loweredCase = false;
  if (start === void 0 || start < 0) {
    start = 0;
  }
  if (start > this.length) {
    return "";
  }
  if (end === void 0 || end > this.length) {
    end = this.length;
  }
  if (end <= 0) {
    return "";
  }
  end >>>= 0;
  start >>>= 0;
  if (end <= start) {
    return "";
  }
  if (!encoding)
    encoding = "utf8";
  while (true) {
    switch (encoding) {
      case "hex":
        return hexSlice(this, start, end);
      case "utf8":
      case "utf-8":
        return utf8Slice(this, start, end);
      case "ascii":
        return asciiSlice(this, start, end);
      case "latin1":
      case "binary":
        return latin1Slice(this, start, end);
      case "base64":
        return base64Slice(this, start, end);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return utf16leSlice(this, start, end);
      default:
        if (loweredCase)
          throw new TypeError("Unknown encoding: " + encoding);
        encoding = (encoding + "").toLowerCase();
        loweredCase = true;
    }
  }
}
function swap(b2, n3, m2) {
  var i = b2[n3];
  b2[n3] = b2[m2];
  b2[m2] = i;
}
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
  if (buffer.length === 0)
    return -1;
  if (typeof byteOffset === "string") {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 2147483647) {
    byteOffset = 2147483647;
  } else if (byteOffset < -2147483648) {
    byteOffset = -2147483648;
  }
  byteOffset = +byteOffset;
  if (isNaN(byteOffset)) {
    byteOffset = dir ? 0 : buffer.length - 1;
  }
  if (byteOffset < 0)
    byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir)
      return -1;
    else
      byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir)
      byteOffset = 0;
    else
      return -1;
  }
  if (typeof val === "string") {
    val = Buffer2.from(val, encoding);
  }
  if (internalIsBuffer(val)) {
    if (val.length === 0) {
      return -1;
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
  } else if (typeof val === "number") {
    val = val & 255;
    if (Buffer2.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === "function") {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
  }
  throw new TypeError("val must be string, number or Buffer");
}
function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;
  if (encoding !== void 0) {
    encoding = String(encoding).toLowerCase();
    if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
      if (arr.length < 2 || val.length < 2) {
        return -1;
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }
  function read2(buf, i2) {
    if (indexSize === 1) {
      return buf[i2];
    } else {
      return buf.readUInt16BE(i2 * indexSize);
    }
  }
  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++) {
      if (read2(arr, i) === read2(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1)
          foundIndex = i;
        if (i - foundIndex + 1 === valLength)
          return foundIndex * indexSize;
      } else {
        if (foundIndex !== -1)
          i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength)
      byteOffset = arrLength - valLength;
    for (i = byteOffset; i >= 0; i--) {
      var found = true;
      for (var j2 = 0; j2 < valLength; j2++) {
        if (read2(arr, i + j2) !== read2(val, j2)) {
          found = false;
          break;
        }
      }
      if (found)
        return i;
    }
  }
  return -1;
}
function hexWrite(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }
  var strLen = string.length;
  if (strLen % 2 !== 0)
    throw new TypeError("Invalid hex string");
  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed))
      return i;
    buf[offset + i] = parsed;
  }
  return i;
}
function utf8Write(buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}
function asciiWrite(buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length);
}
function latin1Write(buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length);
}
function base64Write(buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length);
}
function ucs2Write(buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}
function base64Slice(buf, start, end) {
  if (start === 0 && end === buf.length) {
    return fromByteArray(buf);
  } else {
    return fromByteArray(buf.slice(start, end));
  }
}
function utf8Slice(buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];
  var i = start;
  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;
      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 128) {
            codePoint = firstByte;
          }
          break;
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 192) === 128) {
            tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
            if (tempCodePoint > 127) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
            tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
            if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
            tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
            if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
              codePoint = tempCodePoint;
            }
          }
      }
    }
    if (codePoint === null) {
      codePoint = 65533;
      bytesPerSequence = 1;
    } else if (codePoint > 65535) {
      codePoint -= 65536;
      res.push(codePoint >>> 10 & 1023 | 55296);
      codePoint = 56320 | codePoint & 1023;
    }
    res.push(codePoint);
    i += bytesPerSequence;
  }
  return decodeCodePointsArray(res);
}
function decodeCodePointsArray(codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints);
  }
  var res = "";
  var i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    );
  }
  return res;
}
function asciiSlice(buf, start, end) {
  var ret = "";
  end = Math.min(buf.length, end);
  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 127);
  }
  return ret;
}
function latin1Slice(buf, start, end) {
  var ret = "";
  end = Math.min(buf.length, end);
  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret;
}
function hexSlice(buf, start, end) {
  var len = buf.length;
  if (!start || start < 0)
    start = 0;
  if (!end || end < 0 || end > len)
    end = len;
  var out = "";
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }
  return out;
}
function utf16leSlice(buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = "";
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }
  return res;
}
function checkOffset(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0)
    throw new RangeError("offset is not uint");
  if (offset + ext > length)
    throw new RangeError("Trying to access beyond buffer length");
}
function checkInt(buf, value, offset, ext, max, min) {
  if (!internalIsBuffer(buf))
    throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min)
    throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length)
    throw new RangeError("Index out of range");
}
function objectWriteUInt16(buf, value, offset, littleEndian) {
  if (value < 0)
    value = 65535 + value + 1;
  for (var i = 0, j2 = Math.min(buf.length - offset, 2); i < j2; ++i) {
    buf[offset + i] = (value & 255 << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
  }
}
function objectWriteUInt32(buf, value, offset, littleEndian) {
  if (value < 0)
    value = 4294967295 + value + 1;
  for (var i = 0, j2 = Math.min(buf.length - offset, 4); i < j2; ++i) {
    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 255;
  }
}
function checkIEEE754(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length)
    throw new RangeError("Index out of range");
  if (offset < 0)
    throw new RangeError("Index out of range");
}
function writeFloat(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4);
  }
  write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4;
}
function writeDouble(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8);
  }
  write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8;
}
function base64clean(str) {
  str = stringtrim(str).replace(INVALID_BASE64_RE, "");
  if (str.length < 2)
    return "";
  while (str.length % 4 !== 0) {
    str = str + "=";
  }
  return str;
}
function stringtrim(str) {
  if (str.trim)
    return str.trim();
  return str.replace(/^\s+|\s+$/g, "");
}
function toHex(n3) {
  if (n3 < 16)
    return "0" + n3.toString(16);
  return n3.toString(16);
}
function utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];
  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);
    if (codePoint > 55295 && codePoint < 57344) {
      if (!leadSurrogate) {
        if (codePoint > 56319) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
          continue;
        } else if (i + 1 === length) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
          continue;
        }
        leadSurrogate = codePoint;
        continue;
      }
      if (codePoint < 56320) {
        if ((units -= 3) > -1)
          bytes.push(239, 191, 189);
        leadSurrogate = codePoint;
        continue;
      }
      codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
    } else if (leadSurrogate) {
      if ((units -= 3) > -1)
        bytes.push(239, 191, 189);
    }
    leadSurrogate = null;
    if (codePoint < 128) {
      if ((units -= 1) < 0)
        break;
      bytes.push(codePoint);
    } else if (codePoint < 2048) {
      if ((units -= 2) < 0)
        break;
      bytes.push(
        codePoint >> 6 | 192,
        codePoint & 63 | 128
      );
    } else if (codePoint < 65536) {
      if ((units -= 3) < 0)
        break;
      bytes.push(
        codePoint >> 12 | 224,
        codePoint >> 6 & 63 | 128,
        codePoint & 63 | 128
      );
    } else if (codePoint < 1114112) {
      if ((units -= 4) < 0)
        break;
      bytes.push(
        codePoint >> 18 | 240,
        codePoint >> 12 & 63 | 128,
        codePoint >> 6 & 63 | 128,
        codePoint & 63 | 128
      );
    } else {
      throw new Error("Invalid code point");
    }
  }
  return bytes;
}
function asciiToBytes(str) {
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    byteArray.push(str.charCodeAt(i) & 255);
  }
  return byteArray;
}
function utf16leToBytes(str, units) {
  var c2, hi2, lo2;
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0)
      break;
    c2 = str.charCodeAt(i);
    hi2 = c2 >> 8;
    lo2 = c2 % 256;
    byteArray.push(lo2);
    byteArray.push(hi2);
  }
  return byteArray;
}
function base64ToBytes(str) {
  return toByteArray(base64clean(str));
}
function blitBuffer(src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if (i + offset >= dst.length || i >= src.length)
      break;
    dst[i + offset] = src[i];
  }
  return i;
}
function isnan(val) {
  return val !== val;
}
function isBuffer2(obj) {
  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj));
}
function isFastBuffer(obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
}
function isSlowBuffer(obj) {
  return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isFastBuffer(obj.slice(0, 0));
}
var lookup, revLookup, Arr, inited, toString, isArray4, INSPECT_MAX_BYTES, _kMaxLength, MAX_ARGUMENTS_LENGTH, INVALID_BASE64_RE;
var init_buffer_es6 = __esm({
  "node_modules/rollup-plugin-node-polyfills/polyfills/buffer-es6.js"() {
    lookup = [];
    revLookup = [];
    Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    inited = false;
    toString = {}.toString;
    isArray4 = Array.isArray || function(arr) {
      return toString.call(arr) == "[object Array]";
    };
    INSPECT_MAX_BYTES = 50;
    Buffer2.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== void 0 ? global.TYPED_ARRAY_SUPPORT : true;
    _kMaxLength = kMaxLength();
    Buffer2.poolSize = 8192;
    Buffer2._augment = function(arr) {
      arr.__proto__ = Buffer2.prototype;
      return arr;
    };
    Buffer2.from = function(value, encodingOrOffset, length) {
      return from(null, value, encodingOrOffset, length);
    };
    if (Buffer2.TYPED_ARRAY_SUPPORT) {
      Buffer2.prototype.__proto__ = Uint8Array.prototype;
      Buffer2.__proto__ = Uint8Array;
    }
    Buffer2.alloc = function(size, fill2, encoding) {
      return alloc(null, size, fill2, encoding);
    };
    Buffer2.allocUnsafe = function(size) {
      return allocUnsafe(null, size);
    };
    Buffer2.allocUnsafeSlow = function(size) {
      return allocUnsafe(null, size);
    };
    Buffer2.isBuffer = isBuffer2;
    Buffer2.compare = function compare(a2, b2) {
      if (!internalIsBuffer(a2) || !internalIsBuffer(b2)) {
        throw new TypeError("Arguments must be Buffers");
      }
      if (a2 === b2)
        return 0;
      var x2 = a2.length;
      var y2 = b2.length;
      for (var i = 0, len = Math.min(x2, y2); i < len; ++i) {
        if (a2[i] !== b2[i]) {
          x2 = a2[i];
          y2 = b2[i];
          break;
        }
      }
      if (x2 < y2)
        return -1;
      if (y2 < x2)
        return 1;
      return 0;
    };
    Buffer2.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer2.concat = function concat(list, length) {
      if (!isArray4(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer2.alloc(0);
      }
      var i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      var buffer = Buffer2.allocUnsafe(length);
      var pos = 0;
      for (i = 0; i < list.length; ++i) {
        var buf = list[i];
        if (!internalIsBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        buf.copy(buffer, pos);
        pos += buf.length;
      }
      return buffer;
    };
    Buffer2.byteLength = byteLength;
    Buffer2.prototype._isBuffer = true;
    Buffer2.prototype.swap16 = function swap16() {
      var len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (var i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer2.prototype.swap32 = function swap32() {
      var len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (var i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer2.prototype.swap64 = function swap64() {
      var len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (var i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer2.prototype.toString = function toString2() {
      var length = this.length | 0;
      if (length === 0)
        return "";
      if (arguments.length === 0)
        return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer2.prototype.equals = function equals(b2) {
      if (!internalIsBuffer(b2))
        throw new TypeError("Argument must be a Buffer");
      if (this === b2)
        return true;
      return Buffer2.compare(this, b2) === 0;
    };
    Buffer2.prototype.inspect = function inspect2() {
      var str = "";
      var max = INSPECT_MAX_BYTES;
      if (this.length > 0) {
        str = this.toString("hex", 0, max).match(/.{2}/g).join(" ");
        if (this.length > max)
          str += " ... ";
      }
      return "<Buffer " + str + ">";
    };
    Buffer2.prototype.compare = function compare2(target, start, end, thisStart, thisEnd) {
      if (!internalIsBuffer(target)) {
        throw new TypeError("Argument must be a Buffer");
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target)
        return 0;
      var x2 = thisEnd - thisStart;
      var y2 = end - start;
      var len = Math.min(x2, y2);
      var thisCopy = this.slice(thisStart, thisEnd);
      var targetCopy = target.slice(start, end);
      for (var i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x2 = thisCopy[i];
          y2 = targetCopy[i];
          break;
        }
      }
      if (x2 < y2)
        return -1;
      if (y2 < x2)
        return 1;
      return 0;
    };
    Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    Buffer2.prototype.write = function write2(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset | 0;
        if (isFinite(length)) {
          length = length | 0;
          if (encoding === void 0)
            encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      var remaining = this.length - offset;
      if (length === void 0 || length > remaining)
        length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding)
        encoding = "utf8";
      var loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
            return asciiWrite(this, string, offset, length);
          case "latin1":
          case "binary":
            return latin1Write(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer2.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    MAX_ARGUMENTS_LENGTH = 4096;
    Buffer2.prototype.slice = function slice(start, end) {
      var len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0)
          start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0)
          end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start)
        end = start;
      var newBuf;
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        newBuf = this.subarray(start, end);
        newBuf.__proto__ = Buffer2.prototype;
      } else {
        var sliceLen = end - start;
        newBuf = new Buffer2(sliceLen, void 0);
        for (var i = 0; i < sliceLen; ++i) {
          newBuf[i] = this[i + start];
        }
      }
      return newBuf;
    };
    Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      var val = this[offset];
      var mul = 1;
      var i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      var val = this[offset + --byteLength2];
      var mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      var val = this[offset];
      var mul = 1;
      var i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      var i = byteLength2;
      var mul = 1;
      var val = this[offset + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128))
        return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      var val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      var val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return read(this, offset, true, 23, 4);
    };
    Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return read(this, offset, false, 23, 4);
    };
    Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return read(this, offset, true, 52, 8);
    };
    Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return read(this, offset, false, 52, 8);
    };
    Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      var mul = 1;
      var i = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      var i = byteLength2 - 1;
      var mul = 1;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 255, 0);
      if (!Buffer2.TYPED_ARRAY_SUPPORT)
        value = Math.floor(value);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
      } else {
        objectWriteUInt16(this, value, offset, true);
      }
      return offset + 2;
    };
    Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
      } else {
        objectWriteUInt16(this, value, offset, false);
      }
      return offset + 2;
    };
    Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
      } else {
        objectWriteUInt32(this, value, offset, true);
      }
      return offset + 4;
    };
    Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
      } else {
        objectWriteUInt32(this, value, offset, false);
      }
      return offset + 4;
    };
    Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      var i = 0;
      var mul = 1;
      var sub = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      var i = byteLength2 - 1;
      var mul = 1;
      var sub = 0;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 127, -128);
      if (!Buffer2.TYPED_ARRAY_SUPPORT)
        value = Math.floor(value);
      if (value < 0)
        value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
      } else {
        objectWriteUInt16(this, value, offset, true);
      }
      return offset + 2;
    };
    Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
      } else {
        objectWriteUInt16(this, value, offset, false);
      }
      return offset + 2;
    };
    Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
      } else {
        objectWriteUInt32(this, value, offset, true);
      }
      return offset + 4;
    };
    Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0)
        value = 4294967295 + value + 1;
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
      } else {
        objectWriteUInt32(this, value, offset, false);
      }
      return offset + 4;
    };
    Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
      if (!start)
        start = 0;
      if (!end && end !== 0)
        end = this.length;
      if (targetStart >= target.length)
        targetStart = target.length;
      if (!targetStart)
        targetStart = 0;
      if (end > 0 && end < start)
        end = start;
      if (end === start)
        return 0;
      if (target.length === 0 || this.length === 0)
        return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length)
        throw new RangeError("sourceStart out of bounds");
      if (end < 0)
        throw new RangeError("sourceEnd out of bounds");
      if (end > this.length)
        end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      var len = end - start;
      var i;
      if (this === target && start < targetStart && targetStart < end) {
        for (i = len - 1; i >= 0; --i) {
          target[i + targetStart] = this[i + start];
        }
      } else if (len < 1e3 || !Buffer2.TYPED_ARRAY_SUPPORT) {
        for (i = 0; i < len; ++i) {
          target[i + targetStart] = this[i + start];
        }
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, start + len),
          targetStart
        );
      }
      return len;
    };
    Buffer2.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (val.length === 1) {
          var code = val.charCodeAt(0);
          if (code < 256) {
            val = code;
          }
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
      } else if (typeof val === "number") {
        val = val & 255;
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val)
        val = 0;
      var i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        var bytes = internalIsBuffer(val) ? val : utf8ToBytes(new Buffer2(val, encoding).toString());
        var len = bytes.length;
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
      return this;
    };
    INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
  }
});

// node_modules/rollup-plugin-node-polyfills/polyfills/assert.js
var assert_exports = {};
__export(assert_exports, {
  AssertionError: () => AssertionError,
  assert: () => ok,
  deepEqual: () => deepEqual,
  deepStrictEqual: () => deepStrictEqual,
  default: () => assert_default,
  doesNotThrow: () => doesNotThrow,
  equal: () => equal,
  fail: () => fail,
  ifError: () => ifError,
  notDeepEqual: () => notDeepEqual,
  notDeepStrictEqual: () => notDeepStrictEqual,
  notEqual: () => notEqual,
  notStrictEqual: () => notStrictEqual,
  ok: () => ok,
  strictEqual: () => strictEqual,
  throws: () => throws
});
function compare3(a2, b2) {
  if (a2 === b2) {
    return 0;
  }
  var x2 = a2.length;
  var y2 = b2.length;
  for (var i = 0, len = Math.min(x2, y2); i < len; ++i) {
    if (a2[i] !== b2[i]) {
      x2 = a2[i];
      y2 = b2[i];
      break;
    }
  }
  if (x2 < y2) {
    return -1;
  }
  if (y2 < x2) {
    return 1;
  }
  return 0;
}
function functionsHaveNames() {
  if (typeof _functionsHaveNames !== "undefined") {
    return _functionsHaveNames;
  }
  return _functionsHaveNames = function() {
    return function foo() {
    }.name === "foo";
  }();
}
function pToString(obj) {
  return Object.prototype.toString.call(obj);
}
function isView(arrbuf) {
  if (isBuffer2(arrbuf)) {
    return false;
  }
  if (typeof global.ArrayBuffer !== "function") {
    return false;
  }
  if (typeof ArrayBuffer.isView === "function") {
    return ArrayBuffer.isView(arrbuf);
  }
  if (!arrbuf) {
    return false;
  }
  if (arrbuf instanceof DataView) {
    return true;
  }
  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
    return true;
  }
  return false;
}
function assert(value, message) {
  if (!value)
    fail(value, true, message, "==", ok);
}
function getName(func) {
  if (!isFunction(func)) {
    return;
  }
  if (functionsHaveNames()) {
    return func.name;
  }
  var str = func.toString();
  var match = str.match(regex);
  return match && match[1];
}
function AssertionError(options) {
  this.name = "AssertionError";
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  } else {
    var err = new Error();
    if (err.stack) {
      var out = err.stack;
      var fn_name = getName(stackStartFunction);
      var idx = out.indexOf("\n" + fn_name);
      if (idx >= 0) {
        var next_line = out.indexOf("\n", idx + 1);
        out = out.substring(next_line + 1);
      }
      this.stack = out;
    }
  }
}
function truncate(s, n3) {
  if (typeof s === "string") {
    return s.length < n3 ? s : s.slice(0, n3);
  } else {
    return s;
  }
}
function inspect3(something) {
  if (functionsHaveNames() || !isFunction(something)) {
    return inspect(something);
  }
  var rawname = getName(something);
  var name = rawname ? ": " + rawname : "";
  return "[Function" + name + "]";
}
function getMessage(self) {
  return truncate(inspect3(self.actual), 128) + " " + self.operator + " " + truncate(inspect3(self.expected), 128);
}
function fail(actual, expected, message, operator, stackStartFunction) {
  throw new AssertionError({
    message,
    actual,
    expected,
    operator,
    stackStartFunction
  });
}
function ok(value, message) {
  if (!value)
    fail(value, true, message, "==", ok);
}
function equal(actual, expected, message) {
  if (actual != expected)
    fail(actual, expected, message, "==", equal);
}
function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, "!=", notEqual);
  }
}
function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, "deepEqual", deepEqual);
  }
}
function deepStrictEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, "deepStrictEqual", deepStrictEqual);
  }
}
function _deepEqual(actual, expected, strict, memos) {
  if (actual === expected) {
    return true;
  } else if (isBuffer2(actual) && isBuffer2(expected)) {
    return compare3(actual, expected) === 0;
  } else if (isDate(actual) && isDate(expected)) {
    return actual.getTime() === expected.getTime();
  } else if (isRegExp(actual) && isRegExp(expected)) {
    return actual.source === expected.source && actual.global === expected.global && actual.multiline === expected.multiline && actual.lastIndex === expected.lastIndex && actual.ignoreCase === expected.ignoreCase;
  } else if ((actual === null || typeof actual !== "object") && (expected === null || typeof expected !== "object")) {
    return strict ? actual === expected : actual == expected;
  } else if (isView(actual) && isView(expected) && pToString(actual) === pToString(expected) && !(actual instanceof Float32Array || actual instanceof Float64Array)) {
    return compare3(
      new Uint8Array(actual.buffer),
      new Uint8Array(expected.buffer)
    ) === 0;
  } else if (isBuffer2(actual) !== isBuffer2(expected)) {
    return false;
  } else {
    memos = memos || { actual: [], expected: [] };
    var actualIndex = memos.actual.indexOf(actual);
    if (actualIndex !== -1) {
      if (actualIndex === memos.expected.indexOf(expected)) {
        return true;
      }
    }
    memos.actual.push(actual);
    memos.expected.push(expected);
    return objEquiv(actual, expected, strict, memos);
  }
}
function isArguments(object) {
  return Object.prototype.toString.call(object) == "[object Arguments]";
}
function objEquiv(a2, b2, strict, actualVisitedObjects) {
  if (a2 === null || a2 === void 0 || b2 === null || b2 === void 0)
    return false;
  if (isPrimitive(a2) || isPrimitive(b2))
    return a2 === b2;
  if (strict && Object.getPrototypeOf(a2) !== Object.getPrototypeOf(b2))
    return false;
  var aIsArgs = isArguments(a2);
  var bIsArgs = isArguments(b2);
  if (aIsArgs && !bIsArgs || !aIsArgs && bIsArgs)
    return false;
  if (aIsArgs) {
    a2 = pSlice.call(a2);
    b2 = pSlice.call(b2);
    return _deepEqual(a2, b2, strict);
  }
  var ka2 = objectKeys2(a2);
  var kb = objectKeys2(b2);
  var key, i;
  if (ka2.length !== kb.length)
    return false;
  ka2.sort();
  kb.sort();
  for (i = ka2.length - 1; i >= 0; i--) {
    if (ka2[i] !== kb[i])
      return false;
  }
  for (i = ka2.length - 1; i >= 0; i--) {
    key = ka2[i];
    if (!_deepEqual(a2[key], b2[key], strict, actualVisitedObjects))
      return false;
  }
  return true;
}
function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, "notDeepEqual", notDeepEqual);
  }
}
function notDeepStrictEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, "notDeepStrictEqual", notDeepStrictEqual);
  }
}
function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, "===", strictEqual);
  }
}
function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, "!==", notStrictEqual);
  }
}
function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }
  if (Object.prototype.toString.call(expected) == "[object RegExp]") {
    return expected.test(actual);
  }
  try {
    if (actual instanceof expected) {
      return true;
    }
  } catch (e) {
  }
  if (Error.isPrototypeOf(expected)) {
    return false;
  }
  return expected.call({}, actual) === true;
}
function _tryBlock(block) {
  var error2;
  try {
    block();
  } catch (e) {
    error2 = e;
  }
  return error2;
}
function _throws(shouldThrow, block, expected, message) {
  var actual;
  if (typeof block !== "function") {
    throw new TypeError('"block" argument must be a function');
  }
  if (typeof expected === "string") {
    message = expected;
    expected = null;
  }
  actual = _tryBlock(block);
  message = (expected && expected.name ? " (" + expected.name + ")." : ".") + (message ? " " + message : ".");
  if (shouldThrow && !actual) {
    fail(actual, expected, "Missing expected exception" + message);
  }
  var userProvidedMessage = typeof message === "string";
  var isUnwantedException = !shouldThrow && isError(actual);
  var isUnexpectedException = !shouldThrow && actual && !expected;
  if (isUnwantedException && userProvidedMessage && expectedException(actual, expected) || isUnexpectedException) {
    fail(actual, expected, "Got unwanted exception" + message);
  }
  if (shouldThrow && actual && expected && !expectedException(actual, expected) || !shouldThrow && actual) {
    throw actual;
  }
}
function throws(block, error2, message) {
  _throws(true, block, error2, message);
}
function doesNotThrow(block, error2, message) {
  _throws(false, block, error2, message);
}
function ifError(err) {
  if (err)
    throw err;
}
var hasOwn, objectKeys2, pSlice, _functionsHaveNames, assert_default, regex;
var init_assert = __esm({
  "node_modules/rollup-plugin-node-polyfills/polyfills/assert.js"() {
    init_buffer_es6();
    init_util2();
    hasOwn = Object.prototype.hasOwnProperty;
    objectKeys2 = Object.keys || function(obj) {
      var keys = [];
      for (var key in obj) {
        if (hasOwn.call(obj, key))
          keys.push(key);
      }
      return keys;
    };
    pSlice = Array.prototype.slice;
    assert_default = assert;
    regex = /\s*function\s+([^\(\s]*)\s*/;
    assert.AssertionError = AssertionError;
    inherits_default(AssertionError, Error);
    assert.fail = fail;
    assert.ok = ok;
    assert.equal = equal;
    assert.notEqual = notEqual;
    assert.deepEqual = deepEqual;
    assert.deepStrictEqual = deepStrictEqual;
    assert.notDeepEqual = notDeepEqual;
    assert.notDeepStrictEqual = notDeepStrictEqual;
    assert.strictEqual = strictEqual;
    assert.notStrictEqual = notStrictEqual;
    assert.throws = throws;
    assert.doesNotThrow = doesNotThrow;
    assert.ifError = ifError;
  }
});

// node_modules/@rollup/plugin-commonjs/node_modules/glob/common.js
var require_common = __commonJS({
  "node_modules/@rollup/plugin-commonjs/node_modules/glob/common.js"(exports) {
    exports.setopts = setopts;
    exports.ownProp = ownProp;
    exports.makeAbs = makeAbs;
    exports.finish = finish;
    exports.mark = mark;
    exports.isIgnored = isIgnored;
    exports.childrenIgnored = childrenIgnored;
    function ownProp(obj, field) {
      return Object.prototype.hasOwnProperty.call(obj, field);
    }
    var fs2 = (init_fs(), __toCommonJS(fs_exports));
    var path = (init_path2(), __toCommonJS(path_exports));
    var minimatch = require_minimatch();
    var isAbsolute3 = (init_path2(), __toCommonJS(path_exports)).isAbsolute;
    var Minimatch = minimatch.Minimatch;
    function alphasort(a2, b2) {
      return a2.localeCompare(b2, "en");
    }
    function setupIgnores(self, options) {
      self.ignore = options.ignore || [];
      if (!Array.isArray(self.ignore))
        self.ignore = [self.ignore];
      if (self.ignore.length) {
        self.ignore = self.ignore.map(ignoreMap);
      }
    }
    function ignoreMap(pattern) {
      var gmatcher = null;
      if (pattern.slice(-3) === "/**") {
        var gpattern = pattern.replace(/(\/\*\*)+$/, "");
        gmatcher = new Minimatch(gpattern, { dot: true });
      }
      return {
        matcher: new Minimatch(pattern, { dot: true }),
        gmatcher
      };
    }
    function setopts(self, pattern, options) {
      if (!options)
        options = {};
      if (options.matchBase && -1 === pattern.indexOf("/")) {
        if (options.noglobstar) {
          throw new Error("base matching requires globstar");
        }
        pattern = "**/" + pattern;
      }
      self.silent = !!options.silent;
      self.pattern = pattern;
      self.strict = options.strict !== false;
      self.realpath = !!options.realpath;
      self.realpathCache = options.realpathCache || /* @__PURE__ */ Object.create(null);
      self.follow = !!options.follow;
      self.dot = !!options.dot;
      self.mark = !!options.mark;
      self.nodir = !!options.nodir;
      if (self.nodir)
        self.mark = true;
      self.sync = !!options.sync;
      self.nounique = !!options.nounique;
      self.nonull = !!options.nonull;
      self.nosort = !!options.nosort;
      self.nocase = !!options.nocase;
      self.stat = !!options.stat;
      self.noprocess = !!options.noprocess;
      self.absolute = !!options.absolute;
      self.fs = options.fs || fs2;
      self.maxLength = options.maxLength || Infinity;
      self.cache = options.cache || /* @__PURE__ */ Object.create(null);
      self.statCache = options.statCache || /* @__PURE__ */ Object.create(null);
      self.symlinks = options.symlinks || /* @__PURE__ */ Object.create(null);
      setupIgnores(self, options);
      self.changedCwd = false;
      var cwd2 = process.cwd();
      if (!ownProp(options, "cwd"))
        self.cwd = path.resolve(cwd2);
      else {
        self.cwd = path.resolve(options.cwd);
        self.changedCwd = self.cwd !== cwd2;
      }
      self.root = options.root || path.resolve(self.cwd, "/");
      self.root = path.resolve(self.root);
      self.cwdAbs = isAbsolute3(self.cwd) ? self.cwd : makeAbs(self, self.cwd);
      self.nomount = !!options.nomount;
      if (process.platform === "win32") {
        self.root = self.root.replace(/\\/g, "/");
        self.cwd = self.cwd.replace(/\\/g, "/");
        self.cwdAbs = self.cwdAbs.replace(/\\/g, "/");
      }
      options.nonegate = true;
      options.nocomment = true;
      options.allowWindowsEscape = true;
      self.minimatch = new Minimatch(pattern, options);
      self.options = self.minimatch.options;
    }
    function finish(self) {
      var nou = self.nounique;
      var all = nou ? [] : /* @__PURE__ */ Object.create(null);
      for (var i = 0, l2 = self.matches.length; i < l2; i++) {
        var matches = self.matches[i];
        if (!matches || Object.keys(matches).length === 0) {
          if (self.nonull) {
            var literal = self.minimatch.globSet[i];
            if (nou)
              all.push(literal);
            else
              all[literal] = true;
          }
        } else {
          var m2 = Object.keys(matches);
          if (nou)
            all.push.apply(all, m2);
          else
            m2.forEach(function(m3) {
              all[m3] = true;
            });
        }
      }
      if (!nou)
        all = Object.keys(all);
      if (!self.nosort)
        all = all.sort(alphasort);
      if (self.mark) {
        for (var i = 0; i < all.length; i++) {
          all[i] = self._mark(all[i]);
        }
        if (self.nodir) {
          all = all.filter(function(e) {
            var notDir = !/\/$/.test(e);
            var c2 = self.cache[e] || self.cache[makeAbs(self, e)];
            if (notDir && c2)
              notDir = c2 !== "DIR" && !Array.isArray(c2);
            return notDir;
          });
        }
      }
      if (self.ignore.length)
        all = all.filter(function(m3) {
          return !isIgnored(self, m3);
        });
      self.found = all;
    }
    function mark(self, p2) {
      var abs = makeAbs(self, p2);
      var c2 = self.cache[abs];
      var m2 = p2;
      if (c2) {
        var isDir = c2 === "DIR" || Array.isArray(c2);
        var slash = p2.slice(-1) === "/";
        if (isDir && !slash)
          m2 += "/";
        else if (!isDir && slash)
          m2 = m2.slice(0, -1);
        if (m2 !== p2) {
          var mabs = makeAbs(self, m2);
          self.statCache[mabs] = self.statCache[abs];
          self.cache[mabs] = self.cache[abs];
        }
      }
      return m2;
    }
    function makeAbs(self, f2) {
      var abs = f2;
      if (f2.charAt(0) === "/") {
        abs = path.join(self.root, f2);
      } else if (isAbsolute3(f2) || f2 === "") {
        abs = f2;
      } else if (self.changedCwd) {
        abs = path.resolve(self.cwd, f2);
      } else {
        abs = path.resolve(f2);
      }
      if (process.platform === "win32")
        abs = abs.replace(/\\/g, "/");
      return abs;
    }
    function isIgnored(self, path2) {
      if (!self.ignore.length)
        return false;
      return self.ignore.some(function(item) {
        return item.matcher.match(path2) || !!(item.gmatcher && item.gmatcher.match(path2));
      });
    }
    function childrenIgnored(self, path2) {
      if (!self.ignore.length)
        return false;
      return self.ignore.some(function(item) {
        return !!(item.gmatcher && item.gmatcher.match(path2));
      });
    }
  }
});

// node_modules/@rollup/plugin-commonjs/node_modules/glob/sync.js
var require_sync2 = __commonJS({
  "node_modules/@rollup/plugin-commonjs/node_modules/glob/sync.js"(exports, module2) {
    module2.exports = globSync;
    globSync.GlobSync = GlobSync;
    var rp = require_fs();
    var minimatch = require_minimatch();
    var Minimatch = minimatch.Minimatch;
    var Glob = require_glob().Glob;
    var util = (init_util2(), __toCommonJS(util_exports));
    var path = (init_path2(), __toCommonJS(path_exports));
    var assert2 = (init_assert(), __toCommonJS(assert_exports));
    var isAbsolute3 = (init_path2(), __toCommonJS(path_exports)).isAbsolute;
    var common = require_common();
    var setopts = common.setopts;
    var ownProp = common.ownProp;
    var childrenIgnored = common.childrenIgnored;
    var isIgnored = common.isIgnored;
    function globSync(pattern, options) {
      if (typeof options === "function" || arguments.length === 3)
        throw new TypeError("callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167");
      return new GlobSync(pattern, options).found;
    }
    function GlobSync(pattern, options) {
      if (!pattern)
        throw new Error("must provide pattern");
      if (typeof options === "function" || arguments.length === 3)
        throw new TypeError("callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167");
      if (!(this instanceof GlobSync))
        return new GlobSync(pattern, options);
      setopts(this, pattern, options);
      if (this.noprocess)
        return this;
      var n3 = this.minimatch.set.length;
      this.matches = new Array(n3);
      for (var i = 0; i < n3; i++) {
        this._process(this.minimatch.set[i], i, false);
      }
      this._finish();
    }
    GlobSync.prototype._finish = function() {
      assert2.ok(this instanceof GlobSync);
      if (this.realpath) {
        var self = this;
        this.matches.forEach(function(matchset, index) {
          var set = self.matches[index] = /* @__PURE__ */ Object.create(null);
          for (var p2 in matchset) {
            try {
              p2 = self._makeAbs(p2);
              var real = rp.realpathSync(p2, self.realpathCache);
              set[real] = true;
            } catch (er2) {
              if (er2.syscall === "stat")
                set[self._makeAbs(p2)] = true;
              else
                throw er2;
            }
          }
        });
      }
      common.finish(this);
    };
    GlobSync.prototype._process = function(pattern, index, inGlobStar) {
      assert2.ok(this instanceof GlobSync);
      var n3 = 0;
      while (typeof pattern[n3] === "string") {
        n3++;
      }
      var prefix;
      switch (n3) {
        case pattern.length:
          this._processSimple(pattern.join("/"), index);
          return;
        case 0:
          prefix = null;
          break;
        default:
          prefix = pattern.slice(0, n3).join("/");
          break;
      }
      var remain = pattern.slice(n3);
      var read2;
      if (prefix === null)
        read2 = ".";
      else if (isAbsolute3(prefix) || isAbsolute3(pattern.map(function(p2) {
        return typeof p2 === "string" ? p2 : "[*]";
      }).join("/"))) {
        if (!prefix || !isAbsolute3(prefix))
          prefix = "/" + prefix;
        read2 = prefix;
      } else
        read2 = prefix;
      var abs = this._makeAbs(read2);
      if (childrenIgnored(this, read2))
        return;
      var isGlobStar = remain[0] === minimatch.GLOBSTAR;
      if (isGlobStar)
        this._processGlobStar(prefix, read2, abs, remain, index, inGlobStar);
      else
        this._processReaddir(prefix, read2, abs, remain, index, inGlobStar);
    };
    GlobSync.prototype._processReaddir = function(prefix, read2, abs, remain, index, inGlobStar) {
      var entries = this._readdir(abs, inGlobStar);
      if (!entries)
        return;
      var pn2 = remain[0];
      var negate = !!this.minimatch.negate;
      var rawGlob = pn2._glob;
      var dotOk = this.dot || rawGlob.charAt(0) === ".";
      var matchedEntries = [];
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (e.charAt(0) !== "." || dotOk) {
          var m2;
          if (negate && !prefix) {
            m2 = !e.match(pn2);
          } else {
            m2 = e.match(pn2);
          }
          if (m2)
            matchedEntries.push(e);
        }
      }
      var len = matchedEntries.length;
      if (len === 0)
        return;
      if (remain.length === 1 && !this.mark && !this.stat) {
        if (!this.matches[index])
          this.matches[index] = /* @__PURE__ */ Object.create(null);
        for (var i = 0; i < len; i++) {
          var e = matchedEntries[i];
          if (prefix) {
            if (prefix.slice(-1) !== "/")
              e = prefix + "/" + e;
            else
              e = prefix + e;
          }
          if (e.charAt(0) === "/" && !this.nomount) {
            e = path.join(this.root, e);
          }
          this._emitMatch(index, e);
        }
        return;
      }
      remain.shift();
      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];
        var newPattern;
        if (prefix)
          newPattern = [prefix, e];
        else
          newPattern = [e];
        this._process(newPattern.concat(remain), index, inGlobStar);
      }
    };
    GlobSync.prototype._emitMatch = function(index, e) {
      if (isIgnored(this, e))
        return;
      var abs = this._makeAbs(e);
      if (this.mark)
        e = this._mark(e);
      if (this.absolute) {
        e = abs;
      }
      if (this.matches[index][e])
        return;
      if (this.nodir) {
        var c2 = this.cache[abs];
        if (c2 === "DIR" || Array.isArray(c2))
          return;
      }
      this.matches[index][e] = true;
      if (this.stat)
        this._stat(e);
    };
    GlobSync.prototype._readdirInGlobStar = function(abs) {
      if (this.follow)
        return this._readdir(abs, false);
      var entries;
      var lstat;
      var stat3;
      try {
        lstat = this.fs.lstatSync(abs);
      } catch (er2) {
        if (er2.code === "ENOENT") {
          return null;
        }
      }
      var isSym = lstat && lstat.isSymbolicLink();
      this.symlinks[abs] = isSym;
      if (!isSym && lstat && !lstat.isDirectory())
        this.cache[abs] = "FILE";
      else
        entries = this._readdir(abs, false);
      return entries;
    };
    GlobSync.prototype._readdir = function(abs, inGlobStar) {
      var entries;
      if (inGlobStar && !ownProp(this.symlinks, abs))
        return this._readdirInGlobStar(abs);
      if (ownProp(this.cache, abs)) {
        var c2 = this.cache[abs];
        if (!c2 || c2 === "FILE")
          return null;
        if (Array.isArray(c2))
          return c2;
      }
      try {
        return this._readdirEntries(abs, this.fs.readdirSync(abs));
      } catch (er2) {
        this._readdirError(abs, er2);
        return null;
      }
    };
    GlobSync.prototype._readdirEntries = function(abs, entries) {
      if (!this.mark && !this.stat) {
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          if (abs === "/")
            e = abs + e;
          else
            e = abs + "/" + e;
          this.cache[e] = true;
        }
      }
      this.cache[abs] = entries;
      return entries;
    };
    GlobSync.prototype._readdirError = function(f2, er2) {
      switch (er2.code) {
        case "ENOTSUP":
        case "ENOTDIR":
          var abs = this._makeAbs(f2);
          this.cache[abs] = "FILE";
          if (abs === this.cwdAbs) {
            var error2 = new Error(er2.code + " invalid cwd " + this.cwd);
            error2.path = this.cwd;
            error2.code = er2.code;
            throw error2;
          }
          break;
        case "ENOENT":
        case "ELOOP":
        case "ENAMETOOLONG":
        case "UNKNOWN":
          this.cache[this._makeAbs(f2)] = false;
          break;
        default:
          this.cache[this._makeAbs(f2)] = false;
          if (this.strict)
            throw er2;
          if (!this.silent)
            console.error("glob error", er2);
          break;
      }
    };
    GlobSync.prototype._processGlobStar = function(prefix, read2, abs, remain, index, inGlobStar) {
      var entries = this._readdir(abs, inGlobStar);
      if (!entries)
        return;
      var remainWithoutGlobStar = remain.slice(1);
      var gspref = prefix ? [prefix] : [];
      var noGlobStar = gspref.concat(remainWithoutGlobStar);
      this._process(noGlobStar, index, false);
      var len = entries.length;
      var isSym = this.symlinks[abs];
      if (isSym && inGlobStar)
        return;
      for (var i = 0; i < len; i++) {
        var e = entries[i];
        if (e.charAt(0) === "." && !this.dot)
          continue;
        var instead = gspref.concat(entries[i], remainWithoutGlobStar);
        this._process(instead, index, true);
        var below = gspref.concat(entries[i], remain);
        this._process(below, index, true);
      }
    };
    GlobSync.prototype._processSimple = function(prefix, index) {
      var exists = this._stat(prefix);
      if (!this.matches[index])
        this.matches[index] = /* @__PURE__ */ Object.create(null);
      if (!exists)
        return;
      if (prefix && isAbsolute3(prefix) && !this.nomount) {
        var trail = /[\/\\]$/.test(prefix);
        if (prefix.charAt(0) === "/") {
          prefix = path.join(this.root, prefix);
        } else {
          prefix = path.resolve(this.root, prefix);
          if (trail)
            prefix += "/";
        }
      }
      if (process.platform === "win32")
        prefix = prefix.replace(/\\/g, "/");
      this._emitMatch(index, prefix);
    };
    GlobSync.prototype._stat = function(f2) {
      var abs = this._makeAbs(f2);
      var needDir = f2.slice(-1) === "/";
      if (f2.length > this.maxLength)
        return false;
      if (!this.stat && ownProp(this.cache, abs)) {
        var c2 = this.cache[abs];
        if (Array.isArray(c2))
          c2 = "DIR";
        if (!needDir || c2 === "DIR")
          return c2;
        if (needDir && c2 === "FILE")
          return false;
      }
      var exists;
      var stat3 = this.statCache[abs];
      if (!stat3) {
        var lstat;
        try {
          lstat = this.fs.lstatSync(abs);
        } catch (er2) {
          if (er2 && (er2.code === "ENOENT" || er2.code === "ENOTDIR")) {
            this.statCache[abs] = false;
            return false;
          }
        }
        if (lstat && lstat.isSymbolicLink()) {
          try {
            stat3 = this.fs.statSync(abs);
          } catch (er2) {
            stat3 = lstat;
          }
        } else {
          stat3 = lstat;
        }
      }
      this.statCache[abs] = stat3;
      var c2 = true;
      if (stat3)
        c2 = stat3.isDirectory() ? "DIR" : "FILE";
      this.cache[abs] = this.cache[abs] || c2;
      if (needDir && c2 === "FILE")
        return false;
      return c2;
    };
    GlobSync.prototype._mark = function(p2) {
      return common.mark(this, p2);
    };
    GlobSync.prototype._makeAbs = function(f2) {
      return common.makeAbs(this, f2);
    };
  }
});

// node_modules/wrappy/wrappy.js
var require_wrappy = __commonJS({
  "node_modules/wrappy/wrappy.js"(exports, module2) {
    module2.exports = wrappy;
    function wrappy(fn2, cb) {
      if (fn2 && cb)
        return wrappy(fn2)(cb);
      if (typeof fn2 !== "function")
        throw new TypeError("need wrapper function");
      Object.keys(fn2).forEach(function(k2) {
        wrapper[k2] = fn2[k2];
      });
      return wrapper;
      function wrapper() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        var ret = fn2.apply(this, args);
        var cb2 = args[args.length - 1];
        if (typeof ret === "function" && ret !== cb2) {
          Object.keys(cb2).forEach(function(k2) {
            ret[k2] = cb2[k2];
          });
        }
        return ret;
      }
    }
  }
});

// node_modules/once/once.js
var require_once = __commonJS({
  "node_modules/once/once.js"(exports, module2) {
    var wrappy = require_wrappy();
    module2.exports = wrappy(once3);
    module2.exports.strict = wrappy(onceStrict);
    once3.proto = once3(function() {
      Object.defineProperty(Function.prototype, "once", {
        value: function() {
          return once3(this);
        },
        configurable: true
      });
      Object.defineProperty(Function.prototype, "onceStrict", {
        value: function() {
          return onceStrict(this);
        },
        configurable: true
      });
    });
    function once3(fn2) {
      var f2 = function() {
        if (f2.called)
          return f2.value;
        f2.called = true;
        return f2.value = fn2.apply(this, arguments);
      };
      f2.called = false;
      return f2;
    }
    function onceStrict(fn2) {
      var f2 = function() {
        if (f2.called)
          throw new Error(f2.onceError);
        f2.called = true;
        return f2.value = fn2.apply(this, arguments);
      };
      var name = fn2.name || "Function wrapped with `once`";
      f2.onceError = name + " shouldn't be called more than once";
      f2.called = false;
      return f2;
    }
  }
});

// node_modules/inflight/inflight.js
var require_inflight = __commonJS({
  "node_modules/inflight/inflight.js"(exports, module2) {
    var wrappy = require_wrappy();
    var reqs = /* @__PURE__ */ Object.create(null);
    var once3 = require_once();
    module2.exports = wrappy(inflight);
    function inflight(key, cb) {
      if (reqs[key]) {
        reqs[key].push(cb);
        return null;
      } else {
        reqs[key] = [cb];
        return makeres(key);
      }
    }
    function makeres(key) {
      return once3(function RES() {
        var cbs = reqs[key];
        var len = cbs.length;
        var args = slice2(arguments);
        try {
          for (var i = 0; i < len; i++) {
            cbs[i].apply(null, args);
          }
        } finally {
          if (cbs.length > len) {
            cbs.splice(0, len);
            process.nextTick(function() {
              RES.apply(null, args);
            });
          } else {
            delete reqs[key];
          }
        }
      });
    }
    function slice2(args) {
      var length = args.length;
      var array = [];
      for (var i = 0; i < length; i++)
        array[i] = args[i];
      return array;
    }
  }
});

// node_modules/@rollup/plugin-commonjs/node_modules/glob/glob.js
var require_glob = __commonJS({
  "node_modules/@rollup/plugin-commonjs/node_modules/glob/glob.js"(exports, module2) {
    module2.exports = glob2;
    var rp = require_fs();
    var minimatch = require_minimatch();
    var Minimatch = minimatch.Minimatch;
    var inherits2 = require_inherits_browser();
    var EE = (init_events(), __toCommonJS(events_exports)).EventEmitter;
    var path = (init_path2(), __toCommonJS(path_exports));
    var assert2 = (init_assert(), __toCommonJS(assert_exports));
    var isAbsolute3 = (init_path2(), __toCommonJS(path_exports)).isAbsolute;
    var globSync = require_sync2();
    var common = require_common();
    var setopts = common.setopts;
    var ownProp = common.ownProp;
    var inflight = require_inflight();
    var util = (init_util2(), __toCommonJS(util_exports));
    var childrenIgnored = common.childrenIgnored;
    var isIgnored = common.isIgnored;
    var once3 = require_once();
    function glob2(pattern, options, cb) {
      if (typeof options === "function")
        cb = options, options = {};
      if (!options)
        options = {};
      if (options.sync) {
        if (cb)
          throw new TypeError("callback provided to sync glob");
        return globSync(pattern, options);
      }
      return new Glob(pattern, options, cb);
    }
    glob2.sync = globSync;
    var GlobSync = glob2.GlobSync = globSync.GlobSync;
    glob2.glob = glob2;
    function extend(origin, add) {
      if (add === null || typeof add !== "object") {
        return origin;
      }
      var keys = Object.keys(add);
      var i = keys.length;
      while (i--) {
        origin[keys[i]] = add[keys[i]];
      }
      return origin;
    }
    glob2.hasMagic = function(pattern, options_) {
      var options = extend({}, options_);
      options.noprocess = true;
      var g2 = new Glob(pattern, options);
      var set = g2.minimatch.set;
      if (!pattern)
        return false;
      if (set.length > 1)
        return true;
      for (var j2 = 0; j2 < set[0].length; j2++) {
        if (typeof set[0][j2] !== "string")
          return true;
      }
      return false;
    };
    glob2.Glob = Glob;
    inherits2(Glob, EE);
    function Glob(pattern, options, cb) {
      if (typeof options === "function") {
        cb = options;
        options = null;
      }
      if (options && options.sync) {
        if (cb)
          throw new TypeError("callback provided to sync glob");
        return new GlobSync(pattern, options);
      }
      if (!(this instanceof Glob))
        return new Glob(pattern, options, cb);
      setopts(this, pattern, options);
      this._didRealPath = false;
      var n3 = this.minimatch.set.length;
      this.matches = new Array(n3);
      if (typeof cb === "function") {
        cb = once3(cb);
        this.on("error", cb);
        this.on("end", function(matches) {
          cb(null, matches);
        });
      }
      var self = this;
      this._processing = 0;
      this._emitQueue = [];
      this._processQueue = [];
      this.paused = false;
      if (this.noprocess)
        return this;
      if (n3 === 0)
        return done();
      var sync = true;
      for (var i = 0; i < n3; i++) {
        this._process(this.minimatch.set[i], i, false, done);
      }
      sync = false;
      function done() {
        --self._processing;
        if (self._processing <= 0) {
          if (sync) {
            process.nextTick(function() {
              self._finish();
            });
          } else {
            self._finish();
          }
        }
      }
    }
    Glob.prototype._finish = function() {
      assert2(this instanceof Glob);
      if (this.aborted)
        return;
      if (this.realpath && !this._didRealpath)
        return this._realpath();
      common.finish(this);
      this.emit("end", this.found);
    };
    Glob.prototype._realpath = function() {
      if (this._didRealpath)
        return;
      this._didRealpath = true;
      var n3 = this.matches.length;
      if (n3 === 0)
        return this._finish();
      var self = this;
      for (var i = 0; i < this.matches.length; i++)
        this._realpathSet(i, next);
      function next() {
        if (--n3 === 0)
          self._finish();
      }
    };
    Glob.prototype._realpathSet = function(index, cb) {
      var matchset = this.matches[index];
      if (!matchset)
        return cb();
      var found = Object.keys(matchset);
      var self = this;
      var n3 = found.length;
      if (n3 === 0)
        return cb();
      var set = this.matches[index] = /* @__PURE__ */ Object.create(null);
      found.forEach(function(p2, i) {
        p2 = self._makeAbs(p2);
        rp.realpath(p2, self.realpathCache, function(er2, real) {
          if (!er2)
            set[real] = true;
          else if (er2.syscall === "stat")
            set[p2] = true;
          else
            self.emit("error", er2);
          if (--n3 === 0) {
            self.matches[index] = set;
            cb();
          }
        });
      });
    };
    Glob.prototype._mark = function(p2) {
      return common.mark(this, p2);
    };
    Glob.prototype._makeAbs = function(f2) {
      return common.makeAbs(this, f2);
    };
    Glob.prototype.abort = function() {
      this.aborted = true;
      this.emit("abort");
    };
    Glob.prototype.pause = function() {
      if (!this.paused) {
        this.paused = true;
        this.emit("pause");
      }
    };
    Glob.prototype.resume = function() {
      if (this.paused) {
        this.emit("resume");
        this.paused = false;
        if (this._emitQueue.length) {
          var eq = this._emitQueue.slice(0);
          this._emitQueue.length = 0;
          for (var i = 0; i < eq.length; i++) {
            var e = eq[i];
            this._emitMatch(e[0], e[1]);
          }
        }
        if (this._processQueue.length) {
          var pq = this._processQueue.slice(0);
          this._processQueue.length = 0;
          for (var i = 0; i < pq.length; i++) {
            var p2 = pq[i];
            this._processing--;
            this._process(p2[0], p2[1], p2[2], p2[3]);
          }
        }
      }
    };
    Glob.prototype._process = function(pattern, index, inGlobStar, cb) {
      assert2(this instanceof Glob);
      assert2(typeof cb === "function");
      if (this.aborted)
        return;
      this._processing++;
      if (this.paused) {
        this._processQueue.push([pattern, index, inGlobStar, cb]);
        return;
      }
      var n3 = 0;
      while (typeof pattern[n3] === "string") {
        n3++;
      }
      var prefix;
      switch (n3) {
        case pattern.length:
          this._processSimple(pattern.join("/"), index, cb);
          return;
        case 0:
          prefix = null;
          break;
        default:
          prefix = pattern.slice(0, n3).join("/");
          break;
      }
      var remain = pattern.slice(n3);
      var read2;
      if (prefix === null)
        read2 = ".";
      else if (isAbsolute3(prefix) || isAbsolute3(pattern.map(function(p2) {
        return typeof p2 === "string" ? p2 : "[*]";
      }).join("/"))) {
        if (!prefix || !isAbsolute3(prefix))
          prefix = "/" + prefix;
        read2 = prefix;
      } else
        read2 = prefix;
      var abs = this._makeAbs(read2);
      if (childrenIgnored(this, read2))
        return cb();
      var isGlobStar = remain[0] === minimatch.GLOBSTAR;
      if (isGlobStar)
        this._processGlobStar(prefix, read2, abs, remain, index, inGlobStar, cb);
      else
        this._processReaddir(prefix, read2, abs, remain, index, inGlobStar, cb);
    };
    Glob.prototype._processReaddir = function(prefix, read2, abs, remain, index, inGlobStar, cb) {
      var self = this;
      this._readdir(abs, inGlobStar, function(er2, entries) {
        return self._processReaddir2(prefix, read2, abs, remain, index, inGlobStar, entries, cb);
      });
    };
    Glob.prototype._processReaddir2 = function(prefix, read2, abs, remain, index, inGlobStar, entries, cb) {
      if (!entries)
        return cb();
      var pn2 = remain[0];
      var negate = !!this.minimatch.negate;
      var rawGlob = pn2._glob;
      var dotOk = this.dot || rawGlob.charAt(0) === ".";
      var matchedEntries = [];
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (e.charAt(0) !== "." || dotOk) {
          var m2;
          if (negate && !prefix) {
            m2 = !e.match(pn2);
          } else {
            m2 = e.match(pn2);
          }
          if (m2)
            matchedEntries.push(e);
        }
      }
      var len = matchedEntries.length;
      if (len === 0)
        return cb();
      if (remain.length === 1 && !this.mark && !this.stat) {
        if (!this.matches[index])
          this.matches[index] = /* @__PURE__ */ Object.create(null);
        for (var i = 0; i < len; i++) {
          var e = matchedEntries[i];
          if (prefix) {
            if (prefix !== "/")
              e = prefix + "/" + e;
            else
              e = prefix + e;
          }
          if (e.charAt(0) === "/" && !this.nomount) {
            e = path.join(this.root, e);
          }
          this._emitMatch(index, e);
        }
        return cb();
      }
      remain.shift();
      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];
        var newPattern;
        if (prefix) {
          if (prefix !== "/")
            e = prefix + "/" + e;
          else
            e = prefix + e;
        }
        this._process([e].concat(remain), index, inGlobStar, cb);
      }
      cb();
    };
    Glob.prototype._emitMatch = function(index, e) {
      if (this.aborted)
        return;
      if (isIgnored(this, e))
        return;
      if (this.paused) {
        this._emitQueue.push([index, e]);
        return;
      }
      var abs = isAbsolute3(e) ? e : this._makeAbs(e);
      if (this.mark)
        e = this._mark(e);
      if (this.absolute)
        e = abs;
      if (this.matches[index][e])
        return;
      if (this.nodir) {
        var c2 = this.cache[abs];
        if (c2 === "DIR" || Array.isArray(c2))
          return;
      }
      this.matches[index][e] = true;
      var st2 = this.statCache[abs];
      if (st2)
        this.emit("stat", e, st2);
      this.emit("match", e);
    };
    Glob.prototype._readdirInGlobStar = function(abs, cb) {
      if (this.aborted)
        return;
      if (this.follow)
        return this._readdir(abs, false, cb);
      var lstatkey = "lstat\0" + abs;
      var self = this;
      var lstatcb = inflight(lstatkey, lstatcb_);
      if (lstatcb)
        self.fs.lstat(abs, lstatcb);
      function lstatcb_(er2, lstat) {
        if (er2 && er2.code === "ENOENT")
          return cb();
        var isSym = lstat && lstat.isSymbolicLink();
        self.symlinks[abs] = isSym;
        if (!isSym && lstat && !lstat.isDirectory()) {
          self.cache[abs] = "FILE";
          cb();
        } else
          self._readdir(abs, false, cb);
      }
    };
    Glob.prototype._readdir = function(abs, inGlobStar, cb) {
      if (this.aborted)
        return;
      cb = inflight("readdir\0" + abs + "\0" + inGlobStar, cb);
      if (!cb)
        return;
      if (inGlobStar && !ownProp(this.symlinks, abs))
        return this._readdirInGlobStar(abs, cb);
      if (ownProp(this.cache, abs)) {
        var c2 = this.cache[abs];
        if (!c2 || c2 === "FILE")
          return cb();
        if (Array.isArray(c2))
          return cb(null, c2);
      }
      var self = this;
      self.fs.readdir(abs, readdirCb(this, abs, cb));
    };
    function readdirCb(self, abs, cb) {
      return function(er2, entries) {
        if (er2)
          self._readdirError(abs, er2, cb);
        else
          self._readdirEntries(abs, entries, cb);
      };
    }
    Glob.prototype._readdirEntries = function(abs, entries, cb) {
      if (this.aborted)
        return;
      if (!this.mark && !this.stat) {
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          if (abs === "/")
            e = abs + e;
          else
            e = abs + "/" + e;
          this.cache[e] = true;
        }
      }
      this.cache[abs] = entries;
      return cb(null, entries);
    };
    Glob.prototype._readdirError = function(f2, er2, cb) {
      if (this.aborted)
        return;
      switch (er2.code) {
        case "ENOTSUP":
        case "ENOTDIR":
          var abs = this._makeAbs(f2);
          this.cache[abs] = "FILE";
          if (abs === this.cwdAbs) {
            var error2 = new Error(er2.code + " invalid cwd " + this.cwd);
            error2.path = this.cwd;
            error2.code = er2.code;
            this.emit("error", error2);
            this.abort();
          }
          break;
        case "ENOENT":
        case "ELOOP":
        case "ENAMETOOLONG":
        case "UNKNOWN":
          this.cache[this._makeAbs(f2)] = false;
          break;
        default:
          this.cache[this._makeAbs(f2)] = false;
          if (this.strict) {
            this.emit("error", er2);
            this.abort();
          }
          if (!this.silent)
            console.error("glob error", er2);
          break;
      }
      return cb();
    };
    Glob.prototype._processGlobStar = function(prefix, read2, abs, remain, index, inGlobStar, cb) {
      var self = this;
      this._readdir(abs, inGlobStar, function(er2, entries) {
        self._processGlobStar2(prefix, read2, abs, remain, index, inGlobStar, entries, cb);
      });
    };
    Glob.prototype._processGlobStar2 = function(prefix, read2, abs, remain, index, inGlobStar, entries, cb) {
      if (!entries)
        return cb();
      var remainWithoutGlobStar = remain.slice(1);
      var gspref = prefix ? [prefix] : [];
      var noGlobStar = gspref.concat(remainWithoutGlobStar);
      this._process(noGlobStar, index, false, cb);
      var isSym = this.symlinks[abs];
      var len = entries.length;
      if (isSym && inGlobStar)
        return cb();
      for (var i = 0; i < len; i++) {
        var e = entries[i];
        if (e.charAt(0) === "." && !this.dot)
          continue;
        var instead = gspref.concat(entries[i], remainWithoutGlobStar);
        this._process(instead, index, true, cb);
        var below = gspref.concat(entries[i], remain);
        this._process(below, index, true, cb);
      }
      cb();
    };
    Glob.prototype._processSimple = function(prefix, index, cb) {
      var self = this;
      this._stat(prefix, function(er2, exists) {
        self._processSimple2(prefix, index, er2, exists, cb);
      });
    };
    Glob.prototype._processSimple2 = function(prefix, index, er2, exists, cb) {
      if (!this.matches[index])
        this.matches[index] = /* @__PURE__ */ Object.create(null);
      if (!exists)
        return cb();
      if (prefix && isAbsolute3(prefix) && !this.nomount) {
        var trail = /[\/\\]$/.test(prefix);
        if (prefix.charAt(0) === "/") {
          prefix = path.join(this.root, prefix);
        } else {
          prefix = path.resolve(this.root, prefix);
          if (trail)
            prefix += "/";
        }
      }
      if (process.platform === "win32")
        prefix = prefix.replace(/\\/g, "/");
      this._emitMatch(index, prefix);
      cb();
    };
    Glob.prototype._stat = function(f2, cb) {
      var abs = this._makeAbs(f2);
      var needDir = f2.slice(-1) === "/";
      if (f2.length > this.maxLength)
        return cb();
      if (!this.stat && ownProp(this.cache, abs)) {
        var c2 = this.cache[abs];
        if (Array.isArray(c2))
          c2 = "DIR";
        if (!needDir || c2 === "DIR")
          return cb(null, c2);
        if (needDir && c2 === "FILE")
          return cb();
      }
      var exists;
      var stat3 = this.statCache[abs];
      if (stat3 !== void 0) {
        if (stat3 === false)
          return cb(null, stat3);
        else {
          var type2 = stat3.isDirectory() ? "DIR" : "FILE";
          if (needDir && type2 === "FILE")
            return cb();
          else
            return cb(null, type2, stat3);
        }
      }
      var self = this;
      var statcb = inflight("stat\0" + abs, lstatcb_);
      if (statcb)
        self.fs.lstat(abs, statcb);
      function lstatcb_(er2, lstat) {
        if (lstat && lstat.isSymbolicLink()) {
          return self.fs.stat(abs, function(er3, stat4) {
            if (er3)
              self._stat2(f2, abs, null, lstat, cb);
            else
              self._stat2(f2, abs, er3, stat4, cb);
          });
        } else {
          self._stat2(f2, abs, er2, lstat, cb);
        }
      }
    };
    Glob.prototype._stat2 = function(f2, abs, er2, stat3, cb) {
      if (er2 && (er2.code === "ENOENT" || er2.code === "ENOTDIR")) {
        this.statCache[abs] = false;
        return cb();
      }
      var needDir = f2.slice(-1) === "/";
      this.statCache[abs] = stat3;
      if (abs.slice(-1) === "/" && stat3 && !stat3.isDirectory())
        return cb(null, false, stat3);
      var c2 = true;
      if (stat3)
        c2 = stat3.isDirectory() ? "DIR" : "FILE";
      this.cache[abs] = this.cache[abs] || c2;
      if (needDir && c2 === "FILE")
        return cb();
      return cb(null, c2, stat3);
    };
  }
});

// src/entryPoint.js
var entryPoint_exports = {};
__export(entryPoint_exports, {
  bundle: () => bundle
});
module.exports = __toCommonJS(entryPoint_exports);

// node_modules/rollup/dist/es/rollup.browser.js
for (e = "2.79.1", t = {}, i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", s = 0; s < i.length; s++)
  t[i.charCodeAt(s)] = s;
var e;
var t;
var i;
var s;
function n(e, t, i) {
  4 === i ? e.push([t[0], t[1], t[2], t[3]]) : 5 === i ? e.push([t[0], t[1], t[2], t[3], t[4]]) : 1 === i && e.push([t[0]]);
}
function r(e) {
  var t = "";
  e = e < 0 ? -e << 1 | 1 : e << 1;
  do {
    var s = 31 & e;
    (e >>>= 5) > 0 && (s |= 32), t += i[s];
  } while (e > 0);
  return t;
}
var a = class {
  constructor(e) {
    this.bits = e instanceof a ? e.bits.slice() : [];
  }
  add(e) {
    this.bits[e >> 5] |= 1 << (31 & e);
  }
  has(e) {
    return !!(this.bits[e >> 5] & 1 << (31 & e));
  }
};
var o = class {
  constructor(e, t, i) {
    this.start = e, this.end = t, this.original = i, this.intro = "", this.outro = "", this.content = i, this.storeName = false, this.edited = false, Object.defineProperties(this, { previous: { writable: true, value: null }, next: { writable: true, value: null } });
  }
  appendLeft(e) {
    this.outro += e;
  }
  appendRight(e) {
    this.intro = this.intro + e;
  }
  clone() {
    const e = new o(this.start, this.end, this.original);
    return e.intro = this.intro, e.outro = this.outro, e.content = this.content, e.storeName = this.storeName, e.edited = this.edited, e;
  }
  contains(e) {
    return this.start < e && e < this.end;
  }
  eachNext(e) {
    let t = this;
    for (; t; )
      e(t), t = t.next;
  }
  eachPrevious(e) {
    let t = this;
    for (; t; )
      e(t), t = t.previous;
  }
  edit(e, t, i) {
    return this.content = e, i || (this.intro = "", this.outro = ""), this.storeName = t, this.edited = true, this;
  }
  prependLeft(e) {
    this.outro = e + this.outro;
  }
  prependRight(e) {
    this.intro = e + this.intro;
  }
  split(e) {
    const t = e - this.start, i = this.original.slice(0, t), s = this.original.slice(t);
    this.original = i;
    const n3 = new o(e, this.end, s);
    return n3.outro = this.outro, this.outro = "", this.end = e, this.edited ? (n3.edit("", false), this.content = "") : this.content = i, n3.next = this.next, n3.next && (n3.next.previous = n3), n3.previous = this, this.next = n3, n3;
  }
  toString() {
    return this.intro + this.content + this.outro;
  }
  trimEnd(e) {
    if (this.outro = this.outro.replace(e, ""), this.outro.length)
      return true;
    const t = this.content.replace(e, "");
    return t.length ? (t !== this.content && this.split(this.start + t.length).edit("", void 0, true), true) : (this.edit("", void 0, true), this.intro = this.intro.replace(e, ""), !!this.intro.length || void 0);
  }
  trimStart(e) {
    if (this.intro = this.intro.replace(e, ""), this.intro.length)
      return true;
    const t = this.content.replace(e, "");
    return t.length ? (t !== this.content && (this.split(this.end - t.length), this.edit("", void 0, true)), true) : (this.edit("", void 0, true), this.outro = this.outro.replace(e, ""), !!this.outro.length || void 0);
  }
};
var l = () => {
  throw new Error("Unsupported environment: `window.btoa` or `Buffer` should be supported.");
};
"undefined" != typeof window && "function" == typeof window.btoa ? l = (e) => window.btoa(unescape(encodeURIComponent(e))) : "function" == typeof Buffer && (l = (e) => Buffer.from(e, "utf-8").toString("base64"));
var h = class {
  constructor(e) {
    this.version = 3, this.file = e.file, this.sources = e.sources, this.sourcesContent = e.sourcesContent, this.names = e.names, this.mappings = function(e2) {
      for (var t = 0, i = 0, s = 0, n3 = 0, a2 = "", o2 = 0; o2 < e2.length; o2++) {
        var l2 = e2[o2];
        if (o2 > 0 && (a2 += ";"), 0 !== l2.length) {
          for (var h2 = 0, c2 = [], u2 = 0, d2 = l2; u2 < d2.length; u2++) {
            var p2 = d2[u2], f2 = r(p2[0] - h2);
            h2 = p2[0], p2.length > 1 && (f2 += r(p2[1] - t) + r(p2[2] - i) + r(p2[3] - s), t = p2[1], i = p2[2], s = p2[3]), 5 === p2.length && (f2 += r(p2[4] - n3), n3 = p2[4]), c2.push(f2);
          }
          a2 += c2.join(",");
        }
      }
      return a2;
    }(e.mappings);
  }
  toString() {
    return JSON.stringify(this);
  }
  toUrl() {
    return "data:application/json;charset=utf-8;base64," + l(this.toString());
  }
};
function c(e) {
  const t = e.split("\n"), i = t.filter((e2) => /^\t+/.test(e2)), s = t.filter((e2) => /^ {2,}/.test(e2));
  if (0 === i.length && 0 === s.length)
    return null;
  if (i.length >= s.length)
    return "	";
  const n3 = s.reduce((e2, t2) => {
    const i2 = /^ +/.exec(t2)[0].length;
    return Math.min(i2, e2);
  }, 1 / 0);
  return new Array(n3 + 1).join(" ");
}
function u(e, t) {
  const i = e.split(/[/\\]/), s = t.split(/[/\\]/);
  for (i.pop(); i[0] === s[0]; )
    i.shift(), s.shift();
  if (i.length) {
    let e2 = i.length;
    for (; e2--; )
      i[e2] = "..";
  }
  return i.concat(s).join("/");
}
var d = Object.prototype.toString;
function p(e) {
  return "[object Object]" === d.call(e);
}
function f(e) {
  const t = e.split("\n"), i = [];
  for (let e2 = 0, s = 0; e2 < t.length; e2++)
    i.push(s), s += t[e2].length + 1;
  return function(e2) {
    let t2 = 0, s = i.length;
    for (; t2 < s; ) {
      const n4 = t2 + s >> 1;
      e2 < i[n4] ? s = n4 : t2 = n4 + 1;
    }
    const n3 = t2 - 1;
    return { line: n3, column: e2 - i[n3] };
  };
}
var m = class {
  constructor(e) {
    this.hires = e, this.generatedCodeLine = 0, this.generatedCodeColumn = 0, this.raw = [], this.rawSegments = this.raw[this.generatedCodeLine] = [], this.pending = null;
  }
  addEdit(e, t, i, s) {
    if (t.length) {
      const t2 = [this.generatedCodeColumn, e, i.line, i.column];
      s >= 0 && t2.push(s), this.rawSegments.push(t2);
    } else
      this.pending && this.rawSegments.push(this.pending);
    this.advance(t), this.pending = null;
  }
  addUneditedChunk(e, t, i, s, n3) {
    let r2 = t.start, a2 = true;
    for (; r2 < t.end; )
      (this.hires || a2 || n3.has(r2)) && this.rawSegments.push([this.generatedCodeColumn, e, s.line, s.column]), "\n" === i[r2] ? (s.line += 1, s.column = 0, this.generatedCodeLine += 1, this.raw[this.generatedCodeLine] = this.rawSegments = [], this.generatedCodeColumn = 0, a2 = true) : (s.column += 1, this.generatedCodeColumn += 1, a2 = false), r2 += 1;
    this.pending = null;
  }
  advance(e) {
    if (!e)
      return;
    const t = e.split("\n");
    if (t.length > 1) {
      for (let e2 = 0; e2 < t.length - 1; e2++)
        this.generatedCodeLine++, this.raw[this.generatedCodeLine] = this.rawSegments = [];
      this.generatedCodeColumn = 0;
    }
    this.generatedCodeColumn += t[t.length - 1].length;
  }
};
var g = "\n";
var y = { insertLeft: false, insertRight: false, storeName: false };
var x = class {
  constructor(e, t = {}) {
    const i = new o(0, e.length, e);
    Object.defineProperties(this, { original: { writable: true, value: e }, outro: { writable: true, value: "" }, intro: { writable: true, value: "" }, firstChunk: { writable: true, value: i }, lastChunk: { writable: true, value: i }, lastSearchedChunk: { writable: true, value: i }, byStart: { writable: true, value: {} }, byEnd: { writable: true, value: {} }, filename: { writable: true, value: t.filename }, indentExclusionRanges: { writable: true, value: t.indentExclusionRanges }, sourcemapLocations: { writable: true, value: new a() }, storedNames: { writable: true, value: {} }, indentStr: { writable: true, value: c(e) } }), this.byStart[0] = i, this.byEnd[e.length] = i;
  }
  addSourcemapLocation(e) {
    this.sourcemapLocations.add(e);
  }
  append(e) {
    if ("string" != typeof e)
      throw new TypeError("outro content must be a string");
    return this.outro += e, this;
  }
  appendLeft(e, t) {
    if ("string" != typeof t)
      throw new TypeError("inserted content must be a string");
    this._split(e);
    const i = this.byEnd[e];
    return i ? i.appendLeft(t) : this.intro += t, this;
  }
  appendRight(e, t) {
    if ("string" != typeof t)
      throw new TypeError("inserted content must be a string");
    this._split(e);
    const i = this.byStart[e];
    return i ? i.appendRight(t) : this.outro += t, this;
  }
  clone() {
    const e = new x(this.original, { filename: this.filename });
    let t = this.firstChunk, i = e.firstChunk = e.lastSearchedChunk = t.clone();
    for (; t; ) {
      e.byStart[i.start] = i, e.byEnd[i.end] = i;
      const s = t.next, n3 = s && s.clone();
      n3 && (i.next = n3, n3.previous = i, i = n3), t = s;
    }
    return e.lastChunk = i, this.indentExclusionRanges && (e.indentExclusionRanges = this.indentExclusionRanges.slice()), e.sourcemapLocations = new a(this.sourcemapLocations), e.intro = this.intro, e.outro = this.outro, e;
  }
  generateDecodedMap(e) {
    e = e || {};
    const t = Object.keys(this.storedNames), i = new m(e.hires), s = f(this.original);
    return this.intro && i.advance(this.intro), this.firstChunk.eachNext((e2) => {
      const n3 = s(e2.start);
      e2.intro.length && i.advance(e2.intro), e2.edited ? i.addEdit(0, e2.content, n3, e2.storeName ? t.indexOf(e2.original) : -1) : i.addUneditedChunk(0, e2, this.original, n3, this.sourcemapLocations), e2.outro.length && i.advance(e2.outro);
    }), { file: e.file ? e.file.split(/[/\\]/).pop() : null, sources: [e.source ? u(e.file || "", e.source) : null], sourcesContent: e.includeContent ? [this.original] : [null], names: t, mappings: i.raw };
  }
  generateMap(e) {
    return new h(this.generateDecodedMap(e));
  }
  getIndentString() {
    return null === this.indentStr ? "	" : this.indentStr;
  }
  indent(e, t) {
    const i = /^[^\r\n]/gm;
    if (p(e) && (t = e, e = void 0), "" === (e = void 0 !== e ? e : this.indentStr || "	"))
      return this;
    const s = {};
    if ((t = t || {}).exclude) {
      ("number" == typeof t.exclude[0] ? [t.exclude] : t.exclude).forEach((e2) => {
        for (let t2 = e2[0]; t2 < e2[1]; t2 += 1)
          s[t2] = true;
      });
    }
    let n3 = false !== t.indentStart;
    const r2 = (t2) => n3 ? `${e}${t2}` : (n3 = true, t2);
    this.intro = this.intro.replace(i, r2);
    let a2 = 0, o2 = this.firstChunk;
    for (; o2; ) {
      const t2 = o2.end;
      if (o2.edited)
        s[a2] || (o2.content = o2.content.replace(i, r2), o2.content.length && (n3 = "\n" === o2.content[o2.content.length - 1]));
      else
        for (a2 = o2.start; a2 < t2; ) {
          if (!s[a2]) {
            const t3 = this.original[a2];
            "\n" === t3 ? n3 = true : "\r" !== t3 && n3 && (n3 = false, a2 === o2.start || (this._splitChunk(o2, a2), o2 = o2.next), o2.prependRight(e));
          }
          a2 += 1;
        }
      a2 = o2.end, o2 = o2.next;
    }
    return this.outro = this.outro.replace(i, r2), this;
  }
  insert() {
    throw new Error("magicString.insert(...) is deprecated. Use prependRight(...) or appendLeft(...)");
  }
  insertLeft(e, t) {
    return y.insertLeft || (console.warn("magicString.insertLeft(...) is deprecated. Use magicString.appendLeft(...) instead"), y.insertLeft = true), this.appendLeft(e, t);
  }
  insertRight(e, t) {
    return y.insertRight || (console.warn("magicString.insertRight(...) is deprecated. Use magicString.prependRight(...) instead"), y.insertRight = true), this.prependRight(e, t);
  }
  move(e, t, i) {
    if (i >= e && i <= t)
      throw new Error("Cannot move a selection inside itself");
    this._split(e), this._split(t), this._split(i);
    const s = this.byStart[e], n3 = this.byEnd[t], r2 = s.previous, a2 = n3.next, o2 = this.byStart[i];
    if (!o2 && n3 === this.lastChunk)
      return this;
    const l2 = o2 ? o2.previous : this.lastChunk;
    return r2 && (r2.next = a2), a2 && (a2.previous = r2), l2 && (l2.next = s), o2 && (o2.previous = n3), s.previous || (this.firstChunk = n3.next), n3.next || (this.lastChunk = s.previous, this.lastChunk.next = null), s.previous = l2, n3.next = o2 || null, l2 || (this.firstChunk = s), o2 || (this.lastChunk = n3), this;
  }
  overwrite(e, t, i, s) {
    if ("string" != typeof i)
      throw new TypeError("replacement content must be a string");
    for (; e < 0; )
      e += this.original.length;
    for (; t < 0; )
      t += this.original.length;
    if (t > this.original.length)
      throw new Error("end is out of bounds");
    if (e === t)
      throw new Error("Cannot overwrite a zero-length range \u2013 use appendLeft or prependRight instead");
    this._split(e), this._split(t), true === s && (y.storeName || (console.warn("The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string"), y.storeName = true), s = { storeName: true });
    const n3 = void 0 !== s && s.storeName, r2 = void 0 !== s && s.contentOnly;
    if (n3) {
      const i2 = this.original.slice(e, t);
      Object.defineProperty(this.storedNames, i2, { writable: true, value: true, enumerable: true });
    }
    const a2 = this.byStart[e], l2 = this.byEnd[t];
    if (a2) {
      let e2 = a2;
      for (; e2 !== l2; ) {
        if (e2.next !== this.byStart[e2.end])
          throw new Error("Cannot overwrite across a split point");
        e2 = e2.next, e2.edit("", false);
      }
      a2.edit(i, n3, r2);
    } else {
      const s2 = new o(e, t, "").edit(i, n3);
      l2.next = s2, s2.previous = l2;
    }
    return this;
  }
  prepend(e) {
    if ("string" != typeof e)
      throw new TypeError("outro content must be a string");
    return this.intro = e + this.intro, this;
  }
  prependLeft(e, t) {
    if ("string" != typeof t)
      throw new TypeError("inserted content must be a string");
    this._split(e);
    const i = this.byEnd[e];
    return i ? i.prependLeft(t) : this.intro = t + this.intro, this;
  }
  prependRight(e, t) {
    if ("string" != typeof t)
      throw new TypeError("inserted content must be a string");
    this._split(e);
    const i = this.byStart[e];
    return i ? i.prependRight(t) : this.outro = t + this.outro, this;
  }
  remove(e, t) {
    for (; e < 0; )
      e += this.original.length;
    for (; t < 0; )
      t += this.original.length;
    if (e === t)
      return this;
    if (e < 0 || t > this.original.length)
      throw new Error("Character is out of bounds");
    if (e > t)
      throw new Error("end must be greater than start");
    this._split(e), this._split(t);
    let i = this.byStart[e];
    for (; i; )
      i.intro = "", i.outro = "", i.edit(""), i = t > i.end ? this.byStart[i.end] : null;
    return this;
  }
  lastChar() {
    if (this.outro.length)
      return this.outro[this.outro.length - 1];
    let e = this.lastChunk;
    do {
      if (e.outro.length)
        return e.outro[e.outro.length - 1];
      if (e.content.length)
        return e.content[e.content.length - 1];
      if (e.intro.length)
        return e.intro[e.intro.length - 1];
    } while (e = e.previous);
    return this.intro.length ? this.intro[this.intro.length - 1] : "";
  }
  lastLine() {
    let e = this.outro.lastIndexOf(g);
    if (-1 !== e)
      return this.outro.substr(e + 1);
    let t = this.outro, i = this.lastChunk;
    do {
      if (i.outro.length > 0) {
        if (e = i.outro.lastIndexOf(g), -1 !== e)
          return i.outro.substr(e + 1) + t;
        t = i.outro + t;
      }
      if (i.content.length > 0) {
        if (e = i.content.lastIndexOf(g), -1 !== e)
          return i.content.substr(e + 1) + t;
        t = i.content + t;
      }
      if (i.intro.length > 0) {
        if (e = i.intro.lastIndexOf(g), -1 !== e)
          return i.intro.substr(e + 1) + t;
        t = i.intro + t;
      }
    } while (i = i.previous);
    return e = this.intro.lastIndexOf(g), -1 !== e ? this.intro.substr(e + 1) + t : this.intro + t;
  }
  slice(e = 0, t = this.original.length) {
    for (; e < 0; )
      e += this.original.length;
    for (; t < 0; )
      t += this.original.length;
    let i = "", s = this.firstChunk;
    for (; s && (s.start > e || s.end <= e); ) {
      if (s.start < t && s.end >= t)
        return i;
      s = s.next;
    }
    if (s && s.edited && s.start !== e)
      throw new Error(`Cannot use replaced character ${e} as slice start anchor.`);
    const n3 = s;
    for (; s; ) {
      !s.intro || n3 === s && s.start !== e || (i += s.intro);
      const r2 = s.start < t && s.end >= t;
      if (r2 && s.edited && s.end !== t)
        throw new Error(`Cannot use replaced character ${t} as slice end anchor.`);
      const a2 = n3 === s ? e - s.start : 0, o2 = r2 ? s.content.length + t - s.end : s.content.length;
      if (i += s.content.slice(a2, o2), !s.outro || r2 && s.end !== t || (i += s.outro), r2)
        break;
      s = s.next;
    }
    return i;
  }
  snip(e, t) {
    const i = this.clone();
    return i.remove(0, e), i.remove(t, i.original.length), i;
  }
  _split(e) {
    if (this.byStart[e] || this.byEnd[e])
      return;
    let t = this.lastSearchedChunk;
    const i = e > t.end;
    for (; t; ) {
      if (t.contains(e))
        return this._splitChunk(t, e);
      t = i ? this.byStart[t.end] : this.byEnd[t.start];
    }
  }
  _splitChunk(e, t) {
    if (e.edited && e.content.length) {
      const i2 = f(this.original)(t);
      throw new Error(`Cannot split a chunk that has already been edited (${i2.line}:${i2.column} \u2013 "${e.original}")`);
    }
    const i = e.split(t);
    return this.byEnd[t] = e, this.byStart[t] = i, this.byEnd[i.end] = i, e === this.lastChunk && (this.lastChunk = i), this.lastSearchedChunk = e, true;
  }
  toString() {
    let e = this.intro, t = this.firstChunk;
    for (; t; )
      e += t.toString(), t = t.next;
    return e + this.outro;
  }
  isEmpty() {
    let e = this.firstChunk;
    do {
      if (e.intro.length && e.intro.trim() || e.content.length && e.content.trim() || e.outro.length && e.outro.trim())
        return false;
    } while (e = e.next);
    return true;
  }
  length() {
    let e = this.firstChunk, t = 0;
    do {
      t += e.intro.length + e.content.length + e.outro.length;
    } while (e = e.next);
    return t;
  }
  trimLines() {
    return this.trim("[\\r\\n]");
  }
  trim(e) {
    return this.trimStart(e).trimEnd(e);
  }
  trimEndAborted(e) {
    const t = new RegExp((e || "\\s") + "+$");
    if (this.outro = this.outro.replace(t, ""), this.outro.length)
      return true;
    let i = this.lastChunk;
    do {
      const e2 = i.end, s = i.trimEnd(t);
      if (i.end !== e2 && (this.lastChunk === i && (this.lastChunk = i.next), this.byEnd[i.end] = i, this.byStart[i.next.start] = i.next, this.byEnd[i.next.end] = i.next), s)
        return true;
      i = i.previous;
    } while (i);
    return false;
  }
  trimEnd(e) {
    return this.trimEndAborted(e), this;
  }
  trimStartAborted(e) {
    const t = new RegExp("^" + (e || "\\s") + "+");
    if (this.intro = this.intro.replace(t, ""), this.intro.length)
      return true;
    let i = this.firstChunk;
    do {
      const e2 = i.end, s = i.trimStart(t);
      if (i.end !== e2 && (i === this.lastChunk && (this.lastChunk = i.next), this.byEnd[i.end] = i, this.byStart[i.next.start] = i.next, this.byEnd[i.next.end] = i.next), s)
        return true;
      i = i.next;
    } while (i);
    return false;
  }
  trimStart(e) {
    return this.trimStartAborted(e), this;
  }
  hasChanged() {
    return this.original !== this.toString();
  }
  replace(e, t) {
    function i(e2, i2) {
      return "string" == typeof t ? t.replace(/\$(\$|&|\d+)/g, (t2, i3) => {
        if ("$" === i3)
          return "$";
        if ("&" === i3)
          return e2[0];
        return +i3 < e2.length ? e2[+i3] : `$${i3}`;
      }) : t(...e2, e2.index, i2, e2.groups);
    }
    if ("string" != typeof e && e.global) {
      (function(e2, t2) {
        let i2;
        const s = [];
        for (; i2 = e2.exec(t2); )
          s.push(i2);
        return s;
      })(e, this.original).forEach((e2) => {
        null != e2.index && this.overwrite(e2.index, e2.index + e2[0].length, i(e2, this.original));
      });
    } else {
      const t2 = this.original.match(e);
      t2 && null != t2.index && this.overwrite(t2.index, t2.index + t2[0].length, i(t2, this.original));
    }
    return this;
  }
};
var E = Object.prototype.hasOwnProperty;
var b = class {
  constructor(e = {}) {
    this.intro = e.intro || "", this.separator = void 0 !== e.separator ? e.separator : "\n", this.sources = [], this.uniqueSources = [], this.uniqueSourceIndexByFilename = {};
  }
  addSource(e) {
    if (e instanceof x)
      return this.addSource({ content: e, filename: e.filename, separator: this.separator });
    if (!p(e) || !e.content)
      throw new Error("bundle.addSource() takes an object with a `content` property, which should be an instance of MagicString, and an optional `filename`");
    if (["filename", "indentExclusionRanges", "separator"].forEach((t) => {
      E.call(e, t) || (e[t] = e.content[t]);
    }), void 0 === e.separator && (e.separator = this.separator), e.filename)
      if (E.call(this.uniqueSourceIndexByFilename, e.filename)) {
        const t = this.uniqueSources[this.uniqueSourceIndexByFilename[e.filename]];
        if (e.content.original !== t.content)
          throw new Error(`Illegal source: same filename (${e.filename}), different contents`);
      } else
        this.uniqueSourceIndexByFilename[e.filename] = this.uniqueSources.length, this.uniqueSources.push({ filename: e.filename, content: e.content.original });
    return this.sources.push(e), this;
  }
  append(e, t) {
    return this.addSource({ content: new x(e), separator: t && t.separator || "" }), this;
  }
  clone() {
    const e = new b({ intro: this.intro, separator: this.separator });
    return this.sources.forEach((t) => {
      e.addSource({ filename: t.filename, content: t.content.clone(), separator: t.separator });
    }), e;
  }
  generateDecodedMap(e = {}) {
    const t = [];
    this.sources.forEach((e2) => {
      Object.keys(e2.content.storedNames).forEach((e3) => {
        ~t.indexOf(e3) || t.push(e3);
      });
    });
    const i = new m(e.hires);
    return this.intro && i.advance(this.intro), this.sources.forEach((e2, s) => {
      s > 0 && i.advance(this.separator);
      const n3 = e2.filename ? this.uniqueSourceIndexByFilename[e2.filename] : -1, r2 = e2.content, a2 = f(r2.original);
      r2.intro && i.advance(r2.intro), r2.firstChunk.eachNext((s2) => {
        const o2 = a2(s2.start);
        s2.intro.length && i.advance(s2.intro), e2.filename ? s2.edited ? i.addEdit(n3, s2.content, o2, s2.storeName ? t.indexOf(s2.original) : -1) : i.addUneditedChunk(n3, s2, r2.original, o2, r2.sourcemapLocations) : i.advance(s2.content), s2.outro.length && i.advance(s2.outro);
      }), r2.outro && i.advance(r2.outro);
    }), { file: e.file ? e.file.split(/[/\\]/).pop() : null, sources: this.uniqueSources.map((t2) => e.file ? u(e.file, t2.filename) : t2.filename), sourcesContent: this.uniqueSources.map((t2) => e.includeContent ? t2.content : null), names: t, mappings: i.raw };
  }
  generateMap(e) {
    return new h(this.generateDecodedMap(e));
  }
  getIndentString() {
    const e = {};
    return this.sources.forEach((t) => {
      const i = t.content.indentStr;
      null !== i && (e[i] || (e[i] = 0), e[i] += 1);
    }), Object.keys(e).sort((t, i) => e[t] - e[i])[0] || "	";
  }
  indent(e) {
    if (arguments.length || (e = this.getIndentString()), "" === e)
      return this;
    let t = !this.intro || "\n" === this.intro.slice(-1);
    return this.sources.forEach((i, s) => {
      const n3 = void 0 !== i.separator ? i.separator : this.separator, r2 = t || s > 0 && /\r?\n$/.test(n3);
      i.content.indent(e, { exclude: i.indentExclusionRanges, indentStart: r2 }), t = "\n" === i.content.lastChar();
    }), this.intro && (this.intro = e + this.intro.replace(/^[^\n]/gm, (t2, i) => i > 0 ? e + t2 : t2)), this;
  }
  prepend(e) {
    return this.intro = e + this.intro, this;
  }
  toString() {
    const e = this.sources.map((e2, t) => {
      const i = void 0 !== e2.separator ? e2.separator : this.separator;
      return (t > 0 ? i : "") + e2.content.toString();
    }).join("");
    return this.intro + e;
  }
  isEmpty() {
    return (!this.intro.length || !this.intro.trim()) && !this.sources.some((e) => !e.content.isEmpty());
  }
  length() {
    return this.sources.reduce((e, t) => e + t.content.length(), this.intro.length);
  }
  trimLines() {
    return this.trim("[\\r\\n]");
  }
  trim(e) {
    return this.trimStart(e).trimEnd(e);
  }
  trimStart(e) {
    const t = new RegExp("^" + (e || "\\s") + "+");
    if (this.intro = this.intro.replace(t, ""), !this.intro) {
      let t2, i = 0;
      do {
        if (t2 = this.sources[i++], !t2)
          break;
      } while (!t2.content.trimStartAborted(e));
    }
    return this;
  }
  trimEnd(e) {
    const t = new RegExp((e || "\\s") + "+$");
    let i, s = this.sources.length - 1;
    do {
      if (i = this.sources[s--], !i) {
        this.intro = this.intro.replace(t, "");
        break;
      }
    } while (!i.content.trimEndAborted(e));
    return this;
  }
};
var v = /^(?:\/|(?:[A-Za-z]:)?[\\|/])/;
var S = /^\.?\.\//;
var A = /\\/g;
var I = /[/\\]/;
var P = /\.[^.]+$/;
function k(e) {
  return v.test(e);
}
function w(e) {
  return S.test(e);
}
function C(e) {
  return e.replace(A, "/");
}
function _(e) {
  return e.split(I).pop() || "";
}
function N(e) {
  const t = /[/\\][^/\\]*$/.exec(e);
  if (!t)
    return ".";
  const i = e.slice(0, -t[0].length);
  return i || "/";
}
function $(e) {
  const t = P.exec(_(e));
  return t ? t[0] : "";
}
function T(e, t) {
  const i = e.split(I).filter(Boolean), s = t.split(I).filter(Boolean);
  for ("." === i[0] && i.shift(), "." === s[0] && s.shift(); i[0] && s[0] && i[0] === s[0]; )
    i.shift(), s.shift();
  for (; ".." === s[0] && i.length > 0; )
    s.shift(), i.pop();
  for (; i.pop(); )
    s.unshift("..");
  return s.join("/");
}
function O(...e) {
  const t = e.shift();
  if (!t)
    return "/";
  let i = t.split(I);
  for (const t2 of e)
    if (k(t2))
      i = t2.split(I);
    else {
      const e2 = t2.split(I);
      for (; "." === e2[0] || ".." === e2[0]; ) {
        ".." === e2.shift() && i.pop();
      }
      i.push(...e2);
    }
  return i.join("/");
}
function R(e, t, i) {
  const s = e.get(t);
  if (s)
    return s;
  const n3 = i();
  return e.set(t, n3), n3;
}
var M = Symbol("Unknown Key");
var D = Symbol("Unknown Non-Accessor Key");
var L = Symbol("Unknown Integer");
var V = [];
var B = [M];
var F = [D];
var z = [L];
var j = Symbol("Entities");
var U = class {
  constructor() {
    this.entityPaths = Object.create(null, { [j]: { value: /* @__PURE__ */ new Set() } });
  }
  trackEntityAtPathAndGetIfTracked(e, t) {
    const i = this.getEntities(e);
    return !!i.has(t) || (i.add(t), false);
  }
  withTrackedEntityAtPath(e, t, i, s) {
    const n3 = this.getEntities(e);
    if (n3.has(t))
      return s;
    n3.add(t);
    const r2 = i();
    return n3.delete(t), r2;
  }
  getEntities(e) {
    let t = this.entityPaths;
    for (const i of e)
      t = t[i] = t[i] || Object.create(null, { [j]: { value: /* @__PURE__ */ new Set() } });
    return t[j];
  }
};
var G = new U();
var H = class {
  constructor() {
    this.entityPaths = Object.create(null, { [j]: { value: /* @__PURE__ */ new Map() } });
  }
  trackEntityAtPathAndGetIfTracked(e, t, i) {
    let s = this.entityPaths;
    for (const t2 of e)
      s = s[t2] = s[t2] || Object.create(null, { [j]: { value: /* @__PURE__ */ new Map() } });
    const n3 = R(s[j], t, () => /* @__PURE__ */ new Set());
    return !!n3.has(i) || (n3.add(i), false);
  }
};
var W = Symbol("Unknown Value");
var q = Symbol("Unknown Truthy Value");
var K = class {
  constructor() {
    this.included = false;
  }
  deoptimizePath(e) {
  }
  deoptimizeThisOnInteractionAtPath({ thisArg: e }, t, i) {
    e.deoptimizePath(B);
  }
  getLiteralValueAtPath(e, t, i) {
    return W;
  }
  getReturnExpressionWhenCalledAtPath(e, t, i, s) {
    return X;
  }
  hasEffectsOnInteractionAtPath(e, t, i) {
    return true;
  }
  include(e, t, i) {
    this.included = true;
  }
  includeCallArguments(e, t) {
    for (const i of t)
      i.include(e, false);
  }
  shouldBeIncluded(e) {
    return true;
  }
};
var X = new class extends K {
}();
var Y = { thisArg: null, type: 0 };
var Q = { args: [X], thisArg: null, type: 1 };
var J = [];
var Z = { args: J, thisArg: null, type: 2, withNew: false };
var ee = class extends K {
  constructor(e) {
    super(), this.name = e, this.alwaysRendered = false, this.initReached = false, this.isId = false, this.isReassigned = false, this.kind = null, this.renderBaseName = null, this.renderName = null;
  }
  addReference(e) {
  }
  getBaseVariableName() {
    return this.renderBaseName || this.renderName || this.name;
  }
  getName(e) {
    const t = this.renderName || this.name;
    return this.renderBaseName ? `${this.renderBaseName}${e(t)}` : t;
  }
  hasEffectsOnInteractionAtPath(e, { type: t }, i) {
    return 0 !== t || e.length > 0;
  }
  include() {
    this.included = true;
  }
  markCalledFromTryStatement() {
  }
  setRenderNames(e, t) {
    this.renderBaseName = e, this.renderName = t;
  }
};
var te = class extends ee {
  constructor(e, t) {
    super(t), this.referenced = false, this.module = e, this.isNamespace = "*" === t;
  }
  addReference(e) {
    this.referenced = true, "default" !== this.name && "*" !== this.name || this.module.suggestName(e.name);
  }
  hasEffectsOnInteractionAtPath(e, { type: t }) {
    return 0 !== t || e.length > (this.isNamespace ? 1 : 0);
  }
  include() {
    this.included || (this.included = true, this.module.used = true);
  }
};
var ie = Object.freeze(/* @__PURE__ */ Object.create(null));
var se = Object.freeze({});
var ne = Object.freeze([]);
function re(e, t, i) {
  if ("number" == typeof i)
    throw new Error("locate takes a { startIndex, offsetLine, offsetColumn } object as the third argument");
  return function(e2, t2) {
    void 0 === t2 && (t2 = {});
    var i2 = t2.offsetLine || 0, s = t2.offsetColumn || 0, n3 = e2.split("\n"), r2 = 0, a2 = n3.map(function(e3, t3) {
      var i3 = r2 + e3.length + 1, s2 = { start: r2, end: i3, line: t3 };
      return r2 = i3, s2;
    }), o2 = 0;
    function l2(e3, t3) {
      return e3.start <= t3 && t3 < e3.end;
    }
    function h2(e3, t3) {
      return { line: i2 + e3.line, column: s + t3 - e3.start, character: t3 };
    }
    return function(t3, i3) {
      "string" == typeof t3 && (t3 = e2.indexOf(t3, i3 || 0));
      for (var s2 = a2[o2], n4 = t3 >= s2.end ? 1 : -1; s2; ) {
        if (l2(s2, t3))
          return h2(s2, t3);
        s2 = a2[o2 += n4];
      }
    };
  }(e, i)(t, i && i.startIndex);
}
function ae(e) {
  return e.replace(/^\t+/, (e2) => e2.split("	").join("  "));
}
function oe(e, t) {
  const i = e.length <= 1, s = e.map((e2) => `"${e2}"`);
  let n3 = i ? s[0] : `${s.slice(0, -1).join(", ")} and ${s.slice(-1)[0]}`;
  return t && (n3 += ` ${i ? t[0] : t[1]}`), n3;
}
function le(e) {
  const t = _(e);
  return t.substring(0, t.length - $(e).length);
}
function he(e) {
  return k(e) ? T(O(), e) : e;
}
function ce(e) {
  return "/" === e[0] || "." === e[0] && ("/" === e[1] || "." === e[1]) || k(e);
}
var ue = /^(\.\.\/)*\.\.$/;
function de(e, t, i, s) {
  let n3 = C(T(N(e), t));
  if (i && n3.endsWith(".js") && (n3 = n3.slice(0, -3)), s) {
    if ("" === n3)
      return "../" + _(t);
    if (ue.test(n3))
      return n3.split("/").concat(["..", _(t)]).join("/");
  }
  return n3 ? n3.startsWith("..") ? n3 : "./" + n3 : ".";
}
function pe(e) {
  throw e instanceof Error || (e = Object.assign(new Error(e.message), e)), e;
}
function fe(e, t, i, s) {
  if ("object" == typeof t) {
    const { line: i2, column: n3 } = t;
    e.loc = { column: n3, file: s, line: i2 };
  } else {
    e.pos = t;
    const { line: n3, column: r2 } = re(i, t, { offsetLine: 1 });
    e.loc = { column: r2, file: s, line: n3 };
  }
  if (void 0 === e.frame) {
    const { line: t2, column: s2 } = e.loc;
    e.frame = function(e2, t3, i2) {
      let s3 = e2.split("\n");
      const n3 = Math.max(0, t3 - 3);
      let r2 = Math.min(t3 + 2, s3.length);
      for (s3 = s3.slice(n3, r2); !/\S/.test(s3[s3.length - 1]); )
        s3.pop(), r2 -= 1;
      const a2 = String(r2).length;
      return s3.map((e3, s4) => {
        const r3 = n3 + s4 + 1 === t3;
        let o2 = String(s4 + n3 + 1);
        for (; o2.length < a2; )
          o2 = ` ${o2}`;
        if (r3) {
          const t4 = function(e4) {
            let t5 = "";
            for (; e4--; )
              t5 += " ";
            return t5;
          }(a2 + 2 + ae(e3.slice(0, i2)).length) + "^";
          return `${o2}: ${ae(e3)}
${t4}`;
        }
        return `${o2}: ${ae(e3)}`;
      }).join("\n");
    }(i, t2, s2);
  }
}
var me;
function ge({ fileName: e, code: t }, i) {
  const s = { code: me.CHUNK_INVALID, message: `Chunk "${e}" is not valid JavaScript: ${i.message}.` };
  return fe(s, i.loc, t, e), s;
}
function ye(e, t, i) {
  return { code: "INVALID_EXPORT_OPTION", message: `"${e}" was specified for "output.exports", but entry module "${he(i)}" has the following exports: ${t.join(", ")}` };
}
function xe(e, t, i, s) {
  return { code: me.INVALID_OPTION, message: `Invalid value ${void 0 !== s ? `${JSON.stringify(s)} ` : ""}for option "${e}" - ${i}.`, url: `https://rollupjs.org/guide/en/#${t}` };
}
function Ee(e, t, i) {
  return { code: me.MISSING_EXPORT, message: `'${e}' is not exported by ${he(i)}, imported by ${he(t)}`, url: "https://rollupjs.org/guide/en/#error-name-is-not-exported-by-module" };
}
function be(e) {
  const t = Array.from(e.implicitlyLoadedBefore, (e2) => he(e2.id)).sort();
  return { code: me.MISSING_IMPLICIT_DEPENDANT, message: `Module "${he(e.id)}" that should be implicitly loaded before ${oe(t)} is not included in the module graph. Either it was not imported by an included module or only via a tree-shaken dynamic import, or no imported bindings were used and it had otherwise no side-effects.` };
}
function ve(e, t, i) {
  const s = i ? "reexport" : "import";
  return { code: me.UNEXPECTED_NAMED_IMPORT, id: e, message: `The named export "${t}" was ${s}ed from the external module ${he(e)} even though its interop type is "defaultOnly". Either remove or change this ${s} or change the value of the "output.interop" option.`, url: "https://rollupjs.org/guide/en/#outputinterop" };
}
function Se(e) {
  return { code: me.UNEXPECTED_NAMED_IMPORT, id: e, message: `There was a namespace "*" reexport from the external module ${he(e)} even though its interop type is "defaultOnly". This will be ignored as namespace reexports only reexport named exports. If this is not intended, either remove or change this reexport or change the value of the "output.interop" option.`, url: "https://rollupjs.org/guide/en/#outputinterop" };
}
function Ae(e) {
  return { code: me.VALIDATION_ERROR, message: e };
}
function Ie() {
  return { code: me.ALREADY_CLOSED, message: 'Bundle is already closed, no more calls to "generate" or "write" are allowed.' };
}
function Pe(e, t, i) {
  ke(e, t, i.onwarn, i.strictDeprecations);
}
function ke(e, t, i, s) {
  if (t || s) {
    const t2 = function(e2) {
      return { code: me.DEPRECATED_FEATURE, ..."string" == typeof e2 ? { message: e2 } : e2 };
    }(e);
    if (s)
      return pe(t2);
    i(t2);
  }
}
!function(e) {
  e.ALREADY_CLOSED = "ALREADY_CLOSED", e.ASSET_NOT_FINALISED = "ASSET_NOT_FINALISED", e.ASSET_NOT_FOUND = "ASSET_NOT_FOUND", e.ASSET_SOURCE_ALREADY_SET = "ASSET_SOURCE_ALREADY_SET", e.ASSET_SOURCE_MISSING = "ASSET_SOURCE_MISSING", e.BAD_LOADER = "BAD_LOADER", e.CANNOT_EMIT_FROM_OPTIONS_HOOK = "CANNOT_EMIT_FROM_OPTIONS_HOOK", e.CHUNK_NOT_GENERATED = "CHUNK_NOT_GENERATED", e.CHUNK_INVALID = "CHUNK_INVALID", e.CIRCULAR_REEXPORT = "CIRCULAR_REEXPORT", e.CYCLIC_CROSS_CHUNK_REEXPORT = "CYCLIC_CROSS_CHUNK_REEXPORT", e.DEPRECATED_FEATURE = "DEPRECATED_FEATURE", e.EXTERNAL_SYNTHETIC_EXPORTS = "EXTERNAL_SYNTHETIC_EXPORTS", e.FILE_NAME_CONFLICT = "FILE_NAME_CONFLICT", e.FILE_NOT_FOUND = "FILE_NOT_FOUND", e.INPUT_HOOK_IN_OUTPUT_PLUGIN = "INPUT_HOOK_IN_OUTPUT_PLUGIN", e.INVALID_CHUNK = "INVALID_CHUNK", e.INVALID_EXPORT_OPTION = "INVALID_EXPORT_OPTION", e.INVALID_EXTERNAL_ID = "INVALID_EXTERNAL_ID", e.INVALID_OPTION = "INVALID_OPTION", e.INVALID_PLUGIN_HOOK = "INVALID_PLUGIN_HOOK", e.INVALID_ROLLUP_PHASE = "INVALID_ROLLUP_PHASE", e.MISSING_EXPORT = "MISSING_EXPORT", e.MISSING_IMPLICIT_DEPENDANT = "MISSING_IMPLICIT_DEPENDANT", e.MIXED_EXPORTS = "MIXED_EXPORTS", e.NAMESPACE_CONFLICT = "NAMESPACE_CONFLICT", e.AMBIGUOUS_EXTERNAL_NAMESPACES = "AMBIGUOUS_EXTERNAL_NAMESPACES", e.NO_TRANSFORM_MAP_OR_AST_WITHOUT_CODE = "NO_TRANSFORM_MAP_OR_AST_WITHOUT_CODE", e.PLUGIN_ERROR = "PLUGIN_ERROR", e.PREFER_NAMED_EXPORTS = "PREFER_NAMED_EXPORTS", e.SYNTHETIC_NAMED_EXPORTS_NEED_NAMESPACE_EXPORT = "SYNTHETIC_NAMED_EXPORTS_NEED_NAMESPACE_EXPORT", e.UNEXPECTED_NAMED_IMPORT = "UNEXPECTED_NAMED_IMPORT", e.UNRESOLVED_ENTRY = "UNRESOLVED_ENTRY", e.UNRESOLVED_IMPORT = "UNRESOLVED_IMPORT", e.VALIDATION_ERROR = "VALIDATION_ERROR";
}(me || (me = {}));
var we = /* @__PURE__ */ new Set(["await", "break", "case", "catch", "class", "const", "continue", "debugger", "default", "delete", "do", "else", "enum", "eval", "export", "extends", "false", "finally", "for", "function", "if", "implements", "import", "in", "instanceof", "interface", "let", "NaN", "new", "null", "package", "private", "protected", "public", "return", "static", "super", "switch", "this", "throw", "true", "try", "typeof", "undefined", "var", "void", "while", "with", "yield"]);
var Ce = /[^$_a-zA-Z0-9]/g;
var _e = (e) => ((e2) => /\d/.test(e2[0]))(e) || we.has(e) || "arguments" === e;
function Ne(e) {
  return e = e.replace(/-(\w)/g, (e2, t) => t.toUpperCase()).replace(Ce, "_"), _e(e) && (e = `_${e}`), e || "_";
}
var $e = class {
  constructor(e, t, i, s, n3) {
    this.options = e, this.id = t, this.renormalizeRenderPath = n3, this.declarations = /* @__PURE__ */ new Map(), this.defaultVariableName = "", this.dynamicImporters = [], this.execIndex = 1 / 0, this.exportedVariables = /* @__PURE__ */ new Map(), this.importers = [], this.mostCommonSuggestion = 0, this.nameSuggestions = /* @__PURE__ */ new Map(), this.namespaceVariableName = "", this.reexported = false, this.renderPath = void 0, this.used = false, this.variableName = "", this.suggestedVariableName = Ne(t.split(/[\\/]/).pop());
    const { importers: r2, dynamicImporters: a2 } = this, o2 = this.info = { ast: null, code: null, dynamicallyImportedIdResolutions: ne, dynamicallyImportedIds: ne, get dynamicImporters() {
      return a2.sort();
    }, hasDefaultExport: null, get hasModuleSideEffects() {
      return Pe("Accessing ModuleInfo.hasModuleSideEffects from plugins is deprecated. Please use ModuleInfo.moduleSideEffects instead.", false, e), o2.moduleSideEffects;
    }, id: t, implicitlyLoadedAfterOneOf: ne, implicitlyLoadedBefore: ne, importedIdResolutions: ne, importedIds: ne, get importers() {
      return r2.sort();
    }, isEntry: false, isExternal: true, isIncluded: null, meta: s, moduleSideEffects: i, syntheticNamedExports: false };
    Object.defineProperty(this.info, "hasModuleSideEffects", { enumerable: false });
  }
  getVariableForExportName(e) {
    const t = this.declarations.get(e);
    if (t)
      return [t];
    const i = new te(this, e);
    return this.declarations.set(e, i), this.exportedVariables.set(i, e), [i];
  }
  setRenderPath(e, t) {
    this.renderPath = "function" == typeof e.paths ? e.paths(this.id) : e.paths[this.id], this.renderPath || (this.renderPath = this.renormalizeRenderPath ? C(T(t, this.id)) : this.id);
  }
  suggestName(e) {
    var t;
    const i = (null !== (t = this.nameSuggestions.get(e)) && void 0 !== t ? t : 0) + 1;
    this.nameSuggestions.set(e, i), i > this.mostCommonSuggestion && (this.mostCommonSuggestion = i, this.suggestedVariableName = e);
  }
  warnUnusedImports() {
    const e = Array.from(this.declarations).filter(([e2, t2]) => "*" !== e2 && !t2.included && !this.reexported && !t2.referenced).map(([e2]) => e2);
    if (0 === e.length)
      return;
    const t = /* @__PURE__ */ new Set();
    for (const i2 of e)
      for (const e2 of this.declarations.get(i2).module.importers)
        t.add(e2);
    const i = [...t];
    this.options.onwarn({ code: "UNUSED_EXTERNAL_IMPORT", message: `${oe(e, ["is", "are"])} imported from external module "${this.id}" but never used in ${oe(i.map((e2) => he(e2)))}.`, names: e, source: this.id, sources: i });
  }
};
var Te = { ArrayPattern(e, t) {
  for (const i of t.elements)
    i && Te[i.type](e, i);
}, AssignmentPattern(e, t) {
  Te[t.left.type](e, t.left);
}, Identifier(e, t) {
  e.push(t.name);
}, MemberExpression() {
}, ObjectPattern(e, t) {
  for (const i of t.properties)
    "RestElement" === i.type ? Te.RestElement(e, i) : Te[i.value.type](e, i.value);
}, RestElement(e, t) {
  Te[t.argument.type](e, t.argument);
} };
var Oe = function(e) {
  const t = [];
  return Te[e.type](t, e), t;
};
new Set("break case class catch const continue debugger default delete do else export extends finally for function if import in instanceof let new return super switch this throw try typeof var void while with yield enum await implements package protected static interface private public arguments Infinity NaN undefined null true false eval uneval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Symbol Error EvalError InternalError RangeError ReferenceError SyntaxError TypeError URIError Number Math Date String RegExp Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array Map Set WeakMap WeakSet SIMD ArrayBuffer DataView JSON Promise Generator GeneratorFunction Reflect Proxy Intl".split(" ")).add("");
function Re() {
  return { brokenFlow: 0, includedCallArguments: /* @__PURE__ */ new Set(), includedLabels: /* @__PURE__ */ new Set() };
}
function Me() {
  return { accessed: new U(), assigned: new U(), brokenFlow: 0, called: new H(), ignore: { breaks: false, continues: false, labels: /* @__PURE__ */ new Set(), returnYield: false }, includedLabels: /* @__PURE__ */ new Set(), instantiated: new H(), replacedVariableInits: /* @__PURE__ */ new Map() };
}
function De(e, t = null) {
  return Object.create(t, e);
}
var Le = new class extends K {
  getLiteralValueAtPath() {
  }
}();
var Ve = { value: { hasEffectsWhenCalled: null, returns: X } };
var Be = new class extends K {
  getReturnExpressionWhenCalledAtPath(e) {
    return 1 === e.length ? Qe(qe, e[0]) : X;
  }
  hasEffectsOnInteractionAtPath(e, t, i) {
    return 0 === t.type ? e.length > 1 : 2 !== t.type || 1 !== e.length || Ye(qe, e[0], t, i);
  }
}();
var Fe = { value: { hasEffectsWhenCalled: null, returns: Be } };
var ze = new class extends K {
  getReturnExpressionWhenCalledAtPath(e) {
    return 1 === e.length ? Qe(Ke, e[0]) : X;
  }
  hasEffectsOnInteractionAtPath(e, t, i) {
    return 0 === t.type ? e.length > 1 : 2 !== t.type || 1 !== e.length || Ye(Ke, e[0], t, i);
  }
}();
var je = { value: { hasEffectsWhenCalled: null, returns: ze } };
var Ue = new class extends K {
  getReturnExpressionWhenCalledAtPath(e) {
    return 1 === e.length ? Qe(Xe, e[0]) : X;
  }
  hasEffectsOnInteractionAtPath(e, t, i) {
    return 0 === t.type ? e.length > 1 : 2 !== t.type || 1 !== e.length || Ye(Xe, e[0], t, i);
  }
}();
var Ge = { value: { hasEffectsWhenCalled: null, returns: Ue } };
var He = { value: { hasEffectsWhenCalled({ args: e }, t) {
  const i = e[1];
  return e.length < 2 || "symbol" == typeof i.getLiteralValueAtPath(V, G, { deoptimizeCache() {
  } }) && i.hasEffectsOnInteractionAtPath(V, Z, t);
}, returns: Ue } };
var We = De({ hasOwnProperty: Fe, isPrototypeOf: Fe, propertyIsEnumerable: Fe, toLocaleString: Ge, toString: Ge, valueOf: Ve });
var qe = De({ valueOf: Fe }, We);
var Ke = De({ toExponential: Ge, toFixed: Ge, toLocaleString: Ge, toPrecision: Ge, valueOf: je }, We);
var Xe = De({ anchor: Ge, at: Ve, big: Ge, blink: Ge, bold: Ge, charAt: Ge, charCodeAt: je, codePointAt: Ve, concat: Ge, endsWith: Fe, fixed: Ge, fontcolor: Ge, fontsize: Ge, includes: Fe, indexOf: je, italics: Ge, lastIndexOf: je, link: Ge, localeCompare: je, match: Ve, matchAll: Ve, normalize: Ge, padEnd: Ge, padStart: Ge, repeat: Ge, replace: He, replaceAll: He, search: je, slice: Ge, small: Ge, split: Ve, startsWith: Fe, strike: Ge, sub: Ge, substr: Ge, substring: Ge, sup: Ge, toLocaleLowerCase: Ge, toLocaleUpperCase: Ge, toLowerCase: Ge, toString: Ge, toUpperCase: Ge, trim: Ge, trimEnd: Ge, trimLeft: Ge, trimRight: Ge, trimStart: Ge, valueOf: Ge }, We);
function Ye(e, t, i, s) {
  var n3, r2;
  return "string" != typeof t || !e[t] || ((null === (r2 = (n3 = e[t]).hasEffectsWhenCalled) || void 0 === r2 ? void 0 : r2.call(n3, i, s)) || false);
}
function Qe(e, t) {
  return "string" == typeof t && e[t] ? e[t].returns : X;
}
function Je(e, t, i) {
  i(e, t);
}
function Ze(e, t, i) {
}
var et = {};
et.Program = et.BlockStatement = et.StaticBlock = function(e, t, i) {
  for (var s = 0, n3 = e.body; s < n3.length; s += 1) {
    i(n3[s], t, "Statement");
  }
}, et.Statement = Je, et.EmptyStatement = Ze, et.ExpressionStatement = et.ParenthesizedExpression = et.ChainExpression = function(e, t, i) {
  return i(e.expression, t, "Expression");
}, et.IfStatement = function(e, t, i) {
  i(e.test, t, "Expression"), i(e.consequent, t, "Statement"), e.alternate && i(e.alternate, t, "Statement");
}, et.LabeledStatement = function(e, t, i) {
  return i(e.body, t, "Statement");
}, et.BreakStatement = et.ContinueStatement = Ze, et.WithStatement = function(e, t, i) {
  i(e.object, t, "Expression"), i(e.body, t, "Statement");
}, et.SwitchStatement = function(e, t, i) {
  i(e.discriminant, t, "Expression");
  for (var s = 0, n3 = e.cases; s < n3.length; s += 1) {
    var r2 = n3[s];
    r2.test && i(r2.test, t, "Expression");
    for (var a2 = 0, o2 = r2.consequent; a2 < o2.length; a2 += 1) {
      i(o2[a2], t, "Statement");
    }
  }
}, et.SwitchCase = function(e, t, i) {
  e.test && i(e.test, t, "Expression");
  for (var s = 0, n3 = e.consequent; s < n3.length; s += 1) {
    i(n3[s], t, "Statement");
  }
}, et.ReturnStatement = et.YieldExpression = et.AwaitExpression = function(e, t, i) {
  e.argument && i(e.argument, t, "Expression");
}, et.ThrowStatement = et.SpreadElement = function(e, t, i) {
  return i(e.argument, t, "Expression");
}, et.TryStatement = function(e, t, i) {
  i(e.block, t, "Statement"), e.handler && i(e.handler, t), e.finalizer && i(e.finalizer, t, "Statement");
}, et.CatchClause = function(e, t, i) {
  e.param && i(e.param, t, "Pattern"), i(e.body, t, "Statement");
}, et.WhileStatement = et.DoWhileStatement = function(e, t, i) {
  i(e.test, t, "Expression"), i(e.body, t, "Statement");
}, et.ForStatement = function(e, t, i) {
  e.init && i(e.init, t, "ForInit"), e.test && i(e.test, t, "Expression"), e.update && i(e.update, t, "Expression"), i(e.body, t, "Statement");
}, et.ForInStatement = et.ForOfStatement = function(e, t, i) {
  i(e.left, t, "ForInit"), i(e.right, t, "Expression"), i(e.body, t, "Statement");
}, et.ForInit = function(e, t, i) {
  "VariableDeclaration" === e.type ? i(e, t) : i(e, t, "Expression");
}, et.DebuggerStatement = Ze, et.FunctionDeclaration = function(e, t, i) {
  return i(e, t, "Function");
}, et.VariableDeclaration = function(e, t, i) {
  for (var s = 0, n3 = e.declarations; s < n3.length; s += 1) {
    i(n3[s], t);
  }
}, et.VariableDeclarator = function(e, t, i) {
  i(e.id, t, "Pattern"), e.init && i(e.init, t, "Expression");
}, et.Function = function(e, t, i) {
  e.id && i(e.id, t, "Pattern");
  for (var s = 0, n3 = e.params; s < n3.length; s += 1) {
    i(n3[s], t, "Pattern");
  }
  i(e.body, t, e.expression ? "Expression" : "Statement");
}, et.Pattern = function(e, t, i) {
  "Identifier" === e.type ? i(e, t, "VariablePattern") : "MemberExpression" === e.type ? i(e, t, "MemberPattern") : i(e, t);
}, et.VariablePattern = Ze, et.MemberPattern = Je, et.RestElement = function(e, t, i) {
  return i(e.argument, t, "Pattern");
}, et.ArrayPattern = function(e, t, i) {
  for (var s = 0, n3 = e.elements; s < n3.length; s += 1) {
    var r2 = n3[s];
    r2 && i(r2, t, "Pattern");
  }
}, et.ObjectPattern = function(e, t, i) {
  for (var s = 0, n3 = e.properties; s < n3.length; s += 1) {
    var r2 = n3[s];
    "Property" === r2.type ? (r2.computed && i(r2.key, t, "Expression"), i(r2.value, t, "Pattern")) : "RestElement" === r2.type && i(r2.argument, t, "Pattern");
  }
}, et.Expression = Je, et.ThisExpression = et.Super = et.MetaProperty = Ze, et.ArrayExpression = function(e, t, i) {
  for (var s = 0, n3 = e.elements; s < n3.length; s += 1) {
    var r2 = n3[s];
    r2 && i(r2, t, "Expression");
  }
}, et.ObjectExpression = function(e, t, i) {
  for (var s = 0, n3 = e.properties; s < n3.length; s += 1) {
    i(n3[s], t);
  }
}, et.FunctionExpression = et.ArrowFunctionExpression = et.FunctionDeclaration, et.SequenceExpression = function(e, t, i) {
  for (var s = 0, n3 = e.expressions; s < n3.length; s += 1) {
    i(n3[s], t, "Expression");
  }
}, et.TemplateLiteral = function(e, t, i) {
  for (var s = 0, n3 = e.quasis; s < n3.length; s += 1) {
    i(n3[s], t);
  }
  for (var r2 = 0, a2 = e.expressions; r2 < a2.length; r2 += 1) {
    i(a2[r2], t, "Expression");
  }
}, et.TemplateElement = Ze, et.UnaryExpression = et.UpdateExpression = function(e, t, i) {
  i(e.argument, t, "Expression");
}, et.BinaryExpression = et.LogicalExpression = function(e, t, i) {
  i(e.left, t, "Expression"), i(e.right, t, "Expression");
}, et.AssignmentExpression = et.AssignmentPattern = function(e, t, i) {
  i(e.left, t, "Pattern"), i(e.right, t, "Expression");
}, et.ConditionalExpression = function(e, t, i) {
  i(e.test, t, "Expression"), i(e.consequent, t, "Expression"), i(e.alternate, t, "Expression");
}, et.NewExpression = et.CallExpression = function(e, t, i) {
  if (i(e.callee, t, "Expression"), e.arguments)
    for (var s = 0, n3 = e.arguments; s < n3.length; s += 1) {
      i(n3[s], t, "Expression");
    }
}, et.MemberExpression = function(e, t, i) {
  i(e.object, t, "Expression"), e.computed && i(e.property, t, "Expression");
}, et.ExportNamedDeclaration = et.ExportDefaultDeclaration = function(e, t, i) {
  e.declaration && i(e.declaration, t, "ExportNamedDeclaration" === e.type || e.declaration.id ? "Statement" : "Expression"), e.source && i(e.source, t, "Expression");
}, et.ExportAllDeclaration = function(e, t, i) {
  e.exported && i(e.exported, t), i(e.source, t, "Expression");
}, et.ImportDeclaration = function(e, t, i) {
  for (var s = 0, n3 = e.specifiers; s < n3.length; s += 1) {
    i(n3[s], t);
  }
  i(e.source, t, "Expression");
}, et.ImportExpression = function(e, t, i) {
  i(e.source, t, "Expression");
}, et.ImportSpecifier = et.ImportDefaultSpecifier = et.ImportNamespaceSpecifier = et.Identifier = et.PrivateIdentifier = et.Literal = Ze, et.TaggedTemplateExpression = function(e, t, i) {
  i(e.tag, t, "Expression"), i(e.quasi, t, "Expression");
}, et.ClassDeclaration = et.ClassExpression = function(e, t, i) {
  return i(e, t, "Class");
}, et.Class = function(e, t, i) {
  e.id && i(e.id, t, "Pattern"), e.superClass && i(e.superClass, t, "Expression"), i(e.body, t);
}, et.ClassBody = function(e, t, i) {
  for (var s = 0, n3 = e.body; s < n3.length; s += 1) {
    i(n3[s], t);
  }
}, et.MethodDefinition = et.PropertyDefinition = et.Property = function(e, t, i) {
  e.computed && i(e.key, t, "Expression"), e.value && i(e.value, t, "Expression");
};
var tt = "sourceMa";
tt += "ppingURL";
var it = new RegExp("^#[ \\f\\r\\t\\v\\u00a0\\u1680\\u2000-\\u200a\\u2028\\u2029\\u202f\\u205f\\u3000\\ufeff]+sourceMappingURL=.+");
function st(e, t, i = e.type) {
  const { annotations: s } = t;
  let n3 = s[t.annotationIndex];
  for (; n3 && e.start >= n3.end; )
    at(e, n3, t.code), n3 = s[++t.annotationIndex];
  if (n3 && n3.end <= e.end)
    for (et[i](e, t, st); (n3 = s[t.annotationIndex]) && n3.end <= e.end; )
      ++t.annotationIndex, ht(e, n3, false);
}
var nt = /[^\s(]/g;
var rt = /\S/g;
function at(e, t, i) {
  const s = [];
  let n3;
  if (ot(i.slice(t.end, e.start), nt)) {
    const t2 = e.start;
    for (; ; ) {
      switch (s.push(e), e.type) {
        case "ExpressionStatement":
        case "ChainExpression":
          e = e.expression;
          continue;
        case "SequenceExpression":
          if (ot(i.slice(t2, e.start), rt)) {
            e = e.expressions[0];
            continue;
          }
          n3 = true;
          break;
        case "ConditionalExpression":
          if (ot(i.slice(t2, e.start), rt)) {
            e = e.test;
            continue;
          }
          n3 = true;
          break;
        case "LogicalExpression":
        case "BinaryExpression":
          if (ot(i.slice(t2, e.start), rt)) {
            e = e.left;
            continue;
          }
          n3 = true;
          break;
        case "CallExpression":
        case "NewExpression":
          break;
        default:
          n3 = true;
      }
      break;
    }
  } else
    n3 = true;
  if (n3)
    ht(e, t, false);
  else
    for (const e2 of s)
      ht(e2, t, true);
}
function ot(e, t) {
  let i;
  for (; null !== (i = t.exec(e)); ) {
    if ("/" === i[0]) {
      const i2 = e.charCodeAt(t.lastIndex);
      if (42 === i2) {
        t.lastIndex = e.indexOf("*/", t.lastIndex + 1) + 2;
        continue;
      }
      if (47 === i2) {
        t.lastIndex = e.indexOf("\n", t.lastIndex + 1) + 1;
        continue;
      }
    }
    return t.lastIndex = 0, false;
  }
  return true;
}
var lt = /[@#]__PURE__/;
function ht(e, t, i) {
  const s = i ? "_rollupAnnotations" : "_rollupRemoved", n3 = e[s];
  n3 ? n3.push(t) : e[s] = [t];
}
var ct = { Literal: [], Program: ["body"] };
var ut = class extends K {
  constructor(e, t, i) {
    super(), this.deoptimized = false, this.esTreeNode = e, this.keys = ct[e.type] || function(e2) {
      return ct[e2.type] = Object.keys(e2).filter((t2) => "object" == typeof e2[t2] && 95 !== t2.charCodeAt(0)), ct[e2.type];
    }(e), this.parent = t, this.context = t.context, this.createScope(i), this.parseNode(e), this.initialise(), this.context.magicString.addSourcemapLocation(this.start), this.context.magicString.addSourcemapLocation(this.end);
  }
  addExportedVariables(e, t) {
  }
  bind() {
    for (const e of this.keys) {
      const t = this[e];
      if (null !== t)
        if (Array.isArray(t))
          for (const e2 of t)
            null == e2 || e2.bind();
        else
          t.bind();
    }
  }
  createScope(e) {
    this.scope = e;
  }
  hasEffects(e) {
    this.deoptimized || this.applyDeoptimizations();
    for (const t of this.keys) {
      const i = this[t];
      if (null !== i) {
        if (Array.isArray(i)) {
          for (const t2 of i)
            if (null == t2 ? void 0 : t2.hasEffects(e))
              return true;
        } else if (i.hasEffects(e))
          return true;
      }
    }
    return false;
  }
  hasEffectsAsAssignmentTarget(e, t) {
    return this.hasEffects(e) || this.hasEffectsOnInteractionAtPath(V, this.assignmentInteraction, e);
  }
  include(e, t, i) {
    this.deoptimized || this.applyDeoptimizations(), this.included = true;
    for (const i2 of this.keys) {
      const s = this[i2];
      if (null !== s)
        if (Array.isArray(s))
          for (const i3 of s)
            null == i3 || i3.include(e, t);
        else
          s.include(e, t);
    }
  }
  includeAsAssignmentTarget(e, t, i) {
    this.include(e, t);
  }
  initialise() {
  }
  insertSemicolon(e) {
    ";" !== e.original[this.end - 1] && e.appendLeft(this.end, ";");
  }
  parseNode(e) {
    for (const [t, i] of Object.entries(e))
      if (!this.hasOwnProperty(t))
        if (95 === t.charCodeAt(0)) {
          if ("_rollupAnnotations" === t)
            this.annotations = i;
          else if ("_rollupRemoved" === t)
            for (const { start: e2, end: t2 } of i)
              this.context.magicString.remove(e2, t2);
        } else if ("object" != typeof i || null === i)
          this[t] = i;
        else if (Array.isArray(i)) {
          this[t] = [];
          for (const e2 of i)
            this[t].push(null === e2 ? null : new (this.context.getNodeConstructor(e2.type))(e2, this, this.scope));
        } else
          this[t] = new (this.context.getNodeConstructor(i.type))(i, this, this.scope);
  }
  render(e, t) {
    for (const i of this.keys) {
      const s = this[i];
      if (null !== s)
        if (Array.isArray(s))
          for (const i2 of s)
            null == i2 || i2.render(e, t);
        else
          s.render(e, t);
    }
  }
  setAssignedValue(e) {
    this.assignmentInteraction = { args: [e], thisArg: null, type: 1 };
  }
  shouldBeIncluded(e) {
    return this.included || !e.brokenFlow && this.hasEffects(Me());
  }
  applyDeoptimizations() {
    this.deoptimized = true;
    for (const e of this.keys) {
      const t = this[e];
      if (null !== t)
        if (Array.isArray(t))
          for (const e2 of t)
            null == e2 || e2.deoptimizePath(B);
        else
          t.deoptimizePath(B);
    }
    this.context.requestTreeshakingPass();
  }
};
var dt = class extends ut {
  deoptimizeThisOnInteractionAtPath(e, t, i) {
    t.length > 0 && this.argument.deoptimizeThisOnInteractionAtPath(e, [M, ...t], i);
  }
  hasEffects(e) {
    this.deoptimized || this.applyDeoptimizations();
    const { propertyReadSideEffects: t } = this.context.options.treeshake;
    return this.argument.hasEffects(e) || t && ("always" === t || this.argument.hasEffectsOnInteractionAtPath(B, Y, e));
  }
  applyDeoptimizations() {
    this.deoptimized = true, this.argument.deoptimizePath([M, M]), this.context.requestTreeshakingPass();
  }
};
var pt = class extends K {
  constructor(e) {
    super(), this.description = e;
  }
  deoptimizeThisOnInteractionAtPath({ type: e, thisArg: t }, i) {
    2 === e && 0 === i.length && this.description.mutatesSelfAsArray && t.deoptimizePath(z);
  }
  getReturnExpressionWhenCalledAtPath(e, { thisArg: t }) {
    return e.length > 0 ? X : this.description.returnsPrimitive || ("self" === this.description.returns ? t || X : this.description.returns());
  }
  hasEffectsOnInteractionAtPath(e, t, i) {
    var s, n3;
    const { type: r2 } = t;
    if (e.length > (0 === r2 ? 1 : 0))
      return true;
    if (2 === r2) {
      if (true === this.description.mutatesSelfAsArray && (null === (s = t.thisArg) || void 0 === s ? void 0 : s.hasEffectsOnInteractionAtPath(z, Q, i)))
        return true;
      if (this.description.callsArgs) {
        for (const e2 of this.description.callsArgs)
          if (null === (n3 = t.args[e2]) || void 0 === n3 ? void 0 : n3.hasEffectsOnInteractionAtPath(V, Z, i))
            return true;
      }
    }
    return false;
  }
};
var ft = [new pt({ callsArgs: null, mutatesSelfAsArray: false, returns: null, returnsPrimitive: Be })];
var mt = [new pt({ callsArgs: null, mutatesSelfAsArray: false, returns: null, returnsPrimitive: Ue })];
var gt = [new pt({ callsArgs: null, mutatesSelfAsArray: false, returns: null, returnsPrimitive: ze })];
var yt = [new pt({ callsArgs: null, mutatesSelfAsArray: false, returns: null, returnsPrimitive: X })];
var xt = /^\d+$/;
var Et = class extends K {
  constructor(e, t, i = false) {
    if (super(), this.prototypeExpression = t, this.immutable = i, this.allProperties = [], this.deoptimizedPaths = /* @__PURE__ */ Object.create(null), this.expressionsToBeDeoptimizedByKey = /* @__PURE__ */ Object.create(null), this.gettersByKey = /* @__PURE__ */ Object.create(null), this.hasLostTrack = false, this.hasUnknownDeoptimizedInteger = false, this.hasUnknownDeoptimizedProperty = false, this.propertiesAndGettersByKey = /* @__PURE__ */ Object.create(null), this.propertiesAndSettersByKey = /* @__PURE__ */ Object.create(null), this.settersByKey = /* @__PURE__ */ Object.create(null), this.thisParametersToBeDeoptimized = /* @__PURE__ */ new Set(), this.unknownIntegerProps = [], this.unmatchableGetters = [], this.unmatchablePropertiesAndGetters = [], this.unmatchableSetters = [], Array.isArray(e))
      this.buildPropertyMaps(e);
    else {
      this.propertiesAndGettersByKey = this.propertiesAndSettersByKey = e;
      for (const t2 of Object.values(e))
        this.allProperties.push(...t2);
    }
  }
  deoptimizeAllProperties(e) {
    var t;
    const i = this.hasLostTrack || this.hasUnknownDeoptimizedProperty;
    if (e ? this.hasUnknownDeoptimizedProperty = true : this.hasLostTrack = true, !i) {
      for (const e2 of Object.values(this.propertiesAndGettersByKey).concat(Object.values(this.settersByKey)))
        for (const t2 of e2)
          t2.deoptimizePath(B);
      null === (t = this.prototypeExpression) || void 0 === t || t.deoptimizePath([M, M]), this.deoptimizeCachedEntities();
    }
  }
  deoptimizeIntegerProperties() {
    if (!(this.hasLostTrack || this.hasUnknownDeoptimizedProperty || this.hasUnknownDeoptimizedInteger)) {
      this.hasUnknownDeoptimizedInteger = true;
      for (const [e, t] of Object.entries(this.propertiesAndGettersByKey))
        if (xt.test(e))
          for (const e2 of t)
            e2.deoptimizePath(B);
      this.deoptimizeCachedIntegerEntities();
    }
  }
  deoptimizePath(e) {
    var t;
    if (this.hasLostTrack || this.immutable)
      return;
    const i = e[0];
    if (1 === e.length) {
      if ("string" != typeof i)
        return i === L ? this.deoptimizeIntegerProperties() : this.deoptimizeAllProperties(i === D);
      if (!this.deoptimizedPaths[i]) {
        this.deoptimizedPaths[i] = true;
        const e2 = this.expressionsToBeDeoptimizedByKey[i];
        if (e2)
          for (const t2 of e2)
            t2.deoptimizeCache();
      }
    }
    const s = 1 === e.length ? B : e.slice(1);
    for (const e2 of "string" == typeof i ? (this.propertiesAndGettersByKey[i] || this.unmatchablePropertiesAndGetters).concat(this.settersByKey[i] || this.unmatchableSetters) : this.allProperties)
      e2.deoptimizePath(s);
    null === (t = this.prototypeExpression) || void 0 === t || t.deoptimizePath(1 === e.length ? [...e, M] : e);
  }
  deoptimizeThisOnInteractionAtPath(e, t, i) {
    var s;
    const [n3, ...r2] = t;
    if (this.hasLostTrack || (2 === e.type || t.length > 1) && (this.hasUnknownDeoptimizedProperty || "string" == typeof n3 && this.deoptimizedPaths[n3]))
      return void e.thisArg.deoptimizePath(B);
    const [a2, o2, l2] = 2 === e.type || t.length > 1 ? [this.propertiesAndGettersByKey, this.propertiesAndGettersByKey, this.unmatchablePropertiesAndGetters] : 0 === e.type ? [this.propertiesAndGettersByKey, this.gettersByKey, this.unmatchableGetters] : [this.propertiesAndSettersByKey, this.settersByKey, this.unmatchableSetters];
    if ("string" == typeof n3) {
      if (a2[n3]) {
        const t2 = o2[n3];
        if (t2)
          for (const s2 of t2)
            s2.deoptimizeThisOnInteractionAtPath(e, r2, i);
        return void (this.immutable || this.thisParametersToBeDeoptimized.add(e.thisArg));
      }
      for (const t2 of l2)
        t2.deoptimizeThisOnInteractionAtPath(e, r2, i);
      if (xt.test(n3))
        for (const t2 of this.unknownIntegerProps)
          t2.deoptimizeThisOnInteractionAtPath(e, r2, i);
    } else {
      for (const t2 of Object.values(o2).concat([l2]))
        for (const s2 of t2)
          s2.deoptimizeThisOnInteractionAtPath(e, r2, i);
      for (const t2 of this.unknownIntegerProps)
        t2.deoptimizeThisOnInteractionAtPath(e, r2, i);
    }
    this.immutable || this.thisParametersToBeDeoptimized.add(e.thisArg), null === (s = this.prototypeExpression) || void 0 === s || s.deoptimizeThisOnInteractionAtPath(e, t, i);
  }
  getLiteralValueAtPath(e, t, i) {
    if (0 === e.length)
      return q;
    const s = e[0], n3 = this.getMemberExpressionAndTrackDeopt(s, i);
    return n3 ? n3.getLiteralValueAtPath(e.slice(1), t, i) : this.prototypeExpression ? this.prototypeExpression.getLiteralValueAtPath(e, t, i) : 1 !== e.length ? W : void 0;
  }
  getReturnExpressionWhenCalledAtPath(e, t, i, s) {
    if (0 === e.length)
      return X;
    const [n3, ...r2] = e, a2 = this.getMemberExpressionAndTrackDeopt(n3, s);
    return a2 ? a2.getReturnExpressionWhenCalledAtPath(r2, t, i, s) : this.prototypeExpression ? this.prototypeExpression.getReturnExpressionWhenCalledAtPath(e, t, i, s) : X;
  }
  hasEffectsOnInteractionAtPath(e, t, i) {
    const [s, ...n3] = e;
    if (n3.length || 2 === t.type) {
      const r3 = this.getMemberExpression(s);
      return r3 ? r3.hasEffectsOnInteractionAtPath(n3, t, i) : !this.prototypeExpression || this.prototypeExpression.hasEffectsOnInteractionAtPath(e, t, i);
    }
    if (s === D)
      return false;
    if (this.hasLostTrack)
      return true;
    const [r2, a2, o2] = 0 === t.type ? [this.propertiesAndGettersByKey, this.gettersByKey, this.unmatchableGetters] : [this.propertiesAndSettersByKey, this.settersByKey, this.unmatchableSetters];
    if ("string" == typeof s) {
      if (r2[s]) {
        const e2 = a2[s];
        if (e2) {
          for (const s2 of e2)
            if (s2.hasEffectsOnInteractionAtPath(n3, t, i))
              return true;
        }
        return false;
      }
      for (const e2 of o2)
        if (e2.hasEffectsOnInteractionAtPath(n3, t, i))
          return true;
    } else
      for (const e2 of Object.values(a2).concat([o2]))
        for (const s2 of e2)
          if (s2.hasEffectsOnInteractionAtPath(n3, t, i))
            return true;
    return !!this.prototypeExpression && this.prototypeExpression.hasEffectsOnInteractionAtPath(e, t, i);
  }
  buildPropertyMaps(e) {
    const { allProperties: t, propertiesAndGettersByKey: i, propertiesAndSettersByKey: s, settersByKey: n3, gettersByKey: r2, unknownIntegerProps: a2, unmatchablePropertiesAndGetters: o2, unmatchableGetters: l2, unmatchableSetters: h2 } = this, c2 = [];
    for (let u2 = e.length - 1; u2 >= 0; u2--) {
      const { key: d2, kind: p2, property: f2 } = e[u2];
      if (t.push(f2), "string" != typeof d2) {
        if (d2 === L) {
          a2.push(f2);
          continue;
        }
        "set" === p2 && h2.push(f2), "get" === p2 && l2.push(f2), "get" !== p2 && c2.push(f2), "set" !== p2 && o2.push(f2);
      } else
        "set" === p2 ? s[d2] || (s[d2] = [f2, ...c2], n3[d2] = [f2, ...h2]) : "get" === p2 ? i[d2] || (i[d2] = [f2, ...o2], r2[d2] = [f2, ...l2]) : (s[d2] || (s[d2] = [f2, ...c2]), i[d2] || (i[d2] = [f2, ...o2]));
    }
  }
  deoptimizeCachedEntities() {
    for (const e of Object.values(this.expressionsToBeDeoptimizedByKey))
      for (const t of e)
        t.deoptimizeCache();
    for (const e of this.thisParametersToBeDeoptimized)
      e.deoptimizePath(B);
  }
  deoptimizeCachedIntegerEntities() {
    for (const [e, t] of Object.entries(this.expressionsToBeDeoptimizedByKey))
      if (xt.test(e))
        for (const e2 of t)
          e2.deoptimizeCache();
    for (const e of this.thisParametersToBeDeoptimized)
      e.deoptimizePath(z);
  }
  getMemberExpression(e) {
    if (this.hasLostTrack || this.hasUnknownDeoptimizedProperty || "string" != typeof e || this.hasUnknownDeoptimizedInteger && xt.test(e) || this.deoptimizedPaths[e])
      return X;
    const t = this.propertiesAndGettersByKey[e];
    return 1 === (null == t ? void 0 : t.length) ? t[0] : t || this.unmatchablePropertiesAndGetters.length > 0 || this.unknownIntegerProps.length && xt.test(e) ? X : null;
  }
  getMemberExpressionAndTrackDeopt(e, t) {
    if ("string" != typeof e)
      return X;
    const i = this.getMemberExpression(e);
    if (i !== X && !this.immutable) {
      (this.expressionsToBeDeoptimizedByKey[e] = this.expressionsToBeDeoptimizedByKey[e] || []).push(t);
    }
    return i;
  }
};
var bt = (e) => "string" == typeof e && /^\d+$/.test(e);
var vt = new class extends K {
  deoptimizeThisOnInteractionAtPath({ type: e, thisArg: t }, i) {
    2 !== e || 1 !== i.length || bt(i[0]) || t.deoptimizePath(B);
  }
  getLiteralValueAtPath(e) {
    return 1 === e.length && bt(e[0]) ? void 0 : W;
  }
  hasEffectsOnInteractionAtPath(e, { type: t }) {
    return e.length > 1 || 2 === t;
  }
}();
var St = new Et({ __proto__: null, hasOwnProperty: ft, isPrototypeOf: ft, propertyIsEnumerable: ft, toLocaleString: mt, toString: mt, valueOf: yt }, vt, true);
var At = [{ key: L, kind: "init", property: X }, { key: "length", kind: "init", property: ze }];
var It = [new pt({ callsArgs: [0], mutatesSelfAsArray: "deopt-only", returns: null, returnsPrimitive: Be })];
var Pt = [new pt({ callsArgs: [0], mutatesSelfAsArray: "deopt-only", returns: null, returnsPrimitive: ze })];
var kt = [new pt({ callsArgs: null, mutatesSelfAsArray: true, returns: () => new Et(At, Mt), returnsPrimitive: null })];
var wt = [new pt({ callsArgs: null, mutatesSelfAsArray: "deopt-only", returns: () => new Et(At, Mt), returnsPrimitive: null })];
var Ct = [new pt({ callsArgs: [0], mutatesSelfAsArray: "deopt-only", returns: () => new Et(At, Mt), returnsPrimitive: null })];
var _t = [new pt({ callsArgs: null, mutatesSelfAsArray: true, returns: null, returnsPrimitive: ze })];
var Nt = [new pt({ callsArgs: null, mutatesSelfAsArray: true, returns: null, returnsPrimitive: X })];
var $t = [new pt({ callsArgs: null, mutatesSelfAsArray: "deopt-only", returns: null, returnsPrimitive: X })];
var Tt = [new pt({ callsArgs: [0], mutatesSelfAsArray: "deopt-only", returns: null, returnsPrimitive: X })];
var Ot = [new pt({ callsArgs: null, mutatesSelfAsArray: true, returns: "self", returnsPrimitive: null })];
var Rt = [new pt({ callsArgs: [0], mutatesSelfAsArray: true, returns: "self", returnsPrimitive: null })];
var Mt = new Et({ __proto__: null, at: $t, concat: wt, copyWithin: Ot, entries: wt, every: It, fill: Ot, filter: Ct, find: Tt, findIndex: Pt, findLast: Tt, findLastIndex: Pt, flat: wt, flatMap: Ct, forEach: Tt, group: Tt, groupToMap: Tt, includes: ft, indexOf: gt, join: mt, keys: yt, lastIndexOf: gt, map: Ct, pop: Nt, push: _t, reduce: Tt, reduceRight: Tt, reverse: Ot, shift: Nt, slice: wt, some: It, sort: Rt, splice: kt, toLocaleString: mt, toString: mt, unshift: _t, values: $t }, St, true);
var Dt = class extends ee {
  constructor(e, t, i, s) {
    super(e), this.calledFromTryStatement = false, this.additionalInitializers = null, this.expressionsToBeDeoptimized = [], this.declarations = t ? [t] : [], this.init = i, this.deoptimizationTracker = s.deoptimizationTracker, this.module = s.module;
  }
  addDeclaration(e, t) {
    this.declarations.push(e);
    const i = this.markInitializersForDeoptimization();
    null !== t && i.push(t);
  }
  consolidateInitializers() {
    if (null !== this.additionalInitializers) {
      for (const e of this.additionalInitializers)
        e.deoptimizePath(B);
      this.additionalInitializers = null;
    }
  }
  deoptimizePath(e) {
    var t, i;
    if (!this.isReassigned && !this.deoptimizationTracker.trackEntityAtPathAndGetIfTracked(e, this))
      if (0 === e.length) {
        if (!this.isReassigned) {
          this.isReassigned = true;
          const e2 = this.expressionsToBeDeoptimized;
          this.expressionsToBeDeoptimized = [];
          for (const t2 of e2)
            t2.deoptimizeCache();
          null === (t = this.init) || void 0 === t || t.deoptimizePath(B);
        }
      } else
        null === (i = this.init) || void 0 === i || i.deoptimizePath(e);
  }
  deoptimizeThisOnInteractionAtPath(e, t, i) {
    if (this.isReassigned || !this.init)
      return e.thisArg.deoptimizePath(B);
    i.withTrackedEntityAtPath(t, this.init, () => this.init.deoptimizeThisOnInteractionAtPath(e, t, i), void 0);
  }
  getLiteralValueAtPath(e, t, i) {
    return this.isReassigned || !this.init ? W : t.withTrackedEntityAtPath(e, this.init, () => (this.expressionsToBeDeoptimized.push(i), this.init.getLiteralValueAtPath(e, t, i)), W);
  }
  getReturnExpressionWhenCalledAtPath(e, t, i, s) {
    return this.isReassigned || !this.init ? X : i.withTrackedEntityAtPath(e, this.init, () => (this.expressionsToBeDeoptimized.push(s), this.init.getReturnExpressionWhenCalledAtPath(e, t, i, s)), X);
  }
  hasEffectsOnInteractionAtPath(e, t, i) {
    switch (t.type) {
      case 0:
        return !!this.isReassigned || this.init && !i.accessed.trackEntityAtPathAndGetIfTracked(e, this) && this.init.hasEffectsOnInteractionAtPath(e, t, i);
      case 1:
        return !!this.included || 0 !== e.length && (!!this.isReassigned || this.init && !i.assigned.trackEntityAtPathAndGetIfTracked(e, this) && this.init.hasEffectsOnInteractionAtPath(e, t, i));
      case 2:
        return !!this.isReassigned || this.init && !(t.withNew ? i.instantiated : i.called).trackEntityAtPathAndGetIfTracked(e, t.args, this) && this.init.hasEffectsOnInteractionAtPath(e, t, i);
    }
  }
  include() {
    if (!this.included) {
      this.included = true;
      for (const e of this.declarations) {
        e.included || e.include(Re(), false);
        let t = e.parent;
        for (; !t.included && (t.included = true, "Program" !== t.type); )
          t = t.parent;
      }
    }
  }
  includeCallArguments(e, t) {
    if (this.isReassigned || this.init && e.includedCallArguments.has(this.init))
      for (const i of t)
        i.include(e, false);
    else
      this.init && (e.includedCallArguments.add(this.init), this.init.includeCallArguments(e, t), e.includedCallArguments.delete(this.init));
  }
  markCalledFromTryStatement() {
    this.calledFromTryStatement = true;
  }
  markInitializersForDeoptimization() {
    return null === this.additionalInitializers && (this.additionalInitializers = null === this.init ? [] : [this.init], this.init = X, this.isReassigned = true), this.additionalInitializers;
  }
};
function Lt(e) {
  let t = "";
  do {
    const i = e % 64;
    e = Math.floor(e / 64), t = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$"[i] + t;
  } while (0 !== e);
  return t;
}
function Vt(e, t) {
  let i = e, s = 1;
  for (; t.has(i) || we.has(i); )
    i = `${e}$${Lt(s++)}`;
  return t.add(i), i;
}
var Bt = class {
  constructor() {
    this.children = [], this.variables = /* @__PURE__ */ new Map();
  }
  addDeclaration(e, t, i, s) {
    const n3 = e.name;
    let r2 = this.variables.get(n3);
    return r2 ? r2.addDeclaration(e, i) : (r2 = new Dt(e.name, e, i || Le, t), this.variables.set(n3, r2)), r2;
  }
  contains(e) {
    return this.variables.has(e);
  }
  findVariable(e) {
    throw new Error("Internal Error: findVariable needs to be implemented by a subclass");
  }
};
var Ft = class extends Bt {
  constructor(e) {
    super(), this.accessedOutsideVariables = /* @__PURE__ */ new Map(), this.parent = e, e.children.push(this);
  }
  addAccessedDynamicImport(e) {
    (this.accessedDynamicImports || (this.accessedDynamicImports = /* @__PURE__ */ new Set())).add(e), this.parent instanceof Ft && this.parent.addAccessedDynamicImport(e);
  }
  addAccessedGlobals(e, t) {
    const i = t.get(this) || /* @__PURE__ */ new Set();
    for (const t2 of e)
      i.add(t2);
    t.set(this, i), this.parent instanceof Ft && this.parent.addAccessedGlobals(e, t);
  }
  addNamespaceMemberAccess(e, t) {
    this.accessedOutsideVariables.set(e, t), this.parent.addNamespaceMemberAccess(e, t);
  }
  addReturnExpression(e) {
    this.parent instanceof Ft && this.parent.addReturnExpression(e);
  }
  addUsedOutsideNames(e, t, i, s) {
    for (const s2 of this.accessedOutsideVariables.values())
      s2.included && (e.add(s2.getBaseVariableName()), "system" === t && i.has(s2) && e.add("exports"));
    const n3 = s.get(this);
    if (n3)
      for (const t2 of n3)
        e.add(t2);
  }
  contains(e) {
    return this.variables.has(e) || this.parent.contains(e);
  }
  deconflict(e, t, i) {
    const s = /* @__PURE__ */ new Set();
    if (this.addUsedOutsideNames(s, e, t, i), this.accessedDynamicImports)
      for (const e2 of this.accessedDynamicImports)
        e2.inlineNamespace && s.add(e2.inlineNamespace.getBaseVariableName());
    for (const [e2, t2] of this.variables)
      (t2.included || t2.alwaysRendered) && t2.setRenderNames(null, Vt(e2, s));
    for (const s2 of this.children)
      s2.deconflict(e, t, i);
  }
  findLexicalBoundary() {
    return this.parent.findLexicalBoundary();
  }
  findVariable(e) {
    const t = this.variables.get(e) || this.accessedOutsideVariables.get(e);
    if (t)
      return t;
    const i = this.parent.findVariable(e);
    return this.accessedOutsideVariables.set(e, i), i;
  }
};
var zt = class extends Ft {
  constructor(e, t) {
    super(e), this.parameters = [], this.hasRest = false, this.context = t, this.hoistedBodyVarScope = new Ft(this);
  }
  addParameterDeclaration(e) {
    const t = e.name;
    let i = this.hoistedBodyVarScope.variables.get(t);
    return i ? i.addDeclaration(e, null) : i = new Dt(t, e, X, this.context), this.variables.set(t, i), i;
  }
  addParameterVariables(e, t) {
    this.parameters = e;
    for (const t2 of e)
      for (const e2 of t2)
        e2.alwaysRendered = true;
    this.hasRest = t;
  }
  includeCallArguments(e, t) {
    let i = false, s = false;
    const n3 = this.hasRest && this.parameters[this.parameters.length - 1];
    for (const i2 of t)
      if (i2 instanceof dt) {
        for (const i3 of t)
          i3.include(e, false);
        break;
      }
    for (let r2 = t.length - 1; r2 >= 0; r2--) {
      const a2 = this.parameters[r2] || n3, o2 = t[r2];
      if (a2)
        if (i = false, 0 === a2.length)
          s = true;
        else
          for (const e2 of a2)
            e2.included && (s = true), e2.calledFromTryStatement && (i = true);
      !s && o2.shouldBeIncluded(e) && (s = true), s && o2.include(e, i);
    }
  }
};
var jt = class extends zt {
  constructor() {
    super(...arguments), this.returnExpression = null, this.returnExpressions = [];
  }
  addReturnExpression(e) {
    this.returnExpressions.push(e);
  }
  getReturnExpression() {
    return null === this.returnExpression && this.updateReturnExpression(), this.returnExpression;
  }
  updateReturnExpression() {
    if (1 === this.returnExpressions.length)
      this.returnExpression = this.returnExpressions[0];
    else {
      this.returnExpression = X;
      for (const e of this.returnExpressions)
        e.deoptimizePath(B);
    }
  }
};
function Ut(e, t) {
  if ("MemberExpression" === e.type)
    return !e.computed && Ut(e.object, e);
  if ("Identifier" === e.type) {
    if (!t)
      return true;
    switch (t.type) {
      case "MemberExpression":
        return t.computed || e === t.object;
      case "MethodDefinition":
        return t.computed;
      case "PropertyDefinition":
      case "Property":
        return t.computed || e === t.value;
      case "ExportSpecifier":
      case "ImportSpecifier":
        return e === t.local;
      case "LabeledStatement":
      case "BreakStatement":
      case "ContinueStatement":
        return false;
      default:
        return true;
    }
  }
  return false;
}
var Gt = Symbol("Value Properties");
var Ht = { hasEffectsWhenCalled: () => false };
var Wt = { hasEffectsWhenCalled: () => true };
var qt = { __proto__: null, [Gt]: Wt };
var Kt = { __proto__: null, [Gt]: Ht };
var Xt = { __proto__: null, [Gt]: { hasEffectsWhenCalled: ({ args: e }, t) => !e.length || e[0].hasEffectsOnInteractionAtPath(F, Q, t) } };
var Yt = { __proto__: null, [Gt]: Wt, prototype: qt };
var Qt = { __proto__: null, [Gt]: Ht, prototype: qt };
var Jt = { __proto__: null, [Gt]: Ht, from: Kt, of: Kt, prototype: qt };
var Zt = { __proto__: null, [Gt]: Ht, supportedLocalesOf: Qt };
var ei = { global: qt, globalThis: qt, self: qt, window: qt, __proto__: null, [Gt]: Wt, Array: { __proto__: null, [Gt]: Wt, from: qt, isArray: Kt, of: Kt, prototype: qt }, ArrayBuffer: { __proto__: null, [Gt]: Ht, isView: Kt, prototype: qt }, Atomics: qt, BigInt: Yt, BigInt64Array: Yt, BigUint64Array: Yt, Boolean: Qt, constructor: Yt, DataView: Qt, Date: { __proto__: null, [Gt]: Ht, now: Kt, parse: Kt, prototype: qt, UTC: Kt }, decodeURI: Kt, decodeURIComponent: Kt, encodeURI: Kt, encodeURIComponent: Kt, Error: Qt, escape: Kt, eval: qt, EvalError: Qt, Float32Array: Jt, Float64Array: Jt, Function: Yt, hasOwnProperty: qt, Infinity: qt, Int16Array: Jt, Int32Array: Jt, Int8Array: Jt, isFinite: Kt, isNaN: Kt, isPrototypeOf: qt, JSON: qt, Map: Qt, Math: { __proto__: null, [Gt]: Wt, abs: Kt, acos: Kt, acosh: Kt, asin: Kt, asinh: Kt, atan: Kt, atan2: Kt, atanh: Kt, cbrt: Kt, ceil: Kt, clz32: Kt, cos: Kt, cosh: Kt, exp: Kt, expm1: Kt, floor: Kt, fround: Kt, hypot: Kt, imul: Kt, log: Kt, log10: Kt, log1p: Kt, log2: Kt, max: Kt, min: Kt, pow: Kt, random: Kt, round: Kt, sign: Kt, sin: Kt, sinh: Kt, sqrt: Kt, tan: Kt, tanh: Kt, trunc: Kt }, NaN: qt, Number: { __proto__: null, [Gt]: Ht, isFinite: Kt, isInteger: Kt, isNaN: Kt, isSafeInteger: Kt, parseFloat: Kt, parseInt: Kt, prototype: qt }, Object: { __proto__: null, [Gt]: Ht, create: Kt, defineProperty: Xt, defineProperties: Xt, getOwnPropertyDescriptor: Kt, getOwnPropertyNames: Kt, getOwnPropertySymbols: Kt, getPrototypeOf: Kt, hasOwn: Kt, is: Kt, isExtensible: Kt, isFrozen: Kt, isSealed: Kt, keys: Kt, fromEntries: Kt, entries: Kt, prototype: qt }, parseFloat: Kt, parseInt: Kt, Promise: { __proto__: null, [Gt]: Wt, all: qt, prototype: qt, race: qt, reject: qt, resolve: qt }, propertyIsEnumerable: qt, Proxy: qt, RangeError: Qt, ReferenceError: Qt, Reflect: qt, RegExp: Qt, Set: Qt, SharedArrayBuffer: Yt, String: { __proto__: null, [Gt]: Ht, fromCharCode: Kt, fromCodePoint: Kt, prototype: qt, raw: Kt }, Symbol: { __proto__: null, [Gt]: Ht, for: Kt, keyFor: Kt, prototype: qt }, SyntaxError: Qt, toLocaleString: qt, toString: qt, TypeError: Qt, Uint16Array: Jt, Uint32Array: Jt, Uint8Array: Jt, Uint8ClampedArray: Jt, unescape: Kt, URIError: Qt, valueOf: qt, WeakMap: Qt, WeakSet: Qt, clearInterval: Yt, clearTimeout: Yt, console: qt, Intl: { __proto__: null, [Gt]: Wt, Collator: Zt, DateTimeFormat: Zt, ListFormat: Zt, NumberFormat: Zt, PluralRules: Zt, RelativeTimeFormat: Zt }, setInterval: Yt, setTimeout: Yt, TextDecoder: Yt, TextEncoder: Yt, URL: Yt, URLSearchParams: Yt, AbortController: Yt, AbortSignal: Yt, addEventListener: qt, alert: qt, AnalyserNode: Yt, Animation: Yt, AnimationEvent: Yt, applicationCache: qt, ApplicationCache: Yt, ApplicationCacheErrorEvent: Yt, atob: qt, Attr: Yt, Audio: Yt, AudioBuffer: Yt, AudioBufferSourceNode: Yt, AudioContext: Yt, AudioDestinationNode: Yt, AudioListener: Yt, AudioNode: Yt, AudioParam: Yt, AudioProcessingEvent: Yt, AudioScheduledSourceNode: Yt, AudioWorkletNode: Yt, BarProp: Yt, BaseAudioContext: Yt, BatteryManager: Yt, BeforeUnloadEvent: Yt, BiquadFilterNode: Yt, Blob: Yt, BlobEvent: Yt, blur: qt, BroadcastChannel: Yt, btoa: qt, ByteLengthQueuingStrategy: Yt, Cache: Yt, caches: qt, CacheStorage: Yt, cancelAnimationFrame: qt, cancelIdleCallback: qt, CanvasCaptureMediaStreamTrack: Yt, CanvasGradient: Yt, CanvasPattern: Yt, CanvasRenderingContext2D: Yt, ChannelMergerNode: Yt, ChannelSplitterNode: Yt, CharacterData: Yt, clientInformation: qt, ClipboardEvent: Yt, close: qt, closed: qt, CloseEvent: Yt, Comment: Yt, CompositionEvent: Yt, confirm: qt, ConstantSourceNode: Yt, ConvolverNode: Yt, CountQueuingStrategy: Yt, createImageBitmap: qt, Credential: Yt, CredentialsContainer: Yt, crypto: qt, Crypto: Yt, CryptoKey: Yt, CSS: Yt, CSSConditionRule: Yt, CSSFontFaceRule: Yt, CSSGroupingRule: Yt, CSSImportRule: Yt, CSSKeyframeRule: Yt, CSSKeyframesRule: Yt, CSSMediaRule: Yt, CSSNamespaceRule: Yt, CSSPageRule: Yt, CSSRule: Yt, CSSRuleList: Yt, CSSStyleDeclaration: Yt, CSSStyleRule: Yt, CSSStyleSheet: Yt, CSSSupportsRule: Yt, CustomElementRegistry: Yt, customElements: qt, CustomEvent: Yt, DataTransfer: Yt, DataTransferItem: Yt, DataTransferItemList: Yt, defaultstatus: qt, defaultStatus: qt, DelayNode: Yt, DeviceMotionEvent: Yt, DeviceOrientationEvent: Yt, devicePixelRatio: qt, dispatchEvent: qt, document: qt, Document: Yt, DocumentFragment: Yt, DocumentType: Yt, DOMError: Yt, DOMException: Yt, DOMImplementation: Yt, DOMMatrix: Yt, DOMMatrixReadOnly: Yt, DOMParser: Yt, DOMPoint: Yt, DOMPointReadOnly: Yt, DOMQuad: Yt, DOMRect: Yt, DOMRectReadOnly: Yt, DOMStringList: Yt, DOMStringMap: Yt, DOMTokenList: Yt, DragEvent: Yt, DynamicsCompressorNode: Yt, Element: Yt, ErrorEvent: Yt, Event: Yt, EventSource: Yt, EventTarget: Yt, external: qt, fetch: qt, File: Yt, FileList: Yt, FileReader: Yt, find: qt, focus: qt, FocusEvent: Yt, FontFace: Yt, FontFaceSetLoadEvent: Yt, FormData: Yt, frames: qt, GainNode: Yt, Gamepad: Yt, GamepadButton: Yt, GamepadEvent: Yt, getComputedStyle: qt, getSelection: qt, HashChangeEvent: Yt, Headers: Yt, history: qt, History: Yt, HTMLAllCollection: Yt, HTMLAnchorElement: Yt, HTMLAreaElement: Yt, HTMLAudioElement: Yt, HTMLBaseElement: Yt, HTMLBodyElement: Yt, HTMLBRElement: Yt, HTMLButtonElement: Yt, HTMLCanvasElement: Yt, HTMLCollection: Yt, HTMLContentElement: Yt, HTMLDataElement: Yt, HTMLDataListElement: Yt, HTMLDetailsElement: Yt, HTMLDialogElement: Yt, HTMLDirectoryElement: Yt, HTMLDivElement: Yt, HTMLDListElement: Yt, HTMLDocument: Yt, HTMLElement: Yt, HTMLEmbedElement: Yt, HTMLFieldSetElement: Yt, HTMLFontElement: Yt, HTMLFormControlsCollection: Yt, HTMLFormElement: Yt, HTMLFrameElement: Yt, HTMLFrameSetElement: Yt, HTMLHeadElement: Yt, HTMLHeadingElement: Yt, HTMLHRElement: Yt, HTMLHtmlElement: Yt, HTMLIFrameElement: Yt, HTMLImageElement: Yt, HTMLInputElement: Yt, HTMLLabelElement: Yt, HTMLLegendElement: Yt, HTMLLIElement: Yt, HTMLLinkElement: Yt, HTMLMapElement: Yt, HTMLMarqueeElement: Yt, HTMLMediaElement: Yt, HTMLMenuElement: Yt, HTMLMetaElement: Yt, HTMLMeterElement: Yt, HTMLModElement: Yt, HTMLObjectElement: Yt, HTMLOListElement: Yt, HTMLOptGroupElement: Yt, HTMLOptionElement: Yt, HTMLOptionsCollection: Yt, HTMLOutputElement: Yt, HTMLParagraphElement: Yt, HTMLParamElement: Yt, HTMLPictureElement: Yt, HTMLPreElement: Yt, HTMLProgressElement: Yt, HTMLQuoteElement: Yt, HTMLScriptElement: Yt, HTMLSelectElement: Yt, HTMLShadowElement: Yt, HTMLSlotElement: Yt, HTMLSourceElement: Yt, HTMLSpanElement: Yt, HTMLStyleElement: Yt, HTMLTableCaptionElement: Yt, HTMLTableCellElement: Yt, HTMLTableColElement: Yt, HTMLTableElement: Yt, HTMLTableRowElement: Yt, HTMLTableSectionElement: Yt, HTMLTemplateElement: Yt, HTMLTextAreaElement: Yt, HTMLTimeElement: Yt, HTMLTitleElement: Yt, HTMLTrackElement: Yt, HTMLUListElement: Yt, HTMLUnknownElement: Yt, HTMLVideoElement: Yt, IDBCursor: Yt, IDBCursorWithValue: Yt, IDBDatabase: Yt, IDBFactory: Yt, IDBIndex: Yt, IDBKeyRange: Yt, IDBObjectStore: Yt, IDBOpenDBRequest: Yt, IDBRequest: Yt, IDBTransaction: Yt, IDBVersionChangeEvent: Yt, IdleDeadline: Yt, IIRFilterNode: Yt, Image: Yt, ImageBitmap: Yt, ImageBitmapRenderingContext: Yt, ImageCapture: Yt, ImageData: Yt, indexedDB: qt, innerHeight: qt, innerWidth: qt, InputEvent: Yt, IntersectionObserver: Yt, IntersectionObserverEntry: Yt, isSecureContext: qt, KeyboardEvent: Yt, KeyframeEffect: Yt, length: qt, localStorage: qt, location: qt, Location: Yt, locationbar: qt, matchMedia: qt, MediaDeviceInfo: Yt, MediaDevices: Yt, MediaElementAudioSourceNode: Yt, MediaEncryptedEvent: Yt, MediaError: Yt, MediaKeyMessageEvent: Yt, MediaKeySession: Yt, MediaKeyStatusMap: Yt, MediaKeySystemAccess: Yt, MediaList: Yt, MediaQueryList: Yt, MediaQueryListEvent: Yt, MediaRecorder: Yt, MediaSettingsRange: Yt, MediaSource: Yt, MediaStream: Yt, MediaStreamAudioDestinationNode: Yt, MediaStreamAudioSourceNode: Yt, MediaStreamEvent: Yt, MediaStreamTrack: Yt, MediaStreamTrackEvent: Yt, menubar: qt, MessageChannel: Yt, MessageEvent: Yt, MessagePort: Yt, MIDIAccess: Yt, MIDIConnectionEvent: Yt, MIDIInput: Yt, MIDIInputMap: Yt, MIDIMessageEvent: Yt, MIDIOutput: Yt, MIDIOutputMap: Yt, MIDIPort: Yt, MimeType: Yt, MimeTypeArray: Yt, MouseEvent: Yt, moveBy: qt, moveTo: qt, MutationEvent: Yt, MutationObserver: Yt, MutationRecord: Yt, name: qt, NamedNodeMap: Yt, NavigationPreloadManager: Yt, navigator: qt, Navigator: Yt, NetworkInformation: Yt, Node: Yt, NodeFilter: qt, NodeIterator: Yt, NodeList: Yt, Notification: Yt, OfflineAudioCompletionEvent: Yt, OfflineAudioContext: Yt, offscreenBuffering: qt, OffscreenCanvas: Yt, open: qt, openDatabase: qt, Option: Yt, origin: qt, OscillatorNode: Yt, outerHeight: qt, outerWidth: qt, PageTransitionEvent: Yt, pageXOffset: qt, pageYOffset: qt, PannerNode: Yt, parent: qt, Path2D: Yt, PaymentAddress: Yt, PaymentRequest: Yt, PaymentRequestUpdateEvent: Yt, PaymentResponse: Yt, performance: qt, Performance: Yt, PerformanceEntry: Yt, PerformanceLongTaskTiming: Yt, PerformanceMark: Yt, PerformanceMeasure: Yt, PerformanceNavigation: Yt, PerformanceNavigationTiming: Yt, PerformanceObserver: Yt, PerformanceObserverEntryList: Yt, PerformancePaintTiming: Yt, PerformanceResourceTiming: Yt, PerformanceTiming: Yt, PeriodicWave: Yt, Permissions: Yt, PermissionStatus: Yt, personalbar: qt, PhotoCapabilities: Yt, Plugin: Yt, PluginArray: Yt, PointerEvent: Yt, PopStateEvent: Yt, postMessage: qt, Presentation: Yt, PresentationAvailability: Yt, PresentationConnection: Yt, PresentationConnectionAvailableEvent: Yt, PresentationConnectionCloseEvent: Yt, PresentationConnectionList: Yt, PresentationReceiver: Yt, PresentationRequest: Yt, print: qt, ProcessingInstruction: Yt, ProgressEvent: Yt, PromiseRejectionEvent: Yt, prompt: qt, PushManager: Yt, PushSubscription: Yt, PushSubscriptionOptions: Yt, queueMicrotask: qt, RadioNodeList: Yt, Range: Yt, ReadableStream: Yt, RemotePlayback: Yt, removeEventListener: qt, Request: Yt, requestAnimationFrame: qt, requestIdleCallback: qt, resizeBy: qt, ResizeObserver: Yt, ResizeObserverEntry: Yt, resizeTo: qt, Response: Yt, RTCCertificate: Yt, RTCDataChannel: Yt, RTCDataChannelEvent: Yt, RTCDtlsTransport: Yt, RTCIceCandidate: Yt, RTCIceTransport: Yt, RTCPeerConnection: Yt, RTCPeerConnectionIceEvent: Yt, RTCRtpReceiver: Yt, RTCRtpSender: Yt, RTCSctpTransport: Yt, RTCSessionDescription: Yt, RTCStatsReport: Yt, RTCTrackEvent: Yt, screen: qt, Screen: Yt, screenLeft: qt, ScreenOrientation: Yt, screenTop: qt, screenX: qt, screenY: qt, ScriptProcessorNode: Yt, scroll: qt, scrollbars: qt, scrollBy: qt, scrollTo: qt, scrollX: qt, scrollY: qt, SecurityPolicyViolationEvent: Yt, Selection: Yt, ServiceWorker: Yt, ServiceWorkerContainer: Yt, ServiceWorkerRegistration: Yt, sessionStorage: qt, ShadowRoot: Yt, SharedWorker: Yt, SourceBuffer: Yt, SourceBufferList: Yt, speechSynthesis: qt, SpeechSynthesisEvent: Yt, SpeechSynthesisUtterance: Yt, StaticRange: Yt, status: qt, statusbar: qt, StereoPannerNode: Yt, stop: qt, Storage: Yt, StorageEvent: Yt, StorageManager: Yt, styleMedia: qt, StyleSheet: Yt, StyleSheetList: Yt, SubtleCrypto: Yt, SVGAElement: Yt, SVGAngle: Yt, SVGAnimatedAngle: Yt, SVGAnimatedBoolean: Yt, SVGAnimatedEnumeration: Yt, SVGAnimatedInteger: Yt, SVGAnimatedLength: Yt, SVGAnimatedLengthList: Yt, SVGAnimatedNumber: Yt, SVGAnimatedNumberList: Yt, SVGAnimatedPreserveAspectRatio: Yt, SVGAnimatedRect: Yt, SVGAnimatedString: Yt, SVGAnimatedTransformList: Yt, SVGAnimateElement: Yt, SVGAnimateMotionElement: Yt, SVGAnimateTransformElement: Yt, SVGAnimationElement: Yt, SVGCircleElement: Yt, SVGClipPathElement: Yt, SVGComponentTransferFunctionElement: Yt, SVGDefsElement: Yt, SVGDescElement: Yt, SVGDiscardElement: Yt, SVGElement: Yt, SVGEllipseElement: Yt, SVGFEBlendElement: Yt, SVGFEColorMatrixElement: Yt, SVGFEComponentTransferElement: Yt, SVGFECompositeElement: Yt, SVGFEConvolveMatrixElement: Yt, SVGFEDiffuseLightingElement: Yt, SVGFEDisplacementMapElement: Yt, SVGFEDistantLightElement: Yt, SVGFEDropShadowElement: Yt, SVGFEFloodElement: Yt, SVGFEFuncAElement: Yt, SVGFEFuncBElement: Yt, SVGFEFuncGElement: Yt, SVGFEFuncRElement: Yt, SVGFEGaussianBlurElement: Yt, SVGFEImageElement: Yt, SVGFEMergeElement: Yt, SVGFEMergeNodeElement: Yt, SVGFEMorphologyElement: Yt, SVGFEOffsetElement: Yt, SVGFEPointLightElement: Yt, SVGFESpecularLightingElement: Yt, SVGFESpotLightElement: Yt, SVGFETileElement: Yt, SVGFETurbulenceElement: Yt, SVGFilterElement: Yt, SVGForeignObjectElement: Yt, SVGGElement: Yt, SVGGeometryElement: Yt, SVGGradientElement: Yt, SVGGraphicsElement: Yt, SVGImageElement: Yt, SVGLength: Yt, SVGLengthList: Yt, SVGLinearGradientElement: Yt, SVGLineElement: Yt, SVGMarkerElement: Yt, SVGMaskElement: Yt, SVGMatrix: Yt, SVGMetadataElement: Yt, SVGMPathElement: Yt, SVGNumber: Yt, SVGNumberList: Yt, SVGPathElement: Yt, SVGPatternElement: Yt, SVGPoint: Yt, SVGPointList: Yt, SVGPolygonElement: Yt, SVGPolylineElement: Yt, SVGPreserveAspectRatio: Yt, SVGRadialGradientElement: Yt, SVGRect: Yt, SVGRectElement: Yt, SVGScriptElement: Yt, SVGSetElement: Yt, SVGStopElement: Yt, SVGStringList: Yt, SVGStyleElement: Yt, SVGSVGElement: Yt, SVGSwitchElement: Yt, SVGSymbolElement: Yt, SVGTextContentElement: Yt, SVGTextElement: Yt, SVGTextPathElement: Yt, SVGTextPositioningElement: Yt, SVGTitleElement: Yt, SVGTransform: Yt, SVGTransformList: Yt, SVGTSpanElement: Yt, SVGUnitTypes: Yt, SVGUseElement: Yt, SVGViewElement: Yt, TaskAttributionTiming: Yt, Text: Yt, TextEvent: Yt, TextMetrics: Yt, TextTrack: Yt, TextTrackCue: Yt, TextTrackCueList: Yt, TextTrackList: Yt, TimeRanges: Yt, toolbar: qt, top: qt, Touch: Yt, TouchEvent: Yt, TouchList: Yt, TrackEvent: Yt, TransitionEvent: Yt, TreeWalker: Yt, UIEvent: Yt, ValidityState: Yt, visualViewport: qt, VisualViewport: Yt, VTTCue: Yt, WaveShaperNode: Yt, WebAssembly: qt, WebGL2RenderingContext: Yt, WebGLActiveInfo: Yt, WebGLBuffer: Yt, WebGLContextEvent: Yt, WebGLFramebuffer: Yt, WebGLProgram: Yt, WebGLQuery: Yt, WebGLRenderbuffer: Yt, WebGLRenderingContext: Yt, WebGLSampler: Yt, WebGLShader: Yt, WebGLShaderPrecisionFormat: Yt, WebGLSync: Yt, WebGLTexture: Yt, WebGLTransformFeedback: Yt, WebGLUniformLocation: Yt, WebGLVertexArrayObject: Yt, WebSocket: Yt, WheelEvent: Yt, Window: Yt, Worker: Yt, WritableStream: Yt, XMLDocument: Yt, XMLHttpRequest: Yt, XMLHttpRequestEventTarget: Yt, XMLHttpRequestUpload: Yt, XMLSerializer: Yt, XPathEvaluator: Yt, XPathExpression: Yt, XPathResult: Yt, XSLTProcessor: Yt };
for (const e of ["window", "global", "self", "globalThis"])
  ei[e] = ei;
function ti(e) {
  let t = ei;
  for (const i of e) {
    if ("string" != typeof i)
      return null;
    if (t = t[i], !t)
      return null;
  }
  return t[Gt];
}
var ii = class extends ee {
  constructor() {
    super(...arguments), this.isReassigned = true;
  }
  getLiteralValueAtPath(e, t, i) {
    return ti([this.name, ...e]) ? q : W;
  }
  hasEffectsOnInteractionAtPath(e, t, i) {
    switch (t.type) {
      case 0:
        return 0 === e.length ? "undefined" !== this.name && !ti([this.name]) : !ti([this.name, ...e].slice(0, -1));
      case 1:
        return true;
      case 2: {
        const s = ti([this.name, ...e]);
        return !s || s.hasEffectsWhenCalled(t, i);
      }
    }
  }
};
var si = { __proto__: null, class: true, const: true, let: true, var: true };
var ni = class extends ut {
  constructor() {
    super(...arguments), this.variable = null, this.isTDZAccess = null;
  }
  addExportedVariables(e, t) {
    t.has(this.variable) && e.push(this.variable);
  }
  bind() {
    !this.variable && Ut(this, this.parent) && (this.variable = this.scope.findVariable(this.name), this.variable.addReference(this));
  }
  declare(e, t) {
    let i;
    const { treeshake: s } = this.context.options;
    switch (e) {
      case "var":
        i = this.scope.addDeclaration(this, this.context, t, true), s && s.correctVarValueBeforeDeclaration && i.markInitializersForDeoptimization();
        break;
      case "function":
      case "let":
      case "const":
      case "class":
        i = this.scope.addDeclaration(this, this.context, t, false);
        break;
      case "parameter":
        i = this.scope.addParameterDeclaration(this);
        break;
      default:
        throw new Error(`Internal Error: Unexpected identifier kind ${e}.`);
    }
    return i.kind = e, [this.variable = i];
  }
  deoptimizePath(e) {
    var t;
    0 !== e.length || this.scope.contains(this.name) || this.disallowImportReassignment(), null === (t = this.variable) || void 0 === t || t.deoptimizePath(e);
  }
  deoptimizeThisOnInteractionAtPath(e, t, i) {
    this.variable.deoptimizeThisOnInteractionAtPath(e, t, i);
  }
  getLiteralValueAtPath(e, t, i) {
    return this.getVariableRespectingTDZ().getLiteralValueAtPath(e, t, i);
  }
  getReturnExpressionWhenCalledAtPath(e, t, i, s) {
    return this.getVariableRespectingTDZ().getReturnExpressionWhenCalledAtPath(e, t, i, s);
  }
  hasEffects(e) {
    return this.deoptimized || this.applyDeoptimizations(), !(!this.isPossibleTDZ() || "var" === this.variable.kind) || this.context.options.treeshake.unknownGlobalSideEffects && this.variable instanceof ii && this.variable.hasEffectsOnInteractionAtPath(V, Y, e);
  }
  hasEffectsOnInteractionAtPath(e, t, i) {
    switch (t.type) {
      case 0:
        return null !== this.variable && this.getVariableRespectingTDZ().hasEffectsOnInteractionAtPath(e, t, i);
      case 1:
        return (e.length > 0 ? this.getVariableRespectingTDZ() : this.variable).hasEffectsOnInteractionAtPath(e, t, i);
      case 2:
        return this.getVariableRespectingTDZ().hasEffectsOnInteractionAtPath(e, t, i);
    }
  }
  include() {
    this.deoptimized || this.applyDeoptimizations(), this.included || (this.included = true, null !== this.variable && this.context.includeVariableInModule(this.variable));
  }
  includeCallArguments(e, t) {
    this.variable.includeCallArguments(e, t);
  }
  isPossibleTDZ() {
    if (null !== this.isTDZAccess)
      return this.isTDZAccess;
    if (!(this.variable instanceof Dt && this.variable.kind && this.variable.kind in si))
      return this.isTDZAccess = false;
    let e;
    return this.variable.declarations && 1 === this.variable.declarations.length && (e = this.variable.declarations[0]) && this.start < e.start && ri(this) === ri(e) ? this.isTDZAccess = true : this.variable.initReached ? this.isTDZAccess = false : this.isTDZAccess = true;
  }
  markDeclarationReached() {
    this.variable.initReached = true;
  }
  render(e, { snippets: { getPropertyAccess: t } }, { renderedParentType: i, isCalleeOfRenderedParent: s, isShorthandProperty: n3 } = ie) {
    if (this.variable) {
      const r2 = this.variable.getName(t);
      r2 !== this.name && (e.overwrite(this.start, this.end, r2, { contentOnly: true, storeName: true }), n3 && e.prependRight(this.start, `${this.name}: `)), "eval" === r2 && "CallExpression" === i && s && e.appendRight(this.start, "0, ");
    }
  }
  applyDeoptimizations() {
    this.deoptimized = true, this.variable instanceof Dt && (this.variable.consolidateInitializers(), this.context.requestTreeshakingPass());
  }
  disallowImportReassignment() {
    return this.context.error({ code: "ILLEGAL_REASSIGNMENT", message: `Illegal reassignment to import '${this.name}'` }, this.start);
  }
  getVariableRespectingTDZ() {
    return this.isPossibleTDZ() ? X : this.variable;
  }
};
function ri(e) {
  for (; e && !/^Program|Function/.test(e.type); )
    e = e.parent;
  return e;
}
function ai(e, t, i, s) {
  if (t.remove(i, s), e.annotations)
    for (const s2 of e.annotations) {
      if (!(s2.start < i))
        return;
      t.remove(s2.start, s2.end);
    }
}
function oi(e, t) {
  if (e.annotations || "ExpressionStatement" !== e.parent.type || (e = e.parent), e.annotations)
    for (const i of e.annotations)
      t.remove(i.start, i.end);
}
var li = { isNoStatement: true };
function hi(e, t, i = 0) {
  let s, n3;
  for (s = e.indexOf(t, i); ; ) {
    if (-1 === (i = e.indexOf("/", i)) || i >= s)
      return s;
    n3 = e.charCodeAt(++i), ++i, (i = 47 === n3 ? e.indexOf("\n", i) + 1 : e.indexOf("*/", i) + 2) > s && (s = e.indexOf(t, i));
  }
}
var ci = /\S/g;
function ui(e, t) {
  ci.lastIndex = t;
  return ci.exec(e).index;
}
function di(e) {
  let t, i, s = 0;
  for (t = e.indexOf("\n", s); ; ) {
    if (s = e.indexOf("/", s), -1 === s || s > t)
      return [t, t + 1];
    if (i = e.charCodeAt(s + 1), 47 === i)
      return [s, t + 1];
    s = e.indexOf("*/", s + 3) + 2, s > t && (t = e.indexOf("\n", s));
  }
}
function pi(e, t, i, s, n3) {
  let r2, a2, o2, l2, h2 = e[0], c2 = !h2.included || h2.needsBoundaries;
  c2 && (l2 = i + di(t.original.slice(i, h2.start))[1]);
  for (let i2 = 1; i2 <= e.length; i2++)
    r2 = h2, a2 = l2, o2 = c2, h2 = e[i2], c2 = void 0 !== h2 && (!h2.included || h2.needsBoundaries), o2 || c2 ? (l2 = r2.end + di(t.original.slice(r2.end, void 0 === h2 ? s : h2.start))[1], r2.included ? o2 ? r2.render(t, n3, { end: l2, start: a2 }) : r2.render(t, n3) : ai(r2, t, a2, l2)) : r2.render(t, n3);
}
function fi(e, t, i, s) {
  const n3 = [];
  let r2, a2, o2, l2, h2, c2 = i - 1;
  for (let s2 = 0; s2 < e.length; s2++) {
    for (a2 = e[s2], void 0 !== r2 && (c2 = r2.end + hi(t.original.slice(r2.end, a2.start), ",")), o2 = l2 = c2 + 1 + di(t.original.slice(c2 + 1, a2.start))[1]; h2 = t.original.charCodeAt(o2), 32 === h2 || 9 === h2 || 10 === h2 || 13 === h2; )
      o2++;
    void 0 !== r2 && n3.push({ contentEnd: l2, end: o2, node: r2, separator: c2, start: i }), r2 = a2, i = o2;
  }
  return n3.push({ contentEnd: s, end: s, node: r2, separator: null, start: i }), n3;
}
function mi(e, t, i) {
  for (; ; ) {
    const [s, n3] = di(e.original.slice(t, i));
    if (-1 === s)
      break;
    e.remove(t + s, t += n3);
  }
}
var gi = class extends Ft {
  addDeclaration(e, t, i, s) {
    if (s) {
      const n3 = this.parent.addDeclaration(e, t, i, s);
      return n3.markInitializersForDeoptimization(), n3;
    }
    return super.addDeclaration(e, t, i, false);
  }
};
var yi = class extends ut {
  initialise() {
    this.directive && "use strict" !== this.directive && "Program" === this.parent.type && this.context.warn({ code: "MODULE_LEVEL_DIRECTIVE", message: `Module level directives cause errors when bundled, '${this.directive}' was ignored.` }, this.start);
  }
  render(e, t) {
    super.render(e, t), this.included && this.insertSemicolon(e);
  }
  shouldBeIncluded(e) {
    return this.directive && "use strict" !== this.directive ? "Program" !== this.parent.type : super.shouldBeIncluded(e);
  }
  applyDeoptimizations() {
  }
};
var xi = class extends ut {
  constructor() {
    super(...arguments), this.directlyIncluded = false;
  }
  addImplicitReturnExpressionToScope() {
    const e = this.body[this.body.length - 1];
    e && "ReturnStatement" === e.type || this.scope.addReturnExpression(X);
  }
  createScope(e) {
    this.scope = this.parent.preventChildBlockScope ? e : new gi(e);
  }
  hasEffects(e) {
    if (this.deoptimizeBody)
      return true;
    for (const t of this.body) {
      if (e.brokenFlow)
        break;
      if (t.hasEffects(e))
        return true;
    }
    return false;
  }
  include(e, t) {
    if (!this.deoptimizeBody || !this.directlyIncluded) {
      this.included = true, this.directlyIncluded = true, this.deoptimizeBody && (t = true);
      for (const i of this.body)
        (t || i.shouldBeIncluded(e)) && i.include(e, t);
    }
  }
  initialise() {
    const e = this.body[0];
    this.deoptimizeBody = e instanceof yi && "use asm" === e.directive;
  }
  render(e, t) {
    this.body.length ? pi(this.body, e, this.start + 1, this.end - 1, t) : super.render(e, t);
  }
};
var Ei = class extends ut {
  constructor() {
    super(...arguments), this.declarationInit = null;
  }
  addExportedVariables(e, t) {
    this.argument.addExportedVariables(e, t);
  }
  declare(e, t) {
    return this.declarationInit = t, this.argument.declare(e, X);
  }
  deoptimizePath(e) {
    0 === e.length && this.argument.deoptimizePath(V);
  }
  hasEffectsOnInteractionAtPath(e, t, i) {
    return e.length > 0 || this.argument.hasEffectsOnInteractionAtPath(V, t, i);
  }
  markDeclarationReached() {
    this.argument.markDeclarationReached();
  }
  applyDeoptimizations() {
    this.deoptimized = true, null !== this.declarationInit && (this.declarationInit.deoptimizePath([M, M]), this.context.requestTreeshakingPass());
  }
};
var bi = class extends ut {
  constructor() {
    super(...arguments), this.objectEntity = null, this.deoptimizedReturn = false;
  }
  deoptimizePath(e) {
    this.getObjectEntity().deoptimizePath(e), 1 === e.length && e[0] === M && this.scope.getReturnExpression().deoptimizePath(B);
  }
  deoptimizeThisOnInteractionAtPath(e, t, i) {
    t.length > 0 && this.getObjectEntity().deoptimizeThisOnInteractionAtPath(e, t, i);
  }
  getLiteralValueAtPath(e, t, i) {
    return this.getObjectEntity().getLiteralValueAtPath(e, t, i);
  }
  getReturnExpressionWhenCalledAtPath(e, t, i, s) {
    return e.length > 0 ? this.getObjectEntity().getReturnExpressionWhenCalledAtPath(e, t, i, s) : this.async ? (this.deoptimizedReturn || (this.deoptimizedReturn = true, this.scope.getReturnExpression().deoptimizePath(B), this.context.requestTreeshakingPass()), X) : this.scope.getReturnExpression();
  }
  hasEffectsOnInteractionAtPath(e, t, i) {
    if (e.length > 0 || 2 !== t.type)
      return this.getObjectEntity().hasEffectsOnInteractionAtPath(e, t, i);
    if (this.async) {
      const { propertyReadSideEffects: e2 } = this.context.options.treeshake, t2 = this.scope.getReturnExpression();
      if (t2.hasEffectsOnInteractionAtPath(["then"], Z, i) || e2 && ("always" === e2 || t2.hasEffectsOnInteractionAtPath(["then"], Y, i)))
        return true;
    }
    for (const e2 of this.params)
      if (e2.hasEffects(i))
        return true;
    return false;
  }
  include(e, t) {
    this.deoptimized || this.applyDeoptimizations(), this.included = true;
    const { brokenFlow: i } = e;
    e.brokenFlow = 0, this.body.include(e, t), e.brokenFlow = i;
  }
  includeCallArguments(e, t) {
    this.scope.includeCallArguments(e, t);
  }
  initialise() {
    this.scope.addParameterVariables(this.params.map((e) => e.declare("parameter", X)), this.params[this.params.length - 1] instanceof Ei), this.body instanceof xi ? this.body.addImplicitReturnExpressionToScope() : this.scope.addReturnExpression(this.body);
  }
  parseNode(e) {
    "BlockStatement" === e.body.type && (this.body = new xi(e.body, this, this.scope.hoistedBodyVarScope)), super.parseNode(e);
  }
  applyDeoptimizations() {
  }
};
bi.prototype.preventChildBlockScope = true;
var vi = class extends bi {
  constructor() {
    super(...arguments), this.objectEntity = null;
  }
  createScope(e) {
    this.scope = new jt(e, this.context);
  }
  hasEffects() {
    return this.deoptimized || this.applyDeoptimizations(), false;
  }
  hasEffectsOnInteractionAtPath(e, t, i) {
    if (super.hasEffectsOnInteractionAtPath(e, t, i))
      return true;
    if (2 === t.type) {
      const { ignore: e2, brokenFlow: t2 } = i;
      if (i.ignore = { breaks: false, continues: false, labels: /* @__PURE__ */ new Set(), returnYield: true }, this.body.hasEffects(i))
        return true;
      i.ignore = e2, i.brokenFlow = t2;
    }
    return false;
  }
  include(e, t) {
    super.include(e, t);
    for (const i of this.params)
      i instanceof ni || i.include(e, t);
  }
  getObjectEntity() {
    return null !== this.objectEntity ? this.objectEntity : this.objectEntity = new Et([], St);
  }
};
function Si(e, { exportNamesByVariable: t, snippets: { _: i, getObject: s, getPropertyAccess: n3 } }, r2 = "") {
  if (1 === e.length && 1 === t.get(e[0]).length) {
    const s2 = e[0];
    return `exports('${t.get(s2)}',${i}${s2.getName(n3)}${r2})`;
  }
  {
    const i2 = [];
    for (const s2 of e)
      for (const e2 of t.get(s2))
        i2.push([e2, s2.getName(n3) + r2]);
    return `exports(${s(i2, { lineBreakIndent: null })})`;
  }
}
function Ai(e, t, i, s, { exportNamesByVariable: n3, snippets: { _: r2 } }) {
  s.prependRight(t, `exports('${n3.get(e)}',${r2}`), s.appendLeft(i, ")");
}
function Ii(e, t, i, s, n3, r2) {
  const { _: a2, getPropertyAccess: o2 } = r2.snippets;
  n3.appendLeft(i, `,${a2}${Si([e], r2)},${a2}${e.getName(o2)}`), s && (n3.prependRight(t, "("), n3.appendLeft(i, ")"));
}
var Pi = class extends ut {
  addExportedVariables(e, t) {
    for (const i of this.properties)
      "Property" === i.type ? i.value.addExportedVariables(e, t) : i.argument.addExportedVariables(e, t);
  }
  declare(e, t) {
    const i = [];
    for (const s of this.properties)
      i.push(...s.declare(e, t));
    return i;
  }
  deoptimizePath(e) {
    if (0 === e.length)
      for (const t of this.properties)
        t.deoptimizePath(e);
  }
  hasEffectsOnInteractionAtPath(e, t, i) {
    for (const e2 of this.properties)
      if (e2.hasEffectsOnInteractionAtPath(V, t, i))
        return true;
    return false;
  }
  markDeclarationReached() {
    for (const e of this.properties)
      e.markDeclarationReached();
  }
};
var ki = class extends Dt {
  constructor(e) {
    super("arguments", null, X, e);
  }
  hasEffectsOnInteractionAtPath(e, { type: t }) {
    return 0 !== t || e.length > 1;
  }
};
var wi = class extends Dt {
  constructor(e) {
    super("this", null, null, e), this.deoptimizedPaths = [], this.entitiesToBeDeoptimized = /* @__PURE__ */ new Set(), this.thisDeoptimizationList = [], this.thisDeoptimizations = new H();
  }
  addEntityToBeDeoptimized(e) {
    for (const t of this.deoptimizedPaths)
      e.deoptimizePath(t);
    for (const { interaction: t, path: i } of this.thisDeoptimizationList)
      e.deoptimizeThisOnInteractionAtPath(t, i, G);
    this.entitiesToBeDeoptimized.add(e);
  }
  deoptimizePath(e) {
    if (0 !== e.length && !this.deoptimizationTracker.trackEntityAtPathAndGetIfTracked(e, this)) {
      this.deoptimizedPaths.push(e);
      for (const t of this.entitiesToBeDeoptimized)
        t.deoptimizePath(e);
    }
  }
  deoptimizeThisOnInteractionAtPath(e, t) {
    const i = { interaction: e, path: t };
    if (!this.thisDeoptimizations.trackEntityAtPathAndGetIfTracked(t, e.type, e.thisArg)) {
      for (const i2 of this.entitiesToBeDeoptimized)
        i2.deoptimizeThisOnInteractionAtPath(e, t, G);
      this.thisDeoptimizationList.push(i);
    }
  }
  hasEffectsOnInteractionAtPath(e, t, i) {
    return this.getInit(i).hasEffectsOnInteractionAtPath(e, t, i) || super.hasEffectsOnInteractionAtPath(e, t, i);
  }
  getInit(e) {
    return e.replacedVariableInits.get(this) || X;
  }
};
var Ci = class extends jt {
  constructor(e, t) {
    super(e, t), this.variables.set("arguments", this.argumentsVariable = new ki(t)), this.variables.set("this", this.thisVariable = new wi(t));
  }
  findLexicalBoundary() {
    return this;
  }
  includeCallArguments(e, t) {
    if (super.includeCallArguments(e, t), this.argumentsVariable.included)
      for (const i of t)
        i.included || i.include(e, false);
  }
};
var _i = class extends bi {
  constructor() {
    super(...arguments), this.objectEntity = null;
  }
  createScope(e) {
    this.scope = new Ci(e, this.context);
  }
  deoptimizeThisOnInteractionAtPath(e, t, i) {
    super.deoptimizeThisOnInteractionAtPath(e, t, i), 2 === e.type && 0 === t.length && this.scope.thisVariable.addEntityToBeDeoptimized(e.thisArg);
  }
  hasEffects(e) {
    var t;
    return this.deoptimized || this.applyDeoptimizations(), !!(null === (t = this.id) || void 0 === t ? void 0 : t.hasEffects(e));
  }
  hasEffectsOnInteractionAtPath(e, t, i) {
    if (super.hasEffectsOnInteractionAtPath(e, t, i))
      return true;
    if (2 === t.type) {
      const e2 = i.replacedVariableInits.get(this.scope.thisVariable);
      i.replacedVariableInits.set(this.scope.thisVariable, t.withNew ? new Et(/* @__PURE__ */ Object.create(null), St) : X);
      const { brokenFlow: s, ignore: n3 } = i;
      if (i.ignore = { breaks: false, continues: false, labels: /* @__PURE__ */ new Set(), returnYield: true }, this.body.hasEffects(i))
        return true;
      i.brokenFlow = s, e2 ? i.replacedVariableInits.set(this.scope.thisVariable, e2) : i.replacedVariableInits.delete(this.scope.thisVariable), i.ignore = n3;
    }
    return false;
  }
  include(e, t) {
    var i;
    super.include(e, t), null === (i = this.id) || void 0 === i || i.include();
    const s = this.scope.argumentsVariable.included;
    for (const i2 of this.params)
      i2 instanceof ni && !s || i2.include(e, t);
  }
  initialise() {
    var e;
    super.initialise(), null === (e = this.id) || void 0 === e || e.declare("function", this);
  }
  getObjectEntity() {
    return null !== this.objectEntity ? this.objectEntity : this.objectEntity = new Et([{ key: "prototype", kind: "init", property: new Et([], St) }], St);
  }
};
var Ni = { "!=": (e, t) => e != t, "!==": (e, t) => e !== t, "%": (e, t) => e % t, "&": (e, t) => e & t, "*": (e, t) => e * t, "**": (e, t) => e ** t, "+": (e, t) => e + t, "-": (e, t) => e - t, "/": (e, t) => e / t, "<": (e, t) => e < t, "<<": (e, t) => e << t, "<=": (e, t) => e <= t, "==": (e, t) => e == t, "===": (e, t) => e === t, ">": (e, t) => e > t, ">=": (e, t) => e >= t, ">>": (e, t) => e >> t, ">>>": (e, t) => e >>> t, "^": (e, t) => e ^ t, "|": (e, t) => e | t };
function $i(e, t, i) {
  if (i.arguments.length > 0)
    if (i.arguments[i.arguments.length - 1].included)
      for (const s of i.arguments)
        s.render(e, t);
    else {
      let s = i.arguments.length - 2;
      for (; s >= 0 && !i.arguments[s].included; )
        s--;
      if (s >= 0) {
        for (let n3 = 0; n3 <= s; n3++)
          i.arguments[n3].render(e, t);
        e.remove(hi(e.original, ",", i.arguments[s].end), i.end - 1);
      } else
        e.remove(hi(e.original, "(", i.callee.end) + 1, i.end - 1);
    }
}
var Ti = class extends ut {
  deoptimizeThisOnInteractionAtPath() {
  }
  getLiteralValueAtPath(e) {
    return e.length > 0 || null === this.value && 110 !== this.context.code.charCodeAt(this.start) || "bigint" == typeof this.value || 47 === this.context.code.charCodeAt(this.start) ? W : this.value;
  }
  getReturnExpressionWhenCalledAtPath(e) {
    return 1 !== e.length ? X : Qe(this.members, e[0]);
  }
  hasEffectsOnInteractionAtPath(e, t, i) {
    switch (t.type) {
      case 0:
        return e.length > (null === this.value ? 0 : 1);
      case 1:
        return true;
      case 2:
        return 1 !== e.length || Ye(this.members, e[0], t, i);
    }
  }
  initialise() {
    this.members = function(e) {
      switch (typeof e) {
        case "boolean":
          return qe;
        case "number":
          return Ke;
        case "string":
          return Xe;
      }
      return /* @__PURE__ */ Object.create(null);
    }(this.value);
  }
  parseNode(e) {
    this.value = e.value, this.regex = e.regex, super.parseNode(e);
  }
  render(e) {
    "string" == typeof this.value && e.indentExclusionRanges.push([this.start + 1, this.end - 1]);
  }
};
function Oi(e) {
  return e.computed ? function(e2) {
    if (e2 instanceof Ti)
      return String(e2.value);
    return null;
  }(e.property) : e.property.name;
}
function Ri(e) {
  const t = e.propertyKey, i = e.object;
  if ("string" == typeof t) {
    if (i instanceof ni)
      return [{ key: i.name, pos: i.start }, { key: t, pos: e.property.start }];
    if (i instanceof Mi) {
      const s = Ri(i);
      return s && [...s, { key: t, pos: e.property.start }];
    }
  }
  return null;
}
var Mi = class extends ut {
  constructor() {
    super(...arguments), this.variable = null, this.assignmentDeoptimized = false, this.bound = false, this.expressionsToBeDeoptimized = [], this.replacement = null;
  }
  bind() {
    this.bound = true;
    const e = Ri(this), t = e && this.scope.findVariable(e[0].key);
    if (t && t.isNamespace) {
      const i = Di(t, e.slice(1), this.context);
      i ? "string" == typeof i ? this.replacement = i : (this.variable = i, this.scope.addNamespaceMemberAccess(function(e2) {
        let t2 = e2[0].key;
        for (let i2 = 1; i2 < e2.length; i2++)
          t2 += "." + e2[i2].key;
        return t2;
      }(e), i)) : super.bind();
    } else
      super.bind();
  }
  deoptimizeCache() {
    const e = this.expressionsToBeDeoptimized;
    this.expressionsToBeDeoptimized = [], this.propertyKey = M, this.object.deoptimizePath(B);
    for (const t of e)
      t.deoptimizeCache();
  }
  deoptimizePath(e) {
    if (0 === e.length && this.disallowNamespaceReassignment(), this.variable)
      this.variable.deoptimizePath(e);
    else if (!this.replacement && e.length < 7) {
      const t = this.getPropertyKey();
      this.object.deoptimizePath([t === M ? D : t, ...e]);
    }
  }
  deoptimizeThisOnInteractionAtPath(e, t, i) {
    this.variable ? this.variable.deoptimizeThisOnInteractionAtPath(e, t, i) : this.replacement || (t.length < 7 ? this.object.deoptimizeThisOnInteractionAtPath(e, [this.getPropertyKey(), ...t], i) : e.thisArg.deoptimizePath(B));
  }
  getLiteralValueAtPath(e, t, i) {
    return this.variable ? this.variable.getLiteralValueAtPath(e, t, i) : this.replacement ? W : (this.expressionsToBeDeoptimized.push(i), e.length < 7 ? this.object.getLiteralValueAtPath([this.getPropertyKey(), ...e], t, i) : W);
  }
  getReturnExpressionWhenCalledAtPath(e, t, i, s) {
    return this.variable ? this.variable.getReturnExpressionWhenCalledAtPath(e, t, i, s) : this.replacement ? X : (this.expressionsToBeDeoptimized.push(s), e.length < 7 ? this.object.getReturnExpressionWhenCalledAtPath([this.getPropertyKey(), ...e], t, i, s) : X);
  }
  hasEffects(e) {
    return this.deoptimized || this.applyDeoptimizations(), this.property.hasEffects(e) || this.object.hasEffects(e) || this.hasAccessEffect(e);
  }
  hasEffectsAsAssignmentTarget(e, t) {
    return t && !this.deoptimized && this.applyDeoptimizations(), this.assignmentDeoptimized || this.applyAssignmentDeoptimization(), this.property.hasEffects(e) || this.object.hasEffects(e) || t && this.hasAccessEffect(e) || this.hasEffectsOnInteractionAtPath(V, this.assignmentInteraction, e);
  }
  hasEffectsOnInteractionAtPath(e, t, i) {
    return this.variable ? this.variable.hasEffectsOnInteractionAtPath(e, t, i) : !!this.replacement || (!(e.length < 7) || this.object.hasEffectsOnInteractionAtPath([this.getPropertyKey(), ...e], t, i));
  }
  include(e, t) {
    this.deoptimized || this.applyDeoptimizations(), this.includeProperties(e, t);
  }
  includeAsAssignmentTarget(e, t, i) {
    this.assignmentDeoptimized || this.applyAssignmentDeoptimization(), i ? this.include(e, t) : this.includeProperties(e, t);
  }
  includeCallArguments(e, t) {
    this.variable ? this.variable.includeCallArguments(e, t) : super.includeCallArguments(e, t);
  }
  initialise() {
    this.propertyKey = Oi(this), this.accessInteraction = { thisArg: this.object, type: 0 };
  }
  render(e, t, { renderedParentType: i, isCalleeOfRenderedParent: s, renderedSurroundingElement: n3 } = ie) {
    if (this.variable || this.replacement) {
      const { snippets: { getPropertyAccess: n4 } } = t;
      let r2 = this.variable ? this.variable.getName(n4) : this.replacement;
      i && s && (r2 = "0, " + r2), e.overwrite(this.start, this.end, r2, { contentOnly: true, storeName: true });
    } else
      i && s && e.appendRight(this.start, "0, "), this.object.render(e, t, { renderedSurroundingElement: n3 }), this.property.render(e, t);
  }
  setAssignedValue(e) {
    this.assignmentInteraction = { args: [e], thisArg: this.object, type: 1 };
  }
  applyDeoptimizations() {
    this.deoptimized = true;
    const { propertyReadSideEffects: e } = this.context.options.treeshake;
    if (this.bound && e && !this.variable && !this.replacement) {
      const e2 = this.getPropertyKey();
      this.object.deoptimizeThisOnInteractionAtPath(this.accessInteraction, [e2], G), this.context.requestTreeshakingPass();
    }
  }
  applyAssignmentDeoptimization() {
    this.assignmentDeoptimized = true;
    const { propertyReadSideEffects: e } = this.context.options.treeshake;
    this.bound && e && !this.variable && !this.replacement && (this.object.deoptimizeThisOnInteractionAtPath(this.assignmentInteraction, [this.getPropertyKey()], G), this.context.requestTreeshakingPass());
  }
  disallowNamespaceReassignment() {
    if (this.object instanceof ni) {
      this.scope.findVariable(this.object.name).isNamespace && (this.variable && this.context.includeVariableInModule(this.variable), this.context.warn({ code: "ILLEGAL_NAMESPACE_REASSIGNMENT", message: `Illegal reassignment to import '${this.object.name}'` }, this.start));
    }
  }
  getPropertyKey() {
    if (null === this.propertyKey) {
      this.propertyKey = M;
      const e = this.property.getLiteralValueAtPath(V, G, this);
      return this.propertyKey = "symbol" == typeof e ? M : String(e);
    }
    return this.propertyKey;
  }
  hasAccessEffect(e) {
    const { propertyReadSideEffects: t } = this.context.options.treeshake;
    return !(this.variable || this.replacement) && t && ("always" === t || this.object.hasEffectsOnInteractionAtPath([this.getPropertyKey()], this.accessInteraction, e));
  }
  includeProperties(e, t) {
    this.included || (this.included = true, this.variable && this.context.includeVariableInModule(this.variable)), this.object.include(e, t), this.property.include(e, t);
  }
};
function Di(e, t, i) {
  if (0 === t.length)
    return e;
  if (!e.isNamespace || e instanceof te)
    return null;
  const s = t[0].key, n3 = e.context.traceExport(s);
  if (!n3) {
    const n4 = e.context.fileName;
    return i.warn({ code: "MISSING_EXPORT", exporter: he(n4), importer: he(i.fileName), message: `'${s}' is not exported by '${he(n4)}'`, missing: s, url: "https://rollupjs.org/guide/en/#error-name-is-not-exported-by-module" }, t[0].pos), "undefined";
  }
  return Di(n3, t.slice(1), i);
}
var Li = class extends ut {
  constructor() {
    super(...arguments), this.returnExpression = null, this.deoptimizableDependentExpressions = [], this.expressionsToBeDeoptimized = /* @__PURE__ */ new Set();
  }
  deoptimizeCache() {
    if (this.returnExpression !== X) {
      this.returnExpression = X;
      for (const e of this.deoptimizableDependentExpressions)
        e.deoptimizeCache();
      for (const e of this.expressionsToBeDeoptimized)
        e.deoptimizePath(B);
    }
  }
  deoptimizePath(e) {
    if (0 === e.length || this.context.deoptimizationTracker.trackEntityAtPathAndGetIfTracked(e, this))
      return;
    const t = this.getReturnExpression();
    t !== X && t.deoptimizePath(e);
  }
  deoptimizeThisOnInteractionAtPath(e, t, i) {
    const s = this.getReturnExpression(i);
    s === X ? e.thisArg.deoptimizePath(B) : i.withTrackedEntityAtPath(t, s, () => {
      this.expressionsToBeDeoptimized.add(e.thisArg), s.deoptimizeThisOnInteractionAtPath(e, t, i);
    }, void 0);
  }
  getLiteralValueAtPath(e, t, i) {
    const s = this.getReturnExpression(t);
    return s === X ? W : t.withTrackedEntityAtPath(e, s, () => (this.deoptimizableDependentExpressions.push(i), s.getLiteralValueAtPath(e, t, i)), W);
  }
  getReturnExpressionWhenCalledAtPath(e, t, i, s) {
    const n3 = this.getReturnExpression(i);
    return this.returnExpression === X ? X : i.withTrackedEntityAtPath(e, n3, () => (this.deoptimizableDependentExpressions.push(s), n3.getReturnExpressionWhenCalledAtPath(e, t, i, s)), X);
  }
  hasEffectsOnInteractionAtPath(e, t, i) {
    const { type: s } = t;
    if (2 === s) {
      if ((t.withNew ? i.instantiated : i.called).trackEntityAtPathAndGetIfTracked(e, t.args, this))
        return false;
    } else if ((1 === s ? i.assigned : i.accessed).trackEntityAtPathAndGetIfTracked(e, this))
      return false;
    return this.getReturnExpression().hasEffectsOnInteractionAtPath(e, t, i);
  }
};
var Vi = class extends zt {
  addDeclaration(e, t, i, s) {
    const n3 = this.variables.get(e.name);
    return n3 ? (this.parent.addDeclaration(e, t, Le, s), n3.addDeclaration(e, i), n3) : this.parent.addDeclaration(e, t, i, s);
  }
};
var Bi = class extends Ft {
  constructor(e, t, i) {
    super(e), this.variables.set("this", this.thisVariable = new Dt("this", null, t, i)), this.instanceScope = new Ft(this), this.instanceScope.variables.set("this", new wi(i));
  }
  findLexicalBoundary() {
    return this;
  }
};
var Fi = class extends ut {
  constructor() {
    super(...arguments), this.accessedValue = null;
  }
  deoptimizeCache() {
  }
  deoptimizePath(e) {
    this.getAccessedValue().deoptimizePath(e);
  }
  deoptimizeThisOnInteractionAtPath(e, t, i) {
    return 0 === e.type && "get" === this.kind && 0 === t.length ? this.value.deoptimizeThisOnInteractionAtPath({ args: J, thisArg: e.thisArg, type: 2, withNew: false }, V, i) : 1 === e.type && "set" === this.kind && 0 === t.length ? this.value.deoptimizeThisOnInteractionAtPath({ args: e.args, thisArg: e.thisArg, type: 2, withNew: false }, V, i) : void this.getAccessedValue().deoptimizeThisOnInteractionAtPath(e, t, i);
  }
  getLiteralValueAtPath(e, t, i) {
    return this.getAccessedValue().getLiteralValueAtPath(e, t, i);
  }
  getReturnExpressionWhenCalledAtPath(e, t, i, s) {
    return this.getAccessedValue().getReturnExpressionWhenCalledAtPath(e, t, i, s);
  }
  hasEffects(e) {
    return this.key.hasEffects(e);
  }
  hasEffectsOnInteractionAtPath(e, t, i) {
    return "get" === this.kind && 0 === t.type && 0 === e.length ? this.value.hasEffectsOnInteractionAtPath(V, { args: J, thisArg: t.thisArg, type: 2, withNew: false }, i) : "set" === this.kind && 1 === t.type ? this.value.hasEffectsOnInteractionAtPath(V, { args: t.args, thisArg: t.thisArg, type: 2, withNew: false }, i) : this.getAccessedValue().hasEffectsOnInteractionAtPath(e, t, i);
  }
  applyDeoptimizations() {
  }
  getAccessedValue() {
    return null === this.accessedValue ? "get" === this.kind ? (this.accessedValue = X, this.accessedValue = this.value.getReturnExpressionWhenCalledAtPath(V, Z, G, this)) : this.accessedValue = this.value : this.accessedValue;
  }
};
var zi = class extends Fi {
  applyDeoptimizations() {
  }
};
var ji = class extends K {
  constructor(e, t) {
    super(), this.object = e, this.key = t;
  }
  deoptimizePath(e) {
    this.object.deoptimizePath([this.key, ...e]);
  }
  deoptimizeThisOnInteractionAtPath(e, t, i) {
    this.object.deoptimizeThisOnInteractionAtPath(e, [this.key, ...t], i);
  }
  getLiteralValueAtPath(e, t, i) {
    return this.object.getLiteralValueAtPath([this.key, ...e], t, i);
  }
  getReturnExpressionWhenCalledAtPath(e, t, i, s) {
    return this.object.getReturnExpressionWhenCalledAtPath([this.key, ...e], t, i, s);
  }
  hasEffectsOnInteractionAtPath(e, t, i) {
    return this.object.hasEffectsOnInteractionAtPath([this.key, ...e], t, i);
  }
};
var Ui = class extends ut {
  constructor() {
    super(...arguments), this.objectEntity = null;
  }
  createScope(e) {
    this.scope = new Ft(e);
  }
  deoptimizeCache() {
    this.getObjectEntity().deoptimizeAllProperties();
  }
  deoptimizePath(e) {
    this.getObjectEntity().deoptimizePath(e);
  }
  deoptimizeThisOnInteractionAtPath(e, t, i) {
    this.getObjectEntity().deoptimizeThisOnInteractionAtPath(e, t, i);
  }
  getLiteralValueAtPath(e, t, i) {
    return this.getObjectEntity().getLiteralValueAtPath(e, t, i);
  }
  getReturnExpressionWhenCalledAtPath(e, t, i, s) {
    return this.getObjectEntity().getReturnExpressionWhenCalledAtPath(e, t, i, s);
  }
  hasEffects(e) {
    var t, i;
    this.deoptimized || this.applyDeoptimizations();
    const s = (null === (t = this.superClass) || void 0 === t ? void 0 : t.hasEffects(e)) || this.body.hasEffects(e);
    return null === (i = this.id) || void 0 === i || i.markDeclarationReached(), s || super.hasEffects(e);
  }
  hasEffectsOnInteractionAtPath(e, t, i) {
    var s;
    return 2 === t.type && 0 === e.length ? !t.withNew || (null !== this.classConstructor ? this.classConstructor.hasEffectsOnInteractionAtPath(e, t, i) : null === (s = this.superClass) || void 0 === s ? void 0 : s.hasEffectsOnInteractionAtPath(e, t, i)) || false : this.getObjectEntity().hasEffectsOnInteractionAtPath(e, t, i);
  }
  include(e, t) {
    var i;
    this.deoptimized || this.applyDeoptimizations(), this.included = true, null === (i = this.superClass) || void 0 === i || i.include(e, t), this.body.include(e, t), this.id && (this.id.markDeclarationReached(), this.id.include());
  }
  initialise() {
    var e;
    null === (e = this.id) || void 0 === e || e.declare("class", this);
    for (const e2 of this.body.body)
      if (e2 instanceof zi && "constructor" === e2.kind)
        return void (this.classConstructor = e2);
    this.classConstructor = null;
  }
  applyDeoptimizations() {
    this.deoptimized = true;
    for (const e of this.body.body)
      e.static || e instanceof zi && "constructor" === e.kind || e.deoptimizePath(B);
    this.context.requestTreeshakingPass();
  }
  getObjectEntity() {
    if (null !== this.objectEntity)
      return this.objectEntity;
    const e = [], t = [];
    for (const i of this.body.body) {
      const s = i.static ? e : t, n3 = i.kind;
      if (s === t && !n3)
        continue;
      const r2 = "set" === n3 || "get" === n3 ? n3 : "init";
      let a2;
      if (i.computed) {
        const e2 = i.key.getLiteralValueAtPath(V, G, this);
        if ("symbol" == typeof e2) {
          s.push({ key: M, kind: r2, property: i });
          continue;
        }
        a2 = String(e2);
      } else
        a2 = i.key instanceof ni ? i.key.name : String(i.key.value);
      s.push({ key: a2, kind: r2, property: i });
    }
    return e.unshift({ key: "prototype", kind: "init", property: new Et(t, this.superClass ? new ji(this.superClass, "prototype") : St) }), this.objectEntity = new Et(e, this.superClass || St);
  }
};
var Gi = class extends Ui {
  initialise() {
    super.initialise(), null !== this.id && (this.id.variable.isId = true);
  }
  parseNode(e) {
    null !== e.id && (this.id = new ni(e.id, this, this.scope.parent)), super.parseNode(e);
  }
  render(e, t) {
    const { exportNamesByVariable: i, format: s, snippets: { _: n3 } } = t;
    "system" === s && this.id && i.has(this.id.variable) && e.appendLeft(this.end, `${n3}${Si([this.id.variable], t)};`), super.render(e, t);
  }
};
var Hi = class extends K {
  constructor(e) {
    super(), this.expressions = e, this.included = false;
  }
  deoptimizePath(e) {
    for (const t of this.expressions)
      t.deoptimizePath(e);
  }
  getReturnExpressionWhenCalledAtPath(e, t, i, s) {
    return new Hi(this.expressions.map((n3) => n3.getReturnExpressionWhenCalledAtPath(e, t, i, s)));
  }
  hasEffectsOnInteractionAtPath(e, t, i) {
    for (const s of this.expressions)
      if (s.hasEffectsOnInteractionAtPath(e, t, i))
        return true;
    return false;
  }
};
var Wi = class extends ut {
  hasEffects() {
    return false;
  }
  initialise() {
    this.context.addExport(this);
  }
  render(e, t, i) {
    e.remove(i.start, i.end);
  }
  applyDeoptimizations() {
  }
};
Wi.prototype.needsBoundaries = true;
var qi = class extends _i {
  initialise() {
    super.initialise(), null !== this.id && (this.id.variable.isId = true);
  }
  parseNode(e) {
    null !== e.id && (this.id = new ni(e.id, this, this.scope.parent)), super.parseNode(e);
  }
};
var Ki = class extends ut {
  include(e, t) {
    super.include(e, t), t && this.context.includeVariableInModule(this.variable);
  }
  initialise() {
    const e = this.declaration;
    this.declarationName = e.id && e.id.name || this.declaration.name, this.variable = this.scope.addExportDefaultDeclaration(this.declarationName || this.context.getModuleName(), this, this.context), this.context.addExport(this);
  }
  render(e, t, i) {
    const { start: s, end: n3 } = i, r2 = function(e2, t2) {
      return ui(e2, hi(e2, "default", t2) + 7);
    }(e.original, this.start);
    if (this.declaration instanceof qi)
      this.renderNamedDeclaration(e, r2, "function", "(", null === this.declaration.id, t);
    else if (this.declaration instanceof Gi)
      this.renderNamedDeclaration(e, r2, "class", "{", null === this.declaration.id, t);
    else {
      if (this.variable.getOriginalVariable() !== this.variable)
        return void ai(this, e, s, n3);
      if (!this.variable.included)
        return e.remove(this.start, r2), this.declaration.render(e, t, { renderedSurroundingElement: "ExpressionStatement" }), void (";" !== e.original[this.end - 1] && e.appendLeft(this.end, ";"));
      this.renderVariableDeclaration(e, r2, t);
    }
    this.declaration.render(e, t);
  }
  applyDeoptimizations() {
  }
  renderNamedDeclaration(e, t, i, s, n3, r2) {
    const { exportNamesByVariable: a2, format: o2, snippets: { getPropertyAccess: l2 } } = r2, h2 = this.variable.getName(l2);
    e.remove(this.start, t), n3 && e.appendLeft(function(e2, t2, i2, s2) {
      const n4 = hi(e2, t2, s2) + t2.length;
      e2 = e2.slice(n4, hi(e2, i2, n4));
      const r3 = hi(e2, "*");
      return -1 === r3 ? n4 : n4 + r3 + 1;
    }(e.original, i, s, t), ` ${h2}`), "system" === o2 && this.declaration instanceof Gi && a2.has(this.variable) && e.appendLeft(this.end, ` ${Si([this.variable], r2)};`);
  }
  renderVariableDeclaration(e, t, { format: i, exportNamesByVariable: s, snippets: { cnst: n3, getPropertyAccess: r2 } }) {
    const a2 = 59 === e.original.charCodeAt(this.end - 1), o2 = "system" === i && s.get(this.variable);
    o2 ? (e.overwrite(this.start, t, `${n3} ${this.variable.getName(r2)} = exports('${o2[0]}', `), e.appendRight(a2 ? this.end - 1 : this.end, ")" + (a2 ? "" : ";"))) : (e.overwrite(this.start, t, `${n3} ${this.variable.getName(r2)} = `), a2 || e.appendLeft(this.end, ";"));
  }
};
Ki.prototype.needsBoundaries = true;
var Xi = class extends ut {
  bind() {
    var e;
    null === (e = this.declaration) || void 0 === e || e.bind();
  }
  hasEffects(e) {
    var t;
    return !!(null === (t = this.declaration) || void 0 === t ? void 0 : t.hasEffects(e));
  }
  initialise() {
    this.context.addExport(this);
  }
  render(e, t, i) {
    const { start: s, end: n3 } = i;
    null === this.declaration ? e.remove(s, n3) : (e.remove(this.start, this.declaration.start), this.declaration.render(e, t, { end: n3, start: s }));
  }
  applyDeoptimizations() {
  }
};
Xi.prototype.needsBoundaries = true;
var Yi = class extends gi {
  constructor() {
    super(...arguments), this.hoistedDeclarations = [];
  }
  addDeclaration(e, t, i, s) {
    return this.hoistedDeclarations.push(e), super.addDeclaration(e, t, i, s);
  }
};
var Qi = Symbol("unset");
var Ji = class extends ut {
  constructor() {
    super(...arguments), this.testValue = Qi;
  }
  deoptimizeCache() {
    this.testValue = W;
  }
  hasEffects(e) {
    var t;
    if (this.test.hasEffects(e))
      return true;
    const i = this.getTestValue();
    if ("symbol" == typeof i) {
      const { brokenFlow: t2 } = e;
      if (this.consequent.hasEffects(e))
        return true;
      const i2 = e.brokenFlow;
      return e.brokenFlow = t2, null === this.alternate ? false : !!this.alternate.hasEffects(e) || (e.brokenFlow = e.brokenFlow < i2 ? e.brokenFlow : i2, false);
    }
    return i ? this.consequent.hasEffects(e) : !!(null === (t = this.alternate) || void 0 === t ? void 0 : t.hasEffects(e));
  }
  include(e, t) {
    if (this.included = true, t)
      this.includeRecursively(t, e);
    else {
      const t2 = this.getTestValue();
      "symbol" == typeof t2 ? this.includeUnknownTest(e) : this.includeKnownTest(e, t2);
    }
  }
  parseNode(e) {
    this.consequentScope = new Yi(this.scope), this.consequent = new (this.context.getNodeConstructor(e.consequent.type))(e.consequent, this, this.consequentScope), e.alternate && (this.alternateScope = new Yi(this.scope), this.alternate = new (this.context.getNodeConstructor(e.alternate.type))(e.alternate, this, this.alternateScope)), super.parseNode(e);
  }
  render(e, t) {
    const { snippets: { getPropertyAccess: i } } = t, s = this.getTestValue(), n3 = [], r2 = this.test.included, a2 = !this.context.options.treeshake;
    r2 ? this.test.render(e, t) : e.remove(this.start, this.consequent.start), this.consequent.included && (a2 || "symbol" == typeof s || s) ? this.consequent.render(e, t) : (e.overwrite(this.consequent.start, this.consequent.end, r2 ? ";" : ""), n3.push(...this.consequentScope.hoistedDeclarations)), this.alternate && (!this.alternate.included || !a2 && "symbol" != typeof s && s ? (r2 && this.shouldKeepAlternateBranch() ? e.overwrite(this.alternate.start, this.end, ";") : e.remove(this.consequent.end, this.end), n3.push(...this.alternateScope.hoistedDeclarations)) : (r2 ? 101 === e.original.charCodeAt(this.alternate.start - 1) && e.prependLeft(this.alternate.start, " ") : e.remove(this.consequent.end, this.alternate.start), this.alternate.render(e, t))), this.renderHoistedDeclarations(n3, e, i);
  }
  applyDeoptimizations() {
  }
  getTestValue() {
    return this.testValue === Qi ? this.testValue = this.test.getLiteralValueAtPath(V, G, this) : this.testValue;
  }
  includeKnownTest(e, t) {
    var i;
    this.test.shouldBeIncluded(e) && this.test.include(e, false), t && this.consequent.shouldBeIncluded(e) && this.consequent.include(e, false, { asSingleStatement: true }), !t && (null === (i = this.alternate) || void 0 === i ? void 0 : i.shouldBeIncluded(e)) && this.alternate.include(e, false, { asSingleStatement: true });
  }
  includeRecursively(e, t) {
    var i;
    this.test.include(t, e), this.consequent.include(t, e), null === (i = this.alternate) || void 0 === i || i.include(t, e);
  }
  includeUnknownTest(e) {
    var t;
    this.test.include(e, false);
    const { brokenFlow: i } = e;
    let s = 0;
    this.consequent.shouldBeIncluded(e) && (this.consequent.include(e, false, { asSingleStatement: true }), s = e.brokenFlow, e.brokenFlow = i), (null === (t = this.alternate) || void 0 === t ? void 0 : t.shouldBeIncluded(e)) && (this.alternate.include(e, false, { asSingleStatement: true }), e.brokenFlow = e.brokenFlow < s ? e.brokenFlow : s);
  }
  renderHoistedDeclarations(e, t, i) {
    const s = [...new Set(e.map((e2) => {
      const t2 = e2.variable;
      return t2.included ? t2.getName(i) : "";
    }))].filter(Boolean).join(", ");
    if (s) {
      const e2 = this.parent.type, i2 = "Program" !== e2 && "BlockStatement" !== e2;
      t.prependRight(this.start, `${i2 ? "{ " : ""}var ${s}; `), i2 && t.appendLeft(this.end, " }");
    }
  }
  shouldKeepAlternateBranch() {
    let e = this.parent;
    do {
      if (e instanceof Ji && e.alternate)
        return true;
      if (e instanceof xi)
        return false;
      e = e.parent;
    } while (e);
    return false;
  }
};
var Zi = class extends ut {
  bind() {
  }
  hasEffects() {
    return false;
  }
  initialise() {
    this.context.addImport(this);
  }
  render(e, t, i) {
    e.remove(i.start, i.end);
  }
  applyDeoptimizations() {
  }
};
Zi.prototype.needsBoundaries = true;
var es = { auto: "_interopDefault", default: null, defaultOnly: null, esModule: null, false: null, true: "_interopDefaultLegacy" };
var ts = (e, t) => "esModule" === e || t && ("auto" === e || "true" === e);
var is = { auto: "_interopNamespace", default: "_interopNamespaceDefault", defaultOnly: "_interopNamespaceDefaultOnly", esModule: null, false: null, true: "_interopNamespace" };
var ss = (e, t) => ts(e, t) && "_interopDefault" === es[e];
var ns = (e, t, i, s, n3, r2, a2) => {
  const o2 = new Set(e);
  for (const e2 of ys)
    t.has(e2) && o2.add(e2);
  return ys.map((e2) => o2.has(e2) ? rs[e2](i, s, n3, r2, a2, o2) : "").join("");
};
var rs = { _interopDefaultLegacy(e, t, i) {
  const { _: s, getDirectReturnFunction: n3, n: r2 } = t, [a2, o2] = n3(["e"], { functionReturn: true, lineBreakIndent: null, name: "_interopDefaultLegacy" });
  return `${a2}e${s}&&${s}typeof e${s}===${s}'object'${s}&&${s}'default'${s}in e${s}?${s}${i ? as(t) : os(t)}${o2}${r2}${r2}`;
}, _interopDefault(e, t, i) {
  const { _: s, getDirectReturnFunction: n3, n: r2 } = t, [a2, o2] = n3(["e"], { functionReturn: true, lineBreakIndent: null, name: "_interopDefault" });
  return `${a2}e${s}&&${s}e.__esModule${s}?${s}${i ? as(t) : os(t)}${o2}${r2}${r2}`;
}, _interopNamespaceDefaultOnly(e, t, i, s, n3) {
  const { getDirectReturnFunction: r2, getObject: a2, n: o2 } = t, [l2, h2] = r2(["e"], { functionReturn: true, lineBreakIndent: null, name: "_interopNamespaceDefaultOnly" });
  return `${l2}${ms(s, gs(n3, a2([["__proto__", "null"], ["default", "e"]], { lineBreakIndent: null }), t))}${h2}${o2}${o2}`;
}, _interopNamespaceDefault(e, t, i, s, n3) {
  const { _: r2, n: a2 } = t;
  return `function _interopNamespaceDefault(e)${r2}{${a2}` + ls(e, e, t, i, s, n3) + `}${a2}${a2}`;
}, _interopNamespace(e, t, i, s, n3, r2) {
  const { _: a2, getDirectReturnFunction: o2, n: l2 } = t;
  if (r2.has("_interopNamespaceDefault")) {
    const [e2, t2] = o2(["e"], { functionReturn: true, lineBreakIndent: null, name: "_interopNamespace" });
    return `${e2}e${a2}&&${a2}e.__esModule${a2}?${a2}e${a2}:${a2}_interopNamespaceDefault(e)${t2}${l2}${l2}`;
  }
  return `function _interopNamespace(e)${a2}{${l2}${e}if${a2}(e${a2}&&${a2}e.__esModule)${a2}return e;${l2}` + ls(e, e, t, i, s, n3) + `}${l2}${l2}`;
}, _mergeNamespaces(e, t, i, s, n3) {
  const { _: r2, cnst: a2, n: o2 } = t, l2 = "var" === a2 && i;
  return `function _mergeNamespaces(n, m)${r2}{${o2}${e}${cs(`{${o2}${e}${e}${e}if${r2}(k${r2}!==${r2}'default'${r2}&&${r2}!(k in n))${r2}{${o2}` + (i ? l2 ? ds : ps : fs)(e, e + e + e + e, t) + `${e}${e}${e}}${o2}${e}${e}}`, l2, e, t)}${o2}${e}return ${ms(s, gs(n3, "n", t))};${o2}}${o2}${o2}`;
} };
var as = ({ _: e, getObject: t }) => `e${e}:${e}${t([["default", "e"]], { lineBreakIndent: null })}`;
var os = ({ _: e, getPropertyAccess: t }) => `e${t("default")}${e}:${e}e`;
var ls = (e, t, i, s, n3, r2) => {
  const { _: a2, cnst: o2, getObject: l2, getPropertyAccess: h2, n: c2, s: u2 } = i, d2 = `{${c2}` + (s ? us : fs)(e, t + e + e, i) + `${t}${e}}`;
  return `${t}${o2} n${a2}=${a2}Object.create(null${r2 ? `,${a2}{${a2}[Symbol.toStringTag]:${a2}${xs(l2)}${a2}}` : ""});${c2}${t}if${a2}(e)${a2}{${c2}${t}${e}${hs(d2, !s, i)}${c2}${t}}${c2}${t}n${h2("default")}${a2}=${a2}e;${c2}${t}return ${ms(n3, "n")}${u2}${c2}`;
};
var hs = (e, t, { _: i, cnst: s, getFunctionIntro: n3, s: r2 }) => "var" !== s || t ? `for${i}(${s} k in e)${i}${e}` : `Object.keys(e).forEach(${n3(["k"], { isAsync: false, name: null })}${e})${r2}`;
var cs = (e, t, i, { _: s, cnst: n3, getDirectReturnFunction: r2, getFunctionIntro: a2, n: o2 }) => {
  if (t) {
    const [t2, n4] = r2(["e"], { functionReturn: false, lineBreakIndent: { base: i, t: i }, name: null });
    return `m.forEach(${t2}e${s}&&${s}typeof e${s}!==${s}'string'${s}&&${s}!Array.isArray(e)${s}&&${s}Object.keys(e).forEach(${a2(["k"], { isAsync: false, name: null })}${e})${n4});`;
  }
  return `for${s}(var i${s}=${s}0;${s}i${s}<${s}m.length;${s}i++)${s}{${o2}${i}${i}${n3} e${s}=${s}m[i];${o2}${i}${i}if${s}(typeof e${s}!==${s}'string'${s}&&${s}!Array.isArray(e))${s}{${s}for${s}(${n3} k in e)${s}${e}${s}}${o2}${i}}`;
};
var us = (e, t, i) => {
  const { _: s, n: n3 } = i;
  return `${t}if${s}(k${s}!==${s}'default')${s}{${n3}` + ds(e, t + e, i) + `${t}}${n3}`;
};
var ds = (e, t, { _: i, cnst: s, getDirectReturnFunction: n3, n: r2 }) => {
  const [a2, o2] = n3([], { functionReturn: true, lineBreakIndent: null, name: null });
  return `${t}${s} d${i}=${i}Object.getOwnPropertyDescriptor(e,${i}k);${r2}${t}Object.defineProperty(n,${i}k,${i}d.get${i}?${i}d${i}:${i}{${r2}${t}${e}enumerable:${i}true,${r2}${t}${e}get:${i}${a2}e[k]${o2}${r2}${t}});${r2}`;
};
var ps = (e, t, { _: i, cnst: s, getDirectReturnFunction: n3, n: r2 }) => {
  const [a2, o2] = n3([], { functionReturn: true, lineBreakIndent: null, name: null });
  return `${t}${s} d${i}=${i}Object.getOwnPropertyDescriptor(e,${i}k);${r2}${t}if${i}(d)${i}{${r2}${t}${e}Object.defineProperty(n,${i}k,${i}d.get${i}?${i}d${i}:${i}{${r2}${t}${e}${e}enumerable:${i}true,${r2}${t}${e}${e}get:${i}${a2}e[k]${o2}${r2}${t}${e}});${r2}${t}}${r2}`;
};
var fs = (e, t, { _: i, n: s }) => `${t}n[k]${i}=${i}e[k];${s}`;
var ms = (e, t) => e ? `Object.freeze(${t})` : t;
var gs = (e, t, { _: i, getObject: s }) => e ? `Object.defineProperty(${t},${i}Symbol.toStringTag,${i}${xs(s)})` : t;
var ys = Object.keys(rs);
function xs(e) {
  return e([["value", "'Module'"]], { lineBreakIndent: null });
}
function Es(e, t, i) {
  return "external" === t ? is[String(i(e instanceof $e ? e.id : null))] : "default" === t ? "_interopNamespaceDefaultOnly" : null;
}
var bs = { amd: ["require"], cjs: ["require"], system: ["module"] };
var vs = "ROLLUP_ASSET_URL_";
var Ss = "ROLLUP_FILE_URL_";
var As = { amd: ["document", "module", "URL"], cjs: ["document", "require", "URL"], es: [], iife: ["document", "URL"], system: ["module"], umd: ["document", "require", "URL"] };
var Is = { amd: ["document", "require", "URL"], cjs: ["document", "require", "URL"], es: [], iife: ["document", "URL"], system: ["module", "URL"], umd: ["document", "require", "URL"] };
var Ps = (e, t = "URL") => `new ${t}(${e}).href`;
var ks = (e, t = false) => Ps(`'${e}', ${t ? "typeof document === 'undefined' ? location.href : " : ""}document.currentScript && document.currentScript.src || document.baseURI`);
var ws = (e) => (t, { chunkId: i }) => {
  const s = e(i);
  return null === t ? `({ url: ${s} })` : "url" === t ? s : "undefined";
};
var Cs = (e, t = false) => `${t ? "typeof document === 'undefined' ? location.href : " : ""}(document.currentScript && document.currentScript.src || new URL('${e}', document.baseURI).href)`;
var _s = { amd: (e) => ("." !== e[0] && (e = "./" + e), Ps(`require.toUrl('${e}'), document.baseURI`)), cjs: (e) => `(typeof document === 'undefined' ? ${Ps(`'file:' + __dirname + '/${e}'`, "(require('u' + 'rl').URL)")} : ${ks(e)})`, es: (e) => Ps(`'${e}', import.meta.url`), iife: (e) => ks(e), system: (e) => Ps(`'${e}', module.meta.url`), umd: (e) => `(typeof document === 'undefined' && typeof location === 'undefined' ? ${Ps(`'file:' + __dirname + '/${e}'`, "(require('u' + 'rl').URL)")} : ${ks(e, true)})` };
var Ns = { amd: ws(() => Ps("module.uri, document.baseURI")), cjs: ws((e) => `(typeof document === 'undefined' ? ${Ps("'file:' + __filename", "(require('u' + 'rl').URL)")} : ${Cs(e)})`), iife: ws((e) => Cs(e)), system: (e, { snippets: { getPropertyAccess: t } }) => null === e ? "module.meta" : `module.meta${t(e)}`, umd: ws((e) => `(typeof document === 'undefined' && typeof location === 'undefined' ? ${Ps("'file:' + __filename", "(require('u' + 'rl').URL)")} : ${Cs(e, true)})`) };
var $s = class extends ut {
  constructor() {
    super(...arguments), this.hasCachedEffect = false;
  }
  hasEffects(e) {
    if (this.hasCachedEffect)
      return true;
    for (const t of this.body)
      if (t.hasEffects(e))
        return this.hasCachedEffect = true;
    return false;
  }
  include(e, t) {
    this.included = true;
    for (const i of this.body)
      (t || i.shouldBeIncluded(e)) && i.include(e, t);
  }
  render(e, t) {
    this.body.length ? pi(this.body, e, this.start, this.end, t) : super.render(e, t);
  }
  applyDeoptimizations() {
  }
};
var Ts = class extends ut {
  hasEffects(e) {
    var t;
    if (null === (t = this.test) || void 0 === t ? void 0 : t.hasEffects(e))
      return true;
    for (const t2 of this.consequent) {
      if (e.brokenFlow)
        break;
      if (t2.hasEffects(e))
        return true;
    }
    return false;
  }
  include(e, t) {
    var i;
    this.included = true, null === (i = this.test) || void 0 === i || i.include(e, t);
    for (const i2 of this.consequent)
      (t || i2.shouldBeIncluded(e)) && i2.include(e, t);
  }
  render(e, t, i) {
    if (this.consequent.length) {
      this.test && this.test.render(e, t);
      const s = this.test ? this.test.end : hi(e.original, "default", this.start) + 7, n3 = hi(e.original, ":", s) + 1;
      pi(this.consequent, e, n3, i.end, t);
    } else
      super.render(e, t);
  }
};
Ts.prototype.needsBoundaries = true;
var Os = class extends ut {
  deoptimizeThisOnInteractionAtPath() {
  }
  getLiteralValueAtPath(e) {
    return e.length > 0 || 1 !== this.quasis.length ? W : this.quasis[0].value.cooked;
  }
  getReturnExpressionWhenCalledAtPath(e) {
    return 1 !== e.length ? X : Qe(Xe, e[0]);
  }
  hasEffectsOnInteractionAtPath(e, t, i) {
    return 0 === t.type ? e.length > 1 : 2 !== t.type || 1 !== e.length || Ye(Xe, e[0], t, i);
  }
  render(e, t) {
    e.indentExclusionRanges.push([this.start, this.end]), super.render(e, t);
  }
};
var Rs = class extends ee {
  constructor() {
    super("undefined");
  }
  getLiteralValueAtPath() {
  }
};
var Ms = class extends Dt {
  constructor(e, t, i) {
    super(e, t, t.declaration, i), this.hasId = false, this.originalId = null, this.originalVariable = null;
    const s = t.declaration;
    (s instanceof qi || s instanceof Gi) && s.id ? (this.hasId = true, this.originalId = s.id) : s instanceof ni && (this.originalId = s);
  }
  addReference(e) {
    this.hasId || (this.name = e.name);
  }
  getAssignedVariableName() {
    return this.originalId && this.originalId.name || null;
  }
  getBaseVariableName() {
    const e = this.getOriginalVariable();
    return e === this ? super.getBaseVariableName() : e.getBaseVariableName();
  }
  getDirectOriginalVariable() {
    return !this.originalId || !this.hasId && (this.originalId.isPossibleTDZ() || this.originalId.variable.isReassigned || this.originalId.variable instanceof Rs || "syntheticNamespace" in this.originalId.variable) ? null : this.originalId.variable;
  }
  getName(e) {
    const t = this.getOriginalVariable();
    return t === this ? super.getName(e) : t.getName(e);
  }
  getOriginalVariable() {
    if (this.originalVariable)
      return this.originalVariable;
    let e, t = this;
    const i = /* @__PURE__ */ new Set();
    do {
      i.add(t), e = t, t = e.getDirectOriginalVariable();
    } while (t instanceof Ms && !i.has(t));
    return this.originalVariable = t || e;
  }
};
var Ds = class extends Ft {
  constructor(e, t) {
    super(e), this.context = t, this.variables.set("this", new Dt("this", null, Le, t));
  }
  addExportDefaultDeclaration(e, t, i) {
    const s = new Ms(e, t, i);
    return this.variables.set("default", s), s;
  }
  addNamespaceMemberAccess() {
  }
  deconflict(e, t, i) {
    for (const s of this.children)
      s.deconflict(e, t, i);
  }
  findLexicalBoundary() {
    return this;
  }
  findVariable(e) {
    const t = this.variables.get(e) || this.accessedOutsideVariables.get(e);
    if (t)
      return t;
    const i = this.context.traceVariable(e) || this.parent.findVariable(e);
    return i instanceof ii && this.accessedOutsideVariables.set(e, i), i;
  }
};
var Ls = { "!": (e) => !e, "+": (e) => +e, "-": (e) => -e, delete: () => W, typeof: (e) => typeof e, void: () => {
}, "~": (e) => ~e };
function Vs(e, t) {
  return null !== e.renderBaseName && t.has(e) && e.isReassigned;
}
var Bs = class extends ut {
  deoptimizePath() {
    for (const e of this.declarations)
      e.deoptimizePath(V);
  }
  hasEffectsOnInteractionAtPath() {
    return false;
  }
  include(e, t, { asSingleStatement: i } = ie) {
    this.included = true;
    for (const s of this.declarations)
      (t || s.shouldBeIncluded(e)) && s.include(e, t), i && s.id.include(e, t);
  }
  initialise() {
    for (const e of this.declarations)
      e.declareDeclarator(this.kind);
  }
  render(e, t, i = ie) {
    if (function(e2, t2) {
      for (const i2 of e2) {
        if (!i2.id.included)
          return false;
        if ("Identifier" === i2.id.type) {
          if (t2.has(i2.id.variable))
            return false;
        } else {
          const e3 = [];
          if (i2.id.addExportedVariables(e3, t2), e3.length > 0)
            return false;
        }
      }
      return true;
    }(this.declarations, t.exportNamesByVariable)) {
      for (const i2 of this.declarations)
        i2.render(e, t);
      i.isNoStatement || 59 === e.original.charCodeAt(this.end - 1) || e.appendLeft(this.end, ";");
    } else
      this.renderReplacedDeclarations(e, t);
  }
  applyDeoptimizations() {
  }
  renderDeclarationEnd(e, t, i, s, n3, r2, a2) {
    59 === e.original.charCodeAt(this.end - 1) && e.remove(this.end - 1, this.end), t += ";", null !== i ? (10 !== e.original.charCodeAt(s - 1) || 10 !== e.original.charCodeAt(this.end) && 13 !== e.original.charCodeAt(this.end) || (s--, 13 === e.original.charCodeAt(s) && s--), s === i + 1 ? e.overwrite(i, n3, t) : (e.overwrite(i, i + 1, t), e.remove(s, n3))) : e.appendLeft(n3, t), r2.length > 0 && e.appendLeft(n3, ` ${Si(r2, a2)};`);
  }
  renderReplacedDeclarations(e, t) {
    const i = fi(this.declarations, e, this.start + this.kind.length, this.end - (59 === e.original.charCodeAt(this.end - 1) ? 1 : 0));
    let s, n3;
    n3 = ui(e.original, this.start + this.kind.length);
    let r2 = n3 - 1;
    e.remove(this.start, r2);
    let a2, o2, l2 = false, h2 = false, c2 = "";
    const u2 = [], d2 = function(e2, t2, i2) {
      var s2;
      let n4 = null;
      if ("system" === t2.format) {
        for (const { node: r3 } of e2)
          r3.id instanceof ni && r3.init && 0 === i2.length && 1 === (null === (s2 = t2.exportNamesByVariable.get(r3.id.variable)) || void 0 === s2 ? void 0 : s2.length) ? (n4 = r3.id.variable, i2.push(n4)) : r3.id.addExportedVariables(i2, t2.exportNamesByVariable);
        i2.length > 1 ? n4 = null : n4 && (i2.length = 0);
      }
      return n4;
    }(i, t, u2);
    for (const { node: u3, start: p2, separator: f2, contentEnd: m2, end: g2 } of i)
      if (u3.included) {
        if (u3.render(e, t), a2 = "", o2 = "", !u3.id.included || u3.id instanceof ni && Vs(u3.id.variable, t.exportNamesByVariable))
          h2 && (c2 += ";"), l2 = false;
        else {
          if (d2 && d2 === u3.id.variable) {
            const i2 = hi(e.original, "=", u3.id.end);
            Ai(d2, ui(e.original, i2 + 1), null === f2 ? m2 : f2, e, t);
          }
          l2 ? c2 += "," : (h2 && (c2 += ";"), a2 += `${this.kind} `, l2 = true);
        }
        n3 === r2 + 1 ? e.overwrite(r2, n3, c2 + a2) : (e.overwrite(r2, r2 + 1, c2), e.appendLeft(n3, a2)), s = m2, n3 = g2, h2 = true, r2 = f2, c2 = "";
      } else
        e.remove(p2, g2);
    this.renderDeclarationEnd(e, c2, r2, s, n3, u2, t);
  }
};
var Fs = { ArrayExpression: class extends ut {
  constructor() {
    super(...arguments), this.objectEntity = null;
  }
  deoptimizePath(e) {
    this.getObjectEntity().deoptimizePath(e);
  }
  deoptimizeThisOnInteractionAtPath(e, t, i) {
    this.getObjectEntity().deoptimizeThisOnInteractionAtPath(e, t, i);
  }
  getLiteralValueAtPath(e, t, i) {
    return this.getObjectEntity().getLiteralValueAtPath(e, t, i);
  }
  getReturnExpressionWhenCalledAtPath(e, t, i, s) {
    return this.getObjectEntity().getReturnExpressionWhenCalledAtPath(e, t, i, s);
  }
  hasEffectsOnInteractionAtPath(e, t, i) {
    return this.getObjectEntity().hasEffectsOnInteractionAtPath(e, t, i);
  }
  applyDeoptimizations() {
    this.deoptimized = true;
    let e = false;
    for (let t = 0; t < this.elements.length; t++) {
      const i = this.elements[t];
      i && (e || i instanceof dt) && (e = true, i.deoptimizePath(B));
    }
    this.context.requestTreeshakingPass();
  }
  getObjectEntity() {
    if (null !== this.objectEntity)
      return this.objectEntity;
    const e = [{ key: "length", kind: "init", property: ze }];
    let t = false;
    for (let i = 0; i < this.elements.length; i++) {
      const s = this.elements[i];
      t || s instanceof dt ? s && (t = true, e.unshift({ key: L, kind: "init", property: s })) : s ? e.push({ key: String(i), kind: "init", property: s }) : e.push({ key: String(i), kind: "init", property: Le });
    }
    return this.objectEntity = new Et(e, Mt);
  }
}, ArrayPattern: class extends ut {
  addExportedVariables(e, t) {
    for (const i of this.elements)
      null == i || i.addExportedVariables(e, t);
  }
  declare(e) {
    const t = [];
    for (const i of this.elements)
      null !== i && t.push(...i.declare(e, X));
    return t;
  }
  deoptimizePath() {
    for (const e of this.elements)
      null == e || e.deoptimizePath(V);
  }
  hasEffectsOnInteractionAtPath(e, t, i) {
    for (const e2 of this.elements)
      if (null == e2 ? void 0 : e2.hasEffectsOnInteractionAtPath(V, t, i))
        return true;
    return false;
  }
  markDeclarationReached() {
    for (const e of this.elements)
      null == e || e.markDeclarationReached();
  }
}, ArrowFunctionExpression: vi, AssignmentExpression: class extends ut {
  hasEffects(e) {
    const { deoptimized: t, left: i, right: s } = this;
    return t || this.applyDeoptimizations(), s.hasEffects(e) || i.hasEffectsAsAssignmentTarget(e, "=" !== this.operator);
  }
  hasEffectsOnInteractionAtPath(e, t, i) {
    return this.right.hasEffectsOnInteractionAtPath(e, t, i);
  }
  include(e, t) {
    const { deoptimized: i, left: s, right: n3, operator: r2 } = this;
    i || this.applyDeoptimizations(), this.included = true, (t || "=" !== r2 || s.included || s.hasEffectsAsAssignmentTarget(Me(), false)) && s.includeAsAssignmentTarget(e, t, "=" !== r2), n3.include(e, t);
  }
  initialise() {
    this.left.setAssignedValue(this.right);
  }
  render(e, t, { preventASI: i, renderedParentType: s, renderedSurroundingElement: n3 } = ie) {
    const { left: r2, right: a2, start: o2, end: l2, parent: h2 } = this;
    if (r2.included)
      r2.render(e, t), a2.render(e, t);
    else {
      const l3 = ui(e.original, hi(e.original, "=", r2.end) + 1);
      e.remove(o2, l3), i && mi(e, l3, a2.start), a2.render(e, t, { renderedParentType: s || h2.type, renderedSurroundingElement: n3 || h2.type });
    }
    if ("system" === t.format)
      if (r2 instanceof ni) {
        const i2 = r2.variable, s2 = t.exportNamesByVariable.get(i2);
        if (s2)
          return void (1 === s2.length ? Ai(i2, o2, l2, e, t) : Ii(i2, o2, l2, "ExpressionStatement" !== h2.type, e, t));
      } else {
        const i2 = [];
        if (r2.addExportedVariables(i2, t.exportNamesByVariable), i2.length > 0)
          return void function(e2, t2, i3, s2, n4, r3) {
            const { _: a3, getDirectReturnIifeLeft: o3 } = r3.snippets;
            n4.prependRight(t2, o3(["v"], `${Si(e2, r3)},${a3}v`, { needsArrowReturnParens: true, needsWrappedFunction: s2 })), n4.appendLeft(i3, ")");
          }(i2, o2, l2, "ExpressionStatement" === n3, e, t);
      }
    r2.included && r2 instanceof Pi && ("ExpressionStatement" === n3 || "ArrowFunctionExpression" === n3) && (e.appendRight(o2, "("), e.prependLeft(l2, ")"));
  }
  applyDeoptimizations() {
    this.deoptimized = true, this.left.deoptimizePath(V), this.right.deoptimizePath(B), this.context.requestTreeshakingPass();
  }
}, AssignmentPattern: class extends ut {
  addExportedVariables(e, t) {
    this.left.addExportedVariables(e, t);
  }
  declare(e, t) {
    return this.left.declare(e, t);
  }
  deoptimizePath(e) {
    0 === e.length && this.left.deoptimizePath(e);
  }
  hasEffectsOnInteractionAtPath(e, t, i) {
    return e.length > 0 || this.left.hasEffectsOnInteractionAtPath(V, t, i);
  }
  markDeclarationReached() {
    this.left.markDeclarationReached();
  }
  render(e, t, { isShorthandProperty: i } = ie) {
    this.left.render(e, t, { isShorthandProperty: i }), this.right.render(e, t);
  }
  applyDeoptimizations() {
    this.deoptimized = true, this.left.deoptimizePath(V), this.right.deoptimizePath(B), this.context.requestTreeshakingPass();
  }
}, AwaitExpression: class extends ut {
  hasEffects() {
    return this.deoptimized || this.applyDeoptimizations(), true;
  }
  include(e, t) {
    if (this.deoptimized || this.applyDeoptimizations(), !this.included) {
      this.included = true;
      e:
        if (!this.context.usesTopLevelAwait) {
          let e2 = this.parent;
          do {
            if (e2 instanceof _i || e2 instanceof vi)
              break e;
          } while (e2 = e2.parent);
          this.context.usesTopLevelAwait = true;
        }
    }
    this.argument.include(e, t);
  }
}, BinaryExpression: class extends ut {
  deoptimizeCache() {
  }
  getLiteralValueAtPath(e, t, i) {
    if (e.length > 0)
      return W;
    const s = this.left.getLiteralValueAtPath(V, t, i);
    if ("symbol" == typeof s)
      return W;
    const n3 = this.right.getLiteralValueAtPath(V, t, i);
    if ("symbol" == typeof n3)
      return W;
    const r2 = Ni[this.operator];
    return r2 ? r2(s, n3) : W;
  }
  hasEffects(e) {
    return "+" === this.operator && this.parent instanceof yi && "" === this.left.getLiteralValueAtPath(V, G, this) || super.hasEffects(e);
  }
  hasEffectsOnInteractionAtPath(e, { type: t }) {
    return 0 !== t || e.length > 1;
  }
  render(e, t, { renderedSurroundingElement: i } = ie) {
    this.left.render(e, t, { renderedSurroundingElement: i }), this.right.render(e, t);
  }
}, BlockStatement: xi, BreakStatement: class extends ut {
  hasEffects(e) {
    if (this.label) {
      if (!e.ignore.labels.has(this.label.name))
        return true;
      e.includedLabels.add(this.label.name), e.brokenFlow = 2;
    } else {
      if (!e.ignore.breaks)
        return true;
      e.brokenFlow = 1;
    }
    return false;
  }
  include(e) {
    this.included = true, this.label && (this.label.include(), e.includedLabels.add(this.label.name)), e.brokenFlow = this.label ? 2 : 1;
  }
}, CallExpression: class extends Li {
  bind() {
    if (super.bind(), this.callee instanceof ni) {
      this.scope.findVariable(this.callee.name).isNamespace && this.context.warn({ code: "CANNOT_CALL_NAMESPACE", message: `Cannot call a namespace ('${this.callee.name}')` }, this.start), "eval" === this.callee.name && this.context.warn({ code: "EVAL", message: "Use of eval is strongly discouraged, as it poses security risks and may cause issues with minification", url: "https://rollupjs.org/guide/en/#avoiding-eval" }, this.start);
    }
    this.interaction = { args: this.arguments, thisArg: this.callee instanceof Mi && !this.callee.variable ? this.callee.object : null, type: 2, withNew: false };
  }
  hasEffects(e) {
    try {
      for (const t of this.arguments)
        if (t.hasEffects(e))
          return true;
      return (!this.context.options.treeshake.annotations || !this.annotations) && (this.callee.hasEffects(e) || this.callee.hasEffectsOnInteractionAtPath(V, this.interaction, e));
    } finally {
      this.deoptimized || this.applyDeoptimizations();
    }
  }
  include(e, t) {
    this.deoptimized || this.applyDeoptimizations(), t ? (super.include(e, t), "variables" === t && this.callee instanceof ni && this.callee.variable && this.callee.variable.markCalledFromTryStatement()) : (this.included = true, this.callee.include(e, false)), this.callee.includeCallArguments(e, this.arguments);
  }
  render(e, t, { renderedSurroundingElement: i } = ie) {
    this.callee.render(e, t, { isCalleeOfRenderedParent: true, renderedSurroundingElement: i }), $i(e, t, this);
  }
  applyDeoptimizations() {
    this.deoptimized = true, this.interaction.thisArg && this.callee.deoptimizeThisOnInteractionAtPath(this.interaction, V, G);
    for (const e of this.arguments)
      e.deoptimizePath(B);
    this.context.requestTreeshakingPass();
  }
  getReturnExpression(e = G) {
    return null === this.returnExpression ? (this.returnExpression = X, this.returnExpression = this.callee.getReturnExpressionWhenCalledAtPath(V, this.interaction, e, this)) : this.returnExpression;
  }
}, CatchClause: class extends ut {
  createScope(e) {
    this.scope = new Vi(e, this.context);
  }
  parseNode(e) {
    const { param: t } = e;
    t && (this.param = new (this.context.getNodeConstructor(t.type))(t, this, this.scope), this.param.declare("parameter", X)), super.parseNode(e);
  }
}, ChainExpression: class extends ut {
}, ClassBody: class extends ut {
  createScope(e) {
    this.scope = new Bi(e, this.parent, this.context);
  }
  include(e, t) {
    this.included = true, this.context.includeVariableInModule(this.scope.thisVariable);
    for (const i of this.body)
      i.include(e, t);
  }
  parseNode(e) {
    const t = this.body = [];
    for (const i of e.body)
      t.push(new (this.context.getNodeConstructor(i.type))(i, this, i.static ? this.scope : this.scope.instanceScope));
    super.parseNode(e);
  }
  applyDeoptimizations() {
  }
}, ClassDeclaration: Gi, ClassExpression: class extends Ui {
  render(e, t, { renderedSurroundingElement: i } = ie) {
    super.render(e, t), "ExpressionStatement" === i && (e.appendRight(this.start, "("), e.prependLeft(this.end, ")"));
  }
}, ConditionalExpression: class extends ut {
  constructor() {
    super(...arguments), this.expressionsToBeDeoptimized = [], this.isBranchResolutionAnalysed = false, this.usedBranch = null;
  }
  deoptimizeCache() {
    if (null !== this.usedBranch) {
      const e = this.usedBranch === this.consequent ? this.alternate : this.consequent;
      this.usedBranch = null, e.deoptimizePath(B);
      for (const e2 of this.expressionsToBeDeoptimized)
        e2.deoptimizeCache();
    }
  }
  deoptimizePath(e) {
    const t = this.getUsedBranch();
    t ? t.deoptimizePath(e) : (this.consequent.deoptimizePath(e), this.alternate.deoptimizePath(e));
  }
  deoptimizeThisOnInteractionAtPath(e, t, i) {
    this.consequent.deoptimizeThisOnInteractionAtPath(e, t, i), this.alternate.deoptimizeThisOnInteractionAtPath(e, t, i);
  }
  getLiteralValueAtPath(e, t, i) {
    const s = this.getUsedBranch();
    return s ? (this.expressionsToBeDeoptimized.push(i), s.getLiteralValueAtPath(e, t, i)) : W;
  }
  getReturnExpressionWhenCalledAtPath(e, t, i, s) {
    const n3 = this.getUsedBranch();
    return n3 ? (this.expressionsToBeDeoptimized.push(s), n3.getReturnExpressionWhenCalledAtPath(e, t, i, s)) : new Hi([this.consequent.getReturnExpressionWhenCalledAtPath(e, t, i, s), this.alternate.getReturnExpressionWhenCalledAtPath(e, t, i, s)]);
  }
  hasEffects(e) {
    if (this.test.hasEffects(e))
      return true;
    const t = this.getUsedBranch();
    return t ? t.hasEffects(e) : this.consequent.hasEffects(e) || this.alternate.hasEffects(e);
  }
  hasEffectsOnInteractionAtPath(e, t, i) {
    const s = this.getUsedBranch();
    return s ? s.hasEffectsOnInteractionAtPath(e, t, i) : this.consequent.hasEffectsOnInteractionAtPath(e, t, i) || this.alternate.hasEffectsOnInteractionAtPath(e, t, i);
  }
  include(e, t) {
    this.included = true;
    const i = this.getUsedBranch();
    t || this.test.shouldBeIncluded(e) || null === i ? (this.test.include(e, t), this.consequent.include(e, t), this.alternate.include(e, t)) : i.include(e, t);
  }
  includeCallArguments(e, t) {
    const i = this.getUsedBranch();
    i ? i.includeCallArguments(e, t) : (this.consequent.includeCallArguments(e, t), this.alternate.includeCallArguments(e, t));
  }
  render(e, t, { isCalleeOfRenderedParent: i, preventASI: s, renderedParentType: n3, renderedSurroundingElement: r2 } = ie) {
    const a2 = this.getUsedBranch();
    if (this.test.included)
      this.test.render(e, t, { renderedSurroundingElement: r2 }), this.consequent.render(e, t), this.alternate.render(e, t);
    else {
      const o2 = hi(e.original, ":", this.consequent.end), l2 = ui(e.original, (this.consequent.included ? hi(e.original, "?", this.test.end) : o2) + 1);
      s && mi(e, l2, a2.start), e.remove(this.start, l2), this.consequent.included && e.remove(o2, this.end), oi(this, e), a2.render(e, t, { isCalleeOfRenderedParent: i, preventASI: true, renderedParentType: n3 || this.parent.type, renderedSurroundingElement: r2 || this.parent.type });
    }
  }
  getUsedBranch() {
    if (this.isBranchResolutionAnalysed)
      return this.usedBranch;
    this.isBranchResolutionAnalysed = true;
    const e = this.test.getLiteralValueAtPath(V, G, this);
    return "symbol" == typeof e ? null : this.usedBranch = e ? this.consequent : this.alternate;
  }
}, ContinueStatement: class extends ut {
  hasEffects(e) {
    if (this.label) {
      if (!e.ignore.labels.has(this.label.name))
        return true;
      e.includedLabels.add(this.label.name), e.brokenFlow = 2;
    } else {
      if (!e.ignore.continues)
        return true;
      e.brokenFlow = 1;
    }
    return false;
  }
  include(e) {
    this.included = true, this.label && (this.label.include(), e.includedLabels.add(this.label.name)), e.brokenFlow = this.label ? 2 : 1;
  }
}, DoWhileStatement: class extends ut {
  hasEffects(e) {
    if (this.test.hasEffects(e))
      return true;
    const { brokenFlow: t, ignore: { breaks: i, continues: s } } = e;
    return e.ignore.breaks = true, e.ignore.continues = true, !!this.body.hasEffects(e) || (e.ignore.breaks = i, e.ignore.continues = s, e.brokenFlow = t, false);
  }
  include(e, t) {
    this.included = true, this.test.include(e, t);
    const { brokenFlow: i } = e;
    this.body.include(e, t, { asSingleStatement: true }), e.brokenFlow = i;
  }
}, EmptyStatement: class extends ut {
  hasEffects() {
    return false;
  }
}, ExportAllDeclaration: Wi, ExportDefaultDeclaration: Ki, ExportNamedDeclaration: Xi, ExportSpecifier: class extends ut {
  applyDeoptimizations() {
  }
}, ExpressionStatement: yi, ForInStatement: class extends ut {
  createScope(e) {
    this.scope = new gi(e);
  }
  hasEffects(e) {
    const { deoptimized: t, left: i, right: s } = this;
    if (t || this.applyDeoptimizations(), i.hasEffectsAsAssignmentTarget(e, false) || s.hasEffects(e))
      return true;
    const { brokenFlow: n3, ignore: { breaks: r2, continues: a2 } } = e;
    return e.ignore.breaks = true, e.ignore.continues = true, !!this.body.hasEffects(e) || (e.ignore.breaks = r2, e.ignore.continues = a2, e.brokenFlow = n3, false);
  }
  include(e, t) {
    const { body: i, deoptimized: s, left: n3, right: r2 } = this;
    s || this.applyDeoptimizations(), this.included = true, n3.includeAsAssignmentTarget(e, t || true, false), r2.include(e, t);
    const { brokenFlow: a2 } = e;
    i.include(e, t, { asSingleStatement: true }), e.brokenFlow = a2;
  }
  initialise() {
    this.left.setAssignedValue(X);
  }
  render(e, t) {
    this.left.render(e, t, li), this.right.render(e, t, li), 110 === e.original.charCodeAt(this.right.start - 1) && e.prependLeft(this.right.start, " "), this.body.render(e, t);
  }
  applyDeoptimizations() {
    this.deoptimized = true, this.left.deoptimizePath(V), this.context.requestTreeshakingPass();
  }
}, ForOfStatement: class extends ut {
  createScope(e) {
    this.scope = new gi(e);
  }
  hasEffects() {
    return this.deoptimized || this.applyDeoptimizations(), true;
  }
  include(e, t) {
    const { body: i, deoptimized: s, left: n3, right: r2 } = this;
    s || this.applyDeoptimizations(), this.included = true, n3.includeAsAssignmentTarget(e, t || true, false), r2.include(e, t);
    const { brokenFlow: a2 } = e;
    i.include(e, t, { asSingleStatement: true }), e.brokenFlow = a2;
  }
  initialise() {
    this.left.setAssignedValue(X);
  }
  render(e, t) {
    this.left.render(e, t, li), this.right.render(e, t, li), 102 === e.original.charCodeAt(this.right.start - 1) && e.prependLeft(this.right.start, " "), this.body.render(e, t);
  }
  applyDeoptimizations() {
    this.deoptimized = true, this.left.deoptimizePath(V), this.context.requestTreeshakingPass();
  }
}, ForStatement: class extends ut {
  createScope(e) {
    this.scope = new gi(e);
  }
  hasEffects(e) {
    var t, i, s;
    if ((null === (t = this.init) || void 0 === t ? void 0 : t.hasEffects(e)) || (null === (i = this.test) || void 0 === i ? void 0 : i.hasEffects(e)) || (null === (s = this.update) || void 0 === s ? void 0 : s.hasEffects(e)))
      return true;
    const { brokenFlow: n3, ignore: { breaks: r2, continues: a2 } } = e;
    return e.ignore.breaks = true, e.ignore.continues = true, !!this.body.hasEffects(e) || (e.ignore.breaks = r2, e.ignore.continues = a2, e.brokenFlow = n3, false);
  }
  include(e, t) {
    var i, s, n3;
    this.included = true, null === (i = this.init) || void 0 === i || i.include(e, t, { asSingleStatement: true }), null === (s = this.test) || void 0 === s || s.include(e, t);
    const { brokenFlow: r2 } = e;
    null === (n3 = this.update) || void 0 === n3 || n3.include(e, t), this.body.include(e, t, { asSingleStatement: true }), e.brokenFlow = r2;
  }
  render(e, t) {
    var i, s, n3;
    null === (i = this.init) || void 0 === i || i.render(e, t, li), null === (s = this.test) || void 0 === s || s.render(e, t, li), null === (n3 = this.update) || void 0 === n3 || n3.render(e, t, li), this.body.render(e, t);
  }
}, FunctionDeclaration: qi, FunctionExpression: class extends _i {
  render(e, t, { renderedSurroundingElement: i } = ie) {
    super.render(e, t), "ExpressionStatement" === i && (e.appendRight(this.start, "("), e.prependLeft(this.end, ")"));
  }
}, Identifier: ni, IfStatement: Ji, ImportDeclaration: Zi, ImportDefaultSpecifier: class extends ut {
  applyDeoptimizations() {
  }
}, ImportExpression: class extends ut {
  constructor() {
    super(...arguments), this.inlineNamespace = null, this.mechanism = null, this.resolution = null;
  }
  hasEffects() {
    return true;
  }
  include(e, t) {
    this.included || (this.included = true, this.context.includeDynamicImport(this), this.scope.addAccessedDynamicImport(this)), this.source.include(e, t);
  }
  initialise() {
    this.context.addDynamicImport(this);
  }
  render(e, t) {
    if (this.inlineNamespace) {
      const { snippets: { getDirectReturnFunction: i, getPropertyAccess: s } } = t, [n3, r2] = i([], { functionReturn: true, lineBreakIndent: null, name: null });
      e.overwrite(this.start, this.end, `Promise.resolve().then(${n3}${this.inlineNamespace.getName(s)}${r2})`, { contentOnly: true });
    } else
      this.mechanism && (e.overwrite(this.start, hi(e.original, "(", this.start + 6) + 1, this.mechanism.left, { contentOnly: true }), e.overwrite(this.end - 1, this.end, this.mechanism.right, { contentOnly: true })), this.source.render(e, t);
  }
  renderFinalResolution(e, t, i, { getDirectReturnFunction: s }) {
    if (e.overwrite(this.source.start, this.source.end, t), i) {
      const [t2, n3] = s(["n"], { functionReturn: true, lineBreakIndent: null, name: null });
      e.prependLeft(this.end, `.then(${t2}n.${i}${n3})`);
    }
  }
  setExternalResolution(e, t, i, s, n3, r2) {
    const { format: a2 } = i;
    this.inlineNamespace = null, this.resolution = t;
    const o2 = [...bs[a2] || []];
    let l2;
    ({ helper: l2, mechanism: this.mechanism } = this.getDynamicImportMechanismAndHelper(t, e, i, s, n3)), l2 && o2.push(l2), o2.length > 0 && this.scope.addAccessedGlobals(o2, r2);
  }
  setInternalResolution(e) {
    this.inlineNamespace = e;
  }
  applyDeoptimizations() {
  }
  getDynamicImportMechanismAndHelper(e, t, { compact: i, dynamicImportFunction: s, format: n3, generatedCode: { arrowFunctions: r2 }, interop: a2 }, { _: o2, getDirectReturnFunction: l2, getDirectReturnIifeLeft: h2 }, c2) {
    const u2 = c2.hookFirstSync("renderDynamicImport", [{ customResolution: "string" == typeof this.resolution ? this.resolution : null, format: n3, moduleId: this.context.module.id, targetModuleId: this.resolution && "string" != typeof this.resolution ? this.resolution.id : null }]);
    if (u2)
      return { helper: null, mechanism: u2 };
    const d2 = !this.resolution || "string" == typeof this.resolution;
    switch (n3) {
      case "cjs": {
        const i2 = Es(e, t, a2);
        let s2 = "require(", n4 = ")";
        i2 && (s2 = `/*#__PURE__*/${i2}(${s2}`, n4 += ")");
        const [o3, c3] = l2([], { functionReturn: true, lineBreakIndent: null, name: null });
        return s2 = `Promise.resolve().then(${o3}${s2}`, n4 += `${c3})`, !r2 && d2 && (s2 = h2(["t"], `${s2}t${n4}`, { needsArrowReturnParens: false, needsWrappedFunction: true }), n4 = ")"), { helper: i2, mechanism: { left: s2, right: n4 } };
      }
      case "amd": {
        const s2 = i ? "c" : "resolve", n4 = i ? "e" : "reject", c3 = Es(e, t, a2), [u3, p2] = l2(["m"], { functionReturn: false, lineBreakIndent: null, name: null }), f2 = c3 ? `${u3}${s2}(/*#__PURE__*/${c3}(m))${p2}` : s2, [m2, g2] = l2([s2, n4], { functionReturn: false, lineBreakIndent: null, name: null });
        let y2 = `new Promise(${m2}require([`, x2 = `],${o2}${f2},${o2}${n4})${g2})`;
        return !r2 && d2 && (y2 = h2(["t"], `${y2}t${x2}`, { needsArrowReturnParens: false, needsWrappedFunction: true }), x2 = ")"), { helper: c3, mechanism: { left: y2, right: x2 } };
      }
      case "system":
        return { helper: null, mechanism: { left: "module.import(", right: ")" } };
      case "es":
        if (s)
          return { helper: null, mechanism: { left: `${s}(`, right: ")" } };
    }
    return { helper: null, mechanism: null };
  }
}, ImportNamespaceSpecifier: class extends ut {
  applyDeoptimizations() {
  }
}, ImportSpecifier: class extends ut {
  applyDeoptimizations() {
  }
}, LabeledStatement: class extends ut {
  hasEffects(e) {
    const t = e.brokenFlow;
    return e.ignore.labels.add(this.label.name), !!this.body.hasEffects(e) || (e.ignore.labels.delete(this.label.name), e.includedLabels.has(this.label.name) && (e.includedLabels.delete(this.label.name), e.brokenFlow = t), false);
  }
  include(e, t) {
    this.included = true;
    const i = e.brokenFlow;
    this.body.include(e, t), (t || e.includedLabels.has(this.label.name)) && (this.label.include(), e.includedLabels.delete(this.label.name), e.brokenFlow = i);
  }
  render(e, t) {
    this.label.included ? this.label.render(e, t) : e.remove(this.start, ui(e.original, hi(e.original, ":", this.label.end) + 1)), this.body.render(e, t);
  }
}, Literal: Ti, LogicalExpression: class extends ut {
  constructor() {
    super(...arguments), this.expressionsToBeDeoptimized = [], this.isBranchResolutionAnalysed = false, this.usedBranch = null;
  }
  deoptimizeCache() {
    if (this.usedBranch) {
      const e = this.usedBranch === this.left ? this.right : this.left;
      this.usedBranch = null, e.deoptimizePath(B);
      for (const e2 of this.expressionsToBeDeoptimized)
        e2.deoptimizeCache();
      this.context.requestTreeshakingPass();
    }
  }
  deoptimizePath(e) {
    const t = this.getUsedBranch();
    t ? t.deoptimizePath(e) : (this.left.deoptimizePath(e), this.right.deoptimizePath(e));
  }
  deoptimizeThisOnInteractionAtPath(e, t, i) {
    this.left.deoptimizeThisOnInteractionAtPath(e, t, i), this.right.deoptimizeThisOnInteractionAtPath(e, t, i);
  }
  getLiteralValueAtPath(e, t, i) {
    const s = this.getUsedBranch();
    return s ? (this.expressionsToBeDeoptimized.push(i), s.getLiteralValueAtPath(e, t, i)) : W;
  }
  getReturnExpressionWhenCalledAtPath(e, t, i, s) {
    const n3 = this.getUsedBranch();
    return n3 ? (this.expressionsToBeDeoptimized.push(s), n3.getReturnExpressionWhenCalledAtPath(e, t, i, s)) : new Hi([this.left.getReturnExpressionWhenCalledAtPath(e, t, i, s), this.right.getReturnExpressionWhenCalledAtPath(e, t, i, s)]);
  }
  hasEffects(e) {
    return !!this.left.hasEffects(e) || this.getUsedBranch() !== this.left && this.right.hasEffects(e);
  }
  hasEffectsOnInteractionAtPath(e, t, i) {
    const s = this.getUsedBranch();
    return s ? s.hasEffectsOnInteractionAtPath(e, t, i) : this.left.hasEffectsOnInteractionAtPath(e, t, i) || this.right.hasEffectsOnInteractionAtPath(e, t, i);
  }
  include(e, t) {
    this.included = true;
    const i = this.getUsedBranch();
    t || i === this.right && this.left.shouldBeIncluded(e) || !i ? (this.left.include(e, t), this.right.include(e, t)) : i.include(e, t);
  }
  render(e, t, { isCalleeOfRenderedParent: i, preventASI: s, renderedParentType: n3, renderedSurroundingElement: r2 } = ie) {
    if (this.left.included && this.right.included)
      this.left.render(e, t, { preventASI: s, renderedSurroundingElement: r2 }), this.right.render(e, t);
    else {
      const a2 = hi(e.original, this.operator, this.left.end);
      if (this.right.included) {
        const t2 = ui(e.original, a2 + 2);
        e.remove(this.start, t2), s && mi(e, t2, this.right.start);
      } else
        e.remove(a2, this.end);
      oi(this, e), this.getUsedBranch().render(e, t, { isCalleeOfRenderedParent: i, preventASI: s, renderedParentType: n3 || this.parent.type, renderedSurroundingElement: r2 || this.parent.type });
    }
  }
  getUsedBranch() {
    if (!this.isBranchResolutionAnalysed) {
      this.isBranchResolutionAnalysed = true;
      const e = this.left.getLiteralValueAtPath(V, G, this);
      if ("symbol" == typeof e)
        return null;
      this.usedBranch = "||" === this.operator && e || "&&" === this.operator && !e || "??" === this.operator && null != e ? this.left : this.right;
    }
    return this.usedBranch;
  }
}, MemberExpression: Mi, MetaProperty: class extends ut {
  addAccessedGlobals(e, t) {
    const i = this.metaProperty, s = (i && (i.startsWith(Ss) || i.startsWith(vs) || i.startsWith("ROLLUP_CHUNK_URL_")) ? Is : As)[e];
    s.length > 0 && this.scope.addAccessedGlobals(s, t);
  }
  getReferencedFileName(e) {
    const t = this.metaProperty;
    return t && t.startsWith(Ss) ? e.getFileName(t.substring(Ss.length)) : null;
  }
  hasEffects() {
    return false;
  }
  hasEffectsOnInteractionAtPath(e, { type: t }) {
    return e.length > 1 || 0 !== t;
  }
  include() {
    if (!this.included && (this.included = true, "import" === this.meta.name)) {
      this.context.addImportMeta(this);
      const e = this.parent;
      this.metaProperty = e instanceof Mi && "string" == typeof e.propertyKey ? e.propertyKey : null;
    }
  }
  renderFinalMechanism(e, t, i, s, n3) {
    var r2;
    const a2 = this.parent, o2 = this.metaProperty;
    if (o2 && (o2.startsWith(Ss) || o2.startsWith(vs) || o2.startsWith("ROLLUP_CHUNK_URL_"))) {
      let s2, r3 = null, l3 = null, h2 = null;
      o2.startsWith(Ss) ? (r3 = o2.substring(Ss.length), s2 = n3.getFileName(r3)) : o2.startsWith(vs) ? (Pe(`Using the "${vs}" prefix to reference files is deprecated. Use the "${Ss}" prefix instead.`, true, this.context.options), l3 = o2.substring(vs.length), s2 = n3.getFileName(l3)) : (Pe(`Using the "ROLLUP_CHUNK_URL_" prefix to reference files is deprecated. Use the "${Ss}" prefix instead.`, true, this.context.options), h2 = o2.substring("ROLLUP_CHUNK_URL_".length), s2 = n3.getFileName(h2));
      const c2 = C(T(N(t), s2));
      let u2;
      return null !== l3 && (u2 = n3.hookFirstSync("resolveAssetUrl", [{ assetFileName: s2, chunkId: t, format: i, moduleId: this.context.module.id, relativeAssetPath: c2 }])), u2 || (u2 = n3.hookFirstSync("resolveFileUrl", [{ assetReferenceId: l3, chunkId: t, chunkReferenceId: h2, fileName: s2, format: i, moduleId: this.context.module.id, referenceId: r3 || l3 || h2, relativePath: c2 }]) || _s[i](c2)), void e.overwrite(a2.start, a2.end, u2, { contentOnly: true });
    }
    const l2 = n3.hookFirstSync("resolveImportMeta", [o2, { chunkId: t, format: i, moduleId: this.context.module.id }]) || (null === (r2 = Ns[i]) || void 0 === r2 ? void 0 : r2.call(Ns, o2, { chunkId: t, snippets: s }));
    "string" == typeof l2 && (a2 instanceof Mi ? e.overwrite(a2.start, a2.end, l2, { contentOnly: true }) : e.overwrite(this.start, this.end, l2, { contentOnly: true }));
  }
}, MethodDefinition: zi, NewExpression: class extends ut {
  hasEffects(e) {
    try {
      for (const t of this.arguments)
        if (t.hasEffects(e))
          return true;
      return (!this.context.options.treeshake.annotations || !this.annotations) && (this.callee.hasEffects(e) || this.callee.hasEffectsOnInteractionAtPath(V, this.interaction, e));
    } finally {
      this.deoptimized || this.applyDeoptimizations();
    }
  }
  hasEffectsOnInteractionAtPath(e, { type: t }) {
    return e.length > 0 || 0 !== t;
  }
  include(e, t) {
    this.deoptimized || this.applyDeoptimizations(), t ? super.include(e, t) : (this.included = true, this.callee.include(e, false)), this.callee.includeCallArguments(e, this.arguments);
  }
  initialise() {
    this.interaction = { args: this.arguments, thisArg: null, type: 2, withNew: true };
  }
  render(e, t) {
    this.callee.render(e, t), $i(e, t, this);
  }
  applyDeoptimizations() {
    this.deoptimized = true;
    for (const e of this.arguments)
      e.deoptimizePath(B);
    this.context.requestTreeshakingPass();
  }
}, ObjectExpression: class extends ut {
  constructor() {
    super(...arguments), this.objectEntity = null;
  }
  deoptimizeCache() {
    this.getObjectEntity().deoptimizeAllProperties();
  }
  deoptimizePath(e) {
    this.getObjectEntity().deoptimizePath(e);
  }
  deoptimizeThisOnInteractionAtPath(e, t, i) {
    this.getObjectEntity().deoptimizeThisOnInteractionAtPath(e, t, i);
  }
  getLiteralValueAtPath(e, t, i) {
    return this.getObjectEntity().getLiteralValueAtPath(e, t, i);
  }
  getReturnExpressionWhenCalledAtPath(e, t, i, s) {
    return this.getObjectEntity().getReturnExpressionWhenCalledAtPath(e, t, i, s);
  }
  hasEffectsOnInteractionAtPath(e, t, i) {
    return this.getObjectEntity().hasEffectsOnInteractionAtPath(e, t, i);
  }
  render(e, t, { renderedSurroundingElement: i } = ie) {
    super.render(e, t), "ExpressionStatement" !== i && "ArrowFunctionExpression" !== i || (e.appendRight(this.start, "("), e.prependLeft(this.end, ")"));
  }
  applyDeoptimizations() {
  }
  getObjectEntity() {
    if (null !== this.objectEntity)
      return this.objectEntity;
    let e = St;
    const t = [];
    for (const i of this.properties) {
      if (i instanceof dt) {
        t.push({ key: M, kind: "init", property: i });
        continue;
      }
      let s;
      if (i.computed) {
        const e2 = i.key.getLiteralValueAtPath(V, G, this);
        if ("symbol" == typeof e2) {
          t.push({ key: M, kind: i.kind, property: i });
          continue;
        }
        s = String(e2);
      } else if (s = i.key instanceof ni ? i.key.name : String(i.key.value), "__proto__" === s && "init" === i.kind) {
        e = i.value instanceof Ti && null === i.value.value ? null : i.value;
        continue;
      }
      t.push({ key: s, kind: i.kind, property: i });
    }
    return this.objectEntity = new Et(t, e);
  }
}, ObjectPattern: Pi, PrivateIdentifier: class extends ut {
}, Program: $s, Property: class extends Fi {
  constructor() {
    super(...arguments), this.declarationInit = null;
  }
  declare(e, t) {
    return this.declarationInit = t, this.value.declare(e, X);
  }
  hasEffects(e) {
    this.deoptimized || this.applyDeoptimizations();
    const t = this.context.options.treeshake.propertyReadSideEffects;
    return "ObjectPattern" === this.parent.type && "always" === t || this.key.hasEffects(e) || this.value.hasEffects(e);
  }
  markDeclarationReached() {
    this.value.markDeclarationReached();
  }
  render(e, t) {
    this.shorthand || this.key.render(e, t), this.value.render(e, t, { isShorthandProperty: this.shorthand });
  }
  applyDeoptimizations() {
    this.deoptimized = true, null !== this.declarationInit && (this.declarationInit.deoptimizePath([M, M]), this.context.requestTreeshakingPass());
  }
}, PropertyDefinition: class extends ut {
  deoptimizePath(e) {
    var t;
    null === (t = this.value) || void 0 === t || t.deoptimizePath(e);
  }
  deoptimizeThisOnInteractionAtPath(e, t, i) {
    var s;
    null === (s = this.value) || void 0 === s || s.deoptimizeThisOnInteractionAtPath(e, t, i);
  }
  getLiteralValueAtPath(e, t, i) {
    return this.value ? this.value.getLiteralValueAtPath(e, t, i) : W;
  }
  getReturnExpressionWhenCalledAtPath(e, t, i, s) {
    return this.value ? this.value.getReturnExpressionWhenCalledAtPath(e, t, i, s) : X;
  }
  hasEffects(e) {
    var t;
    return this.key.hasEffects(e) || this.static && !!(null === (t = this.value) || void 0 === t ? void 0 : t.hasEffects(e));
  }
  hasEffectsOnInteractionAtPath(e, t, i) {
    return !this.value || this.value.hasEffectsOnInteractionAtPath(e, t, i);
  }
  applyDeoptimizations() {
  }
}, RestElement: Ei, ReturnStatement: class extends ut {
  hasEffects(e) {
    var t;
    return !(e.ignore.returnYield && !(null === (t = this.argument) || void 0 === t ? void 0 : t.hasEffects(e))) || (e.brokenFlow = 2, false);
  }
  include(e, t) {
    var i;
    this.included = true, null === (i = this.argument) || void 0 === i || i.include(e, t), e.brokenFlow = 2;
  }
  initialise() {
    this.scope.addReturnExpression(this.argument || X);
  }
  render(e, t) {
    this.argument && (this.argument.render(e, t, { preventASI: true }), this.argument.start === this.start + 6 && e.prependLeft(this.start + 6, " "));
  }
}, SequenceExpression: class extends ut {
  deoptimizePath(e) {
    this.expressions[this.expressions.length - 1].deoptimizePath(e);
  }
  deoptimizeThisOnInteractionAtPath(e, t, i) {
    this.expressions[this.expressions.length - 1].deoptimizeThisOnInteractionAtPath(e, t, i);
  }
  getLiteralValueAtPath(e, t, i) {
    return this.expressions[this.expressions.length - 1].getLiteralValueAtPath(e, t, i);
  }
  hasEffects(e) {
    for (const t of this.expressions)
      if (t.hasEffects(e))
        return true;
    return false;
  }
  hasEffectsOnInteractionAtPath(e, t, i) {
    return this.expressions[this.expressions.length - 1].hasEffectsOnInteractionAtPath(e, t, i);
  }
  include(e, t) {
    this.included = true;
    const i = this.expressions[this.expressions.length - 1];
    for (const s of this.expressions)
      (t || s === i && !(this.parent instanceof yi) || s.shouldBeIncluded(e)) && s.include(e, t);
  }
  render(e, t, { renderedParentType: i, isCalleeOfRenderedParent: s, preventASI: n3 } = ie) {
    let r2 = 0, a2 = null;
    const o2 = this.expressions[this.expressions.length - 1];
    for (const { node: l2, separator: h2, start: c2, end: u2 } of fi(this.expressions, e, this.start, this.end))
      if (l2.included)
        if (r2++, a2 = h2, 1 === r2 && n3 && mi(e, c2, l2.start), 1 === r2) {
          const n4 = i || this.parent.type;
          l2.render(e, t, { isCalleeOfRenderedParent: s && l2 === o2, renderedParentType: n4, renderedSurroundingElement: n4 });
        } else
          l2.render(e, t);
      else
        ai(l2, e, c2, u2);
    a2 && e.remove(a2, this.end);
  }
}, SpreadElement: dt, StaticBlock: class extends ut {
  createScope(e) {
    this.scope = new gi(e);
  }
  hasEffects(e) {
    for (const t of this.body)
      if (t.hasEffects(e))
        return true;
    return false;
  }
  include(e, t) {
    this.included = true;
    for (const i of this.body)
      (t || i.shouldBeIncluded(e)) && i.include(e, t);
  }
  render(e, t) {
    this.body.length ? pi(this.body, e, this.start + 1, this.end - 1, t) : super.render(e, t);
  }
}, Super: class extends ut {
  bind() {
    this.variable = this.scope.findVariable("this");
  }
  deoptimizePath(e) {
    this.variable.deoptimizePath(e);
  }
  deoptimizeThisOnInteractionAtPath(e, t, i) {
    this.variable.deoptimizeThisOnInteractionAtPath(e, t, i);
  }
  include() {
    this.included || (this.included = true, this.context.includeVariableInModule(this.variable));
  }
}, SwitchCase: Ts, SwitchStatement: class extends ut {
  createScope(e) {
    this.scope = new gi(e);
  }
  hasEffects(e) {
    if (this.discriminant.hasEffects(e))
      return true;
    const { brokenFlow: t, ignore: { breaks: i } } = e;
    let s = 1 / 0;
    e.ignore.breaks = true;
    for (const i2 of this.cases) {
      if (i2.hasEffects(e))
        return true;
      s = e.brokenFlow < s ? e.brokenFlow : s, e.brokenFlow = t;
    }
    return null !== this.defaultCase && 1 !== s && (e.brokenFlow = s), e.ignore.breaks = i, false;
  }
  include(e, t) {
    this.included = true, this.discriminant.include(e, t);
    const { brokenFlow: i } = e;
    let s = 1 / 0, n3 = t || null !== this.defaultCase && this.defaultCase < this.cases.length - 1;
    for (let r2 = this.cases.length - 1; r2 >= 0; r2--) {
      const a2 = this.cases[r2];
      if (a2.included && (n3 = true), !n3) {
        const e2 = Me();
        e2.ignore.breaks = true, n3 = a2.hasEffects(e2);
      }
      n3 ? (a2.include(e, t), s = s < e.brokenFlow ? s : e.brokenFlow, e.brokenFlow = i) : s = i;
    }
    n3 && null !== this.defaultCase && 1 !== s && (e.brokenFlow = s);
  }
  initialise() {
    for (let e = 0; e < this.cases.length; e++)
      if (null === this.cases[e].test)
        return void (this.defaultCase = e);
    this.defaultCase = null;
  }
  render(e, t) {
    this.discriminant.render(e, t), this.cases.length > 0 && pi(this.cases, e, this.cases[0].start, this.end - 1, t);
  }
}, TaggedTemplateExpression: class extends Li {
  bind() {
    if (super.bind(), "Identifier" === this.tag.type) {
      const e = this.tag.name;
      this.scope.findVariable(e).isNamespace && this.context.warn({ code: "CANNOT_CALL_NAMESPACE", message: `Cannot call a namespace ('${e}')` }, this.start);
    }
  }
  hasEffects(e) {
    try {
      for (const t of this.quasi.expressions)
        if (t.hasEffects(e))
          return true;
      return this.tag.hasEffects(e) || this.tag.hasEffectsOnInteractionAtPath(V, this.interaction, e);
    } finally {
      this.deoptimized || this.applyDeoptimizations();
    }
  }
  include(e, t) {
    this.deoptimized || this.applyDeoptimizations(), t ? super.include(e, t) : (this.included = true, this.tag.include(e, t), this.quasi.include(e, t)), this.tag.includeCallArguments(e, this.interaction.args);
    const i = this.getReturnExpression();
    i.included || i.include(e, false);
  }
  initialise() {
    this.interaction = { args: [X, ...this.quasi.expressions], thisArg: this.tag instanceof Mi && !this.tag.variable ? this.tag.object : null, type: 2, withNew: false };
  }
  render(e, t) {
    this.tag.render(e, t, { isCalleeOfRenderedParent: true }), this.quasi.render(e, t);
  }
  applyDeoptimizations() {
    this.deoptimized = true, this.interaction.thisArg && this.tag.deoptimizeThisOnInteractionAtPath(this.interaction, V, G);
    for (const e of this.quasi.expressions)
      e.deoptimizePath(B);
    this.context.requestTreeshakingPass();
  }
  getReturnExpression(e = G) {
    return null === this.returnExpression ? (this.returnExpression = X, this.returnExpression = this.tag.getReturnExpressionWhenCalledAtPath(V, this.interaction, e, this)) : this.returnExpression;
  }
}, TemplateElement: class extends ut {
  bind() {
  }
  hasEffects() {
    return false;
  }
  include() {
    this.included = true;
  }
  parseNode(e) {
    this.value = e.value, super.parseNode(e);
  }
  render() {
  }
}, TemplateLiteral: Os, ThisExpression: class extends ut {
  bind() {
    this.variable = this.scope.findVariable("this");
  }
  deoptimizePath(e) {
    this.variable.deoptimizePath(e);
  }
  deoptimizeThisOnInteractionAtPath(e, t, i) {
    this.variable.deoptimizeThisOnInteractionAtPath(e.thisArg === this ? { ...e, thisArg: this.variable } : e, t, i);
  }
  hasEffectsOnInteractionAtPath(e, t, i) {
    return 0 === e.length ? 0 !== t.type : this.variable.hasEffectsOnInteractionAtPath(e, t, i);
  }
  include() {
    this.included || (this.included = true, this.context.includeVariableInModule(this.variable));
  }
  initialise() {
    this.alias = this.scope.findLexicalBoundary() instanceof Ds ? this.context.moduleContext : null, "undefined" === this.alias && this.context.warn({ code: "THIS_IS_UNDEFINED", message: "The 'this' keyword is equivalent to 'undefined' at the top level of an ES module, and has been rewritten", url: "https://rollupjs.org/guide/en/#error-this-is-undefined" }, this.start);
  }
  render(e) {
    null !== this.alias && e.overwrite(this.start, this.end, this.alias, { contentOnly: false, storeName: true });
  }
}, ThrowStatement: class extends ut {
  hasEffects() {
    return true;
  }
  include(e, t) {
    this.included = true, this.argument.include(e, t), e.brokenFlow = 2;
  }
  render(e, t) {
    this.argument.render(e, t, { preventASI: true }), this.argument.start === this.start + 5 && e.prependLeft(this.start + 5, " ");
  }
}, TryStatement: class extends ut {
  constructor() {
    super(...arguments), this.directlyIncluded = false, this.includedLabelsAfterBlock = null;
  }
  hasEffects(e) {
    var t;
    return (this.context.options.treeshake.tryCatchDeoptimization ? this.block.body.length > 0 : this.block.hasEffects(e)) || !!(null === (t = this.finalizer) || void 0 === t ? void 0 : t.hasEffects(e));
  }
  include(e, t) {
    var i, s;
    const n3 = null === (i = this.context.options.treeshake) || void 0 === i ? void 0 : i.tryCatchDeoptimization, { brokenFlow: r2 } = e;
    if (this.directlyIncluded && n3) {
      if (this.includedLabelsAfterBlock)
        for (const t2 of this.includedLabelsAfterBlock)
          e.includedLabels.add(t2);
    } else
      this.included = true, this.directlyIncluded = true, this.block.include(e, n3 ? "variables" : t), e.includedLabels.size > 0 && (this.includedLabelsAfterBlock = [...e.includedLabels]), e.brokenFlow = r2;
    null !== this.handler && (this.handler.include(e, t), e.brokenFlow = r2), null === (s = this.finalizer) || void 0 === s || s.include(e, t);
  }
}, UnaryExpression: class extends ut {
  getLiteralValueAtPath(e, t, i) {
    if (e.length > 0)
      return W;
    const s = this.argument.getLiteralValueAtPath(V, t, i);
    return "symbol" == typeof s ? W : Ls[this.operator](s);
  }
  hasEffects(e) {
    return this.deoptimized || this.applyDeoptimizations(), !("typeof" === this.operator && this.argument instanceof ni) && (this.argument.hasEffects(e) || "delete" === this.operator && this.argument.hasEffectsOnInteractionAtPath(V, Q, e));
  }
  hasEffectsOnInteractionAtPath(e, { type: t }) {
    return 0 !== t || e.length > ("void" === this.operator ? 0 : 1);
  }
  applyDeoptimizations() {
    this.deoptimized = true, "delete" === this.operator && (this.argument.deoptimizePath(V), this.context.requestTreeshakingPass());
  }
}, UnknownNode: class extends ut {
  hasEffects() {
    return true;
  }
  include(e) {
    super.include(e, true);
  }
}, UpdateExpression: class extends ut {
  hasEffects(e) {
    return this.deoptimized || this.applyDeoptimizations(), this.argument.hasEffectsAsAssignmentTarget(e, true);
  }
  hasEffectsOnInteractionAtPath(e, { type: t }) {
    return e.length > 1 || 0 !== t;
  }
  include(e, t) {
    this.deoptimized || this.applyDeoptimizations(), this.included = true, this.argument.includeAsAssignmentTarget(e, t, true);
  }
  initialise() {
    this.argument.setAssignedValue(X);
  }
  render(e, t) {
    const { exportNamesByVariable: i, format: s, snippets: { _: n3 } } = t;
    if (this.argument.render(e, t), "system" === s) {
      const s2 = this.argument.variable, r2 = i.get(s2);
      if (r2)
        if (this.prefix)
          1 === r2.length ? Ai(s2, this.start, this.end, e, t) : Ii(s2, this.start, this.end, "ExpressionStatement" !== this.parent.type, e, t);
        else {
          const i2 = this.operator[0];
          !function(e2, t2, i3, s3, n4, r3, a2) {
            const { _: o2 } = r3.snippets;
            n4.prependRight(t2, `${Si([e2], r3, a2)},${o2}`), s3 && (n4.prependRight(t2, "("), n4.appendLeft(i3, ")"));
          }(s2, this.start, this.end, "ExpressionStatement" !== this.parent.type, e, t, `${n3}${i2}${n3}1`);
        }
    }
  }
  applyDeoptimizations() {
    if (this.deoptimized = true, this.argument.deoptimizePath(V), this.argument instanceof ni) {
      this.scope.findVariable(this.argument.name).isReassigned = true;
    }
    this.context.requestTreeshakingPass();
  }
}, VariableDeclaration: Bs, VariableDeclarator: class extends ut {
  declareDeclarator(e) {
    this.id.declare(e, this.init || Le);
  }
  deoptimizePath(e) {
    this.id.deoptimizePath(e);
  }
  hasEffects(e) {
    var t;
    const i = null === (t = this.init) || void 0 === t ? void 0 : t.hasEffects(e);
    return this.id.markDeclarationReached(), i || this.id.hasEffects(e);
  }
  include(e, t) {
    var i;
    this.included = true, null === (i = this.init) || void 0 === i || i.include(e, t), this.id.markDeclarationReached(), (t || this.id.shouldBeIncluded(e)) && this.id.include(e, t);
  }
  render(e, t) {
    const { exportNamesByVariable: i, snippets: { _: s } } = t, n3 = this.id.included;
    if (n3)
      this.id.render(e, t);
    else {
      const t2 = hi(e.original, "=", this.id.end);
      e.remove(this.start, ui(e.original, t2 + 1));
    }
    this.init ? this.init.render(e, t, n3 ? ie : { renderedSurroundingElement: "ExpressionStatement" }) : this.id instanceof ni && Vs(this.id.variable, i) && e.appendLeft(this.end, `${s}=${s}void 0`);
  }
  applyDeoptimizations() {
  }
}, WhileStatement: class extends ut {
  hasEffects(e) {
    if (this.test.hasEffects(e))
      return true;
    const { brokenFlow: t, ignore: { breaks: i, continues: s } } = e;
    return e.ignore.breaks = true, e.ignore.continues = true, !!this.body.hasEffects(e) || (e.ignore.breaks = i, e.ignore.continues = s, e.brokenFlow = t, false);
  }
  include(e, t) {
    this.included = true, this.test.include(e, t);
    const { brokenFlow: i } = e;
    this.body.include(e, t, { asSingleStatement: true }), e.brokenFlow = i;
  }
}, YieldExpression: class extends ut {
  hasEffects(e) {
    var t;
    return this.deoptimized || this.applyDeoptimizations(), !(e.ignore.returnYield && !(null === (t = this.argument) || void 0 === t ? void 0 : t.hasEffects(e)));
  }
  render(e, t) {
    this.argument && (this.argument.render(e, t, { preventASI: true }), this.argument.start === this.start + 5 && e.prependLeft(this.start + 5, " "));
  }
} };
var zs = class extends ee {
  constructor(e) {
    super("_missingExportShim"), this.module = e;
  }
  include() {
    super.include(), this.module.needsExportShim = true;
  }
};
var js = class extends ee {
  constructor(e) {
    super(e.getModuleName()), this.memberVariables = null, this.mergedNamespaces = [], this.referencedEarly = false, this.references = [], this.context = e, this.module = e.module;
  }
  addReference(e) {
    this.references.push(e), this.name = e.name;
  }
  getMemberVariables() {
    if (this.memberVariables)
      return this.memberVariables;
    const e = /* @__PURE__ */ Object.create(null);
    for (const t of this.context.getExports().concat(this.context.getReexports()))
      if ("*" !== t[0] && t !== this.module.info.syntheticNamedExports) {
        const i = this.context.traceExport(t);
        i && (e[t] = i);
      }
    return this.memberVariables = e;
  }
  include() {
    this.included = true, this.context.includeAllExports();
  }
  prepare(e) {
    this.mergedNamespaces.length > 0 && this.module.scope.addAccessedGlobals(["_mergeNamespaces"], e);
  }
  renderBlock(e) {
    const { exportNamesByVariable: t, format: i, freeze: s, indent: n3, namespaceToStringTag: r2, snippets: { _: a2, cnst: o2, getObject: l2, getPropertyAccess: h2, n: c2, s: u2 } } = e, d2 = this.getMemberVariables(), p2 = Object.entries(d2).map(([e2, t2]) => this.referencedEarly || t2.isReassigned ? [null, `get ${e2}${a2}()${a2}{${a2}return ${t2.getName(h2)}${u2}${a2}}`] : [e2, t2.getName(h2)]);
    p2.unshift([null, `__proto__:${a2}null`]);
    let f2 = l2(p2, { lineBreakIndent: { base: "", t: n3 } });
    if (this.mergedNamespaces.length > 0) {
      const e2 = this.mergedNamespaces.map((e3) => e3.getName(h2));
      f2 = `/*#__PURE__*/_mergeNamespaces(${f2},${a2}[${e2.join(`,${a2}`)}])`;
    } else
      r2 && (f2 = `/*#__PURE__*/Object.defineProperty(${f2},${a2}Symbol.toStringTag,${a2}${xs(l2)})`), s && (f2 = `/*#__PURE__*/Object.freeze(${f2})`);
    return f2 = `${o2} ${this.getName(h2)}${a2}=${a2}${f2};`, "system" === i && t.has(this) && (f2 += `${c2}${Si([this], e)};`), f2;
  }
  renderFirst() {
    return this.referencedEarly;
  }
  setMergedNamespaces(e) {
    this.mergedNamespaces = e;
    const t = this.context.getModuleExecIndex();
    for (const e2 of this.references)
      if (e2.context.getModuleExecIndex() <= t) {
        this.referencedEarly = true;
        break;
      }
  }
};
js.prototype.isNamespace = true;
var Us = class extends ee {
  constructor(e, t, i) {
    super(t), this.baseVariable = null, this.context = e, this.module = e.module, this.syntheticNamespace = i;
  }
  getBaseVariable() {
    if (this.baseVariable)
      return this.baseVariable;
    let e = this.syntheticNamespace;
    for (; e instanceof Ms || e instanceof Us; ) {
      if (e instanceof Ms) {
        const t = e.getOriginalVariable();
        if (t === e)
          break;
        e = t;
      }
      e instanceof Us && (e = e.syntheticNamespace);
    }
    return this.baseVariable = e;
  }
  getBaseVariableName() {
    return this.syntheticNamespace.getBaseVariableName();
  }
  getName(e) {
    return `${this.syntheticNamespace.getName(e)}${e(this.name)}`;
  }
  include() {
    this.included = true, this.context.includeVariableInModule(this.syntheticNamespace);
  }
  setRenderNames(e, t) {
    super.setRenderNames(e, t);
  }
};
var Gs;
function Hs(e) {
  return e.id;
}
!function(e) {
  e[e.LOAD_AND_PARSE = 0] = "LOAD_AND_PARSE", e[e.ANALYSE = 1] = "ANALYSE", e[e.GENERATE = 2] = "GENERATE";
}(Gs || (Gs = {}));
var Ws = "performance" in ("undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : {}) ? performance : { now: () => 0 };
var qs = { memoryUsage: () => ({ heapUsed: 0 }) };
var Ks = () => {
};
var Xs = /* @__PURE__ */ new Map();
function Ys(e, t) {
  switch (t) {
    case 1:
      return `# ${e}`;
    case 2:
      return `## ${e}`;
    case 3:
      return e;
    default:
      return `${"  ".repeat(t - 4)}- ${e}`;
  }
}
function Qs(e, t = 3) {
  e = Ys(e, t);
  const i = qs.memoryUsage().heapUsed, s = Ws.now(), n3 = Xs.get(e);
  void 0 === n3 ? Xs.set(e, { memory: 0, startMemory: i, startTime: s, time: 0, totalMemory: 0 }) : (n3.startMemory = i, n3.startTime = s);
}
function Js(e, t = 3) {
  e = Ys(e, t);
  const i = Xs.get(e);
  if (void 0 !== i) {
    const e2 = qs.memoryUsage().heapUsed;
    i.memory += e2 - i.startMemory, i.time += Ws.now() - i.startTime, i.totalMemory = Math.max(i.totalMemory, e2);
  }
}
function Zs() {
  const e = {};
  for (const [t, { memory: i, time: s, totalMemory: n3 }] of Xs)
    e[t] = [s, i, n3];
  return e;
}
var en = Ks;
var tn = Ks;
var sn = ["load", "resolveDynamicImport", "resolveId", "transform"];
function nn(e, t) {
  for (const i of sn)
    if (i in e) {
      let s = `plugin ${t}`;
      e.name && (s += ` (${e.name})`), s += ` - ${i}`;
      const n3 = e[i];
      e[i] = function(...e2) {
        en(s, 4);
        const t2 = n3.apply(this, e2);
        return tn(s, 4), t2 && "function" == typeof t2.then ? (en(`${s} (async)`, 4), t2.then((e3) => (tn(`${s} (async)`, 4), e3))) : t2;
      };
    }
  return e;
}
function rn(e) {
  e.isExecuted = true;
  const t = [e], i = /* @__PURE__ */ new Set();
  for (const e2 of t)
    for (const s of [...e2.dependencies, ...e2.implicitlyLoadedBefore])
      s instanceof $e || s.isExecuted || !s.info.moduleSideEffects && !e2.implicitlyLoadedBefore.has(s) || i.has(s.id) || (s.isExecuted = true, i.add(s.id), t.push(s));
}
var an = { identifier: null, localName: "_missingExportShim" };
function on(e, t, i, s, n3 = /* @__PURE__ */ new Map()) {
  const r2 = n3.get(t);
  if (r2) {
    if (r2.has(e))
      return s ? [null] : pe((a2 = t, o2 = e.id, { code: me.CIRCULAR_REEXPORT, id: o2, message: `"${a2}" cannot be exported from ${he(o2)} as it is a reexport that references itself.` }));
    r2.add(e);
  } else
    n3.set(t, /* @__PURE__ */ new Set([e]));
  var a2, o2;
  return e.getVariableForExportName(t, { importerForSideEffects: i, isExportAllSearch: s, searchedNamesAndModules: n3 });
}
var ln = class {
  constructor(e, t, i, s, n3, r2, a2) {
    this.graph = e, this.id = t, this.options = i, this.alternativeReexportModules = /* @__PURE__ */ new Map(), this.chunkFileNames = /* @__PURE__ */ new Set(), this.chunkNames = [], this.cycles = /* @__PURE__ */ new Set(), this.dependencies = /* @__PURE__ */ new Set(), this.dynamicDependencies = /* @__PURE__ */ new Set(), this.dynamicImporters = [], this.dynamicImports = [], this.execIndex = 1 / 0, this.implicitlyLoadedAfter = /* @__PURE__ */ new Set(), this.implicitlyLoadedBefore = /* @__PURE__ */ new Set(), this.importDescriptions = /* @__PURE__ */ new Map(), this.importMetas = [], this.importedFromNotTreeshaken = false, this.importers = [], this.includedDynamicImporters = [], this.includedImports = /* @__PURE__ */ new Set(), this.isExecuted = false, this.isUserDefinedEntryPoint = false, this.needsExportShim = false, this.sideEffectDependenciesByVariable = /* @__PURE__ */ new Map(), this.sources = /* @__PURE__ */ new Set(), this.usesTopLevelAwait = false, this.allExportNames = null, this.ast = null, this.exportAllModules = [], this.exportAllSources = /* @__PURE__ */ new Set(), this.exportNamesByVariable = null, this.exportShimVariable = new zs(this), this.exports = /* @__PURE__ */ new Map(), this.namespaceReexportsByName = /* @__PURE__ */ new Map(), this.reexportDescriptions = /* @__PURE__ */ new Map(), this.relevantDependencies = null, this.syntheticExports = /* @__PURE__ */ new Map(), this.syntheticNamespace = null, this.transformDependencies = [], this.transitiveReexports = null, this.excludeFromSourcemap = /\0/.test(t), this.context = i.moduleContext(t), this.preserveSignature = this.options.preserveEntrySignatures;
    const o2 = this, { dynamicImports: l2, dynamicImporters: h2, implicitlyLoadedAfter: c2, implicitlyLoadedBefore: u2, importers: d2, reexportDescriptions: p2, sources: f2 } = this;
    this.info = { ast: null, code: null, get dynamicallyImportedIdResolutions() {
      return l2.map(({ argument: e2 }) => "string" == typeof e2 && o2.resolvedIds[e2]).filter(Boolean);
    }, get dynamicallyImportedIds() {
      return l2.map(({ id: e2 }) => e2).filter((e2) => null != e2);
    }, get dynamicImporters() {
      return h2.sort();
    }, get hasDefaultExport() {
      return o2.ast ? o2.exports.has("default") || p2.has("default") : null;
    }, get hasModuleSideEffects() {
      return Pe("Accessing ModuleInfo.hasModuleSideEffects from plugins is deprecated. Please use ModuleInfo.moduleSideEffects instead.", false, i), this.moduleSideEffects;
    }, id: t, get implicitlyLoadedAfterOneOf() {
      return Array.from(c2, Hs).sort();
    }, get implicitlyLoadedBefore() {
      return Array.from(u2, Hs).sort();
    }, get importedIdResolutions() {
      return Array.from(f2, (e2) => o2.resolvedIds[e2]).filter(Boolean);
    }, get importedIds() {
      return Array.from(f2, (e2) => {
        var t2;
        return null === (t2 = o2.resolvedIds[e2]) || void 0 === t2 ? void 0 : t2.id;
      }).filter(Boolean);
    }, get importers() {
      return d2.sort();
    }, isEntry: s, isExternal: false, get isIncluded() {
      return e.phase !== Gs.GENERATE ? null : o2.isIncluded();
    }, meta: { ...a2 }, moduleSideEffects: n3, syntheticNamedExports: r2 }, Object.defineProperty(this.info, "hasModuleSideEffects", { enumerable: false });
  }
  basename() {
    const e = _(this.id), t = $(this.id);
    return Ne(t ? e.slice(0, -t.length) : e);
  }
  bindReferences() {
    this.ast.bind();
  }
  error(e, t) {
    return this.addLocationToLogProps(e, t), pe(e);
  }
  getAllExportNames() {
    if (this.allExportNames)
      return this.allExportNames;
    this.allExportNames = /* @__PURE__ */ new Set([...this.exports.keys(), ...this.reexportDescriptions.keys()]);
    for (const e of this.exportAllModules)
      if (e instanceof $e)
        this.allExportNames.add(`*${e.id}`);
      else
        for (const t of e.getAllExportNames())
          "default" !== t && this.allExportNames.add(t);
    return "string" == typeof this.info.syntheticNamedExports && this.allExportNames.delete(this.info.syntheticNamedExports), this.allExportNames;
  }
  getDependenciesToBeIncluded() {
    if (this.relevantDependencies)
      return this.relevantDependencies;
    this.relevantDependencies = /* @__PURE__ */ new Set();
    const e = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Set(), i = new Set(this.includedImports);
    if (this.info.isEntry || this.includedDynamicImporters.length > 0 || this.namespace.included || this.implicitlyLoadedAfter.size > 0)
      for (const e2 of [...this.getReexports(), ...this.getExports()]) {
        const [t2] = this.getVariableForExportName(e2);
        t2 && i.add(t2);
      }
    for (let s of i) {
      const i2 = this.sideEffectDependenciesByVariable.get(s);
      if (i2)
        for (const e2 of i2)
          t.add(e2);
      s instanceof Us ? s = s.getBaseVariable() : s instanceof Ms && (s = s.getOriginalVariable()), e.add(s.module);
    }
    if (this.options.treeshake && "no-treeshake" !== this.info.moduleSideEffects)
      this.addRelevantSideEffectDependencies(this.relevantDependencies, e, t);
    else
      for (const e2 of this.dependencies)
        this.relevantDependencies.add(e2);
    for (const t2 of e)
      this.relevantDependencies.add(t2);
    return this.relevantDependencies;
  }
  getExportNamesByVariable() {
    if (this.exportNamesByVariable)
      return this.exportNamesByVariable;
    const e = /* @__PURE__ */ new Map();
    for (const t of this.getAllExportNames()) {
      let [i] = this.getVariableForExportName(t);
      if (i instanceof Ms && (i = i.getOriginalVariable()), !i || !(i.included || i instanceof te))
        continue;
      const s = e.get(i);
      s ? s.push(t) : e.set(i, [t]);
    }
    return this.exportNamesByVariable = e;
  }
  getExports() {
    return Array.from(this.exports.keys());
  }
  getReexports() {
    if (this.transitiveReexports)
      return this.transitiveReexports;
    this.transitiveReexports = [];
    const e = new Set(this.reexportDescriptions.keys());
    for (const t of this.exportAllModules)
      if (t instanceof $e)
        e.add(`*${t.id}`);
      else
        for (const i of [...t.getReexports(), ...t.getExports()])
          "default" !== i && e.add(i);
    return this.transitiveReexports = [...e];
  }
  getRenderedExports() {
    const e = [], t = [];
    for (const i of this.exports.keys()) {
      const [s] = this.getVariableForExportName(i);
      (s && s.included ? e : t).push(i);
    }
    return { removedExports: t, renderedExports: e };
  }
  getSyntheticNamespace() {
    return null === this.syntheticNamespace && (this.syntheticNamespace = void 0, [this.syntheticNamespace] = this.getVariableForExportName("string" == typeof this.info.syntheticNamedExports ? this.info.syntheticNamedExports : "default", { onlyExplicit: true })), this.syntheticNamespace ? this.syntheticNamespace : pe((e = this.id, t = this.info.syntheticNamedExports, { code: me.SYNTHETIC_NAMED_EXPORTS_NEED_NAMESPACE_EXPORT, id: e, message: `Module "${he(e)}" that is marked with 'syntheticNamedExports: ${JSON.stringify(t)}' needs ${"string" == typeof t && "default" !== t ? `an explicit export named "${t}"` : "a default export"} that does not reexport an unresolved named export of the same module.` }));
    var e, t;
  }
  getVariableForExportName(e, { importerForSideEffects: t, isExportAllSearch: i, onlyExplicit: s, searchedNamesAndModules: n3 } = se) {
    var r2;
    if ("*" === e[0]) {
      if (1 === e.length)
        return [this.namespace];
      return this.graph.modulesById.get(e.slice(1)).getVariableForExportName("*");
    }
    const a2 = this.reexportDescriptions.get(e);
    if (a2) {
      const [e2] = on(a2.module, a2.localName, t, false, n3);
      return e2 ? (t && hn(e2, t, this), [e2]) : this.error(Ee(a2.localName, this.id, a2.module.id), a2.start);
    }
    const o2 = this.exports.get(e);
    if (o2) {
      if (o2 === an)
        return [this.exportShimVariable];
      const e2 = o2.localName, i2 = this.traceVariable(e2, { importerForSideEffects: t, searchedNamesAndModules: n3 });
      return t && (R(t.sideEffectDependenciesByVariable, i2, () => /* @__PURE__ */ new Set()).add(this), hn(i2, t, this)), [i2];
    }
    if (s)
      return [null];
    if ("default" !== e) {
      const i2 = null !== (r2 = this.namespaceReexportsByName.get(e)) && void 0 !== r2 ? r2 : this.getVariableFromNamespaceReexports(e, t, n3);
      if (this.namespaceReexportsByName.set(e, i2), i2[0])
        return i2;
    }
    return this.info.syntheticNamedExports ? [R(this.syntheticExports, e, () => new Us(this.astContext, e, this.getSyntheticNamespace()))] : !i && this.options.shimMissingExports ? (this.shimMissingExport(e), [this.exportShimVariable]) : [null];
  }
  hasEffects() {
    return "no-treeshake" === this.info.moduleSideEffects || this.ast.included && this.ast.hasEffects(Me());
  }
  include() {
    const e = Re();
    this.ast.shouldBeIncluded(e) && this.ast.include(e, false);
  }
  includeAllExports(e) {
    this.isExecuted || (rn(this), this.graph.needsTreeshakingPass = true);
    for (const t of this.exports.keys())
      if (e || t !== this.info.syntheticNamedExports) {
        const e2 = this.getVariableForExportName(t)[0];
        e2.deoptimizePath(B), e2.included || this.includeVariable(e2);
      }
    for (const e2 of this.getReexports()) {
      const [t] = this.getVariableForExportName(e2);
      t && (t.deoptimizePath(B), t.included || this.includeVariable(t), t instanceof te && (t.module.reexported = true));
    }
    e && this.namespace.setMergedNamespaces(this.includeAndGetAdditionalMergedNamespaces());
  }
  includeAllInBundle() {
    this.ast.include(Re(), true), this.includeAllExports(false);
  }
  isIncluded() {
    return this.ast.included || this.namespace.included || this.importedFromNotTreeshaken;
  }
  linkImports() {
    this.addModulesToImportDescriptions(this.importDescriptions), this.addModulesToImportDescriptions(this.reexportDescriptions);
    const e = [];
    for (const t of this.exportAllSources) {
      const i = this.graph.modulesById.get(this.resolvedIds[t].id);
      i instanceof $e ? e.push(i) : this.exportAllModules.push(i);
    }
    this.exportAllModules.push(...e);
  }
  render(e) {
    const t = this.magicString.clone();
    return this.ast.render(t, e), this.usesTopLevelAwait = this.astContext.usesTopLevelAwait, t;
  }
  setSource({ ast: e, code: t, customTransformCache: i, originalCode: s, originalSourcemap: n3, resolvedIds: r2, sourcemapChain: a2, transformDependencies: o2, transformFiles: l2, ...h2 }) {
    this.info.code = t, this.originalCode = s, this.originalSourcemap = n3, this.sourcemapChain = a2, l2 && (this.transformFiles = l2), this.transformDependencies = o2, this.customTransformCache = i, this.updateOptions(h2), en("generate ast", 3), e || (e = this.tryParse()), tn("generate ast", 3), this.resolvedIds = r2 || /* @__PURE__ */ Object.create(null);
    const c2 = this.id;
    this.magicString = new x(t, { filename: this.excludeFromSourcemap ? null : c2, indentExclusionRanges: [] }), en("analyse ast", 3), this.astContext = { addDynamicImport: this.addDynamicImport.bind(this), addExport: this.addExport.bind(this), addImport: this.addImport.bind(this), addImportMeta: this.addImportMeta.bind(this), code: t, deoptimizationTracker: this.graph.deoptimizationTracker, error: this.error.bind(this), fileName: c2, getExports: this.getExports.bind(this), getModuleExecIndex: () => this.execIndex, getModuleName: this.basename.bind(this), getNodeConstructor: (e2) => Fs[e2] || Fs.UnknownNode, getReexports: this.getReexports.bind(this), importDescriptions: this.importDescriptions, includeAllExports: () => this.includeAllExports(true), includeDynamicImport: this.includeDynamicImport.bind(this), includeVariableInModule: this.includeVariableInModule.bind(this), magicString: this.magicString, module: this, moduleContext: this.context, options: this.options, requestTreeshakingPass: () => this.graph.needsTreeshakingPass = true, traceExport: (e2) => this.getVariableForExportName(e2)[0], traceVariable: this.traceVariable.bind(this), usesTopLevelAwait: false, warn: this.warn.bind(this) }, this.scope = new Ds(this.graph.scope, this.astContext), this.namespace = new js(this.astContext), this.ast = new $s(e, { context: this.astContext, type: "Module" }, this.scope), this.info.ast = e, tn("analyse ast", 3);
  }
  toJSON() {
    return { ast: this.ast.esTreeNode, code: this.info.code, customTransformCache: this.customTransformCache, dependencies: Array.from(this.dependencies, Hs), id: this.id, meta: this.info.meta, moduleSideEffects: this.info.moduleSideEffects, originalCode: this.originalCode, originalSourcemap: this.originalSourcemap, resolvedIds: this.resolvedIds, sourcemapChain: this.sourcemapChain, syntheticNamedExports: this.info.syntheticNamedExports, transformDependencies: this.transformDependencies, transformFiles: this.transformFiles };
  }
  traceVariable(e, { importerForSideEffects: t, isExportAllSearch: i, searchedNamesAndModules: s } = se) {
    const n3 = this.scope.variables.get(e);
    if (n3)
      return n3;
    const r2 = this.importDescriptions.get(e);
    if (r2) {
      const e2 = r2.module;
      if (e2 instanceof ln && "*" === r2.name)
        return e2.namespace;
      const [n4] = on(e2, r2.name, t || this, i, s);
      return n4 || this.error(Ee(r2.name, this.id, e2.id), r2.start);
    }
    return null;
  }
  tryParse() {
    try {
      return this.graph.contextParse(this.info.code);
    } catch (e) {
      let t = e.message.replace(/ \(\d+:\d+\)$/, "");
      return this.id.endsWith(".json") ? t += " (Note that you need @rollup/plugin-json to import JSON files)" : this.id.endsWith(".js") || (t += " (Note that you need plugins to import files that are not JavaScript)"), this.error({ code: "PARSE_ERROR", message: t, parserError: e }, e.pos);
    }
  }
  updateOptions({ meta: e, moduleSideEffects: t, syntheticNamedExports: i }) {
    null != t && (this.info.moduleSideEffects = t), null != i && (this.info.syntheticNamedExports = i), null != e && Object.assign(this.info.meta, e);
  }
  warn(e, t) {
    this.addLocationToLogProps(e, t), this.options.onwarn(e);
  }
  addDynamicImport(e) {
    let t = e.source;
    t instanceof Os ? 1 === t.quasis.length && t.quasis[0].value.cooked && (t = t.quasis[0].value.cooked) : t instanceof Ti && "string" == typeof t.value && (t = t.value), this.dynamicImports.push({ argument: t, id: null, node: e, resolution: null });
  }
  addExport(e) {
    if (e instanceof Ki)
      this.exports.set("default", { identifier: e.variable.getAssignedVariableName(), localName: "default" });
    else if (e instanceof Wi) {
      const t = e.source.value;
      if (this.sources.add(t), e.exported) {
        const i = e.exported.name;
        this.reexportDescriptions.set(i, { localName: "*", module: null, source: t, start: e.start });
      } else
        this.exportAllSources.add(t);
    } else if (e.source instanceof Ti) {
      const t = e.source.value;
      this.sources.add(t);
      for (const i of e.specifiers) {
        const e2 = i.exported.name;
        this.reexportDescriptions.set(e2, { localName: i.local.name, module: null, source: t, start: i.start });
      }
    } else if (e.declaration) {
      const t = e.declaration;
      if (t instanceof Bs)
        for (const e2 of t.declarations)
          for (const t2 of Oe(e2.id))
            this.exports.set(t2, { identifier: null, localName: t2 });
      else {
        const e2 = t.id.name;
        this.exports.set(e2, { identifier: null, localName: e2 });
      }
    } else
      for (const t of e.specifiers) {
        const e2 = t.local.name, i = t.exported.name;
        this.exports.set(i, { identifier: null, localName: e2 });
      }
  }
  addImport(e) {
    const t = e.source.value;
    this.sources.add(t);
    for (const i of e.specifiers) {
      const e2 = "ImportDefaultSpecifier" === i.type, s = "ImportNamespaceSpecifier" === i.type, n3 = e2 ? "default" : s ? "*" : i.imported.name;
      this.importDescriptions.set(i.local.name, { module: null, name: n3, source: t, start: i.start });
    }
  }
  addImportMeta(e) {
    this.importMetas.push(e);
  }
  addLocationToLogProps(e, t) {
    e.id = this.id, e.pos = t;
    let i = this.info.code;
    const s = re(i, t, { offsetLine: 1 });
    if (s) {
      let { column: n3, line: r2 } = s;
      try {
        ({ column: n3, line: r2 } = function(e2, t2) {
          const i2 = e2.filter((e3) => !!e3.mappings);
          e:
            for (; i2.length > 0; ) {
              const e3 = i2.pop().mappings[t2.line - 1];
              if (e3) {
                const i3 = e3.filter((e4) => e4.length > 1), s2 = i3[i3.length - 1];
                for (const e4 of i3)
                  if (e4[0] >= t2.column || e4 === s2) {
                    t2 = { column: e4[3], line: e4[2] + 1 };
                    continue e;
                  }
              }
              throw new Error("Can't resolve original location of error.");
            }
          return t2;
        }(this.sourcemapChain, { column: n3, line: r2 })), i = this.originalCode;
      } catch (e2) {
        this.options.onwarn({ code: "SOURCEMAP_ERROR", id: this.id, loc: { column: n3, file: this.id, line: r2 }, message: `Error when using sourcemap for reporting an error: ${e2.message}`, pos: t });
      }
      fe(e, { column: n3, line: r2 }, i, this.id);
    }
  }
  addModulesToImportDescriptions(e) {
    for (const t of e.values()) {
      const { id: e2 } = this.resolvedIds[t.source];
      t.module = this.graph.modulesById.get(e2);
    }
  }
  addRelevantSideEffectDependencies(e, t, i) {
    const s = /* @__PURE__ */ new Set(), n3 = (r2) => {
      for (const a2 of r2)
        s.has(a2) || (s.add(a2), t.has(a2) ? e.add(a2) : (a2.info.moduleSideEffects || i.has(a2)) && (a2 instanceof $e || a2.hasEffects() ? e.add(a2) : n3(a2.dependencies)));
    };
    n3(this.dependencies), n3(i);
  }
  getVariableFromNamespaceReexports(e, t, i) {
    let s = null;
    const n3 = /* @__PURE__ */ new Map(), r2 = /* @__PURE__ */ new Set();
    for (const a2 of this.exportAllModules) {
      if (a2.info.syntheticNamedExports === e)
        continue;
      const [o2, l2] = on(a2, e, t, true, cn(i));
      a2 instanceof $e || l2 ? r2.add(o2) : o2 instanceof Us ? s || (s = o2) : o2 && n3.set(o2, a2);
    }
    if (n3.size > 0) {
      const t2 = [...n3], i2 = t2[0][0];
      return 1 === t2.length ? [i2] : (this.options.onwarn(function(e2, t3, i3) {
        return { code: me.NAMESPACE_CONFLICT, message: `Conflicting namespaces: "${he(t3)}" re-exports "${e2}" from one of the modules ${oe(i3.map((e3) => he(e3)))} (will be ignored)`, name: e2, reexporter: t3, sources: i3 };
      }(e, this.id, t2.map(([, e2]) => e2.id))), [null]);
    }
    if (r2.size > 0) {
      const t2 = [...r2], i2 = t2[0];
      return t2.length > 1 && this.options.onwarn(function(e2, t3, i3, s2) {
        return { code: me.AMBIGUOUS_EXTERNAL_NAMESPACES, message: `Ambiguous external namespace resolution: "${he(t3)}" re-exports "${e2}" from one of the external modules ${oe(s2.map((e3) => he(e3)))}, guessing "${he(i3)}".`, name: e2, reexporter: t3, sources: s2 };
      }(e, this.id, i2.module.id, t2.map((e2) => e2.module.id))), [i2, true];
    }
    return s ? [s] : [null];
  }
  includeAndGetAdditionalMergedNamespaces() {
    const e = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Set();
    for (const i of [this, ...this.exportAllModules])
      if (i instanceof $e) {
        const [t2] = i.getVariableForExportName("*");
        t2.include(), this.includedImports.add(t2), e.add(t2);
      } else if (i.info.syntheticNamedExports) {
        const e2 = i.getSyntheticNamespace();
        e2.include(), this.includedImports.add(e2), t.add(e2);
      }
    return [...t, ...e];
  }
  includeDynamicImport(e) {
    const t = this.dynamicImports.find((t2) => t2.node === e).resolution;
    t instanceof ln && (t.includedDynamicImporters.push(this), t.includeAllExports(true));
  }
  includeVariable(e) {
    if (!e.included) {
      e.include(), this.graph.needsTreeshakingPass = true;
      const t = e.module;
      if (t instanceof ln && (t.isExecuted || rn(t), t !== this)) {
        const t2 = function(e2, t3) {
          const i = R(t3.sideEffectDependenciesByVariable, e2, () => /* @__PURE__ */ new Set());
          let s = e2;
          const n3 = /* @__PURE__ */ new Set([s]);
          for (; ; ) {
            const e3 = s.module;
            if (s = s instanceof Ms ? s.getDirectOriginalVariable() : s instanceof Us ? s.syntheticNamespace : null, !s || n3.has(s))
              break;
            n3.add(s), i.add(e3);
            const t4 = e3.sideEffectDependenciesByVariable.get(s);
            if (t4)
              for (const e4 of t4)
                i.add(e4);
          }
          return i;
        }(e, this);
        for (const e2 of t2)
          e2.isExecuted || rn(e2);
      }
    }
  }
  includeVariableInModule(e) {
    this.includeVariable(e);
    const t = e.module;
    t && t !== this && this.includedImports.add(e);
  }
  shimMissingExport(e) {
    this.options.onwarn({ code: "SHIMMED_EXPORT", exporter: he(this.id), exportName: e, message: `Missing export "${e}" has been shimmed in module ${he(this.id)}.` }), this.exports.set(e, an);
  }
};
function hn(e, t, i) {
  if (e.module instanceof ln && e.module !== i) {
    const s = e.module.cycles;
    if (s.size > 0) {
      const n3 = i.cycles;
      for (const r2 of n3)
        if (s.has(r2)) {
          t.alternativeReexportModules.set(e, i);
          break;
        }
    }
  }
}
var cn = (e) => e && new Map(Array.from(e, ([e2, t]) => [e2, new Set(t)]));
function un(e) {
  return e.endsWith(".js") ? e.slice(0, -3) : e;
}
function dn(e, t) {
  return e.autoId ? `${e.basePath ? e.basePath + "/" : ""}${un(t)}` : e.id || "";
}
function pn(e, t, i, s, n3, r2, a2, o2 = "return ") {
  const { _: l2, cnst: h2, getDirectReturnFunction: c2, getFunctionIntro: u2, getPropertyAccess: d2, n: p2, s: f2 } = n3;
  if (!i)
    return `${p2}${p2}${o2}${function(e2, t2, i2, s2, n4) {
      if (e2.length > 0)
        return e2[0].local;
      for (const { defaultVariableName: e3, id: r3, isChunk: a3, name: o3, namedExportsMode: l3, namespaceVariableName: h3, reexports: c3 } of t2)
        if (c3)
          return fn(o3, c3[0].imported, l3, a3, e3, h3, i2, r3, s2, n4);
    }(e, t, s, a2, d2)};`;
  let m2 = "";
  for (const { defaultVariableName: e2, id: n4, isChunk: o3, name: h3, namedExportsMode: u3, namespaceVariableName: f3, reexports: g2 } of t)
    if (g2 && i) {
      for (const t2 of g2)
        if ("*" !== t2.reexported) {
          const i2 = fn(h3, t2.imported, u3, o3, e2, f3, s, n4, a2, d2);
          if (m2 && (m2 += p2), "*" !== t2.imported && t2.needsLiveBinding) {
            const [e3, s2] = c2([], { functionReturn: true, lineBreakIndent: null, name: null });
            m2 += `Object.defineProperty(exports,${l2}'${t2.reexported}',${l2}{${p2}${r2}enumerable:${l2}true,${p2}${r2}get:${l2}${e3}${i2}${s2}${p2}});`;
          } else
            m2 += `exports${d2(t2.reexported)}${l2}=${l2}${i2};`;
        }
    }
  for (const { exported: t2, local: i2 } of e) {
    const e2 = `exports${d2(t2)}`, s2 = i2;
    e2 !== s2 && (m2 && (m2 += p2), m2 += `${e2}${l2}=${l2}${s2};`);
  }
  for (const { name: e2, reexports: s2 } of t)
    if (s2 && i) {
      for (const t2 of s2)
        if ("*" === t2.reexported) {
          m2 && (m2 += p2);
          const i2 = `{${p2}${r2}if${l2}(k${l2}!==${l2}'default'${l2}&&${l2}!exports.hasOwnProperty(k))${l2}${yn(e2, t2.needsLiveBinding, r2, n3)}${f2}${p2}}`;
          m2 += "var" === h2 && t2.needsLiveBinding ? `Object.keys(${e2}).forEach(${u2(["k"], { isAsync: false, name: null })}${i2});` : `for${l2}(${h2} k in ${e2})${l2}${i2}`;
        }
    }
  return m2 ? `${p2}${p2}${m2}` : "";
}
function fn(e, t, i, s, n3, r2, a2, o2, l2, h2) {
  if ("default" === t) {
    if (!s) {
      const t2 = String(a2(o2)), i2 = es[t2] ? n3 : e;
      return ts(t2, l2) ? `${i2}${h2("default")}` : i2;
    }
    return i ? `${e}${h2("default")}` : e;
  }
  return "*" === t ? (s ? !i : is[String(a2(o2))]) ? r2 : e : `${e}${h2(t)}`;
}
function mn(e) {
  return e([["value", "true"]], { lineBreakIndent: null });
}
function gn(e, t, i, { _: s, getObject: n3 }) {
  if (e) {
    if (t)
      return i ? `Object.defineProperties(exports,${s}${n3([["__esModule", mn(n3)], [null, `[Symbol.toStringTag]:${s}${xs(n3)}`]], { lineBreakIndent: null })});` : `Object.defineProperty(exports,${s}'__esModule',${s}${mn(n3)});`;
    if (i)
      return `Object.defineProperty(exports,${s}Symbol.toStringTag,${s}${xs(n3)});`;
  }
  return "";
}
var yn = (e, t, i, { _: s, getDirectReturnFunction: n3, n: r2 }) => {
  if (t) {
    const [t2, a2] = n3([], { functionReturn: true, lineBreakIndent: null, name: null });
    return `Object.defineProperty(exports,${s}k,${s}{${r2}${i}${i}enumerable:${s}true,${r2}${i}${i}get:${s}${t2}${e}[k]${a2}${r2}${i}})`;
  }
  return `exports[k]${s}=${s}${e}[k]`;
};
function xn(e, t, i, s, n3, r2, a2, o2) {
  const { _: l2, cnst: h2, n: c2 } = o2, u2 = /* @__PURE__ */ new Set(), d2 = [], p2 = (e2, t2, i2) => {
    u2.add(t2), d2.push(`${h2} ${e2}${l2}=${l2}/*#__PURE__*/${t2}(${i2});`);
  };
  for (const { defaultVariableName: i2, imports: s2, id: n4, isChunk: r3, name: a3, namedExportsMode: o3, namespaceVariableName: l3, reexports: h3 } of e)
    if (r3) {
      for (const { imported: e2, reexported: t2 } of [...s2 || [], ...h3 || []])
        if ("*" === e2 && "*" !== t2) {
          o3 || p2(l3, "_interopNamespaceDefaultOnly", a3);
          break;
        }
    } else {
      const e2 = String(t(n4));
      let r4 = false, o4 = false;
      for (const { imported: t2, reexported: n5 } of [...s2 || [], ...h3 || []]) {
        let s3, h4;
        "default" === t2 ? r4 || (r4 = true, i2 !== l3 && (h4 = i2, s3 = es[e2])) : "*" === t2 && "*" !== n5 && (o4 || (o4 = true, s3 = is[e2], h4 = l3)), s3 && p2(h4, s3, a3);
      }
    }
  return `${ns(u2, r2, a2, o2, i, s, n3)}${d2.length > 0 ? `${d2.join(c2)}${c2}${c2}` : ""}`;
}
function En(e, t) {
  return "." !== e[0] ? e : t ? (i = e).endsWith(".js") ? i : i + ".js" : un(e);
  var i;
}
var bn = { assert: true, buffer: true, console: true, constants: true, domain: true, events: true, http: true, https: true, os: true, path: true, process: true, punycode: true, querystring: true, stream: true, string_decoder: true, timers: true, tty: true, url: true, util: true, vm: true, zlib: true };
function vn(e, t) {
  const i = t.map(({ id: e2 }) => e2).filter((e2) => e2 in bn);
  i.length && e({ code: "MISSING_NODE_BUILTINS", message: `Creating a browser bundle that depends on Node.js built-in modules (${oe(i)}). You might need to include https://github.com/FredKSchott/rollup-plugin-polyfill-node`, modules: i });
}
var Sn = (e, t) => e.split(".").map(t).join("");
function An(e, t, i, s, { _: n3, getPropertyAccess: r2 }) {
  const a2 = e.split(".");
  a2[0] = ("function" == typeof i ? i(a2[0]) : i[a2[0]]) || a2[0];
  const o2 = a2.pop();
  let l2 = t, h2 = a2.map((e2) => (l2 += r2(e2), `${l2}${n3}=${n3}${l2}${n3}||${n3}{}`)).concat(`${l2}${r2(o2)}`).join(`,${n3}`) + `${n3}=${n3}${s}`;
  return a2.length > 0 && (h2 = `(${h2})`), h2;
}
function In(e) {
  let t = e.length;
  for (; t--; ) {
    const { imports: i, reexports: s } = e[t];
    if (i || s)
      return e.slice(0, t + 1);
  }
  return [];
}
var Pn = ({ dependencies: e, exports: t }) => {
  const i = new Set(t.map((e2) => e2.exported));
  i.add("default");
  for (const { reexports: t2 } of e)
    if (t2)
      for (const e2 of t2)
        "*" !== e2.reexported && i.add(e2.reexported);
  return i;
};
var kn = (e, t, { _: i, cnst: s, getObject: n3, n: r2 }) => e ? `${r2}${t}${s} _starExcludes${i}=${i}${n3([...e].map((e2) => [e2, "1"]), { lineBreakIndent: { base: t, t } })};` : "";
var wn = (e, t, { _: i, n: s }) => e.length ? `${s}${t}var ${e.join(`,${i}`)};` : "";
var Cn = (e, t, i) => _n(e.filter((e2) => e2.hoisted).map((e2) => ({ name: e2.exported, value: e2.local })), t, i);
function _n(e, t, { _: i, n: s }) {
  return 0 === e.length ? "" : 1 === e.length ? `exports('${e[0].name}',${i}${e[0].value});${s}${s}` : `exports({${s}` + e.map(({ name: e2, value: s2 }) => `${t}${e2}:${i}${s2}`).join(`,${s}`) + `${s}});${s}${s}`;
}
var Nn = (e, t, i) => _n(e.filter((e2) => e2.expression).map((e2) => ({ name: e2.exported, value: e2.local })), t, i);
var $n = (e, t, i) => _n(e.filter((e2) => "_missingExportShim" === e2.local).map((e2) => ({ name: e2.exported, value: "_missingExportShim" })), t, i);
function Tn(e, t, i) {
  return e ? `${t}${Sn(e, i)}` : "null";
}
var On = { amd: function(e, { accessedGlobals: t, dependencies: i, exports: s, hasExports: n3, id: r2, indent: a2, intro: o2, isEntryFacade: l2, isModuleFacade: h2, namedExportsMode: c2, outro: u2, snippets: d2, warn: p2 }, { amd: f2, esModule: m2, externalLiveBindings: g2, freeze: y2, interop: x2, namespaceToStringTag: E2, strict: b2 }) {
  vn(p2, i);
  const v2 = i.map((e2) => `'${En(e2.id, f2.forceJsExtensionForImports)}'`), S2 = i.map((e2) => e2.name), { n: A2, getNonArrowFunctionIntro: I2, _: P2 } = d2;
  c2 && n3 && (S2.unshift("exports"), v2.unshift("'exports'")), t.has("require") && (S2.unshift("require"), v2.unshift("'require'")), t.has("module") && (S2.unshift("module"), v2.unshift("'module'"));
  const k2 = dn(f2, r2), w2 = (k2 ? `'${k2}',${P2}` : "") + (v2.length ? `[${v2.join(`,${P2}`)}],${P2}` : ""), C2 = b2 ? `${P2}'use strict';` : "";
  e.prepend(`${o2}${xn(i, x2, g2, y2, E2, t, a2, d2)}`);
  const _2 = pn(s, i, c2, x2, d2, a2, g2);
  let N2 = gn(c2 && n3, l2 && m2, h2 && E2, d2);
  return N2 && (N2 = A2 + A2 + N2), e.append(`${_2}${N2}${u2}`), e.indent(a2).prepend(`${f2.define}(${w2}(${I2(S2, { isAsync: false, name: null })}{${C2}${A2}${A2}`).append(`${A2}${A2}}));`);
}, cjs: function(e, { accessedGlobals: t, dependencies: i, exports: s, hasExports: n3, indent: r2, intro: a2, isEntryFacade: o2, isModuleFacade: l2, namedExportsMode: h2, outro: c2, snippets: u2 }, { compact: d2, esModule: p2, externalLiveBindings: f2, freeze: m2, interop: g2, namespaceToStringTag: y2, strict: x2 }) {
  const { _: E2, n: b2 } = u2, v2 = x2 ? `'use strict';${b2}${b2}` : "";
  let S2 = gn(h2 && n3, o2 && p2, l2 && y2, u2);
  S2 && (S2 += b2 + b2);
  const A2 = function(e2, { _: t2, cnst: i2, n: s2 }, n4) {
    let r3 = "", a3 = false;
    for (const { id: o3, name: l3, reexports: h3, imports: c3 } of e2)
      h3 || c3 ? (r3 += n4 && a3 ? "," : `${r3 ? `;${s2}` : ""}${i2} `, a3 = true, r3 += `${l3}${t2}=${t2}require('${o3}')`) : (r3 && (r3 += n4 && !a3 ? "," : `;${s2}`), a3 = false, r3 += `require('${o3}')`);
    if (r3)
      return `${r3};${s2}${s2}`;
    return "";
  }(i, u2, d2), I2 = xn(i, g2, f2, m2, y2, t, r2, u2);
  e.prepend(`${v2}${a2}${S2}${A2}${I2}`);
  const P2 = pn(s, i, h2, g2, u2, r2, f2, `module.exports${E2}=${E2}`);
  return e.append(`${P2}${c2}`);
}, es: function(e, { accessedGlobals: t, indent: i, intro: s, outro: n3, dependencies: r2, exports: a2, snippets: o2 }, { externalLiveBindings: l2, freeze: h2, namespaceToStringTag: c2 }) {
  const { _: u2, n: d2 } = o2, p2 = function(e2, t2) {
    const i2 = [];
    for (const { id: s2, reexports: n4, imports: r3, name: a3 } of e2)
      if (n4 || r3) {
        if (r3) {
          let e3 = null, n5 = null;
          const a4 = [];
          for (const t3 of r3)
            "default" === t3.imported ? e3 = t3 : "*" === t3.imported ? n5 = t3 : a4.push(t3);
          n5 && i2.push(`import${t2}*${t2}as ${n5.local} from${t2}'${s2}';`), e3 && 0 === a4.length ? i2.push(`import ${e3.local} from${t2}'${s2}';`) : a4.length > 0 && i2.push(`import ${e3 ? `${e3.local},${t2}` : ""}{${t2}${a4.map((e4) => e4.imported === e4.local ? e4.imported : `${e4.imported} as ${e4.local}`).join(`,${t2}`)}${t2}}${t2}from${t2}'${s2}';`);
        }
        if (n4) {
          let e3 = null;
          const o3 = [], l3 = [];
          for (const t3 of n4)
            "*" === t3.reexported ? e3 = t3 : "*" === t3.imported ? o3.push(t3) : l3.push(t3);
          if (e3 && i2.push(`export${t2}*${t2}from${t2}'${s2}';`), o3.length > 0) {
            r3 && r3.some((e4) => "*" === e4.imported && e4.local === a3) || i2.push(`import${t2}*${t2}as ${a3} from${t2}'${s2}';`);
            for (const e4 of o3)
              i2.push(`export${t2}{${t2}${a3 === e4.reexported ? a3 : `${a3} as ${e4.reexported}`} };`);
          }
          l3.length > 0 && i2.push(`export${t2}{${t2}${l3.map((e4) => e4.imported === e4.reexported ? e4.imported : `${e4.imported} as ${e4.reexported}`).join(`,${t2}`)}${t2}}${t2}from${t2}'${s2}';`);
        }
      } else
        i2.push(`import${t2}'${s2}';`);
    return i2;
  }(r2, u2);
  p2.length > 0 && (s += p2.join(d2) + d2 + d2), (s += ns(null, t, i, o2, l2, h2, c2)) && e.prepend(s);
  const f2 = function(e2, { _: t2, cnst: i2 }) {
    const s2 = [], n4 = [];
    for (const r3 of e2)
      r3.expression && s2.push(`${i2} ${r3.local}${t2}=${t2}${r3.expression};`), n4.push(r3.exported === r3.local ? r3.local : `${r3.local} as ${r3.exported}`);
    n4.length && s2.push(`export${t2}{${t2}${n4.join(`,${t2}`)}${t2}};`);
    return s2;
  }(a2, o2);
  return f2.length && e.append(d2 + d2 + f2.join(d2).trim()), n3 && e.append(n3), e.trim();
}, iife: function(e, { accessedGlobals: t, dependencies: i, exports: s, hasExports: n3, indent: r2, intro: a2, namedExportsMode: o2, outro: l2, snippets: h2, warn: c2 }, { compact: u2, esModule: d2, extend: p2, freeze: f2, externalLiveBindings: m2, globals: g2, interop: y2, name: x2, namespaceToStringTag: E2, strict: b2 }) {
  const { _: v2, getNonArrowFunctionIntro: S2, getPropertyAccess: A2, n: I2 } = h2, P2 = x2 && x2.includes("."), k2 = !p2 && !P2;
  if (x2 && k2 && (_e(w2 = x2) || Ce.test(w2)))
    return pe({ code: "ILLEGAL_IDENTIFIER_AS_NAME", message: `Given name "${x2}" is not a legal JS identifier. If you need this, you can try "output.extend: true".` });
  var w2;
  vn(c2, i);
  const C2 = In(i), _2 = C2.map((e2) => e2.globalName || "null"), N2 = C2.map((e2) => e2.name);
  n3 && !x2 && c2({ code: "MISSING_NAME_OPTION_FOR_IIFE_EXPORT", message: 'If you do not supply "output.name", you may not be able to access the exports of an IIFE bundle.' }), o2 && n3 && (p2 ? (_2.unshift(`this${Sn(x2, A2)}${v2}=${v2}this${Sn(x2, A2)}${v2}||${v2}{}`), N2.unshift("exports")) : (_2.unshift("{}"), N2.unshift("exports")));
  const $2 = b2 ? `${r2}'use strict';${I2}` : "", T2 = xn(i, y2, m2, f2, E2, t, r2, h2);
  e.prepend(`${a2}${T2}`);
  let O2 = `(${S2(N2, { isAsync: false, name: null })}{${I2}${$2}${I2}`;
  n3 && (!x2 || p2 && o2 || (O2 = (k2 ? `var ${x2}` : `this${Sn(x2, A2)}`) + `${v2}=${v2}${O2}`), P2 && (O2 = function(e2, t2, i2, { _: s2, getPropertyAccess: n4, s: r3 }, a3) {
    const o3 = e2.split(".");
    o3[0] = ("function" == typeof i2 ? i2(o3[0]) : i2[o3[0]]) || o3[0], o3.pop();
    let l3 = t2;
    return o3.map((e3) => (l3 += n4(e3), `${l3}${s2}=${s2}${l3}${s2}||${s2}{}${r3}`)).join(a3 ? "," : "\n") + (a3 && o3.length ? ";" : "\n");
  }(x2, "this", g2, h2, u2) + O2));
  let R2 = `${I2}${I2}})(${_2.join(`,${v2}`)});`;
  n3 && !p2 && o2 && (R2 = `${I2}${I2}${r2}return exports;${R2}`);
  const M2 = pn(s, i, o2, y2, h2, r2, m2);
  let D2 = gn(o2 && n3, d2, E2, h2);
  return D2 && (D2 = I2 + I2 + D2), e.append(`${M2}${D2}${l2}`), e.indent(r2).prepend(O2).append(R2);
}, system: function(e, { accessedGlobals: t, dependencies: i, exports: s, hasExports: n3, indent: r2, intro: a2, snippets: o2, outro: l2, usesTopLevelAwait: h2 }, { externalLiveBindings: c2, freeze: u2, name: d2, namespaceToStringTag: p2, strict: f2, systemNullSetters: m2 }) {
  const { _: g2, getFunctionIntro: y2, getNonArrowFunctionIntro: x2, n: E2, s: b2 } = o2, { importBindings: v2, setters: S2, starExcludes: A2 } = function(e2, t2, i2, { _: s2, cnst: n4, getObject: r3, getPropertyAccess: a3, n: o3 }) {
    const l3 = [], h3 = [];
    let c3 = null;
    for (const { imports: u3, reexports: d3 } of e2) {
      const p3 = [];
      if (u3)
        for (const e3 of u3)
          l3.push(e3.local), "*" === e3.imported ? p3.push(`${e3.local}${s2}=${s2}module;`) : p3.push(`${e3.local}${s2}=${s2}module${a3(e3.imported)};`);
      if (d3) {
        const o4 = [];
        let l4 = false;
        for (const { imported: e3, reexported: t3 } of d3)
          "*" === t3 ? l4 = true : o4.push([t3, "*" === e3 ? "module" : `module${a3(e3)}`]);
        if (o4.length > 1 || l4) {
          const a4 = r3(o4, { lineBreakIndent: null });
          l4 ? (c3 || (c3 = Pn({ dependencies: e2, exports: t2 })), p3.push(`${n4} setter${s2}=${s2}${a4};`, `for${s2}(${n4} name in module)${s2}{`, `${i2}if${s2}(!_starExcludes[name])${s2}setter[name]${s2}=${s2}module[name];`, "}", "exports(setter);")) : p3.push(`exports(${a4});`);
        } else {
          const [e3, t3] = o4[0];
          p3.push(`exports('${e3}',${s2}${t3});`);
        }
      }
      h3.push(p3.join(`${o3}${i2}${i2}${i2}`));
    }
    return { importBindings: l3, setters: h3, starExcludes: c3 };
  }(i, s, r2, o2), I2 = d2 ? `'${d2}',${g2}` : "", P2 = t.has("module") ? ["exports", "module"] : n3 ? ["exports"] : [];
  let k2 = `System.register(${I2}[` + i.map(({ id: e2 }) => `'${e2}'`).join(`,${g2}`) + `],${g2}(${x2(P2, { isAsync: false, name: null })}{${E2}${r2}${f2 ? "'use strict';" : ""}` + kn(A2, r2, o2) + wn(v2, r2, o2) + `${E2}${r2}return${g2}{${S2.length ? `${E2}${r2}${r2}setters:${g2}[${S2.map((e2) => e2 ? `${y2(["module"], { isAsync: false, name: null })}{${E2}${r2}${r2}${r2}${e2}${E2}${r2}${r2}}` : m2 ? "null" : `${y2([], { isAsync: false, name: null })}{}`).join(`,${g2}`)}],` : ""}${E2}`;
  k2 += `${r2}${r2}execute:${g2}(${x2([], { isAsync: h2, name: null })}{${E2}${E2}`;
  const w2 = `${r2}${r2}})${E2}${r2}}${b2}${E2}}));`;
  return e.prepend(a2 + ns(null, t, r2, o2, c2, u2, p2) + Cn(s, r2, o2)), e.append(`${l2}${E2}${E2}` + Nn(s, r2, o2) + $n(s, r2, o2)), e.indent(`${r2}${r2}${r2}`).append(w2).prepend(k2);
}, umd: function(e, { accessedGlobals: t, dependencies: i, exports: s, hasExports: n3, id: r2, indent: a2, intro: o2, namedExportsMode: l2, outro: h2, snippets: c2, warn: u2 }, { amd: d2, compact: p2, esModule: f2, extend: m2, externalLiveBindings: g2, freeze: y2, interop: x2, name: E2, namespaceToStringTag: b2, globals: v2, noConflict: S2, strict: A2 }) {
  const { _: I2, cnst: P2, getFunctionIntro: k2, getNonArrowFunctionIntro: w2, getPropertyAccess: C2, n: _2, s: N2 } = c2, $2 = p2 ? "f" : "factory", T2 = p2 ? "g" : "global";
  if (n3 && !E2)
    return pe({ code: "MISSING_NAME_OPTION_FOR_IIFE_EXPORT", message: 'You must supply "output.name" for UMD bundles that have exports so that the exports are accessible in environments without a module loader.' });
  vn(u2, i);
  const O2 = i.map((e2) => `'${En(e2.id, d2.forceJsExtensionForImports)}'`), R2 = i.map((e2) => `require('${e2.id}')`), M2 = In(i), D2 = M2.map((e2) => Tn(e2.globalName, T2, C2)), L2 = M2.map((e2) => e2.name);
  l2 && (n3 || S2) && (O2.unshift("'exports'"), R2.unshift("exports"), D2.unshift(An(E2, T2, v2, (m2 ? `${Tn(E2, T2, C2)}${I2}||${I2}` : "") + "{}", c2)), L2.unshift("exports"));
  const V2 = dn(d2, r2), B2 = (V2 ? `'${V2}',${I2}` : "") + (O2.length ? `[${O2.join(`,${I2}`)}],${I2}` : ""), F2 = d2.define, z2 = !l2 && n3 ? `module.exports${I2}=${I2}` : "", j2 = A2 ? `${I2}'use strict';${_2}` : "";
  let U2;
  if (S2) {
    const e2 = p2 ? "e" : "exports";
    let t2;
    if (!l2 && n3)
      t2 = `${P2} ${e2}${I2}=${I2}${An(E2, T2, v2, `${$2}(${D2.join(`,${I2}`)})`, c2)};`;
    else {
      t2 = `${P2} ${e2}${I2}=${I2}${D2.shift()};${_2}${a2}${a2}${$2}(${[e2].concat(D2).join(`,${I2}`)});`;
    }
    U2 = `(${k2([], { isAsync: false, name: null })}{${_2}${a2}${a2}${P2} current${I2}=${I2}${function(e3, t3, { _: i2, getPropertyAccess: s2 }) {
      let n4 = t3;
      return e3.split(".").map((e4) => n4 += s2(e4)).join(`${i2}&&${i2}`);
    }(E2, T2, c2)};${_2}${a2}${a2}${t2}${_2}${a2}${a2}${e2}.noConflict${I2}=${I2}${k2([], { isAsync: false, name: null })}{${I2}${Tn(E2, T2, C2)}${I2}=${I2}current;${I2}return ${e2}${N2}${I2}};${_2}${a2}})()`;
  } else
    U2 = `${$2}(${D2.join(`,${I2}`)})`, !l2 && n3 && (U2 = An(E2, T2, v2, U2, c2));
  const G2 = n3 || S2 && l2 || D2.length > 0, H2 = [$2];
  G2 && H2.unshift(T2);
  const W2 = G2 ? `this,${I2}` : "", q2 = G2 ? `(${T2}${I2}=${I2}typeof globalThis${I2}!==${I2}'undefined'${I2}?${I2}globalThis${I2}:${I2}${T2}${I2}||${I2}self,${I2}` : "", K2 = G2 ? ")" : "", X2 = G2 ? `${a2}typeof exports${I2}===${I2}'object'${I2}&&${I2}typeof module${I2}!==${I2}'undefined'${I2}?${I2}${z2}${$2}(${R2.join(`,${I2}`)})${I2}:${_2}` : "", Y2 = `(${w2(H2, { isAsync: false, name: null })}{${_2}` + X2 + `${a2}typeof ${F2}${I2}===${I2}'function'${I2}&&${I2}${F2}.amd${I2}?${I2}${F2}(${B2}${$2})${I2}:${_2}${a2}${q2}${U2}${K2};${_2}})(${W2}(${w2(L2, { isAsync: false, name: null })}{${j2}${_2}`, Q2 = _2 + _2 + "}));";
  e.prepend(`${o2}${xn(i, x2, g2, y2, b2, t, a2, c2)}`);
  const J2 = pn(s, i, l2, x2, c2, a2, g2);
  let Z2 = gn(l2 && n3, f2, b2, c2);
  return Z2 && (Z2 = _2 + _2 + Z2), e.append(`${J2}${Z2}${h2}`), e.trim().indent(a2).append(Q2).prepend(Y2);
} };
var Rn = class {
  constructor(e, t) {
    this.isOriginal = true, this.filename = e, this.content = t;
  }
  traceSegment(e, t, i) {
    return { column: t, line: e, name: i, source: this };
  }
};
var Mn = class {
  constructor(e, t) {
    this.sources = t, this.names = e.names, this.mappings = e.mappings;
  }
  traceMappings() {
    const e = [], t = /* @__PURE__ */ new Map(), i = [], s = [], n3 = /* @__PURE__ */ new Map(), r2 = [];
    for (const a2 of this.mappings) {
      const o2 = [];
      for (const r3 of a2) {
        if (1 === r3.length)
          continue;
        const a3 = this.sources[r3[1]];
        if (!a3)
          continue;
        const l2 = a3.traceSegment(r3[2], r3[3], 5 === r3.length ? this.names[r3[4]] : "");
        if (l2) {
          const { column: a4, line: h2, name: c2, source: { content: u2, filename: d2 } } = l2;
          let p2 = t.get(d2);
          if (void 0 === p2)
            p2 = e.length, e.push(d2), t.set(d2, p2), i[p2] = u2;
          else if (null == i[p2])
            i[p2] = u2;
          else if (null != u2 && i[p2] !== u2)
            return pe({ message: `Multiple conflicting contents for sourcemap source ${d2}` });
          const f2 = [r3[0], p2, h2, a4];
          if (c2) {
            let e2 = n3.get(c2);
            void 0 === e2 && (e2 = s.length, s.push(c2), n3.set(c2, e2)), f2[4] = e2;
          }
          o2.push(f2);
        }
      }
      r2.push(o2);
    }
    return { mappings: r2, names: s, sources: e, sourcesContent: i };
  }
  traceSegment(e, t, i) {
    const s = this.mappings[e];
    if (!s)
      return null;
    let n3 = 0, r2 = s.length - 1;
    for (; n3 <= r2; ) {
      const e2 = n3 + r2 >> 1, a2 = s[e2];
      if (a2[0] === t || n3 === r2) {
        if (1 == a2.length)
          return null;
        const e3 = this.sources[a2[1]];
        return e3 ? e3.traceSegment(a2[2], a2[3], 5 === a2.length ? this.names[a2[4]] : i) : null;
      }
      a2[0] > t ? r2 = e2 - 1 : n3 = e2 + 1;
    }
    return null;
  }
};
function Dn(e) {
  return function(t, i) {
    return i.mappings ? new Mn(i, [t]) : (e({ code: "SOURCEMAP_BROKEN", message: `Sourcemap is likely to be incorrect: a plugin (${i.plugin}) was used to transform files, but didn't generate a sourcemap for the transformation. Consult the plugin documentation for help`, plugin: i.plugin, url: "https://rollupjs.org/guide/en/#warning-sourcemap-is-likely-to-be-incorrect" }), new Mn({ mappings: [], names: [] }, [t]));
  };
}
function Ln(e, t, i, s, n3) {
  let r2;
  if (i) {
    const t2 = i.sources, s2 = i.sourcesContent || [], n4 = N(e) || ".", a2 = i.sourceRoot || ".", o2 = t2.map((e2, t3) => new Rn(O(n4, a2, e2), s2[t3]));
    r2 = new Mn(i, o2);
  } else
    r2 = new Rn(e, t);
  return s.reduce(n3, r2);
}
var Vn = {};
var Bn = Fn;
function Fn(e, t) {
  if (!e)
    throw new Error(t || "Assertion failed");
}
Fn.equal = function(e, t, i) {
  if (e != t)
    throw new Error(i || "Assertion failed: " + e + " != " + t);
};
var zn = { exports: {} };
"function" == typeof Object.create ? zn.exports = function(e, t) {
  t && (e.super_ = t, e.prototype = Object.create(t.prototype, { constructor: { value: e, enumerable: false, writable: true, configurable: true } }));
} : zn.exports = function(e, t) {
  if (t) {
    e.super_ = t;
    var i = function() {
    };
    i.prototype = t.prototype, e.prototype = new i(), e.prototype.constructor = e;
  }
};
var jn = Bn;
var Un = zn.exports;
function Gn(e, t) {
  return 55296 == (64512 & e.charCodeAt(t)) && (!(t < 0 || t + 1 >= e.length) && 56320 == (64512 & e.charCodeAt(t + 1)));
}
function Hn(e) {
  return (e >>> 24 | e >>> 8 & 65280 | e << 8 & 16711680 | (255 & e) << 24) >>> 0;
}
function Wn(e) {
  return 1 === e.length ? "0" + e : e;
}
function qn(e) {
  return 7 === e.length ? "0" + e : 6 === e.length ? "00" + e : 5 === e.length ? "000" + e : 4 === e.length ? "0000" + e : 3 === e.length ? "00000" + e : 2 === e.length ? "000000" + e : 1 === e.length ? "0000000" + e : e;
}
Vn.inherits = Un, Vn.toArray = function(e, t) {
  if (Array.isArray(e))
    return e.slice();
  if (!e)
    return [];
  var i = [];
  if ("string" == typeof e)
    if (t) {
      if ("hex" === t)
        for ((e = e.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (e = "0" + e), n3 = 0; n3 < e.length; n3 += 2)
          i.push(parseInt(e[n3] + e[n3 + 1], 16));
    } else
      for (var s = 0, n3 = 0; n3 < e.length; n3++) {
        var r2 = e.charCodeAt(n3);
        r2 < 128 ? i[s++] = r2 : r2 < 2048 ? (i[s++] = r2 >> 6 | 192, i[s++] = 63 & r2 | 128) : Gn(e, n3) ? (r2 = 65536 + ((1023 & r2) << 10) + (1023 & e.charCodeAt(++n3)), i[s++] = r2 >> 18 | 240, i[s++] = r2 >> 12 & 63 | 128, i[s++] = r2 >> 6 & 63 | 128, i[s++] = 63 & r2 | 128) : (i[s++] = r2 >> 12 | 224, i[s++] = r2 >> 6 & 63 | 128, i[s++] = 63 & r2 | 128);
      }
  else
    for (n3 = 0; n3 < e.length; n3++)
      i[n3] = 0 | e[n3];
  return i;
}, Vn.toHex = function(e) {
  for (var t = "", i = 0; i < e.length; i++)
    t += Wn(e[i].toString(16));
  return t;
}, Vn.htonl = Hn, Vn.toHex32 = function(e, t) {
  for (var i = "", s = 0; s < e.length; s++) {
    var n3 = e[s];
    "little" === t && (n3 = Hn(n3)), i += qn(n3.toString(16));
  }
  return i;
}, Vn.zero2 = Wn, Vn.zero8 = qn, Vn.join32 = function(e, t, i, s) {
  var n3 = i - t;
  jn(n3 % 4 == 0);
  for (var r2 = new Array(n3 / 4), a2 = 0, o2 = t; a2 < r2.length; a2++, o2 += 4) {
    var l2;
    l2 = "big" === s ? e[o2] << 24 | e[o2 + 1] << 16 | e[o2 + 2] << 8 | e[o2 + 3] : e[o2 + 3] << 24 | e[o2 + 2] << 16 | e[o2 + 1] << 8 | e[o2], r2[a2] = l2 >>> 0;
  }
  return r2;
}, Vn.split32 = function(e, t) {
  for (var i = new Array(4 * e.length), s = 0, n3 = 0; s < e.length; s++, n3 += 4) {
    var r2 = e[s];
    "big" === t ? (i[n3] = r2 >>> 24, i[n3 + 1] = r2 >>> 16 & 255, i[n3 + 2] = r2 >>> 8 & 255, i[n3 + 3] = 255 & r2) : (i[n3 + 3] = r2 >>> 24, i[n3 + 2] = r2 >>> 16 & 255, i[n3 + 1] = r2 >>> 8 & 255, i[n3] = 255 & r2);
  }
  return i;
}, Vn.rotr32 = function(e, t) {
  return e >>> t | e << 32 - t;
}, Vn.rotl32 = function(e, t) {
  return e << t | e >>> 32 - t;
}, Vn.sum32 = function(e, t) {
  return e + t >>> 0;
}, Vn.sum32_3 = function(e, t, i) {
  return e + t + i >>> 0;
}, Vn.sum32_4 = function(e, t, i, s) {
  return e + t + i + s >>> 0;
}, Vn.sum32_5 = function(e, t, i, s, n3) {
  return e + t + i + s + n3 >>> 0;
}, Vn.sum64 = function(e, t, i, s) {
  var n3 = e[t], r2 = s + e[t + 1] >>> 0, a2 = (r2 < s ? 1 : 0) + i + n3;
  e[t] = a2 >>> 0, e[t + 1] = r2;
}, Vn.sum64_hi = function(e, t, i, s) {
  return (t + s >>> 0 < t ? 1 : 0) + e + i >>> 0;
}, Vn.sum64_lo = function(e, t, i, s) {
  return t + s >>> 0;
}, Vn.sum64_4_hi = function(e, t, i, s, n3, r2, a2, o2) {
  var l2 = 0, h2 = t;
  return l2 += (h2 = h2 + s >>> 0) < t ? 1 : 0, l2 += (h2 = h2 + r2 >>> 0) < r2 ? 1 : 0, e + i + n3 + a2 + (l2 += (h2 = h2 + o2 >>> 0) < o2 ? 1 : 0) >>> 0;
}, Vn.sum64_4_lo = function(e, t, i, s, n3, r2, a2, o2) {
  return t + s + r2 + o2 >>> 0;
}, Vn.sum64_5_hi = function(e, t, i, s, n3, r2, a2, o2, l2, h2) {
  var c2 = 0, u2 = t;
  return c2 += (u2 = u2 + s >>> 0) < t ? 1 : 0, c2 += (u2 = u2 + r2 >>> 0) < r2 ? 1 : 0, c2 += (u2 = u2 + o2 >>> 0) < o2 ? 1 : 0, e + i + n3 + a2 + l2 + (c2 += (u2 = u2 + h2 >>> 0) < h2 ? 1 : 0) >>> 0;
}, Vn.sum64_5_lo = function(e, t, i, s, n3, r2, a2, o2, l2, h2) {
  return t + s + r2 + o2 + h2 >>> 0;
}, Vn.rotr64_hi = function(e, t, i) {
  return (t << 32 - i | e >>> i) >>> 0;
}, Vn.rotr64_lo = function(e, t, i) {
  return (e << 32 - i | t >>> i) >>> 0;
}, Vn.shr64_hi = function(e, t, i) {
  return e >>> i;
}, Vn.shr64_lo = function(e, t, i) {
  return (e << 32 - i | t >>> i) >>> 0;
};
var Kn = {};
var Xn = Vn;
var Yn = Bn;
function Qn() {
  this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32;
}
Kn.BlockHash = Qn, Qn.prototype.update = function(e, t) {
  if (e = Xn.toArray(e, t), this.pending ? this.pending = this.pending.concat(e) : this.pending = e, this.pendingTotal += e.length, this.pending.length >= this._delta8) {
    var i = (e = this.pending).length % this._delta8;
    this.pending = e.slice(e.length - i, e.length), 0 === this.pending.length && (this.pending = null), e = Xn.join32(e, 0, e.length - i, this.endian);
    for (var s = 0; s < e.length; s += this._delta32)
      this._update(e, s, s + this._delta32);
  }
  return this;
}, Qn.prototype.digest = function(e) {
  return this.update(this._pad()), Yn(null === this.pending), this._digest(e);
}, Qn.prototype._pad = function() {
  var e = this.pendingTotal, t = this._delta8, i = t - (e + this.padLength) % t, s = new Array(i + this.padLength);
  s[0] = 128;
  for (var n3 = 1; n3 < i; n3++)
    s[n3] = 0;
  if (e <<= 3, "big" === this.endian) {
    for (var r2 = 8; r2 < this.padLength; r2++)
      s[n3++] = 0;
    s[n3++] = 0, s[n3++] = 0, s[n3++] = 0, s[n3++] = 0, s[n3++] = e >>> 24 & 255, s[n3++] = e >>> 16 & 255, s[n3++] = e >>> 8 & 255, s[n3++] = 255 & e;
  } else
    for (s[n3++] = 255 & e, s[n3++] = e >>> 8 & 255, s[n3++] = e >>> 16 & 255, s[n3++] = e >>> 24 & 255, s[n3++] = 0, s[n3++] = 0, s[n3++] = 0, s[n3++] = 0, r2 = 8; r2 < this.padLength; r2++)
      s[n3++] = 0;
  return s;
};
var Jn = {};
var Zn = Vn.rotr32;
function er(e, t, i) {
  return e & t ^ ~e & i;
}
function tr(e, t, i) {
  return e & t ^ e & i ^ t & i;
}
function ir(e, t, i) {
  return e ^ t ^ i;
}
Jn.ft_1 = function(e, t, i, s) {
  return 0 === e ? er(t, i, s) : 1 === e || 3 === e ? ir(t, i, s) : 2 === e ? tr(t, i, s) : void 0;
}, Jn.ch32 = er, Jn.maj32 = tr, Jn.p32 = ir, Jn.s0_256 = function(e) {
  return Zn(e, 2) ^ Zn(e, 13) ^ Zn(e, 22);
}, Jn.s1_256 = function(e) {
  return Zn(e, 6) ^ Zn(e, 11) ^ Zn(e, 25);
}, Jn.g0_256 = function(e) {
  return Zn(e, 7) ^ Zn(e, 18) ^ e >>> 3;
}, Jn.g1_256 = function(e) {
  return Zn(e, 17) ^ Zn(e, 19) ^ e >>> 10;
};
var sr = Vn;
var nr = Kn;
var rr = Jn;
var ar = Bn;
var or = sr.sum32;
var lr = sr.sum32_4;
var hr = sr.sum32_5;
var cr = rr.ch32;
var ur = rr.maj32;
var dr = rr.s0_256;
var pr = rr.s1_256;
var fr = rr.g0_256;
var mr = rr.g1_256;
var gr = nr.BlockHash;
var yr = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
function xr() {
  if (!(this instanceof xr))
    return new xr();
  gr.call(this), this.h = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], this.k = yr, this.W = new Array(64);
}
sr.inherits(xr, gr);
var Er = xr;
xr.blockSize = 512, xr.outSize = 256, xr.hmacStrength = 192, xr.padLength = 64, xr.prototype._update = function(e, t) {
  for (var i = this.W, s = 0; s < 16; s++)
    i[s] = e[t + s];
  for (; s < i.length; s++)
    i[s] = lr(mr(i[s - 2]), i[s - 7], fr(i[s - 15]), i[s - 16]);
  var n3 = this.h[0], r2 = this.h[1], a2 = this.h[2], o2 = this.h[3], l2 = this.h[4], h2 = this.h[5], c2 = this.h[6], u2 = this.h[7];
  for (ar(this.k.length === i.length), s = 0; s < i.length; s++) {
    var d2 = hr(u2, pr(l2), cr(l2, h2, c2), this.k[s], i[s]), p2 = or(dr(n3), ur(n3, r2, a2));
    u2 = c2, c2 = h2, h2 = l2, l2 = or(o2, d2), o2 = a2, a2 = r2, r2 = n3, n3 = or(d2, p2);
  }
  this.h[0] = or(this.h[0], n3), this.h[1] = or(this.h[1], r2), this.h[2] = or(this.h[2], a2), this.h[3] = or(this.h[3], o2), this.h[4] = or(this.h[4], l2), this.h[5] = or(this.h[5], h2), this.h[6] = or(this.h[6], c2), this.h[7] = or(this.h[7], u2);
}, xr.prototype._digest = function(e) {
  return "hex" === e ? sr.toHex32(this.h, "big") : sr.split32(this.h, "big");
};
var br = Er;
var vr = () => br();
var Sr = { amd: Pr, cjs: Pr, es: Ir, iife: Pr, system: Ir, umd: Pr };
function Ar(e, t, i, s, n3, r2, a2, o2, l2, h2, c2, u2, d2) {
  const p2 = e.slice().reverse();
  for (const e2 of p2)
    e2.scope.addUsedOutsideNames(s, n3, c2, u2);
  !function(e2, t2, i2) {
    for (const s2 of t2) {
      for (const t3 of s2.scope.variables.values())
        t3.included && !(t3.renderBaseName || t3 instanceof Ms && t3.getOriginalVariable() !== t3) && t3.setRenderNames(null, Vt(t3.name, e2));
      if (i2.has(s2)) {
        const t3 = s2.namespace;
        t3.setRenderNames(null, Vt(t3.name, e2));
      }
    }
  }(s, p2, d2), Sr[n3](s, i, t, r2, a2, o2, l2, h2);
  for (const e2 of p2)
    e2.scope.deconflict(n3, c2, u2);
}
function Ir(e, t, i, s, n3, r2, a2, o2) {
  for (const t2 of i.dependencies)
    (n3 || t2 instanceof $e) && (t2.variableName = Vt(t2.suggestedVariableName, e));
  for (const i2 of t) {
    const t2 = i2.module, s2 = i2.name;
    i2.isNamespace && (n3 || t2 instanceof $e) ? i2.setRenderNames(null, (t2 instanceof $e ? t2 : a2.get(t2)).variableName) : t2 instanceof $e && "default" === s2 ? i2.setRenderNames(null, Vt([...t2.exportedVariables].some(([e2, t3]) => "*" === t3 && e2.included) ? t2.suggestedVariableName + "__default" : t2.suggestedVariableName, e)) : i2.setRenderNames(null, Vt(s2, e));
  }
  for (const t2 of o2)
    t2.setRenderNames(null, Vt(t2.name, e));
}
function Pr(e, t, { deconflictedDefault: i, deconflictedNamespace: s, dependencies: n3 }, r2, a2, o2, l2) {
  for (const t2 of n3)
    t2.variableName = Vt(t2.suggestedVariableName, e);
  for (const t2 of s)
    t2.namespaceVariableName = Vt(`${t2.suggestedVariableName}__namespace`, e);
  for (const t2 of i)
    s.has(t2) && ss(String(r2(t2.id)), o2) ? t2.defaultVariableName = t2.namespaceVariableName : t2.defaultVariableName = Vt(`${t2.suggestedVariableName}__default`, e);
  for (const e2 of t) {
    const t2 = e2.module;
    if (t2 instanceof $e) {
      const i2 = e2.name;
      if ("default" === i2) {
        const i3 = String(r2(t2.id)), s2 = es[i3] ? t2.defaultVariableName : t2.variableName;
        ts(i3, o2) ? e2.setRenderNames(s2, "default") : e2.setRenderNames(null, s2);
      } else
        "*" === i2 ? e2.setRenderNames(null, is[String(r2(t2.id))] ? t2.namespaceVariableName : t2.variableName) : e2.setRenderNames(t2.variableName, null);
    } else {
      const i2 = l2.get(t2);
      a2 && e2.isNamespace ? e2.setRenderNames(null, "default" === i2.exportMode ? i2.namespaceVariableName : i2.variableName) : "default" === i2.exportMode ? e2.setRenderNames(null, i2.variableName) : e2.setRenderNames(i2.variableName, i2.getVariableExportName(e2));
    }
  }
}
var kr = /[\\'\r\n\u2028\u2029]/;
var wr = /(['\r\n\u2028\u2029])/g;
var Cr = /\\/g;
function _r(e) {
  return e.match(kr) ? e.replace(Cr, "\\\\").replace(wr, "\\$1") : e;
}
function Nr(e, { exports: t, name: i, format: s }, n3, r2, a2) {
  const o2 = e.getExportNames();
  if ("default" === t) {
    if (1 !== o2.length || "default" !== o2[0])
      return pe(ye("default", o2, r2));
  } else if ("none" === t && o2.length)
    return pe(ye("none", o2, r2));
  return "auto" === t && (0 === o2.length ? t = "none" : 1 === o2.length && "default" === o2[0] ? ("cjs" === s && n3.has("exports") && a2(function(e2) {
    const t2 = he(e2);
    return { code: me.PREFER_NAMED_EXPORTS, id: e2, message: `Entry module "${t2}" is implicitly using "default" export mode, which means for CommonJS output that its default export is assigned to "module.exports". For many tools, such CommonJS output will not be interchangeable with the original ES module. If this is intended, explicitly set "output.exports" to either "auto" or "default", otherwise you might want to consider changing the signature of "${t2}" to use named exports only.`, url: "https://rollupjs.org/guide/en/#outputexports" };
  }(r2)), t = "default") : ("es" !== s && "system" !== s && o2.includes("default") && a2(function(e2, t2) {
    return { code: me.MIXED_EXPORTS, id: e2, message: `Entry module "${he(e2)}" is using named and default exports together. Consumers of your bundle will have to use \`${t2 || "chunk"}["default"]\` to access the default export, which may not be what you want. Use \`output.exports: "named"\` to disable this warning`, url: "https://rollupjs.org/guide/en/#outputexports" };
  }(r2, i)), t = "named")), t;
}
function $r(e) {
  const t = e.split("\n"), i = t.filter((e2) => /^\t+/.test(e2)), s = t.filter((e2) => /^ {2,}/.test(e2));
  if (0 === i.length && 0 === s.length)
    return null;
  if (i.length >= s.length)
    return "	";
  const n3 = s.reduce((e2, t2) => {
    const i2 = /^ +/.exec(t2)[0].length;
    return Math.min(i2, e2);
  }, 1 / 0);
  return new Array(n3 + 1).join(" ");
}
function Tr(e, t, i, s, n3) {
  const r2 = e.getDependenciesToBeIncluded();
  for (const e2 of r2) {
    if (e2 instanceof $e) {
      t.push(e2);
      continue;
    }
    const r3 = n3.get(e2);
    r3 === s ? i.has(e2) || (i.add(e2), Tr(e2, t, i, s, n3)) : t.push(r3);
  }
}
function Or(e) {
  if (!e)
    return null;
  if ("string" == typeof e && (e = JSON.parse(e)), "" === e.mappings)
    return { mappings: [], names: [], sources: [], version: 3 };
  const i = "string" == typeof e.mappings ? function(e2) {
    for (var i2 = [], s = [], r2 = [0, 0, 0, 0, 0], a2 = 0, o2 = 0, l2 = 0, h2 = 0; o2 < e2.length; o2++) {
      var c2 = e2.charCodeAt(o2);
      if (44 === c2)
        n(s, r2, a2), a2 = 0;
      else if (59 === c2)
        n(s, r2, a2), a2 = 0, i2.push(s), s = [], r2[0] = 0;
      else {
        var u2 = t[c2];
        if (void 0 === u2)
          throw new Error("Invalid character (" + String.fromCharCode(c2) + ")");
        var d2 = 32 & u2;
        if (h2 += (u2 &= 31) << l2, d2)
          l2 += 5;
        else {
          var p2 = 1 & h2;
          h2 >>>= 1, p2 && (h2 = 0 === h2 ? -2147483648 : -h2), r2[a2] += h2, a2++, h2 = l2 = 0;
        }
      }
    }
    return n(s, r2, a2), i2.push(s), i2;
  }(e.mappings) : e.mappings;
  return { ...e, mappings: i };
}
var Rr = Symbol("bundleKeys");
var Mr = { type: "placeholder" };
function Dr(e, t, i) {
  return ce(e) ? pe(Ae(`Invalid pattern "${e}" for "${t}", patterns can be neither absolute nor relative paths. If you want your files to be stored in a subdirectory, write its name without a leading slash like this: subdirectory/pattern.`)) : e.replace(/\[(\w+)\]/g, (e2, s) => {
    if (!i.hasOwnProperty(s))
      return pe(Ae(`"[${s}]" is not a valid placeholder in "${t}" pattern.`));
    const n3 = i[s]();
    return ce(n3) ? pe(Ae(`Invalid substitution "${n3}" for placeholder "[${s}]" in "${t}" pattern, can be neither absolute nor relative path.`)) : n3;
  });
}
function Lr(e, { [Rr]: t }) {
  if (!t.has(e.toLowerCase()))
    return e;
  const i = $(e);
  e = e.substring(0, e.length - i.length);
  let s, n3 = 1;
  for (; t.has((s = e + ++n3 + i).toLowerCase()); )
    ;
  return s;
}
var Vr = [".js", ".jsx", ".ts", ".tsx"];
function Br(e, t, i, s) {
  const n3 = "function" == typeof t ? t(e.id) : t[e.id];
  return n3 || (i ? (s({ code: "MISSING_GLOBAL_NAME", guess: e.variableName, message: `No name was provided for external module '${e.id}' in output.globals \u2013 guessing '${e.variableName}'`, source: e.id }), e.variableName) : void 0);
}
var Fr = class {
  constructor(e, t, i, s, n3, r2, a2, o2, l2, h2) {
    this.orderedModules = e, this.inputOptions = t, this.outputOptions = i, this.unsetOptions = s, this.pluginDriver = n3, this.modulesById = r2, this.chunkByModule = a2, this.facadeChunkByModule = o2, this.includedNamespaces = l2, this.manualChunkAlias = h2, this.entryModules = [], this.exportMode = "named", this.facadeModule = null, this.id = null, this.namespaceVariableName = "", this.needsExportsShim = false, this.variableName = "", this.accessedGlobalsByScope = /* @__PURE__ */ new Map(), this.dependencies = /* @__PURE__ */ new Set(), this.dynamicDependencies = /* @__PURE__ */ new Set(), this.dynamicEntryModules = [], this.dynamicName = null, this.exportNamesByVariable = /* @__PURE__ */ new Map(), this.exports = /* @__PURE__ */ new Set(), this.exportsByName = /* @__PURE__ */ new Map(), this.fileName = null, this.implicitEntryModules = [], this.implicitlyLoadedBefore = /* @__PURE__ */ new Set(), this.imports = /* @__PURE__ */ new Set(), this.includedReexportsByModule = /* @__PURE__ */ new Map(), this.indentString = void 0, this.isEmpty = true, this.name = null, this.renderedDependencies = null, this.renderedExports = null, this.renderedHash = void 0, this.renderedModuleSources = /* @__PURE__ */ new Map(), this.renderedModules = /* @__PURE__ */ Object.create(null), this.renderedSource = null, this.sortedExportNames = null, this.strictFacade = false, this.usedModules = void 0, this.execIndex = e.length > 0 ? e[0].execIndex : 1 / 0;
    const c2 = new Set(e);
    for (const t2 of e) {
      t2.namespace.included && l2.add(t2), this.isEmpty && t2.isIncluded() && (this.isEmpty = false), (t2.info.isEntry || i.preserveModules) && this.entryModules.push(t2);
      for (const e2 of t2.includedDynamicImporters)
        c2.has(e2) || (this.dynamicEntryModules.push(t2), t2.info.syntheticNamedExports && !i.preserveModules && (l2.add(t2), this.exports.add(t2.namespace)));
      t2.implicitlyLoadedAfter.size > 0 && this.implicitEntryModules.push(t2);
    }
    this.suggestedVariableName = Ne(this.generateVariableName());
  }
  static generateFacade(e, t, i, s, n3, r2, a2, o2, l2, h2) {
    const c2 = new Fr([], e, t, i, s, n3, r2, a2, o2, null);
    c2.assignFacadeName(h2, l2), a2.has(l2) || a2.set(l2, c2);
    for (const e2 of l2.getDependenciesToBeIncluded())
      c2.dependencies.add(e2 instanceof ln ? r2.get(e2) : e2);
    return !c2.dependencies.has(r2.get(l2)) && l2.info.moduleSideEffects && l2.hasEffects() && c2.dependencies.add(r2.get(l2)), c2.ensureReexportsAreAvailableForModule(l2), c2.facadeModule = l2, c2.strictFacade = true, c2;
  }
  canModuleBeFacade(e, t) {
    const i = e.getExportNamesByVariable();
    for (const t2 of this.exports)
      if (!i.has(t2))
        return 0 === i.size && e.isUserDefinedEntryPoint && "strict" === e.preserveSignature && this.unsetOptions.has("preserveEntrySignatures") && this.inputOptions.onwarn({ code: "EMPTY_FACADE", id: e.id, message: `To preserve the export signature of the entry module "${he(e.id)}", an empty facade chunk was created. This often happens when creating a bundle for a web app where chunks are placed in script tags and exports are ignored. In this case it is recommended to set "preserveEntrySignatures: false" to avoid this and reduce the number of chunks. Otherwise if this is intentional, set "preserveEntrySignatures: 'strict'" explicitly to silence this warning.`, url: "https://rollupjs.org/guide/en/#preserveentrysignatures" }), false;
    for (const s of t)
      if (!i.has(s) && s.module !== e)
        return false;
    return true;
  }
  generateExports() {
    this.sortedExportNames = null;
    const e = new Set(this.exports);
    if (null !== this.facadeModule && (false !== this.facadeModule.preserveSignature || this.strictFacade)) {
      const t = this.facadeModule.getExportNamesByVariable();
      for (const [i, s] of t) {
        this.exportNamesByVariable.set(i, [...s]);
        for (const e2 of s)
          this.exportsByName.set(e2, i);
        e.delete(i);
      }
    }
    this.outputOptions.minifyInternalExports ? function(e2, t, i) {
      let s = 0;
      for (const n3 of e2) {
        let [e3] = n3.name;
        if (t.has(e3))
          do {
            e3 = Lt(++s), 49 === e3.charCodeAt(0) && (s += 9 * 64 ** (e3.length - 1), e3 = Lt(s));
          } while (we.has(e3) || t.has(e3));
        t.set(e3, n3), i.set(n3, [e3]);
      }
    }(e, this.exportsByName, this.exportNamesByVariable) : function(e2, t, i) {
      for (const s of e2) {
        let e3 = 0, n3 = s.name;
        for (; t.has(n3); )
          n3 = s.name + "$" + ++e3;
        t.set(n3, s), i.set(s, [n3]);
      }
    }(e, this.exportsByName, this.exportNamesByVariable), (this.outputOptions.preserveModules || this.facadeModule && this.facadeModule.info.isEntry) && (this.exportMode = Nr(this, this.outputOptions, this.unsetOptions, this.facadeModule.id, this.inputOptions.onwarn));
  }
  generateFacades() {
    var e;
    const t = [], i = /* @__PURE__ */ new Set([...this.entryModules, ...this.implicitEntryModules]), s = new Set(this.dynamicEntryModules.map(({ namespace: e2 }) => e2));
    for (const e2 of i)
      if (e2.preserveSignature)
        for (const t2 of e2.getExportNamesByVariable().keys())
          s.add(t2);
    for (const e2 of i) {
      const i2 = Array.from(new Set(e2.chunkNames.filter(({ isUserDefined: e3 }) => e3).map(({ name: e3 }) => e3)), (e3) => ({ name: e3 }));
      if (0 === i2.length && e2.isUserDefinedEntryPoint && i2.push({}), i2.push(...Array.from(e2.chunkFileNames, (e3) => ({ fileName: e3 }))), 0 === i2.length && i2.push({}), !this.facadeModule) {
        const t2 = "strict" === e2.preserveSignature || "exports-only" === e2.preserveSignature && 0 !== e2.getExportNamesByVariable().size;
        (!t2 || this.outputOptions.preserveModules || this.canModuleBeFacade(e2, s)) && (this.facadeModule = e2, this.facadeChunkByModule.set(e2, this), e2.preserveSignature && (this.strictFacade = t2), this.assignFacadeName(i2.shift(), e2));
      }
      for (const s2 of i2)
        t.push(Fr.generateFacade(this.inputOptions, this.outputOptions, this.unsetOptions, this.pluginDriver, this.modulesById, this.chunkByModule, this.facadeChunkByModule, this.includedNamespaces, e2, s2));
    }
    for (const t2 of this.dynamicEntryModules)
      t2.info.syntheticNamedExports || (!this.facadeModule && this.canModuleBeFacade(t2, s) ? (this.facadeModule = t2, this.facadeChunkByModule.set(t2, this), this.strictFacade = true, this.dynamicName = zr(t2)) : this.facadeModule === t2 && !this.strictFacade && this.canModuleBeFacade(t2, s) ? this.strictFacade = true : (null === (e = this.facadeChunkByModule.get(t2)) || void 0 === e ? void 0 : e.strictFacade) || (this.includedNamespaces.add(t2), this.exports.add(t2.namespace)));
    return this.outputOptions.preserveModules || this.addNecessaryImportsForFacades(), t;
  }
  generateId(e, t, i, s) {
    if (null !== this.fileName)
      return this.fileName;
    const [n3, r2] = this.facadeModule && this.facadeModule.isUserDefinedEntryPoint ? [t.entryFileNames, "output.entryFileNames"] : [t.chunkFileNames, "output.chunkFileNames"];
    return Lr(Dr("function" == typeof n3 ? n3(this.getChunkInfo()) : n3, r2, { format: () => t.format, hash: () => s ? this.computeContentHashWithDependencies(e, t, i) : "[hash]", name: () => this.getChunkName() }), i);
  }
  generateIdPreserveModules(e, t, i, s) {
    const [{ id: n3 }] = this.orderedModules, r2 = this.outputOptions.sanitizeFileName(n3.split(jr, 1)[0]);
    let a2;
    const o2 = s.has("entryFileNames") ? "[name][assetExtname].js" : t.entryFileNames, l2 = "function" == typeof o2 ? o2(this.getChunkInfo()) : o2;
    if (k(r2)) {
      const i2 = N(r2), s2 = $(r2), n4 = `${i2}/${Dr(l2, "output.entryFileNames", { assetExtname: () => Vr.includes(s2) ? "" : s2, ext: () => s2.substring(1), extname: () => s2, format: () => t.format, name: () => this.getChunkName() })}`, { preserveModulesRoot: o3 } = t;
      a2 = o3 && O(n4).startsWith(o3) ? n4.slice(o3.length).replace(/^[\\/]/, "") : T(e, n4);
    } else {
      const e2 = $(r2);
      a2 = `_virtual/${Dr(l2, "output.entryFileNames", { assetExtname: () => Vr.includes(e2) ? "" : e2, ext: () => e2.substring(1), extname: () => e2, format: () => t.format, name: () => le(r2) })}`;
    }
    return Lr(C(a2), i);
  }
  getChunkInfo() {
    const e = this.facadeModule, t = this.getChunkName.bind(this);
    return { exports: this.getExportNames(), facadeModuleId: e && e.id, isDynamicEntry: this.dynamicEntryModules.length > 0, isEntry: null !== e && e.info.isEntry, isImplicitEntry: this.implicitEntryModules.length > 0, modules: this.renderedModules, get name() {
      return t();
    }, type: "chunk" };
  }
  getChunkInfoWithFileNames() {
    return Object.assign(this.getChunkInfo(), { code: void 0, dynamicImports: Array.from(this.dynamicDependencies, Hs), fileName: this.id, implicitlyLoadedBefore: Array.from(this.implicitlyLoadedBefore, Hs), importedBindings: this.getImportedBindingsPerDependency(), imports: Array.from(this.dependencies, Hs), map: void 0, referencedFiles: this.getReferencedFiles() });
  }
  getChunkName() {
    var e;
    return null !== (e = this.name) && void 0 !== e ? e : this.name = this.outputOptions.sanitizeFileName(this.getFallbackChunkName());
  }
  getExportNames() {
    var e;
    return null !== (e = this.sortedExportNames) && void 0 !== e ? e : this.sortedExportNames = Array.from(this.exportsByName.keys()).sort();
  }
  getRenderedHash() {
    if (this.renderedHash)
      return this.renderedHash;
    const e = vr(), t = this.pluginDriver.hookReduceValueSync("augmentChunkHash", "", [this.getChunkInfo()], (e2, t2) => (t2 && (e2 += t2), e2));
    return e.update(t), e.update(this.renderedSource.toString()), e.update(this.getExportNames().map((e2) => {
      const t2 = this.exportsByName.get(e2);
      return `${he(t2.module.id).replace(/\\/g, "/")}:${t2.name}:${e2}`;
    }).join(",")), this.renderedHash = e.digest("hex");
  }
  getVariableExportName(e) {
    return this.outputOptions.preserveModules && e instanceof js ? "*" : this.exportNamesByVariable.get(e)[0];
  }
  link() {
    this.dependencies = function(e, t, i) {
      const s = [], n3 = /* @__PURE__ */ new Set();
      for (let r3 = t.length - 1; r3 >= 0; r3--) {
        const a2 = t[r3];
        if (!n3.has(a2)) {
          const t2 = [];
          Tr(a2, t2, n3, e, i), s.unshift(t2);
        }
      }
      const r2 = /* @__PURE__ */ new Set();
      for (const e2 of s)
        for (const t2 of e2)
          r2.add(t2);
      return r2;
    }(this, this.orderedModules, this.chunkByModule);
    for (const e of this.orderedModules)
      this.addDependenciesToChunk(e.dynamicDependencies, this.dynamicDependencies), this.addDependenciesToChunk(e.implicitlyLoadedBefore, this.implicitlyLoadedBefore), this.setUpChunkImportsAndExportsForModule(e);
  }
  preRender(e, t, i) {
    const { _: s, getPropertyAccess: n3, n: r2 } = i, a2 = new b({ separator: `${r2}${r2}` });
    this.usedModules = [], this.indentString = function(e2, t2) {
      if (true !== t2.indent)
        return t2.indent;
      for (const t3 of e2) {
        const e3 = $r(t3.originalCode);
        if (null !== e3)
          return e3;
      }
      return "	";
    }(this.orderedModules, e);
    const o2 = { dynamicImportFunction: e.dynamicImportFunction, exportNamesByVariable: this.exportNamesByVariable, format: e.format, freeze: e.freeze, indent: this.indentString, namespaceToStringTag: e.namespaceToStringTag, outputPluginDriver: this.pluginDriver, snippets: i };
    if (e.hoistTransitiveImports && !this.outputOptions.preserveModules && null !== this.facadeModule)
      for (const e2 of this.dependencies)
        e2 instanceof Fr && this.inlineChunkDependencies(e2);
    this.prepareModulesForRendering(i), this.setIdentifierRenderResolutions(e);
    let l2 = "";
    const h2 = this.renderedModules;
    for (const t2 of this.orderedModules) {
      let i2 = 0;
      if (t2.isIncluded() || this.includedNamespaces.has(t2)) {
        const s3 = t2.render(o2).trim();
        i2 = s3.length(), i2 && (e.compact && s3.lastLine().includes("//") && s3.append("\n"), this.renderedModuleSources.set(t2, s3), a2.addSource(s3), this.usedModules.push(t2));
        const n5 = t2.namespace;
        if (this.includedNamespaces.has(t2) && !this.outputOptions.preserveModules) {
          const e2 = n5.renderBlock(o2);
          n5.renderFirst() ? l2 += r2 + e2 : a2.addSource(new x(e2));
        }
      }
      const { renderedExports: s2, removedExports: n4 } = t2.getRenderedExports(), { renderedModuleSources: c2 } = this;
      h2[t2.id] = { get code() {
        var e2, i3;
        return null !== (i3 = null === (e2 = c2.get(t2)) || void 0 === e2 ? void 0 : e2.toString()) && void 0 !== i3 ? i3 : null;
      }, originalLength: t2.originalCode.length, removedExports: n4, renderedExports: s2, renderedLength: i2 };
    }
    if (l2 && a2.prepend(l2 + r2 + r2), this.needsExportsShim && a2.prepend(`${r2}${i.cnst} _missingExportShim${s}=${s}void 0;${r2}${r2}`), e.compact ? this.renderedSource = a2 : this.renderedSource = a2.trim(), this.renderedHash = void 0, this.isEmpty && 0 === this.getExportNames().length && 0 === this.dependencies.size) {
      const e2 = this.getChunkName();
      this.inputOptions.onwarn({ chunkName: e2, code: "EMPTY_BUNDLE", message: `Generated an empty chunk: "${e2}"` });
    }
    this.setExternalRenderPaths(e, t), this.renderedDependencies = this.getChunkDependencyDeclarations(e, n3), this.renderedExports = "none" === this.exportMode ? [] : this.getChunkExportDeclarations(e.format, n3);
  }
  async render(e, t, i, s) {
    en("render format", 2);
    const n3 = e.format, r2 = On[n3];
    e.dynamicImportFunction && "es" !== n3 && this.inputOptions.onwarn(xe("output.dynamicImportFunction", "outputdynamicImportFunction", 'this option is ignored for formats other than "es"'));
    for (const e2 of this.dependencies) {
      const t2 = this.renderedDependencies.get(e2);
      if (e2 instanceof $e) {
        const i2 = e2.renderPath;
        t2.id = _r(e2.renormalizeRenderPath ? de(this.id, i2, false, false) : i2);
      } else
        t2.namedExportsMode = "default" !== e2.exportMode, t2.id = _r(de(this.id, e2.id, false, true));
    }
    this.finaliseDynamicImports(e, s), this.finaliseImportMetas(n3, s);
    const a2 = 0 !== this.renderedExports.length || [...this.renderedDependencies.values()].some((e2) => e2.reexports && 0 !== e2.reexports.length);
    let o2 = null;
    const l2 = /* @__PURE__ */ new Set();
    for (const e2 of this.orderedModules) {
      e2.usesTopLevelAwait && (o2 = e2.id);
      const t2 = this.accessedGlobalsByScope.get(e2.scope);
      if (t2)
        for (const e3 of t2)
          l2.add(e3);
    }
    if (null !== o2 && "es" !== n3 && "system" !== n3)
      return pe({ code: "INVALID_TLA_FORMAT", id: o2, message: `Module format ${n3} does not support top-level await. Use the "es" or "system" output formats rather.` });
    if (!this.id)
      throw new Error("Internal Error: expecting chunk id");
    const c2 = r2(this.renderedSource, { accessedGlobals: l2, dependencies: [...this.renderedDependencies.values()], exports: this.renderedExports, hasExports: a2, id: this.id, indent: this.indentString, intro: t.intro, isEntryFacade: this.outputOptions.preserveModules || null !== this.facadeModule && this.facadeModule.info.isEntry, isModuleFacade: null !== this.facadeModule, namedExportsMode: "default" !== this.exportMode, outro: t.outro, snippets: s, usesTopLevelAwait: null !== o2, warn: this.inputOptions.onwarn }, e);
    t.banner && c2.prepend(t.banner), t.footer && c2.append(t.footer);
    const u2 = c2.toString();
    tn("render format", 2);
    let d2 = null;
    const p2 = [];
    let f2 = await function({ code: e2, options: t2, outputPluginDriver: i2, renderChunk: s2, sourcemapChain: n4 }) {
      return i2.hookReduceArg0("renderChunk", [e2, s2, t2], (e3, t3, i3) => {
        if (null == t3)
          return e3;
        if ("string" == typeof t3 && (t3 = { code: t3, map: void 0 }), null !== t3.map) {
          const e4 = Or(t3.map);
          n4.push(e4 || { missing: true, plugin: i3.name });
        }
        return t3.code;
      });
    }({ code: u2, options: e, outputPluginDriver: this.pluginDriver, renderChunk: i, sourcemapChain: p2 });
    if (e.sourcemap) {
      let t2;
      en("sourcemap", 2), t2 = e.file ? O(e.sourcemapFile || e.file) : e.dir ? O(e.dir, this.id) : O(this.id);
      const i2 = c2.generateDecodedMap({});
      d2 = function(e2, t3, i3, s2, n4, r3) {
        const a3 = Dn(r3), o3 = i3.filter((e3) => !e3.excludeFromSourcemap).map((e3) => Ln(e3.id, e3.originalCode, e3.originalSourcemap, e3.sourcemapChain, a3)), l3 = new Mn(t3, o3), c3 = s2.reduce(a3, l3);
        let { sources: u3, sourcesContent: d3, names: p3, mappings: f3 } = c3.traceMappings();
        if (e2) {
          const t4 = N(e2);
          u3 = u3.map((e3) => T(t4, e3)), e2 = _(e2);
        }
        return d3 = n4 ? null : d3, new h({ file: e2, mappings: f3, names: p3, sources: u3, sourcesContent: d3 });
      }(t2, i2, this.usedModules, p2, e.sourcemapExcludeSources, this.inputOptions.onwarn), d2.sources = d2.sources.map((i3) => {
        const { sourcemapPathTransform: s2 } = e;
        if (s2) {
          const e2 = s2(i3, `${t2}.map`);
          return "string" != typeof e2 && pe(Ae("sourcemapPathTransform function must return a string.")), e2;
        }
        return i3;
      }).map(C), tn("sourcemap", 2);
    }
    return e.compact || "\n" === f2[f2.length - 1] || (f2 += "\n"), { code: f2, map: d2 };
  }
  addDependenciesToChunk(e, t) {
    for (const i of e)
      if (i instanceof ln) {
        const e2 = this.chunkByModule.get(i);
        e2 && e2 !== this && t.add(e2);
      } else
        t.add(i);
  }
  addNecessaryImportsForFacades() {
    for (const [e, t] of this.includedReexportsByModule)
      if (this.includedNamespaces.has(e))
        for (const e2 of t)
          this.imports.add(e2);
  }
  assignFacadeName({ fileName: e, name: t }, i) {
    e ? this.fileName = e : this.name = this.outputOptions.sanitizeFileName(t || zr(i));
  }
  checkCircularDependencyImport(e, t) {
    const i = e.module;
    if (i instanceof ln) {
      const o2 = this.chunkByModule.get(i);
      let l2;
      do {
        if (l2 = t.alternativeReexportModules.get(e), l2) {
          const h2 = this.chunkByModule.get(l2);
          h2 && h2 !== o2 && this.inputOptions.onwarn((s = i.getExportNamesByVariable().get(e)[0], n3 = i.id, r2 = l2.id, a2 = t.id, { code: me.CYCLIC_CROSS_CHUNK_REEXPORT, exporter: n3, importer: a2, message: `Export "${s}" of module ${he(n3)} was reexported through module ${he(r2)} while both modules are dependencies of each other and will end up in different chunks by current Rollup settings. This scenario is not well supported at the moment as it will produce a circular dependency between chunks and will likely lead to broken execution order.
Either change the import in ${he(a2)} to point directly to the exporting module or do not use "preserveModules" to ensure these modules end up in the same chunk.`, reexporter: r2 })), t = l2;
        }
      } while (l2);
    }
    var s, n3, r2, a2;
  }
  computeContentHashWithDependencies(e, t, i) {
    const s = vr();
    s.update([e.intro, e.outro, e.banner, e.footer].join(":")), s.update(t.format);
    const n3 = /* @__PURE__ */ new Set([this]);
    for (const r2 of n3)
      if (r2 instanceof $e ? s.update(`:${r2.renderPath}`) : (s.update(r2.getRenderedHash()), s.update(r2.generateId(e, t, i, false))), !(r2 instanceof $e))
        for (const e2 of [...r2.dependencies, ...r2.dynamicDependencies])
          n3.add(e2);
    return s.digest("hex").substr(0, 8);
  }
  ensureReexportsAreAvailableForModule(e) {
    const t = [], i = e.getExportNamesByVariable();
    for (const s of i.keys()) {
      const i2 = s instanceof Us, n3 = i2 ? s.getBaseVariable() : s;
      if (!(n3 instanceof js && this.outputOptions.preserveModules)) {
        this.checkCircularDependencyImport(n3, e);
        const s2 = n3.module;
        if (s2 instanceof ln) {
          const e2 = this.chunkByModule.get(s2);
          e2 && e2 !== this && (e2.exports.add(n3), t.push(n3), i2 && this.imports.add(n3));
        }
      }
    }
    t.length && this.includedReexportsByModule.set(e, t);
  }
  finaliseDynamicImports(e, t) {
    const i = "amd" === e.format && !e.amd.forceJsExtensionForImports;
    for (const [e2, s] of this.renderedModuleSources)
      for (const { node: n3, resolution: r2 } of e2.dynamicImports) {
        const e3 = this.chunkByModule.get(r2), a2 = this.facadeChunkByModule.get(r2);
        if (!r2 || !n3.included || e3 === this)
          continue;
        const o2 = r2 instanceof ln ? `'${_r(de(this.id, (a2 || e3).id, i, true))}'` : r2 instanceof $e ? `'${_r(r2.renormalizeRenderPath ? de(this.id, r2.renderPath, i, false) : r2.renderPath)}'` : r2;
        n3.renderFinalResolution(s, o2, r2 instanceof ln && !(null == a2 ? void 0 : a2.strictFacade) && e3.exportNamesByVariable.get(r2.namespace)[0], t);
      }
  }
  finaliseImportMetas(e, t) {
    for (const [i, s] of this.renderedModuleSources)
      for (const n3 of i.importMetas)
        n3.renderFinalMechanism(s, this.id, e, t, this.pluginDriver);
  }
  generateVariableName() {
    if (this.manualChunkAlias)
      return this.manualChunkAlias;
    const e = this.entryModules[0] || this.implicitEntryModules[0] || this.dynamicEntryModules[0] || this.orderedModules[this.orderedModules.length - 1];
    return e ? zr(e) : "chunk";
  }
  getChunkDependencyDeclarations(e, t) {
    const i = this.getImportSpecifiers(t), s = this.getReexportSpecifiers(), n3 = /* @__PURE__ */ new Map();
    for (const t2 of this.dependencies) {
      const r2 = i.get(t2) || null, a2 = s.get(t2) || null, o2 = t2 instanceof $e || "default" !== t2.exportMode;
      n3.set(t2, { defaultVariableName: t2.defaultVariableName, globalName: t2 instanceof $e && ("umd" === e.format || "iife" === e.format) && Br(t2, e.globals, null !== (r2 || a2), this.inputOptions.onwarn), id: void 0, imports: r2, isChunk: t2 instanceof Fr, name: t2.variableName, namedExportsMode: o2, namespaceVariableName: t2.namespaceVariableName, reexports: a2 });
    }
    return n3;
  }
  getChunkExportDeclarations(e, t) {
    const i = [];
    for (const s of this.getExportNames()) {
      if ("*" === s[0])
        continue;
      const n3 = this.exportsByName.get(s);
      if (!(n3 instanceof Us)) {
        const e2 = n3.module;
        if (e2 && this.chunkByModule.get(e2) !== this)
          continue;
      }
      let r2 = null, a2 = false, o2 = n3.getName(t);
      if (n3 instanceof Dt) {
        for (const e2 of n3.declarations)
          if (e2.parent instanceof qi || e2 instanceof Ki && e2.declaration instanceof qi) {
            a2 = true;
            break;
          }
      } else
        n3 instanceof Us && (r2 = o2, "es" === e && (o2 = n3.renderName));
      i.push({ exported: s, expression: r2, hoisted: a2, local: o2 });
    }
    return i;
  }
  getDependenciesToBeDeconflicted(e, t, i) {
    const s = /* @__PURE__ */ new Set(), n3 = /* @__PURE__ */ new Set(), r2 = /* @__PURE__ */ new Set();
    for (const t2 of [...this.exportNamesByVariable.keys(), ...this.imports])
      if (e || t2.isNamespace) {
        const a2 = t2.module;
        if (a2 instanceof $e)
          s.add(a2), e && ("default" === t2.name ? es[String(i(a2.id))] && n3.add(a2) : "*" === t2.name && is[String(i(a2.id))] && r2.add(a2));
        else {
          const i2 = this.chunkByModule.get(a2);
          i2 !== this && (s.add(i2), e && "default" === i2.exportMode && t2.isNamespace && r2.add(i2));
        }
      }
    if (t)
      for (const e2 of this.dependencies)
        s.add(e2);
    return { deconflictedDefault: n3, deconflictedNamespace: r2, dependencies: s };
  }
  getFallbackChunkName() {
    return this.manualChunkAlias ? this.manualChunkAlias : this.dynamicName ? this.dynamicName : this.fileName ? le(this.fileName) : le(this.orderedModules[this.orderedModules.length - 1].id);
  }
  getImportSpecifiers(e) {
    const { interop: t } = this.outputOptions, i = /* @__PURE__ */ new Map();
    for (const s of this.imports) {
      const n3 = s.module;
      let r2, a2;
      if (n3 instanceof $e) {
        if (r2 = n3, a2 = s.name, "default" !== a2 && "*" !== a2 && "defaultOnly" === t(n3.id))
          return pe(ve(n3.id, a2, false));
      } else
        r2 = this.chunkByModule.get(n3), a2 = r2.getVariableExportName(s);
      R(i, r2, () => []).push({ imported: a2, local: s.getName(e) });
    }
    return i;
  }
  getImportedBindingsPerDependency() {
    const e = {};
    for (const [t, i] of this.renderedDependencies) {
      const s = /* @__PURE__ */ new Set();
      if (i.imports)
        for (const { imported: e2 } of i.imports)
          s.add(e2);
      if (i.reexports)
        for (const { imported: e2 } of i.reexports)
          s.add(e2);
      e[t.id] = [...s];
    }
    return e;
  }
  getReexportSpecifiers() {
    const { externalLiveBindings: e, interop: t } = this.outputOptions, i = /* @__PURE__ */ new Map();
    for (let s of this.getExportNames()) {
      let n3, r2, a2 = false;
      if ("*" === s[0]) {
        const i2 = s.substring(1);
        "defaultOnly" === t(i2) && this.inputOptions.onwarn(Se(i2)), a2 = e, n3 = this.modulesById.get(i2), r2 = s = "*";
      } else {
        const i2 = this.exportsByName.get(s);
        if (i2 instanceof Us)
          continue;
        const o2 = i2.module;
        if (o2 instanceof ln) {
          if (n3 = this.chunkByModule.get(o2), n3 === this)
            continue;
          r2 = n3.getVariableExportName(i2), a2 = i2.isReassigned;
        } else {
          if (n3 = o2, r2 = i2.name, "default" !== r2 && "*" !== r2 && "defaultOnly" === t(o2.id))
            return pe(ve(o2.id, r2, true));
          a2 = e && ("default" !== r2 || ts(String(t(o2.id)), true));
        }
      }
      R(i, n3, () => []).push({ imported: r2, needsLiveBinding: a2, reexported: s });
    }
    return i;
  }
  getReferencedFiles() {
    const e = [];
    for (const t of this.orderedModules)
      for (const i of t.importMetas) {
        const t2 = i.getReferencedFileName(this.pluginDriver);
        t2 && e.push(t2);
      }
    return e;
  }
  inlineChunkDependencies(e) {
    for (const t of e.dependencies)
      this.dependencies.has(t) || (this.dependencies.add(t), t instanceof Fr && this.inlineChunkDependencies(t));
  }
  prepareModulesForRendering(e) {
    var t;
    const i = this.accessedGlobalsByScope;
    for (const s of this.orderedModules) {
      for (const { node: n3, resolution: r2 } of s.dynamicImports)
        if (n3.included)
          if (r2 instanceof ln) {
            const s2 = this.chunkByModule.get(r2);
            s2 === this ? n3.setInternalResolution(r2.namespace) : n3.setExternalResolution((null === (t = this.facadeChunkByModule.get(r2)) || void 0 === t ? void 0 : t.exportMode) || s2.exportMode, r2, this.outputOptions, e, this.pluginDriver, i);
          } else
            n3.setExternalResolution("external", r2, this.outputOptions, e, this.pluginDriver, i);
      for (const e2 of s.importMetas)
        e2.addAccessedGlobals(this.outputOptions.format, i);
      this.includedNamespaces.has(s) && !this.outputOptions.preserveModules && s.namespace.prepare(i);
    }
  }
  setExternalRenderPaths(e, t) {
    for (const i of [...this.dependencies, ...this.dynamicDependencies])
      i instanceof $e && i.setRenderPath(e, t);
  }
  setIdentifierRenderResolutions({ format: e, interop: t, namespaceToStringTag: i }) {
    const s = /* @__PURE__ */ new Set();
    for (const t2 of this.getExportNames()) {
      const i2 = this.exportsByName.get(t2);
      "es" !== e && "system" !== e && i2.isReassigned && !i2.isId ? i2.setRenderNames("exports", t2) : i2 instanceof Us ? s.add(i2) : i2.setRenderNames(null, null);
    }
    for (const e2 of this.orderedModules)
      if (e2.needsExportShim) {
        this.needsExportsShim = true;
        break;
      }
    const n3 = /* @__PURE__ */ new Set(["Object", "Promise"]);
    switch (this.needsExportsShim && n3.add("_missingExportShim"), i && n3.add("Symbol"), e) {
      case "system":
        n3.add("module").add("exports");
        break;
      case "es":
        break;
      case "cjs":
        n3.add("module").add("require").add("__filename").add("__dirname");
      default:
        n3.add("exports");
        for (const e2 of ys)
          n3.add(e2);
    }
    Ar(this.orderedModules, this.getDependenciesToBeDeconflicted("es" !== e && "system" !== e, "amd" === e || "umd" === e || "iife" === e, t), this.imports, n3, e, t, this.outputOptions.preserveModules, this.outputOptions.externalLiveBindings, this.chunkByModule, s, this.exportNamesByVariable, this.accessedGlobalsByScope, this.includedNamespaces);
  }
  setUpChunkImportsAndExportsForModule(e) {
    const t = new Set(e.includedImports);
    if (!this.outputOptions.preserveModules && this.includedNamespaces.has(e)) {
      const i = e.namespace.getMemberVariables();
      for (const e2 of Object.values(i))
        t.add(e2);
    }
    for (let i of t) {
      i instanceof Ms && (i = i.getOriginalVariable()), i instanceof Us && (i = i.getBaseVariable());
      const t2 = this.chunkByModule.get(i.module);
      t2 !== this && (this.imports.add(i), !(i instanceof js && this.outputOptions.preserveModules) && i.module instanceof ln && (t2.exports.add(i), this.checkCircularDependencyImport(i, e)));
    }
    (this.includedNamespaces.has(e) || e.info.isEntry && false !== e.preserveSignature || e.includedDynamicImporters.some((e2) => this.chunkByModule.get(e2) !== this)) && this.ensureReexportsAreAvailableForModule(e);
    for (const { node: t2, resolution: i } of e.dynamicImports)
      t2.included && i instanceof ln && this.chunkByModule.get(i) === this && !this.includedNamespaces.has(i) && (this.includedNamespaces.add(i), this.ensureReexportsAreAvailableForModule(i));
  }
};
function zr(e) {
  var t, i, s, n3;
  return null !== (n3 = null !== (i = null === (t = e.chunkNames.find(({ isUserDefined: e2 }) => e2)) || void 0 === t ? void 0 : t.name) && void 0 !== i ? i : null === (s = e.chunkNames[0]) || void 0 === s ? void 0 : s.name) && void 0 !== n3 ? n3 : le(e.id);
}
var jr = /[?#]/;
var Ur = (e, t) => t ? `${e}
${t}` : e;
var Gr = (e, t) => t ? `${e}

${t}` : e;
function Hr(e, t) {
  const i = [], s = new Set(t.keys()), n3 = /* @__PURE__ */ Object.create(null);
  for (const [e2, i2] of t) {
    Wr(e2, n3[i2] = n3[i2] || [], s);
  }
  for (const [e2, t2] of Object.entries(n3))
    i.push({ alias: e2, modules: t2 });
  const r2 = /* @__PURE__ */ new Map(), { dependentEntryPointsByModule: a2, dynamicEntryModules: o2 } = function(e2) {
    const t2 = /* @__PURE__ */ new Set(), i2 = /* @__PURE__ */ new Map(), s2 = new Set(e2);
    for (const e3 of s2) {
      const n4 = /* @__PURE__ */ new Set([e3]);
      for (const r3 of n4) {
        R(i2, r3, () => /* @__PURE__ */ new Set()).add(e3);
        for (const e4 of r3.getDependenciesToBeIncluded())
          e4 instanceof $e || n4.add(e4);
        for (const { resolution: e4 } of r3.dynamicImports)
          e4 instanceof ln && e4.includedDynamicImporters.length > 0 && (t2.add(e4), s2.add(e4));
        for (const e4 of r3.implicitlyLoadedBefore)
          t2.add(e4), s2.add(e4);
      }
    }
    return { dependentEntryPointsByModule: i2, dynamicEntryModules: t2 };
  }(e), l2 = function(e2, t2) {
    const i2 = /* @__PURE__ */ new Map();
    for (const s2 of t2) {
      const t3 = R(i2, s2, () => /* @__PURE__ */ new Set());
      for (const i3 of [...s2.includedDynamicImporters, ...s2.implicitlyLoadedAfter])
        for (const s3 of e2.get(i3))
          t3.add(s3);
    }
    return i2;
  }(a2, o2), h2 = new Set(e);
  function c2(e2, t2) {
    const i2 = /* @__PURE__ */ new Set([e2]);
    for (const n4 of i2) {
      const o3 = R(r2, n4, () => /* @__PURE__ */ new Set());
      if (!t2 || !u2(t2, a2.get(n4))) {
        o3.add(e2);
        for (const e3 of n4.getDependenciesToBeIncluded())
          e3 instanceof $e || s.has(e3) || i2.add(e3);
      }
    }
  }
  function u2(e2, t2) {
    const i2 = new Set(e2);
    for (const e3 of i2)
      if (!t2.has(e3)) {
        if (h2.has(e3))
          return false;
        const t3 = l2.get(e3);
        for (const e4 of t3)
          i2.add(e4);
      }
    return true;
  }
  for (const t2 of e)
    s.has(t2) || c2(t2, null);
  for (const e2 of o2)
    s.has(e2) || c2(e2, l2.get(e2));
  return i.push(...function(e2, t2) {
    const i2 = /* @__PURE__ */ Object.create(null);
    for (const [s2, n4] of t2) {
      let t3 = "";
      for (const i3 of e2)
        t3 += n4.has(i3) ? "X" : "_";
      const r3 = i2[t3];
      r3 ? r3.push(s2) : i2[t3] = [s2];
    }
    return Object.values(i2).map((e3) => ({ alias: null, modules: e3 }));
  }([...e, ...o2], r2)), i;
}
function Wr(e, t, i) {
  const s = /* @__PURE__ */ new Set([e]);
  for (const e2 of s) {
    i.add(e2), t.push(e2);
    for (const t2 of e2.dependencies)
      t2 instanceof $e || i.has(t2) || s.add(t2);
  }
}
var qr = (e, t) => e.execIndex > t.execIndex ? 1 : -1;
function Kr(e, t, i) {
  const s = Symbol(e.id), n3 = [he(e.id)];
  let r2 = t;
  for (e.cycles.add(s); r2 !== e; )
    r2.cycles.add(s), n3.push(he(r2.id)), r2 = i.get(r2);
  return n3.push(n3[0]), n3.reverse(), n3;
}
var Xr = (e, t) => t ? `(${e})` : e;
var Yr = /^(?!\d)[\w$]+$/;
var Qr = class {
  constructor(e, t, i, s, n3) {
    this.outputOptions = e, this.unsetOptions = t, this.inputOptions = i, this.pluginDriver = s, this.graph = n3, this.facadeChunkByModule = /* @__PURE__ */ new Map(), this.includedNamespaces = /* @__PURE__ */ new Set();
  }
  async generate(e) {
    en("GENERATE", 1);
    const t = /* @__PURE__ */ Object.create(null), i = ((e2) => {
      const t2 = /* @__PURE__ */ new Set();
      return new Proxy(e2, { deleteProperty: (e3, i2) => ("string" == typeof i2 && t2.delete(i2.toLowerCase()), Reflect.deleteProperty(e3, i2)), get: (e3, i2) => i2 === Rr ? t2 : Reflect.get(e3, i2), set: (e3, i2, s) => ("string" == typeof i2 && t2.add(i2.toLowerCase()), Reflect.set(e3, i2, s)) });
    })(t);
    this.pluginDriver.setOutputBundle(i, this.outputOptions, this.facadeChunkByModule);
    try {
      await this.pluginDriver.hookParallel("renderStart", [this.outputOptions, this.inputOptions]), en("generate chunks", 2);
      const e2 = await this.generateChunks();
      e2.length > 1 && function(e3, t3) {
        if ("umd" === e3.format || "iife" === e3.format)
          return pe(xe("output.format", "outputformat", "UMD and IIFE output formats are not supported for code-splitting builds", e3.format));
        if ("string" == typeof e3.file)
          return pe(xe("output.file", "outputdir", 'when building multiple chunks, the "output.dir" option must be used, not "output.file". To inline dynamic imports, set the "inlineDynamicImports" option'));
        if (e3.sourcemapFile)
          return pe(xe("output.sourcemapFile", "outputsourcemapfile", '"output.sourcemapFile" is only supported for single-file builds'));
        !e3.amd.autoId && e3.amd.id && t3(xe("output.amd.id", "outputamd", 'this option is only properly supported for single-file builds. Use "output.amd.autoId" and "output.amd.basePath" instead'));
      }(this.outputOptions, this.inputOptions.onwarn);
      const t2 = function(e3) {
        if (0 === e3.length)
          return "/";
        if (1 === e3.length)
          return N(e3[0]);
        const t3 = e3.slice(1).reduce((e4, t4) => {
          const i2 = t4.split(/\/+|\\+/);
          let s2;
          for (s2 = 0; e4[s2] === i2[s2] && s2 < Math.min(e4.length, i2.length); s2++)
            ;
          return e4.slice(0, s2);
        }, e3[0].split(/\/+|\\+/));
        return t3.length > 1 ? t3.join("/") : "/";
      }(function(e3) {
        const t3 = [];
        for (const i2 of e3)
          for (const e4 of i2.entryModules)
            k(e4.id) && t3.push(e4.id);
        return t3;
      }(e2));
      tn("generate chunks", 2), en("render modules", 2);
      const s = await async function(e3, t3) {
        try {
          let [i2, s2, n4, r2] = await Promise.all([t3.hookReduceValue("banner", e3.banner(), [], Ur), t3.hookReduceValue("footer", e3.footer(), [], Ur), t3.hookReduceValue("intro", e3.intro(), [], Gr), t3.hookReduceValue("outro", e3.outro(), [], Gr)]);
          return n4 && (n4 += "\n\n"), r2 && (r2 = `

${r2}`), i2.length && (i2 += "\n"), s2.length && (s2 = "\n" + s2), { banner: i2, footer: s2, intro: n4, outro: r2 };
        } catch (e4) {
          return pe({ code: "ADDON_ERROR", message: `Could not retrieve ${e4.hook}. Check configuration of plugin ${e4.plugin}.
	Error Message: ${e4.message}` });
        }
      }(this.outputOptions, this.pluginDriver), n3 = function({ compact: e3, generatedCode: { arrowFunctions: t3, constBindings: i2, objectShorthand: s2, reservedNamesAsProps: n4 } }) {
        const { _: r2, n: a2, s: o2 } = e3 ? { _: "", n: "", s: "" } : { _: " ", n: "\n", s: ";" }, l2 = i2 ? "const" : "var", h2 = (e4, { isAsync: t4, name: i3 }) => `${t4 ? "async " : ""}function${i3 ? ` ${i3}` : ""}${r2}(${e4.join(`,${r2}`)})${r2}`, c2 = t3 ? (e4, { isAsync: t4, name: i3 }) => {
          const s3 = 1 === e4.length;
          return `${i3 ? `${l2} ${i3}${r2}=${r2}` : ""}${t4 ? `async${s3 ? " " : r2}` : ""}${s3 ? e4[0] : `(${e4.join(`,${r2}`)})`}${r2}=>${r2}`;
        } : h2, u2 = (e4, { functionReturn: i3, lineBreakIndent: s3, name: n5 }) => [`${c2(e4, { isAsync: false, name: n5 })}${t3 ? s3 ? `${a2}${s3.base}${s3.t}` : "" : `{${s3 ? `${a2}${s3.base}${s3.t}` : r2}${i3 ? "return " : ""}`}`, t3 ? `${n5 ? ";" : ""}${s3 ? `${a2}${s3.base}` : ""}` : `${o2}${s3 ? `${a2}${s3.base}` : r2}}`], d2 = n4 ? (e4) => Yr.test(e4) : (e4) => !we.has(e4) && Yr.test(e4);
        return { _: r2, cnst: l2, getDirectReturnFunction: u2, getDirectReturnIifeLeft: (e4, i3, { needsArrowReturnParens: s3, needsWrappedFunction: n5 }) => {
          const [r3, a3] = u2(e4, { functionReturn: true, lineBreakIndent: null, name: null });
          return `${Xr(`${r3}${Xr(i3, t3 && s3)}${a3}`, t3 || n5)}(`;
        }, getFunctionIntro: c2, getNonArrowFunctionIntro: h2, getObject(e4, { lineBreakIndent: t4 }) {
          const i3 = t4 ? `${a2}${t4.base}${t4.t}` : r2;
          return `{${e4.map(([e5, t5]) => {
            if (null === e5)
              return `${i3}${t5}`;
            const n5 = !d2(e5);
            return e5 === t5 && s2 && !n5 ? i3 + e5 : `${i3}${n5 ? `'${e5}'` : e5}:${r2}${t5}`;
          }).join(",")}${0 === e4.length ? "" : t4 ? `${a2}${t4.base}` : r2}}`;
        }, getPropertyAccess: (e4) => d2(e4) ? `.${e4}` : `[${JSON.stringify(e4)}]`, n: a2, s: o2 };
      }(this.outputOptions);
      this.prerenderChunks(e2, t2, n3), tn("render modules", 2), await this.addFinalizedChunksToBundle(e2, t2, s, i, n3);
    } catch (e2) {
      throw await this.pluginDriver.hookParallel("renderError", [e2]), e2;
    }
    return await this.pluginDriver.hookSeq("generateBundle", [this.outputOptions, i, e]), this.finaliseAssets(i), tn("GENERATE", 1), t;
  }
  async addFinalizedChunksToBundle(e, t, i, s, n3) {
    this.assignChunkIds(e, t, i, s);
    for (const t2 of e)
      s[t2.id] = t2.getChunkInfoWithFileNames();
    await Promise.all(e.map(async (e2) => {
      const t2 = s[e2.id];
      Object.assign(t2, await e2.render(this.outputOptions, i, t2, n3));
    }));
  }
  async addManualChunks(e) {
    const t = /* @__PURE__ */ new Map(), i = await Promise.all(Object.entries(e).map(async ([e2, t2]) => ({ alias: e2, entries: await this.graph.moduleLoader.addAdditionalModules(t2) })));
    for (const { alias: e2, entries: s } of i)
      for (const i2 of s)
        Zr(e2, i2, t);
    return t;
  }
  assignChunkIds(e, t, i, s) {
    const n3 = [], r2 = [];
    for (const t2 of e)
      (t2.facadeModule && t2.facadeModule.isUserDefinedEntryPoint ? n3 : r2).push(t2);
    const a2 = n3.concat(r2);
    for (const e2 of a2)
      this.outputOptions.file ? e2.id = _(this.outputOptions.file) : this.outputOptions.preserveModules ? e2.id = e2.generateIdPreserveModules(t, this.outputOptions, s, this.unsetOptions) : e2.id = e2.generateId(i, this.outputOptions, s, true), s[e2.id] = Mr;
  }
  assignManualChunks(e) {
    const t = [], i = { getModuleIds: () => this.graph.modulesById.keys(), getModuleInfo: this.graph.getModuleInfo };
    for (const s2 of this.graph.modulesById.values())
      if (s2 instanceof ln) {
        const n3 = e(s2.id, i);
        "string" == typeof n3 && t.push([n3, s2]);
      }
    t.sort(([e2], [t2]) => e2 > t2 ? 1 : e2 < t2 ? -1 : 0);
    const s = /* @__PURE__ */ new Map();
    for (const [e2, i2] of t)
      Zr(e2, i2, s);
    return s;
  }
  finaliseAssets(e) {
    for (const t of Object.values(e))
      if (t.type || (Pe('A plugin is directly adding properties to the bundle object in the "generateBundle" hook. This is deprecated and will be removed in a future Rollup version, please use "this.emitFile" instead.', true, this.inputOptions), t.type = "asset"), this.outputOptions.validate && "code" in t)
        try {
          this.graph.contextParse(t.code, { allowHashBang: true, ecmaVersion: "latest" });
        } catch (e2) {
          this.inputOptions.onwarn(ge(t, e2));
        }
    this.pluginDriver.finaliseAssets();
  }
  async generateChunks() {
    const { manualChunks: e } = this.outputOptions, t = "object" == typeof e ? await this.addManualChunks(e) : this.assignManualChunks(e), i = [], s = /* @__PURE__ */ new Map();
    for (const { alias: e2, modules: n4 } of this.outputOptions.inlineDynamicImports ? [{ alias: null, modules: Jr(this.graph.modulesById) }] : this.outputOptions.preserveModules ? Jr(this.graph.modulesById).map((e3) => ({ alias: null, modules: [e3] })) : Hr(this.graph.entryModules, t)) {
      n4.sort(qr);
      const t2 = new Fr(n4, this.inputOptions, this.outputOptions, this.unsetOptions, this.pluginDriver, this.graph.modulesById, s, this.facadeChunkByModule, this.includedNamespaces, e2);
      i.push(t2);
      for (const e3 of n4)
        s.set(e3, t2);
    }
    for (const e2 of i)
      e2.link();
    const n3 = [];
    for (const e2 of i)
      n3.push(...e2.generateFacades());
    return [...i, ...n3];
  }
  prerenderChunks(e, t, i) {
    for (const t2 of e)
      t2.generateExports();
    for (const s of e)
      s.preRender(this.outputOptions, t, i);
  }
};
function Jr(e) {
  return [...e.values()].filter((e2) => e2 instanceof ln && (e2.isIncluded() || e2.info.isEntry || e2.includedDynamicImporters.length > 0));
}
function Zr(e, t, i) {
  const s = i.get(t);
  if ("string" == typeof s && s !== e)
    return pe((n3 = t.id, r2 = e, a2 = s, { code: me.INVALID_CHUNK, message: `Cannot assign ${he(n3)} to the "${r2}" chunk as it is already in the "${a2}" chunk.` }));
  var n3, r2, a2;
  i.set(t, e);
}
var ea = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 154, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 19306, 9, 87, 9, 39, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4706, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 262, 6, 10, 9, 357, 0, 62, 13, 1495, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];
var ta = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 68, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 190, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1070, 4050, 582, 8634, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8936, 3, 2, 6, 2, 1, 2, 290, 46, 2, 18, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 482, 44, 11, 6, 17, 0, 322, 29, 19, 43, 1269, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4152, 8, 221, 3, 5761, 15, 7472, 3104, 541, 1507, 4938];
var ia = "\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC";
var sa = { 3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile", 5: "class enum extends super const export import", 6: "enum", strict: "implements interface let package private protected public static yield", strictBind: "eval arguments" };
var na = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this";
var ra = { 5: na, "5module": na + " export import", 6: na + " const class extends export import super" };
var aa = /^in(stanceof)?$/;
var oa = new RegExp("[" + ia + "]");
var la = new RegExp("[" + ia + "\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0898-\u089F\u08CA-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3C\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECD\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u180F-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1ABF-\u1ACE\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DFF\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F]");
function ha(e, t) {
  for (var i = 65536, s = 0; s < t.length; s += 2) {
    if ((i += t[s]) > e)
      return false;
    if ((i += t[s + 1]) >= e)
      return true;
  }
}
function ca(e, t) {
  return e < 65 ? 36 === e : e < 91 || (e < 97 ? 95 === e : e < 123 || (e <= 65535 ? e >= 170 && oa.test(String.fromCharCode(e)) : false !== t && ha(e, ta)));
}
function ua(e, t) {
  return e < 48 ? 36 === e : e < 58 || !(e < 65) && (e < 91 || (e < 97 ? 95 === e : e < 123 || (e <= 65535 ? e >= 170 && la.test(String.fromCharCode(e)) : false !== t && (ha(e, ta) || ha(e, ea)))));
}
var da = function(e, t) {
  void 0 === t && (t = {}), this.label = e, this.keyword = t.keyword, this.beforeExpr = !!t.beforeExpr, this.startsExpr = !!t.startsExpr, this.isLoop = !!t.isLoop, this.isAssign = !!t.isAssign, this.prefix = !!t.prefix, this.postfix = !!t.postfix, this.binop = t.binop || null, this.updateContext = null;
};
function pa(e, t) {
  return new da(e, { beforeExpr: true, binop: t });
}
var fa = { beforeExpr: true };
var ma = { startsExpr: true };
var ga = {};
function ya(e, t) {
  return void 0 === t && (t = {}), t.keyword = e, ga[e] = new da(e, t);
}
var xa = { num: new da("num", ma), regexp: new da("regexp", ma), string: new da("string", ma), name: new da("name", ma), privateId: new da("privateId", ma), eof: new da("eof"), bracketL: new da("[", { beforeExpr: true, startsExpr: true }), bracketR: new da("]"), braceL: new da("{", { beforeExpr: true, startsExpr: true }), braceR: new da("}"), parenL: new da("(", { beforeExpr: true, startsExpr: true }), parenR: new da(")"), comma: new da(",", fa), semi: new da(";", fa), colon: new da(":", fa), dot: new da("."), question: new da("?", fa), questionDot: new da("?."), arrow: new da("=>", fa), template: new da("template"), invalidTemplate: new da("invalidTemplate"), ellipsis: new da("...", fa), backQuote: new da("`", ma), dollarBraceL: new da("${", { beforeExpr: true, startsExpr: true }), eq: new da("=", { beforeExpr: true, isAssign: true }), assign: new da("_=", { beforeExpr: true, isAssign: true }), incDec: new da("++/--", { prefix: true, postfix: true, startsExpr: true }), prefix: new da("!/~", { beforeExpr: true, prefix: true, startsExpr: true }), logicalOR: pa("||", 1), logicalAND: pa("&&", 2), bitwiseOR: pa("|", 3), bitwiseXOR: pa("^", 4), bitwiseAND: pa("&", 5), equality: pa("==/!=/===/!==", 6), relational: pa("</>/<=/>=", 7), bitShift: pa("<</>>/>>>", 8), plusMin: new da("+/-", { beforeExpr: true, binop: 9, prefix: true, startsExpr: true }), modulo: pa("%", 10), star: pa("*", 10), slash: pa("/", 10), starstar: new da("**", { beforeExpr: true }), coalesce: pa("??", 1), _break: ya("break"), _case: ya("case", fa), _catch: ya("catch"), _continue: ya("continue"), _debugger: ya("debugger"), _default: ya("default", fa), _do: ya("do", { isLoop: true, beforeExpr: true }), _else: ya("else", fa), _finally: ya("finally"), _for: ya("for", { isLoop: true }), _function: ya("function", ma), _if: ya("if"), _return: ya("return", fa), _switch: ya("switch"), _throw: ya("throw", fa), _try: ya("try"), _var: ya("var"), _const: ya("const"), _while: ya("while", { isLoop: true }), _with: ya("with"), _new: ya("new", { beforeExpr: true, startsExpr: true }), _this: ya("this", ma), _super: ya("super", ma), _class: ya("class", ma), _extends: ya("extends", fa), _export: ya("export"), _import: ya("import", ma), _null: ya("null", ma), _true: ya("true", ma), _false: ya("false", ma), _in: ya("in", { beforeExpr: true, binop: 7 }), _instanceof: ya("instanceof", { beforeExpr: true, binop: 7 }), _typeof: ya("typeof", { beforeExpr: true, prefix: true, startsExpr: true }), _void: ya("void", { beforeExpr: true, prefix: true, startsExpr: true }), _delete: ya("delete", { beforeExpr: true, prefix: true, startsExpr: true }) };
var Ea = /\r\n?|\n|\u2028|\u2029/;
var ba = new RegExp(Ea.source, "g");
function va(e) {
  return 10 === e || 13 === e || 8232 === e || 8233 === e;
}
function Sa(e, t, i) {
  void 0 === i && (i = e.length);
  for (var s = t; s < i; s++) {
    var n3 = e.charCodeAt(s);
    if (va(n3))
      return s < i - 1 && 13 === n3 && 10 === e.charCodeAt(s + 1) ? s + 2 : s + 1;
  }
  return -1;
}
var Aa = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
var Ia = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;
var Pa = Object.prototype;
var ka = Pa.hasOwnProperty;
var wa = Pa.toString;
var Ca = Object.hasOwn || function(e, t) {
  return ka.call(e, t);
};
var _a = Array.isArray || function(e) {
  return "[object Array]" === wa.call(e);
};
function Na(e) {
  return new RegExp("^(?:" + e.replace(/ /g, "|") + ")$");
}
function $a(e) {
  return e <= 65535 ? String.fromCharCode(e) : (e -= 65536, String.fromCharCode(55296 + (e >> 10), 56320 + (1023 & e)));
}
var Ta = /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/;
var Oa = function(e, t) {
  this.line = e, this.column = t;
};
Oa.prototype.offset = function(e) {
  return new Oa(this.line, this.column + e);
};
var Ra = function(e, t, i) {
  this.start = t, this.end = i, null !== e.sourceFile && (this.source = e.sourceFile);
};
function Ma(e, t) {
  for (var i = 1, s = 0; ; ) {
    var n3 = Sa(e, s, t);
    if (n3 < 0)
      return new Oa(i, t - s);
    ++i, s = n3;
  }
}
var Da = { ecmaVersion: null, sourceType: "script", onInsertedSemicolon: null, onTrailingComma: null, allowReserved: null, allowReturnOutsideFunction: false, allowImportExportEverywhere: false, allowAwaitOutsideFunction: null, allowSuperOutsideMethod: null, allowHashBang: false, locations: false, onToken: null, onComment: null, ranges: false, program: null, sourceFile: null, directSourceFile: null, preserveParens: false };
var La = false;
function Va(e) {
  var t = {};
  for (var i in Da)
    t[i] = e && Ca(e, i) ? e[i] : Da[i];
  if ("latest" === t.ecmaVersion ? t.ecmaVersion = 1e8 : null == t.ecmaVersion ? (!La && "object" == typeof console && console.warn && (La = true, console.warn("Since Acorn 8.0.0, options.ecmaVersion is required.\nDefaulting to 2020, but this will stop working in the future.")), t.ecmaVersion = 11) : t.ecmaVersion >= 2015 && (t.ecmaVersion -= 2009), null == t.allowReserved && (t.allowReserved = t.ecmaVersion < 5), _a(t.onToken)) {
    var s = t.onToken;
    t.onToken = function(e2) {
      return s.push(e2);
    };
  }
  return _a(t.onComment) && (t.onComment = function(e2, t2) {
    return function(i2, s2, n3, r2, a2, o2) {
      var l2 = { type: i2 ? "Block" : "Line", value: s2, start: n3, end: r2 };
      e2.locations && (l2.loc = new Ra(this, a2, o2)), e2.ranges && (l2.range = [n3, r2]), t2.push(l2);
    };
  }(t, t.onComment)), t;
}
function Ba(e, t) {
  return 2 | (e ? 4 : 0) | (t ? 8 : 0);
}
var Fa = function(e, t, i) {
  this.options = e = Va(e), this.sourceFile = e.sourceFile, this.keywords = Na(ra[e.ecmaVersion >= 6 ? 6 : "module" === e.sourceType ? "5module" : 5]);
  var s = "";
  true !== e.allowReserved && (s = sa[e.ecmaVersion >= 6 ? 6 : 5 === e.ecmaVersion ? 5 : 3], "module" === e.sourceType && (s += " await")), this.reservedWords = Na(s);
  var n3 = (s ? s + " " : "") + sa.strict;
  this.reservedWordsStrict = Na(n3), this.reservedWordsStrictBind = Na(n3 + " " + sa.strictBind), this.input = String(t), this.containsEsc = false, i ? (this.pos = i, this.lineStart = this.input.lastIndexOf("\n", i - 1) + 1, this.curLine = this.input.slice(0, this.lineStart).split(Ea).length) : (this.pos = this.lineStart = 0, this.curLine = 1), this.type = xa.eof, this.value = null, this.start = this.end = this.pos, this.startLoc = this.endLoc = this.curPosition(), this.lastTokEndLoc = this.lastTokStartLoc = null, this.lastTokStart = this.lastTokEnd = this.pos, this.context = this.initialContext(), this.exprAllowed = true, this.inModule = "module" === e.sourceType, this.strict = this.inModule || this.strictDirective(this.pos), this.potentialArrowAt = -1, this.potentialArrowInForAwait = false, this.yieldPos = this.awaitPos = this.awaitIdentPos = 0, this.labels = [], this.undefinedExports = /* @__PURE__ */ Object.create(null), 0 === this.pos && e.allowHashBang && "#!" === this.input.slice(0, 2) && this.skipLineComment(2), this.scopeStack = [], this.enterScope(1), this.regexpState = null, this.privateNameStack = [];
};
var za = { inFunction: { configurable: true }, inGenerator: { configurable: true }, inAsync: { configurable: true }, canAwait: { configurable: true }, allowSuper: { configurable: true }, allowDirectSuper: { configurable: true }, treatFunctionsAsVar: { configurable: true }, allowNewDotTarget: { configurable: true }, inClassStaticBlock: { configurable: true } };
Fa.prototype.parse = function() {
  var e = this.options.program || this.startNode();
  return this.nextToken(), this.parseTopLevel(e);
}, za.inFunction.get = function() {
  return (2 & this.currentVarScope().flags) > 0;
}, za.inGenerator.get = function() {
  return (8 & this.currentVarScope().flags) > 0 && !this.currentVarScope().inClassFieldInit;
}, za.inAsync.get = function() {
  return (4 & this.currentVarScope().flags) > 0 && !this.currentVarScope().inClassFieldInit;
}, za.canAwait.get = function() {
  for (var e = this.scopeStack.length - 1; e >= 0; e--) {
    var t = this.scopeStack[e];
    if (t.inClassFieldInit || 256 & t.flags)
      return false;
    if (2 & t.flags)
      return (4 & t.flags) > 0;
  }
  return this.inModule && this.options.ecmaVersion >= 13 || this.options.allowAwaitOutsideFunction;
}, za.allowSuper.get = function() {
  var e = this.currentThisScope(), t = e.flags, i = e.inClassFieldInit;
  return (64 & t) > 0 || i || this.options.allowSuperOutsideMethod;
}, za.allowDirectSuper.get = function() {
  return (128 & this.currentThisScope().flags) > 0;
}, za.treatFunctionsAsVar.get = function() {
  return this.treatFunctionsAsVarInScope(this.currentScope());
}, za.allowNewDotTarget.get = function() {
  var e = this.currentThisScope(), t = e.flags, i = e.inClassFieldInit;
  return (258 & t) > 0 || i;
}, za.inClassStaticBlock.get = function() {
  return (256 & this.currentVarScope().flags) > 0;
}, Fa.extend = function() {
  for (var e = [], t = arguments.length; t--; )
    e[t] = arguments[t];
  for (var i = this, s = 0; s < e.length; s++)
    i = e[s](i);
  return i;
}, Fa.parse = function(e, t) {
  return new this(t, e).parse();
}, Fa.parseExpressionAt = function(e, t, i) {
  var s = new this(i, e, t);
  return s.nextToken(), s.parseExpression();
}, Fa.tokenizer = function(e, t) {
  return new this(t, e);
}, Object.defineProperties(Fa.prototype, za);
var ja = Fa.prototype;
var Ua = /^(?:'((?:\\.|[^'\\])*?)'|"((?:\\.|[^"\\])*?)")/;
ja.strictDirective = function(e) {
  if (this.options.ecmaVersion < 5)
    return false;
  for (; ; ) {
    Ia.lastIndex = e, e += Ia.exec(this.input)[0].length;
    var t = Ua.exec(this.input.slice(e));
    if (!t)
      return false;
    if ("use strict" === (t[1] || t[2])) {
      Ia.lastIndex = e + t[0].length;
      var i = Ia.exec(this.input), s = i.index + i[0].length, n3 = this.input.charAt(s);
      return ";" === n3 || "}" === n3 || Ea.test(i[0]) && !(/[(`.[+\-/*%<>=,?^&]/.test(n3) || "!" === n3 && "=" === this.input.charAt(s + 1));
    }
    e += t[0].length, Ia.lastIndex = e, e += Ia.exec(this.input)[0].length, ";" === this.input[e] && e++;
  }
}, ja.eat = function(e) {
  return this.type === e && (this.next(), true);
}, ja.isContextual = function(e) {
  return this.type === xa.name && this.value === e && !this.containsEsc;
}, ja.eatContextual = function(e) {
  return !!this.isContextual(e) && (this.next(), true);
}, ja.expectContextual = function(e) {
  this.eatContextual(e) || this.unexpected();
}, ja.canInsertSemicolon = function() {
  return this.type === xa.eof || this.type === xa.braceR || Ea.test(this.input.slice(this.lastTokEnd, this.start));
}, ja.insertSemicolon = function() {
  if (this.canInsertSemicolon())
    return this.options.onInsertedSemicolon && this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc), true;
}, ja.semicolon = function() {
  this.eat(xa.semi) || this.insertSemicolon() || this.unexpected();
}, ja.afterTrailingComma = function(e, t) {
  if (this.type === e)
    return this.options.onTrailingComma && this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc), t || this.next(), true;
}, ja.expect = function(e) {
  this.eat(e) || this.unexpected();
}, ja.unexpected = function(e) {
  this.raise(null != e ? e : this.start, "Unexpected token");
};
var Ga = function() {
  this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
};
ja.checkPatternErrors = function(e, t) {
  if (e) {
    e.trailingComma > -1 && this.raiseRecoverable(e.trailingComma, "Comma is not permitted after the rest element");
    var i = t ? e.parenthesizedAssign : e.parenthesizedBind;
    i > -1 && this.raiseRecoverable(i, "Parenthesized pattern");
  }
}, ja.checkExpressionErrors = function(e, t) {
  if (!e)
    return false;
  var i = e.shorthandAssign, s = e.doubleProto;
  if (!t)
    return i >= 0 || s >= 0;
  i >= 0 && this.raise(i, "Shorthand property assignments are valid only in destructuring patterns"), s >= 0 && this.raiseRecoverable(s, "Redefinition of __proto__ property");
}, ja.checkYieldAwaitInDefaultParams = function() {
  this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos) && this.raise(this.yieldPos, "Yield expression cannot be a default value"), this.awaitPos && this.raise(this.awaitPos, "Await expression cannot be a default value");
}, ja.isSimpleAssignTarget = function(e) {
  return "ParenthesizedExpression" === e.type ? this.isSimpleAssignTarget(e.expression) : "Identifier" === e.type || "MemberExpression" === e.type;
};
var Ha = Fa.prototype;
Ha.parseTopLevel = function(e) {
  var t = /* @__PURE__ */ Object.create(null);
  for (e.body || (e.body = []); this.type !== xa.eof; ) {
    var i = this.parseStatement(null, true, t);
    e.body.push(i);
  }
  if (this.inModule)
    for (var s = 0, n3 = Object.keys(this.undefinedExports); s < n3.length; s += 1) {
      var r2 = n3[s];
      this.raiseRecoverable(this.undefinedExports[r2].start, "Export '" + r2 + "' is not defined");
    }
  return this.adaptDirectivePrologue(e.body), this.next(), e.sourceType = this.options.sourceType, this.finishNode(e, "Program");
};
var Wa = { kind: "loop" };
var qa = { kind: "switch" };
Ha.isLet = function(e) {
  if (this.options.ecmaVersion < 6 || !this.isContextual("let"))
    return false;
  Ia.lastIndex = this.pos;
  var t = Ia.exec(this.input), i = this.pos + t[0].length, s = this.input.charCodeAt(i);
  if (91 === s || 92 === s || s > 55295 && s < 56320)
    return true;
  if (e)
    return false;
  if (123 === s)
    return true;
  if (ca(s, true)) {
    for (var n3 = i + 1; ua(s = this.input.charCodeAt(n3), true); )
      ++n3;
    if (92 === s || s > 55295 && s < 56320)
      return true;
    var r2 = this.input.slice(i, n3);
    if (!aa.test(r2))
      return true;
  }
  return false;
}, Ha.isAsyncFunction = function() {
  if (this.options.ecmaVersion < 8 || !this.isContextual("async"))
    return false;
  Ia.lastIndex = this.pos;
  var e, t = Ia.exec(this.input), i = this.pos + t[0].length;
  return !(Ea.test(this.input.slice(this.pos, i)) || "function" !== this.input.slice(i, i + 8) || i + 8 !== this.input.length && (ua(e = this.input.charCodeAt(i + 8)) || e > 55295 && e < 56320));
}, Ha.parseStatement = function(e, t, i) {
  var s, n3 = this.type, r2 = this.startNode();
  switch (this.isLet(e) && (n3 = xa._var, s = "let"), n3) {
    case xa._break:
    case xa._continue:
      return this.parseBreakContinueStatement(r2, n3.keyword);
    case xa._debugger:
      return this.parseDebuggerStatement(r2);
    case xa._do:
      return this.parseDoStatement(r2);
    case xa._for:
      return this.parseForStatement(r2);
    case xa._function:
      return e && (this.strict || "if" !== e && "label" !== e) && this.options.ecmaVersion >= 6 && this.unexpected(), this.parseFunctionStatement(r2, false, !e);
    case xa._class:
      return e && this.unexpected(), this.parseClass(r2, true);
    case xa._if:
      return this.parseIfStatement(r2);
    case xa._return:
      return this.parseReturnStatement(r2);
    case xa._switch:
      return this.parseSwitchStatement(r2);
    case xa._throw:
      return this.parseThrowStatement(r2);
    case xa._try:
      return this.parseTryStatement(r2);
    case xa._const:
    case xa._var:
      return s = s || this.value, e && "var" !== s && this.unexpected(), this.parseVarStatement(r2, s);
    case xa._while:
      return this.parseWhileStatement(r2);
    case xa._with:
      return this.parseWithStatement(r2);
    case xa.braceL:
      return this.parseBlock(true, r2);
    case xa.semi:
      return this.parseEmptyStatement(r2);
    case xa._export:
    case xa._import:
      if (this.options.ecmaVersion > 10 && n3 === xa._import) {
        Ia.lastIndex = this.pos;
        var a2 = Ia.exec(this.input), o2 = this.pos + a2[0].length, l2 = this.input.charCodeAt(o2);
        if (40 === l2 || 46 === l2)
          return this.parseExpressionStatement(r2, this.parseExpression());
      }
      return this.options.allowImportExportEverywhere || (t || this.raise(this.start, "'import' and 'export' may only appear at the top level"), this.inModule || this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'")), n3 === xa._import ? this.parseImport(r2) : this.parseExport(r2, i);
    default:
      if (this.isAsyncFunction())
        return e && this.unexpected(), this.next(), this.parseFunctionStatement(r2, true, !e);
      var h2 = this.value, c2 = this.parseExpression();
      return n3 === xa.name && "Identifier" === c2.type && this.eat(xa.colon) ? this.parseLabeledStatement(r2, h2, c2, e) : this.parseExpressionStatement(r2, c2);
  }
}, Ha.parseBreakContinueStatement = function(e, t) {
  var i = "break" === t;
  this.next(), this.eat(xa.semi) || this.insertSemicolon() ? e.label = null : this.type !== xa.name ? this.unexpected() : (e.label = this.parseIdent(), this.semicolon());
  for (var s = 0; s < this.labels.length; ++s) {
    var n3 = this.labels[s];
    if (null == e.label || n3.name === e.label.name) {
      if (null != n3.kind && (i || "loop" === n3.kind))
        break;
      if (e.label && i)
        break;
    }
  }
  return s === this.labels.length && this.raise(e.start, "Unsyntactic " + t), this.finishNode(e, i ? "BreakStatement" : "ContinueStatement");
}, Ha.parseDebuggerStatement = function(e) {
  return this.next(), this.semicolon(), this.finishNode(e, "DebuggerStatement");
}, Ha.parseDoStatement = function(e) {
  return this.next(), this.labels.push(Wa), e.body = this.parseStatement("do"), this.labels.pop(), this.expect(xa._while), e.test = this.parseParenExpression(), this.options.ecmaVersion >= 6 ? this.eat(xa.semi) : this.semicolon(), this.finishNode(e, "DoWhileStatement");
}, Ha.parseForStatement = function(e) {
  this.next();
  var t = this.options.ecmaVersion >= 9 && this.canAwait && this.eatContextual("await") ? this.lastTokStart : -1;
  if (this.labels.push(Wa), this.enterScope(0), this.expect(xa.parenL), this.type === xa.semi)
    return t > -1 && this.unexpected(t), this.parseFor(e, null);
  var i = this.isLet();
  if (this.type === xa._var || this.type === xa._const || i) {
    var s = this.startNode(), n3 = i ? "let" : this.value;
    return this.next(), this.parseVar(s, true, n3), this.finishNode(s, "VariableDeclaration"), (this.type === xa._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && 1 === s.declarations.length ? (this.options.ecmaVersion >= 9 && (this.type === xa._in ? t > -1 && this.unexpected(t) : e.await = t > -1), this.parseForIn(e, s)) : (t > -1 && this.unexpected(t), this.parseFor(e, s));
  }
  var r2 = this.isContextual("let"), a2 = false, o2 = new Ga(), l2 = this.parseExpression(!(t > -1) || "await", o2);
  return this.type === xa._in || (a2 = this.options.ecmaVersion >= 6 && this.isContextual("of")) ? (this.options.ecmaVersion >= 9 && (this.type === xa._in ? t > -1 && this.unexpected(t) : e.await = t > -1), r2 && a2 && this.raise(l2.start, "The left-hand side of a for-of loop may not start with 'let'."), this.toAssignable(l2, false, o2), this.checkLValPattern(l2), this.parseForIn(e, l2)) : (this.checkExpressionErrors(o2, true), t > -1 && this.unexpected(t), this.parseFor(e, l2));
}, Ha.parseFunctionStatement = function(e, t, i) {
  return this.next(), this.parseFunction(e, Xa | (i ? 0 : Ya), false, t);
}, Ha.parseIfStatement = function(e) {
  return this.next(), e.test = this.parseParenExpression(), e.consequent = this.parseStatement("if"), e.alternate = this.eat(xa._else) ? this.parseStatement("if") : null, this.finishNode(e, "IfStatement");
}, Ha.parseReturnStatement = function(e) {
  return this.inFunction || this.options.allowReturnOutsideFunction || this.raise(this.start, "'return' outside of function"), this.next(), this.eat(xa.semi) || this.insertSemicolon() ? e.argument = null : (e.argument = this.parseExpression(), this.semicolon()), this.finishNode(e, "ReturnStatement");
}, Ha.parseSwitchStatement = function(e) {
  var t;
  this.next(), e.discriminant = this.parseParenExpression(), e.cases = [], this.expect(xa.braceL), this.labels.push(qa), this.enterScope(0);
  for (var i = false; this.type !== xa.braceR; )
    if (this.type === xa._case || this.type === xa._default) {
      var s = this.type === xa._case;
      t && this.finishNode(t, "SwitchCase"), e.cases.push(t = this.startNode()), t.consequent = [], this.next(), s ? t.test = this.parseExpression() : (i && this.raiseRecoverable(this.lastTokStart, "Multiple default clauses"), i = true, t.test = null), this.expect(xa.colon);
    } else
      t || this.unexpected(), t.consequent.push(this.parseStatement(null));
  return this.exitScope(), t && this.finishNode(t, "SwitchCase"), this.next(), this.labels.pop(), this.finishNode(e, "SwitchStatement");
}, Ha.parseThrowStatement = function(e) {
  return this.next(), Ea.test(this.input.slice(this.lastTokEnd, this.start)) && this.raise(this.lastTokEnd, "Illegal newline after throw"), e.argument = this.parseExpression(), this.semicolon(), this.finishNode(e, "ThrowStatement");
};
var Ka = [];
Ha.parseTryStatement = function(e) {
  if (this.next(), e.block = this.parseBlock(), e.handler = null, this.type === xa._catch) {
    var t = this.startNode();
    if (this.next(), this.eat(xa.parenL)) {
      t.param = this.parseBindingAtom();
      var i = "Identifier" === t.param.type;
      this.enterScope(i ? 32 : 0), this.checkLValPattern(t.param, i ? 4 : 2), this.expect(xa.parenR);
    } else
      this.options.ecmaVersion < 10 && this.unexpected(), t.param = null, this.enterScope(0);
    t.body = this.parseBlock(false), this.exitScope(), e.handler = this.finishNode(t, "CatchClause");
  }
  return e.finalizer = this.eat(xa._finally) ? this.parseBlock() : null, e.handler || e.finalizer || this.raise(e.start, "Missing catch or finally clause"), this.finishNode(e, "TryStatement");
}, Ha.parseVarStatement = function(e, t) {
  return this.next(), this.parseVar(e, false, t), this.semicolon(), this.finishNode(e, "VariableDeclaration");
}, Ha.parseWhileStatement = function(e) {
  return this.next(), e.test = this.parseParenExpression(), this.labels.push(Wa), e.body = this.parseStatement("while"), this.labels.pop(), this.finishNode(e, "WhileStatement");
}, Ha.parseWithStatement = function(e) {
  return this.strict && this.raise(this.start, "'with' in strict mode"), this.next(), e.object = this.parseParenExpression(), e.body = this.parseStatement("with"), this.finishNode(e, "WithStatement");
}, Ha.parseEmptyStatement = function(e) {
  return this.next(), this.finishNode(e, "EmptyStatement");
}, Ha.parseLabeledStatement = function(e, t, i, s) {
  for (var n3 = 0, r2 = this.labels; n3 < r2.length; n3 += 1) {
    r2[n3].name === t && this.raise(i.start, "Label '" + t + "' is already declared");
  }
  for (var a2 = this.type.isLoop ? "loop" : this.type === xa._switch ? "switch" : null, o2 = this.labels.length - 1; o2 >= 0; o2--) {
    var l2 = this.labels[o2];
    if (l2.statementStart !== e.start)
      break;
    l2.statementStart = this.start, l2.kind = a2;
  }
  return this.labels.push({ name: t, kind: a2, statementStart: this.start }), e.body = this.parseStatement(s ? -1 === s.indexOf("label") ? s + "label" : s : "label"), this.labels.pop(), e.label = i, this.finishNode(e, "LabeledStatement");
}, Ha.parseExpressionStatement = function(e, t) {
  return e.expression = t, this.semicolon(), this.finishNode(e, "ExpressionStatement");
}, Ha.parseBlock = function(e, t, i) {
  for (void 0 === e && (e = true), void 0 === t && (t = this.startNode()), t.body = [], this.expect(xa.braceL), e && this.enterScope(0); this.type !== xa.braceR; ) {
    var s = this.parseStatement(null);
    t.body.push(s);
  }
  return i && (this.strict = false), this.next(), e && this.exitScope(), this.finishNode(t, "BlockStatement");
}, Ha.parseFor = function(e, t) {
  return e.init = t, this.expect(xa.semi), e.test = this.type === xa.semi ? null : this.parseExpression(), this.expect(xa.semi), e.update = this.type === xa.parenR ? null : this.parseExpression(), this.expect(xa.parenR), e.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(e, "ForStatement");
}, Ha.parseForIn = function(e, t) {
  var i = this.type === xa._in;
  return this.next(), "VariableDeclaration" === t.type && null != t.declarations[0].init && (!i || this.options.ecmaVersion < 8 || this.strict || "var" !== t.kind || "Identifier" !== t.declarations[0].id.type) && this.raise(t.start, (i ? "for-in" : "for-of") + " loop variable declaration may not have an initializer"), e.left = t, e.right = i ? this.parseExpression() : this.parseMaybeAssign(), this.expect(xa.parenR), e.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(e, i ? "ForInStatement" : "ForOfStatement");
}, Ha.parseVar = function(e, t, i) {
  for (e.declarations = [], e.kind = i; ; ) {
    var s = this.startNode();
    if (this.parseVarId(s, i), this.eat(xa.eq) ? s.init = this.parseMaybeAssign(t) : "const" !== i || this.type === xa._in || this.options.ecmaVersion >= 6 && this.isContextual("of") ? "Identifier" === s.id.type || t && (this.type === xa._in || this.isContextual("of")) ? s.init = null : this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value") : this.unexpected(), e.declarations.push(this.finishNode(s, "VariableDeclarator")), !this.eat(xa.comma))
      break;
  }
  return e;
}, Ha.parseVarId = function(e, t) {
  e.id = this.parseBindingAtom(), this.checkLValPattern(e.id, "var" === t ? 1 : 2, false);
};
var Xa = 1;
var Ya = 2;
function Qa(e, t) {
  var i = t.key.name, s = e[i], n3 = "true";
  return "MethodDefinition" !== t.type || "get" !== t.kind && "set" !== t.kind || (n3 = (t.static ? "s" : "i") + t.kind), "iget" === s && "iset" === n3 || "iset" === s && "iget" === n3 || "sget" === s && "sset" === n3 || "sset" === s && "sget" === n3 ? (e[i] = "true", false) : !!s || (e[i] = n3, false);
}
function Ja(e, t) {
  var i = e.computed, s = e.key;
  return !i && ("Identifier" === s.type && s.name === t || "Literal" === s.type && s.value === t);
}
Ha.parseFunction = function(e, t, i, s, n3) {
  this.initFunction(e), (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !s) && (this.type === xa.star && t & Ya && this.unexpected(), e.generator = this.eat(xa.star)), this.options.ecmaVersion >= 8 && (e.async = !!s), t & Xa && (e.id = 4 & t && this.type !== xa.name ? null : this.parseIdent(), !e.id || t & Ya || this.checkLValSimple(e.id, this.strict || e.generator || e.async ? this.treatFunctionsAsVar ? 1 : 2 : 3));
  var r2 = this.yieldPos, a2 = this.awaitPos, o2 = this.awaitIdentPos;
  return this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(Ba(e.async, e.generator)), t & Xa || (e.id = this.type === xa.name ? this.parseIdent() : null), this.parseFunctionParams(e), this.parseFunctionBody(e, i, false, n3), this.yieldPos = r2, this.awaitPos = a2, this.awaitIdentPos = o2, this.finishNode(e, t & Xa ? "FunctionDeclaration" : "FunctionExpression");
}, Ha.parseFunctionParams = function(e) {
  this.expect(xa.parenL), e.params = this.parseBindingList(xa.parenR, false, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams();
}, Ha.parseClass = function(e, t) {
  this.next();
  var i = this.strict;
  this.strict = true, this.parseClassId(e, t), this.parseClassSuper(e);
  var s = this.enterClassBody(), n3 = this.startNode(), r2 = false;
  for (n3.body = [], this.expect(xa.braceL); this.type !== xa.braceR; ) {
    var a2 = this.parseClassElement(null !== e.superClass);
    a2 && (n3.body.push(a2), "MethodDefinition" === a2.type && "constructor" === a2.kind ? (r2 && this.raise(a2.start, "Duplicate constructor in the same class"), r2 = true) : a2.key && "PrivateIdentifier" === a2.key.type && Qa(s, a2) && this.raiseRecoverable(a2.key.start, "Identifier '#" + a2.key.name + "' has already been declared"));
  }
  return this.strict = i, this.next(), e.body = this.finishNode(n3, "ClassBody"), this.exitClassBody(), this.finishNode(e, t ? "ClassDeclaration" : "ClassExpression");
}, Ha.parseClassElement = function(e) {
  if (this.eat(xa.semi))
    return null;
  var t = this.options.ecmaVersion, i = this.startNode(), s = "", n3 = false, r2 = false, a2 = "method", o2 = false;
  if (this.eatContextual("static")) {
    if (t >= 13 && this.eat(xa.braceL))
      return this.parseClassStaticBlock(i), i;
    this.isClassElementNameStart() || this.type === xa.star ? o2 = true : s = "static";
  }
  if (i.static = o2, !s && t >= 8 && this.eatContextual("async") && (!this.isClassElementNameStart() && this.type !== xa.star || this.canInsertSemicolon() ? s = "async" : r2 = true), !s && (t >= 9 || !r2) && this.eat(xa.star) && (n3 = true), !s && !r2 && !n3) {
    var l2 = this.value;
    (this.eatContextual("get") || this.eatContextual("set")) && (this.isClassElementNameStart() ? a2 = l2 : s = l2);
  }
  if (s ? (i.computed = false, i.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc), i.key.name = s, this.finishNode(i.key, "Identifier")) : this.parseClassElementName(i), t < 13 || this.type === xa.parenL || "method" !== a2 || n3 || r2) {
    var h2 = !i.static && Ja(i, "constructor"), c2 = h2 && e;
    h2 && "method" !== a2 && this.raise(i.key.start, "Constructor can't have get/set modifier"), i.kind = h2 ? "constructor" : a2, this.parseClassMethod(i, n3, r2, c2);
  } else
    this.parseClassField(i);
  return i;
}, Ha.isClassElementNameStart = function() {
  return this.type === xa.name || this.type === xa.privateId || this.type === xa.num || this.type === xa.string || this.type === xa.bracketL || this.type.keyword;
}, Ha.parseClassElementName = function(e) {
  this.type === xa.privateId ? ("constructor" === this.value && this.raise(this.start, "Classes can't have an element named '#constructor'"), e.computed = false, e.key = this.parsePrivateIdent()) : this.parsePropertyName(e);
}, Ha.parseClassMethod = function(e, t, i, s) {
  var n3 = e.key;
  "constructor" === e.kind ? (t && this.raise(n3.start, "Constructor can't be a generator"), i && this.raise(n3.start, "Constructor can't be an async method")) : e.static && Ja(e, "prototype") && this.raise(n3.start, "Classes may not have a static property named prototype");
  var r2 = e.value = this.parseMethod(t, i, s);
  return "get" === e.kind && 0 !== r2.params.length && this.raiseRecoverable(r2.start, "getter should have no params"), "set" === e.kind && 1 !== r2.params.length && this.raiseRecoverable(r2.start, "setter should have exactly one param"), "set" === e.kind && "RestElement" === r2.params[0].type && this.raiseRecoverable(r2.params[0].start, "Setter cannot use rest params"), this.finishNode(e, "MethodDefinition");
}, Ha.parseClassField = function(e) {
  if (Ja(e, "constructor") ? this.raise(e.key.start, "Classes can't have a field named 'constructor'") : e.static && Ja(e, "prototype") && this.raise(e.key.start, "Classes can't have a static field named 'prototype'"), this.eat(xa.eq)) {
    var t = this.currentThisScope(), i = t.inClassFieldInit;
    t.inClassFieldInit = true, e.value = this.parseMaybeAssign(), t.inClassFieldInit = i;
  } else
    e.value = null;
  return this.semicolon(), this.finishNode(e, "PropertyDefinition");
}, Ha.parseClassStaticBlock = function(e) {
  e.body = [];
  var t = this.labels;
  for (this.labels = [], this.enterScope(320); this.type !== xa.braceR; ) {
    var i = this.parseStatement(null);
    e.body.push(i);
  }
  return this.next(), this.exitScope(), this.labels = t, this.finishNode(e, "StaticBlock");
}, Ha.parseClassId = function(e, t) {
  this.type === xa.name ? (e.id = this.parseIdent(), t && this.checkLValSimple(e.id, 2, false)) : (true === t && this.unexpected(), e.id = null);
}, Ha.parseClassSuper = function(e) {
  e.superClass = this.eat(xa._extends) ? this.parseExprSubscripts(false) : null;
}, Ha.enterClassBody = function() {
  var e = { declared: /* @__PURE__ */ Object.create(null), used: [] };
  return this.privateNameStack.push(e), e.declared;
}, Ha.exitClassBody = function() {
  for (var e = this.privateNameStack.pop(), t = e.declared, i = e.used, s = this.privateNameStack.length, n3 = 0 === s ? null : this.privateNameStack[s - 1], r2 = 0; r2 < i.length; ++r2) {
    var a2 = i[r2];
    Ca(t, a2.name) || (n3 ? n3.used.push(a2) : this.raiseRecoverable(a2.start, "Private field '#" + a2.name + "' must be declared in an enclosing class"));
  }
}, Ha.parseExport = function(e, t) {
  if (this.next(), this.eat(xa.star))
    return this.options.ecmaVersion >= 11 && (this.eatContextual("as") ? (e.exported = this.parseModuleExportName(), this.checkExport(t, e.exported, this.lastTokStart)) : e.exported = null), this.expectContextual("from"), this.type !== xa.string && this.unexpected(), e.source = this.parseExprAtom(), this.semicolon(), this.finishNode(e, "ExportAllDeclaration");
  if (this.eat(xa._default)) {
    var i;
    if (this.checkExport(t, "default", this.lastTokStart), this.type === xa._function || (i = this.isAsyncFunction())) {
      var s = this.startNode();
      this.next(), i && this.next(), e.declaration = this.parseFunction(s, 4 | Xa, false, i);
    } else if (this.type === xa._class) {
      var n3 = this.startNode();
      e.declaration = this.parseClass(n3, "nullableID");
    } else
      e.declaration = this.parseMaybeAssign(), this.semicolon();
    return this.finishNode(e, "ExportDefaultDeclaration");
  }
  if (this.shouldParseExportStatement())
    e.declaration = this.parseStatement(null), "VariableDeclaration" === e.declaration.type ? this.checkVariableExport(t, e.declaration.declarations) : this.checkExport(t, e.declaration.id, e.declaration.id.start), e.specifiers = [], e.source = null;
  else {
    if (e.declaration = null, e.specifiers = this.parseExportSpecifiers(t), this.eatContextual("from"))
      this.type !== xa.string && this.unexpected(), e.source = this.parseExprAtom();
    else {
      for (var r2 = 0, a2 = e.specifiers; r2 < a2.length; r2 += 1) {
        var o2 = a2[r2];
        this.checkUnreserved(o2.local), this.checkLocalExport(o2.local), "Literal" === o2.local.type && this.raise(o2.local.start, "A string literal cannot be used as an exported binding without `from`.");
      }
      e.source = null;
    }
    this.semicolon();
  }
  return this.finishNode(e, "ExportNamedDeclaration");
}, Ha.checkExport = function(e, t, i) {
  e && ("string" != typeof t && (t = "Identifier" === t.type ? t.name : t.value), Ca(e, t) && this.raiseRecoverable(i, "Duplicate export '" + t + "'"), e[t] = true);
}, Ha.checkPatternExport = function(e, t) {
  var i = t.type;
  if ("Identifier" === i)
    this.checkExport(e, t, t.start);
  else if ("ObjectPattern" === i)
    for (var s = 0, n3 = t.properties; s < n3.length; s += 1) {
      var r2 = n3[s];
      this.checkPatternExport(e, r2);
    }
  else if ("ArrayPattern" === i)
    for (var a2 = 0, o2 = t.elements; a2 < o2.length; a2 += 1) {
      var l2 = o2[a2];
      l2 && this.checkPatternExport(e, l2);
    }
  else
    "Property" === i ? this.checkPatternExport(e, t.value) : "AssignmentPattern" === i ? this.checkPatternExport(e, t.left) : "RestElement" === i ? this.checkPatternExport(e, t.argument) : "ParenthesizedExpression" === i && this.checkPatternExport(e, t.expression);
}, Ha.checkVariableExport = function(e, t) {
  if (e)
    for (var i = 0, s = t; i < s.length; i += 1) {
      var n3 = s[i];
      this.checkPatternExport(e, n3.id);
    }
}, Ha.shouldParseExportStatement = function() {
  return "var" === this.type.keyword || "const" === this.type.keyword || "class" === this.type.keyword || "function" === this.type.keyword || this.isLet() || this.isAsyncFunction();
}, Ha.parseExportSpecifiers = function(e) {
  var t = [], i = true;
  for (this.expect(xa.braceL); !this.eat(xa.braceR); ) {
    if (i)
      i = false;
    else if (this.expect(xa.comma), this.afterTrailingComma(xa.braceR))
      break;
    var s = this.startNode();
    s.local = this.parseModuleExportName(), s.exported = this.eatContextual("as") ? this.parseModuleExportName() : s.local, this.checkExport(e, s.exported, s.exported.start), t.push(this.finishNode(s, "ExportSpecifier"));
  }
  return t;
}, Ha.parseImport = function(e) {
  return this.next(), this.type === xa.string ? (e.specifiers = Ka, e.source = this.parseExprAtom()) : (e.specifiers = this.parseImportSpecifiers(), this.expectContextual("from"), e.source = this.type === xa.string ? this.parseExprAtom() : this.unexpected()), this.semicolon(), this.finishNode(e, "ImportDeclaration");
}, Ha.parseImportSpecifiers = function() {
  var e = [], t = true;
  if (this.type === xa.name) {
    var i = this.startNode();
    if (i.local = this.parseIdent(), this.checkLValSimple(i.local, 2), e.push(this.finishNode(i, "ImportDefaultSpecifier")), !this.eat(xa.comma))
      return e;
  }
  if (this.type === xa.star) {
    var s = this.startNode();
    return this.next(), this.expectContextual("as"), s.local = this.parseIdent(), this.checkLValSimple(s.local, 2), e.push(this.finishNode(s, "ImportNamespaceSpecifier")), e;
  }
  for (this.expect(xa.braceL); !this.eat(xa.braceR); ) {
    if (t)
      t = false;
    else if (this.expect(xa.comma), this.afterTrailingComma(xa.braceR))
      break;
    var n3 = this.startNode();
    n3.imported = this.parseModuleExportName(), this.eatContextual("as") ? n3.local = this.parseIdent() : (this.checkUnreserved(n3.imported), n3.local = n3.imported), this.checkLValSimple(n3.local, 2), e.push(this.finishNode(n3, "ImportSpecifier"));
  }
  return e;
}, Ha.parseModuleExportName = function() {
  if (this.options.ecmaVersion >= 13 && this.type === xa.string) {
    var e = this.parseLiteral(this.value);
    return Ta.test(e.value) && this.raise(e.start, "An export name cannot include a lone surrogate."), e;
  }
  return this.parseIdent(true);
}, Ha.adaptDirectivePrologue = function(e) {
  for (var t = 0; t < e.length && this.isDirectiveCandidate(e[t]); ++t)
    e[t].directive = e[t].expression.raw.slice(1, -1);
}, Ha.isDirectiveCandidate = function(e) {
  return "ExpressionStatement" === e.type && "Literal" === e.expression.type && "string" == typeof e.expression.value && ('"' === this.input[e.start] || "'" === this.input[e.start]);
};
var Za = Fa.prototype;
Za.toAssignable = function(e, t, i) {
  if (this.options.ecmaVersion >= 6 && e)
    switch (e.type) {
      case "Identifier":
        this.inAsync && "await" === e.name && this.raise(e.start, "Cannot use 'await' as identifier inside an async function");
        break;
      case "ObjectPattern":
      case "ArrayPattern":
      case "AssignmentPattern":
      case "RestElement":
        break;
      case "ObjectExpression":
        e.type = "ObjectPattern", i && this.checkPatternErrors(i, true);
        for (var s = 0, n3 = e.properties; s < n3.length; s += 1) {
          var r2 = n3[s];
          this.toAssignable(r2, t), "RestElement" !== r2.type || "ArrayPattern" !== r2.argument.type && "ObjectPattern" !== r2.argument.type || this.raise(r2.argument.start, "Unexpected token");
        }
        break;
      case "Property":
        "init" !== e.kind && this.raise(e.key.start, "Object pattern can't contain getter or setter"), this.toAssignable(e.value, t);
        break;
      case "ArrayExpression":
        e.type = "ArrayPattern", i && this.checkPatternErrors(i, true), this.toAssignableList(e.elements, t);
        break;
      case "SpreadElement":
        e.type = "RestElement", this.toAssignable(e.argument, t), "AssignmentPattern" === e.argument.type && this.raise(e.argument.start, "Rest elements cannot have a default value");
        break;
      case "AssignmentExpression":
        "=" !== e.operator && this.raise(e.left.end, "Only '=' operator can be used for specifying default value."), e.type = "AssignmentPattern", delete e.operator, this.toAssignable(e.left, t);
        break;
      case "ParenthesizedExpression":
        this.toAssignable(e.expression, t, i);
        break;
      case "ChainExpression":
        this.raiseRecoverable(e.start, "Optional chaining cannot appear in left-hand side");
        break;
      case "MemberExpression":
        if (!t)
          break;
      default:
        this.raise(e.start, "Assigning to rvalue");
    }
  else
    i && this.checkPatternErrors(i, true);
  return e;
}, Za.toAssignableList = function(e, t) {
  for (var i = e.length, s = 0; s < i; s++) {
    var n3 = e[s];
    n3 && this.toAssignable(n3, t);
  }
  if (i) {
    var r2 = e[i - 1];
    6 === this.options.ecmaVersion && t && r2 && "RestElement" === r2.type && "Identifier" !== r2.argument.type && this.unexpected(r2.argument.start);
  }
  return e;
}, Za.parseSpread = function(e) {
  var t = this.startNode();
  return this.next(), t.argument = this.parseMaybeAssign(false, e), this.finishNode(t, "SpreadElement");
}, Za.parseRestBinding = function() {
  var e = this.startNode();
  return this.next(), 6 === this.options.ecmaVersion && this.type !== xa.name && this.unexpected(), e.argument = this.parseBindingAtom(), this.finishNode(e, "RestElement");
}, Za.parseBindingAtom = function() {
  if (this.options.ecmaVersion >= 6)
    switch (this.type) {
      case xa.bracketL:
        var e = this.startNode();
        return this.next(), e.elements = this.parseBindingList(xa.bracketR, true, true), this.finishNode(e, "ArrayPattern");
      case xa.braceL:
        return this.parseObj(true);
    }
  return this.parseIdent();
}, Za.parseBindingList = function(e, t, i) {
  for (var s = [], n3 = true; !this.eat(e); )
    if (n3 ? n3 = false : this.expect(xa.comma), t && this.type === xa.comma)
      s.push(null);
    else {
      if (i && this.afterTrailingComma(e))
        break;
      if (this.type === xa.ellipsis) {
        var r2 = this.parseRestBinding();
        this.parseBindingListItem(r2), s.push(r2), this.type === xa.comma && this.raise(this.start, "Comma is not permitted after the rest element"), this.expect(e);
        break;
      }
      var a2 = this.parseMaybeDefault(this.start, this.startLoc);
      this.parseBindingListItem(a2), s.push(a2);
    }
  return s;
}, Za.parseBindingListItem = function(e) {
  return e;
}, Za.parseMaybeDefault = function(e, t, i) {
  if (i = i || this.parseBindingAtom(), this.options.ecmaVersion < 6 || !this.eat(xa.eq))
    return i;
  var s = this.startNodeAt(e, t);
  return s.left = i, s.right = this.parseMaybeAssign(), this.finishNode(s, "AssignmentPattern");
}, Za.checkLValSimple = function(e, t, i) {
  void 0 === t && (t = 0);
  var s = 0 !== t;
  switch (e.type) {
    case "Identifier":
      this.strict && this.reservedWordsStrictBind.test(e.name) && this.raiseRecoverable(e.start, (s ? "Binding " : "Assigning to ") + e.name + " in strict mode"), s && (2 === t && "let" === e.name && this.raiseRecoverable(e.start, "let is disallowed as a lexically bound name"), i && (Ca(i, e.name) && this.raiseRecoverable(e.start, "Argument name clash"), i[e.name] = true), 5 !== t && this.declareName(e.name, t, e.start));
      break;
    case "ChainExpression":
      this.raiseRecoverable(e.start, "Optional chaining cannot appear in left-hand side");
      break;
    case "MemberExpression":
      s && this.raiseRecoverable(e.start, "Binding member expression");
      break;
    case "ParenthesizedExpression":
      return s && this.raiseRecoverable(e.start, "Binding parenthesized expression"), this.checkLValSimple(e.expression, t, i);
    default:
      this.raise(e.start, (s ? "Binding" : "Assigning to") + " rvalue");
  }
}, Za.checkLValPattern = function(e, t, i) {
  switch (void 0 === t && (t = 0), e.type) {
    case "ObjectPattern":
      for (var s = 0, n3 = e.properties; s < n3.length; s += 1) {
        var r2 = n3[s];
        this.checkLValInnerPattern(r2, t, i);
      }
      break;
    case "ArrayPattern":
      for (var a2 = 0, o2 = e.elements; a2 < o2.length; a2 += 1) {
        var l2 = o2[a2];
        l2 && this.checkLValInnerPattern(l2, t, i);
      }
      break;
    default:
      this.checkLValSimple(e, t, i);
  }
}, Za.checkLValInnerPattern = function(e, t, i) {
  switch (void 0 === t && (t = 0), e.type) {
    case "Property":
      this.checkLValInnerPattern(e.value, t, i);
      break;
    case "AssignmentPattern":
      this.checkLValPattern(e.left, t, i);
      break;
    case "RestElement":
      this.checkLValPattern(e.argument, t, i);
      break;
    default:
      this.checkLValPattern(e, t, i);
  }
};
var eo = function(e, t, i, s, n3) {
  this.token = e, this.isExpr = !!t, this.preserveSpace = !!i, this.override = s, this.generator = !!n3;
};
var to = { b_stat: new eo("{", false), b_expr: new eo("{", true), b_tmpl: new eo("${", false), p_stat: new eo("(", false), p_expr: new eo("(", true), q_tmpl: new eo("`", true, true, function(e) {
  return e.tryReadTemplateToken();
}), f_stat: new eo("function", false), f_expr: new eo("function", true), f_expr_gen: new eo("function", true, false, null, true), f_gen: new eo("function", false, false, null, true) };
var io = Fa.prototype;
io.initialContext = function() {
  return [to.b_stat];
}, io.curContext = function() {
  return this.context[this.context.length - 1];
}, io.braceIsBlock = function(e) {
  var t = this.curContext();
  return t === to.f_expr || t === to.f_stat || (e !== xa.colon || t !== to.b_stat && t !== to.b_expr ? e === xa._return || e === xa.name && this.exprAllowed ? Ea.test(this.input.slice(this.lastTokEnd, this.start)) : e === xa._else || e === xa.semi || e === xa.eof || e === xa.parenR || e === xa.arrow || (e === xa.braceL ? t === to.b_stat : e !== xa._var && e !== xa._const && e !== xa.name && !this.exprAllowed) : !t.isExpr);
}, io.inGeneratorContext = function() {
  for (var e = this.context.length - 1; e >= 1; e--) {
    var t = this.context[e];
    if ("function" === t.token)
      return t.generator;
  }
  return false;
}, io.updateContext = function(e) {
  var t, i = this.type;
  i.keyword && e === xa.dot ? this.exprAllowed = false : (t = i.updateContext) ? t.call(this, e) : this.exprAllowed = i.beforeExpr;
}, io.overrideContext = function(e) {
  this.curContext() !== e && (this.context[this.context.length - 1] = e);
}, xa.parenR.updateContext = xa.braceR.updateContext = function() {
  if (1 !== this.context.length) {
    var e = this.context.pop();
    e === to.b_stat && "function" === this.curContext().token && (e = this.context.pop()), this.exprAllowed = !e.isExpr;
  } else
    this.exprAllowed = true;
}, xa.braceL.updateContext = function(e) {
  this.context.push(this.braceIsBlock(e) ? to.b_stat : to.b_expr), this.exprAllowed = true;
}, xa.dollarBraceL.updateContext = function() {
  this.context.push(to.b_tmpl), this.exprAllowed = true;
}, xa.parenL.updateContext = function(e) {
  var t = e === xa._if || e === xa._for || e === xa._with || e === xa._while;
  this.context.push(t ? to.p_stat : to.p_expr), this.exprAllowed = true;
}, xa.incDec.updateContext = function() {
}, xa._function.updateContext = xa._class.updateContext = function(e) {
  !e.beforeExpr || e === xa._else || e === xa.semi && this.curContext() !== to.p_stat || e === xa._return && Ea.test(this.input.slice(this.lastTokEnd, this.start)) || (e === xa.colon || e === xa.braceL) && this.curContext() === to.b_stat ? this.context.push(to.f_stat) : this.context.push(to.f_expr), this.exprAllowed = false;
}, xa.backQuote.updateContext = function() {
  this.curContext() === to.q_tmpl ? this.context.pop() : this.context.push(to.q_tmpl), this.exprAllowed = false;
}, xa.star.updateContext = function(e) {
  if (e === xa._function) {
    var t = this.context.length - 1;
    this.context[t] === to.f_expr ? this.context[t] = to.f_expr_gen : this.context[t] = to.f_gen;
  }
  this.exprAllowed = true;
}, xa.name.updateContext = function(e) {
  var t = false;
  this.options.ecmaVersion >= 6 && e !== xa.dot && ("of" === this.value && !this.exprAllowed || "yield" === this.value && this.inGeneratorContext()) && (t = true), this.exprAllowed = t;
};
var so = Fa.prototype;
function no(e) {
  return "MemberExpression" === e.type && "PrivateIdentifier" === e.property.type || "ChainExpression" === e.type && no(e.expression);
}
so.checkPropClash = function(e, t, i) {
  if (!(this.options.ecmaVersion >= 9 && "SpreadElement" === e.type || this.options.ecmaVersion >= 6 && (e.computed || e.method || e.shorthand))) {
    var s, n3 = e.key;
    switch (n3.type) {
      case "Identifier":
        s = n3.name;
        break;
      case "Literal":
        s = String(n3.value);
        break;
      default:
        return;
    }
    var r2 = e.kind;
    if (this.options.ecmaVersion >= 6)
      "__proto__" === s && "init" === r2 && (t.proto && (i ? i.doubleProto < 0 && (i.doubleProto = n3.start) : this.raiseRecoverable(n3.start, "Redefinition of __proto__ property")), t.proto = true);
    else {
      var a2 = t[s = "$" + s];
      if (a2)
        ("init" === r2 ? this.strict && a2.init || a2.get || a2.set : a2.init || a2[r2]) && this.raiseRecoverable(n3.start, "Redefinition of property");
      else
        a2 = t[s] = { init: false, get: false, set: false };
      a2[r2] = true;
    }
  }
}, so.parseExpression = function(e, t) {
  var i = this.start, s = this.startLoc, n3 = this.parseMaybeAssign(e, t);
  if (this.type === xa.comma) {
    var r2 = this.startNodeAt(i, s);
    for (r2.expressions = [n3]; this.eat(xa.comma); )
      r2.expressions.push(this.parseMaybeAssign(e, t));
    return this.finishNode(r2, "SequenceExpression");
  }
  return n3;
}, so.parseMaybeAssign = function(e, t, i) {
  if (this.isContextual("yield")) {
    if (this.inGenerator)
      return this.parseYield(e);
    this.exprAllowed = false;
  }
  var s = false, n3 = -1, r2 = -1, a2 = -1;
  t ? (n3 = t.parenthesizedAssign, r2 = t.trailingComma, a2 = t.doubleProto, t.parenthesizedAssign = t.trailingComma = -1) : (t = new Ga(), s = true);
  var o2 = this.start, l2 = this.startLoc;
  this.type !== xa.parenL && this.type !== xa.name || (this.potentialArrowAt = this.start, this.potentialArrowInForAwait = "await" === e);
  var h2 = this.parseMaybeConditional(e, t);
  if (i && (h2 = i.call(this, h2, o2, l2)), this.type.isAssign) {
    var c2 = this.startNodeAt(o2, l2);
    return c2.operator = this.value, this.type === xa.eq && (h2 = this.toAssignable(h2, false, t)), s || (t.parenthesizedAssign = t.trailingComma = t.doubleProto = -1), t.shorthandAssign >= h2.start && (t.shorthandAssign = -1), this.type === xa.eq ? this.checkLValPattern(h2) : this.checkLValSimple(h2), c2.left = h2, this.next(), c2.right = this.parseMaybeAssign(e), a2 > -1 && (t.doubleProto = a2), this.finishNode(c2, "AssignmentExpression");
  }
  return s && this.checkExpressionErrors(t, true), n3 > -1 && (t.parenthesizedAssign = n3), r2 > -1 && (t.trailingComma = r2), h2;
}, so.parseMaybeConditional = function(e, t) {
  var i = this.start, s = this.startLoc, n3 = this.parseExprOps(e, t);
  if (this.checkExpressionErrors(t))
    return n3;
  if (this.eat(xa.question)) {
    var r2 = this.startNodeAt(i, s);
    return r2.test = n3, r2.consequent = this.parseMaybeAssign(), this.expect(xa.colon), r2.alternate = this.parseMaybeAssign(e), this.finishNode(r2, "ConditionalExpression");
  }
  return n3;
}, so.parseExprOps = function(e, t) {
  var i = this.start, s = this.startLoc, n3 = this.parseMaybeUnary(t, false, false, e);
  return this.checkExpressionErrors(t) || n3.start === i && "ArrowFunctionExpression" === n3.type ? n3 : this.parseExprOp(n3, i, s, -1, e);
}, so.parseExprOp = function(e, t, i, s, n3) {
  var r2 = this.type.binop;
  if (null != r2 && (!n3 || this.type !== xa._in) && r2 > s) {
    var a2 = this.type === xa.logicalOR || this.type === xa.logicalAND, o2 = this.type === xa.coalesce;
    o2 && (r2 = xa.logicalAND.binop);
    var l2 = this.value;
    this.next();
    var h2 = this.start, c2 = this.startLoc, u2 = this.parseExprOp(this.parseMaybeUnary(null, false, false, n3), h2, c2, r2, n3), d2 = this.buildBinary(t, i, e, u2, l2, a2 || o2);
    return (a2 && this.type === xa.coalesce || o2 && (this.type === xa.logicalOR || this.type === xa.logicalAND)) && this.raiseRecoverable(this.start, "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses"), this.parseExprOp(d2, t, i, s, n3);
  }
  return e;
}, so.buildBinary = function(e, t, i, s, n3, r2) {
  "PrivateIdentifier" === s.type && this.raise(s.start, "Private identifier can only be left side of binary expression");
  var a2 = this.startNodeAt(e, t);
  return a2.left = i, a2.operator = n3, a2.right = s, this.finishNode(a2, r2 ? "LogicalExpression" : "BinaryExpression");
}, so.parseMaybeUnary = function(e, t, i, s) {
  var n3, r2 = this.start, a2 = this.startLoc;
  if (this.isContextual("await") && this.canAwait)
    n3 = this.parseAwait(s), t = true;
  else if (this.type.prefix) {
    var o2 = this.startNode(), l2 = this.type === xa.incDec;
    o2.operator = this.value, o2.prefix = true, this.next(), o2.argument = this.parseMaybeUnary(null, true, l2, s), this.checkExpressionErrors(e, true), l2 ? this.checkLValSimple(o2.argument) : this.strict && "delete" === o2.operator && "Identifier" === o2.argument.type ? this.raiseRecoverable(o2.start, "Deleting local variable in strict mode") : "delete" === o2.operator && no(o2.argument) ? this.raiseRecoverable(o2.start, "Private fields can not be deleted") : t = true, n3 = this.finishNode(o2, l2 ? "UpdateExpression" : "UnaryExpression");
  } else if (t || this.type !== xa.privateId) {
    if (n3 = this.parseExprSubscripts(e, s), this.checkExpressionErrors(e))
      return n3;
    for (; this.type.postfix && !this.canInsertSemicolon(); ) {
      var h2 = this.startNodeAt(r2, a2);
      h2.operator = this.value, h2.prefix = false, h2.argument = n3, this.checkLValSimple(n3), this.next(), n3 = this.finishNode(h2, "UpdateExpression");
    }
  } else
    (s || 0 === this.privateNameStack.length) && this.unexpected(), n3 = this.parsePrivateIdent(), this.type !== xa._in && this.unexpected();
  return i || !this.eat(xa.starstar) ? n3 : t ? void this.unexpected(this.lastTokStart) : this.buildBinary(r2, a2, n3, this.parseMaybeUnary(null, false, false, s), "**", false);
}, so.parseExprSubscripts = function(e, t) {
  var i = this.start, s = this.startLoc, n3 = this.parseExprAtom(e, t);
  if ("ArrowFunctionExpression" === n3.type && ")" !== this.input.slice(this.lastTokStart, this.lastTokEnd))
    return n3;
  var r2 = this.parseSubscripts(n3, i, s, false, t);
  return e && "MemberExpression" === r2.type && (e.parenthesizedAssign >= r2.start && (e.parenthesizedAssign = -1), e.parenthesizedBind >= r2.start && (e.parenthesizedBind = -1), e.trailingComma >= r2.start && (e.trailingComma = -1)), r2;
}, so.parseSubscripts = function(e, t, i, s, n3) {
  for (var r2 = this.options.ecmaVersion >= 8 && "Identifier" === e.type && "async" === e.name && this.lastTokEnd === e.end && !this.canInsertSemicolon() && e.end - e.start == 5 && this.potentialArrowAt === e.start, a2 = false; ; ) {
    var o2 = this.parseSubscript(e, t, i, s, r2, a2, n3);
    if (o2.optional && (a2 = true), o2 === e || "ArrowFunctionExpression" === o2.type) {
      if (a2) {
        var l2 = this.startNodeAt(t, i);
        l2.expression = o2, o2 = this.finishNode(l2, "ChainExpression");
      }
      return o2;
    }
    e = o2;
  }
}, so.parseSubscript = function(e, t, i, s, n3, r2, a2) {
  var o2 = this.options.ecmaVersion >= 11, l2 = o2 && this.eat(xa.questionDot);
  s && l2 && this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions");
  var h2 = this.eat(xa.bracketL);
  if (h2 || l2 && this.type !== xa.parenL && this.type !== xa.backQuote || this.eat(xa.dot)) {
    var c2 = this.startNodeAt(t, i);
    c2.object = e, h2 ? (c2.property = this.parseExpression(), this.expect(xa.bracketR)) : this.type === xa.privateId && "Super" !== e.type ? c2.property = this.parsePrivateIdent() : c2.property = this.parseIdent("never" !== this.options.allowReserved), c2.computed = !!h2, o2 && (c2.optional = l2), e = this.finishNode(c2, "MemberExpression");
  } else if (!s && this.eat(xa.parenL)) {
    var u2 = new Ga(), d2 = this.yieldPos, p2 = this.awaitPos, f2 = this.awaitIdentPos;
    this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0;
    var m2 = this.parseExprList(xa.parenR, this.options.ecmaVersion >= 8, false, u2);
    if (n3 && !l2 && !this.canInsertSemicolon() && this.eat(xa.arrow))
      return this.checkPatternErrors(u2, false), this.checkYieldAwaitInDefaultParams(), this.awaitIdentPos > 0 && this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function"), this.yieldPos = d2, this.awaitPos = p2, this.awaitIdentPos = f2, this.parseArrowExpression(this.startNodeAt(t, i), m2, true, a2);
    this.checkExpressionErrors(u2, true), this.yieldPos = d2 || this.yieldPos, this.awaitPos = p2 || this.awaitPos, this.awaitIdentPos = f2 || this.awaitIdentPos;
    var g2 = this.startNodeAt(t, i);
    g2.callee = e, g2.arguments = m2, o2 && (g2.optional = l2), e = this.finishNode(g2, "CallExpression");
  } else if (this.type === xa.backQuote) {
    (l2 || r2) && this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions");
    var y2 = this.startNodeAt(t, i);
    y2.tag = e, y2.quasi = this.parseTemplate({ isTagged: true }), e = this.finishNode(y2, "TaggedTemplateExpression");
  }
  return e;
}, so.parseExprAtom = function(e, t) {
  this.type === xa.slash && this.readRegexp();
  var i, s = this.potentialArrowAt === this.start;
  switch (this.type) {
    case xa._super:
      return this.allowSuper || this.raise(this.start, "'super' keyword outside a method"), i = this.startNode(), this.next(), this.type !== xa.parenL || this.allowDirectSuper || this.raise(i.start, "super() call outside constructor of a subclass"), this.type !== xa.dot && this.type !== xa.bracketL && this.type !== xa.parenL && this.unexpected(), this.finishNode(i, "Super");
    case xa._this:
      return i = this.startNode(), this.next(), this.finishNode(i, "ThisExpression");
    case xa.name:
      var n3 = this.start, r2 = this.startLoc, a2 = this.containsEsc, o2 = this.parseIdent(false);
      if (this.options.ecmaVersion >= 8 && !a2 && "async" === o2.name && !this.canInsertSemicolon() && this.eat(xa._function))
        return this.overrideContext(to.f_expr), this.parseFunction(this.startNodeAt(n3, r2), 0, false, true, t);
      if (s && !this.canInsertSemicolon()) {
        if (this.eat(xa.arrow))
          return this.parseArrowExpression(this.startNodeAt(n3, r2), [o2], false, t);
        if (this.options.ecmaVersion >= 8 && "async" === o2.name && this.type === xa.name && !a2 && (!this.potentialArrowInForAwait || "of" !== this.value || this.containsEsc))
          return o2 = this.parseIdent(false), !this.canInsertSemicolon() && this.eat(xa.arrow) || this.unexpected(), this.parseArrowExpression(this.startNodeAt(n3, r2), [o2], true, t);
      }
      return o2;
    case xa.regexp:
      var l2 = this.value;
      return (i = this.parseLiteral(l2.value)).regex = { pattern: l2.pattern, flags: l2.flags }, i;
    case xa.num:
    case xa.string:
      return this.parseLiteral(this.value);
    case xa._null:
    case xa._true:
    case xa._false:
      return (i = this.startNode()).value = this.type === xa._null ? null : this.type === xa._true, i.raw = this.type.keyword, this.next(), this.finishNode(i, "Literal");
    case xa.parenL:
      var h2 = this.start, c2 = this.parseParenAndDistinguishExpression(s, t);
      return e && (e.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(c2) && (e.parenthesizedAssign = h2), e.parenthesizedBind < 0 && (e.parenthesizedBind = h2)), c2;
    case xa.bracketL:
      return i = this.startNode(), this.next(), i.elements = this.parseExprList(xa.bracketR, true, true, e), this.finishNode(i, "ArrayExpression");
    case xa.braceL:
      return this.overrideContext(to.b_expr), this.parseObj(false, e);
    case xa._function:
      return i = this.startNode(), this.next(), this.parseFunction(i, 0);
    case xa._class:
      return this.parseClass(this.startNode(), false);
    case xa._new:
      return this.parseNew();
    case xa.backQuote:
      return this.parseTemplate();
    case xa._import:
      return this.options.ecmaVersion >= 11 ? this.parseExprImport() : this.unexpected();
    default:
      this.unexpected();
  }
}, so.parseExprImport = function() {
  var e = this.startNode();
  this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword import");
  var t = this.parseIdent(true);
  switch (this.type) {
    case xa.parenL:
      return this.parseDynamicImport(e);
    case xa.dot:
      return e.meta = t, this.parseImportMeta(e);
    default:
      this.unexpected();
  }
}, so.parseDynamicImport = function(e) {
  if (this.next(), e.source = this.parseMaybeAssign(), !this.eat(xa.parenR)) {
    var t = this.start;
    this.eat(xa.comma) && this.eat(xa.parenR) ? this.raiseRecoverable(t, "Trailing comma is not allowed in import()") : this.unexpected(t);
  }
  return this.finishNode(e, "ImportExpression");
}, so.parseImportMeta = function(e) {
  this.next();
  var t = this.containsEsc;
  return e.property = this.parseIdent(true), "meta" !== e.property.name && this.raiseRecoverable(e.property.start, "The only valid meta property for import is 'import.meta'"), t && this.raiseRecoverable(e.start, "'import.meta' must not contain escaped characters"), "module" === this.options.sourceType || this.options.allowImportExportEverywhere || this.raiseRecoverable(e.start, "Cannot use 'import.meta' outside a module"), this.finishNode(e, "MetaProperty");
}, so.parseLiteral = function(e) {
  var t = this.startNode();
  return t.value = e, t.raw = this.input.slice(this.start, this.end), 110 === t.raw.charCodeAt(t.raw.length - 1) && (t.bigint = t.raw.slice(0, -1).replace(/_/g, "")), this.next(), this.finishNode(t, "Literal");
}, so.parseParenExpression = function() {
  this.expect(xa.parenL);
  var e = this.parseExpression();
  return this.expect(xa.parenR), e;
}, so.parseParenAndDistinguishExpression = function(e, t) {
  var i, s = this.start, n3 = this.startLoc, r2 = this.options.ecmaVersion >= 8;
  if (this.options.ecmaVersion >= 6) {
    this.next();
    var a2, o2 = this.start, l2 = this.startLoc, h2 = [], c2 = true, u2 = false, d2 = new Ga(), p2 = this.yieldPos, f2 = this.awaitPos;
    for (this.yieldPos = 0, this.awaitPos = 0; this.type !== xa.parenR; ) {
      if (c2 ? c2 = false : this.expect(xa.comma), r2 && this.afterTrailingComma(xa.parenR, true)) {
        u2 = true;
        break;
      }
      if (this.type === xa.ellipsis) {
        a2 = this.start, h2.push(this.parseParenItem(this.parseRestBinding())), this.type === xa.comma && this.raise(this.start, "Comma is not permitted after the rest element");
        break;
      }
      h2.push(this.parseMaybeAssign(false, d2, this.parseParenItem));
    }
    var m2 = this.lastTokEnd, g2 = this.lastTokEndLoc;
    if (this.expect(xa.parenR), e && !this.canInsertSemicolon() && this.eat(xa.arrow))
      return this.checkPatternErrors(d2, false), this.checkYieldAwaitInDefaultParams(), this.yieldPos = p2, this.awaitPos = f2, this.parseParenArrowList(s, n3, h2, t);
    h2.length && !u2 || this.unexpected(this.lastTokStart), a2 && this.unexpected(a2), this.checkExpressionErrors(d2, true), this.yieldPos = p2 || this.yieldPos, this.awaitPos = f2 || this.awaitPos, h2.length > 1 ? ((i = this.startNodeAt(o2, l2)).expressions = h2, this.finishNodeAt(i, "SequenceExpression", m2, g2)) : i = h2[0];
  } else
    i = this.parseParenExpression();
  if (this.options.preserveParens) {
    var y2 = this.startNodeAt(s, n3);
    return y2.expression = i, this.finishNode(y2, "ParenthesizedExpression");
  }
  return i;
}, so.parseParenItem = function(e) {
  return e;
}, so.parseParenArrowList = function(e, t, i, s) {
  return this.parseArrowExpression(this.startNodeAt(e, t), i, false, s);
};
var ro = [];
so.parseNew = function() {
  this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword new");
  var e = this.startNode(), t = this.parseIdent(true);
  if (this.options.ecmaVersion >= 6 && this.eat(xa.dot)) {
    e.meta = t;
    var i = this.containsEsc;
    return e.property = this.parseIdent(true), "target" !== e.property.name && this.raiseRecoverable(e.property.start, "The only valid meta property for new is 'new.target'"), i && this.raiseRecoverable(e.start, "'new.target' must not contain escaped characters"), this.allowNewDotTarget || this.raiseRecoverable(e.start, "'new.target' can only be used in functions and class static block"), this.finishNode(e, "MetaProperty");
  }
  var s = this.start, n3 = this.startLoc, r2 = this.type === xa._import;
  return e.callee = this.parseSubscripts(this.parseExprAtom(), s, n3, true, false), r2 && "ImportExpression" === e.callee.type && this.raise(s, "Cannot use new with import()"), this.eat(xa.parenL) ? e.arguments = this.parseExprList(xa.parenR, this.options.ecmaVersion >= 8, false) : e.arguments = ro, this.finishNode(e, "NewExpression");
}, so.parseTemplateElement = function(e) {
  var t = e.isTagged, i = this.startNode();
  return this.type === xa.invalidTemplate ? (t || this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal"), i.value = { raw: this.value, cooked: null }) : i.value = { raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, "\n"), cooked: this.value }, this.next(), i.tail = this.type === xa.backQuote, this.finishNode(i, "TemplateElement");
}, so.parseTemplate = function(e) {
  void 0 === e && (e = {});
  var t = e.isTagged;
  void 0 === t && (t = false);
  var i = this.startNode();
  this.next(), i.expressions = [];
  var s = this.parseTemplateElement({ isTagged: t });
  for (i.quasis = [s]; !s.tail; )
    this.type === xa.eof && this.raise(this.pos, "Unterminated template literal"), this.expect(xa.dollarBraceL), i.expressions.push(this.parseExpression()), this.expect(xa.braceR), i.quasis.push(s = this.parseTemplateElement({ isTagged: t }));
  return this.next(), this.finishNode(i, "TemplateLiteral");
}, so.isAsyncProp = function(e) {
  return !e.computed && "Identifier" === e.key.type && "async" === e.key.name && (this.type === xa.name || this.type === xa.num || this.type === xa.string || this.type === xa.bracketL || this.type.keyword || this.options.ecmaVersion >= 9 && this.type === xa.star) && !Ea.test(this.input.slice(this.lastTokEnd, this.start));
}, so.parseObj = function(e, t) {
  var i = this.startNode(), s = true, n3 = {};
  for (i.properties = [], this.next(); !this.eat(xa.braceR); ) {
    if (s)
      s = false;
    else if (this.expect(xa.comma), this.options.ecmaVersion >= 5 && this.afterTrailingComma(xa.braceR))
      break;
    var r2 = this.parseProperty(e, t);
    e || this.checkPropClash(r2, n3, t), i.properties.push(r2);
  }
  return this.finishNode(i, e ? "ObjectPattern" : "ObjectExpression");
}, so.parseProperty = function(e, t) {
  var i, s, n3, r2, a2 = this.startNode();
  if (this.options.ecmaVersion >= 9 && this.eat(xa.ellipsis))
    return e ? (a2.argument = this.parseIdent(false), this.type === xa.comma && this.raise(this.start, "Comma is not permitted after the rest element"), this.finishNode(a2, "RestElement")) : (this.type === xa.parenL && t && (t.parenthesizedAssign < 0 && (t.parenthesizedAssign = this.start), t.parenthesizedBind < 0 && (t.parenthesizedBind = this.start)), a2.argument = this.parseMaybeAssign(false, t), this.type === xa.comma && t && t.trailingComma < 0 && (t.trailingComma = this.start), this.finishNode(a2, "SpreadElement"));
  this.options.ecmaVersion >= 6 && (a2.method = false, a2.shorthand = false, (e || t) && (n3 = this.start, r2 = this.startLoc), e || (i = this.eat(xa.star)));
  var o2 = this.containsEsc;
  return this.parsePropertyName(a2), !e && !o2 && this.options.ecmaVersion >= 8 && !i && this.isAsyncProp(a2) ? (s = true, i = this.options.ecmaVersion >= 9 && this.eat(xa.star), this.parsePropertyName(a2, t)) : s = false, this.parsePropertyValue(a2, e, i, s, n3, r2, t, o2), this.finishNode(a2, "Property");
}, so.parsePropertyValue = function(e, t, i, s, n3, r2, a2, o2) {
  if ((i || s) && this.type === xa.colon && this.unexpected(), this.eat(xa.colon))
    e.value = t ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(false, a2), e.kind = "init";
  else if (this.options.ecmaVersion >= 6 && this.type === xa.parenL)
    t && this.unexpected(), e.kind = "init", e.method = true, e.value = this.parseMethod(i, s);
  else if (t || o2 || !(this.options.ecmaVersion >= 5) || e.computed || "Identifier" !== e.key.type || "get" !== e.key.name && "set" !== e.key.name || this.type === xa.comma || this.type === xa.braceR || this.type === xa.eq)
    this.options.ecmaVersion >= 6 && !e.computed && "Identifier" === e.key.type ? ((i || s) && this.unexpected(), this.checkUnreserved(e.key), "await" !== e.key.name || this.awaitIdentPos || (this.awaitIdentPos = n3), e.kind = "init", t ? e.value = this.parseMaybeDefault(n3, r2, this.copyNode(e.key)) : this.type === xa.eq && a2 ? (a2.shorthandAssign < 0 && (a2.shorthandAssign = this.start), e.value = this.parseMaybeDefault(n3, r2, this.copyNode(e.key))) : e.value = this.copyNode(e.key), e.shorthand = true) : this.unexpected();
  else {
    (i || s) && this.unexpected(), e.kind = e.key.name, this.parsePropertyName(e), e.value = this.parseMethod(false);
    var l2 = "get" === e.kind ? 0 : 1;
    if (e.value.params.length !== l2) {
      var h2 = e.value.start;
      "get" === e.kind ? this.raiseRecoverable(h2, "getter should have no params") : this.raiseRecoverable(h2, "setter should have exactly one param");
    } else
      "set" === e.kind && "RestElement" === e.value.params[0].type && this.raiseRecoverable(e.value.params[0].start, "Setter cannot use rest params");
  }
}, so.parsePropertyName = function(e) {
  if (this.options.ecmaVersion >= 6) {
    if (this.eat(xa.bracketL))
      return e.computed = true, e.key = this.parseMaybeAssign(), this.expect(xa.bracketR), e.key;
    e.computed = false;
  }
  return e.key = this.type === xa.num || this.type === xa.string ? this.parseExprAtom() : this.parseIdent("never" !== this.options.allowReserved);
}, so.initFunction = function(e) {
  e.id = null, this.options.ecmaVersion >= 6 && (e.generator = e.expression = false), this.options.ecmaVersion >= 8 && (e.async = false);
}, so.parseMethod = function(e, t, i) {
  var s = this.startNode(), n3 = this.yieldPos, r2 = this.awaitPos, a2 = this.awaitIdentPos;
  return this.initFunction(s), this.options.ecmaVersion >= 6 && (s.generator = e), this.options.ecmaVersion >= 8 && (s.async = !!t), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(64 | Ba(t, s.generator) | (i ? 128 : 0)), this.expect(xa.parenL), s.params = this.parseBindingList(xa.parenR, false, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams(), this.parseFunctionBody(s, false, true, false), this.yieldPos = n3, this.awaitPos = r2, this.awaitIdentPos = a2, this.finishNode(s, "FunctionExpression");
}, so.parseArrowExpression = function(e, t, i, s) {
  var n3 = this.yieldPos, r2 = this.awaitPos, a2 = this.awaitIdentPos;
  return this.enterScope(16 | Ba(i, false)), this.initFunction(e), this.options.ecmaVersion >= 8 && (e.async = !!i), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, e.params = this.toAssignableList(t, true), this.parseFunctionBody(e, true, false, s), this.yieldPos = n3, this.awaitPos = r2, this.awaitIdentPos = a2, this.finishNode(e, "ArrowFunctionExpression");
}, so.parseFunctionBody = function(e, t, i, s) {
  var n3 = t && this.type !== xa.braceL, r2 = this.strict, a2 = false;
  if (n3)
    e.body = this.parseMaybeAssign(s), e.expression = true, this.checkParams(e, false);
  else {
    var o2 = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(e.params);
    r2 && !o2 || (a2 = this.strictDirective(this.end)) && o2 && this.raiseRecoverable(e.start, "Illegal 'use strict' directive in function with non-simple parameter list");
    var l2 = this.labels;
    this.labels = [], a2 && (this.strict = true), this.checkParams(e, !r2 && !a2 && !t && !i && this.isSimpleParamList(e.params)), this.strict && e.id && this.checkLValSimple(e.id, 5), e.body = this.parseBlock(false, void 0, a2 && !r2), e.expression = false, this.adaptDirectivePrologue(e.body.body), this.labels = l2;
  }
  this.exitScope();
}, so.isSimpleParamList = function(e) {
  for (var t = 0, i = e; t < i.length; t += 1) {
    if ("Identifier" !== i[t].type)
      return false;
  }
  return true;
}, so.checkParams = function(e, t) {
  for (var i = /* @__PURE__ */ Object.create(null), s = 0, n3 = e.params; s < n3.length; s += 1) {
    var r2 = n3[s];
    this.checkLValInnerPattern(r2, 1, t ? null : i);
  }
}, so.parseExprList = function(e, t, i, s) {
  for (var n3 = [], r2 = true; !this.eat(e); ) {
    if (r2)
      r2 = false;
    else if (this.expect(xa.comma), t && this.afterTrailingComma(e))
      break;
    var a2 = void 0;
    i && this.type === xa.comma ? a2 = null : this.type === xa.ellipsis ? (a2 = this.parseSpread(s), s && this.type === xa.comma && s.trailingComma < 0 && (s.trailingComma = this.start)) : a2 = this.parseMaybeAssign(false, s), n3.push(a2);
  }
  return n3;
}, so.checkUnreserved = function(e) {
  var t = e.start, i = e.end, s = e.name;
  (this.inGenerator && "yield" === s && this.raiseRecoverable(t, "Cannot use 'yield' as identifier inside a generator"), this.inAsync && "await" === s && this.raiseRecoverable(t, "Cannot use 'await' as identifier inside an async function"), this.currentThisScope().inClassFieldInit && "arguments" === s && this.raiseRecoverable(t, "Cannot use 'arguments' in class field initializer"), !this.inClassStaticBlock || "arguments" !== s && "await" !== s || this.raise(t, "Cannot use " + s + " in class static initialization block"), this.keywords.test(s) && this.raise(t, "Unexpected keyword '" + s + "'"), this.options.ecmaVersion < 6 && -1 !== this.input.slice(t, i).indexOf("\\")) || (this.strict ? this.reservedWordsStrict : this.reservedWords).test(s) && (this.inAsync || "await" !== s || this.raiseRecoverable(t, "Cannot use keyword 'await' outside an async function"), this.raiseRecoverable(t, "The keyword '" + s + "' is reserved"));
}, so.parseIdent = function(e, t) {
  var i = this.startNode();
  return this.type === xa.name ? i.name = this.value : this.type.keyword ? (i.name = this.type.keyword, "class" !== i.name && "function" !== i.name || this.lastTokEnd === this.lastTokStart + 1 && 46 === this.input.charCodeAt(this.lastTokStart) || this.context.pop()) : this.unexpected(), this.next(!!e), this.finishNode(i, "Identifier"), e || (this.checkUnreserved(i), "await" !== i.name || this.awaitIdentPos || (this.awaitIdentPos = i.start)), i;
}, so.parsePrivateIdent = function() {
  var e = this.startNode();
  return this.type === xa.privateId ? e.name = this.value : this.unexpected(), this.next(), this.finishNode(e, "PrivateIdentifier"), 0 === this.privateNameStack.length ? this.raise(e.start, "Private field '#" + e.name + "' must be declared in an enclosing class") : this.privateNameStack[this.privateNameStack.length - 1].used.push(e), e;
}, so.parseYield = function(e) {
  this.yieldPos || (this.yieldPos = this.start);
  var t = this.startNode();
  return this.next(), this.type === xa.semi || this.canInsertSemicolon() || this.type !== xa.star && !this.type.startsExpr ? (t.delegate = false, t.argument = null) : (t.delegate = this.eat(xa.star), t.argument = this.parseMaybeAssign(e)), this.finishNode(t, "YieldExpression");
}, so.parseAwait = function(e) {
  this.awaitPos || (this.awaitPos = this.start);
  var t = this.startNode();
  return this.next(), t.argument = this.parseMaybeUnary(null, true, false, e), this.finishNode(t, "AwaitExpression");
};
var ao = Fa.prototype;
ao.raise = function(e, t) {
  var i = Ma(this.input, e);
  t += " (" + i.line + ":" + i.column + ")";
  var s = new SyntaxError(t);
  throw s.pos = e, s.loc = i, s.raisedAt = this.pos, s;
}, ao.raiseRecoverable = ao.raise, ao.curPosition = function() {
  if (this.options.locations)
    return new Oa(this.curLine, this.pos - this.lineStart);
};
var oo = Fa.prototype;
var lo = function(e) {
  this.flags = e, this.var = [], this.lexical = [], this.functions = [], this.inClassFieldInit = false;
};
oo.enterScope = function(e) {
  this.scopeStack.push(new lo(e));
}, oo.exitScope = function() {
  this.scopeStack.pop();
}, oo.treatFunctionsAsVarInScope = function(e) {
  return 2 & e.flags || !this.inModule && 1 & e.flags;
}, oo.declareName = function(e, t, i) {
  var s = false;
  if (2 === t) {
    var n3 = this.currentScope();
    s = n3.lexical.indexOf(e) > -1 || n3.functions.indexOf(e) > -1 || n3.var.indexOf(e) > -1, n3.lexical.push(e), this.inModule && 1 & n3.flags && delete this.undefinedExports[e];
  } else if (4 === t) {
    this.currentScope().lexical.push(e);
  } else if (3 === t) {
    var r2 = this.currentScope();
    s = this.treatFunctionsAsVar ? r2.lexical.indexOf(e) > -1 : r2.lexical.indexOf(e) > -1 || r2.var.indexOf(e) > -1, r2.functions.push(e);
  } else
    for (var a2 = this.scopeStack.length - 1; a2 >= 0; --a2) {
      var o2 = this.scopeStack[a2];
      if (o2.lexical.indexOf(e) > -1 && !(32 & o2.flags && o2.lexical[0] === e) || !this.treatFunctionsAsVarInScope(o2) && o2.functions.indexOf(e) > -1) {
        s = true;
        break;
      }
      if (o2.var.push(e), this.inModule && 1 & o2.flags && delete this.undefinedExports[e], 259 & o2.flags)
        break;
    }
  s && this.raiseRecoverable(i, "Identifier '" + e + "' has already been declared");
}, oo.checkLocalExport = function(e) {
  -1 === this.scopeStack[0].lexical.indexOf(e.name) && -1 === this.scopeStack[0].var.indexOf(e.name) && (this.undefinedExports[e.name] = e);
}, oo.currentScope = function() {
  return this.scopeStack[this.scopeStack.length - 1];
}, oo.currentVarScope = function() {
  for (var e = this.scopeStack.length - 1; ; e--) {
    var t = this.scopeStack[e];
    if (259 & t.flags)
      return t;
  }
}, oo.currentThisScope = function() {
  for (var e = this.scopeStack.length - 1; ; e--) {
    var t = this.scopeStack[e];
    if (259 & t.flags && !(16 & t.flags))
      return t;
  }
};
var ho = function(e, t, i) {
  this.type = "", this.start = t, this.end = 0, e.options.locations && (this.loc = new Ra(e, i)), e.options.directSourceFile && (this.sourceFile = e.options.directSourceFile), e.options.ranges && (this.range = [t, 0]);
};
var co = Fa.prototype;
function uo(e, t, i, s) {
  return e.type = t, e.end = i, this.options.locations && (e.loc.end = s), this.options.ranges && (e.range[1] = i), e;
}
co.startNode = function() {
  return new ho(this, this.start, this.startLoc);
}, co.startNodeAt = function(e, t) {
  return new ho(this, e, t);
}, co.finishNode = function(e, t) {
  return uo.call(this, e, t, this.lastTokEnd, this.lastTokEndLoc);
}, co.finishNodeAt = function(e, t, i, s) {
  return uo.call(this, e, t, i, s);
}, co.copyNode = function(e) {
  var t = new ho(this, e.start, this.startLoc);
  for (var i in e)
    t[i] = e[i];
  return t;
};
var po = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS";
var fo = po + " Extended_Pictographic";
var mo = fo + " EBase EComp EMod EPres ExtPict";
var go = { 9: po, 10: fo, 11: fo, 12: mo, 13: "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS Extended_Pictographic EBase EComp EMod EPres ExtPict" };
var yo = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu";
var xo = "Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb";
var Eo = xo + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd";
var bo = Eo + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho";
var vo = bo + " Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi";
var So = { 9: xo, 10: Eo, 11: bo, 12: vo, 13: "Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith" };
var Ao = {};
function Io(e) {
  var t = Ao[e] = { binary: Na(go[e] + " " + yo), nonBinary: { General_Category: Na(yo), Script: Na(So[e]) } };
  t.nonBinary.Script_Extensions = t.nonBinary.Script, t.nonBinary.gc = t.nonBinary.General_Category, t.nonBinary.sc = t.nonBinary.Script, t.nonBinary.scx = t.nonBinary.Script_Extensions;
}
for (Po = 0, ko = [9, 10, 11, 12, 13]; Po < ko.length; Po += 1) {
  Io(ko[Po]);
}
var Po;
var ko;
var wo = Fa.prototype;
var Co = function(e) {
  this.parser = e, this.validFlags = "gim" + (e.options.ecmaVersion >= 6 ? "uy" : "") + (e.options.ecmaVersion >= 9 ? "s" : "") + (e.options.ecmaVersion >= 13 ? "d" : ""), this.unicodeProperties = Ao[e.options.ecmaVersion >= 13 ? 13 : e.options.ecmaVersion], this.source = "", this.flags = "", this.start = 0, this.switchU = false, this.switchN = false, this.pos = 0, this.lastIntValue = 0, this.lastStringValue = "", this.lastAssertionIsQuantifiable = false, this.numCapturingParens = 0, this.maxBackReference = 0, this.groupNames = [], this.backReferenceNames = [];
};
function _o(e) {
  return 36 === e || e >= 40 && e <= 43 || 46 === e || 63 === e || e >= 91 && e <= 94 || e >= 123 && e <= 125;
}
function No(e) {
  return e >= 65 && e <= 90 || e >= 97 && e <= 122;
}
function $o(e) {
  return No(e) || 95 === e;
}
function To(e) {
  return $o(e) || Oo(e);
}
function Oo(e) {
  return e >= 48 && e <= 57;
}
function Ro(e) {
  return e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102;
}
function Mo(e) {
  return e >= 65 && e <= 70 ? e - 65 + 10 : e >= 97 && e <= 102 ? e - 97 + 10 : e - 48;
}
function Do(e) {
  return e >= 48 && e <= 55;
}
Co.prototype.reset = function(e, t, i) {
  var s = -1 !== i.indexOf("u");
  this.start = 0 | e, this.source = t + "", this.flags = i, this.switchU = s && this.parser.options.ecmaVersion >= 6, this.switchN = s && this.parser.options.ecmaVersion >= 9;
}, Co.prototype.raise = function(e) {
  this.parser.raiseRecoverable(this.start, "Invalid regular expression: /" + this.source + "/: " + e);
}, Co.prototype.at = function(e, t) {
  void 0 === t && (t = false);
  var i = this.source, s = i.length;
  if (e >= s)
    return -1;
  var n3 = i.charCodeAt(e);
  if (!t && !this.switchU || n3 <= 55295 || n3 >= 57344 || e + 1 >= s)
    return n3;
  var r2 = i.charCodeAt(e + 1);
  return r2 >= 56320 && r2 <= 57343 ? (n3 << 10) + r2 - 56613888 : n3;
}, Co.prototype.nextIndex = function(e, t) {
  void 0 === t && (t = false);
  var i = this.source, s = i.length;
  if (e >= s)
    return s;
  var n3, r2 = i.charCodeAt(e);
  return !t && !this.switchU || r2 <= 55295 || r2 >= 57344 || e + 1 >= s || (n3 = i.charCodeAt(e + 1)) < 56320 || n3 > 57343 ? e + 1 : e + 2;
}, Co.prototype.current = function(e) {
  return void 0 === e && (e = false), this.at(this.pos, e);
}, Co.prototype.lookahead = function(e) {
  return void 0 === e && (e = false), this.at(this.nextIndex(this.pos, e), e);
}, Co.prototype.advance = function(e) {
  void 0 === e && (e = false), this.pos = this.nextIndex(this.pos, e);
}, Co.prototype.eat = function(e, t) {
  return void 0 === t && (t = false), this.current(t) === e && (this.advance(t), true);
}, wo.validateRegExpFlags = function(e) {
  for (var t = e.validFlags, i = e.flags, s = 0; s < i.length; s++) {
    var n3 = i.charAt(s);
    -1 === t.indexOf(n3) && this.raise(e.start, "Invalid regular expression flag"), i.indexOf(n3, s + 1) > -1 && this.raise(e.start, "Duplicate regular expression flag");
  }
}, wo.validateRegExpPattern = function(e) {
  this.regexp_pattern(e), !e.switchN && this.options.ecmaVersion >= 9 && e.groupNames.length > 0 && (e.switchN = true, this.regexp_pattern(e));
}, wo.regexp_pattern = function(e) {
  e.pos = 0, e.lastIntValue = 0, e.lastStringValue = "", e.lastAssertionIsQuantifiable = false, e.numCapturingParens = 0, e.maxBackReference = 0, e.groupNames.length = 0, e.backReferenceNames.length = 0, this.regexp_disjunction(e), e.pos !== e.source.length && (e.eat(41) && e.raise("Unmatched ')'"), (e.eat(93) || e.eat(125)) && e.raise("Lone quantifier brackets")), e.maxBackReference > e.numCapturingParens && e.raise("Invalid escape");
  for (var t = 0, i = e.backReferenceNames; t < i.length; t += 1) {
    var s = i[t];
    -1 === e.groupNames.indexOf(s) && e.raise("Invalid named capture referenced");
  }
}, wo.regexp_disjunction = function(e) {
  for (this.regexp_alternative(e); e.eat(124); )
    this.regexp_alternative(e);
  this.regexp_eatQuantifier(e, true) && e.raise("Nothing to repeat"), e.eat(123) && e.raise("Lone quantifier brackets");
}, wo.regexp_alternative = function(e) {
  for (; e.pos < e.source.length && this.regexp_eatTerm(e); )
    ;
}, wo.regexp_eatTerm = function(e) {
  return this.regexp_eatAssertion(e) ? (e.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(e) && e.switchU && e.raise("Invalid quantifier"), true) : !!(e.switchU ? this.regexp_eatAtom(e) : this.regexp_eatExtendedAtom(e)) && (this.regexp_eatQuantifier(e), true);
}, wo.regexp_eatAssertion = function(e) {
  var t = e.pos;
  if (e.lastAssertionIsQuantifiable = false, e.eat(94) || e.eat(36))
    return true;
  if (e.eat(92)) {
    if (e.eat(66) || e.eat(98))
      return true;
    e.pos = t;
  }
  if (e.eat(40) && e.eat(63)) {
    var i = false;
    if (this.options.ecmaVersion >= 9 && (i = e.eat(60)), e.eat(61) || e.eat(33))
      return this.regexp_disjunction(e), e.eat(41) || e.raise("Unterminated group"), e.lastAssertionIsQuantifiable = !i, true;
  }
  return e.pos = t, false;
}, wo.regexp_eatQuantifier = function(e, t) {
  return void 0 === t && (t = false), !!this.regexp_eatQuantifierPrefix(e, t) && (e.eat(63), true);
}, wo.regexp_eatQuantifierPrefix = function(e, t) {
  return e.eat(42) || e.eat(43) || e.eat(63) || this.regexp_eatBracedQuantifier(e, t);
}, wo.regexp_eatBracedQuantifier = function(e, t) {
  var i = e.pos;
  if (e.eat(123)) {
    var s = 0, n3 = -1;
    if (this.regexp_eatDecimalDigits(e) && (s = e.lastIntValue, e.eat(44) && this.regexp_eatDecimalDigits(e) && (n3 = e.lastIntValue), e.eat(125)))
      return -1 !== n3 && n3 < s && !t && e.raise("numbers out of order in {} quantifier"), true;
    e.switchU && !t && e.raise("Incomplete quantifier"), e.pos = i;
  }
  return false;
}, wo.regexp_eatAtom = function(e) {
  return this.regexp_eatPatternCharacters(e) || e.eat(46) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e);
}, wo.regexp_eatReverseSolidusAtomEscape = function(e) {
  var t = e.pos;
  if (e.eat(92)) {
    if (this.regexp_eatAtomEscape(e))
      return true;
    e.pos = t;
  }
  return false;
}, wo.regexp_eatUncapturingGroup = function(e) {
  var t = e.pos;
  if (e.eat(40)) {
    if (e.eat(63) && e.eat(58)) {
      if (this.regexp_disjunction(e), e.eat(41))
        return true;
      e.raise("Unterminated group");
    }
    e.pos = t;
  }
  return false;
}, wo.regexp_eatCapturingGroup = function(e) {
  if (e.eat(40)) {
    if (this.options.ecmaVersion >= 9 ? this.regexp_groupSpecifier(e) : 63 === e.current() && e.raise("Invalid group"), this.regexp_disjunction(e), e.eat(41))
      return e.numCapturingParens += 1, true;
    e.raise("Unterminated group");
  }
  return false;
}, wo.regexp_eatExtendedAtom = function(e) {
  return e.eat(46) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e) || this.regexp_eatInvalidBracedQuantifier(e) || this.regexp_eatExtendedPatternCharacter(e);
}, wo.regexp_eatInvalidBracedQuantifier = function(e) {
  return this.regexp_eatBracedQuantifier(e, true) && e.raise("Nothing to repeat"), false;
}, wo.regexp_eatSyntaxCharacter = function(e) {
  var t = e.current();
  return !!_o(t) && (e.lastIntValue = t, e.advance(), true);
}, wo.regexp_eatPatternCharacters = function(e) {
  for (var t = e.pos, i = 0; -1 !== (i = e.current()) && !_o(i); )
    e.advance();
  return e.pos !== t;
}, wo.regexp_eatExtendedPatternCharacter = function(e) {
  var t = e.current();
  return !(-1 === t || 36 === t || t >= 40 && t <= 43 || 46 === t || 63 === t || 91 === t || 94 === t || 124 === t) && (e.advance(), true);
}, wo.regexp_groupSpecifier = function(e) {
  if (e.eat(63)) {
    if (this.regexp_eatGroupName(e))
      return -1 !== e.groupNames.indexOf(e.lastStringValue) && e.raise("Duplicate capture group name"), void e.groupNames.push(e.lastStringValue);
    e.raise("Invalid group");
  }
}, wo.regexp_eatGroupName = function(e) {
  if (e.lastStringValue = "", e.eat(60)) {
    if (this.regexp_eatRegExpIdentifierName(e) && e.eat(62))
      return true;
    e.raise("Invalid capture group name");
  }
  return false;
}, wo.regexp_eatRegExpIdentifierName = function(e) {
  if (e.lastStringValue = "", this.regexp_eatRegExpIdentifierStart(e)) {
    for (e.lastStringValue += $a(e.lastIntValue); this.regexp_eatRegExpIdentifierPart(e); )
      e.lastStringValue += $a(e.lastIntValue);
    return true;
  }
  return false;
}, wo.regexp_eatRegExpIdentifierStart = function(e) {
  var t = e.pos, i = this.options.ecmaVersion >= 11, s = e.current(i);
  return e.advance(i), 92 === s && this.regexp_eatRegExpUnicodeEscapeSequence(e, i) && (s = e.lastIntValue), function(e2) {
    return ca(e2, true) || 36 === e2 || 95 === e2;
  }(s) ? (e.lastIntValue = s, true) : (e.pos = t, false);
}, wo.regexp_eatRegExpIdentifierPart = function(e) {
  var t = e.pos, i = this.options.ecmaVersion >= 11, s = e.current(i);
  return e.advance(i), 92 === s && this.regexp_eatRegExpUnicodeEscapeSequence(e, i) && (s = e.lastIntValue), function(e2) {
    return ua(e2, true) || 36 === e2 || 95 === e2 || 8204 === e2 || 8205 === e2;
  }(s) ? (e.lastIntValue = s, true) : (e.pos = t, false);
}, wo.regexp_eatAtomEscape = function(e) {
  return !!(this.regexp_eatBackReference(e) || this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e) || e.switchN && this.regexp_eatKGroupName(e)) || (e.switchU && (99 === e.current() && e.raise("Invalid unicode escape"), e.raise("Invalid escape")), false);
}, wo.regexp_eatBackReference = function(e) {
  var t = e.pos;
  if (this.regexp_eatDecimalEscape(e)) {
    var i = e.lastIntValue;
    if (e.switchU)
      return i > e.maxBackReference && (e.maxBackReference = i), true;
    if (i <= e.numCapturingParens)
      return true;
    e.pos = t;
  }
  return false;
}, wo.regexp_eatKGroupName = function(e) {
  if (e.eat(107)) {
    if (this.regexp_eatGroupName(e))
      return e.backReferenceNames.push(e.lastStringValue), true;
    e.raise("Invalid named reference");
  }
  return false;
}, wo.regexp_eatCharacterEscape = function(e) {
  return this.regexp_eatControlEscape(e) || this.regexp_eatCControlLetter(e) || this.regexp_eatZero(e) || this.regexp_eatHexEscapeSequence(e) || this.regexp_eatRegExpUnicodeEscapeSequence(e, false) || !e.switchU && this.regexp_eatLegacyOctalEscapeSequence(e) || this.regexp_eatIdentityEscape(e);
}, wo.regexp_eatCControlLetter = function(e) {
  var t = e.pos;
  if (e.eat(99)) {
    if (this.regexp_eatControlLetter(e))
      return true;
    e.pos = t;
  }
  return false;
}, wo.regexp_eatZero = function(e) {
  return 48 === e.current() && !Oo(e.lookahead()) && (e.lastIntValue = 0, e.advance(), true);
}, wo.regexp_eatControlEscape = function(e) {
  var t = e.current();
  return 116 === t ? (e.lastIntValue = 9, e.advance(), true) : 110 === t ? (e.lastIntValue = 10, e.advance(), true) : 118 === t ? (e.lastIntValue = 11, e.advance(), true) : 102 === t ? (e.lastIntValue = 12, e.advance(), true) : 114 === t && (e.lastIntValue = 13, e.advance(), true);
}, wo.regexp_eatControlLetter = function(e) {
  var t = e.current();
  return !!No(t) && (e.lastIntValue = t % 32, e.advance(), true);
}, wo.regexp_eatRegExpUnicodeEscapeSequence = function(e, t) {
  void 0 === t && (t = false);
  var i, s = e.pos, n3 = t || e.switchU;
  if (e.eat(117)) {
    if (this.regexp_eatFixedHexDigits(e, 4)) {
      var r2 = e.lastIntValue;
      if (n3 && r2 >= 55296 && r2 <= 56319) {
        var a2 = e.pos;
        if (e.eat(92) && e.eat(117) && this.regexp_eatFixedHexDigits(e, 4)) {
          var o2 = e.lastIntValue;
          if (o2 >= 56320 && o2 <= 57343)
            return e.lastIntValue = 1024 * (r2 - 55296) + (o2 - 56320) + 65536, true;
        }
        e.pos = a2, e.lastIntValue = r2;
      }
      return true;
    }
    if (n3 && e.eat(123) && this.regexp_eatHexDigits(e) && e.eat(125) && ((i = e.lastIntValue) >= 0 && i <= 1114111))
      return true;
    n3 && e.raise("Invalid unicode escape"), e.pos = s;
  }
  return false;
}, wo.regexp_eatIdentityEscape = function(e) {
  if (e.switchU)
    return !!this.regexp_eatSyntaxCharacter(e) || !!e.eat(47) && (e.lastIntValue = 47, true);
  var t = e.current();
  return !(99 === t || e.switchN && 107 === t) && (e.lastIntValue = t, e.advance(), true);
}, wo.regexp_eatDecimalEscape = function(e) {
  e.lastIntValue = 0;
  var t = e.current();
  if (t >= 49 && t <= 57) {
    do {
      e.lastIntValue = 10 * e.lastIntValue + (t - 48), e.advance();
    } while ((t = e.current()) >= 48 && t <= 57);
    return true;
  }
  return false;
}, wo.regexp_eatCharacterClassEscape = function(e) {
  var t = e.current();
  if (function(e2) {
    return 100 === e2 || 68 === e2 || 115 === e2 || 83 === e2 || 119 === e2 || 87 === e2;
  }(t))
    return e.lastIntValue = -1, e.advance(), true;
  if (e.switchU && this.options.ecmaVersion >= 9 && (80 === t || 112 === t)) {
    if (e.lastIntValue = -1, e.advance(), e.eat(123) && this.regexp_eatUnicodePropertyValueExpression(e) && e.eat(125))
      return true;
    e.raise("Invalid property name");
  }
  return false;
}, wo.regexp_eatUnicodePropertyValueExpression = function(e) {
  var t = e.pos;
  if (this.regexp_eatUnicodePropertyName(e) && e.eat(61)) {
    var i = e.lastStringValue;
    if (this.regexp_eatUnicodePropertyValue(e)) {
      var s = e.lastStringValue;
      return this.regexp_validateUnicodePropertyNameAndValue(e, i, s), true;
    }
  }
  if (e.pos = t, this.regexp_eatLoneUnicodePropertyNameOrValue(e)) {
    var n3 = e.lastStringValue;
    return this.regexp_validateUnicodePropertyNameOrValue(e, n3), true;
  }
  return false;
}, wo.regexp_validateUnicodePropertyNameAndValue = function(e, t, i) {
  Ca(e.unicodeProperties.nonBinary, t) || e.raise("Invalid property name"), e.unicodeProperties.nonBinary[t].test(i) || e.raise("Invalid property value");
}, wo.regexp_validateUnicodePropertyNameOrValue = function(e, t) {
  e.unicodeProperties.binary.test(t) || e.raise("Invalid property name");
}, wo.regexp_eatUnicodePropertyName = function(e) {
  var t = 0;
  for (e.lastStringValue = ""; $o(t = e.current()); )
    e.lastStringValue += $a(t), e.advance();
  return "" !== e.lastStringValue;
}, wo.regexp_eatUnicodePropertyValue = function(e) {
  var t = 0;
  for (e.lastStringValue = ""; To(t = e.current()); )
    e.lastStringValue += $a(t), e.advance();
  return "" !== e.lastStringValue;
}, wo.regexp_eatLoneUnicodePropertyNameOrValue = function(e) {
  return this.regexp_eatUnicodePropertyValue(e);
}, wo.regexp_eatCharacterClass = function(e) {
  if (e.eat(91)) {
    if (e.eat(94), this.regexp_classRanges(e), e.eat(93))
      return true;
    e.raise("Unterminated character class");
  }
  return false;
}, wo.regexp_classRanges = function(e) {
  for (; this.regexp_eatClassAtom(e); ) {
    var t = e.lastIntValue;
    if (e.eat(45) && this.regexp_eatClassAtom(e)) {
      var i = e.lastIntValue;
      !e.switchU || -1 !== t && -1 !== i || e.raise("Invalid character class"), -1 !== t && -1 !== i && t > i && e.raise("Range out of order in character class");
    }
  }
}, wo.regexp_eatClassAtom = function(e) {
  var t = e.pos;
  if (e.eat(92)) {
    if (this.regexp_eatClassEscape(e))
      return true;
    if (e.switchU) {
      var i = e.current();
      (99 === i || Do(i)) && e.raise("Invalid class escape"), e.raise("Invalid escape");
    }
    e.pos = t;
  }
  var s = e.current();
  return 93 !== s && (e.lastIntValue = s, e.advance(), true);
}, wo.regexp_eatClassEscape = function(e) {
  var t = e.pos;
  if (e.eat(98))
    return e.lastIntValue = 8, true;
  if (e.switchU && e.eat(45))
    return e.lastIntValue = 45, true;
  if (!e.switchU && e.eat(99)) {
    if (this.regexp_eatClassControlLetter(e))
      return true;
    e.pos = t;
  }
  return this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e);
}, wo.regexp_eatClassControlLetter = function(e) {
  var t = e.current();
  return !(!Oo(t) && 95 !== t) && (e.lastIntValue = t % 32, e.advance(), true);
}, wo.regexp_eatHexEscapeSequence = function(e) {
  var t = e.pos;
  if (e.eat(120)) {
    if (this.regexp_eatFixedHexDigits(e, 2))
      return true;
    e.switchU && e.raise("Invalid escape"), e.pos = t;
  }
  return false;
}, wo.regexp_eatDecimalDigits = function(e) {
  var t = e.pos, i = 0;
  for (e.lastIntValue = 0; Oo(i = e.current()); )
    e.lastIntValue = 10 * e.lastIntValue + (i - 48), e.advance();
  return e.pos !== t;
}, wo.regexp_eatHexDigits = function(e) {
  var t = e.pos, i = 0;
  for (e.lastIntValue = 0; Ro(i = e.current()); )
    e.lastIntValue = 16 * e.lastIntValue + Mo(i), e.advance();
  return e.pos !== t;
}, wo.regexp_eatLegacyOctalEscapeSequence = function(e) {
  if (this.regexp_eatOctalDigit(e)) {
    var t = e.lastIntValue;
    if (this.regexp_eatOctalDigit(e)) {
      var i = e.lastIntValue;
      t <= 3 && this.regexp_eatOctalDigit(e) ? e.lastIntValue = 64 * t + 8 * i + e.lastIntValue : e.lastIntValue = 8 * t + i;
    } else
      e.lastIntValue = t;
    return true;
  }
  return false;
}, wo.regexp_eatOctalDigit = function(e) {
  var t = e.current();
  return Do(t) ? (e.lastIntValue = t - 48, e.advance(), true) : (e.lastIntValue = 0, false);
}, wo.regexp_eatFixedHexDigits = function(e, t) {
  var i = e.pos;
  e.lastIntValue = 0;
  for (var s = 0; s < t; ++s) {
    var n3 = e.current();
    if (!Ro(n3))
      return e.pos = i, false;
    e.lastIntValue = 16 * e.lastIntValue + Mo(n3), e.advance();
  }
  return true;
};
var Lo = function(e) {
  this.type = e.type, this.value = e.value, this.start = e.start, this.end = e.end, e.options.locations && (this.loc = new Ra(e, e.startLoc, e.endLoc)), e.options.ranges && (this.range = [e.start, e.end]);
};
var Vo = Fa.prototype;
function Bo(e) {
  return "function" != typeof BigInt ? null : BigInt(e.replace(/_/g, ""));
}
Vo.next = function(e) {
  !e && this.type.keyword && this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword " + this.type.keyword), this.options.onToken && this.options.onToken(new Lo(this)), this.lastTokEnd = this.end, this.lastTokStart = this.start, this.lastTokEndLoc = this.endLoc, this.lastTokStartLoc = this.startLoc, this.nextToken();
}, Vo.getToken = function() {
  return this.next(), new Lo(this);
}, "undefined" != typeof Symbol && (Vo[Symbol.iterator] = function() {
  var e = this;
  return { next: function() {
    var t = e.getToken();
    return { done: t.type === xa.eof, value: t };
  } };
}), Vo.nextToken = function() {
  var e = this.curContext();
  return e && e.preserveSpace || this.skipSpace(), this.start = this.pos, this.options.locations && (this.startLoc = this.curPosition()), this.pos >= this.input.length ? this.finishToken(xa.eof) : e.override ? e.override(this) : void this.readToken(this.fullCharCodeAtPos());
}, Vo.readToken = function(e) {
  return ca(e, this.options.ecmaVersion >= 6) || 92 === e ? this.readWord() : this.getTokenFromCode(e);
}, Vo.fullCharCodeAtPos = function() {
  var e = this.input.charCodeAt(this.pos);
  if (e <= 55295 || e >= 56320)
    return e;
  var t = this.input.charCodeAt(this.pos + 1);
  return t <= 56319 || t >= 57344 ? e : (e << 10) + t - 56613888;
}, Vo.skipBlockComment = function() {
  var e = this.options.onComment && this.curPosition(), t = this.pos, i = this.input.indexOf("*/", this.pos += 2);
  if (-1 === i && this.raise(this.pos - 2, "Unterminated comment"), this.pos = i + 2, this.options.locations)
    for (var s = void 0, n3 = t; (s = Sa(this.input, n3, this.pos)) > -1; )
      ++this.curLine, n3 = this.lineStart = s;
  this.options.onComment && this.options.onComment(true, this.input.slice(t + 2, i), t, this.pos, e, this.curPosition());
}, Vo.skipLineComment = function(e) {
  for (var t = this.pos, i = this.options.onComment && this.curPosition(), s = this.input.charCodeAt(this.pos += e); this.pos < this.input.length && !va(s); )
    s = this.input.charCodeAt(++this.pos);
  this.options.onComment && this.options.onComment(false, this.input.slice(t + e, this.pos), t, this.pos, i, this.curPosition());
}, Vo.skipSpace = function() {
  e:
    for (; this.pos < this.input.length; ) {
      var e = this.input.charCodeAt(this.pos);
      switch (e) {
        case 32:
        case 160:
          ++this.pos;
          break;
        case 13:
          10 === this.input.charCodeAt(this.pos + 1) && ++this.pos;
        case 10:
        case 8232:
        case 8233:
          ++this.pos, this.options.locations && (++this.curLine, this.lineStart = this.pos);
          break;
        case 47:
          switch (this.input.charCodeAt(this.pos + 1)) {
            case 42:
              this.skipBlockComment();
              break;
            case 47:
              this.skipLineComment(2);
              break;
            default:
              break e;
          }
          break;
        default:
          if (!(e > 8 && e < 14 || e >= 5760 && Aa.test(String.fromCharCode(e))))
            break e;
          ++this.pos;
      }
    }
}, Vo.finishToken = function(e, t) {
  this.end = this.pos, this.options.locations && (this.endLoc = this.curPosition());
  var i = this.type;
  this.type = e, this.value = t, this.updateContext(i);
}, Vo.readToken_dot = function() {
  var e = this.input.charCodeAt(this.pos + 1);
  if (e >= 48 && e <= 57)
    return this.readNumber(true);
  var t = this.input.charCodeAt(this.pos + 2);
  return this.options.ecmaVersion >= 6 && 46 === e && 46 === t ? (this.pos += 3, this.finishToken(xa.ellipsis)) : (++this.pos, this.finishToken(xa.dot));
}, Vo.readToken_slash = function() {
  var e = this.input.charCodeAt(this.pos + 1);
  return this.exprAllowed ? (++this.pos, this.readRegexp()) : 61 === e ? this.finishOp(xa.assign, 2) : this.finishOp(xa.slash, 1);
}, Vo.readToken_mult_modulo_exp = function(e) {
  var t = this.input.charCodeAt(this.pos + 1), i = 1, s = 42 === e ? xa.star : xa.modulo;
  return this.options.ecmaVersion >= 7 && 42 === e && 42 === t && (++i, s = xa.starstar, t = this.input.charCodeAt(this.pos + 2)), 61 === t ? this.finishOp(xa.assign, i + 1) : this.finishOp(s, i);
}, Vo.readToken_pipe_amp = function(e) {
  var t = this.input.charCodeAt(this.pos + 1);
  if (t === e) {
    if (this.options.ecmaVersion >= 12) {
      if (61 === this.input.charCodeAt(this.pos + 2))
        return this.finishOp(xa.assign, 3);
    }
    return this.finishOp(124 === e ? xa.logicalOR : xa.logicalAND, 2);
  }
  return 61 === t ? this.finishOp(xa.assign, 2) : this.finishOp(124 === e ? xa.bitwiseOR : xa.bitwiseAND, 1);
}, Vo.readToken_caret = function() {
  return 61 === this.input.charCodeAt(this.pos + 1) ? this.finishOp(xa.assign, 2) : this.finishOp(xa.bitwiseXOR, 1);
}, Vo.readToken_plus_min = function(e) {
  var t = this.input.charCodeAt(this.pos + 1);
  return t === e ? 45 !== t || this.inModule || 62 !== this.input.charCodeAt(this.pos + 2) || 0 !== this.lastTokEnd && !Ea.test(this.input.slice(this.lastTokEnd, this.pos)) ? this.finishOp(xa.incDec, 2) : (this.skipLineComment(3), this.skipSpace(), this.nextToken()) : 61 === t ? this.finishOp(xa.assign, 2) : this.finishOp(xa.plusMin, 1);
}, Vo.readToken_lt_gt = function(e) {
  var t = this.input.charCodeAt(this.pos + 1), i = 1;
  return t === e ? (i = 62 === e && 62 === this.input.charCodeAt(this.pos + 2) ? 3 : 2, 61 === this.input.charCodeAt(this.pos + i) ? this.finishOp(xa.assign, i + 1) : this.finishOp(xa.bitShift, i)) : 33 !== t || 60 !== e || this.inModule || 45 !== this.input.charCodeAt(this.pos + 2) || 45 !== this.input.charCodeAt(this.pos + 3) ? (61 === t && (i = 2), this.finishOp(xa.relational, i)) : (this.skipLineComment(4), this.skipSpace(), this.nextToken());
}, Vo.readToken_eq_excl = function(e) {
  var t = this.input.charCodeAt(this.pos + 1);
  return 61 === t ? this.finishOp(xa.equality, 61 === this.input.charCodeAt(this.pos + 2) ? 3 : 2) : 61 === e && 62 === t && this.options.ecmaVersion >= 6 ? (this.pos += 2, this.finishToken(xa.arrow)) : this.finishOp(61 === e ? xa.eq : xa.prefix, 1);
}, Vo.readToken_question = function() {
  var e = this.options.ecmaVersion;
  if (e >= 11) {
    var t = this.input.charCodeAt(this.pos + 1);
    if (46 === t) {
      var i = this.input.charCodeAt(this.pos + 2);
      if (i < 48 || i > 57)
        return this.finishOp(xa.questionDot, 2);
    }
    if (63 === t) {
      if (e >= 12) {
        if (61 === this.input.charCodeAt(this.pos + 2))
          return this.finishOp(xa.assign, 3);
      }
      return this.finishOp(xa.coalesce, 2);
    }
  }
  return this.finishOp(xa.question, 1);
}, Vo.readToken_numberSign = function() {
  var e = 35;
  if (this.options.ecmaVersion >= 13 && (++this.pos, ca(e = this.fullCharCodeAtPos(), true) || 92 === e))
    return this.finishToken(xa.privateId, this.readWord1());
  this.raise(this.pos, "Unexpected character '" + $a(e) + "'");
}, Vo.getTokenFromCode = function(e) {
  switch (e) {
    case 46:
      return this.readToken_dot();
    case 40:
      return ++this.pos, this.finishToken(xa.parenL);
    case 41:
      return ++this.pos, this.finishToken(xa.parenR);
    case 59:
      return ++this.pos, this.finishToken(xa.semi);
    case 44:
      return ++this.pos, this.finishToken(xa.comma);
    case 91:
      return ++this.pos, this.finishToken(xa.bracketL);
    case 93:
      return ++this.pos, this.finishToken(xa.bracketR);
    case 123:
      return ++this.pos, this.finishToken(xa.braceL);
    case 125:
      return ++this.pos, this.finishToken(xa.braceR);
    case 58:
      return ++this.pos, this.finishToken(xa.colon);
    case 96:
      if (this.options.ecmaVersion < 6)
        break;
      return ++this.pos, this.finishToken(xa.backQuote);
    case 48:
      var t = this.input.charCodeAt(this.pos + 1);
      if (120 === t || 88 === t)
        return this.readRadixNumber(16);
      if (this.options.ecmaVersion >= 6) {
        if (111 === t || 79 === t)
          return this.readRadixNumber(8);
        if (98 === t || 66 === t)
          return this.readRadixNumber(2);
      }
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
      return this.readNumber(false);
    case 34:
    case 39:
      return this.readString(e);
    case 47:
      return this.readToken_slash();
    case 37:
    case 42:
      return this.readToken_mult_modulo_exp(e);
    case 124:
    case 38:
      return this.readToken_pipe_amp(e);
    case 94:
      return this.readToken_caret();
    case 43:
    case 45:
      return this.readToken_plus_min(e);
    case 60:
    case 62:
      return this.readToken_lt_gt(e);
    case 61:
    case 33:
      return this.readToken_eq_excl(e);
    case 63:
      return this.readToken_question();
    case 126:
      return this.finishOp(xa.prefix, 1);
    case 35:
      return this.readToken_numberSign();
  }
  this.raise(this.pos, "Unexpected character '" + $a(e) + "'");
}, Vo.finishOp = function(e, t) {
  var i = this.input.slice(this.pos, this.pos + t);
  return this.pos += t, this.finishToken(e, i);
}, Vo.readRegexp = function() {
  for (var e, t, i = this.pos; ; ) {
    this.pos >= this.input.length && this.raise(i, "Unterminated regular expression");
    var s = this.input.charAt(this.pos);
    if (Ea.test(s) && this.raise(i, "Unterminated regular expression"), e)
      e = false;
    else {
      if ("[" === s)
        t = true;
      else if ("]" === s && t)
        t = false;
      else if ("/" === s && !t)
        break;
      e = "\\" === s;
    }
    ++this.pos;
  }
  var n3 = this.input.slice(i, this.pos);
  ++this.pos;
  var r2 = this.pos, a2 = this.readWord1();
  this.containsEsc && this.unexpected(r2);
  var o2 = this.regexpState || (this.regexpState = new Co(this));
  o2.reset(i, n3, a2), this.validateRegExpFlags(o2), this.validateRegExpPattern(o2);
  var l2 = null;
  try {
    l2 = new RegExp(n3, a2);
  } catch (e2) {
  }
  return this.finishToken(xa.regexp, { pattern: n3, flags: a2, value: l2 });
}, Vo.readInt = function(e, t, i) {
  for (var s = this.options.ecmaVersion >= 12 && void 0 === t, n3 = i && 48 === this.input.charCodeAt(this.pos), r2 = this.pos, a2 = 0, o2 = 0, l2 = 0, h2 = null == t ? 1 / 0 : t; l2 < h2; ++l2, ++this.pos) {
    var c2 = this.input.charCodeAt(this.pos), u2 = void 0;
    if (s && 95 === c2)
      n3 && this.raiseRecoverable(this.pos, "Numeric separator is not allowed in legacy octal numeric literals"), 95 === o2 && this.raiseRecoverable(this.pos, "Numeric separator must be exactly one underscore"), 0 === l2 && this.raiseRecoverable(this.pos, "Numeric separator is not allowed at the first of digits"), o2 = c2;
    else {
      if ((u2 = c2 >= 97 ? c2 - 97 + 10 : c2 >= 65 ? c2 - 65 + 10 : c2 >= 48 && c2 <= 57 ? c2 - 48 : 1 / 0) >= e)
        break;
      o2 = c2, a2 = a2 * e + u2;
    }
  }
  return s && 95 === o2 && this.raiseRecoverable(this.pos - 1, "Numeric separator is not allowed at the last of digits"), this.pos === r2 || null != t && this.pos - r2 !== t ? null : a2;
}, Vo.readRadixNumber = function(e) {
  var t = this.pos;
  this.pos += 2;
  var i = this.readInt(e);
  return null == i && this.raise(this.start + 2, "Expected number in radix " + e), this.options.ecmaVersion >= 11 && 110 === this.input.charCodeAt(this.pos) ? (i = Bo(this.input.slice(t, this.pos)), ++this.pos) : ca(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(xa.num, i);
}, Vo.readNumber = function(e) {
  var t = this.pos;
  e || null !== this.readInt(10, void 0, true) || this.raise(t, "Invalid number");
  var i = this.pos - t >= 2 && 48 === this.input.charCodeAt(t);
  i && this.strict && this.raise(t, "Invalid number");
  var s = this.input.charCodeAt(this.pos);
  if (!i && !e && this.options.ecmaVersion >= 11 && 110 === s) {
    var n3 = Bo(this.input.slice(t, this.pos));
    return ++this.pos, ca(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(xa.num, n3);
  }
  i && /[89]/.test(this.input.slice(t, this.pos)) && (i = false), 46 !== s || i || (++this.pos, this.readInt(10), s = this.input.charCodeAt(this.pos)), 69 !== s && 101 !== s || i || (43 !== (s = this.input.charCodeAt(++this.pos)) && 45 !== s || ++this.pos, null === this.readInt(10) && this.raise(t, "Invalid number")), ca(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number");
  var r2, a2 = (r2 = this.input.slice(t, this.pos), i ? parseInt(r2, 8) : parseFloat(r2.replace(/_/g, "")));
  return this.finishToken(xa.num, a2);
}, Vo.readCodePoint = function() {
  var e;
  if (123 === this.input.charCodeAt(this.pos)) {
    this.options.ecmaVersion < 6 && this.unexpected();
    var t = ++this.pos;
    e = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos), ++this.pos, e > 1114111 && this.invalidStringToken(t, "Code point out of bounds");
  } else
    e = this.readHexChar(4);
  return e;
}, Vo.readString = function(e) {
  for (var t = "", i = ++this.pos; ; ) {
    this.pos >= this.input.length && this.raise(this.start, "Unterminated string constant");
    var s = this.input.charCodeAt(this.pos);
    if (s === e)
      break;
    92 === s ? (t += this.input.slice(i, this.pos), t += this.readEscapedChar(false), i = this.pos) : 8232 === s || 8233 === s ? (this.options.ecmaVersion < 10 && this.raise(this.start, "Unterminated string constant"), ++this.pos, this.options.locations && (this.curLine++, this.lineStart = this.pos)) : (va(s) && this.raise(this.start, "Unterminated string constant"), ++this.pos);
  }
  return t += this.input.slice(i, this.pos++), this.finishToken(xa.string, t);
};
var Fo = {};
Vo.tryReadTemplateToken = function() {
  this.inTemplateElement = true;
  try {
    this.readTmplToken();
  } catch (e) {
    if (e !== Fo)
      throw e;
    this.readInvalidTemplateToken();
  }
  this.inTemplateElement = false;
}, Vo.invalidStringToken = function(e, t) {
  if (this.inTemplateElement && this.options.ecmaVersion >= 9)
    throw Fo;
  this.raise(e, t);
}, Vo.readTmplToken = function() {
  for (var e = "", t = this.pos; ; ) {
    this.pos >= this.input.length && this.raise(this.start, "Unterminated template");
    var i = this.input.charCodeAt(this.pos);
    if (96 === i || 36 === i && 123 === this.input.charCodeAt(this.pos + 1))
      return this.pos !== this.start || this.type !== xa.template && this.type !== xa.invalidTemplate ? (e += this.input.slice(t, this.pos), this.finishToken(xa.template, e)) : 36 === i ? (this.pos += 2, this.finishToken(xa.dollarBraceL)) : (++this.pos, this.finishToken(xa.backQuote));
    if (92 === i)
      e += this.input.slice(t, this.pos), e += this.readEscapedChar(true), t = this.pos;
    else if (va(i)) {
      switch (e += this.input.slice(t, this.pos), ++this.pos, i) {
        case 13:
          10 === this.input.charCodeAt(this.pos) && ++this.pos;
        case 10:
          e += "\n";
          break;
        default:
          e += String.fromCharCode(i);
      }
      this.options.locations && (++this.curLine, this.lineStart = this.pos), t = this.pos;
    } else
      ++this.pos;
  }
}, Vo.readInvalidTemplateToken = function() {
  for (; this.pos < this.input.length; this.pos++)
    switch (this.input[this.pos]) {
      case "\\":
        ++this.pos;
        break;
      case "$":
        if ("{" !== this.input[this.pos + 1])
          break;
      case "`":
        return this.finishToken(xa.invalidTemplate, this.input.slice(this.start, this.pos));
    }
  this.raise(this.start, "Unterminated template");
}, Vo.readEscapedChar = function(e) {
  var t = this.input.charCodeAt(++this.pos);
  switch (++this.pos, t) {
    case 110:
      return "\n";
    case 114:
      return "\r";
    case 120:
      return String.fromCharCode(this.readHexChar(2));
    case 117:
      return $a(this.readCodePoint());
    case 116:
      return "	";
    case 98:
      return "\b";
    case 118:
      return "\v";
    case 102:
      return "\f";
    case 13:
      10 === this.input.charCodeAt(this.pos) && ++this.pos;
    case 10:
      return this.options.locations && (this.lineStart = this.pos, ++this.curLine), "";
    case 56:
    case 57:
      if (this.strict && this.invalidStringToken(this.pos - 1, "Invalid escape sequence"), e) {
        var i = this.pos - 1;
        return this.invalidStringToken(i, "Invalid escape sequence in template string"), null;
      }
    default:
      if (t >= 48 && t <= 55) {
        var s = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0], n3 = parseInt(s, 8);
        return n3 > 255 && (s = s.slice(0, -1), n3 = parseInt(s, 8)), this.pos += s.length - 1, t = this.input.charCodeAt(this.pos), "0" === s && 56 !== t && 57 !== t || !this.strict && !e || this.invalidStringToken(this.pos - 1 - s.length, e ? "Octal literal in template string" : "Octal literal in strict mode"), String.fromCharCode(n3);
      }
      return va(t) ? "" : String.fromCharCode(t);
  }
}, Vo.readHexChar = function(e) {
  var t = this.pos, i = this.readInt(16, e);
  return null === i && this.invalidStringToken(t, "Bad character escape sequence"), i;
}, Vo.readWord1 = function() {
  this.containsEsc = false;
  for (var e = "", t = true, i = this.pos, s = this.options.ecmaVersion >= 6; this.pos < this.input.length; ) {
    var n3 = this.fullCharCodeAtPos();
    if (ua(n3, s))
      this.pos += n3 <= 65535 ? 1 : 2;
    else {
      if (92 !== n3)
        break;
      this.containsEsc = true, e += this.input.slice(i, this.pos);
      var r2 = this.pos;
      117 !== this.input.charCodeAt(++this.pos) && this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX"), ++this.pos;
      var a2 = this.readCodePoint();
      (t ? ca : ua)(a2, s) || this.invalidStringToken(r2, "Invalid Unicode escape"), e += $a(a2), i = this.pos;
    }
    t = false;
  }
  return e + this.input.slice(i, this.pos);
}, Vo.readWord = function() {
  var e = this.readWord1(), t = xa.name;
  return this.keywords.test(e) && (t = ga[e]), this.finishToken(t, e);
};
Fa.acorn = { Parser: Fa, version: "8.7.1", defaultOptions: Da, Position: Oa, SourceLocation: Ra, getLineInfo: Ma, Node: ho, TokenType: da, tokTypes: xa, keywordTypes: ga, TokContext: eo, tokContexts: to, isIdentifierChar: ua, isIdentifierStart: ca, Token: Lo, isNewLine: va, lineBreak: Ea, lineBreakG: ba, nonASCIIwhitespace: Aa };
var zo = (e) => () => {
  pe({ code: "NO_FS_IN_BROWSER", message: `Cannot access the file system (via "${e}") when using the browser build of Rollup. Make sure you supply a plugin with custom resolveId and load hooks to Rollup.`, url: "https://rollupjs.org/guide/en/#a-simple-example" });
};
var jo = { mkdir: zo("fs.mkdir"), readFile: zo("fs.readFile"), writeFile: zo("fs.writeFile") };
async function Uo(e, t, i, s, n3, r2, a2, o2) {
  const l2 = await function(e2, t2, i2, s2, n4, r3, a3) {
    let o3 = null, l3 = null;
    if (n4) {
      o3 = /* @__PURE__ */ new Set();
      for (const i3 of n4)
        e2 === i3.source && t2 === i3.importer && o3.add(i3.plugin);
      l3 = (e3, t3) => ({ ...e3, resolve: (e4, i3, { custom: r4, isEntry: a4, skipSelf: o4 } = ie) => s2(e4, i3, r4, a4, o4 ? [...n4, { importer: i3, plugin: t3, source: e4 }] : n4) });
    }
    return i2.hookFirst("resolveId", [e2, t2, { custom: r3, isEntry: a3 }], l3, o3);
  }(e, t, s, n3, r2, a2, o2);
  return null == l2 && zo("path.resolve"), l2;
}
function Go(e, t, { hook: i, id: s } = {}) {
  return "string" == typeof e && (e = { message: e }), e.code && e.code !== me.PLUGIN_ERROR && (e.pluginCode = e.code), e.code = me.PLUGIN_ERROR, e.plugin = t, i && (e.hook = i), s && (e.id = s), pe(e);
}
var Ho = [{ active: true, deprecated: "resolveAssetUrl", replacement: "resolveFileUrl" }];
var Wo = { delete: () => false, get() {
}, has: () => false, set() {
} };
function qo(e) {
  return e.startsWith("at position ") || e.startsWith("at output position ") ? pe({ code: "ANONYMOUS_PLUGIN_CACHE", message: "A plugin is trying to use the Rollup cache but is not declaring a plugin name or cacheKey." }) : pe({ code: "DUPLICATE_PLUGIN_NAME", message: `The plugin name ${e} is being used twice in the same build. Plugin names must be distinct or provide a cacheKey (please post an issue to the plugin if you are a plugin user).` });
}
async function Ko(e, t, i, s) {
  const n3 = t.id, r2 = [];
  let a2 = null === e.map ? null : Or(e.map);
  const o2 = e.code;
  let l2 = e.ast;
  const c2 = [], u2 = [];
  let d2 = false;
  const p2 = () => d2 = true;
  let f2 = "";
  const m2 = e.code;
  let g2;
  try {
    g2 = await i.hookReduceArg0("transform", [m2, n3], function(e2, i2, n4) {
      let a3, o3;
      if ("string" == typeof i2)
        a3 = i2;
      else {
        if (!i2 || "object" != typeof i2)
          return e2;
        if (t.updateOptions(i2), null == i2.code)
          return (i2.map || i2.ast) && s(function(e3) {
            return { code: me.NO_TRANSFORM_MAP_OR_AST_WITHOUT_CODE, message: `The plugin "${e3}" returned a "map" or "ast" without returning a "code". This will be ignored.` };
          }(n4.name)), e2;
        ({ code: a3, map: o3, ast: l2 } = i2);
      }
      return null !== o3 && r2.push(Or("string" == typeof o3 ? JSON.parse(o3) : o3) || { missing: true, plugin: n4.name }), a3;
    }, (e2, t2) => {
      return f2 = t2.name, { ...e2, addWatchFile(t3) {
        c2.push(t3), e2.addWatchFile(t3);
      }, cache: d2 ? e2.cache : (l3 = e2.cache, g3 = p2, { delete: (e3) => (g3(), l3.delete(e3)), get: (e3) => (g3(), l3.get(e3)), has: (e3) => (g3(), l3.has(e3)), set: (e3, t3) => (g3(), l3.set(e3, t3)) }), emitAsset: (t3, i2) => (u2.push({ name: t3, source: i2, type: "asset" }), e2.emitAsset(t3, i2)), emitChunk: (t3, i2) => (u2.push({ id: t3, name: i2 && i2.name, type: "chunk" }), e2.emitChunk(t3, i2)), emitFile: (e3) => (u2.push(e3), i.emitFile(e3)), error: (t3, i2) => ("string" == typeof t3 && (t3 = { message: t3 }), i2 && fe(t3, i2, m2, n3), t3.id = n3, t3.hook = "transform", e2.error(t3)), getCombinedSourcemap() {
        const e3 = function(e4, t3, i2, s2, n4) {
          return s2.length ? { version: 3, ...Ln(e4, t3, i2, s2, Dn(n4)).traceMappings() } : i2;
        }(n3, o2, a2, r2, s);
        if (!e3) {
          return new x(o2).generateMap({ hires: true, includeContent: true, source: n3 });
        }
        return a2 !== e3 && (a2 = e3, r2.length = 0), new h({ ...e3, file: null, sourcesContent: e3.sourcesContent });
      }, setAssetSource() {
        return this.error({ code: "INVALID_SETASSETSOURCE", message: "setAssetSource cannot be called in transform for caching reasons. Use emitFile with a source, or call setAssetSource in another hook." });
      }, warn(t3, i2) {
        "string" == typeof t3 && (t3 = { message: t3 }), i2 && fe(t3, i2, m2, n3), t3.id = n3, t3.hook = "transform", e2.warn(t3);
      } };
      var l3, g3;
    });
  } catch (e2) {
    Go(e2, f2, { hook: "transform", id: n3 });
  }
  return d2 || u2.length && (t.transformFiles = u2), { ast: l2, code: g2, customTransformCache: d2, originalCode: o2, originalSourcemap: a2, sourcemapChain: r2, transformDependencies: c2 };
}
var Xo = class {
  constructor(e, t, i, s) {
    this.graph = e, this.modulesById = t, this.options = i, this.pluginDriver = s, this.implicitEntryModules = /* @__PURE__ */ new Set(), this.indexedEntryModules = [], this.latestLoadModulesPromise = Promise.resolve(), this.moduleLoadPromises = /* @__PURE__ */ new Map(), this.modulesWithLoadedDependencies = /* @__PURE__ */ new Set(), this.nextChunkNamePriority = 0, this.nextEntryModuleIndex = 0, this.resolveId = async (e2, t2, i2, s2, n3 = null) => this.getResolvedIdWithDefaults(this.getNormalizedResolvedIdWithoutDefaults(!this.options.external(e2, t2, false) && await Uo(e2, t2, this.options.preserveSymlinks, this.pluginDriver, this.resolveId, n3, i2, "boolean" == typeof s2 ? s2 : !t2), t2, e2)), this.hasModuleSideEffects = i.treeshake ? i.treeshake.moduleSideEffects : () => true;
  }
  async addAdditionalModules(e) {
    const t = this.extendLoadModulesPromise(Promise.all(e.map((e2) => this.loadEntryModule(e2, false, void 0, null))));
    return await this.awaitLoadModulesPromise(), t;
  }
  async addEntryModules(e, t) {
    const i = this.nextEntryModuleIndex;
    this.nextEntryModuleIndex += e.length;
    const s = this.nextChunkNamePriority;
    this.nextChunkNamePriority += e.length;
    const n3 = await this.extendLoadModulesPromise(Promise.all(e.map(({ id: e2, importer: t2 }) => this.loadEntryModule(e2, true, t2, null))).then((n4) => {
      for (let r2 = 0; r2 < n4.length; r2++) {
        const a2 = n4[r2];
        a2.isUserDefinedEntryPoint = a2.isUserDefinedEntryPoint || t, Qo(a2, e[r2], t, s + r2);
        const o2 = this.indexedEntryModules.find((e2) => e2.module === a2);
        o2 ? o2.index = Math.min(o2.index, i + r2) : this.indexedEntryModules.push({ index: i + r2, module: a2 });
      }
      return this.indexedEntryModules.sort(({ index: e2 }, { index: t2 }) => e2 > t2 ? 1 : -1), n4;
    }));
    return await this.awaitLoadModulesPromise(), { entryModules: this.indexedEntryModules.map(({ module: e2 }) => e2), implicitEntryModules: [...this.implicitEntryModules], newEntryModules: n3 };
  }
  async emitChunk({ fileName: e, id: t, importer: i, name: s, implicitlyLoadedAfterOneOf: n3, preserveSignature: r2 }) {
    const a2 = { fileName: e || null, id: t, importer: i, name: s || null }, o2 = n3 ? await this.addEntryWithImplicitDependants(a2, n3) : (await this.addEntryModules([a2], false)).newEntryModules[0];
    return null != r2 && (o2.preserveSignature = r2), o2;
  }
  async preloadModule(e) {
    return (await this.fetchModule(this.getResolvedIdWithDefaults(e), void 0, false, !e.resolveDependencies || "resolveDependencies")).info;
  }
  addEntryWithImplicitDependants(e, t) {
    const i = this.nextChunkNamePriority++;
    return this.extendLoadModulesPromise(this.loadEntryModule(e.id, false, e.importer, null).then(async (s) => {
      if (Qo(s, e, false, i), !s.info.isEntry) {
        this.implicitEntryModules.add(s);
        const i2 = await Promise.all(t.map((t2) => this.loadEntryModule(t2, false, e.importer, s.id)));
        for (const e2 of i2)
          s.implicitlyLoadedAfter.add(e2);
        for (const e2 of s.implicitlyLoadedAfter)
          e2.implicitlyLoadedBefore.add(s);
      }
      return s;
    }));
  }
  async addModuleSource(e, t, i) {
    let s;
    en("load modules", 3);
    try {
      s = await this.graph.fileOperationQueue.run(async () => {
        var t2;
        return null !== (t2 = await this.pluginDriver.hookFirst("load", [e])) && void 0 !== t2 ? t2 : await jo.readFile(e, "utf8");
      });
    } catch (i2) {
      tn("load modules", 3);
      let s2 = `Could not load ${e}`;
      throw t && (s2 += ` (imported by ${he(t)})`), s2 += `: ${i2.message}`, i2.message = s2, i2;
    }
    tn("load modules", 3);
    const n3 = "string" == typeof s ? { code: s } : null != s && "object" == typeof s && "string" == typeof s.code ? s : pe(function(e2) {
      return { code: me.BAD_LOADER, message: `Error loading ${he(e2)}: plugin load hook should return a string, a { code, map } object, or nothing/null` };
    }(e)), r2 = this.graph.cachedModules.get(e);
    if (!r2 || r2.customTransformCache || r2.originalCode !== n3.code || await this.pluginDriver.hookFirst("shouldTransformCachedModule", [{ ast: r2.ast, code: r2.code, id: r2.id, meta: r2.meta, moduleSideEffects: r2.moduleSideEffects, resolvedSources: r2.resolvedIds, syntheticNamedExports: r2.syntheticNamedExports }]))
      i.updateOptions(n3), i.setSource(await Ko(n3, i, this.pluginDriver, this.options.onwarn));
    else {
      if (r2.transformFiles)
        for (const e2 of r2.transformFiles)
          this.pluginDriver.emitFile(e2);
      i.setSource(r2);
    }
  }
  async awaitLoadModulesPromise() {
    let e;
    do {
      e = this.latestLoadModulesPromise, await e;
    } while (e !== this.latestLoadModulesPromise);
  }
  extendLoadModulesPromise(e) {
    return this.latestLoadModulesPromise = Promise.all([e, this.latestLoadModulesPromise]), this.latestLoadModulesPromise.catch(() => {
    }), e;
  }
  async fetchDynamicDependencies(e, t) {
    const i = await Promise.all(t.map((t2) => t2.then(async ([t3, i2]) => null === i2 ? null : "string" == typeof i2 ? (t3.resolution = i2, null) : t3.resolution = await this.fetchResolvedDependency(he(i2.id), e.id, i2))));
    for (const t2 of i)
      t2 && (e.dynamicDependencies.add(t2), t2.dynamicImporters.push(e.id));
  }
  async fetchModule({ id: e, meta: t, moduleSideEffects: i, syntheticNamedExports: s }, n3, r2, a2) {
    const o2 = this.modulesById.get(e);
    if (o2 instanceof ln)
      return await this.handleExistingModule(o2, r2, a2), o2;
    const l2 = new ln(this.graph, e, this.options, r2, i, s, t);
    this.modulesById.set(e, l2), this.graph.watchFiles[e] = true;
    const h2 = this.addModuleSource(e, n3, l2).then(() => [this.getResolveStaticDependencyPromises(l2), this.getResolveDynamicImportPromises(l2), c2]), c2 = Zo(h2).then(() => this.pluginDriver.hookParallel("moduleParsed", [l2.info]));
    c2.catch(() => {
    }), this.moduleLoadPromises.set(l2, h2);
    const u2 = await h2;
    return a2 ? "resolveDependencies" === a2 && await c2 : await this.fetchModuleDependencies(l2, ...u2), l2;
  }
  async fetchModuleDependencies(e, t, i, s) {
    this.modulesWithLoadedDependencies.has(e) || (this.modulesWithLoadedDependencies.add(e), await Promise.all([this.fetchStaticDependencies(e, t), this.fetchDynamicDependencies(e, i)]), e.linkImports(), await s);
  }
  fetchResolvedDependency(e, t, i) {
    if (i.external) {
      const { external: s, id: n3, moduleSideEffects: r2, meta: a2 } = i;
      this.modulesById.has(n3) || this.modulesById.set(n3, new $e(this.options, n3, r2, a2, "absolute" !== s && k(n3)));
      const o2 = this.modulesById.get(n3);
      return o2 instanceof $e ? Promise.resolve(o2) : pe(function(e2, t2) {
        return { code: me.INVALID_EXTERNAL_ID, message: `'${e2}' is imported as an external by ${he(t2)}, but is already an existing non-external module id.` };
      }(e, t));
    }
    return this.fetchModule(i, t, false, false);
  }
  async fetchStaticDependencies(e, t) {
    for (const i of await Promise.all(t.map((t2) => t2.then(([t3, i2]) => this.fetchResolvedDependency(t3, e.id, i2)))))
      e.dependencies.add(i), i.importers.push(e.id);
    if (!this.options.treeshake || "no-treeshake" === e.info.moduleSideEffects)
      for (const t2 of e.dependencies)
        t2 instanceof ln && (t2.importedFromNotTreeshaken = true);
  }
  getNormalizedResolvedIdWithoutDefaults(e, t, i) {
    const { makeAbsoluteExternalsRelative: s } = this.options;
    if (e) {
      if ("object" == typeof e) {
        const n5 = e.external || this.options.external(e.id, t, true);
        return { ...e, external: n5 && ("relative" === n5 || !k(e.id) || true === n5 && Jo(e.id, i, s) || "absolute") };
      }
      const n4 = this.options.external(e, t, true);
      return { external: n4 && (Jo(e, i, s) || "absolute"), id: n4 && s ? Yo(e, t) : e };
    }
    const n3 = s ? Yo(i, t) : i;
    return false === e || this.options.external(n3, t, true) ? { external: Jo(n3, i, s) || "absolute", id: n3 } : null;
  }
  getResolveDynamicImportPromises(e) {
    return e.dynamicImports.map(async (t) => {
      const i = await this.resolveDynamicImport(e, "string" == typeof t.argument ? t.argument : t.argument.esTreeNode, e.id);
      return i && "object" == typeof i && (t.id = i.id), [t, i];
    });
  }
  getResolveStaticDependencyPromises(e) {
    return Array.from(e.sources, async (t) => [t, e.resolvedIds[t] = e.resolvedIds[t] || this.handleResolveId(await this.resolveId(t, e.id, se, false), t, e.id)]);
  }
  getResolvedIdWithDefaults(e) {
    var t, i;
    if (!e)
      return null;
    const s = e.external || false;
    return { external: s, id: e.id, meta: e.meta || {}, moduleSideEffects: null !== (t = e.moduleSideEffects) && void 0 !== t ? t : this.hasModuleSideEffects(e.id, !!s), syntheticNamedExports: null !== (i = e.syntheticNamedExports) && void 0 !== i && i };
  }
  async handleExistingModule(e, t, i) {
    const s = this.moduleLoadPromises.get(e);
    if (i)
      return "resolveDependencies" === i ? Zo(s) : s;
    if (t) {
      e.info.isEntry = true, this.implicitEntryModules.delete(e);
      for (const t2 of e.implicitlyLoadedAfter)
        t2.implicitlyLoadedBefore.delete(e);
      e.implicitlyLoadedAfter.clear();
    }
    return this.fetchModuleDependencies(e, ...await s);
  }
  handleResolveId(e, t, i) {
    return null === e ? w(t) ? pe(function(e2, t2) {
      return { code: me.UNRESOLVED_IMPORT, message: `Could not resolve '${e2}' from ${he(t2)}` };
    }(t, i)) : (this.options.onwarn(function(e2, t2) {
      return { code: me.UNRESOLVED_IMPORT, importer: he(t2), message: `'${e2}' is imported by ${he(t2)}, but could not be resolved \u2013 treating it as an external dependency`, source: e2, url: "https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency" };
    }(t, i)), { external: true, id: t, meta: {}, moduleSideEffects: this.hasModuleSideEffects(t, true), syntheticNamedExports: false }) : (e.external && e.syntheticNamedExports && this.options.onwarn(function(e2, t2) {
      return { code: me.EXTERNAL_SYNTHETIC_EXPORTS, importer: he(t2), message: `External '${e2}' can not have 'syntheticNamedExports' enabled.`, source: e2 };
    }(t, i)), e);
  }
  async loadEntryModule(e, t, i, s) {
    const n3 = await Uo(e, i, this.options.preserveSymlinks, this.pluginDriver, this.resolveId, null, se, true);
    return null == n3 ? pe(null === s ? function(e2) {
      return { code: me.UNRESOLVED_ENTRY, message: `Could not resolve entry module (${he(e2)}).` };
    }(e) : function(e2, t2) {
      return { code: me.MISSING_IMPLICIT_DEPENDANT, message: `Module "${he(e2)}" that should be implicitly loaded before "${he(t2)}" could not be resolved.` };
    }(e, s)) : false === n3 || "object" == typeof n3 && n3.external ? pe(null === s ? function(e2) {
      return { code: me.UNRESOLVED_ENTRY, message: `Entry module cannot be external (${he(e2)}).` };
    }(e) : function(e2, t2) {
      return { code: me.MISSING_IMPLICIT_DEPENDANT, message: `Module "${he(e2)}" that should be implicitly loaded before "${he(t2)}" cannot be external.` };
    }(e, s)) : this.fetchModule(this.getResolvedIdWithDefaults("object" == typeof n3 ? n3 : { id: n3 }), void 0, t, false);
  }
  async resolveDynamicImport(e, t, i) {
    var s, n3;
    const r2 = await this.pluginDriver.hookFirst("resolveDynamicImport", [t, i]);
    return "string" != typeof t ? "string" == typeof r2 ? r2 : r2 ? { external: false, moduleSideEffects: true, ...r2 } : null : null == r2 ? null !== (s = (n3 = e.resolvedIds)[t]) && void 0 !== s ? s : n3[t] = this.handleResolveId(await this.resolveId(t, e.id, se, false), t, e.id) : this.handleResolveId(this.getResolvedIdWithDefaults(this.getNormalizedResolvedIdWithoutDefaults(r2, i, t)), t, i);
  }
};
function Yo(e, t) {
  return w(e) ? t ? O(t, "..", e) : O(e) : e;
}
function Qo(e, { fileName: t, name: i }, s, n3) {
  var r2;
  if (null !== t)
    e.chunkFileNames.add(t);
  else if (null !== i) {
    let t2 = 0;
    for (; (null === (r2 = e.chunkNames[t2]) || void 0 === r2 ? void 0 : r2.priority) < n3; )
      t2++;
    e.chunkNames.splice(t2, 0, { isUserDefined: s, name: i, priority: n3 });
  }
}
function Jo(e, t, i) {
  return true === i || "ifRelativeSource" === i && w(t) || !k(e);
}
async function Zo(e) {
  const [t, i] = await e;
  return Promise.all([...t, ...i]);
}
var el = class extends Bt {
  constructor() {
    super(), this.parent = null, this.variables.set("undefined", new Rs());
  }
  findVariable(e) {
    let t = this.variables.get(e);
    return t || (t = new ii(e), this.variables.set(e, t)), t;
  }
};
function tl(e, t, i) {
  const s = e.toLowerCase();
  t[Rr].has(s) ? i(function(e2) {
    return { code: me.FILE_NAME_CONFLICT, message: `The emitted file "${e2}" overwrites a previously emitted file of the same name.` };
  }(e)) : t[e] = Mr;
}
function il(e, t, i) {
  if (!("string" == typeof e || e instanceof Uint8Array)) {
    const e2 = t.fileName || t.name || i;
    return pe(Ae(`Could not set source for ${"string" == typeof e2 ? `asset "${e2}"` : "unnamed asset"}, asset source needs to be a string, Uint8Array or Buffer.`));
  }
  return e;
}
function sl(e, t) {
  return "string" != typeof e.fileName ? pe((i = e.name || t, { code: me.ASSET_NOT_FINALISED, message: `Plugin error - Unable to get file name for asset "${i}". Ensure that the source is set and that generate is called first.` })) : e.fileName;
  var i;
}
function nl(e, t) {
  var i;
  const s = e.fileName || e.module && (null === (i = null == t ? void 0 : t.get(e.module)) || void 0 === i ? void 0 : i.id);
  return s || pe((n3 = e.fileName || e.name, { code: me.CHUNK_NOT_GENERATED, message: `Plugin error - Unable to get file name for chunk "${n3}". Ensure that generate is called first.` }));
  var n3;
}
var rl = class {
  constructor(e, t, i) {
    this.graph = e, this.options = t, this.bundle = null, this.facadeChunkByModule = null, this.outputOptions = null, this.assertAssetsFinalized = () => {
      for (const [t2, i2] of this.filesByReferenceId)
        if ("asset" === i2.type && "string" != typeof i2.fileName)
          return pe((e2 = i2.name || t2, { code: me.ASSET_SOURCE_MISSING, message: `Plugin error creating asset "${e2}" - no asset source set.` }));
      var e2;
    }, this.emitFile = (e2) => function(e3) {
      return Boolean(e3 && ("asset" === e3.type || "chunk" === e3.type));
    }(e2) ? function(e3) {
      const t2 = e3.fileName || e3.name;
      return !t2 || "string" == typeof t2 && !ce(t2);
    }(e2) ? "chunk" === e2.type ? this.emitChunk(e2) : this.emitAsset(e2) : pe(Ae(`The "fileName" or "name" properties of emitted files must be strings that are neither absolute nor relative paths, received "${e2.fileName || e2.name}".`)) : pe(Ae(`Emitted files must be of type "asset" or "chunk", received "${e2 && e2.type}".`)), this.getFileName = (e2) => {
      const t2 = this.filesByReferenceId.get(e2);
      return t2 ? "chunk" === t2.type ? nl(t2, this.facadeChunkByModule) : sl(t2, e2) : pe((i2 = e2, { code: me.FILE_NOT_FOUND, message: `Plugin error - Unable to get file name for unknown file "${i2}".` }));
      var i2;
    }, this.setAssetSource = (e2, t2) => {
      const i2 = this.filesByReferenceId.get(e2);
      if (!i2)
        return pe((s = e2, { code: me.ASSET_NOT_FOUND, message: `Plugin error - Unable to set the source for unknown asset "${s}".` }));
      var s, n3;
      if ("asset" !== i2.type)
        return pe(Ae(`Asset sources can only be set for emitted assets but "${e2}" is an emitted chunk.`));
      if (void 0 !== i2.source)
        return pe((n3 = i2.name || e2, { code: me.ASSET_SOURCE_ALREADY_SET, message: `Unable to set the source for asset "${n3}", source already set.` }));
      const r2 = il(t2, i2, e2);
      this.bundle ? this.finalizeAsset(i2, r2, e2, this.bundle) : i2.source = r2;
    }, this.setOutputBundle = (e2, t2, i2) => {
      this.outputOptions = t2, this.bundle = e2, this.facadeChunkByModule = i2;
      for (const { fileName: t3 } of this.filesByReferenceId.values())
        t3 && tl(t3, e2, this.options.onwarn);
      for (const [t3, i3] of this.filesByReferenceId)
        "asset" === i3.type && void 0 !== i3.source && this.finalizeAsset(i3, i3.source, t3, e2);
    }, this.filesByReferenceId = i ? new Map(i.filesByReferenceId) : /* @__PURE__ */ new Map();
  }
  assignReferenceId(e, t) {
    let i;
    do {
      i = vr().update(i || t).digest("hex").substring(0, 8);
    } while (this.filesByReferenceId.has(i));
    return this.filesByReferenceId.set(i, e), i;
  }
  emitAsset(e) {
    const t = void 0 !== e.source ? il(e.source, e, null) : void 0, i = { fileName: e.fileName, name: e.name, source: t, type: "asset" }, s = this.assignReferenceId(i, e.fileName || e.name || e.type);
    return this.bundle && (e.fileName && tl(e.fileName, this.bundle, this.options.onwarn), void 0 !== t && this.finalizeAsset(i, t, s, this.bundle)), s;
  }
  emitChunk(e) {
    if (this.graph.phase > Gs.LOAD_AND_PARSE)
      return pe({ code: me.INVALID_ROLLUP_PHASE, message: "Cannot emit chunks after module loading has finished." });
    if ("string" != typeof e.id)
      return pe(Ae(`Emitted chunks need to have a valid string id, received "${e.id}"`));
    const t = { fileName: e.fileName, module: null, name: e.name || e.id, type: "chunk" };
    return this.graph.moduleLoader.emitChunk(e).then((e2) => t.module = e2).catch(() => {
    }), this.assignReferenceId(t, e.id);
  }
  finalizeAsset(e, t, i, s) {
    const n3 = e.fileName || function(e2, t2) {
      for (const [i2, s2] of Object.entries(e2))
        if ("asset" === s2.type && al(t2, s2.source))
          return i2;
      return null;
    }(s, t) || function(e2, t2, i2, s2) {
      const n4 = i2.sanitizeFileName(e2 || "asset");
      return Lr(Dr("function" == typeof i2.assetFileNames ? i2.assetFileNames({ name: e2, source: t2, type: "asset" }) : i2.assetFileNames, "output.assetFileNames", { ext: () => $(n4).substring(1), extname: () => $(n4), hash: () => vr().update(n4).update(":").update(t2).digest("hex").substring(0, 8), name: () => n4.substring(0, n4.length - $(n4).length) }), s2);
    }(e.name, t, this.outputOptions, s), r2 = { ...e, fileName: n3, source: t };
    this.filesByReferenceId.set(i, r2);
    const { options: a2 } = this;
    s[n3] = { fileName: n3, get isAsset() {
      return Pe(`Accessing "isAsset" on files in the bundle is deprecated, please use "type === 'asset'" instead`, true, a2), true;
    }, name: e.name, source: t, type: "asset" };
  }
};
function al(e, t) {
  if ("string" == typeof e)
    return e === t;
  if ("string" == typeof t)
    return false;
  if ("equals" in e)
    return e.equals(t);
  if (e.length !== t.length)
    return false;
  for (let i = 0; i < e.length; i++)
    if (e[i] !== t[i])
      return false;
  return true;
}
function ol(e, t, i, s, n3, r2) {
  let a2 = false;
  return (...o2) => (a2 || (a2 = true, Pe({ message: `The "this.${t}" plugin context function used by plugin ${s} is deprecated. The "this.${i}" plugin context function should be used instead.`, plugin: s }, n3, r2)), e(...o2));
}
function ll(e, t, i, s, n3, r2) {
  let a2, o2 = true;
  if ("string" != typeof e.cacheKey && (e.name.startsWith("at position ") || e.name.startsWith("at output position ") || r2.has(e.name) ? o2 = false : r2.add(e.name)), t)
    if (o2) {
      const i2 = e.cacheKey || e.name;
      h2 = t[i2] || (t[i2] = /* @__PURE__ */ Object.create(null)), a2 = { delete: (e2) => delete h2[e2], get(e2) {
        const t2 = h2[e2];
        if (t2)
          return t2[0] = 0, t2[1];
      }, has(e2) {
        const t2 = h2[e2];
        return !!t2 && (t2[0] = 0, true);
      }, set(e2, t2) {
        h2[e2] = [0, t2];
      } };
    } else
      l2 = e.name, a2 = { delete: () => qo(l2), get: () => qo(l2), has: () => qo(l2), set: () => qo(l2) };
  else
    a2 = Wo;
  var l2, h2;
  return { addWatchFile(e2) {
    if (i.phase >= Gs.GENERATE)
      return this.error({ code: me.INVALID_ROLLUP_PHASE, message: "Cannot call addWatchFile after the build has finished." });
    i.watchFiles[e2] = true;
  }, cache: a2, emitAsset: ol((e2, t2) => n3.emitFile({ name: e2, source: t2, type: "asset" }), "emitAsset", "emitFile", e.name, true, s), emitChunk: ol((e2, t2) => n3.emitFile({ id: e2, name: t2 && t2.name, type: "chunk" }), "emitChunk", "emitFile", e.name, true, s), emitFile: n3.emitFile.bind(n3), error: (t2) => Go(t2, e.name), getAssetFileName: ol(n3.getFileName, "getAssetFileName", "getFileName", e.name, true, s), getChunkFileName: ol(n3.getFileName, "getChunkFileName", "getFileName", e.name, true, s), getFileName: n3.getFileName, getModuleIds: () => i.modulesById.keys(), getModuleInfo: i.getModuleInfo, getWatchFiles: () => Object.keys(i.watchFiles), isExternal: ol((e2, t2, i2 = false) => s.external(e2, t2, i2), "isExternal", "resolve", e.name, true, s), load: (e2) => i.moduleLoader.preloadModule(e2), meta: { rollupVersion: "2.79.1", watchMode: i.watchMode }, get moduleIds() {
    const t2 = i.modulesById.keys();
    return function* () {
      Pe({ message: `Accessing "this.moduleIds" on the plugin context by plugin ${e.name} is deprecated. The "this.getModuleIds" plugin context function should be used instead.`, plugin: e.name }, false, s), yield* t2;
    }();
  }, parse: i.contextParse.bind(i), resolve: (t2, s2, { custom: n4, isEntry: r3, skipSelf: a3 } = ie) => i.moduleLoader.resolveId(t2, s2, n4, r3, a3 ? [{ importer: s2, plugin: e, source: t2 }] : null), resolveId: ol((e2, t2) => i.moduleLoader.resolveId(e2, t2, ie, void 0).then((e3) => e3 && e3.id), "resolveId", "resolve", e.name, true, s), setAssetSource: n3.setAssetSource, warn(t2) {
    "string" == typeof t2 && (t2 = { message: t2 }), t2.code && (t2.pluginCode = t2.code), t2.code = "PLUGIN_WARNING", t2.plugin = e.name, s.onwarn(t2);
  } };
}
var hl = Object.keys({ buildEnd: 1, buildStart: 1, closeBundle: 1, closeWatcher: 1, load: 1, moduleParsed: 1, options: 1, resolveDynamicImport: 1, resolveId: 1, shouldTransformCachedModule: 1, transform: 1, watchChange: 1 });
var cl = class {
  constructor(e, t, i, s, n3) {
    this.graph = e, this.options = t, this.pluginCache = s, this.sortedPlugins = /* @__PURE__ */ new Map(), this.unfulfilledActions = /* @__PURE__ */ new Set(), function(e2, t2) {
      for (const { active: i2, deprecated: s2, replacement: n4 } of Ho)
        for (const r3 of e2)
          s2 in r3 && Pe({ message: `The "${s2}" hook used by plugin ${r3.name} is deprecated. The "${n4}" hook should be used instead.`, plugin: r3.name }, i2, t2);
    }(i, t), this.fileEmitter = new rl(e, t, n3 && n3.fileEmitter), this.emitFile = this.fileEmitter.emitFile.bind(this.fileEmitter), this.getFileName = this.fileEmitter.getFileName.bind(this.fileEmitter), this.finaliseAssets = this.fileEmitter.assertAssetsFinalized.bind(this.fileEmitter), this.setOutputBundle = this.fileEmitter.setOutputBundle.bind(this.fileEmitter), this.plugins = i.concat(n3 ? n3.plugins : []);
    const r2 = /* @__PURE__ */ new Set();
    if (this.pluginContexts = new Map(this.plugins.map((i2) => [i2, ll(i2, s, e, t, this.fileEmitter, r2)])), n3)
      for (const e2 of i)
        for (const i2 of hl)
          i2 in e2 && t.onwarn((a2 = e2.name, o2 = i2, { code: me.INPUT_HOOK_IN_OUTPUT_PLUGIN, message: `The "${o2}" hook used by the output plugin ${a2} is a build time hook and will not be run for that plugin. Either this plugin cannot be used as an output plugin, or it should have an option to configure it as an output plugin.` }));
    var a2, o2;
  }
  createOutputPluginDriver(e) {
    return new cl(this.graph, this.options, e, this.pluginCache, this);
  }
  getUnfulfilledHookActions() {
    return this.unfulfilledActions;
  }
  hookFirst(e, t, i, s) {
    let n3 = Promise.resolve(null);
    for (const r2 of this.getSortedPlugins(e))
      s && s.has(r2) || (n3 = n3.then((s2) => null != s2 ? s2 : this.runHook(e, t, r2, i)));
    return n3;
  }
  hookFirstSync(e, t, i) {
    for (const s of this.getSortedPlugins(e)) {
      const n3 = this.runHookSync(e, t, s, i);
      if (null != n3)
        return n3;
    }
    return null;
  }
  async hookParallel(e, t, i) {
    const s = [];
    for (const n3 of this.getSortedPlugins(e))
      n3[e].sequential ? (await Promise.all(s), s.length = 0, await this.runHook(e, t, n3, i)) : s.push(this.runHook(e, t, n3, i));
    await Promise.all(s);
  }
  hookReduceArg0(e, [t, ...i], s, n3) {
    let r2 = Promise.resolve(t);
    for (const t2 of this.getSortedPlugins(e))
      r2 = r2.then((r3) => this.runHook(e, [r3, ...i], t2, n3).then((e2) => s.call(this.pluginContexts.get(t2), r3, e2, t2)));
    return r2;
  }
  hookReduceArg0Sync(e, [t, ...i], s, n3) {
    for (const r2 of this.getSortedPlugins(e)) {
      const a2 = [t, ...i], o2 = this.runHookSync(e, a2, r2, n3);
      t = s.call(this.pluginContexts.get(r2), t, o2, r2);
    }
    return t;
  }
  async hookReduceValue(e, t, i, s) {
    const n3 = [], r2 = [];
    for (const t2 of this.getSortedPlugins(e, pl))
      t2[e].sequential ? (n3.push(...await Promise.all(r2)), r2.length = 0, n3.push(await this.runHook(e, i, t2))) : r2.push(this.runHook(e, i, t2));
    return n3.push(...await Promise.all(r2)), n3.reduce(s, await t);
  }
  hookReduceValueSync(e, t, i, s, n3) {
    let r2 = t;
    for (const t2 of this.getSortedPlugins(e)) {
      const a2 = this.runHookSync(e, i, t2, n3);
      r2 = s.call(this.pluginContexts.get(t2), r2, a2, t2);
    }
    return r2;
  }
  hookSeq(e, t, i) {
    let s = Promise.resolve();
    for (const n3 of this.getSortedPlugins(e))
      s = s.then(() => this.runHook(e, t, n3, i));
    return s.then(fl);
  }
  getSortedPlugins(e, t) {
    return R(this.sortedPlugins, e, () => ul(e, this.plugins, t));
  }
  runHook(e, t, i, s) {
    const n3 = i[e], r2 = "object" == typeof n3 ? n3.handler : n3;
    let a2 = this.pluginContexts.get(i);
    s && (a2 = s(a2, i));
    let o2 = null;
    return Promise.resolve().then(() => {
      if ("function" != typeof r2)
        return r2;
      const s2 = r2.apply(a2, t);
      return (null == s2 ? void 0 : s2.then) ? (o2 = [i.name, e, t], this.unfulfilledActions.add(o2), Promise.resolve(s2).then((e2) => (this.unfulfilledActions.delete(o2), e2))) : s2;
    }).catch((t2) => (null !== o2 && this.unfulfilledActions.delete(o2), Go(t2, i.name, { hook: e })));
  }
  runHookSync(e, t, i, s) {
    const n3 = i[e], r2 = "object" == typeof n3 ? n3.handler : n3;
    let a2 = this.pluginContexts.get(i);
    s && (a2 = s(a2, i));
    try {
      return r2.apply(a2, t);
    } catch (t2) {
      return Go(t2, i.name, { hook: e });
    }
  }
};
function ul(e, t, i = dl) {
  const s = [], n3 = [], r2 = [];
  for (const a2 of t) {
    const t2 = a2[e];
    if (t2) {
      if ("object" == typeof t2) {
        if (i(t2.handler, e, a2), "pre" === t2.order) {
          s.push(a2);
          continue;
        }
        if ("post" === t2.order) {
          r2.push(a2);
          continue;
        }
      } else
        i(t2, e, a2);
      n3.push(a2);
    }
  }
  return [...s, ...n3, ...r2];
}
function dl(e, t, i) {
  "function" != typeof e && pe(function(e2, t2) {
    return { code: me.INVALID_PLUGIN_HOOK, hook: e2, message: `Error running plugin hook ${e2} for plugin ${t2}, expected a function hook or an object with a "handler" function.`, plugin: t2 };
  }(t, i.name));
}
function pl(e, t, i) {
  if ("string" != typeof e && "function" != typeof e)
    return pe(function(e2, t2) {
      return { code: me.INVALID_PLUGIN_HOOK, hook: e2, message: `Error running plugin hook ${e2} for plugin ${t2}, expected a string, a function hook or an object with a "handler" string or function.`, plugin: t2 };
    }(t, i.name));
}
function fl() {
}
var ml = class {
  constructor(e) {
    this.maxParallel = e, this.queue = [], this.workerCount = 0;
  }
  run(e) {
    return new Promise((t, i) => {
      this.queue.push({ reject: i, resolve: t, task: e }), this.work();
    });
  }
  async work() {
    if (this.workerCount >= this.maxParallel)
      return;
    let e;
    for (this.workerCount++; e = this.queue.shift(); ) {
      const { reject: t, resolve: i, task: s } = e;
      try {
        i(await s());
      } catch (e2) {
        t(e2);
      }
    }
    this.workerCount--;
  }
};
var gl = class {
  constructor(e, t) {
    var i, s;
    if (this.options = e, this.cachedModules = /* @__PURE__ */ new Map(), this.deoptimizationTracker = new U(), this.entryModules = [], this.modulesById = /* @__PURE__ */ new Map(), this.needsTreeshakingPass = false, this.phase = Gs.LOAD_AND_PARSE, this.scope = new el(), this.watchFiles = /* @__PURE__ */ Object.create(null), this.watchMode = false, this.externalModules = [], this.implicitEntryModules = [], this.modules = [], this.getModuleInfo = (e2) => {
      const t2 = this.modulesById.get(e2);
      return t2 ? t2.info : null;
    }, false !== e.cache) {
      if (null === (i = e.cache) || void 0 === i ? void 0 : i.modules)
        for (const t2 of e.cache.modules)
          this.cachedModules.set(t2.id, t2);
      this.pluginCache = (null === (s = e.cache) || void 0 === s ? void 0 : s.plugins) || /* @__PURE__ */ Object.create(null);
      for (const e2 in this.pluginCache) {
        const t2 = this.pluginCache[e2];
        for (const e3 of Object.values(t2))
          e3[0]++;
      }
    }
    if (t) {
      this.watchMode = true;
      const e2 = (...e3) => this.pluginDriver.hookParallel("watchChange", e3), i2 = () => this.pluginDriver.hookParallel("closeWatcher", []);
      t.onCurrentAwaited("change", e2), t.onCurrentAwaited("close", i2);
    }
    this.pluginDriver = new cl(this, e, e.plugins, this.pluginCache), this.acornParser = Fa.extend(...e.acornInjectPlugins), this.moduleLoader = new Xo(this, this.modulesById, this.options, this.pluginDriver), this.fileOperationQueue = new ml(e.maxParallelFileOps);
  }
  async build() {
    en("generate module graph", 2), await this.generateModuleGraph(), tn("generate module graph", 2), en("sort modules", 2), this.phase = Gs.ANALYSE, this.sortModules(), tn("sort modules", 2), en("mark included statements", 2), this.includeStatements(), tn("mark included statements", 2), this.phase = Gs.GENERATE;
  }
  contextParse(e, t = {}) {
    const i = t.onComment, s = [];
    t.onComment = i && "function" == typeof i ? (e2, n4, r2, a2, ...o2) => (s.push({ end: a2, start: r2, type: e2 ? "Block" : "Line", value: n4 }), i.call(t, e2, n4, r2, a2, ...o2)) : s;
    const n3 = this.acornParser.parse(e, { ...this.options.acorn, ...t });
    return "object" == typeof i && i.push(...s), t.onComment = i, function(e2, t2, i2) {
      const s2 = [], n4 = [];
      for (const t3 of e2)
        lt.test(t3.value) ? s2.push(t3) : it.test(t3.value) && n4.push(t3);
      for (const e3 of n4)
        ht(t2, e3, false);
      st(t2, { annotationIndex: 0, annotations: s2, code: i2 });
    }(s, n3, e), n3;
  }
  getCache() {
    for (const e in this.pluginCache) {
      const t = this.pluginCache[e];
      let i = true;
      for (const [e2, s] of Object.entries(t))
        s[0] >= this.options.experimentalCacheExpiry ? delete t[e2] : i = false;
      i && delete this.pluginCache[e];
    }
    return { modules: this.modules.map((e) => e.toJSON()), plugins: this.pluginCache };
  }
  async generateModuleGraph() {
    var e;
    if ({ entryModules: this.entryModules, implicitEntryModules: this.implicitEntryModules } = await this.moduleLoader.addEntryModules((e = this.options.input, Array.isArray(e) ? e.map((e2) => ({ fileName: null, id: e2, implicitlyLoadedAfter: [], importer: void 0, name: null })) : Object.entries(e).map(([e2, t]) => ({ fileName: null, id: t, implicitlyLoadedAfter: [], importer: void 0, name: e2 }))), true), 0 === this.entryModules.length)
      throw new Error("You must supply options.input to rollup");
    for (const e2 of this.modulesById.values())
      e2 instanceof ln ? this.modules.push(e2) : this.externalModules.push(e2);
  }
  includeStatements() {
    for (const e of [...this.entryModules, ...this.implicitEntryModules])
      rn(e);
    if (this.options.treeshake) {
      let e = 1;
      do {
        en(`treeshaking pass ${e}`, 3), this.needsTreeshakingPass = false;
        for (const e2 of this.modules)
          e2.isExecuted && ("no-treeshake" === e2.info.moduleSideEffects ? e2.includeAllInBundle() : e2.include());
        if (1 === e)
          for (const e2 of [...this.entryModules, ...this.implicitEntryModules])
            false !== e2.preserveSignature && (e2.includeAllExports(false), this.needsTreeshakingPass = true);
        tn("treeshaking pass " + e++, 3);
      } while (this.needsTreeshakingPass);
    } else
      for (const e of this.modules)
        e.includeAllInBundle();
    for (const e of this.externalModules)
      e.warnUnusedImports();
    for (const e of this.implicitEntryModules)
      for (const t of e.implicitlyLoadedAfter)
        t.info.isEntry || t.isIncluded() || pe(be(t));
  }
  sortModules() {
    const { orderedModules: e, cyclePaths: t } = function(e2) {
      let t2 = 0;
      const i = [], s = /* @__PURE__ */ new Set(), n3 = /* @__PURE__ */ new Set(), r2 = /* @__PURE__ */ new Map(), a2 = [], o2 = (e3) => {
        if (e3 instanceof ln) {
          for (const t3 of e3.dependencies)
            r2.has(t3) ? s.has(t3) || i.push(Kr(t3, e3, r2)) : (r2.set(t3, e3), o2(t3));
          for (const t3 of e3.implicitlyLoadedBefore)
            n3.add(t3);
          for (const { resolution: t3 } of e3.dynamicImports)
            t3 instanceof ln && n3.add(t3);
          a2.push(e3);
        }
        e3.execIndex = t2++, s.add(e3);
      };
      for (const t3 of e2)
        r2.has(t3) || (r2.set(t3, null), o2(t3));
      for (const e3 of n3)
        r2.has(e3) || (r2.set(e3, null), o2(e3));
      return { cyclePaths: i, orderedModules: a2 };
    }(this.entryModules);
    for (const e2 of t)
      this.options.onwarn({ code: "CIRCULAR_DEPENDENCY", cycle: e2, importer: e2[0], message: `Circular dependency: ${e2.join(" -> ")}` });
    this.modules = e;
    for (const e2 of this.modules)
      e2.bindReferences();
    this.warnForMissingExports();
  }
  warnForMissingExports() {
    for (const e of this.modules)
      for (const t of e.importDescriptions.values())
        "*" === t.name || t.module.getVariableForExportName(t.name)[0] || e.warn({ code: "NON_EXISTENT_EXPORT", message: `Non-existent export '${t.name}' is imported from ${he(t.module.id)}`, name: t.name, source: t.module.id }, t.start);
  }
};
function yl(e) {
  return Array.isArray(e) ? e.filter(Boolean) : e ? [e] : [];
}
function xl(e, t) {
  return t();
}
var El = (e) => console.warn(e.message || e);
function bl(e, t, i, s, n3 = /$./) {
  const r2 = new Set(t), a2 = Object.keys(e).filter((e2) => !(r2.has(e2) || n3.test(e2)));
  a2.length > 0 && s({ code: "UNKNOWN_OPTION", message: `Unknown ${i}: ${a2.join(", ")}. Allowed options: ${[...r2].sort().join(", ")}` });
}
var vl = { recommended: { annotations: true, correctVarValueBeforeDeclaration: false, moduleSideEffects: () => true, propertyReadSideEffects: true, tryCatchDeoptimization: true, unknownGlobalSideEffects: false }, safest: { annotations: true, correctVarValueBeforeDeclaration: true, moduleSideEffects: () => true, propertyReadSideEffects: true, tryCatchDeoptimization: true, unknownGlobalSideEffects: true }, smallest: { annotations: true, correctVarValueBeforeDeclaration: false, moduleSideEffects: () => false, propertyReadSideEffects: false, tryCatchDeoptimization: false, unknownGlobalSideEffects: false } };
var Sl = { es2015: { arrowFunctions: true, constBindings: true, objectShorthand: true, reservedNamesAsProps: true, symbols: true }, es5: { arrowFunctions: false, constBindings: false, objectShorthand: false, reservedNamesAsProps: true, symbols: false } };
var Al = (e, t, i, s) => {
  const n3 = null == e ? void 0 : e.preset;
  if (n3) {
    const s2 = t[n3];
    if (s2)
      return { ...s2, ...e };
    pe(xe(`${i}.preset`, Il(i), `valid values are ${oe(Object.keys(t))}`, n3));
  }
  return ((e2, t2, i2) => (s2) => {
    if ("string" == typeof s2) {
      const n4 = e2[s2];
      if (n4)
        return n4;
      pe(xe(t2, Il(t2), `valid values are ${i2}${oe(Object.keys(e2))}. You can also supply an object for more fine-grained control`, s2));
    }
    return ((e3) => e3 && "object" == typeof e3 ? e3 : {})(s2);
  })(t, i, s)(e);
};
var Il = (e) => e.split(".").join("").toLowerCase();
var Pl = (e) => {
  const { onwarn: t } = e;
  return t ? (e2) => {
    e2.toString = () => {
      let t2 = "";
      return e2.plugin && (t2 += `(${e2.plugin} plugin) `), e2.loc && (t2 += `${he(e2.loc.file)} (${e2.loc.line}:${e2.loc.column}) `), t2 += e2.message, t2;
    }, t(e2, El);
  } : El;
};
var kl = (e) => ({ allowAwaitOutsideFunction: true, ecmaVersion: "latest", preserveParens: false, sourceType: "module", ...e.acorn });
var wl = (e) => yl(e.acornInjectPlugins);
var Cl = (e) => {
  var t;
  return (null === (t = e.cache) || void 0 === t ? void 0 : t.cache) || e.cache;
};
var _l = (e) => {
  if (true === e)
    return () => true;
  if ("function" == typeof e)
    return (t, ...i) => !t.startsWith("\0") && e(t, ...i) || false;
  if (e) {
    const t = /* @__PURE__ */ new Set(), i = [];
    for (const s of yl(e))
      s instanceof RegExp ? i.push(s) : t.add(s);
    return (e2, ...s) => t.has(e2) || i.some((t2) => t2.test(e2));
  }
  return () => false;
};
var Nl = (e, t, i) => {
  const s = e.inlineDynamicImports;
  return s && ke('The "inlineDynamicImports" option is deprecated. Use the "output.inlineDynamicImports" option instead.', false, t, i), s;
};
var $l = (e) => {
  const t = e.input;
  return null == t ? [] : "string" == typeof t ? [t] : t;
};
var Tl = (e, t, i) => {
  const s = e.manualChunks;
  return s && ke('The "manualChunks" option is deprecated. Use the "output.manualChunks" option instead.', false, t, i), s;
};
var Ol = (e, t, i) => {
  var s;
  const n3 = e.maxParallelFileReads;
  "number" == typeof n3 && ke('The "maxParallelFileReads" option is deprecated. Use the "maxParallelFileOps" option instead.', false, t, i);
  const r2 = null !== (s = e.maxParallelFileOps) && void 0 !== s ? s : n3;
  return "number" == typeof r2 ? r2 <= 0 ? 1 / 0 : r2 : 20;
};
var Rl = (e, t) => {
  const i = e.moduleContext;
  if ("function" == typeof i)
    return (e2) => {
      var s;
      return null !== (s = i(e2)) && void 0 !== s ? s : t;
    };
  if (i) {
    const e2 = /* @__PURE__ */ Object.create(null);
    for (const [t2, s] of Object.entries(i))
      e2[O(t2)] = s;
    return (i2) => e2[i2] || t;
  }
  return () => t;
};
var Ml = (e, t) => {
  const i = e.preserveEntrySignatures;
  return null == i && t.add("preserveEntrySignatures"), null != i ? i : "strict";
};
var Dl = (e, t, i) => {
  const s = e.preserveModules;
  return s && ke('The "preserveModules" option is deprecated. Use the "output.preserveModules" option instead.', false, t, i), s;
};
var Ll = (e, t, i) => {
  const s = e.treeshake;
  if (false === s)
    return false;
  const n3 = Al(e.treeshake, vl, "treeshake", "false, true, ");
  return void 0 !== n3.pureExternalModules && ke(`The "treeshake.pureExternalModules" option is deprecated. The "treeshake.moduleSideEffects" option should be used instead. "treeshake.pureExternalModules: true" is equivalent to "treeshake.moduleSideEffects: 'no-external'"`, true, t, i), { annotations: false !== n3.annotations, correctVarValueBeforeDeclaration: true === n3.correctVarValueBeforeDeclaration, moduleSideEffects: "object" == typeof s && s.pureExternalModules ? Vl(s.moduleSideEffects, s.pureExternalModules) : Vl(n3.moduleSideEffects, void 0), propertyReadSideEffects: "always" === n3.propertyReadSideEffects ? "always" : false !== n3.propertyReadSideEffects, tryCatchDeoptimization: false !== n3.tryCatchDeoptimization, unknownGlobalSideEffects: false !== n3.unknownGlobalSideEffects };
};
var Vl = (e, t) => {
  if ("boolean" == typeof e)
    return () => e;
  if ("no-external" === e)
    return (e2, t2) => !t2;
  if ("function" == typeof e)
    return (t2, i2) => !!t2.startsWith("\0") || false !== e(t2, i2);
  if (Array.isArray(e)) {
    const t2 = new Set(e);
    return (e2) => t2.has(e2);
  }
  e && pe(xe("treeshake.moduleSideEffects", "treeshake", 'please use one of false, "no-external", a function or an array'));
  const i = _l(t);
  return (e2, t2) => !(t2 && i(e2));
};
var Bl = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g;
var Fl = /^[a-z]:/i;
function zl(e) {
  const t = Fl.exec(e), i = t ? t[0] : "";
  return i + e.substr(i.length).replace(Bl, "_");
}
var jl = (e, t, i) => {
  const { file: s } = e;
  if ("string" == typeof s) {
    if (t)
      return pe(xe("output.file", "outputdir", 'you must set "output.dir" instead of "output.file" when using the "output.preserveModules" option'));
    if (!Array.isArray(i.input))
      return pe(xe("output.file", "outputdir", 'you must set "output.dir" instead of "output.file" when providing named inputs'));
  }
  return s;
};
var Ul = (e) => {
  const t = e.format;
  switch (t) {
    case void 0:
    case "es":
    case "esm":
    case "module":
      return "es";
    case "cjs":
    case "commonjs":
      return "cjs";
    case "system":
    case "systemjs":
      return "system";
    case "amd":
    case "iife":
    case "umd":
      return t;
    default:
      return pe({ message: 'You must specify "output.format", which can be one of "amd", "cjs", "system", "es", "iife" or "umd".', url: "https://rollupjs.org/guide/en/#outputformat" });
  }
};
var Gl = (e, t) => {
  var i;
  const s = (null !== (i = e.inlineDynamicImports) && void 0 !== i ? i : t.inlineDynamicImports) || false, { input: n3 } = t;
  return s && (Array.isArray(n3) ? n3 : Object.keys(n3)).length > 1 ? pe(xe("output.inlineDynamicImports", "outputinlinedynamicimports", 'multiple inputs are not supported when "output.inlineDynamicImports" is true')) : s;
};
var Hl = (e, t, i) => {
  var s;
  const n3 = (null !== (s = e.preserveModules) && void 0 !== s ? s : i.preserveModules) || false;
  if (n3) {
    if (t)
      return pe(xe("output.inlineDynamicImports", "outputinlinedynamicimports", 'this option is not supported for "output.preserveModules"'));
    if (false === i.preserveEntrySignatures)
      return pe(xe("preserveEntrySignatures", "preserveentrysignatures", 'setting this option to false is not supported for "output.preserveModules"'));
  }
  return n3;
};
var Wl = (e, t) => {
  const i = e.preferConst;
  return null != i && Pe('The "output.preferConst" option is deprecated. Use the "output.generatedCode.constBindings" option instead.', false, t), !!i;
};
var ql = (e) => {
  const { preserveModulesRoot: t } = e;
  if (null != t)
    return O(t);
};
var Kl = (e) => {
  const t = { autoId: false, basePath: "", define: "define", forceJsExtensionForImports: false, ...e.amd };
  if ((t.autoId || t.basePath) && t.id)
    return pe(xe("output.amd.id", "outputamd", 'this option cannot be used together with "output.amd.autoId"/"output.amd.basePath"'));
  if (t.basePath && !t.autoId)
    return pe(xe("output.amd.basePath", "outputamd", 'this option only works with "output.amd.autoId"'));
  let i;
  return i = t.autoId ? { autoId: true, basePath: t.basePath, define: t.define, forceJsExtensionForImports: t.forceJsExtensionForImports } : { autoId: false, define: t.define, forceJsExtensionForImports: t.forceJsExtensionForImports, id: t.id }, i;
};
var Xl = (e, t) => {
  const i = e[t];
  return "function" == typeof i ? i : () => i || "";
};
var Yl = (e, t) => {
  const { dir: i } = e;
  return "string" == typeof i && "string" == typeof t ? pe(xe("output.dir", "outputdir", 'you must set either "output.file" for a single-file build or "output.dir" when generating multiple chunks')) : i;
};
var Ql = (e, t) => {
  const i = e.dynamicImportFunction;
  return i && Pe('The "output.dynamicImportFunction" option is deprecated. Use the "renderDynamicImport" plugin hook instead.', false, t), i;
};
var Jl = (e, t) => {
  const i = e.entryFileNames;
  return null == i && t.add("entryFileNames"), null != i ? i : "[name].js";
};
function Zl(e, t) {
  const i = e.exports;
  if (null == i)
    t.add("exports");
  else if (!["default", "named", "none", "auto"].includes(i))
    return pe((s = i, { code: me.INVALID_EXPORT_OPTION, message: `"output.exports" must be "default", "named", "none", "auto", or left unspecified (defaults to "auto"), received "${s}"`, url: "https://rollupjs.org/guide/en/#outputexports" }));
  var s;
  return i || "auto";
}
var eh = (e, t) => {
  const i = Al(e.generatedCode, Sl, "output.generatedCode", "");
  return { arrowFunctions: true === i.arrowFunctions, constBindings: true === i.constBindings || t, objectShorthand: true === i.objectShorthand, reservedNamesAsProps: true === i.reservedNamesAsProps, symbols: true === i.symbols };
};
var th = (e, t) => {
  if (t)
    return "";
  const i = e.indent;
  return false === i ? "" : null == i || i;
};
var ih = /* @__PURE__ */ new Set(["auto", "esModule", "default", "defaultOnly", true, false]);
var sh = (e, t) => {
  const i = e.interop, s = /* @__PURE__ */ new Set(), n3 = (e2) => {
    if (!s.has(e2)) {
      if (s.add(e2), !ih.has(e2))
        return pe(xe("output.interop", "outputinterop", `use one of ${Array.from(ih, (e3) => JSON.stringify(e3)).join(", ")}`, e2));
      "boolean" == typeof e2 && Pe({ message: `The boolean value "${e2}" for the "output.interop" option is deprecated. Use ${e2 ? '"auto"' : '"esModule", "default" or "defaultOnly"'} instead.`, url: "https://rollupjs.org/guide/en/#outputinterop" }, false, t);
    }
    return e2;
  };
  if ("function" == typeof i) {
    const e2 = /* @__PURE__ */ Object.create(null);
    let t2 = null;
    return (s2) => null === s2 ? t2 || n3(t2 = i(s2)) : s2 in e2 ? e2[s2] : n3(e2[s2] = i(s2));
  }
  return void 0 === i ? () => true : () => n3(i);
};
var nh = (e, t, i, s) => {
  const n3 = e.manualChunks || s.manualChunks;
  if (n3) {
    if (t)
      return pe(xe("output.manualChunks", "outputmanualchunks", 'this option is not supported for "output.inlineDynamicImports"'));
    if (i)
      return pe(xe("output.manualChunks", "outputmanualchunks", 'this option is not supported for "output.preserveModules"'));
  }
  return n3 || {};
};
var rh = (e, t, i) => {
  var s;
  return null !== (s = e.minifyInternalExports) && void 0 !== s ? s : i || "es" === t || "system" === t;
};
var ah = (e, t, i) => {
  const s = e.namespaceToStringTag;
  return null != s ? (Pe('The "output.namespaceToStringTag" option is deprecated. Use the "output.generatedCode.symbols" option instead.', false, i), s) : t.symbols || false;
};
var oh = (e) => {
  const { sourcemapBaseUrl: t } = e;
  if (t)
    return function(e2) {
      try {
        new URL(e2);
      } catch (e3) {
        return false;
      }
      return true;
    }(t) ? t : pe(xe("output.sourcemapBaseUrl", "outputsourcemapbaseurl", `must be a valid URL, received ${JSON.stringify(t)}`));
};
function lh(e) {
  return async function(e2, t) {
    const { options: i, unsetOptions: s } = await async function(e3, t2) {
      if (!e3)
        throw new Error("You must supply an options object to rollup");
      const i2 = ul("options", yl(e3.plugins)), { options: s2, unsetOptions: n4 } = function(e4) {
        var t3, i3, s3;
        const n5 = /* @__PURE__ */ new Set(), r3 = null !== (t3 = e4.context) && void 0 !== t3 ? t3 : "undefined", a3 = Pl(e4), o2 = e4.strictDeprecations || false, l2 = Ol(e4, a3, o2), h2 = { acorn: kl(e4), acornInjectPlugins: wl(e4), cache: Cl(e4), context: r3, experimentalCacheExpiry: null !== (i3 = e4.experimentalCacheExpiry) && void 0 !== i3 ? i3 : 10, external: _l(e4.external), inlineDynamicImports: Nl(e4, a3, o2), input: $l(e4), makeAbsoluteExternalsRelative: null === (s3 = e4.makeAbsoluteExternalsRelative) || void 0 === s3 || s3, manualChunks: Tl(e4, a3, o2), maxParallelFileOps: l2, maxParallelFileReads: l2, moduleContext: Rl(e4, r3), onwarn: a3, perf: e4.perf || false, plugins: yl(e4.plugins), preserveEntrySignatures: Ml(e4, n5), preserveModules: Dl(e4, a3, o2), preserveSymlinks: e4.preserveSymlinks || false, shimMissingExports: e4.shimMissingExports || false, strictDeprecations: o2, treeshake: Ll(e4, a3, o2) };
        return bl(e4, [...Object.keys(h2), "watch"], "input options", h2.onwarn, /^(output)$/), { options: h2, unsetOptions: n5 };
      }(await i2.reduce(function(e4) {
        return async (t3, i3) => {
          const s3 = "handler" in i3.options ? i3.options.handler : i3.options;
          return await s3.call({ meta: { rollupVersion: "2.79.1", watchMode: e4 } }, await t3) || t3;
        };
      }(t2), Promise.resolve(e3)));
      return hh(s2.plugins, "at position "), { options: s2, unsetOptions: n4 };
    }(e2, null !== t);
    !function(e3) {
      e3.perf ? (Xs = /* @__PURE__ */ new Map(), en = Qs, tn = Js, e3.plugins = e3.plugins.map(nn)) : (en = Ks, tn = Ks);
    }(i);
    const n3 = new gl(i, t), r2 = false !== e2.cache;
    delete i.cache, delete e2.cache, en("BUILD", 1), await xl(n3.pluginDriver, async () => {
      try {
        await n3.pluginDriver.hookParallel("buildStart", [i]), await n3.build();
      } catch (e3) {
        const t2 = Object.keys(n3.watchFiles);
        throw t2.length > 0 && (e3.watchFiles = t2), await n3.pluginDriver.hookParallel("buildEnd", [e3]), await n3.pluginDriver.hookParallel("closeBundle", []), e3;
      }
      await n3.pluginDriver.hookParallel("buildEnd", []);
    }), tn("BUILD", 1);
    const a2 = { cache: r2 ? n3.getCache() : void 0, async close() {
      a2.closed || (a2.closed = true, await n3.pluginDriver.hookParallel("closeBundle", []));
    }, closed: false, generate: async (e3) => a2.closed ? pe(Ie()) : ch(false, i, s, e3, n3), watchFiles: Object.keys(n3.watchFiles), write: async (e3) => a2.closed ? pe(Ie()) : ch(true, i, s, e3, n3) };
    i.perf && (a2.getTimings = Zs);
    return a2;
  }(e, null);
}
function hh(e, t) {
  e.forEach((e2, i) => {
    e2.name || (e2.name = `${t}${i + 1}`);
  });
}
function ch(e, t, i, s, n3) {
  const { options: r2, outputPluginDriver: a2, unsetOptions: o2 } = function(e2, t2, i2, s2) {
    if (!e2)
      throw new Error("You must supply an options object");
    const n4 = yl(e2.plugins);
    hh(n4, "at output position ");
    const r3 = t2.createOutputPluginDriver(n4);
    return { ...uh(i2, s2, e2, r3), outputPluginDriver: r3 };
  }(s, n3.pluginDriver, t, i);
  return xl(0, async () => {
    const i2 = new Qr(r2, o2, t, a2, n3), s2 = await i2.generate(e);
    if (e) {
      if (!r2.dir && !r2.file)
        return pe({ code: "MISSING_OPTION", message: 'You must specify "output.file" or "output.dir" for the build.' });
      await Promise.all(Object.values(s2).map((e2) => n3.fileOperationQueue.run(() => async function(e3, t2) {
        const i3 = O(t2.dir || N(t2.file), e3.fileName);
        let s3, n4;
        if (await jo.mkdir(N(i3), { recursive: true }), "asset" === e3.type)
          n4 = e3.source;
        else if (n4 = e3.code, t2.sourcemap && e3.map) {
          let r3;
          if ("inline" === t2.sourcemap)
            r3 = e3.map.toUrl();
          else {
            const { sourcemapBaseUrl: n5 } = t2, a3 = `${_(e3.fileName)}.map`;
            r3 = n5 ? new URL(a3, n5).toString() : a3, s3 = jo.writeFile(`${i3}.map`, e3.map.toString());
          }
          "hidden" !== t2.sourcemap && (n4 += `//# sourceMappingURL=${r3}
`);
        }
        return Promise.all([jo.writeFile(i3, n4), s3]);
      }(e2, r2)))), await a2.hookParallel("writeBundle", [r2, s2]);
    }
    return l2 = s2, { output: Object.values(l2).filter((e2) => Object.keys(e2).length > 0).sort((e2, t2) => ph(e2) - ph(t2)) };
    var l2;
  });
}
function uh(e, t, i, s) {
  return function(e2, t2, i2) {
    var s2, n3, r2, a2, o2, l2, h2;
    const c2 = new Set(i2), u2 = e2.compact || false, d2 = Ul(e2), p2 = Gl(e2, t2), f2 = Hl(e2, p2, t2), m2 = jl(e2, f2, t2), g2 = Wl(e2, t2), y2 = eh(e2, g2), x2 = { amd: Kl(e2), assetFileNames: null !== (s2 = e2.assetFileNames) && void 0 !== s2 ? s2 : "assets/[name]-[hash][extname]", banner: Xl(e2, "banner"), chunkFileNames: null !== (n3 = e2.chunkFileNames) && void 0 !== n3 ? n3 : "[name]-[hash].js", compact: u2, dir: Yl(e2, m2), dynamicImportFunction: Ql(e2, t2), entryFileNames: Jl(e2, c2), esModule: null === (r2 = e2.esModule) || void 0 === r2 || r2, exports: Zl(e2, c2), extend: e2.extend || false, externalLiveBindings: null === (a2 = e2.externalLiveBindings) || void 0 === a2 || a2, file: m2, footer: Xl(e2, "footer"), format: d2, freeze: null === (o2 = e2.freeze) || void 0 === o2 || o2, generatedCode: y2, globals: e2.globals || {}, hoistTransitiveImports: null === (l2 = e2.hoistTransitiveImports) || void 0 === l2 || l2, indent: th(e2, u2), inlineDynamicImports: p2, interop: sh(e2, t2), intro: Xl(e2, "intro"), manualChunks: nh(e2, p2, f2, t2), minifyInternalExports: rh(e2, d2, u2), name: e2.name, namespaceToStringTag: ah(e2, y2, t2), noConflict: e2.noConflict || false, outro: Xl(e2, "outro"), paths: e2.paths || {}, plugins: yl(e2.plugins), preferConst: g2, preserveModules: f2, preserveModulesRoot: ql(e2), sanitizeFileName: "function" == typeof e2.sanitizeFileName ? e2.sanitizeFileName : false === e2.sanitizeFileName ? (e3) => e3 : zl, sourcemap: e2.sourcemap || false, sourcemapBaseUrl: oh(e2), sourcemapExcludeSources: e2.sourcemapExcludeSources || false, sourcemapFile: e2.sourcemapFile, sourcemapPathTransform: e2.sourcemapPathTransform, strict: null === (h2 = e2.strict) || void 0 === h2 || h2, systemNullSetters: e2.systemNullSetters || false, validate: e2.validate || false };
    return bl(e2, Object.keys(x2), "output options", t2.onwarn), { options: x2, unsetOptions: c2 };
  }(s.hookReduceArg0Sync("outputOptions", [i.output || i], (e2, t2) => t2 || e2, (e2) => {
    const t2 = () => e2.error({ code: me.CANNOT_EMIT_FROM_OPTIONS_HOOK, message: 'Cannot emit files or set asset sources in the "outputOptions" hook, use the "renderStart" hook instead.' });
    return { ...e2, emitFile: t2, setAssetSource: t2 };
  }), e, t);
}
var dh;
function ph(e) {
  return "asset" === e.type ? dh.ASSET : e.isEntry ? dh.ENTRY_CHUNK : dh.SECONDARY_CHUNK;
}
!function(e) {
  e[e.ENTRY_CHUNK = 0] = "ENTRY_CHUNK", e[e.SECONDARY_CHUNK = 1] = "SECONDARY_CHUNK", e[e.ASSET = 2] = "ASSET";
}(dh || (dh = {}));

// node_modules/@rollup/plugin-node-resolve/dist/es/index.js
init_path2();
var import_is_builtin_module = __toESM(require_is_builtin_module(), 1);
var import_deepmerge = __toESM(require_cjs(), 1);
var import_is_module = __toESM(require_is_module(), 1);
init_fs();
init_util2();

// node_modules/rollup-plugin-node-polyfills/polyfills/punycode.js
var maxInt = 2147483647;
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128;
var delimiter2 = "-";
var regexNonASCII = /[^\x20-\x7E]/;
var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g;
var errors = {
  "overflow": "Overflow: input needs wider integers to process",
  "not-basic": "Illegal input >= 0x80 (not a basic code point)",
  "invalid-input": "Invalid input"
};
var baseMinusTMin = base - tMin;
var floor = Math.floor;
var stringFromCharCode = String.fromCharCode;
function error(type2) {
  throw new RangeError(errors[type2]);
}
function map(array, fn2) {
  var length = array.length;
  var result = [];
  while (length--) {
    result[length] = fn2(array[length]);
  }
  return result;
}
function mapDomain(string, fn2) {
  var parts = string.split("@");
  var result = "";
  if (parts.length > 1) {
    result = parts[0] + "@";
    string = parts[1];
  }
  string = string.replace(regexSeparators, ".");
  var labels = string.split(".");
  var encoded = map(labels, fn2).join(".");
  return result + encoded;
}
function ucs2decode(string) {
  var output = [], counter = 0, length = string.length, value, extra;
  while (counter < length) {
    value = string.charCodeAt(counter++);
    if (value >= 55296 && value <= 56319 && counter < length) {
      extra = string.charCodeAt(counter++);
      if ((extra & 64512) == 56320) {
        output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
      } else {
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }
  return output;
}
function digitToBasic(digit, flag) {
  return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
}
function adapt(delta, numPoints, firstTime) {
  var k2 = 0;
  delta = firstTime ? floor(delta / damp) : delta >> 1;
  delta += floor(delta / numPoints);
  for (; delta > baseMinusTMin * tMax >> 1; k2 += base) {
    delta = floor(delta / baseMinusTMin);
  }
  return floor(k2 + (baseMinusTMin + 1) * delta / (delta + skew));
}
function encode(input) {
  var n3, delta, handledCPCount, basicLength, bias, j2, m2, q2, k2, t, currentValue, output = [], inputLength, handledCPCountPlusOne, baseMinusT, qMinusT;
  input = ucs2decode(input);
  inputLength = input.length;
  n3 = initialN;
  delta = 0;
  bias = initialBias;
  for (j2 = 0; j2 < inputLength; ++j2) {
    currentValue = input[j2];
    if (currentValue < 128) {
      output.push(stringFromCharCode(currentValue));
    }
  }
  handledCPCount = basicLength = output.length;
  if (basicLength) {
    output.push(delimiter2);
  }
  while (handledCPCount < inputLength) {
    for (m2 = maxInt, j2 = 0; j2 < inputLength; ++j2) {
      currentValue = input[j2];
      if (currentValue >= n3 && currentValue < m2) {
        m2 = currentValue;
      }
    }
    handledCPCountPlusOne = handledCPCount + 1;
    if (m2 - n3 > floor((maxInt - delta) / handledCPCountPlusOne)) {
      error("overflow");
    }
    delta += (m2 - n3) * handledCPCountPlusOne;
    n3 = m2;
    for (j2 = 0; j2 < inputLength; ++j2) {
      currentValue = input[j2];
      if (currentValue < n3 && ++delta > maxInt) {
        error("overflow");
      }
      if (currentValue == n3) {
        for (q2 = delta, k2 = base; ; k2 += base) {
          t = k2 <= bias ? tMin : k2 >= bias + tMax ? tMax : k2 - bias;
          if (q2 < t) {
            break;
          }
          qMinusT = q2 - t;
          baseMinusT = base - t;
          output.push(
            stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
          );
          q2 = floor(qMinusT / baseMinusT);
        }
        output.push(stringFromCharCode(digitToBasic(q2, 0)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
        delta = 0;
        ++handledCPCount;
      }
    }
    ++delta;
    ++n3;
  }
  return output.join("");
}
function toASCII(input) {
  return mapDomain(input, function(string) {
    return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
  });
}

// node_modules/rollup-plugin-node-polyfills/polyfills/url.js
init_util2();

// node_modules/rollup-plugin-node-polyfills/polyfills/qs.js
function hasOwnProperty2(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
var isArray2 = Array.isArray || function(xs2) {
  return Object.prototype.toString.call(xs2) === "[object Array]";
};
function stringifyPrimitive(v2) {
  switch (typeof v2) {
    case "string":
      return v2;
    case "boolean":
      return v2 ? "true" : "false";
    case "number":
      return isFinite(v2) ? v2 : "";
    default:
      return "";
  }
}
function stringify(obj, sep3, eq, name) {
  sep3 = sep3 || "&";
  eq = eq || "=";
  if (obj === null) {
    obj = void 0;
  }
  if (typeof obj === "object") {
    return map2(objectKeys(obj), function(k2) {
      var ks2 = encodeURIComponent(stringifyPrimitive(k2)) + eq;
      if (isArray2(obj[k2])) {
        return map2(obj[k2], function(v2) {
          return ks2 + encodeURIComponent(stringifyPrimitive(v2));
        }).join(sep3);
      } else {
        return ks2 + encodeURIComponent(stringifyPrimitive(obj[k2]));
      }
    }).join(sep3);
  }
  if (!name)
    return "";
  return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
}
function map2(xs2, f2) {
  if (xs2.map)
    return xs2.map(f2);
  var res = [];
  for (var i = 0; i < xs2.length; i++) {
    res.push(f2(xs2[i], i));
  }
  return res;
}
var objectKeys = Object.keys || function(obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key))
      res.push(key);
  }
  return res;
};
function parse(qs2, sep3, eq, options) {
  sep3 = sep3 || "&";
  eq = eq || "=";
  var obj = {};
  if (typeof qs2 !== "string" || qs2.length === 0) {
    return obj;
  }
  var regexp = /\+/g;
  qs2 = qs2.split(sep3);
  var maxKeys = 1e3;
  if (options && typeof options.maxKeys === "number") {
    maxKeys = options.maxKeys;
  }
  var len = qs2.length;
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }
  for (var i = 0; i < len; ++i) {
    var x2 = qs2[i].replace(regexp, "%20"), idx = x2.indexOf(eq), kstr, vstr, k2, v2;
    if (idx >= 0) {
      kstr = x2.substr(0, idx);
      vstr = x2.substr(idx + 1);
    } else {
      kstr = x2;
      vstr = "";
    }
    k2 = decodeURIComponent(kstr);
    v2 = decodeURIComponent(vstr);
    if (!hasOwnProperty2(obj, k2)) {
      obj[k2] = v2;
    } else if (isArray2(obj[k2])) {
      obj[k2].push(v2);
    } else {
      obj[k2] = [obj[k2], v2];
    }
  }
  return obj;
}

// node_modules/rollup-plugin-node-polyfills/polyfills/url.js
function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}
var protocolPattern = /^([a-z0-9.+-]+:)/i;
var portPattern = /:[0-9]*$/;
var simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/;
var delims = ["<", ">", '"', "`", " ", "\r", "\n", "	"];
var unwise = ["{", "}", "|", "\\", "^", "`"].concat(delims);
var autoEscape = ["'"].concat(unwise);
var nonHostChars = ["%", "/", "?", ";", "#"].concat(autoEscape);
var hostEndingChars = ["/", "?", "#"];
var hostnameMaxLen = 255;
var hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/;
var hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/;
var unsafeProtocol = {
  "javascript": true,
  "javascript:": true
};
var hostlessProtocol = {
  "javascript": true,
  "javascript:": true
};
var slashedProtocol = {
  "http": true,
  "https": true,
  "ftp": true,
  "gopher": true,
  "file": true,
  "http:": true,
  "https:": true,
  "ftp:": true,
  "gopher:": true,
  "file:": true
};
function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && isObject(url) && url instanceof Url)
    return url;
  var u2 = new Url();
  u2.parse(url, parseQueryString, slashesDenoteHost);
  return u2;
}
Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  return parse2(this, url, parseQueryString, slashesDenoteHost);
};
function parse2(self, url, parseQueryString, slashesDenoteHost) {
  if (!isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }
  var queryIndex = url.indexOf("?"), splitter = queryIndex !== -1 && queryIndex < url.indexOf("#") ? "?" : "#", uSplit = url.split(splitter), slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, "/");
  url = uSplit.join(splitter);
  var rest = url;
  rest = rest.trim();
  if (!slashesDenoteHost && url.split("#").length === 1) {
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      self.path = rest;
      self.href = rest;
      self.pathname = simplePath[1];
      if (simplePath[2]) {
        self.search = simplePath[2];
        if (parseQueryString) {
          self.query = parse(self.search.substr(1));
        } else {
          self.query = self.search.substr(1);
        }
      } else if (parseQueryString) {
        self.search = "";
        self.query = {};
      }
      return self;
    }
  }
  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    self.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === "//";
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      self.slashes = true;
    }
  }
  var i, hec, l2, p2;
  if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
    var hostEnd = -1;
    for (i = 0; i < hostEndingChars.length; i++) {
      hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    var auth, atSign;
    if (hostEnd === -1) {
      atSign = rest.lastIndexOf("@");
    } else {
      atSign = rest.lastIndexOf("@", hostEnd);
    }
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      self.auth = decodeURIComponent(auth);
    }
    hostEnd = -1;
    for (i = 0; i < nonHostChars.length; i++) {
      hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    if (hostEnd === -1)
      hostEnd = rest.length;
    self.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);
    parseHost(self);
    self.hostname = self.hostname || "";
    var ipv6Hostname = self.hostname[0] === "[" && self.hostname[self.hostname.length - 1] === "]";
    if (!ipv6Hostname) {
      var hostparts = self.hostname.split(/\./);
      for (i = 0, l2 = hostparts.length; i < l2; i++) {
        var part = hostparts[i];
        if (!part)
          continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = "";
          for (var j2 = 0, k2 = part.length; j2 < k2; j2++) {
            if (part.charCodeAt(j2) > 127) {
              newpart += "x";
            } else {
              newpart += part[j2];
            }
          }
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = "/" + notHost.join(".") + rest;
            }
            self.hostname = validParts.join(".");
            break;
          }
        }
      }
    }
    if (self.hostname.length > hostnameMaxLen) {
      self.hostname = "";
    } else {
      self.hostname = self.hostname.toLowerCase();
    }
    if (!ipv6Hostname) {
      self.hostname = toASCII(self.hostname);
    }
    p2 = self.port ? ":" + self.port : "";
    var h2 = self.hostname || "";
    self.host = h2 + p2;
    self.href += self.host;
    if (ipv6Hostname) {
      self.hostname = self.hostname.substr(1, self.hostname.length - 2);
      if (rest[0] !== "/") {
        rest = "/" + rest;
      }
    }
  }
  if (!unsafeProtocol[lowerProto]) {
    for (i = 0, l2 = autoEscape.length; i < l2; i++) {
      var ae2 = autoEscape[i];
      if (rest.indexOf(ae2) === -1)
        continue;
      var esc = encodeURIComponent(ae2);
      if (esc === ae2) {
        esc = escape(ae2);
      }
      rest = rest.split(ae2).join(esc);
    }
  }
  var hash = rest.indexOf("#");
  if (hash !== -1) {
    self.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf("?");
  if (qm !== -1) {
    self.search = rest.substr(qm);
    self.query = rest.substr(qm + 1);
    if (parseQueryString) {
      self.query = parse(self.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    self.search = "";
    self.query = {};
  }
  if (rest)
    self.pathname = rest;
  if (slashedProtocol[lowerProto] && self.hostname && !self.pathname) {
    self.pathname = "/";
  }
  if (self.pathname || self.search) {
    p2 = self.pathname || "";
    var s = self.search || "";
    self.path = p2 + s;
  }
  self.href = format2(self);
  return self;
}
function format2(self) {
  var auth = self.auth || "";
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ":");
    auth += "@";
  }
  var protocol = self.protocol || "", pathname = self.pathname || "", hash = self.hash || "", host = false, query = "";
  if (self.host) {
    host = auth + self.host;
  } else if (self.hostname) {
    host = auth + (self.hostname.indexOf(":") === -1 ? self.hostname : "[" + this.hostname + "]");
    if (self.port) {
      host += ":" + self.port;
    }
  }
  if (self.query && isObject(self.query) && Object.keys(self.query).length) {
    query = stringify(self.query);
  }
  var search = self.search || query && "?" + query || "";
  if (protocol && protocol.substr(-1) !== ":")
    protocol += ":";
  if (self.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = "//" + (host || "");
    if (pathname && pathname.charAt(0) !== "/")
      pathname = "/" + pathname;
  } else if (!host) {
    host = "";
  }
  if (hash && hash.charAt(0) !== "#")
    hash = "#" + hash;
  if (search && search.charAt(0) !== "?")
    search = "?" + search;
  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace("#", "%23");
  return protocol + host + pathname + search + hash;
}
Url.prototype.format = function() {
  return format2(this);
};
Url.prototype.resolve = function(relative3) {
  return this.resolveObject(urlParse(relative3, false, true)).format();
};
Url.prototype.resolveObject = function(relative3) {
  if (isString(relative3)) {
    var rel = new Url();
    rel.parse(relative3, false, true);
    relative3 = rel;
  }
  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }
  result.hash = relative3.hash;
  if (relative3.href === "") {
    result.href = result.format();
    return result;
  }
  if (relative3.slashes && !relative3.protocol) {
    var rkeys = Object.keys(relative3);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== "protocol")
        result[rkey] = relative3[rkey];
    }
    if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
      result.path = result.pathname = "/";
    }
    result.href = result.format();
    return result;
  }
  var relPath;
  if (relative3.protocol && relative3.protocol !== result.protocol) {
    if (!slashedProtocol[relative3.protocol]) {
      var keys = Object.keys(relative3);
      for (var v2 = 0; v2 < keys.length; v2++) {
        var k2 = keys[v2];
        result[k2] = relative3[k2];
      }
      result.href = result.format();
      return result;
    }
    result.protocol = relative3.protocol;
    if (!relative3.host && !hostlessProtocol[relative3.protocol]) {
      relPath = (relative3.pathname || "").split("/");
      while (relPath.length && !(relative3.host = relPath.shift()))
        ;
      if (!relative3.host)
        relative3.host = "";
      if (!relative3.hostname)
        relative3.hostname = "";
      if (relPath[0] !== "")
        relPath.unshift("");
      if (relPath.length < 2)
        relPath.unshift("");
      result.pathname = relPath.join("/");
    } else {
      result.pathname = relative3.pathname;
    }
    result.search = relative3.search;
    result.query = relative3.query;
    result.host = relative3.host || "";
    result.auth = relative3.auth;
    result.hostname = relative3.hostname || relative3.host;
    result.port = relative3.port;
    if (result.pathname || result.search) {
      var p2 = result.pathname || "";
      var s = result.search || "";
      result.path = p2 + s;
    }
    result.slashes = result.slashes || relative3.slashes;
    result.href = result.format();
    return result;
  }
  var isSourceAbs = result.pathname && result.pathname.charAt(0) === "/", isRelAbs = relative3.host || relative3.pathname && relative3.pathname.charAt(0) === "/", mustEndAbs = isRelAbs || isSourceAbs || result.host && relative3.pathname, removeAllDots = mustEndAbs, srcPath = result.pathname && result.pathname.split("/") || [], psychotic = result.protocol && !slashedProtocol[result.protocol];
  relPath = relative3.pathname && relative3.pathname.split("/") || [];
  if (psychotic) {
    result.hostname = "";
    result.port = null;
    if (result.host) {
      if (srcPath[0] === "")
        srcPath[0] = result.host;
      else
        srcPath.unshift(result.host);
    }
    result.host = "";
    if (relative3.protocol) {
      relative3.hostname = null;
      relative3.port = null;
      if (relative3.host) {
        if (relPath[0] === "")
          relPath[0] = relative3.host;
        else
          relPath.unshift(relative3.host);
      }
      relative3.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === "" || srcPath[0] === "");
  }
  var authInHost;
  if (isRelAbs) {
    result.host = relative3.host || relative3.host === "" ? relative3.host : result.host;
    result.hostname = relative3.hostname || relative3.hostname === "" ? relative3.hostname : result.hostname;
    result.search = relative3.search;
    result.query = relative3.query;
    srcPath = relPath;
  } else if (relPath.length) {
    if (!srcPath)
      srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative3.search;
    result.query = relative3.query;
  } else if (!isNullOrUndefined(relative3.search)) {
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative3.search;
    result.query = relative3.query;
    if (!isNull(result.pathname) || !isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
    }
    result.href = result.format();
    return result;
  }
  if (!srcPath.length) {
    result.pathname = null;
    if (result.search) {
      result.path = "/" + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (result.host || relative3.host || srcPath.length > 1) && (last === "." || last === "..") || last === "";
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === ".") {
      srcPath.splice(i, 1);
    } else if (last === "..") {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift("..");
    }
  }
  if (mustEndAbs && srcPath[0] !== "" && (!srcPath[0] || srcPath[0].charAt(0) !== "/")) {
    srcPath.unshift("");
  }
  if (hasTrailingSlash && srcPath.join("/").substr(-1) !== "/") {
    srcPath.push("");
  }
  var isAbsolute3 = srcPath[0] === "" || srcPath[0] && srcPath[0].charAt(0) === "/";
  if (psychotic) {
    result.hostname = result.host = isAbsolute3 ? "" : srcPath.length ? srcPath.shift() : "";
    authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }
  mustEndAbs = mustEndAbs || result.host && srcPath.length;
  if (mustEndAbs && !isAbsolute3) {
    srcPath.unshift("");
  }
  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join("/");
  }
  if (!isNull(result.pathname) || !isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
  }
  result.auth = relative3.auth || result.auth;
  result.slashes = result.slashes || relative3.slashes;
  result.href = result.format();
  return result;
};
Url.prototype.parseHost = function() {
  return parseHost(this);
};
function parseHost(self) {
  var host = self.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ":") {
      self.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host)
    self.hostname = host;
}

// polyfills/url.js
function pathToFileURL() {
  throw new Error("TODO pathToFileURL!");
}
function fileURLToPath() {
  throw new Error("TODO fileURLToPath!");
}

// node_modules/@rollup/plugin-node-resolve/dist/es/index.js
var import_resolve = __toESM(require_resolve(), 1);

// node_modules/@rollup/pluginutils/dist/es/index.js
init_path2();

// node_modules/estree-walker/dist/esm/estree-walker.js
var WalkerBase = class {
  constructor() {
    this.should_skip = false;
    this.should_remove = false;
    this.replacement = null;
    this.context = {
      skip: () => this.should_skip = true,
      remove: () => this.should_remove = true,
      replace: (node) => this.replacement = node
    };
  }
  replace(parent, prop, index, node) {
    if (parent) {
      if (index !== null) {
        parent[prop][index] = node;
      } else {
        parent[prop] = node;
      }
    }
  }
  remove(parent, prop, index) {
    if (parent) {
      if (index !== null) {
        parent[prop].splice(index, 1);
      } else {
        delete parent[prop];
      }
    }
  }
};
var SyncWalker = class extends WalkerBase {
  constructor(enter, leave) {
    super();
    this.enter = enter;
    this.leave = leave;
  }
  visit(node, parent, prop, index) {
    if (node) {
      if (this.enter) {
        const _should_skip = this.should_skip;
        const _should_remove = this.should_remove;
        const _replacement = this.replacement;
        this.should_skip = false;
        this.should_remove = false;
        this.replacement = null;
        this.enter.call(this.context, node, parent, prop, index);
        if (this.replacement) {
          node = this.replacement;
          this.replace(parent, prop, index, node);
        }
        if (this.should_remove) {
          this.remove(parent, prop, index);
        }
        const skipped = this.should_skip;
        const removed = this.should_remove;
        this.should_skip = _should_skip;
        this.should_remove = _should_remove;
        this.replacement = _replacement;
        if (skipped)
          return node;
        if (removed)
          return null;
      }
      for (const key in node) {
        const value = node[key];
        if (typeof value !== "object") {
          continue;
        } else if (Array.isArray(value)) {
          for (let i = 0; i < value.length; i += 1) {
            if (value[i] !== null && typeof value[i].type === "string") {
              if (!this.visit(value[i], node, key, i)) {
                i--;
              }
            }
          }
        } else if (value !== null && typeof value.type === "string") {
          this.visit(value, node, key, null);
        }
      }
      if (this.leave) {
        const _replacement = this.replacement;
        const _should_remove = this.should_remove;
        this.replacement = null;
        this.should_remove = false;
        this.leave.call(this.context, node, parent, prop, index);
        if (this.replacement) {
          node = this.replacement;
          this.replace(parent, prop, index, node);
        }
        if (this.should_remove) {
          this.remove(parent, prop, index);
        }
        const removed = this.should_remove;
        this.replacement = _replacement;
        this.should_remove = _should_remove;
        if (removed)
          return null;
      }
    }
    return node;
  }
};
function walk(ast, { enter, leave }) {
  const instance = new SyncWalker(enter, leave);
  return instance.visit(ast, null);
}

// node_modules/@rollup/pluginutils/dist/es/index.js
var import_picomatch = __toESM(require_picomatch2(), 1);
var extractors = {
  ArrayPattern(names, param) {
    for (const element of param.elements) {
      if (element)
        extractors[element.type](names, element);
    }
  },
  AssignmentPattern(names, param) {
    extractors[param.left.type](names, param.left);
  },
  Identifier(names, param) {
    names.push(param.name);
  },
  MemberExpression() {
  },
  ObjectPattern(names, param) {
    for (const prop of param.properties) {
      if (prop.type === "RestElement") {
        extractors.RestElement(names, prop);
      } else {
        extractors[prop.value.type](names, prop.value);
      }
    }
  },
  RestElement(names, param) {
    extractors[param.argument.type](names, param.argument);
  }
};
var extractAssignedNames = function extractAssignedNames2(param) {
  const names = [];
  extractors[param.type](names, param);
  return names;
};
var blockDeclarations = {
  const: true,
  let: true
};
var Scope = class {
  constructor(options = {}) {
    this.parent = options.parent;
    this.isBlockScope = !!options.block;
    this.declarations = /* @__PURE__ */ Object.create(null);
    if (options.params) {
      options.params.forEach((param) => {
        extractAssignedNames(param).forEach((name) => {
          this.declarations[name] = true;
        });
      });
    }
  }
  addDeclaration(node, isBlockDeclaration, isVar) {
    if (!isBlockDeclaration && this.isBlockScope) {
      this.parent.addDeclaration(node, isBlockDeclaration, isVar);
    } else if (node.id) {
      extractAssignedNames(node.id).forEach((name) => {
        this.declarations[name] = true;
      });
    }
  }
  contains(name) {
    return this.declarations[name] || (this.parent ? this.parent.contains(name) : false);
  }
};
var attachScopes = function attachScopes2(ast, propertyName = "scope") {
  let scope = new Scope();
  walk(ast, {
    enter(n3, parent) {
      const node = n3;
      if (/(Function|Class)Declaration/.test(node.type)) {
        scope.addDeclaration(node, false, false);
      }
      if (node.type === "VariableDeclaration") {
        const { kind } = node;
        const isBlockDeclaration = blockDeclarations[kind];
        node.declarations.forEach((declaration) => {
          scope.addDeclaration(declaration, isBlockDeclaration, true);
        });
      }
      let newScope;
      if (/Function/.test(node.type)) {
        const func = node;
        newScope = new Scope({
          parent: scope,
          block: false,
          params: func.params
        });
        if (func.type === "FunctionExpression" && func.id) {
          newScope.addDeclaration(func, false, false);
        }
      }
      if (/For(In|Of)?Statement/.test(node.type)) {
        newScope = new Scope({
          parent: scope,
          block: true
        });
      }
      if (node.type === "BlockStatement" && !/Function/.test(parent.type)) {
        newScope = new Scope({
          parent: scope,
          block: true
        });
      }
      if (node.type === "CatchClause") {
        newScope = new Scope({
          parent: scope,
          params: node.param ? [node.param] : [],
          block: true
        });
      }
      if (newScope) {
        Object.defineProperty(node, propertyName, {
          value: newScope,
          configurable: true
        });
        scope = newScope;
      }
    },
    leave(n3) {
      const node = n3;
      if (node[propertyName])
        scope = scope.parent;
    }
  });
  return scope;
};
function isArray3(arg) {
  return Array.isArray(arg);
}
function ensureArray(thing) {
  if (isArray3(thing))
    return thing;
  if (thing == null)
    return [];
  return [thing];
}
var normalizePath = function normalizePath2(filename) {
  return filename.split(win32.sep).join(posix.sep);
};
function getMatcherString(id, resolutionBase) {
  if (resolutionBase === false || isAbsolute2(id) || id.startsWith("*")) {
    return normalizePath(id);
  }
  const basePath = normalizePath(resolve2(resolutionBase || "")).replace(/[-^$*+?.()|[\]{}]/g, "\\$&");
  return posix.join(basePath, normalizePath(id));
}
var createFilter = function createFilter2(include, exclude, options) {
  const resolutionBase = options && options.resolve;
  const getMatcher = (id) => id instanceof RegExp ? id : {
    test: (what) => {
      const pattern = getMatcherString(id, resolutionBase);
      const fn2 = (0, import_picomatch.default)(pattern, { dot: true });
      const result = fn2(what);
      return result;
    }
  };
  const includeMatchers = ensureArray(include).map(getMatcher);
  const excludeMatchers = ensureArray(exclude).map(getMatcher);
  return function result(id) {
    if (typeof id !== "string")
      return false;
    if (/\0/.test(id))
      return false;
    const pathId = normalizePath(id);
    for (let i = 0; i < excludeMatchers.length; ++i) {
      const matcher = excludeMatchers[i];
      if (matcher.test(pathId))
        return false;
    }
    for (let i = 0; i < includeMatchers.length; ++i) {
      const matcher = includeMatchers[i];
      if (matcher.test(pathId))
        return true;
    }
    return !includeMatchers.length;
  };
};
var reservedWords = "break case class catch const continue debugger default delete do else export extends finally for function if import in instanceof let new return super switch this throw try typeof var void while with yield enum await implements package protected static interface private public";
var builtins = "arguments Infinity NaN undefined null true false eval uneval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Symbol Error EvalError InternalError RangeError ReferenceError SyntaxError TypeError URIError Number Math Date String RegExp Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array Map Set WeakMap WeakSet SIMD ArrayBuffer DataView JSON Promise Generator GeneratorFunction Reflect Proxy Intl";
var forbiddenIdentifiers = new Set(`${reservedWords} ${builtins}`.split(" "));
forbiddenIdentifiers.add("");
var makeLegalIdentifier = function makeLegalIdentifier2(str) {
  let identifier = str.replace(/-(\w)/g, (_2, letter) => letter.toUpperCase()).replace(/[^$_a-zA-Z0-9]/g, "_");
  if (/\d/.test(identifier[0]) || forbiddenIdentifiers.has(identifier)) {
    identifier = `_${identifier}`;
  }
  return identifier || "_";
};

// node_modules/@rollup/plugin-node-resolve/dist/es/index.js
var version2 = "15.0.1";
var peerDependencies = {
  rollup: "^2.78.0||^3.0.0"
};
promisify(fs_default.access);
var readFile$1 = promisify(fs_default.readFile);
var realpath2 = promisify(fs_default.realpath);
var stat2 = promisify(fs_default.stat);
async function fileExists(filePath) {
  try {
    const res = await stat2(filePath);
    return res.isFile();
  } catch {
    return false;
  }
}
async function resolveSymlink(path) {
  return await fileExists(path) ? realpath2(path) : path;
}
var onError = (error2) => {
  if (error2.code === "ENOENT") {
    return false;
  }
  throw error2;
};
var makeCache = (fn2) => {
  const cache = /* @__PURE__ */ new Map();
  const wrapped = async (param, done) => {
    if (cache.has(param) === false) {
      cache.set(
        param,
        fn2(param).catch((err) => {
          cache.delete(param);
          throw err;
        })
      );
    }
    try {
      const result = cache.get(param);
      const value = await result;
      return done(null, value);
    } catch (error2) {
      return done(error2);
    }
  };
  wrapped.clear = () => cache.clear();
  return wrapped;
};
var isDirCached = makeCache(async (file) => {
  try {
    const stats = await stat2(file);
    return stats.isDirectory();
  } catch (error2) {
    return onError(error2);
  }
});
var isFileCached = makeCache(async (file) => {
  try {
    const stats = await stat2(file);
    return stats.isFile();
  } catch (error2) {
    return onError(error2);
  }
});
var readCachedFile = makeCache(readFile$1);
function handleDeprecatedOptions(opts) {
  const warnings = [];
  if (opts.customResolveOptions) {
    const { customResolveOptions } = opts;
    if (customResolveOptions.moduleDirectory) {
      opts.moduleDirectories = Array.isArray(customResolveOptions.moduleDirectory) ? customResolveOptions.moduleDirectory : [customResolveOptions.moduleDirectory];
      warnings.push(
        "node-resolve: The `customResolveOptions.moduleDirectory` option has been deprecated. Use `moduleDirectories`, which must be an array."
      );
    }
    if (customResolveOptions.preserveSymlinks) {
      throw new Error(
        "node-resolve: `customResolveOptions.preserveSymlinks` is no longer an option. We now always use the rollup `preserveSymlinks` option."
      );
    }
    [
      "basedir",
      "package",
      "extensions",
      "includeCoreModules",
      "readFile",
      "isFile",
      "isDirectory",
      "realpath",
      "packageFilter",
      "pathFilter",
      "paths",
      "packageIterator"
    ].forEach((resolveOption) => {
      if (customResolveOptions[resolveOption]) {
        throw new Error(
          `node-resolve: \`customResolveOptions.${resolveOption}\` is no longer an option. If you need this, please open an issue.`
        );
      }
    });
  }
  return { warnings };
}
function getPackageName(id) {
  if (id.startsWith(".") || id.startsWith("/")) {
    return null;
  }
  const split = id.split("/");
  if (split[0][0] === "@") {
    return `${split[0]}/${split[1]}`;
  }
  return split[0];
}
function getMainFields(options) {
  let mainFields;
  if (options.mainFields) {
    ({ mainFields } = options);
  } else {
    mainFields = ["module", "main"];
  }
  if (options.browser && mainFields.indexOf("browser") === -1) {
    return ["browser"].concat(mainFields);
  }
  if (!mainFields.length) {
    throw new Error("Please ensure at least one `mainFields` value is specified");
  }
  return mainFields;
}
function getPackageInfo(options) {
  const {
    cache,
    extensions,
    pkg,
    mainFields,
    preserveSymlinks,
    useBrowserOverrides,
    rootDir,
    ignoreSideEffectsForRoot
  } = options;
  let { pkgPath } = options;
  if (cache.has(pkgPath)) {
    return cache.get(pkgPath);
  }
  if (!preserveSymlinks) {
    pkgPath = realpathSync(pkgPath);
  }
  const pkgRoot = dirname2(pkgPath);
  const packageInfo = {
    packageJson: { ...pkg },
    packageJsonPath: pkgPath,
    root: pkgRoot,
    resolvedMainField: "main",
    browserMappedMain: false,
    resolvedEntryPoint: ""
  };
  let overriddenMain = false;
  for (let i = 0; i < mainFields.length; i++) {
    const field = mainFields[i];
    if (typeof pkg[field] === "string") {
      pkg.main = pkg[field];
      packageInfo.resolvedMainField = field;
      overriddenMain = true;
      break;
    }
  }
  const internalPackageInfo = {
    cachedPkg: pkg,
    hasModuleSideEffects: () => null,
    hasPackageEntry: overriddenMain !== false || mainFields.indexOf("main") !== -1,
    packageBrowserField: useBrowserOverrides && typeof pkg.browser === "object" && Object.keys(pkg.browser).reduce((browser2, key) => {
      let resolved = pkg.browser[key];
      if (resolved && resolved[0] === ".") {
        resolved = resolve2(pkgRoot, resolved);
      }
      browser2[key] = resolved;
      if (key[0] === ".") {
        const absoluteKey = resolve2(pkgRoot, key);
        browser2[absoluteKey] = resolved;
        if (!extname2(key)) {
          extensions.reduce((subBrowser, ext) => {
            subBrowser[absoluteKey + ext] = subBrowser[key];
            return subBrowser;
          }, browser2);
        }
      }
      return browser2;
    }, {}),
    packageInfo
  };
  const browserMap = internalPackageInfo.packageBrowserField;
  if (useBrowserOverrides && typeof pkg.browser === "object" && browserMap.hasOwnProperty(pkg.main)) {
    packageInfo.resolvedEntryPoint = browserMap[pkg.main];
    packageInfo.browserMappedMain = true;
  } else {
    packageInfo.resolvedEntryPoint = resolve2(pkgRoot, pkg.main || "index.js");
    packageInfo.browserMappedMain = false;
  }
  if (!ignoreSideEffectsForRoot || rootDir !== pkgRoot) {
    const packageSideEffects = pkg.sideEffects;
    if (typeof packageSideEffects === "boolean") {
      internalPackageInfo.hasModuleSideEffects = () => packageSideEffects;
    } else if (Array.isArray(packageSideEffects)) {
      const finalPackageSideEffects = packageSideEffects.map((sideEffect) => {
        if (sideEffect.includes("/")) {
          return sideEffect;
        }
        return `**/${sideEffect}`;
      });
      internalPackageInfo.hasModuleSideEffects = createFilter(finalPackageSideEffects, null, {
        resolve: pkgRoot
      });
    }
  }
  cache.set(pkgPath, internalPackageInfo);
  return internalPackageInfo;
}
function normalizeInput(input) {
  if (Array.isArray(input)) {
    return input;
  } else if (typeof input === "object") {
    return Object.values(input);
  }
  return [input];
}
function isModuleDir(current, moduleDirs) {
  return moduleDirs.some((dir) => current.endsWith(dir));
}
async function findPackageJson(base2, moduleDirs) {
  const { root } = path_default2.parse(base2);
  let current = base2;
  while (current !== root && !isModuleDir(current, moduleDirs)) {
    const pkgJsonPath = path_default2.join(current, "package.json");
    if (await fileExists(pkgJsonPath)) {
      const pkgJsonString = fs_default.readFileSync(pkgJsonPath, "utf-8");
      return { pkgJson: JSON.parse(pkgJsonString), pkgPath: current, pkgJsonPath };
    }
    current = path_default2.resolve(current, "..");
  }
  return null;
}
function isUrl(str) {
  try {
    return !!new URL(str);
  } catch (_2) {
    return false;
  }
}
function isConditions(exports) {
  return typeof exports === "object" && Object.keys(exports).every((k2) => !k2.startsWith("."));
}
function isMappings(exports) {
  return typeof exports === "object" && !isConditions(exports);
}
function isMixedExports(exports) {
  const keys = Object.keys(exports);
  return keys.some((k2) => k2.startsWith(".")) && keys.some((k2) => !k2.startsWith("."));
}
function createBaseErrorMsg(importSpecifier, importer) {
  return `Could not resolve import "${importSpecifier}" in ${importer}`;
}
function createErrorMsg(context, reason, internal) {
  const { importSpecifier, importer, pkgJsonPath } = context;
  const base2 = createBaseErrorMsg(importSpecifier, importer);
  const field = internal ? "imports" : "exports";
  return `${base2} using ${field} defined in ${pkgJsonPath}.${reason ? ` ${reason}` : ""}`;
}
var ResolveError = class extends Error {
};
var InvalidConfigurationError = class extends ResolveError {
  constructor(context, reason) {
    super(createErrorMsg(context, `Invalid "exports" field. ${reason}`));
  }
};
var InvalidModuleSpecifierError = class extends ResolveError {
  constructor(context, internal, reason) {
    super(createErrorMsg(context, reason, internal));
  }
};
var InvalidPackageTargetError = class extends ResolveError {
  constructor(context, reason) {
    super(createErrorMsg(context, reason));
  }
};
function includesInvalidSegments(pathSegments, moduleDirs) {
  return pathSegments.split("/").slice(1).some((t) => [".", "..", ...moduleDirs].includes(t));
}
async function resolvePackageTarget(context, { target, subpath, pattern, internal }) {
  if (typeof target === "string") {
    if (!pattern && subpath.length > 0 && !target.endsWith("/")) {
      throw new InvalidModuleSpecifierError(context);
    }
    if (!target.startsWith("./")) {
      if (internal && !["/", "../"].some((p2) => target.startsWith(p2)) && !isUrl(target)) {
        if (pattern) {
          const result2 = await context.resolveId(
            target.replace(/\*/g, subpath),
            context.pkgURL.href
          );
          return result2 ? pathToFileURL(result2.location).href : null;
        }
        const result = await context.resolveId(`${target}${subpath}`, context.pkgURL.href);
        return result ? pathToFileURL(result.location).href : null;
      }
      throw new InvalidPackageTargetError(context, `Invalid mapping: "${target}".`);
    }
    if (includesInvalidSegments(target, context.moduleDirs)) {
      throw new InvalidPackageTargetError(context, `Invalid mapping: "${target}".`);
    }
    const resolvedTarget = new URL(target, context.pkgURL);
    if (!resolvedTarget.href.startsWith(context.pkgURL.href)) {
      throw new InvalidPackageTargetError(
        context,
        `Resolved to ${resolvedTarget.href} which is outside package ${context.pkgURL.href}`
      );
    }
    if (includesInvalidSegments(subpath, context.moduleDirs)) {
      throw new InvalidModuleSpecifierError(context);
    }
    if (pattern) {
      return resolvedTarget.href.replace(/\*/g, subpath);
    }
    return new URL(subpath, resolvedTarget).href;
  }
  if (Array.isArray(target)) {
    let lastError;
    for (const item of target) {
      try {
        const resolved = await resolvePackageTarget(context, {
          target: item,
          subpath,
          pattern,
          internal
        });
        if (resolved !== void 0) {
          return resolved;
        }
      } catch (error2) {
        if (!(error2 instanceof InvalidPackageTargetError)) {
          throw error2;
        } else {
          lastError = error2;
        }
      }
    }
    if (lastError) {
      throw lastError;
    }
    return null;
  }
  if (target && typeof target === "object") {
    for (const [key, value] of Object.entries(target)) {
      if (key === "default" || context.conditions.includes(key)) {
        const resolved = await resolvePackageTarget(context, {
          target: value,
          subpath,
          pattern,
          internal
        });
        if (resolved !== void 0) {
          return resolved;
        }
      }
    }
    return void 0;
  }
  if (target === null) {
    return null;
  }
  throw new InvalidPackageTargetError(context, `Invalid exports field.`);
}
async function resolvePackageImportsExports(context, { matchKey, matchObj, internal }) {
  if (!matchKey.endsWith("*") && matchKey in matchObj) {
    const target = matchObj[matchKey];
    const resolved = await resolvePackageTarget(context, { target, subpath: "", internal });
    return resolved;
  }
  const expansionKeys = Object.keys(matchObj).filter((k2) => k2.endsWith("/") || k2.endsWith("*")).sort((a2, b2) => b2.length - a2.length);
  for (const expansionKey of expansionKeys) {
    const prefix = expansionKey.substring(0, expansionKey.length - 1);
    if (expansionKey.endsWith("*") && matchKey.startsWith(prefix)) {
      const target = matchObj[expansionKey];
      const subpath = matchKey.substring(expansionKey.length - 1);
      const resolved = await resolvePackageTarget(context, {
        target,
        subpath,
        pattern: true,
        internal
      });
      return resolved;
    }
    if (matchKey.startsWith(expansionKey)) {
      const target = matchObj[expansionKey];
      const subpath = matchKey.substring(expansionKey.length);
      const resolved = await resolvePackageTarget(context, { target, subpath, internal });
      return resolved;
    }
  }
  throw new InvalidModuleSpecifierError(context, internal);
}
async function resolvePackageExports(context, subpath, exports) {
  if (isMixedExports(exports)) {
    throw new InvalidConfigurationError(
      context,
      "All keys must either start with ./, or without one."
    );
  }
  if (subpath === ".") {
    let mainExport;
    if (typeof exports === "string" || Array.isArray(exports) || isConditions(exports)) {
      mainExport = exports;
    } else if (isMappings(exports)) {
      mainExport = exports["."];
    }
    if (mainExport) {
      const resolved = await resolvePackageTarget(context, { target: mainExport, subpath: "" });
      if (resolved) {
        return resolved;
      }
    }
  } else if (isMappings(exports)) {
    const resolvedMatch = await resolvePackageImportsExports(context, {
      matchKey: subpath,
      matchObj: exports
    });
    if (resolvedMatch) {
      return resolvedMatch;
    }
  }
  throw new InvalidModuleSpecifierError(context);
}
async function resolvePackageImports({
  importSpecifier,
  importer,
  moduleDirs,
  conditions,
  resolveId
}) {
  const result = await findPackageJson(importer, moduleDirs);
  if (!result) {
    throw new Error(createBaseErrorMsg(". Could not find a parent package.json."));
  }
  const { pkgPath, pkgJsonPath, pkgJson } = result;
  const pkgURL = pathToFileURL(`${pkgPath}/`);
  const context = {
    importer,
    importSpecifier,
    moduleDirs,
    pkgURL,
    pkgJsonPath,
    conditions,
    resolveId
  };
  const { imports } = pkgJson;
  if (!imports) {
    throw new InvalidModuleSpecifierError(context, true);
  }
  if (importSpecifier === "#" || importSpecifier.startsWith("#/")) {
    throw new InvalidModuleSpecifierError(context, true, "Invalid import specifier.");
  }
  return resolvePackageImportsExports(context, {
    matchKey: importSpecifier,
    matchObj: imports,
    internal: true
  });
}
var resolveImportPath = promisify(import_resolve.default);
var readFile2 = promisify(fs_default.readFile);
async function getPackageJson(importer, pkgName, resolveOptions, moduleDirectories) {
  if (importer) {
    const selfPackageJsonResult = await findPackageJson(importer, moduleDirectories);
    if (selfPackageJsonResult && selfPackageJsonResult.pkgJson.name === pkgName) {
      return selfPackageJsonResult;
    }
  }
  try {
    const pkgJsonPath = await resolveImportPath(`${pkgName}/package.json`, resolveOptions);
    const pkgJson = JSON.parse(await readFile2(pkgJsonPath, "utf-8"));
    return { pkgJsonPath, pkgJson, pkgPath: dirname2(pkgJsonPath) };
  } catch (_2) {
    return null;
  }
}
async function resolveIdClassic({
  importSpecifier,
  packageInfoCache,
  extensions,
  mainFields,
  preserveSymlinks,
  useBrowserOverrides,
  baseDir,
  moduleDirectories,
  modulePaths,
  rootDir,
  ignoreSideEffectsForRoot
}) {
  let hasModuleSideEffects = () => null;
  let hasPackageEntry = true;
  let packageBrowserField = false;
  let packageInfo;
  const filter2 = (pkg, pkgPath) => {
    const info = getPackageInfo({
      cache: packageInfoCache,
      extensions,
      pkg,
      pkgPath,
      mainFields,
      preserveSymlinks,
      useBrowserOverrides,
      rootDir,
      ignoreSideEffectsForRoot
    });
    ({ packageInfo, hasModuleSideEffects, hasPackageEntry, packageBrowserField } = info);
    return info.cachedPkg;
  };
  const resolveOptions = {
    basedir: baseDir,
    readFile: readCachedFile,
    isFile: isFileCached,
    isDirectory: isDirCached,
    extensions,
    includeCoreModules: false,
    moduleDirectory: moduleDirectories,
    paths: modulePaths,
    preserveSymlinks,
    packageFilter: filter2
  };
  let location;
  try {
    location = await resolveImportPath(importSpecifier, resolveOptions);
  } catch (error2) {
    if (error2.code !== "MODULE_NOT_FOUND") {
      throw error2;
    }
    return null;
  }
  return {
    location: preserveSymlinks ? location : await resolveSymlink(location),
    hasModuleSideEffects,
    hasPackageEntry,
    packageBrowserField,
    packageInfo
  };
}
async function resolveWithExportMap({
  importer,
  importSpecifier,
  exportConditions,
  packageInfoCache,
  extensions,
  mainFields,
  preserveSymlinks,
  useBrowserOverrides,
  baseDir,
  moduleDirectories,
  modulePaths,
  rootDir,
  ignoreSideEffectsForRoot
}) {
  if (importSpecifier.startsWith("#")) {
    const resolveResult = await resolvePackageImports({
      importSpecifier,
      importer,
      moduleDirs: moduleDirectories,
      conditions: exportConditions,
      resolveId(id) {
        return resolveIdClassic({
          importSpecifier: id,
          packageInfoCache,
          extensions,
          mainFields,
          preserveSymlinks,
          useBrowserOverrides,
          baseDir,
          moduleDirectories,
          modulePaths
        });
      }
    });
    const location = fileURLToPath(resolveResult);
    return {
      location: preserveSymlinks ? location : await resolveSymlink(location),
      hasModuleSideEffects: () => null,
      hasPackageEntry: true,
      packageBrowserField: false,
      packageInfo: void 0
    };
  }
  const pkgName = getPackageName(importSpecifier);
  if (pkgName) {
    let hasModuleSideEffects = () => null;
    let hasPackageEntry = true;
    let packageBrowserField = false;
    let packageInfo;
    const filter2 = (pkg, pkgPath) => {
      const info = getPackageInfo({
        cache: packageInfoCache,
        extensions,
        pkg,
        pkgPath,
        mainFields,
        preserveSymlinks,
        useBrowserOverrides,
        rootDir,
        ignoreSideEffectsForRoot
      });
      ({ packageInfo, hasModuleSideEffects, hasPackageEntry, packageBrowserField } = info);
      return info.cachedPkg;
    };
    const resolveOptions = {
      basedir: baseDir,
      readFile: readCachedFile,
      isFile: isFileCached,
      isDirectory: isDirCached,
      extensions,
      includeCoreModules: false,
      moduleDirectory: moduleDirectories,
      paths: modulePaths,
      preserveSymlinks,
      packageFilter: filter2
    };
    const result = await getPackageJson(importer, pkgName, resolveOptions, moduleDirectories);
    if (result && result.pkgJson.exports) {
      const { pkgJson, pkgJsonPath } = result;
      const subpath = pkgName === importSpecifier ? "." : `.${importSpecifier.substring(pkgName.length)}`;
      const pkgDr = pkgJsonPath.replace("package.json", "");
      const pkgURL = pathToFileURL(pkgDr);
      const context = {
        importer,
        importSpecifier,
        moduleDirs: moduleDirectories,
        pkgURL,
        pkgJsonPath,
        conditions: exportConditions
      };
      const resolvedPackageExport = await resolvePackageExports(context, subpath, pkgJson.exports);
      const location = fileURLToPath(resolvedPackageExport);
      if (location) {
        return {
          location: preserveSymlinks ? location : await resolveSymlink(location),
          hasModuleSideEffects,
          hasPackageEntry,
          packageBrowserField,
          packageInfo
        };
      }
    }
  }
  return null;
}
async function resolveWithClassic({
  importer,
  importSpecifierList,
  exportConditions,
  warn,
  packageInfoCache,
  extensions,
  mainFields,
  preserveSymlinks,
  useBrowserOverrides,
  baseDir,
  moduleDirectories,
  modulePaths,
  rootDir,
  ignoreSideEffectsForRoot
}) {
  for (let i = 0; i < importSpecifierList.length; i++) {
    const result = await resolveIdClassic({
      importer,
      importSpecifier: importSpecifierList[i],
      exportConditions,
      warn,
      packageInfoCache,
      extensions,
      mainFields,
      preserveSymlinks,
      useBrowserOverrides,
      baseDir,
      moduleDirectories,
      modulePaths,
      rootDir,
      ignoreSideEffectsForRoot
    });
    if (result) {
      return result;
    }
  }
  return null;
}
async function resolveImportSpecifiers({
  importer,
  importSpecifierList,
  exportConditions,
  warn,
  packageInfoCache,
  extensions,
  mainFields,
  preserveSymlinks,
  useBrowserOverrides,
  baseDir,
  moduleDirectories,
  modulePaths,
  rootDir,
  ignoreSideEffectsForRoot
}) {
  try {
    const exportMapRes = await resolveWithExportMap({
      importer,
      importSpecifier: importSpecifierList[0],
      exportConditions,
      packageInfoCache,
      extensions,
      mainFields,
      preserveSymlinks,
      useBrowserOverrides,
      baseDir,
      moduleDirectories,
      modulePaths,
      rootDir,
      ignoreSideEffectsForRoot
    });
    if (exportMapRes)
      return exportMapRes;
  } catch (error2) {
    if (error2 instanceof ResolveError) {
      warn(error2);
      return null;
    }
    throw error2;
  }
  return resolveWithClassic({
    importer,
    importSpecifierList,
    exportConditions,
    warn,
    packageInfoCache,
    extensions,
    mainFields,
    preserveSymlinks,
    useBrowserOverrides,
    baseDir,
    moduleDirectories,
    modulePaths,
    rootDir,
    ignoreSideEffectsForRoot
  });
}
var versionRegexp = /\^(\d+\.\d+\.\d+)/g;
function validateVersion(actualVersion, peerDependencyVersion) {
  let minMajor = Infinity;
  let minMinor = Infinity;
  let minPatch = Infinity;
  let foundVersion;
  while (foundVersion = versionRegexp.exec(peerDependencyVersion)) {
    const [foundMajor, foundMinor, foundPatch] = foundVersion[1].split(".").map(Number);
    if (foundMajor < minMajor) {
      minMajor = foundMajor;
      minMinor = foundMinor;
      minPatch = foundPatch;
    }
  }
  if (!actualVersion) {
    throw new Error(
      `Insufficient Rollup version: "@rollup/plugin-node-resolve" requires at least rollup@${minMajor}.${minMinor}.${minPatch}.`
    );
  }
  const [major, minor, patch] = actualVersion.split(".").map(Number);
  if (major < minMajor || major === minMajor && (minor < minMinor || minor === minMinor && patch < minPatch)) {
    throw new Error(
      `Insufficient rollup version: "@rollup/plugin-node-resolve" requires at least rollup@${minMajor}.${minMinor}.${minPatch} but found rollup@${actualVersion}.`
    );
  }
}
var ES6_BROWSER_EMPTY = "\0node-resolve:empty.js";
var deepFreeze = (object) => {
  Object.freeze(object);
  for (const value of Object.values(object)) {
    if (typeof value === "object" && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  }
  return object;
};
var baseConditions = ["default", "module"];
var baseConditionsEsm = [...baseConditions, "import"];
var baseConditionsCjs = [...baseConditions, "require"];
var defaults = {
  dedupe: [],
  extensions: [".mjs", ".js", ".json", ".node"],
  resolveOnly: [],
  moduleDirectories: ["node_modules"],
  ignoreSideEffectsForRoot: false
};
var DEFAULTS = deepFreeze((0, import_deepmerge.default)({}, defaults));
function nodeResolve(opts = {}) {
  const { warnings } = handleDeprecatedOptions(opts);
  const options = { ...defaults, ...opts };
  const { extensions, jail, moduleDirectories, modulePaths, ignoreSideEffectsForRoot } = options;
  const conditionsEsm = [...baseConditionsEsm, ...options.exportConditions || []];
  const conditionsCjs = [...baseConditionsCjs, ...options.exportConditions || []];
  const packageInfoCache = /* @__PURE__ */ new Map();
  const idToPackageInfo = /* @__PURE__ */ new Map();
  const mainFields = getMainFields(options);
  const useBrowserOverrides = mainFields.indexOf("browser") !== -1;
  const isPreferBuiltinsSet = options.preferBuiltins === true || options.preferBuiltins === false;
  const preferBuiltins = isPreferBuiltinsSet ? options.preferBuiltins : true;
  const rootDir = resolve2(options.rootDir || process.cwd());
  let { dedupe } = options;
  let rollupOptions;
  if (moduleDirectories.some((name) => name.includes("/"))) {
    throw new Error(
      "`moduleDirectories` option must only contain directory names. If you want to load modules from somewhere not supported by the default module resolution algorithm, see `modulePaths`."
    );
  }
  if (typeof dedupe !== "function") {
    dedupe = (importee) => options.dedupe.includes(importee) || options.dedupe.includes(getPackageName(importee));
  }
  const allowPatterns = (patterns) => {
    const regexPatterns = patterns.map((pattern) => {
      if (pattern instanceof RegExp) {
        return pattern;
      }
      const normalized = pattern.replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
      return new RegExp(`^${normalized}$`);
    });
    return (id) => !regexPatterns.length || regexPatterns.some((pattern) => pattern.test(id));
  };
  const resolveOnly = typeof options.resolveOnly === "function" ? options.resolveOnly : allowPatterns(options.resolveOnly);
  const browserMapCache = /* @__PURE__ */ new Map();
  let preserveSymlinks;
  const resolveLikeNode = async (context, importee, importer, custom) => {
    const [importPath, params] = importee.split("?");
    const importSuffix = `${params ? `?${params}` : ""}`;
    importee = importPath;
    const baseDir = !importer || dedupe(importee) ? rootDir : dirname2(importer);
    const browser2 = browserMapCache.get(importer);
    if (useBrowserOverrides && browser2) {
      const resolvedImportee = resolve2(baseDir, importee);
      if (browser2[importee] === false || browser2[resolvedImportee] === false) {
        return { id: ES6_BROWSER_EMPTY };
      }
      const browserImportee = importee[0] !== "." && browser2[importee] || browser2[resolvedImportee] || browser2[`${resolvedImportee}.js`] || browser2[`${resolvedImportee}.json`];
      if (browserImportee) {
        importee = browserImportee;
      }
    }
    const parts = importee.split(/[/\\]/);
    let id = parts.shift();
    let isRelativeImport = false;
    if (id[0] === "@" && parts.length > 0) {
      id += `/${parts.shift()}`;
    } else if (id[0] === ".") {
      id = resolve2(baseDir, importee);
      isRelativeImport = true;
    }
    if (!isRelativeImport && !resolveOnly(id)) {
      if (normalizeInput(rollupOptions.input).includes(importee)) {
        return null;
      }
      return false;
    }
    const importSpecifierList = [importee];
    if (importer === void 0 && !importee[0].match(/^\.?\.?\//)) {
      importSpecifierList.push(`./${importee}`);
    }
    if (importer && importee.endsWith(".js")) {
      for (const ext of [".ts", ".tsx"]) {
        if (importer.endsWith(ext) && extensions.includes(ext)) {
          importSpecifierList.push(importee.replace(/.js$/, ext));
        }
      }
    }
    const warn = (...args) => context.warn(...args);
    const isRequire2 = custom && custom["node-resolve"] && custom["node-resolve"].isRequire;
    const exportConditions = isRequire2 ? conditionsCjs : conditionsEsm;
    if (useBrowserOverrides && !exportConditions.includes("browser"))
      exportConditions.push("browser");
    const resolvedWithoutBuiltins = await resolveImportSpecifiers({
      importer,
      importSpecifierList,
      exportConditions,
      warn,
      packageInfoCache,
      extensions,
      mainFields,
      preserveSymlinks,
      useBrowserOverrides,
      baseDir,
      moduleDirectories,
      modulePaths,
      rootDir,
      ignoreSideEffectsForRoot
    });
    const importeeIsBuiltin = (0, import_is_builtin_module.default)(importee);
    const resolved = importeeIsBuiltin && preferBuiltins ? {
      packageInfo: void 0,
      hasModuleSideEffects: () => null,
      hasPackageEntry: true,
      packageBrowserField: false
    } : resolvedWithoutBuiltins;
    if (!resolved) {
      return null;
    }
    const { packageInfo, hasModuleSideEffects, hasPackageEntry, packageBrowserField } = resolved;
    let { location } = resolved;
    if (packageBrowserField) {
      if (Object.prototype.hasOwnProperty.call(packageBrowserField, location)) {
        if (!packageBrowserField[location]) {
          browserMapCache.set(location, packageBrowserField);
          return { id: ES6_BROWSER_EMPTY };
        }
        location = packageBrowserField[location];
      }
      browserMapCache.set(location, packageBrowserField);
    }
    if (hasPackageEntry && !preserveSymlinks) {
      const exists = await fileExists(location);
      if (exists) {
        location = await realpath2(location);
      }
    }
    idToPackageInfo.set(location, packageInfo);
    if (hasPackageEntry) {
      if (importeeIsBuiltin && preferBuiltins) {
        if (!isPreferBuiltinsSet && resolvedWithoutBuiltins && resolved !== importee) {
          context.warn(
            `preferring built-in module '${importee}' over local alternative at '${resolvedWithoutBuiltins.location}', pass 'preferBuiltins: false' to disable this behavior or 'preferBuiltins: true' to disable this warning`
          );
        }
        return false;
      } else if (jail && location.indexOf(normalize2(jail.trim(sep2))) !== 0) {
        return null;
      }
    }
    if (options.modulesOnly && await fileExists(location)) {
      const code = await readFile$1(location, "utf-8");
      if ((0, import_is_module.default)(code)) {
        return {
          id: `${location}${importSuffix}`,
          moduleSideEffects: hasModuleSideEffects(location)
        };
      }
      return null;
    }
    return {
      id: `${location}${importSuffix}`,
      moduleSideEffects: hasModuleSideEffects(location)
    };
  };
  return {
    name: "node-resolve",
    version: version2,
    buildStart(buildOptions) {
      validateVersion(this.meta.rollupVersion, peerDependencies.rollup);
      rollupOptions = buildOptions;
      for (const warning of warnings) {
        this.warn(warning);
      }
      ({ preserveSymlinks } = buildOptions);
    },
    generateBundle() {
      readCachedFile.clear();
      isFileCached.clear();
      isDirCached.clear();
    },
    resolveId: {
      order: "post",
      async handler(importee, importer, resolveOptions) {
        if (importee === ES6_BROWSER_EMPTY) {
          return importee;
        }
        if (/\0/.test(importee))
          return null;
        const { custom = {} } = resolveOptions;
        const { "node-resolve": { resolved: alreadyResolved } = {} } = custom;
        if (alreadyResolved) {
          return alreadyResolved;
        }
        if (/\0/.test(importer)) {
          importer = void 0;
        }
        const resolved = await resolveLikeNode(this, importee, importer, custom);
        if (resolved) {
          const resolvedResolved = await this.resolve(resolved.id, importer, {
            ...resolveOptions,
            custom: { ...custom, "node-resolve": { ...custom["node-resolve"], resolved } }
          });
          if (resolvedResolved) {
            if (resolvedResolved.external) {
              return false;
            }
            if (resolvedResolved.id !== resolved.id) {
              return resolvedResolved;
            }
            return { ...resolved, meta: resolvedResolved.meta };
          }
        }
        return resolved;
      }
    },
    load(importee) {
      if (importee === ES6_BROWSER_EMPTY) {
        return "export default {};";
      }
      return null;
    },
    getPackageInfoForId(id) {
      return idToPackageInfo.get(id);
    }
  };
}

// node_modules/@rollup/plugin-commonjs/dist/es/index.js
init_path2();
init_fs();
var import_commondir = __toESM(require_commondir(), 1);
var import_glob = __toESM(require_glob(), 1);

// node_modules/sourcemap-codec/dist/sourcemap-codec.es.js
var charToInteger = {};
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
for (i = 0; i < chars.length; i++) {
  charToInteger[chars.charCodeAt(i)] = i;
}
var i;
function encode2(decoded) {
  var sourceFileIndex = 0;
  var sourceCodeLine = 0;
  var sourceCodeColumn = 0;
  var nameIndex = 0;
  var mappings = "";
  for (var i = 0; i < decoded.length; i++) {
    var line = decoded[i];
    if (i > 0)
      mappings += ";";
    if (line.length === 0)
      continue;
    var generatedCodeColumn = 0;
    var lineMappings = [];
    for (var _i2 = 0, line_1 = line; _i2 < line_1.length; _i2++) {
      var segment = line_1[_i2];
      var segmentMappings = encodeInteger(segment[0] - generatedCodeColumn);
      generatedCodeColumn = segment[0];
      if (segment.length > 1) {
        segmentMappings += encodeInteger(segment[1] - sourceFileIndex) + encodeInteger(segment[2] - sourceCodeLine) + encodeInteger(segment[3] - sourceCodeColumn);
        sourceFileIndex = segment[1];
        sourceCodeLine = segment[2];
        sourceCodeColumn = segment[3];
      }
      if (segment.length === 5) {
        segmentMappings += encodeInteger(segment[4] - nameIndex);
        nameIndex = segment[4];
      }
      lineMappings.push(segmentMappings);
    }
    mappings += lineMappings.join(",");
  }
  return mappings;
}
function encodeInteger(num) {
  var result = "";
  num = num < 0 ? -num << 1 | 1 : num << 1;
  do {
    var clamped = num & 31;
    num >>>= 5;
    if (num > 0) {
      clamped |= 32;
    }
    result += chars[clamped];
  } while (num > 0);
  return result;
}

// node_modules/@rollup/plugin-commonjs/node_modules/magic-string/dist/magic-string.es.mjs
var BitSet = class {
  constructor(arg) {
    this.bits = arg instanceof BitSet ? arg.bits.slice() : [];
  }
  add(n3) {
    this.bits[n3 >> 5] |= 1 << (n3 & 31);
  }
  has(n3) {
    return !!(this.bits[n3 >> 5] & 1 << (n3 & 31));
  }
};
var Chunk = class {
  constructor(start, end, content) {
    this.start = start;
    this.end = end;
    this.original = content;
    this.intro = "";
    this.outro = "";
    this.content = content;
    this.storeName = false;
    this.edited = false;
    {
      this.previous = null;
      this.next = null;
    }
  }
  appendLeft(content) {
    this.outro += content;
  }
  appendRight(content) {
    this.intro = this.intro + content;
  }
  clone() {
    const chunk = new Chunk(this.start, this.end, this.original);
    chunk.intro = this.intro;
    chunk.outro = this.outro;
    chunk.content = this.content;
    chunk.storeName = this.storeName;
    chunk.edited = this.edited;
    return chunk;
  }
  contains(index) {
    return this.start < index && index < this.end;
  }
  eachNext(fn2) {
    let chunk = this;
    while (chunk) {
      fn2(chunk);
      chunk = chunk.next;
    }
  }
  eachPrevious(fn2) {
    let chunk = this;
    while (chunk) {
      fn2(chunk);
      chunk = chunk.previous;
    }
  }
  edit(content, storeName, contentOnly) {
    this.content = content;
    if (!contentOnly) {
      this.intro = "";
      this.outro = "";
    }
    this.storeName = storeName;
    this.edited = true;
    return this;
  }
  prependLeft(content) {
    this.outro = content + this.outro;
  }
  prependRight(content) {
    this.intro = content + this.intro;
  }
  split(index) {
    const sliceIndex = index - this.start;
    const originalBefore = this.original.slice(0, sliceIndex);
    const originalAfter = this.original.slice(sliceIndex);
    this.original = originalBefore;
    const newChunk = new Chunk(index, this.end, originalAfter);
    newChunk.outro = this.outro;
    this.outro = "";
    this.end = index;
    if (this.edited) {
      newChunk.edit("", false);
      this.content = "";
    } else {
      this.content = originalBefore;
    }
    newChunk.next = this.next;
    if (newChunk.next)
      newChunk.next.previous = newChunk;
    newChunk.previous = this;
    this.next = newChunk;
    return newChunk;
  }
  toString() {
    return this.intro + this.content + this.outro;
  }
  trimEnd(rx) {
    this.outro = this.outro.replace(rx, "");
    if (this.outro.length)
      return true;
    const trimmed = this.content.replace(rx, "");
    if (trimmed.length) {
      if (trimmed !== this.content) {
        this.split(this.start + trimmed.length).edit("", void 0, true);
      }
      return true;
    } else {
      this.edit("", void 0, true);
      this.intro = this.intro.replace(rx, "");
      if (this.intro.length)
        return true;
    }
  }
  trimStart(rx) {
    this.intro = this.intro.replace(rx, "");
    if (this.intro.length)
      return true;
    const trimmed = this.content.replace(rx, "");
    if (trimmed.length) {
      if (trimmed !== this.content) {
        this.split(this.end - trimmed.length);
        this.edit("", void 0, true);
      }
      return true;
    } else {
      this.edit("", void 0, true);
      this.outro = this.outro.replace(rx, "");
      if (this.outro.length)
        return true;
    }
  }
};
function getBtoa() {
  if (typeof window !== "undefined" && typeof window.btoa === "function") {
    return (str) => window.btoa(unescape(encodeURIComponent(str)));
  } else if (typeof Buffer === "function") {
    return (str) => Buffer.from(str, "utf-8").toString("base64");
  } else {
    return () => {
      throw new Error("Unsupported environment: `window.btoa` or `Buffer` should be supported.");
    };
  }
}
var btoa = /* @__PURE__ */ getBtoa();
var SourceMap = class {
  constructor(properties) {
    this.version = 3;
    this.file = properties.file;
    this.sources = properties.sources;
    this.sourcesContent = properties.sourcesContent;
    this.names = properties.names;
    this.mappings = encode2(properties.mappings);
  }
  toString() {
    return JSON.stringify(this);
  }
  toUrl() {
    return "data:application/json;charset=utf-8;base64," + btoa(this.toString());
  }
};
function guessIndent(code) {
  const lines = code.split("\n");
  const tabbed = lines.filter((line) => /^\t+/.test(line));
  const spaced = lines.filter((line) => /^ {2,}/.test(line));
  if (tabbed.length === 0 && spaced.length === 0) {
    return null;
  }
  if (tabbed.length >= spaced.length) {
    return "	";
  }
  const min = spaced.reduce((previous, current) => {
    const numSpaces = /^ +/.exec(current)[0].length;
    return Math.min(numSpaces, previous);
  }, Infinity);
  return new Array(min + 1).join(" ");
}
function getRelativePath(from2, to2) {
  const fromParts = from2.split(/[/\\]/);
  const toParts = to2.split(/[/\\]/);
  fromParts.pop();
  while (fromParts[0] === toParts[0]) {
    fromParts.shift();
    toParts.shift();
  }
  if (fromParts.length) {
    let i = fromParts.length;
    while (i--)
      fromParts[i] = "..";
  }
  return fromParts.concat(toParts).join("/");
}
var toString3 = Object.prototype.toString;
function isObject2(thing) {
  return toString3.call(thing) === "[object Object]";
}
function getLocator(source) {
  const originalLines = source.split("\n");
  const lineOffsets = [];
  for (let i = 0, pos = 0; i < originalLines.length; i++) {
    lineOffsets.push(pos);
    pos += originalLines[i].length + 1;
  }
  return function locate(index) {
    let i = 0;
    let j2 = lineOffsets.length;
    while (i < j2) {
      const m2 = i + j2 >> 1;
      if (index < lineOffsets[m2]) {
        j2 = m2;
      } else {
        i = m2 + 1;
      }
    }
    const line = i - 1;
    const column = index - lineOffsets[line];
    return { line, column };
  };
}
var Mappings = class {
  constructor(hires) {
    this.hires = hires;
    this.generatedCodeLine = 0;
    this.generatedCodeColumn = 0;
    this.raw = [];
    this.rawSegments = this.raw[this.generatedCodeLine] = [];
    this.pending = null;
  }
  addEdit(sourceIndex, content, loc, nameIndex) {
    if (content.length) {
      const segment = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
      if (nameIndex >= 0) {
        segment.push(nameIndex);
      }
      this.rawSegments.push(segment);
    } else if (this.pending) {
      this.rawSegments.push(this.pending);
    }
    this.advance(content);
    this.pending = null;
  }
  addUneditedChunk(sourceIndex, chunk, original, loc, sourcemapLocations) {
    let originalCharIndex = chunk.start;
    let first = true;
    while (originalCharIndex < chunk.end) {
      if (this.hires || first || sourcemapLocations.has(originalCharIndex)) {
        this.rawSegments.push([this.generatedCodeColumn, sourceIndex, loc.line, loc.column]);
      }
      if (original[originalCharIndex] === "\n") {
        loc.line += 1;
        loc.column = 0;
        this.generatedCodeLine += 1;
        this.raw[this.generatedCodeLine] = this.rawSegments = [];
        this.generatedCodeColumn = 0;
        first = true;
      } else {
        loc.column += 1;
        this.generatedCodeColumn += 1;
        first = false;
      }
      originalCharIndex += 1;
    }
    this.pending = null;
  }
  advance(str) {
    if (!str)
      return;
    const lines = str.split("\n");
    if (lines.length > 1) {
      for (let i = 0; i < lines.length - 1; i++) {
        this.generatedCodeLine++;
        this.raw[this.generatedCodeLine] = this.rawSegments = [];
      }
      this.generatedCodeColumn = 0;
    }
    this.generatedCodeColumn += lines[lines.length - 1].length;
  }
};
var n2 = "\n";
var warned = {
  insertLeft: false,
  insertRight: false,
  storeName: false
};
var MagicString = class {
  constructor(string, options = {}) {
    const chunk = new Chunk(0, string.length, string);
    Object.defineProperties(this, {
      original: { writable: true, value: string },
      outro: { writable: true, value: "" },
      intro: { writable: true, value: "" },
      firstChunk: { writable: true, value: chunk },
      lastChunk: { writable: true, value: chunk },
      lastSearchedChunk: { writable: true, value: chunk },
      byStart: { writable: true, value: {} },
      byEnd: { writable: true, value: {} },
      filename: { writable: true, value: options.filename },
      indentExclusionRanges: { writable: true, value: options.indentExclusionRanges },
      sourcemapLocations: { writable: true, value: new BitSet() },
      storedNames: { writable: true, value: {} },
      indentStr: { writable: true, value: void 0 }
    });
    this.byStart[0] = chunk;
    this.byEnd[string.length] = chunk;
  }
  addSourcemapLocation(char) {
    this.sourcemapLocations.add(char);
  }
  append(content) {
    if (typeof content !== "string")
      throw new TypeError("outro content must be a string");
    this.outro += content;
    return this;
  }
  appendLeft(index, content) {
    if (typeof content !== "string")
      throw new TypeError("inserted content must be a string");
    this._split(index);
    const chunk = this.byEnd[index];
    if (chunk) {
      chunk.appendLeft(content);
    } else {
      this.intro += content;
    }
    return this;
  }
  appendRight(index, content) {
    if (typeof content !== "string")
      throw new TypeError("inserted content must be a string");
    this._split(index);
    const chunk = this.byStart[index];
    if (chunk) {
      chunk.appendRight(content);
    } else {
      this.outro += content;
    }
    return this;
  }
  clone() {
    const cloned = new MagicString(this.original, { filename: this.filename });
    let originalChunk = this.firstChunk;
    let clonedChunk = cloned.firstChunk = cloned.lastSearchedChunk = originalChunk.clone();
    while (originalChunk) {
      cloned.byStart[clonedChunk.start] = clonedChunk;
      cloned.byEnd[clonedChunk.end] = clonedChunk;
      const nextOriginalChunk = originalChunk.next;
      const nextClonedChunk = nextOriginalChunk && nextOriginalChunk.clone();
      if (nextClonedChunk) {
        clonedChunk.next = nextClonedChunk;
        nextClonedChunk.previous = clonedChunk;
        clonedChunk = nextClonedChunk;
      }
      originalChunk = nextOriginalChunk;
    }
    cloned.lastChunk = clonedChunk;
    if (this.indentExclusionRanges) {
      cloned.indentExclusionRanges = this.indentExclusionRanges.slice();
    }
    cloned.sourcemapLocations = new BitSet(this.sourcemapLocations);
    cloned.intro = this.intro;
    cloned.outro = this.outro;
    return cloned;
  }
  generateDecodedMap(options) {
    options = options || {};
    const sourceIndex = 0;
    const names = Object.keys(this.storedNames);
    const mappings = new Mappings(options.hires);
    const locate = getLocator(this.original);
    if (this.intro) {
      mappings.advance(this.intro);
    }
    this.firstChunk.eachNext((chunk) => {
      const loc = locate(chunk.start);
      if (chunk.intro.length)
        mappings.advance(chunk.intro);
      if (chunk.edited) {
        mappings.addEdit(
          sourceIndex,
          chunk.content,
          loc,
          chunk.storeName ? names.indexOf(chunk.original) : -1
        );
      } else {
        mappings.addUneditedChunk(sourceIndex, chunk, this.original, loc, this.sourcemapLocations);
      }
      if (chunk.outro.length)
        mappings.advance(chunk.outro);
    });
    return {
      file: options.file ? options.file.split(/[/\\]/).pop() : null,
      sources: [options.source ? getRelativePath(options.file || "", options.source) : null],
      sourcesContent: options.includeContent ? [this.original] : [null],
      names,
      mappings: mappings.raw
    };
  }
  generateMap(options) {
    return new SourceMap(this.generateDecodedMap(options));
  }
  _ensureindentStr() {
    if (this.indentStr === void 0) {
      this.indentStr = guessIndent(this.original);
    }
  }
  _getRawIndentString() {
    this._ensureindentStr();
    return this.indentStr;
  }
  getIndentString() {
    this._ensureindentStr();
    return this.indentStr === null ? "	" : this.indentStr;
  }
  indent(indentStr, options) {
    const pattern = /^[^\r\n]/gm;
    if (isObject2(indentStr)) {
      options = indentStr;
      indentStr = void 0;
    }
    if (indentStr === void 0) {
      this._ensureindentStr();
      indentStr = this.indentStr || "	";
    }
    if (indentStr === "")
      return this;
    options = options || {};
    const isExcluded = {};
    if (options.exclude) {
      const exclusions = typeof options.exclude[0] === "number" ? [options.exclude] : options.exclude;
      exclusions.forEach((exclusion) => {
        for (let i = exclusion[0]; i < exclusion[1]; i += 1) {
          isExcluded[i] = true;
        }
      });
    }
    let shouldIndentNextCharacter = options.indentStart !== false;
    const replacer = (match) => {
      if (shouldIndentNextCharacter)
        return `${indentStr}${match}`;
      shouldIndentNextCharacter = true;
      return match;
    };
    this.intro = this.intro.replace(pattern, replacer);
    let charIndex = 0;
    let chunk = this.firstChunk;
    while (chunk) {
      const end = chunk.end;
      if (chunk.edited) {
        if (!isExcluded[charIndex]) {
          chunk.content = chunk.content.replace(pattern, replacer);
          if (chunk.content.length) {
            shouldIndentNextCharacter = chunk.content[chunk.content.length - 1] === "\n";
          }
        }
      } else {
        charIndex = chunk.start;
        while (charIndex < end) {
          if (!isExcluded[charIndex]) {
            const char = this.original[charIndex];
            if (char === "\n") {
              shouldIndentNextCharacter = true;
            } else if (char !== "\r" && shouldIndentNextCharacter) {
              shouldIndentNextCharacter = false;
              if (charIndex === chunk.start) {
                chunk.prependRight(indentStr);
              } else {
                this._splitChunk(chunk, charIndex);
                chunk = chunk.next;
                chunk.prependRight(indentStr);
              }
            }
          }
          charIndex += 1;
        }
      }
      charIndex = chunk.end;
      chunk = chunk.next;
    }
    this.outro = this.outro.replace(pattern, replacer);
    return this;
  }
  insert() {
    throw new Error(
      "magicString.insert(...) is deprecated. Use prependRight(...) or appendLeft(...)"
    );
  }
  insertLeft(index, content) {
    if (!warned.insertLeft) {
      console.warn(
        "magicString.insertLeft(...) is deprecated. Use magicString.appendLeft(...) instead"
      );
      warned.insertLeft = true;
    }
    return this.appendLeft(index, content);
  }
  insertRight(index, content) {
    if (!warned.insertRight) {
      console.warn(
        "magicString.insertRight(...) is deprecated. Use magicString.prependRight(...) instead"
      );
      warned.insertRight = true;
    }
    return this.prependRight(index, content);
  }
  move(start, end, index) {
    if (index >= start && index <= end)
      throw new Error("Cannot move a selection inside itself");
    this._split(start);
    this._split(end);
    this._split(index);
    const first = this.byStart[start];
    const last = this.byEnd[end];
    const oldLeft = first.previous;
    const oldRight = last.next;
    const newRight = this.byStart[index];
    if (!newRight && last === this.lastChunk)
      return this;
    const newLeft = newRight ? newRight.previous : this.lastChunk;
    if (oldLeft)
      oldLeft.next = oldRight;
    if (oldRight)
      oldRight.previous = oldLeft;
    if (newLeft)
      newLeft.next = first;
    if (newRight)
      newRight.previous = last;
    if (!first.previous)
      this.firstChunk = last.next;
    if (!last.next) {
      this.lastChunk = first.previous;
      this.lastChunk.next = null;
    }
    first.previous = newLeft;
    last.next = newRight || null;
    if (!newLeft)
      this.firstChunk = first;
    if (!newRight)
      this.lastChunk = last;
    return this;
  }
  overwrite(start, end, content, options) {
    options = options || {};
    return this.update(start, end, content, { ...options, overwrite: !options.contentOnly });
  }
  update(start, end, content, options) {
    if (typeof content !== "string")
      throw new TypeError("replacement content must be a string");
    while (start < 0)
      start += this.original.length;
    while (end < 0)
      end += this.original.length;
    if (end > this.original.length)
      throw new Error("end is out of bounds");
    if (start === end)
      throw new Error(
        "Cannot overwrite a zero-length range \u2013 use appendLeft or prependRight instead"
      );
    this._split(start);
    this._split(end);
    if (options === true) {
      if (!warned.storeName) {
        console.warn(
          "The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string"
        );
        warned.storeName = true;
      }
      options = { storeName: true };
    }
    const storeName = options !== void 0 ? options.storeName : false;
    const overwrite = options !== void 0 ? options.overwrite : false;
    if (storeName) {
      const original = this.original.slice(start, end);
      Object.defineProperty(this.storedNames, original, {
        writable: true,
        value: true,
        enumerable: true
      });
    }
    const first = this.byStart[start];
    const last = this.byEnd[end];
    if (first) {
      let chunk = first;
      while (chunk !== last) {
        if (chunk.next !== this.byStart[chunk.end]) {
          throw new Error("Cannot overwrite across a split point");
        }
        chunk = chunk.next;
        chunk.edit("", false);
      }
      first.edit(content, storeName, !overwrite);
    } else {
      const newChunk = new Chunk(start, end, "").edit(content, storeName);
      last.next = newChunk;
      newChunk.previous = last;
    }
    return this;
  }
  prepend(content) {
    if (typeof content !== "string")
      throw new TypeError("outro content must be a string");
    this.intro = content + this.intro;
    return this;
  }
  prependLeft(index, content) {
    if (typeof content !== "string")
      throw new TypeError("inserted content must be a string");
    this._split(index);
    const chunk = this.byEnd[index];
    if (chunk) {
      chunk.prependLeft(content);
    } else {
      this.intro = content + this.intro;
    }
    return this;
  }
  prependRight(index, content) {
    if (typeof content !== "string")
      throw new TypeError("inserted content must be a string");
    this._split(index);
    const chunk = this.byStart[index];
    if (chunk) {
      chunk.prependRight(content);
    } else {
      this.outro = content + this.outro;
    }
    return this;
  }
  remove(start, end) {
    while (start < 0)
      start += this.original.length;
    while (end < 0)
      end += this.original.length;
    if (start === end)
      return this;
    if (start < 0 || end > this.original.length)
      throw new Error("Character is out of bounds");
    if (start > end)
      throw new Error("end must be greater than start");
    this._split(start);
    this._split(end);
    let chunk = this.byStart[start];
    while (chunk) {
      chunk.intro = "";
      chunk.outro = "";
      chunk.edit("");
      chunk = end > chunk.end ? this.byStart[chunk.end] : null;
    }
    return this;
  }
  lastChar() {
    if (this.outro.length)
      return this.outro[this.outro.length - 1];
    let chunk = this.lastChunk;
    do {
      if (chunk.outro.length)
        return chunk.outro[chunk.outro.length - 1];
      if (chunk.content.length)
        return chunk.content[chunk.content.length - 1];
      if (chunk.intro.length)
        return chunk.intro[chunk.intro.length - 1];
    } while (chunk = chunk.previous);
    if (this.intro.length)
      return this.intro[this.intro.length - 1];
    return "";
  }
  lastLine() {
    let lineIndex = this.outro.lastIndexOf(n2);
    if (lineIndex !== -1)
      return this.outro.substr(lineIndex + 1);
    let lineStr = this.outro;
    let chunk = this.lastChunk;
    do {
      if (chunk.outro.length > 0) {
        lineIndex = chunk.outro.lastIndexOf(n2);
        if (lineIndex !== -1)
          return chunk.outro.substr(lineIndex + 1) + lineStr;
        lineStr = chunk.outro + lineStr;
      }
      if (chunk.content.length > 0) {
        lineIndex = chunk.content.lastIndexOf(n2);
        if (lineIndex !== -1)
          return chunk.content.substr(lineIndex + 1) + lineStr;
        lineStr = chunk.content + lineStr;
      }
      if (chunk.intro.length > 0) {
        lineIndex = chunk.intro.lastIndexOf(n2);
        if (lineIndex !== -1)
          return chunk.intro.substr(lineIndex + 1) + lineStr;
        lineStr = chunk.intro + lineStr;
      }
    } while (chunk = chunk.previous);
    lineIndex = this.intro.lastIndexOf(n2);
    if (lineIndex !== -1)
      return this.intro.substr(lineIndex + 1) + lineStr;
    return this.intro + lineStr;
  }
  slice(start = 0, end = this.original.length) {
    while (start < 0)
      start += this.original.length;
    while (end < 0)
      end += this.original.length;
    let result = "";
    let chunk = this.firstChunk;
    while (chunk && (chunk.start > start || chunk.end <= start)) {
      if (chunk.start < end && chunk.end >= end) {
        return result;
      }
      chunk = chunk.next;
    }
    if (chunk && chunk.edited && chunk.start !== start)
      throw new Error(`Cannot use replaced character ${start} as slice start anchor.`);
    const startChunk = chunk;
    while (chunk) {
      if (chunk.intro && (startChunk !== chunk || chunk.start === start)) {
        result += chunk.intro;
      }
      const containsEnd = chunk.start < end && chunk.end >= end;
      if (containsEnd && chunk.edited && chunk.end !== end)
        throw new Error(`Cannot use replaced character ${end} as slice end anchor.`);
      const sliceStart = startChunk === chunk ? start - chunk.start : 0;
      const sliceEnd = containsEnd ? chunk.content.length + end - chunk.end : chunk.content.length;
      result += chunk.content.slice(sliceStart, sliceEnd);
      if (chunk.outro && (!containsEnd || chunk.end === end)) {
        result += chunk.outro;
      }
      if (containsEnd) {
        break;
      }
      chunk = chunk.next;
    }
    return result;
  }
  snip(start, end) {
    const clone = this.clone();
    clone.remove(0, start);
    clone.remove(end, clone.original.length);
    return clone;
  }
  _split(index) {
    if (this.byStart[index] || this.byEnd[index])
      return;
    let chunk = this.lastSearchedChunk;
    const searchForward = index > chunk.end;
    while (chunk) {
      if (chunk.contains(index))
        return this._splitChunk(chunk, index);
      chunk = searchForward ? this.byStart[chunk.end] : this.byEnd[chunk.start];
    }
  }
  _splitChunk(chunk, index) {
    if (chunk.edited && chunk.content.length) {
      const loc = getLocator(this.original)(index);
      throw new Error(
        `Cannot split a chunk that has already been edited (${loc.line}:${loc.column} \u2013 "${chunk.original}")`
      );
    }
    const newChunk = chunk.split(index);
    this.byEnd[index] = chunk;
    this.byStart[index] = newChunk;
    this.byEnd[newChunk.end] = newChunk;
    if (chunk === this.lastChunk)
      this.lastChunk = newChunk;
    this.lastSearchedChunk = chunk;
    return true;
  }
  toString() {
    let str = this.intro;
    let chunk = this.firstChunk;
    while (chunk) {
      str += chunk.toString();
      chunk = chunk.next;
    }
    return str + this.outro;
  }
  isEmpty() {
    let chunk = this.firstChunk;
    do {
      if (chunk.intro.length && chunk.intro.trim() || chunk.content.length && chunk.content.trim() || chunk.outro.length && chunk.outro.trim())
        return false;
    } while (chunk = chunk.next);
    return true;
  }
  length() {
    let chunk = this.firstChunk;
    let length = 0;
    do {
      length += chunk.intro.length + chunk.content.length + chunk.outro.length;
    } while (chunk = chunk.next);
    return length;
  }
  trimLines() {
    return this.trim("[\\r\\n]");
  }
  trim(charType) {
    return this.trimStart(charType).trimEnd(charType);
  }
  trimEndAborted(charType) {
    const rx = new RegExp((charType || "\\s") + "+$");
    this.outro = this.outro.replace(rx, "");
    if (this.outro.length)
      return true;
    let chunk = this.lastChunk;
    do {
      const end = chunk.end;
      const aborted = chunk.trimEnd(rx);
      if (chunk.end !== end) {
        if (this.lastChunk === chunk) {
          this.lastChunk = chunk.next;
        }
        this.byEnd[chunk.end] = chunk;
        this.byStart[chunk.next.start] = chunk.next;
        this.byEnd[chunk.next.end] = chunk.next;
      }
      if (aborted)
        return true;
      chunk = chunk.previous;
    } while (chunk);
    return false;
  }
  trimEnd(charType) {
    this.trimEndAborted(charType);
    return this;
  }
  trimStartAborted(charType) {
    const rx = new RegExp("^" + (charType || "\\s") + "+");
    this.intro = this.intro.replace(rx, "");
    if (this.intro.length)
      return true;
    let chunk = this.firstChunk;
    do {
      const end = chunk.end;
      const aborted = chunk.trimStart(rx);
      if (chunk.end !== end) {
        if (chunk === this.lastChunk)
          this.lastChunk = chunk.next;
        this.byEnd[chunk.end] = chunk;
        this.byStart[chunk.next.start] = chunk.next;
        this.byEnd[chunk.next.end] = chunk.next;
      }
      if (aborted)
        return true;
      chunk = chunk.next;
    } while (chunk);
    return false;
  }
  trimStart(charType) {
    this.trimStartAborted(charType);
    return this;
  }
  hasChanged() {
    return this.original !== this.toString();
  }
  _replaceRegexp(searchValue, replacement) {
    function getReplacement(match, str) {
      if (typeof replacement === "string") {
        return replacement.replace(/\$(\$|&|\d+)/g, (_2, i) => {
          if (i === "$")
            return "$";
          if (i === "&")
            return match[0];
          const num = +i;
          if (num < match.length)
            return match[+i];
          return `$${i}`;
        });
      } else {
        return replacement(...match, match.index, str, match.groups);
      }
    }
    function matchAll(re2, str) {
      let match;
      const matches = [];
      while (match = re2.exec(str)) {
        matches.push(match);
      }
      return matches;
    }
    if (searchValue.global) {
      const matches = matchAll(searchValue, this.original);
      matches.forEach((match) => {
        if (match.index != null)
          this.overwrite(
            match.index,
            match.index + match[0].length,
            getReplacement(match, this.original)
          );
      });
    } else {
      const match = this.original.match(searchValue);
      if (match && match.index != null)
        this.overwrite(
          match.index,
          match.index + match[0].length,
          getReplacement(match, this.original)
        );
    }
    return this;
  }
  _replaceString(string, replacement) {
    const { original } = this;
    const index = original.indexOf(string);
    if (index !== -1) {
      this.overwrite(index, index + string.length, replacement);
    }
    return this;
  }
  replace(searchValue, replacement) {
    if (typeof searchValue === "string") {
      return this._replaceString(searchValue, replacement);
    }
    return this._replaceRegexp(searchValue, replacement);
  }
  _replaceAllString(string, replacement) {
    const { original } = this;
    const stringLength = string.length;
    for (let index = original.indexOf(string); index !== -1; index = original.indexOf(string, index + stringLength)) {
      this.overwrite(index, index + stringLength, replacement);
    }
    return this;
  }
  replaceAll(searchValue, replacement) {
    if (typeof searchValue === "string") {
      return this._replaceAllString(searchValue, replacement);
    }
    if (!searchValue.global) {
      throw new TypeError(
        "MagicString.prototype.replaceAll called with a non-global RegExp argument"
      );
    }
    return this._replaceRegexp(searchValue, replacement);
  }
};

// node_modules/is-reference/dist/is-reference.es.js
function isReference(node, parent) {
  if (node.type === "MemberExpression") {
    return !node.computed && isReference(node.object, node);
  }
  if (node.type === "Identifier") {
    if (!parent)
      return true;
    switch (parent.type) {
      case "MemberExpression":
        return parent.computed || node === parent.object;
      case "MethodDefinition":
        return parent.computed;
      case "FieldDefinition":
        return parent.computed || node === parent.value;
      case "Property":
        return parent.computed || node === parent.value;
      case "ExportSpecifier":
      case "ImportSpecifier":
        return node === parent.local;
      case "LabeledStatement":
      case "BreakStatement":
      case "ContinueStatement":
        return false;
      default:
        return true;
    }
  }
  return false;
}
var is_reference_es_default = isReference;

// node_modules/@rollup/plugin-commonjs/dist/es/index.js
var version3 = "23.0.5";
var peerDependencies2 = {
  rollup: "^2.68.0||^3.0.0"
};
function tryParse(parse3, code, id) {
  try {
    return parse3(code, { allowReturnOutsideFunction: true });
  } catch (err) {
    err.message += ` in ${id}`;
    throw err;
  }
}
var firstpassGlobal = /\b(?:require|module|exports|global)\b/;
var firstpassNoGlobal = /\b(?:require|module|exports)\b/;
function hasCjsKeywords(code, ignoreGlobal) {
  const firstpass = ignoreGlobal ? firstpassNoGlobal : firstpassGlobal;
  return firstpass.test(code);
}
function analyzeTopLevelStatements(parse3, code, id) {
  const ast = tryParse(parse3, code, id);
  let isEsModule = false;
  let hasDefaultExport = false;
  let hasNamedExports = false;
  for (const node of ast.body) {
    switch (node.type) {
      case "ExportDefaultDeclaration":
        isEsModule = true;
        hasDefaultExport = true;
        break;
      case "ExportNamedDeclaration":
        isEsModule = true;
        if (node.declaration) {
          hasNamedExports = true;
        } else {
          for (const specifier of node.specifiers) {
            if (specifier.exported.name === "default") {
              hasDefaultExport = true;
            } else {
              hasNamedExports = true;
            }
          }
        }
        break;
      case "ExportAllDeclaration":
        isEsModule = true;
        if (node.exported && node.exported.name === "default") {
          hasDefaultExport = true;
        } else {
          hasNamedExports = true;
        }
        break;
      case "ImportDeclaration":
        isEsModule = true;
        break;
    }
  }
  return { isEsModule, hasDefaultExport, hasNamedExports, ast };
}
function deconflict(scopes, globals, identifier) {
  let i = 1;
  let deconflicted = makeLegalIdentifier(identifier);
  const hasConflicts = () => scopes.some((scope) => scope.contains(deconflicted)) || globals.has(deconflicted);
  while (hasConflicts()) {
    deconflicted = makeLegalIdentifier(`${identifier}_${i}`);
    i += 1;
  }
  for (const scope of scopes) {
    scope.declarations[deconflicted] = true;
  }
  return deconflicted;
}
function getName2(id) {
  const name = makeLegalIdentifier(basename2(id, extname2(id)));
  if (name !== "index") {
    return name;
  }
  return makeLegalIdentifier(basename2(dirname2(id)));
}
function normalizePathSlashes(path) {
  return path.replace(/\\/g, "/");
}
var getVirtualPathForDynamicRequirePath = (path, commonDir) => `/${normalizePathSlashes(relative2(commonDir, path))}`;
function capitalize(name) {
  return name[0].toUpperCase() + name.slice(1);
}
function getStrictRequiresFilter({ strictRequires }) {
  switch (strictRequires) {
    case true:
      return { strictRequiresFilter: () => true, detectCyclesAndConditional: false };
    case void 0:
    case "auto":
    case "debug":
    case null:
      return { strictRequiresFilter: () => false, detectCyclesAndConditional: true };
    case false:
      return { strictRequiresFilter: () => false, detectCyclesAndConditional: false };
    default:
      if (typeof strictRequires === "string" || Array.isArray(strictRequires)) {
        return {
          strictRequiresFilter: createFilter(strictRequires),
          detectCyclesAndConditional: false
        };
      }
      throw new Error('Unexpected value for "strictRequires" option.');
  }
}
function getPackageEntryPoint(dirPath) {
  let entryPoint = "index.js";
  try {
    if (existsSync(join2(dirPath, "package.json"))) {
      entryPoint = JSON.parse(readFileSync(join2(dirPath, "package.json"), { encoding: "utf8" })).main || entryPoint;
    }
  } catch (ignored) {
  }
  return entryPoint;
}
function isDirectory(path) {
  try {
    if (statSync(path).isDirectory())
      return true;
  } catch (ignored) {
  }
  return false;
}
function getDynamicRequireModules(patterns, dynamicRequireRoot) {
  const dynamicRequireModules = /* @__PURE__ */ new Map();
  const dirNames = /* @__PURE__ */ new Set();
  for (const pattern of !patterns || Array.isArray(patterns) ? patterns || [] : [patterns]) {
    const isNegated = pattern.startsWith("!");
    const modifyMap = (targetPath, resolvedPath) => isNegated ? dynamicRequireModules.delete(targetPath) : dynamicRequireModules.set(targetPath, resolvedPath);
    for (const path of import_glob.default.sync(isNegated ? pattern.substr(1) : pattern)) {
      const resolvedPath = resolve2(path);
      const requirePath = normalizePathSlashes(resolvedPath);
      if (isDirectory(resolvedPath)) {
        dirNames.add(resolvedPath);
        const modulePath = resolve2(join2(resolvedPath, getPackageEntryPoint(path)));
        modifyMap(requirePath, modulePath);
        modifyMap(normalizePathSlashes(modulePath), modulePath);
      } else {
        dirNames.add(dirname2(resolvedPath));
        modifyMap(requirePath, resolvedPath);
      }
    }
  }
  return {
    commonDir: dirNames.size ? (0, import_commondir.default)([...dirNames, dynamicRequireRoot]) : null,
    dynamicRequireModules
  };
}
var FAILED_REQUIRE_ERROR = `throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');`;
var COMMONJS_REQUIRE_EXPORT = "commonjsRequire";
var CREATE_COMMONJS_REQUIRE_EXPORT = "createCommonjsRequire";
function getDynamicModuleRegistry(isDynamicRequireModulesEnabled, dynamicRequireModules, commonDir, ignoreDynamicRequires) {
  if (!isDynamicRequireModulesEnabled) {
    return `export function ${COMMONJS_REQUIRE_EXPORT}(path) {
	${FAILED_REQUIRE_ERROR}
}`;
  }
  const dynamicModuleImports = [...dynamicRequireModules.values()].map(
    (id, index) => `import ${id.endsWith(".json") ? `json${index}` : `{ __require as require${index} }`} from ${JSON.stringify(id)};`
  ).join("\n");
  const dynamicModuleProps = [...dynamicRequireModules.keys()].map(
    (id, index) => `		${JSON.stringify(getVirtualPathForDynamicRequirePath(id, commonDir))}: ${id.endsWith(".json") ? `function () { return json${index}; }` : `require${index}`}`
  ).join(",\n");
  return `${dynamicModuleImports}

var dynamicModules;

function getDynamicModules() {
	return dynamicModules || (dynamicModules = {
${dynamicModuleProps}
	});
}

export function ${CREATE_COMMONJS_REQUIRE_EXPORT}(originalModuleDir) {
	function handleRequire(path) {
		var resolvedPath = commonjsResolve(path, originalModuleDir);
		if (resolvedPath !== null) {
			return getDynamicModules()[resolvedPath]();
		}
		${ignoreDynamicRequires ? "return require(path);" : FAILED_REQUIRE_ERROR}
	}
	handleRequire.resolve = function (path) {
		var resolvedPath = commonjsResolve(path, originalModuleDir);
		if (resolvedPath !== null) {
			return resolvedPath;
		}
		return require.resolve(path);
	}
	return handleRequire;
}

function commonjsResolve (path, originalModuleDir) {
	var shouldTryNodeModules = isPossibleNodeModulesPath(path);
	path = normalize(path);
	var relPath;
	if (path[0] === '/') {
		originalModuleDir = '';
	}
	var modules = getDynamicModules();
	var checkedExtensions = ['', '.js', '.json'];
	while (true) {
		if (!shouldTryNodeModules) {
			relPath = normalize(originalModuleDir + '/' + path);
		} else {
			relPath = normalize(originalModuleDir + '/node_modules/' + path);
		}

		if (relPath.endsWith('/..')) {
			break; // Travelled too far up, avoid infinite loop
		}

		for (var extensionIndex = 0; extensionIndex < checkedExtensions.length; extensionIndex++) {
			var resolvedPath = relPath + checkedExtensions[extensionIndex];
			if (modules[resolvedPath]) {
				return resolvedPath;
			}
		}
		if (!shouldTryNodeModules) break;
		var nextDir = normalize(originalModuleDir + '/..');
		if (nextDir === originalModuleDir) break;
		originalModuleDir = nextDir;
	}
	return null;
}

function isPossibleNodeModulesPath (modulePath) {
	var c0 = modulePath[0];
	if (c0 === '/' || c0 === '\\\\') return false;
	var c1 = modulePath[1], c2 = modulePath[2];
	if ((c0 === '.' && (!c1 || c1 === '/' || c1 === '\\\\')) ||
		(c0 === '.' && c1 === '.' && (!c2 || c2 === '/' || c2 === '\\\\'))) return false;
	if (c1 === ':' && (c2 === '/' || c2 === '\\\\')) return false;
	return true;
}

function normalize (path) {
	path = path.replace(/\\\\/g, '/');
	var parts = path.split('/');
	var slashed = parts[0] === '';
	for (var i = 1; i < parts.length; i++) {
		if (parts[i] === '.' || parts[i] === '') {
			parts.splice(i--, 1);
		}
	}
	for (var i = 1; i < parts.length; i++) {
		if (parts[i] !== '..') continue;
		if (i > 0 && parts[i - 1] !== '..' && parts[i - 1] !== '.') {
			parts.splice(--i, 2);
			i--;
		}
	}
	path = parts.join('/');
	if (slashed && path[0] !== '/') path = '/' + path;
	else if (path.length === 0) path = '.';
	return path;
}`;
}
var isWrappedId = (id, suffix) => id.endsWith(suffix);
var wrapId = (id, suffix) => `\0${id}${suffix}`;
var unwrapId = (wrappedId, suffix) => wrappedId.slice(1, -suffix.length);
var PROXY_SUFFIX = "?commonjs-proxy";
var WRAPPED_SUFFIX = "?commonjs-wrapped";
var EXTERNAL_SUFFIX = "?commonjs-external";
var EXPORTS_SUFFIX = "?commonjs-exports";
var MODULE_SUFFIX = "?commonjs-module";
var ENTRY_SUFFIX = "?commonjs-entry";
var ES_IMPORT_SUFFIX = "?commonjs-es-import";
var DYNAMIC_MODULES_ID = "\0commonjs-dynamic-modules";
var HELPERS_ID = "\0commonjsHelpers.js";
var IS_WRAPPED_COMMONJS = "withRequireFunction";
var HELPERS = `
export var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

export function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

export function getDefaultExportFromNamespaceIfPresent (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') ? n['default'] : n;
}

export function getDefaultExportFromNamespaceIfNotNamed (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
}

export function getAugmentedNamespace(n) {
  var f = n.default;
	if (typeof f == "function") {
		var a = function a () {
			if (this instanceof a) {
				var args = [null];
				args.push.apply(args, arguments);
				var Ctor = Function.bind.apply(f, args);
				return new Ctor();
			}
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}
`;
function getHelpersModule() {
  return HELPERS;
}
function getUnknownRequireProxy(id, requireReturnsDefault) {
  if (requireReturnsDefault === true || id.endsWith(".json")) {
    return `export { default } from ${JSON.stringify(id)};`;
  }
  const name = getName2(id);
  const exported = requireReturnsDefault === "auto" ? `import { getDefaultExportFromNamespaceIfNotNamed } from "${HELPERS_ID}"; export default /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(${name});` : requireReturnsDefault === "preferred" ? `import { getDefaultExportFromNamespaceIfPresent } from "${HELPERS_ID}"; export default /*@__PURE__*/getDefaultExportFromNamespaceIfPresent(${name});` : !requireReturnsDefault ? `import { getAugmentedNamespace } from "${HELPERS_ID}"; export default /*@__PURE__*/getAugmentedNamespace(${name});` : `export default ${name};`;
  return `import * as ${name} from ${JSON.stringify(id)}; ${exported}`;
}
async function getStaticRequireProxy(id, requireReturnsDefault, loadModule) {
  const name = getName2(id);
  const {
    meta: { commonjs: commonjsMeta }
  } = await loadModule({ id });
  if (!commonjsMeta) {
    return getUnknownRequireProxy(id, requireReturnsDefault);
  } else if (commonjsMeta.isCommonJS) {
    return `export { __moduleExports as default } from ${JSON.stringify(id)};`;
  } else if (!requireReturnsDefault) {
    return `import { getAugmentedNamespace } from "${HELPERS_ID}"; import * as ${name} from ${JSON.stringify(
      id
    )}; export default /*@__PURE__*/getAugmentedNamespace(${name});`;
  } else if (requireReturnsDefault !== true && (requireReturnsDefault === "namespace" || !commonjsMeta.hasDefaultExport || requireReturnsDefault === "auto" && commonjsMeta.hasNamedExports)) {
    return `import * as ${name} from ${JSON.stringify(id)}; export default ${name};`;
  }
  return `export { default } from ${JSON.stringify(id)};`;
}
function getEntryProxy(id, defaultIsModuleExports, getModuleInfo) {
  const {
    meta: { commonjs: commonjsMeta },
    hasDefaultExport
  } = getModuleInfo(id);
  if (!commonjsMeta || commonjsMeta.isCommonJS !== IS_WRAPPED_COMMONJS) {
    const stringifiedId = JSON.stringify(id);
    let code = `export * from ${stringifiedId};`;
    if (hasDefaultExport) {
      code += `export { default } from ${stringifiedId};`;
    }
    return code;
  }
  return getEsImportProxy(id, defaultIsModuleExports);
}
function getEsImportProxy(id, defaultIsModuleExports) {
  const name = getName2(id);
  const exportsName = `${name}Exports`;
  const requireModule = `require${capitalize(name)}`;
  let code = `import { getDefaultExportFromCjs } from "${HELPERS_ID}";
import { __require as ${requireModule} } from ${JSON.stringify(id)};
var ${exportsName} = ${requireModule}();
export { ${exportsName} as __moduleExports };`;
  if (defaultIsModuleExports) {
    code += `
export { ${exportsName} as default };`;
  } else {
    code += `export default /*@__PURE__*/getDefaultExportFromCjs(${exportsName});`;
  }
  return {
    code,
    syntheticNamedExports: "__moduleExports"
  };
}
function getCandidatesForExtension(resolved, extension) {
  return [resolved + extension, `${resolved}${sep2}index${extension}`];
}
function getCandidates(resolved, extensions) {
  return extensions.reduce(
    (paths, extension) => paths.concat(getCandidatesForExtension(resolved, extension)),
    [resolved]
  );
}
function resolveExtensions(importee, importer, extensions) {
  if (importee[0] !== "." || !importer)
    return void 0;
  const resolved = resolve2(dirname2(importer), importee);
  const candidates = getCandidates(resolved, extensions);
  for (let i = 0; i < candidates.length; i += 1) {
    try {
      const stats = statSync(candidates[i]);
      if (stats.isFile())
        return { id: candidates[i] };
    } catch (err) {
    }
  }
  return void 0;
}
function getResolveId(extensions, isPossibleCjsId) {
  const currentlyResolving = /* @__PURE__ */ new Map();
  return {
    currentlyResolving,
    async resolveId(importee, importer, resolveOptions) {
      const customOptions = resolveOptions.custom;
      if (customOptions && customOptions["node-resolve"] && customOptions["node-resolve"].isRequire) {
        return null;
      }
      const currentlyResolvingForParent = currentlyResolving.get(importer);
      if (currentlyResolvingForParent && currentlyResolvingForParent.has(importee)) {
        this.warn({
          code: "THIS_RESOLVE_WITHOUT_OPTIONS",
          message: 'It appears a plugin has implemented a "resolveId" hook that uses "this.resolve" without forwarding the third "options" parameter of "resolveId". This is problematic as it can lead to wrong module resolutions especially for the node-resolve plugin and in certain cases cause early exit errors for the commonjs plugin.\nIn rare cases, this warning can appear if the same file is both imported and required from the same mixed ES/CommonJS module, in which case it can be ignored.',
          url: "https://rollupjs.org/guide/en/#resolveid"
        });
        return null;
      }
      if (isWrappedId(importee, WRAPPED_SUFFIX)) {
        return unwrapId(importee, WRAPPED_SUFFIX);
      }
      if (importee.endsWith(ENTRY_SUFFIX) || isWrappedId(importee, MODULE_SUFFIX) || isWrappedId(importee, EXPORTS_SUFFIX) || isWrappedId(importee, PROXY_SUFFIX) || isWrappedId(importee, ES_IMPORT_SUFFIX) || isWrappedId(importee, EXTERNAL_SUFFIX) || importee.startsWith(HELPERS_ID) || importee === DYNAMIC_MODULES_ID) {
        return importee;
      }
      if (importer) {
        if (importer === DYNAMIC_MODULES_ID || isWrappedId(importer, PROXY_SUFFIX) || isWrappedId(importer, ES_IMPORT_SUFFIX) || importer.endsWith(ENTRY_SUFFIX)) {
          return importee;
        }
        if (isWrappedId(importer, EXTERNAL_SUFFIX)) {
          if (!await this.resolve(
            importee,
            importer,
            Object.assign({ skipSelf: true }, resolveOptions)
          )) {
            return null;
          }
          return { id: importee, external: true };
        }
      }
      if (importee.startsWith("\0")) {
        return null;
      }
      const resolved = await this.resolve(
        importee,
        importer,
        Object.assign({ skipSelf: true }, resolveOptions)
      ) || resolveExtensions(importee, importer, extensions);
      if (!resolved || resolved.external || resolved.id.endsWith(ENTRY_SUFFIX) || isWrappedId(resolved.id, ES_IMPORT_SUFFIX) || !isPossibleCjsId(resolved.id)) {
        return resolved;
      }
      const moduleInfo = await this.load(resolved);
      const {
        meta: { commonjs: commonjsMeta }
      } = moduleInfo;
      if (commonjsMeta) {
        const { isCommonJS } = commonjsMeta;
        if (isCommonJS) {
          if (resolveOptions.isEntry) {
            moduleInfo.moduleSideEffects = true;
            return resolved.id + ENTRY_SUFFIX;
          }
          if (isCommonJS === IS_WRAPPED_COMMONJS) {
            return { id: wrapId(resolved.id, ES_IMPORT_SUFFIX), meta: { commonjs: { resolved } } };
          }
        }
      }
      return resolved;
    }
  };
}
function getRequireResolver(extensions, detectCyclesAndConditional, currentlyResolving) {
  const knownCjsModuleTypes = /* @__PURE__ */ Object.create(null);
  const requiredIds = /* @__PURE__ */ Object.create(null);
  const unconditionallyRequiredIds = /* @__PURE__ */ Object.create(null);
  const dependencies = /* @__PURE__ */ Object.create(null);
  const getDependencies = (id) => dependencies[id] || (dependencies[id] = /* @__PURE__ */ new Set());
  const isCyclic = (id) => {
    const dependenciesToCheck = new Set(getDependencies(id));
    for (const dependency of dependenciesToCheck) {
      if (dependency === id) {
        return true;
      }
      for (const childDependency of getDependencies(dependency)) {
        dependenciesToCheck.add(childDependency);
      }
    }
    return false;
  };
  const fullyAnalyzedModules = /* @__PURE__ */ Object.create(null);
  const getTypeForFullyAnalyzedModule = (id) => {
    const knownType = knownCjsModuleTypes[id];
    if (knownType !== true || !detectCyclesAndConditional || fullyAnalyzedModules[id]) {
      return knownType;
    }
    if (isCyclic(id)) {
      return knownCjsModuleTypes[id] = IS_WRAPPED_COMMONJS;
    }
    return knownType;
  };
  const setInitialParentType = (id, initialCommonJSType) => {
    if (fullyAnalyzedModules[id]) {
      return;
    }
    knownCjsModuleTypes[id] = initialCommonJSType;
    if (detectCyclesAndConditional && knownCjsModuleTypes[id] === true && requiredIds[id] && !unconditionallyRequiredIds[id]) {
      knownCjsModuleTypes[id] = IS_WRAPPED_COMMONJS;
    }
  };
  const analyzeRequiredModule = async (parentId, resolved, isConditional, loadModule) => {
    const childId = resolved.id;
    requiredIds[childId] = true;
    if (!(isConditional || knownCjsModuleTypes[parentId] === IS_WRAPPED_COMMONJS)) {
      unconditionallyRequiredIds[childId] = true;
    }
    getDependencies(parentId).add(childId);
    if (!isCyclic(childId)) {
      await loadModule(resolved);
    }
  };
  const getTypeForImportedModule = async (resolved, loadModule) => {
    if (resolved.id in knownCjsModuleTypes) {
      return knownCjsModuleTypes[resolved.id];
    }
    const {
      meta: { commonjs: commonjs2 }
    } = await loadModule(resolved);
    return commonjs2 && commonjs2.isCommonJS || false;
  };
  return {
    getWrappedIds: () => Object.keys(knownCjsModuleTypes).filter(
      (id) => knownCjsModuleTypes[id] === IS_WRAPPED_COMMONJS
    ),
    isRequiredId: (id) => requiredIds[id],
    async shouldTransformCachedModule({
      id: parentId,
      resolvedSources,
      meta: { commonjs: parentMeta }
    }) {
      if (!(parentMeta && parentMeta.isCommonJS))
        knownCjsModuleTypes[parentId] = false;
      if (isWrappedId(parentId, ES_IMPORT_SUFFIX))
        return false;
      const parentRequires = parentMeta && parentMeta.requires;
      if (parentRequires) {
        setInitialParentType(parentId, parentMeta.initialCommonJSType);
        await Promise.all(
          parentRequires.map(
            ({ resolved, isConditional }) => analyzeRequiredModule(parentId, resolved, isConditional, this.load)
          )
        );
        if (getTypeForFullyAnalyzedModule(parentId) !== parentMeta.isCommonJS) {
          return true;
        }
        for (const {
          resolved: { id }
        } of parentRequires) {
          if (getTypeForFullyAnalyzedModule(id) !== parentMeta.isRequiredCommonJS[id]) {
            return true;
          }
        }
        fullyAnalyzedModules[parentId] = true;
        for (const {
          resolved: { id }
        } of parentRequires) {
          fullyAnalyzedModules[id] = true;
        }
      }
      const parentRequireSet = new Set((parentRequires || []).map(({ resolved: { id } }) => id));
      return (await Promise.all(
        Object.keys(resolvedSources).map((source) => resolvedSources[source]).filter(({ id, external }) => !(external || parentRequireSet.has(id))).map(async (resolved) => {
          if (isWrappedId(resolved.id, ES_IMPORT_SUFFIX)) {
            return await getTypeForImportedModule(
              (await this.load({ id: resolved.id })).meta.commonjs.resolved,
              this.load
            ) !== IS_WRAPPED_COMMONJS;
          }
          return await getTypeForImportedModule(resolved, this.load) === IS_WRAPPED_COMMONJS;
        })
      )).some((shouldTransform) => shouldTransform);
    },
    resolveRequireSourcesAndUpdateMeta: (rollupContext) => async (parentId, isParentCommonJS, parentMeta, sources) => {
      parentMeta.initialCommonJSType = isParentCommonJS;
      parentMeta.requires = [];
      parentMeta.isRequiredCommonJS = /* @__PURE__ */ Object.create(null);
      setInitialParentType(parentId, isParentCommonJS);
      const currentlyResolvingForParent = currentlyResolving.get(parentId) || /* @__PURE__ */ new Set();
      currentlyResolving.set(parentId, currentlyResolvingForParent);
      const requireTargets = await Promise.all(
        sources.map(async ({ source, isConditional }) => {
          if (source.startsWith("\0")) {
            return { id: source, allowProxy: false };
          }
          currentlyResolvingForParent.add(source);
          const resolved = await rollupContext.resolve(source, parentId, {
            custom: { "node-resolve": { isRequire: true } }
          }) || resolveExtensions(source, parentId, extensions);
          currentlyResolvingForParent.delete(source);
          if (!resolved) {
            return { id: wrapId(source, EXTERNAL_SUFFIX), allowProxy: false };
          }
          const childId = resolved.id;
          if (resolved.external) {
            return { id: wrapId(childId, EXTERNAL_SUFFIX), allowProxy: false };
          }
          parentMeta.requires.push({ resolved, isConditional });
          await analyzeRequiredModule(parentId, resolved, isConditional, rollupContext.load);
          return { id: childId, allowProxy: true };
        })
      );
      parentMeta.isCommonJS = getTypeForFullyAnalyzedModule(parentId);
      fullyAnalyzedModules[parentId] = true;
      return requireTargets.map(({ id: dependencyId, allowProxy }, index) => {
        const isCommonJS = parentMeta.isRequiredCommonJS[dependencyId] = getTypeForFullyAnalyzedModule(dependencyId);
        fullyAnalyzedModules[dependencyId] = true;
        return {
          source: sources[index].source,
          id: allowProxy ? isCommonJS === IS_WRAPPED_COMMONJS ? wrapId(dependencyId, WRAPPED_SUFFIX) : wrapId(dependencyId, PROXY_SUFFIX) : dependencyId,
          isCommonJS
        };
      });
    },
    isCurrentlyResolving(source, parentId) {
      const currentlyResolvingForParent = currentlyResolving.get(parentId);
      return currentlyResolvingForParent && currentlyResolvingForParent.has(source);
    }
  };
}
function validateVersion2(actualVersion, peerDependencyVersion, name) {
  const versionRegexp2 = /\^(\d+\.\d+\.\d+)/g;
  let minMajor = Infinity;
  let minMinor = Infinity;
  let minPatch = Infinity;
  let foundVersion;
  while (foundVersion = versionRegexp2.exec(peerDependencyVersion)) {
    const [foundMajor, foundMinor, foundPatch] = foundVersion[1].split(".").map(Number);
    if (foundMajor < minMajor) {
      minMajor = foundMajor;
      minMinor = foundMinor;
      minPatch = foundPatch;
    }
  }
  if (!actualVersion) {
    throw new Error(
      `Insufficient ${name} version: "@rollup/plugin-commonjs" requires at least ${name}@${minMajor}.${minMinor}.${minPatch}.`
    );
  }
  const [major, minor, patch] = actualVersion.split(".").map(Number);
  if (major < minMajor || major === minMajor && (minor < minMinor || minor === minMinor && patch < minPatch)) {
    throw new Error(
      `Insufficient ${name} version: "@rollup/plugin-commonjs" requires at least ${name}@${minMajor}.${minMinor}.${minPatch} but found ${name}@${actualVersion}.`
    );
  }
}
var operators = {
  "==": (x2) => equals2(x2.left, x2.right, false),
  "!=": (x2) => not(operators["=="](x2)),
  "===": (x2) => equals2(x2.left, x2.right, true),
  "!==": (x2) => not(operators["==="](x2)),
  "!": (x2) => isFalsy(x2.argument),
  "&&": (x2) => isTruthy(x2.left) && isTruthy(x2.right),
  "||": (x2) => isTruthy(x2.left) || isTruthy(x2.right)
};
function not(value) {
  return value === null ? value : !value;
}
function equals2(a2, b2, strict) {
  if (a2.type !== b2.type)
    return null;
  if (a2.type === "Literal")
    return strict ? a2.value === b2.value : a2.value == b2.value;
  return null;
}
function isTruthy(node) {
  if (!node)
    return false;
  if (node.type === "Literal")
    return !!node.value;
  if (node.type === "ParenthesizedExpression")
    return isTruthy(node.expression);
  if (node.operator in operators)
    return operators[node.operator](node);
  return null;
}
function isFalsy(node) {
  return not(isTruthy(node));
}
function getKeypath(node) {
  const parts = [];
  while (node.type === "MemberExpression") {
    if (node.computed)
      return null;
    parts.unshift(node.property.name);
    node = node.object;
  }
  if (node.type !== "Identifier")
    return null;
  const { name } = node;
  parts.unshift(name);
  return { name, keypath: parts.join(".") };
}
var KEY_COMPILED_ESM = "__esModule";
function isDefineCompiledEsm(node) {
  const definedProperty = getDefinePropertyCallName(node, "exports") || getDefinePropertyCallName(node, "module.exports");
  if (definedProperty && definedProperty.key === KEY_COMPILED_ESM) {
    return isTruthy(definedProperty.value);
  }
  return false;
}
function getDefinePropertyCallName(node, targetName) {
  const {
    callee: { object, property }
  } = node;
  if (!object || object.type !== "Identifier" || object.name !== "Object")
    return;
  if (!property || property.type !== "Identifier" || property.name !== "defineProperty")
    return;
  if (node.arguments.length !== 3)
    return;
  const targetNames = targetName.split(".");
  const [target, key, value] = node.arguments;
  if (targetNames.length === 1) {
    if (target.type !== "Identifier" || target.name !== targetNames[0]) {
      return;
    }
  }
  if (targetNames.length === 2) {
    if (target.type !== "MemberExpression" || target.object.name !== targetNames[0] || target.property.name !== targetNames[1]) {
      return;
    }
  }
  if (value.type !== "ObjectExpression" || !value.properties)
    return;
  const valueProperty = value.properties.find((p2) => p2.key && p2.key.name === "value");
  if (!valueProperty || !valueProperty.value)
    return;
  return { key: key.value, value: valueProperty.value };
}
function isShorthandProperty(parent) {
  return parent && parent.type === "Property" && parent.shorthand;
}
function hasDefineEsmProperty(node) {
  return node.properties.some((property) => {
    if (property.type === "Property" && property.key.type === "Identifier" && property.key.name === "__esModule" && isTruthy(property.value)) {
      return true;
    }
    return false;
  });
}
function wrapCode(magicString, uses, moduleName, exportsName, indentExclusionRanges) {
  const args = [];
  const passedArgs = [];
  if (uses.module) {
    args.push("module");
    passedArgs.push(moduleName);
  }
  if (uses.exports) {
    args.push("exports");
    passedArgs.push(exportsName);
  }
  magicString.trim().indent("	", { exclude: indentExclusionRanges }).prepend(`(function (${args.join(", ")}) {
`).append(`
} (${passedArgs.join(", ")}));`);
}
function rewriteExportsAndGetExportsBlock(magicString, moduleName, exportsName, wrapped, moduleExportsAssignments, firstTopLevelModuleExportsAssignment, exportsAssignmentsByName, topLevelAssignments, defineCompiledEsmExpressions, deconflictedExportNames, code, HELPERS_NAME, exportMode, detectWrappedDefault, defaultIsModuleExports, usesRequireWrapper, requireName) {
  const exports = [];
  const exportDeclarations = [];
  if (usesRequireWrapper) {
    getExportsWhenUsingRequireWrapper(
      magicString,
      wrapped,
      exportMode,
      exports,
      moduleExportsAssignments,
      exportsAssignmentsByName,
      moduleName,
      exportsName,
      requireName,
      defineCompiledEsmExpressions
    );
  } else if (exportMode === "replace") {
    getExportsForReplacedModuleExports(
      magicString,
      exports,
      exportDeclarations,
      moduleExportsAssignments,
      firstTopLevelModuleExportsAssignment,
      exportsName
    );
  } else {
    exports.push(`${exportsName} as __moduleExports`);
    if (wrapped) {
      getExportsWhenWrapping(
        exportDeclarations,
        exportsName,
        detectWrappedDefault,
        HELPERS_NAME,
        defaultIsModuleExports
      );
    } else {
      getExports(
        magicString,
        exports,
        exportDeclarations,
        moduleExportsAssignments,
        exportsAssignmentsByName,
        deconflictedExportNames,
        topLevelAssignments,
        moduleName,
        exportsName,
        defineCompiledEsmExpressions,
        HELPERS_NAME,
        defaultIsModuleExports
      );
    }
  }
  if (exports.length) {
    exportDeclarations.push(`export { ${exports.join(", ")} };`);
  }
  return `

${exportDeclarations.join("\n")}`;
}
function getExportsWhenUsingRequireWrapper(magicString, wrapped, exportMode, exports, moduleExportsAssignments, exportsAssignmentsByName, moduleName, exportsName, requireName, defineCompiledEsmExpressions) {
  if (!wrapped) {
    if (exportMode === "replace") {
      for (const { left } of moduleExportsAssignments) {
        magicString.overwrite(left.start, left.end, exportsName);
      }
    } else {
      for (const { left } of moduleExportsAssignments) {
        magicString.overwrite(left.start, left.end, `${moduleName}.exports`);
      }
      for (const [exportName, { nodes }] of exportsAssignmentsByName) {
        for (const node of nodes) {
          magicString.overwrite(node.start, node.left.end, `${exportsName}.${exportName}`);
        }
      }
      for (const expression of defineCompiledEsmExpressions) {
        const moduleExportsExpression = expression.type === "CallExpression" ? expression.arguments[0] : expression.left.object;
        magicString.overwrite(
          moduleExportsExpression.start,
          moduleExportsExpression.end,
          exportsName
        );
      }
    }
  }
  exports.push(`${requireName} as __require`);
}
function getExportsForReplacedModuleExports(magicString, exports, exportDeclarations, moduleExportsAssignments, firstTopLevelModuleExportsAssignment, exportsName) {
  for (const { left } of moduleExportsAssignments) {
    magicString.overwrite(left.start, left.end, exportsName);
  }
  magicString.prependRight(firstTopLevelModuleExportsAssignment.left.start, "var ");
  exports.push(`${exportsName} as __moduleExports`);
  exportDeclarations.push(`export default ${exportsName};`);
}
function getExportsWhenWrapping(exportDeclarations, exportsName, detectWrappedDefault, HELPERS_NAME, defaultIsModuleExports) {
  exportDeclarations.push(
    `export default ${detectWrappedDefault && defaultIsModuleExports === "auto" ? `/*@__PURE__*/${HELPERS_NAME}.getDefaultExportFromCjs(${exportsName})` : defaultIsModuleExports === false ? `${exportsName}.default` : exportsName};`
  );
}
function getExports(magicString, exports, exportDeclarations, moduleExportsAssignments, exportsAssignmentsByName, deconflictedExportNames, topLevelAssignments, moduleName, exportsName, defineCompiledEsmExpressions, HELPERS_NAME, defaultIsModuleExports) {
  let deconflictedDefaultExportName;
  for (const { left } of moduleExportsAssignments) {
    magicString.overwrite(left.start, left.end, `${moduleName}.exports`);
  }
  for (const [exportName, { nodes }] of exportsAssignmentsByName) {
    const deconflicted = deconflictedExportNames[exportName];
    let needsDeclaration = true;
    for (const node of nodes) {
      let replacement = `${deconflicted} = ${exportsName}.${exportName}`;
      if (needsDeclaration && topLevelAssignments.has(node)) {
        replacement = `var ${replacement}`;
        needsDeclaration = false;
      }
      magicString.overwrite(node.start, node.left.end, replacement);
    }
    if (needsDeclaration) {
      magicString.prepend(`var ${deconflicted};
`);
    }
    if (exportName === "default") {
      deconflictedDefaultExportName = deconflicted;
    } else {
      exports.push(exportName === deconflicted ? exportName : `${deconflicted} as ${exportName}`);
    }
  }
  let isRestorableCompiledEsm = false;
  for (const expression of defineCompiledEsmExpressions) {
    isRestorableCompiledEsm = true;
    const moduleExportsExpression = expression.type === "CallExpression" ? expression.arguments[0] : expression.left.object;
    magicString.overwrite(moduleExportsExpression.start, moduleExportsExpression.end, exportsName);
  }
  if (!isRestorableCompiledEsm || defaultIsModuleExports === true) {
    exports.push(`${exportsName} as default`);
  } else if (moduleExportsAssignments.length === 0 || defaultIsModuleExports === false) {
    exports.push(`${deconflictedDefaultExportName || exportsName} as default`);
  } else {
    exportDeclarations.push(
      `export default /*@__PURE__*/${HELPERS_NAME}.getDefaultExportFromCjs(${exportsName});`
    );
  }
}
function isRequireExpression(node, scope) {
  if (!node)
    return false;
  if (node.type !== "CallExpression")
    return false;
  if (node.arguments.length === 0)
    return false;
  return isRequire(node.callee, scope);
}
function isRequire(node, scope) {
  return node.type === "Identifier" && node.name === "require" && !scope.contains("require") || node.type === "MemberExpression" && isModuleRequire(node, scope);
}
function isModuleRequire({ object, property }, scope) {
  return object.type === "Identifier" && object.name === "module" && property.type === "Identifier" && property.name === "require" && !scope.contains("module");
}
function hasDynamicArguments(node) {
  return node.arguments.length > 1 || node.arguments[0].type !== "Literal" && (node.arguments[0].type !== "TemplateLiteral" || node.arguments[0].expressions.length > 0);
}
var reservedMethod = { resolve: true, cache: true, main: true };
function isNodeRequirePropertyAccess(parent) {
  return parent && parent.property && reservedMethod[parent.property.name];
}
function getRequireStringArg(node) {
  return node.arguments[0].type === "Literal" ? node.arguments[0].value : node.arguments[0].quasis[0].value.cooked;
}
function getRequireHandlers() {
  const requireExpressions = [];
  function addRequireExpression(sourceId, node, scope, usesReturnValue, isInsideTryBlock, isInsideConditional, toBeRemoved) {
    requireExpressions.push({
      sourceId,
      node,
      scope,
      usesReturnValue,
      isInsideTryBlock,
      isInsideConditional,
      toBeRemoved
    });
  }
  async function rewriteRequireExpressionsAndGetImportBlock(magicString, topLevelDeclarations, reassignedNames, helpersName, dynamicRequireName, moduleName, exportsName, id, exportMode, resolveRequireSourcesAndUpdateMeta, needsRequireWrapper, isEsModule, isDynamicRequireModulesEnabled, getIgnoreTryCatchRequireStatementMode, commonjsMeta) {
    const imports = [];
    imports.push(`import * as ${helpersName} from "${HELPERS_ID}";`);
    if (dynamicRequireName) {
      imports.push(
        `import { ${isDynamicRequireModulesEnabled ? CREATE_COMMONJS_REQUIRE_EXPORT : COMMONJS_REQUIRE_EXPORT} as ${dynamicRequireName} } from "${DYNAMIC_MODULES_ID}";`
      );
    }
    if (exportMode === "module") {
      imports.push(
        `import { __module as ${moduleName}, exports as ${exportsName} } from ${JSON.stringify(
          wrapId(id, MODULE_SUFFIX)
        )}`
      );
    } else if (exportMode === "exports") {
      imports.push(
        `import { __exports as ${exportsName} } from ${JSON.stringify(wrapId(id, EXPORTS_SUFFIX))}`
      );
    }
    const requiresBySource = collectSources(requireExpressions);
    const requireTargets = await resolveRequireSourcesAndUpdateMeta(
      id,
      needsRequireWrapper ? IS_WRAPPED_COMMONJS : !isEsModule,
      commonjsMeta,
      Object.keys(requiresBySource).map((source) => {
        return {
          source,
          isConditional: requiresBySource[source].every((require2) => require2.isInsideConditional)
        };
      })
    );
    processRequireExpressions(
      imports,
      requireTargets,
      requiresBySource,
      getIgnoreTryCatchRequireStatementMode,
      magicString
    );
    return imports.length ? `${imports.join("\n")}

` : "";
  }
  return {
    addRequireExpression,
    rewriteRequireExpressionsAndGetImportBlock
  };
}
function collectSources(requireExpressions) {
  const requiresBySource = /* @__PURE__ */ Object.create(null);
  for (const requireExpression of requireExpressions) {
    const { sourceId } = requireExpression;
    if (!requiresBySource[sourceId]) {
      requiresBySource[sourceId] = [];
    }
    const requires = requiresBySource[sourceId];
    requires.push(requireExpression);
  }
  return requiresBySource;
}
function processRequireExpressions(imports, requireTargets, requiresBySource, getIgnoreTryCatchRequireStatementMode, magicString) {
  const generateRequireName = getGenerateRequireName();
  for (const { source, id: resolvedId, isCommonJS } of requireTargets) {
    const requires = requiresBySource[source];
    const name = generateRequireName(requires);
    let usesRequired = false;
    let needsImport = false;
    for (const { node, usesReturnValue, toBeRemoved, isInsideTryBlock } of requires) {
      const { canConvertRequire, shouldRemoveRequire } = isInsideTryBlock && isWrappedId(resolvedId, EXTERNAL_SUFFIX) ? getIgnoreTryCatchRequireStatementMode(source) : { canConvertRequire: true, shouldRemoveRequire: false };
      if (shouldRemoveRequire) {
        if (usesReturnValue) {
          magicString.overwrite(node.start, node.end, "undefined");
        } else {
          magicString.remove(toBeRemoved.start, toBeRemoved.end);
        }
      } else if (canConvertRequire) {
        needsImport = true;
        if (isCommonJS === IS_WRAPPED_COMMONJS) {
          magicString.overwrite(node.start, node.end, `${name}()`);
        } else if (usesReturnValue) {
          usesRequired = true;
          magicString.overwrite(node.start, node.end, name);
        } else {
          magicString.remove(toBeRemoved.start, toBeRemoved.end);
        }
      }
    }
    if (needsImport) {
      if (isCommonJS === IS_WRAPPED_COMMONJS) {
        imports.push(`import { __require as ${name} } from ${JSON.stringify(resolvedId)};`);
      } else {
        imports.push(`import ${usesRequired ? `${name} from ` : ""}${JSON.stringify(resolvedId)};`);
      }
    }
  }
}
function getGenerateRequireName() {
  let uid = 0;
  return (requires) => {
    let name;
    const hasNameConflict = ({ scope }) => scope.contains(name);
    do {
      name = `require$$${uid}`;
      uid += 1;
    } while (requires.some(hasNameConflict));
    return name;
  };
}
var exportsPattern = /^(?:module\.)?exports(?:\.([a-zA-Z_$][a-zA-Z_$0-9]*))?$/;
var functionType = /^(?:FunctionDeclaration|FunctionExpression|ArrowFunctionExpression)$/;
async function transformCommonjs(parse3, code, id, isEsModule, ignoreGlobal, ignoreRequire, ignoreDynamicRequires, getIgnoreTryCatchRequireStatementMode, sourceMap, isDynamicRequireModulesEnabled, dynamicRequireModules, commonDir, astCache, defaultIsModuleExports, needsRequireWrapper, resolveRequireSourcesAndUpdateMeta, isRequired, checkDynamicRequire, commonjsMeta) {
  const ast = astCache || tryParse(parse3, code, id);
  const magicString = new MagicString(code);
  const uses = {
    module: false,
    exports: false,
    global: false,
    require: false
  };
  const virtualDynamicRequirePath = isDynamicRequireModulesEnabled && getVirtualPathForDynamicRequirePath(dirname2(id), commonDir);
  let scope = attachScopes(ast, "scope");
  let lexicalDepth = 0;
  let programDepth = 0;
  let currentTryBlockEnd = null;
  let shouldWrap = false;
  let reexports = false;
  const globals = /* @__PURE__ */ new Set();
  let currentConditionalNodeEnd = null;
  const conditionalNodes = /* @__PURE__ */ new Set();
  const { addRequireExpression, rewriteRequireExpressionsAndGetImportBlock } = getRequireHandlers();
  const reassignedNames = /* @__PURE__ */ new Set();
  const topLevelDeclarations = [];
  const skippedNodes = /* @__PURE__ */ new Set();
  const moduleAccessScopes = /* @__PURE__ */ new Set([scope]);
  const exportsAccessScopes = /* @__PURE__ */ new Set([scope]);
  const moduleExportsAssignments = [];
  let firstTopLevelModuleExportsAssignment = null;
  const exportsAssignmentsByName = /* @__PURE__ */ new Map();
  const topLevelAssignments = /* @__PURE__ */ new Set();
  const topLevelDefineCompiledEsmExpressions = [];
  const replacedGlobal = [];
  const replacedDynamicRequires = [];
  const importedVariables = /* @__PURE__ */ new Set();
  const indentExclusionRanges = [];
  walk(ast, {
    enter(node, parent) {
      if (skippedNodes.has(node)) {
        this.skip();
        return;
      }
      if (currentTryBlockEnd !== null && node.start > currentTryBlockEnd) {
        currentTryBlockEnd = null;
      }
      if (currentConditionalNodeEnd !== null && node.start > currentConditionalNodeEnd) {
        currentConditionalNodeEnd = null;
      }
      if (currentConditionalNodeEnd === null && conditionalNodes.has(node)) {
        currentConditionalNodeEnd = node.end;
      }
      programDepth += 1;
      if (node.scope)
        ({ scope } = node);
      if (functionType.test(node.type))
        lexicalDepth += 1;
      if (sourceMap) {
        magicString.addSourcemapLocation(node.start);
        magicString.addSourcemapLocation(node.end);
      }
      switch (node.type) {
        case "AssignmentExpression":
          if (node.left.type === "MemberExpression") {
            const flattened = getKeypath(node.left);
            if (!flattened || scope.contains(flattened.name))
              return;
            const exportsPatternMatch = exportsPattern.exec(flattened.keypath);
            if (!exportsPatternMatch || flattened.keypath === "exports")
              return;
            const [, exportName] = exportsPatternMatch;
            uses[flattened.name] = true;
            if (flattened.keypath === "module.exports") {
              moduleExportsAssignments.push(node);
              if (programDepth > 3) {
                moduleAccessScopes.add(scope);
              } else if (!firstTopLevelModuleExportsAssignment) {
                firstTopLevelModuleExportsAssignment = node;
              }
              if (defaultIsModuleExports === false) {
                shouldWrap = true;
              } else if (defaultIsModuleExports === "auto") {
                if (node.right.type === "ObjectExpression") {
                  if (hasDefineEsmProperty(node.right)) {
                    shouldWrap = true;
                  }
                } else if (isRequireExpression(node.right, scope)) {
                  shouldWrap = true;
                  reexports = true;
                }
              }
            } else if (exportName === KEY_COMPILED_ESM) {
              if (programDepth > 3) {
                shouldWrap = true;
              } else {
                topLevelDefineCompiledEsmExpressions.push(node);
              }
            } else {
              const exportsAssignments = exportsAssignmentsByName.get(exportName) || {
                nodes: [],
                scopes: /* @__PURE__ */ new Set()
              };
              exportsAssignments.nodes.push(node);
              exportsAssignments.scopes.add(scope);
              exportsAccessScopes.add(scope);
              exportsAssignmentsByName.set(exportName, exportsAssignments);
              if (programDepth <= 3) {
                topLevelAssignments.add(node);
              }
            }
            skippedNodes.add(node.left);
          } else {
            for (const name of extractAssignedNames(node.left)) {
              reassignedNames.add(name);
            }
          }
          return;
        case "CallExpression": {
          if (isDefineCompiledEsm(node)) {
            if (programDepth === 3 && parent.type === "ExpressionStatement") {
              skippedNodes.add(node.arguments[0]);
              topLevelDefineCompiledEsmExpressions.push(node);
            } else {
              shouldWrap = true;
            }
            return;
          }
          if (isDynamicRequireModulesEnabled && node.callee.object && isRequire(node.callee.object, scope) && node.callee.property.name === "resolve") {
            checkDynamicRequire(node.start);
            uses.require = true;
            const requireNode = node.callee.object;
            replacedDynamicRequires.push(requireNode);
            return;
          }
          if (!isRequireExpression(node, scope)) {
            const keypath = getKeypath(node.callee);
            if (keypath && importedVariables.has(keypath.name)) {
              currentConditionalNodeEnd = Infinity;
            }
            return;
          }
          skippedNodes.add(node.callee);
          uses.require = true;
          if (hasDynamicArguments(node)) {
            if (isDynamicRequireModulesEnabled) {
              checkDynamicRequire(node.start);
            }
            if (!ignoreDynamicRequires) {
              replacedDynamicRequires.push(node.callee);
            }
            return;
          }
          const requireStringArg = getRequireStringArg(node);
          if (!ignoreRequire(requireStringArg)) {
            const usesReturnValue = parent.type !== "ExpressionStatement";
            const toBeRemoved = parent.type === "ExpressionStatement" && (!currentConditionalNodeEnd || currentTryBlockEnd !== null && currentTryBlockEnd < currentConditionalNodeEnd) ? parent : node;
            addRequireExpression(
              requireStringArg,
              node,
              scope,
              usesReturnValue,
              currentTryBlockEnd !== null,
              currentConditionalNodeEnd !== null,
              toBeRemoved
            );
            if (parent.type === "VariableDeclarator" && parent.id.type === "Identifier") {
              for (const name of extractAssignedNames(parent.id)) {
                importedVariables.add(name);
              }
            }
          }
          return;
        }
        case "ConditionalExpression":
        case "IfStatement":
          if (isFalsy(node.test)) {
            skippedNodes.add(node.consequent);
          } else if (isTruthy(node.test)) {
            if (node.alternate) {
              skippedNodes.add(node.alternate);
            }
          } else {
            conditionalNodes.add(node.consequent);
            if (node.alternate) {
              conditionalNodes.add(node.alternate);
            }
          }
          return;
        case "ArrowFunctionExpression":
        case "FunctionDeclaration":
        case "FunctionExpression":
          if (currentConditionalNodeEnd === null && !(parent.type === "CallExpression" && parent.callee === node)) {
            currentConditionalNodeEnd = node.end;
          }
          return;
        case "Identifier": {
          const { name } = node;
          if (!is_reference_es_default(node, parent) || scope.contains(name))
            return;
          switch (name) {
            case "require":
              uses.require = true;
              if (isNodeRequirePropertyAccess(parent)) {
                return;
              }
              if (!ignoreDynamicRequires) {
                if (isShorthandProperty(parent)) {
                  magicString.prependRight(node.start, "require: ");
                }
                replacedDynamicRequires.push(node);
              }
              return;
            case "module":
            case "exports":
              shouldWrap = true;
              uses[name] = true;
              return;
            case "global":
              uses.global = true;
              if (!ignoreGlobal) {
                replacedGlobal.push(node);
              }
              return;
            case "define":
              magicString.overwrite(node.start, node.end, "undefined", {
                storeName: true
              });
              return;
            default:
              globals.add(name);
              return;
          }
        }
        case "LogicalExpression":
          if (node.operator === "&&") {
            if (isFalsy(node.left)) {
              skippedNodes.add(node.right);
            } else if (!isTruthy(node.left)) {
              conditionalNodes.add(node.right);
            }
          } else if (node.operator === "||") {
            if (isTruthy(node.left)) {
              skippedNodes.add(node.right);
            } else if (!isFalsy(node.left)) {
              conditionalNodes.add(node.right);
            }
          }
          return;
        case "MemberExpression":
          if (!isDynamicRequireModulesEnabled && isModuleRequire(node, scope)) {
            uses.require = true;
            replacedDynamicRequires.push(node);
            skippedNodes.add(node.object);
            skippedNodes.add(node.property);
          }
          return;
        case "ReturnStatement":
          if (lexicalDepth === 0) {
            shouldWrap = true;
          }
          return;
        case "ThisExpression":
          if (lexicalDepth === 0) {
            uses.global = true;
            if (!ignoreGlobal) {
              replacedGlobal.push(node);
            }
          }
          return;
        case "TryStatement":
          if (currentTryBlockEnd === null) {
            currentTryBlockEnd = node.block.end;
          }
          if (currentConditionalNodeEnd === null) {
            currentConditionalNodeEnd = node.end;
          }
          return;
        case "UnaryExpression":
          if (node.operator === "typeof") {
            const flattened = getKeypath(node.argument);
            if (!flattened)
              return;
            if (scope.contains(flattened.name))
              return;
            if (!isEsModule && (flattened.keypath === "module.exports" || flattened.keypath === "module" || flattened.keypath === "exports")) {
              magicString.overwrite(node.start, node.end, `'object'`, {
                storeName: false
              });
            }
          }
          return;
        case "VariableDeclaration":
          if (!scope.parent) {
            topLevelDeclarations.push(node);
          }
          return;
        case "TemplateElement":
          if (node.value.raw.includes("\n")) {
            indentExclusionRanges.push([node.start, node.end]);
          }
      }
    },
    leave(node) {
      programDepth -= 1;
      if (node.scope)
        scope = scope.parent;
      if (functionType.test(node.type))
        lexicalDepth -= 1;
    }
  });
  const nameBase = getName2(id);
  const exportsName = deconflict([...exportsAccessScopes], globals, nameBase);
  const moduleName = deconflict([...moduleAccessScopes], globals, `${nameBase}Module`);
  const requireName = deconflict([scope], globals, `require${capitalize(nameBase)}`);
  const isRequiredName = deconflict([scope], globals, `hasRequired${capitalize(nameBase)}`);
  const helpersName = deconflict([scope], globals, "commonjsHelpers");
  const dynamicRequireName = replacedDynamicRequires.length > 0 && deconflict(
    [scope],
    globals,
    isDynamicRequireModulesEnabled ? CREATE_COMMONJS_REQUIRE_EXPORT : COMMONJS_REQUIRE_EXPORT
  );
  const deconflictedExportNames = /* @__PURE__ */ Object.create(null);
  for (const [exportName, { scopes }] of exportsAssignmentsByName) {
    deconflictedExportNames[exportName] = deconflict([...scopes], globals, exportName);
  }
  for (const node of replacedGlobal) {
    magicString.overwrite(node.start, node.end, `${helpersName}.commonjsGlobal`, {
      storeName: true
    });
  }
  for (const node of replacedDynamicRequires) {
    magicString.overwrite(
      node.start,
      node.end,
      isDynamicRequireModulesEnabled ? `${dynamicRequireName}(${JSON.stringify(virtualDynamicRequirePath)})` : dynamicRequireName,
      {
        contentOnly: true,
        storeName: true
      }
    );
  }
  shouldWrap = !isEsModule && (shouldWrap || uses.exports && moduleExportsAssignments.length > 0);
  const detectWrappedDefault = shouldWrap && (reexports || topLevelDefineCompiledEsmExpressions.length > 0 || code.indexOf("__esModule") >= 0);
  if (!(shouldWrap || isRequired || needsRequireWrapper || uses.module || uses.exports || uses.require || topLevelDefineCompiledEsmExpressions.length > 0) && (ignoreGlobal || !uses.global)) {
    return { meta: { commonjs: { isCommonJS: false } } };
  }
  let leadingComment = "";
  if (code.startsWith("/*")) {
    const commentEnd = code.indexOf("*/", 2) + 2;
    leadingComment = `${code.slice(0, commentEnd)}
`;
    magicString.remove(0, commentEnd).trim();
  }
  const exportMode = isEsModule ? "none" : shouldWrap ? uses.module ? "module" : "exports" : firstTopLevelModuleExportsAssignment ? exportsAssignmentsByName.size === 0 && topLevelDefineCompiledEsmExpressions.length === 0 ? "replace" : "module" : moduleExportsAssignments.length === 0 ? "exports" : "module";
  const importBlock = await rewriteRequireExpressionsAndGetImportBlock(
    magicString,
    topLevelDeclarations,
    reassignedNames,
    helpersName,
    dynamicRequireName,
    moduleName,
    exportsName,
    id,
    exportMode,
    resolveRequireSourcesAndUpdateMeta,
    needsRequireWrapper,
    isEsModule,
    isDynamicRequireModulesEnabled,
    getIgnoreTryCatchRequireStatementMode,
    commonjsMeta
  );
  const usesRequireWrapper = commonjsMeta.isCommonJS === IS_WRAPPED_COMMONJS;
  const exportBlock = isEsModule ? "" : rewriteExportsAndGetExportsBlock(
    magicString,
    moduleName,
    exportsName,
    shouldWrap,
    moduleExportsAssignments,
    firstTopLevelModuleExportsAssignment,
    exportsAssignmentsByName,
    topLevelAssignments,
    topLevelDefineCompiledEsmExpressions,
    deconflictedExportNames,
    code,
    helpersName,
    exportMode,
    detectWrappedDefault,
    defaultIsModuleExports,
    usesRequireWrapper,
    requireName
  );
  if (shouldWrap) {
    wrapCode(magicString, uses, moduleName, exportsName, indentExclusionRanges);
  }
  if (usesRequireWrapper) {
    magicString.trim().indent("	", {
      exclude: indentExclusionRanges
    });
    magicString.prepend(
      `var ${isRequiredName};

function ${requireName} () {
	if (${isRequiredName}) return ${exportsName};
	${isRequiredName} = 1;
`
    ).append(`
	return ${exportsName};
}`);
    if (exportMode === "replace") {
      magicString.prepend(`var ${exportsName};
`);
    }
  }
  magicString.trim().prepend(leadingComment + importBlock).append(exportBlock);
  return {
    code: magicString.toString(),
    map: sourceMap ? magicString.generateMap() : null,
    syntheticNamedExports: isEsModule || usesRequireWrapper ? false : "__moduleExports",
    meta: { commonjs: commonjsMeta }
  };
}
var PLUGIN_NAME = "commonjs";
function commonjs(options = {}) {
  const {
    ignoreGlobal,
    ignoreDynamicRequires,
    requireReturnsDefault: requireReturnsDefaultOption,
    defaultIsModuleExports: defaultIsModuleExportsOption,
    esmExternals
  } = options;
  const extensions = options.extensions || [".js"];
  const filter2 = createFilter(options.include, options.exclude);
  const isPossibleCjsId = (id) => {
    const extName = extname2(id);
    return extName === ".cjs" || extensions.includes(extName) && filter2(id);
  };
  const { strictRequiresFilter, detectCyclesAndConditional } = getStrictRequiresFilter(options);
  const getRequireReturnsDefault = typeof requireReturnsDefaultOption === "function" ? requireReturnsDefaultOption : () => requireReturnsDefaultOption;
  let esmExternalIds;
  const isEsmExternal = typeof esmExternals === "function" ? esmExternals : Array.isArray(esmExternals) ? (esmExternalIds = new Set(esmExternals), (id) => esmExternalIds.has(id)) : () => esmExternals;
  const getDefaultIsModuleExports = typeof defaultIsModuleExportsOption === "function" ? defaultIsModuleExportsOption : () => typeof defaultIsModuleExportsOption === "boolean" ? defaultIsModuleExportsOption : "auto";
  const dynamicRequireRoot = typeof options.dynamicRequireRoot === "string" ? resolve2(options.dynamicRequireRoot) : process.cwd();
  const { commonDir, dynamicRequireModules } = getDynamicRequireModules(
    options.dynamicRequireTargets,
    dynamicRequireRoot
  );
  const isDynamicRequireModulesEnabled = dynamicRequireModules.size > 0;
  const ignoreRequire = typeof options.ignore === "function" ? options.ignore : Array.isArray(options.ignore) ? (id) => options.ignore.includes(id) : () => false;
  const getIgnoreTryCatchRequireStatementMode = (id) => {
    const mode = typeof options.ignoreTryCatch === "function" ? options.ignoreTryCatch(id) : Array.isArray(options.ignoreTryCatch) ? options.ignoreTryCatch.includes(id) : typeof options.ignoreTryCatch !== "undefined" ? options.ignoreTryCatch : true;
    return {
      canConvertRequire: mode !== "remove" && mode !== true,
      shouldRemoveRequire: mode === "remove"
    };
  };
  const { currentlyResolving, resolveId } = getResolveId(extensions, isPossibleCjsId);
  const sourceMap = options.sourceMap !== false;
  let requireResolver;
  function transformAndCheckExports(code, id) {
    const { isEsModule, hasDefaultExport, hasNamedExports, ast } = analyzeTopLevelStatements(
      this.parse,
      code,
      id
    );
    const commonjsMeta = this.getModuleInfo(id).meta.commonjs || {};
    if (hasDefaultExport) {
      commonjsMeta.hasDefaultExport = true;
    }
    if (hasNamedExports) {
      commonjsMeta.hasNamedExports = true;
    }
    if (!dynamicRequireModules.has(normalizePathSlashes(id)) && (!(hasCjsKeywords(code, ignoreGlobal) || requireResolver.isRequiredId(id)) || isEsModule && !options.transformMixedEsModules)) {
      commonjsMeta.isCommonJS = false;
      return { meta: { commonjs: commonjsMeta } };
    }
    const needsRequireWrapper = !isEsModule && (dynamicRequireModules.has(normalizePathSlashes(id)) || strictRequiresFilter(id));
    const checkDynamicRequire = (position) => {
      if (id.indexOf(dynamicRequireRoot) !== 0) {
        this.error(
          {
            code: "DYNAMIC_REQUIRE_OUTSIDE_ROOT",
            id,
            dynamicRequireRoot,
            message: `"${id}" contains dynamic require statements but it is not within the current dynamicRequireRoot "${dynamicRequireRoot}". You should set dynamicRequireRoot to "${dirname2(
              id
            )}" or one of its parent directories.`
          },
          position
        );
      }
    };
    return transformCommonjs(
      this.parse,
      code,
      id,
      isEsModule,
      ignoreGlobal || isEsModule,
      ignoreRequire,
      ignoreDynamicRequires && !isDynamicRequireModulesEnabled,
      getIgnoreTryCatchRequireStatementMode,
      sourceMap,
      isDynamicRequireModulesEnabled,
      dynamicRequireModules,
      commonDir,
      ast,
      getDefaultIsModuleExports(id),
      needsRequireWrapper,
      requireResolver.resolveRequireSourcesAndUpdateMeta(this),
      requireResolver.isRequiredId(id),
      checkDynamicRequire,
      commonjsMeta
    );
  }
  return {
    name: PLUGIN_NAME,
    version: version3,
    options(rawOptions) {
      const plugins = Array.isArray(rawOptions.plugins) ? [...rawOptions.plugins] : rawOptions.plugins ? [rawOptions.plugins] : [];
      plugins.unshift({
        name: "commonjs--resolver",
        resolveId
      });
      return { ...rawOptions, plugins };
    },
    buildStart({ plugins }) {
      validateVersion2(this.meta.rollupVersion, peerDependencies2.rollup, "rollup");
      const nodeResolve2 = plugins.find(({ name }) => name === "node-resolve");
      if (nodeResolve2) {
        validateVersion2(nodeResolve2.version, "^13.0.6", "@rollup/plugin-node-resolve");
      }
      if (options.namedExports != null) {
        this.warn(
          'The namedExports option from "@rollup/plugin-commonjs" is deprecated. Named exports are now handled automatically.'
        );
      }
      requireResolver = getRequireResolver(
        extensions,
        detectCyclesAndConditional,
        currentlyResolving
      );
    },
    buildEnd() {
      if (options.strictRequires === "debug") {
        const wrappedIds = requireResolver.getWrappedIds();
        if (wrappedIds.length) {
          this.warn({
            code: "WRAPPED_IDS",
            ids: wrappedIds,
            message: `The commonjs plugin automatically wrapped the following files:
[
${wrappedIds.map((id) => `	${JSON.stringify(relative2(process.cwd(), id))}`).join(",\n")}
]`
          });
        } else {
          this.warn({
            code: "WRAPPED_IDS",
            ids: wrappedIds,
            message: "The commonjs plugin did not wrap any files."
          });
        }
      }
    },
    load(id) {
      if (id === HELPERS_ID) {
        return getHelpersModule();
      }
      if (isWrappedId(id, MODULE_SUFFIX)) {
        const module2 = getName2(unwrapId(id, MODULE_SUFFIX));
        const moduleExports = `${module2}Exports`;
        return {
          code: `var ${moduleExports} = {};
var ${module2} = {
  get exports(){ return ${moduleExports}; },
  set exports(v){ ${moduleExports} = v; },
};
export {${module2} as __module, ${moduleExports} as exports}`,
          meta: { commonjs: { isCommonJS: false } }
        };
      }
      if (isWrappedId(id, EXPORTS_SUFFIX)) {
        const name = getName2(unwrapId(id, EXPORTS_SUFFIX));
        return {
          code: `var ${name} = {}; export {${name} as __exports}`,
          meta: { commonjs: { isCommonJS: false } }
        };
      }
      if (isWrappedId(id, EXTERNAL_SUFFIX)) {
        const actualId = unwrapId(id, EXTERNAL_SUFFIX);
        return getUnknownRequireProxy(
          actualId,
          isEsmExternal(actualId) ? getRequireReturnsDefault(actualId) : true
        );
      }
      if (id.endsWith(ENTRY_SUFFIX)) {
        const acutalId = id.slice(0, -ENTRY_SUFFIX.length);
        return getEntryProxy(acutalId, getDefaultIsModuleExports(acutalId), this.getModuleInfo);
      }
      if (isWrappedId(id, ES_IMPORT_SUFFIX)) {
        const actualId = unwrapId(id, ES_IMPORT_SUFFIX);
        return getEsImportProxy(actualId, getDefaultIsModuleExports(actualId));
      }
      if (id === DYNAMIC_MODULES_ID) {
        return getDynamicModuleRegistry(
          isDynamicRequireModulesEnabled,
          dynamicRequireModules,
          commonDir,
          ignoreDynamicRequires
        );
      }
      if (isWrappedId(id, PROXY_SUFFIX)) {
        const actualId = unwrapId(id, PROXY_SUFFIX);
        return getStaticRequireProxy(actualId, getRequireReturnsDefault(actualId), this.load);
      }
      return null;
    },
    shouldTransformCachedModule(...args) {
      return requireResolver.shouldTransformCachedModule.call(this, ...args);
    },
    transform(code, id) {
      if (!isPossibleCjsId(id))
        return null;
      try {
        return transformAndCheckExports.call(this, code, id);
      } catch (err) {
        return this.error(err, err.loc);
      }
    }
  };
}

// src/entryPoint.js
init_fs();
init_path2();
async function bundle(input) {
  const dependencies = /* @__PURE__ */ new Set();
  const bundle2 = await lh({
    input,
    treeshake: true,
    external: [
      "lodash-4.17",
      "@unity-services/cloud-save-1.2",
      "@unity-services/economy-2.3",
      "@unity-services/remote-config-1.1",
      "@unity-services/vivox-0.1",
      "@unity-services/lobby-1.2"
    ],
    plugins: [
      nodeResolve({ browser: false }),
      commonjs(),
      {
        resolveId: function(id, importer) {
          if (!!importer && path_default2.isAbsolute(id)) {
            if (fs_default.existsSync(id)) {
              dependencies.add(id);
            }
          }
          return void 0;
        }
      },
      {
        load: function(id) {
          return fs_default.readFileSync(id).toString();
        }
      }
    ]
  });
  try {
    const { output } = await bundle2.generate({
      format: "cjs",
      exports: "auto"
    });
    return {
      source: output[0].code,
      dependencies: Array.from(dependencies)
    };
  } catch (e) {
    const enc = new TextEncoder();
    process.stderr.write(enc.encode(e.toString()), () => {
      process.exit(1);
    });
  }
}

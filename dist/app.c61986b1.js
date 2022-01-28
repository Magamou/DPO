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
})({"Classes/plat.resistant.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlatAvecOption = exports.PlatDeResistance = void 0;

var PlatDeResistance =
/** @class */
function () {
  function PlatDeResistance() {}

  PlatDeResistance.prototype.prix = function () {
    return 5000;
  };

  return PlatDeResistance;
}();

exports.PlatDeResistance = PlatDeResistance;

var PlatAvecOption =
/** @class */
function () {
  function PlatAvecOption(_plat) {
    this.plat = _plat;
  }

  PlatAvecOption.prototype.prix = function () {
    return this.plat.prix();
  };

  return PlatAvecOption;
}();

exports.PlatAvecOption = PlatAvecOption;
},{}],"Classes/option.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Livraison = exports.Cafe = exports.The = exports.Boisson = exports.Dessert = exports.Entree = void 0;

var plat_resistant_1 = require("./plat.resistant");

var Entree =
/** @class */
function (_super) {
  __extends(Entree, _super);

  function Entree() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Entree.prototype.prix = function () {
    return _super.prototype.prix.call(this) + 2000;
  };

  return Entree;
}(plat_resistant_1.PlatAvecOption);

exports.Entree = Entree;

var Dessert =
/** @class */
function (_super) {
  __extends(Dessert, _super);

  function Dessert() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Dessert.prototype.prix = function () {
    return _super.prototype.prix.call(this) + 1500;
  };

  return Dessert;
}(plat_resistant_1.PlatAvecOption);

exports.Dessert = Dessert;

var Boisson =
/** @class */
function (_super) {
  __extends(Boisson, _super);

  function Boisson() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Boisson.prototype.prix = function () {
    return _super.prototype.prix.call(this) + 1000;
  };

  return Boisson;
}(plat_resistant_1.PlatAvecOption);

exports.Boisson = Boisson;

var The =
/** @class */
function (_super) {
  __extends(The, _super);

  function The() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  The.prototype.prix = function () {
    return _super.prototype.prix.call(this) + 700;
  };

  return The;
}(plat_resistant_1.PlatAvecOption);

exports.The = The;

var Cafe =
/** @class */
function (_super) {
  __extends(Cafe, _super);

  function Cafe() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Cafe.prototype.prix = function () {
    return _super.prototype.prix.call(this) + 350;
  };

  return Cafe;
}(plat_resistant_1.PlatAvecOption);

exports.Cafe = Cafe;

var Livraison =
/** @class */
function (_super) {
  __extends(Livraison, _super);

  function Livraison() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Livraison.prototype.prix = function () {
    return _super.prototype.prix.call(this) + 1000;
  };

  return Livraison;
}(plat_resistant_1.PlatAvecOption);

exports.Livraison = Livraison;
},{"./plat.resistant":"Classes/plat.resistant.ts"}],"app.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var option_1 = require("./Classes/option");

var plat_resistant_1 = require("./Classes/plat.resistant"); //declaration


var choix = [];
var option = [];
var menu = document.querySelector("#menu");
var arr = Array.from(menu.querySelectorAll("input"));
var platSimple = new plat_resistant_1.PlatDeResistance();
var table = document.querySelector("table");
var tbody = table.querySelector("tbody");
var tfoot = table.querySelector("tfoot");
var total = 0;
choix.push(platSimple);
console.log("Plat de resistance: ".concat(platSimple.prix()));
renderPrice(platSimple.prix());
document.querySelector("#add").addEventListener("click", function (e) {
  if (menu.className === "open") {
    menu.className = "close";
  } else {
    menu.className = "open";
    table.className = "close";
  }
});
arr.forEach(function (e) {
  e.addEventListener("click", function (event) {
    if (e.checked) {
      option.push(e.name); // platSimple=getPlat(platSimple, e.name);
      // console.log("price", platSimple.prix());
    } else {
      option = option.filter(function (opt) {
        return opt !== e.name;
      });
    }

    total = decoration(option, platSimple);
  });
});
document.querySelector("#send").addEventListener("click", function (e) {
  tbody.innerHTML = "";
  tfoot.innerHTML = "";
  menu.className = "close";
  tbody.insertAdjacentHTML("beforeend", "\n        <tr> <td>Plat principal</td> <td>5000</td> </tr>\n        ");
  option.forEach(function (e) {
    // let _input=document.querySelector("#"+e) as HTMLInputElement
    // console.log(_input.value);
    // console.log(e, " ", (<HTMLInputElement>document.querySelector("#"+e)).value)
    tbody.insertAdjacentHTML("beforeend", "\n        <tr> <td>".concat(e, "</td> <td>").concat(document.querySelector("#" + e).value, "</td> </tr>\n        "));
  }); // console.log(`total des achats ${total}`);

  tfoot.insertAdjacentHTML("beforeend", "\n        <tr> <td>total</td> <td>".concat(total, "</td> </tr>\n        "));
  table.className = "open";
}); //////////////functions

function renderPrice(price) {
  document.querySelector("#price").innerHTML = price.toString();
}

function getPlat(plat, decoration) {
  switch (decoration) {
    case "entree":
      return new option_1.Entree(plat);

    case "dessert":
      return new option_1.Dessert(plat);

    case "boisson":
      return new option_1.Boisson(plat);

    case "the":
      return new option_1.The(plat);

    case "cafe":
      return new option_1.Cafe(plat);

    case "livraison":
      return new option_1.Livraison(plat);
  }
}

function decoration(arr, plat) {
  // let p:IPlat=new PlatDeResistance();
  arr.forEach(function (elem) {
    plat = getPlat(plat, elem);
  }); // console.log(plat.prix());

  renderPrice(plat.prix());
  return plat.prix();
}
},{"./Classes/option":"Classes/option.ts","./Classes/plat.resistant":"Classes/plat.resistant.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61105" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.ts"], null)
//# sourceMappingURL=/app.c61986b1.js.map
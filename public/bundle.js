
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global_1 =
	  // eslint-disable-next-line no-undef
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func
	  Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;

	var objectPropertyIsEnumerable = {
		f: f
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;

	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var split = ''.split;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings



	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// `ToPrimitive` abstract operation
	// https://tc39.github.io/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var toPrimitive = function (input, PREFERRED_STRING) {
	  if (!isObject(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document$1 = global_1.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject(document$1) && isObject(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor = {
		f: f$1
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	var nativeDefineProperty = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty
	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var objectDefineProperty = {
		f: f$2
	};

	var createNonEnumerableProperty = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var setGlobal = function (key, value) {
	  try {
	    createNonEnumerableProperty(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  } return value;
	};

	var SHARED = '__core-js_shared__';
	var store = global_1[SHARED] || setGlobal(SHARED, {});

	var sharedStore = store;

	var functionToString = Function.toString;

	// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
	if (typeof sharedStore.inspectSource != 'function') {
	  sharedStore.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	var inspectSource = sharedStore.inspectSource;

	var WeakMap = global_1.WeakMap;

	var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

	var shared = createCommonjsModule(function (module) {
	(module.exports = function (key, value) {
	  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.6.5',
	  mode:  'global',
	  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var keys = shared('keys');

	var sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys = {};

	var WeakMap$1 = global_1.WeakMap;
	var set, get, has$1;

	var enforce = function (it) {
	  return has$1(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (nativeWeakMap) {
	  var store$1 = new WeakMap$1();
	  var wmget = store$1.get;
	  var wmhas = store$1.has;
	  var wmset = store$1.set;
	  set = function (it, metadata) {
	    wmset.call(store$1, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget.call(store$1, it) || {};
	  };
	  has$1 = function (it) {
	    return wmhas.call(store$1, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;
	  set = function (it, metadata) {
	    createNonEnumerableProperty(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return has(it, STATE) ? it[STATE] : {};
	  };
	  has$1 = function (it) {
	    return has(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has$1,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var redefine = createCommonjsModule(function (module) {
	var getInternalState = internalState.get;
	var enforceInternalState = internalState.enforce;
	var TEMPLATE = String(String).split('String');

	(module.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  if (typeof value == 'function') {
	    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
	    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
	  }
	  if (O === global_1) {
	    if (simple) O[key] = value;
	    else setGlobal(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }
	  if (simple) O[key] = value;
	  else createNonEnumerableProperty(O, key, value);
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, 'toString', function toString() {
	  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
	});
	});

	var path = global_1;

	var aFunction = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
	    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
	};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `ToInteger` abstract operation
	// https://tc39.github.io/ecma262/#sec-tointeger
	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.github.io/ecma262/#sec-tolength
	var toLength = function (argument) {
	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};

	var indexOf = arrayIncludes.indexOf;


	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys$1);
	};

	var objectGetOwnPropertyNames = {
		f: f$3
	};

	var f$4 = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols = {
		f: f$4
	};

	// all object keys, includes non-enumerable and symbols
	var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var copyConstructorProperties = function (target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = objectDefineProperty.f;
	  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : typeof detection == 'function' ? fails(detection)
	    : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';

	var isForced_1 = isForced;

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global_1;
	  } else if (STATIC) {
	    target = global_1[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global_1[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty === typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty(sourceProperty, 'sham', true);
	    }
	    // extend global
	    redefine(target, key, sourceProperty, options);
	  }
	};

	var aFunction$1 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	// optional / simple context binding
	var functionBindContext = function (fn, that, length) {
	  aFunction$1(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 0: return function () {
	      return fn.call(that);
	    };
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	// `ToObject` abstract operation
	// https://tc39.github.io/ecma262/#sec-toobject
	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	// `IsArray` abstract operation
	// https://tc39.github.io/ecma262/#sec-isarray
	var isArray = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  // Chrome 38 Symbol has incorrect toString conversion
	  // eslint-disable-next-line no-undef
	  return !String(Symbol());
	});

	var useSymbolAsUid = nativeSymbol
	  // eslint-disable-next-line no-undef
	  && !Symbol.sham
	  // eslint-disable-next-line no-undef
	  && typeof Symbol.iterator == 'symbol';

	var WellKnownSymbolsStore = shared('wks');
	var Symbol$1 = global_1.Symbol;
	var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

	var wellKnownSymbol = function (name) {
	  if (!has(WellKnownSymbolsStore, name)) {
	    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
	    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore[name];
	};

	var SPECIES = wellKnownSymbol('species');

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate = function (originalArray, length) {
	  var C;
	  if (isArray(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    else if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var push = [].push;

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
	var createMethod$1 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = indexedObject(O);
	    var boundFunction = functionBindContext(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push.call(target, value); // filter
	        } else if (IS_EVERY) return false;  // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$1(0),
	  // `Array.prototype.map` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.map
	  map: createMethod$1(1),
	  // `Array.prototype.filter` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
	  filter: createMethod$1(2),
	  // `Array.prototype.some` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.some
	  some: createMethod$1(3),
	  // `Array.prototype.every` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.every
	  every: createMethod$1(4),
	  // `Array.prototype.find` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.find
	  find: createMethod$1(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$1(6)
	};

	var arrayMethodIsStrict = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	var defineProperty = Object.defineProperty;
	var cache = {};

	var thrower = function (it) { throw it; };

	var arrayMethodUsesToLength = function (METHOD_NAME, options) {
	  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
	  if (!options) options = {};
	  var method = [][METHOD_NAME];
	  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
	  var argument0 = has(options, 0) ? options[0] : thrower;
	  var argument1 = has(options, 1) ? options[1] : undefined;

	  return cache[METHOD_NAME] = !!method && !fails(function () {
	    if (ACCESSORS && !descriptors) return true;
	    var O = { length: -1 };

	    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
	    else O[1] = 1;

	    method.call(O, argument0, argument1);
	  });
	};

	var $forEach = arrayIteration.forEach;



	var STRICT_METHOD = arrayMethodIsStrict('forEach');
	var USES_TO_LENGTH = arrayMethodUsesToLength('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	var arrayForEach = (!STRICT_METHOD || !USES_TO_LENGTH) ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	} : [].forEach;

	// `Array.prototype.forEach` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	_export({ target: 'Array', proto: true, forced: [].forEach != arrayForEach }, {
	  forEach: arrayForEach
	});

	var $indexOf = arrayIncludes.indexOf;



	var nativeIndexOf = [].indexOf;

	var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
	var STRICT_METHOD$1 = arrayMethodIsStrict('indexOf');
	var USES_TO_LENGTH$1 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

	// `Array.prototype.indexOf` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	_export({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD$1 || !USES_TO_LENGTH$1 }, {
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? nativeIndexOf.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var createProperty = function (object, key, value) {
	  var propertyKey = toPrimitive(key);
	  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
	  else object[propertyKey] = value;
	};

	var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

	var process = global_1.process;
	var versions = process && process.versions;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  version = match[0] + match[1];
	} else if (engineUserAgent) {
	  match = engineUserAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = engineUserAgent.match(/Chrome\/(\d+)/);
	    if (match) version = match[1];
	  }
	}

	var engineV8Version = version && +version;

	var SPECIES$1 = wellKnownSymbol('species');

	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return engineV8Version >= 51 || !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$1] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
	var USES_TO_LENGTH$2 = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

	var SPECIES$2 = wellKnownSymbol('species');
	var nativeSlice = [].slice;
	var max$1 = Math.max;

	// `Array.prototype.slice` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH$2 }, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject(this);
	    var length = toLength(O.length);
	    var k = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
	    var Constructor, result, n;
	    if (isArray(O)) {
	      Constructor = O.constructor;
	      // cross-realm fallback
	      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject(Constructor)) {
	        Constructor = Constructor[SPECIES$2];
	        if (Constructor === null) Constructor = undefined;
	      }
	      if (Constructor === Array || Constructor === undefined) {
	        return nativeSlice.call(O, k, fin);
	      }
	    }
	    result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));
	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
	    result.length = n;
	    return result;
	  }
	});

	var defineProperty$1 = objectDefineProperty.f;

	var FunctionPrototype = Function.prototype;
	var FunctionPrototypeToString = FunctionPrototype.toString;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name';

	// Function instances `.name` property
	// https://tc39.github.io/ecma262/#sec-function-instances-name
	if (descriptors && !(NAME in FunctionPrototype)) {
	  defineProperty$1(FunctionPrototype, NAME, {
	    configurable: true,
	    get: function () {
	      try {
	        return FunctionPrototypeToString.call(this).match(nameRE)[1];
	      } catch (error) {
	        return '';
	      }
	    }
	  });
	}

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys
	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	var FAILS_ON_PRIMITIVES = fails(function () { objectKeys(1); });

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys
	_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
	  keys: function keys(it) {
	    return objectKeys(toObject(it));
	  }
	});

	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	var test = {};

	test[TO_STRING_TAG] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof = toStringTagSupport ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	// `Object.prototype.toString` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
	var objectToString = toStringTagSupport ? {}.toString : function toString() {
	  return '[object ' + classof(this) + ']';
	};

	// `Object.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
	if (!toStringTagSupport) {
	  redefine(Object.prototype, 'toString', objectToString, { unsafe: true });
	}

	// `Object.defineProperties` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperties
	var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
	  return O;
	};

	var html = getBuiltIn('document', 'documentElement');

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    /* global ActiveXObject */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO] = true;

	// `Object.create` method
	// https://tc39.github.io/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	var slice = [].slice;
	var factories = {};

	var construct = function (C, argsLength, args) {
	  if (!(argsLength in factories)) {
	    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
	    // eslint-disable-next-line no-new-func
	    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
	  } return factories[argsLength](C, args);
	};

	// `Function.prototype.bind` method implementation
	// https://tc39.github.io/ecma262/#sec-function.prototype.bind
	var functionBind = Function.bind || function bind(that /* , ...args */) {
	  var fn = aFunction$1(this);
	  var partArgs = slice.call(arguments, 1);
	  var boundFunction = function bound(/* args... */) {
	    var args = partArgs.concat(slice.call(arguments));
	    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
	  };
	  if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
	  return boundFunction;
	};

	var nativeConstruct = getBuiltIn('Reflect', 'construct');

	// `Reflect.construct` method
	// https://tc39.github.io/ecma262/#sec-reflect.construct
	// MS Edge supports only 2 arguments and argumentsList argument is optional
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	var NEW_TARGET_BUG = fails(function () {
	  function F() { /* empty */ }
	  return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
	});
	var ARGS_BUG = !fails(function () {
	  nativeConstruct(function () { /* empty */ });
	});
	var FORCED = NEW_TARGET_BUG || ARGS_BUG;

	_export({ target: 'Reflect', stat: true, forced: FORCED, sham: FORCED }, {
	  construct: function construct(Target, args /* , newTarget */) {
	    aFunction$1(Target);
	    anObject(args);
	    var newTarget = arguments.length < 3 ? Target : aFunction$1(arguments[2]);
	    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
	    if (Target == newTarget) {
	      // w/o altered newTarget, optimization for 0-4 arguments
	      switch (args.length) {
	        case 0: return new Target();
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (functionBind.apply(Target, $args))();
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto = newTarget.prototype;
	    var instance = objectCreate(isObject(proto) ? proto : Object.prototype);
	    var result = Function.apply.call(Target, instance, args);
	    return isObject(result) ? result : instance;
	  }
	});

	// `RegExp.prototype.flags` getter implementation
	// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
	var regexpFlags = function () {
	  var that = anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var TO_STRING = 'toString';
	var RegExpPrototype = RegExp.prototype;
	var nativeToString = RegExpPrototype[TO_STRING];

	var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
	// FF44- RegExp#toString has a wrong name
	var INCORRECT_NAME = nativeToString.name != TO_STRING;

	// `RegExp.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
	if (NOT_GENERIC || INCORRECT_NAME) {
	  redefine(RegExp.prototype, TO_STRING, function toString() {
	    var R = anObject(this);
	    var p = String(R.source);
	    var rf = R.flags;
	    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? regexpFlags.call(R) : rf);
	    return '/' + p + '/' + f;
	  }, { unsafe: true });
	}

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	for (var COLLECTION_NAME in domIterables) {
	  var Collection = global_1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  // some Chrome versions have non-configurable methods on DOMTokenList
	  if (CollectionPrototype && CollectionPrototype.forEach !== arrayForEach) try {
	    createNonEnumerableProperty(CollectionPrototype, 'forEach', arrayForEach);
	  } catch (error) {
	    CollectionPrototype.forEach = arrayForEach;
	  }
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    _typeof = function _typeof(obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function _typeof(obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (_typeof(call) === "object" || typeof call === "function")) {
	    return call;
	  }

	  return _assertThisInitialized(self);
	}

	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}

	function _iterableToArrayLimit(arr, i) {
	  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
	  var _arr = [];
	  var _n = true;
	  var _d = false;
	  var _e = undefined;

	  try {
	    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}

	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) {
	    arr2[i] = arr[i];
	  }

	  return arr2;
	}

	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(n);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	}

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
	}

	var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f;

	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return nativeGetOwnPropertyNames(it);
	  } catch (error) {
	    return windowNames.slice();
	  }
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var f$5 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]'
	    ? getWindowNames(it)
	    : nativeGetOwnPropertyNames(toIndexedObject(it));
	};

	var objectGetOwnPropertyNamesExternal = {
		f: f$5
	};

	var f$6 = wellKnownSymbol;

	var wellKnownSymbolWrapped = {
		f: f$6
	};

	var defineProperty$2 = objectDefineProperty.f;

	var defineWellKnownSymbol = function (NAME) {
	  var Symbol = path.Symbol || (path.Symbol = {});
	  if (!has(Symbol, NAME)) defineProperty$2(Symbol, NAME, {
	    value: wellKnownSymbolWrapped.f(NAME)
	  });
	};

	var defineProperty$3 = objectDefineProperty.f;



	var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');

	var setToStringTag = function (it, TAG, STATIC) {
	  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG$2)) {
	    defineProperty$3(it, TO_STRING_TAG$2, { configurable: true, value: TAG });
	  }
	};

	var $forEach$1 = arrayIteration.forEach;

	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE$1 = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
	var setInternalState = internalState.set;
	var getInternalState = internalState.getterFor(SYMBOL);
	var ObjectPrototype = Object[PROTOTYPE$1];
	var $Symbol = global_1.Symbol;
	var $stringify = getBuiltIn('JSON', 'stringify');
	var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var nativeDefineProperty$1 = objectDefineProperty.f;
	var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable.f;
	var AllSymbols = shared('symbols');
	var ObjectPrototypeSymbols = shared('op-symbols');
	var StringToSymbolRegistry = shared('string-to-symbol-registry');
	var SymbolToStringRegistry = shared('symbol-to-string-registry');
	var WellKnownSymbolsStore$1 = shared('wks');
	var QObject = global_1.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDescriptor = descriptors && fails(function () {
	  return objectCreate(nativeDefineProperty$1({}, 'a', {
	    get: function () { return nativeDefineProperty$1(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
	  nativeDefineProperty$1(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
	    nativeDefineProperty$1(ObjectPrototype, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty$1;

	var wrap = function (tag, description) {
	  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]);
	  setInternalState(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!descriptors) symbol.description = description;
	  return symbol;
	};

	var isSymbol = useSymbolAsUid ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return Object(it) instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject(O);
	  var key = toPrimitive(P, true);
	  anObject(Attributes);
	  if (has(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!has(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = objectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
	    } return setSymbolDescriptor(O, key, Attributes);
	  } return nativeDefineProperty$1(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject(O);
	  var properties = toIndexedObject(Properties);
	  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
	  $forEach$1(keys, function (key) {
	    if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
	};

	var $propertyIsEnumerable = function propertyIsEnumerable(V) {
	  var P = toPrimitive(V, true);
	  var enumerable = nativePropertyIsEnumerable$1.call(this, P);
	  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject(O);
	  var key = toPrimitive(P, true);
	  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
	  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }
	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames$1(toIndexedObject(O));
	  var result = [];
	  $forEach$1(names, function (key) {
	    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
	  var names = nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
	  var result = [];
	  $forEach$1(names, function (key) {
	    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
	      result.push(AllSymbols[key]);
	    }
	  });
	  return result;
	};

	// `Symbol` constructor
	// https://tc39.github.io/ecma262/#sec-symbol-constructor
	if (!nativeSymbol) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var tag = uid(description);
	    var setter = function (value) {
	      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
	    };
	    if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
	    return wrap(tag, description);
	  };

	  redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
	    return getInternalState(this).tag;
	  });

	  redefine($Symbol, 'withoutSetter', function (description) {
	    return wrap(uid(description), description);
	  });

	  objectPropertyIsEnumerable.f = $propertyIsEnumerable;
	  objectDefineProperty.f = $defineProperty;
	  objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
	  objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

	  wellKnownSymbolWrapped.f = function (name) {
	    return wrap(wellKnownSymbol(name), name);
	  };

	  if (descriptors) {
	    // https://github.com/tc39/proposal-Symbol-description
	    nativeDefineProperty$1($Symbol[PROTOTYPE$1], 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState(this).description;
	      }
	    });
	    {
	      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
	    }
	  }
	}

	_export({ global: true, wrap: true, forced: !nativeSymbol, sham: !nativeSymbol }, {
	  Symbol: $Symbol
	});

	$forEach$1(objectKeys(WellKnownSymbolsStore$1), function (name) {
	  defineWellKnownSymbol(name);
	});

	_export({ target: SYMBOL, stat: true, forced: !nativeSymbol }, {
	  // `Symbol.for` method
	  // https://tc39.github.io/ecma262/#sec-symbol.for
	  'for': function (key) {
	    var string = String(key);
	    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = $Symbol(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry[symbol] = string;
	    return symbol;
	  },
	  // `Symbol.keyFor` method
	  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
	    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  },
	  useSetter: function () { USE_SETTER = true; },
	  useSimple: function () { USE_SETTER = false; }
	});

	_export({ target: 'Object', stat: true, forced: !nativeSymbol, sham: !descriptors }, {
	  // `Object.create` method
	  // https://tc39.github.io/ecma262/#sec-object.create
	  create: $create,
	  // `Object.defineProperty` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperty
	  defineProperty: $defineProperty,
	  // `Object.defineProperties` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperties
	  defineProperties: $defineProperties,
	  // `Object.getOwnPropertyDescriptor` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
	});

	_export({ target: 'Object', stat: true, forced: !nativeSymbol }, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // `Object.getOwnPropertySymbols` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	_export({ target: 'Object', stat: true, forced: fails(function () { objectGetOwnPropertySymbols.f(1); }) }, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return objectGetOwnPropertySymbols.f(toObject(it));
	  }
	});

	// `JSON.stringify` method behavior with symbols
	// https://tc39.github.io/ecma262/#sec-json.stringify
	if ($stringify) {
	  var FORCED_JSON_STRINGIFY = !nativeSymbol || fails(function () {
	    var symbol = $Symbol();
	    // MS Edge converts symbol values to JSON as {}
	    return $stringify([symbol]) != '[null]'
	      // WebKit converts symbol values to JSON as null
	      || $stringify({ a: symbol }) != '{}'
	      // V8 throws on boxed symbols
	      || $stringify(Object(symbol)) != '{}';
	  });

	  _export({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
	    // eslint-disable-next-line no-unused-vars
	    stringify: function stringify(it, replacer, space) {
	      var args = [it];
	      var index = 1;
	      var $replacer;
	      while (arguments.length > index) args.push(arguments[index++]);
	      $replacer = replacer;
	      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	      if (!isArray(replacer)) replacer = function (key, value) {
	        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	        if (!isSymbol(value)) return value;
	      };
	      args[1] = replacer;
	      return $stringify.apply(null, args);
	    }
	  });
	}

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
	if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE]) {
	  createNonEnumerableProperty($Symbol[PROTOTYPE$1], TO_PRIMITIVE, $Symbol[PROTOTYPE$1].valueOf);
	}
	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag($Symbol, SYMBOL);

	hiddenKeys[HIDDEN] = true;

	var defineProperty$4 = objectDefineProperty.f;


	var NativeSymbol = global_1.Symbol;

	if (descriptors && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
	  // Safari 12 bug
	  NativeSymbol().description !== undefined
	)) {
	  var EmptyStringDescriptionStore = {};
	  // wrap Symbol constructor for correct work with undefined description
	  var SymbolWrapper = function Symbol() {
	    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var result = this instanceof SymbolWrapper
	      ? new NativeSymbol(description)
	      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
	      : description === undefined ? NativeSymbol() : NativeSymbol(description);
	    if (description === '') EmptyStringDescriptionStore[result] = true;
	    return result;
	  };
	  copyConstructorProperties(SymbolWrapper, NativeSymbol);
	  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
	  symbolPrototype.constructor = SymbolWrapper;

	  var symbolToString = symbolPrototype.toString;
	  var native = String(NativeSymbol('test')) == 'Symbol(test)';
	  var regexp = /^Symbol\((.*)\)[^)]+$/;
	  defineProperty$4(symbolPrototype, 'description', {
	    configurable: true,
	    get: function description() {
	      var symbol = isObject(this) ? this.valueOf() : this;
	      var string = symbolToString.call(symbol);
	      if (has(EmptyStringDescriptionStore, symbol)) return '';
	      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
	      return desc === '' ? undefined : desc;
	    }
	  });

	  _export({ global: true, forced: true }, {
	    Symbol: SymbolWrapper
	  });
	}

	// `Symbol.iterator` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.iterator
	defineWellKnownSymbol('iterator');

	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray(O);
	};

	var FORCED$1 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	_export({ target: 'Array', proto: true, forced: FORCED$1 }, {
	  concat: function concat(arg) { // eslint-disable-line no-unused-vars
	    var O = toObject(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = toLength(E.length);
	        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	// `Array.prototype.fill` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.fill
	var arrayFill = function fill(value /* , start = 0, end = @length */) {
	  var O = toObject(this);
	  var length = toLength(O.length);
	  var argumentsLength = arguments.length;
	  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
	  var end = argumentsLength > 2 ? arguments[2] : undefined;
	  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
	  while (endPos > index) O[index++] = value;
	  return O;
	};

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype[UNSCOPABLES] == undefined) {
	  objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
	    configurable: true,
	    value: objectCreate(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables = function (key) {
	  ArrayPrototype[UNSCOPABLES][key] = true;
	};

	// `Array.prototype.fill` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.fill
	_export({ target: 'Array', proto: true }, {
	  fill: arrayFill
	});

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('fill');

	var $filter = arrayIteration.filter;



	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('filter');
	// Edge 14- issue
	var USES_TO_LENGTH$3 = arrayMethodUsesToLength('filter');

	// `Array.prototype.filter` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$3 }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// call something on iterator step with safe closing on error
	var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
	  try {
	    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (error) {
	    var returnMethod = iterator['return'];
	    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
	    throw error;
	  }
	};

	var iterators = {};

	var ITERATOR = wellKnownSymbol('iterator');
	var ArrayPrototype$1 = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod = function (it) {
	  return it !== undefined && (iterators.Array === it || ArrayPrototype$1[ITERATOR] === it);
	};

	var ITERATOR$1 = wellKnownSymbol('iterator');

	var getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$1]
	    || it['@@iterator']
	    || iterators[classof(it)];
	};

	// `Array.from` method implementation
	// https://tc39.github.io/ecma262/#sec-array.from
	var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	  var O = toObject(arrayLike);
	  var C = typeof this == 'function' ? this : Array;
	  var argumentsLength = arguments.length;
	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
	  var mapping = mapfn !== undefined;
	  var iteratorMethod = getIteratorMethod(O);
	  var index = 0;
	  var length, result, step, iterator, next, value;
	  if (mapping) mapfn = functionBindContext(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
	  // if the target is not iterable or it's an array with the default iterator - use a simple case
	  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
	    iterator = iteratorMethod.call(O);
	    next = iterator.next;
	    result = new C();
	    for (;!(step = next.call(iterator)).done; index++) {
	      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
	      createProperty(result, index, value);
	    }
	  } else {
	    length = toLength(O.length);
	    result = new C(length);
	    for (;length > index; index++) {
	      value = mapping ? mapfn(O[index], index) : O[index];
	      createProperty(result, index, value);
	    }
	  }
	  result.length = index;
	  return result;
	};

	var ITERATOR$2 = wellKnownSymbol('iterator');
	var SAFE_CLOSING = false;

	try {
	  var called = 0;
	  var iteratorWithReturn = {
	    next: function () {
	      return { done: !!called++ };
	    },
	    'return': function () {
	      SAFE_CLOSING = true;
	    }
	  };
	  iteratorWithReturn[ITERATOR$2] = function () {
	    return this;
	  };
	  // eslint-disable-next-line no-throw-literal
	  Array.from(iteratorWithReturn, function () { throw 2; });
	} catch (error) { /* empty */ }

	var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
	  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  var ITERATION_SUPPORT = false;
	  try {
	    var object = {};
	    object[ITERATOR$2] = function () {
	      return {
	        next: function () {
	          return { done: ITERATION_SUPPORT = true };
	        }
	      };
	    };
	    exec(object);
	  } catch (error) { /* empty */ }
	  return ITERATION_SUPPORT;
	};

	var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
	  Array.from(iterable);
	});

	// `Array.from` method
	// https://tc39.github.io/ecma262/#sec-array.from
	_export({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
	  from: arrayFrom
	});

	var correctPrototypeGetter = !fails(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var IE_PROTO$1 = sharedKey('IE_PROTO');
	var ObjectPrototype$1 = Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.getprototypeof
	var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectPrototype$1 : null;
	};

	var ITERATOR$3 = wellKnownSymbol('iterator');
	var BUGGY_SAFARI_ITERATORS = false;

	var returnThis = function () { return this; };

	// `%IteratorPrototype%` object
	// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
	  }
	}

	if (IteratorPrototype == undefined) IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	if ( !has(IteratorPrototype, ITERATOR$3)) {
	  createNonEnumerableProperty(IteratorPrototype, ITERATOR$3, returnThis);
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





	var returnThis$1 = function () { return this; };

	var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
	  iterators[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var aPossiblePrototype = function (it) {
	  if (!isObject(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  } return it;
	};

	// `Object.setPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
	    setter.call(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter.call(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$4 = wellKnownSymbol('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis$2 = function () { return this; };

	var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
	    switch (KIND) {
	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
	    } return function () { return new IteratorConstructor(this); };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$4]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
	      if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
	        if (objectSetPrototypeOf) {
	          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
	        } else if (typeof CurrentIteratorPrototype[ITERATOR$4] != 'function') {
	          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$4, returnThis$2);
	        }
	      }
	      // Set @@toStringTag to native iterators
	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
	    }
	  }

	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;
	    defaultIterator = function values() { return nativeIterator.call(this); };
	  }

	  // define iterator
	  if ( IterablePrototype[ITERATOR$4] !== defaultIterator) {
	    createNonEnumerableProperty(IterablePrototype, ITERATOR$4, defaultIterator);
	  }
	  iterators[NAME] = defaultIterator;

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
	  }

	  return methods;
	};

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$1 = internalState.set;
	var getInternalState$1 = internalState.getterFor(ARRAY_ITERATOR);

	// `Array.prototype.entries` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.github.io/ecma262/#sec-createarrayiterator
	var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
	  setInternalState$1(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState$1(this);
	  var target = state.target;
	  var kind = state.kind;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return { value: undefined, done: true };
	  }
	  if (kind == 'keys') return { value: index, done: false };
	  if (kind == 'values') return { value: target[index], done: false };
	  return { value: [index, target[index]], done: false };
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values%
	// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
	iterators.Arguments = iterators.Array;

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	var nativeJoin = [].join;

	var ES3_STRINGS = indexedObject != Object;
	var STRICT_METHOD$2 = arrayMethodIsStrict('join', ',');

	// `Array.prototype.join` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.join
	_export({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD$2 }, {
	  join: function join(separator) {
	    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
	  }
	});

	var $map = arrayIteration.map;



	var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('map');
	// FF49- issue
	var USES_TO_LENGTH$4 = arrayMethodUsesToLength('map');

	// `Array.prototype.map` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.map
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 || !USES_TO_LENGTH$4 }, {
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport('splice');
	var USES_TO_LENGTH$5 = arrayMethodUsesToLength('splice', { ACCESSORS: true, 0: 0, 1: 2 });

	var max$2 = Math.max;
	var min$2 = Math.min;
	var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

	// `Array.prototype.splice` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.splice
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$3 || !USES_TO_LENGTH$5 }, {
	  splice: function splice(start, deleteCount /* , ...items */) {
	    var O = toObject(this);
	    var len = toLength(O.length);
	    var actualStart = toAbsoluteIndex(start, len);
	    var argumentsLength = arguments.length;
	    var insertCount, actualDeleteCount, A, k, from, to;
	    if (argumentsLength === 0) {
	      insertCount = actualDeleteCount = 0;
	    } else if (argumentsLength === 1) {
	      insertCount = 0;
	      actualDeleteCount = len - actualStart;
	    } else {
	      insertCount = argumentsLength - 2;
	      actualDeleteCount = min$2(max$2(toInteger(deleteCount), 0), len - actualStart);
	    }
	    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$1) {
	      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
	    }
	    A = arraySpeciesCreate(O, actualDeleteCount);
	    for (k = 0; k < actualDeleteCount; k++) {
	      from = actualStart + k;
	      if (from in O) createProperty(A, k, O[from]);
	    }
	    A.length = actualDeleteCount;
	    if (insertCount < actualDeleteCount) {
	      for (k = actualStart; k < len - actualDeleteCount; k++) {
	        from = k + actualDeleteCount;
	        to = k + insertCount;
	        if (from in O) O[to] = O[from];
	        else delete O[to];
	      }
	      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
	    } else if (insertCount > actualDeleteCount) {
	      for (k = len - actualDeleteCount; k > actualStart; k--) {
	        from = k + actualDeleteCount - 1;
	        to = k + insertCount - 1;
	        if (from in O) O[to] = O[from];
	        else delete O[to];
	      }
	    }
	    for (k = 0; k < insertCount; k++) {
	      O[k + actualStart] = arguments[k + 2];
	    }
	    O.length = len - actualDeleteCount + insertCount;
	    return A;
	  }
	});

	var freezing = !fails(function () {
	  return Object.isExtensible(Object.preventExtensions({}));
	});

	var internalMetadata = createCommonjsModule(function (module) {
	var defineProperty = objectDefineProperty.f;



	var METADATA = uid('meta');
	var id = 0;

	var isExtensible = Object.isExtensible || function () {
	  return true;
	};

	var setMetadata = function (it) {
	  defineProperty(it, METADATA, { value: {
	    objectID: 'O' + ++id, // object ID
	    weakData: {}          // weak collections IDs
	  } });
	};

	var fastKey = function (it, create) {
	  // return a primitive with prefix
	  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has(it, METADATA)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMetadata(it);
	  // return object ID
	  } return it[METADATA].objectID;
	};

	var getWeakData = function (it, create) {
	  if (!has(it, METADATA)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMetadata(it);
	  // return the store of weak collections IDs
	  } return it[METADATA].weakData;
	};

	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (freezing && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
	  return it;
	};

	var meta = module.exports = {
	  REQUIRED: false,
	  fastKey: fastKey,
	  getWeakData: getWeakData,
	  onFreeze: onFreeze
	};

	hiddenKeys[METADATA] = true;
	});
	var internalMetadata_1 = internalMetadata.REQUIRED;
	var internalMetadata_2 = internalMetadata.fastKey;
	var internalMetadata_3 = internalMetadata.getWeakData;
	var internalMetadata_4 = internalMetadata.onFreeze;

	var iterate_1 = createCommonjsModule(function (module) {
	var Result = function (stopped, result) {
	  this.stopped = stopped;
	  this.result = result;
	};

	var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
	  var boundFunction = functionBindContext(fn, that, AS_ENTRIES ? 2 : 1);
	  var iterator, iterFn, index, length, result, next, step;

	  if (IS_ITERATOR) {
	    iterator = iterable;
	  } else {
	    iterFn = getIteratorMethod(iterable);
	    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
	    // optimisation for array iterators
	    if (isArrayIteratorMethod(iterFn)) {
	      for (index = 0, length = toLength(iterable.length); length > index; index++) {
	        result = AS_ENTRIES
	          ? boundFunction(anObject(step = iterable[index])[0], step[1])
	          : boundFunction(iterable[index]);
	        if (result && result instanceof Result) return result;
	      } return new Result(false);
	    }
	    iterator = iterFn.call(iterable);
	  }

	  next = iterator.next;
	  while (!(step = next.call(iterator)).done) {
	    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
	    if (typeof result == 'object' && result && result instanceof Result) return result;
	  } return new Result(false);
	};

	iterate.stop = function (result) {
	  return new Result(true, result);
	};
	});

	var anInstance = function (it, Constructor, name) {
	  if (!(it instanceof Constructor)) {
	    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
	  } return it;
	};

	// makes subclassing work correct for wrapped built-ins
	var inheritIfRequired = function ($this, dummy, Wrapper) {
	  var NewTarget, NewTargetPrototype;
	  if (
	    // it can work only with native `setPrototypeOf`
	    objectSetPrototypeOf &&
	    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
	    typeof (NewTarget = dummy.constructor) == 'function' &&
	    NewTarget !== Wrapper &&
	    isObject(NewTargetPrototype = NewTarget.prototype) &&
	    NewTargetPrototype !== Wrapper.prototype
	  ) objectSetPrototypeOf($this, NewTargetPrototype);
	  return $this;
	};

	var collection = function (CONSTRUCTOR_NAME, wrapper, common) {
	  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
	  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var NativeConstructor = global_1[CONSTRUCTOR_NAME];
	  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
	  var Constructor = NativeConstructor;
	  var exported = {};

	  var fixMethod = function (KEY) {
	    var nativeMethod = NativePrototype[KEY];
	    redefine(NativePrototype, KEY,
	      KEY == 'add' ? function add(value) {
	        nativeMethod.call(this, value === 0 ? 0 : value);
	        return this;
	      } : KEY == 'delete' ? function (key) {
	        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
	      } : KEY == 'get' ? function get(key) {
	        return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
	      } : KEY == 'has' ? function has(key) {
	        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
	      } : function set(key, value) {
	        nativeMethod.call(this, key === 0 ? 0 : key, value);
	        return this;
	      }
	    );
	  };

	  // eslint-disable-next-line max-len
	  if (isForced_1(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
	    new NativeConstructor().entries().next();
	  })))) {
	    // create collection constructor
	    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
	    internalMetadata.REQUIRED = true;
	  } else if (isForced_1(CONSTRUCTOR_NAME, true)) {
	    var instance = new Constructor();
	    // early implementations not supports chaining
	    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
	    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
	    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
	    // most early implementations doesn't supports iterables, most modern - not close it correctly
	    // eslint-disable-next-line no-new
	    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
	    // for early implementations -0 and +0 not the same
	    var BUGGY_ZERO = !IS_WEAK && fails(function () {
	      // V8 ~ Chromium 42- fails only with 5+ elements
	      var $instance = new NativeConstructor();
	      var index = 5;
	      while (index--) $instance[ADDER](index, index);
	      return !$instance.has(-0);
	    });

	    if (!ACCEPT_ITERABLES) {
	      Constructor = wrapper(function (dummy, iterable) {
	        anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
	        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
	        if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
	        return that;
	      });
	      Constructor.prototype = NativePrototype;
	      NativePrototype.constructor = Constructor;
	    }

	    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }

	    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

	    // weak collections should not contains .clear method
	    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
	  }

	  exported[CONSTRUCTOR_NAME] = Constructor;
	  _export({ global: true, forced: Constructor != NativeConstructor }, exported);

	  setToStringTag(Constructor, CONSTRUCTOR_NAME);

	  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

	  return Constructor;
	};

	var redefineAll = function (target, src, options) {
	  for (var key in src) redefine(target, key, src[key], options);
	  return target;
	};

	var SPECIES$3 = wellKnownSymbol('species');

	var setSpecies = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
	  var defineProperty = objectDefineProperty.f;

	  if (descriptors && Constructor && !Constructor[SPECIES$3]) {
	    defineProperty(Constructor, SPECIES$3, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};

	var defineProperty$5 = objectDefineProperty.f;








	var fastKey = internalMetadata.fastKey;


	var setInternalState$2 = internalState.set;
	var internalStateGetterFor = internalState.getterFor;

	var collectionStrong = {
	  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance(that, C, CONSTRUCTOR_NAME);
	      setInternalState$2(that, {
	        type: CONSTRUCTOR_NAME,
	        index: objectCreate(null),
	        first: undefined,
	        last: undefined,
	        size: 0
	      });
	      if (!descriptors) that.size = 0;
	      if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
	    });

	    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

	    var define = function (that, key, value) {
	      var state = getInternalState(that);
	      var entry = getEntry(that, key);
	      var previous, index;
	      // change existing entry
	      if (entry) {
	        entry.value = value;
	      // create new entry
	      } else {
	        state.last = entry = {
	          index: index = fastKey(key, true),
	          key: key,
	          value: value,
	          previous: previous = state.last,
	          next: undefined,
	          removed: false
	        };
	        if (!state.first) state.first = entry;
	        if (previous) previous.next = entry;
	        if (descriptors) state.size++;
	        else that.size++;
	        // add to index
	        if (index !== 'F') state.index[index] = entry;
	      } return that;
	    };

	    var getEntry = function (that, key) {
	      var state = getInternalState(that);
	      // fast case
	      var index = fastKey(key);
	      var entry;
	      if (index !== 'F') return state.index[index];
	      // frozen object case
	      for (entry = state.first; entry; entry = entry.next) {
	        if (entry.key == key) return entry;
	      }
	    };

	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        var that = this;
	        var state = getInternalState(that);
	        var data = state.index;
	        var entry = state.first;
	        while (entry) {
	          entry.removed = true;
	          if (entry.previous) entry.previous = entry.previous.next = undefined;
	          delete data[entry.index];
	          entry = entry.next;
	        }
	        state.first = state.last = undefined;
	        if (descriptors) state.size = 0;
	        else that.size = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function (key) {
	        var that = this;
	        var state = getInternalState(that);
	        var entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.next;
	          var prev = entry.previous;
	          delete state.index[entry.index];
	          entry.removed = true;
	          if (prev) prev.next = next;
	          if (next) next.previous = prev;
	          if (state.first == entry) state.first = next;
	          if (state.last == entry) state.last = prev;
	          if (descriptors) state.size--;
	          else that.size--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /* , that = undefined */) {
	        var state = getInternalState(this);
	        var boundFunction = functionBindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	        var entry;
	        while (entry = entry ? entry.next : state.first) {
	          boundFunction(entry.value, entry.key, this);
	          // revert to the last existing entry
	          while (entry && entry.removed) entry = entry.previous;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(this, key);
	      }
	    });

	    redefineAll(C.prototype, IS_MAP ? {
	      // 23.1.3.6 Map.prototype.get(key)
	      get: function get(key) {
	        var entry = getEntry(this, key);
	        return entry && entry.value;
	      },
	      // 23.1.3.9 Map.prototype.set(key, value)
	      set: function set(key, value) {
	        return define(this, key === 0 ? 0 : key, value);
	      }
	    } : {
	      // 23.2.3.1 Set.prototype.add(value)
	      add: function add(value) {
	        return define(this, value = value === 0 ? 0 : value, value);
	      }
	    });
	    if (descriptors) defineProperty$5(C.prototype, 'size', {
	      get: function () {
	        return getInternalState(this).size;
	      }
	    });
	    return C;
	  },
	  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
	    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
	    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
	    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
	      setInternalState$2(this, {
	        type: ITERATOR_NAME,
	        target: iterated,
	        state: getInternalCollectionState(iterated),
	        kind: kind,
	        last: undefined
	      });
	    }, function () {
	      var state = getInternalIteratorState(this);
	      var kind = state.kind;
	      var entry = state.last;
	      // revert to the last existing entry
	      while (entry && entry.removed) entry = entry.previous;
	      // get next entry
	      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
	        // or finish the iteration
	        state.target = undefined;
	        return { value: undefined, done: true };
	      }
	      // return step by kind
	      if (kind == 'keys') return { value: entry.key, done: false };
	      if (kind == 'values') return { value: entry.value, done: false };
	      return { value: [entry.key, entry.value], done: false };
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(CONSTRUCTOR_NAME);
	  }
	};

	// `Map` constructor
	// https://tc39.github.io/ecma262/#sec-map-objects
	var es_map = collection('Map', function (init) {
	  return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
	}, collectionStrong);

	var nativeAssign = Object.assign;
	var defineProperty$6 = Object.defineProperty;

	// `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign
	var objectAssign = !nativeAssign || fails(function () {
	  // should have correct order of operations (Edge bug)
	  if (descriptors && nativeAssign({ b: 1 }, nativeAssign(defineProperty$6({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty$6(this, 'b', {
	        value: 3,
	        enumerable: false
	      });
	    }
	  }), { b: 2 })).b !== 1) return true;
	  // should work with symbols and should have deterministic property order (V8 bug)
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var symbol = Symbol();
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
	  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = toObject(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  var propertyIsEnumerable = objectPropertyIsEnumerable.f;
	  while (argumentsLength > index) {
	    var S = indexedObject(arguments[index++]);
	    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
	    }
	  } return T;
	} : nativeAssign;

	// `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign
	_export({ target: 'Object', stat: true, forced: Object.assign !== objectAssign }, {
	  assign: objectAssign
	});

	// `Object.getOwnPropertyDescriptors` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
	_export({ target: 'Object', stat: true, sham: !descriptors }, {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = toIndexedObject(object);
	    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	    var keys = ownKeys(O);
	    var result = {};
	    var index = 0;
	    var key, descriptor;
	    while (keys.length > index) {
	      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
	      if (descriptor !== undefined) createProperty(result, key, descriptor);
	    }
	    return result;
	  }
	});

	var nativePromiseConstructor = global_1.Promise;

	var SPECIES$4 = wellKnownSymbol('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.github.io/ecma262/#sec-speciesconstructor
	var speciesConstructor = function (O, defaultConstructor) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES$4]) == undefined ? defaultConstructor : aFunction$1(S);
	};

	var engineIsIos = /(iphone|ipod|ipad).*applewebkit/i.test(engineUserAgent);

	var location$1 = global_1.location;
	var set$1 = global_1.setImmediate;
	var clear = global_1.clearImmediate;
	var process$1 = global_1.process;
	var MessageChannel = global_1.MessageChannel;
	var Dispatch = global_1.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;

	var run = function (id) {
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};

	var runner = function (id) {
	  return function () {
	    run(id);
	  };
	};

	var listener = function (event) {
	  run(event.data);
	};

	var post = function (id) {
	  // old engines have not location.origin
	  global_1.postMessage(id + '', location$1.protocol + '//' + location$1.host);
	};

	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!set$1 || !clear) {
	  set$1 = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clear = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (classofRaw(process$1) == 'process') {
	    defer = function (id) {
	      process$1.nextTick(runner(id));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(runner(id));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  // except iOS - https://github.com/zloirock/core-js/issues/624
	  } else if (MessageChannel && !engineIsIos) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = functionBindContext(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (
	    global_1.addEventListener &&
	    typeof postMessage == 'function' &&
	    !global_1.importScripts &&
	    !fails(post) &&
	    location$1.protocol !== 'file:'
	  ) {
	    defer = post;
	    global_1.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in documentCreateElement('script')) {
	    defer = function (id) {
	      html.appendChild(documentCreateElement('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(runner(id), 0);
	    };
	  }
	}

	var task = {
	  set: set$1,
	  clear: clear
	};

	var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;

	var macrotask = task.set;


	var MutationObserver = global_1.MutationObserver || global_1.WebKitMutationObserver;
	var process$2 = global_1.process;
	var Promise$1 = global_1.Promise;
	var IS_NODE = classofRaw(process$2) == 'process';
	// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
	var queueMicrotaskDescriptor = getOwnPropertyDescriptor$2(global_1, 'queueMicrotask');
	var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

	var flush, head, last, notify, toggle, node, promise, then;

	// modern engines have queueMicrotask method
	if (!queueMicrotask) {
	  flush = function () {
	    var parent, fn;
	    if (IS_NODE && (parent = process$2.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (error) {
	        if (head) notify();
	        else last = undefined;
	        throw error;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // Node.js
	  if (IS_NODE) {
	    notify = function () {
	      process$2.nextTick(flush);
	    };
	  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
	  } else if (MutationObserver && !engineIsIos) {
	    toggle = true;
	    node = document.createTextNode('');
	    new MutationObserver(flush).observe(node, { characterData: true });
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise$1 && Promise$1.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    promise = Promise$1.resolve(undefined);
	    then = promise.then;
	    notify = function () {
	      then.call(promise, flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global_1, flush);
	    };
	  }
	}

	var microtask = queueMicrotask || function (fn) {
	  var task = { fn: fn, next: undefined };
	  if (last) last.next = task;
	  if (!head) {
	    head = task;
	    notify();
	  } last = task;
	};

	var PromiseCapability = function (C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction$1(resolve);
	  this.reject = aFunction$1(reject);
	};

	// 25.4.1.5 NewPromiseCapability(C)
	var f$7 = function (C) {
	  return new PromiseCapability(C);
	};

	var newPromiseCapability = {
		f: f$7
	};

	var promiseResolve = function (C, x) {
	  anObject(C);
	  if (isObject(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var hostReportErrors = function (a, b) {
	  var console = global_1.console;
	  if (console && console.error) {
	    arguments.length === 1 ? console.error(a) : console.error(a, b);
	  }
	};

	var perform = function (exec) {
	  try {
	    return { error: false, value: exec() };
	  } catch (error) {
	    return { error: true, value: error };
	  }
	};

	var task$1 = task.set;










	var SPECIES$5 = wellKnownSymbol('species');
	var PROMISE = 'Promise';
	var getInternalState$2 = internalState.get;
	var setInternalState$3 = internalState.set;
	var getInternalPromiseState = internalState.getterFor(PROMISE);
	var PromiseConstructor = nativePromiseConstructor;
	var TypeError$1 = global_1.TypeError;
	var document$2 = global_1.document;
	var process$3 = global_1.process;
	var $fetch = getBuiltIn('fetch');
	var newPromiseCapability$1 = newPromiseCapability.f;
	var newGenericPromiseCapability = newPromiseCapability$1;
	var IS_NODE$1 = classofRaw(process$3) == 'process';
	var DISPATCH_EVENT = !!(document$2 && document$2.createEvent && global_1.dispatchEvent);
	var UNHANDLED_REJECTION = 'unhandledrejection';
	var REJECTION_HANDLED = 'rejectionhandled';
	var PENDING = 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	var HANDLED = 1;
	var UNHANDLED = 2;
	var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

	var FORCED$2 = isForced_1(PROMISE, function () {
	  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
	  if (!GLOBAL_CORE_JS_PROMISE) {
	    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	    // We can't detect it synchronously, so just check versions
	    if (engineV8Version === 66) return true;
	    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    if (!IS_NODE$1 && typeof PromiseRejectionEvent != 'function') return true;
	  }
	  // We can't use @@species feature detection in V8 since it causes
	  // deoptimization and performance degradation
	  // https://github.com/zloirock/core-js/issues/679
	  if (engineV8Version >= 51 && /native code/.test(PromiseConstructor)) return false;
	  // Detect correctness of subclassing with @@species support
	  var promise = PromiseConstructor.resolve(1);
	  var FakePromise = function (exec) {
	    exec(function () { /* empty */ }, function () { /* empty */ });
	  };
	  var constructor = promise.constructor = {};
	  constructor[SPECIES$5] = FakePromise;
	  return !(promise.then(function () { /* empty */ }) instanceof FakePromise);
	});

	var INCORRECT_ITERATION$1 = FORCED$2 || !checkCorrectnessOfIteration(function (iterable) {
	  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
	});

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};

	var notify$1 = function (promise, state, isReject) {
	  if (state.notified) return;
	  state.notified = true;
	  var chain = state.reactions;
	  microtask(function () {
	    var value = state.value;
	    var ok = state.state == FULFILLED;
	    var index = 0;
	    // variable length - can't use forEach
	    while (chain.length > index) {
	      var reaction = chain[index++];
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
	            state.rejection = HANDLED;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value); // can throw
	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }
	          if (result === reaction.promise) {
	            reject(TypeError$1('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (error) {
	        if (domain && !exited) domain.exit();
	        reject(error);
	      }
	    }
	    state.reactions = [];
	    state.notified = false;
	    if (isReject && !state.rejection) onUnhandled(promise, state);
	  });
	};

	var dispatchEvent = function (name, promise, reason) {
	  var event, handler;
	  if (DISPATCH_EVENT) {
	    event = document$2.createEvent('Event');
	    event.promise = promise;
	    event.reason = reason;
	    event.initEvent(name, false, true);
	    global_1.dispatchEvent(event);
	  } else event = { promise: promise, reason: reason };
	  if (handler = global_1['on' + name]) handler(event);
	  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
	};

	var onUnhandled = function (promise, state) {
	  task$1.call(global_1, function () {
	    var value = state.value;
	    var IS_UNHANDLED = isUnhandled(state);
	    var result;
	    if (IS_UNHANDLED) {
	      result = perform(function () {
	        if (IS_NODE$1) {
	          process$3.emit('unhandledRejection', value, promise);
	        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      state.rejection = IS_NODE$1 || isUnhandled(state) ? UNHANDLED : HANDLED;
	      if (result.error) throw result.value;
	    }
	  });
	};

	var isUnhandled = function (state) {
	  return state.rejection !== HANDLED && !state.parent;
	};

	var onHandleUnhandled = function (promise, state) {
	  task$1.call(global_1, function () {
	    if (IS_NODE$1) {
	      process$3.emit('rejectionHandled', promise);
	    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
	  });
	};

	var bind = function (fn, promise, state, unwrap) {
	  return function (value) {
	    fn(promise, state, value, unwrap);
	  };
	};

	var internalReject = function (promise, state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  state.value = value;
	  state.state = REJECTED;
	  notify$1(promise, state, true);
	};

	var internalResolve = function (promise, state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  try {
	    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
	    var then = isThenable(value);
	    if (then) {
	      microtask(function () {
	        var wrapper = { done: false };
	        try {
	          then.call(value,
	            bind(internalResolve, promise, wrapper, state),
	            bind(internalReject, promise, wrapper, state)
	          );
	        } catch (error) {
	          internalReject(promise, wrapper, error, state);
	        }
	      });
	    } else {
	      state.value = value;
	      state.state = FULFILLED;
	      notify$1(promise, state, false);
	    }
	  } catch (error) {
	    internalReject(promise, { done: false }, error, state);
	  }
	};

	// constructor polyfill
	if (FORCED$2) {
	  // 25.4.3.1 Promise(executor)
	  PromiseConstructor = function Promise(executor) {
	    anInstance(this, PromiseConstructor, PROMISE);
	    aFunction$1(executor);
	    Internal.call(this);
	    var state = getInternalState$2(this);
	    try {
	      executor(bind(internalResolve, this, state), bind(internalReject, this, state));
	    } catch (error) {
	      internalReject(this, state, error);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    setInternalState$3(this, {
	      type: PROMISE,
	      done: false,
	      notified: false,
	      parent: false,
	      reactions: [],
	      rejection: false,
	      state: PENDING,
	      value: undefined
	    });
	  };
	  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
	    // `Promise.prototype.then` method
	    // https://tc39.github.io/ecma262/#sec-promise.prototype.then
	    then: function then(onFulfilled, onRejected) {
	      var state = getInternalPromiseState(this);
	      var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = IS_NODE$1 ? process$3.domain : undefined;
	      state.parent = true;
	      state.reactions.push(reaction);
	      if (state.state != PENDING) notify$1(this, state, false);
	      return reaction.promise;
	    },
	    // `Promise.prototype.catch` method
	    // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    var state = getInternalState$2(promise);
	    this.promise = promise;
	    this.resolve = bind(internalResolve, promise, state);
	    this.reject = bind(internalReject, promise, state);
	  };
	  newPromiseCapability.f = newPromiseCapability$1 = function (C) {
	    return C === PromiseConstructor || C === PromiseWrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };

	  if ( typeof nativePromiseConstructor == 'function') {
	    nativeThen = nativePromiseConstructor.prototype.then;

	    // wrap native Promise#then for native async functions
	    redefine(nativePromiseConstructor.prototype, 'then', function then(onFulfilled, onRejected) {
	      var that = this;
	      return new PromiseConstructor(function (resolve, reject) {
	        nativeThen.call(that, resolve, reject);
	      }).then(onFulfilled, onRejected);
	    // https://github.com/zloirock/core-js/issues/640
	    }, { unsafe: true });

	    // wrap fetch result
	    if (typeof $fetch == 'function') _export({ global: true, enumerable: true, forced: true }, {
	      // eslint-disable-next-line no-unused-vars
	      fetch: function fetch(input /* , init */) {
	        return promiseResolve(PromiseConstructor, $fetch.apply(global_1, arguments));
	      }
	    });
	  }
	}

	_export({ global: true, wrap: true, forced: FORCED$2 }, {
	  Promise: PromiseConstructor
	});

	setToStringTag(PromiseConstructor, PROMISE, false);
	setSpecies(PROMISE);

	PromiseWrapper = getBuiltIn(PROMISE);

	// statics
	_export({ target: PROMISE, stat: true, forced: FORCED$2 }, {
	  // `Promise.reject` method
	  // https://tc39.github.io/ecma262/#sec-promise.reject
	  reject: function reject(r) {
	    var capability = newPromiseCapability$1(this);
	    capability.reject.call(undefined, r);
	    return capability.promise;
	  }
	});

	_export({ target: PROMISE, stat: true, forced:  FORCED$2 }, {
	  // `Promise.resolve` method
	  // https://tc39.github.io/ecma262/#sec-promise.resolve
	  resolve: function resolve(x) {
	    return promiseResolve( this, x);
	  }
	});

	_export({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION$1 }, {
	  // `Promise.all` method
	  // https://tc39.github.io/ecma262/#sec-promise.all
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aFunction$1(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate_1(iterable, function (promise) {
	        var index = counter++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        $promiseResolve.call(C, promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  },
	  // `Promise.race` method
	  // https://tc39.github.io/ecma262/#sec-promise.race
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aFunction$1(C.resolve);
	      iterate_1(iterable, function (promise) {
	        $promiseResolve.call(C, promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
	// so we use an intermediate function.
	function RE(s, f) {
	  return RegExp(s, f);
	}

	var UNSUPPORTED_Y = fails(function () {
	  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
	  var re = RE('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') != null;
	});

	var BROKEN_CARET = fails(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = RE('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') != null;
	});

	var regexpStickyHelpers = {
		UNSUPPORTED_Y: UNSUPPORTED_Y,
		BROKEN_CARET: BROKEN_CARET
	};

	var nativeExec = RegExp.prototype.exec;
	// This always refers to the native implementation, because the
	// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	// which loads this file before patching the method.
	var nativeReplace = String.prototype.replace;

	var patchedExec = nativeExec;

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	})();

	var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET;

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;
	    var sticky = UNSUPPORTED_Y$1 && re.sticky;
	    var flags = regexpFlags.call(re);
	    var source = re.source;
	    var charsAdded = 0;
	    var strCopy = str;

	    if (sticky) {
	      flags = flags.replace('y', '');
	      if (flags.indexOf('g') === -1) {
	        flags += 'g';
	      }

	      strCopy = String(str).slice(re.lastIndex);
	      // Support anchored sticky behavior.
	      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
	        source = '(?: ' + source + ')';
	        strCopy = ' ' + strCopy;
	        charsAdded++;
	      }
	      // ^(? + rx + ) is needed, in combination with some str slicing, to
	      // simulate the 'y' flag.
	      reCopy = new RegExp('^(?:' + source + ')', flags);
	    }

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

	    match = nativeExec.call(sticky ? reCopy : re, strCopy);

	    if (sticky) {
	      if (match) {
	        match.input = match.input.slice(charsAdded);
	        match[0] = match[0].slice(charsAdded);
	        match.index = re.lastIndex;
	        re.lastIndex += match[0].length;
	      } else re.lastIndex = 0;
	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      nativeReplace.call(match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    return match;
	  };
	}

	var regexpExec = patchedExec;

	_export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
	  exec: regexpExec
	});

	// `Set` constructor
	// https://tc39.github.io/ecma262/#sec-set-objects
	var es_set = collection('Set', function (init) {
	  return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
	}, collectionStrong);

	// `String.prototype.{ codePointAt, at }` methods implementation
	var createMethod$2 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible($this));
	    var position = toInteger(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = S.charCodeAt(position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING ? S.charAt(position) : first
	        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$2(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$2(true)
	};

	var charAt = stringMultibyte.charAt;



	var STRING_ITERATOR = 'String Iterator';
	var setInternalState$4 = internalState.set;
	var getInternalState$3 = internalState.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
	defineIterator(String, 'String', function (iterated) {
	  setInternalState$4(this, {
	    type: STRING_ITERATOR,
	    string: String(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState$3(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return { value: undefined, done: true };
	  point = charAt(string, index);
	  state.index += point.length;
	  return { value: point, done: false };
	});

	// TODO: Remove from `core-js@4` since it's moved to entry points







	var SPECIES$6 = wellKnownSymbol('species');

	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
	  // #replace needs built-in support for named groups.
	  // #match works fine because it just return the exec results, even if it has
	  // a "grops" property.
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  return ''.replace(re, '$<a>') !== '7';
	});

	// IE <= 11 replaces $0 with the whole match, as if it was $&
	// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
	var REPLACE_KEEPS_$0 = (function () {
	  return 'a'.replace(/./, '$0') === '$0';
	})();

	var REPLACE = wellKnownSymbol('replace');
	// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
	var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
	  if (/./[REPLACE]) {
	    return /./[REPLACE]('a', '$0') === '';
	  }
	  return false;
	})();

	// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	// Weex JS has frozen built-in prototypes, so use try / catch wrapper
	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
	});

	var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
	  var SYMBOL = wellKnownSymbol(KEY);

	  var DELEGATES_TO_SYMBOL = !fails(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;

	    if (KEY === 'split') {
	      // We can't use real regex here since it causes deoptimization
	      // and serious performance degradation in V8
	      // https://github.com/zloirock/core-js/issues/306
	      re = {};
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES$6] = function () { return re; };
	      re.flags = '';
	      re[SYMBOL] = /./[SYMBOL];
	    }

	    re.exec = function () { execCalled = true; return null; };

	    re[SYMBOL]('');
	    return !execCalled;
	  });

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    (KEY === 'replace' && !(
	      REPLACE_SUPPORTS_NAMED_GROUPS &&
	      REPLACE_KEEPS_$0 &&
	      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
	    )) ||
	    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
	  ) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      if (regexp.exec === regexpExec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          // The native String method already delegates to @@method (this
	          // polyfilled function), leasing to infinite recursion.
	          // We avoid it by directly calling the native @@method method.
	          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
	        }
	        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
	      }
	      return { done: false };
	    }, {
	      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
	      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
	    });
	    var stringMethod = methods[0];
	    var regexMethod = methods[1];

	    redefine(String.prototype, KEY, stringMethod);
	    redefine(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function (string, arg) { return regexMethod.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function (string) { return regexMethod.call(string, this); }
	    );
	  }

	  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
	};

	var charAt$1 = stringMultibyte.charAt;

	// `AdvanceStringIndex` abstract operation
	// https://tc39.github.io/ecma262/#sec-advancestringindex
	var advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? charAt$1(S, index).length : 1);
	};

	// `RegExpExec` abstract operation
	// https://tc39.github.io/ecma262/#sec-regexpexec
	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);
	    if (typeof result !== 'object') {
	      throw TypeError('RegExp exec method returned something other than an Object or null');
	    }
	    return result;
	  }

	  if (classofRaw(R) !== 'RegExp') {
	    throw TypeError('RegExp#exec called on incompatible receiver');
	  }

	  return regexpExec.call(R, S);
	};

	var max$3 = Math.max;
	var min$3 = Math.min;
	var floor$1 = Math.floor;
	var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};

	// @@replace logic
	fixRegexpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
	  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
	  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
	  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

	  return [
	    // `String.prototype.replace` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = requireObjectCoercible(this);
	      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
	      return replacer !== undefined
	        ? replacer.call(searchValue, O, replaceValue)
	        : nativeReplace.call(String(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
	    function (regexp, replaceValue) {
	      if (
	        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
	        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
	      ) {
	        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
	        if (res.done) return res.value;
	      }

	      var rx = anObject(regexp);
	      var S = String(this);

	      var functionalReplace = typeof replaceValue === 'function';
	      if (!functionalReplace) replaceValue = String(replaceValue);

	      var global = rx.global;
	      if (global) {
	        var fullUnicode = rx.unicode;
	        rx.lastIndex = 0;
	      }
	      var results = [];
	      while (true) {
	        var result = regexpExecAbstract(rx, S);
	        if (result === null) break;

	        results.push(result);
	        if (!global) break;

	        var matchStr = String(result[0]);
	        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
	      }

	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];

	        var matched = String(result[0]);
	        var position = max$3(min$3(toInteger(result.index), S.length), 0);
	        var captures = [];
	        // NOTE: This is equivalent to
	        //   captures = result.slice(1).map(maybeToString)
	        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
	        var namedCaptures = result.groups;
	        if (functionalReplace) {
	          var replacerArgs = [matched].concat(captures, position, S);
	          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
	          var replacement = String(replaceValue.apply(undefined, replacerArgs));
	        } else {
	          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	        }
	        if (position >= nextSourcePosition) {
	          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
	          nextSourcePosition = position + matched.length;
	        }
	      }
	      return accumulatedResult + S.slice(nextSourcePosition);
	    }
	  ];

	  // https://tc39.github.io/ecma262/#sec-getsubstitution
	  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	    var tailPos = position + matched.length;
	    var m = captures.length;
	    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	    if (namedCaptures !== undefined) {
	      namedCaptures = toObject(namedCaptures);
	      symbols = SUBSTITUTION_SYMBOLS;
	    }
	    return nativeReplace.call(replacement, symbols, function (match, ch) {
	      var capture;
	      switch (ch.charAt(0)) {
	        case '$': return '$';
	        case '&': return matched;
	        case '`': return str.slice(0, position);
	        case "'": return str.slice(tailPos);
	        case '<':
	          capture = namedCaptures[ch.slice(1, -1)];
	          break;
	        default: // \d\d?
	          var n = +ch;
	          if (n === 0) return match;
	          if (n > m) {
	            var f = floor$1(n / 10);
	            if (f === 0) return match;
	            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
	            return match;
	          }
	          capture = captures[n - 1];
	      }
	      return capture === undefined ? '' : capture;
	    });
	  }
	});

	var MATCH = wellKnownSymbol('match');

	// `IsRegExp` abstract operation
	// https://tc39.github.io/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
	};

	var arrayPush = [].push;
	var min$4 = Math.min;
	var MAX_UINT32 = 0xFFFFFFFF;

	// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
	var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

	// @@split logic
	fixRegexpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
	  var internalSplit;
	  if (
	    'abbc'.split(/(b)*/)[1] == 'c' ||
	    'test'.split(/(?:)/, -1).length != 4 ||
	    'ab'.split(/(?:ab)*/).length != 2 ||
	    '.'.split(/(.?)(.?)/).length != 4 ||
	    '.'.split(/()()/).length > 1 ||
	    ''.split(/.?/).length
	  ) {
	    // based on es5-shim implementation, need to rework it
	    internalSplit = function (separator, limit) {
	      var string = String(requireObjectCoercible(this));
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (separator === undefined) return [string];
	      // If `separator` is not a regex, use native split
	      if (!isRegexp(separator)) {
	        return nativeSplit.call(string, separator, lim);
	      }
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var match, lastIndex, lastLength;
	      while (match = regexpExec.call(separatorCopy, string)) {
	        lastIndex = separatorCopy.lastIndex;
	        if (lastIndex > lastLastIndex) {
	          output.push(string.slice(lastLastIndex, match.index));
	          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
	          lastLength = match[0].length;
	          lastLastIndex = lastIndex;
	          if (output.length >= lim) break;
	        }
	        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
	      }
	      if (lastLastIndex === string.length) {
	        if (lastLength || !separatorCopy.test('')) output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output.length > lim ? output.slice(0, lim) : output;
	    };
	  // Chakra, V8
	  } else if ('0'.split(undefined, 0).length) {
	    internalSplit = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
	    };
	  } else internalSplit = nativeSplit;

	  return [
	    // `String.prototype.split` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.split
	    function split(separator, limit) {
	      var O = requireObjectCoercible(this);
	      var splitter = separator == undefined ? undefined : separator[SPLIT];
	      return splitter !== undefined
	        ? splitter.call(separator, O, limit)
	        : internalSplit.call(String(O), separator, limit);
	    },
	    // `RegExp.prototype[@@split]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
	    //
	    // NOTE: This cannot be properly polyfilled in engines that don't support
	    // the 'y' flag.
	    function (regexp, limit) {
	      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
	      if (res.done) return res.value;

	      var rx = anObject(regexp);
	      var S = String(this);
	      var C = speciesConstructor(rx, RegExp);

	      var unicodeMatching = rx.unicode;
	      var flags = (rx.ignoreCase ? 'i' : '') +
	                  (rx.multiline ? 'm' : '') +
	                  (rx.unicode ? 'u' : '') +
	                  (SUPPORTS_Y ? 'y' : 'g');

	      // ^(? + rx + ) is needed, in combination with some S slicing, to
	      // simulate the 'y' flag.
	      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
	      var p = 0;
	      var q = 0;
	      var A = [];
	      while (q < S.length) {
	        splitter.lastIndex = SUPPORTS_Y ? q : 0;
	        var z = regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
	        var e;
	        if (
	          z === null ||
	          (e = min$4(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
	        ) {
	          q = advanceStringIndex(S, q, unicodeMatching);
	        } else {
	          A.push(S.slice(p, q));
	          if (A.length === lim) return A;
	          for (var i = 1; i <= z.length - 1; i++) {
	            A.push(z[i]);
	            if (A.length === lim) return A;
	          }
	          q = p = e;
	        }
	      }
	      A.push(S.slice(p));
	      return A;
	    }
	  ];
	}, !SUPPORTS_Y);

	var quot = /"/g;

	// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
	// https://tc39.github.io/ecma262/#sec-createhtml
	var createHtml = function (string, tag, attribute, value) {
	  var S = String(requireObjectCoercible(string));
	  var p1 = '<' + tag;
	  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
	  return p1 + '>' + S + '</' + tag + '>';
	};

	// check the existence of a method, lowercase
	// of a tag and escaping quotes in arguments
	var stringHtmlForced = function (METHOD_NAME) {
	  return fails(function () {
	    var test = ''[METHOD_NAME]('"');
	    return test !== test.toLowerCase() || test.split('"').length > 3;
	  });
	};

	// `String.prototype.anchor` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.anchor
	_export({ target: 'String', proto: true, forced: stringHtmlForced('anchor') }, {
	  anchor: function anchor(name) {
	    return createHtml(this, 'a', 'name', name);
	  }
	});

	var ITERATOR$5 = wellKnownSymbol('iterator');
	var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
	var ArrayValues = es_array_iterator.values;

	for (var COLLECTION_NAME$1 in domIterables) {
	  var Collection$1 = global_1[COLLECTION_NAME$1];
	  var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;
	  if (CollectionPrototype$1) {
	    // some Chrome versions have non-configurable methods on DOMTokenList
	    if (CollectionPrototype$1[ITERATOR$5] !== ArrayValues) try {
	      createNonEnumerableProperty(CollectionPrototype$1, ITERATOR$5, ArrayValues);
	    } catch (error) {
	      CollectionPrototype$1[ITERATOR$5] = ArrayValues;
	    }
	    if (!CollectionPrototype$1[TO_STRING_TAG$3]) {
	      createNonEnumerableProperty(CollectionPrototype$1, TO_STRING_TAG$3, COLLECTION_NAME$1);
	    }
	    if (domIterables[COLLECTION_NAME$1]) for (var METHOD_NAME in es_array_iterator) {
	      // some Chrome versions have non-configurable methods on DOMTokenList
	      if (CollectionPrototype$1[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
	        createNonEnumerableProperty(CollectionPrototype$1, METHOD_NAME, es_array_iterator[METHOD_NAME]);
	      } catch (error) {
	        CollectionPrototype$1[METHOD_NAME] = es_array_iterator[METHOD_NAME];
	      }
	    }
	  }
	}

	function _superPropBase(object, property) {
	  while (!Object.prototype.hasOwnProperty.call(object, property)) {
	    object = _getPrototypeOf(object);
	    if (object === null) break;
	  }

	  return object;
	}

	function _get(target, property, receiver) {
	  if (typeof Reflect !== "undefined" && Reflect.get) {
	    _get = Reflect.get;
	  } else {
	    _get = function _get(target, property, receiver) {
	      var base = _superPropBase(target, property);
	      if (!base) return;
	      var desc = Object.getOwnPropertyDescriptor(base, property);

	      if (desc.get) {
	        return desc.get.call(receiver);
	      }

	      return desc.value;
	    };
	  }

	  return _get(target, property, receiver || target);
	}

	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
	}

	function _iterableToArray(iter) {
	  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
	}

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	function _toConsumableArray(arr) {
	  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

	function noop() {}

	function assign(tar, src) {
	  // @ts-ignore
	  for (var k in src) {
	    tar[k] = src[k];
	  }

	  return tar;
	}

	function add_location(element, file, line, column, char) {
	  element.__svelte_meta = {
	    loc: {
	      file: file,
	      line: line,
	      column: column,
	      char: char
	    }
	  };
	}

	function run$1(fn) {
	  return fn();
	}

	function blank_object() {
	  return Object.create(null);
	}

	function run_all(fns) {
	  fns.forEach(run$1);
	}

	function is_function(thing) {
	  return typeof thing === 'function';
	}

	function safe_not_equal(a, b) {
	  return a != a ? b == b : a !== b || a && _typeof(a) === 'object' || typeof a === 'function';
	}

	function validate_store(store, name) {
	  if (store != null && typeof store.subscribe !== 'function') {
	    throw new Error("'".concat(name, "' is not a store with a 'subscribe' method"));
	  }
	}

	function subscribe(store) {
	  if (store == null) {
	    return noop;
	  }

	  for (var _len = arguments.length, callbacks = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    callbacks[_key - 1] = arguments[_key];
	  }

	  var unsub = store.subscribe.apply(store, callbacks);
	  return unsub.unsubscribe ? function () {
	    return unsub.unsubscribe();
	  } : unsub;
	}

	function get_store_value(store) {
	  var value;
	  subscribe(store, function (_) {
	    return value = _;
	  })();
	  return value;
	}

	function component_subscribe(component, store, callback) {
	  component.$$.on_destroy.push(subscribe(store, callback));
	}

	function create_slot(definition, ctx, $$scope, fn) {
	  if (definition) {
	    var slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
	    return definition[0](slot_ctx);
	  }
	}

	function get_slot_context(definition, ctx, $$scope, fn) {
	  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
	}

	function get_slot_changes(definition, $$scope, dirty, fn) {
	  if (definition[2] && fn) {
	    var lets = definition[2](fn(dirty));

	    if ($$scope.dirty === undefined) {
	      return lets;
	    }

	    if (_typeof(lets) === 'object') {
	      var merged = [];
	      var len = Math.max($$scope.dirty.length, lets.length);

	      for (var i = 0; i < len; i += 1) {
	        merged[i] = $$scope.dirty[i] | lets[i];
	      }

	      return merged;
	    }

	    return $$scope.dirty | lets;
	  }

	  return $$scope.dirty;
	}

	function exclude_internal_props(props) {
	  var result = {};

	  for (var k in props) {
	    if (k[0] !== '$') result[k] = props[k];
	  }

	  return result;
	}

	function append(target, node) {
	  target.appendChild(node);
	}

	function insert(target, node, anchor) {
	  target.insertBefore(node, anchor || null);
	}

	function detach(node) {
	  node.parentNode.removeChild(node);
	}

	function destroy_each(iterations, detaching) {
	  for (var i = 0; i < iterations.length; i += 1) {
	    if (iterations[i]) iterations[i].d(detaching);
	  }
	}

	function element(name) {
	  return document.createElement(name);
	}

	function text(data) {
	  return document.createTextNode(data);
	}

	function space() {
	  return text(' ');
	}

	function empty() {
	  return text('');
	}

	function listen(node, event, handler, options) {
	  node.addEventListener(event, handler, options);
	  return function () {
	    return node.removeEventListener(event, handler, options);
	  };
	}

	function attr(node, attribute, value) {
	  if (value == null) node.removeAttribute(attribute);else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
	}

	function set_attributes(node, attributes) {
	  // @ts-ignore
	  var descriptors = Object.getOwnPropertyDescriptors(node.__proto__);

	  for (var key in attributes) {
	    if (attributes[key] == null) {
	      node.removeAttribute(key);
	    } else if (key === 'style') {
	      node.style.cssText = attributes[key];
	    } else if (key === '__value' || descriptors[key] && descriptors[key].set) {
	      node[key] = attributes[key];
	    } else {
	      attr(node, key, attributes[key]);
	    }
	  }
	}

	function children(element) {
	  return Array.from(element.childNodes);
	}

	function set_style(node, key, value, important) {
	  node.style.setProperty(key, value, important ? 'important' : '');
	}

	function custom_event(type, detail) {
	  var e = document.createEvent('CustomEvent');
	  e.initCustomEvent(type, false, false, detail);
	  return e;
	}

	var current_component;

	function set_current_component(component) {
	  current_component = component;
	}

	function get_current_component() {
	  if (!current_component) throw new Error("Function called outside component initialization");
	  return current_component;
	}

	function onMount(fn) {
	  get_current_component().$$.on_mount.push(fn);
	}

	function onDestroy(fn) {
	  get_current_component().$$.on_destroy.push(fn);
	}

	function createEventDispatcher() {
	  var component = get_current_component();
	  return function (type, detail) {
	    var callbacks = component.$$.callbacks[type];

	    if (callbacks) {
	      // TODO are there situations where events could be dispatched
	      // in a server (non-DOM) environment?
	      var event = custom_event(type, detail);
	      callbacks.slice().forEach(function (fn) {
	        fn.call(component, event);
	      });
	    }
	  };
	}

	function setContext(key, context) {
	  get_current_component().$$.context.set(key, context);
	}

	function getContext(key) {
	  return get_current_component().$$.context.get(key);
	} // TODO figure out if we still want to support

	var dirty_components = [];
	var binding_callbacks = [];
	var render_callbacks = [];
	var flush_callbacks = [];
	var resolved_promise = Promise.resolve();
	var update_scheduled = false;

	function schedule_update() {
	  if (!update_scheduled) {
	    update_scheduled = true;
	    resolved_promise.then(flush$1);
	  }
	}

	function add_render_callback(fn) {
	  render_callbacks.push(fn);
	}

	var flushing = false;
	var seen_callbacks = new Set();

	function flush$1() {
	  if (flushing) return;
	  flushing = true;

	  do {
	    // first, call beforeUpdate functions
	    // and update components
	    for (var i = 0; i < dirty_components.length; i += 1) {
	      var component = dirty_components[i];
	      set_current_component(component);
	      update(component.$$);
	    }

	    dirty_components.length = 0;

	    while (binding_callbacks.length) {
	      binding_callbacks.pop()();
	    } // then, once components are updated, call
	    // afterUpdate functions. This may cause
	    // subsequent updates...


	    for (var _i = 0; _i < render_callbacks.length; _i += 1) {
	      var callback = render_callbacks[_i];

	      if (!seen_callbacks.has(callback)) {
	        // ...so guard against infinite loops
	        seen_callbacks.add(callback);
	        callback();
	      }
	    }

	    render_callbacks.length = 0;
	  } while (dirty_components.length);

	  while (flush_callbacks.length) {
	    flush_callbacks.pop()();
	  }

	  update_scheduled = false;
	  flushing = false;
	  seen_callbacks.clear();
	}

	function update($$) {
	  if ($$.fragment !== null) {
	    $$.update();
	    run_all($$.before_update);
	    var dirty = $$.dirty;
	    $$.dirty = [-1];
	    $$.fragment && $$.fragment.p($$.ctx, dirty);
	    $$.after_update.forEach(add_render_callback);
	  }
	}

	var outroing = new Set();
	var outros;

	function group_outros() {
	  outros = {
	    r: 0,
	    c: [],
	    p: outros // parent group

	  };
	}

	function check_outros() {
	  if (!outros.r) {
	    run_all(outros.c);
	  }

	  outros = outros.p;
	}

	function transition_in(block, local) {
	  if (block && block.i) {
	    outroing.delete(block);
	    block.i(local);
	  }
	}

	function transition_out(block, local, detach, callback) {
	  if (block && block.o) {
	    if (outroing.has(block)) return;
	    outroing.add(block);
	    outros.c.push(function () {
	      outroing.delete(block);

	      if (callback) {
	        if (detach) block.d(1);
	        callback();
	      }
	    });
	    block.o(local);
	  }
	}

	var globals = typeof window !== 'undefined' ? window : global;

	function outro_and_destroy_block(block, lookup) {
	  transition_out(block, 1, 1, function () {
	    lookup.delete(block.key);
	  });
	}

	function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
	  var o = old_blocks.length;
	  var n = list.length;
	  var i = o;
	  var old_indexes = {};

	  while (i--) {
	    old_indexes[old_blocks[i].key] = i;
	  }

	  var new_blocks = [];
	  var new_lookup = new Map();
	  var deltas = new Map();
	  i = n;

	  while (i--) {
	    var child_ctx = get_context(ctx, list, i);
	    var key = get_key(child_ctx);
	    var block = lookup.get(key);

	    if (!block) {
	      block = create_each_block(key, child_ctx);
	      block.c();
	    } else if (dynamic) {
	      block.p(child_ctx, dirty);
	    }

	    new_lookup.set(key, new_blocks[i] = block);
	    if (key in old_indexes) deltas.set(key, Math.abs(i - old_indexes[key]));
	  }

	  var will_move = new Set();
	  var did_move = new Set();

	  function insert(block) {
	    transition_in(block, 1);
	    block.m(node, next, lookup.has(block.key));
	    lookup.set(block.key, block);
	    next = block.first;
	    n--;
	  }

	  while (o && n) {
	    var new_block = new_blocks[n - 1];
	    var old_block = old_blocks[o - 1];
	    var new_key = new_block.key;
	    var old_key = old_block.key;

	    if (new_block === old_block) {
	      // do nothing
	      next = new_block.first;
	      o--;
	      n--;
	    } else if (!new_lookup.has(old_key)) {
	      // remove old block
	      destroy(old_block, lookup);
	      o--;
	    } else if (!lookup.has(new_key) || will_move.has(new_key)) {
	      insert(new_block);
	    } else if (did_move.has(old_key)) {
	      o--;
	    } else if (deltas.get(new_key) > deltas.get(old_key)) {
	      did_move.add(new_key);
	      insert(new_block);
	    } else {
	      will_move.add(old_key);
	      o--;
	    }
	  }

	  while (o--) {
	    var _old_block = old_blocks[o];
	    if (!new_lookup.has(_old_block.key)) destroy(_old_block, lookup);
	  }

	  while (n) {
	    insert(new_blocks[n - 1]);
	  }

	  return new_blocks;
	}

	function validate_each_keys(ctx, list, get_context, get_key) {
	  var keys = new Set();

	  for (var i = 0; i < list.length; i++) {
	    var key = get_key(get_context(ctx, list, i));

	    if (keys.has(key)) {
	      throw new Error("Cannot have duplicate keys in a keyed each");
	    }

	    keys.add(key);
	  }
	}

	function get_spread_update(levels, updates) {
	  var update = {};
	  var to_null_out = {};
	  var accounted_for = {
	    $$scope: 1
	  };
	  var i = levels.length;

	  while (i--) {
	    var o = levels[i];
	    var n = updates[i];

	    if (n) {
	      for (var key in o) {
	        if (!(key in n)) to_null_out[key] = 1;
	      }

	      for (var _key3 in n) {
	        if (!accounted_for[_key3]) {
	          update[_key3] = n[_key3];
	          accounted_for[_key3] = 1;
	        }
	      }

	      levels[i] = n;
	    } else {
	      for (var _key4 in o) {
	        accounted_for[_key4] = 1;
	      }
	    }
	  }

	  for (var _key5 in to_null_out) {
	    if (!(_key5 in update)) update[_key5] = undefined;
	  }

	  return update;
	}

	function get_spread_object(spread_props) {
	  return _typeof(spread_props) === 'object' && spread_props !== null ? spread_props : {};
	} // source: https://html.spec.whatwg.org/multipage/indices.html

	function create_component(block) {
	  block && block.c();
	}

	function mount_component(component, target, anchor) {
	  var _component$$$ = component.$$,
	      fragment = _component$$$.fragment,
	      on_mount = _component$$$.on_mount,
	      on_destroy = _component$$$.on_destroy,
	      after_update = _component$$$.after_update;
	  fragment && fragment.m(target, anchor); // onMount happens before the initial afterUpdate

	  add_render_callback(function () {
	    var new_on_destroy = on_mount.map(run$1).filter(is_function);

	    if (on_destroy) {
	      on_destroy.push.apply(on_destroy, _toConsumableArray(new_on_destroy));
	    } else {
	      // Edge case - component was destroyed immediately,
	      // most likely as a result of a binding initialising
	      run_all(new_on_destroy);
	    }

	    component.$$.on_mount = [];
	  });
	  after_update.forEach(add_render_callback);
	}

	function destroy_component(component, detaching) {
	  var $$ = component.$$;

	  if ($$.fragment !== null) {
	    run_all($$.on_destroy);
	    $$.fragment && $$.fragment.d(detaching); // TODO null out other refs, including component.$$ (but need to
	    // preserve final state?)

	    $$.on_destroy = $$.fragment = null;
	    $$.ctx = [];
	  }
	}

	function make_dirty(component, i) {
	  if (component.$$.dirty[0] === -1) {
	    dirty_components.push(component);
	    schedule_update();
	    component.$$.dirty.fill(0);
	  }

	  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
	}

	function init(component, options, instance, create_fragment, not_equal, props) {
	  var dirty = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [-1];
	  var parent_component = current_component;
	  set_current_component(component);
	  var prop_values = options.props || {};
	  var $$ = component.$$ = {
	    fragment: null,
	    ctx: null,
	    // state
	    props: props,
	    update: noop,
	    not_equal: not_equal,
	    bound: blank_object(),
	    // lifecycle
	    on_mount: [],
	    on_destroy: [],
	    before_update: [],
	    after_update: [],
	    context: new Map(parent_component ? parent_component.$$.context : []),
	    // everything else
	    callbacks: blank_object(),
	    dirty: dirty
	  };
	  var ready = false;
	  $$.ctx = instance ? instance(component, prop_values, function (i, ret) {
	    var value = (arguments.length <= 2 ? 0 : arguments.length - 2) ? arguments.length <= 2 ? undefined : arguments[2] : ret;

	    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
	      if ($$.bound[i]) $$.bound[i](value);
	      if (ready) make_dirty(component, i);
	    }

	    return ret;
	  }) : [];
	  $$.update();
	  ready = true;
	  run_all($$.before_update); // `false` as a special case of no DOM component

	  $$.fragment = create_fragment ? create_fragment($$.ctx) : false;

	  if (options.target) {
	    if (options.hydrate) {
	      var nodes = children(options.target); // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

	      $$.fragment && $$.fragment.l(nodes);
	      nodes.forEach(detach);
	    } else {
	      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	      $$.fragment && $$.fragment.c();
	    }

	    if (options.intro) transition_in(component.$$.fragment);
	    mount_component(component, options.target, options.anchor);
	    flush$1();
	  }

	  set_current_component(parent_component);
	}

	var SvelteComponent = /*#__PURE__*/function () {
	  function SvelteComponent() {
	    _classCallCheck(this, SvelteComponent);
	  }

	  _createClass(SvelteComponent, [{
	    key: "$destroy",
	    value: function $destroy() {
	      destroy_component(this, 1);
	      this.$destroy = noop;
	    }
	  }, {
	    key: "$on",
	    value: function $on(type, callback) {
	      var callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
	      callbacks.push(callback);
	      return function () {
	        var index = callbacks.indexOf(callback);
	        if (index !== -1) callbacks.splice(index, 1);
	      };
	    }
	  }, {
	    key: "$set",
	    value: function $set() {// overridden by instance, if it has props
	    }
	  }]);

	  return SvelteComponent;
	}();

	function dispatch_dev(type, detail) {
	  document.dispatchEvent(custom_event(type, Object.assign({
	    version: '3.20.1'
	  }, detail)));
	}

	function append_dev(target, node) {
	  dispatch_dev("SvelteDOMInsert", {
	    target: target,
	    node: node
	  });
	  append(target, node);
	}

	function insert_dev(target, node, anchor) {
	  dispatch_dev("SvelteDOMInsert", {
	    target: target,
	    node: node,
	    anchor: anchor
	  });
	  insert(target, node, anchor);
	}

	function detach_dev(node) {
	  dispatch_dev("SvelteDOMRemove", {
	    node: node
	  });
	  detach(node);
	}

	function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
	  var modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
	  if (has_prevent_default) modifiers.push('preventDefault');
	  if (has_stop_propagation) modifiers.push('stopPropagation');
	  dispatch_dev("SvelteDOMAddEventListener", {
	    node: node,
	    event: event,
	    handler: handler,
	    modifiers: modifiers
	  });
	  var dispose = listen(node, event, handler, options);
	  return function () {
	    dispatch_dev("SvelteDOMRemoveEventListener", {
	      node: node,
	      event: event,
	      handler: handler,
	      modifiers: modifiers
	    });
	    dispose();
	  };
	}

	function attr_dev(node, attribute, value) {
	  attr(node, attribute, value);
	  if (value == null) dispatch_dev("SvelteDOMRemoveAttribute", {
	    node: node,
	    attribute: attribute
	  });else dispatch_dev("SvelteDOMSetAttribute", {
	    node: node,
	    attribute: attribute,
	    value: value
	  });
	}

	function set_data_dev(text, data) {
	  data = '' + data;
	  if (text.data === data) return;
	  dispatch_dev("SvelteDOMSetData", {
	    node: text,
	    data: data
	  });
	  text.data = data;
	}

	function validate_each_argument(arg) {
	  if (typeof arg !== 'string' && !(arg && _typeof(arg) === 'object' && 'length' in arg)) {
	    var msg = '{#each} only iterates over array-like objects.';

	    if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
	      msg += ' You can use a spread to convert this iterable into an array.';
	    }

	    throw new Error(msg);
	  }
	}

	function validate_slots(name, slot, keys) {
	  for (var _i2 = 0, _Object$keys = Object.keys(slot); _i2 < _Object$keys.length; _i2++) {
	    var slot_key = _Object$keys[_i2];

	    if (!~keys.indexOf(slot_key)) {
	      console.warn("<".concat(name, "> received an unexpected slot \"").concat(slot_key, "\"."));
	    }
	  }
	}

	var SvelteComponentDev = /*#__PURE__*/function (_SvelteComponent) {
	  _inherits(SvelteComponentDev, _SvelteComponent);

	  var _super2 = _createSuper(SvelteComponentDev);

	  function SvelteComponentDev(options) {
	    _classCallCheck(this, SvelteComponentDev);

	    if (!options || !options.target && !options.$$inline) {
	      throw new Error("'target' is a required option");
	    }

	    return _super2.call(this);
	  }

	  _createClass(SvelteComponentDev, [{
	    key: "$destroy",
	    value: function $destroy() {
	      _get(_getPrototypeOf(SvelteComponentDev.prototype), "$destroy", this).call(this);

	      this.$destroy = function () {
	        console.warn("Component was already destroyed"); // eslint-disable-line no-console
	      };
	    }
	  }, {
	    key: "$capture_state",
	    value: function $capture_state() {}
	  }, {
	    key: "$inject_state",
	    value: function $inject_state() {}
	  }]);

	  return SvelteComponentDev;
	}(SvelteComponent);

	var $every = arrayIteration.every;



	var STRICT_METHOD$3 = arrayMethodIsStrict('every');
	var USES_TO_LENGTH$6 = arrayMethodUsesToLength('every');

	// `Array.prototype.every` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.every
	_export({ target: 'Array', proto: true, forced: !STRICT_METHOD$3 || !USES_TO_LENGTH$6 }, {
	  every: function every(callbackfn /* , thisArg */) {
	    return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var $find = arrayIteration.find;



	var FIND = 'find';
	var SKIPS_HOLES = true;

	var USES_TO_LENGTH$7 = arrayMethodUsesToLength(FIND);

	// Shouldn't skip holes
	if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

	// `Array.prototype.find` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.find
	_export({ target: 'Array', proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH$7 }, {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables(FIND);

	// `Array.prototype.{ reduce, reduceRight }` methods implementation
	var createMethod$3 = function (IS_RIGHT) {
	  return function (that, callbackfn, argumentsLength, memo) {
	    aFunction$1(callbackfn);
	    var O = toObject(that);
	    var self = indexedObject(O);
	    var length = toLength(O.length);
	    var index = IS_RIGHT ? length - 1 : 0;
	    var i = IS_RIGHT ? -1 : 1;
	    if (argumentsLength < 2) while (true) {
	      if (index in self) {
	        memo = self[index];
	        index += i;
	        break;
	      }
	      index += i;
	      if (IS_RIGHT ? index < 0 : length <= index) {
	        throw TypeError('Reduce of empty array with no initial value');
	      }
	    }
	    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
	      memo = callbackfn(memo, self[index], index, O);
	    }
	    return memo;
	  };
	};

	var arrayReduce = {
	  // `Array.prototype.reduce` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
	  left: createMethod$3(false),
	  // `Array.prototype.reduceRight` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
	  right: createMethod$3(true)
	};

	var $reduce = arrayReduce.left;



	var STRICT_METHOD$4 = arrayMethodIsStrict('reduce');
	var USES_TO_LENGTH$8 = arrayMethodUsesToLength('reduce', { 1: 0 });

	// `Array.prototype.reduce` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
	_export({ target: 'Array', proto: true, forced: !STRICT_METHOD$4 || !USES_TO_LENGTH$8 }, {
	  reduce: function reduce(callbackfn /* , initialValue */) {
	    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var $some = arrayIteration.some;



	var STRICT_METHOD$5 = arrayMethodIsStrict('some');
	var USES_TO_LENGTH$9 = arrayMethodUsesToLength('some');

	// `Array.prototype.some` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.some
	_export({ target: 'Array', proto: true, forced: !STRICT_METHOD$5 || !USES_TO_LENGTH$9 }, {
	  some: function some(callbackfn /* , thisArg */) {
	    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// a string of all valid unicode whitespaces
	// eslint-disable-next-line max-len
	var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var whitespace = '[' + whitespaces + ']';
	var ltrim = RegExp('^' + whitespace + whitespace + '*');
	var rtrim = RegExp(whitespace + whitespace + '*$');

	// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
	var createMethod$4 = function (TYPE) {
	  return function ($this) {
	    var string = String(requireObjectCoercible($this));
	    if (TYPE & 1) string = string.replace(ltrim, '');
	    if (TYPE & 2) string = string.replace(rtrim, '');
	    return string;
	  };
	};

	var stringTrim = {
	  // `String.prototype.{ trimLeft, trimStart }` methods
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
	  start: createMethod$4(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
	  end: createMethod$4(2),
	  // `String.prototype.trim` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
	  trim: createMethod$4(3)
	};

	var getOwnPropertyNames = objectGetOwnPropertyNames.f;
	var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;
	var defineProperty$7 = objectDefineProperty.f;
	var trim = stringTrim.trim;

	var NUMBER = 'Number';
	var NativeNumber = global_1[NUMBER];
	var NumberPrototype = NativeNumber.prototype;

	// Opera ~12 has broken Object#toString
	var BROKEN_CLASSOF = classofRaw(objectCreate(NumberPrototype)) == NUMBER;

	// `ToNumber` abstract operation
	// https://tc39.github.io/ecma262/#sec-tonumber
	var toNumber = function (argument) {
	  var it = toPrimitive(argument, false);
	  var first, third, radix, maxCode, digits, length, index, code;
	  if (typeof it == 'string' && it.length > 2) {
	    it = trim(it);
	    first = it.charCodeAt(0);
	    if (first === 43 || first === 45) {
	      third = it.charCodeAt(2);
	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	      switch (it.charCodeAt(1)) {
	        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
	        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
	        default: return +it;
	      }
	      digits = it.slice(2);
	      length = digits.length;
	      for (index = 0; index < length; index++) {
	        code = digits.charCodeAt(index);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if (code < 48 || code > maxCode) return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};

	// `Number` constructor
	// https://tc39.github.io/ecma262/#sec-number-constructor
	if (isForced_1(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
	  var NumberWrapper = function Number(value) {
	    var it = arguments.length < 1 ? 0 : value;
	    var dummy = this;
	    return dummy instanceof NumberWrapper
	      // check on 1..constructor(foo) case
	      && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classofRaw(dummy) != NUMBER)
	        ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
	  };
	  for (var keys$1 = descriptors ? getOwnPropertyNames(NativeNumber) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES2015 (in case, if modules with ES2015 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	  ).split(','), j = 0, key; keys$1.length > j; j++) {
	    if (has(NativeNumber, key = keys$1[j]) && !has(NumberWrapper, key)) {
	      defineProperty$7(NumberWrapper, key, getOwnPropertyDescriptor$3(NativeNumber, key));
	    }
	  }
	  NumberWrapper.prototype = NumberPrototype;
	  NumberPrototype.constructor = NumberWrapper;
	  redefine(global_1, NUMBER, NumberWrapper);
	}

	var nativeGetOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;


	var FAILS_ON_PRIMITIVES$1 = fails(function () { nativeGetOwnPropertyDescriptor$2(1); });
	var FORCED$3 = !descriptors || FAILS_ON_PRIMITIVES$1;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
	_export({ target: 'Object', stat: true, forced: FORCED$3, sham: !descriptors }, {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
	    return nativeGetOwnPropertyDescriptor$2(toIndexedObject(it), key);
	  }
	});

	var FAILS_ON_PRIMITIVES$2 = fails(function () { objectGetPrototypeOf(1); });

	// `Object.getPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.getprototypeof
	_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$2, sham: !correctPrototypeGetter }, {
	  getPrototypeOf: function getPrototypeOf(it) {
	    return objectGetPrototypeOf(toObject(it));
	  }
	});

	var defineProperty$8 = objectDefineProperty.f;
	var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;





	var setInternalState$5 = internalState.set;



	var MATCH$1 = wellKnownSymbol('match');
	var NativeRegExp = global_1.RegExp;
	var RegExpPrototype$1 = NativeRegExp.prototype;
	var re1 = /a/g;
	var re2 = /a/g;

	// "new" should create a new object, old webkit bug
	var CORRECT_NEW = new NativeRegExp(re1) !== re1;

	var UNSUPPORTED_Y$2 = regexpStickyHelpers.UNSUPPORTED_Y;

	var FORCED$4 = descriptors && isForced_1('RegExp', (!CORRECT_NEW || UNSUPPORTED_Y$2 || fails(function () {
	  re2[MATCH$1] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
	})));

	// `RegExp` constructor
	// https://tc39.github.io/ecma262/#sec-regexp-constructor
	if (FORCED$4) {
	  var RegExpWrapper = function RegExp(pattern, flags) {
	    var thisIsRegExp = this instanceof RegExpWrapper;
	    var patternIsRegExp = isRegexp(pattern);
	    var flagsAreUndefined = flags === undefined;
	    var sticky;

	    if (!thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined) {
	      return pattern;
	    }

	    if (CORRECT_NEW) {
	      if (patternIsRegExp && !flagsAreUndefined) pattern = pattern.source;
	    } else if (pattern instanceof RegExpWrapper) {
	      if (flagsAreUndefined) flags = regexpFlags.call(pattern);
	      pattern = pattern.source;
	    }

	    if (UNSUPPORTED_Y$2) {
	      sticky = !!flags && flags.indexOf('y') > -1;
	      if (sticky) flags = flags.replace(/y/g, '');
	    }

	    var result = inheritIfRequired(
	      CORRECT_NEW ? new NativeRegExp(pattern, flags) : NativeRegExp(pattern, flags),
	      thisIsRegExp ? this : RegExpPrototype$1,
	      RegExpWrapper
	    );

	    if (UNSUPPORTED_Y$2 && sticky) setInternalState$5(result, { sticky: sticky });

	    return result;
	  };
	  var proxy = function (key) {
	    key in RegExpWrapper || defineProperty$8(RegExpWrapper, key, {
	      configurable: true,
	      get: function () { return NativeRegExp[key]; },
	      set: function (it) { NativeRegExp[key] = it; }
	    });
	  };
	  var keys$2 = getOwnPropertyNames$1(NativeRegExp);
	  var index = 0;
	  while (keys$2.length > index) proxy(keys$2[index++]);
	  RegExpPrototype$1.constructor = RegExpWrapper;
	  RegExpWrapper.prototype = RegExpPrototype$1;
	  redefine(global_1, 'RegExp', RegExpWrapper);
	}

	// https://tc39.github.io/ecma262/#sec-get-regexp-@@species
	setSpecies('RegExp');

	// @@match logic
	fixRegexpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
	  return [
	    // `String.prototype.match` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.match
	    function match(regexp) {
	      var O = requireObjectCoercible(this);
	      var matcher = regexp == undefined ? undefined : regexp[MATCH];
	      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	    },
	    // `RegExp.prototype[@@match]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
	    function (regexp) {
	      var res = maybeCallNative(nativeMatch, regexp, this);
	      if (res.done) return res.value;

	      var rx = anObject(regexp);
	      var S = String(this);

	      if (!rx.global) return regexpExecAbstract(rx, S);

	      var fullUnicode = rx.unicode;
	      rx.lastIndex = 0;
	      var A = [];
	      var n = 0;
	      var result;
	      while ((result = regexpExecAbstract(rx, S)) !== null) {
	        var matchStr = String(result[0]);
	        A[n] = matchStr;
	        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
	        n++;
	      }
	      return n === 0 ? null : A;
	    }
	  ];
	});

	var non = '\u200B\u0085\u180E';

	// check that a method works with the correct list
	// of whitespaces and has a correct name
	var stringTrimForced = function (METHOD_NAME) {
	  return fails(function () {
	    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
	  });
	};

	var $trim = stringTrim.trim;


	// `String.prototype.trim` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.trim
	_export({ target: 'String', proto: true, forced: stringTrimForced('trim') }, {
	  trim: function trim() {
	    return $trim(this);
	  }
	});

	var arrayBufferNative = typeof ArrayBuffer !== 'undefined' && typeof DataView !== 'undefined';

	var defineProperty$9 = objectDefineProperty.f;





	var Int8Array$1 = global_1.Int8Array;
	var Int8ArrayPrototype = Int8Array$1 && Int8Array$1.prototype;
	var Uint8ClampedArray = global_1.Uint8ClampedArray;
	var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
	var TypedArray = Int8Array$1 && objectGetPrototypeOf(Int8Array$1);
	var TypedArrayPrototype = Int8ArrayPrototype && objectGetPrototypeOf(Int8ArrayPrototype);
	var ObjectPrototype$2 = Object.prototype;
	var isPrototypeOf = ObjectPrototype$2.isPrototypeOf;

	var TO_STRING_TAG$4 = wellKnownSymbol('toStringTag');
	var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');
	// Fixing native typed arrays in Opera Presto crashes the browser, see #595
	var NATIVE_ARRAY_BUFFER_VIEWS = arrayBufferNative && !!objectSetPrototypeOf && classof(global_1.opera) !== 'Opera';
	var TYPED_ARRAY_TAG_REQIRED = false;
	var NAME$1;

	var TypedArrayConstructorsList = {
	  Int8Array: 1,
	  Uint8Array: 1,
	  Uint8ClampedArray: 1,
	  Int16Array: 2,
	  Uint16Array: 2,
	  Int32Array: 4,
	  Uint32Array: 4,
	  Float32Array: 4,
	  Float64Array: 8
	};

	var isView = function isView(it) {
	  var klass = classof(it);
	  return klass === 'DataView' || has(TypedArrayConstructorsList, klass);
	};

	var isTypedArray = function (it) {
	  return isObject(it) && has(TypedArrayConstructorsList, classof(it));
	};

	var aTypedArray = function (it) {
	  if (isTypedArray(it)) return it;
	  throw TypeError('Target is not a typed array');
	};

	var aTypedArrayConstructor = function (C) {
	  if (objectSetPrototypeOf) {
	    if (isPrototypeOf.call(TypedArray, C)) return C;
	  } else for (var ARRAY in TypedArrayConstructorsList) if (has(TypedArrayConstructorsList, NAME$1)) {
	    var TypedArrayConstructor = global_1[ARRAY];
	    if (TypedArrayConstructor && (C === TypedArrayConstructor || isPrototypeOf.call(TypedArrayConstructor, C))) {
	      return C;
	    }
	  } throw TypeError('Target is not a typed array constructor');
	};

	var exportTypedArrayMethod = function (KEY, property, forced) {
	  if (!descriptors) return;
	  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
	    var TypedArrayConstructor = global_1[ARRAY];
	    if (TypedArrayConstructor && has(TypedArrayConstructor.prototype, KEY)) {
	      delete TypedArrayConstructor.prototype[KEY];
	    }
	  }
	  if (!TypedArrayPrototype[KEY] || forced) {
	    redefine(TypedArrayPrototype, KEY, forced ? property
	      : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property);
	  }
	};

	var exportTypedArrayStaticMethod = function (KEY, property, forced) {
	  var ARRAY, TypedArrayConstructor;
	  if (!descriptors) return;
	  if (objectSetPrototypeOf) {
	    if (forced) for (ARRAY in TypedArrayConstructorsList) {
	      TypedArrayConstructor = global_1[ARRAY];
	      if (TypedArrayConstructor && has(TypedArrayConstructor, KEY)) {
	        delete TypedArrayConstructor[KEY];
	      }
	    }
	    if (!TypedArray[KEY] || forced) {
	      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
	      try {
	        return redefine(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && Int8Array$1[KEY] || property);
	      } catch (error) { /* empty */ }
	    } else return;
	  }
	  for (ARRAY in TypedArrayConstructorsList) {
	    TypedArrayConstructor = global_1[ARRAY];
	    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
	      redefine(TypedArrayConstructor, KEY, property);
	    }
	  }
	};

	for (NAME$1 in TypedArrayConstructorsList) {
	  if (!global_1[NAME$1]) NATIVE_ARRAY_BUFFER_VIEWS = false;
	}

	// WebKit bug - typed arrays constructors prototype is Object.prototype
	if (!NATIVE_ARRAY_BUFFER_VIEWS || typeof TypedArray != 'function' || TypedArray === Function.prototype) {
	  // eslint-disable-next-line no-shadow
	  TypedArray = function TypedArray() {
	    throw TypeError('Incorrect invocation');
	  };
	  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME$1 in TypedArrayConstructorsList) {
	    if (global_1[NAME$1]) objectSetPrototypeOf(global_1[NAME$1], TypedArray);
	  }
	}

	if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype$2) {
	  TypedArrayPrototype = TypedArray.prototype;
	  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME$1 in TypedArrayConstructorsList) {
	    if (global_1[NAME$1]) objectSetPrototypeOf(global_1[NAME$1].prototype, TypedArrayPrototype);
	  }
	}

	// WebKit bug - one more object in Uint8ClampedArray prototype chain
	if (NATIVE_ARRAY_BUFFER_VIEWS && objectGetPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
	  objectSetPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
	}

	if (descriptors && !has(TypedArrayPrototype, TO_STRING_TAG$4)) {
	  TYPED_ARRAY_TAG_REQIRED = true;
	  defineProperty$9(TypedArrayPrototype, TO_STRING_TAG$4, { get: function () {
	    return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
	  } });
	  for (NAME$1 in TypedArrayConstructorsList) if (global_1[NAME$1]) {
	    createNonEnumerableProperty(global_1[NAME$1], TYPED_ARRAY_TAG, NAME$1);
	  }
	}

	var arrayBufferViewCore = {
	  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
	  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQIRED && TYPED_ARRAY_TAG,
	  aTypedArray: aTypedArray,
	  aTypedArrayConstructor: aTypedArrayConstructor,
	  exportTypedArrayMethod: exportTypedArrayMethod,
	  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
	  isView: isView,
	  isTypedArray: isTypedArray,
	  TypedArray: TypedArray,
	  TypedArrayPrototype: TypedArrayPrototype
	};

	/* eslint-disable no-new */



	var NATIVE_ARRAY_BUFFER_VIEWS$1 = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;

	var ArrayBuffer$1 = global_1.ArrayBuffer;
	var Int8Array$2 = global_1.Int8Array;

	var typedArrayConstructorsRequireWrappers = !NATIVE_ARRAY_BUFFER_VIEWS$1 || !fails(function () {
	  Int8Array$2(1);
	}) || !fails(function () {
	  new Int8Array$2(-1);
	}) || !checkCorrectnessOfIteration(function (iterable) {
	  new Int8Array$2();
	  new Int8Array$2(null);
	  new Int8Array$2(1.5);
	  new Int8Array$2(iterable);
	}, true) || fails(function () {
	  // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
	  return new Int8Array$2(new ArrayBuffer$1(2), 1, undefined).length !== 1;
	});

	// `ToIndex` abstract operation
	// https://tc39.github.io/ecma262/#sec-toindex
	var toIndex = function (it) {
	  if (it === undefined) return 0;
	  var number = toInteger(it);
	  var length = toLength(number);
	  if (number !== length) throw RangeError('Wrong length or index');
	  return length;
	};

	// IEEE754 conversions based on https://github.com/feross/ieee754
	// eslint-disable-next-line no-shadow-restricted-names
	var Infinity = 1 / 0;
	var abs = Math.abs;
	var pow = Math.pow;
	var floor$2 = Math.floor;
	var log = Math.log;
	var LN2 = Math.LN2;

	var pack = function (number, mantissaLength, bytes) {
	  var buffer = new Array(bytes);
	  var exponentLength = bytes * 8 - mantissaLength - 1;
	  var eMax = (1 << exponentLength) - 1;
	  var eBias = eMax >> 1;
	  var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
	  var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
	  var index = 0;
	  var exponent, mantissa, c;
	  number = abs(number);
	  // eslint-disable-next-line no-self-compare
	  if (number != number || number === Infinity) {
	    // eslint-disable-next-line no-self-compare
	    mantissa = number != number ? 1 : 0;
	    exponent = eMax;
	  } else {
	    exponent = floor$2(log(number) / LN2);
	    if (number * (c = pow(2, -exponent)) < 1) {
	      exponent--;
	      c *= 2;
	    }
	    if (exponent + eBias >= 1) {
	      number += rt / c;
	    } else {
	      number += rt * pow(2, 1 - eBias);
	    }
	    if (number * c >= 2) {
	      exponent++;
	      c /= 2;
	    }
	    if (exponent + eBias >= eMax) {
	      mantissa = 0;
	      exponent = eMax;
	    } else if (exponent + eBias >= 1) {
	      mantissa = (number * c - 1) * pow(2, mantissaLength);
	      exponent = exponent + eBias;
	    } else {
	      mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
	      exponent = 0;
	    }
	  }
	  for (; mantissaLength >= 8; buffer[index++] = mantissa & 255, mantissa /= 256, mantissaLength -= 8);
	  exponent = exponent << mantissaLength | mantissa;
	  exponentLength += mantissaLength;
	  for (; exponentLength > 0; buffer[index++] = exponent & 255, exponent /= 256, exponentLength -= 8);
	  buffer[--index] |= sign * 128;
	  return buffer;
	};

	var unpack = function (buffer, mantissaLength) {
	  var bytes = buffer.length;
	  var exponentLength = bytes * 8 - mantissaLength - 1;
	  var eMax = (1 << exponentLength) - 1;
	  var eBias = eMax >> 1;
	  var nBits = exponentLength - 7;
	  var index = bytes - 1;
	  var sign = buffer[index--];
	  var exponent = sign & 127;
	  var mantissa;
	  sign >>= 7;
	  for (; nBits > 0; exponent = exponent * 256 + buffer[index], index--, nBits -= 8);
	  mantissa = exponent & (1 << -nBits) - 1;
	  exponent >>= -nBits;
	  nBits += mantissaLength;
	  for (; nBits > 0; mantissa = mantissa * 256 + buffer[index], index--, nBits -= 8);
	  if (exponent === 0) {
	    exponent = 1 - eBias;
	  } else if (exponent === eMax) {
	    return mantissa ? NaN : sign ? -Infinity : Infinity;
	  } else {
	    mantissa = mantissa + pow(2, mantissaLength);
	    exponent = exponent - eBias;
	  } return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
	};

	var ieee754 = {
	  pack: pack,
	  unpack: unpack
	};

	var getOwnPropertyNames$2 = objectGetOwnPropertyNames.f;
	var defineProperty$a = objectDefineProperty.f;




	var getInternalState$4 = internalState.get;
	var setInternalState$6 = internalState.set;
	var ARRAY_BUFFER = 'ArrayBuffer';
	var DATA_VIEW = 'DataView';
	var PROTOTYPE$2 = 'prototype';
	var WRONG_LENGTH = 'Wrong length';
	var WRONG_INDEX = 'Wrong index';
	var NativeArrayBuffer = global_1[ARRAY_BUFFER];
	var $ArrayBuffer = NativeArrayBuffer;
	var $DataView = global_1[DATA_VIEW];
	var $DataViewPrototype = $DataView && $DataView[PROTOTYPE$2];
	var ObjectPrototype$3 = Object.prototype;
	var RangeError$1 = global_1.RangeError;

	var packIEEE754 = ieee754.pack;
	var unpackIEEE754 = ieee754.unpack;

	var packInt8 = function (number) {
	  return [number & 0xFF];
	};

	var packInt16 = function (number) {
	  return [number & 0xFF, number >> 8 & 0xFF];
	};

	var packInt32 = function (number) {
	  return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
	};

	var unpackInt32 = function (buffer) {
	  return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
	};

	var packFloat32 = function (number) {
	  return packIEEE754(number, 23, 4);
	};

	var packFloat64 = function (number) {
	  return packIEEE754(number, 52, 8);
	};

	var addGetter = function (Constructor, key) {
	  defineProperty$a(Constructor[PROTOTYPE$2], key, { get: function () { return getInternalState$4(this)[key]; } });
	};

	var get$1 = function (view, count, index, isLittleEndian) {
	  var intIndex = toIndex(index);
	  var store = getInternalState$4(view);
	  if (intIndex + count > store.byteLength) throw RangeError$1(WRONG_INDEX);
	  var bytes = getInternalState$4(store.buffer).bytes;
	  var start = intIndex + store.byteOffset;
	  var pack = bytes.slice(start, start + count);
	  return isLittleEndian ? pack : pack.reverse();
	};

	var set$2 = function (view, count, index, conversion, value, isLittleEndian) {
	  var intIndex = toIndex(index);
	  var store = getInternalState$4(view);
	  if (intIndex + count > store.byteLength) throw RangeError$1(WRONG_INDEX);
	  var bytes = getInternalState$4(store.buffer).bytes;
	  var start = intIndex + store.byteOffset;
	  var pack = conversion(+value);
	  for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
	};

	if (!arrayBufferNative) {
	  $ArrayBuffer = function ArrayBuffer(length) {
	    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
	    var byteLength = toIndex(length);
	    setInternalState$6(this, {
	      bytes: arrayFill.call(new Array(byteLength), 0),
	      byteLength: byteLength
	    });
	    if (!descriptors) this.byteLength = byteLength;
	  };

	  $DataView = function DataView(buffer, byteOffset, byteLength) {
	    anInstance(this, $DataView, DATA_VIEW);
	    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
	    var bufferLength = getInternalState$4(buffer).byteLength;
	    var offset = toInteger(byteOffset);
	    if (offset < 0 || offset > bufferLength) throw RangeError$1('Wrong offset');
	    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
	    if (offset + byteLength > bufferLength) throw RangeError$1(WRONG_LENGTH);
	    setInternalState$6(this, {
	      buffer: buffer,
	      byteLength: byteLength,
	      byteOffset: offset
	    });
	    if (!descriptors) {
	      this.buffer = buffer;
	      this.byteLength = byteLength;
	      this.byteOffset = offset;
	    }
	  };

	  if (descriptors) {
	    addGetter($ArrayBuffer, 'byteLength');
	    addGetter($DataView, 'buffer');
	    addGetter($DataView, 'byteLength');
	    addGetter($DataView, 'byteOffset');
	  }

	  redefineAll($DataView[PROTOTYPE$2], {
	    getInt8: function getInt8(byteOffset) {
	      return get$1(this, 1, byteOffset)[0] << 24 >> 24;
	    },
	    getUint8: function getUint8(byteOffset) {
	      return get$1(this, 1, byteOffset)[0];
	    },
	    getInt16: function getInt16(byteOffset /* , littleEndian */) {
	      var bytes = get$1(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
	      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
	    },
	    getUint16: function getUint16(byteOffset /* , littleEndian */) {
	      var bytes = get$1(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
	      return bytes[1] << 8 | bytes[0];
	    },
	    getInt32: function getInt32(byteOffset /* , littleEndian */) {
	      return unpackInt32(get$1(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
	    },
	    getUint32: function getUint32(byteOffset /* , littleEndian */) {
	      return unpackInt32(get$1(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
	    },
	    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
	      return unpackIEEE754(get$1(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
	    },
	    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
	      return unpackIEEE754(get$1(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
	    },
	    setInt8: function setInt8(byteOffset, value) {
	      set$2(this, 1, byteOffset, packInt8, value);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      set$2(this, 1, byteOffset, packInt8, value);
	    },
	    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
	      set$2(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
	      set$2(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
	      set$2(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
	      set$2(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
	      set$2(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
	      set$2(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
	    }
	  });
	} else {
	  if (!fails(function () {
	    NativeArrayBuffer(1);
	  }) || !fails(function () {
	    new NativeArrayBuffer(-1); // eslint-disable-line no-new
	  }) || fails(function () {
	    new NativeArrayBuffer(); // eslint-disable-line no-new
	    new NativeArrayBuffer(1.5); // eslint-disable-line no-new
	    new NativeArrayBuffer(NaN); // eslint-disable-line no-new
	    return NativeArrayBuffer.name != ARRAY_BUFFER;
	  })) {
	    $ArrayBuffer = function ArrayBuffer(length) {
	      anInstance(this, $ArrayBuffer);
	      return new NativeArrayBuffer(toIndex(length));
	    };
	    var ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE$2] = NativeArrayBuffer[PROTOTYPE$2];
	    for (var keys$3 = getOwnPropertyNames$2(NativeArrayBuffer), j$1 = 0, key$1; keys$3.length > j$1;) {
	      if (!((key$1 = keys$3[j$1++]) in $ArrayBuffer)) {
	        createNonEnumerableProperty($ArrayBuffer, key$1, NativeArrayBuffer[key$1]);
	      }
	    }
	    ArrayBufferPrototype.constructor = $ArrayBuffer;
	  }

	  // WebKit bug - the same parent prototype for typed arrays and data view
	  if (objectSetPrototypeOf && objectGetPrototypeOf($DataViewPrototype) !== ObjectPrototype$3) {
	    objectSetPrototypeOf($DataViewPrototype, ObjectPrototype$3);
	  }

	  // iOS Safari 7.x bug
	  var testView = new $DataView(new $ArrayBuffer(2));
	  var nativeSetInt8 = $DataViewPrototype.setInt8;
	  testView.setInt8(0, 2147483648);
	  testView.setInt8(1, 2147483649);
	  if (testView.getInt8(0) || !testView.getInt8(1)) redefineAll($DataViewPrototype, {
	    setInt8: function setInt8(byteOffset, value) {
	      nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
	    }
	  }, { unsafe: true });
	}

	setToStringTag($ArrayBuffer, ARRAY_BUFFER);
	setToStringTag($DataView, DATA_VIEW);

	var arrayBuffer = {
	  ArrayBuffer: $ArrayBuffer,
	  DataView: $DataView
	};

	var toPositiveInteger = function (it) {
	  var result = toInteger(it);
	  if (result < 0) throw RangeError("The argument can't be less than 0");
	  return result;
	};

	var toOffset = function (it, BYTES) {
	  var offset = toPositiveInteger(it);
	  if (offset % BYTES) throw RangeError('Wrong offset');
	  return offset;
	};

	var aTypedArrayConstructor$1 = arrayBufferViewCore.aTypedArrayConstructor;

	var typedArrayFrom = function from(source /* , mapfn, thisArg */) {
	  var O = toObject(source);
	  var argumentsLength = arguments.length;
	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
	  var mapping = mapfn !== undefined;
	  var iteratorMethod = getIteratorMethod(O);
	  var i, length, result, step, iterator, next;
	  if (iteratorMethod != undefined && !isArrayIteratorMethod(iteratorMethod)) {
	    iterator = iteratorMethod.call(O);
	    next = iterator.next;
	    O = [];
	    while (!(step = next.call(iterator)).done) {
	      O.push(step.value);
	    }
	  }
	  if (mapping && argumentsLength > 2) {
	    mapfn = functionBindContext(mapfn, arguments[2], 2);
	  }
	  length = toLength(O.length);
	  result = new (aTypedArrayConstructor$1(this))(length);
	  for (i = 0; length > i; i++) {
	    result[i] = mapping ? mapfn(O[i], i) : O[i];
	  }
	  return result;
	};

	var typedArrayConstructor = createCommonjsModule(function (module) {


















	var getOwnPropertyNames = objectGetOwnPropertyNames.f;

	var forEach = arrayIteration.forEach;






	var getInternalState = internalState.get;
	var setInternalState = internalState.set;
	var nativeDefineProperty = objectDefineProperty.f;
	var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	var round = Math.round;
	var RangeError = global_1.RangeError;
	var ArrayBuffer = arrayBuffer.ArrayBuffer;
	var DataView = arrayBuffer.DataView;
	var NATIVE_ARRAY_BUFFER_VIEWS = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
	var TYPED_ARRAY_TAG = arrayBufferViewCore.TYPED_ARRAY_TAG;
	var TypedArray = arrayBufferViewCore.TypedArray;
	var TypedArrayPrototype = arrayBufferViewCore.TypedArrayPrototype;
	var aTypedArrayConstructor = arrayBufferViewCore.aTypedArrayConstructor;
	var isTypedArray = arrayBufferViewCore.isTypedArray;
	var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
	var WRONG_LENGTH = 'Wrong length';

	var fromList = function (C, list) {
	  var index = 0;
	  var length = list.length;
	  var result = new (aTypedArrayConstructor(C))(length);
	  while (length > index) result[index] = list[index++];
	  return result;
	};

	var addGetter = function (it, key) {
	  nativeDefineProperty(it, key, { get: function () {
	    return getInternalState(this)[key];
	  } });
	};

	var isArrayBuffer = function (it) {
	  var klass;
	  return it instanceof ArrayBuffer || (klass = classof(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
	};

	var isTypedArrayIndex = function (target, key) {
	  return isTypedArray(target)
	    && typeof key != 'symbol'
	    && key in target
	    && String(+key) == String(key);
	};

	var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
	  return isTypedArrayIndex(target, key = toPrimitive(key, true))
	    ? createPropertyDescriptor(2, target[key])
	    : nativeGetOwnPropertyDescriptor(target, key);
	};

	var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
	  if (isTypedArrayIndex(target, key = toPrimitive(key, true))
	    && isObject(descriptor)
	    && has(descriptor, 'value')
	    && !has(descriptor, 'get')
	    && !has(descriptor, 'set')
	    // TODO: add validation descriptor w/o calling accessors
	    && !descriptor.configurable
	    && (!has(descriptor, 'writable') || descriptor.writable)
	    && (!has(descriptor, 'enumerable') || descriptor.enumerable)
	  ) {
	    target[key] = descriptor.value;
	    return target;
	  } return nativeDefineProperty(target, key, descriptor);
	};

	if (descriptors) {
	  if (!NATIVE_ARRAY_BUFFER_VIEWS) {
	    objectGetOwnPropertyDescriptor.f = wrappedGetOwnPropertyDescriptor;
	    objectDefineProperty.f = wrappedDefineProperty;
	    addGetter(TypedArrayPrototype, 'buffer');
	    addGetter(TypedArrayPrototype, 'byteOffset');
	    addGetter(TypedArrayPrototype, 'byteLength');
	    addGetter(TypedArrayPrototype, 'length');
	  }

	  _export({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
	    getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
	    defineProperty: wrappedDefineProperty
	  });

	  module.exports = function (TYPE, wrapper, CLAMPED) {
	    var BYTES = TYPE.match(/\d+$/)[0] / 8;
	    var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
	    var GETTER = 'get' + TYPE;
	    var SETTER = 'set' + TYPE;
	    var NativeTypedArrayConstructor = global_1[CONSTRUCTOR_NAME];
	    var TypedArrayConstructor = NativeTypedArrayConstructor;
	    var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
	    var exported = {};

	    var getter = function (that, index) {
	      var data = getInternalState(that);
	      return data.view[GETTER](index * BYTES + data.byteOffset, true);
	    };

	    var setter = function (that, index, value) {
	      var data = getInternalState(that);
	      if (CLAMPED) value = (value = round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
	      data.view[SETTER](index * BYTES + data.byteOffset, value, true);
	    };

	    var addElement = function (that, index) {
	      nativeDefineProperty(that, index, {
	        get: function () {
	          return getter(this, index);
	        },
	        set: function (value) {
	          return setter(this, index, value);
	        },
	        enumerable: true
	      });
	    };

	    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
	      TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
	        anInstance(that, TypedArrayConstructor, CONSTRUCTOR_NAME);
	        var index = 0;
	        var byteOffset = 0;
	        var buffer, byteLength, length;
	        if (!isObject(data)) {
	          length = toIndex(data);
	          byteLength = length * BYTES;
	          buffer = new ArrayBuffer(byteLength);
	        } else if (isArrayBuffer(data)) {
	          buffer = data;
	          byteOffset = toOffset(offset, BYTES);
	          var $len = data.byteLength;
	          if ($length === undefined) {
	            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
	            byteLength = $len - byteOffset;
	            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
	          } else {
	            byteLength = toLength($length) * BYTES;
	            if (byteLength + byteOffset > $len) throw RangeError(WRONG_LENGTH);
	          }
	          length = byteLength / BYTES;
	        } else if (isTypedArray(data)) {
	          return fromList(TypedArrayConstructor, data);
	        } else {
	          return typedArrayFrom.call(TypedArrayConstructor, data);
	        }
	        setInternalState(that, {
	          buffer: buffer,
	          byteOffset: byteOffset,
	          byteLength: byteLength,
	          length: length,
	          view: new DataView(buffer)
	        });
	        while (index < length) addElement(that, index++);
	      });

	      if (objectSetPrototypeOf) objectSetPrototypeOf(TypedArrayConstructor, TypedArray);
	      TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = objectCreate(TypedArrayPrototype);
	    } else if (typedArrayConstructorsRequireWrappers) {
	      TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
	        anInstance(dummy, TypedArrayConstructor, CONSTRUCTOR_NAME);
	        return inheritIfRequired(function () {
	          if (!isObject(data)) return new NativeTypedArrayConstructor(toIndex(data));
	          if (isArrayBuffer(data)) return $length !== undefined
	            ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES), $length)
	            : typedArrayOffset !== undefined
	              ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES))
	              : new NativeTypedArrayConstructor(data);
	          if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
	          return typedArrayFrom.call(TypedArrayConstructor, data);
	        }(), dummy, TypedArrayConstructor);
	      });

	      if (objectSetPrototypeOf) objectSetPrototypeOf(TypedArrayConstructor, TypedArray);
	      forEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
	        if (!(key in TypedArrayConstructor)) {
	          createNonEnumerableProperty(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
	        }
	      });
	      TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
	    }

	    if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
	      createNonEnumerableProperty(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
	    }

	    if (TYPED_ARRAY_TAG) {
	      createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
	    }

	    exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;

	    _export({
	      global: true, forced: TypedArrayConstructor != NativeTypedArrayConstructor, sham: !NATIVE_ARRAY_BUFFER_VIEWS
	    }, exported);

	    if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
	      createNonEnumerableProperty(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
	    }

	    if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
	      createNonEnumerableProperty(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
	    }

	    setSpecies(CONSTRUCTOR_NAME);
	  };
	} else module.exports = function () { /* empty */ };
	});

	// `Float32Array` constructor
	// https://tc39.github.io/ecma262/#sec-typedarray-objects
	typedArrayConstructor('Float32', function (init) {
	  return function Float32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	var min$5 = Math.min;

	// `Array.prototype.copyWithin` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.copywithin
	var arrayCopyWithin = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
	  var O = toObject(this);
	  var len = toLength(O.length);
	  var to = toAbsoluteIndex(target, len);
	  var from = toAbsoluteIndex(start, len);
	  var end = arguments.length > 2 ? arguments[2] : undefined;
	  var count = min$5((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
	  var inc = 1;
	  if (from < to && to < from + count) {
	    inc = -1;
	    from += count - 1;
	    to += count - 1;
	  }
	  while (count-- > 0) {
	    if (from in O) O[to] = O[from];
	    else delete O[to];
	    to += inc;
	    from += inc;
	  } return O;
	};

	var aTypedArray$1 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$1 = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.copyWithin` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.copywithin
	exportTypedArrayMethod$1('copyWithin', function copyWithin(target, start /* , end */) {
	  return arrayCopyWithin.call(aTypedArray$1(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	});

	var $every$1 = arrayIteration.every;

	var aTypedArray$2 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$2 = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.every` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.every
	exportTypedArrayMethod$2('every', function every(callbackfn /* , thisArg */) {
	  return $every$1(aTypedArray$2(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var aTypedArray$3 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$3 = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.fill` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.fill
	// eslint-disable-next-line no-unused-vars
	exportTypedArrayMethod$3('fill', function fill(value /* , start, end */) {
	  return arrayFill.apply(aTypedArray$3(this), arguments);
	});

	var $filter$1 = arrayIteration.filter;


	var aTypedArray$4 = arrayBufferViewCore.aTypedArray;
	var aTypedArrayConstructor$2 = arrayBufferViewCore.aTypedArrayConstructor;
	var exportTypedArrayMethod$4 = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.filter` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.filter
	exportTypedArrayMethod$4('filter', function filter(callbackfn /* , thisArg */) {
	  var list = $filter$1(aTypedArray$4(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  var C = speciesConstructor(this, this.constructor);
	  var index = 0;
	  var length = list.length;
	  var result = new (aTypedArrayConstructor$2(C))(length);
	  while (length > index) result[index] = list[index++];
	  return result;
	});

	var $find$1 = arrayIteration.find;

	var aTypedArray$5 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$5 = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.find` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.find
	exportTypedArrayMethod$5('find', function find(predicate /* , thisArg */) {
	  return $find$1(aTypedArray$5(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	});

	var $findIndex = arrayIteration.findIndex;

	var aTypedArray$6 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$6 = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.findIndex` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.findindex
	exportTypedArrayMethod$6('findIndex', function findIndex(predicate /* , thisArg */) {
	  return $findIndex(aTypedArray$6(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	});

	var $forEach$2 = arrayIteration.forEach;

	var aTypedArray$7 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$7 = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.forEach` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.foreach
	exportTypedArrayMethod$7('forEach', function forEach(callbackfn /* , thisArg */) {
	  $forEach$2(aTypedArray$7(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var $includes = arrayIncludes.includes;

	var aTypedArray$8 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$8 = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.includes` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.includes
	exportTypedArrayMethod$8('includes', function includes(searchElement /* , fromIndex */) {
	  return $includes(aTypedArray$8(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	});

	var $indexOf$1 = arrayIncludes.indexOf;

	var aTypedArray$9 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$9 = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.indexOf` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.indexof
	exportTypedArrayMethod$9('indexOf', function indexOf(searchElement /* , fromIndex */) {
	  return $indexOf$1(aTypedArray$9(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	});

	var ITERATOR$6 = wellKnownSymbol('iterator');
	var Uint8Array = global_1.Uint8Array;
	var arrayValues = es_array_iterator.values;
	var arrayKeys = es_array_iterator.keys;
	var arrayEntries = es_array_iterator.entries;
	var aTypedArray$a = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$a = arrayBufferViewCore.exportTypedArrayMethod;
	var nativeTypedArrayIterator = Uint8Array && Uint8Array.prototype[ITERATOR$6];

	var CORRECT_ITER_NAME = !!nativeTypedArrayIterator
	  && (nativeTypedArrayIterator.name == 'values' || nativeTypedArrayIterator.name == undefined);

	var typedArrayValues = function values() {
	  return arrayValues.call(aTypedArray$a(this));
	};

	// `%TypedArray%.prototype.entries` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.entries
	exportTypedArrayMethod$a('entries', function entries() {
	  return arrayEntries.call(aTypedArray$a(this));
	});
	// `%TypedArray%.prototype.keys` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.keys
	exportTypedArrayMethod$a('keys', function keys() {
	  return arrayKeys.call(aTypedArray$a(this));
	});
	// `%TypedArray%.prototype.values` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.values
	exportTypedArrayMethod$a('values', typedArrayValues, !CORRECT_ITER_NAME);
	// `%TypedArray%.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype-@@iterator
	exportTypedArrayMethod$a(ITERATOR$6, typedArrayValues, !CORRECT_ITER_NAME);

	var aTypedArray$b = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$b = arrayBufferViewCore.exportTypedArrayMethod;
	var $join = [].join;

	// `%TypedArray%.prototype.join` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.join
	// eslint-disable-next-line no-unused-vars
	exportTypedArrayMethod$b('join', function join(separator) {
	  return $join.apply(aTypedArray$b(this), arguments);
	});

	var min$6 = Math.min;
	var nativeLastIndexOf = [].lastIndexOf;
	var NEGATIVE_ZERO$1 = !!nativeLastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
	var STRICT_METHOD$6 = arrayMethodIsStrict('lastIndexOf');
	// For preventing possible almost infinite loop in non-standard implementations, test the forward version of the method
	var USES_TO_LENGTH$a = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });
	var FORCED$5 = NEGATIVE_ZERO$1 || !STRICT_METHOD$6 || !USES_TO_LENGTH$a;

	// `Array.prototype.lastIndexOf` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof
	var arrayLastIndexOf = FORCED$5 ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
	  // convert -0 to +0
	  if (NEGATIVE_ZERO$1) return nativeLastIndexOf.apply(this, arguments) || 0;
	  var O = toIndexedObject(this);
	  var length = toLength(O.length);
	  var index = length - 1;
	  if (arguments.length > 1) index = min$6(index, toInteger(arguments[1]));
	  if (index < 0) index = length + index;
	  for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
	  return -1;
	} : nativeLastIndexOf;

	var aTypedArray$c = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$c = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.lastIndexOf` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.lastindexof
	// eslint-disable-next-line no-unused-vars
	exportTypedArrayMethod$c('lastIndexOf', function lastIndexOf(searchElement /* , fromIndex */) {
	  return arrayLastIndexOf.apply(aTypedArray$c(this), arguments);
	});

	var $map$1 = arrayIteration.map;


	var aTypedArray$d = arrayBufferViewCore.aTypedArray;
	var aTypedArrayConstructor$3 = arrayBufferViewCore.aTypedArrayConstructor;
	var exportTypedArrayMethod$d = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.map` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.map
	exportTypedArrayMethod$d('map', function map(mapfn /* , thisArg */) {
	  return $map$1(aTypedArray$d(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
	    return new (aTypedArrayConstructor$3(speciesConstructor(O, O.constructor)))(length);
	  });
	});

	var $reduce$1 = arrayReduce.left;

	var aTypedArray$e = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$e = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.reduce` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reduce
	exportTypedArrayMethod$e('reduce', function reduce(callbackfn /* , initialValue */) {
	  return $reduce$1(aTypedArray$e(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
	});

	var $reduceRight = arrayReduce.right;

	var aTypedArray$f = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$f = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.reduceRicht` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reduceright
	exportTypedArrayMethod$f('reduceRight', function reduceRight(callbackfn /* , initialValue */) {
	  return $reduceRight(aTypedArray$f(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
	});

	var aTypedArray$g = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$g = arrayBufferViewCore.exportTypedArrayMethod;
	var floor$3 = Math.floor;

	// `%TypedArray%.prototype.reverse` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reverse
	exportTypedArrayMethod$g('reverse', function reverse() {
	  var that = this;
	  var length = aTypedArray$g(that).length;
	  var middle = floor$3(length / 2);
	  var index = 0;
	  var value;
	  while (index < middle) {
	    value = that[index];
	    that[index++] = that[--length];
	    that[length] = value;
	  } return that;
	});

	var aTypedArray$h = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$h = arrayBufferViewCore.exportTypedArrayMethod;

	var FORCED$6 = fails(function () {
	  // eslint-disable-next-line no-undef
	  new Int8Array(1).set({});
	});

	// `%TypedArray%.prototype.set` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.set
	exportTypedArrayMethod$h('set', function set(arrayLike /* , offset */) {
	  aTypedArray$h(this);
	  var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
	  var length = this.length;
	  var src = toObject(arrayLike);
	  var len = toLength(src.length);
	  var index = 0;
	  if (len + offset > length) throw RangeError('Wrong length');
	  while (index < len) this[offset + index] = src[index++];
	}, FORCED$6);

	var aTypedArray$i = arrayBufferViewCore.aTypedArray;
	var aTypedArrayConstructor$4 = arrayBufferViewCore.aTypedArrayConstructor;
	var exportTypedArrayMethod$i = arrayBufferViewCore.exportTypedArrayMethod;
	var $slice = [].slice;

	var FORCED$7 = fails(function () {
	  // eslint-disable-next-line no-undef
	  new Int8Array(1).slice();
	});

	// `%TypedArray%.prototype.slice` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.slice
	exportTypedArrayMethod$i('slice', function slice(start, end) {
	  var list = $slice.call(aTypedArray$i(this), start, end);
	  var C = speciesConstructor(this, this.constructor);
	  var index = 0;
	  var length = list.length;
	  var result = new (aTypedArrayConstructor$4(C))(length);
	  while (length > index) result[index] = list[index++];
	  return result;
	}, FORCED$7);

	var $some$1 = arrayIteration.some;

	var aTypedArray$j = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$j = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.some` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.some
	exportTypedArrayMethod$j('some', function some(callbackfn /* , thisArg */) {
	  return $some$1(aTypedArray$j(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var aTypedArray$k = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$k = arrayBufferViewCore.exportTypedArrayMethod;
	var $sort = [].sort;

	// `%TypedArray%.prototype.sort` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.sort
	exportTypedArrayMethod$k('sort', function sort(comparefn) {
	  return $sort.call(aTypedArray$k(this), comparefn);
	});

	var aTypedArray$l = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$l = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.subarray` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.subarray
	exportTypedArrayMethod$l('subarray', function subarray(begin, end) {
	  var O = aTypedArray$l(this);
	  var length = O.length;
	  var beginIndex = toAbsoluteIndex(begin, length);
	  return new (speciesConstructor(O, O.constructor))(
	    O.buffer,
	    O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT,
	    toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - beginIndex)
	  );
	});

	var Int8Array$3 = global_1.Int8Array;
	var aTypedArray$m = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$m = arrayBufferViewCore.exportTypedArrayMethod;
	var $toLocaleString = [].toLocaleString;
	var $slice$1 = [].slice;

	// iOS Safari 6.x fails here
	var TO_LOCALE_STRING_BUG = !!Int8Array$3 && fails(function () {
	  $toLocaleString.call(new Int8Array$3(1));
	});

	var FORCED$8 = fails(function () {
	  return [1, 2].toLocaleString() != new Int8Array$3([1, 2]).toLocaleString();
	}) || !fails(function () {
	  Int8Array$3.prototype.toLocaleString.call([1, 2]);
	});

	// `%TypedArray%.prototype.toLocaleString` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tolocalestring
	exportTypedArrayMethod$m('toLocaleString', function toLocaleString() {
	  return $toLocaleString.apply(TO_LOCALE_STRING_BUG ? $slice$1.call(aTypedArray$m(this)) : aTypedArray$m(this), arguments);
	}, FORCED$8);

	var exportTypedArrayMethod$n = arrayBufferViewCore.exportTypedArrayMethod;



	var Uint8Array$1 = global_1.Uint8Array;
	var Uint8ArrayPrototype = Uint8Array$1 && Uint8Array$1.prototype || {};
	var arrayToString = [].toString;
	var arrayJoin = [].join;

	if (fails(function () { arrayToString.call({}); })) {
	  arrayToString = function toString() {
	    return arrayJoin.call(this);
	  };
	}

	var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString != arrayToString;

	// `%TypedArray%.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tostring
	exportTypedArrayMethod$n('toString', arrayToString, IS_NOT_ARRAY_METHOD);

	var materialize_min = createCommonjsModule(function (module, exports) {
	  /*!
	   * Materialize v1.0.0-rc.2 (http://materializecss.com)
	   * Copyright 2014-2017 Materialize
	   * MIT License (https://raw.githubusercontent.com/Dogfalo/materialize/master/LICENSE)
	   */
	  var _get = function t(e, i, n) {
	    null === e && (e = Function.prototype);
	    var s = Object.getOwnPropertyDescriptor(e, i);

	    if (void 0 === s) {
	      var o = Object.getPrototypeOf(e);
	      return null === o ? void 0 : t(o, i, n);
	    }

	    if ("value" in s) return s.value;
	    var a = s.get;
	    return void 0 !== a ? a.call(n) : void 0;
	  },
	      _createClass = function () {
	    function n(t, e) {
	      for (var i = 0; i < e.length; i++) {
	        var n = e[i];
	        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
	      }
	    }

	    return function (t, e, i) {
	      return e && n(t.prototype, e), i && n(t, i), t;
	    };
	  }();

	  function _possibleConstructorReturn(t, e) {
	    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	    return !e || "object" != _typeof(e) && "function" != typeof e ? t : e;
	  }

	  function _inherits(t, e) {
	    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + _typeof(e));
	    t.prototype = Object.create(e && e.prototype, {
	      constructor: {
	        value: t,
	        enumerable: !1,
	        writable: !0,
	        configurable: !0
	      }
	    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
	  }

	  function _classCallCheck(t, e) {
	    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
	  }

	  window.cash = function () {
	    var i,
	        o = document,
	        a = window,
	        t = Array.prototype,
	        r = t.slice,
	        n = t.filter,
	        s = t.push,
	        e = function e() {},
	        h = function h(t) {
	      return _typeof(t) == _typeof(e) && t.call;
	    },
	        d = function d(t) {
	      return "string" == typeof t;
	    },
	        l = /^#[\w-]*$/,
	        u = /^\.[\w-]*$/,
	        c = /<.+>/,
	        p = /^\w+$/;

	    function v(t, e) {
	      e = e || o;
	      var i = u.test(t) ? e.getElementsByClassName(t.slice(1)) : p.test(t) ? e.getElementsByTagName(t) : e.querySelectorAll(t);
	      return i;
	    }

	    function f(t) {
	      if (!i) {
	        var e = (i = o.implementation.createHTMLDocument(null)).createElement("base");
	        e.href = o.location.href, i.head.appendChild(e);
	      }

	      return i.body.innerHTML = t, i.body.childNodes;
	    }

	    function m(t) {
	      "loading" !== o.readyState ? t() : o.addEventListener("DOMContentLoaded", t);
	    }

	    function g(t, e) {
	      if (!t) return this;
	      if (t.cash && t !== a) return t;
	      var i,
	          n = t,
	          s = 0;
	      if (d(t)) n = l.test(t) ? o.getElementById(t.slice(1)) : c.test(t) ? f(t) : v(t, e);else if (h(t)) return m(t), this;
	      if (!n) return this;
	      if (n.nodeType || n === a) this[0] = n, this.length = 1;else for (i = this.length = n.length; s < i; s++) {
	        this[s] = n[s];
	      }
	      return this;
	    }

	    function _(t, e) {
	      return new g(t, e);
	    }

	    var y = _.fn = _.prototype = g.prototype = {
	      cash: !0,
	      length: 0,
	      push: s,
	      splice: t.splice,
	      map: t.map,
	      init: g
	    };

	    function k(t, e) {
	      for (var i = t.length, n = 0; n < i && !1 !== e.call(t[n], t[n], n, t); n++) {
	      }
	    }

	    function b(t, e) {
	      var i = t && (t.matches || t.webkitMatchesSelector || t.mozMatchesSelector || t.msMatchesSelector || t.oMatchesSelector);
	      return !!i && i.call(t, e);
	    }

	    function w(e) {
	      return d(e) ? b : e.cash ? function (t) {
	        return e.is(t);
	      } : function (t, e) {
	        return t === e;
	      };
	    }

	    function C(t) {
	      return _(r.call(t).filter(function (t, e, i) {
	        return i.indexOf(t) === e;
	      }));
	    }

	    Object.defineProperty(y, "constructor", {
	      value: _
	    }), _.parseHTML = f, _.noop = e, _.isFunction = h, _.isString = d, _.extend = y.extend = function (t) {
	      t = t || {};
	      var e = r.call(arguments),
	          i = e.length,
	          n = 1;

	      for (1 === e.length && (t = this, n = 0); n < i; n++) {
	        if (e[n]) for (var s in e[n]) {
	          e[n].hasOwnProperty(s) && (t[s] = e[n][s]);
	        }
	      }

	      return t;
	    }, _.extend({
	      merge: function merge(t, e) {
	        for (var i = +e.length, n = t.length, s = 0; s < i; n++, s++) {
	          t[n] = e[s];
	        }

	        return t.length = n, t;
	      },
	      each: k,
	      matches: b,
	      unique: C,
	      isArray: Array.isArray,
	      isNumeric: function isNumeric(t) {
	        return !isNaN(parseFloat(t)) && isFinite(t);
	      }
	    });
	    var E = _.uid = "_cash" + Date.now();

	    function M(t) {
	      return t[E] = t[E] || {};
	    }

	    function O(t, e, i) {
	      return M(t)[e] = i;
	    }

	    function x(t, e) {
	      var i = M(t);
	      return void 0 === i[e] && (i[e] = t.dataset ? t.dataset[e] : _(t).attr("data-" + e)), i[e];
	    }

	    y.extend({
	      data: function data(e, i) {
	        if (d(e)) return void 0 === i ? x(this[0], e) : this.each(function (t) {
	          return O(t, e, i);
	        });

	        for (var t in e) {
	          this.data(t, e[t]);
	        }

	        return this;
	      },
	      removeData: function removeData(s) {
	        return this.each(function (t) {
	          return i = s, void ((n = M(e = t)) ? delete n[i] : e.dataset ? delete e.dataset[i] : _(e).removeAttr("data-" + name));
	          var e, i, n;
	        });
	      }
	    });
	    var L = /\S+/g;

	    function T(t) {
	      return d(t) && t.match(L);
	    }

	    function $(t, e) {
	      return t.classList ? t.classList.contains(e) : new RegExp("(^| )" + e + "( |$)", "gi").test(t.className);
	    }

	    function B(t, e, i) {
	      t.classList ? t.classList.add(e) : i.indexOf(" " + e + " ") && (t.className += " " + e);
	    }

	    function D(t, e) {
	      t.classList ? t.classList.remove(e) : t.className = t.className.replace(e, "");
	    }

	    y.extend({
	      addClass: function addClass(t) {
	        var n = T(t);
	        return n ? this.each(function (e) {
	          var i = " " + e.className + " ";
	          k(n, function (t) {
	            B(e, t, i);
	          });
	        }) : this;
	      },
	      attr: function attr(e, i) {
	        if (e) {
	          if (d(e)) return void 0 === i ? this[0] ? this[0].getAttribute ? this[0].getAttribute(e) : this[0][e] : void 0 : this.each(function (t) {
	            t.setAttribute ? t.setAttribute(e, i) : t[e] = i;
	          });

	          for (var t in e) {
	            this.attr(t, e[t]);
	          }

	          return this;
	        }
	      },
	      hasClass: function hasClass(t) {
	        var e = !1,
	            i = T(t);
	        return i && i.length && this.each(function (t) {
	          return !(e = $(t, i[0]));
	        }), e;
	      },
	      prop: function prop(e, i) {
	        if (d(e)) return void 0 === i ? this[0][e] : this.each(function (t) {
	          t[e] = i;
	        });

	        for (var t in e) {
	          this.prop(t, e[t]);
	        }

	        return this;
	      },
	      removeAttr: function removeAttr(e) {
	        return this.each(function (t) {
	          t.removeAttribute ? t.removeAttribute(e) : delete t[e];
	        });
	      },
	      removeClass: function removeClass(t) {
	        if (!arguments.length) return this.attr("class", "");
	        var i = T(t);
	        return i ? this.each(function (e) {
	          k(i, function (t) {
	            D(e, t);
	          });
	        }) : this;
	      },
	      removeProp: function removeProp(e) {
	        return this.each(function (t) {
	          delete t[e];
	        });
	      },
	      toggleClass: function toggleClass(t, e) {
	        if (void 0 !== e) return this[e ? "addClass" : "removeClass"](t);
	        var n = T(t);
	        return n ? this.each(function (e) {
	          var i = " " + e.className + " ";
	          k(n, function (t) {
	            $(e, t) ? D(e, t) : B(e, t, i);
	          });
	        }) : this;
	      }
	    }), y.extend({
	      add: function add(t, e) {
	        return C(_.merge(this, _(t, e)));
	      },
	      each: function each(t) {
	        return k(this, t), this;
	      },
	      eq: function eq(t) {
	        return _(this.get(t));
	      },
	      filter: function filter(e) {
	        if (!e) return this;
	        var i = h(e) ? e : w(e);
	        return _(n.call(this, function (t) {
	          return i(t, e);
	        }));
	      },
	      first: function first() {
	        return this.eq(0);
	      },
	      get: function get(t) {
	        return void 0 === t ? r.call(this) : t < 0 ? this[t + this.length] : this[t];
	      },
	      index: function index(t) {
	        var e = t ? _(t)[0] : this[0],
	            i = t ? this : _(e).parent().children();
	        return r.call(i).indexOf(e);
	      },
	      last: function last() {
	        return this.eq(-1);
	      }
	    });
	    var S,
	        I,
	        A,
	        R,
	        H,
	        P,
	        W = (H = /(?:^\w|[A-Z]|\b\w)/g, P = /[\s-_]+/g, function (t) {
	      return t.replace(H, function (t, e) {
	        return t[0 === e ? "toLowerCase" : "toUpperCase"]();
	      }).replace(P, "");
	    }),
	        j = (S = {}, I = document, A = I.createElement("div"), R = A.style, function (e) {
	      if (e = W(e), S[e]) return S[e];
	      var t = e.charAt(0).toUpperCase() + e.slice(1),
	          i = (e + " " + ["webkit", "moz", "ms", "o"].join(t + " ") + t).split(" ");
	      return k(i, function (t) {
	        if (t in R) return S[t] = e = S[e] = t, !1;
	      }), S[e];
	    });

	    function F(t, e) {
	      return parseInt(a.getComputedStyle(t[0], null)[e], 10) || 0;
	    }

	    function q(e, i, t) {
	      var n,
	          s = x(e, "_cashEvents"),
	          o = s && s[i];
	      o && (t ? (e.removeEventListener(i, t), 0 <= (n = o.indexOf(t)) && o.splice(n, 1)) : (k(o, function (t) {
	        e.removeEventListener(i, t);
	      }), o = []));
	    }

	    function N(t, e) {
	      return "&" + encodeURIComponent(t) + "=" + encodeURIComponent(e).replace(/%20/g, "+");
	    }

	    function z(t) {
	      var e,
	          i,
	          n,
	          s = t.type;
	      if (!s) return null;

	      switch (s.toLowerCase()) {
	        case "select-one":
	          return 0 <= (n = (i = t).selectedIndex) ? i.options[n].value : null;

	        case "select-multiple":
	          return e = [], k(t.options, function (t) {
	            t.selected && e.push(t.value);
	          }), e.length ? e : null;

	        case "radio":
	        case "checkbox":
	          return t.checked ? t.value : null;

	        default:
	          return t.value ? t.value : null;
	      }
	    }

	    function V(e, i, n) {
	      var t = d(i);
	      t || !i.length ? k(e, t ? function (t) {
	        return t.insertAdjacentHTML(n ? "afterbegin" : "beforeend", i);
	      } : function (t, e) {
	        return function (t, e, i) {
	          if (i) {
	            var n = t.childNodes[0];
	            t.insertBefore(e, n);
	          } else t.appendChild(e);
	        }(t, 0 === e ? i : i.cloneNode(!0), n);
	      }) : k(i, function (t) {
	        return V(e, t, n);
	      });
	    }

	    _.prefixedProp = j, _.camelCase = W, y.extend({
	      css: function css(e, i) {
	        if (d(e)) return e = j(e), 1 < arguments.length ? this.each(function (t) {
	          return t.style[e] = i;
	        }) : a.getComputedStyle(this[0])[e];

	        for (var t in e) {
	          this.css(t, e[t]);
	        }

	        return this;
	      }
	    }), k(["Width", "Height"], function (e) {
	      var t = e.toLowerCase();
	      y[t] = function () {
	        return this[0].getBoundingClientRect()[t];
	      }, y["inner" + e] = function () {
	        return this[0]["client" + e];
	      }, y["outer" + e] = function (t) {
	        return this[0]["offset" + e] + (t ? F(this, "margin" + ("Width" === e ? "Left" : "Top")) + F(this, "margin" + ("Width" === e ? "Right" : "Bottom")) : 0);
	      };
	    }), y.extend({
	      off: function off(e, i) {
	        return this.each(function (t) {
	          return q(t, e, i);
	        });
	      },
	      on: function on(a, i, r, l) {
	        var n;

	        if (!d(a)) {
	          for (var t in a) {
	            this.on(t, i, a[t]);
	          }

	          return this;
	        }

	        return h(i) && (r = i, i = null), "ready" === a ? (m(r), this) : (i && (n = r, r = function r(t) {
	          for (var e = t.target; !b(e, i);) {
	            if (e === this || null === e) return e = !1;
	            e = e.parentNode;
	          }

	          e && n.call(e, t);
	        }), this.each(function (t) {
	          var e,
	              i,
	              n,
	              s,
	              _o = r;
	          l && (_o = function o() {
	            r.apply(this, arguments), q(t, a, _o);
	          }), i = a, n = _o, (s = x(e = t, "_cashEvents") || O(e, "_cashEvents", {}))[i] = s[i] || [], s[i].push(n), e.addEventListener(i, n);
	        }));
	      },
	      one: function one(t, e, i) {
	        return this.on(t, e, i, !0);
	      },
	      ready: m,
	      trigger: function trigger(t, e) {
	        if (document.createEvent) {
	          var i = document.createEvent("HTMLEvents");
	          return i.initEvent(t, !0, !1), i = this.extend(i, e), this.each(function (t) {
	            return t.dispatchEvent(i);
	          });
	        }
	      }
	    }), y.extend({
	      serialize: function serialize() {
	        var s = "";
	        return k(this[0].elements || this, function (t) {
	          if (!t.disabled && "FIELDSET" !== t.tagName) {
	            var e = t.name;

	            switch (t.type.toLowerCase()) {
	              case "file":
	              case "reset":
	              case "submit":
	              case "button":
	                break;

	              case "select-multiple":
	                var i = z(t);
	                null !== i && k(i, function (t) {
	                  s += N(e, t);
	                });
	                break;

	              default:
	                var n = z(t);
	                null !== n && (s += N(e, n));
	            }
	          }
	        }), s.substr(1);
	      },
	      val: function val(e) {
	        return void 0 === e ? z(this[0]) : this.each(function (t) {
	          return t.value = e;
	        });
	      }
	    }), y.extend({
	      after: function after(t) {
	        return _(t).insertAfter(this), this;
	      },
	      append: function append(t) {
	        return V(this, t), this;
	      },
	      appendTo: function appendTo(t) {
	        return V(_(t), this), this;
	      },
	      before: function before(t) {
	        return _(t).insertBefore(this), this;
	      },
	      clone: function clone() {
	        return _(this.map(function (t) {
	          return t.cloneNode(!0);
	        }));
	      },
	      empty: function empty() {
	        return this.html(""), this;
	      },
	      html: function html(t) {
	        if (void 0 === t) return this[0].innerHTML;
	        var e = t.nodeType ? t[0].outerHTML : t;
	        return this.each(function (t) {
	          return t.innerHTML = e;
	        });
	      },
	      insertAfter: function insertAfter(t) {
	        var s = this;
	        return _(t).each(function (t, e) {
	          var i = t.parentNode,
	              n = t.nextSibling;
	          s.each(function (t) {
	            i.insertBefore(0 === e ? t : t.cloneNode(!0), n);
	          });
	        }), this;
	      },
	      insertBefore: function insertBefore(t) {
	        var s = this;
	        return _(t).each(function (e, i) {
	          var n = e.parentNode;
	          s.each(function (t) {
	            n.insertBefore(0 === i ? t : t.cloneNode(!0), e);
	          });
	        }), this;
	      },
	      prepend: function prepend(t) {
	        return V(this, t, !0), this;
	      },
	      prependTo: function prependTo(t) {
	        return V(_(t), this, !0), this;
	      },
	      remove: function remove() {
	        return this.each(function (t) {
	          if (t.parentNode) return t.parentNode.removeChild(t);
	        });
	      },
	      text: function text(e) {
	        return void 0 === e ? this[0].textContent : this.each(function (t) {
	          return t.textContent = e;
	        });
	      }
	    });
	    var X = o.documentElement;
	    return y.extend({
	      position: function position() {
	        var t = this[0];
	        return {
	          left: t.offsetLeft,
	          top: t.offsetTop
	        };
	      },
	      offset: function offset() {
	        var t = this[0].getBoundingClientRect();
	        return {
	          top: t.top + a.pageYOffset - X.clientTop,
	          left: t.left + a.pageXOffset - X.clientLeft
	        };
	      },
	      offsetParent: function offsetParent() {
	        return _(this[0].offsetParent);
	      }
	    }), y.extend({
	      children: function children(e) {
	        var i = [];
	        return this.each(function (t) {
	          s.apply(i, t.children);
	        }), i = C(i), e ? i.filter(function (t) {
	          return b(t, e);
	        }) : i;
	      },
	      closest: function closest(t) {
	        return !t || this.length < 1 ? _() : this.is(t) ? this.filter(t) : this.parent().closest(t);
	      },
	      is: function is(e) {
	        if (!e) return !1;
	        var i = !1,
	            n = w(e);
	        return this.each(function (t) {
	          return !(i = n(t, e));
	        }), i;
	      },
	      find: function find(e) {
	        if (!e || e.nodeType) return _(e && this.has(e).length ? e : null);
	        var i = [];
	        return this.each(function (t) {
	          s.apply(i, v(e, t));
	        }), C(i);
	      },
	      has: function has(e) {
	        var t = d(e) ? function (t) {
	          return 0 !== v(e, t).length;
	        } : function (t) {
	          return t.contains(e);
	        };
	        return this.filter(t);
	      },
	      next: function next() {
	        return _(this[0].nextElementSibling);
	      },
	      not: function not(e) {
	        if (!e) return this;
	        var i = w(e);
	        return this.filter(function (t) {
	          return !i(t, e);
	        });
	      },
	      parent: function parent() {
	        var e = [];
	        return this.each(function (t) {
	          t && t.parentNode && e.push(t.parentNode);
	        }), C(e);
	      },
	      parents: function parents(e) {
	        var i,
	            n = [];
	        return this.each(function (t) {
	          for (i = t; i && i.parentNode && i !== o.body.parentNode;) {
	            i = i.parentNode, (!e || e && b(i, e)) && n.push(i);
	          }
	        }), C(n);
	      },
	      prev: function prev() {
	        return _(this[0].previousElementSibling);
	      },
	      siblings: function siblings(t) {
	        var e = this.parent().children(t),
	            i = this[0];
	        return e.filter(function (t) {
	          return t !== i;
	        });
	      }
	    }), _;
	  }();

	  var Component = function () {
	    function s(t, e, i) {
	      _classCallCheck(this, s), e instanceof Element || console.error(Error(e + " is not an HTML Element"));
	      var n = t.getInstance(e);
	      n && n.destroy(), this.el = e, this.$el = cash(e);
	    }

	    return _createClass(s, null, [{
	      key: "init",
	      value: function value(t, e, i) {
	        var n = null;
	        if (e instanceof Element) n = new t(e, i);else if (e && (e.jquery || e.cash || e instanceof NodeList)) {
	          for (var s = [], o = 0; o < e.length; o++) {
	            s.push(new t(e[o], i));
	          }

	          n = s;
	        }
	        return n;
	      }
	    }]), s;
	  }();

	  !function (t) {
	    t.Package ? M = {} : t.M = {}, M.jQueryLoaded = !!t.jQuery;
	  }(window),   exports.nodeType || ( !module.nodeType && module.exports && (exports = module.exports = M), exports.default = M), M.keys = {
	    TAB: 9,
	    ENTER: 13,
	    ESC: 27,
	    ARROW_UP: 38,
	    ARROW_DOWN: 40
	  }, M.tabPressed = !1, M.keyDown = !1;

	  var docHandleKeydown = function docHandleKeydown(t) {
	    M.keyDown = !0, t.which !== M.keys.TAB && t.which !== M.keys.ARROW_DOWN && t.which !== M.keys.ARROW_UP || (M.tabPressed = !0);
	  },
	      docHandleKeyup = function docHandleKeyup(t) {
	    M.keyDown = !1, t.which !== M.keys.TAB && t.which !== M.keys.ARROW_DOWN && t.which !== M.keys.ARROW_UP || (M.tabPressed = !1);
	  },
	      docHandleFocus = function docHandleFocus(t) {
	    M.keyDown && document.body.classList.add("keyboard-focused");
	  },
	      docHandleBlur = function docHandleBlur(t) {
	    document.body.classList.remove("keyboard-focused");
	  };

	  document.addEventListener("keydown", docHandleKeydown, !0), document.addEventListener("keyup", docHandleKeyup, !0), document.addEventListener("focus", docHandleFocus, !0), document.addEventListener("blur", docHandleBlur, !0), M.initializeJqueryWrapper = function (n, s, o) {
	    jQuery.fn[s] = function (e) {
	      if (n.prototype[e]) {
	        var i = Array.prototype.slice.call(arguments, 1);

	        if ("get" === e.slice(0, 3)) {
	          var t = this.first()[0][o];
	          return t[e].apply(t, i);
	        }

	        return this.each(function () {
	          var t = this[o];
	          t[e].apply(t, i);
	        });
	      }

	      if ("object" == _typeof(e) || !e) return n.init(this, e), this;
	      jQuery.error("Method " + e + " does not exist on jQuery." + s);
	    };
	  }, M.AutoInit = function (t) {
	    var e = t || document.body,
	        i = {
	      Autocomplete: e.querySelectorAll(".autocomplete:not(.no-autoinit)"),
	      Carousel: e.querySelectorAll(".carousel:not(.no-autoinit)"),
	      Chips: e.querySelectorAll(".chips:not(.no-autoinit)"),
	      Collapsible: e.querySelectorAll(".collapsible:not(.no-autoinit)"),
	      Datepicker: e.querySelectorAll(".datepicker:not(.no-autoinit)"),
	      Dropdown: e.querySelectorAll(".dropdown-trigger:not(.no-autoinit)"),
	      Materialbox: e.querySelectorAll(".materialboxed:not(.no-autoinit)"),
	      Modal: e.querySelectorAll(".modal:not(.no-autoinit)"),
	      Parallax: e.querySelectorAll(".parallax:not(.no-autoinit)"),
	      Pushpin: e.querySelectorAll(".pushpin:not(.no-autoinit)"),
	      ScrollSpy: e.querySelectorAll(".scrollspy:not(.no-autoinit)"),
	      FormSelect: e.querySelectorAll("select:not(.no-autoinit)"),
	      Sidenav: e.querySelectorAll(".sidenav:not(.no-autoinit)"),
	      Tabs: e.querySelectorAll(".tabs:not(.no-autoinit)"),
	      TapTarget: e.querySelectorAll(".tap-target:not(.no-autoinit)"),
	      Timepicker: e.querySelectorAll(".timepicker:not(.no-autoinit)"),
	      Tooltip: e.querySelectorAll(".tooltipped:not(.no-autoinit)"),
	      FloatingActionButton: e.querySelectorAll(".fixed-action-btn:not(.no-autoinit)")
	    };

	    for (var n in i) {
	      M[n].init(i[n]);
	    }
	  }, M.objectSelectorString = function (t) {
	    return ((t.prop("tagName") || "") + (t.attr("id") || "") + (t.attr("class") || "")).replace(/\s/g, "");
	  }, M.guid = function () {
	    function t() {
	      return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
	    }

	    return function () {
	      return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t();
	    };
	  }(), M.escapeHash = function (t) {
	    return t.replace(/(:|\.|\[|\]|,|=|\/)/g, "\\$1");
	  }, M.elementOrParentIsFixed = function (t) {
	    var e = $(t),
	        i = e.add(e.parents()),
	        n = !1;
	    return i.each(function () {
	      if ("fixed" === $(this).css("position")) return !(n = !0);
	    }), n;
	  }, M.checkWithinContainer = function (t, e, i) {
	    var n = {
	      top: !1,
	      right: !1,
	      bottom: !1,
	      left: !1
	    },
	        s = t.getBoundingClientRect(),
	        o = t === document.body ? Math.max(s.bottom, window.innerHeight) : s.bottom,
	        a = t.scrollLeft,
	        r = t.scrollTop,
	        l = e.left - a,
	        h = e.top - r;
	    return (l < s.left + i || l < i) && (n.left = !0), (l + e.width > s.right - i || l + e.width > window.innerWidth - i) && (n.right = !0), (h < s.top + i || h < i) && (n.top = !0), (h + e.height > o - i || h + e.height > window.innerHeight - i) && (n.bottom = !0), n;
	  }, M.checkPossibleAlignments = function (t, e, i, n) {
	    var s = {
	      top: !0,
	      right: !0,
	      bottom: !0,
	      left: !0,
	      spaceOnTop: null,
	      spaceOnRight: null,
	      spaceOnBottom: null,
	      spaceOnLeft: null
	    },
	        o = "visible" === getComputedStyle(e).overflow,
	        a = e.getBoundingClientRect(),
	        r = Math.min(a.height, window.innerHeight),
	        l = Math.min(a.width, window.innerWidth),
	        h = t.getBoundingClientRect(),
	        d = e.scrollLeft,
	        u = e.scrollTop,
	        c = i.left - d,
	        p = i.top - u,
	        v = i.top + h.height - u;
	    return s.spaceOnRight = o ? window.innerWidth - (h.left + i.width) : l - (c + i.width), s.spaceOnRight < 0 && (s.left = !1), s.spaceOnLeft = o ? h.right - i.width : c - i.width + h.width, s.spaceOnLeft < 0 && (s.right = !1), s.spaceOnBottom = o ? window.innerHeight - (h.top + i.height + n) : r - (p + i.height + n), s.spaceOnBottom < 0 && (s.top = !1), s.spaceOnTop = o ? h.bottom - (i.height + n) : v - (i.height - n), s.spaceOnTop < 0 && (s.bottom = !1), s;
	  }, M.getOverflowParent = function (t) {
	    return null == t ? null : t === document.body || "visible" !== getComputedStyle(t).overflow ? t : M.getOverflowParent(t.parentElement);
	  }, M.getIdFromTrigger = function (t) {
	    var e = t.getAttribute("data-target");
	    return e || (e = (e = t.getAttribute("href")) ? e.slice(1) : ""), e;
	  }, M.getDocumentScrollTop = function () {
	    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
	  }, M.getDocumentScrollLeft = function () {
	    return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
	  };

	  var getTime = Date.now || function () {
	    return new Date().getTime();
	  };

	  M.throttle = function (i, n, s) {
	    var o = void 0,
	        a = void 0,
	        r = void 0,
	        l = null,
	        h = 0;
	    s || (s = {});

	    var d = function d() {
	      h = !1 === s.leading ? 0 : getTime(), l = null, r = i.apply(o, a), o = a = null;
	    };

	    return function () {
	      var t = getTime();
	      h || !1 !== s.leading || (h = t);
	      var e = n - (t - h);
	      return o = this, a = arguments, e <= 0 ? (clearTimeout(l), l = null, h = t, r = i.apply(o, a), o = a = null) : l || !1 === s.trailing || (l = setTimeout(d, e)), r;
	    };
	  };

	  var $jscomp = {
	    scope: {}
	  };
	  $jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function (t, e, i) {
	    if (i.get || i.set) throw new TypeError("ES3 does not support getters and setters.");
	    t != Array.prototype && t != Object.prototype && (t[e] = i.value);
	  }, $jscomp.getGlobal = function (t) {
	    return "undefined" != typeof window && window === t ? t : "undefined" != typeof commonjsGlobal && null != commonjsGlobal ? commonjsGlobal : t;
	  }, $jscomp.global = $jscomp.getGlobal(commonjsGlobal), $jscomp.SYMBOL_PREFIX = "jscomp_symbol_", $jscomp.initSymbol = function () {
	    $jscomp.initSymbol = function () {}, $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
	  }, $jscomp.symbolCounter_ = 0, $jscomp.Symbol = function (t) {
	    return $jscomp.SYMBOL_PREFIX + (t || "") + $jscomp.symbolCounter_++;
	  }, $jscomp.initSymbolIterator = function () {
	    $jscomp.initSymbol();
	    var t = $jscomp.global.Symbol.iterator;
	    t || (t = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator")), "function" != typeof Array.prototype[t] && $jscomp.defineProperty(Array.prototype, t, {
	      configurable: !0,
	      writable: !0,
	      value: function value() {
	        return $jscomp.arrayIterator(this);
	      }
	    }), $jscomp.initSymbolIterator = function () {};
	  }, $jscomp.arrayIterator = function (t) {
	    var e = 0;
	    return $jscomp.iteratorPrototype(function () {
	      return e < t.length ? {
	        done: !1,
	        value: t[e++]
	      } : {
	        done: !0
	      };
	    });
	  }, $jscomp.iteratorPrototype = function (t) {
	    return $jscomp.initSymbolIterator(), (t = {
	      next: t
	    })[$jscomp.global.Symbol.iterator] = function () {
	      return this;
	    }, t;
	  }, $jscomp.array = $jscomp.array || {}, $jscomp.iteratorFromArray = function (e, i) {
	    $jscomp.initSymbolIterator(), e instanceof String && (e += "");
	    var n = 0,
	        s = {
	      next: function next() {
	        if (n < e.length) {
	          var t = n++;
	          return {
	            value: i(t, e[t]),
	            done: !1
	          };
	        }

	        return s.next = function () {
	          return {
	            done: !0,
	            value: void 0
	          };
	        }, s.next();
	      }
	    };
	    return s[Symbol.iterator] = function () {
	      return s;
	    }, s;
	  }, $jscomp.polyfill = function (t, e, i, n) {
	    if (e) {
	      for (i = $jscomp.global, t = t.split("."), n = 0; n < t.length - 1; n++) {
	        var s = t[n];
	        s in i || (i[s] = {}), i = i[s];
	      }

	      (e = e(n = i[t = t[t.length - 1]])) != n && null != e && $jscomp.defineProperty(i, t, {
	        configurable: !0,
	        writable: !0,
	        value: e
	      });
	    }
	  }, $jscomp.polyfill("Array.prototype.keys", function (t) {
	    return t || function () {
	      return $jscomp.iteratorFromArray(this, function (t) {
	        return t;
	      });
	    };
	  }, "es6-impl", "es3");
	  var $jscomp$this = commonjsGlobal;
	  M.anime = function () {
	    function s(t) {
	      if (!B.col(t)) try {
	        return document.querySelectorAll(t);
	      } catch (t) {}
	    }

	    function b(t, e) {
	      for (var i = t.length, n = 2 <= arguments.length ? e : void 0, s = [], o = 0; o < i; o++) {
	        if (o in t) {
	          var a = t[o];
	          e.call(n, a, o, t) && s.push(a);
	        }
	      }

	      return s;
	    }

	    function d(t) {
	      return t.reduce(function (t, e) {
	        return t.concat(B.arr(e) ? d(e) : e);
	      }, []);
	    }

	    function o(t) {
	      return B.arr(t) ? t : (B.str(t) && (t = s(t) || t), t instanceof NodeList || t instanceof HTMLCollection ? [].slice.call(t) : [t]);
	    }

	    function a(t, e) {
	      return t.some(function (t) {
	        return t === e;
	      });
	    }

	    function r(t) {
	      var e,
	          i = {};

	      for (e in t) {
	        i[e] = t[e];
	      }

	      return i;
	    }

	    function u(t, e) {
	      var i,
	          n = r(t);

	      for (i in t) {
	        n[i] = e.hasOwnProperty(i) ? e[i] : t[i];
	      }

	      return n;
	    }

	    function c(t, e) {
	      var i,
	          n = r(t);

	      for (i in e) {
	        n[i] = B.und(t[i]) ? e[i] : t[i];
	      }

	      return n;
	    }

	    function l(t) {
	      if (t = /([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(t)) return t[2];
	    }

	    function h(t, e) {
	      return B.fnc(t) ? t(e.target, e.id, e.total) : t;
	    }

	    function w(t, e) {
	      if (e in t.style) return getComputedStyle(t).getPropertyValue(e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()) || "0";
	    }

	    function p(t, e) {
	      return B.dom(t) && a($, e) ? "transform" : B.dom(t) && (t.getAttribute(e) || B.svg(t) && t[e]) ? "attribute" : B.dom(t) && "transform" !== e && w(t, e) ? "css" : null != t[e] ? "object" : void 0;
	    }

	    function v(t, e) {
	      switch (p(t, e)) {
	        case "transform":
	          return function (t, i) {
	            var e,
	                n = -1 < (e = i).indexOf("translate") || "perspective" === e ? "px" : -1 < e.indexOf("rotate") || -1 < e.indexOf("skew") ? "deg" : void 0,
	                n = -1 < i.indexOf("scale") ? 1 : 0 + n;
	            if (!(t = t.style.transform)) return n;

	            for (var s = [], o = [], a = [], r = /(\w+)\((.+?)\)/g; s = r.exec(t);) {
	              o.push(s[1]), a.push(s[2]);
	            }

	            return (t = b(a, function (t, e) {
	              return o[e] === i;
	            })).length ? t[0] : n;
	          }(t, e);

	        case "css":
	          return w(t, e);

	        case "attribute":
	          return t.getAttribute(e);
	      }

	      return t[e] || 0;
	    }

	    function f(t, e) {
	      var i = /^(\*=|\+=|-=)/.exec(t);
	      if (!i) return t;
	      var n = l(t) || 0;

	      switch (e = parseFloat(e), t = parseFloat(t.replace(i[0], "")), i[0][0]) {
	        case "+":
	          return e + t + n;

	        case "-":
	          return e - t + n;

	        case "*":
	          return e * t + n;
	      }
	    }

	    function m(t, e) {
	      return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
	    }

	    function i(t) {
	      t = t.points;

	      for (var e, i = 0, n = 0; n < t.numberOfItems; n++) {
	        var s = t.getItem(n);
	        0 < n && (i += m(e, s)), e = s;
	      }

	      return i;
	    }

	    function g(t) {
	      if (t.getTotalLength) return t.getTotalLength();

	      switch (t.tagName.toLowerCase()) {
	        case "circle":
	          return 2 * Math.PI * t.getAttribute("r");

	        case "rect":
	          return 2 * t.getAttribute("width") + 2 * t.getAttribute("height");

	        case "line":
	          return m({
	            x: t.getAttribute("x1"),
	            y: t.getAttribute("y1")
	          }, {
	            x: t.getAttribute("x2"),
	            y: t.getAttribute("y2")
	          });

	        case "polyline":
	          return i(t);

	        case "polygon":
	          var e = t.points;
	          return i(t) + m(e.getItem(e.numberOfItems - 1), e.getItem(0));
	      }
	    }

	    function C(e, i) {
	      function t(t) {
	        return t = void 0 === t ? 0 : t, e.el.getPointAtLength(1 <= i + t ? i + t : 0);
	      }

	      var n = t(),
	          s = t(-1),
	          o = t(1);

	      switch (e.property) {
	        case "x":
	          return n.x;

	        case "y":
	          return n.y;

	        case "angle":
	          return 180 * Math.atan2(o.y - s.y, o.x - s.x) / Math.PI;
	      }
	    }

	    function _(t, e) {
	      var i,
	          n = /-?\d*\.?\d+/g;
	      if (i = B.pth(t) ? t.totalLength : t, B.col(i)) {
	        if (B.rgb(i)) {
	          var s = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(i);
	          i = s ? "rgba(" + s[1] + ",1)" : i;
	        } else i = B.hex(i) ? function (t) {
	          t = t.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (t, e, i, n) {
	            return e + e + i + i + n + n;
	          });
	          var e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
	          t = parseInt(e[1], 16);
	          var i = parseInt(e[2], 16),
	              e = parseInt(e[3], 16);
	          return "rgba(" + t + "," + i + "," + e + ",1)";
	        }(i) : B.hsl(i) ? function (t) {
	          function e(t, e, i) {
	            return i < 0 && (i += 1), 1 < i && --i, i < 1 / 6 ? t + 6 * (e - t) * i : i < .5 ? e : i < 2 / 3 ? t + (e - t) * (2 / 3 - i) * 6 : t;
	          }

	          var i = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(t) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(t);
	          t = parseInt(i[1]) / 360;
	          var n = parseInt(i[2]) / 100,
	              s = parseInt(i[3]) / 100,
	              i = i[4] || 1;
	          if (0 == n) s = n = t = s;else {
	            var o = s < .5 ? s * (1 + n) : s + n - s * n,
	                a = 2 * s - o,
	                s = e(a, o, t + 1 / 3),
	                n = e(a, o, t);
	            t = e(a, o, t - 1 / 3);
	          }
	          return "rgba(" + 255 * s + "," + 255 * n + "," + 255 * t + "," + i + ")";
	        }(i) : void 0;
	      } else s = (s = l(i)) ? i.substr(0, i.length - s.length) : i, i = e && !/\s/g.test(i) ? s + e : s;
	      return {
	        original: i += "",
	        numbers: i.match(n) ? i.match(n).map(Number) : [0],
	        strings: B.str(t) || e ? i.split(n) : []
	      };
	    }

	    function y(t) {
	      return b(t = t ? d(B.arr(t) ? t.map(o) : o(t)) : [], function (t, e, i) {
	        return i.indexOf(t) === e;
	      });
	    }

	    function k(t, i) {
	      var e = r(i);

	      if (B.arr(t)) {
	        var n = t.length;
	        2 !== n || B.obj(t[0]) ? B.fnc(i.duration) || (e.duration = i.duration / n) : t = {
	          value: t
	        };
	      }

	      return o(t).map(function (t, e) {
	        return e = e ? 0 : i.delay, t = B.obj(t) && !B.pth(t) ? t : {
	          value: t
	        }, B.und(t.delay) && (t.delay = e), t;
	      }).map(function (t) {
	        return c(t, e);
	      });
	    }

	    function E(o, a) {
	      var r;
	      return o.tweens.map(function (t) {
	        var e = (t = function (t, e) {
	          var i,
	              n = {};

	          for (i in t) {
	            var s = h(t[i], e);
	            B.arr(s) && 1 === (s = s.map(function (t) {
	              return h(t, e);
	            })).length && (s = s[0]), n[i] = s;
	          }

	          return n.duration = parseFloat(n.duration), n.delay = parseFloat(n.delay), n;
	        }(t, a)).value,
	            i = v(a.target, o.name),
	            n = r ? r.to.original : i,
	            n = B.arr(e) ? e[0] : n,
	            s = f(B.arr(e) ? e[1] : e, n),
	            i = l(s) || l(n) || l(i);

	        return t.from = _(n, i), t.to = _(s, i), t.start = r ? r.end : o.offset, t.end = t.start + t.delay + t.duration, t.easing = function (t) {
	          return B.arr(t) ? D.apply(this, t) : S[t];
	        }(t.easing), t.elasticity = (1e3 - Math.min(Math.max(t.elasticity, 1), 999)) / 1e3, t.isPath = B.pth(e), t.isColor = B.col(t.from.original), t.isColor && (t.round = 1), r = t;
	      });
	    }

	    function M(e, t, i, n) {
	      var s = "delay" === e;
	      return t.length ? (s ? Math.min : Math.max).apply(Math, t.map(function (t) {
	        return t[e];
	      })) : s ? n.delay : i.offset + n.delay + n.duration;
	    }

	    function n(t) {
	      var e,
	          i,
	          n,
	          s,
	          o = u(L, t),
	          a = u(T, t),
	          r = (i = t.targets, (n = y(i)).map(function (t, e) {
	        return {
	          target: t,
	          id: e,
	          total: n.length
	        };
	      })),
	          l = [],
	          h = c(o, a);

	      for (e in t) {
	        h.hasOwnProperty(e) || "targets" === e || l.push({
	          name: e,
	          offset: h.offset,
	          tweens: k(t[e], a)
	        });
	      }

	      return s = l, t = b(d(r.map(function (n) {
	        return s.map(function (t) {
	          var e = p(n.target, t.name);

	          if (e) {
	            var i = E(t, n);
	            t = {
	              type: e,
	              property: t.name,
	              animatable: n,
	              tweens: i,
	              duration: i[i.length - 1].end,
	              delay: i[0].delay
	            };
	          } else t = void 0;

	          return t;
	        });
	      })), function (t) {
	        return !B.und(t);
	      }), c(o, {
	        children: [],
	        animatables: r,
	        animations: t,
	        duration: M("duration", t, o, a),
	        delay: M("delay", t, o, a)
	      });
	    }

	    function O(t) {
	      function d() {
	        return window.Promise && new Promise(function (t) {
	          return _ = t;
	        });
	      }

	      function u(t) {
	        return k.reversed ? k.duration - t : t;
	      }

	      function c(e) {
	        for (var t = 0, i = {}, n = k.animations, s = n.length; t < s;) {
	          var o = n[t],
	              a = o.animatable,
	              r = o.tweens,
	              l = r.length - 1,
	              h = r[l];
	          l && (h = b(r, function (t) {
	            return e < t.end;
	          })[0] || h);

	          for (var r = Math.min(Math.max(e - h.start - h.delay, 0), h.duration) / h.duration, d = isNaN(r) ? 1 : h.easing(r, h.elasticity), r = h.to.strings, u = h.round, l = [], c = void 0, c = h.to.numbers.length, p = 0; p < c; p++) {
	            var v = void 0,
	                v = h.to.numbers[p],
	                f = h.from.numbers[p],
	                v = h.isPath ? C(h.value, d * v) : f + d * (v - f);
	            u && (h.isColor && 2 < p || (v = Math.round(v * u) / u)), l.push(v);
	          }

	          if (h = r.length) for (c = r[0], d = 0; d < h; d++) {
	            u = r[d + 1], p = l[d], isNaN(p) || (c = u ? c + (p + u) : c + (p + " "));
	          } else c = l[0];
	          I[o.type](a.target, o.property, c, i, a.id), o.currentValue = c, t++;
	        }

	        if (t = Object.keys(i).length) for (n = 0; n < t; n++) {
	          x || (x = w(document.body, "transform") ? "transform" : "-webkit-transform"), k.animatables[n].target.style[x] = i[n].join(" ");
	        }
	        k.currentTime = e, k.progress = e / k.duration * 100;
	      }

	      function p(t) {
	        k[t] && k[t](k);
	      }

	      function v() {
	        k.remaining && !0 !== k.remaining && k.remaining--;
	      }

	      function e(t) {
	        var e = k.duration,
	            i = k.offset,
	            n = i + k.delay,
	            s = k.currentTime,
	            o = k.reversed,
	            a = u(t);

	        if (k.children.length) {
	          var r = k.children,
	              l = r.length;
	          if (a >= k.currentTime) for (var h = 0; h < l; h++) {
	            r[h].seek(a);
	          } else for (; l--;) {
	            r[l].seek(a);
	          }
	        }

	        (n <= a || !e) && (k.began || (k.began = !0, p("begin")), p("run")), i < a && a < e ? c(a) : (a <= i && 0 !== s && (c(0), o && v()), (e <= a && s !== e || !e) && (c(e), o || v())), p("update"), e <= t && (k.remaining ? (m = f, "alternate" === k.direction && (k.reversed = !k.reversed)) : (k.pause(), k.completed || (k.completed = !0, p("complete"), "Promise" in window && (_(), y = d()))), g = 0);
	      }

	      t = void 0 === t ? {} : t;
	      var f,
	          m,
	          g = 0,
	          _ = null,
	          y = d(),
	          k = n(t);
	      return k.reset = function () {
	        var t = k.direction,
	            e = k.loop;

	        for (k.currentTime = 0, k.progress = 0, k.paused = !0, k.began = !1, k.completed = !1, k.reversed = "reverse" === t, k.remaining = "alternate" === t && 1 === e ? 2 : e, c(0), t = k.children.length; t--;) {
	          k.children[t].reset();
	        }
	      }, k.tick = function (t) {
	        f = t, m || (m = f), e((g + f - m) * O.speed);
	      }, k.seek = function (t) {
	        e(u(t));
	      }, k.pause = function () {
	        var t = A.indexOf(k);
	        -1 < t && A.splice(t, 1), k.paused = !0;
	      }, k.play = function () {
	        k.paused && (k.paused = !1, m = 0, g = u(k.currentTime), A.push(k), R || H());
	      }, k.reverse = function () {
	        k.reversed = !k.reversed, m = 0, g = u(k.currentTime);
	      }, k.restart = function () {
	        k.pause(), k.reset(), k.play();
	      }, k.finished = y, k.reset(), k.autoplay && k.play(), k;
	    }

	    var x,
	        L = {
	      update: void 0,
	      begin: void 0,
	      run: void 0,
	      complete: void 0,
	      loop: 1,
	      direction: "normal",
	      autoplay: !0,
	      offset: 0
	    },
	        T = {
	      duration: 1e3,
	      delay: 0,
	      easing: "easeOutElastic",
	      elasticity: 500,
	      round: 0
	    },
	        $ = "translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY perspective".split(" "),
	        B = {
	      arr: function arr(t) {
	        return Array.isArray(t);
	      },
	      obj: function obj(t) {
	        return -1 < Object.prototype.toString.call(t).indexOf("Object");
	      },
	      pth: function pth(t) {
	        return B.obj(t) && t.hasOwnProperty("totalLength");
	      },
	      svg: function svg(t) {
	        return t instanceof SVGElement;
	      },
	      dom: function dom(t) {
	        return t.nodeType || B.svg(t);
	      },
	      str: function str(t) {
	        return "string" == typeof t;
	      },
	      fnc: function fnc(t) {
	        return "function" == typeof t;
	      },
	      und: function und(t) {
	        return void 0 === t;
	      },
	      hex: function hex(t) {
	        return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t);
	      },
	      rgb: function rgb(t) {
	        return /^rgb/.test(t);
	      },
	      hsl: function hsl(t) {
	        return /^hsl/.test(t);
	      },
	      col: function col(t) {
	        return B.hex(t) || B.rgb(t) || B.hsl(t);
	      }
	    },
	        D = function () {
	      function u(t, e, i) {
	        return (((1 - 3 * i + 3 * e) * t + (3 * i - 6 * e)) * t + 3 * e) * t;
	      }

	      return function (a, r, l, h) {
	        if (0 <= a && a <= 1 && 0 <= l && l <= 1) {
	          var d = new Float32Array(11);
	          if (a !== r || l !== h) for (var t = 0; t < 11; ++t) {
	            d[t] = u(.1 * t, a, l);
	          }
	          return function (t) {
	            if (a === r && l === h) return t;
	            if (0 === t) return 0;
	            if (1 === t) return 1;

	            for (var e = 0, i = 1; 10 !== i && d[i] <= t; ++i) {
	              e += .1;
	            }

	            var i = e + (t - d[--i]) / (d[i + 1] - d[i]) * .1,
	                n = 3 * (1 - 3 * l + 3 * a) * i * i + 2 * (3 * l - 6 * a) * i + 3 * a;

	            if (.001 <= n) {
	              for (e = 0; e < 4 && 0 != (n = 3 * (1 - 3 * l + 3 * a) * i * i + 2 * (3 * l - 6 * a) * i + 3 * a); ++e) {
	                var s = u(i, a, l) - t,
	                    i = i - s / n;
	              }

	              t = i;
	            } else if (0 === n) t = i;else {
	              for (var i = e, e = e + .1, o = 0; 0 < (n = u(s = i + (e - i) / 2, a, l) - t) ? e = s : i = s, 1e-7 < Math.abs(n) && ++o < 10;) {
	              }

	              t = s;
	            }

	            return u(t, r, h);
	          };
	        }
	      };
	    }(),
	        S = function () {
	      function i(t, e) {
	        return 0 === t || 1 === t ? t : -Math.pow(2, 10 * (t - 1)) * Math.sin(2 * (t - 1 - e / (2 * Math.PI) * Math.asin(1)) * Math.PI / e);
	      }

	      var t,
	          n = "Quad Cubic Quart Quint Sine Expo Circ Back Elastic".split(" "),
	          e = {
	        In: [[.55, .085, .68, .53], [.55, .055, .675, .19], [.895, .03, .685, .22], [.755, .05, .855, .06], [.47, 0, .745, .715], [.95, .05, .795, .035], [.6, .04, .98, .335], [.6, -.28, .735, .045], i],
	        Out: [[.25, .46, .45, .94], [.215, .61, .355, 1], [.165, .84, .44, 1], [.23, 1, .32, 1], [.39, .575, .565, 1], [.19, 1, .22, 1], [.075, .82, .165, 1], [.175, .885, .32, 1.275], function (t, e) {
	          return 1 - i(1 - t, e);
	        }],
	        InOut: [[.455, .03, .515, .955], [.645, .045, .355, 1], [.77, 0, .175, 1], [.86, 0, .07, 1], [.445, .05, .55, .95], [1, 0, 0, 1], [.785, .135, .15, .86], [.68, -.55, .265, 1.55], function (t, e) {
	          return t < .5 ? i(2 * t, e) / 2 : 1 - i(-2 * t + 2, e) / 2;
	        }]
	      },
	          s = {
	        linear: D(.25, .25, .75, .75)
	      },
	          o = {};

	      for (t in e) {
	        o.type = t, e[o.type].forEach(function (i) {
	          return function (t, e) {
	            s["ease" + i.type + n[e]] = B.fnc(t) ? t : D.apply($jscomp$this, t);
	          };
	        }(o)), o = {
	          type: o.type
	        };
	      }

	      return s;
	    }(),
	        I = {
	      css: function css(t, e, i) {
	        return t.style[e] = i;
	      },
	      attribute: function attribute(t, e, i) {
	        return t.setAttribute(e, i);
	      },
	      object: function object(t, e, i) {
	        return t[e] = i;
	      },
	      transform: function transform(t, e, i, n, s) {
	        n[s] || (n[s] = []), n[s].push(e + "(" + i + ")");
	      }
	    },
	        A = [],
	        R = 0,
	        H = function () {
	      function n() {
	        R = requestAnimationFrame(t);
	      }

	      function t(t) {
	        var e = A.length;

	        if (e) {
	          for (var i = 0; i < e;) {
	            A[i] && A[i].tick(t), i++;
	          }

	          n();
	        } else cancelAnimationFrame(R), R = 0;
	      }

	      return n;
	    }();

	    return O.version = "2.2.0", O.speed = 1, O.running = A, O.remove = function (t) {
	      t = y(t);

	      for (var e = A.length; e--;) {
	        for (var i = A[e], n = i.animations, s = n.length; s--;) {
	          a(t, n[s].animatable.target) && (n.splice(s, 1), n.length || i.pause());
	        }
	      }
	    }, O.getValue = v, O.path = function (t, e) {
	      var i = B.str(t) ? s(t)[0] : t,
	          n = e || 100;
	      return function (t) {
	        return {
	          el: i,
	          property: t,
	          totalLength: g(i) * (n / 100)
	        };
	      };
	    }, O.setDashoffset = function (t) {
	      var e = g(t);
	      return t.setAttribute("stroke-dasharray", e), e;
	    }, O.bezier = D, O.easings = S, O.timeline = function (n) {
	      var s = O(n);
	      return s.pause(), s.duration = 0, s.add = function (t) {
	        return s.children.forEach(function (t) {
	          t.began = !0, t.completed = !0;
	        }), o(t).forEach(function (t) {
	          var e = c(t, u(T, n || {}));
	          e.targets = e.targets || n.targets, t = s.duration;
	          var i = e.offset;
	          e.autoplay = !1, e.direction = s.direction, e.offset = B.und(i) ? t : f(i, t), s.began = !0, s.completed = !0, s.seek(e.offset), (e = O(e)).began = !0, e.completed = !0, e.duration > t && (s.duration = e.duration), s.children.push(e);
	        }), s.seek(0), s.reset(), s.autoplay && s.restart(), s;
	      }, s;
	    }, O.random = function (t, e) {
	      return Math.floor(Math.random() * (e - t + 1)) + t;
	    }, O;
	  }(), function (r, l) {

	    var e = {
	      accordion: !0,
	      onOpenStart: void 0,
	      onOpenEnd: void 0,
	      onCloseStart: void 0,
	      onCloseEnd: void 0,
	      inDuration: 300,
	      outDuration: 300
	    },
	        t = function (t) {
	      function s(t, e) {
	        _classCallCheck(this, s);

	        var i = _possibleConstructorReturn(this, (s.__proto__ || Object.getPrototypeOf(s)).call(this, s, t, e));

	        (i.el.M_Collapsible = i).options = r.extend({}, s.defaults, e), i.$headers = i.$el.children("li").children(".collapsible-header"), i.$headers.attr("tabindex", 0), i._setupEventHandlers();
	        var n = i.$el.children("li.active").children(".collapsible-body");
	        return i.options.accordion ? n.first().css("display", "block") : n.css("display", "block"), i;
	      }

	      return _inherits(s, Component), _createClass(s, [{
	        key: "destroy",
	        value: function value() {
	          this._removeEventHandlers(), this.el.M_Collapsible = void 0;
	        }
	      }, {
	        key: "_setupEventHandlers",
	        value: function value() {
	          var e = this;
	          this._handleCollapsibleClickBound = this._handleCollapsibleClick.bind(this), this._handleCollapsibleKeydownBound = this._handleCollapsibleKeydown.bind(this), this.el.addEventListener("click", this._handleCollapsibleClickBound), this.$headers.each(function (t) {
	            t.addEventListener("keydown", e._handleCollapsibleKeydownBound);
	          });
	        }
	      }, {
	        key: "_removeEventHandlers",
	        value: function value() {
	          var e = this;
	          this.el.removeEventListener("click", this._handleCollapsibleClickBound), this.$headers.each(function (t) {
	            t.removeEventListener("keydown", e._handleCollapsibleKeydownBound);
	          });
	        }
	      }, {
	        key: "_handleCollapsibleClick",
	        value: function value(t) {
	          var e = r(t.target).closest(".collapsible-header");

	          if (t.target && e.length) {
	            var i = e.closest(".collapsible");

	            if (i[0] === this.el) {
	              var n = e.closest("li"),
	                  s = i.children("li"),
	                  o = n[0].classList.contains("active"),
	                  a = s.index(n);
	              o ? this.close(a) : this.open(a);
	            }
	          }
	        }
	      }, {
	        key: "_handleCollapsibleKeydown",
	        value: function value(t) {
	          13 === t.keyCode && this._handleCollapsibleClickBound(t);
	        }
	      }, {
	        key: "_animateIn",
	        value: function value(t) {
	          var e = this,
	              i = this.$el.children("li").eq(t);

	          if (i.length) {
	            var n = i.children(".collapsible-body");
	            l.remove(n[0]), n.css({
	              display: "block",
	              overflow: "hidden",
	              height: 0,
	              paddingTop: "",
	              paddingBottom: ""
	            });
	            var s = n.css("padding-top"),
	                o = n.css("padding-bottom"),
	                a = n[0].scrollHeight;
	            n.css({
	              paddingTop: 0,
	              paddingBottom: 0
	            }), l({
	              targets: n[0],
	              height: a,
	              paddingTop: s,
	              paddingBottom: o,
	              duration: this.options.inDuration,
	              easing: "easeInOutCubic",
	              complete: function complete(t) {
	                n.css({
	                  overflow: "",
	                  paddingTop: "",
	                  paddingBottom: "",
	                  height: ""
	                }), "function" == typeof e.options.onOpenEnd && e.options.onOpenEnd.call(e, i[0]);
	              }
	            });
	          }
	        }
	      }, {
	        key: "_animateOut",
	        value: function value(t) {
	          var e = this,
	              i = this.$el.children("li").eq(t);

	          if (i.length) {
	            var n = i.children(".collapsible-body");
	            l.remove(n[0]), n.css("overflow", "hidden"), l({
	              targets: n[0],
	              height: 0,
	              paddingTop: 0,
	              paddingBottom: 0,
	              duration: this.options.outDuration,
	              easing: "easeInOutCubic",
	              complete: function complete() {
	                n.css({
	                  height: "",
	                  overflow: "",
	                  padding: "",
	                  display: ""
	                }), "function" == typeof e.options.onCloseEnd && e.options.onCloseEnd.call(e, i[0]);
	              }
	            });
	          }
	        }
	      }, {
	        key: "open",
	        value: function value(t) {
	          var i = this,
	              e = this.$el.children("li").eq(t);

	          if (e.length && !e[0].classList.contains("active")) {
	            if ("function" == typeof this.options.onOpenStart && this.options.onOpenStart.call(this, e[0]), this.options.accordion) {
	              var n = this.$el.children("li");
	              this.$el.children("li.active").each(function (t) {
	                var e = n.index(r(t));
	                i.close(e);
	              });
	            }

	            e[0].classList.add("active"), this._animateIn(t);
	          }
	        }
	      }, {
	        key: "close",
	        value: function value(t) {
	          var e = this.$el.children("li").eq(t);
	          e.length && e[0].classList.contains("active") && ("function" == typeof this.options.onCloseStart && this.options.onCloseStart.call(this, e[0]), e[0].classList.remove("active"), this._animateOut(t));
	        }
	      }], [{
	        key: "init",
	        value: function value(t, e) {
	          return _get(s.__proto__ || Object.getPrototypeOf(s), "init", this).call(this, this, t, e);
	        }
	      }, {
	        key: "getInstance",
	        value: function value(t) {
	          return (t.jquery ? t[0] : t).M_Collapsible;
	        }
	      }, {
	        key: "defaults",
	        get: function get() {
	          return e;
	        }
	      }]), s;
	    }();

	    M.Collapsible = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "collapsible", "M_Collapsible");
	  }(cash, M.anime), function (h, s) {

	    var e = {
	      alignment: "left",
	      autoFocus: !0,
	      constrainWidth: !0,
	      container: null,
	      coverTrigger: !0,
	      closeOnClick: !0,
	      hover: !1,
	      inDuration: 150,
	      outDuration: 250,
	      onOpenStart: null,
	      onOpenEnd: null,
	      onCloseStart: null,
	      onCloseEnd: null,
	      onItemClick: null
	    },
	        t = function (t) {
	      function n(t, e) {
	        _classCallCheck(this, n);

	        var i = _possibleConstructorReturn(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, n, t, e));

	        return i.el.M_Dropdown = i, n._dropdowns.push(i), i.id = M.getIdFromTrigger(t), i.dropdownEl = document.getElementById(i.id), i.$dropdownEl = h(i.dropdownEl), i.options = h.extend({}, n.defaults, e), i.isOpen = !1, i.isScrollable = !1, i.isTouchMoving = !1, i.focusedIndex = -1, i.filterQuery = [], i.options.container ? h(i.options.container).append(i.dropdownEl) : i.$el.after(i.dropdownEl), i._makeDropdownFocusable(), i._resetFilterQueryBound = i._resetFilterQuery.bind(i), i._handleDocumentClickBound = i._handleDocumentClick.bind(i), i._handleDocumentTouchmoveBound = i._handleDocumentTouchmove.bind(i), i._handleDropdownClickBound = i._handleDropdownClick.bind(i), i._handleDropdownKeydownBound = i._handleDropdownKeydown.bind(i), i._handleTriggerKeydownBound = i._handleTriggerKeydown.bind(i), i._setupEventHandlers(), i;
	      }

	      return _inherits(n, Component), _createClass(n, [{
	        key: "destroy",
	        value: function value() {
	          this._resetDropdownStyles(), this._removeEventHandlers(), n._dropdowns.splice(n._dropdowns.indexOf(this), 1), this.el.M_Dropdown = void 0;
	        }
	      }, {
	        key: "_setupEventHandlers",
	        value: function value() {
	          this.el.addEventListener("keydown", this._handleTriggerKeydownBound), this.dropdownEl.addEventListener("click", this._handleDropdownClickBound), this.options.hover ? (this._handleMouseEnterBound = this._handleMouseEnter.bind(this), this.el.addEventListener("mouseenter", this._handleMouseEnterBound), this._handleMouseLeaveBound = this._handleMouseLeave.bind(this), this.el.addEventListener("mouseleave", this._handleMouseLeaveBound), this.dropdownEl.addEventListener("mouseleave", this._handleMouseLeaveBound)) : (this._handleClickBound = this._handleClick.bind(this), this.el.addEventListener("click", this._handleClickBound));
	        }
	      }, {
	        key: "_removeEventHandlers",
	        value: function value() {
	          this.el.removeEventListener("keydown", this._handleTriggerKeydownBound), this.dropdownEl.removeEventListener("click", this._handleDropdownClickBound), this.options.hover ? (this.el.removeEventListener("mouseenter", this._handleMouseEnterBound), this.el.removeEventListener("mouseleave", this._handleMouseLeaveBound), this.dropdownEl.removeEventListener("mouseleave", this._handleMouseLeaveBound)) : this.el.removeEventListener("click", this._handleClickBound);
	        }
	      }, {
	        key: "_setupTemporaryEventHandlers",
	        value: function value() {
	          document.body.addEventListener("click", this._handleDocumentClickBound, !0), document.body.addEventListener("touchend", this._handleDocumentClickBound), document.body.addEventListener("touchmove", this._handleDocumentTouchmoveBound), this.dropdownEl.addEventListener("keydown", this._handleDropdownKeydownBound);
	        }
	      }, {
	        key: "_removeTemporaryEventHandlers",
	        value: function value() {
	          document.body.removeEventListener("click", this._handleDocumentClickBound, !0), document.body.removeEventListener("touchend", this._handleDocumentClickBound), document.body.removeEventListener("touchmove", this._handleDocumentTouchmoveBound), this.dropdownEl.removeEventListener("keydown", this._handleDropdownKeydownBound);
	        }
	      }, {
	        key: "_handleClick",
	        value: function value(t) {
	          t.preventDefault(), this.open();
	        }
	      }, {
	        key: "_handleMouseEnter",
	        value: function value() {
	          this.open();
	        }
	      }, {
	        key: "_handleMouseLeave",
	        value: function value(t) {
	          var e = t.toElement || t.relatedTarget,
	              i = !!h(e).closest(".dropdown-content").length,
	              n = !1,
	              s = h(e).closest(".dropdown-trigger");
	          s.length && s[0].M_Dropdown && s[0].M_Dropdown.isOpen && (n = !0), n || i || this.close();
	        }
	      }, {
	        key: "_handleDocumentClick",
	        value: function value(t) {
	          var e = this,
	              i = h(t.target);
	          this.options.closeOnClick && i.closest(".dropdown-content").length && !this.isTouchMoving ? setTimeout(function () {
	            e.close();
	          }, 0) : !i.closest(".dropdown-trigger").length && i.closest(".dropdown-content").length || setTimeout(function () {
	            e.close();
	          }, 0), this.isTouchMoving = !1;
	        }
	      }, {
	        key: "_handleTriggerKeydown",
	        value: function value(t) {
	          t.which !== M.keys.ARROW_DOWN && t.which !== M.keys.ENTER || this.isOpen || (t.preventDefault(), this.open());
	        }
	      }, {
	        key: "_handleDocumentTouchmove",
	        value: function value(t) {
	          h(t.target).closest(".dropdown-content").length && (this.isTouchMoving = !0);
	        }
	      }, {
	        key: "_handleDropdownClick",
	        value: function value(t) {
	          if ("function" == typeof this.options.onItemClick) {
	            var e = h(t.target).closest("li")[0];
	            this.options.onItemClick.call(this, e);
	          }
	        }
	      }, {
	        key: "_handleDropdownKeydown",
	        value: function value(t) {
	          if (t.which === M.keys.TAB) t.preventDefault(), this.close();else if (t.which !== M.keys.ARROW_DOWN && t.which !== M.keys.ARROW_UP || !this.isOpen) {
	            if (t.which === M.keys.ENTER && this.isOpen) {
	              var e = this.dropdownEl.children[this.focusedIndex],
	                  i = h(e).find("a, button").first();
	              i.length ? i[0].click() : e.click();
	            } else t.which === M.keys.ESC && this.isOpen && (t.preventDefault(), this.close());
	          } else {
	            t.preventDefault();
	            var n = t.which === M.keys.ARROW_DOWN ? 1 : -1,
	                s = this.focusedIndex,
	                o = !1;

	            do {
	              if (s += n, this.dropdownEl.children[s] && -1 !== this.dropdownEl.children[s].tabIndex) {
	                o = !0;
	                break;
	              }
	            } while (s < this.dropdownEl.children.length && 0 <= s);

	            o && (this.focusedIndex = s, this._focusFocusedItem());
	          }
	          var a = String.fromCharCode(t.which).toLowerCase();

	          if (a && -1 === [9, 13, 27, 38, 40].indexOf(t.which)) {
	            this.filterQuery.push(a);
	            var r = this.filterQuery.join(""),
	                l = h(this.dropdownEl).find("li").filter(function (t) {
	              return 0 === h(t).text().toLowerCase().indexOf(r);
	            })[0];
	            l && (this.focusedIndex = h(l).index(), this._focusFocusedItem());
	          }

	          this.filterTimeout = setTimeout(this._resetFilterQueryBound, 1e3);
	        }
	      }, {
	        key: "_resetFilterQuery",
	        value: function value() {
	          this.filterQuery = [];
	        }
	      }, {
	        key: "_resetDropdownStyles",
	        value: function value() {
	          this.$dropdownEl.css({
	            display: "",
	            width: "",
	            height: "",
	            left: "",
	            top: "",
	            "transform-origin": "",
	            transform: "",
	            opacity: ""
	          });
	        }
	      }, {
	        key: "_makeDropdownFocusable",
	        value: function value() {
	          this.dropdownEl.tabIndex = 0, h(this.dropdownEl).children().each(function (t) {
	            t.getAttribute("tabindex") || t.setAttribute("tabindex", 0);
	          });
	        }
	      }, {
	        key: "_focusFocusedItem",
	        value: function value() {
	          0 <= this.focusedIndex && this.focusedIndex < this.dropdownEl.children.length && this.options.autoFocus && this.dropdownEl.children[this.focusedIndex].focus();
	        }
	      }, {
	        key: "_getDropdownPosition",
	        value: function value() {
	          this.el.offsetParent.getBoundingClientRect();
	          var t = this.el.getBoundingClientRect(),
	              e = this.dropdownEl.getBoundingClientRect(),
	              i = e.height,
	              n = e.width,
	              s = t.left - e.left,
	              o = t.top - e.top,
	              a = {
	            left: s,
	            top: o,
	            height: i,
	            width: n
	          },
	              r = this.dropdownEl.offsetParent ? this.dropdownEl.offsetParent : this.dropdownEl.parentNode,
	              l = M.checkPossibleAlignments(this.el, r, a, this.options.coverTrigger ? 0 : t.height),
	              h = "top",
	              d = this.options.alignment;

	          if (o += this.options.coverTrigger ? 0 : t.height, this.isScrollable = !1, l.top || (l.bottom ? h = "bottom" : (this.isScrollable = !0, l.spaceOnTop > l.spaceOnBottom ? (h = "bottom", i += l.spaceOnTop, o -= l.spaceOnTop) : i += l.spaceOnBottom)), !l[d]) {
	            var u = "left" === d ? "right" : "left";
	            l[u] ? d = u : l.spaceOnLeft > l.spaceOnRight ? (d = "right", n += l.spaceOnLeft, s -= l.spaceOnLeft) : (d = "left", n += l.spaceOnRight);
	          }

	          return "bottom" === h && (o = o - e.height + (this.options.coverTrigger ? t.height : 0)), "right" === d && (s = s - e.width + t.width), {
	            x: s,
	            y: o,
	            verticalAlignment: h,
	            horizontalAlignment: d,
	            height: i,
	            width: n
	          };
	        }
	      }, {
	        key: "_animateIn",
	        value: function value() {
	          var i = this;
	          s.remove(this.dropdownEl), s({
	            targets: this.dropdownEl,
	            opacity: {
	              value: [0, 1],
	              easing: "easeOutQuad"
	            },
	            scaleX: [.3, 1],
	            scaleY: [.3, 1],
	            duration: this.options.inDuration,
	            easing: "easeOutQuint",
	            complete: function complete(t) {
	              if (i.options.autoFocus && i.dropdownEl.focus(), "function" == typeof i.options.onOpenEnd) {
	                var e = t.animatables[0].target;
	                i.options.onOpenEnd.call(e, i.el);
	              }
	            }
	          });
	        }
	      }, {
	        key: "_animateOut",
	        value: function value() {
	          var e = this;
	          s.remove(this.dropdownEl), s({
	            targets: this.dropdownEl,
	            opacity: {
	              value: 0,
	              easing: "easeOutQuint"
	            },
	            scaleX: .3,
	            scaleY: .3,
	            duration: this.options.outDuration,
	            easing: "easeOutQuint",
	            complete: function complete(t) {
	              if (e._resetDropdownStyles(), "function" == typeof e.options.onCloseEnd) {
	                t.animatables[0].target;
	                e.options.onCloseEnd.call(e, e.el);
	              }
	            }
	          });
	        }
	      }, {
	        key: "_placeDropdown",
	        value: function value() {
	          var t = this.options.constrainWidth ? this.el.getBoundingClientRect().width : this.dropdownEl.getBoundingClientRect().width;
	          this.dropdownEl.style.width = t + "px";

	          var e = this._getDropdownPosition();

	          this.dropdownEl.style.left = e.x + "px", this.dropdownEl.style.top = e.y + "px", this.dropdownEl.style.height = e.height + "px", this.dropdownEl.style.width = e.width + "px", this.dropdownEl.style.transformOrigin = ("left" === e.horizontalAlignment ? "0" : "100%") + " " + ("top" === e.verticalAlignment ? "0" : "100%");
	        }
	      }, {
	        key: "open",
	        value: function value() {
	          this.isOpen || (this.isOpen = !0, "function" == typeof this.options.onOpenStart && this.options.onOpenStart.call(this, this.el), this._resetDropdownStyles(), this.dropdownEl.style.display = "block", this._placeDropdown(), this._animateIn(), this._setupTemporaryEventHandlers());
	        }
	      }, {
	        key: "close",
	        value: function value() {
	          this.isOpen && (this.isOpen = !1, this.focusedIndex = -1, "function" == typeof this.options.onCloseStart && this.options.onCloseStart.call(this, this.el), this._animateOut(), this._removeTemporaryEventHandlers(), this.options.autoFocus && this.el.focus());
	        }
	      }, {
	        key: "recalculateDimensions",
	        value: function value() {
	          this.isOpen && (this.$dropdownEl.css({
	            width: "",
	            height: "",
	            left: "",
	            top: "",
	            "transform-origin": ""
	          }), this._placeDropdown());
	        }
	      }], [{
	        key: "init",
	        value: function value(t, e) {
	          return _get(n.__proto__ || Object.getPrototypeOf(n), "init", this).call(this, this, t, e);
	        }
	      }, {
	        key: "getInstance",
	        value: function value(t) {
	          return (t.jquery ? t[0] : t).M_Dropdown;
	        }
	      }, {
	        key: "defaults",
	        get: function get() {
	          return e;
	        }
	      }]), n;
	    }();

	    t._dropdowns = [], window.M.Dropdown = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "dropdown", "M_Dropdown");
	  }(cash, M.anime), function (s, i) {

	    var e = {
	      opacity: .5,
	      inDuration: 250,
	      outDuration: 250,
	      onOpenStart: null,
	      onOpenEnd: null,
	      onCloseStart: null,
	      onCloseEnd: null,
	      preventScrolling: !0,
	      dismissible: !0,
	      startingTop: "4%",
	      endingTop: "10%"
	    },
	        t = function (t) {
	      function n(t, e) {
	        _classCallCheck(this, n);

	        var i = _possibleConstructorReturn(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, n, t, e));

	        return (i.el.M_Modal = i).options = s.extend({}, n.defaults, e), i.isOpen = !1, i.id = i.$el.attr("id"), i._openingTrigger = void 0, i.$overlay = s('<div class="modal-overlay"></div>'), i.el.tabIndex = 0, i._nthModalOpened = 0, n._count++, i._setupEventHandlers(), i;
	      }

	      return _inherits(n, Component), _createClass(n, [{
	        key: "destroy",
	        value: function value() {
	          n._count--, this._removeEventHandlers(), this.el.removeAttribute("style"), this.$overlay.remove(), this.el.M_Modal = void 0;
	        }
	      }, {
	        key: "_setupEventHandlers",
	        value: function value() {
	          this._handleOverlayClickBound = this._handleOverlayClick.bind(this), this._handleModalCloseClickBound = this._handleModalCloseClick.bind(this), 1 === n._count && document.body.addEventListener("click", this._handleTriggerClick), this.$overlay[0].addEventListener("click", this._handleOverlayClickBound), this.el.addEventListener("click", this._handleModalCloseClickBound);
	        }
	      }, {
	        key: "_removeEventHandlers",
	        value: function value() {
	          0 === n._count && document.body.removeEventListener("click", this._handleTriggerClick), this.$overlay[0].removeEventListener("click", this._handleOverlayClickBound), this.el.removeEventListener("click", this._handleModalCloseClickBound);
	        }
	      }, {
	        key: "_handleTriggerClick",
	        value: function value(t) {
	          var e = s(t.target).closest(".modal-trigger");

	          if (e.length) {
	            var i = M.getIdFromTrigger(e[0]),
	                n = document.getElementById(i).M_Modal;
	            n && n.open(e), t.preventDefault();
	          }
	        }
	      }, {
	        key: "_handleOverlayClick",
	        value: function value() {
	          this.options.dismissible && this.close();
	        }
	      }, {
	        key: "_handleModalCloseClick",
	        value: function value(t) {
	          s(t.target).closest(".modal-close").length && this.close();
	        }
	      }, {
	        key: "_handleKeydown",
	        value: function value(t) {
	          27 === t.keyCode && this.options.dismissible && this.close();
	        }
	      }, {
	        key: "_handleFocus",
	        value: function value(t) {
	          this.el.contains(t.target) || this._nthModalOpened !== n._modalsOpen || this.el.focus();
	        }
	      }, {
	        key: "_animateIn",
	        value: function value() {
	          var t = this;
	          s.extend(this.el.style, {
	            display: "block",
	            opacity: 0
	          }), s.extend(this.$overlay[0].style, {
	            display: "block",
	            opacity: 0
	          }), i({
	            targets: this.$overlay[0],
	            opacity: this.options.opacity,
	            duration: this.options.inDuration,
	            easing: "easeOutQuad"
	          });
	          var e = {
	            targets: this.el,
	            duration: this.options.inDuration,
	            easing: "easeOutCubic",
	            complete: function complete() {
	              "function" == typeof t.options.onOpenEnd && t.options.onOpenEnd.call(t, t.el, t._openingTrigger);
	            }
	          };
	          this.el.classList.contains("bottom-sheet") ? s.extend(e, {
	            bottom: 0,
	            opacity: 1
	          }) : s.extend(e, {
	            top: [this.options.startingTop, this.options.endingTop],
	            opacity: 1,
	            scaleX: [.8, 1],
	            scaleY: [.8, 1]
	          }), i(e);
	        }
	      }, {
	        key: "_animateOut",
	        value: function value() {
	          var t = this;
	          i({
	            targets: this.$overlay[0],
	            opacity: 0,
	            duration: this.options.outDuration,
	            easing: "easeOutQuart"
	          });
	          var e = {
	            targets: this.el,
	            duration: this.options.outDuration,
	            easing: "easeOutCubic",
	            complete: function complete() {
	              t.el.style.display = "none", t.$overlay.remove(), "function" == typeof t.options.onCloseEnd && t.options.onCloseEnd.call(t, t.el);
	            }
	          };
	          this.el.classList.contains("bottom-sheet") ? s.extend(e, {
	            bottom: "-100%",
	            opacity: 0
	          }) : s.extend(e, {
	            top: [this.options.endingTop, this.options.startingTop],
	            opacity: 0,
	            scaleX: .8,
	            scaleY: .8
	          }), i(e);
	        }
	      }, {
	        key: "open",
	        value: function value(t) {
	          if (!this.isOpen) return this.isOpen = !0, n._modalsOpen++, this._nthModalOpened = n._modalsOpen, this.$overlay[0].style.zIndex = 1e3 + 2 * n._modalsOpen, this.el.style.zIndex = 1e3 + 2 * n._modalsOpen + 1, this._openingTrigger = t ? t[0] : void 0, "function" == typeof this.options.onOpenStart && this.options.onOpenStart.call(this, this.el, this._openingTrigger), this.options.preventScrolling && (document.body.style.overflow = "hidden"), this.el.classList.add("open"), this.el.insertAdjacentElement("afterend", this.$overlay[0]), this.options.dismissible && (this._handleKeydownBound = this._handleKeydown.bind(this), this._handleFocusBound = this._handleFocus.bind(this), document.addEventListener("keydown", this._handleKeydownBound), document.addEventListener("focus", this._handleFocusBound, !0)), i.remove(this.el), i.remove(this.$overlay[0]), this._animateIn(), this.el.focus(), this;
	        }
	      }, {
	        key: "close",
	        value: function value() {
	          if (this.isOpen) return this.isOpen = !1, n._modalsOpen--, this._nthModalOpened = 0, "function" == typeof this.options.onCloseStart && this.options.onCloseStart.call(this, this.el), this.el.classList.remove("open"), 0 === n._modalsOpen && (document.body.style.overflow = ""), this.options.dismissible && (document.removeEventListener("keydown", this._handleKeydownBound), document.removeEventListener("focus", this._handleFocusBound, !0)), i.remove(this.el), i.remove(this.$overlay[0]), this._animateOut(), this;
	        }
	      }], [{
	        key: "init",
	        value: function value(t, e) {
	          return _get(n.__proto__ || Object.getPrototypeOf(n), "init", this).call(this, this, t, e);
	        }
	      }, {
	        key: "getInstance",
	        value: function value(t) {
	          return (t.jquery ? t[0] : t).M_Modal;
	        }
	      }, {
	        key: "defaults",
	        get: function get() {
	          return e;
	        }
	      }]), n;
	    }();

	    t._modalsOpen = 0, t._count = 0, M.Modal = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "modal", "M_Modal");
	  }(cash, M.anime), function (o, a) {

	    var e = {
	      inDuration: 275,
	      outDuration: 200,
	      onOpenStart: null,
	      onOpenEnd: null,
	      onCloseStart: null,
	      onCloseEnd: null
	    },
	        t = function (t) {
	      function n(t, e) {
	        _classCallCheck(this, n);

	        var i = _possibleConstructorReturn(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, n, t, e));

	        return (i.el.M_Materialbox = i).options = o.extend({}, n.defaults, e), i.overlayActive = !1, i.doneAnimating = !0, i.placeholder = o("<div></div>").addClass("material-placeholder"), i.originalWidth = 0, i.originalHeight = 0, i.originInlineStyles = i.$el.attr("style"), i.caption = i.el.getAttribute("data-caption") || "", i.$el.before(i.placeholder), i.placeholder.append(i.$el), i._setupEventHandlers(), i;
	      }

	      return _inherits(n, Component), _createClass(n, [{
	        key: "destroy",
	        value: function value() {
	          this._removeEventHandlers(), this.el.M_Materialbox = void 0, o(this.placeholder).after(this.el).remove(), this.$el.removeAttr("style");
	        }
	      }, {
	        key: "_setupEventHandlers",
	        value: function value() {
	          this._handleMaterialboxClickBound = this._handleMaterialboxClick.bind(this), this.el.addEventListener("click", this._handleMaterialboxClickBound);
	        }
	      }, {
	        key: "_removeEventHandlers",
	        value: function value() {
	          this.el.removeEventListener("click", this._handleMaterialboxClickBound);
	        }
	      }, {
	        key: "_handleMaterialboxClick",
	        value: function value(t) {
	          !1 === this.doneAnimating || this.overlayActive && this.doneAnimating ? this.close() : this.open();
	        }
	      }, {
	        key: "_handleWindowScroll",
	        value: function value() {
	          this.overlayActive && this.close();
	        }
	      }, {
	        key: "_handleWindowResize",
	        value: function value() {
	          this.overlayActive && this.close();
	        }
	      }, {
	        key: "_handleWindowEscape",
	        value: function value(t) {
	          27 === t.keyCode && this.doneAnimating && this.overlayActive && this.close();
	        }
	      }, {
	        key: "_makeAncestorsOverflowVisible",
	        value: function value() {
	          this.ancestorsChanged = o();

	          for (var t = this.placeholder[0].parentNode; null !== t && !o(t).is(document);) {
	            var e = o(t);
	            "visible" !== e.css("overflow") && (e.css("overflow", "visible"), void 0 === this.ancestorsChanged ? this.ancestorsChanged = e : this.ancestorsChanged = this.ancestorsChanged.add(e)), t = t.parentNode;
	          }
	        }
	      }, {
	        key: "_animateImageIn",
	        value: function value() {
	          var t = this,
	              e = {
	            targets: this.el,
	            height: [this.originalHeight, this.newHeight],
	            width: [this.originalWidth, this.newWidth],
	            left: M.getDocumentScrollLeft() + this.windowWidth / 2 - this.placeholder.offset().left - this.newWidth / 2,
	            top: M.getDocumentScrollTop() + this.windowHeight / 2 - this.placeholder.offset().top - this.newHeight / 2,
	            duration: this.options.inDuration,
	            easing: "easeOutQuad",
	            complete: function complete() {
	              t.doneAnimating = !0, "function" == typeof t.options.onOpenEnd && t.options.onOpenEnd.call(t, t.el);
	            }
	          };
	          this.maxWidth = this.$el.css("max-width"), this.maxHeight = this.$el.css("max-height"), "none" !== this.maxWidth && (e.maxWidth = this.newWidth), "none" !== this.maxHeight && (e.maxHeight = this.newHeight), a(e);
	        }
	      }, {
	        key: "_animateImageOut",
	        value: function value() {
	          var t = this,
	              e = {
	            targets: this.el,
	            width: this.originalWidth,
	            height: this.originalHeight,
	            left: 0,
	            top: 0,
	            duration: this.options.outDuration,
	            easing: "easeOutQuad",
	            complete: function complete() {
	              t.placeholder.css({
	                height: "",
	                width: "",
	                position: "",
	                top: "",
	                left: ""
	              }), t.attrWidth && t.$el.attr("width", t.attrWidth), t.attrHeight && t.$el.attr("height", t.attrHeight), t.$el.removeAttr("style"), t.originInlineStyles && t.$el.attr("style", t.originInlineStyles), t.$el.removeClass("active"), t.doneAnimating = !0, t.ancestorsChanged.length && t.ancestorsChanged.css("overflow", ""), "function" == typeof t.options.onCloseEnd && t.options.onCloseEnd.call(t, t.el);
	            }
	          };
	          a(e);
	        }
	      }, {
	        key: "_updateVars",
	        value: function value() {
	          this.windowWidth = window.innerWidth, this.windowHeight = window.innerHeight, this.caption = this.el.getAttribute("data-caption") || "";
	        }
	      }, {
	        key: "open",
	        value: function value() {
	          var t = this;
	          this._updateVars(), this.originalWidth = this.el.getBoundingClientRect().width, this.originalHeight = this.el.getBoundingClientRect().height, this.doneAnimating = !1, this.$el.addClass("active"), this.overlayActive = !0, "function" == typeof this.options.onOpenStart && this.options.onOpenStart.call(this, this.el), this.placeholder.css({
	            width: this.placeholder[0].getBoundingClientRect().width + "px",
	            height: this.placeholder[0].getBoundingClientRect().height + "px",
	            position: "relative",
	            top: 0,
	            left: 0
	          }), this._makeAncestorsOverflowVisible(), this.$el.css({
	            position: "absolute",
	            "z-index": 1e3,
	            "will-change": "left, top, width, height"
	          }), this.attrWidth = this.$el.attr("width"), this.attrHeight = this.$el.attr("height"), this.attrWidth && (this.$el.css("width", this.attrWidth + "px"), this.$el.removeAttr("width")), this.attrHeight && (this.$el.css("width", this.attrHeight + "px"), this.$el.removeAttr("height")), this.$overlay = o('<div id="materialbox-overlay"></div>').css({
	            opacity: 0
	          }).one("click", function () {
	            t.doneAnimating && t.close();
	          }), this.$el.before(this.$overlay);
	          var e = this.$overlay[0].getBoundingClientRect();
	          this.$overlay.css({
	            width: this.windowWidth + "px",
	            height: this.windowHeight + "px",
	            left: -1 * e.left + "px",
	            top: -1 * e.top + "px"
	          }), a.remove(this.el), a.remove(this.$overlay[0]), a({
	            targets: this.$overlay[0],
	            opacity: 1,
	            duration: this.options.inDuration,
	            easing: "easeOutQuad"
	          }), "" !== this.caption && (this.$photocaption && a.remove(this.$photoCaption[0]), this.$photoCaption = o('<div class="materialbox-caption"></div>'), this.$photoCaption.text(this.caption), o("body").append(this.$photoCaption), this.$photoCaption.css({
	            display: "inline"
	          }), a({
	            targets: this.$photoCaption[0],
	            opacity: 1,
	            duration: this.options.inDuration,
	            easing: "easeOutQuad"
	          }));
	          var i = 0,
	              n = this.originalWidth / this.windowWidth,
	              s = this.originalHeight / this.windowHeight;
	          this.newWidth = 0, this.newHeight = 0, s < n ? (i = this.originalHeight / this.originalWidth, this.newWidth = .9 * this.windowWidth, this.newHeight = .9 * this.windowWidth * i) : (i = this.originalWidth / this.originalHeight, this.newWidth = .9 * this.windowHeight * i, this.newHeight = .9 * this.windowHeight), this._animateImageIn(), this._handleWindowScrollBound = this._handleWindowScroll.bind(this), this._handleWindowResizeBound = this._handleWindowResize.bind(this), this._handleWindowEscapeBound = this._handleWindowEscape.bind(this), window.addEventListener("scroll", this._handleWindowScrollBound), window.addEventListener("resize", this._handleWindowResizeBound), window.addEventListener("keyup", this._handleWindowEscapeBound);
	        }
	      }, {
	        key: "close",
	        value: function value() {
	          var t = this;
	          this._updateVars(), this.doneAnimating = !1, "function" == typeof this.options.onCloseStart && this.options.onCloseStart.call(this, this.el), a.remove(this.el), a.remove(this.$overlay[0]), "" !== this.caption && a.remove(this.$photoCaption[0]), window.removeEventListener("scroll", this._handleWindowScrollBound), window.removeEventListener("resize", this._handleWindowResizeBound), window.removeEventListener("keyup", this._handleWindowEscapeBound), a({
	            targets: this.$overlay[0],
	            opacity: 0,
	            duration: this.options.outDuration,
	            easing: "easeOutQuad",
	            complete: function complete() {
	              t.overlayActive = !1, t.$overlay.remove();
	            }
	          }), this._animateImageOut(), "" !== this.caption && a({
	            targets: this.$photoCaption[0],
	            opacity: 0,
	            duration: this.options.outDuration,
	            easing: "easeOutQuad",
	            complete: function complete() {
	              t.$photoCaption.remove();
	            }
	          });
	        }
	      }], [{
	        key: "init",
	        value: function value(t, e) {
	          return _get(n.__proto__ || Object.getPrototypeOf(n), "init", this).call(this, this, t, e);
	        }
	      }, {
	        key: "getInstance",
	        value: function value(t) {
	          return (t.jquery ? t[0] : t).M_Materialbox;
	        }
	      }, {
	        key: "defaults",
	        get: function get() {
	          return e;
	        }
	      }]), n;
	    }();

	    M.Materialbox = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "materialbox", "M_Materialbox");
	  }(cash, M.anime), function (s) {

	    var e = {
	      responsiveThreshold: 0
	    },
	        t = function (t) {
	      function n(t, e) {
	        _classCallCheck(this, n);

	        var i = _possibleConstructorReturn(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, n, t, e));

	        return (i.el.M_Parallax = i).options = s.extend({}, n.defaults, e), i._enabled = window.innerWidth > i.options.responsiveThreshold, i.$img = i.$el.find("img").first(), i.$img.each(function () {
	          this.complete && s(this).trigger("load");
	        }), i._updateParallax(), i._setupEventHandlers(), i._setupStyles(), n._parallaxes.push(i), i;
	      }

	      return _inherits(n, Component), _createClass(n, [{
	        key: "destroy",
	        value: function value() {
	          n._parallaxes.splice(n._parallaxes.indexOf(this), 1), this.$img[0].style.transform = "", this._removeEventHandlers(), this.$el[0].M_Parallax = void 0;
	        }
	      }, {
	        key: "_setupEventHandlers",
	        value: function value() {
	          this._handleImageLoadBound = this._handleImageLoad.bind(this), this.$img[0].addEventListener("load", this._handleImageLoadBound), 0 === n._parallaxes.length && (n._handleScrollThrottled = M.throttle(n._handleScroll, 5), window.addEventListener("scroll", n._handleScrollThrottled), n._handleWindowResizeThrottled = M.throttle(n._handleWindowResize, 5), window.addEventListener("resize", n._handleWindowResizeThrottled));
	        }
	      }, {
	        key: "_removeEventHandlers",
	        value: function value() {
	          this.$img[0].removeEventListener("load", this._handleImageLoadBound), 0 === n._parallaxes.length && (window.removeEventListener("scroll", n._handleScrollThrottled), window.removeEventListener("resize", n._handleWindowResizeThrottled));
	        }
	      }, {
	        key: "_setupStyles",
	        value: function value() {
	          this.$img[0].style.opacity = 1;
	        }
	      }, {
	        key: "_handleImageLoad",
	        value: function value() {
	          this._updateParallax();
	        }
	      }, {
	        key: "_updateParallax",
	        value: function value() {
	          var t = 0 < this.$el.height() ? this.el.parentNode.offsetHeight : 500,
	              e = this.$img[0].offsetHeight - t,
	              i = this.$el.offset().top + t,
	              n = this.$el.offset().top,
	              s = M.getDocumentScrollTop(),
	              o = window.innerHeight,
	              a = e * ((s + o - n) / (t + o));
	          this._enabled ? s < i && n < s + o && (this.$img[0].style.transform = "translate3D(-50%, " + a + "px, 0)") : this.$img[0].style.transform = "";
	        }
	      }], [{
	        key: "init",
	        value: function value(t, e) {
	          return _get(n.__proto__ || Object.getPrototypeOf(n), "init", this).call(this, this, t, e);
	        }
	      }, {
	        key: "getInstance",
	        value: function value(t) {
	          return (t.jquery ? t[0] : t).M_Parallax;
	        }
	      }, {
	        key: "_handleScroll",
	        value: function value() {
	          for (var t = 0; t < n._parallaxes.length; t++) {
	            var e = n._parallaxes[t];

	            e._updateParallax.call(e);
	          }
	        }
	      }, {
	        key: "_handleWindowResize",
	        value: function value() {
	          for (var t = 0; t < n._parallaxes.length; t++) {
	            var e = n._parallaxes[t];
	            e._enabled = window.innerWidth > e.options.responsiveThreshold;
	          }
	        }
	      }, {
	        key: "defaults",
	        get: function get() {
	          return e;
	        }
	      }]), n;
	    }();

	    t._parallaxes = [], M.Parallax = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "parallax", "M_Parallax");
	  }(cash), function (a, s) {

	    var e = {
	      duration: 300,
	      onShow: null,
	      swipeable: !1,
	      responsiveThreshold: 1 / 0
	    },
	        t = function (t) {
	      function n(t, e) {
	        _classCallCheck(this, n);

	        var i = _possibleConstructorReturn(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, n, t, e));

	        return (i.el.M_Tabs = i).options = a.extend({}, n.defaults, e), i.$tabLinks = i.$el.children("li.tab").children("a"), i.index = 0, i._setupActiveTabLink(), i.options.swipeable ? i._setupSwipeableTabs() : i._setupNormalTabs(), i._setTabsAndTabWidth(), i._createIndicator(), i._setupEventHandlers(), i;
	      }

	      return _inherits(n, Component), _createClass(n, [{
	        key: "destroy",
	        value: function value() {
	          this._removeEventHandlers(), this._indicator.parentNode.removeChild(this._indicator), this.options.swipeable ? this._teardownSwipeableTabs() : this._teardownNormalTabs(), this.$el[0].M_Tabs = void 0;
	        }
	      }, {
	        key: "_setupEventHandlers",
	        value: function value() {
	          this._handleWindowResizeBound = this._handleWindowResize.bind(this), window.addEventListener("resize", this._handleWindowResizeBound), this._handleTabClickBound = this._handleTabClick.bind(this), this.el.addEventListener("click", this._handleTabClickBound);
	        }
	      }, {
	        key: "_removeEventHandlers",
	        value: function value() {
	          window.removeEventListener("resize", this._handleWindowResizeBound), this.el.removeEventListener("click", this._handleTabClickBound);
	        }
	      }, {
	        key: "_handleWindowResize",
	        value: function value() {
	          this._setTabsAndTabWidth(), 0 !== this.tabWidth && 0 !== this.tabsWidth && (this._indicator.style.left = this._calcLeftPos(this.$activeTabLink) + "px", this._indicator.style.right = this._calcRightPos(this.$activeTabLink) + "px");
	        }
	      }, {
	        key: "_handleTabClick",
	        value: function value(t) {
	          var e = this,
	              i = a(t.target).closest("li.tab"),
	              n = a(t.target).closest("a");
	          if (n.length && n.parent().hasClass("tab")) if (i.hasClass("disabled")) t.preventDefault();else if (!n.attr("target")) {
	            this.$activeTabLink.removeClass("active");
	            var s = this.$content;
	            this.$activeTabLink = n, this.$content = a(M.escapeHash(n[0].hash)), this.$tabLinks = this.$el.children("li.tab").children("a"), this.$activeTabLink.addClass("active");
	            var o = this.index;
	            this.index = Math.max(this.$tabLinks.index(n), 0), this.options.swipeable ? this._tabsCarousel && this._tabsCarousel.set(this.index, function () {
	              "function" == typeof e.options.onShow && e.options.onShow.call(e, e.$content[0]);
	            }) : this.$content.length && (this.$content[0].style.display = "block", this.$content.addClass("active"), "function" == typeof this.options.onShow && this.options.onShow.call(this, this.$content[0]), s.length && !s.is(this.$content) && (s[0].style.display = "none", s.removeClass("active"))), this._setTabsAndTabWidth(), this._animateIndicator(o), t.preventDefault();
	          }
	        }
	      }, {
	        key: "_createIndicator",
	        value: function value() {
	          var t = this,
	              e = document.createElement("li");
	          e.classList.add("indicator"), this.el.appendChild(e), this._indicator = e, setTimeout(function () {
	            t._indicator.style.left = t._calcLeftPos(t.$activeTabLink) + "px", t._indicator.style.right = t._calcRightPos(t.$activeTabLink) + "px";
	          }, 0);
	        }
	      }, {
	        key: "_setupActiveTabLink",
	        value: function value() {
	          this.$activeTabLink = a(this.$tabLinks.filter('[href="' + location.hash + '"]')), 0 === this.$activeTabLink.length && (this.$activeTabLink = this.$el.children("li.tab").children("a.active").first()), 0 === this.$activeTabLink.length && (this.$activeTabLink = this.$el.children("li.tab").children("a").first()), this.$tabLinks.removeClass("active"), this.$activeTabLink[0].classList.add("active"), this.index = Math.max(this.$tabLinks.index(this.$activeTabLink), 0), this.$activeTabLink.length && (this.$content = a(M.escapeHash(this.$activeTabLink[0].hash)), this.$content.addClass("active"));
	        }
	      }, {
	        key: "_setupSwipeableTabs",
	        value: function value() {
	          var i = this;
	          window.innerWidth > this.options.responsiveThreshold && (this.options.swipeable = !1);
	          var n = a();
	          this.$tabLinks.each(function (t) {
	            var e = a(M.escapeHash(t.hash));
	            e.addClass("carousel-item"), n = n.add(e);
	          });
	          var t = a('<div class="tabs-content carousel carousel-slider"></div>');
	          n.first().before(t), t.append(n), n[0].style.display = "";
	          var e = this.$activeTabLink.closest(".tab").index();
	          this._tabsCarousel = M.Carousel.init(t[0], {
	            fullWidth: !0,
	            noWrap: !0,
	            onCycleTo: function onCycleTo(t) {
	              var e = i.index;
	              i.index = a(t).index(), i.$activeTabLink.removeClass("active"), i.$activeTabLink = i.$tabLinks.eq(i.index), i.$activeTabLink.addClass("active"), i._animateIndicator(e), "function" == typeof i.options.onShow && i.options.onShow.call(i, i.$content[0]);
	            }
	          }), this._tabsCarousel.set(e);
	        }
	      }, {
	        key: "_teardownSwipeableTabs",
	        value: function value() {
	          var t = this._tabsCarousel.$el;
	          this._tabsCarousel.destroy(), t.after(t.children()), t.remove();
	        }
	      }, {
	        key: "_setupNormalTabs",
	        value: function value() {
	          this.$tabLinks.not(this.$activeTabLink).each(function (t) {
	            if (t.hash) {
	              var e = a(M.escapeHash(t.hash));
	              e.length && (e[0].style.display = "none");
	            }
	          });
	        }
	      }, {
	        key: "_teardownNormalTabs",
	        value: function value() {
	          this.$tabLinks.each(function (t) {
	            if (t.hash) {
	              var e = a(M.escapeHash(t.hash));
	              e.length && (e[0].style.display = "");
	            }
	          });
	        }
	      }, {
	        key: "_setTabsAndTabWidth",
	        value: function value() {
	          this.tabsWidth = this.$el.width(), this.tabWidth = Math.max(this.tabsWidth, this.el.scrollWidth) / this.$tabLinks.length;
	        }
	      }, {
	        key: "_calcRightPos",
	        value: function value(t) {
	          return Math.ceil(this.tabsWidth - t.position().left - t[0].getBoundingClientRect().width);
	        }
	      }, {
	        key: "_calcLeftPos",
	        value: function value(t) {
	          return Math.floor(t.position().left);
	        }
	      }, {
	        key: "updateTabIndicator",
	        value: function value() {
	          this._setTabsAndTabWidth(), this._animateIndicator(this.index);
	        }
	      }, {
	        key: "_animateIndicator",
	        value: function value(t) {
	          var e = 0,
	              i = 0;
	          0 <= this.index - t ? e = 90 : i = 90;
	          var n = {
	            targets: this._indicator,
	            left: {
	              value: this._calcLeftPos(this.$activeTabLink),
	              delay: e
	            },
	            right: {
	              value: this._calcRightPos(this.$activeTabLink),
	              delay: i
	            },
	            duration: this.options.duration,
	            easing: "easeOutQuad"
	          };
	          s.remove(this._indicator), s(n);
	        }
	      }, {
	        key: "select",
	        value: function value(t) {
	          var e = this.$tabLinks.filter('[href="#' + t + '"]');
	          e.length && e.trigger("click");
	        }
	      }], [{
	        key: "init",
	        value: function value(t, e) {
	          return _get(n.__proto__ || Object.getPrototypeOf(n), "init", this).call(this, this, t, e);
	        }
	      }, {
	        key: "getInstance",
	        value: function value(t) {
	          return (t.jquery ? t[0] : t).M_Tabs;
	        }
	      }, {
	        key: "defaults",
	        get: function get() {
	          return e;
	        }
	      }]), n;
	    }();

	    window.M.Tabs = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "tabs", "M_Tabs");
	  }(cash, M.anime), function (d, e) {

	    var i = {
	      exitDelay: 200,
	      enterDelay: 0,
	      html: null,
	      margin: 5,
	      inDuration: 250,
	      outDuration: 200,
	      position: "bottom",
	      transitionMovement: 10
	    },
	        t = function (t) {
	      function n(t, e) {
	        _classCallCheck(this, n);

	        var i = _possibleConstructorReturn(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, n, t, e));

	        return (i.el.M_Tooltip = i).options = d.extend({}, n.defaults, e), i.isOpen = !1, i.isHovered = !1, i.isFocused = !1, i._appendTooltipEl(), i._setupEventHandlers(), i;
	      }

	      return _inherits(n, Component), _createClass(n, [{
	        key: "destroy",
	        value: function value() {
	          d(this.tooltipEl).remove(), this._removeEventHandlers(), this.el.M_Tooltip = void 0;
	        }
	      }, {
	        key: "_appendTooltipEl",
	        value: function value() {
	          var t = document.createElement("div");
	          t.classList.add("material-tooltip"), this.tooltipEl = t;
	          var e = document.createElement("div");
	          e.classList.add("tooltip-content"), e.innerHTML = this.options.html, t.appendChild(e), document.body.appendChild(t);
	        }
	      }, {
	        key: "_updateTooltipContent",
	        value: function value() {
	          this.tooltipEl.querySelector(".tooltip-content").innerHTML = this.options.html;
	        }
	      }, {
	        key: "_setupEventHandlers",
	        value: function value() {
	          this._handleMouseEnterBound = this._handleMouseEnter.bind(this), this._handleMouseLeaveBound = this._handleMouseLeave.bind(this), this._handleFocusBound = this._handleFocus.bind(this), this._handleBlurBound = this._handleBlur.bind(this), this.el.addEventListener("mouseenter", this._handleMouseEnterBound), this.el.addEventListener("mouseleave", this._handleMouseLeaveBound), this.el.addEventListener("focus", this._handleFocusBound, !0), this.el.addEventListener("blur", this._handleBlurBound, !0);
	        }
	      }, {
	        key: "_removeEventHandlers",
	        value: function value() {
	          this.el.removeEventListener("mouseenter", this._handleMouseEnterBound), this.el.removeEventListener("mouseleave", this._handleMouseLeaveBound), this.el.removeEventListener("focus", this._handleFocusBound, !0), this.el.removeEventListener("blur", this._handleBlurBound, !0);
	        }
	      }, {
	        key: "open",
	        value: function value(t) {
	          this.isOpen || (t = void 0 === t || void 0, this.isOpen = !0, this.options = d.extend({}, this.options, this._getAttributeOptions()), this._updateTooltipContent(), this._setEnterDelayTimeout(t));
	        }
	      }, {
	        key: "close",
	        value: function value() {
	          this.isOpen && (this.isHovered = !1, this.isFocused = !1, this.isOpen = !1, this._setExitDelayTimeout());
	        }
	      }, {
	        key: "_setExitDelayTimeout",
	        value: function value() {
	          var t = this;
	          clearTimeout(this._exitDelayTimeout), this._exitDelayTimeout = setTimeout(function () {
	            t.isHovered || t.isFocused || t._animateOut();
	          }, this.options.exitDelay);
	        }
	      }, {
	        key: "_setEnterDelayTimeout",
	        value: function value(t) {
	          var e = this;
	          clearTimeout(this._enterDelayTimeout), this._enterDelayTimeout = setTimeout(function () {
	            (e.isHovered || e.isFocused || t) && e._animateIn();
	          }, this.options.enterDelay);
	        }
	      }, {
	        key: "_positionTooltip",
	        value: function value() {
	          var t,
	              e = this.el,
	              i = this.tooltipEl,
	              n = e.offsetHeight,
	              s = e.offsetWidth,
	              o = i.offsetHeight,
	              a = i.offsetWidth,
	              r = this.options.margin,
	              l = void 0,
	              h = void 0;
	          this.xMovement = 0, this.yMovement = 0, l = e.getBoundingClientRect().top + M.getDocumentScrollTop(), h = e.getBoundingClientRect().left + M.getDocumentScrollLeft(), "top" === this.options.position ? (l += -o - r, h += s / 2 - a / 2, this.yMovement = -this.options.transitionMovement) : "right" === this.options.position ? (l += n / 2 - o / 2, h += s + r, this.xMovement = this.options.transitionMovement) : "left" === this.options.position ? (l += n / 2 - o / 2, h += -a - r, this.xMovement = -this.options.transitionMovement) : (l += n + r, h += s / 2 - a / 2, this.yMovement = this.options.transitionMovement), t = this._repositionWithinScreen(h, l, a, o), d(i).css({
	            top: t.y + "px",
	            left: t.x + "px"
	          });
	        }
	      }, {
	        key: "_repositionWithinScreen",
	        value: function value(t, e, i, n) {
	          var s = M.getDocumentScrollLeft(),
	              o = M.getDocumentScrollTop(),
	              a = t - s,
	              r = e - o,
	              l = {
	            left: a,
	            top: r,
	            width: i,
	            height: n
	          },
	              h = this.options.margin + this.options.transitionMovement,
	              d = M.checkWithinContainer(document.body, l, h);
	          return d.left ? a = h : d.right && (a -= a + i - window.innerWidth), d.top ? r = h : d.bottom && (r -= r + n - window.innerHeight), {
	            x: a + s,
	            y: r + o
	          };
	        }
	      }, {
	        key: "_animateIn",
	        value: function value() {
	          this._positionTooltip(), this.tooltipEl.style.visibility = "visible", e.remove(this.tooltipEl), e({
	            targets: this.tooltipEl,
	            opacity: 1,
	            translateX: this.xMovement,
	            translateY: this.yMovement,
	            duration: this.options.inDuration,
	            easing: "easeOutCubic"
	          });
	        }
	      }, {
	        key: "_animateOut",
	        value: function value() {
	          e.remove(this.tooltipEl), e({
	            targets: this.tooltipEl,
	            opacity: 0,
	            translateX: 0,
	            translateY: 0,
	            duration: this.options.outDuration,
	            easing: "easeOutCubic"
	          });
	        }
	      }, {
	        key: "_handleMouseEnter",
	        value: function value() {
	          this.isHovered = !0, this.isFocused = !1, this.open(!1);
	        }
	      }, {
	        key: "_handleMouseLeave",
	        value: function value() {
	          this.isHovered = !1, this.isFocused = !1, this.close();
	        }
	      }, {
	        key: "_handleFocus",
	        value: function value() {
	          M.tabPressed && (this.isFocused = !0, this.open(!1));
	        }
	      }, {
	        key: "_handleBlur",
	        value: function value() {
	          this.isFocused = !1, this.close();
	        }
	      }, {
	        key: "_getAttributeOptions",
	        value: function value() {
	          var t = {},
	              e = this.el.getAttribute("data-tooltip"),
	              i = this.el.getAttribute("data-position");
	          return e && (t.html = e), i && (t.position = i), t;
	        }
	      }], [{
	        key: "init",
	        value: function value(t, e) {
	          return _get(n.__proto__ || Object.getPrototypeOf(n), "init", this).call(this, this, t, e);
	        }
	      }, {
	        key: "getInstance",
	        value: function value(t) {
	          return (t.jquery ? t[0] : t).M_Tooltip;
	        }
	      }, {
	        key: "defaults",
	        get: function get() {
	          return i;
	        }
	      }]), n;
	    }();

	    M.Tooltip = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "tooltip", "M_Tooltip");
	  }(cash, M.anime), function (i) {

	    var t = t || {},
	        e = document.querySelectorAll.bind(document);

	    function m(t) {
	      var e = "";

	      for (var i in t) {
	        t.hasOwnProperty(i) && (e += i + ":" + t[i] + ";");
	      }

	      return e;
	    }

	    var g = {
	      duration: 750,
	      show: function show(t, e) {
	        if (2 === t.button) return !1;
	        var i = e || this,
	            n = document.createElement("div");
	        n.className = "waves-ripple", i.appendChild(n);
	        var s,
	            o,
	            a,
	            r,
	            l,
	            h,
	            d,
	            u = (h = {
	          top: 0,
	          left: 0
	        }, d = (s = i) && s.ownerDocument, o = d.documentElement, void 0 !== s.getBoundingClientRect && (h = s.getBoundingClientRect()), a = null !== (l = r = d) && l === l.window ? r : 9 === r.nodeType && r.defaultView, {
	          top: h.top + a.pageYOffset - o.clientTop,
	          left: h.left + a.pageXOffset - o.clientLeft
	        }),
	            c = t.pageY - u.top,
	            p = t.pageX - u.left,
	            v = "scale(" + i.clientWidth / 100 * 10 + ")";
	        "touches" in t && (c = t.touches[0].pageY - u.top, p = t.touches[0].pageX - u.left), n.setAttribute("data-hold", Date.now()), n.setAttribute("data-scale", v), n.setAttribute("data-x", p), n.setAttribute("data-y", c);
	        var f = {
	          top: c + "px",
	          left: p + "px"
	        };
	        n.className = n.className + " waves-notransition", n.setAttribute("style", m(f)), n.className = n.className.replace("waves-notransition", ""), f["-webkit-transform"] = v, f["-moz-transform"] = v, f["-ms-transform"] = v, f["-o-transform"] = v, f.transform = v, f.opacity = "1", f["-webkit-transition-duration"] = g.duration + "ms", f["-moz-transition-duration"] = g.duration + "ms", f["-o-transition-duration"] = g.duration + "ms", f["transition-duration"] = g.duration + "ms", f["-webkit-transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)", f["-moz-transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)", f["-o-transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)", f["transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)", n.setAttribute("style", m(f));
	      },
	      hide: function hide(t) {
	        l.touchup(t);
	        var e = this,
	            i = (e.clientWidth, null),
	            n = e.getElementsByClassName("waves-ripple");
	        if (!(0 < n.length)) return !1;
	        var s = (i = n[n.length - 1]).getAttribute("data-x"),
	            o = i.getAttribute("data-y"),
	            a = i.getAttribute("data-scale"),
	            r = 350 - (Date.now() - Number(i.getAttribute("data-hold")));
	        r < 0 && (r = 0), setTimeout(function () {
	          var t = {
	            top: o + "px",
	            left: s + "px",
	            opacity: "0",
	            "-webkit-transition-duration": g.duration + "ms",
	            "-moz-transition-duration": g.duration + "ms",
	            "-o-transition-duration": g.duration + "ms",
	            "transition-duration": g.duration + "ms",
	            "-webkit-transform": a,
	            "-moz-transform": a,
	            "-ms-transform": a,
	            "-o-transform": a,
	            transform: a
	          };
	          i.setAttribute("style", m(t)), setTimeout(function () {
	            try {
	              e.removeChild(i);
	            } catch (t) {
	              return !1;
	            }
	          }, g.duration);
	        }, r);
	      },
	      wrapInput: function wrapInput(t) {
	        for (var e = 0; e < t.length; e++) {
	          var i = t[e];

	          if ("input" === i.tagName.toLowerCase()) {
	            var n = i.parentNode;
	            if ("i" === n.tagName.toLowerCase() && -1 !== n.className.indexOf("waves-effect")) continue;
	            var s = document.createElement("i");
	            s.className = i.className + " waves-input-wrapper";
	            var o = i.getAttribute("style");
	            o || (o = ""), s.setAttribute("style", o), i.className = "waves-button-input", i.removeAttribute("style"), n.replaceChild(s, i), s.appendChild(i);
	          }
	        }
	      }
	    },
	        l = {
	      touches: 0,
	      allowEvent: function allowEvent(t) {
	        var e = !0;
	        return "touchstart" === t.type ? l.touches += 1 : "touchend" === t.type || "touchcancel" === t.type ? setTimeout(function () {
	          0 < l.touches && (l.touches -= 1);
	        }, 500) : "mousedown" === t.type && 0 < l.touches && (e = !1), e;
	      },
	      touchup: function touchup(t) {
	        l.allowEvent(t);
	      }
	    };

	    function n(t) {
	      var e = function (t) {
	        if (!1 === l.allowEvent(t)) return null;

	        for (var e = null, i = t.target || t.srcElement; null !== i.parentNode;) {
	          if (!(i instanceof SVGElement) && -1 !== i.className.indexOf("waves-effect")) {
	            e = i;
	            break;
	          }

	          i = i.parentNode;
	        }

	        return e;
	      }(t);

	      null !== e && (g.show(t, e), "ontouchstart" in i && (e.addEventListener("touchend", g.hide, !1), e.addEventListener("touchcancel", g.hide, !1)), e.addEventListener("mouseup", g.hide, !1), e.addEventListener("mouseleave", g.hide, !1), e.addEventListener("dragend", g.hide, !1));
	    }

	    t.displayEffect = function (t) {
	      "duration" in (t = t || {}) && (g.duration = t.duration), g.wrapInput(e(".waves-effect")), "ontouchstart" in i && document.body.addEventListener("touchstart", n, !1), document.body.addEventListener("mousedown", n, !1);
	    }, t.attach = function (t) {
	      "input" === t.tagName.toLowerCase() && (g.wrapInput([t]), t = t.parentNode), "ontouchstart" in i && t.addEventListener("touchstart", n, !1), t.addEventListener("mousedown", n, !1);
	    }, i.Waves = t, document.addEventListener("DOMContentLoaded", function () {
	      t.displayEffect();
	    }, !1);
	  }(window), function (i, n) {

	    var t = {
	      html: "",
	      displayLength: 4e3,
	      inDuration: 300,
	      outDuration: 375,
	      classes: "",
	      completeCallback: null,
	      activationPercent: .8
	    },
	        e = function () {
	      function s(t) {
	        _classCallCheck(this, s), this.options = i.extend({}, s.defaults, t), this.message = this.options.html, this.panning = !1, this.timeRemaining = this.options.displayLength, 0 === s._toasts.length && s._createContainer(), s._toasts.push(this);

	        var e = this._createToast();

	        (e.M_Toast = this).el = e, this.$el = i(e), this._animateIn(), this._setTimer();
	      }

	      return _createClass(s, [{
	        key: "_createToast",
	        value: function value() {
	          var t = document.createElement("div");
	          return t.classList.add("toast"), this.options.classes.length && i(t).addClass(this.options.classes), ("object" == (typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) ? this.message instanceof HTMLElement : this.message && "object" == _typeof(this.message) && null !== this.message && 1 === this.message.nodeType && "string" == typeof this.message.nodeName) ? t.appendChild(this.message) : this.message.jquery ? i(t).append(this.message[0]) : t.innerHTML = this.message, s._container.appendChild(t), t;
	        }
	      }, {
	        key: "_animateIn",
	        value: function value() {
	          n({
	            targets: this.el,
	            top: 0,
	            opacity: 1,
	            duration: this.options.inDuration,
	            easing: "easeOutCubic"
	          });
	        }
	      }, {
	        key: "_setTimer",
	        value: function value() {
	          var t = this;
	          this.timeRemaining !== 1 / 0 && (this.counterInterval = setInterval(function () {
	            t.panning || (t.timeRemaining -= 20), t.timeRemaining <= 0 && t.dismiss();
	          }, 20));
	        }
	      }, {
	        key: "dismiss",
	        value: function value() {
	          var t = this;
	          window.clearInterval(this.counterInterval);
	          var e = this.el.offsetWidth * this.options.activationPercent;
	          this.wasSwiped && (this.el.style.transition = "transform .05s, opacity .05s", this.el.style.transform = "translateX(" + e + "px)", this.el.style.opacity = 0), n({
	            targets: this.el,
	            opacity: 0,
	            marginTop: -40,
	            duration: this.options.outDuration,
	            easing: "easeOutExpo",
	            complete: function complete() {
	              "function" == typeof t.options.completeCallback && t.options.completeCallback(), t.$el.remove(), s._toasts.splice(s._toasts.indexOf(t), 1), 0 === s._toasts.length && s._removeContainer();
	            }
	          });
	        }
	      }], [{
	        key: "getInstance",
	        value: function value(t) {
	          return (t.jquery ? t[0] : t).M_Toast;
	        }
	      }, {
	        key: "_createContainer",
	        value: function value() {
	          var t = document.createElement("div");
	          t.setAttribute("id", "toast-container"), t.addEventListener("touchstart", s._onDragStart), t.addEventListener("touchmove", s._onDragMove), t.addEventListener("touchend", s._onDragEnd), t.addEventListener("mousedown", s._onDragStart), document.addEventListener("mousemove", s._onDragMove), document.addEventListener("mouseup", s._onDragEnd), document.body.appendChild(t), s._container = t;
	        }
	      }, {
	        key: "_removeContainer",
	        value: function value() {
	          document.removeEventListener("mousemove", s._onDragMove), document.removeEventListener("mouseup", s._onDragEnd), i(s._container).remove(), s._container = null;
	        }
	      }, {
	        key: "_onDragStart",
	        value: function value(t) {
	          if (t.target && i(t.target).closest(".toast").length) {
	            var e = i(t.target).closest(".toast")[0].M_Toast;
	            e.panning = !0, (s._draggedToast = e).el.classList.add("panning"), e.el.style.transition = "", e.startingXPos = s._xPos(t), e.time = Date.now(), e.xPos = s._xPos(t);
	          }
	        }
	      }, {
	        key: "_onDragMove",
	        value: function value(t) {
	          if (s._draggedToast) {
	            t.preventDefault();
	            var e = s._draggedToast;
	            e.deltaX = Math.abs(e.xPos - s._xPos(t)), e.xPos = s._xPos(t), e.velocityX = e.deltaX / (Date.now() - e.time), e.time = Date.now();
	            var i = e.xPos - e.startingXPos,
	                n = e.el.offsetWidth * e.options.activationPercent;
	            e.el.style.transform = "translateX(" + i + "px)", e.el.style.opacity = 1 - Math.abs(i / n);
	          }
	        }
	      }, {
	        key: "_onDragEnd",
	        value: function value() {
	          if (s._draggedToast) {
	            var t = s._draggedToast;
	            t.panning = !1, t.el.classList.remove("panning");
	            var e = t.xPos - t.startingXPos,
	                i = t.el.offsetWidth * t.options.activationPercent;
	            Math.abs(e) > i || 1 < t.velocityX ? (t.wasSwiped = !0, t.dismiss()) : (t.el.style.transition = "transform .2s, opacity .2s", t.el.style.transform = "", t.el.style.opacity = ""), s._draggedToast = null;
	          }
	        }
	      }, {
	        key: "_xPos",
	        value: function value(t) {
	          return t.targetTouches && 1 <= t.targetTouches.length ? t.targetTouches[0].clientX : t.clientX;
	        }
	      }, {
	        key: "dismissAll",
	        value: function value() {
	          for (var t in s._toasts) {
	            s._toasts[t].dismiss();
	          }
	        }
	      }, {
	        key: "defaults",
	        get: function get() {
	          return t;
	        }
	      }]), s;
	    }();

	    e._toasts = [], e._container = null, e._draggedToast = null, M.Toast = e, M.toast = function (t) {
	      return new e(t);
	    };
	  }(cash, M.anime), function (s, o) {

	    var e = {
	      edge: "left",
	      draggable: !0,
	      inDuration: 250,
	      outDuration: 200,
	      onOpenStart: null,
	      onOpenEnd: null,
	      onCloseStart: null,
	      onCloseEnd: null,
	      preventScrolling: !0
	    },
	        t = function (t) {
	      function n(t, e) {
	        _classCallCheck(this, n);

	        var i = _possibleConstructorReturn(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, n, t, e));

	        return (i.el.M_Sidenav = i).id = i.$el.attr("id"), i.options = s.extend({}, n.defaults, e), i.isOpen = !1, i.isFixed = i.el.classList.contains("sidenav-fixed"), i.isDragged = !1, i.lastWindowWidth = window.innerWidth, i.lastWindowHeight = window.innerHeight, i._createOverlay(), i._createDragTarget(), i._setupEventHandlers(), i._setupClasses(), i._setupFixed(), n._sidenavs.push(i), i;
	      }

	      return _inherits(n, Component), _createClass(n, [{
	        key: "destroy",
	        value: function value() {
	          this._removeEventHandlers(), this._enableBodyScrolling(), this._overlay.parentNode.removeChild(this._overlay), this.dragTarget.parentNode.removeChild(this.dragTarget), this.el.M_Sidenav = void 0, this.el.style.transform = "";

	          var t = n._sidenavs.indexOf(this);

	          0 <= t && n._sidenavs.splice(t, 1);
	        }
	      }, {
	        key: "_createOverlay",
	        value: function value() {
	          var t = document.createElement("div");
	          this._closeBound = this.close.bind(this), t.classList.add("sidenav-overlay"), t.addEventListener("click", this._closeBound), document.body.appendChild(t), this._overlay = t;
	        }
	      }, {
	        key: "_setupEventHandlers",
	        value: function value() {
	          0 === n._sidenavs.length && document.body.addEventListener("click", this._handleTriggerClick), this._handleDragTargetDragBound = this._handleDragTargetDrag.bind(this), this._handleDragTargetReleaseBound = this._handleDragTargetRelease.bind(this), this._handleCloseDragBound = this._handleCloseDrag.bind(this), this._handleCloseReleaseBound = this._handleCloseRelease.bind(this), this._handleCloseTriggerClickBound = this._handleCloseTriggerClick.bind(this), this.dragTarget.addEventListener("touchmove", this._handleDragTargetDragBound), this.dragTarget.addEventListener("touchend", this._handleDragTargetReleaseBound), this._overlay.addEventListener("touchmove", this._handleCloseDragBound), this._overlay.addEventListener("touchend", this._handleCloseReleaseBound), this.el.addEventListener("touchmove", this._handleCloseDragBound), this.el.addEventListener("touchend", this._handleCloseReleaseBound), this.el.addEventListener("click", this._handleCloseTriggerClickBound), this.isFixed && (this._handleWindowResizeBound = this._handleWindowResize.bind(this), window.addEventListener("resize", this._handleWindowResizeBound));
	        }
	      }, {
	        key: "_removeEventHandlers",
	        value: function value() {
	          1 === n._sidenavs.length && document.body.removeEventListener("click", this._handleTriggerClick), this.dragTarget.removeEventListener("touchmove", this._handleDragTargetDragBound), this.dragTarget.removeEventListener("touchend", this._handleDragTargetReleaseBound), this._overlay.removeEventListener("touchmove", this._handleCloseDragBound), this._overlay.removeEventListener("touchend", this._handleCloseReleaseBound), this.el.removeEventListener("touchmove", this._handleCloseDragBound), this.el.removeEventListener("touchend", this._handleCloseReleaseBound), this.el.removeEventListener("click", this._handleCloseTriggerClickBound), this.isFixed && window.removeEventListener("resize", this._handleWindowResizeBound);
	        }
	      }, {
	        key: "_handleTriggerClick",
	        value: function value(t) {
	          var e = s(t.target).closest(".sidenav-trigger");

	          if (t.target && e.length) {
	            var i = M.getIdFromTrigger(e[0]),
	                n = document.getElementById(i).M_Sidenav;
	            n && n.open(e), t.preventDefault();
	          }
	        }
	      }, {
	        key: "_startDrag",
	        value: function value(t) {
	          var e = t.targetTouches[0].clientX;
	          this.isDragged = !0, this._startingXpos = e, this._xPos = this._startingXpos, this._time = Date.now(), this._width = this.el.getBoundingClientRect().width, this._overlay.style.display = "block", this._initialScrollTop = this.isOpen ? this.el.scrollTop : M.getDocumentScrollTop(), this._verticallyScrolling = !1, o.remove(this.el), o.remove(this._overlay);
	        }
	      }, {
	        key: "_dragMoveUpdate",
	        value: function value(t) {
	          var e = t.targetTouches[0].clientX,
	              i = this.isOpen ? this.el.scrollTop : M.getDocumentScrollTop();
	          this.deltaX = Math.abs(this._xPos - e), this._xPos = e, this.velocityX = this.deltaX / (Date.now() - this._time), this._time = Date.now(), this._initialScrollTop !== i && (this._verticallyScrolling = !0);
	        }
	      }, {
	        key: "_handleDragTargetDrag",
	        value: function value(t) {
	          if (this.options.draggable && !this._isCurrentlyFixed() && !this._verticallyScrolling) {
	            this.isDragged || this._startDrag(t), this._dragMoveUpdate(t);
	            var e = this._xPos - this._startingXpos,
	                i = 0 < e ? "right" : "left";
	            e = Math.min(this._width, Math.abs(e)), this.options.edge === i && (e = 0);
	            var n = e,
	                s = "translateX(-100%)";
	            "right" === this.options.edge && (s = "translateX(100%)", n = -n), this.percentOpen = Math.min(1, e / this._width), this.el.style.transform = s + " translateX(" + n + "px)", this._overlay.style.opacity = this.percentOpen;
	          }
	        }
	      }, {
	        key: "_handleDragTargetRelease",
	        value: function value() {
	          this.isDragged && (.2 < this.percentOpen ? this.open() : this._animateOut(), this.isDragged = !1, this._verticallyScrolling = !1);
	        }
	      }, {
	        key: "_handleCloseDrag",
	        value: function value(t) {
	          if (this.isOpen) {
	            if (!this.options.draggable || this._isCurrentlyFixed() || this._verticallyScrolling) return;
	            this.isDragged || this._startDrag(t), this._dragMoveUpdate(t);
	            var e = this._xPos - this._startingXpos,
	                i = 0 < e ? "right" : "left";
	            e = Math.min(this._width, Math.abs(e)), this.options.edge !== i && (e = 0);
	            var n = -e;
	            "right" === this.options.edge && (n = -n), this.percentOpen = Math.min(1, 1 - e / this._width), this.el.style.transform = "translateX(" + n + "px)", this._overlay.style.opacity = this.percentOpen;
	          }
	        }
	      }, {
	        key: "_handleCloseRelease",
	        value: function value() {
	          this.isOpen && this.isDragged && (.8 < this.percentOpen ? this._animateIn() : this.close(), this.isDragged = !1, this._verticallyScrolling = !1);
	        }
	      }, {
	        key: "_handleCloseTriggerClick",
	        value: function value(t) {
	          s(t.target).closest(".sidenav-close").length && !this._isCurrentlyFixed() && this.close();
	        }
	      }, {
	        key: "_handleWindowResize",
	        value: function value() {
	          this.lastWindowWidth !== window.innerWidth && (992 < window.innerWidth ? this.open() : this.close()), this.lastWindowWidth = window.innerWidth, this.lastWindowHeight = window.innerHeight;
	        }
	      }, {
	        key: "_setupClasses",
	        value: function value() {
	          "right" === this.options.edge && (this.el.classList.add("right-aligned"), this.dragTarget.classList.add("right-aligned"));
	        }
	      }, {
	        key: "_removeClasses",
	        value: function value() {
	          this.el.classList.remove("right-aligned"), this.dragTarget.classList.remove("right-aligned");
	        }
	      }, {
	        key: "_setupFixed",
	        value: function value() {
	          this._isCurrentlyFixed() && this.open();
	        }
	      }, {
	        key: "_isCurrentlyFixed",
	        value: function value() {
	          return this.isFixed && 992 < window.innerWidth;
	        }
	      }, {
	        key: "_createDragTarget",
	        value: function value() {
	          var t = document.createElement("div");
	          t.classList.add("drag-target"), document.body.appendChild(t), this.dragTarget = t;
	        }
	      }, {
	        key: "_preventBodyScrolling",
	        value: function value() {
	          document.body.style.overflow = "hidden";
	        }
	      }, {
	        key: "_enableBodyScrolling",
	        value: function value() {
	          document.body.style.overflow = "";
	        }
	      }, {
	        key: "open",
	        value: function value() {
	          !0 !== this.isOpen && (this.isOpen = !0, "function" == typeof this.options.onOpenStart && this.options.onOpenStart.call(this, this.el), this._isCurrentlyFixed() ? (o.remove(this.el), o({
	            targets: this.el,
	            translateX: 0,
	            duration: 0,
	            easing: "easeOutQuad"
	          }), this._enableBodyScrolling(), this._overlay.style.display = "none") : (this.options.preventScrolling && this._preventBodyScrolling(), this.isDragged && 1 == this.percentOpen || this._animateIn()));
	        }
	      }, {
	        key: "close",
	        value: function value() {
	          if (!1 !== this.isOpen) if (this.isOpen = !1, "function" == typeof this.options.onCloseStart && this.options.onCloseStart.call(this, this.el), this._isCurrentlyFixed()) {
	            var t = "left" === this.options.edge ? "-105%" : "105%";
	            this.el.style.transform = "translateX(" + t + ")";
	          } else this._enableBodyScrolling(), this.isDragged && 0 == this.percentOpen ? this._overlay.style.display = "none" : this._animateOut();
	        }
	      }, {
	        key: "_animateIn",
	        value: function value() {
	          this._animateSidenavIn(), this._animateOverlayIn();
	        }
	      }, {
	        key: "_animateSidenavIn",
	        value: function value() {
	          var t = this,
	              e = "left" === this.options.edge ? -1 : 1;
	          this.isDragged && (e = "left" === this.options.edge ? e + this.percentOpen : e - this.percentOpen), o.remove(this.el), o({
	            targets: this.el,
	            translateX: [100 * e + "%", 0],
	            duration: this.options.inDuration,
	            easing: "easeOutQuad",
	            complete: function complete() {
	              "function" == typeof t.options.onOpenEnd && t.options.onOpenEnd.call(t, t.el);
	            }
	          });
	        }
	      }, {
	        key: "_animateOverlayIn",
	        value: function value() {
	          var t = 0;
	          this.isDragged ? t = this.percentOpen : s(this._overlay).css({
	            display: "block"
	          }), o.remove(this._overlay), o({
	            targets: this._overlay,
	            opacity: [t, 1],
	            duration: this.options.inDuration,
	            easing: "easeOutQuad"
	          });
	        }
	      }, {
	        key: "_animateOut",
	        value: function value() {
	          this._animateSidenavOut(), this._animateOverlayOut();
	        }
	      }, {
	        key: "_animateSidenavOut",
	        value: function value() {
	          var t = this,
	              e = "left" === this.options.edge ? -1 : 1,
	              i = 0;
	          this.isDragged && (i = "left" === this.options.edge ? e + this.percentOpen : e - this.percentOpen), o.remove(this.el), o({
	            targets: this.el,
	            translateX: [100 * i + "%", 105 * e + "%"],
	            duration: this.options.outDuration,
	            easing: "easeOutQuad",
	            complete: function complete() {
	              "function" == typeof t.options.onCloseEnd && t.options.onCloseEnd.call(t, t.el);
	            }
	          });
	        }
	      }, {
	        key: "_animateOverlayOut",
	        value: function value() {
	          var t = this;
	          o.remove(this._overlay), o({
	            targets: this._overlay,
	            opacity: 0,
	            duration: this.options.outDuration,
	            easing: "easeOutQuad",
	            complete: function complete() {
	              s(t._overlay).css("display", "none");
	            }
	          });
	        }
	      }], [{
	        key: "init",
	        value: function value(t, e) {
	          return _get(n.__proto__ || Object.getPrototypeOf(n), "init", this).call(this, this, t, e);
	        }
	      }, {
	        key: "getInstance",
	        value: function value(t) {
	          return (t.jquery ? t[0] : t).M_Sidenav;
	        }
	      }, {
	        key: "defaults",
	        get: function get() {
	          return e;
	        }
	      }]), n;
	    }();

	    t._sidenavs = [], window.M.Sidenav = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "sidenav", "M_Sidenav");
	  }(cash, M.anime), function (o, a) {

	    var e = {
	      throttle: 100,
	      scrollOffset: 200,
	      activeClass: "active",
	      getActiveElement: function getActiveElement(t) {
	        return 'a[href="#' + t + '"]';
	      }
	    },
	        t = function (t) {
	      function c(t, e) {
	        _classCallCheck(this, c);

	        var i = _possibleConstructorReturn(this, (c.__proto__ || Object.getPrototypeOf(c)).call(this, c, t, e));

	        return (i.el.M_ScrollSpy = i).options = o.extend({}, c.defaults, e), c._elements.push(i), c._count++, c._increment++, i.tickId = -1, i.id = c._increment, i._setupEventHandlers(), i._handleWindowScroll(), i;
	      }

	      return _inherits(c, Component), _createClass(c, [{
	        key: "destroy",
	        value: function value() {
	          c._elements.splice(c._elements.indexOf(this), 1), c._elementsInView.splice(c._elementsInView.indexOf(this), 1), c._visibleElements.splice(c._visibleElements.indexOf(this.$el), 1), c._count--, this._removeEventHandlers(), o(this.options.getActiveElement(this.$el.attr("id"))).removeClass(this.options.activeClass), this.el.M_ScrollSpy = void 0;
	        }
	      }, {
	        key: "_setupEventHandlers",
	        value: function value() {
	          var t = M.throttle(this._handleWindowScroll, 200);
	          this._handleThrottledResizeBound = t.bind(this), this._handleWindowScrollBound = this._handleWindowScroll.bind(this), 1 === c._count && (window.addEventListener("scroll", this._handleWindowScrollBound), window.addEventListener("resize", this._handleThrottledResizeBound), document.body.addEventListener("click", this._handleTriggerClick));
	        }
	      }, {
	        key: "_removeEventHandlers",
	        value: function value() {
	          0 === c._count && (window.removeEventListener("scroll", this._handleWindowScrollBound), window.removeEventListener("resize", this._handleThrottledResizeBound), document.body.removeEventListener("click", this._handleTriggerClick));
	        }
	      }, {
	        key: "_handleTriggerClick",
	        value: function value(t) {
	          for (var e = o(t.target), i = c._elements.length - 1; 0 <= i; i--) {
	            var n = c._elements[i];

	            if (e.is('a[href="#' + n.$el.attr("id") + '"]')) {
	              t.preventDefault();
	              var s = n.$el.offset().top + 1;
	              a({
	                targets: [document.documentElement, document.body],
	                scrollTop: s - n.options.scrollOffset,
	                duration: 400,
	                easing: "easeOutCubic"
	              });
	              break;
	            }
	          }
	        }
	      }, {
	        key: "_handleWindowScroll",
	        value: function value() {
	          c._ticks++;

	          for (var t = M.getDocumentScrollTop(), e = M.getDocumentScrollLeft(), i = e + window.innerWidth, n = t + window.innerHeight, s = c._findElements(t, i, n, e), o = 0; o < s.length; o++) {
	            var a = s[o];
	            a.tickId < 0 && a._enter(), a.tickId = c._ticks;
	          }

	          for (var r = 0; r < c._elementsInView.length; r++) {
	            var l = c._elementsInView[r],
	                h = l.tickId;
	            0 <= h && h !== c._ticks && (l._exit(), l.tickId = -1);
	          }

	          c._elementsInView = s;
	        }
	      }, {
	        key: "_enter",
	        value: function value() {
	          (c._visibleElements = c._visibleElements.filter(function (t) {
	            return 0 != t.height();
	          }))[0] ? (o(this.options.getActiveElement(c._visibleElements[0].attr("id"))).removeClass(this.options.activeClass), c._visibleElements[0][0].M_ScrollSpy && this.id < c._visibleElements[0][0].M_ScrollSpy.id ? c._visibleElements.unshift(this.$el) : c._visibleElements.push(this.$el)) : c._visibleElements.push(this.$el), o(this.options.getActiveElement(c._visibleElements[0].attr("id"))).addClass(this.options.activeClass);
	        }
	      }, {
	        key: "_exit",
	        value: function value() {
	          var e = this;
	          (c._visibleElements = c._visibleElements.filter(function (t) {
	            return 0 != t.height();
	          }))[0] && (o(this.options.getActiveElement(c._visibleElements[0].attr("id"))).removeClass(this.options.activeClass), (c._visibleElements = c._visibleElements.filter(function (t) {
	            return t.attr("id") != e.$el.attr("id");
	          }))[0] && o(this.options.getActiveElement(c._visibleElements[0].attr("id"))).addClass(this.options.activeClass));
	        }
	      }], [{
	        key: "init",
	        value: function value(t, e) {
	          return _get(c.__proto__ || Object.getPrototypeOf(c), "init", this).call(this, this, t, e);
	        }
	      }, {
	        key: "getInstance",
	        value: function value(t) {
	          return (t.jquery ? t[0] : t).M_ScrollSpy;
	        }
	      }, {
	        key: "_findElements",
	        value: function value(t, e, i, n) {
	          for (var s = [], o = 0; o < c._elements.length; o++) {
	            var a = c._elements[o],
	                r = t + a.options.scrollOffset || 200;

	            if (0 < a.$el.height()) {
	              var l = a.$el.offset().top,
	                  h = a.$el.offset().left,
	                  d = h + a.$el.width(),
	                  u = l + a.$el.height();
	              !(e < h || d < n || i < l || u < r) && s.push(a);
	            }
	          }

	          return s;
	        }
	      }, {
	        key: "defaults",
	        get: function get() {
	          return e;
	        }
	      }]), c;
	    }();

	    t._elements = [], t._elementsInView = [], t._visibleElements = [], t._count = 0, t._increment = 0, t._ticks = 0, M.ScrollSpy = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "scrollSpy", "M_ScrollSpy");
	  }(cash, M.anime), function (h) {

	    var e = {
	      data: {},
	      limit: 1 / 0,
	      onAutocomplete: null,
	      minLength: 1,
	      sortFunction: function sortFunction(t, e, i) {
	        return t.indexOf(i) - e.indexOf(i);
	      }
	    },
	        t = function (t) {
	      function s(t, e) {
	        _classCallCheck(this, s);

	        var i = _possibleConstructorReturn(this, (s.__proto__ || Object.getPrototypeOf(s)).call(this, s, t, e));

	        return (i.el.M_Autocomplete = i).options = h.extend({}, s.defaults, e), i.isOpen = !1, i.count = 0, i.activeIndex = -1, i.oldVal, i.$inputField = i.$el.closest(".input-field"), i.$active = h(), i._mousedown = !1, i._setupDropdown(), i._setupEventHandlers(), i;
	      }

	      return _inherits(s, Component), _createClass(s, [{
	        key: "destroy",
	        value: function value() {
	          this._removeEventHandlers(), this._removeDropdown(), this.el.M_Autocomplete = void 0;
	        }
	      }, {
	        key: "_setupEventHandlers",
	        value: function value() {
	          this._handleInputBlurBound = this._handleInputBlur.bind(this), this._handleInputKeyupAndFocusBound = this._handleInputKeyupAndFocus.bind(this), this._handleInputKeydownBound = this._handleInputKeydown.bind(this), this._handleInputClickBound = this._handleInputClick.bind(this), this._handleContainerMousedownAndTouchstartBound = this._handleContainerMousedownAndTouchstart.bind(this), this._handleContainerMouseupAndTouchendBound = this._handleContainerMouseupAndTouchend.bind(this), this.el.addEventListener("blur", this._handleInputBlurBound), this.el.addEventListener("keyup", this._handleInputKeyupAndFocusBound), this.el.addEventListener("focus", this._handleInputKeyupAndFocusBound), this.el.addEventListener("keydown", this._handleInputKeydownBound), this.el.addEventListener("click", this._handleInputClickBound), this.container.addEventListener("mousedown", this._handleContainerMousedownAndTouchstartBound), this.container.addEventListener("mouseup", this._handleContainerMouseupAndTouchendBound), void 0 !== window.ontouchstart && (this.container.addEventListener("touchstart", this._handleContainerMousedownAndTouchstartBound), this.container.addEventListener("touchend", this._handleContainerMouseupAndTouchendBound));
	        }
	      }, {
	        key: "_removeEventHandlers",
	        value: function value() {
	          this.el.removeEventListener("blur", this._handleInputBlurBound), this.el.removeEventListener("keyup", this._handleInputKeyupAndFocusBound), this.el.removeEventListener("focus", this._handleInputKeyupAndFocusBound), this.el.removeEventListener("keydown", this._handleInputKeydownBound), this.el.removeEventListener("click", this._handleInputClickBound), this.container.removeEventListener("mousedown", this._handleContainerMousedownAndTouchstartBound), this.container.removeEventListener("mouseup", this._handleContainerMouseupAndTouchendBound), void 0 !== window.ontouchstart && (this.container.removeEventListener("touchstart", this._handleContainerMousedownAndTouchstartBound), this.container.removeEventListener("touchend", this._handleContainerMouseupAndTouchendBound));
	        }
	      }, {
	        key: "_setupDropdown",
	        value: function value() {
	          var e = this;
	          this.container = document.createElement("ul"), this.container.id = "autocomplete-options-" + M.guid(), h(this.container).addClass("autocomplete-content dropdown-content"), this.$inputField.append(this.container), this.el.setAttribute("data-target", this.container.id), this.dropdown = M.Dropdown.init(this.el, {
	            autoFocus: !1,
	            closeOnClick: !1,
	            coverTrigger: !1,
	            onItemClick: function onItemClick(t) {
	              e.selectOption(h(t));
	            }
	          }), this.el.removeEventListener("click", this.dropdown._handleClickBound);
	        }
	      }, {
	        key: "_removeDropdown",
	        value: function value() {
	          this.container.parentNode.removeChild(this.container);
	        }
	      }, {
	        key: "_handleInputBlur",
	        value: function value() {
	          this._mousedown || (this.close(), this._resetAutocomplete());
	        }
	      }, {
	        key: "_handleInputKeyupAndFocus",
	        value: function value(t) {
	          "keyup" === t.type && (s._keydown = !1), this.count = 0;
	          var e = this.el.value.toLowerCase();
	          13 !== t.keyCode && 38 !== t.keyCode && 40 !== t.keyCode && (this.oldVal === e || !M.tabPressed && "focus" === t.type || this.open(), this.oldVal = e);
	        }
	      }, {
	        key: "_handleInputKeydown",
	        value: function value(t) {
	          s._keydown = !0;
	          var e = t.keyCode,
	              i = void 0,
	              n = h(this.container).children("li").length;
	          e === M.keys.ENTER && 0 <= this.activeIndex ? (i = h(this.container).children("li").eq(this.activeIndex)).length && (this.selectOption(i), t.preventDefault()) : e !== M.keys.ARROW_UP && e !== M.keys.ARROW_DOWN || (t.preventDefault(), e === M.keys.ARROW_UP && 0 < this.activeIndex && this.activeIndex--, e === M.keys.ARROW_DOWN && this.activeIndex < n - 1 && this.activeIndex++, this.$active.removeClass("active"), 0 <= this.activeIndex && (this.$active = h(this.container).children("li").eq(this.activeIndex), this.$active.addClass("active")));
	        }
	      }, {
	        key: "_handleInputClick",
	        value: function value(t) {
	          this.open();
	        }
	      }, {
	        key: "_handleContainerMousedownAndTouchstart",
	        value: function value(t) {
	          this._mousedown = !0;
	        }
	      }, {
	        key: "_handleContainerMouseupAndTouchend",
	        value: function value(t) {
	          this._mousedown = !1;
	        }
	      }, {
	        key: "_highlight",
	        value: function value(t, e) {
	          var i = e.find("img"),
	              n = e.text().toLowerCase().indexOf("" + t.toLowerCase()),
	              s = n + t.length - 1,
	              o = e.text().slice(0, n),
	              a = e.text().slice(n, s + 1),
	              r = e.text().slice(s + 1);
	          e.html("<span>" + o + "<span class='highlight'>" + a + "</span>" + r + "</span>"), i.length && e.prepend(i);
	        }
	      }, {
	        key: "_resetCurrentElement",
	        value: function value() {
	          this.activeIndex = -1, this.$active.removeClass("active");
	        }
	      }, {
	        key: "_resetAutocomplete",
	        value: function value() {
	          h(this.container).empty(), this._resetCurrentElement(), this.oldVal = null, this.isOpen = !1, this._mousedown = !1;
	        }
	      }, {
	        key: "selectOption",
	        value: function value(t) {
	          var e = t.text().trim();
	          this.el.value = e, this.$el.trigger("change"), this._resetAutocomplete(), this.close(), "function" == typeof this.options.onAutocomplete && this.options.onAutocomplete.call(this, e);
	        }
	      }, {
	        key: "_renderDropdown",
	        value: function value(t, i) {
	          var n = this;

	          this._resetAutocomplete();

	          var e = [];

	          for (var s in t) {
	            if (t.hasOwnProperty(s) && -1 !== s.toLowerCase().indexOf(i)) {
	              if (this.count >= this.options.limit) break;
	              var o = {
	                data: t[s],
	                key: s
	              };
	              e.push(o), this.count++;
	            }
	          }

	          if (this.options.sortFunction) {
	            e.sort(function (t, e) {
	              return n.options.sortFunction(t.key.toLowerCase(), e.key.toLowerCase(), i.toLowerCase());
	            });
	          }

	          for (var a = 0; a < e.length; a++) {
	            var r = e[a],
	                l = h("<li></li>");
	            r.data ? l.append('<img src="' + r.data + '" class="right circle"><span>' + r.key + "</span>") : l.append("<span>" + r.key + "</span>"), h(this.container).append(l), this._highlight(i, l);
	          }
	        }
	      }, {
	        key: "open",
	        value: function value() {
	          var t = this.el.value.toLowerCase();
	          this._resetAutocomplete(), t.length >= this.options.minLength && (this.isOpen = !0, this._renderDropdown(this.options.data, t)), this.dropdown.isOpen ? this.dropdown.recalculateDimensions() : this.dropdown.open();
	        }
	      }, {
	        key: "close",
	        value: function value() {
	          this.dropdown.close();
	        }
	      }, {
	        key: "updateData",
	        value: function value(t) {
	          var e = this.el.value.toLowerCase();
	          this.options.data = t, this.isOpen && this._renderDropdown(t, e);
	        }
	      }], [{
	        key: "init",
	        value: function value(t, e) {
	          return _get(s.__proto__ || Object.getPrototypeOf(s), "init", this).call(this, this, t, e);
	        }
	      }, {
	        key: "getInstance",
	        value: function value(t) {
	          return (t.jquery ? t[0] : t).M_Autocomplete;
	        }
	      }, {
	        key: "defaults",
	        get: function get() {
	          return e;
	        }
	      }]), s;
	    }();

	    t._keydown = !1, M.Autocomplete = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "autocomplete", "M_Autocomplete");
	  }(cash), function (d) {
	    M.updateTextFields = function () {
	      d("input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], input[type=date], input[type=time], textarea").each(function (t, e) {
	        var i = d(this);
	        0 < t.value.length || d(t).is(":focus") || t.autofocus || null !== i.attr("placeholder") ? i.siblings("label").addClass("active") : t.validity ? i.siblings("label").toggleClass("active", !0 === t.validity.badInput) : i.siblings("label").removeClass("active");
	      });
	    }, M.validate_field = function (t) {
	      var e = null !== t.attr("data-length"),
	          i = parseInt(t.attr("data-length")),
	          n = t[0].value.length;
	      0 !== n || !1 !== t[0].validity.badInput || t.is(":required") ? t.hasClass("validate") && (t.is(":valid") && e && n <= i || t.is(":valid") && !e ? (t.removeClass("invalid"), t.addClass("valid")) : (t.removeClass("valid"), t.addClass("invalid"))) : t.hasClass("validate") && (t.removeClass("valid"), t.removeClass("invalid"));
	    }, M.textareaAutoResize = function (t) {
	      if (t instanceof Element && (t = d(t)), t.length) {
	        var e = d(".hiddendiv").first();
	        e.length || (e = d('<div class="hiddendiv common"></div>'), d("body").append(e));
	        var i = t.css("font-family"),
	            n = t.css("font-size"),
	            s = t.css("line-height"),
	            o = t.css("padding-top"),
	            a = t.css("padding-right"),
	            r = t.css("padding-bottom"),
	            l = t.css("padding-left");
	        n && e.css("font-size", n), i && e.css("font-family", i), s && e.css("line-height", s), o && e.css("padding-top", o), a && e.css("padding-right", a), r && e.css("padding-bottom", r), l && e.css("padding-left", l), t.data("original-height") || t.data("original-height", t.height()), "off" === t.attr("wrap") && e.css("overflow-wrap", "normal").css("white-space", "pre"), e.text(t[0].value + "\n");
	        var h = e.html().replace(/\n/g, "<br>");
	        e.html(h), 0 < t[0].offsetWidth && 0 < t[0].offsetHeight ? e.css("width", t.width() + "px") : e.css("width", window.innerWidth / 2 + "px"), t.data("original-height") <= e.innerHeight() ? t.css("height", e.innerHeight() + "px") : t[0].value.length < t.data("previous-length") && t.css("height", t.data("original-height") + "px"), t.data("previous-length", t[0].value.length);
	      } else console.error("No textarea element found");
	    }, d(document).ready(function () {
	      var n = "input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], input[type=date], input[type=time], textarea";
	      d(document).on("change", n, function () {
	        0 === this.value.length && null === d(this).attr("placeholder") || d(this).siblings("label").addClass("active"), M.validate_field(d(this));
	      }), d(document).ready(function () {
	        M.updateTextFields();
	      }), d(document).on("reset", function (t) {
	        var e = d(t.target);
	        e.is("form") && (e.find(n).removeClass("valid").removeClass("invalid"), e.find(n).each(function (t) {
	          this.value.length && d(this).siblings("label").removeClass("active");
	        }), setTimeout(function () {
	          e.find("select").each(function () {
	            this.M_FormSelect && d(this).trigger("change");
	          });
	        }, 0));
	      }), document.addEventListener("focus", function (t) {
	        d(t.target).is(n) && d(t.target).siblings("label, .prefix").addClass("active");
	      }, !0), document.addEventListener("blur", function (t) {
	        var e = d(t.target);

	        if (e.is(n)) {
	          var i = ".prefix";
	          0 === e[0].value.length && !0 !== e[0].validity.badInput && null === e.attr("placeholder") && (i += ", label"), e.siblings(i).removeClass("active"), M.validate_field(e);
	        }
	      }, !0);
	      d(document).on("keyup", "input[type=radio], input[type=checkbox]", function (t) {
	        if (t.which === M.keys.TAB) return d(this).addClass("tabbed"), void d(this).one("blur", function (t) {
	          d(this).removeClass("tabbed");
	        });
	      });
	      var t = ".materialize-textarea";
	      d(t).each(function () {
	        var t = d(this);
	        t.data("original-height", t.height()), t.data("previous-length", this.value.length), M.textareaAutoResize(t);
	      }), d(document).on("keyup", t, function () {
	        M.textareaAutoResize(d(this));
	      }), d(document).on("keydown", t, function () {
	        M.textareaAutoResize(d(this));
	      }), d(document).on("change", '.file-field input[type="file"]', function () {
	        for (var t = d(this).closest(".file-field").find("input.file-path"), e = d(this)[0].files, i = [], n = 0; n < e.length; n++) {
	          i.push(e[n].name);
	        }

	        t[0].value = i.join(", "), t.trigger("change");
	      });
	    });
	  }(cash), function (s, o) {

	    var e = {
	      indicators: !0,
	      height: 400,
	      duration: 500,
	      interval: 6e3
	    },
	        t = function (t) {
	      function n(t, e) {
	        _classCallCheck(this, n);

	        var i = _possibleConstructorReturn(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, n, t, e));

	        return (i.el.M_Slider = i).options = s.extend({}, n.defaults, e), i.$slider = i.$el.find(".slides"), i.$slides = i.$slider.children("li"), i.activeIndex = i.$slides.filter(function (t) {
	          return s(t).hasClass("active");
	        }).first().index(), -1 != i.activeIndex && (i.$active = i.$slides.eq(i.activeIndex)), i._setSliderHeight(), i.$slides.find(".caption").each(function (t) {
	          i._animateCaptionIn(t, 0);
	        }), i.$slides.find("img").each(function (t) {
	          var e = "data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
	          s(t).attr("src") !== e && (s(t).css("background-image", 'url("' + s(t).attr("src") + '")'), s(t).attr("src", e));
	        }), i._setupIndicators(), i.$active ? i.$active.css("display", "block") : (i.$slides.first().addClass("active"), o({
	          targets: i.$slides.first()[0],
	          opacity: 1,
	          duration: i.options.duration,
	          easing: "easeOutQuad"
	        }), i.activeIndex = 0, i.$active = i.$slides.eq(i.activeIndex), i.options.indicators && i.$indicators.eq(i.activeIndex).addClass("active")), i.$active.find("img").each(function (t) {
	          o({
	            targets: i.$active.find(".caption")[0],
	            opacity: 1,
	            translateX: 0,
	            translateY: 0,
	            duration: i.options.duration,
	            easing: "easeOutQuad"
	          });
	        }), i._setupEventHandlers(), i.start(), i;
	      }

	      return _inherits(n, Component), _createClass(n, [{
	        key: "destroy",
	        value: function value() {
	          this.pause(), this._removeIndicators(), this._removeEventHandlers(), this.el.M_Slider = void 0;
	        }
	      }, {
	        key: "_setupEventHandlers",
	        value: function value() {
	          var e = this;
	          this._handleIntervalBound = this._handleInterval.bind(this), this._handleIndicatorClickBound = this._handleIndicatorClick.bind(this), this.options.indicators && this.$indicators.each(function (t) {
	            t.addEventListener("click", e._handleIndicatorClickBound);
	          });
	        }
	      }, {
	        key: "_removeEventHandlers",
	        value: function value() {
	          var e = this;
	          this.options.indicators && this.$indicators.each(function (t) {
	            t.removeEventListener("click", e._handleIndicatorClickBound);
	          });
	        }
	      }, {
	        key: "_handleIndicatorClick",
	        value: function value(t) {
	          var e = s(t.target).index();
	          this.set(e);
	        }
	      }, {
	        key: "_handleInterval",
	        value: function value() {
	          var t = this.$slider.find(".active").index();
	          this.$slides.length === t + 1 ? t = 0 : t += 1, this.set(t);
	        }
	      }, {
	        key: "_animateCaptionIn",
	        value: function value(t, e) {
	          var i = {
	            targets: t,
	            opacity: 0,
	            duration: e,
	            easing: "easeOutQuad"
	          };
	          s(t).hasClass("center-align") ? i.translateY = -100 : s(t).hasClass("right-align") ? i.translateX = 100 : s(t).hasClass("left-align") && (i.translateX = -100), o(i);
	        }
	      }, {
	        key: "_setSliderHeight",
	        value: function value() {
	          this.$el.hasClass("fullscreen") || (this.options.indicators ? this.$el.css("height", this.options.height + 40 + "px") : this.$el.css("height", this.options.height + "px"), this.$slider.css("height", this.options.height + "px"));
	        }
	      }, {
	        key: "_setupIndicators",
	        value: function value() {
	          var n = this;
	          this.options.indicators && (this.$indicators = s('<ul class="indicators"></ul>'), this.$slides.each(function (t, e) {
	            var i = s('<li class="indicator-item"></li>');
	            n.$indicators.append(i[0]);
	          }), this.$el.append(this.$indicators[0]), this.$indicators = this.$indicators.children("li.indicator-item"));
	        }
	      }, {
	        key: "_removeIndicators",
	        value: function value() {
	          this.$el.find("ul.indicators").remove();
	        }
	      }, {
	        key: "set",
	        value: function value(t) {
	          var e = this;

	          if (t >= this.$slides.length ? t = 0 : t < 0 && (t = this.$slides.length - 1), this.activeIndex != t) {
	            this.$active = this.$slides.eq(this.activeIndex);
	            var i = this.$active.find(".caption");
	            this.$active.removeClass("active"), o({
	              targets: this.$active[0],
	              opacity: 0,
	              duration: this.options.duration,
	              easing: "easeOutQuad",
	              complete: function complete() {
	                e.$slides.not(".active").each(function (t) {
	                  o({
	                    targets: t,
	                    opacity: 0,
	                    translateX: 0,
	                    translateY: 0,
	                    duration: 0,
	                    easing: "easeOutQuad"
	                  });
	                });
	              }
	            }), this._animateCaptionIn(i[0], this.options.duration), this.options.indicators && (this.$indicators.eq(this.activeIndex).removeClass("active"), this.$indicators.eq(t).addClass("active")), o({
	              targets: this.$slides.eq(t)[0],
	              opacity: 1,
	              duration: this.options.duration,
	              easing: "easeOutQuad"
	            }), o({
	              targets: this.$slides.eq(t).find(".caption")[0],
	              opacity: 1,
	              translateX: 0,
	              translateY: 0,
	              duration: this.options.duration,
	              delay: this.options.duration,
	              easing: "easeOutQuad"
	            }), this.$slides.eq(t).addClass("active"), this.activeIndex = t, this.start();
	          }
	        }
	      }, {
	        key: "pause",
	        value: function value() {
	          clearInterval(this.interval);
	        }
	      }, {
	        key: "start",
	        value: function value() {
	          clearInterval(this.interval), this.interval = setInterval(this._handleIntervalBound, this.options.duration + this.options.interval);
	        }
	      }, {
	        key: "next",
	        value: function value() {
	          var t = this.activeIndex + 1;
	          t >= this.$slides.length ? t = 0 : t < 0 && (t = this.$slides.length - 1), this.set(t);
	        }
	      }, {
	        key: "prev",
	        value: function value() {
	          var t = this.activeIndex - 1;
	          t >= this.$slides.length ? t = 0 : t < 0 && (t = this.$slides.length - 1), this.set(t);
	        }
	      }], [{
	        key: "init",
	        value: function value(t, e) {
	          return _get(n.__proto__ || Object.getPrototypeOf(n), "init", this).call(this, this, t, e);
	        }
	      }, {
	        key: "getInstance",
	        value: function value(t) {
	          return (t.jquery ? t[0] : t).M_Slider;
	        }
	      }, {
	        key: "defaults",
	        get: function get() {
	          return e;
	        }
	      }]), n;
	    }();

	    M.Slider = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "slider", "M_Slider");
	  }(cash, M.anime), function (n, s) {
	    n(document).on("click", ".card", function (t) {
	      if (n(this).children(".card-reveal").length) {
	        var i = n(t.target).closest(".card");
	        void 0 === i.data("initialOverflow") && i.data("initialOverflow", void 0 === i.css("overflow") ? "" : i.css("overflow"));
	        var e = n(this).find(".card-reveal");
	        n(t.target).is(n(".card-reveal .card-title")) || n(t.target).is(n(".card-reveal .card-title i")) ? s({
	          targets: e[0],
	          translateY: 0,
	          duration: 225,
	          easing: "easeInOutQuad",
	          complete: function complete(t) {
	            var e = t.animatables[0].target;
	            n(e).css({
	              display: "none"
	            }), i.css("overflow", i.data("initialOverflow"));
	          }
	        }) : (n(t.target).is(n(".card .activator")) || n(t.target).is(n(".card .activator i"))) && (i.css("overflow", "hidden"), e.css({
	          display: "block"
	        }), s({
	          targets: e[0],
	          translateY: "-100%",
	          duration: 300,
	          easing: "easeInOutQuad"
	        }));
	      }
	    });
	  }(cash, M.anime), function (h) {

	    var e = {
	      data: [],
	      placeholder: "",
	      secondaryPlaceholder: "",
	      autocompleteOptions: {},
	      limit: 1 / 0,
	      onChipAdd: null,
	      onChipSelect: null,
	      onChipDelete: null
	    },
	        t = function (t) {
	      function l(t, e) {
	        _classCallCheck(this, l);

	        var i = _possibleConstructorReturn(this, (l.__proto__ || Object.getPrototypeOf(l)).call(this, l, t, e));

	        return (i.el.M_Chips = i).options = h.extend({}, l.defaults, e), i.$el.addClass("chips input-field"), i.chipsData = [], i.$chips = h(), i._setupInput(), i.hasAutocomplete = 0 < Object.keys(i.options.autocompleteOptions).length, i.$input.attr("id") || i.$input.attr("id", M.guid()), i.options.data.length && (i.chipsData = i.options.data, i._renderChips(i.chipsData)), i.hasAutocomplete && i._setupAutocomplete(), i._setPlaceholder(), i._setupLabel(), i._setupEventHandlers(), i;
	      }

	      return _inherits(l, Component), _createClass(l, [{
	        key: "getData",
	        value: function value() {
	          return this.chipsData;
	        }
	      }, {
	        key: "destroy",
	        value: function value() {
	          this._removeEventHandlers(), this.$chips.remove(), this.el.M_Chips = void 0;
	        }
	      }, {
	        key: "_setupEventHandlers",
	        value: function value() {
	          this._handleChipClickBound = this._handleChipClick.bind(this), this._handleInputKeydownBound = this._handleInputKeydown.bind(this), this._handleInputFocusBound = this._handleInputFocus.bind(this), this._handleInputBlurBound = this._handleInputBlur.bind(this), this.el.addEventListener("click", this._handleChipClickBound), document.addEventListener("keydown", l._handleChipsKeydown), document.addEventListener("keyup", l._handleChipsKeyup), this.el.addEventListener("blur", l._handleChipsBlur, !0), this.$input[0].addEventListener("focus", this._handleInputFocusBound), this.$input[0].addEventListener("blur", this._handleInputBlurBound), this.$input[0].addEventListener("keydown", this._handleInputKeydownBound);
	        }
	      }, {
	        key: "_removeEventHandlers",
	        value: function value() {
	          this.el.removeEventListener("click", this._handleChipClickBound), document.removeEventListener("keydown", l._handleChipsKeydown), document.removeEventListener("keyup", l._handleChipsKeyup), this.el.removeEventListener("blur", l._handleChipsBlur, !0), this.$input[0].removeEventListener("focus", this._handleInputFocusBound), this.$input[0].removeEventListener("blur", this._handleInputBlurBound), this.$input[0].removeEventListener("keydown", this._handleInputKeydownBound);
	        }
	      }, {
	        key: "_handleChipClick",
	        value: function value(t) {
	          var e = h(t.target).closest(".chip"),
	              i = h(t.target).is(".close");

	          if (e.length) {
	            var n = e.index();
	            i ? (this.deleteChip(n), this.$input[0].focus()) : this.selectChip(n);
	          } else this.$input[0].focus();
	        }
	      }, {
	        key: "_handleInputFocus",
	        value: function value() {
	          this.$el.addClass("focus");
	        }
	      }, {
	        key: "_handleInputBlur",
	        value: function value() {
	          this.$el.removeClass("focus");
	        }
	      }, {
	        key: "_handleInputKeydown",
	        value: function value(t) {
	          if (l._keydown = !0, 13 === t.keyCode) {
	            if (this.hasAutocomplete && this.autocomplete && this.autocomplete.isOpen) return;
	            t.preventDefault(), this.addChip({
	              tag: this.$input[0].value
	            }), this.$input[0].value = "";
	          } else 8 !== t.keyCode && 37 !== t.keyCode || "" !== this.$input[0].value || !this.chipsData.length || (t.preventDefault(), this.selectChip(this.chipsData.length - 1));
	        }
	      }, {
	        key: "_renderChip",
	        value: function value(t) {
	          if (t.tag) {
	            var e = document.createElement("div"),
	                i = document.createElement("i");

	            if (e.classList.add("chip"), e.textContent = t.tag, e.setAttribute("tabindex", 0), h(i).addClass("material-icons close"), i.textContent = "close", t.image) {
	              var n = document.createElement("img");
	              n.setAttribute("src", t.image), e.insertBefore(n, e.firstChild);
	            }

	            return e.appendChild(i), e;
	          }
	        }
	      }, {
	        key: "_renderChips",
	        value: function value() {
	          this.$chips.remove();

	          for (var t = 0; t < this.chipsData.length; t++) {
	            var e = this._renderChip(this.chipsData[t]);

	            this.$el.append(e), this.$chips.add(e);
	          }

	          this.$el.append(this.$input[0]);
	        }
	      }, {
	        key: "_setupAutocomplete",
	        value: function value() {
	          var e = this;
	          this.options.autocompleteOptions.onAutocomplete = function (t) {
	            e.addChip({
	              tag: t
	            }), e.$input[0].value = "", e.$input[0].focus();
	          }, this.autocomplete = M.Autocomplete.init(this.$input[0], this.options.autocompleteOptions);
	        }
	      }, {
	        key: "_setupInput",
	        value: function value() {
	          this.$input = this.$el.find("input"), this.$input.length || (this.$input = h("<input></input>"), this.$el.append(this.$input)), this.$input.addClass("input");
	        }
	      }, {
	        key: "_setupLabel",
	        value: function value() {
	          this.$label = this.$el.find("label"), this.$label.length && this.$label.setAttribute("for", this.$input.attr("id"));
	        }
	      }, {
	        key: "_setPlaceholder",
	        value: function value() {
	          void 0 !== this.chipsData && !this.chipsData.length && this.options.placeholder ? h(this.$input).prop("placeholder", this.options.placeholder) : (void 0 === this.chipsData || this.chipsData.length) && this.options.secondaryPlaceholder && h(this.$input).prop("placeholder", this.options.secondaryPlaceholder);
	        }
	      }, {
	        key: "_isValid",
	        value: function value(t) {
	          if (t.hasOwnProperty("tag") && "" !== t.tag) {
	            for (var e = !1, i = 0; i < this.chipsData.length; i++) {
	              if (this.chipsData[i].tag === t.tag) {
	                e = !0;
	                break;
	              }
	            }

	            return !e;
	          }

	          return !1;
	        }
	      }, {
	        key: "addChip",
	        value: function value(t) {
	          if (this._isValid(t) && !(this.chipsData.length >= this.options.limit)) {
	            var e = this._renderChip(t);

	            this.$chips.add(e), this.chipsData.push(t), h(this.$input).before(e), this._setPlaceholder(), "function" == typeof this.options.onChipAdd && this.options.onChipAdd.call(this, this.$el, e);
	          }
	        }
	      }, {
	        key: "deleteChip",
	        value: function value(t) {
	          var e = this.$chips.eq(t);
	          this.$chips.eq(t).remove(), this.$chips = this.$chips.filter(function (t) {
	            return 0 <= h(t).index();
	          }), this.chipsData.splice(t, 1), this._setPlaceholder(), "function" == typeof this.options.onChipDelete && this.options.onChipDelete.call(this, this.$el, e[0]);
	        }
	      }, {
	        key: "selectChip",
	        value: function value(t) {
	          var e = this.$chips.eq(t);
	          (this._selectedChip = e)[0].focus(), "function" == typeof this.options.onChipSelect && this.options.onChipSelect.call(this, this.$el, e[0]);
	        }
	      }], [{
	        key: "init",
	        value: function value(t, e) {
	          return _get(l.__proto__ || Object.getPrototypeOf(l), "init", this).call(this, this, t, e);
	        }
	      }, {
	        key: "getInstance",
	        value: function value(t) {
	          return (t.jquery ? t[0] : t).M_Chips;
	        }
	      }, {
	        key: "_handleChipsKeydown",
	        value: function value(t) {
	          l._keydown = !0;
	          var e = h(t.target).closest(".chips"),
	              i = t.target && e.length;

	          if (!h(t.target).is("input, textarea") && i) {
	            var n = e[0].M_Chips;

	            if (8 === t.keyCode || 46 === t.keyCode) {
	              t.preventDefault();
	              var s = n.chipsData.length;

	              if (n._selectedChip) {
	                var o = n._selectedChip.index();

	                n.deleteChip(o), n._selectedChip = null, s = Math.max(o - 1, 0);
	              }

	              n.chipsData.length && n.selectChip(s);
	            } else if (37 === t.keyCode) {
	              if (n._selectedChip) {
	                var a = n._selectedChip.index() - 1;
	                if (a < 0) return;
	                n.selectChip(a);
	              }
	            } else if (39 === t.keyCode && n._selectedChip) {
	              var r = n._selectedChip.index() + 1;
	              r >= n.chipsData.length ? n.$input[0].focus() : n.selectChip(r);
	            }
	          }
	        }
	      }, {
	        key: "_handleChipsKeyup",
	        value: function value(t) {
	          l._keydown = !1;
	        }
	      }, {
	        key: "_handleChipsBlur",
	        value: function value(t) {
	          l._keydown || (h(t.target).closest(".chips")[0].M_Chips._selectedChip = null);
	        }
	      }, {
	        key: "defaults",
	        get: function get() {
	          return e;
	        }
	      }]), l;
	    }();

	    t._keydown = !1, M.Chips = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "chips", "M_Chips"), h(document).ready(function () {
	      h(document.body).on("click", ".chip .close", function () {
	        var t = h(this).closest(".chips");
	        t.length && t[0].M_Chips || h(this).closest(".chip").remove();
	      });
	    });
	  }(cash), function (s) {

	    var e = {
	      top: 0,
	      bottom: 1 / 0,
	      offset: 0,
	      onPositionChange: null
	    },
	        t = function (t) {
	      function n(t, e) {
	        _classCallCheck(this, n);

	        var i = _possibleConstructorReturn(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, n, t, e));

	        return (i.el.M_Pushpin = i).options = s.extend({}, n.defaults, e), i.originalOffset = i.el.offsetTop, n._pushpins.push(i), i._setupEventHandlers(), i._updatePosition(), i;
	      }

	      return _inherits(n, Component), _createClass(n, [{
	        key: "destroy",
	        value: function value() {
	          this.el.style.top = null, this._removePinClasses(), this._removeEventHandlers();

	          var t = n._pushpins.indexOf(this);

	          n._pushpins.splice(t, 1);
	        }
	      }, {
	        key: "_setupEventHandlers",
	        value: function value() {
	          document.addEventListener("scroll", n._updateElements);
	        }
	      }, {
	        key: "_removeEventHandlers",
	        value: function value() {
	          document.removeEventListener("scroll", n._updateElements);
	        }
	      }, {
	        key: "_updatePosition",
	        value: function value() {
	          var t = M.getDocumentScrollTop() + this.options.offset;
	          this.options.top <= t && this.options.bottom >= t && !this.el.classList.contains("pinned") && (this._removePinClasses(), this.el.style.top = this.options.offset + "px", this.el.classList.add("pinned"), "function" == typeof this.options.onPositionChange && this.options.onPositionChange.call(this, "pinned")), t < this.options.top && !this.el.classList.contains("pin-top") && (this._removePinClasses(), this.el.style.top = 0, this.el.classList.add("pin-top"), "function" == typeof this.options.onPositionChange && this.options.onPositionChange.call(this, "pin-top")), t > this.options.bottom && !this.el.classList.contains("pin-bottom") && (this._removePinClasses(), this.el.classList.add("pin-bottom"), this.el.style.top = this.options.bottom - this.originalOffset + "px", "function" == typeof this.options.onPositionChange && this.options.onPositionChange.call(this, "pin-bottom"));
	        }
	      }, {
	        key: "_removePinClasses",
	        value: function value() {
	          this.el.classList.remove("pin-top"), this.el.classList.remove("pinned"), this.el.classList.remove("pin-bottom");
	        }
	      }], [{
	        key: "init",
	        value: function value(t, e) {
	          return _get(n.__proto__ || Object.getPrototypeOf(n), "init", this).call(this, this, t, e);
	        }
	      }, {
	        key: "getInstance",
	        value: function value(t) {
	          return (t.jquery ? t[0] : t).M_Pushpin;
	        }
	      }, {
	        key: "_updateElements",
	        value: function value() {
	          for (var t in n._pushpins) {
	            n._pushpins[t]._updatePosition();
	          }
	        }
	      }, {
	        key: "defaults",
	        get: function get() {
	          return e;
	        }
	      }]), n;
	    }();

	    t._pushpins = [], M.Pushpin = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "pushpin", "M_Pushpin");
	  }(cash), function (r, s) {

	    var e = {
	      direction: "top",
	      hoverEnabled: !0,
	      toolbarEnabled: !1
	    };
	    r.fn.reverse = [].reverse;

	    var t = function (t) {
	      function n(t, e) {
	        _classCallCheck(this, n);

	        var i = _possibleConstructorReturn(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, n, t, e));

	        return (i.el.M_FloatingActionButton = i).options = r.extend({}, n.defaults, e), i.isOpen = !1, i.$anchor = i.$el.children("a").first(), i.$menu = i.$el.children("ul").first(), i.$floatingBtns = i.$el.find("ul .btn-floating"), i.$floatingBtnsReverse = i.$el.find("ul .btn-floating").reverse(), i.offsetY = 0, i.offsetX = 0, i.$el.addClass("direction-" + i.options.direction), "top" === i.options.direction ? i.offsetY = 40 : "right" === i.options.direction ? i.offsetX = -40 : "bottom" === i.options.direction ? i.offsetY = -40 : i.offsetX = 40, i._setupEventHandlers(), i;
	      }

	      return _inherits(n, Component), _createClass(n, [{
	        key: "destroy",
	        value: function value() {
	          this._removeEventHandlers(), this.el.M_FloatingActionButton = void 0;
	        }
	      }, {
	        key: "_setupEventHandlers",
	        value: function value() {
	          this._handleFABClickBound = this._handleFABClick.bind(this), this._handleOpenBound = this.open.bind(this), this._handleCloseBound = this.close.bind(this), this.options.hoverEnabled && !this.options.toolbarEnabled ? (this.el.addEventListener("mouseenter", this._handleOpenBound), this.el.addEventListener("mouseleave", this._handleCloseBound)) : this.el.addEventListener("click", this._handleFABClickBound);
	        }
	      }, {
	        key: "_removeEventHandlers",
	        value: function value() {
	          this.options.hoverEnabled && !this.options.toolbarEnabled ? (this.el.removeEventListener("mouseenter", this._handleOpenBound), this.el.removeEventListener("mouseleave", this._handleCloseBound)) : this.el.removeEventListener("click", this._handleFABClickBound);
	        }
	      }, {
	        key: "_handleFABClick",
	        value: function value() {
	          this.isOpen ? this.close() : this.open();
	        }
	      }, {
	        key: "_handleDocumentClick",
	        value: function value(t) {
	          r(t.target).closest(this.$menu).length || this.close();
	        }
	      }, {
	        key: "open",
	        value: function value() {
	          this.isOpen || (this.options.toolbarEnabled ? this._animateInToolbar() : this._animateInFAB(), this.isOpen = !0);
	        }
	      }, {
	        key: "close",
	        value: function value() {
	          this.isOpen && (this.options.toolbarEnabled ? (window.removeEventListener("scroll", this._handleCloseBound, !0), document.body.removeEventListener("click", this._handleDocumentClickBound, !0), this._animateOutToolbar()) : this._animateOutFAB(), this.isOpen = !1);
	        }
	      }, {
	        key: "_animateInFAB",
	        value: function value() {
	          var e = this;
	          this.$el.addClass("active");
	          var i = 0;
	          this.$floatingBtnsReverse.each(function (t) {
	            s({
	              targets: t,
	              opacity: 1,
	              scale: [.4, 1],
	              translateY: [e.offsetY, 0],
	              translateX: [e.offsetX, 0],
	              duration: 275,
	              delay: i,
	              easing: "easeInOutQuad"
	            }), i += 40;
	          });
	        }
	      }, {
	        key: "_animateOutFAB",
	        value: function value() {
	          var e = this;
	          this.$floatingBtnsReverse.each(function (t) {
	            s.remove(t), s({
	              targets: t,
	              opacity: 0,
	              scale: .4,
	              translateY: e.offsetY,
	              translateX: e.offsetX,
	              duration: 175,
	              easing: "easeOutQuad",
	              complete: function complete() {
	                e.$el.removeClass("active");
	              }
	            });
	          });
	        }
	      }, {
	        key: "_animateInToolbar",
	        value: function value() {
	          var t,
	              e = this,
	              i = window.innerWidth,
	              n = window.innerHeight,
	              s = this.el.getBoundingClientRect(),
	              o = r('<div class="fab-backdrop"></div>'),
	              a = this.$anchor.css("background-color");
	          this.$anchor.append(o), this.offsetX = s.left - i / 2 + s.width / 2, this.offsetY = n - s.bottom, t = i / o[0].clientWidth, this.btnBottom = s.bottom, this.btnLeft = s.left, this.btnWidth = s.width, this.$el.addClass("active"), this.$el.css({
	            "text-align": "center",
	            width: "100%",
	            bottom: 0,
	            left: 0,
	            transform: "translateX(" + this.offsetX + "px)",
	            transition: "none"
	          }), this.$anchor.css({
	            transform: "translateY(" + -this.offsetY + "px)",
	            transition: "none"
	          }), o.css({
	            "background-color": a
	          }), setTimeout(function () {
	            e.$el.css({
	              transform: "",
	              transition: "transform .2s cubic-bezier(0.550, 0.085, 0.680, 0.530), background-color 0s linear .2s"
	            }), e.$anchor.css({
	              overflow: "visible",
	              transform: "",
	              transition: "transform .2s"
	            }), setTimeout(function () {
	              e.$el.css({
	                overflow: "hidden",
	                "background-color": a
	              }), o.css({
	                transform: "scale(" + t + ")",
	                transition: "transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)"
	              }), e.$menu.children("li").children("a").css({
	                opacity: 1
	              }), e._handleDocumentClickBound = e._handleDocumentClick.bind(e), window.addEventListener("scroll", e._handleCloseBound, !0), document.body.addEventListener("click", e._handleDocumentClickBound, !0);
	            }, 100);
	          }, 0);
	        }
	      }, {
	        key: "_animateOutToolbar",
	        value: function value() {
	          var t = this,
	              e = window.innerWidth,
	              i = window.innerHeight,
	              n = this.$el.find(".fab-backdrop"),
	              s = this.$anchor.css("background-color");
	          this.offsetX = this.btnLeft - e / 2 + this.btnWidth / 2, this.offsetY = i - this.btnBottom, this.$el.removeClass("active"), this.$el.css({
	            "background-color": "transparent",
	            transition: "none"
	          }), this.$anchor.css({
	            transition: "none"
	          }), n.css({
	            transform: "scale(0)",
	            "background-color": s
	          }), this.$menu.children("li").children("a").css({
	            opacity: ""
	          }), setTimeout(function () {
	            n.remove(), t.$el.css({
	              "text-align": "",
	              width: "",
	              bottom: "",
	              left: "",
	              overflow: "",
	              "background-color": "",
	              transform: "translate3d(" + -t.offsetX + "px,0,0)"
	            }), t.$anchor.css({
	              overflow: "",
	              transform: "translate3d(0," + t.offsetY + "px,0)"
	            }), setTimeout(function () {
	              t.$el.css({
	                transform: "translate3d(0,0,0)",
	                transition: "transform .2s"
	              }), t.$anchor.css({
	                transform: "translate3d(0,0,0)",
	                transition: "transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)"
	              });
	            }, 20);
	          }, 200);
	        }
	      }], [{
	        key: "init",
	        value: function value(t, e) {
	          return _get(n.__proto__ || Object.getPrototypeOf(n), "init", this).call(this, this, t, e);
	        }
	      }, {
	        key: "getInstance",
	        value: function value(t) {
	          return (t.jquery ? t[0] : t).M_FloatingActionButton;
	        }
	      }, {
	        key: "defaults",
	        get: function get() {
	          return e;
	        }
	      }]), n;
	    }();

	    M.FloatingActionButton = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "floatingActionButton", "M_FloatingActionButton");
	  }(cash, M.anime), function (g) {

	    var e = {
	      autoClose: !1,
	      format: "mmm dd, yyyy",
	      parse: null,
	      defaultDate: null,
	      setDefaultDate: !1,
	      disableWeekends: !1,
	      disableDayFn: null,
	      firstDay: 0,
	      minDate: null,
	      maxDate: null,
	      yearRange: 10,
	      minYear: 0,
	      maxYear: 9999,
	      minMonth: void 0,
	      maxMonth: void 0,
	      startRange: null,
	      endRange: null,
	      isRTL: !1,
	      showMonthAfterYear: !1,
	      showDaysInNextAndPreviousMonths: !1,
	      container: null,
	      showClearBtn: !1,
	      i18n: {
	        cancel: "Cancel",
	        clear: "Clear",
	        done: "Ok",
	        previousMonth: "‹",
	        nextMonth: "›",
	        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	        monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	        weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	        weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	        weekdaysAbbrev: ["S", "M", "T", "W", "T", "F", "S"]
	      },
	      events: [],
	      onSelect: null,
	      onOpen: null,
	      onClose: null,
	      onDraw: null
	    },
	        t = function (t) {
	      function B(t, e) {
	        _classCallCheck(this, B);

	        var i = _possibleConstructorReturn(this, (B.__proto__ || Object.getPrototypeOf(B)).call(this, B, t, e));

	        (i.el.M_Datepicker = i).options = g.extend({}, B.defaults, e), e && e.hasOwnProperty("i18n") && "object" == _typeof(e.i18n) && (i.options.i18n = g.extend({}, B.defaults.i18n, e.i18n)), i.options.minDate && i.options.minDate.setHours(0, 0, 0, 0), i.options.maxDate && i.options.maxDate.setHours(0, 0, 0, 0), i.id = M.guid(), i._setupVariables(), i._insertHTMLIntoDOM(), i._setupModal(), i._setupEventHandlers(), i.options.defaultDate || (i.options.defaultDate = new Date(Date.parse(i.el.value)));
	        var n = i.options.defaultDate;
	        return B._isDate(n) ? i.options.setDefaultDate ? (i.setDate(n, !0), i.setInputValue()) : i.gotoDate(n) : i.gotoDate(new Date()), i.isOpen = !1, i;
	      }

	      return _inherits(B, Component), _createClass(B, [{
	        key: "destroy",
	        value: function value() {
	          this._removeEventHandlers(), this.modal.destroy(), g(this.modalEl).remove(), this.destroySelects(), this.el.M_Datepicker = void 0;
	        }
	      }, {
	        key: "destroySelects",
	        value: function value() {
	          var t = this.calendarEl.querySelector(".orig-select-year");
	          t && M.FormSelect.getInstance(t).destroy();
	          var e = this.calendarEl.querySelector(".orig-select-month");
	          e && M.FormSelect.getInstance(e).destroy();
	        }
	      }, {
	        key: "_insertHTMLIntoDOM",
	        value: function value() {
	          this.options.showClearBtn && (g(this.clearBtn).css({
	            visibility: ""
	          }), this.clearBtn.innerHTML = this.options.i18n.clear), this.doneBtn.innerHTML = this.options.i18n.done, this.cancelBtn.innerHTML = this.options.i18n.cancel, this.options.container ? this.$modalEl.appendTo(this.options.container) : this.$modalEl.insertBefore(this.el);
	        }
	      }, {
	        key: "_setupModal",
	        value: function value() {
	          var t = this;
	          this.modalEl.id = "modal-" + this.id, this.modal = M.Modal.init(this.modalEl, {
	            onCloseEnd: function onCloseEnd() {
	              t.isOpen = !1;
	            }
	          });
	        }
	      }, {
	        key: "toString",
	        value: function value(t) {
	          var e = this;
	          return t = t || this.options.format, B._isDate(this.date) ? t.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g).map(function (t) {
	            return e.formats[t] ? e.formats[t]() : t;
	          }).join("") : "";
	        }
	      }, {
	        key: "setDate",
	        value: function value(t, e) {
	          if (!t) return this.date = null, this._renderDateDisplay(), this.draw();

	          if ("string" == typeof t && (t = new Date(Date.parse(t))), B._isDate(t)) {
	            var i = this.options.minDate,
	                n = this.options.maxDate;
	            B._isDate(i) && t < i ? t = i : B._isDate(n) && n < t && (t = n), this.date = new Date(t.getTime()), this._renderDateDisplay(), B._setToStartOfDay(this.date), this.gotoDate(this.date), e || "function" != typeof this.options.onSelect || this.options.onSelect.call(this, this.date);
	          }
	        }
	      }, {
	        key: "setInputValue",
	        value: function value() {
	          this.el.value = this.toString(), this.$el.trigger("change", {
	            firedBy: this
	          });
	        }
	      }, {
	        key: "_renderDateDisplay",
	        value: function value() {
	          var t = B._isDate(this.date) ? this.date : new Date(),
	              e = this.options.i18n,
	              i = e.weekdaysShort[t.getDay()],
	              n = e.monthsShort[t.getMonth()],
	              s = t.getDate();
	          this.yearTextEl.innerHTML = t.getFullYear(), this.dateTextEl.innerHTML = i + ", " + n + " " + s;
	        }
	      }, {
	        key: "gotoDate",
	        value: function value(t) {
	          var e = !0;

	          if (B._isDate(t)) {
	            if (this.calendars) {
	              var i = new Date(this.calendars[0].year, this.calendars[0].month, 1),
	                  n = new Date(this.calendars[this.calendars.length - 1].year, this.calendars[this.calendars.length - 1].month, 1),
	                  s = t.getTime();
	              n.setMonth(n.getMonth() + 1), n.setDate(n.getDate() - 1), e = s < i.getTime() || n.getTime() < s;
	            }

	            e && (this.calendars = [{
	              month: t.getMonth(),
	              year: t.getFullYear()
	            }]), this.adjustCalendars();
	          }
	        }
	      }, {
	        key: "adjustCalendars",
	        value: function value() {
	          this.calendars[0] = this.adjustCalendar(this.calendars[0]), this.draw();
	        }
	      }, {
	        key: "adjustCalendar",
	        value: function value(t) {
	          return t.month < 0 && (t.year -= Math.ceil(Math.abs(t.month) / 12), t.month += 12), 11 < t.month && (t.year += Math.floor(Math.abs(t.month) / 12), t.month -= 12), t;
	        }
	      }, {
	        key: "nextMonth",
	        value: function value() {
	          this.calendars[0].month++, this.adjustCalendars();
	        }
	      }, {
	        key: "prevMonth",
	        value: function value() {
	          this.calendars[0].month--, this.adjustCalendars();
	        }
	      }, {
	        key: "render",
	        value: function value(t, e, i) {
	          var n = this.options,
	              s = new Date(),
	              o = B._getDaysInMonth(t, e),
	              a = new Date(t, e, 1).getDay(),
	              r = [],
	              l = [];

	          B._setToStartOfDay(s), 0 < n.firstDay && (a -= n.firstDay) < 0 && (a += 7);

	          for (var h = 0 === e ? 11 : e - 1, d = 11 === e ? 0 : e + 1, u = 0 === e ? t - 1 : t, c = 11 === e ? t + 1 : t, p = B._getDaysInMonth(u, h), v = o + a, f = v; 7 < f;) {
	            f -= 7;
	          }

	          v += 7 - f;

	          for (var m = !1, g = 0, _ = 0; g < v; g++) {
	            var y = new Date(t, e, g - a + 1),
	                k = !!B._isDate(this.date) && B._compareDates(y, this.date),
	                b = B._compareDates(y, s),
	                w = -1 !== n.events.indexOf(y.toDateString()),
	                C = g < a || o + a <= g,
	                E = g - a + 1,
	                M = e,
	                O = t,
	                x = n.startRange && B._compareDates(n.startRange, y),
	                L = n.endRange && B._compareDates(n.endRange, y),
	                T = n.startRange && n.endRange && n.startRange < y && y < n.endRange;

	            C && (g < a ? (E = p + E, M = h, O = u) : (E -= o, M = d, O = c));
	            var $ = {
	              day: E,
	              month: M,
	              year: O,
	              hasEvent: w,
	              isSelected: k,
	              isToday: b,
	              isDisabled: n.minDate && y < n.minDate || n.maxDate && y > n.maxDate || n.disableWeekends && B._isWeekend(y) || n.disableDayFn && n.disableDayFn(y),
	              isEmpty: C,
	              isStartRange: x,
	              isEndRange: L,
	              isInRange: T,
	              showDaysInNextAndPreviousMonths: n.showDaysInNextAndPreviousMonths
	            };
	            l.push(this.renderDay($)), 7 == ++_ && (r.push(this.renderRow(l, n.isRTL, m)), _ = 0, m = !(l = []));
	          }

	          return this.renderTable(n, r, i);
	        }
	      }, {
	        key: "renderDay",
	        value: function value(t) {
	          var e = [],
	              i = "false";

	          if (t.isEmpty) {
	            if (!t.showDaysInNextAndPreviousMonths) return '<td class="is-empty"></td>';
	            e.push("is-outside-current-month"), e.push("is-selection-disabled");
	          }

	          return t.isDisabled && e.push("is-disabled"), t.isToday && e.push("is-today"), t.isSelected && (e.push("is-selected"), i = "true"), t.hasEvent && e.push("has-event"), t.isInRange && e.push("is-inrange"), t.isStartRange && e.push("is-startrange"), t.isEndRange && e.push("is-endrange"), '<td data-day="' + t.day + '" class="' + e.join(" ") + '" aria-selected="' + i + '"><button class="datepicker-day-button" type="button" data-year="' + t.year + '" data-month="' + t.month + '" data-day="' + t.day + '">' + t.day + "</button></td>";
	        }
	      }, {
	        key: "renderRow",
	        value: function value(t, e, i) {
	          return '<tr class="datepicker-row' + (i ? " is-selected" : "") + '">' + (e ? t.reverse() : t).join("") + "</tr>";
	        }
	      }, {
	        key: "renderTable",
	        value: function value(t, e, i) {
	          return '<div class="datepicker-table-wrapper"><table cellpadding="0" cellspacing="0" class="datepicker-table" role="grid" aria-labelledby="' + i + '">' + this.renderHead(t) + this.renderBody(e) + "</table></div>";
	        }
	      }, {
	        key: "renderHead",
	        value: function value(t) {
	          var e = void 0,
	              i = [];

	          for (e = 0; e < 7; e++) {
	            i.push('<th scope="col"><abbr title="' + this.renderDayName(t, e) + '">' + this.renderDayName(t, e, !0) + "</abbr></th>");
	          }

	          return "<thead><tr>" + (t.isRTL ? i.reverse() : i).join("") + "</tr></thead>";
	        }
	      }, {
	        key: "renderBody",
	        value: function value(t) {
	          return "<tbody>" + t.join("") + "</tbody>";
	        }
	      }, {
	        key: "renderTitle",
	        value: function value(t, e, i, n, s, o) {
	          var a,
	              r,
	              l = void 0,
	              h = void 0,
	              d = void 0,
	              u = this.options,
	              c = i === u.minYear,
	              p = i === u.maxYear,
	              v = '<div id="' + o + '" class="datepicker-controls" role="heading" aria-live="assertive">',
	              f = !0,
	              m = !0;

	          for (d = [], l = 0; l < 12; l++) {
	            d.push('<option value="' + (i === s ? l - e : 12 + l - e) + '"' + (l === n ? ' selected="selected"' : "") + (c && l < u.minMonth || p && l > u.maxMonth ? 'disabled="disabled"' : "") + ">" + u.i18n.months[l] + "</option>");
	          }

	          for (a = '<select class="datepicker-select orig-select-month" tabindex="-1">' + d.join("") + "</select>", g.isArray(u.yearRange) ? (l = u.yearRange[0], h = u.yearRange[1] + 1) : (l = i - u.yearRange, h = 1 + i + u.yearRange), d = []; l < h && l <= u.maxYear; l++) {
	            l >= u.minYear && d.push('<option value="' + l + '" ' + (l === i ? 'selected="selected"' : "") + ">" + l + "</option>");
	          }

	          r = '<select class="datepicker-select orig-select-year" tabindex="-1">' + d.join("") + "</select>";
	          v += '<button class="month-prev' + (f ? "" : " is-disabled") + '" type="button"><svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/><path d="M0-.5h24v24H0z" fill="none"/></svg></button>', v += '<div class="selects-container">', u.showMonthAfterYear ? v += r + a : v += a + r, v += "</div>", c && (0 === n || u.minMonth >= n) && (f = !1), p && (11 === n || u.maxMonth <= n) && (m = !1);
	          return (v += '<button class="month-next' + (m ? "" : " is-disabled") + '" type="button"><svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/><path d="M0-.25h24v24H0z" fill="none"/></svg></button>') + "</div>";
	        }
	      }, {
	        key: "draw",
	        value: function value(t) {
	          if (this.isOpen || t) {
	            var e,
	                i = this.options,
	                n = i.minYear,
	                s = i.maxYear,
	                o = i.minMonth,
	                a = i.maxMonth,
	                r = "";
	            this._y <= n && (this._y = n, !isNaN(o) && this._m < o && (this._m = o)), this._y >= s && (this._y = s, !isNaN(a) && this._m > a && (this._m = a)), e = "datepicker-title-" + Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 2);

	            for (var l = 0; l < 1; l++) {
	              this._renderDateDisplay(), r += this.renderTitle(this, l, this.calendars[l].year, this.calendars[l].month, this.calendars[0].year, e) + this.render(this.calendars[l].year, this.calendars[l].month, e);
	            }

	            this.destroySelects(), this.calendarEl.innerHTML = r;
	            var h = this.calendarEl.querySelector(".orig-select-year"),
	                d = this.calendarEl.querySelector(".orig-select-month");
	            M.FormSelect.init(h, {
	              classes: "select-year",
	              dropdownOptions: {
	                container: document.body,
	                constrainWidth: !1
	              }
	            }), M.FormSelect.init(d, {
	              classes: "select-month",
	              dropdownOptions: {
	                container: document.body,
	                constrainWidth: !1
	              }
	            }), h.addEventListener("change", this._handleYearChange.bind(this)), d.addEventListener("change", this._handleMonthChange.bind(this)), "function" == typeof this.options.onDraw && this.options.onDraw(this);
	          }
	        }
	      }, {
	        key: "_setupEventHandlers",
	        value: function value() {
	          this._handleInputKeydownBound = this._handleInputKeydown.bind(this), this._handleInputClickBound = this._handleInputClick.bind(this), this._handleInputChangeBound = this._handleInputChange.bind(this), this._handleCalendarClickBound = this._handleCalendarClick.bind(this), this._finishSelectionBound = this._finishSelection.bind(this), this._handleMonthChange = this._handleMonthChange.bind(this), this._closeBound = this.close.bind(this), this.el.addEventListener("click", this._handleInputClickBound), this.el.addEventListener("keydown", this._handleInputKeydownBound), this.el.addEventListener("change", this._handleInputChangeBound), this.calendarEl.addEventListener("click", this._handleCalendarClickBound), this.doneBtn.addEventListener("click", this._finishSelectionBound), this.cancelBtn.addEventListener("click", this._closeBound), this.options.showClearBtn && (this._handleClearClickBound = this._handleClearClick.bind(this), this.clearBtn.addEventListener("click", this._handleClearClickBound));
	        }
	      }, {
	        key: "_setupVariables",
	        value: function value() {
	          var e = this;
	          this.$modalEl = g(B._template), this.modalEl = this.$modalEl[0], this.calendarEl = this.modalEl.querySelector(".datepicker-calendar"), this.yearTextEl = this.modalEl.querySelector(".year-text"), this.dateTextEl = this.modalEl.querySelector(".date-text"), this.options.showClearBtn && (this.clearBtn = this.modalEl.querySelector(".datepicker-clear")), this.doneBtn = this.modalEl.querySelector(".datepicker-done"), this.cancelBtn = this.modalEl.querySelector(".datepicker-cancel"), this.formats = {
	            d: function d() {
	              return e.date.getDate();
	            },
	            dd: function dd() {
	              var t = e.date.getDate();
	              return (t < 10 ? "0" : "") + t;
	            },
	            ddd: function ddd() {
	              return e.options.i18n.weekdaysShort[e.date.getDay()];
	            },
	            dddd: function dddd() {
	              return e.options.i18n.weekdays[e.date.getDay()];
	            },
	            m: function m() {
	              return e.date.getMonth() + 1;
	            },
	            mm: function mm() {
	              var t = e.date.getMonth() + 1;
	              return (t < 10 ? "0" : "") + t;
	            },
	            mmm: function mmm() {
	              return e.options.i18n.monthsShort[e.date.getMonth()];
	            },
	            mmmm: function mmmm() {
	              return e.options.i18n.months[e.date.getMonth()];
	            },
	            yy: function yy() {
	              return ("" + e.date.getFullYear()).slice(2);
	            },
	            yyyy: function yyyy() {
	              return e.date.getFullYear();
	            }
	          };
	        }
	      }, {
	        key: "_removeEventHandlers",
	        value: function value() {
	          this.el.removeEventListener("click", this._handleInputClickBound), this.el.removeEventListener("keydown", this._handleInputKeydownBound), this.el.removeEventListener("change", this._handleInputChangeBound), this.calendarEl.removeEventListener("click", this._handleCalendarClickBound);
	        }
	      }, {
	        key: "_handleInputClick",
	        value: function value() {
	          this.open();
	        }
	      }, {
	        key: "_handleInputKeydown",
	        value: function value(t) {
	          t.which === M.keys.ENTER && (t.preventDefault(), this.open());
	        }
	      }, {
	        key: "_handleCalendarClick",
	        value: function value(t) {
	          if (this.isOpen) {
	            var e = g(t.target);
	            e.hasClass("is-disabled") || (!e.hasClass("datepicker-day-button") || e.hasClass("is-empty") || e.parent().hasClass("is-disabled") ? e.closest(".month-prev").length ? this.prevMonth() : e.closest(".month-next").length && this.nextMonth() : (this.setDate(new Date(t.target.getAttribute("data-year"), t.target.getAttribute("data-month"), t.target.getAttribute("data-day"))), this.options.autoClose && this._finishSelection()));
	          }
	        }
	      }, {
	        key: "_handleClearClick",
	        value: function value() {
	          this.date = null, this.setInputValue(), this.close();
	        }
	      }, {
	        key: "_handleMonthChange",
	        value: function value(t) {
	          this.gotoMonth(t.target.value);
	        }
	      }, {
	        key: "_handleYearChange",
	        value: function value(t) {
	          this.gotoYear(t.target.value);
	        }
	      }, {
	        key: "gotoMonth",
	        value: function value(t) {
	          isNaN(t) || (this.calendars[0].month = parseInt(t, 10), this.adjustCalendars());
	        }
	      }, {
	        key: "gotoYear",
	        value: function value(t) {
	          isNaN(t) || (this.calendars[0].year = parseInt(t, 10), this.adjustCalendars());
	        }
	      }, {
	        key: "_handleInputChange",
	        value: function value(t) {
	          var e = void 0;
	          t.firedBy !== this && (e = this.options.parse ? this.options.parse(this.el.value, this.options.format) : new Date(Date.parse(this.el.value)), B._isDate(e) && this.setDate(e));
	        }
	      }, {
	        key: "renderDayName",
	        value: function value(t, e, i) {
	          for (e += t.firstDay; 7 <= e;) {
	            e -= 7;
	          }

	          return i ? t.i18n.weekdaysAbbrev[e] : t.i18n.weekdays[e];
	        }
	      }, {
	        key: "_finishSelection",
	        value: function value() {
	          this.setInputValue(), this.close();
	        }
	      }, {
	        key: "open",
	        value: function value() {
	          if (!this.isOpen) return this.isOpen = !0, "function" == typeof this.options.onOpen && this.options.onOpen.call(this), this.draw(), this.modal.open(), this;
	        }
	      }, {
	        key: "close",
	        value: function value() {
	          if (this.isOpen) return this.isOpen = !1, "function" == typeof this.options.onClose && this.options.onClose.call(this), this.modal.close(), this;
	        }
	      }], [{
	        key: "init",
	        value: function value(t, e) {
	          return _get(B.__proto__ || Object.getPrototypeOf(B), "init", this).call(this, this, t, e);
	        }
	      }, {
	        key: "_isDate",
	        value: function value(t) {
	          return /Date/.test(Object.prototype.toString.call(t)) && !isNaN(t.getTime());
	        }
	      }, {
	        key: "_isWeekend",
	        value: function value(t) {
	          var e = t.getDay();
	          return 0 === e || 6 === e;
	        }
	      }, {
	        key: "_setToStartOfDay",
	        value: function value(t) {
	          B._isDate(t) && t.setHours(0, 0, 0, 0);
	        }
	      }, {
	        key: "_getDaysInMonth",
	        value: function value(t, e) {
	          return [31, B._isLeapYear(t) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e];
	        }
	      }, {
	        key: "_isLeapYear",
	        value: function value(t) {
	          return t % 4 == 0 && t % 100 != 0 || t % 400 == 0;
	        }
	      }, {
	        key: "_compareDates",
	        value: function value(t, e) {
	          return t.getTime() === e.getTime();
	        }
	      }, {
	        key: "_setToStartOfDay",
	        value: function value(t) {
	          B._isDate(t) && t.setHours(0, 0, 0, 0);
	        }
	      }, {
	        key: "getInstance",
	        value: function value(t) {
	          return (t.jquery ? t[0] : t).M_Datepicker;
	        }
	      }, {
	        key: "defaults",
	        get: function get() {
	          return e;
	        }
	      }]), B;
	    }();

	    t._template = ['<div class= "modal datepicker-modal">', '<div class="modal-content datepicker-container">', '<div class="datepicker-date-display">', '<span class="year-text"></span>', '<span class="date-text"></span>', "</div>", '<div class="datepicker-calendar-container">', '<div class="datepicker-calendar"></div>', '<div class="datepicker-footer">', '<button class="btn-flat datepicker-clear waves-effect" style="visibility: hidden;" type="button"></button>', '<div class="confirmation-btns">', '<button class="btn-flat datepicker-cancel waves-effect" type="button"></button>', '<button class="btn-flat datepicker-done waves-effect" type="button"></button>', "</div>", "</div>", "</div>", "</div>", "</div>"].join(""), M.Datepicker = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "datepicker", "M_Datepicker");
	  }(cash), function (h) {

	    var e = {
	      dialRadius: 135,
	      outerRadius: 105,
	      innerRadius: 70,
	      tickRadius: 20,
	      duration: 350,
	      container: null,
	      defaultTime: "now",
	      fromNow: 0,
	      showClearBtn: !1,
	      i18n: {
	        cancel: "Cancel",
	        clear: "Clear",
	        done: "Ok"
	      },
	      autoClose: !1,
	      twelveHour: !0,
	      vibrate: !0,
	      onOpenStart: null,
	      onOpenEnd: null,
	      onCloseStart: null,
	      onCloseEnd: null,
	      onSelect: null
	    },
	        t = function (t) {
	      function f(t, e) {
	        _classCallCheck(this, f);

	        var i = _possibleConstructorReturn(this, (f.__proto__ || Object.getPrototypeOf(f)).call(this, f, t, e));

	        return (i.el.M_Timepicker = i).options = h.extend({}, f.defaults, e), i.id = M.guid(), i._insertHTMLIntoDOM(), i._setupModal(), i._setupVariables(), i._setupEventHandlers(), i._clockSetup(), i._pickerSetup(), i;
	      }

	      return _inherits(f, Component), _createClass(f, [{
	        key: "destroy",
	        value: function value() {
	          this._removeEventHandlers(), this.modal.destroy(), h(this.modalEl).remove(), this.el.M_Timepicker = void 0;
	        }
	      }, {
	        key: "_setupEventHandlers",
	        value: function value() {
	          this._handleInputKeydownBound = this._handleInputKeydown.bind(this), this._handleInputClickBound = this._handleInputClick.bind(this), this._handleClockClickStartBound = this._handleClockClickStart.bind(this), this._handleDocumentClickMoveBound = this._handleDocumentClickMove.bind(this), this._handleDocumentClickEndBound = this._handleDocumentClickEnd.bind(this), this.el.addEventListener("click", this._handleInputClickBound), this.el.addEventListener("keydown", this._handleInputKeydownBound), this.plate.addEventListener("mousedown", this._handleClockClickStartBound), this.plate.addEventListener("touchstart", this._handleClockClickStartBound), h(this.spanHours).on("click", this.showView.bind(this, "hours")), h(this.spanMinutes).on("click", this.showView.bind(this, "minutes"));
	        }
	      }, {
	        key: "_removeEventHandlers",
	        value: function value() {
	          this.el.removeEventListener("click", this._handleInputClickBound), this.el.removeEventListener("keydown", this._handleInputKeydownBound);
	        }
	      }, {
	        key: "_handleInputClick",
	        value: function value() {
	          this.open();
	        }
	      }, {
	        key: "_handleInputKeydown",
	        value: function value(t) {
	          t.which === M.keys.ENTER && (t.preventDefault(), this.open());
	        }
	      }, {
	        key: "_handleClockClickStart",
	        value: function value(t) {
	          t.preventDefault();
	          var e = this.plate.getBoundingClientRect(),
	              i = e.left,
	              n = e.top;
	          this.x0 = i + this.options.dialRadius, this.y0 = n + this.options.dialRadius, this.moved = !1;

	          var s = f._Pos(t);

	          this.dx = s.x - this.x0, this.dy = s.y - this.y0, this.setHand(this.dx, this.dy, !1), document.addEventListener("mousemove", this._handleDocumentClickMoveBound), document.addEventListener("touchmove", this._handleDocumentClickMoveBound), document.addEventListener("mouseup", this._handleDocumentClickEndBound), document.addEventListener("touchend", this._handleDocumentClickEndBound);
	        }
	      }, {
	        key: "_handleDocumentClickMove",
	        value: function value(t) {
	          t.preventDefault();

	          var e = f._Pos(t),
	              i = e.x - this.x0,
	              n = e.y - this.y0;

	          this.moved = !0, this.setHand(i, n, !1, !0);
	        }
	      }, {
	        key: "_handleDocumentClickEnd",
	        value: function value(t) {
	          var e = this;
	          t.preventDefault(), document.removeEventListener("mouseup", this._handleDocumentClickEndBound), document.removeEventListener("touchend", this._handleDocumentClickEndBound);

	          var i = f._Pos(t),
	              n = i.x - this.x0,
	              s = i.y - this.y0;

	          this.moved && n === this.dx && s === this.dy && this.setHand(n, s), "hours" === this.currentView ? this.showView("minutes", this.options.duration / 2) : this.options.autoClose && (h(this.minutesView).addClass("timepicker-dial-out"), setTimeout(function () {
	            e.done();
	          }, this.options.duration / 2)), "function" == typeof this.options.onSelect && this.options.onSelect.call(this, this.hours, this.minutes), document.removeEventListener("mousemove", this._handleDocumentClickMoveBound), document.removeEventListener("touchmove", this._handleDocumentClickMoveBound);
	        }
	      }, {
	        key: "_insertHTMLIntoDOM",
	        value: function value() {
	          this.$modalEl = h(f._template), this.modalEl = this.$modalEl[0], this.modalEl.id = "modal-" + this.id;
	          var t = document.querySelector(this.options.container);
	          this.options.container && t ? this.$modalEl.appendTo(t) : this.$modalEl.insertBefore(this.el);
	        }
	      }, {
	        key: "_setupModal",
	        value: function value() {
	          var t = this;
	          this.modal = M.Modal.init(this.modalEl, {
	            onOpenStart: this.options.onOpenStart,
	            onOpenEnd: this.options.onOpenEnd,
	            onCloseStart: this.options.onCloseStart,
	            onCloseEnd: function onCloseEnd() {
	              "function" == typeof t.options.onCloseEnd && t.options.onCloseEnd.call(t), t.isOpen = !1;
	            }
	          });
	        }
	      }, {
	        key: "_setupVariables",
	        value: function value() {
	          this.currentView = "hours", this.vibrate = navigator.vibrate ? "vibrate" : navigator.webkitVibrate ? "webkitVibrate" : null, this._canvas = this.modalEl.querySelector(".timepicker-canvas"), this.plate = this.modalEl.querySelector(".timepicker-plate"), this.hoursView = this.modalEl.querySelector(".timepicker-hours"), this.minutesView = this.modalEl.querySelector(".timepicker-minutes"), this.spanHours = this.modalEl.querySelector(".timepicker-span-hours"), this.spanMinutes = this.modalEl.querySelector(".timepicker-span-minutes"), this.spanAmPm = this.modalEl.querySelector(".timepicker-span-am-pm"), this.footer = this.modalEl.querySelector(".timepicker-footer"), this.amOrPm = "PM";
	        }
	      }, {
	        key: "_pickerSetup",
	        value: function value() {
	          var t = h('<button class="btn-flat timepicker-clear waves-effect" style="visibility: hidden;" type="button" tabindex="' + (this.options.twelveHour ? "3" : "1") + '">' + this.options.i18n.clear + "</button>").appendTo(this.footer).on("click", this.clear.bind(this));
	          this.options.showClearBtn && t.css({
	            visibility: ""
	          });
	          var e = h('<div class="confirmation-btns"></div>');
	          h('<button class="btn-flat timepicker-close waves-effect" type="button" tabindex="' + (this.options.twelveHour ? "3" : "1") + '">' + this.options.i18n.cancel + "</button>").appendTo(e).on("click", this.close.bind(this)), h('<button class="btn-flat timepicker-close waves-effect" type="button" tabindex="' + (this.options.twelveHour ? "3" : "1") + '">' + this.options.i18n.done + "</button>").appendTo(e).on("click", this.done.bind(this)), e.appendTo(this.footer);
	        }
	      }, {
	        key: "_clockSetup",
	        value: function value() {
	          this.options.twelveHour && (this.$amBtn = h('<div class="am-btn">AM</div>'), this.$pmBtn = h('<div class="pm-btn">PM</div>'), this.$amBtn.on("click", this._handleAmPmClick.bind(this)).appendTo(this.spanAmPm), this.$pmBtn.on("click", this._handleAmPmClick.bind(this)).appendTo(this.spanAmPm)), this._buildHoursView(), this._buildMinutesView(), this._buildSVGClock();
	        }
	      }, {
	        key: "_buildSVGClock",
	        value: function value() {
	          var t = this.options.dialRadius,
	              e = this.options.tickRadius,
	              i = 2 * t,
	              n = f._createSVGEl("svg");

	          n.setAttribute("class", "timepicker-svg"), n.setAttribute("width", i), n.setAttribute("height", i);

	          var s = f._createSVGEl("g");

	          s.setAttribute("transform", "translate(" + t + "," + t + ")");

	          var o = f._createSVGEl("circle");

	          o.setAttribute("class", "timepicker-canvas-bearing"), o.setAttribute("cx", 0), o.setAttribute("cy", 0), o.setAttribute("r", 4);

	          var a = f._createSVGEl("line");

	          a.setAttribute("x1", 0), a.setAttribute("y1", 0);

	          var r = f._createSVGEl("circle");

	          r.setAttribute("class", "timepicker-canvas-bg"), r.setAttribute("r", e), s.appendChild(a), s.appendChild(r), s.appendChild(o), n.appendChild(s), this._canvas.appendChild(n), this.hand = a, this.bg = r, this.bearing = o, this.g = s;
	        }
	      }, {
	        key: "_buildHoursView",
	        value: function value() {
	          var t = h('<div class="timepicker-tick"></div>');
	          if (this.options.twelveHour) for (var e = 1; e < 13; e += 1) {
	            var i = t.clone(),
	                n = e / 6 * Math.PI,
	                s = this.options.outerRadius;
	            i.css({
	              left: this.options.dialRadius + Math.sin(n) * s - this.options.tickRadius + "px",
	              top: this.options.dialRadius - Math.cos(n) * s - this.options.tickRadius + "px"
	            }), i.html(0 === e ? "00" : e), this.hoursView.appendChild(i[0]);
	          } else for (var o = 0; o < 24; o += 1) {
	            var a = t.clone(),
	                r = o / 6 * Math.PI,
	                l = 0 < o && o < 13 ? this.options.innerRadius : this.options.outerRadius;
	            a.css({
	              left: this.options.dialRadius + Math.sin(r) * l - this.options.tickRadius + "px",
	              top: this.options.dialRadius - Math.cos(r) * l - this.options.tickRadius + "px"
	            }), a.html(0 === o ? "00" : o), this.hoursView.appendChild(a[0]);
	          }
	        }
	      }, {
	        key: "_buildMinutesView",
	        value: function value() {
	          for (var t = h('<div class="timepicker-tick"></div>'), e = 0; e < 60; e += 5) {
	            var i = t.clone(),
	                n = e / 30 * Math.PI;
	            i.css({
	              left: this.options.dialRadius + Math.sin(n) * this.options.outerRadius - this.options.tickRadius + "px",
	              top: this.options.dialRadius - Math.cos(n) * this.options.outerRadius - this.options.tickRadius + "px"
	            }), i.html(f._addLeadingZero(e)), this.minutesView.appendChild(i[0]);
	          }
	        }
	      }, {
	        key: "_handleAmPmClick",
	        value: function value(t) {
	          var e = h(t.target);
	          this.amOrPm = e.hasClass("am-btn") ? "AM" : "PM", this._updateAmPmView();
	        }
	      }, {
	        key: "_updateAmPmView",
	        value: function value() {
	          this.options.twelveHour && (this.$amBtn.toggleClass("text-primary", "AM" === this.amOrPm), this.$pmBtn.toggleClass("text-primary", "PM" === this.amOrPm));
	        }
	      }, {
	        key: "_updateTimeFromInput",
	        value: function value() {
	          var t = ((this.el.value || this.options.defaultTime || "") + "").split(":");

	          if (this.options.twelveHour && void 0 !== t[1] && (0 < t[1].toUpperCase().indexOf("AM") ? this.amOrPm = "AM" : this.amOrPm = "PM", t[1] = t[1].replace("AM", "").replace("PM", "")), "now" === t[0]) {
	            var e = new Date(+new Date() + this.options.fromNow);
	            t = [e.getHours(), e.getMinutes()], this.options.twelveHour && (this.amOrPm = 12 <= t[0] && t[0] < 24 ? "PM" : "AM");
	          }

	          this.hours = +t[0] || 0, this.minutes = +t[1] || 0, this.spanHours.innerHTML = this.hours, this.spanMinutes.innerHTML = f._addLeadingZero(this.minutes), this._updateAmPmView();
	        }
	      }, {
	        key: "showView",
	        value: function value(t, e) {
	          "minutes" === t && h(this.hoursView).css("visibility");
	          var i = "hours" === t,
	              n = i ? this.hoursView : this.minutesView,
	              s = i ? this.minutesView : this.hoursView;
	          this.currentView = t, h(this.spanHours).toggleClass("text-primary", i), h(this.spanMinutes).toggleClass("text-primary", !i), s.classList.add("timepicker-dial-out"), h(n).css("visibility", "visible").removeClass("timepicker-dial-out"), this.resetClock(e), clearTimeout(this.toggleViewTimer), this.toggleViewTimer = setTimeout(function () {
	            h(s).css("visibility", "hidden");
	          }, this.options.duration);
	        }
	      }, {
	        key: "resetClock",
	        value: function value(t) {
	          var e = this.currentView,
	              i = this[e],
	              n = "hours" === e,
	              s = i * (Math.PI / (n ? 6 : 30)),
	              o = n && 0 < i && i < 13 ? this.options.innerRadius : this.options.outerRadius,
	              a = Math.sin(s) * o,
	              r = -Math.cos(s) * o,
	              l = this;
	          t ? (h(this.canvas).addClass("timepicker-canvas-out"), setTimeout(function () {
	            h(l.canvas).removeClass("timepicker-canvas-out"), l.setHand(a, r);
	          }, t)) : this.setHand(a, r);
	        }
	      }, {
	        key: "setHand",
	        value: function value(t, e, i) {
	          var n = this,
	              s = Math.atan2(t, -e),
	              o = "hours" === this.currentView,
	              a = Math.PI / (o || i ? 6 : 30),
	              r = Math.sqrt(t * t + e * e),
	              l = o && r < (this.options.outerRadius + this.options.innerRadius) / 2,
	              h = l ? this.options.innerRadius : this.options.outerRadius;
	          this.options.twelveHour && (h = this.options.outerRadius), s < 0 && (s = 2 * Math.PI + s);
	          var d = Math.round(s / a);
	          s = d * a, this.options.twelveHour ? o ? 0 === d && (d = 12) : (i && (d *= 5), 60 === d && (d = 0)) : o ? (12 === d && (d = 0), d = l ? 0 === d ? 12 : d : 0 === d ? 0 : d + 12) : (i && (d *= 5), 60 === d && (d = 0)), this[this.currentView] !== d && this.vibrate && this.options.vibrate && (this.vibrateTimer || (navigator[this.vibrate](10), this.vibrateTimer = setTimeout(function () {
	            n.vibrateTimer = null;
	          }, 100))), this[this.currentView] = d, o ? this.spanHours.innerHTML = d : this.spanMinutes.innerHTML = f._addLeadingZero(d);
	          var u = Math.sin(s) * (h - this.options.tickRadius),
	              c = -Math.cos(s) * (h - this.options.tickRadius),
	              p = Math.sin(s) * h,
	              v = -Math.cos(s) * h;
	          this.hand.setAttribute("x2", u), this.hand.setAttribute("y2", c), this.bg.setAttribute("cx", p), this.bg.setAttribute("cy", v);
	        }
	      }, {
	        key: "open",
	        value: function value() {
	          this.isOpen || (this.isOpen = !0, this._updateTimeFromInput(), this.showView("hours"), this.modal.open());
	        }
	      }, {
	        key: "close",
	        value: function value() {
	          this.isOpen && (this.isOpen = !1, this.modal.close());
	        }
	      }, {
	        key: "done",
	        value: function value(t, e) {
	          var i = this.el.value,
	              n = e ? "" : f._addLeadingZero(this.hours) + ":" + f._addLeadingZero(this.minutes);
	          this.time = n, !e && this.options.twelveHour && (n = n + " " + this.amOrPm), (this.el.value = n) !== i && this.$el.trigger("change"), this.close(), this.el.focus();
	        }
	      }, {
	        key: "clear",
	        value: function value() {
	          this.done(null, !0);
	        }
	      }], [{
	        key: "init",
	        value: function value(t, e) {
	          return _get(f.__proto__ || Object.getPrototypeOf(f), "init", this).call(this, this, t, e);
	        }
	      }, {
	        key: "_addLeadingZero",
	        value: function value(t) {
	          return (t < 10 ? "0" : "") + t;
	        }
	      }, {
	        key: "_createSVGEl",
	        value: function value(t) {
	          return document.createElementNS("http://www.w3.org/2000/svg", t);
	        }
	      }, {
	        key: "_Pos",
	        value: function value(t) {
	          return t.targetTouches && 1 <= t.targetTouches.length ? {
	            x: t.targetTouches[0].clientX,
	            y: t.targetTouches[0].clientY
	          } : {
	            x: t.clientX,
	            y: t.clientY
	          };
	        }
	      }, {
	        key: "getInstance",
	        value: function value(t) {
	          return (t.jquery ? t[0] : t).M_Timepicker;
	        }
	      }, {
	        key: "defaults",
	        get: function get() {
	          return e;
	        }
	      }]), f;
	    }();

	    t._template = ['<div class= "modal timepicker-modal">', '<div class="modal-content timepicker-container">', '<div class="timepicker-digital-display">', '<div class="timepicker-text-container">', '<div class="timepicker-display-column">', '<span class="timepicker-span-hours text-primary"></span>', ":", '<span class="timepicker-span-minutes"></span>', "</div>", '<div class="timepicker-display-column timepicker-display-am-pm">', '<div class="timepicker-span-am-pm"></div>', "</div>", "</div>", "</div>", '<div class="timepicker-analog-display">', '<div class="timepicker-plate">', '<div class="timepicker-canvas"></div>', '<div class="timepicker-dial timepicker-hours"></div>', '<div class="timepicker-dial timepicker-minutes timepicker-dial-out"></div>', "</div>", '<div class="timepicker-footer"></div>', "</div>", "</div>", "</div>"].join(""), M.Timepicker = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "timepicker", "M_Timepicker");
	  }(cash), function (s) {

	    var e = {},
	        t = function (t) {
	      function n(t, e) {
	        _classCallCheck(this, n);

	        var i = _possibleConstructorReturn(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, n, t, e));

	        return (i.el.M_CharacterCounter = i).options = s.extend({}, n.defaults, e), i.isInvalid = !1, i.isValidLength = !1, i._setupCounter(), i._setupEventHandlers(), i;
	      }

	      return _inherits(n, Component), _createClass(n, [{
	        key: "destroy",
	        value: function value() {
	          this._removeEventHandlers(), this.el.CharacterCounter = void 0, this._removeCounter();
	        }
	      }, {
	        key: "_setupEventHandlers",
	        value: function value() {
	          this._handleUpdateCounterBound = this.updateCounter.bind(this), this.el.addEventListener("focus", this._handleUpdateCounterBound, !0), this.el.addEventListener("input", this._handleUpdateCounterBound, !0);
	        }
	      }, {
	        key: "_removeEventHandlers",
	        value: function value() {
	          this.el.removeEventListener("focus", this._handleUpdateCounterBound, !0), this.el.removeEventListener("input", this._handleUpdateCounterBound, !0);
	        }
	      }, {
	        key: "_setupCounter",
	        value: function value() {
	          this.counterEl = document.createElement("span"), s(this.counterEl).addClass("character-counter").css({
	            float: "right",
	            "font-size": "12px",
	            height: 1
	          }), this.$el.parent().append(this.counterEl);
	        }
	      }, {
	        key: "_removeCounter",
	        value: function value() {
	          s(this.counterEl).remove();
	        }
	      }, {
	        key: "updateCounter",
	        value: function value() {
	          var t = +this.$el.attr("data-length"),
	              e = this.el.value.length;
	          this.isValidLength = e <= t;
	          var i = e;
	          t && (i += "/" + t, this._validateInput()), s(this.counterEl).html(i);
	        }
	      }, {
	        key: "_validateInput",
	        value: function value() {
	          this.isValidLength && this.isInvalid ? (this.isInvalid = !1, this.$el.removeClass("invalid")) : this.isValidLength || this.isInvalid || (this.isInvalid = !0, this.$el.removeClass("valid"), this.$el.addClass("invalid"));
	        }
	      }], [{
	        key: "init",
	        value: function value(t, e) {
	          return _get(n.__proto__ || Object.getPrototypeOf(n), "init", this).call(this, this, t, e);
	        }
	      }, {
	        key: "getInstance",
	        value: function value(t) {
	          return (t.jquery ? t[0] : t).M_CharacterCounter;
	        }
	      }, {
	        key: "defaults",
	        get: function get() {
	          return e;
	        }
	      }]), n;
	    }();

	    M.CharacterCounter = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "characterCounter", "M_CharacterCounter");
	  }(cash), function (b) {

	    var e = {
	      duration: 200,
	      dist: -100,
	      shift: 0,
	      padding: 0,
	      numVisible: 5,
	      fullWidth: !1,
	      indicators: !1,
	      noWrap: !1,
	      onCycleTo: null
	    },
	        t = function (t) {
	      function i(t, e) {
	        _classCallCheck(this, i);

	        var n = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, i, t, e));

	        return (n.el.M_Carousel = n).options = b.extend({}, i.defaults, e), n.hasMultipleSlides = 1 < n.$el.find(".carousel-item").length, n.showIndicators = n.options.indicators && n.hasMultipleSlides, n.noWrap = n.options.noWrap || !n.hasMultipleSlides, n.pressed = !1, n.dragged = !1, n.offset = n.target = 0, n.images = [], n.itemWidth = n.$el.find(".carousel-item").first().innerWidth(), n.itemHeight = n.$el.find(".carousel-item").first().innerHeight(), n.dim = 2 * n.itemWidth + n.options.padding || 1, n._autoScrollBound = n._autoScroll.bind(n), n._trackBound = n._track.bind(n), n.options.fullWidth && (n.options.dist = 0, n._setCarouselHeight(), n.showIndicators && n.$el.find(".carousel-fixed-item").addClass("with-indicators")), n.$indicators = b('<ul class="indicators"></ul>'), n.$el.find(".carousel-item").each(function (t, e) {
	          if (n.images.push(t), n.showIndicators) {
	            var i = b('<li class="indicator-item"></li>');
	            0 === e && i[0].classList.add("active"), n.$indicators.append(i);
	          }
	        }), n.showIndicators && n.$el.append(n.$indicators), n.count = n.images.length, n.options.numVisible = Math.min(n.count, n.options.numVisible), n.xform = "transform", ["webkit", "Moz", "O", "ms"].every(function (t) {
	          var e = t + "Transform";
	          return void 0 === document.body.style[e] || (n.xform = e, !1);
	        }), n._setupEventHandlers(), n._scroll(n.offset), n;
	      }

	      return _inherits(i, Component), _createClass(i, [{
	        key: "destroy",
	        value: function value() {
	          this._removeEventHandlers(), this.el.M_Carousel = void 0;
	        }
	      }, {
	        key: "_setupEventHandlers",
	        value: function value() {
	          var i = this;
	          this._handleCarouselTapBound = this._handleCarouselTap.bind(this), this._handleCarouselDragBound = this._handleCarouselDrag.bind(this), this._handleCarouselReleaseBound = this._handleCarouselRelease.bind(this), this._handleCarouselClickBound = this._handleCarouselClick.bind(this), void 0 !== window.ontouchstart && (this.el.addEventListener("touchstart", this._handleCarouselTapBound), this.el.addEventListener("touchmove", this._handleCarouselDragBound), this.el.addEventListener("touchend", this._handleCarouselReleaseBound)), this.el.addEventListener("mousedown", this._handleCarouselTapBound), this.el.addEventListener("mousemove", this._handleCarouselDragBound), this.el.addEventListener("mouseup", this._handleCarouselReleaseBound), this.el.addEventListener("mouseleave", this._handleCarouselReleaseBound), this.el.addEventListener("click", this._handleCarouselClickBound), this.showIndicators && this.$indicators && (this._handleIndicatorClickBound = this._handleIndicatorClick.bind(this), this.$indicators.find(".indicator-item").each(function (t, e) {
	            t.addEventListener("click", i._handleIndicatorClickBound);
	          }));
	          var t = M.throttle(this._handleResize, 200);
	          this._handleThrottledResizeBound = t.bind(this), window.addEventListener("resize", this._handleThrottledResizeBound);
	        }
	      }, {
	        key: "_removeEventHandlers",
	        value: function value() {
	          var i = this;
	          void 0 !== window.ontouchstart && (this.el.removeEventListener("touchstart", this._handleCarouselTapBound), this.el.removeEventListener("touchmove", this._handleCarouselDragBound), this.el.removeEventListener("touchend", this._handleCarouselReleaseBound)), this.el.removeEventListener("mousedown", this._handleCarouselTapBound), this.el.removeEventListener("mousemove", this._handleCarouselDragBound), this.el.removeEventListener("mouseup", this._handleCarouselReleaseBound), this.el.removeEventListener("mouseleave", this._handleCarouselReleaseBound), this.el.removeEventListener("click", this._handleCarouselClickBound), this.showIndicators && this.$indicators && this.$indicators.find(".indicator-item").each(function (t, e) {
	            t.removeEventListener("click", i._handleIndicatorClickBound);
	          }), window.removeEventListener("resize", this._handleThrottledResizeBound);
	        }
	      }, {
	        key: "_handleCarouselTap",
	        value: function value(t) {
	          "mousedown" === t.type && b(t.target).is("img") && t.preventDefault(), this.pressed = !0, this.dragged = !1, this.verticalDragged = !1, this.reference = this._xpos(t), this.referenceY = this._ypos(t), this.velocity = this.amplitude = 0, this.frame = this.offset, this.timestamp = Date.now(), clearInterval(this.ticker), this.ticker = setInterval(this._trackBound, 100);
	        }
	      }, {
	        key: "_handleCarouselDrag",
	        value: function value(t) {
	          var e = void 0,
	              i = void 0,
	              n = void 0;
	          if (this.pressed) if (e = this._xpos(t), i = this._ypos(t), n = this.reference - e, Math.abs(this.referenceY - i) < 30 && !this.verticalDragged) (2 < n || n < -2) && (this.dragged = !0, this.reference = e, this._scroll(this.offset + n));else {
	            if (this.dragged) return t.preventDefault(), t.stopPropagation(), !1;
	            this.verticalDragged = !0;
	          }
	          if (this.dragged) return t.preventDefault(), t.stopPropagation(), !1;
	        }
	      }, {
	        key: "_handleCarouselRelease",
	        value: function value(t) {
	          if (this.pressed) return this.pressed = !1, clearInterval(this.ticker), this.target = this.offset, (10 < this.velocity || this.velocity < -10) && (this.amplitude = .9 * this.velocity, this.target = this.offset + this.amplitude), this.target = Math.round(this.target / this.dim) * this.dim, this.noWrap && (this.target >= this.dim * (this.count - 1) ? this.target = this.dim * (this.count - 1) : this.target < 0 && (this.target = 0)), this.amplitude = this.target - this.offset, this.timestamp = Date.now(), requestAnimationFrame(this._autoScrollBound), this.dragged && (t.preventDefault(), t.stopPropagation()), !1;
	        }
	      }, {
	        key: "_handleCarouselClick",
	        value: function value(t) {
	          if (this.dragged) return t.preventDefault(), t.stopPropagation(), !1;

	          if (!this.options.fullWidth) {
	            var e = b(t.target).closest(".carousel-item").index();
	            0 !== this._wrap(this.center) - e && (t.preventDefault(), t.stopPropagation()), this._cycleTo(e);
	          }
	        }
	      }, {
	        key: "_handleIndicatorClick",
	        value: function value(t) {
	          t.stopPropagation();
	          var e = b(t.target).closest(".indicator-item");
	          e.length && this._cycleTo(e.index());
	        }
	      }, {
	        key: "_handleResize",
	        value: function value(t) {
	          this.options.fullWidth ? (this.itemWidth = this.$el.find(".carousel-item").first().innerWidth(), this.imageHeight = this.$el.find(".carousel-item.active").height(), this.dim = 2 * this.itemWidth + this.options.padding, this.offset = 2 * this.center * this.itemWidth, this.target = this.offset, this._setCarouselHeight(!0)) : this._scroll();
	        }
	      }, {
	        key: "_setCarouselHeight",
	        value: function value(t) {
	          var i = this,
	              e = this.$el.find(".carousel-item.active").length ? this.$el.find(".carousel-item.active").first() : this.$el.find(".carousel-item").first(),
	              n = e.find("img").first();
	          if (n.length) {
	            if (n[0].complete) {
	              var s = n.height();
	              if (0 < s) this.$el.css("height", s + "px");else {
	                var o = n[0].naturalWidth,
	                    a = n[0].naturalHeight,
	                    r = this.$el.width() / o * a;
	                this.$el.css("height", r + "px");
	              }
	            } else n.one("load", function (t, e) {
	              i.$el.css("height", t.offsetHeight + "px");
	            });
	          } else if (!t) {
	            var l = e.height();
	            this.$el.css("height", l + "px");
	          }
	        }
	      }, {
	        key: "_xpos",
	        value: function value(t) {
	          return t.targetTouches && 1 <= t.targetTouches.length ? t.targetTouches[0].clientX : t.clientX;
	        }
	      }, {
	        key: "_ypos",
	        value: function value(t) {
	          return t.targetTouches && 1 <= t.targetTouches.length ? t.targetTouches[0].clientY : t.clientY;
	        }
	      }, {
	        key: "_wrap",
	        value: function value(t) {
	          return t >= this.count ? t % this.count : t < 0 ? this._wrap(this.count + t % this.count) : t;
	        }
	      }, {
	        key: "_track",
	        value: function value() {
	          var t, e, i, n;
	          e = (t = Date.now()) - this.timestamp, this.timestamp = t, i = this.offset - this.frame, this.frame = this.offset, n = 1e3 * i / (1 + e), this.velocity = .8 * n + .2 * this.velocity;
	        }
	      }, {
	        key: "_autoScroll",
	        value: function value() {
	          var t = void 0,
	              e = void 0;
	          this.amplitude && (t = Date.now() - this.timestamp, 2 < (e = this.amplitude * Math.exp(-t / this.options.duration)) || e < -2 ? (this._scroll(this.target - e), requestAnimationFrame(this._autoScrollBound)) : this._scroll(this.target));
	        }
	      }, {
	        key: "_scroll",
	        value: function value(t) {
	          var e = this;
	          this.$el.hasClass("scrolling") || this.el.classList.add("scrolling"), null != this.scrollingTimeout && window.clearTimeout(this.scrollingTimeout), this.scrollingTimeout = window.setTimeout(function () {
	            e.$el.removeClass("scrolling");
	          }, this.options.duration);
	          var i,
	              n,
	              s,
	              o,
	              a = void 0,
	              r = void 0,
	              l = void 0,
	              h = void 0,
	              d = void 0,
	              u = void 0,
	              c = this.center,
	              p = 1 / this.options.numVisible;

	          if (this.offset = "number" == typeof t ? t : this.offset, this.center = Math.floor((this.offset + this.dim / 2) / this.dim), o = -(s = (n = this.offset - this.center * this.dim) < 0 ? 1 : -1) * n * 2 / this.dim, i = this.count >> 1, this.options.fullWidth ? (l = "translateX(0)", u = 1) : (l = "translateX(" + (this.el.clientWidth - this.itemWidth) / 2 + "px) ", l += "translateY(" + (this.el.clientHeight - this.itemHeight) / 2 + "px)", u = 1 - p * o), this.showIndicators) {
	            var v = this.center % this.count,
	                f = this.$indicators.find(".indicator-item.active");
	            f.index() !== v && (f.removeClass("active"), this.$indicators.find(".indicator-item").eq(v)[0].classList.add("active"));
	          }

	          if (!this.noWrap || 0 <= this.center && this.center < this.count) {
	            r = this.images[this._wrap(this.center)], b(r).hasClass("active") || (this.$el.find(".carousel-item").removeClass("active"), r.classList.add("active"));
	            var m = l + " translateX(" + -n / 2 + "px) translateX(" + s * this.options.shift * o * a + "px) translateZ(" + this.options.dist * o + "px)";

	            this._updateItemStyle(r, u, 0, m);
	          }

	          for (a = 1; a <= i; ++a) {
	            if (this.options.fullWidth ? (h = this.options.dist, d = a === i && n < 0 ? 1 - o : 1) : (h = this.options.dist * (2 * a + o * s), d = 1 - p * (2 * a + o * s)), !this.noWrap || this.center + a < this.count) {
	              r = this.images[this._wrap(this.center + a)];
	              var g = l + " translateX(" + (this.options.shift + (this.dim * a - n) / 2) + "px) translateZ(" + h + "px)";

	              this._updateItemStyle(r, d, -a, g);
	            }

	            if (this.options.fullWidth ? (h = this.options.dist, d = a === i && 0 < n ? 1 - o : 1) : (h = this.options.dist * (2 * a - o * s), d = 1 - p * (2 * a - o * s)), !this.noWrap || 0 <= this.center - a) {
	              r = this.images[this._wrap(this.center - a)];

	              var _ = l + " translateX(" + (-this.options.shift + (-this.dim * a - n) / 2) + "px) translateZ(" + h + "px)";

	              this._updateItemStyle(r, d, -a, _);
	            }
	          }

	          if (!this.noWrap || 0 <= this.center && this.center < this.count) {
	            r = this.images[this._wrap(this.center)];
	            var y = l + " translateX(" + -n / 2 + "px) translateX(" + s * this.options.shift * o + "px) translateZ(" + this.options.dist * o + "px)";

	            this._updateItemStyle(r, u, 0, y);
	          }

	          var k = this.$el.find(".carousel-item").eq(this._wrap(this.center));
	          c !== this.center && "function" == typeof this.options.onCycleTo && this.options.onCycleTo.call(this, k[0], this.dragged), "function" == typeof this.oneTimeCallback && (this.oneTimeCallback.call(this, k[0], this.dragged), this.oneTimeCallback = null);
	        }
	      }, {
	        key: "_updateItemStyle",
	        value: function value(t, e, i, n) {
	          t.style[this.xform] = n, t.style.zIndex = i, t.style.opacity = e, t.style.visibility = "visible";
	        }
	      }, {
	        key: "_cycleTo",
	        value: function value(t, e) {
	          var i = this.center % this.count - t;
	          this.noWrap || (i < 0 ? Math.abs(i + this.count) < Math.abs(i) && (i += this.count) : 0 < i && Math.abs(i - this.count) < i && (i -= this.count)), this.target = this.dim * Math.round(this.offset / this.dim), i < 0 ? this.target += this.dim * Math.abs(i) : 0 < i && (this.target -= this.dim * i), "function" == typeof e && (this.oneTimeCallback = e), this.offset !== this.target && (this.amplitude = this.target - this.offset, this.timestamp = Date.now(), requestAnimationFrame(this._autoScrollBound));
	        }
	      }, {
	        key: "next",
	        value: function value(t) {
	          (void 0 === t || isNaN(t)) && (t = 1);
	          var e = this.center + t;

	          if (e >= this.count || e < 0) {
	            if (this.noWrap) return;
	            e = this._wrap(e);
	          }

	          this._cycleTo(e);
	        }
	      }, {
	        key: "prev",
	        value: function value(t) {
	          (void 0 === t || isNaN(t)) && (t = 1);
	          var e = this.center - t;

	          if (e >= this.count || e < 0) {
	            if (this.noWrap) return;
	            e = this._wrap(e);
	          }

	          this._cycleTo(e);
	        }
	      }, {
	        key: "set",
	        value: function value(t, e) {
	          if ((void 0 === t || isNaN(t)) && (t = 0), t > this.count || t < 0) {
	            if (this.noWrap) return;
	            t = this._wrap(t);
	          }

	          this._cycleTo(t, e);
	        }
	      }], [{
	        key: "init",
	        value: function value(t, e) {
	          return _get(i.__proto__ || Object.getPrototypeOf(i), "init", this).call(this, this, t, e);
	        }
	      }, {
	        key: "getInstance",
	        value: function value(t) {
	          return (t.jquery ? t[0] : t).M_Carousel;
	        }
	      }, {
	        key: "defaults",
	        get: function get() {
	          return e;
	        }
	      }]), i;
	    }();

	    M.Carousel = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "carousel", "M_Carousel");
	  }(cash), function (S) {

	    var e = {
	      onOpen: void 0,
	      onClose: void 0
	    },
	        t = function (t) {
	      function n(t, e) {
	        _classCallCheck(this, n);

	        var i = _possibleConstructorReturn(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, n, t, e));

	        return (i.el.M_TapTarget = i).options = S.extend({}, n.defaults, e), i.isOpen = !1, i.$origin = S("#" + i.$el.attr("data-target")), i._setup(), i._calculatePositioning(), i._setupEventHandlers(), i;
	      }

	      return _inherits(n, Component), _createClass(n, [{
	        key: "destroy",
	        value: function value() {
	          this._removeEventHandlers(), this.el.TapTarget = void 0;
	        }
	      }, {
	        key: "_setupEventHandlers",
	        value: function value() {
	          this._handleDocumentClickBound = this._handleDocumentClick.bind(this), this._handleTargetClickBound = this._handleTargetClick.bind(this), this._handleOriginClickBound = this._handleOriginClick.bind(this), this.el.addEventListener("click", this._handleTargetClickBound), this.originEl.addEventListener("click", this._handleOriginClickBound);
	          var t = M.throttle(this._handleResize, 200);
	          this._handleThrottledResizeBound = t.bind(this), window.addEventListener("resize", this._handleThrottledResizeBound);
	        }
	      }, {
	        key: "_removeEventHandlers",
	        value: function value() {
	          this.el.removeEventListener("click", this._handleTargetClickBound), this.originEl.removeEventListener("click", this._handleOriginClickBound), window.removeEventListener("resize", this._handleThrottledResizeBound);
	        }
	      }, {
	        key: "_handleTargetClick",
	        value: function value(t) {
	          this.open();
	        }
	      }, {
	        key: "_handleOriginClick",
	        value: function value(t) {
	          this.close();
	        }
	      }, {
	        key: "_handleResize",
	        value: function value(t) {
	          this._calculatePositioning();
	        }
	      }, {
	        key: "_handleDocumentClick",
	        value: function value(t) {
	          S(t.target).closest(".tap-target-wrapper").length || (this.close(), t.preventDefault(), t.stopPropagation());
	        }
	      }, {
	        key: "_setup",
	        value: function value() {
	          this.wrapper = this.$el.parent()[0], this.waveEl = S(this.wrapper).find(".tap-target-wave")[0], this.originEl = S(this.wrapper).find(".tap-target-origin")[0], this.contentEl = this.$el.find(".tap-target-content")[0], S(this.wrapper).hasClass(".tap-target-wrapper") || (this.wrapper = document.createElement("div"), this.wrapper.classList.add("tap-target-wrapper"), this.$el.before(S(this.wrapper)), this.wrapper.append(this.el)), this.contentEl || (this.contentEl = document.createElement("div"), this.contentEl.classList.add("tap-target-content"), this.$el.append(this.contentEl)), this.waveEl || (this.waveEl = document.createElement("div"), this.waveEl.classList.add("tap-target-wave"), this.originEl || (this.originEl = this.$origin.clone(!0, !0), this.originEl.addClass("tap-target-origin"), this.originEl.removeAttr("id"), this.originEl.removeAttr("style"), this.originEl = this.originEl[0], this.waveEl.append(this.originEl)), this.wrapper.append(this.waveEl));
	        }
	      }, {
	        key: "_calculatePositioning",
	        value: function value() {
	          var t = "fixed" === this.$origin.css("position");
	          if (!t) for (var e = this.$origin.parents(), i = 0; i < e.length && !(t = "fixed" == S(e[i]).css("position")); i++) {
	          }

	          var n = this.$origin.outerWidth(),
	              s = this.$origin.outerHeight(),
	              o = t ? this.$origin.offset().top - M.getDocumentScrollTop() : this.$origin.offset().top,
	              a = t ? this.$origin.offset().left - M.getDocumentScrollLeft() : this.$origin.offset().left,
	              r = window.innerWidth,
	              l = window.innerHeight,
	              h = r / 2,
	              d = l / 2,
	              u = a <= h,
	              c = h < a,
	              p = o <= d,
	              v = d < o,
	              f = .25 * r <= a && a <= .75 * r,
	              m = this.$el.outerWidth(),
	              g = this.$el.outerHeight(),
	              _ = o + s / 2 - g / 2,
	              y = a + n / 2 - m / 2,
	              k = t ? "fixed" : "absolute",
	              b = f ? m : m / 2 + n,
	              w = g / 2,
	              C = p ? g / 2 : 0,
	              E = u && !f ? m / 2 - n : 0,
	              O = n,
	              x = v ? "bottom" : "top",
	              L = 2 * n,
	              T = L,
	              $ = g / 2 - T / 2,
	              B = m / 2 - L / 2,
	              D = {};

	          D.top = p ? _ + "px" : "", D.right = c ? r - y - m + "px" : "", D.bottom = v ? l - _ - g + "px" : "", D.left = u ? y + "px" : "", D.position = k, S(this.wrapper).css(D), S(this.contentEl).css({
	            width: b + "px",
	            height: w + "px",
	            top: C + "px",
	            right: "0px",
	            bottom: "0px",
	            left: E + "px",
	            padding: O + "px",
	            verticalAlign: x
	          }), S(this.waveEl).css({
	            top: $ + "px",
	            left: B + "px",
	            width: L + "px",
	            height: T + "px"
	          });
	        }
	      }, {
	        key: "open",
	        value: function value() {
	          this.isOpen || ("function" == typeof this.options.onOpen && this.options.onOpen.call(this, this.$origin[0]), this.isOpen = !0, this.wrapper.classList.add("open"), document.body.addEventListener("click", this._handleDocumentClickBound, !0), document.body.addEventListener("touchend", this._handleDocumentClickBound));
	        }
	      }, {
	        key: "close",
	        value: function value() {
	          this.isOpen && ("function" == typeof this.options.onClose && this.options.onClose.call(this, this.$origin[0]), this.isOpen = !1, this.wrapper.classList.remove("open"), document.body.removeEventListener("click", this._handleDocumentClickBound, !0), document.body.removeEventListener("touchend", this._handleDocumentClickBound));
	        }
	      }], [{
	        key: "init",
	        value: function value(t, e) {
	          return _get(n.__proto__ || Object.getPrototypeOf(n), "init", this).call(this, this, t, e);
	        }
	      }, {
	        key: "getInstance",
	        value: function value(t) {
	          return (t.jquery ? t[0] : t).M_TapTarget;
	        }
	      }, {
	        key: "defaults",
	        get: function get() {
	          return e;
	        }
	      }]), n;
	    }();

	    M.TapTarget = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "tapTarget", "M_TapTarget");
	  }(cash), function (d) {

	    var e = {
	      classes: "",
	      dropdownOptions: {}
	    },
	        t = function (t) {
	      function n(t, e) {
	        _classCallCheck(this, n);

	        var i = _possibleConstructorReturn(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, n, t, e));

	        return i.$el.hasClass("browser-default") ? _possibleConstructorReturn(i) : ((i.el.M_FormSelect = i).options = d.extend({}, n.defaults, e), i.isMultiple = i.$el.prop("multiple"), i.el.tabIndex = -1, i._keysSelected = {}, i._valueDict = {}, i._setupDropdown(), i._setupEventHandlers(), i);
	      }

	      return _inherits(n, Component), _createClass(n, [{
	        key: "destroy",
	        value: function value() {
	          this._removeEventHandlers(), this._removeDropdown(), this.el.M_FormSelect = void 0;
	        }
	      }, {
	        key: "_setupEventHandlers",
	        value: function value() {
	          var e = this;
	          this._handleSelectChangeBound = this._handleSelectChange.bind(this), this._handleOptionClickBound = this._handleOptionClick.bind(this), this._handleInputClickBound = this._handleInputClick.bind(this), d(this.dropdownOptions).find("li:not(.optgroup)").each(function (t) {
	            t.addEventListener("click", e._handleOptionClickBound);
	          }), this.el.addEventListener("change", this._handleSelectChangeBound), this.input.addEventListener("click", this._handleInputClickBound);
	        }
	      }, {
	        key: "_removeEventHandlers",
	        value: function value() {
	          var e = this;
	          d(this.dropdownOptions).find("li:not(.optgroup)").each(function (t) {
	            t.removeEventListener("click", e._handleOptionClickBound);
	          }), this.el.removeEventListener("change", this._handleSelectChangeBound), this.input.removeEventListener("click", this._handleInputClickBound);
	        }
	      }, {
	        key: "_handleSelectChange",
	        value: function value(t) {
	          this._setValueToInput();
	        }
	      }, {
	        key: "_handleOptionClick",
	        value: function value(t) {
	          t.preventDefault();
	          var e = d(t.target).closest("li")[0],
	              i = e.id;

	          if (!d(e).hasClass("disabled") && !d(e).hasClass("optgroup") && i.length) {
	            var n = !0;

	            if (this.isMultiple) {
	              var s = d(this.dropdownOptions).find("li.disabled.selected");
	              s.length && (s.removeClass("selected"), s.find('input[type="checkbox"]').prop("checked", !1), this._toggleEntryFromArray(s[0].id)), n = this._toggleEntryFromArray(i);
	            } else d(this.dropdownOptions).find("li").removeClass("selected"), d(e).toggleClass("selected", n);

	            d(this._valueDict[i].el).prop("selected") !== n && (d(this._valueDict[i].el).prop("selected", n), this.$el.trigger("change"));
	          }

	          t.stopPropagation();
	        }
	      }, {
	        key: "_handleInputClick",
	        value: function value() {
	          this.dropdown && this.dropdown.isOpen && (this._setValueToInput(), this._setSelectedStates());
	        }
	      }, {
	        key: "_setupDropdown",
	        value: function value() {
	          var n = this;
	          this.wrapper = document.createElement("div"), d(this.wrapper).addClass("select-wrapper " + this.options.classes), this.$el.before(d(this.wrapper)), this.wrapper.appendChild(this.el), this.el.disabled && this.wrapper.classList.add("disabled"), this.$selectOptions = this.$el.children("option, optgroup"), this.dropdownOptions = document.createElement("ul"), this.dropdownOptions.id = "select-options-" + M.guid(), d(this.dropdownOptions).addClass("dropdown-content select-dropdown " + (this.isMultiple ? "multiple-select-dropdown" : "")), this.$selectOptions.length && this.$selectOptions.each(function (t) {
	            if (d(t).is("option")) {
	              var e = void 0;
	              e = n.isMultiple ? n._appendOptionWithIcon(n.$el, t, "multiple") : n._appendOptionWithIcon(n.$el, t), n._addOptionToValueDict(t, e);
	            } else if (d(t).is("optgroup")) {
	              var i = d(t).children("option");
	              d(n.dropdownOptions).append(d('<li class="optgroup"><span>' + t.getAttribute("label") + "</span></li>")[0]), i.each(function (t) {
	                var e = n._appendOptionWithIcon(n.$el, t, "optgroup-option");

	                n._addOptionToValueDict(t, e);
	              });
	            }
	          }), this.$el.after(this.dropdownOptions), this.input = document.createElement("input"), d(this.input).addClass("select-dropdown dropdown-trigger"), this.input.setAttribute("type", "text"), this.input.setAttribute("readonly", "true"), this.input.setAttribute("data-target", this.dropdownOptions.id), this.el.disabled && d(this.input).prop("disabled", "true"), this.$el.before(this.input), this._setValueToInput();
	          var t = d('<svg class="caret" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');

	          if (this.$el.before(t[0]), !this.el.disabled) {
	            var e = d.extend({}, this.options.dropdownOptions);
	            e.onOpenEnd = function (t) {
	              var e = d(n.dropdownOptions).find(".selected").first();

	              if (n.dropdown.isScrollable && e.length) {
	                var i = e[0].getBoundingClientRect().top - n.dropdownOptions.getBoundingClientRect().top;
	                i -= n.dropdownOptions.clientHeight / 2, n.dropdownOptions.scrollTop = i;
	              }
	            }, this.isMultiple && (e.closeOnClick = !1), this.dropdown = M.Dropdown.init(this.input, e);
	          }

	          this._setSelectedStates();
	        }
	      }, {
	        key: "_addOptionToValueDict",
	        value: function value(t, e) {
	          var i = Object.keys(this._valueDict).length,
	              n = this.dropdownOptions.id + i,
	              s = {};
	          e.id = n, s.el = t, s.optionEl = e, this._valueDict[n] = s;
	        }
	      }, {
	        key: "_removeDropdown",
	        value: function value() {
	          d(this.wrapper).find(".caret").remove(), d(this.input).remove(), d(this.dropdownOptions).remove(), d(this.wrapper).before(this.$el), d(this.wrapper).remove();
	        }
	      }, {
	        key: "_appendOptionWithIcon",
	        value: function value(t, e, i) {
	          var n = e.disabled ? "disabled " : "",
	              s = "optgroup-option" === i ? "optgroup-option " : "",
	              o = this.isMultiple ? '<label><input type="checkbox"' + n + '"/><span>' + e.innerHTML + "</span></label>" : e.innerHTML,
	              a = d("<li></li>"),
	              r = d("<span></span>");
	          r.html(o), a.addClass(n + " " + s), a.append(r);
	          var l = e.getAttribute("data-icon");

	          if (l) {
	            var h = d('<img alt="" src="' + l + '">');
	            a.prepend(h);
	          }

	          return d(this.dropdownOptions).append(a[0]), a[0];
	        }
	      }, {
	        key: "_toggleEntryFromArray",
	        value: function value(t) {
	          var e = !this._keysSelected.hasOwnProperty(t),
	              i = d(this._valueDict[t].optionEl);
	          return e ? this._keysSelected[t] = !0 : delete this._keysSelected[t], i.toggleClass("selected", e), i.find('input[type="checkbox"]').prop("checked", e), i.prop("selected", e), e;
	        }
	      }, {
	        key: "_setValueToInput",
	        value: function value() {
	          var i = [];

	          if (this.$el.find("option").each(function (t) {
	            if (d(t).prop("selected")) {
	              var e = d(t).text();
	              i.push(e);
	            }
	          }), !i.length) {
	            var t = this.$el.find("option:disabled").eq(0);
	            t.length && "" === t[0].value && i.push(t.text());
	          }

	          this.input.value = i.join(", ");
	        }
	      }, {
	        key: "_setSelectedStates",
	        value: function value() {
	          for (var t in this._keysSelected = {}, this._valueDict) {
	            var e = this._valueDict[t],
	                i = d(e.el).prop("selected");
	            d(e.optionEl).find('input[type="checkbox"]').prop("checked", i), i ? (this._activateOption(d(this.dropdownOptions), d(e.optionEl)), this._keysSelected[t] = !0) : d(e.optionEl).removeClass("selected");
	          }
	        }
	      }, {
	        key: "_activateOption",
	        value: function value(t, e) {
	          e && (this.isMultiple || t.find("li.selected").removeClass("selected"), d(e).addClass("selected"));
	        }
	      }, {
	        key: "getSelectedValues",
	        value: function value() {
	          var t = [];

	          for (var e in this._keysSelected) {
	            t.push(this._valueDict[e].el.value);
	          }

	          return t;
	        }
	      }], [{
	        key: "init",
	        value: function value(t, e) {
	          return _get(n.__proto__ || Object.getPrototypeOf(n), "init", this).call(this, this, t, e);
	        }
	      }, {
	        key: "getInstance",
	        value: function value(t) {
	          return (t.jquery ? t[0] : t).M_FormSelect;
	        }
	      }, {
	        key: "defaults",
	        get: function get() {
	          return e;
	        }
	      }]), n;
	    }();

	    M.FormSelect = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "formSelect", "M_FormSelect");
	  }(cash), function (s, e) {

	    var i = {},
	        t = function (t) {
	      function n(t, e) {
	        _classCallCheck(this, n);

	        var i = _possibleConstructorReturn(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, n, t, e));

	        return (i.el.M_Range = i).options = s.extend({}, n.defaults, e), i._mousedown = !1, i._setupThumb(), i._setupEventHandlers(), i;
	      }

	      return _inherits(n, Component), _createClass(n, [{
	        key: "destroy",
	        value: function value() {
	          this._removeEventHandlers(), this._removeThumb(), this.el.M_Range = void 0;
	        }
	      }, {
	        key: "_setupEventHandlers",
	        value: function value() {
	          this._handleRangeChangeBound = this._handleRangeChange.bind(this), this._handleRangeMousedownTouchstartBound = this._handleRangeMousedownTouchstart.bind(this), this._handleRangeInputMousemoveTouchmoveBound = this._handleRangeInputMousemoveTouchmove.bind(this), this._handleRangeMouseupTouchendBound = this._handleRangeMouseupTouchend.bind(this), this._handleRangeBlurMouseoutTouchleaveBound = this._handleRangeBlurMouseoutTouchleave.bind(this), this.el.addEventListener("change", this._handleRangeChangeBound), this.el.addEventListener("mousedown", this._handleRangeMousedownTouchstartBound), this.el.addEventListener("touchstart", this._handleRangeMousedownTouchstartBound), this.el.addEventListener("input", this._handleRangeInputMousemoveTouchmoveBound), this.el.addEventListener("mousemove", this._handleRangeInputMousemoveTouchmoveBound), this.el.addEventListener("touchmove", this._handleRangeInputMousemoveTouchmoveBound), this.el.addEventListener("mouseup", this._handleRangeMouseupTouchendBound), this.el.addEventListener("touchend", this._handleRangeMouseupTouchendBound), this.el.addEventListener("blur", this._handleRangeBlurMouseoutTouchleaveBound), this.el.addEventListener("mouseout", this._handleRangeBlurMouseoutTouchleaveBound), this.el.addEventListener("touchleave", this._handleRangeBlurMouseoutTouchleaveBound);
	        }
	      }, {
	        key: "_removeEventHandlers",
	        value: function value() {
	          this.el.removeEventListener("change", this._handleRangeChangeBound), this.el.removeEventListener("mousedown", this._handleRangeMousedownTouchstartBound), this.el.removeEventListener("touchstart", this._handleRangeMousedownTouchstartBound), this.el.removeEventListener("input", this._handleRangeInputMousemoveTouchmoveBound), this.el.removeEventListener("mousemove", this._handleRangeInputMousemoveTouchmoveBound), this.el.removeEventListener("touchmove", this._handleRangeInputMousemoveTouchmoveBound), this.el.removeEventListener("mouseup", this._handleRangeMouseupTouchendBound), this.el.removeEventListener("touchend", this._handleRangeMouseupTouchendBound), this.el.removeEventListener("blur", this._handleRangeBlurMouseoutTouchleaveBound), this.el.removeEventListener("mouseout", this._handleRangeBlurMouseoutTouchleaveBound), this.el.removeEventListener("touchleave", this._handleRangeBlurMouseoutTouchleaveBound);
	        }
	      }, {
	        key: "_handleRangeChange",
	        value: function value() {
	          s(this.value).html(this.$el.val()), s(this.thumb).hasClass("active") || this._showRangeBubble();

	          var t = this._calcRangeOffset();

	          s(this.thumb).addClass("active").css("left", t + "px");
	        }
	      }, {
	        key: "_handleRangeMousedownTouchstart",
	        value: function value(t) {
	          if (s(this.value).html(this.$el.val()), this._mousedown = !0, this.$el.addClass("active"), s(this.thumb).hasClass("active") || this._showRangeBubble(), "input" !== t.type) {
	            var e = this._calcRangeOffset();

	            s(this.thumb).addClass("active").css("left", e + "px");
	          }
	        }
	      }, {
	        key: "_handleRangeInputMousemoveTouchmove",
	        value: function value() {
	          if (this._mousedown) {
	            s(this.thumb).hasClass("active") || this._showRangeBubble();

	            var t = this._calcRangeOffset();

	            s(this.thumb).addClass("active").css("left", t + "px"), s(this.value).html(this.$el.val());
	          }
	        }
	      }, {
	        key: "_handleRangeMouseupTouchend",
	        value: function value() {
	          this._mousedown = !1, this.$el.removeClass("active");
	        }
	      }, {
	        key: "_handleRangeBlurMouseoutTouchleave",
	        value: function value() {
	          if (!this._mousedown) {
	            var t = 7 + parseInt(this.$el.css("padding-left")) + "px";
	            s(this.thumb).hasClass("active") && (e.remove(this.thumb), e({
	              targets: this.thumb,
	              height: 0,
	              width: 0,
	              top: 10,
	              easing: "easeOutQuad",
	              marginLeft: t,
	              duration: 100
	            })), s(this.thumb).removeClass("active");
	          }
	        }
	      }, {
	        key: "_setupThumb",
	        value: function value() {
	          this.thumb = document.createElement("span"), this.value = document.createElement("span"), s(this.thumb).addClass("thumb"), s(this.value).addClass("value"), s(this.thumb).append(this.value), this.$el.after(this.thumb);
	        }
	      }, {
	        key: "_removeThumb",
	        value: function value() {
	          s(this.thumb).remove();
	        }
	      }, {
	        key: "_showRangeBubble",
	        value: function value() {
	          var t = -7 + parseInt(s(this.thumb).parent().css("padding-left")) + "px";
	          e.remove(this.thumb), e({
	            targets: this.thumb,
	            height: 30,
	            width: 30,
	            top: -30,
	            marginLeft: t,
	            duration: 300,
	            easing: "easeOutQuint"
	          });
	        }
	      }, {
	        key: "_calcRangeOffset",
	        value: function value() {
	          var t = this.$el.width() - 15,
	              e = parseFloat(this.$el.attr("max")) || 100,
	              i = parseFloat(this.$el.attr("min")) || 0;
	          return (parseFloat(this.$el.val()) - i) / (e - i) * t;
	        }
	      }], [{
	        key: "init",
	        value: function value(t, e) {
	          return _get(n.__proto__ || Object.getPrototypeOf(n), "init", this).call(this, this, t, e);
	        }
	      }, {
	        key: "getInstance",
	        value: function value(t) {
	          return (t.jquery ? t[0] : t).M_Range;
	        }
	      }, {
	        key: "defaults",
	        get: function get() {
	          return i;
	        }
	      }]), n;
	    }();

	    M.Range = t, M.jQueryLoaded && M.initializeJqueryWrapper(t, "range", "M_Range"), t.init(s("input[type=range]"));
	  }(cash, M.anime);
	});

	var subscriber_queue = [];
	/**
	 * Creates a `Readable` store that allows reading by subscription.
	 * @param value initial value
	 * @param {StartStopNotifier}start start and stop notifications for subscriptions
	 */

	function readable(value, start) {
	  return {
	    subscribe: writable(value, start).subscribe
	  };
	}
	/**
	 * Create a `Writable` store that allows both updating and reading by subscription.
	 * @param {*=}value initial value
	 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
	 */


	function writable(value) {
	  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
	  var stop;
	  var subscribers = [];

	  function set(new_value) {
	    if (safe_not_equal(value, new_value)) {
	      value = new_value;

	      if (stop) {
	        // store is ready
	        var run_queue = !subscriber_queue.length;

	        for (var i = 0; i < subscribers.length; i += 1) {
	          var s = subscribers[i];
	          s[1]();
	          subscriber_queue.push(s, value);
	        }

	        if (run_queue) {
	          for (var _i = 0; _i < subscriber_queue.length; _i += 2) {
	            subscriber_queue[_i][0](subscriber_queue[_i + 1]);
	          }

	          subscriber_queue.length = 0;
	        }
	      }
	    }
	  }

	  function update(fn) {
	    set(fn(value));
	  }

	  function subscribe(run) {
	    var invalidate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
	    var subscriber = [run, invalidate];
	    subscribers.push(subscriber);

	    if (subscribers.length === 1) {
	      stop = start(set) || noop;
	    }

	    run(value);
	    return function () {
	      var index = subscribers.indexOf(subscriber);

	      if (index !== -1) {
	        subscribers.splice(index, 1);
	      }

	      if (subscribers.length === 0) {
	        stop();
	        stop = null;
	      }
	    };
	  }

	  return {
	    set: set,
	    update: update,
	    subscribe: subscribe
	  };
	}

	function derived(stores, fn, initial_value) {
	  var single = !Array.isArray(stores);
	  var stores_array = single ? [stores] : stores;
	  var auto = fn.length < 2;
	  return readable(initial_value, function (set) {
	    var inited = false;
	    var values = [];
	    var pending = 0;
	    var cleanup = noop;

	    var sync = function sync() {
	      if (pending) {
	        return;
	      }

	      cleanup();
	      var result = fn(single ? values[0] : values, set);

	      if (auto) {
	        set(result);
	      } else {
	        cleanup = is_function(result) ? result : noop;
	      }
	    };

	    var unsubscribers = stores_array.map(function (store, i) {
	      return subscribe(store, function (value) {
	        values[i] = value;
	        pending &= ~(1 << i);

	        if (inited) {
	          sync();
	        }
	      }, function () {
	        pending |= 1 << i;
	      });
	    });
	    inited = true;
	    sync();
	    return function stop() {
	      run_all(unsubscribers);
	      cleanup();
	    };
	  });
	}

	var LOCATION = {};
	var ROUTER = {};

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	/**
	 * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/history.js
	 *
	 * https://github.com/reach/router/blob/master/LICENSE
	 * */
	function getLocation(source) {
	  return _objectSpread({}, source.location, {
	    state: source.history.state,
	    key: source.history.state && source.history.state.key || "initial"
	  });
	}

	function createHistory(source, options) {
	  var listeners = [];
	  var location = getLocation(source);
	  return {
	    get location() {
	      return location;
	    },

	    listen: function listen(listener) {
	      listeners.push(listener);

	      var popstateListener = function popstateListener() {
	        location = getLocation(source);
	        listener({
	          location: location,
	          action: "POP"
	        });
	      };

	      source.addEventListener("popstate", popstateListener);
	      return function () {
	        source.removeEventListener("popstate", popstateListener);
	        var index = listeners.indexOf(listener);
	        listeners.splice(index, 1);
	      };
	    },
	    navigate: function navigate(to) {
	      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	          state = _ref.state,
	          _ref$replace = _ref.replace,
	          replace = _ref$replace === void 0 ? false : _ref$replace;

	      state = _objectSpread({}, state, {
	        key: Date.now() + ""
	      }); // try...catch iOS Safari limits to 100 pushState calls

	      try {
	        if (replace) {
	          source.history.replaceState(state, null, to);
	        } else {
	          source.history.pushState(state, null, to);
	        }
	      } catch (e) {
	        source.location[replace ? "replace" : "assign"](to);
	      }

	      location = getLocation(source);
	      listeners.forEach(function (listener) {
	        return listener({
	          location: location,
	          action: "PUSH"
	        });
	      });
	    }
	  };
	} // Stores history entries in memory for testing or other platforms like Native


	function createMemorySource() {
	  var initialPathname = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "/";
	  var index = 0;
	  var stack = [{
	    pathname: initialPathname,
	    search: ""
	  }];
	  var states = [];
	  return {
	    get location() {
	      return stack[index];
	    },

	    addEventListener: function addEventListener(name, fn) {},
	    removeEventListener: function removeEventListener(name, fn) {},
	    history: {
	      get entries() {
	        return stack;
	      },

	      get index() {
	        return index;
	      },

	      get state() {
	        return states[index];
	      },

	      pushState: function pushState(state, _, uri) {
	        var _uri$split = uri.split("?"),
	            _uri$split2 = _slicedToArray(_uri$split, 2),
	            pathname = _uri$split2[0],
	            _uri$split2$ = _uri$split2[1],
	            search = _uri$split2$ === void 0 ? "" : _uri$split2$;

	        index++;
	        stack.push({
	          pathname: pathname,
	          search: search
	        });
	        states.push(state);
	      },
	      replaceState: function replaceState(state, _, uri) {
	        var _uri$split3 = uri.split("?"),
	            _uri$split4 = _slicedToArray(_uri$split3, 2),
	            pathname = _uri$split4[0],
	            _uri$split4$ = _uri$split4[1],
	            search = _uri$split4$ === void 0 ? "" : _uri$split4$;

	        stack[index] = {
	          pathname: pathname,
	          search: search
	        };
	        states[index] = state;
	      }
	    }
	  };
	} // Global history uses window.history as the source if available,
	// otherwise a memory history


	var canUseDOM = Boolean(typeof window !== "undefined" && window.document && window.document.createElement);
	var globalHistory = createHistory(canUseDOM ? window : createMemorySource());
	var navigate = globalHistory.navigate;

	/**
	 * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/utils.js
	 *
	 * https://github.com/reach/router/blob/master/LICENSE
	 * */
	var paramRe = /^:(.+)/;
	var SEGMENT_POINTS = 4;
	var STATIC_POINTS = 3;
	var DYNAMIC_POINTS = 2;
	var SPLAT_PENALTY = 1;
	var ROOT_POINTS = 1;
	/**
	 * Check if `string` starts with `search`
	 * @param {string} string
	 * @param {string} search
	 * @return {boolean}
	 */

	function startsWith(string, search) {
	  return string.substr(0, search.length) === search;
	}
	/**
	 * Check if `segment` is a root segment
	 * @param {string} segment
	 * @return {boolean}
	 */

	function isRootSegment(segment) {
	  return segment === "";
	}
	/**
	 * Check if `segment` is a dynamic segment
	 * @param {string} segment
	 * @return {boolean}
	 */


	function isDynamic(segment) {
	  return paramRe.test(segment);
	}
	/**
	 * Check if `segment` is a splat
	 * @param {string} segment
	 * @return {boolean}
	 */


	function isSplat(segment) {
	  return segment[0] === "*";
	}
	/**
	 * Split up the URI into segments delimited by `/`
	 * @param {string} uri
	 * @return {string[]}
	 */


	function segmentize(uri) {
	  return uri // Strip starting/ending `/`
	  .replace(/(^\/+|\/+$)/g, "").split("/");
	}
	/**
	 * Strip `str` of potential start and end `/`
	 * @param {string} str
	 * @return {string}
	 */


	function stripSlashes(str) {
	  return str.replace(/(^\/+|\/+$)/g, "");
	}
	/**
	 * Score a route depending on how its individual segments look
	 * @param {object} route
	 * @param {number} index
	 * @return {object}
	 */


	function rankRoute(route, index) {
	  var score = route.default ? 0 : segmentize(route.path).reduce(function (score, segment) {
	    score += SEGMENT_POINTS;

	    if (isRootSegment(segment)) {
	      score += ROOT_POINTS;
	    } else if (isDynamic(segment)) {
	      score += DYNAMIC_POINTS;
	    } else if (isSplat(segment)) {
	      score -= SEGMENT_POINTS + SPLAT_PENALTY;
	    } else {
	      score += STATIC_POINTS;
	    }

	    return score;
	  }, 0);
	  return {
	    route: route,
	    score: score,
	    index: index
	  };
	}
	/**
	 * Give a score to all routes and sort them on that
	 * @param {object[]} routes
	 * @return {object[]}
	 */


	function rankRoutes(routes) {
	  return routes.map(rankRoute) // If two routes have the exact same score, we go by index instead
	  .sort(function (a, b) {
	    return a.score < b.score ? 1 : a.score > b.score ? -1 : a.index - b.index;
	  });
	}
	/**
	 * Ranks and picks the best route to match. Each segment gets the highest
	 * amount of points, then the type of segment gets an additional amount of
	 * points where
	 *
	 *  static > dynamic > splat > root
	 *
	 * This way we don't have to worry about the order of our routes, let the
	 * computers do it.
	 *
	 * A route looks like this
	 *
	 *  { path, default, value }
	 *
	 * And a returned match looks like:
	 *
	 *  { route, params, uri }
	 *
	 * @param {object[]} routes
	 * @param {string} uri
	 * @return {?object}
	 */


	function pick(routes, uri) {
	  var match;
	  var default_;

	  var _uri$split = uri.split("?"),
	      _uri$split2 = _slicedToArray(_uri$split, 1),
	      uriPathname = _uri$split2[0];

	  var uriSegments = segmentize(uriPathname);
	  var isRootUri = uriSegments[0] === "";
	  var ranked = rankRoutes(routes);

	  for (var i = 0, l = ranked.length; i < l; i++) {
	    var route = ranked[i].route;
	    var missed = false;

	    if (route.default) {
	      default_ = {
	        route: route,
	        params: {},
	        uri: uri
	      };
	      continue;
	    }

	    var routeSegments = segmentize(route.path);
	    var params = {};
	    var max = Math.max(uriSegments.length, routeSegments.length);
	    var index = 0;

	    for (; index < max; index++) {
	      var routeSegment = routeSegments[index];
	      var uriSegment = uriSegments[index];

	      if (routeSegment !== undefined && isSplat(routeSegment)) {
	        // Hit a splat, just grab the rest, and return a match
	        // uri:   /files/documents/work
	        // route: /files/* or /files/*splatname
	        var splatName = routeSegment === "*" ? "*" : routeSegment.slice(1);
	        params[splatName] = uriSegments.slice(index).map(decodeURIComponent).join("/");
	        break;
	      }

	      if (uriSegment === undefined) {
	        // URI is shorter than the route, no match
	        // uri:   /users
	        // route: /users/:userId
	        missed = true;
	        break;
	      }

	      var dynamicMatch = paramRe.exec(routeSegment);

	      if (dynamicMatch && !isRootUri) {
	        var value = decodeURIComponent(uriSegment);
	        params[dynamicMatch[1]] = value;
	      } else if (routeSegment !== uriSegment) {
	        // Current segments don't match, not dynamic, not splat, so no match
	        // uri:   /users/123/settings
	        // route: /users/:id/profile
	        missed = true;
	        break;
	      }
	    }

	    if (!missed) {
	      match = {
	        route: route,
	        params: params,
	        uri: "/" + uriSegments.slice(0, index).join("/")
	      };
	      break;
	    }
	  }

	  return match || default_ || null;
	}
	/**
	 * Check if the `path` matches the `uri`.
	 * @param {string} path
	 * @param {string} uri
	 * @return {?object}
	 */


	function match$1(route, uri) {
	  return pick([route], uri);
	}
	/**
	 * Add the query to the pathname if a query is given
	 * @param {string} pathname
	 * @param {string} [query]
	 * @return {string}
	 */


	function addQuery(pathname, query) {
	  return pathname + (query ? "?".concat(query) : "");
	}
	/**
	 * Resolve URIs as though every path is a directory, no files. Relative URIs
	 * in the browser can feel awkward because not only can you be "in a directory",
	 * you can be "at a file", too. For example:
	 *
	 *  browserSpecResolve('foo', '/bar/') => /bar/foo
	 *  browserSpecResolve('foo', '/bar') => /foo
	 *
	 * But on the command line of a file system, it's not as complicated. You can't
	 * `cd` from a file, only directories. This way, links have to know less about
	 * their current path. To go deeper you can do this:
	 *
	 *  <Link to="deeper"/>
	 *  // instead of
	 *  <Link to=`{${props.uri}/deeper}`/>
	 *
	 * Just like `cd`, if you want to go deeper from the command line, you do this:
	 *
	 *  cd deeper
	 *  # not
	 *  cd $(pwd)/deeper
	 *
	 * By treating every path as a directory, linking to relative paths should
	 * require less contextual information and (fingers crossed) be more intuitive.
	 * @param {string} to
	 * @param {string} base
	 * @return {string}
	 */


	function resolve(to, base) {
	  // /foo/bar, /baz/qux => /foo/bar
	  if (startsWith(to, "/")) {
	    return to;
	  }

	  var _to$split = to.split("?"),
	      _to$split2 = _slicedToArray(_to$split, 2),
	      toPathname = _to$split2[0],
	      toQuery = _to$split2[1];

	  var _base$split = base.split("?"),
	      _base$split2 = _slicedToArray(_base$split, 1),
	      basePathname = _base$split2[0];

	  var toSegments = segmentize(toPathname);
	  var baseSegments = segmentize(basePathname); // ?a=b, /users?b=c => /users?a=b

	  if (toSegments[0] === "") {
	    return addQuery(basePathname, toQuery);
	  } // profile, /users/789 => /users/789/profile


	  if (!startsWith(toSegments[0], ".")) {
	    var pathname = baseSegments.concat(toSegments).join("/");
	    return addQuery((basePathname === "/" ? "" : "/") + pathname, toQuery);
	  } // ./       , /users/123 => /users/123
	  // ../      , /users/123 => /users
	  // ../..    , /users/123 => /
	  // ../../one, /a/b/c/d   => /a/b/one
	  // .././one , /a/b/c/d   => /a/b/c/one


	  var allSegments = baseSegments.concat(toSegments);
	  var segments = [];
	  allSegments.forEach(function (segment) {
	    if (segment === "..") {
	      segments.pop();
	    } else if (segment !== ".") {
	      segments.push(segment);
	    }
	  });
	  return addQuery("/" + segments.join("/"), toQuery);
	}
	/**
	 * Combines the `basepath` and the `path` into one path.
	 * @param {string} basepath
	 * @param {string} path
	 */


	function combinePaths(basepath, path) {
	  return "".concat(stripSlashes(path === "/" ? basepath : "".concat(stripSlashes(basepath), "/").concat(stripSlashes(path))), "/");
	}
	/**
	 * Decides whether a given `event` should result in a navigation or not.
	 * @param {object} event
	 */


	function shouldNavigate(event) {
	  return !event.defaultPrevented && event.button === 0 && !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
	}

	function _createSuper$1(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$1()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

	function create_fragment(ctx) {
	  var current;
	  var default_slot_template =
	  /*$$slots*/
	  ctx[16].default;
	  var default_slot = create_slot(default_slot_template, ctx,
	  /*$$scope*/
	  ctx[15], null);
	  var block = {
	    c: function create() {
	      if (default_slot) default_slot.c();
	    },
	    l: function claim(nodes) {
	      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor) {
	      if (default_slot) {
	        default_slot.m(target, anchor);
	      }

	      current = true;
	    },
	    p: function update(ctx, _ref) {
	      var _ref2 = _slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      if (default_slot) {
	        if (default_slot.p && dirty &
	        /*$$scope*/
	        32768) {
	          default_slot.p(get_slot_context(default_slot_template, ctx,
	          /*$$scope*/
	          ctx[15], null), get_slot_changes(default_slot_template,
	          /*$$scope*/
	          ctx[15], dirty, null));
	        }
	      }
	    },
	    i: function intro(local) {
	      if (current) return;
	      transition_in(default_slot, local);
	      current = true;
	    },
	    o: function outro(local) {
	      transition_out(default_slot, local);
	      current = false;
	    },
	    d: function destroy(detaching) {
	      if (default_slot) default_slot.d(detaching);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function instance($$self, $$props, $$invalidate) {
	  var $base;
	  var $location;
	  var $routes;
	  var _$$props$basepath = $$props.basepath,
	      basepath = _$$props$basepath === void 0 ? "/" : _$$props$basepath;
	  var _$$props$url = $$props.url,
	      url = _$$props$url === void 0 ? null : _$$props$url;
	  var locationContext = getContext(LOCATION);
	  var routerContext = getContext(ROUTER);
	  var routes = writable([]);
	  validate_store(routes, "routes");
	  component_subscribe($$self, routes, function (value) {
	    return $$invalidate(8, $routes = value);
	  });
	  var activeRoute = writable(null);
	  var hasActiveRoute = false; // Used in SSR to synchronously set that a Route is active.
	  // If locationContext is not set, this is the topmost Router in the tree.
	  // If the `url` prop is given we force the location to it.

	  var location = locationContext || writable(url ? {
	    pathname: url
	  } : globalHistory.location);
	  validate_store(location, "location");
	  component_subscribe($$self, location, function (value) {
	    return $$invalidate(7, $location = value);
	  }); // If routerContext is set, the routerBase of the parent Router
	  // will be the base for this Router's descendants.
	  // If routerContext is not set, the path and resolved uri will both
	  // have the value of the basepath prop.

	  var base = routerContext ? routerContext.routerBase : writable({
	    path: basepath,
	    uri: basepath
	  });
	  validate_store(base, "base");
	  component_subscribe($$self, base, function (value) {
	    return $$invalidate(6, $base = value);
	  });
	  var routerBase = derived([base, activeRoute], function (_ref3) {
	    var _ref4 = _slicedToArray(_ref3, 2),
	        base = _ref4[0],
	        activeRoute = _ref4[1];

	    // If there is no activeRoute, the routerBase will be identical to the base.
	    if (activeRoute === null) {
	      return base;
	    }

	    var basepath = base.path;
	    var route = activeRoute.route,
	        uri = activeRoute.uri; // Remove the potential /* or /*splatname from
	    // the end of the child Routes relative paths.

	    var path = route.default ? basepath : route.path.replace(/\*.*$/, "");
	    return {
	      path: path,
	      uri: uri
	    };
	  });

	  function registerRoute(route) {
	    var _$base = $base,
	        basepath = _$base.path;
	    var path = route.path; // We store the original path in the _path property so we can reuse
	    // it when the basepath changes. The only thing that matters is that
	    // the route reference is intact, so mutation is fine.

	    route._path = path;
	    route.path = combinePaths(basepath, path);

	    if (typeof window === "undefined") {
	      // In SSR we should set the activeRoute immediately if it is a match.
	      // If there are more Routes being registered after a match is found,
	      // we just skip them.
	      if (hasActiveRoute) {
	        return;
	      }

	      var matchingRoute = match$1(route, $location.pathname);

	      if (matchingRoute) {
	        activeRoute.set(matchingRoute);
	        hasActiveRoute = true;
	      }
	    } else {
	      routes.update(function (rs) {
	        rs.push(route);
	        return rs;
	      });
	    }
	  }

	  function unregisterRoute(route) {
	    routes.update(function (rs) {
	      var index = rs.indexOf(route);
	      rs.splice(index, 1);
	      return rs;
	    });
	  }

	  if (!locationContext) {
	    // The topmost Router in the tree is responsible for updating
	    // the location store and supplying it through context.
	    onMount(function () {
	      var unlisten = globalHistory.listen(function (history) {
	        location.set(history.location);
	      });
	      return unlisten;
	    });
	    setContext(LOCATION, location);
	  }

	  setContext(ROUTER, {
	    activeRoute: activeRoute,
	    base: base,
	    routerBase: routerBase,
	    registerRoute: registerRoute,
	    unregisterRoute: unregisterRoute
	  });
	  var writable_props = ["basepath", "url"];
	  Object.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Router> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("Router", $$slots, ['default']);

	  $$self.$set = function ($$props) {
	    if ("basepath" in $$props) $$invalidate(3, basepath = $$props.basepath);
	    if ("url" in $$props) $$invalidate(4, url = $$props.url);
	    if ("$$scope" in $$props) $$invalidate(15, $$scope = $$props.$$scope);
	  };

	  $$self.$capture_state = function () {
	    return {
	      getContext: getContext,
	      setContext: setContext,
	      onMount: onMount,
	      writable: writable,
	      derived: derived,
	      LOCATION: LOCATION,
	      ROUTER: ROUTER,
	      globalHistory: globalHistory,
	      pick: pick,
	      match: match$1,
	      stripSlashes: stripSlashes,
	      combinePaths: combinePaths,
	      basepath: basepath,
	      url: url,
	      locationContext: locationContext,
	      routerContext: routerContext,
	      routes: routes,
	      activeRoute: activeRoute,
	      hasActiveRoute: hasActiveRoute,
	      location: location,
	      base: base,
	      routerBase: routerBase,
	      registerRoute: registerRoute,
	      unregisterRoute: unregisterRoute,
	      $base: $base,
	      $location: $location,
	      $routes: $routes
	    };
	  };

	  $$self.$inject_state = function ($$props) {
	    if ("basepath" in $$props) $$invalidate(3, basepath = $$props.basepath);
	    if ("url" in $$props) $$invalidate(4, url = $$props.url);
	    if ("hasActiveRoute" in $$props) hasActiveRoute = $$props.hasActiveRoute;
	  };

	  if ($$props && "$$inject" in $$props) {
	    $$self.$inject_state($$props.$$inject);
	  }

	  $$self.$$.update = function () {
	    if ($$self.$$.dirty &
	    /*$base*/
	    64) {
	      // This reactive statement will update all the Routes' path when
	      // the basepath changes.
	       {
	        var _$base2 = $base,
	            _basepath = _$base2.path;
	        routes.update(function (rs) {
	          rs.forEach(function (r) {
	            return r.path = combinePaths(_basepath, r._path);
	          });
	          return rs;
	        });
	      }
	    }

	    if ($$self.$$.dirty &
	    /*$routes, $location*/
	    384) {
	      // This reactive statement will be run when the Router is created
	      // when there are no Routes and then again the following tick, so it
	      // will not find an active Route in SSR and in the browser it will only
	      // pick an active Route after all Routes have been registered.
	       {
	        var bestMatch = pick($routes, $location.pathname);
	        activeRoute.set(bestMatch);
	      }
	    }
	  };

	  return [routes, location, base, basepath, url, hasActiveRoute, $base, $location, $routes, locationContext, routerContext, activeRoute, routerBase, registerRoute, unregisterRoute, $$scope, $$slots];
	}

	var Router = /*#__PURE__*/function (_SvelteComponentDev) {
	  _inherits(Router, _SvelteComponentDev);

	  var _super = _createSuper$1(Router);

	  function Router(options) {
	    var _this;

	    _classCallCheck(this, Router);

	    _this = _super.call(this, options);
	    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
	      basepath: 3,
	      url: 4
	    });
	    dispatch_dev("SvelteRegisterComponent", {
	      component: _assertThisInitialized(_this),
	      tagName: "Router",
	      options: options,
	      id: create_fragment.name
	    });
	    return _this;
	  }

	  _createClass(Router, [{
	    key: "basepath",
	    get: function get() {
	      throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    },
	    set: function set(value) {
	      throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    }
	  }, {
	    key: "url",
	    get: function get() {
	      throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    },
	    set: function set(value) {
	      throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    }
	  }]);

	  return Router;
	}(SvelteComponentDev);

	function _objectWithoutPropertiesLoose(source, excluded) {
	  if (source == null) return {};
	  var target = {};
	  var sourceKeys = Object.keys(source);
	  var key, i;

	  for (i = 0; i < sourceKeys.length; i++) {
	    key = sourceKeys[i];
	    if (excluded.indexOf(key) >= 0) continue;
	    target[key] = source[key];
	  }

	  return target;
	}

	function _objectWithoutProperties(source, excluded) {
	  if (source == null) return {};
	  var target = _objectWithoutPropertiesLoose(source, excluded);
	  var key, i;

	  if (Object.getOwnPropertySymbols) {
	    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

	    for (i = 0; i < sourceSymbolKeys.length; i++) {
	      key = sourceSymbolKeys[i];
	      if (excluded.indexOf(key) >= 0) continue;
	      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
	      target[key] = source[key];
	    }
	  }

	  return target;
	}

	function _createSuper$2(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$2()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

	var get_default_slot_changes = function get_default_slot_changes(dirty) {
	  return {
	    params: dirty &
	    /*routeParams*/
	    2,
	    location: dirty &
	    /*$location*/
	    16
	  };
	};

	var get_default_slot_context = function get_default_slot_context(ctx) {
	  return {
	    params:
	    /*routeParams*/
	    ctx[1],
	    location:
	    /*$location*/
	    ctx[4]
	  };
	}; // (40:0) {#if $activeRoute !== null && $activeRoute.route === route}


	function create_if_block(ctx) {
	  var current_block_type_index;
	  var if_block;
	  var if_block_anchor;
	  var current;
	  var if_block_creators = [create_if_block_1, create_else_block];
	  var if_blocks = [];

	  function select_block_type(ctx, dirty) {
	    if (
	    /*component*/
	    ctx[0] !== null) return 0;
	    return 1;
	  }

	  current_block_type_index = select_block_type(ctx);
	  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	  var block = {
	    c: function create() {
	      if_block.c();
	      if_block_anchor = empty();
	    },
	    m: function mount(target, anchor) {
	      if_blocks[current_block_type_index].m(target, anchor);
	      insert_dev(target, if_block_anchor, anchor);
	      current = true;
	    },
	    p: function update(ctx, dirty) {
	      var previous_block_index = current_block_type_index;
	      current_block_type_index = select_block_type(ctx);

	      if (current_block_type_index === previous_block_index) {
	        if_blocks[current_block_type_index].p(ctx, dirty);
	      } else {
	        group_outros();
	        transition_out(if_blocks[previous_block_index], 1, 1, function () {
	          if_blocks[previous_block_index] = null;
	        });
	        check_outros();
	        if_block = if_blocks[current_block_type_index];

	        if (!if_block) {
	          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	          if_block.c();
	        }

	        transition_in(if_block, 1);
	        if_block.m(if_block_anchor.parentNode, if_block_anchor);
	      }
	    },
	    i: function intro(local) {
	      if (current) return;
	      transition_in(if_block);
	      current = true;
	    },
	    o: function outro(local) {
	      transition_out(if_block);
	      current = false;
	    },
	    d: function destroy(detaching) {
	      if_blocks[current_block_type_index].d(detaching);
	      if (detaching) detach_dev(if_block_anchor);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_if_block.name,
	    type: "if",
	    source: "(40:0) {#if $activeRoute !== null && $activeRoute.route === route}",
	    ctx: ctx
	  });
	  return block;
	} // (43:2) {:else}


	function create_else_block(ctx) {
	  var current;
	  var default_slot_template =
	  /*$$slots*/
	  ctx[13].default;
	  var default_slot = create_slot(default_slot_template, ctx,
	  /*$$scope*/
	  ctx[12], get_default_slot_context);
	  var block = {
	    c: function create() {
	      if (default_slot) default_slot.c();
	    },
	    m: function mount(target, anchor) {
	      if (default_slot) {
	        default_slot.m(target, anchor);
	      }

	      current = true;
	    },
	    p: function update(ctx, dirty) {
	      if (default_slot) {
	        if (default_slot.p && dirty &
	        /*$$scope, routeParams, $location*/
	        4114) {
	          default_slot.p(get_slot_context(default_slot_template, ctx,
	          /*$$scope*/
	          ctx[12], get_default_slot_context), get_slot_changes(default_slot_template,
	          /*$$scope*/
	          ctx[12], dirty, get_default_slot_changes));
	        }
	      }
	    },
	    i: function intro(local) {
	      if (current) return;
	      transition_in(default_slot, local);
	      current = true;
	    },
	    o: function outro(local) {
	      transition_out(default_slot, local);
	      current = false;
	    },
	    d: function destroy(detaching) {
	      if (default_slot) default_slot.d(detaching);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_else_block.name,
	    type: "else",
	    source: "(43:2) {:else}",
	    ctx: ctx
	  });
	  return block;
	} // (41:2) {#if component !== null}


	function create_if_block_1(ctx) {
	  var switch_instance_anchor;
	  var current;
	  var switch_instance_spread_levels = [{
	    location:
	    /*$location*/
	    ctx[4]
	  },
	  /*routeParams*/
	  ctx[1],
	  /*routeProps*/
	  ctx[2]];
	  var switch_value =
	  /*component*/
	  ctx[0];

	  function switch_props(ctx) {
	    var switch_instance_props = {};

	    for (var i = 0; i < switch_instance_spread_levels.length; i += 1) {
	      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
	    }

	    return {
	      props: switch_instance_props,
	      $$inline: true
	    };
	  }

	  if (switch_value) {
	    var switch_instance = new switch_value(switch_props());
	  }

	  var block = {
	    c: function create() {
	      if (switch_instance) create_component(switch_instance.$$.fragment);
	      switch_instance_anchor = empty();
	    },
	    m: function mount(target, anchor) {
	      if (switch_instance) {
	        mount_component(switch_instance, target, anchor);
	      }

	      insert_dev(target, switch_instance_anchor, anchor);
	      current = true;
	    },
	    p: function update(ctx, dirty) {
	      var switch_instance_changes = dirty &
	      /*$location, routeParams, routeProps*/
	      22 ? get_spread_update(switch_instance_spread_levels, [dirty &
	      /*$location*/
	      16 && {
	        location:
	        /*$location*/
	        ctx[4]
	      }, dirty &
	      /*routeParams*/
	      2 && get_spread_object(
	      /*routeParams*/
	      ctx[1]), dirty &
	      /*routeProps*/
	      4 && get_spread_object(
	      /*routeProps*/
	      ctx[2])]) : {};

	      if (switch_value !== (switch_value =
	      /*component*/
	      ctx[0])) {
	        if (switch_instance) {
	          group_outros();
	          var old_component = switch_instance;
	          transition_out(old_component.$$.fragment, 1, 0, function () {
	            destroy_component(old_component, 1);
	          });
	          check_outros();
	        }

	        if (switch_value) {
	          switch_instance = new switch_value(switch_props());
	          create_component(switch_instance.$$.fragment);
	          transition_in(switch_instance.$$.fragment, 1);
	          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
	        } else {
	          switch_instance = null;
	        }
	      } else if (switch_value) {
	        switch_instance.$set(switch_instance_changes);
	      }
	    },
	    i: function intro(local) {
	      if (current) return;
	      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
	      current = true;
	    },
	    o: function outro(local) {
	      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
	      current = false;
	    },
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(switch_instance_anchor);
	      if (switch_instance) destroy_component(switch_instance, detaching);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_if_block_1.name,
	    type: "if",
	    source: "(41:2) {#if component !== null}",
	    ctx: ctx
	  });
	  return block;
	}

	function create_fragment$1(ctx) {
	  var if_block_anchor;
	  var current;
	  var if_block =
	  /*$activeRoute*/
	  ctx[3] !== null &&
	  /*$activeRoute*/
	  ctx[3].route ===
	  /*route*/
	  ctx[7] && create_if_block(ctx);
	  var block = {
	    c: function create() {
	      if (if_block) if_block.c();
	      if_block_anchor = empty();
	    },
	    l: function claim(nodes) {
	      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor) {
	      if (if_block) if_block.m(target, anchor);
	      insert_dev(target, if_block_anchor, anchor);
	      current = true;
	    },
	    p: function update(ctx, _ref) {
	      var _ref2 = _slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      if (
	      /*$activeRoute*/
	      ctx[3] !== null &&
	      /*$activeRoute*/
	      ctx[3].route ===
	      /*route*/
	      ctx[7]) {
	        if (if_block) {
	          if_block.p(ctx, dirty);
	          transition_in(if_block, 1);
	        } else {
	          if_block = create_if_block(ctx);
	          if_block.c();
	          transition_in(if_block, 1);
	          if_block.m(if_block_anchor.parentNode, if_block_anchor);
	        }
	      } else if (if_block) {
	        group_outros();
	        transition_out(if_block, 1, 1, function () {
	          if_block = null;
	        });
	        check_outros();
	      }
	    },
	    i: function intro(local) {
	      if (current) return;
	      transition_in(if_block);
	      current = true;
	    },
	    o: function outro(local) {
	      transition_out(if_block);
	      current = false;
	    },
	    d: function destroy(detaching) {
	      if (if_block) if_block.d(detaching);
	      if (detaching) detach_dev(if_block_anchor);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$1.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function instance$1($$self, $$props, $$invalidate) {
	  var $activeRoute;
	  var $location;
	  var _$$props = $$props,
	      _$$props$path = _$$props.path,
	      path = _$$props$path === void 0 ? "" : _$$props$path;
	  var _$$props2 = $$props,
	      _$$props2$component = _$$props2.component,
	      component = _$$props2$component === void 0 ? null : _$$props2$component;

	  var _getContext = getContext(ROUTER),
	      registerRoute = _getContext.registerRoute,
	      unregisterRoute = _getContext.unregisterRoute,
	      activeRoute = _getContext.activeRoute;

	  validate_store(activeRoute, "activeRoute");
	  component_subscribe($$self, activeRoute, function (value) {
	    return $$invalidate(3, $activeRoute = value);
	  });
	  var location = getContext(LOCATION);
	  validate_store(location, "location");
	  component_subscribe($$self, location, function (value) {
	    return $$invalidate(4, $location = value);
	  });
	  var route = {
	    path: path,
	    // If no path prop is given, this Route will act as the default Route
	    // that is rendered if no other Route in the Router is a match.
	    default: path === ""
	  };
	  var routeParams = {};
	  var routeProps = {};
	  registerRoute(route); // There is no need to unregister Routes in SSR since it will all be
	  // thrown away anyway.

	  if (typeof window !== "undefined") {
	    onDestroy(function () {
	      unregisterRoute(route);
	    });
	  }

	  var _$$props3 = $$props,
	      _$$props3$$$slots = _$$props3.$$slots,
	      $$slots = _$$props3$$$slots === void 0 ? {} : _$$props3$$$slots,
	      $$scope = _$$props3.$$scope;
	  validate_slots("Route", $$slots, ['default']);

	  $$self.$set = function ($$new_props) {
	    $$invalidate(11, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
	    if ("path" in $$new_props) $$invalidate(8, path = $$new_props.path);
	    if ("component" in $$new_props) $$invalidate(0, component = $$new_props.component);
	    if ("$$scope" in $$new_props) $$invalidate(12, $$scope = $$new_props.$$scope);
	  };

	  $$self.$capture_state = function () {
	    return {
	      getContext: getContext,
	      onDestroy: onDestroy,
	      ROUTER: ROUTER,
	      LOCATION: LOCATION,
	      path: path,
	      component: component,
	      registerRoute: registerRoute,
	      unregisterRoute: unregisterRoute,
	      activeRoute: activeRoute,
	      location: location,
	      route: route,
	      routeParams: routeParams,
	      routeProps: routeProps,
	      $activeRoute: $activeRoute,
	      $location: $location
	    };
	  };

	  $$self.$inject_state = function ($$new_props) {
	    $$invalidate(11, $$props = assign(assign({}, $$props), $$new_props));
	    if ("path" in $$props) $$invalidate(8, path = $$new_props.path);
	    if ("component" in $$props) $$invalidate(0, component = $$new_props.component);
	    if ("routeParams" in $$props) $$invalidate(1, routeParams = $$new_props.routeParams);
	    if ("routeProps" in $$props) $$invalidate(2, routeProps = $$new_props.routeProps);
	  };

	  if ($$props && "$$inject" in $$props) {
	    $$self.$inject_state($$props.$$inject);
	  }

	  $$self.$$.update = function () {
	    if ($$self.$$.dirty &
	    /*$activeRoute*/
	    8) {
	       if ($activeRoute && $activeRoute.route === route) {
	        $$invalidate(1, routeParams = $activeRoute.params);
	      }
	    }

	     {
	      var _$$props4 = $$props,
	          _path = _$$props4.path,
	          _component = _$$props4.component,
	          rest = _objectWithoutProperties(_$$props4, ["path", "component"]);

	      $$invalidate(2, routeProps = rest);
	    }
	  };

	  $$props = exclude_internal_props($$props);
	  return [component, routeParams, routeProps, $activeRoute, $location, activeRoute, location, route, path, registerRoute, unregisterRoute, $$props, $$scope, $$slots];
	}

	var Route = /*#__PURE__*/function (_SvelteComponentDev) {
	  _inherits(Route, _SvelteComponentDev);

	  var _super = _createSuper$2(Route);

	  function Route(options) {
	    var _this;

	    _classCallCheck(this, Route);

	    _this = _super.call(this, options);
	    init(_assertThisInitialized(_this), options, instance$1, create_fragment$1, safe_not_equal, {
	      path: 8,
	      component: 0
	    });
	    dispatch_dev("SvelteRegisterComponent", {
	      component: _assertThisInitialized(_this),
	      tagName: "Route",
	      options: options,
	      id: create_fragment$1.name
	    });
	    return _this;
	  }

	  _createClass(Route, [{
	    key: "path",
	    get: function get() {
	      throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    },
	    set: function set(value) {
	      throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    }
	  }, {
	    key: "component",
	    get: function get() {
	      throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    },
	    set: function set(value) {
	      throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    }
	  }]);

	  return Route;
	}(SvelteComponentDev);

	function _createSuper$3(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$3()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	var file = "node_modules/svelte-routing/src/Link.svelte";

	function create_fragment$2(ctx) {
	  var a;
	  var current;
	  var dispose;
	  var default_slot_template =
	  /*$$slots*/
	  ctx[16].default;
	  var default_slot = create_slot(default_slot_template, ctx,
	  /*$$scope*/
	  ctx[15], null);
	  var a_levels = [{
	    href:
	    /*href*/
	    ctx[0]
	  }, {
	    "aria-current":
	    /*ariaCurrent*/
	    ctx[2]
	  },
	  /*props*/
	  ctx[1]];
	  var a_data = {};

	  for (var i = 0; i < a_levels.length; i += 1) {
	    a_data = assign(a_data, a_levels[i]);
	  }

	  var block = {
	    c: function create() {
	      a = element("a");
	      if (default_slot) default_slot.c();
	      set_attributes(a, a_data);
	      add_location(a, file, 40, 0, 1249);
	    },
	    l: function claim(nodes) {
	      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor, remount) {
	      insert_dev(target, a, anchor);

	      if (default_slot) {
	        default_slot.m(a, null);
	      }

	      current = true;
	      if (remount) dispose();
	      dispose = listen_dev(a, "click",
	      /*onClick*/
	      ctx[5], false, false, false);
	    },
	    p: function update(ctx, _ref) {
	      var _ref2 = _slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      if (default_slot) {
	        if (default_slot.p && dirty &
	        /*$$scope*/
	        32768) {
	          default_slot.p(get_slot_context(default_slot_template, ctx,
	          /*$$scope*/
	          ctx[15], null), get_slot_changes(default_slot_template,
	          /*$$scope*/
	          ctx[15], dirty, null));
	        }
	      }

	      set_attributes(a, get_spread_update(a_levels, [dirty &
	      /*href*/
	      1 && {
	        href:
	        /*href*/
	        ctx[0]
	      }, dirty &
	      /*ariaCurrent*/
	      4 && {
	        "aria-current":
	        /*ariaCurrent*/
	        ctx[2]
	      }, dirty &
	      /*props*/
	      2 &&
	      /*props*/
	      ctx[1]]));
	    },
	    i: function intro(local) {
	      if (current) return;
	      transition_in(default_slot, local);
	      current = true;
	    },
	    o: function outro(local) {
	      transition_out(default_slot, local);
	      current = false;
	    },
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(a);
	      if (default_slot) default_slot.d(detaching);
	      dispose();
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$2.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function instance$2($$self, $$props, $$invalidate) {
	  var $base;
	  var $location;
	  var _$$props$to = $$props.to,
	      to = _$$props$to === void 0 ? "#" : _$$props$to;
	  var _$$props$replace = $$props.replace,
	      replace = _$$props$replace === void 0 ? false : _$$props$replace;
	  var _$$props$state = $$props.state,
	      state = _$$props$state === void 0 ? {} : _$$props$state;
	  var _$$props$getProps = $$props.getProps,
	      getProps = _$$props$getProps === void 0 ? function () {
	    return {};
	  } : _$$props$getProps;

	  var _getContext = getContext(ROUTER),
	      base = _getContext.base;

	  validate_store(base, "base");
	  component_subscribe($$self, base, function (value) {
	    return $$invalidate(12, $base = value);
	  });
	  var location = getContext(LOCATION);
	  validate_store(location, "location");
	  component_subscribe($$self, location, function (value) {
	    return $$invalidate(13, $location = value);
	  });
	  var dispatch = createEventDispatcher();
	  var href, isPartiallyCurrent, isCurrent, props;

	  function onClick(event) {
	    dispatch("click", event);

	    if (shouldNavigate(event)) {
	      event.preventDefault(); // Don't push another entry to the history stack when the user
	      // clicks on a Link to the page they are currently on.

	      var shouldReplace = $location.pathname === href || replace;
	      navigate(href, {
	        state: state,
	        replace: shouldReplace
	      });
	    }
	  }

	  var writable_props = ["to", "replace", "state", "getProps"];
	  Object.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Link> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("Link", $$slots, ['default']);

	  $$self.$set = function ($$props) {
	    if ("to" in $$props) $$invalidate(6, to = $$props.to);
	    if ("replace" in $$props) $$invalidate(7, replace = $$props.replace);
	    if ("state" in $$props) $$invalidate(8, state = $$props.state);
	    if ("getProps" in $$props) $$invalidate(9, getProps = $$props.getProps);
	    if ("$$scope" in $$props) $$invalidate(15, $$scope = $$props.$$scope);
	  };

	  $$self.$capture_state = function () {
	    return {
	      getContext: getContext,
	      createEventDispatcher: createEventDispatcher,
	      ROUTER: ROUTER,
	      LOCATION: LOCATION,
	      navigate: navigate,
	      startsWith: startsWith,
	      resolve: resolve,
	      shouldNavigate: shouldNavigate,
	      to: to,
	      replace: replace,
	      state: state,
	      getProps: getProps,
	      base: base,
	      location: location,
	      dispatch: dispatch,
	      href: href,
	      isPartiallyCurrent: isPartiallyCurrent,
	      isCurrent: isCurrent,
	      props: props,
	      onClick: onClick,
	      $base: $base,
	      $location: $location,
	      ariaCurrent: ariaCurrent
	    };
	  };

	  $$self.$inject_state = function ($$props) {
	    if ("to" in $$props) $$invalidate(6, to = $$props.to);
	    if ("replace" in $$props) $$invalidate(7, replace = $$props.replace);
	    if ("state" in $$props) $$invalidate(8, state = $$props.state);
	    if ("getProps" in $$props) $$invalidate(9, getProps = $$props.getProps);
	    if ("href" in $$props) $$invalidate(0, href = $$props.href);
	    if ("isPartiallyCurrent" in $$props) $$invalidate(10, isPartiallyCurrent = $$props.isPartiallyCurrent);
	    if ("isCurrent" in $$props) $$invalidate(11, isCurrent = $$props.isCurrent);
	    if ("props" in $$props) $$invalidate(1, props = $$props.props);
	    if ("ariaCurrent" in $$props) $$invalidate(2, ariaCurrent = $$props.ariaCurrent);
	  };

	  var ariaCurrent;

	  if ($$props && "$$inject" in $$props) {
	    $$self.$inject_state($$props.$$inject);
	  }

	  $$self.$$.update = function () {
	    if ($$self.$$.dirty &
	    /*to, $base*/
	    4160) {
	       $$invalidate(0, href = to === "/" ? $base.uri : resolve(to, $base.uri));
	    }

	    if ($$self.$$.dirty &
	    /*$location, href*/
	    8193) {
	       $$invalidate(10, isPartiallyCurrent = startsWith($location.pathname, href));
	    }

	    if ($$self.$$.dirty &
	    /*href, $location*/
	    8193) {
	       $$invalidate(11, isCurrent = href === $location.pathname);
	    }

	    if ($$self.$$.dirty &
	    /*isCurrent*/
	    2048) {
	       $$invalidate(2, ariaCurrent = isCurrent ? "page" : undefined);
	    }

	    if ($$self.$$.dirty &
	    /*getProps, $location, href, isPartiallyCurrent, isCurrent*/
	    11777) {
	       $$invalidate(1, props = getProps({
	        location: $location,
	        href: href,
	        isPartiallyCurrent: isPartiallyCurrent,
	        isCurrent: isCurrent
	      }));
	    }
	  };

	  return [href, props, ariaCurrent, base, location, onClick, to, replace, state, getProps, isPartiallyCurrent, isCurrent, $base, $location, dispatch, $$scope, $$slots];
	}

	var Link = /*#__PURE__*/function (_SvelteComponentDev) {
	  _inherits(Link, _SvelteComponentDev);

	  var _super = _createSuper$3(Link);

	  function Link(options) {
	    var _this;

	    _classCallCheck(this, Link);

	    _this = _super.call(this, options);
	    init(_assertThisInitialized(_this), options, instance$2, create_fragment$2, safe_not_equal, {
	      to: 6,
	      replace: 7,
	      state: 8,
	      getProps: 9
	    });
	    dispatch_dev("SvelteRegisterComponent", {
	      component: _assertThisInitialized(_this),
	      tagName: "Link",
	      options: options,
	      id: create_fragment$2.name
	    });
	    return _this;
	  }

	  _createClass(Link, [{
	    key: "to",
	    get: function get() {
	      throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    },
	    set: function set(value) {
	      throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    }
	  }, {
	    key: "replace",
	    get: function get() {
	      throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    },
	    set: function set(value) {
	      throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    }
	  }, {
	    key: "state",
	    get: function get() {
	      throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    },
	    set: function set(value) {
	      throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    }
	  }, {
	    key: "getProps",
	    get: function get() {
	      throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    },
	    set: function set(value) {
	      throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    }
	  }]);

	  return Link;
	}(SvelteComponentDev);

	// `SameValue` abstract operation
	// https://tc39.github.io/ecma262/#sec-samevalue
	var sameValue = Object.is || function is(x, y) {
	  // eslint-disable-next-line no-self-compare
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

	// @@search logic
	fixRegexpWellKnownSymbolLogic('search', 1, function (SEARCH, nativeSearch, maybeCallNative) {
	  return [
	    // `String.prototype.search` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.search
	    function search(regexp) {
	      var O = requireObjectCoercible(this);
	      var searcher = regexp == undefined ? undefined : regexp[SEARCH];
	      return searcher !== undefined ? searcher.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	    },
	    // `RegExp.prototype[@@search]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
	    function (regexp) {
	      var res = maybeCallNative(nativeSearch, regexp, this);
	      if (res.done) return res.value;

	      var rx = anObject(regexp);
	      var S = String(this);

	      var previousLastIndex = rx.lastIndex;
	      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
	      var result = regexpExecAbstract(rx, S);
	      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
	      return result === null ? -1 : result.index;
	    }
	  ];
	});

	// `Array.prototype.lastIndexOf` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof
	_export({ target: 'Array', proto: true, forced: arrayLastIndexOf !== [].lastIndexOf }, {
	  lastIndexOf: arrayLastIndexOf
	});

	// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
	var NON_GENERIC = !!nativePromiseConstructor && fails(function () {
	  nativePromiseConstructor.prototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
	});

	// `Promise.prototype.finally` method
	// https://tc39.github.io/ecma262/#sec-promise.prototype.finally
	_export({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
	  'finally': function (onFinally) {
	    var C = speciesConstructor(this, getBuiltIn('Promise'));
	    var isFunction = typeof onFinally == 'function';
	    return this.then(
	      isFunction ? function (x) {
	        return promiseResolve(C, onFinally()).then(function () { return x; });
	      } : onFinally,
	      isFunction ? function (e) {
	        return promiseResolve(C, onFinally()).then(function () { throw e; });
	      } : onFinally
	    );
	  }
	});

	// patch native Promise.prototype for native async functions
	if ( typeof nativePromiseConstructor == 'function' && !nativePromiseConstructor.prototype['finally']) {
	  redefine(nativePromiseConstructor.prototype, 'finally', getBuiltIn('Promise').prototype['finally']);
	}

	var TYPE;

	(function (TYPE) {
	  /**
	   * Raw text
	   */
	  TYPE[TYPE["literal"] = 0] = "literal";
	  /**
	   * Variable w/o any format, e.g `var` in `this is a {var}`
	   */

	  TYPE[TYPE["argument"] = 1] = "argument";
	  /**
	   * Variable w/ number format
	   */

	  TYPE[TYPE["number"] = 2] = "number";
	  /**
	   * Variable w/ date format
	   */

	  TYPE[TYPE["date"] = 3] = "date";
	  /**
	   * Variable w/ time format
	   */

	  TYPE[TYPE["time"] = 4] = "time";
	  /**
	   * Variable w/ select format
	   */

	  TYPE[TYPE["select"] = 5] = "select";
	  /**
	   * Variable w/ plural format
	   */

	  TYPE[TYPE["plural"] = 6] = "plural";
	  /**
	   * Only possible within plural argument.
	   * This is the `#` symbol that will be substituted with the count.
	   */

	  TYPE[TYPE["pound"] = 7] = "pound";
	})(TYPE || (TYPE = {}));
	/**
	 * Type Guards
	 */


	function isLiteralElement(el) {
	  return el.type === TYPE.literal;
	}
	function isArgumentElement(el) {
	  return el.type === TYPE.argument;
	}
	function isNumberElement(el) {
	  return el.type === TYPE.number;
	}
	function isDateElement(el) {
	  return el.type === TYPE.date;
	}
	function isTimeElement(el) {
	  return el.type === TYPE.time;
	}
	function isSelectElement(el) {
	  return el.type === TYPE.select;
	}
	function isPluralElement(el) {
	  return el.type === TYPE.plural;
	}
	function isPoundElement(el) {
	  return el.type === TYPE.pound;
	}
	function isNumberSkeleton(el) {
	  return !!(el && _typeof(el) === 'object' && el.type === 0
	  /* number */
	  );
	}
	function isDateTimeSkeleton(el) {
	  return !!(el && _typeof(el) === 'object' && el.type === 1
	  /* dateTime */
	  );
	}

	// tslint:disable:only-arrow-functions
	// tslint:disable:object-literal-shorthand
	// tslint:disable:trailing-comma
	// tslint:disable:object-literal-sort-keys
	// tslint:disable:one-variable-per-declaration
	// tslint:disable:max-line-length
	// tslint:disable:no-consecutive-blank-lines
	// tslint:disable:align
	var __extends = undefined && undefined.__extends || function () {
	  var _extendStatics = function extendStatics(d, b) {
	    _extendStatics = Object.setPrototypeOf || {
	      __proto__: []
	    } instanceof Array && function (d, b) {
	      d.__proto__ = b;
	    } || function (d, b) {
	      for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	      }
	    };

	    return _extendStatics(d, b);
	  };

	  return function (d, b) {
	    _extendStatics(d, b);

	    function __() {
	      this.constructor = d;
	    }

	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	  };
	}();

	var __assign = undefined && undefined.__assign || function () {
	  __assign = Object.assign || function (t) {
	    for (var s, i = 1, n = arguments.length; i < n; i++) {
	      s = arguments[i];

	      for (var p in s) {
	        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	      }
	    }

	    return t;
	  };

	  return __assign.apply(this, arguments);
	}; // Generated by PEG.js v. 0.10.0 (ts-pegjs plugin v. 0.2.6 )

	var SyntaxError =
	/** @class */
	function (_super) {
	  __extends(SyntaxError, _super);

	  function SyntaxError(message, expected, found, location) {
	    var _this = _super.call(this) || this;

	    _this.message = message;
	    _this.expected = expected;
	    _this.found = found;
	    _this.location = location;
	    _this.name = "SyntaxError";

	    if (typeof Error.captureStackTrace === "function") {
	      Error.captureStackTrace(_this, SyntaxError);
	    }

	    return _this;
	  }

	  SyntaxError.buildMessage = function (expected, found) {
	    function hex(ch) {
	      return ch.charCodeAt(0).toString(16).toUpperCase();
	    }

	    function literalEscape(s) {
	      return s.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function (ch) {
	        return "\\x0" + hex(ch);
	      }).replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) {
	        return "\\x" + hex(ch);
	      });
	    }

	    function classEscape(s) {
	      return s.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function (ch) {
	        return "\\x0" + hex(ch);
	      }).replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) {
	        return "\\x" + hex(ch);
	      });
	    }

	    function describeExpectation(expectation) {
	      switch (expectation.type) {
	        case "literal":
	          return "\"" + literalEscape(expectation.text) + "\"";

	        case "class":
	          var escapedParts = expectation.parts.map(function (part) {
	            return Array.isArray(part) ? classEscape(part[0]) + "-" + classEscape(part[1]) : classEscape(part);
	          });
	          return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";

	        case "any":
	          return "any character";

	        case "end":
	          return "end of input";

	        case "other":
	          return expectation.description;
	      }
	    }

	    function describeExpected(expected1) {
	      var descriptions = expected1.map(describeExpectation);
	      var i;
	      var j;
	      descriptions.sort();

	      if (descriptions.length > 0) {
	        for (i = 1, j = 1; i < descriptions.length; i++) {
	          if (descriptions[i - 1] !== descriptions[i]) {
	            descriptions[j] = descriptions[i];
	            j++;
	          }
	        }

	        descriptions.length = j;
	      }

	      switch (descriptions.length) {
	        case 1:
	          return descriptions[0];

	        case 2:
	          return descriptions[0] + " or " + descriptions[1];

	        default:
	          return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
	      }
	    }

	    function describeFound(found1) {
	      return found1 ? "\"" + literalEscape(found1) + "\"" : "end of input";
	    }

	    return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
	  };

	  return SyntaxError;
	}(Error);

	function peg$parse(input, options) {
	  options = options !== undefined ? options : {};
	  var peg$FAILED = {};
	  var peg$startRuleFunctions = {
	    start: peg$parsestart
	  };
	  var peg$startRuleFunction = peg$parsestart;

	  var peg$c0 = function peg$c0(parts) {
	    return parts.join('');
	  };

	  var peg$c1 = function peg$c1(messageText) {
	    return __assign({
	      type: TYPE.literal,
	      value: messageText
	    }, insertLocation());
	  };

	  var peg$c2 = "#";
	  var peg$c3 = peg$literalExpectation("#", false);

	  var peg$c4 = function peg$c4() {
	    return __assign({
	      type: TYPE.pound
	    }, insertLocation());
	  };

	  var peg$c5 = peg$otherExpectation("argumentElement");
	  var peg$c6 = "{";
	  var peg$c7 = peg$literalExpectation("{", false);
	  var peg$c8 = "}";
	  var peg$c9 = peg$literalExpectation("}", false);

	  var peg$c10 = function peg$c10(value) {
	    return __assign({
	      type: TYPE.argument,
	      value: value
	    }, insertLocation());
	  };

	  var peg$c11 = peg$otherExpectation("numberSkeletonId");
	  var peg$c12 = /^['\/{}]/;
	  var peg$c13 = peg$classExpectation(["'", "/", "{", "}"], false, false);
	  var peg$c14 = peg$anyExpectation();
	  var peg$c15 = peg$otherExpectation("numberSkeletonTokenOption");
	  var peg$c16 = "/";
	  var peg$c17 = peg$literalExpectation("/", false);

	  var peg$c18 = function peg$c18(option) {
	    return option;
	  };

	  var peg$c19 = peg$otherExpectation("numberSkeletonToken");

	  var peg$c20 = function peg$c20(stem, options) {
	    return {
	      stem: stem,
	      options: options
	    };
	  };

	  var peg$c21 = function peg$c21(tokens) {
	    return __assign({
	      type: 0
	      /* number */
	      ,
	      tokens: tokens
	    }, insertLocation());
	  };

	  var peg$c22 = "::";
	  var peg$c23 = peg$literalExpectation("::", false);

	  var peg$c24 = function peg$c24(skeleton) {
	    return skeleton;
	  };

	  var peg$c25 = function peg$c25() {
	    messageCtx.push('numberArgStyle');
	    return true;
	  };

	  var peg$c26 = function peg$c26(style) {
	    messageCtx.pop();
	    return style.replace(/\s*$/, '');
	  };

	  var peg$c27 = ",";
	  var peg$c28 = peg$literalExpectation(",", false);
	  var peg$c29 = "number";
	  var peg$c30 = peg$literalExpectation("number", false);

	  var peg$c31 = function peg$c31(value, type, style) {
	    return __assign({
	      type: type === 'number' ? TYPE.number : type === 'date' ? TYPE.date : TYPE.time,
	      style: style && style[2],
	      value: value
	    }, insertLocation());
	  };

	  var peg$c32 = "'";
	  var peg$c33 = peg$literalExpectation("'", false);
	  var peg$c34 = /^[^']/;
	  var peg$c35 = peg$classExpectation(["'"], true, false);
	  var peg$c36 = /^[^a-zA-Z'{}]/;
	  var peg$c37 = peg$classExpectation([["a", "z"], ["A", "Z"], "'", "{", "}"], true, false);
	  var peg$c38 = /^[a-zA-Z]/;
	  var peg$c39 = peg$classExpectation([["a", "z"], ["A", "Z"]], false, false);

	  var peg$c40 = function peg$c40(pattern) {
	    return __assign({
	      type: 1
	      /* dateTime */
	      ,
	      pattern: pattern
	    }, insertLocation());
	  };

	  var peg$c41 = function peg$c41() {
	    messageCtx.push('dateOrTimeArgStyle');
	    return true;
	  };

	  var peg$c42 = "date";
	  var peg$c43 = peg$literalExpectation("date", false);
	  var peg$c44 = "time";
	  var peg$c45 = peg$literalExpectation("time", false);
	  var peg$c46 = "plural";
	  var peg$c47 = peg$literalExpectation("plural", false);
	  var peg$c48 = "selectordinal";
	  var peg$c49 = peg$literalExpectation("selectordinal", false);
	  var peg$c50 = "offset:";
	  var peg$c51 = peg$literalExpectation("offset:", false);

	  var peg$c52 = function peg$c52(value, pluralType, offset, options) {
	    return __assign({
	      type: TYPE.plural,
	      pluralType: pluralType === 'plural' ? 'cardinal' : 'ordinal',
	      value: value,
	      offset: offset ? offset[2] : 0,
	      options: options.reduce(function (all, _a) {
	        var id = _a.id,
	            value = _a.value,
	            optionLocation = _a.location;

	        if (id in all) {
	          error("Duplicate option \"" + id + "\" in plural element: \"" + text() + "\"", location());
	        }

	        all[id] = {
	          value: value,
	          location: optionLocation
	        };
	        return all;
	      }, {})
	    }, insertLocation());
	  };

	  var peg$c53 = "select";
	  var peg$c54 = peg$literalExpectation("select", false);

	  var peg$c55 = function peg$c55(value, options) {
	    return __assign({
	      type: TYPE.select,
	      value: value,
	      options: options.reduce(function (all, _a) {
	        var id = _a.id,
	            value = _a.value,
	            optionLocation = _a.location;

	        if (id in all) {
	          error("Duplicate option \"" + id + "\" in select element: \"" + text() + "\"", location());
	        }

	        all[id] = {
	          value: value,
	          location: optionLocation
	        };
	        return all;
	      }, {})
	    }, insertLocation());
	  };

	  var peg$c56 = "=";
	  var peg$c57 = peg$literalExpectation("=", false);

	  var peg$c58 = function peg$c58(id) {
	    messageCtx.push('select');
	    return true;
	  };

	  var peg$c59 = function peg$c59(id, value) {
	    messageCtx.pop();
	    return __assign({
	      id: id,
	      value: value
	    }, insertLocation());
	  };

	  var peg$c60 = function peg$c60(id) {
	    messageCtx.push('plural');
	    return true;
	  };

	  var peg$c61 = function peg$c61(id, value) {
	    messageCtx.pop();
	    return __assign({
	      id: id,
	      value: value
	    }, insertLocation());
	  };

	  var peg$c62 = peg$otherExpectation("whitespace");
	  var peg$c63 = /^[\t-\r \x85\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;
	  var peg$c64 = peg$classExpectation([["\t", "\r"], " ", "\x85", "\xA0", "\u1680", ["\u2000", "\u200A"], "\u2028", "\u2029", "\u202F", "\u205F", "\u3000"], false, false);
	  var peg$c65 = peg$otherExpectation("syntax pattern");
	  var peg$c66 = /^[!-\/:-@[-\^`{-~\xA1-\xA7\xA9\xAB\xAC\xAE\xB0\xB1\xB6\xBB\xBF\xD7\xF7\u2010-\u2027\u2030-\u203E\u2041-\u2053\u2055-\u205E\u2190-\u245F\u2500-\u2775\u2794-\u2BFF\u2E00-\u2E7F\u3001-\u3003\u3008-\u3020\u3030\uFD3E\uFD3F\uFE45\uFE46]/;
	  var peg$c67 = peg$classExpectation([["!", "/"], [":", "@"], ["[", "^"], "`", ["{", "~"], ["\xA1", "\xA7"], "\xA9", "\xAB", "\xAC", "\xAE", "\xB0", "\xB1", "\xB6", "\xBB", "\xBF", "\xD7", "\xF7", ["\u2010", "\u2027"], ["\u2030", "\u203E"], ["\u2041", "\u2053"], ["\u2055", "\u205E"], ["\u2190", "\u245F"], ["\u2500", "\u2775"], ["\u2794", "\u2BFF"], ["\u2E00", "\u2E7F"], ["\u3001", "\u3003"], ["\u3008", "\u3020"], "\u3030", "\uFD3E", "\uFD3F", "\uFE45", "\uFE46"], false, false);
	  var peg$c68 = peg$otherExpectation("optional whitespace");
	  var peg$c69 = peg$otherExpectation("number");
	  var peg$c70 = "-";
	  var peg$c71 = peg$literalExpectation("-", false);

	  var peg$c72 = function peg$c72(negative, num) {
	    return num ? negative ? -num : num : 0;
	  };
	  var peg$c74 = peg$otherExpectation("double apostrophes");
	  var peg$c75 = "''";
	  var peg$c76 = peg$literalExpectation("''", false);

	  var peg$c77 = function peg$c77() {
	    return "'";
	  };

	  var peg$c78 = function peg$c78(escapedChar, quotedChars) {
	    return escapedChar + quotedChars.replace("''", "'");
	  };

	  var peg$c79 = function peg$c79(x) {
	    return x !== '{' && !(isInPluralOption() && x === '#') && !(isNestedMessageText() && x === '}');
	  };

	  var peg$c80 = "\n";
	  var peg$c81 = peg$literalExpectation("\n", false);

	  var peg$c82 = function peg$c82(x) {
	    return x === '{' || x === '}' || isInPluralOption() && x === '#';
	  };

	  var peg$c83 = peg$otherExpectation("argNameOrNumber");
	  var peg$c84 = peg$otherExpectation("argNumber");
	  var peg$c85 = "0";
	  var peg$c86 = peg$literalExpectation("0", false);

	  var peg$c87 = function peg$c87() {
	    return 0;
	  };

	  var peg$c88 = /^[1-9]/;
	  var peg$c89 = peg$classExpectation([["1", "9"]], false, false);
	  var peg$c90 = /^[0-9]/;
	  var peg$c91 = peg$classExpectation([["0", "9"]], false, false);

	  var peg$c92 = function peg$c92(digits) {
	    return parseInt(digits.join(''), 10);
	  };

	  var peg$c93 = peg$otherExpectation("argName");
	  var peg$currPos = 0;
	  var peg$savedPos = 0;
	  var peg$posDetailsCache = [{
	    line: 1,
	    column: 1
	  }];
	  var peg$maxFailPos = 0;
	  var peg$maxFailExpected = [];
	  var peg$silentFails = 0;
	  var peg$result;

	  if (options.startRule !== undefined) {
	    if (!(options.startRule in peg$startRuleFunctions)) {
	      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
	    }

	    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
	  }

	  function text() {
	    return input.substring(peg$savedPos, peg$currPos);
	  }

	  function location() {
	    return peg$computeLocation(peg$savedPos, peg$currPos);
	  }

	  function error(message, location1) {
	    location1 = location1 !== undefined ? location1 : peg$computeLocation(peg$savedPos, peg$currPos);
	    throw peg$buildSimpleError(message, location1);
	  }

	  function peg$literalExpectation(text1, ignoreCase) {
	    return {
	      type: "literal",
	      text: text1,
	      ignoreCase: ignoreCase
	    };
	  }

	  function peg$classExpectation(parts, inverted, ignoreCase) {
	    return {
	      type: "class",
	      parts: parts,
	      inverted: inverted,
	      ignoreCase: ignoreCase
	    };
	  }

	  function peg$anyExpectation() {
	    return {
	      type: "any"
	    };
	  }

	  function peg$endExpectation() {
	    return {
	      type: "end"
	    };
	  }

	  function peg$otherExpectation(description) {
	    return {
	      type: "other",
	      description: description
	    };
	  }

	  function peg$computePosDetails(pos) {
	    var details = peg$posDetailsCache[pos];
	    var p;

	    if (details) {
	      return details;
	    } else {
	      p = pos - 1;

	      while (!peg$posDetailsCache[p]) {
	        p--;
	      }

	      details = peg$posDetailsCache[p];
	      details = {
	        line: details.line,
	        column: details.column
	      };

	      while (p < pos) {
	        if (input.charCodeAt(p) === 10) {
	          details.line++;
	          details.column = 1;
	        } else {
	          details.column++;
	        }

	        p++;
	      }

	      peg$posDetailsCache[pos] = details;
	      return details;
	    }
	  }

	  function peg$computeLocation(startPos, endPos) {
	    var startPosDetails = peg$computePosDetails(startPos);
	    var endPosDetails = peg$computePosDetails(endPos);
	    return {
	      start: {
	        offset: startPos,
	        line: startPosDetails.line,
	        column: startPosDetails.column
	      },
	      end: {
	        offset: endPos,
	        line: endPosDetails.line,
	        column: endPosDetails.column
	      }
	    };
	  }

	  function peg$fail(expected1) {
	    if (peg$currPos < peg$maxFailPos) {
	      return;
	    }

	    if (peg$currPos > peg$maxFailPos) {
	      peg$maxFailPos = peg$currPos;
	      peg$maxFailExpected = [];
	    }

	    peg$maxFailExpected.push(expected1);
	  }

	  function peg$buildSimpleError(message, location1) {
	    return new SyntaxError(message, [], "", location1);
	  }

	  function peg$buildStructuredError(expected1, found, location1) {
	    return new SyntaxError(SyntaxError.buildMessage(expected1, found), expected1, found, location1);
	  }

	  function peg$parsestart() {
	    var s0;
	    s0 = peg$parsemessage();
	    return s0;
	  }

	  function peg$parsemessage() {
	    var s0, s1;
	    s0 = [];
	    s1 = peg$parsemessageElement();

	    while (s1 !== peg$FAILED) {
	      s0.push(s1);
	      s1 = peg$parsemessageElement();
	    }

	    return s0;
	  }

	  function peg$parsemessageElement() {
	    var s0;
	    s0 = peg$parseliteralElement();

	    if (s0 === peg$FAILED) {
	      s0 = peg$parseargumentElement();

	      if (s0 === peg$FAILED) {
	        s0 = peg$parsesimpleFormatElement();

	        if (s0 === peg$FAILED) {
	          s0 = peg$parsepluralElement();

	          if (s0 === peg$FAILED) {
	            s0 = peg$parseselectElement();

	            if (s0 === peg$FAILED) {
	              s0 = peg$parsepoundElement();
	            }
	          }
	        }
	      }
	    }

	    return s0;
	  }

	  function peg$parsemessageText() {
	    var s0, s1, s2;
	    s0 = peg$currPos;
	    s1 = [];
	    s2 = peg$parsedoubleApostrophes();

	    if (s2 === peg$FAILED) {
	      s2 = peg$parsequotedString();

	      if (s2 === peg$FAILED) {
	        s2 = peg$parseunquotedString();
	      }
	    }

	    if (s2 !== peg$FAILED) {
	      while (s2 !== peg$FAILED) {
	        s1.push(s2);
	        s2 = peg$parsedoubleApostrophes();

	        if (s2 === peg$FAILED) {
	          s2 = peg$parsequotedString();

	          if (s2 === peg$FAILED) {
	            s2 = peg$parseunquotedString();
	          }
	        }
	      }
	    } else {
	      s1 = peg$FAILED;
	    }

	    if (s1 !== peg$FAILED) {
	      peg$savedPos = s0;
	      s1 = peg$c0(s1);
	    }

	    s0 = s1;
	    return s0;
	  }

	  function peg$parseliteralElement() {
	    var s0, s1;
	    s0 = peg$currPos;
	    s1 = peg$parsemessageText();

	    if (s1 !== peg$FAILED) {
	      peg$savedPos = s0;
	      s1 = peg$c1(s1);
	    }

	    s0 = s1;
	    return s0;
	  }

	  function peg$parsepoundElement() {
	    var s0, s1;
	    s0 = peg$currPos;

	    if (input.charCodeAt(peg$currPos) === 35) {
	      s1 = peg$c2;
	      peg$currPos++;
	    } else {
	      s1 = peg$FAILED;

	      if (peg$silentFails === 0) {
	        peg$fail(peg$c3);
	      }
	    }

	    if (s1 !== peg$FAILED) {
	      peg$savedPos = s0;
	      s1 = peg$c4();
	    }

	    s0 = s1;
	    return s0;
	  }

	  function peg$parseargumentElement() {
	    var s0, s1, s2, s3, s4, s5;
	    peg$silentFails++;
	    s0 = peg$currPos;

	    if (input.charCodeAt(peg$currPos) === 123) {
	      s1 = peg$c6;
	      peg$currPos++;
	    } else {
	      s1 = peg$FAILED;

	      if (peg$silentFails === 0) {
	        peg$fail(peg$c7);
	      }
	    }

	    if (s1 !== peg$FAILED) {
	      s2 = peg$parse_();

	      if (s2 !== peg$FAILED) {
	        s3 = peg$parseargNameOrNumber();

	        if (s3 !== peg$FAILED) {
	          s4 = peg$parse_();

	          if (s4 !== peg$FAILED) {
	            if (input.charCodeAt(peg$currPos) === 125) {
	              s5 = peg$c8;
	              peg$currPos++;
	            } else {
	              s5 = peg$FAILED;

	              if (peg$silentFails === 0) {
	                peg$fail(peg$c9);
	              }
	            }

	            if (s5 !== peg$FAILED) {
	              peg$savedPos = s0;
	              s1 = peg$c10(s3);
	              s0 = s1;
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }
	        } else {
	          peg$currPos = s0;
	          s0 = peg$FAILED;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$FAILED;
	      }
	    } else {
	      peg$currPos = s0;
	      s0 = peg$FAILED;
	    }

	    peg$silentFails--;

	    if (s0 === peg$FAILED) {
	      s1 = peg$FAILED;

	      if (peg$silentFails === 0) {
	        peg$fail(peg$c5);
	      }
	    }

	    return s0;
	  }

	  function peg$parsenumberSkeletonId() {
	    var s0, s1, s2, s3, s4;
	    peg$silentFails++;
	    s0 = peg$currPos;
	    s1 = [];
	    s2 = peg$currPos;
	    s3 = peg$currPos;
	    peg$silentFails++;
	    s4 = peg$parsewhiteSpace();

	    if (s4 === peg$FAILED) {
	      if (peg$c12.test(input.charAt(peg$currPos))) {
	        s4 = input.charAt(peg$currPos);
	        peg$currPos++;
	      } else {
	        s4 = peg$FAILED;

	        if (peg$silentFails === 0) {
	          peg$fail(peg$c13);
	        }
	      }
	    }

	    peg$silentFails--;

	    if (s4 === peg$FAILED) {
	      s3 = undefined;
	    } else {
	      peg$currPos = s3;
	      s3 = peg$FAILED;
	    }

	    if (s3 !== peg$FAILED) {
	      if (input.length > peg$currPos) {
	        s4 = input.charAt(peg$currPos);
	        peg$currPos++;
	      } else {
	        s4 = peg$FAILED;

	        if (peg$silentFails === 0) {
	          peg$fail(peg$c14);
	        }
	      }

	      if (s4 !== peg$FAILED) {
	        s3 = [s3, s4];
	        s2 = s3;
	      } else {
	        peg$currPos = s2;
	        s2 = peg$FAILED;
	      }
	    } else {
	      peg$currPos = s2;
	      s2 = peg$FAILED;
	    }

	    if (s2 !== peg$FAILED) {
	      while (s2 !== peg$FAILED) {
	        s1.push(s2);
	        s2 = peg$currPos;
	        s3 = peg$currPos;
	        peg$silentFails++;
	        s4 = peg$parsewhiteSpace();

	        if (s4 === peg$FAILED) {
	          if (peg$c12.test(input.charAt(peg$currPos))) {
	            s4 = input.charAt(peg$currPos);
	            peg$currPos++;
	          } else {
	            s4 = peg$FAILED;

	            if (peg$silentFails === 0) {
	              peg$fail(peg$c13);
	            }
	          }
	        }

	        peg$silentFails--;

	        if (s4 === peg$FAILED) {
	          s3 = undefined;
	        } else {
	          peg$currPos = s3;
	          s3 = peg$FAILED;
	        }

	        if (s3 !== peg$FAILED) {
	          if (input.length > peg$currPos) {
	            s4 = input.charAt(peg$currPos);
	            peg$currPos++;
	          } else {
	            s4 = peg$FAILED;

	            if (peg$silentFails === 0) {
	              peg$fail(peg$c14);
	            }
	          }

	          if (s4 !== peg$FAILED) {
	            s3 = [s3, s4];
	            s2 = s3;
	          } else {
	            peg$currPos = s2;
	            s2 = peg$FAILED;
	          }
	        } else {
	          peg$currPos = s2;
	          s2 = peg$FAILED;
	        }
	      }
	    } else {
	      s1 = peg$FAILED;
	    }

	    if (s1 !== peg$FAILED) {
	      s0 = input.substring(s0, peg$currPos);
	    } else {
	      s0 = s1;
	    }

	    peg$silentFails--;

	    if (s0 === peg$FAILED) {
	      s1 = peg$FAILED;

	      if (peg$silentFails === 0) {
	        peg$fail(peg$c11);
	      }
	    }

	    return s0;
	  }

	  function peg$parsenumberSkeletonTokenOption() {
	    var s0, s1, s2;
	    peg$silentFails++;
	    s0 = peg$currPos;

	    if (input.charCodeAt(peg$currPos) === 47) {
	      s1 = peg$c16;
	      peg$currPos++;
	    } else {
	      s1 = peg$FAILED;

	      if (peg$silentFails === 0) {
	        peg$fail(peg$c17);
	      }
	    }

	    if (s1 !== peg$FAILED) {
	      s2 = peg$parsenumberSkeletonId();

	      if (s2 !== peg$FAILED) {
	        peg$savedPos = s0;
	        s1 = peg$c18(s2);
	        s0 = s1;
	      } else {
	        peg$currPos = s0;
	        s0 = peg$FAILED;
	      }
	    } else {
	      peg$currPos = s0;
	      s0 = peg$FAILED;
	    }

	    peg$silentFails--;

	    if (s0 === peg$FAILED) {
	      s1 = peg$FAILED;

	      if (peg$silentFails === 0) {
	        peg$fail(peg$c15);
	      }
	    }

	    return s0;
	  }

	  function peg$parsenumberSkeletonToken() {
	    var s0, s1, s2, s3, s4;
	    peg$silentFails++;
	    s0 = peg$currPos;
	    s1 = peg$parse_();

	    if (s1 !== peg$FAILED) {
	      s2 = peg$parsenumberSkeletonId();

	      if (s2 !== peg$FAILED) {
	        s3 = [];
	        s4 = peg$parsenumberSkeletonTokenOption();

	        while (s4 !== peg$FAILED) {
	          s3.push(s4);
	          s4 = peg$parsenumberSkeletonTokenOption();
	        }

	        if (s3 !== peg$FAILED) {
	          peg$savedPos = s0;
	          s1 = peg$c20(s2, s3);
	          s0 = s1;
	        } else {
	          peg$currPos = s0;
	          s0 = peg$FAILED;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$FAILED;
	      }
	    } else {
	      peg$currPos = s0;
	      s0 = peg$FAILED;
	    }

	    peg$silentFails--;

	    if (s0 === peg$FAILED) {
	      s1 = peg$FAILED;

	      if (peg$silentFails === 0) {
	        peg$fail(peg$c19);
	      }
	    }

	    return s0;
	  }

	  function peg$parsenumberSkeleton() {
	    var s0, s1, s2;
	    s0 = peg$currPos;
	    s1 = [];
	    s2 = peg$parsenumberSkeletonToken();

	    if (s2 !== peg$FAILED) {
	      while (s2 !== peg$FAILED) {
	        s1.push(s2);
	        s2 = peg$parsenumberSkeletonToken();
	      }
	    } else {
	      s1 = peg$FAILED;
	    }

	    if (s1 !== peg$FAILED) {
	      peg$savedPos = s0;
	      s1 = peg$c21(s1);
	    }

	    s0 = s1;
	    return s0;
	  }

	  function peg$parsenumberArgStyle() {
	    var s0, s1, s2;
	    s0 = peg$currPos;

	    if (input.substr(peg$currPos, 2) === peg$c22) {
	      s1 = peg$c22;
	      peg$currPos += 2;
	    } else {
	      s1 = peg$FAILED;

	      if (peg$silentFails === 0) {
	        peg$fail(peg$c23);
	      }
	    }

	    if (s1 !== peg$FAILED) {
	      s2 = peg$parsenumberSkeleton();

	      if (s2 !== peg$FAILED) {
	        peg$savedPos = s0;
	        s1 = peg$c24(s2);
	        s0 = s1;
	      } else {
	        peg$currPos = s0;
	        s0 = peg$FAILED;
	      }
	    } else {
	      peg$currPos = s0;
	      s0 = peg$FAILED;
	    }

	    if (s0 === peg$FAILED) {
	      s0 = peg$currPos;
	      peg$savedPos = peg$currPos;
	      s1 = peg$c25();

	      if (s1) {
	        s1 = undefined;
	      } else {
	        s1 = peg$FAILED;
	      }

	      if (s1 !== peg$FAILED) {
	        s2 = peg$parsemessageText();

	        if (s2 !== peg$FAILED) {
	          peg$savedPos = s0;
	          s1 = peg$c26(s2);
	          s0 = s1;
	        } else {
	          peg$currPos = s0;
	          s0 = peg$FAILED;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$FAILED;
	      }
	    }

	    return s0;
	  }

	  function peg$parsenumberFormatElement() {
	    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;
	    s0 = peg$currPos;

	    if (input.charCodeAt(peg$currPos) === 123) {
	      s1 = peg$c6;
	      peg$currPos++;
	    } else {
	      s1 = peg$FAILED;

	      if (peg$silentFails === 0) {
	        peg$fail(peg$c7);
	      }
	    }

	    if (s1 !== peg$FAILED) {
	      s2 = peg$parse_();

	      if (s2 !== peg$FAILED) {
	        s3 = peg$parseargNameOrNumber();

	        if (s3 !== peg$FAILED) {
	          s4 = peg$parse_();

	          if (s4 !== peg$FAILED) {
	            if (input.charCodeAt(peg$currPos) === 44) {
	              s5 = peg$c27;
	              peg$currPos++;
	            } else {
	              s5 = peg$FAILED;

	              if (peg$silentFails === 0) {
	                peg$fail(peg$c28);
	              }
	            }

	            if (s5 !== peg$FAILED) {
	              s6 = peg$parse_();

	              if (s6 !== peg$FAILED) {
	                if (input.substr(peg$currPos, 6) === peg$c29) {
	                  s7 = peg$c29;
	                  peg$currPos += 6;
	                } else {
	                  s7 = peg$FAILED;

	                  if (peg$silentFails === 0) {
	                    peg$fail(peg$c30);
	                  }
	                }

	                if (s7 !== peg$FAILED) {
	                  s8 = peg$parse_();

	                  if (s8 !== peg$FAILED) {
	                    s9 = peg$currPos;

	                    if (input.charCodeAt(peg$currPos) === 44) {
	                      s10 = peg$c27;
	                      peg$currPos++;
	                    } else {
	                      s10 = peg$FAILED;

	                      if (peg$silentFails === 0) {
	                        peg$fail(peg$c28);
	                      }
	                    }

	                    if (s10 !== peg$FAILED) {
	                      s11 = peg$parse_();

	                      if (s11 !== peg$FAILED) {
	                        s12 = peg$parsenumberArgStyle();

	                        if (s12 !== peg$FAILED) {
	                          s10 = [s10, s11, s12];
	                          s9 = s10;
	                        } else {
	                          peg$currPos = s9;
	                          s9 = peg$FAILED;
	                        }
	                      } else {
	                        peg$currPos = s9;
	                        s9 = peg$FAILED;
	                      }
	                    } else {
	                      peg$currPos = s9;
	                      s9 = peg$FAILED;
	                    }

	                    if (s9 === peg$FAILED) {
	                      s9 = null;
	                    }

	                    if (s9 !== peg$FAILED) {
	                      s10 = peg$parse_();

	                      if (s10 !== peg$FAILED) {
	                        if (input.charCodeAt(peg$currPos) === 125) {
	                          s11 = peg$c8;
	                          peg$currPos++;
	                        } else {
	                          s11 = peg$FAILED;

	                          if (peg$silentFails === 0) {
	                            peg$fail(peg$c9);
	                          }
	                        }

	                        if (s11 !== peg$FAILED) {
	                          peg$savedPos = s0;
	                          s1 = peg$c31(s3, s7, s9);
	                          s0 = s1;
	                        } else {
	                          peg$currPos = s0;
	                          s0 = peg$FAILED;
	                        }
	                      } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                      }
	                    } else {
	                      peg$currPos = s0;
	                      s0 = peg$FAILED;
	                    }
	                  } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                  }
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }
	        } else {
	          peg$currPos = s0;
	          s0 = peg$FAILED;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$FAILED;
	      }
	    } else {
	      peg$currPos = s0;
	      s0 = peg$FAILED;
	    }

	    return s0;
	  }

	  function peg$parsedateTimeSkeletonLiteral() {
	    var s0, s1, s2, s3;
	    s0 = peg$currPos;

	    if (input.charCodeAt(peg$currPos) === 39) {
	      s1 = peg$c32;
	      peg$currPos++;
	    } else {
	      s1 = peg$FAILED;

	      if (peg$silentFails === 0) {
	        peg$fail(peg$c33);
	      }
	    }

	    if (s1 !== peg$FAILED) {
	      s2 = [];
	      s3 = peg$parsedoubleApostrophes();

	      if (s3 === peg$FAILED) {
	        if (peg$c34.test(input.charAt(peg$currPos))) {
	          s3 = input.charAt(peg$currPos);
	          peg$currPos++;
	        } else {
	          s3 = peg$FAILED;

	          if (peg$silentFails === 0) {
	            peg$fail(peg$c35);
	          }
	        }
	      }

	      if (s3 !== peg$FAILED) {
	        while (s3 !== peg$FAILED) {
	          s2.push(s3);
	          s3 = peg$parsedoubleApostrophes();

	          if (s3 === peg$FAILED) {
	            if (peg$c34.test(input.charAt(peg$currPos))) {
	              s3 = input.charAt(peg$currPos);
	              peg$currPos++;
	            } else {
	              s3 = peg$FAILED;

	              if (peg$silentFails === 0) {
	                peg$fail(peg$c35);
	              }
	            }
	          }
	        }
	      } else {
	        s2 = peg$FAILED;
	      }

	      if (s2 !== peg$FAILED) {
	        if (input.charCodeAt(peg$currPos) === 39) {
	          s3 = peg$c32;
	          peg$currPos++;
	        } else {
	          s3 = peg$FAILED;

	          if (peg$silentFails === 0) {
	            peg$fail(peg$c33);
	          }
	        }

	        if (s3 !== peg$FAILED) {
	          s1 = [s1, s2, s3];
	          s0 = s1;
	        } else {
	          peg$currPos = s0;
	          s0 = peg$FAILED;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$FAILED;
	      }
	    } else {
	      peg$currPos = s0;
	      s0 = peg$FAILED;
	    }

	    if (s0 === peg$FAILED) {
	      s0 = [];
	      s1 = peg$parsedoubleApostrophes();

	      if (s1 === peg$FAILED) {
	        if (peg$c36.test(input.charAt(peg$currPos))) {
	          s1 = input.charAt(peg$currPos);
	          peg$currPos++;
	        } else {
	          s1 = peg$FAILED;

	          if (peg$silentFails === 0) {
	            peg$fail(peg$c37);
	          }
	        }
	      }

	      if (s1 !== peg$FAILED) {
	        while (s1 !== peg$FAILED) {
	          s0.push(s1);
	          s1 = peg$parsedoubleApostrophes();

	          if (s1 === peg$FAILED) {
	            if (peg$c36.test(input.charAt(peg$currPos))) {
	              s1 = input.charAt(peg$currPos);
	              peg$currPos++;
	            } else {
	              s1 = peg$FAILED;

	              if (peg$silentFails === 0) {
	                peg$fail(peg$c37);
	              }
	            }
	          }
	        }
	      } else {
	        s0 = peg$FAILED;
	      }
	    }

	    return s0;
	  }

	  function peg$parsedateTimeSkeletonPattern() {
	    var s0, s1;
	    s0 = [];

	    if (peg$c38.test(input.charAt(peg$currPos))) {
	      s1 = input.charAt(peg$currPos);
	      peg$currPos++;
	    } else {
	      s1 = peg$FAILED;

	      if (peg$silentFails === 0) {
	        peg$fail(peg$c39);
	      }
	    }

	    if (s1 !== peg$FAILED) {
	      while (s1 !== peg$FAILED) {
	        s0.push(s1);

	        if (peg$c38.test(input.charAt(peg$currPos))) {
	          s1 = input.charAt(peg$currPos);
	          peg$currPos++;
	        } else {
	          s1 = peg$FAILED;

	          if (peg$silentFails === 0) {
	            peg$fail(peg$c39);
	          }
	        }
	      }
	    } else {
	      s0 = peg$FAILED;
	    }

	    return s0;
	  }

	  function peg$parsedateTimeSkeleton() {
	    var s0, s1, s2, s3;
	    s0 = peg$currPos;
	    s1 = peg$currPos;
	    s2 = [];
	    s3 = peg$parsedateTimeSkeletonLiteral();

	    if (s3 === peg$FAILED) {
	      s3 = peg$parsedateTimeSkeletonPattern();
	    }

	    if (s3 !== peg$FAILED) {
	      while (s3 !== peg$FAILED) {
	        s2.push(s3);
	        s3 = peg$parsedateTimeSkeletonLiteral();

	        if (s3 === peg$FAILED) {
	          s3 = peg$parsedateTimeSkeletonPattern();
	        }
	      }
	    } else {
	      s2 = peg$FAILED;
	    }

	    if (s2 !== peg$FAILED) {
	      s1 = input.substring(s1, peg$currPos);
	    } else {
	      s1 = s2;
	    }

	    if (s1 !== peg$FAILED) {
	      peg$savedPos = s0;
	      s1 = peg$c40(s1);
	    }

	    s0 = s1;
	    return s0;
	  }

	  function peg$parsedateOrTimeArgStyle() {
	    var s0, s1, s2;
	    s0 = peg$currPos;

	    if (input.substr(peg$currPos, 2) === peg$c22) {
	      s1 = peg$c22;
	      peg$currPos += 2;
	    } else {
	      s1 = peg$FAILED;

	      if (peg$silentFails === 0) {
	        peg$fail(peg$c23);
	      }
	    }

	    if (s1 !== peg$FAILED) {
	      s2 = peg$parsedateTimeSkeleton();

	      if (s2 !== peg$FAILED) {
	        peg$savedPos = s0;
	        s1 = peg$c24(s2);
	        s0 = s1;
	      } else {
	        peg$currPos = s0;
	        s0 = peg$FAILED;
	      }
	    } else {
	      peg$currPos = s0;
	      s0 = peg$FAILED;
	    }

	    if (s0 === peg$FAILED) {
	      s0 = peg$currPos;
	      peg$savedPos = peg$currPos;
	      s1 = peg$c41();

	      if (s1) {
	        s1 = undefined;
	      } else {
	        s1 = peg$FAILED;
	      }

	      if (s1 !== peg$FAILED) {
	        s2 = peg$parsemessageText();

	        if (s2 !== peg$FAILED) {
	          peg$savedPos = s0;
	          s1 = peg$c26(s2);
	          s0 = s1;
	        } else {
	          peg$currPos = s0;
	          s0 = peg$FAILED;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$FAILED;
	      }
	    }

	    return s0;
	  }

	  function peg$parsedateOrTimeFormatElement() {
	    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;
	    s0 = peg$currPos;

	    if (input.charCodeAt(peg$currPos) === 123) {
	      s1 = peg$c6;
	      peg$currPos++;
	    } else {
	      s1 = peg$FAILED;

	      if (peg$silentFails === 0) {
	        peg$fail(peg$c7);
	      }
	    }

	    if (s1 !== peg$FAILED) {
	      s2 = peg$parse_();

	      if (s2 !== peg$FAILED) {
	        s3 = peg$parseargNameOrNumber();

	        if (s3 !== peg$FAILED) {
	          s4 = peg$parse_();

	          if (s4 !== peg$FAILED) {
	            if (input.charCodeAt(peg$currPos) === 44) {
	              s5 = peg$c27;
	              peg$currPos++;
	            } else {
	              s5 = peg$FAILED;

	              if (peg$silentFails === 0) {
	                peg$fail(peg$c28);
	              }
	            }

	            if (s5 !== peg$FAILED) {
	              s6 = peg$parse_();

	              if (s6 !== peg$FAILED) {
	                if (input.substr(peg$currPos, 4) === peg$c42) {
	                  s7 = peg$c42;
	                  peg$currPos += 4;
	                } else {
	                  s7 = peg$FAILED;

	                  if (peg$silentFails === 0) {
	                    peg$fail(peg$c43);
	                  }
	                }

	                if (s7 === peg$FAILED) {
	                  if (input.substr(peg$currPos, 4) === peg$c44) {
	                    s7 = peg$c44;
	                    peg$currPos += 4;
	                  } else {
	                    s7 = peg$FAILED;

	                    if (peg$silentFails === 0) {
	                      peg$fail(peg$c45);
	                    }
	                  }
	                }

	                if (s7 !== peg$FAILED) {
	                  s8 = peg$parse_();

	                  if (s8 !== peg$FAILED) {
	                    s9 = peg$currPos;

	                    if (input.charCodeAt(peg$currPos) === 44) {
	                      s10 = peg$c27;
	                      peg$currPos++;
	                    } else {
	                      s10 = peg$FAILED;

	                      if (peg$silentFails === 0) {
	                        peg$fail(peg$c28);
	                      }
	                    }

	                    if (s10 !== peg$FAILED) {
	                      s11 = peg$parse_();

	                      if (s11 !== peg$FAILED) {
	                        s12 = peg$parsedateOrTimeArgStyle();

	                        if (s12 !== peg$FAILED) {
	                          s10 = [s10, s11, s12];
	                          s9 = s10;
	                        } else {
	                          peg$currPos = s9;
	                          s9 = peg$FAILED;
	                        }
	                      } else {
	                        peg$currPos = s9;
	                        s9 = peg$FAILED;
	                      }
	                    } else {
	                      peg$currPos = s9;
	                      s9 = peg$FAILED;
	                    }

	                    if (s9 === peg$FAILED) {
	                      s9 = null;
	                    }

	                    if (s9 !== peg$FAILED) {
	                      s10 = peg$parse_();

	                      if (s10 !== peg$FAILED) {
	                        if (input.charCodeAt(peg$currPos) === 125) {
	                          s11 = peg$c8;
	                          peg$currPos++;
	                        } else {
	                          s11 = peg$FAILED;

	                          if (peg$silentFails === 0) {
	                            peg$fail(peg$c9);
	                          }
	                        }

	                        if (s11 !== peg$FAILED) {
	                          peg$savedPos = s0;
	                          s1 = peg$c31(s3, s7, s9);
	                          s0 = s1;
	                        } else {
	                          peg$currPos = s0;
	                          s0 = peg$FAILED;
	                        }
	                      } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                      }
	                    } else {
	                      peg$currPos = s0;
	                      s0 = peg$FAILED;
	                    }
	                  } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                  }
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }
	        } else {
	          peg$currPos = s0;
	          s0 = peg$FAILED;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$FAILED;
	      }
	    } else {
	      peg$currPos = s0;
	      s0 = peg$FAILED;
	    }

	    return s0;
	  }

	  function peg$parsesimpleFormatElement() {
	    var s0;
	    s0 = peg$parsenumberFormatElement();

	    if (s0 === peg$FAILED) {
	      s0 = peg$parsedateOrTimeFormatElement();
	    }

	    return s0;
	  }

	  function peg$parsepluralElement() {
	    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15;
	    s0 = peg$currPos;

	    if (input.charCodeAt(peg$currPos) === 123) {
	      s1 = peg$c6;
	      peg$currPos++;
	    } else {
	      s1 = peg$FAILED;

	      if (peg$silentFails === 0) {
	        peg$fail(peg$c7);
	      }
	    }

	    if (s1 !== peg$FAILED) {
	      s2 = peg$parse_();

	      if (s2 !== peg$FAILED) {
	        s3 = peg$parseargNameOrNumber();

	        if (s3 !== peg$FAILED) {
	          s4 = peg$parse_();

	          if (s4 !== peg$FAILED) {
	            if (input.charCodeAt(peg$currPos) === 44) {
	              s5 = peg$c27;
	              peg$currPos++;
	            } else {
	              s5 = peg$FAILED;

	              if (peg$silentFails === 0) {
	                peg$fail(peg$c28);
	              }
	            }

	            if (s5 !== peg$FAILED) {
	              s6 = peg$parse_();

	              if (s6 !== peg$FAILED) {
	                if (input.substr(peg$currPos, 6) === peg$c46) {
	                  s7 = peg$c46;
	                  peg$currPos += 6;
	                } else {
	                  s7 = peg$FAILED;

	                  if (peg$silentFails === 0) {
	                    peg$fail(peg$c47);
	                  }
	                }

	                if (s7 === peg$FAILED) {
	                  if (input.substr(peg$currPos, 13) === peg$c48) {
	                    s7 = peg$c48;
	                    peg$currPos += 13;
	                  } else {
	                    s7 = peg$FAILED;

	                    if (peg$silentFails === 0) {
	                      peg$fail(peg$c49);
	                    }
	                  }
	                }

	                if (s7 !== peg$FAILED) {
	                  s8 = peg$parse_();

	                  if (s8 !== peg$FAILED) {
	                    if (input.charCodeAt(peg$currPos) === 44) {
	                      s9 = peg$c27;
	                      peg$currPos++;
	                    } else {
	                      s9 = peg$FAILED;

	                      if (peg$silentFails === 0) {
	                        peg$fail(peg$c28);
	                      }
	                    }

	                    if (s9 !== peg$FAILED) {
	                      s10 = peg$parse_();

	                      if (s10 !== peg$FAILED) {
	                        s11 = peg$currPos;

	                        if (input.substr(peg$currPos, 7) === peg$c50) {
	                          s12 = peg$c50;
	                          peg$currPos += 7;
	                        } else {
	                          s12 = peg$FAILED;

	                          if (peg$silentFails === 0) {
	                            peg$fail(peg$c51);
	                          }
	                        }

	                        if (s12 !== peg$FAILED) {
	                          s13 = peg$parse_();

	                          if (s13 !== peg$FAILED) {
	                            s14 = peg$parsenumber();

	                            if (s14 !== peg$FAILED) {
	                              s12 = [s12, s13, s14];
	                              s11 = s12;
	                            } else {
	                              peg$currPos = s11;
	                              s11 = peg$FAILED;
	                            }
	                          } else {
	                            peg$currPos = s11;
	                            s11 = peg$FAILED;
	                          }
	                        } else {
	                          peg$currPos = s11;
	                          s11 = peg$FAILED;
	                        }

	                        if (s11 === peg$FAILED) {
	                          s11 = null;
	                        }

	                        if (s11 !== peg$FAILED) {
	                          s12 = peg$parse_();

	                          if (s12 !== peg$FAILED) {
	                            s13 = [];
	                            s14 = peg$parsepluralOption();

	                            if (s14 !== peg$FAILED) {
	                              while (s14 !== peg$FAILED) {
	                                s13.push(s14);
	                                s14 = peg$parsepluralOption();
	                              }
	                            } else {
	                              s13 = peg$FAILED;
	                            }

	                            if (s13 !== peg$FAILED) {
	                              s14 = peg$parse_();

	                              if (s14 !== peg$FAILED) {
	                                if (input.charCodeAt(peg$currPos) === 125) {
	                                  s15 = peg$c8;
	                                  peg$currPos++;
	                                } else {
	                                  s15 = peg$FAILED;

	                                  if (peg$silentFails === 0) {
	                                    peg$fail(peg$c9);
	                                  }
	                                }

	                                if (s15 !== peg$FAILED) {
	                                  peg$savedPos = s0;
	                                  s1 = peg$c52(s3, s7, s11, s13);
	                                  s0 = s1;
	                                } else {
	                                  peg$currPos = s0;
	                                  s0 = peg$FAILED;
	                                }
	                              } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                              }
	                            } else {
	                              peg$currPos = s0;
	                              s0 = peg$FAILED;
	                            }
	                          } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                          }
	                        } else {
	                          peg$currPos = s0;
	                          s0 = peg$FAILED;
	                        }
	                      } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                      }
	                    } else {
	                      peg$currPos = s0;
	                      s0 = peg$FAILED;
	                    }
	                  } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                  }
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }
	        } else {
	          peg$currPos = s0;
	          s0 = peg$FAILED;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$FAILED;
	      }
	    } else {
	      peg$currPos = s0;
	      s0 = peg$FAILED;
	    }

	    return s0;
	  }

	  function peg$parseselectElement() {
	    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13;
	    s0 = peg$currPos;

	    if (input.charCodeAt(peg$currPos) === 123) {
	      s1 = peg$c6;
	      peg$currPos++;
	    } else {
	      s1 = peg$FAILED;

	      if (peg$silentFails === 0) {
	        peg$fail(peg$c7);
	      }
	    }

	    if (s1 !== peg$FAILED) {
	      s2 = peg$parse_();

	      if (s2 !== peg$FAILED) {
	        s3 = peg$parseargNameOrNumber();

	        if (s3 !== peg$FAILED) {
	          s4 = peg$parse_();

	          if (s4 !== peg$FAILED) {
	            if (input.charCodeAt(peg$currPos) === 44) {
	              s5 = peg$c27;
	              peg$currPos++;
	            } else {
	              s5 = peg$FAILED;

	              if (peg$silentFails === 0) {
	                peg$fail(peg$c28);
	              }
	            }

	            if (s5 !== peg$FAILED) {
	              s6 = peg$parse_();

	              if (s6 !== peg$FAILED) {
	                if (input.substr(peg$currPos, 6) === peg$c53) {
	                  s7 = peg$c53;
	                  peg$currPos += 6;
	                } else {
	                  s7 = peg$FAILED;

	                  if (peg$silentFails === 0) {
	                    peg$fail(peg$c54);
	                  }
	                }

	                if (s7 !== peg$FAILED) {
	                  s8 = peg$parse_();

	                  if (s8 !== peg$FAILED) {
	                    if (input.charCodeAt(peg$currPos) === 44) {
	                      s9 = peg$c27;
	                      peg$currPos++;
	                    } else {
	                      s9 = peg$FAILED;

	                      if (peg$silentFails === 0) {
	                        peg$fail(peg$c28);
	                      }
	                    }

	                    if (s9 !== peg$FAILED) {
	                      s10 = peg$parse_();

	                      if (s10 !== peg$FAILED) {
	                        s11 = [];
	                        s12 = peg$parseselectOption();

	                        if (s12 !== peg$FAILED) {
	                          while (s12 !== peg$FAILED) {
	                            s11.push(s12);
	                            s12 = peg$parseselectOption();
	                          }
	                        } else {
	                          s11 = peg$FAILED;
	                        }

	                        if (s11 !== peg$FAILED) {
	                          s12 = peg$parse_();

	                          if (s12 !== peg$FAILED) {
	                            if (input.charCodeAt(peg$currPos) === 125) {
	                              s13 = peg$c8;
	                              peg$currPos++;
	                            } else {
	                              s13 = peg$FAILED;

	                              if (peg$silentFails === 0) {
	                                peg$fail(peg$c9);
	                              }
	                            }

	                            if (s13 !== peg$FAILED) {
	                              peg$savedPos = s0;
	                              s1 = peg$c55(s3, s11);
	                              s0 = s1;
	                            } else {
	                              peg$currPos = s0;
	                              s0 = peg$FAILED;
	                            }
	                          } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                          }
	                        } else {
	                          peg$currPos = s0;
	                          s0 = peg$FAILED;
	                        }
	                      } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                      }
	                    } else {
	                      peg$currPos = s0;
	                      s0 = peg$FAILED;
	                    }
	                  } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                  }
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }
	        } else {
	          peg$currPos = s0;
	          s0 = peg$FAILED;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$FAILED;
	      }
	    } else {
	      peg$currPos = s0;
	      s0 = peg$FAILED;
	    }

	    return s0;
	  }

	  function peg$parsepluralRuleSelectValue() {
	    var s0, s1, s2, s3;
	    s0 = peg$currPos;
	    s1 = peg$currPos;

	    if (input.charCodeAt(peg$currPos) === 61) {
	      s2 = peg$c56;
	      peg$currPos++;
	    } else {
	      s2 = peg$FAILED;

	      if (peg$silentFails === 0) {
	        peg$fail(peg$c57);
	      }
	    }

	    if (s2 !== peg$FAILED) {
	      s3 = peg$parsenumber();

	      if (s3 !== peg$FAILED) {
	        s2 = [s2, s3];
	        s1 = s2;
	      } else {
	        peg$currPos = s1;
	        s1 = peg$FAILED;
	      }
	    } else {
	      peg$currPos = s1;
	      s1 = peg$FAILED;
	    }

	    if (s1 !== peg$FAILED) {
	      s0 = input.substring(s0, peg$currPos);
	    } else {
	      s0 = s1;
	    }

	    if (s0 === peg$FAILED) {
	      s0 = peg$parseargName();
	    }

	    return s0;
	  }

	  function peg$parseselectOption() {
	    var s0, s1, s2, s3, s4, s5, s6, s7;
	    s0 = peg$currPos;
	    s1 = peg$parse_();

	    if (s1 !== peg$FAILED) {
	      s2 = peg$parseargName();

	      if (s2 !== peg$FAILED) {
	        s3 = peg$parse_();

	        if (s3 !== peg$FAILED) {
	          if (input.charCodeAt(peg$currPos) === 123) {
	            s4 = peg$c6;
	            peg$currPos++;
	          } else {
	            s4 = peg$FAILED;

	            if (peg$silentFails === 0) {
	              peg$fail(peg$c7);
	            }
	          }

	          if (s4 !== peg$FAILED) {
	            peg$savedPos = peg$currPos;
	            s5 = peg$c58();

	            if (s5) {
	              s5 = undefined;
	            } else {
	              s5 = peg$FAILED;
	            }

	            if (s5 !== peg$FAILED) {
	              s6 = peg$parsemessage();

	              if (s6 !== peg$FAILED) {
	                if (input.charCodeAt(peg$currPos) === 125) {
	                  s7 = peg$c8;
	                  peg$currPos++;
	                } else {
	                  s7 = peg$FAILED;

	                  if (peg$silentFails === 0) {
	                    peg$fail(peg$c9);
	                  }
	                }

	                if (s7 !== peg$FAILED) {
	                  peg$savedPos = s0;
	                  s1 = peg$c59(s2, s6);
	                  s0 = s1;
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }
	        } else {
	          peg$currPos = s0;
	          s0 = peg$FAILED;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$FAILED;
	      }
	    } else {
	      peg$currPos = s0;
	      s0 = peg$FAILED;
	    }

	    return s0;
	  }

	  function peg$parsepluralOption() {
	    var s0, s1, s2, s3, s4, s5, s6, s7;
	    s0 = peg$currPos;
	    s1 = peg$parse_();

	    if (s1 !== peg$FAILED) {
	      s2 = peg$parsepluralRuleSelectValue();

	      if (s2 !== peg$FAILED) {
	        s3 = peg$parse_();

	        if (s3 !== peg$FAILED) {
	          if (input.charCodeAt(peg$currPos) === 123) {
	            s4 = peg$c6;
	            peg$currPos++;
	          } else {
	            s4 = peg$FAILED;

	            if (peg$silentFails === 0) {
	              peg$fail(peg$c7);
	            }
	          }

	          if (s4 !== peg$FAILED) {
	            peg$savedPos = peg$currPos;
	            s5 = peg$c60();

	            if (s5) {
	              s5 = undefined;
	            } else {
	              s5 = peg$FAILED;
	            }

	            if (s5 !== peg$FAILED) {
	              s6 = peg$parsemessage();

	              if (s6 !== peg$FAILED) {
	                if (input.charCodeAt(peg$currPos) === 125) {
	                  s7 = peg$c8;
	                  peg$currPos++;
	                } else {
	                  s7 = peg$FAILED;

	                  if (peg$silentFails === 0) {
	                    peg$fail(peg$c9);
	                  }
	                }

	                if (s7 !== peg$FAILED) {
	                  peg$savedPos = s0;
	                  s1 = peg$c61(s2, s6);
	                  s0 = s1;
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }
	        } else {
	          peg$currPos = s0;
	          s0 = peg$FAILED;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$FAILED;
	      }
	    } else {
	      peg$currPos = s0;
	      s0 = peg$FAILED;
	    }

	    return s0;
	  }

	  function peg$parsewhiteSpace() {
	    var s0;
	    peg$silentFails++;

	    if (peg$c63.test(input.charAt(peg$currPos))) {
	      s0 = input.charAt(peg$currPos);
	      peg$currPos++;
	    } else {
	      s0 = peg$FAILED;

	      if (peg$silentFails === 0) {
	        peg$fail(peg$c64);
	      }
	    }

	    peg$silentFails--;

	    if (s0 === peg$FAILED) {

	      if (peg$silentFails === 0) {
	        peg$fail(peg$c62);
	      }
	    }

	    return s0;
	  }

	  function peg$parsepatternSyntax() {
	    var s0;
	    peg$silentFails++;

	    if (peg$c66.test(input.charAt(peg$currPos))) {
	      s0 = input.charAt(peg$currPos);
	      peg$currPos++;
	    } else {
	      s0 = peg$FAILED;

	      if (peg$silentFails === 0) {
	        peg$fail(peg$c67);
	      }
	    }

	    peg$silentFails--;

	    if (s0 === peg$FAILED) {

	      if (peg$silentFails === 0) {
	        peg$fail(peg$c65);
	      }
	    }

	    return s0;
	  }

	  function peg$parse_() {
	    var s0, s1, s2;
	    peg$silentFails++;
	    s0 = peg$currPos;
	    s1 = [];
	    s2 = peg$parsewhiteSpace();

	    while (s2 !== peg$FAILED) {
	      s1.push(s2);
	      s2 = peg$parsewhiteSpace();
	    }

	    if (s1 !== peg$FAILED) {
	      s0 = input.substring(s0, peg$currPos);
	    } else {
	      s0 = s1;
	    }

	    peg$silentFails--;

	    if (s0 === peg$FAILED) {
	      s1 = peg$FAILED;

	      if (peg$silentFails === 0) {
	        peg$fail(peg$c68);
	      }
	    }

	    return s0;
	  }

	  function peg$parsenumber() {
	    var s0, s1, s2;
	    peg$silentFails++;
	    s0 = peg$currPos;

	    if (input.charCodeAt(peg$currPos) === 45) {
	      s1 = peg$c70;
	      peg$currPos++;
	    } else {
	      s1 = peg$FAILED;

	      if (peg$silentFails === 0) {
	        peg$fail(peg$c71);
	      }
	    }

	    if (s1 === peg$FAILED) {
	      s1 = null;
	    }

	    if (s1 !== peg$FAILED) {
	      s2 = peg$parseargNumber();

	      if (s2 !== peg$FAILED) {
	        peg$savedPos = s0;
	        s1 = peg$c72(s1, s2);
	        s0 = s1;
	      } else {
	        peg$currPos = s0;
	        s0 = peg$FAILED;
	      }
	    } else {
	      peg$currPos = s0;
	      s0 = peg$FAILED;
	    }

	    peg$silentFails--;

	    if (s0 === peg$FAILED) {
	      s1 = peg$FAILED;

	      if (peg$silentFails === 0) {
	        peg$fail(peg$c69);
	      }
	    }

	    return s0;
	  }

	  function peg$parsedoubleApostrophes() {
	    var s0, s1;
	    peg$silentFails++;
	    s0 = peg$currPos;

	    if (input.substr(peg$currPos, 2) === peg$c75) {
	      s1 = peg$c75;
	      peg$currPos += 2;
	    } else {
	      s1 = peg$FAILED;

	      if (peg$silentFails === 0) {
	        peg$fail(peg$c76);
	      }
	    }

	    if (s1 !== peg$FAILED) {
	      peg$savedPos = s0;
	      s1 = peg$c77();
	    }

	    s0 = s1;
	    peg$silentFails--;

	    if (s0 === peg$FAILED) {
	      s1 = peg$FAILED;

	      if (peg$silentFails === 0) {
	        peg$fail(peg$c74);
	      }
	    }

	    return s0;
	  }

	  function peg$parsequotedString() {
	    var s0, s1, s2, s3, s4, s5;
	    s0 = peg$currPos;

	    if (input.charCodeAt(peg$currPos) === 39) {
	      s1 = peg$c32;
	      peg$currPos++;
	    } else {
	      s1 = peg$FAILED;

	      if (peg$silentFails === 0) {
	        peg$fail(peg$c33);
	      }
	    }

	    if (s1 !== peg$FAILED) {
	      s2 = peg$parseescapedChar();

	      if (s2 !== peg$FAILED) {
	        s3 = peg$currPos;
	        s4 = [];

	        if (input.substr(peg$currPos, 2) === peg$c75) {
	          s5 = peg$c75;
	          peg$currPos += 2;
	        } else {
	          s5 = peg$FAILED;

	          if (peg$silentFails === 0) {
	            peg$fail(peg$c76);
	          }
	        }

	        if (s5 === peg$FAILED) {
	          if (peg$c34.test(input.charAt(peg$currPos))) {
	            s5 = input.charAt(peg$currPos);
	            peg$currPos++;
	          } else {
	            s5 = peg$FAILED;

	            if (peg$silentFails === 0) {
	              peg$fail(peg$c35);
	            }
	          }
	        }

	        while (s5 !== peg$FAILED) {
	          s4.push(s5);

	          if (input.substr(peg$currPos, 2) === peg$c75) {
	            s5 = peg$c75;
	            peg$currPos += 2;
	          } else {
	            s5 = peg$FAILED;

	            if (peg$silentFails === 0) {
	              peg$fail(peg$c76);
	            }
	          }

	          if (s5 === peg$FAILED) {
	            if (peg$c34.test(input.charAt(peg$currPos))) {
	              s5 = input.charAt(peg$currPos);
	              peg$currPos++;
	            } else {
	              s5 = peg$FAILED;

	              if (peg$silentFails === 0) {
	                peg$fail(peg$c35);
	              }
	            }
	          }
	        }

	        if (s4 !== peg$FAILED) {
	          s3 = input.substring(s3, peg$currPos);
	        } else {
	          s3 = s4;
	        }

	        if (s3 !== peg$FAILED) {
	          if (input.charCodeAt(peg$currPos) === 39) {
	            s4 = peg$c32;
	            peg$currPos++;
	          } else {
	            s4 = peg$FAILED;

	            if (peg$silentFails === 0) {
	              peg$fail(peg$c33);
	            }
	          }

	          if (s4 === peg$FAILED) {
	            s4 = null;
	          }

	          if (s4 !== peg$FAILED) {
	            peg$savedPos = s0;
	            s1 = peg$c78(s2, s3);
	            s0 = s1;
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }
	        } else {
	          peg$currPos = s0;
	          s0 = peg$FAILED;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$FAILED;
	      }
	    } else {
	      peg$currPos = s0;
	      s0 = peg$FAILED;
	    }

	    return s0;
	  }

	  function peg$parseunquotedString() {
	    var s0, s1, s2, s3;
	    s0 = peg$currPos;
	    s1 = peg$currPos;

	    if (input.length > peg$currPos) {
	      s2 = input.charAt(peg$currPos);
	      peg$currPos++;
	    } else {
	      s2 = peg$FAILED;

	      if (peg$silentFails === 0) {
	        peg$fail(peg$c14);
	      }
	    }

	    if (s2 !== peg$FAILED) {
	      peg$savedPos = peg$currPos;
	      s3 = peg$c79(s2);

	      if (s3) {
	        s3 = undefined;
	      } else {
	        s3 = peg$FAILED;
	      }

	      if (s3 !== peg$FAILED) {
	        s2 = [s2, s3];
	        s1 = s2;
	      } else {
	        peg$currPos = s1;
	        s1 = peg$FAILED;
	      }
	    } else {
	      peg$currPos = s1;
	      s1 = peg$FAILED;
	    }

	    if (s1 === peg$FAILED) {
	      if (input.charCodeAt(peg$currPos) === 10) {
	        s1 = peg$c80;
	        peg$currPos++;
	      } else {
	        s1 = peg$FAILED;

	        if (peg$silentFails === 0) {
	          peg$fail(peg$c81);
	        }
	      }
	    }

	    if (s1 !== peg$FAILED) {
	      s0 = input.substring(s0, peg$currPos);
	    } else {
	      s0 = s1;
	    }

	    return s0;
	  }

	  function peg$parseescapedChar() {
	    var s0, s1, s2, s3;
	    s0 = peg$currPos;
	    s1 = peg$currPos;

	    if (input.length > peg$currPos) {
	      s2 = input.charAt(peg$currPos);
	      peg$currPos++;
	    } else {
	      s2 = peg$FAILED;

	      if (peg$silentFails === 0) {
	        peg$fail(peg$c14);
	      }
	    }

	    if (s2 !== peg$FAILED) {
	      peg$savedPos = peg$currPos;
	      s3 = peg$c82(s2);

	      if (s3) {
	        s3 = undefined;
	      } else {
	        s3 = peg$FAILED;
	      }

	      if (s3 !== peg$FAILED) {
	        s2 = [s2, s3];
	        s1 = s2;
	      } else {
	        peg$currPos = s1;
	        s1 = peg$FAILED;
	      }
	    } else {
	      peg$currPos = s1;
	      s1 = peg$FAILED;
	    }

	    if (s1 !== peg$FAILED) {
	      s0 = input.substring(s0, peg$currPos);
	    } else {
	      s0 = s1;
	    }

	    return s0;
	  }

	  function peg$parseargNameOrNumber() {
	    var s0, s1;
	    peg$silentFails++;
	    s0 = peg$currPos;
	    s1 = peg$parseargNumber();

	    if (s1 === peg$FAILED) {
	      s1 = peg$parseargName();
	    }

	    if (s1 !== peg$FAILED) {
	      s0 = input.substring(s0, peg$currPos);
	    } else {
	      s0 = s1;
	    }

	    peg$silentFails--;

	    if (s0 === peg$FAILED) {
	      s1 = peg$FAILED;

	      if (peg$silentFails === 0) {
	        peg$fail(peg$c83);
	      }
	    }

	    return s0;
	  }

	  function peg$parseargNumber() {
	    var s0, s1, s2, s3, s4;
	    peg$silentFails++;
	    s0 = peg$currPos;

	    if (input.charCodeAt(peg$currPos) === 48) {
	      s1 = peg$c85;
	      peg$currPos++;
	    } else {
	      s1 = peg$FAILED;

	      if (peg$silentFails === 0) {
	        peg$fail(peg$c86);
	      }
	    }

	    if (s1 !== peg$FAILED) {
	      peg$savedPos = s0;
	      s1 = peg$c87();
	    }

	    s0 = s1;

	    if (s0 === peg$FAILED) {
	      s0 = peg$currPos;
	      s1 = peg$currPos;

	      if (peg$c88.test(input.charAt(peg$currPos))) {
	        s2 = input.charAt(peg$currPos);
	        peg$currPos++;
	      } else {
	        s2 = peg$FAILED;

	        if (peg$silentFails === 0) {
	          peg$fail(peg$c89);
	        }
	      }

	      if (s2 !== peg$FAILED) {
	        s3 = [];

	        if (peg$c90.test(input.charAt(peg$currPos))) {
	          s4 = input.charAt(peg$currPos);
	          peg$currPos++;
	        } else {
	          s4 = peg$FAILED;

	          if (peg$silentFails === 0) {
	            peg$fail(peg$c91);
	          }
	        }

	        while (s4 !== peg$FAILED) {
	          s3.push(s4);

	          if (peg$c90.test(input.charAt(peg$currPos))) {
	            s4 = input.charAt(peg$currPos);
	            peg$currPos++;
	          } else {
	            s4 = peg$FAILED;

	            if (peg$silentFails === 0) {
	              peg$fail(peg$c91);
	            }
	          }
	        }

	        if (s3 !== peg$FAILED) {
	          s2 = [s2, s3];
	          s1 = s2;
	        } else {
	          peg$currPos = s1;
	          s1 = peg$FAILED;
	        }
	      } else {
	        peg$currPos = s1;
	        s1 = peg$FAILED;
	      }

	      if (s1 !== peg$FAILED) {
	        peg$savedPos = s0;
	        s1 = peg$c92(s1);
	      }

	      s0 = s1;
	    }

	    peg$silentFails--;

	    if (s0 === peg$FAILED) {
	      s1 = peg$FAILED;

	      if (peg$silentFails === 0) {
	        peg$fail(peg$c84);
	      }
	    }

	    return s0;
	  }

	  function peg$parseargName() {
	    var s0, s1, s2, s3, s4;
	    peg$silentFails++;
	    s0 = peg$currPos;
	    s1 = [];
	    s2 = peg$currPos;
	    s3 = peg$currPos;
	    peg$silentFails++;
	    s4 = peg$parsewhiteSpace();

	    if (s4 === peg$FAILED) {
	      s4 = peg$parsepatternSyntax();
	    }

	    peg$silentFails--;

	    if (s4 === peg$FAILED) {
	      s3 = undefined;
	    } else {
	      peg$currPos = s3;
	      s3 = peg$FAILED;
	    }

	    if (s3 !== peg$FAILED) {
	      if (input.length > peg$currPos) {
	        s4 = input.charAt(peg$currPos);
	        peg$currPos++;
	      } else {
	        s4 = peg$FAILED;

	        if (peg$silentFails === 0) {
	          peg$fail(peg$c14);
	        }
	      }

	      if (s4 !== peg$FAILED) {
	        s3 = [s3, s4];
	        s2 = s3;
	      } else {
	        peg$currPos = s2;
	        s2 = peg$FAILED;
	      }
	    } else {
	      peg$currPos = s2;
	      s2 = peg$FAILED;
	    }

	    if (s2 !== peg$FAILED) {
	      while (s2 !== peg$FAILED) {
	        s1.push(s2);
	        s2 = peg$currPos;
	        s3 = peg$currPos;
	        peg$silentFails++;
	        s4 = peg$parsewhiteSpace();

	        if (s4 === peg$FAILED) {
	          s4 = peg$parsepatternSyntax();
	        }

	        peg$silentFails--;

	        if (s4 === peg$FAILED) {
	          s3 = undefined;
	        } else {
	          peg$currPos = s3;
	          s3 = peg$FAILED;
	        }

	        if (s3 !== peg$FAILED) {
	          if (input.length > peg$currPos) {
	            s4 = input.charAt(peg$currPos);
	            peg$currPos++;
	          } else {
	            s4 = peg$FAILED;

	            if (peg$silentFails === 0) {
	              peg$fail(peg$c14);
	            }
	          }

	          if (s4 !== peg$FAILED) {
	            s3 = [s3, s4];
	            s2 = s3;
	          } else {
	            peg$currPos = s2;
	            s2 = peg$FAILED;
	          }
	        } else {
	          peg$currPos = s2;
	          s2 = peg$FAILED;
	        }
	      }
	    } else {
	      s1 = peg$FAILED;
	    }

	    if (s1 !== peg$FAILED) {
	      s0 = input.substring(s0, peg$currPos);
	    } else {
	      s0 = s1;
	    }

	    peg$silentFails--;

	    if (s0 === peg$FAILED) {
	      s1 = peg$FAILED;

	      if (peg$silentFails === 0) {
	        peg$fail(peg$c93);
	      }
	    }

	    return s0;
	  }

	  var messageCtx = ['root'];

	  function isNestedMessageText() {
	    return messageCtx.length > 1;
	  }

	  function isInPluralOption() {
	    return messageCtx[messageCtx.length - 1] === 'plural';
	  }

	  function insertLocation() {
	    return options && options.captureLocation ? {
	      location: location()
	    } : {};
	  }

	  peg$result = peg$startRuleFunction();

	  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
	    return peg$result;
	  } else {
	    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
	      peg$fail(peg$endExpectation());
	    }

	    throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
	  }
	}

	var pegParse = peg$parse;

	var __spreadArrays = undefined && undefined.__spreadArrays || function () {
	  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
	    s += arguments[i].length;
	  }

	  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
	    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
	      r[k] = a[j];
	    }
	  }

	  return r;
	};
	var PLURAL_HASHTAG_REGEX = /(^|[^\\])#/g;
	/**
	 * Whether to convert `#` in plural rule options
	 * to `{var, number}`
	 * @param el AST Element
	 * @param pluralStack current plural stack
	 */

	function normalizeHashtagInPlural(els) {
	  els.forEach(function (el) {
	    // If we're encountering a plural el
	    if (!isPluralElement(el) && !isSelectElement(el)) {
	      return;
	    } // Go down the options and search for # in any literal element


	    Object.keys(el.options).forEach(function (id) {
	      var _a;

	      var opt = el.options[id]; // If we got a match, we have to split this
	      // and inject a NumberElement in the middle

	      var matchingLiteralElIndex = -1;
	      var literalEl = undefined;

	      for (var i = 0; i < opt.value.length; i++) {
	        var el_1 = opt.value[i];

	        if (isLiteralElement(el_1) && PLURAL_HASHTAG_REGEX.test(el_1.value)) {
	          matchingLiteralElIndex = i;
	          literalEl = el_1;
	          break;
	        }
	      }

	      if (literalEl) {
	        var newValue = literalEl.value.replace(PLURAL_HASHTAG_REGEX, "$1{" + el.value + ", number}");
	        var newEls = pegParse(newValue);

	        (_a = opt.value).splice.apply(_a, __spreadArrays([matchingLiteralElIndex, 1], newEls));
	      }

	      normalizeHashtagInPlural(opt.value);
	    });
	  });
	}

	var __assign$1 = undefined && undefined.__assign || function () {
	  __assign$1 = Object.assign || function (t) {
	    for (var s, i = 1, n = arguments.length; i < n; i++) {
	      s = arguments[i];

	      for (var p in s) {
	        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	      }
	    }

	    return t;
	  };

	  return __assign$1.apply(this, arguments);
	};
	/**
	 * https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
	 * Credit: https://github.com/caridy/intl-datetimeformat-pattern/blob/master/index.js
	 * with some tweaks
	 */


	var DATE_TIME_REGEX = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
	/**
	 * Parse Date time skeleton into Intl.DateTimeFormatOptions
	 * Ref: https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
	 * @public
	 * @param skeleton skeleton string
	 */

	function parseDateTimeSkeleton(skeleton) {
	  var result = {};
	  skeleton.replace(DATE_TIME_REGEX, function (match) {
	    var len = match.length;

	    switch (match[0]) {
	      // Era
	      case 'G':
	        result.era = len === 4 ? 'long' : len === 5 ? 'narrow' : 'short';
	        break;
	      // Year

	      case 'y':
	        result.year = len === 2 ? '2-digit' : 'numeric';
	        break;

	      case 'Y':
	      case 'u':
	      case 'U':
	      case 'r':
	        throw new RangeError('`Y/u/U/r` (year) patterns are not supported, use `y` instead');
	      // Quarter

	      case 'q':
	      case 'Q':
	        throw new RangeError('`q/Q` (quarter) patterns are not supported');
	      // Month

	      case 'M':
	      case 'L':
	        result.month = ['numeric', '2-digit', 'short', 'long', 'narrow'][len - 1];
	        break;
	      // Week

	      case 'w':
	      case 'W':
	        throw new RangeError('`w/W` (week) patterns are not supported');

	      case 'd':
	        result.day = ['numeric', '2-digit'][len - 1];
	        break;

	      case 'D':
	      case 'F':
	      case 'g':
	        throw new RangeError('`D/F/g` (day) patterns are not supported, use `d` instead');
	      // Weekday

	      case 'E':
	        result.weekday = len === 4 ? 'short' : len === 5 ? 'narrow' : 'short';
	        break;

	      case 'e':
	        if (len < 4) {
	          throw new RangeError('`e..eee` (weekday) patterns are not supported');
	        }

	        result.weekday = ['short', 'long', 'narrow', 'short'][len - 4];
	        break;

	      case 'c':
	        if (len < 4) {
	          throw new RangeError('`c..ccc` (weekday) patterns are not supported');
	        }

	        result.weekday = ['short', 'long', 'narrow', 'short'][len - 4];
	        break;
	      // Period

	      case 'a':
	        // AM, PM
	        result.hour12 = true;
	        break;

	      case 'b': // am, pm, noon, midnight

	      case 'B':
	        // flexible day periods
	        throw new RangeError('`b/B` (period) patterns are not supported, use `a` instead');
	      // Hour

	      case 'h':
	        result.hourCycle = 'h12';
	        result.hour = ['numeric', '2-digit'][len - 1];
	        break;

	      case 'H':
	        result.hourCycle = 'h23';
	        result.hour = ['numeric', '2-digit'][len - 1];
	        break;

	      case 'K':
	        result.hourCycle = 'h11';
	        result.hour = ['numeric', '2-digit'][len - 1];
	        break;

	      case 'k':
	        result.hourCycle = 'h24';
	        result.hour = ['numeric', '2-digit'][len - 1];
	        break;

	      case 'j':
	      case 'J':
	      case 'C':
	        throw new RangeError('`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead');
	      // Minute

	      case 'm':
	        result.minute = ['numeric', '2-digit'][len - 1];
	        break;
	      // Second

	      case 's':
	        result.second = ['numeric', '2-digit'][len - 1];
	        break;

	      case 'S':
	      case 'A':
	        throw new RangeError('`S/A` (second) pattenrs are not supported, use `s` instead');
	      // Zone

	      case 'z':
	        // 1..3, 4: specific non-location format
	        result.timeZoneName = len < 4 ? 'short' : 'long';
	        break;

	      case 'Z': // 1..3, 4, 5: The ISO8601 varios formats

	      case 'O': // 1, 4: miliseconds in day short, long

	      case 'v': // 1, 4: generic non-location format

	      case 'V': // 1, 2, 3, 4: time zone ID or city

	      case 'X': // 1, 2, 3, 4: The ISO8601 varios formats

	      case 'x':
	        // 1, 2, 3, 4: The ISO8601 varios formats
	        throw new RangeError('`Z/O/v/V/X/x` (timeZone) pattenrs are not supported, use `z` instead');
	    }

	    return '';
	  });
	  return result;
	}

	function icuUnitToEcma(unit) {
	  return unit.replace(/^(.*?)-/, '');
	}

	var FRACTION_PRECISION_REGEX = /^\.(?:(0+)(\+|#+)?)?$/g;
	var SIGNIFICANT_PRECISION_REGEX = /^(@+)?(\+|#+)?$/g;

	function parseSignificantPrecision(str) {
	  var result = {};
	  str.replace(SIGNIFICANT_PRECISION_REGEX, function (_, g1, g2) {
	    // @@@ case
	    if (typeof g2 !== 'string') {
	      result.minimumSignificantDigits = g1.length;
	      result.maximumSignificantDigits = g1.length;
	    } // @@@+ case
	    else if (g2 === '+') {
	        result.minimumSignificantDigits = g1.length;
	      } // .### case
	      else if (g1[0] === '#') {
	          result.maximumSignificantDigits = g1.length;
	        } // .@@## or .@@@ case
	        else {
	            result.minimumSignificantDigits = g1.length;
	            result.maximumSignificantDigits = g1.length + (typeof g2 === 'string' ? g2.length : 0);
	          }

	    return '';
	  });
	  return result;
	}

	function parseSign(str) {
	  switch (str) {
	    case 'sign-auto':
	      return {
	        signDisplay: 'auto'
	      };

	    case 'sign-accounting':
	      return {
	        currencySign: 'accounting'
	      };

	    case 'sign-always':
	      return {
	        signDisplay: 'always'
	      };

	    case 'sign-accounting-always':
	      return {
	        signDisplay: 'always',
	        currencySign: 'accounting'
	      };

	    case 'sign-except-zero':
	      return {
	        signDisplay: 'exceptZero'
	      };

	    case 'sign-accounting-except-zero':
	      return {
	        signDisplay: 'exceptZero',
	        currencySign: 'accounting'
	      };

	    case 'sign-never':
	      return {
	        signDisplay: 'never'
	      };
	  }
	}

	function parseNotationOptions(opt) {
	  var result = {};
	  var signOpts = parseSign(opt);

	  if (signOpts) {
	    return signOpts;
	  }

	  return result;
	}
	/**
	 * https://github.com/unicode-org/icu/blob/master/docs/userguide/format_parse/numbers/skeletons.md#skeleton-stems-and-options
	 */


	function convertNumberSkeletonToNumberFormatOptions(tokens) {
	  var result = {};

	  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
	    var token = tokens_1[_i];

	    switch (token.stem) {
	      case 'percent':
	        result.style = 'percent';
	        continue;

	      case 'currency':
	        result.style = 'currency';
	        result.currency = token.options[0];
	        continue;

	      case 'group-off':
	        result.useGrouping = false;
	        continue;

	      case 'precision-integer':
	        result.maximumFractionDigits = 0;
	        continue;

	      case 'measure-unit':
	        result.style = 'unit';
	        result.unit = icuUnitToEcma(token.options[0]);
	        continue;

	      case 'compact-short':
	        result.notation = 'compact';
	        result.compactDisplay = 'short';
	        continue;

	      case 'compact-long':
	        result.notation = 'compact';
	        result.compactDisplay = 'long';
	        continue;

	      case 'scientific':
	        result = __assign$1(__assign$1(__assign$1({}, result), {
	          notation: 'scientific'
	        }), token.options.reduce(function (all, opt) {
	          return __assign$1(__assign$1({}, all), parseNotationOptions(opt));
	        }, {}));
	        continue;

	      case 'engineering':
	        result = __assign$1(__assign$1(__assign$1({}, result), {
	          notation: 'engineering'
	        }), token.options.reduce(function (all, opt) {
	          return __assign$1(__assign$1({}, all), parseNotationOptions(opt));
	        }, {}));
	        continue;

	      case 'notation-simple':
	        result.notation = 'standard';
	        continue;
	      // https://github.com/unicode-org/icu/blob/master/icu4c/source/i18n/unicode/unumberformatter.h

	      case 'unit-width-narrow':
	        result.currencyDisplay = 'narrowSymbol';
	        result.unitDisplay = 'narrow';
	        continue;

	      case 'unit-width-short':
	        result.currencyDisplay = 'code';
	        result.unitDisplay = 'short';
	        continue;

	      case 'unit-width-full-name':
	        result.currencyDisplay = 'name';
	        result.unitDisplay = 'long';
	        continue;

	      case 'unit-width-iso-code':
	        result.currencyDisplay = 'symbol';
	        continue;
	    } // Precision
	    // https://github.com/unicode-org/icu/blob/master/docs/userguide/format_parse/numbers/skeletons.md#fraction-precision


	    if (FRACTION_PRECISION_REGEX.test(token.stem)) {
	      if (token.options.length > 1) {
	        throw new RangeError('Fraction-precision stems only accept a single optional option');
	      }

	      token.stem.replace(FRACTION_PRECISION_REGEX, function (match, g1, g2) {
	        // precision-integer case
	        if (match === '.') {
	          result.maximumFractionDigits = 0;
	        } // .000+ case
	        else if (g2 === '+') {
	            result.minimumFractionDigits = g2.length;
	          } // .### case
	          else if (g1[0] === '#') {
	              result.maximumFractionDigits = g1.length;
	            } // .00## or .000 case
	            else {
	                result.minimumFractionDigits = g1.length;
	                result.maximumFractionDigits = g1.length + (typeof g2 === 'string' ? g2.length : 0);
	              }

	        return '';
	      });

	      if (token.options.length) {
	        result = __assign$1(__assign$1({}, result), parseSignificantPrecision(token.options[0]));
	      }

	      continue;
	    }

	    if (SIGNIFICANT_PRECISION_REGEX.test(token.stem)) {
	      result = __assign$1(__assign$1({}, result), parseSignificantPrecision(token.stem));
	      continue;
	    }

	    var signOpts = parseSign(token.stem);

	    if (signOpts) {
	      result = __assign$1(__assign$1({}, result), signOpts);
	    }
	  }

	  return result;
	}

	function parse(input, opts) {
	  var els = pegParse(input, opts);

	  if (!opts || opts.normalizeHashtagInPlural !== false) {
	    normalizeHashtagInPlural(els);
	  }

	  return els;
	}

	/*
	Copyright (c) 2014, Yahoo! Inc. All rights reserved.
	Copyrights licensed under the New BSD License.
	See the accompanying LICENSE file for terms.
	*/
	var __spreadArrays$1 = undefined && undefined.__spreadArrays || function () {
	  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
	    s += arguments[i].length;
	  }

	  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
	    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
	      r[k] = a[j];
	    }
	  }

	  return r;
	}; // -- Utilities ----------------------------------------------------------------


	function getCacheId(inputs) {
	  return JSON.stringify(inputs.map(function (input) {
	    return input && _typeof(input) === 'object' ? orderedProps(input) : input;
	  }));
	}

	function orderedProps(obj) {
	  return Object.keys(obj).sort().map(function (k) {
	    var _a;

	    return _a = {}, _a[k] = obj[k], _a;
	  });
	}

	var memoizeFormatConstructor = function memoizeFormatConstructor(FormatConstructor, cache) {
	  if (cache === void 0) {
	    cache = {};
	  }

	  return function () {
	    var _a;

	    var args = [];

	    for (var _i = 0; _i < arguments.length; _i++) {
	      args[_i] = arguments[_i];
	    }

	    var cacheId = getCacheId(args);
	    var format = cacheId && cache[cacheId];

	    if (!format) {
	      format = new ((_a = FormatConstructor).bind.apply(_a, __spreadArrays$1([void 0], args)))();

	      if (cacheId) {
	        cache[cacheId] = format;
	      }
	    }

	    return format;
	  };
	};

	var __extends$1 = undefined && undefined.__extends || function () {
	  var _extendStatics = function extendStatics(d, b) {
	    _extendStatics = Object.setPrototypeOf || {
	      __proto__: []
	    } instanceof Array && function (d, b) {
	      d.__proto__ = b;
	    } || function (d, b) {
	      for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	      }
	    };

	    return _extendStatics(d, b);
	  };

	  return function (d, b) {
	    _extendStatics(d, b);

	    function __() {
	      this.constructor = d;
	    }

	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	  };
	}();

	var __spreadArrays$2 = undefined && undefined.__spreadArrays || function () {
	  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
	    s += arguments[i].length;
	  }

	  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
	    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
	      r[k] = a[j];
	    }
	  }

	  return r;
	};

	var FormatError =
	/** @class */
	function (_super) {
	  __extends$1(FormatError, _super);

	  function FormatError(msg, variableId) {
	    var _this = _super.call(this, msg) || this;

	    _this.variableId = variableId;
	    return _this;
	  }

	  return FormatError;
	}(Error);

	function mergeLiteral(parts) {
	  if (parts.length < 2) {
	    return parts;
	  }

	  return parts.reduce(function (all, part) {
	    var lastPart = all[all.length - 1];

	    if (!lastPart || lastPart.type !== 0
	    /* literal */
	    || part.type !== 0
	    /* literal */
	    ) {
	        all.push(part);
	      } else {
	      lastPart.value += part.value;
	    }

	    return all;
	  }, []);
	} // TODO(skeleton): add skeleton support


	function formatToParts(els, locales, formatters, formats, values, currentPluralValue, // For debugging
	originalMessage) {
	  // Hot path for straight simple msg translations
	  if (els.length === 1 && isLiteralElement(els[0])) {
	    return [{
	      type: 0
	      /* literal */
	      ,
	      value: els[0].value
	    }];
	  }

	  var result = [];

	  for (var _i = 0, els_1 = els; _i < els_1.length; _i++) {
	    var el = els_1[_i]; // Exit early for string parts.

	    if (isLiteralElement(el)) {
	      result.push({
	        type: 0
	        /* literal */
	        ,
	        value: el.value
	      });
	      continue;
	    } // TODO: should this part be literal type?
	    // Replace `#` in plural rules with the actual numeric value.


	    if (isPoundElement(el)) {
	      if (typeof currentPluralValue === 'number') {
	        result.push({
	          type: 0
	          /* literal */
	          ,
	          value: formatters.getNumberFormat(locales).format(currentPluralValue)
	        });
	      }

	      continue;
	    }

	    var varName = el.value; // Enforce that all required values are provided by the caller.

	    if (!(values && varName in values)) {
	      throw new FormatError("The intl string context variable \"" + varName + "\" was not provided to the string \"" + originalMessage + "\"");
	    }

	    var value = values[varName];

	    if (isArgumentElement(el)) {
	      if (!value || typeof value === 'string' || typeof value === 'number') {
	        value = typeof value === 'string' || typeof value === 'number' ? String(value) : '';
	      }

	      result.push({
	        type: 1
	        /* argument */
	        ,
	        value: value
	      });
	      continue;
	    } // Recursively format plural and select parts' option — which can be a
	    // nested pattern structure. The choosing of the option to use is
	    // abstracted-by and delegated-to the part helper object.


	    if (isDateElement(el)) {
	      var style = typeof el.style === 'string' ? formats.date[el.style] : undefined;
	      result.push({
	        type: 0
	        /* literal */
	        ,
	        value: formatters.getDateTimeFormat(locales, style).format(value)
	      });
	      continue;
	    }

	    if (isTimeElement(el)) {
	      var style = typeof el.style === 'string' ? formats.time[el.style] : isDateTimeSkeleton(el.style) ? parseDateTimeSkeleton(el.style.pattern) : undefined;
	      result.push({
	        type: 0
	        /* literal */
	        ,
	        value: formatters.getDateTimeFormat(locales, style).format(value)
	      });
	      continue;
	    }

	    if (isNumberElement(el)) {
	      var style = typeof el.style === 'string' ? formats.number[el.style] : isNumberSkeleton(el.style) ? convertNumberSkeletonToNumberFormatOptions(el.style.tokens) : undefined;
	      result.push({
	        type: 0
	        /* literal */
	        ,
	        value: formatters.getNumberFormat(locales, style).format(value)
	      });
	      continue;
	    }

	    if (isSelectElement(el)) {
	      var opt = el.options[value] || el.options.other;

	      if (!opt) {
	        throw new RangeError("Invalid values for \"" + el.value + "\": \"" + value + "\". Options are \"" + Object.keys(el.options).join('", "') + "\"");
	      }

	      result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values));
	      continue;
	    }

	    if (isPluralElement(el)) {
	      var opt = el.options["=" + value];

	      if (!opt) {
	        if (!Intl.PluralRules) {
	          throw new FormatError("Intl.PluralRules is not available in this environment.\nTry polyfilling it using \"@formatjs/intl-pluralrules\"\n");
	        }

	        var rule = formatters.getPluralRules(locales, {
	          type: el.pluralType
	        }).select(value - (el.offset || 0));
	        opt = el.options[rule] || el.options.other;
	      }

	      if (!opt) {
	        throw new RangeError("Invalid values for \"" + el.value + "\": \"" + value + "\". Options are \"" + Object.keys(el.options).join('", "') + "\"");
	      }

	      result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values, value - (el.offset || 0)));
	      continue;
	    }
	  }

	  return mergeLiteral(result);
	}
	function formatToString(els, locales, formatters, formats, values, // For debugging
	originalMessage) {
	  var parts = formatToParts(els, locales, formatters, formats, values, undefined, originalMessage); // Hot path for straight simple msg translations

	  if (parts.length === 1) {
	    return parts[0].value;
	  }

	  return parts.reduce(function (all, part) {
	    return all += part.value;
	  }, '');
	} // Singleton

	var domParser;
	var TOKEN_DELIMITER = '@@';
	var TOKEN_REGEX = /@@(\d+_\d+)@@/g;
	var counter$1 = 0;

	function generateId() {
	  return Date.now() + "_" + ++counter$1;
	}

	function restoreRichPlaceholderMessage(text, objectParts) {
	  return text.split(TOKEN_REGEX).filter(Boolean).map(function (c) {
	    return objectParts[c] != null ? objectParts[c] : c;
	  }).reduce(function (all, c) {
	    if (!all.length) {
	      all.push(c);
	    } else if (typeof c === 'string' && typeof all[all.length - 1] === 'string') {
	      all[all.length - 1] += c;
	    } else {
	      all.push(c);
	    }

	    return all;
	  }, []);
	}
	/**
	 * Not exhaustive, just for sanity check
	 */


	var SIMPLE_XML_REGEX = /(<([0-9a-zA-Z-_]*?)>(.*?)<\/([0-9a-zA-Z-_]*?)>)|(<[0-9a-zA-Z-_]*?\/>)/;
	var TEMPLATE_ID = Date.now() + '@@';
	var VOID_ELEMENTS = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

	function formatHTMLElement(el, objectParts, values) {
	  var tagName = el.tagName;
	  var outerHTML = el.outerHTML,
	      textContent = el.textContent,
	      childNodes = el.childNodes; // Regular text

	  if (!tagName) {
	    return restoreRichPlaceholderMessage(textContent || '', objectParts);
	  }

	  tagName = tagName.toLowerCase();
	  var isVoidElement = ~VOID_ELEMENTS.indexOf(tagName);
	  var formatFnOrValue = values[tagName];

	  if (formatFnOrValue && isVoidElement) {
	    throw new FormatError(tagName + " is a self-closing tag and can not be used, please use another tag name.");
	  }

	  if (!childNodes.length) {
	    return [outerHTML];
	  }

	  var chunks = Array.prototype.slice.call(childNodes).reduce(function (all, child) {
	    return all.concat(formatHTMLElement(child, objectParts, values));
	  }, []); // Legacy HTML

	  if (!formatFnOrValue) {
	    return __spreadArrays$2(["<" + tagName + ">"], chunks, ["</" + tagName + ">"]);
	  } // HTML Tag replacement


	  if (typeof formatFnOrValue === 'function') {
	    return [formatFnOrValue.apply(void 0, chunks)];
	  }

	  return [formatFnOrValue];
	}

	function formatHTMLMessage(els, locales, formatters, formats, values, // For debugging
	originalMessage) {
	  var parts = formatToParts(els, locales, formatters, formats, values, undefined, originalMessage);
	  var objectParts = {};
	  var formattedMessage = parts.reduce(function (all, part) {
	    if (part.type === 0
	    /* literal */
	    ) {
	        return all += part.value;
	      }

	    var id = generateId();
	    objectParts[id] = part.value;
	    return all += "" + TOKEN_DELIMITER + id + TOKEN_DELIMITER;
	  }, ''); // Not designed to filter out aggressively

	  if (!SIMPLE_XML_REGEX.test(formattedMessage)) {
	    return restoreRichPlaceholderMessage(formattedMessage, objectParts);
	  }

	  if (!values) {
	    throw new FormatError('Message has placeholders but no values was given');
	  }

	  if (typeof DOMParser === 'undefined') {
	    throw new FormatError('Cannot format XML message without DOMParser');
	  }

	  if (!domParser) {
	    domParser = new DOMParser();
	  }

	  var content = domParser.parseFromString("<formatted-message id=\"" + TEMPLATE_ID + "\">" + formattedMessage + "</formatted-message>", 'text/html').getElementById(TEMPLATE_ID);

	  if (!content) {
	    throw new FormatError("Malformed HTML message " + formattedMessage);
	  }

	  var tagsToFormat = Object.keys(values).filter(function (varName) {
	    return !!content.getElementsByTagName(varName).length;
	  }); // No tags to format

	  if (!tagsToFormat.length) {
	    return restoreRichPlaceholderMessage(formattedMessage, objectParts);
	  }

	  var caseSensitiveTags = tagsToFormat.filter(function (tagName) {
	    return tagName !== tagName.toLowerCase();
	  });

	  if (caseSensitiveTags.length) {
	    throw new FormatError("HTML tag must be lowercased but the following tags are not: " + caseSensitiveTags.join(', '));
	  } // We're doing this since top node is `<formatted-message/>` which does not have a formatter


	  return Array.prototype.slice.call(content.childNodes).reduce(function (all, child) {
	    return all.concat(formatHTMLElement(child, objectParts, values));
	  }, []);
	}

	/*
	Copyright (c) 2014, Yahoo! Inc. All rights reserved.
	Copyrights licensed under the New BSD License.
	See the accompanying LICENSE file for terms.
	*/
	var __assign$2 = window && window.__assign || function () {
	  __assign$2 = Object.assign || function (t) {
	    for (var s, i = 1, n = arguments.length; i < n; i++) {
	      s = arguments[i];

	      for (var p in s) {
	        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	      }
	    }

	    return t;
	  };

	  return __assign$2.apply(this, arguments);
	};

	function mergeConfig(c1, c2) {
	  if (!c2) {
	    return c1;
	  }

	  return __assign$2(__assign$2(__assign$2({}, c1 || {}), c2 || {}), Object.keys(c1).reduce(function (all, k) {
	    all[k] = __assign$2(__assign$2({}, c1[k]), c2[k] || {});
	    return all;
	  }, {}));
	}

	function mergeConfigs(defaultConfig, configs) {
	  if (!configs) {
	    return defaultConfig;
	  }

	  return Object.keys(defaultConfig).reduce(function (all, k) {
	    all[k] = mergeConfig(defaultConfig[k], configs[k]);
	    return all;
	  }, __assign$2({}, defaultConfig));
	}

	function createDefaultFormatters(cache) {
	  if (cache === void 0) {
	    cache = {
	      number: {},
	      dateTime: {},
	      pluralRules: {}
	    };
	  }

	  return {
	    getNumberFormat: memoizeFormatConstructor(Intl.NumberFormat, cache.number),
	    getDateTimeFormat: memoizeFormatConstructor(Intl.DateTimeFormat, cache.dateTime),
	    getPluralRules: memoizeFormatConstructor(Intl.PluralRules, cache.pluralRules)
	  };
	}

	var IntlMessageFormat =
	/** @class */
	function () {
	  function IntlMessageFormat(message, locales, overrideFormats, opts) {
	    var _this = this;

	    if (locales === void 0) {
	      locales = IntlMessageFormat.defaultLocale;
	    }

	    this.formatterCache = {
	      number: {},
	      dateTime: {},
	      pluralRules: {}
	    };

	    this.format = function (values) {
	      return formatToString(_this.ast, _this.locales, _this.formatters, _this.formats, values, _this.message);
	    };

	    this.formatToParts = function (values) {
	      return formatToParts(_this.ast, _this.locales, _this.formatters, _this.formats, values, undefined, _this.message);
	    };

	    this.formatHTMLMessage = function (values) {
	      return formatHTMLMessage(_this.ast, _this.locales, _this.formatters, _this.formats, values, _this.message);
	    };

	    this.resolvedOptions = function () {
	      return {
	        locale: Intl.NumberFormat.supportedLocalesOf(_this.locales)[0]
	      };
	    };

	    this.getAst = function () {
	      return _this.ast;
	    };

	    if (typeof message === 'string') {
	      this.message = message;

	      if (!IntlMessageFormat.__parse) {
	        throw new TypeError('IntlMessageFormat.__parse must be set to process `message` of type `string`');
	      } // Parse string messages into an AST.


	      this.ast = IntlMessageFormat.__parse(message, {
	        normalizeHashtagInPlural: false
	      });
	    } else {
	      this.ast = message;
	    }

	    if (!Array.isArray(this.ast)) {
	      throw new TypeError('A message must be provided as a String or AST.');
	    } // Creates a new object with the specified `formats` merged with the default
	    // formats.


	    this.formats = mergeConfigs(IntlMessageFormat.formats, overrideFormats); // Defined first because it's used to build the format pattern.

	    this.locales = locales;
	    this.formatters = opts && opts.formatters || createDefaultFormatters(this.formatterCache);
	  }

	  IntlMessageFormat.defaultLocale = new Intl.NumberFormat().resolvedOptions().locale;
	  IntlMessageFormat.__parse = parse; // Default format options used as the prototype of the `formats` provided to the
	  // constructor. These are used when constructing the internal Intl.NumberFormat
	  // and Intl.DateTimeFormat instances.

	  IntlMessageFormat.formats = {
	    number: {
	      currency: {
	        style: 'currency'
	      },
	      percent: {
	        style: 'percent'
	      }
	    },
	    date: {
	      short: {
	        month: 'numeric',
	        day: 'numeric',
	        year: '2-digit'
	      },
	      medium: {
	        month: 'short',
	        day: 'numeric',
	        year: 'numeric'
	      },
	      long: {
	        month: 'long',
	        day: 'numeric',
	        year: 'numeric'
	      },
	      full: {
	        weekday: 'long',
	        month: 'long',
	        day: 'numeric',
	        year: 'numeric'
	      }
	    },
	    time: {
	      short: {
	        hour: 'numeric',
	        minute: 'numeric'
	      },
	      medium: {
	        hour: 'numeric',
	        minute: 'numeric',
	        second: 'numeric'
	      },
	      long: {
	        hour: 'numeric',
	        minute: 'numeric',
	        second: 'numeric',
	        timeZoneName: 'short'
	      },
	      full: {
	        hour: 'numeric',
	        minute: 'numeric',
	        second: 'numeric',
	        timeZoneName: 'short'
	      }
	    }
	  };
	  return IntlMessageFormat;
	}();

	/*
	Copyright (c) 2014, Yahoo! Inc. All rights reserved.
	Copyrights licensed under the New BSD License.
	See the accompanying LICENSE file for terms.
	*/

	var o = function o(n) {
	  var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
	  var t = {};

	  for (var _r in n) {
	    var _i = e + _r;

	    "object" == _typeof(n[_r]) ? Object.assign(t, o(n[_r], "".concat(_i, "."))) : t[_i] = n[_r];
	  }

	  return t;
	};

	var r;
	var i = writable({});

	function a(n) {
	  return n in r;
	}

	function l(n, e) {
	  if (a(n)) {
	    var _t = function (n) {
	      return r[n] || null;
	    }(n);

	    if (e in _t) return _t[e];
	  }

	  return null;
	}

	function s(n) {
	  for (var _len = arguments.length, e = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    e[_key - 1] = arguments[_key];
	  }

	  var t = e.map(function (n) {
	    return o(n);
	  });
	  i.update(function (e) {
	    return e[n] = Object.assign.apply(Object, [e[n] || {}].concat(_toConsumableArray(t))), e;
	  });
	}

	var c = derived([i], function (_ref) {
	  var _ref2 = _slicedToArray(_ref, 1),
	      n = _ref2[0];

	  return Object.keys(n);
	});
	i.subscribe(function (n) {
	  return r = n;
	});
	var u = {};

	function m(n) {
	  return u[n];
	}

	function f$8(n) {
	  return E(n).reverse().some(m);
	}

	var d = {};

	function w(n) {
	  if (!f$8(n)) return;
	  if (n in d) return d[n];

	  var e = function (n) {
	    return E(n).reverse().map(function (n) {
	      var e = m(n);
	      return [n, e ? _toConsumableArray(e) : []];
	    }).filter(function (_ref3) {
	      var _ref4 = _slicedToArray(_ref3, 2),
	          n = _ref4[1];

	      return n.length > 0;
	    });
	  }(n);

	  return 0 !== e.length ? (d[n] = Promise.all(e.map(function (_ref5) {
	    var _ref6 = _slicedToArray(_ref5, 2),
	        n = _ref6[0],
	        e = _ref6[1];

	    return Promise.all(e.map(function (n) {
	      return n();
	    })).then(function (e) {
	      !function (n) {
	        delete u[n];
	      }(n), e = e.map(function (n) {
	        return n.default || n;
	      }), s.apply(void 0, [n].concat(_toConsumableArray(e)));
	    });
	  })).then(function () {
	    delete d[n];
	  }), d[n]) : void 0;
	}
	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0

	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.

	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */


	function p(n, e) {
	  var t = {};

	  for (var o in n) {
	    Object.prototype.hasOwnProperty.call(n, o) && e.indexOf(o) < 0 && (t[o] = n[o]);
	  }

	  if (null != n && "function" == typeof Object.getOwnPropertySymbols) {
	    var r = 0;

	    for (o = Object.getOwnPropertySymbols(n); r < o.length; r++) {
	      e.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(n, o[r]) && (t[o[r]] = n[o[r]]);
	    }
	  }

	  return t;
	}

	var b = {
	  fallbackLocale: null,
	  initialLocale: null,
	  loadingDelay: 200,
	  formats: {
	    number: {
	      scientific: {
	        notation: "scientific"
	      },
	      engineering: {
	        notation: "engineering"
	      },
	      compactLong: {
	        notation: "compact",
	        compactDisplay: "long"
	      },
	      compactShort: {
	        notation: "compact",
	        compactDisplay: "short"
	      }
	    },
	    date: {
	      short: {
	        month: "numeric",
	        day: "numeric",
	        year: "2-digit"
	      },
	      medium: {
	        month: "short",
	        day: "numeric",
	        year: "numeric"
	      },
	      long: {
	        month: "long",
	        day: "numeric",
	        year: "numeric"
	      },
	      full: {
	        weekday: "long",
	        month: "long",
	        day: "numeric",
	        year: "numeric"
	      }
	    },
	    time: {
	      short: {
	        hour: "numeric",
	        minute: "numeric"
	      },
	      medium: {
	        hour: "numeric",
	        minute: "numeric",
	        second: "numeric"
	      },
	      long: {
	        hour: "numeric",
	        minute: "numeric",
	        second: "numeric",
	        timeZoneName: "short"
	      },
	      full: {
	        hour: "numeric",
	        minute: "numeric",
	        second: "numeric",
	        timeZoneName: "short"
	      }
	    }
	  },
	  warnOnMissingMessages: !0
	};

	function h() {
	  return b;
	}

	var O = writable(!1);
	var v;
	var j$2 = writable(null);

	function L(n, e) {
	  return 0 === e.indexOf(n) && n !== e;
	}

	function k(n, e) {
	  return n === e || L(n, e) || L(e, n);
	}

	function x(n) {
	  var e = n.lastIndexOf("-");
	  if (e > 0) return n.slice(0, e);

	  var _h = h(),
	      t = _h.fallbackLocale;

	  return t && !k(n, t) ? t : null;
	}

	function E(n) {
	  var e = n.split("-").map(function (n, e, t) {
	    return t.slice(0, e + 1).join("-");
	  }),
	      _h2 = h(),
	      t = _h2.fallbackLocale;

	  return t && !k(n, t) ? e.concat(E(t)) : e;
	}

	function $$1() {
	  return v;
	}

	j$2.subscribe(function (n) {
	  v = n, "undefined" != typeof window && document.documentElement.setAttribute("lang", n);
	});
	var D = j$2.set;
	j$2.set = function (n) {
	  if (function n(e) {
	    return null == e || a(e) ? e : n(x(e));
	  }(n) && f$8(n)) {
	    var _e = h().loadingDelay;

	    var _t2;

	    return "undefined" != typeof window && null != $$1() && _e ? _t2 = window.setTimeout(function () {
	      return O.set(!0);
	    }, _e) : O.set(!0), w(n).then(function () {
	      D(n);
	    }).finally(function () {
	      clearTimeout(_t2), O.set(!1);
	    });
	  }

	  return D(n);
	}, j$2.update = function (n) {
	  return D(n(v));
	};

	var F = {},
	    Z = function Z(n, e) {
	  if (null == e) return null;
	  var t = l(e, n);
	  return t || Z(n, x(e));
	},
	    C = function C(n, e) {
	  if (e in F && n in F[e]) return F[e][n];
	  var t = Z(n, e);
	  return t ? function (n, e, t) {
	    return t ? (e in F || (F[e] = {}), n in F[e] || (F[e][n] = t), t) : t;
	  }(n, e, t) : null;
	},
	    J = function J(n) {
	  var e = Object.create(null);
	  return function (t) {
	    var o = JSON.stringify(t);
	    return o in e ? e[o] : e[o] = n(t);
	  };
	},
	    U = function U(n, e) {
	  var t = h().formats;
	  if (n in t && e in t[n]) return t[n][e];
	  throw new Error("[svelte-i18n] Unknown \"".concat(e, "\" ").concat(n, " format."));
	},
	    _ = J(function (n) {
	  var e = n.locale,
	      t = n.format,
	      o = p(n, ["locale", "format"]);
	  if (null == e) throw new Error('[svelte-i18n] A "locale" must be set to format numbers');
	  return t && (o = U("number", t)), new Intl.NumberFormat(e, o);
	}),
	    q = J(function (n) {
	  var e = n.locale,
	      t = n.format,
	      o = p(n, ["locale", "format"]);
	  if (null == e) throw new Error('[svelte-i18n] A "locale" must be set to format dates');
	  return t ? o = U("date", t) : 0 === Object.keys(o).length && (o = U("date", "short")), new Intl.DateTimeFormat(e, o);
	}),
	    z = J(function (n) {
	  var e = n.locale,
	      t = n.format,
	      o = p(n, ["locale", "format"]);
	  if (null == e) throw new Error('[svelte-i18n] A "locale" must be set to format time values');
	  return t ? o = U("time", t) : 0 === Object.keys(o).length && (o = U("time", "short")), new Intl.DateTimeFormat(e, o);
	}),
	    B = function B() {
	  var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var _n$locale = n.locale,
	      e = _n$locale === void 0 ? $$1() : _n$locale,
	      t = p(n, ["locale"]);
	  return _(Object.assign({
	    locale: e
	  }, t));
	},
	    G = function G() {
	  var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var _n$locale2 = n.locale,
	      e = _n$locale2 === void 0 ? $$1() : _n$locale2,
	      t = p(n, ["locale"]);
	  return q(Object.assign({
	    locale: e
	  }, t));
	},
	    H = function H() {
	  var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var _n$locale3 = n.locale,
	      e = _n$locale3 === void 0 ? $$1() : _n$locale3,
	      t = p(n, ["locale"]);
	  return z(Object.assign({
	    locale: e
	  }, t));
	},
	    K = J(function (n) {
	  var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : $$1();
	  return new IntlMessageFormat(n, e, h().formats);
	}),
	    Q = function Q(n) {
	  var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  "object" == _typeof(n) && (n = (e = n).id);
	  var _e2 = e,
	      t = _e2.values,
	      _e2$locale = _e2.locale,
	      o = _e2$locale === void 0 ? $$1() : _e2$locale,
	      r = _e2.default;
	  if (null == o) throw new Error("[svelte-i18n] Cannot format a message without first setting the initial locale.");
	  var i = C(n, o);
	  return i ? t ? K(i, o).format(t) : i : (h().warnOnMissingMessages && console.warn("[svelte-i18n] The message \"".concat(n, "\" was not found in \"").concat(E(o).join('", "'), "\".").concat(f$8($$1()) ? "\n\nNote: there are at least one loader still registered to this locale that wasn't executed." : "")), r || n);
	},
	    R = function R(n, e) {
	  return H(e).format(n);
	},
	    V = function V(n, e) {
	  return G(e).format(n);
	},
	    W = function W(n, e) {
	  return B(e).format(n);
	},
	    X = derived([j$2, i], function () {
	  return Q;
	}),
	    Y = derived([j$2], function () {
	  return R;
	}),
	    nn = derived([j$2], function () {
	  return V;
	}),
	    en = derived([j$2], function () {
	  return W;
	});

	var MESSAGE_FILE_URL_TEMPLATE = '/lang/{locale}.json';

	function setupI18n() {
	  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
	    withLocale: 'en'
	  },
	      _locale = _ref.withLocale;

	  var messsagesFileUrl = MESSAGE_FILE_URL_TEMPLATE.replace('{locale}', _locale);
	  return fetch(messsagesFileUrl).then(function (response) {
	    return response.json();
	  }).then(function (messages) {
	    i.set(_defineProperty({}, _locale, messages));
	    j$2.set(_locale);
	  });
	}

	var isLocaleLoaded = derived(j$2, function ($locale) {
	  return typeof $locale === 'string';
	});

	function _createSuper$4(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$4()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	var file$1 = "src/components/TranslateButton.svelte";

	function create_fragment$3(ctx) {
	  var div;
	  var button;
	  var i;
	  var dispose;
	  var block = {
	    c: function create() {
	      div = element("div");
	      button = element("button");
	      i = element("i");
	      i.textContent = "g_translate";
	      attr_dev(i, "class", "material-icons");
	      add_location(i, file$1, 19, 4, 474);
	      attr_dev(button, "class", "btn-floating btn-large waves-effect waves-light red");
	      set_style(button, "margin-left", "20px");
	      add_location(button, file$1, 15, 2, 336);
	      attr_dev(div, "class", "fixed-action-btn");
	      add_location(div, file$1, 14, 0, 303);
	    },
	    l: function claim(nodes) {
	      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor, remount) {
	      insert_dev(target, div, anchor);
	      append_dev(div, button);
	      append_dev(button, i);
	      if (remount) dispose();
	      dispose = listen_dev(button, "click",
	      /*changeLanguage*/
	      ctx[0], false, false, false);
	    },
	    p: noop,
	    i: noop,
	    o: noop,
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(div);
	      dispose();
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$3.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function instance$3($$self, $$props, $$invalidate) {
	  var dispatch = createEventDispatcher();
	  var _$$props$value = $$props.value,
	      value = _$$props$value === void 0 ? "en" : _$$props$value;

	  function changeLanguage(event) {
	    if (value == "en") {
	      $$invalidate(1, value = "jp");
	    } else {
	      $$invalidate(1, value = "en");
	    }

	    dispatch("locale-changed", value);
	  }

	  var writable_props = ["value"];
	  Object.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<TranslateButton> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("TranslateButton", $$slots, []);

	  $$self.$set = function ($$props) {
	    if ("value" in $$props) $$invalidate(1, value = $$props.value);
	  };

	  $$self.$capture_state = function () {
	    return {
	      createEventDispatcher: createEventDispatcher,
	      dispatch: dispatch,
	      value: value,
	      changeLanguage: changeLanguage
	    };
	  };

	  $$self.$inject_state = function ($$props) {
	    if ("value" in $$props) $$invalidate(1, value = $$props.value);
	  };

	  if ($$props && "$$inject" in $$props) {
	    $$self.$inject_state($$props.$$inject);
	  }

	  return [changeLanguage, value];
	}

	var TranslateButton = /*#__PURE__*/function (_SvelteComponentDev) {
	  _inherits(TranslateButton, _SvelteComponentDev);

	  var _super = _createSuper$4(TranslateButton);

	  function TranslateButton(options) {
	    var _this;

	    _classCallCheck(this, TranslateButton);

	    _this = _super.call(this, options);
	    init(_assertThisInitialized(_this), options, instance$3, create_fragment$3, safe_not_equal, {
	      value: 1
	    });
	    dispatch_dev("SvelteRegisterComponent", {
	      component: _assertThisInitialized(_this),
	      tagName: "TranslateButton",
	      options: options,
	      id: create_fragment$3.name
	    });
	    return _this;
	  }

	  _createClass(TranslateButton, [{
	    key: "value",
	    get: function get() {
	      throw new Error("<TranslateButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    },
	    set: function set(value) {
	      throw new Error("<TranslateButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    }
	  }]);

	  return TranslateButton;
	}(SvelteComponentDev);

	var propertyIsEnumerable = objectPropertyIsEnumerable.f;

	// `Object.{ entries, values }` methods implementation
	var createMethod$5 = function (TO_ENTRIES) {
	  return function (it) {
	    var O = toIndexedObject(it);
	    var keys = objectKeys(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) {
	      key = keys[i++];
	      if (!descriptors || propertyIsEnumerable.call(O, key)) {
	        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
	      }
	    }
	    return result;
	  };
	};

	var objectToArray = {
	  // `Object.entries` method
	  // https://tc39.github.io/ecma262/#sec-object.entries
	  entries: createMethod$5(true),
	  // `Object.values` method
	  // https://tc39.github.io/ecma262/#sec-object.values
	  values: createMethod$5(false)
	};

	var $values = objectToArray.values;

	// `Object.values` method
	// https://tc39.github.io/ecma262/#sec-object.values
	_export({ target: 'Object', stat: true }, {
	  values: function values(O) {
	    return $values(O);
	  }
	});

	var cart = writable({});

	function _createSuper$5(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$5()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	var Object_1 = globals.Object;
	var file$2 = "src/components/CartButton.svelte";

	function create_fragment$4(ctx) {
	  var div;
	  var button;
	  var i;
	  var t1;
	  var t2;
	  var dispose;
	  var block = {
	    c: function create() {
	      div = element("div");
	      button = element("button");
	      i = element("i");
	      i.textContent = "shopping_cart";
	      t1 = space();
	      t2 = text(
	      /*cart_sum*/
	      ctx[0]);
	      attr_dev(i, "class", "material-icons");
	      add_location(i, file$2, 32, 4, 772);
	      attr_dev(button, "class", "btn-floating btn-large waves-effect waves-light red");
	      set_style(button, "margin-left", "20px");
	      set_style(button, "display", "flex");
	      set_style(button, "flex-direction", "right");
	      set_style(button, "color", "white");
	      set_style(button, "font-size", "21px");
	      set_style(button, "padding-right", "8px");
	      add_location(button, file$2, 27, 2, 544);
	      attr_dev(div, "class", "fixed-action-btn");
	      add_location(div, file$2, 26, 0, 511);
	    },
	    l: function claim(nodes) {
	      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor, remount) {
	      insert_dev(target, div, anchor);
	      append_dev(div, button);
	      append_dev(button, i);
	      append_dev(button, t1);
	      append_dev(button, t2);
	      if (remount) dispose();
	      dispose = listen_dev(button, "click", goToCheckout, false, false, false);
	    },
	    p: function update(ctx, _ref) {
	      var _ref2 = _slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      if (dirty &
	      /*cart_sum*/
	      1) set_data_dev(t2,
	      /*cart_sum*/
	      ctx[0]);
	    },
	    i: noop,
	    o: noop,
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(div);
	      dispose();
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$4.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function goToCheckout() {
	  navigate("/checkout", {
	    replace: true
	  });
	}

	function instance$4($$self, $$props, $$invalidate) {
	  var dispatch = createEventDispatcher();
	  var cart_sum = 0;
	  var unsubscribe = cart.subscribe(function (items) {
	    var itemValues = Object.values(items);
	    $$invalidate(0, cart_sum = 0);
	    itemValues.forEach(function (item) {
	      $$invalidate(0, cart_sum += item.count);
	    });
	  });
	  var writable_props = [];
	  Object_1.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<CartButton> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("CartButton", $$slots, []);

	  $$self.$capture_state = function () {
	    return {
	      cart: cart,
	      createEventDispatcher: createEventDispatcher,
	      navigate: navigate,
	      dispatch: dispatch,
	      cart_sum: cart_sum,
	      unsubscribe: unsubscribe,
	      goToCheckout: goToCheckout
	    };
	  };

	  $$self.$inject_state = function ($$props) {
	    if ("cart_sum" in $$props) $$invalidate(0, cart_sum = $$props.cart_sum);
	  };

	  if ($$props && "$$inject" in $$props) {
	    $$self.$inject_state($$props.$$inject);
	  }

	  return [cart_sum];
	}

	var CartButton = /*#__PURE__*/function (_SvelteComponentDev) {
	  _inherits(CartButton, _SvelteComponentDev);

	  var _super = _createSuper$5(CartButton);

	  function CartButton(options) {
	    var _this;

	    _classCallCheck(this, CartButton);

	    _this = _super.call(this, options);
	    init(_assertThisInitialized(_this), options, instance$4, create_fragment$4, safe_not_equal, {});
	    dispatch_dev("SvelteRegisterComponent", {
	      component: _assertThisInitialized(_this),
	      tagName: "CartButton",
	      options: options,
	      id: create_fragment$4.name
	    });
	    return _this;
	  }

	  return CartButton;
	}(SvelteComponentDev);

	function _createSuper$6(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$6()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

	function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
	var console_1 = globals.console;
	var file$3 = "src/components/ProductCard.svelte";

	function create_fragment$5(ctx) {
	  var div4;
	  var div3;
	  var div2;
	  var div0;
	  var img_1;
	  var img_1_src_value;
	  var t0;
	  var button;
	  var i;
	  var t2;
	  var div1;
	  var h5;
	  var t5;
	  var p;
	  var dispose;
	  var block = {
	    c: function create() {
	      div4 = element("div");
	      div3 = element("div");
	      div2 = element("div");
	      div0 = element("div");
	      img_1 = element("img");
	      t0 = space();
	      button = element("button");
	      i = element("i");
	      i.textContent = "add_shopping_cart";
	      t2 = space();
	      div1 = element("div");
	      h5 = element("h5");
	      h5.textContent = "".concat(
	      /*price*/
	      ctx[2], "\uFFE5");
	      t5 = space();
	      p = element("p");
	      p.textContent = "".concat(
	      /*name*/
	      ctx[1]);
	      if (img_1.src !== (img_1_src_value =
	      /*img*/
	      ctx[0])) attr_dev(img_1, "src", img_1_src_value);
	      add_location(img_1, file$3, 28, 8, 589);
	      attr_dev(i, "class", "material-icons");
	      add_location(i, file$3, 32, 10, 737);
	      attr_dev(button, "class", "btn-floating halfway-fab waves-effect waves-light red");
	      add_location(button, file$3, 29, 8, 615);
	      attr_dev(div0, "class", "card-image");
	      add_location(div0, file$3, 27, 6, 556);
	      add_location(h5, file$3, 36, 8, 857);
	      add_location(p, file$3, 37, 8, 883);
	      attr_dev(div1, "class", "card-content");
	      add_location(div1, file$3, 35, 6, 822);
	      attr_dev(div2, "class", "card hoverable");
	      add_location(div2, file$3, 26, 4, 521);
	      attr_dev(div3, "class", "row");
	      add_location(div3, file$3, 25, 2, 499);
	      attr_dev(div4, "class", "col s4");
	      add_location(div4, file$3, 24, 0, 476);
	    },
	    l: function claim(nodes) {
	      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor, remount) {
	      insert_dev(target, div4, anchor);
	      append_dev(div4, div3);
	      append_dev(div3, div2);
	      append_dev(div2, div0);
	      append_dev(div0, img_1);
	      append_dev(div0, t0);
	      append_dev(div0, button);
	      append_dev(button, i);
	      append_dev(div2, t2);
	      append_dev(div2, div1);
	      append_dev(div1, h5);
	      append_dev(div1, t5);
	      append_dev(div1, p);
	      if (remount) dispose();
	      dispose = listen_dev(button, "click",
	      /*addToCart*/
	      ctx[3], false, false, false);
	    },
	    p: function update(ctx, _ref) {
	      var _ref2 = _slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      if (dirty &
	      /*img*/
	      1 && img_1.src !== (img_1_src_value =
	      /*img*/
	      ctx[0])) {
	        attr_dev(img_1, "src", img_1_src_value);
	      }
	    },
	    i: noop,
	    o: noop,
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(div4);
	      dispose();
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$5.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function instance$5($$self, $$props, $$invalidate) {
	  var item = $$props.item;
	  var _item = item,
	      img = _item.img,
	      name = _item.name,
	      price = _item.price,
	      sku = _item.sku;
	  img = "img/".concat(img);
	  var cartItems = get_store_value(cart);
	  var inCart = cartItems[name] ? cartItems[name].count : 0;

	  function addToCart() {
	    inCart++;
	    cart.update(function (n) {
	      return _objectSpread$1({}, n, _defineProperty({}, name, _objectSpread$1({}, item, {
	        count: inCart
	      })));
	    });
	    console.log(inCart);
	    console.log(item);
	  }

	  var writable_props = ["item"];
	  Object.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn("<ProductCard> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("ProductCard", $$slots, []);

	  $$self.$set = function ($$props) {
	    if ("item" in $$props) $$invalidate(4, item = $$props.item);
	  };

	  $$self.$capture_state = function () {
	    return {
	      get: get_store_value,
	      cart: cart,
	      item: item,
	      img: img,
	      name: name,
	      price: price,
	      sku: sku,
	      cartItems: cartItems,
	      inCart: inCart,
	      addToCart: addToCart
	    };
	  };

	  $$self.$inject_state = function ($$props) {
	    if ("item" in $$props) $$invalidate(4, item = $$props.item);
	    if ("img" in $$props) $$invalidate(0, img = $$props.img);
	    if ("name" in $$props) $$invalidate(1, name = $$props.name);
	    if ("price" in $$props) $$invalidate(2, price = $$props.price);
	    if ("sku" in $$props) sku = $$props.sku;
	    if ("inCart" in $$props) inCart = $$props.inCart;
	  };

	  if ($$props && "$$inject" in $$props) {
	    $$self.$inject_state($$props.$$inject);
	  }

	  return [img, name, price, addToCart, item];
	}

	var ProductCard = /*#__PURE__*/function (_SvelteComponentDev) {
	  _inherits(ProductCard, _SvelteComponentDev);

	  var _super = _createSuper$6(ProductCard);

	  function ProductCard(options) {
	    var _this;

	    _classCallCheck(this, ProductCard);

	    _this = _super.call(this, options);
	    init(_assertThisInitialized(_this), options, instance$5, create_fragment$5, safe_not_equal, {
	      item: 4
	    });
	    dispatch_dev("SvelteRegisterComponent", {
	      component: _assertThisInitialized(_this),
	      tagName: "ProductCard",
	      options: options,
	      id: create_fragment$5.name
	    });
	    var ctx = _this.$$.ctx;
	    var props = options.props || {};

	    if (
	    /*item*/
	    ctx[4] === undefined && !("item" in props)) {
	      console_1.warn("<ProductCard> was created without expected prop 'item'");
	    }

	    return _this;
	  }

	  _createClass(ProductCard, [{
	    key: "item",
	    get: function get() {
	      throw new Error("<ProductCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    },
	    set: function set(value) {
	      throw new Error("<ProductCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    }
	  }]);

	  return ProductCard;
	}(SvelteComponentDev);

	var items = [{
	  name: 'Golden Bamboo Watch',
	  price: '5,000,000',
	  img: 'watch-bamboo.jpg',
	  sku: null
	}, {
	  name: 'Thinkpad USB C充電端末',
	  price: '2000',
	  img: 'usb-c.jpg',
	  sku: 'sku_HK3pP3oL6bi9Uf'
	}];

	function _createSuper$7(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$7()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	var file$4 = "src/components/CardWrapper.svelte";

	function get_each_context(ctx, list, i) {
	  var child_ctx = ctx.slice();
	  child_ctx[0] = list[i];
	  return child_ctx;
	} // (10:2) {#each items as item}


	function create_each_block(ctx) {
	  var current;
	  var card = new ProductCard({
	    props: {
	      item:
	      /*item*/
	      ctx[0]
	    },
	    $$inline: true
	  });
	  var block = {
	    c: function create() {
	      create_component(card.$$.fragment);
	    },
	    m: function mount(target, anchor) {
	      mount_component(card, target, anchor);
	      current = true;
	    },
	    p: noop,
	    i: function intro(local) {
	      if (current) return;
	      transition_in(card.$$.fragment, local);
	      current = true;
	    },
	    o: function outro(local) {
	      transition_out(card.$$.fragment, local);
	      current = false;
	    },
	    d: function destroy(detaching) {
	      destroy_component(card, detaching);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_each_block.name,
	    type: "each",
	    source: "(10:2) {#each items as item}",
	    ctx: ctx
	  });
	  return block;
	}

	function create_fragment$6(ctx) {
	  var div;
	  var current;
	  var each_value = items;
	  validate_each_argument(each_value);
	  var each_blocks = [];

	  for (var i = 0; i < each_value.length; i += 1) {
	    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	  }

	  var out = function out(i) {
	    return transition_out(each_blocks[i], 1, 1, function () {
	      each_blocks[i] = null;
	    });
	  };

	  var block = {
	    c: function create() {
	      div = element("div");

	      for (var _i = 0; _i < each_blocks.length; _i += 1) {
	        each_blocks[_i].c();
	      }

	      attr_dev(div, "class", "row");
	      add_location(div, file$4, 8, 0, 128);
	    },
	    l: function claim(nodes) {
	      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor) {
	      insert_dev(target, div, anchor);

	      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
	        each_blocks[_i2].m(div, null);
	      }

	      current = true;
	    },
	    p: function update(ctx, _ref) {
	      var _ref2 = _slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      if (dirty &
	      /*items*/
	      0) {
	        each_value = items;
	        validate_each_argument(each_value);

	        var _i3;

	        for (_i3 = 0; _i3 < each_value.length; _i3 += 1) {
	          var child_ctx = get_each_context(ctx, each_value, _i3);

	          if (each_blocks[_i3]) {
	            each_blocks[_i3].p(child_ctx, dirty);

	            transition_in(each_blocks[_i3], 1);
	          } else {
	            each_blocks[_i3] = create_each_block(child_ctx);

	            each_blocks[_i3].c();

	            transition_in(each_blocks[_i3], 1);

	            each_blocks[_i3].m(div, null);
	          }
	        }

	        group_outros();

	        for (_i3 = each_value.length; _i3 < each_blocks.length; _i3 += 1) {
	          out(_i3);
	        }

	        check_outros();
	      }
	    },
	    i: function intro(local) {
	      if (current) return;

	      for (var _i4 = 0; _i4 < each_value.length; _i4 += 1) {
	        transition_in(each_blocks[_i4]);
	      }

	      current = true;
	    },
	    o: function outro(local) {
	      each_blocks = each_blocks.filter(Boolean);

	      for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
	        transition_out(each_blocks[_i5]);
	      }

	      current = false;
	    },
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(div);
	      destroy_each(each_blocks, detaching);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$6.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function instance$6($$self, $$props, $$invalidate) {
	  var writable_props = [];
	  Object.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<CardWrapper> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("CardWrapper", $$slots, []);

	  $$self.$capture_state = function () {
	    return {
	      Card: ProductCard,
	      items: items
	    };
	  };

	  return [];
	}

	var CardWrapper = /*#__PURE__*/function (_SvelteComponentDev) {
	  _inherits(CardWrapper, _SvelteComponentDev);

	  var _super = _createSuper$7(CardWrapper);

	  function CardWrapper(options) {
	    var _this;

	    _classCallCheck(this, CardWrapper);

	    _this = _super.call(this, options);
	    init(_assertThisInitialized(_this), options, instance$6, create_fragment$6, safe_not_equal, {});
	    dispatch_dev("SvelteRegisterComponent", {
	      component: _assertThisInitialized(_this),
	      tagName: "CardWrapper",
	      options: options,
	      id: create_fragment$6.name
	    });
	    return _this;
	  }

	  return CardWrapper;
	}(SvelteComponentDev);

	function _createSuper$8(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$8()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	var file$5 = "src/pages/Home.svelte";

	function create_fragment$7(ctx) {
	  var t0;
	  var t1;
	  var div;
	  var current;
	  var translatebutton = new TranslateButton({
	    props: {
	      value:
	      /*$locale*/
	      ctx[0]
	    },
	    $$inline: true
	  });
	  translatebutton.$on("locale-changed",
	  /*locale_changed_handler*/
	  ctx[1]);
	  var cartbutton = new CartButton({
	    $$inline: true
	  });
	  var cardwrapper = new CardWrapper({
	    $$inline: true
	  });
	  var block = {
	    c: function create() {
	      create_component(translatebutton.$$.fragment);
	      t0 = space();
	      create_component(cartbutton.$$.fragment);
	      t1 = space();
	      div = element("div");
	      create_component(cardwrapper.$$.fragment);
	      attr_dev(div, "class", "container");
	      set_style(div, "margin-top", "10px");
	      add_location(div, file$5, 13, 0, 463);
	    },
	    l: function claim(nodes) {
	      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor) {
	      mount_component(translatebutton, target, anchor);
	      insert_dev(target, t0, anchor);
	      mount_component(cartbutton, target, anchor);
	      insert_dev(target, t1, anchor);
	      insert_dev(target, div, anchor);
	      mount_component(cardwrapper, div, null);
	      current = true;
	    },
	    p: function update(ctx, _ref) {
	      var _ref2 = _slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      var translatebutton_changes = {};
	      if (dirty &
	      /*$locale*/
	      1) translatebutton_changes.value =
	      /*$locale*/
	      ctx[0];
	      translatebutton.$set(translatebutton_changes);
	    },
	    i: function intro(local) {
	      if (current) return;
	      transition_in(translatebutton.$$.fragment, local);
	      transition_in(cartbutton.$$.fragment, local);
	      transition_in(cardwrapper.$$.fragment, local);
	      current = true;
	    },
	    o: function outro(local) {
	      transition_out(translatebutton.$$.fragment, local);
	      transition_out(cartbutton.$$.fragment, local);
	      transition_out(cardwrapper.$$.fragment, local);
	      current = false;
	    },
	    d: function destroy(detaching) {
	      destroy_component(translatebutton, detaching);
	      if (detaching) detach_dev(t0);
	      destroy_component(cartbutton, detaching);
	      if (detaching) detach_dev(t1);
	      if (detaching) detach_dev(div);
	      destroy_component(cardwrapper);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$7.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function instance$7($$self, $$props, $$invalidate) {
	  var $locale;
	  validate_store(j$2, "locale");
	  component_subscribe($$self, j$2, function ($$value) {
	    return $$invalidate(0, $locale = $$value);
	  });
	  var writable_props = [];
	  Object.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Home> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("Home", $$slots, []);

	  var locale_changed_handler = function locale_changed_handler(e) {
	    return setupI18n({
	      withLocale: e.detail
	    });
	  };

	  $$self.$capture_state = function () {
	    return {
	      setupI18n: setupI18n,
	      isLocaleLoaded: isLocaleLoaded,
	      locale: j$2,
	      TranslateButton: TranslateButton,
	      CartButton: CartButton,
	      ProductCard: ProductCard,
	      CardWrapper: CardWrapper,
	      $locale: $locale
	    };
	  };

	  return [$locale, locale_changed_handler];
	}

	var Home = /*#__PURE__*/function (_SvelteComponentDev) {
	  _inherits(Home, _SvelteComponentDev);

	  var _super = _createSuper$8(Home);

	  function Home(options) {
	    var _this;

	    _classCallCheck(this, Home);

	    _this = _super.call(this, options);
	    init(_assertThisInitialized(_this), options, instance$7, create_fragment$7, safe_not_equal, {});
	    dispatch_dev("SvelteRegisterComponent", {
	      component: _assertThisInitialized(_this),
	      tagName: "Home",
	      options: options,
	      id: create_fragment$7.name
	    });
	    return _this;
	  }

	  return Home;
	}(SvelteComponentDev);

	function _createSuper$9(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$9()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$9() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	var file$6 = "src/pages/About.svelte";

	function create_fragment$8(ctx) {
	  var div;
	  var current;
	  var translatebutton = new TranslateButton({
	    props: {
	      value:
	      /*$locale*/
	      ctx[0]
	    },
	    $$inline: true
	  });
	  translatebutton.$on("locale-changed",
	  /*locale_changed_handler*/
	  ctx[1]);
	  var block = {
	    c: function create() {
	      div = element("div");
	      create_component(translatebutton.$$.fragment);
	      attr_dev(div, "class", "container right-align");
	      set_style(div, "margin-top", "30px");
	      add_location(div, file$6, 5, 0, 162);
	    },
	    l: function claim(nodes) {
	      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor) {
	      insert_dev(target, div, anchor);
	      mount_component(translatebutton, div, null);
	      current = true;
	    },
	    p: function update(ctx, _ref) {
	      var _ref2 = _slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      var translatebutton_changes = {};
	      if (dirty &
	      /*$locale*/
	      1) translatebutton_changes.value =
	      /*$locale*/
	      ctx[0];
	      translatebutton.$set(translatebutton_changes);
	    },
	    i: function intro(local) {
	      if (current) return;
	      transition_in(translatebutton.$$.fragment, local);
	      current = true;
	    },
	    o: function outro(local) {
	      transition_out(translatebutton.$$.fragment, local);
	      current = false;
	    },
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(div);
	      destroy_component(translatebutton);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$8.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function instance$8($$self, $$props, $$invalidate) {
	  var $locale;
	  validate_store(j$2, "locale");
	  component_subscribe($$self, j$2, function ($$value) {
	    return $$invalidate(0, $locale = $$value);
	  });
	  var writable_props = [];
	  Object.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<About> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("About", $$slots, []);

	  var locale_changed_handler = function locale_changed_handler(e) {
	    return setupI18n({
	      withLocale: e.detail
	    });
	  };

	  $$self.$capture_state = function () {
	    return {
	      setupI18n: setupI18n,
	      isLocaleLoaded: isLocaleLoaded,
	      locale: j$2,
	      TranslateButton: TranslateButton,
	      $locale: $locale
	    };
	  };

	  return [$locale, locale_changed_handler];
	}

	var About = /*#__PURE__*/function (_SvelteComponentDev) {
	  _inherits(About, _SvelteComponentDev);

	  var _super = _createSuper$9(About);

	  function About(options) {
	    var _this;

	    _classCallCheck(this, About);

	    _this = _super.call(this, options);
	    init(_assertThisInitialized(_this), options, instance$8, create_fragment$8, safe_not_equal, {});
	    dispatch_dev("SvelteRegisterComponent", {
	      component: _assertThisInitialized(_this),
	      tagName: "About",
	      options: options,
	      id: create_fragment$8.name
	    });
	    return _this;
	  }

	  return About;
	}(SvelteComponentDev);

	function _createSuper$a(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$a()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$a() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

	function create_fragment$9(ctx) {
	  var block = {
	    c: noop,
	    l: function claim(nodes) {
	      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: noop,
	    p: noop,
	    i: noop,
	    o: noop,
	    d: noop
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$9.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function instance$9($$self, $$props) {
	  var writable_props = [];
	  Object.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Success> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("Success", $$slots, []);
	  return [];
	}

	var Success = /*#__PURE__*/function (_SvelteComponentDev) {
	  _inherits(Success, _SvelteComponentDev);

	  var _super = _createSuper$a(Success);

	  function Success(options) {
	    var _this;

	    _classCallCheck(this, Success);

	    _this = _super.call(this, options);
	    init(_assertThisInitialized(_this), options, instance$9, create_fragment$9, safe_not_equal, {});
	    dispatch_dev("SvelteRegisterComponent", {
	      component: _assertThisInitialized(_this),
	      tagName: "Success",
	      options: options,
	      id: create_fragment$9.name
	    });
	    return _this;
	  }

	  return Success;
	}(SvelteComponentDev);

	// `Symbol.asyncIterator` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.asynciterator
	defineWellKnownSymbol('asyncIterator');

	// `Symbol.toStringTag` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.tostringtag
	defineWellKnownSymbol('toStringTag');

	// JSON[@@toStringTag] property
	// https://tc39.github.io/ecma262/#sec-json-@@tostringtag
	setToStringTag(global_1.JSON, 'JSON', true);

	// Math[@@toStringTag] property
	// https://tc39.github.io/ecma262/#sec-math-@@tostringtag
	setToStringTag(Math, 'Math', true);

	var runtime_1 = createCommonjsModule(function (module) {
	  /**
	   * Copyright (c) 2014-present, Facebook, Inc.
	   *
	   * This source code is licensed under the MIT license found in the
	   * LICENSE file in the root directory of this source tree.
	   */
	  var runtime = function (exports) {

	    var Op = Object.prototype;
	    var hasOwn = Op.hasOwnProperty;
	    var undefined$1; // More compressible than void 0.

	    var $Symbol = typeof Symbol === "function" ? Symbol : {};
	    var iteratorSymbol = $Symbol.iterator || "@@iterator";
	    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	    function wrap(innerFn, outerFn, self, tryLocsList) {
	      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	      var generator = Object.create(protoGenerator.prototype);
	      var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
	      // .throw, and .return methods.

	      generator._invoke = makeInvokeMethod(innerFn, self, context);
	      return generator;
	    }

	    exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
	    // record like context.tryEntries[i].completion. This interface could
	    // have been (and was previously) designed to take a closure to be
	    // invoked without arguments, but in all the cases we care about we
	    // already have an existing method we want to call, so there's no need
	    // to create a new function object. We can even get away with assuming
	    // the method takes exactly one argument, since that happens to be true
	    // in every case, so we don't have to touch the arguments object. The
	    // only additional allocation required is the completion record, which
	    // has a stable shape and so hopefully should be cheap to allocate.

	    function tryCatch(fn, obj, arg) {
	      try {
	        return {
	          type: "normal",
	          arg: fn.call(obj, arg)
	        };
	      } catch (err) {
	        return {
	          type: "throw",
	          arg: err
	        };
	      }
	    }

	    var GenStateSuspendedStart = "suspendedStart";
	    var GenStateSuspendedYield = "suspendedYield";
	    var GenStateExecuting = "executing";
	    var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
	    // breaking out of the dispatch switch statement.

	    var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
	    // .constructor.prototype properties for functions that return Generator
	    // objects. For full spec compliance, you may wish to configure your
	    // minifier not to mangle the names of these two functions.

	    function Generator() {}

	    function GeneratorFunction() {}

	    function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
	    // don't natively support it.


	    var IteratorPrototype = {};

	    IteratorPrototype[iteratorSymbol] = function () {
	      return this;
	    };

	    var getProto = Object.getPrototypeOf;
	    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

	    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	      // This environment has a native %IteratorPrototype%; use it instead
	      // of the polyfill.
	      IteratorPrototype = NativeIteratorPrototype;
	    }

	    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
	    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	    GeneratorFunctionPrototype.constructor = GeneratorFunction;
	    GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
	    // Iterator interface in terms of a single ._invoke method.

	    function defineIteratorMethods(prototype) {
	      ["next", "throw", "return"].forEach(function (method) {
	        prototype[method] = function (arg) {
	          return this._invoke(method, arg);
	        };
	      });
	    }

	    exports.isGeneratorFunction = function (genFun) {
	      var ctor = typeof genFun === "function" && genFun.constructor;
	      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
	      // do is to check its .name property.
	      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
	    };

	    exports.mark = function (genFun) {
	      if (Object.setPrototypeOf) {
	        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	      } else {
	        genFun.__proto__ = GeneratorFunctionPrototype;

	        if (!(toStringTagSymbol in genFun)) {
	          genFun[toStringTagSymbol] = "GeneratorFunction";
	        }
	      }

	      genFun.prototype = Object.create(Gp);
	      return genFun;
	    }; // Within the body of any async function, `await x` is transformed to
	    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	    // `hasOwn.call(value, "__await")` to determine if the yielded value is
	    // meant to be awaited.


	    exports.awrap = function (arg) {
	      return {
	        __await: arg
	      };
	    };

	    function AsyncIterator(generator, PromiseImpl) {
	      function invoke(method, arg, resolve, reject) {
	        var record = tryCatch(generator[method], generator, arg);

	        if (record.type === "throw") {
	          reject(record.arg);
	        } else {
	          var result = record.arg;
	          var value = result.value;

	          if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
	            return PromiseImpl.resolve(value.__await).then(function (value) {
	              invoke("next", value, resolve, reject);
	            }, function (err) {
	              invoke("throw", err, resolve, reject);
	            });
	          }

	          return PromiseImpl.resolve(value).then(function (unwrapped) {
	            // When a yielded Promise is resolved, its final value becomes
	            // the .value of the Promise<{value,done}> result for the
	            // current iteration.
	            result.value = unwrapped;
	            resolve(result);
	          }, function (error) {
	            // If a rejected Promise was yielded, throw the rejection back
	            // into the async generator function so it can be handled there.
	            return invoke("throw", error, resolve, reject);
	          });
	        }
	      }

	      var previousPromise;

	      function enqueue(method, arg) {
	        function callInvokeWithMethodAndArg() {
	          return new PromiseImpl(function (resolve, reject) {
	            invoke(method, arg, resolve, reject);
	          });
	        }

	        return previousPromise = // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
	        // invocations of the iterator.
	        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
	      } // Define the unified helper method that is used to implement .next,
	      // .throw, and .return (see defineIteratorMethods).


	      this._invoke = enqueue;
	    }

	    defineIteratorMethods(AsyncIterator.prototype);

	    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	      return this;
	    };

	    exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
	    // AsyncIterator objects; they just return a Promise for the value of
	    // the final result produced by the iterator.

	    exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
	      if (PromiseImpl === void 0) PromiseImpl = Promise;
	      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
	      return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function (result) {
	        return result.done ? result.value : iter.next();
	      });
	    };

	    function makeInvokeMethod(innerFn, self, context) {
	      var state = GenStateSuspendedStart;
	      return function invoke(method, arg) {
	        if (state === GenStateExecuting) {
	          throw new Error("Generator is already running");
	        }

	        if (state === GenStateCompleted) {
	          if (method === "throw") {
	            throw arg;
	          } // Be forgiving, per 25.3.3.3.3 of the spec:
	          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


	          return doneResult();
	        }

	        context.method = method;
	        context.arg = arg;

	        while (true) {
	          var delegate = context.delegate;

	          if (delegate) {
	            var delegateResult = maybeInvokeDelegate(delegate, context);

	            if (delegateResult) {
	              if (delegateResult === ContinueSentinel) continue;
	              return delegateResult;
	            }
	          }

	          if (context.method === "next") {
	            // Setting context._sent for legacy support of Babel's
	            // function.sent implementation.
	            context.sent = context._sent = context.arg;
	          } else if (context.method === "throw") {
	            if (state === GenStateSuspendedStart) {
	              state = GenStateCompleted;
	              throw context.arg;
	            }

	            context.dispatchException(context.arg);
	          } else if (context.method === "return") {
	            context.abrupt("return", context.arg);
	          }

	          state = GenStateExecuting;
	          var record = tryCatch(innerFn, self, context);

	          if (record.type === "normal") {
	            // If an exception is thrown from innerFn, we leave state ===
	            // GenStateExecuting and loop back for another invocation.
	            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

	            if (record.arg === ContinueSentinel) {
	              continue;
	            }

	            return {
	              value: record.arg,
	              done: context.done
	            };
	          } else if (record.type === "throw") {
	            state = GenStateCompleted; // Dispatch the exception by looping back around to the
	            // context.dispatchException(context.arg) call above.

	            context.method = "throw";
	            context.arg = record.arg;
	          }
	        }
	      };
	    } // Call delegate.iterator[context.method](context.arg) and handle the
	    // result, either by returning a { value, done } result from the
	    // delegate iterator, or by modifying context.method and context.arg,
	    // setting context.delegate to null, and returning the ContinueSentinel.


	    function maybeInvokeDelegate(delegate, context) {
	      var method = delegate.iterator[context.method];

	      if (method === undefined$1) {
	        // A .throw or .return when the delegate iterator has no .throw
	        // method always terminates the yield* loop.
	        context.delegate = null;

	        if (context.method === "throw") {
	          // Note: ["return"] must be used for ES3 parsing compatibility.
	          if (delegate.iterator["return"]) {
	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            context.method = "return";
	            context.arg = undefined$1;
	            maybeInvokeDelegate(delegate, context);

	            if (context.method === "throw") {
	              // If maybeInvokeDelegate(context) changed context.method from
	              // "return" to "throw", let that override the TypeError below.
	              return ContinueSentinel;
	            }
	          }

	          context.method = "throw";
	          context.arg = new TypeError("The iterator does not provide a 'throw' method");
	        }

	        return ContinueSentinel;
	      }

	      var record = tryCatch(method, delegate.iterator, context.arg);

	      if (record.type === "throw") {
	        context.method = "throw";
	        context.arg = record.arg;
	        context.delegate = null;
	        return ContinueSentinel;
	      }

	      var info = record.arg;

	      if (!info) {
	        context.method = "throw";
	        context.arg = new TypeError("iterator result is not an object");
	        context.delegate = null;
	        return ContinueSentinel;
	      }

	      if (info.done) {
	        // Assign the result of the finished delegate to the temporary
	        // variable specified by delegate.resultName (see delegateYield).
	        context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

	        context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
	        // exception, let the outer generator proceed normally. If
	        // context.method was "next", forget context.arg since it has been
	        // "consumed" by the delegate iterator. If context.method was
	        // "return", allow the original .return call to continue in the
	        // outer generator.

	        if (context.method !== "return") {
	          context.method = "next";
	          context.arg = undefined$1;
	        }
	      } else {
	        // Re-yield the result returned by the delegate method.
	        return info;
	      } // The delegate iterator is finished, so forget it and continue with
	      // the outer generator.


	      context.delegate = null;
	      return ContinueSentinel;
	    } // Define Generator.prototype.{next,throw,return} in terms of the
	    // unified ._invoke helper method.


	    defineIteratorMethods(Gp);
	    Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
	    // @@iterator function is called on it. Some browsers' implementations of the
	    // iterator prototype chain incorrectly implement this, causing the Generator
	    // object to not be returned from this call. This ensures that doesn't happen.
	    // See https://github.com/facebook/regenerator/issues/274 for more details.

	    Gp[iteratorSymbol] = function () {
	      return this;
	    };

	    Gp.toString = function () {
	      return "[object Generator]";
	    };

	    function pushTryEntry(locs) {
	      var entry = {
	        tryLoc: locs[0]
	      };

	      if (1 in locs) {
	        entry.catchLoc = locs[1];
	      }

	      if (2 in locs) {
	        entry.finallyLoc = locs[2];
	        entry.afterLoc = locs[3];
	      }

	      this.tryEntries.push(entry);
	    }

	    function resetTryEntry(entry) {
	      var record = entry.completion || {};
	      record.type = "normal";
	      delete record.arg;
	      entry.completion = record;
	    }

	    function Context(tryLocsList) {
	      // The root entry object (effectively a try statement without a catch
	      // or a finally block) gives us a place to store values thrown from
	      // locations where there is no enclosing try statement.
	      this.tryEntries = [{
	        tryLoc: "root"
	      }];
	      tryLocsList.forEach(pushTryEntry, this);
	      this.reset(true);
	    }

	    exports.keys = function (object) {
	      var keys = [];

	      for (var key in object) {
	        keys.push(key);
	      }

	      keys.reverse(); // Rather than returning an object with a next method, we keep
	      // things simple and return the next function itself.

	      return function next() {
	        while (keys.length) {
	          var key = keys.pop();

	          if (key in object) {
	            next.value = key;
	            next.done = false;
	            return next;
	          }
	        } // To avoid creating an additional object, we just hang the .value
	        // and .done properties off the next function object itself. This
	        // also ensures that the minifier will not anonymize the function.


	        next.done = true;
	        return next;
	      };
	    };

	    function values(iterable) {
	      if (iterable) {
	        var iteratorMethod = iterable[iteratorSymbol];

	        if (iteratorMethod) {
	          return iteratorMethod.call(iterable);
	        }

	        if (typeof iterable.next === "function") {
	          return iterable;
	        }

	        if (!isNaN(iterable.length)) {
	          var i = -1,
	              next = function next() {
	            while (++i < iterable.length) {
	              if (hasOwn.call(iterable, i)) {
	                next.value = iterable[i];
	                next.done = false;
	                return next;
	              }
	            }

	            next.value = undefined$1;
	            next.done = true;
	            return next;
	          };

	          return next.next = next;
	        }
	      } // Return an iterator with no values.


	      return {
	        next: doneResult
	      };
	    }

	    exports.values = values;

	    function doneResult() {
	      return {
	        value: undefined$1,
	        done: true
	      };
	    }

	    Context.prototype = {
	      constructor: Context,
	      reset: function reset(skipTempReset) {
	        this.prev = 0;
	        this.next = 0; // Resetting context._sent for legacy support of Babel's
	        // function.sent implementation.

	        this.sent = this._sent = undefined$1;
	        this.done = false;
	        this.delegate = null;
	        this.method = "next";
	        this.arg = undefined$1;
	        this.tryEntries.forEach(resetTryEntry);

	        if (!skipTempReset) {
	          for (var name in this) {
	            // Not sure about the optimal order of these conditions:
	            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
	              this[name] = undefined$1;
	            }
	          }
	        }
	      },
	      stop: function stop() {
	        this.done = true;
	        var rootEntry = this.tryEntries[0];
	        var rootRecord = rootEntry.completion;

	        if (rootRecord.type === "throw") {
	          throw rootRecord.arg;
	        }

	        return this.rval;
	      },
	      dispatchException: function dispatchException(exception) {
	        if (this.done) {
	          throw exception;
	        }

	        var context = this;

	        function handle(loc, caught) {
	          record.type = "throw";
	          record.arg = exception;
	          context.next = loc;

	          if (caught) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            context.method = "next";
	            context.arg = undefined$1;
	          }

	          return !!caught;
	        }

	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];
	          var record = entry.completion;

	          if (entry.tryLoc === "root") {
	            // Exception thrown outside of any try block that could handle
	            // it, so set the completion value of the entire function to
	            // throw the exception.
	            return handle("end");
	          }

	          if (entry.tryLoc <= this.prev) {
	            var hasCatch = hasOwn.call(entry, "catchLoc");
	            var hasFinally = hasOwn.call(entry, "finallyLoc");

	            if (hasCatch && hasFinally) {
	              if (this.prev < entry.catchLoc) {
	                return handle(entry.catchLoc, true);
	              } else if (this.prev < entry.finallyLoc) {
	                return handle(entry.finallyLoc);
	              }
	            } else if (hasCatch) {
	              if (this.prev < entry.catchLoc) {
	                return handle(entry.catchLoc, true);
	              }
	            } else if (hasFinally) {
	              if (this.prev < entry.finallyLoc) {
	                return handle(entry.finallyLoc);
	              }
	            } else {
	              throw new Error("try statement without catch or finally");
	            }
	          }
	        }
	      },
	      abrupt: function abrupt(type, arg) {
	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];

	          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
	            var finallyEntry = entry;
	            break;
	          }
	        }

	        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
	          // Ignore the finally entry if control is not jumping to a
	          // location outside the try/catch block.
	          finallyEntry = null;
	        }

	        var record = finallyEntry ? finallyEntry.completion : {};
	        record.type = type;
	        record.arg = arg;

	        if (finallyEntry) {
	          this.method = "next";
	          this.next = finallyEntry.finallyLoc;
	          return ContinueSentinel;
	        }

	        return this.complete(record);
	      },
	      complete: function complete(record, afterLoc) {
	        if (record.type === "throw") {
	          throw record.arg;
	        }

	        if (record.type === "break" || record.type === "continue") {
	          this.next = record.arg;
	        } else if (record.type === "return") {
	          this.rval = this.arg = record.arg;
	          this.method = "return";
	          this.next = "end";
	        } else if (record.type === "normal" && afterLoc) {
	          this.next = afterLoc;
	        }

	        return ContinueSentinel;
	      },
	      finish: function finish(finallyLoc) {
	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];

	          if (entry.finallyLoc === finallyLoc) {
	            this.complete(entry.completion, entry.afterLoc);
	            resetTryEntry(entry);
	            return ContinueSentinel;
	          }
	        }
	      },
	      "catch": function _catch(tryLoc) {
	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];

	          if (entry.tryLoc === tryLoc) {
	            var record = entry.completion;

	            if (record.type === "throw") {
	              var thrown = record.arg;
	              resetTryEntry(entry);
	            }

	            return thrown;
	          }
	        } // The context.catch method must only be called with a location
	        // argument that corresponds to a known catch block.


	        throw new Error("illegal catch attempt");
	      },
	      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
	        this.delegate = {
	          iterator: values(iterable),
	          resultName: resultName,
	          nextLoc: nextLoc
	        };

	        if (this.method === "next") {
	          // Deliberately forget the last sent value so that we don't
	          // accidentally pass it on to the delegate.
	          this.arg = undefined$1;
	        }

	        return ContinueSentinel;
	      }
	    }; // Regardless of whether this script is executing as a CommonJS module
	    // or not, return the runtime object so that we can declare the variable
	    // regeneratorRuntime in the outer scope, which allows this module to be
	    // injected easily by `bin/regenerator --include-runtime script.js`.

	    return exports;
	  }( // If this script is executing as a CommonJS module, use module.exports
	  // as the regeneratorRuntime namespace. Otherwise create a new empty
	  // object. Either way, the resulting object will be used to initialize
	  // the regeneratorRuntime variable at the top of this file.
	   module.exports );

	  try {
	    regeneratorRuntime = runtime;
	  } catch (accidentalStrictMode) {
	    // This module should not be running in strict mode, so the above
	    // assignment should always work unless something is misconfigured. Just
	    // in case runtime.js accidentally runs in strict mode, we can escape
	    // strict mode using a global Function call. This could conceivably fail
	    // if a Content Security Policy forbids using Function, but in that case
	    // the proper solution is to fix the accidental strict mode problem. If
	    // you've misconfigured your bundler to force strict mode and applied a
	    // CSP to forbid Function, and you're not willing to fix either of those
	    // problems, please detail your unique predicament in a GitHub issue.
	    Function("r", "regeneratorRuntime = r")(runtime);
	  }
	});

	var regenerator = runtime_1;

	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
	  try {
	    var info = gen[key](arg);
	    var value = info.value;
	  } catch (error) {
	    reject(error);
	    return;
	  }

	  if (info.done) {
	    resolve(value);
	  } else {
	    Promise.resolve(value).then(_next, _throw);
	  }
	}

	function _asyncToGenerator(fn) {
	  return function () {
	    var self = this,
	        args = arguments;
	    return new Promise(function (resolve, reject) {
	      var gen = fn.apply(self, args);

	      function _next(value) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
	      }

	      function _throw(err) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
	      }

	      _next(undefined);
	    });
	  };
	}

	function _createSuper$b(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$b()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$b() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

	function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
	var file$7 = "src/components/CheckoutItem.svelte";

	function create_fragment$a(ctx) {
	  var div6;
	  var div5;
	  var div0;
	  var img_1;
	  var img_1_src_value;
	  var t0;
	  var div4;
	  var span;
	  var t2;
	  var p;
	  var t3;
	  var t4_value =
	  /*price*/
	  ctx[2] *
	  /*count*/
	  ctx[0] + "";
	  var t4;
	  var t5;
	  var div3;
	  var button0;
	  var i0;
	  var t7;
	  var div1;
	  var t8;
	  var t9;
	  var button1;
	  var i1;
	  var t11;
	  var div2;
	  var t12;
	  var button2;
	  var i2;
	  var dispose;
	  var block = {
	    c: function create() {
	      div6 = element("div");
	      div5 = element("div");
	      div0 = element("div");
	      img_1 = element("img");
	      t0 = space();
	      div4 = element("div");
	      span = element("span");
	      span.textContent = "".concat(
	      /*name*/
	      ctx[1]);
	      t2 = space();
	      p = element("p");
	      t3 = text("Price: ৳ ");
	      t4 = text(t4_value);
	      t5 = space();
	      div3 = element("div");
	      button0 = element("button");
	      i0 = element("i");
	      i0.textContent = "remove";
	      t7 = space();
	      div1 = element("div");
	      t8 = text(
	      /*count*/
	      ctx[0]);
	      t9 = space();
	      button1 = element("button");
	      i1 = element("i");
	      i1.textContent = "add";
	      t11 = space();
	      div2 = element("div");
	      t12 = space();
	      button2 = element("button");
	      i2 = element("i");
	      i2.textContent = "cancel";
	      if (img_1.src !== (img_1_src_value = "img/".concat(
	      /*img*/
	      ctx[3]))) attr_dev(img_1, "src", img_1_src_value);
	      attr_dev(img_1, "alt",
	      /*name*/
	      ctx[1]);
	      add_location(img_1, file$7, 32, 6, 663);
	      attr_dev(div0, "class", "card-image");
	      add_location(div0, file$7, 31, 4, 632);
	      attr_dev(span, "class", "card-title");
	      add_location(span, file$7, 35, 6, 748);
	      add_location(p, file$7, 36, 6, 793);
	      attr_dev(i0, "class", "material-icons");
	      add_location(i0, file$7, 41, 10, 973);
	      attr_dev(button0, "class", "waves-effect waves-light btn red remove col s2");
	      add_location(button0, file$7, 38, 8, 857);
	      attr_dev(div1, "class", "col s1");
	      set_style(div1, "font-size", "24px");
	      add_location(div1, file$7, 43, 8, 1036);
	      attr_dev(i1, "class", "material-icons");
	      add_location(i1, file$7, 47, 10, 1216);
	      attr_dev(button1, "class", "waves-effect waves-light btn red add col s2");
	      add_location(button1, file$7, 44, 8, 1103);
	      attr_dev(div2, "class", "col s1");
	      add_location(div2, file$7, 49, 8, 1276);
	      attr_dev(i2, "class", "material-icons");
	      add_location(i2, file$7, 53, 10, 1416);
	      attr_dev(button2, "class", "waves-effect waves-light btn red col s2");
	      add_location(button2, file$7, 50, 8, 1307);
	      attr_dev(div3, "class", "row");
	      add_location(div3, file$7, 37, 6, 831);
	      attr_dev(div4, "class", "card-action");
	      add_location(div4, file$7, 34, 4, 716);
	      attr_dev(div5, "class", "card large");
	      add_location(div5, file$7, 30, 2, 603);
	      attr_dev(div6, "class", "container");
	      add_location(div6, file$7, 29, 0, 577);
	    },
	    l: function claim(nodes) {
	      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor, remount) {
	      insert_dev(target, div6, anchor);
	      append_dev(div6, div5);
	      append_dev(div5, div0);
	      append_dev(div0, img_1);
	      append_dev(div5, t0);
	      append_dev(div5, div4);
	      append_dev(div4, span);
	      append_dev(div4, t2);
	      append_dev(div4, p);
	      append_dev(p, t3);
	      append_dev(p, t4);
	      append_dev(div4, t5);
	      append_dev(div4, div3);
	      append_dev(div3, button0);
	      append_dev(button0, i0);
	      append_dev(div3, t7);
	      append_dev(div3, div1);
	      append_dev(div1, t8);
	      append_dev(div3, t9);
	      append_dev(div3, button1);
	      append_dev(button1, i1);
	      append_dev(div3, t11);
	      append_dev(div3, div2);
	      append_dev(div3, t12);
	      append_dev(div3, button2);
	      append_dev(button2, i2);
	      if (remount) run_all(dispose);
	      dispose = [listen_dev(button0, "click", function () {
	        if (is_function(
	        /*count*/
	        ctx[0] -= 1)) (
	        /*count*/
	        ctx[0] -= 1).apply(this, arguments);
	      }, false, false, false), listen_dev(button1, "click", function () {
	        if (is_function(
	        /*count*/
	        ctx[0] += 1)) (
	        /*count*/
	        ctx[0] += 1).apply(this, arguments);
	      }, false, false, false), listen_dev(button2, "click",
	      /*removeItem*/
	      ctx[4], false, false, false)];
	    },
	    p: function update(new_ctx, _ref) {
	      var _ref2 = _slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      ctx = new_ctx;
	      if (dirty &
	      /*count*/
	      1 && t4_value !== (t4_value =
	      /*price*/
	      ctx[2] *
	      /*count*/
	      ctx[0] + "")) set_data_dev(t4, t4_value);
	      if (dirty &
	      /*count*/
	      1) set_data_dev(t8,
	      /*count*/
	      ctx[0]);
	    },
	    i: noop,
	    o: noop,
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(div6);
	      run_all(dispose);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$a.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function instance$a($$self, $$props, $$invalidate) {
	  var item = $$props.item;
	  var _item = item,
	      name = _item.name,
	      price = _item.price,
	      img = _item.img,
	      count = _item.count;

	  var countButtonHandler = function countButtonHandler(e) {
	    if (e.target.classList.contains("add")) {
	      $$invalidate(0, count++, count);
	    } else if (e.target.classlist.contains("remove")) {
	      if (count == 1) {
	        removeItem();
	      } else {
	        $$invalidate(0, count--, count);
	      }
	    }

	    cart.update(function (n) {
	      return _objectSpread$2({}, n, _defineProperty({}, name, _objectSpread$2({}, n[name], {
	        count: count
	      })));
	    });
	  };

	  var removeItem = function removeItem() {
	    cart.update(function (n) {
	      delete n[name];
	      return n;
	    });
	  };

	  var writable_props = ["item"];
	  Object.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<CheckoutItem> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("CheckoutItem", $$slots, []);

	  $$self.$set = function ($$props) {
	    if ("item" in $$props) $$invalidate(5, item = $$props.item);
	  };

	  $$self.$capture_state = function () {
	    return {
	      cart: cart,
	      item: item,
	      name: name,
	      price: price,
	      img: img,
	      count: count,
	      countButtonHandler: countButtonHandler,
	      removeItem: removeItem,
	      total: total
	    };
	  };

	  $$self.$inject_state = function ($$props) {
	    if ("item" in $$props) $$invalidate(5, item = $$props.item);
	    if ("name" in $$props) $$invalidate(1, name = $$props.name);
	    if ("price" in $$props) $$invalidate(2, price = $$props.price);
	    if ("img" in $$props) $$invalidate(3, img = $$props.img);
	    if ("count" in $$props) $$invalidate(0, count = $$props.count);
	    if ("total" in $$props) total = $$props.total;
	  };

	  var total;

	  if ($$props && "$$inject" in $$props) {
	    $$self.$inject_state($$props.$$inject);
	  }

	  $$self.$$.update = function () {
	    if ($$self.$$.dirty &
	    /*count*/
	    1) {
	       total = count * price;
	    }
	  };

	  return [count, name, price, img, removeItem, item];
	}

	var CheckoutItem = /*#__PURE__*/function (_SvelteComponentDev) {
	  _inherits(CheckoutItem, _SvelteComponentDev);

	  var _super = _createSuper$b(CheckoutItem);

	  function CheckoutItem(options) {
	    var _this;

	    _classCallCheck(this, CheckoutItem);

	    _this = _super.call(this, options);
	    init(_assertThisInitialized(_this), options, instance$a, create_fragment$a, safe_not_equal, {
	      item: 5
	    });
	    dispatch_dev("SvelteRegisterComponent", {
	      component: _assertThisInitialized(_this),
	      tagName: "CheckoutItem",
	      options: options,
	      id: create_fragment$a.name
	    });
	    var ctx = _this.$$.ctx;
	    var props = options.props || {};

	    if (
	    /*item*/
	    ctx[5] === undefined && !("item" in props)) {
	      console.warn("<CheckoutItem> was created without expected prop 'item'");
	    }

	    return _this;
	  }

	  _createClass(CheckoutItem, [{
	    key: "item",
	    get: function get() {
	      throw new Error("<CheckoutItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    },
	    set: function set(value) {
	      throw new Error("<CheckoutItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    }
	  }]);

	  return CheckoutItem;
	}(SvelteComponentDev);

	function _createSuper$c(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$c()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$c() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	var Object_1$1 = globals.Object,
	    console_1$1 = globals.console;
	var file$8 = "src/pages/Checkout.svelte";

	function get_each_context$1(ctx, list, i) {
	  var child_ctx = ctx.slice();
	  child_ctx[4] = list[i];
	  return child_ctx;
	} // (40:2) {:else}


	function create_else_block_1(ctx) {
	  var each_blocks = [];
	  var each_1_lookup = new Map();
	  var t0;
	  var button;
	  var i;
	  var t2;
	  var current;
	  var dispose;
	  var each_value =
	  /*cartItems*/
	  ctx[0];
	  validate_each_argument(each_value);

	  var get_key = function get_key(ctx) {
	    return (
	      /*item*/
	      ctx[4].name
	    );
	  };

	  validate_each_keys(ctx, each_value, get_each_context$1, get_key);

	  for (var _i = 0; _i < each_value.length; _i += 1) {
	    var child_ctx = get_each_context$1(ctx, each_value, _i);
	    var key = get_key(child_ctx);
	    each_1_lookup.set(key, each_blocks[_i] = create_each_block$1(key, child_ctx));
	  }

	  var block = {
	    c: function create() {
	      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
	        each_blocks[_i2].c();
	      }

	      t0 = space();
	      button = element("button");
	      i = element("i");
	      i.textContent = "shopping_cart";
	      t2 = text("\n      Checkout");
	      attr_dev(i, "class", "material-icons right");
	      add_location(i, file$8, 46, 6, 1137);
	      attr_dev(button, "class", "waves-effect waves-light btn-large red");
	      add_location(button, file$8, 43, 4, 1038);
	    },
	    m: function mount(target, anchor, remount) {
	      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
	        each_blocks[_i3].m(target, anchor);
	      }

	      insert_dev(target, t0, anchor);
	      insert_dev(target, button, anchor);
	      append_dev(button, i);
	      append_dev(button, t2);
	      current = true;
	      if (remount) dispose();
	      dispose = listen_dev(button, "click",
	      /*startCheckout*/
	      ctx[1], false, false, false);
	    },
	    p: function update(ctx, dirty) {
	      if (dirty &
	      /*cartItems*/
	      1) {
	        var _each_value =
	        /*cartItems*/
	        ctx[0];
	        validate_each_argument(_each_value);
	        group_outros();
	        validate_each_keys(ctx, _each_value, get_each_context$1, get_key);
	        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, _each_value, each_1_lookup, t0.parentNode, outro_and_destroy_block, create_each_block$1, t0, get_each_context$1);
	        check_outros();
	      }
	    },
	    i: function intro(local) {
	      if (current) return;

	      for (var _i4 = 0; _i4 < each_value.length; _i4 += 1) {
	        transition_in(each_blocks[_i4]);
	      }

	      current = true;
	    },
	    o: function outro(local) {
	      for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
	        transition_out(each_blocks[_i5]);
	      }

	      current = false;
	    },
	    d: function destroy(detaching) {
	      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
	        each_blocks[_i6].d(detaching);
	      }

	      if (detaching) detach_dev(t0);
	      if (detaching) detach_dev(button);
	      dispose();
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_else_block_1.name,
	    type: "else",
	    source: "(40:2) {:else}",
	    ctx: ctx
	  });
	  return block;
	} // (34:2) {#if cartItems.length === 0}


	function create_if_block$1(ctx) {
	  var if_block_anchor;

	  function select_block_type_1(ctx, dirty) {
	    if (checkedOut) return create_if_block_1$1;
	    return create_else_block$1;
	  }

	  var current_block_type = select_block_type_1();
	  var if_block = current_block_type(ctx);
	  var block = {
	    c: function create() {
	      if_block.c();
	      if_block_anchor = empty();
	    },
	    m: function mount(target, anchor) {
	      if_block.m(target, anchor);
	      insert_dev(target, if_block_anchor, anchor);
	    },
	    p: noop,
	    i: noop,
	    o: noop,
	    d: function destroy(detaching) {
	      if_block.d(detaching);
	      if (detaching) detach_dev(if_block_anchor);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_if_block$1.name,
	    type: "if",
	    source: "(34:2) {#if cartItems.length === 0}",
	    ctx: ctx
	  });
	  return block;
	} // (41:4) {#each cartItems as item (item.name)}


	function create_each_block$1(key_1, ctx) {
	  var first;
	  var current;
	  var checkoutitem = new CheckoutItem({
	    props: {
	      item:
	      /*item*/
	      ctx[4]
	    },
	    $$inline: true
	  });
	  var block = {
	    key: key_1,
	    first: null,
	    c: function create() {
	      first = empty();
	      create_component(checkoutitem.$$.fragment);
	      this.first = first;
	    },
	    m: function mount(target, anchor) {
	      insert_dev(target, first, anchor);
	      mount_component(checkoutitem, target, anchor);
	      current = true;
	    },
	    p: function update(ctx, dirty) {
	      var checkoutitem_changes = {};
	      if (dirty &
	      /*cartItems*/
	      1) checkoutitem_changes.item =
	      /*item*/
	      ctx[4];
	      checkoutitem.$set(checkoutitem_changes);
	    },
	    i: function intro(local) {
	      if (current) return;
	      transition_in(checkoutitem.$$.fragment, local);
	      current = true;
	    },
	    o: function outro(local) {
	      transition_out(checkoutitem.$$.fragment, local);
	      current = false;
	    },
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(first);
	      destroy_component(checkoutitem, detaching);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_each_block$1.name,
	    type: "each",
	    source: "(41:4) {#each cartItems as item (item.name)}",
	    ctx: ctx
	  });
	  return block;
	} // (37:4) {:else}


	function create_else_block$1(ctx) {
	  var p;
	  var block = {
	    c: function create() {
	      p = element("p");
	      p.textContent = "Your cart is empty";
	      attr_dev(p, "class", "empty-message");
	      add_location(p, file$8, 37, 6, 882);
	    },
	    m: function mount(target, anchor) {
	      insert_dev(target, p, anchor);
	    },
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(p);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_else_block$1.name,
	    type: "else",
	    source: "(37:4) {:else}",
	    ctx: ctx
	  });
	  return block;
	} // (35:4) {#if checkedOut}


	function create_if_block_1$1(ctx) {
	  var p;
	  var block = {
	    c: function create() {
	      p = element("p");
	      p.textContent = "Thank you for shopping with us";
	      attr_dev(p, "class", "empty-message");
	      add_location(p, file$8, 35, 6, 804);
	    },
	    m: function mount(target, anchor) {
	      insert_dev(target, p, anchor);
	    },
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(p);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_if_block_1$1.name,
	    type: "if",
	    source: "(35:4) {#if checkedOut}",
	    ctx: ctx
	  });
	  return block;
	}

	function create_fragment$b(ctx) {
	  var div;
	  var h1;
	  var t1;
	  var current_block_type_index;
	  var if_block;
	  var current;
	  var if_block_creators = [create_if_block$1, create_else_block_1];
	  var if_blocks = [];

	  function select_block_type(ctx, dirty) {
	    if (
	    /*cartItems*/
	    ctx[0].length === 0) return 0;
	    return 1;
	  }

	  current_block_type_index = select_block_type(ctx);
	  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	  var block = {
	    c: function create() {
	      div = element("div");
	      h1 = element("h1");
	      h1.textContent = "My Cart";
	      t1 = space();
	      if_block.c();
	      add_location(h1, file$8, 32, 2, 729);
	      attr_dev(div, "class", "container");
	      add_location(div, file$8, 31, 0, 703);
	    },
	    l: function claim(nodes) {
	      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor) {
	      insert_dev(target, div, anchor);
	      append_dev(div, h1);
	      append_dev(div, t1);
	      if_blocks[current_block_type_index].m(div, null);
	      current = true;
	    },
	    p: function update(ctx, _ref) {
	      var _ref2 = _slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      var previous_block_index = current_block_type_index;
	      current_block_type_index = select_block_type(ctx);

	      if (current_block_type_index === previous_block_index) {
	        if_blocks[current_block_type_index].p(ctx, dirty);
	      } else {
	        group_outros();
	        transition_out(if_blocks[previous_block_index], 1, 1, function () {
	          if_blocks[previous_block_index] = null;
	        });
	        check_outros();
	        if_block = if_blocks[current_block_type_index];

	        if (!if_block) {
	          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	          if_block.c();
	        }

	        transition_in(if_block, 1);
	        if_block.m(div, null);
	      }
	    },
	    i: function intro(local) {
	      if (current) return;
	      transition_in(if_block);
	      current = true;
	    },
	    o: function outro(local) {
	      transition_out(if_block);
	      current = false;
	    },
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(div);
	      if_blocks[current_block_type_index].d();
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$b.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function instance$b($$self, $$props, $$invalidate) {
	  var cartItems = [];
	  var unsubscribe = cart.subscribe(function (items) {
	    $$invalidate(0, cartItems = Object.values(items));
	  });
	  var stripe = Stripe("pk_test_N2Kfa6ezxQc8rld0adGzibAV00OLGaocEP"); // Basic Checkout

	  function startCheckout() {
	    return _startCheckout.apply(this, arguments);
	  }

	  function _startCheckout() {
	    _startCheckout = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
	      var _yield$stripe$redirec, error;

	      return regenerator.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              console.log("checkout started");
	              _context.next = 3;
	              return stripe.redirectToCheckout({
	                items: [{
	                  sku: sku,
	                  quantity: 1
	                }],
	                successUrl: "https://localhost:5000/success",
	                cancelUrl: "https://localhost:5000/error"
	              });

	            case 3:
	              _yield$stripe$redirec = _context.sent;
	              error = _yield$stripe$redirec.error;

	              if (error) {
	                alert("our payment system is broken!");
	              }

	            case 6:
	            case "end":
	              return _context.stop();
	          }
	        }
	      }, _callee);
	    }));
	    return _startCheckout.apply(this, arguments);
	  }

	  var writable_props = [];
	  Object_1$1.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1$1.warn("<Checkout> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("Checkout", $$slots, []);

	  $$self.$capture_state = function () {
	    return {
	      CheckoutItem: CheckoutItem,
	      cart: cart,
	      cartItems: cartItems,
	      unsubscribe: unsubscribe,
	      stripe: stripe,
	      startCheckout: startCheckout
	    };
	  };

	  $$self.$inject_state = function ($$props) {
	    if ("cartItems" in $$props) $$invalidate(0, cartItems = $$props.cartItems);
	    if ("stripe" in $$props) stripe = $$props.stripe;
	  };

	  if ($$props && "$$inject" in $$props) {
	    $$self.$inject_state($$props.$$inject);
	  }

	  return [cartItems, startCheckout];
	}

	var Checkout = /*#__PURE__*/function (_SvelteComponentDev) {
	  _inherits(Checkout, _SvelteComponentDev);

	  var _super = _createSuper$c(Checkout);

	  function Checkout(options) {
	    var _this;

	    _classCallCheck(this, Checkout);

	    _this = _super.call(this, options);
	    init(_assertThisInitialized(_this), options, instance$b, create_fragment$b, safe_not_equal, {});
	    dispatch_dev("SvelteRegisterComponent", {
	      component: _assertThisInitialized(_this),
	      tagName: "Checkout",
	      options: options,
	      id: create_fragment$b.name
	    });
	    return _this;
	  }

	  return Checkout;
	}(SvelteComponentDev);

	function _createSuper$d(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$d()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$d() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	var Error_1 = globals.Error;

	function create_fragment$c(ctx) {
	  var block = {
	    c: noop,
	    l: function claim(nodes) {
	      throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: noop,
	    p: noop,
	    i: noop,
	    o: noop,
	    d: noop
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$c.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function instance$c($$self, $$props) {
	  var writable_props = [];
	  Object.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Error> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("Error", $$slots, []);
	  return [];
	}

	var Error$1 = /*#__PURE__*/function (_SvelteComponentDev) {
	  _inherits(Error, _SvelteComponentDev);

	  var _super = _createSuper$d(Error);

	  function Error(options) {
	    var _this;

	    _classCallCheck(this, Error);

	    _this = _super.call(this, options);
	    init(_assertThisInitialized(_this), options, instance$c, create_fragment$c, safe_not_equal, {});
	    dispatch_dev("SvelteRegisterComponent", {
	      component: _assertThisInitialized(_this),
	      tagName: "Error",
	      options: options,
	      id: create_fragment$c.name
	    });
	    return _this;
	  }

	  return Error;
	}(SvelteComponentDev);

	function _createSuper$e(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$e()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$e() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	var file$9 = "src/components/Navbar.svelte"; // (27:6) <Link to="/">

	function create_default_slot_4(ctx) {
	  var span;
	  var block = {
	    c: function create() {
	      span = element("span");
	      span.textContent = "Privacy Minded";
	      attr_dev(span, "class", "brand-logo");
	      add_location(span, file$9, 27, 8, 406);
	    },
	    m: function mount(target, anchor) {
	      insert_dev(target, span, anchor);
	    },
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(span);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_default_slot_4.name,
	    type: "slot",
	    source: "(27:6) <Link to=\\\"/\\\">",
	    ctx: ctx
	  });
	  return block;
	} // (32:10) <Link to="/">


	function create_default_slot_3(ctx) {
	  var t_value =
	  /*$_*/
	  ctx[0]("navigate-home") + "";
	  var t;
	  var block = {
	    c: function create() {
	      t = text(t_value);
	    },
	    m: function mount(target, anchor) {
	      insert_dev(target, t, anchor);
	    },
	    p: function update(ctx, dirty) {
	      if (dirty &
	      /*$_*/
	      1 && t_value !== (t_value =
	      /*$_*/
	      ctx[0]("navigate-home") + "")) set_data_dev(t, t_value);
	    },
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(t);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_default_slot_3.name,
	    type: "slot",
	    source: "(32:10) <Link to=\\\"/\\\">",
	    ctx: ctx
	  });
	  return block;
	} // (35:10) <Link to="/about">


	function create_default_slot_2(ctx) {
	  var t_value =
	  /*$_*/
	  ctx[0]("navigate-about") + "";
	  var t;
	  var block = {
	    c: function create() {
	      t = text(t_value);
	    },
	    m: function mount(target, anchor) {
	      insert_dev(target, t, anchor);
	    },
	    p: function update(ctx, dirty) {
	      if (dirty &
	      /*$_*/
	      1 && t_value !== (t_value =
	      /*$_*/
	      ctx[0]("navigate-about") + "")) set_data_dev(t, t_value);
	    },
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(t);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_default_slot_2.name,
	    type: "slot",
	    source: "(35:10) <Link to=\\\"/about\\\">",
	    ctx: ctx
	  });
	  return block;
	} // (44:4) <Link to="/">


	function create_default_slot_1(ctx) {
	  var t_value =
	  /*$_*/
	  ctx[0]("navigate-home") + "";
	  var t;
	  var block = {
	    c: function create() {
	      t = text(t_value);
	    },
	    m: function mount(target, anchor) {
	      insert_dev(target, t, anchor);
	    },
	    p: function update(ctx, dirty) {
	      if (dirty &
	      /*$_*/
	      1 && t_value !== (t_value =
	      /*$_*/
	      ctx[0]("navigate-home") + "")) set_data_dev(t, t_value);
	    },
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(t);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_default_slot_1.name,
	    type: "slot",
	    source: "(44:4) <Link to=\\\"/\\\">",
	    ctx: ctx
	  });
	  return block;
	} // (47:4) <Link to="/about">


	function create_default_slot(ctx) {
	  var t_value =
	  /*$_*/
	  ctx[0]("navigate-about") + "";
	  var t;
	  var block = {
	    c: function create() {
	      t = text(t_value);
	    },
	    m: function mount(target, anchor) {
	      insert_dev(target, t, anchor);
	    },
	    p: function update(ctx, dirty) {
	      if (dirty &
	      /*$_*/
	      1 && t_value !== (t_value =
	      /*$_*/
	      ctx[0]("navigate-about") + "")) set_data_dev(t, t_value);
	    },
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(t);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_default_slot.name,
	    type: "slot",
	    source: "(47:4) <Link to=\\\"/about\\\">",
	    ctx: ctx
	  });
	  return block;
	}

	function create_fragment$d(ctx) {
	  var nav;
	  var div1;
	  var a0;
	  var i;
	  var t1;
	  var div0;
	  var t2;
	  var ul0;
	  var li0;
	  var t3;
	  var li1;
	  var t4;
	  var ul1;
	  var li2;
	  var t5;
	  var li3;
	  var t6;
	  var li4;
	  var a1;
	  var current;
	  var link0 = new Link({
	    props: {
	      to: "/",
	      $$slots: {
	        default: [create_default_slot_4]
	      },
	      $$scope: {
	        ctx: ctx
	      }
	    },
	    $$inline: true
	  });
	  var link1 = new Link({
	    props: {
	      to: "/",
	      $$slots: {
	        default: [create_default_slot_3]
	      },
	      $$scope: {
	        ctx: ctx
	      }
	    },
	    $$inline: true
	  });
	  var link2 = new Link({
	    props: {
	      to: "/about",
	      $$slots: {
	        default: [create_default_slot_2]
	      },
	      $$scope: {
	        ctx: ctx
	      }
	    },
	    $$inline: true
	  });
	  var link3 = new Link({
	    props: {
	      to: "/",
	      $$slots: {
	        default: [create_default_slot_1]
	      },
	      $$scope: {
	        ctx: ctx
	      }
	    },
	    $$inline: true
	  });
	  var link4 = new Link({
	    props: {
	      to: "/about",
	      $$slots: {
	        default: [create_default_slot]
	      },
	      $$scope: {
	        ctx: ctx
	      }
	    },
	    $$inline: true
	  });
	  var block = {
	    c: function create() {
	      nav = element("nav");
	      div1 = element("div");
	      a0 = element("a");
	      i = element("i");
	      i.textContent = "menu";
	      t1 = space();
	      div0 = element("div");
	      create_component(link0.$$.fragment);
	      t2 = space();
	      ul0 = element("ul");
	      li0 = element("li");
	      create_component(link1.$$.fragment);
	      t3 = space();
	      li1 = element("li");
	      create_component(link2.$$.fragment);
	      t4 = space();
	      ul1 = element("ul");
	      li2 = element("li");
	      create_component(link3.$$.fragment);
	      t5 = space();
	      li3 = element("li");
	      create_component(link4.$$.fragment);
	      t6 = space();
	      li4 = element("li");
	      a1 = element("a");
	      a1.textContent = "www.seanbase.com";
	      attr_dev(i, "class", "material-icons");
	      add_location(i, file$9, 23, 6, 306);
	      attr_dev(a0, "href", "#");
	      attr_dev(a0, "data-target", "mobile-demo");
	      attr_dev(a0, "class", "sidenav-trigger");
	      add_location(a0, file$9, 19, 4, 219);
	      add_location(li0, file$9, 30, 8, 535);
	      add_location(li1, file$9, 33, 8, 614);
	      attr_dev(ul0, "id", "nav-mobile");
	      attr_dev(ul0, "class", "right hide-on-small-only");
	      add_location(ul0, file$9, 29, 6, 473);
	      attr_dev(div0, "class", "container");
	      add_location(div0, file$9, 25, 4, 354);
	      attr_dev(div1, "class", "nav-wrapper custom-grey");
	      add_location(div1, file$9, 18, 2, 177);
	      add_location(nav, file$9, 17, 0, 169);
	      add_location(li2, file$9, 42, 2, 771);
	      add_location(li3, file$9, 45, 2, 832);
	      attr_dev(a1, "href", "http://www.seanbase.com");
	      add_location(a1, file$9, 49, 4, 908);
	      add_location(li4, file$9, 48, 2, 899);
	      attr_dev(ul1, "class", "sidenav");
	      attr_dev(ul1, "id", "mobile-demo");
	      add_location(ul1, file$9, 41, 0, 731);
	    },
	    l: function claim(nodes) {
	      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor) {
	      insert_dev(target, nav, anchor);
	      append_dev(nav, div1);
	      append_dev(div1, a0);
	      append_dev(a0, i);
	      append_dev(div1, t1);
	      append_dev(div1, div0);
	      mount_component(link0, div0, null);
	      append_dev(div0, t2);
	      append_dev(div0, ul0);
	      append_dev(ul0, li0);
	      mount_component(link1, li0, null);
	      append_dev(ul0, t3);
	      append_dev(ul0, li1);
	      mount_component(link2, li1, null);
	      insert_dev(target, t4, anchor);
	      insert_dev(target, ul1, anchor);
	      append_dev(ul1, li2);
	      mount_component(link3, li2, null);
	      append_dev(ul1, t5);
	      append_dev(ul1, li3);
	      mount_component(link4, li3, null);
	      append_dev(ul1, t6);
	      append_dev(ul1, li4);
	      append_dev(li4, a1);
	      current = true;
	    },
	    p: function update(ctx, _ref) {
	      var _ref2 = _slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      var link0_changes = {};

	      if (dirty &
	      /*$$scope*/
	      2) {
	        link0_changes.$$scope = {
	          dirty: dirty,
	          ctx: ctx
	        };
	      }

	      link0.$set(link0_changes);
	      var link1_changes = {};

	      if (dirty &
	      /*$$scope, $_*/
	      3) {
	        link1_changes.$$scope = {
	          dirty: dirty,
	          ctx: ctx
	        };
	      }

	      link1.$set(link1_changes);
	      var link2_changes = {};

	      if (dirty &
	      /*$$scope, $_*/
	      3) {
	        link2_changes.$$scope = {
	          dirty: dirty,
	          ctx: ctx
	        };
	      }

	      link2.$set(link2_changes);
	      var link3_changes = {};

	      if (dirty &
	      /*$$scope, $_*/
	      3) {
	        link3_changes.$$scope = {
	          dirty: dirty,
	          ctx: ctx
	        };
	      }

	      link3.$set(link3_changes);
	      var link4_changes = {};

	      if (dirty &
	      /*$$scope, $_*/
	      3) {
	        link4_changes.$$scope = {
	          dirty: dirty,
	          ctx: ctx
	        };
	      }

	      link4.$set(link4_changes);
	    },
	    i: function intro(local) {
	      if (current) return;
	      transition_in(link0.$$.fragment, local);
	      transition_in(link1.$$.fragment, local);
	      transition_in(link2.$$.fragment, local);
	      transition_in(link3.$$.fragment, local);
	      transition_in(link4.$$.fragment, local);
	      current = true;
	    },
	    o: function outro(local) {
	      transition_out(link0.$$.fragment, local);
	      transition_out(link1.$$.fragment, local);
	      transition_out(link2.$$.fragment, local);
	      transition_out(link3.$$.fragment, local);
	      transition_out(link4.$$.fragment, local);
	      current = false;
	    },
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(nav);
	      destroy_component(link0);
	      destroy_component(link1);
	      destroy_component(link2);
	      if (detaching) detach_dev(t4);
	      if (detaching) detach_dev(ul1);
	      destroy_component(link3);
	      destroy_component(link4);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$d.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function instance$d($$self, $$props, $$invalidate) {
	  var $_;
	  validate_store(X, "_");
	  component_subscribe($$self, X, function ($$value) {
	    return $$invalidate(0, $_ = $$value);
	  });
	  var writable_props = [];
	  Object.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Navbar> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("Navbar", $$slots, []);

	  $$self.$capture_state = function () {
	    return {
	      Link: Link,
	      _: X,
	      $_: $_
	    };
	  };

	  return [$_];
	}

	var Navbar = /*#__PURE__*/function (_SvelteComponentDev) {
	  _inherits(Navbar, _SvelteComponentDev);

	  var _super = _createSuper$e(Navbar);

	  function Navbar(options) {
	    var _this;

	    _classCallCheck(this, Navbar);

	    _this = _super.call(this, options);
	    init(_assertThisInitialized(_this), options, instance$d, create_fragment$d, safe_not_equal, {});
	    dispatch_dev("SvelteRegisterComponent", {
	      component: _assertThisInitialized(_this),
	      tagName: "Navbar",
	      options: options,
	      id: create_fragment$d.name
	    });
	    return _this;
	  }

	  return Navbar;
	}(SvelteComponentDev);

	function _createSuper$f(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$f()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$f() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	var Error_1$1 = globals.Error;
	var file$a = "src/App.svelte"; // (29:0) {:else}

	function create_else_block$2(ctx) {
	  var p;
	  var block = {
	    c: function create() {
	      p = element("p");
	      p.textContent = "Loading...";
	      add_location(p, file$a, 29, 2, 982);
	    },
	    m: function mount(target, anchor) {
	      insert_dev(target, p, anchor);
	    },
	    p: noop,
	    i: noop,
	    o: noop,
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(p);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_else_block$2.name,
	    type: "else",
	    source: "(29:0) {:else}",
	    ctx: ctx
	  });
	  return block;
	} // (20:0) {#if $isLocaleLoaded}


	function create_if_block$2(ctx) {
	  var current;
	  var router = new Router({
	    props: {
	      $$slots: {
	        default: [create_default_slot$1]
	      },
	      $$scope: {
	        ctx: ctx
	      }
	    },
	    $$inline: true
	  });
	  var block = {
	    c: function create() {
	      create_component(router.$$.fragment);
	    },
	    m: function mount(target, anchor) {
	      mount_component(router, target, anchor);
	      current = true;
	    },
	    p: function update(ctx, dirty) {
	      var router_changes = {};

	      if (dirty &
	      /*$$scope*/
	      2) {
	        router_changes.$$scope = {
	          dirty: dirty,
	          ctx: ctx
	        };
	      }

	      router.$set(router_changes);
	    },
	    i: function intro(local) {
	      if (current) return;
	      transition_in(router.$$.fragment, local);
	      current = true;
	    },
	    o: function outro(local) {
	      transition_out(router.$$.fragment, local);
	      current = false;
	    },
	    d: function destroy(detaching) {
	      destroy_component(router, detaching);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_if_block$2.name,
	    type: "if",
	    source: "(20:0) {#if $isLocaleLoaded}",
	    ctx: ctx
	  });
	  return block;
	} // (21:2) <Router>


	function create_default_slot$1(ctx) {
	  var t0;
	  var t1;
	  var t2;
	  var t3;
	  var t4;
	  var current;
	  var navbar = new Navbar({
	    $$inline: true
	  });
	  var route0 = new Route({
	    props: {
	      path: "/",
	      component: Home
	    },
	    $$inline: true
	  });
	  var route1 = new Route({
	    props: {
	      path: "/about",
	      component: About
	    },
	    $$inline: true
	  });
	  var route2 = new Route({
	    props: {
	      path: "/checkout",
	      component: Checkout
	    },
	    $$inline: true
	  });
	  var route3 = new Route({
	    props: {
	      path: "/success",
	      component: Success
	    },
	    $$inline: true
	  });
	  var route4 = new Route({
	    props: {
	      path: "/error",
	      component: Error$1
	    },
	    $$inline: true
	  });
	  var block = {
	    c: function create() {
	      create_component(navbar.$$.fragment);
	      t0 = space();
	      create_component(route0.$$.fragment);
	      t1 = space();
	      create_component(route1.$$.fragment);
	      t2 = space();
	      create_component(route2.$$.fragment);
	      t3 = space();
	      create_component(route3.$$.fragment);
	      t4 = space();
	      create_component(route4.$$.fragment);
	    },
	    m: function mount(target, anchor) {
	      mount_component(navbar, target, anchor);
	      insert_dev(target, t0, anchor);
	      mount_component(route0, target, anchor);
	      insert_dev(target, t1, anchor);
	      mount_component(route1, target, anchor);
	      insert_dev(target, t2, anchor);
	      mount_component(route2, target, anchor);
	      insert_dev(target, t3, anchor);
	      mount_component(route3, target, anchor);
	      insert_dev(target, t4, anchor);
	      mount_component(route4, target, anchor);
	      current = true;
	    },
	    p: noop,
	    i: function intro(local) {
	      if (current) return;
	      transition_in(navbar.$$.fragment, local);
	      transition_in(route0.$$.fragment, local);
	      transition_in(route1.$$.fragment, local);
	      transition_in(route2.$$.fragment, local);
	      transition_in(route3.$$.fragment, local);
	      transition_in(route4.$$.fragment, local);
	      current = true;
	    },
	    o: function outro(local) {
	      transition_out(navbar.$$.fragment, local);
	      transition_out(route0.$$.fragment, local);
	      transition_out(route1.$$.fragment, local);
	      transition_out(route2.$$.fragment, local);
	      transition_out(route3.$$.fragment, local);
	      transition_out(route4.$$.fragment, local);
	      current = false;
	    },
	    d: function destroy(detaching) {
	      destroy_component(navbar, detaching);
	      if (detaching) detach_dev(t0);
	      destroy_component(route0, detaching);
	      if (detaching) detach_dev(t1);
	      destroy_component(route1, detaching);
	      if (detaching) detach_dev(t2);
	      destroy_component(route2, detaching);
	      if (detaching) detach_dev(t3);
	      destroy_component(route3, detaching);
	      if (detaching) detach_dev(t4);
	      destroy_component(route4, detaching);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_default_slot$1.name,
	    type: "slot",
	    source: "(21:2) <Router>",
	    ctx: ctx
	  });
	  return block;
	}

	function create_fragment$e(ctx) {
	  var current_block_type_index;
	  var if_block;
	  var if_block_anchor;
	  var current;
	  var if_block_creators = [create_if_block$2, create_else_block$2];
	  var if_blocks = [];

	  function select_block_type(ctx, dirty) {
	    if (
	    /*$isLocaleLoaded*/
	    ctx[0]) return 0;
	    return 1;
	  }

	  current_block_type_index = select_block_type(ctx);
	  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	  var block = {
	    c: function create() {
	      if_block.c();
	      if_block_anchor = empty();
	    },
	    l: function claim(nodes) {
	      throw new Error_1$1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor) {
	      if_blocks[current_block_type_index].m(target, anchor);
	      insert_dev(target, if_block_anchor, anchor);
	      current = true;
	    },
	    p: function update(ctx, _ref) {
	      var _ref2 = _slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      var previous_block_index = current_block_type_index;
	      current_block_type_index = select_block_type(ctx);

	      if (current_block_type_index === previous_block_index) {
	        if_blocks[current_block_type_index].p(ctx, dirty);
	      } else {
	        group_outros();
	        transition_out(if_blocks[previous_block_index], 1, 1, function () {
	          if_blocks[previous_block_index] = null;
	        });
	        check_outros();
	        if_block = if_blocks[current_block_type_index];

	        if (!if_block) {
	          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	          if_block.c();
	        }

	        transition_in(if_block, 1);
	        if_block.m(if_block_anchor.parentNode, if_block_anchor);
	      }
	    },
	    i: function intro(local) {
	      if (current) return;
	      transition_in(if_block);
	      current = true;
	    },
	    o: function outro(local) {
	      transition_out(if_block);
	      current = false;
	    },
	    d: function destroy(detaching) {
	      if_blocks[current_block_type_index].d(detaching);
	      if (detaching) detach_dev(if_block_anchor);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$e.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function instance$e($$self, $$props, $$invalidate) {
	  var $isLocaleLoaded;
	  validate_store(isLocaleLoaded, "isLocaleLoaded");
	  component_subscribe($$self, isLocaleLoaded, function ($$value) {
	    return $$invalidate(0, $isLocaleLoaded = $$value);
	  });
	  var writable_props = [];
	  Object.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<App> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("App", $$slots, []);

	  $$self.$capture_state = function () {
	    return {
	      Router: Router,
	      Route: Route,
	      setupI18n: setupI18n,
	      isLocaleLoaded: isLocaleLoaded,
	      locale: j$2,
	      derived: derived,
	      Home: Home,
	      About: About,
	      Success: Success,
	      Checkout: Checkout,
	      Error: Error$1,
	      Navbar: Navbar,
	      $isLocaleLoaded: $isLocaleLoaded
	    };
	  };

	  $$self.$$.update = function () {
	    if ($$self.$$.dirty &
	    /*$isLocaleLoaded*/
	    1) {
	       if (!$isLocaleLoaded) {
	        setupI18n({
	          withLocale: "jp"
	        });
	      }
	    }
	  };

	  return [$isLocaleLoaded];
	}

	var App = /*#__PURE__*/function (_SvelteComponentDev) {
	  _inherits(App, _SvelteComponentDev);

	  var _super = _createSuper$f(App);

	  function App(options) {
	    var _this;

	    _classCallCheck(this, App);

	    _this = _super.call(this, options);
	    init(_assertThisInitialized(_this), options, instance$e, create_fragment$e, safe_not_equal, {});
	    dispatch_dev("SvelteRegisterComponent", {
	      component: _assertThisInitialized(_this),
	      tagName: "App",
	      options: options,
	      id: create_fragment$e.name
	    });
	    return _this;
	  }

	  return App;
	}(SvelteComponentDev);

	var app = new App({
	  target: document.body
	});

	return app;

}());
//# sourceMappingURL=bundle.js.map

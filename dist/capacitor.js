/**
 * @license capacitor.js 0.4.1 Copyright (c) 2014, Mikkel Schmidt. All Rights Reserved.
 * Available via the MIT license.
 */

 (function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"), require("immutable"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash", "immutable"], factory);
	else if(typeof exports === 'object')
		exports["capacitor"] = factory(require("lodash"), require("immutable"));
	else
		root["capacitor"] = factory(root["lodash"], root["immutable"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var ActionCreator, EntityStore, IndexedListStore, ListStore, Store, actionManager, invariant;

	actionManager = __webpack_require__(2);

	ActionCreator = __webpack_require__(3);

	Store = __webpack_require__(4);

	EntityStore = __webpack_require__(5);

	ListStore = __webpack_require__(6);

	IndexedListStore = __webpack_require__(7);

	invariant = __webpack_require__(8);

	module.exports = {
	  actionManager: actionManager,
	  ActionCreator: ActionCreator,
	  Store: Store,
	  EntityStore: EntityStore,
	  ListStore: ListStore,
	  IndexedListStore: IndexedListStore,
	  invariant: invariant
	};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Action, ActionManager, dispatcher, invariant,
	  __hasProp = {}.hasOwnProperty;

	invariant = __webpack_require__(8);

	dispatcher = __webpack_require__(11);

	Action = __webpack_require__(12);

	module.exports = new (ActionManager = (function() {

	  /*
	  	 * @var {Object} actions a list of all existing actions
	  	 * @private
	   */
	  var actions;

	  function ActionManager() {}

	  actions = {};


	  /*
	  	 * Method for creating an action
	  	 *
	  	 * @param {string} name The (unique) name of the action.
	  	 * @return {Action} the created action.
	   */

	  ActionManager.prototype.create = function(name) {
	    invariant(!actions[name], "Action names are unique. An action with the name " + name + " already exists.");
	    actions[name] = new Action(name);
	    return actions[name];
	  };


	  /*
	  	 * Method for listing all existing actions
	  	 *
	  	 * @return {Array} list of existing actions
	   */

	  ActionManager.prototype.list = function() {
	    var name, _results;
	    _results = [];
	    for (name in actions) {
	      if (!__hasProp.call(actions, name)) continue;
	      _results.push(name);
	    }
	    return _results;
	  };


	  /*
	  	 * Method to check if an action exists
	  	 *
	  	 * @return {boolean}
	   */

	  ActionManager.prototype.exists = function(name) {
	    return actions[name] != null;
	  };

	  return ActionManager;

	})());


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Action, ActionCreator, ActionInstance, dispatcher, invariant, _actionID, _requestID;

	dispatcher = __webpack_require__(11);

	invariant = __webpack_require__(8);

	Action = __webpack_require__(12);

	_actionID = 0;

	_requestID = 0;

	ActionInstance = (function() {
	  function ActionInstance(type, payload) {
	    this.type = type;
	    this.payload = payload;
	    this.actionID = _actionID++;
	    Object.freeze(this);
	  }

	  ActionInstance.prototype.valueOf = function() {
	    return this.payload;
	  };

	  ActionInstance.prototype.getActionID = function() {
	    return this.actionID;
	  };

	  return ActionInstance;

	})();

	module.exports = ActionCreator = (function() {
	  function ActionCreator() {}


	  /*
	  	 * Dispatches an action through the dispatcher
	  	 *
	  	 * @param {Action} action The action to dispatch
	  	 * @param {mixed} payload Payload for the action
	   */

	  ActionCreator.prototype.dispatch = function(action, payload) {
	    var actionInstance;
	    actionInstance = this.createActionInstance(action, payload);
	    dispatcher.dispatch(actionInstance);
	    return actionInstance;
	  };


	  /*
	  	 * Creates an action instance for dispatching
	  	 *
	  	 * @param {Action} action The action to dispatch
	  	 * @param {mixed} payload Payload for the action
	   */

	  ActionCreator.prototype.createActionInstance = function(action, payload) {
	    invariant(action instanceof Action && ((action != null ? action.type : void 0) != null), "The action you dispatched does not seem to be an instance of capacitor.Action");
	    return new ActionInstance(action.type, payload);
	  };


	  /*
	  	 * Generates a request id. Useful for tracking specific requests in components.
	   */

	  ActionCreator.prototype.generateRequestID = function() {
	    return _requestID++;
	  };

	  return ActionCreator;

	})();


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Action, EventBroker, Immutable, Store, dispatcher, invariant, _,
	  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  __hasProp = {}.hasOwnProperty,
	  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	_ = __webpack_require__(9);

	Action = __webpack_require__(12);

	dispatcher = __webpack_require__(11);

	invariant = __webpack_require__(8);

	Immutable = __webpack_require__(10);

	EventBroker = __webpack_require__(13);


	/*
	 *	implementation example:
	 *
	 *	class TodoStore extends Store
	 *		@action someAction, () ->
	 *			@doStuff()
	 *			@doOtherStuff()
	 *			@profit()
	 *
	 *		doStuff: () ->
	 *			# Do things..
	 *
	 *
	 *		doOtherStuff: () ->
	 *			# Do things..
	 *
	 *		profit: () ->
	 *			# Do things..
	 *			@changed.dispatch()
	 */

	module.exports = Store = (function() {

	  /*
	  	 * @static
	  	 * @private
	   */
	  Store._handlers = null;


	  /*
	  	 * @static
	  	 * @private
	   */

	  Store._references = null;


	  /*
	  	 * @private
	   */

	  Store.prototype._properties = null;


	  /*
	  	 * @private
	   */

	  Store.prototype._cache = null;


	  /*
	  	 * @private
	   */

	  Store.prototype._currentActionInstance = null;


	  /*
	  	 * Static method for defining action handlers on a Store.
	  	 *
	  	 * @static
	  	 * @param {Action} action The Action to associated with the handler.
	  	 * @param {Function} fn The handler to call when Action is triggered.
	   */

	  Store.action = function(action, fn) {
	    var prop, _ref;
	    if (this._handlers == null) {
	      this._handlers = {};
	    }
	    invariant(action instanceof Action && typeof fn === "function", "" + this.constructor.name + ".action(...): Provided action should be created via the action\nmanager and a handler must be given as a second parameter.\nIf you're trying to reference a prototype method, don't do that.");
	    invariant(this._handlers[action] == null, "" + this.constructor.name + ".action(...): You can only define one handler pr action");
	    this._handlers[action] = fn;
	    _ref = this.prototype;
	    for (prop in _ref) {
	      if (!__hasProp.call(_ref, prop)) continue;
	      if (fn === this.prototype[prop]) {
	        console.warn("" + this.constructor.name + ".action(...): Action %s is referring to a method on the store prototype (%O).\nThis is bad practice and should be avoided.\nThe handler itself may call prototype methods,\nand is called with the store instance as context for that reason.", action, this);
	      }
	    }
	    return null;
	  };


	  /*
	  	 * Static method for defining a one to one relationship to another store.
	  	 *
	  	 * @static
	  	 * @param {String} key The key that should reference another store
	  	 * @param {EntityStore} entityStore the entity store that is referenced from this store
	   */

	  Store.hasOne = function(key, entityStore) {
	    invariant(entityStore._type === 'entity', "" + this.constructor.name + ".entityReference(...): the entity store specified for the key " + key + " is invalid.\nYou must specify a store that is a descendant of Capacitor.EntityStore.");
	    if (this._references == null) {
	      this._references = {};
	    }
	    this._references[key] = {
	      store: entityStore,
	      type: 'entity'
	    };
	    return null;
	  };


	  /*
	  	 * Static method for defining a one to many relationship to another store.
	  	 *
	  	 * @static
	  	 * @param {String} key The key that should reference another store
	  	 * @param {ListStore} listStore the list store that is referenced from this store
	   */

	  Store.hasMany = function(key, listStore) {
	    invariant(listStore._type === 'list', "" + this.constructor.name + ".listReference(...): the list store specified for the key " + key + " is invalid.\nYou must specify a store that is a descendant of Capacitor.ListStore.");
	    if (this._references == null) {
	      this._references = {};
	    }
	    this._references[key] = {
	      store: listStore,
	      type: 'list'
	    };
	    return null;
	  };

	  Store._makeInterfaceImmutable = function(interfaceObj) {
	    return Object.freeze(interfaceObj);
	  };

	  Store._getStoreType = function() {
	    return 'store';
	  };


	  /*
	  	 * Constructor function that sets up actions and events on the store
	   */

	  function Store() {
	    this._handleAction = __bind(this._handleAction, this);
	    var key, reference, that, _ref;
	    dispatcher.register(this);
	    this._properties = Immutable.Map();
	    this._cache = Immutable.Map();
	    this.changed = EventBroker();
	    this._baseInitialized = false;
	    this.initialize();
	    invariant(!!this._baseInitialized, "Initialize on the base store wasn't called. You are probably missing a super call on " + this.constructor.name + ".");
	    if (this.constructor._references != null) {
	      _ref = this.constructor._references;
	      for (key in _ref) {
	        reference = _ref[key];
	        reference.store.changed.add((function(_this) {
	          return function() {
	            return _this.changed.dispatch();
	          };
	        })(this));
	      }
	    }
	    that = this;
	    return this.constructor._makeInterfaceImmutable(this._setRequiredInterfaceProperties(this.getInterface()));
	  }

	  Store.prototype._setRequiredInterfaceProperties = function(interfaceObj) {
	    interfaceObj.changed = {
	      add: this.changed.add,
	      remove: this.changed.remove,
	      addImmediate: this.changed.addImmediate,
	      removeImmediate: this.changed.removeImmediate
	    };
	    interfaceObj._type = this.constructor._getStoreType();
	    return interfaceObj;
	  };

	  Store.prototype.initialize = function() {
	    return this._baseInitialized = true;
	  };


	  /*
	  	 * Override this to change which methods are available to consumers.
	  	 * NOTE: Remember that nothing but the store itself should be able to change the data in the store.
	   */

	  Store.prototype.getInterface = function() {
	    return {
	      get: this.get.bind(this),
	      getIn: this.getIn.bind(this),
	      _id: this._id
	    };
	  };


	  /*
	  	 * Method for caching results, this is used when dereferencing to make sure the same immutable is
	  	 * returned if the references haven't changed.
	  	 *
	  	 * @param {String} name The name for the cache
	  	 * @param {value} name The value that is written to the cache if it's different from the previous value.
	   */

	  Store.prototype.cache = function(name, value) {
	    var last;
	    last = this._cache.get(name);
	    if (!Immutable.Iterable.isIterable(last) || !Immutable.is(last, value)) {
	      this._cache = this._cache.set(name, value);
	      return value;
	    }
	    return last;
	  };


	  /*
	  	 * Method for dereferencing a value by using the key's related store.
	  	 *
	  	 * @param {String} key The key for the value to dereference
	   */

	  Store.prototype.dereference = function(key) {
	    var id, reference, result, _ref;
	    reference = (_ref = this.constructor._references) != null ? _ref[key] : void 0;
	    invariant((reference != null ? reference.store : void 0) != null, "" + this.constructor.name + ".dereference(...): There's no reference store for the key " + key);
	    id = this._properties.get(key);
	    result = null;
	    if (reference.type === 'entity' && (id != null)) {
	      invariant(_.isString(id) || _.isNumber(id), "" + this.constructor.name + ".dereference(...): The value for " + key + " was neither a string nor a number.\nThe value of " + key + " should be the id of the item that " + key + " is a reference to.");
	      result = reference.store.getItem(id);
	    } else if (reference.type === 'list') {
	      result = reference.store.getItems();
	    }
	    return result;
	  };

	  Store.prototype.getIn = function(path) {
	    var key, result, _i, _len;
	    invariant(_.isArray(path), "" + this.constructor.name + ".getIn(...): Path should be an array.");
	    result = this.get();
	    for (_i = 0, _len = path.length; _i < _len; _i++) {
	      key = path[_i];
	      if (result != null ? result.get : void 0) {
	        result = result.get(key);
	      } else {
	        result = void 0;
	      }
	    }
	    return result;
	  };

	  Store.prototype.getRawIn = function(path) {
	    var key, result, _i, _len;
	    invariant(_.isArray(path), "" + this.constructor.name + ".getIn(...): Path should be an array.");
	    result = this.getRaw();
	    for (_i = 0, _len = path.length; _i < _len; _i++) {
	      key = path[_i];
	      if (result != null ? result.get : void 0) {
	        result = result.get(key);
	      } else {
	        result = void 0;
	      }
	    }
	    return result;
	  };

	  Store.prototype.get = function(key) {
	    var dereferencedProperties, references, that, val, _ref;
	    val = null;
	    if (key != null) {
	      invariant(_.isString(key), "" + this.constructor.name + ".get(...): first parameter should be undefined or a string");
	      if (((_ref = this.constructor._references) != null ? _ref[key] : void 0) != null) {
	        val = this.dereference(key);
	      } else {
	        val = this._properties.get(key);
	      }
	    } else {
	      references = this.constructor._references;
	      if (references != null) {
	        that = this;
	        dereferencedProperties = this._properties.withMutations(function(map) {
	          var _results;
	          _results = [];
	          for (key in references) {
	            _results.push(map.set(key, that.dereference(key)));
	          }
	          return _results;
	        });
	        val = this.cache('dereffed_props', dereferencedProperties);
	      } else {
	        val = this._properties;
	      }
	    }
	    return val;
	  };

	  Store.prototype.getRaw = function(key) {
	    var val;
	    val = null;
	    if (key != null) {
	      invariant(_.isString(key), "" + this.constructor.name + ".get(...): first parameter should be undefined or a string");
	      val = this._properties.get(key);
	    } else {
	      val = this._properties;
	    }
	    return val;
	  };

	  Store.prototype.validateReferenceOnSet = function(type, key, value) {
	    switch (type) {
	      case 'entity':
	        invariant(_.isString(value) || _.isNumber(value), "" + this.constructor.name + ".set(...): " + key + " must be an id for an entity on the referenced store.\nIe. either a string or a number.");
	        return value;
	      case 'list':
	        console.warn("" + this.constructor.name + ".set(...): " + key + " is a reference to a list store.\nYou can't set a value for a reference to a list store. Defaulting to null.");
	        return null;
	    }
	  };

	  Store.prototype.set = function(key, val) {
	    var keys, obj, references, values;
	    invariant(_.isObject(key) || _.isString(key) && (val != null), "" + this.constructor.name + ".set(...): You can only set an object or pass a string and a value.\nUse " + this.constructor.name + ".unset(" + key + ") to unset the property.");
	    if (_.isString(key)) {
	      obj = {};
	      obj[key] = Immutable.fromJS(val);
	      this._properties = this._properties.merge(Immutable.Map(obj));
	    }
	    if (_.isObject(key)) {
	      keys = key;
	      values = {};
	      references = this.constructor._references;
	      for (key in keys) {
	        if (__indexOf.call(_.keys(references), key) >= 0) {
	          values[key] = this.validateReferenceOnSet(references[key].type, key, keys[key]);
	        } else {
	          values[key] = keys[key];
	        }
	      }
	      this._properties = this._properties.merge(Immutable.fromJS(values));
	    }
	    return this;
	  };

	  Store.prototype.merge = function(name, val) {
	    if (_.isString(name)) {
	      this._properties = this._properties.mergeDeep(val);
	    }
	    if (_.isObject(name)) {
	      this._properties = this._properties.mergeDeep(name);
	    }
	    return this;
	  };

	  Store.prototype.unset = function(name) {
	    invariant(_.isString(name), "" + this.constructor.name + ".unset(...): first parameter must be a string.");
	    if (this._properties.get(name) != null) {
	      this._properties = this._properties.remove(name);
	    }
	    return this;
	  };

	  Store.prototype.getCurrentActionID = function() {
	    invariant(this._currentActionInstance != null, "Action id is only available inside an action handler, in the current event loop iteration.");
	    return this._currentActionInstance.actionID;
	  };


	  /*
	  	 * Method for calling handlers on the store when an action is executed.
	  	 *
	  	 * @param {string} actionName The name of the executed action
	  	 * @param {mixed} payload The payload passed to the handler
	  	 * @param {array} waitFor An array of other signals to wait for in this dispatcher run.
	   */

	  Store.prototype._handleAction = function(actionInstance, waitFor) {
	    var _ref;
	    if (((_ref = this.constructor._handlers) != null ? _ref[actionInstance.type] : void 0) == null) {
	      return;
	    }
	    this._currentActionInstance = actionInstance;
	    this.constructor._handlers[actionInstance.type].call(this, actionInstance.payload, waitFor);
	    return this._currentActionInstance = null;
	  };

	  return Store;

	})();


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var EntityStore, Immutable, Store, invariant, _,
	  __hasProp = {}.hasOwnProperty,
	  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	Store = __webpack_require__(4);

	invariant = __webpack_require__(8);

	Immutable = __webpack_require__(10);

	_ = __webpack_require__(9);

	module.exports = EntityStore = (function(_super) {
	  __extends(EntityStore, _super);

	  function EntityStore() {
	    return EntityStore.__super__.constructor.apply(this, arguments);
	  }

	  EntityStore.hasMany = function(key, listStore) {
	    if (arguments.length === 1) {
	      return {
	        through: (function(_this) {
	          return function(indexedListStore) {
	            invariant(indexedListStore._type === 'indexed-list', "" + _this.constructor.name + ".hasMany(...).through(...): the indexed list store specified for the key " + key + " is invalid.\nYou must specify a store that is a descendant of Capacitor.IndexedListStore.");
	            if (_this._references == null) {
	              _this._references = {};
	            }
	            _this._references[key] = {
	              store: indexedListStore,
	              type: 'indexed-list'
	            };
	            return null;
	          };
	        })(this)
	      };
	    }
	    return EntityStore.__super__.constructor.hasMany.apply(this, arguments);
	  };

	  EntityStore._getStoreType = function() {
	    return 'entity';
	  };


	  /*
	  	 * Dereferences a specific key on an item, similar to Store.dereference.
	  	 *
	  	 * @overrides Store::dereference
	  	 * @param {Immutable.Map} item The item that will be dereferenced
	  	 * @param {String} key The key on the item to dereference
	   */

	  EntityStore.prototype.dereference = function(item, key) {
	    var id, reference, result, _ref;
	    reference = (_ref = this.constructor._references) != null ? _ref[key] : void 0;
	    invariant((reference != null ? reference.store : void 0) != null, "" + this.constructor.name + ".dereference(...): There's no reference store for the key " + key);
	    id = item.get(key);
	    result = null;
	    if (reference.type === 'entity' && (id != null)) {
	      invariant(_.isString(id) || _.isNumber(id), "" + this.constructor.name + ".dereference(...): The value for " + key + " was neither a string nor a number.\nThe value of " + key + " should be the id of the item that {key} is a reference to.");
	      result = reference.store.getItem(id);
	    } else if (reference.type === 'list') {
	      result = reference.store.getItems();
	    } else if (reference.type === 'indexed-list') {
	      result = reference.store.getItems(item.get('id'));
	    }
	    return result;
	  };


	  /*
	  	 * Dereferences all defined relationships on an item
	  	 *
	  	 * @param {Immutable.Map} item The item to dereference
	   */

	  EntityStore.prototype.dereferenceItem = function(item) {
	    var dereferencedProperties, references, that, val;
	    references = this.constructor._references;
	    if (references != null) {
	      that = this;
	      dereferencedProperties = item.withMutations(function(map) {
	        var key, _results;
	        _results = [];
	        for (key in references) {
	          _results.push(map.set(key, that.dereference(item, key)));
	        }
	        return _results;
	      });
	      return val = this.cache("dereffed-item-" + (item.get('id')), dereferencedProperties);
	    } else {
	      return val = item;
	    }
	  };

	  EntityStore.prototype.initialize = function() {
	    EntityStore.__super__.initialize.apply(this, arguments);
	    return this.set('items', Immutable.Map());
	  };

	  EntityStore.prototype.getInterface = function() {
	    var interfaceObj;
	    interfaceObj = EntityStore.__super__.getInterface.apply(this, arguments);
	    interfaceObj.getItem = this.getItem.bind(this);
	    interfaceObj.getItemsWithIds = this.getItemsWithIds.bind(this);
	    interfaceObj.getItems = this.getItems.bind(this);
	    return interfaceObj;
	  };

	  EntityStore.prototype.setItem = function(item) {
	    if (!Immutable.Iterable.isIterable(item)) {
	      item = Immutable.fromJS(item);
	    }
	    invariant(item.get('id') != null, "" + this.constructor.name + ".addItem(...): Can't add an item with no id (item.id is missing).");
	    return this.setItems(this.get('items').set(item.get('id'), item));
	  };

	  EntityStore.prototype.setItems = function(items) {
	    invariant(Immutable.Map.isMap(items), "" + this.constructor.name + ".addItem(...): items has to be an immutable map.");
	    return this.set('items', items);
	  };

	  EntityStore.prototype.getItem = function(id) {
	    var item, result;
	    invariant(_.isString(id) || _.isNumber(id), "" + this.constructor.name + ".addItem(...): id has to be either a string or a number.");
	    result = null;
	    item = this.get('items').get(id);
	    if (item != null) {
	      result = this.dereferenceItem(item);
	    }
	    return result;
	  };

	  EntityStore.prototype.getRawItem = function(id) {
	    return this.getRawItems().get(id);
	  };

	  EntityStore.prototype.getItems = function() {
	    return this.cache('items', this.get('items').map((function(_this) {
	      return function(item) {
	        return _this.dereferenceItem(item);
	      };
	    })(this)));
	  };

	  EntityStore.prototype.getRawItems = function() {
	    return this.get('items');
	  };


	  /*
	  	 * Method for getting values from this store, with dereferencing disabled.
	  	 * References for an entity store is defined for the items not for the store itself.
	  	 *
	  	 * @overrides Store::get
	   */

	  EntityStore.prototype.get = function(key) {
	    var val;
	    val = null;
	    if (key != null) {
	      invariant(_.isString(key), "" + this.constructor.name + ".get(...): first parameter should be undefined or a string");
	      val = this._properties.get(key);
	    } else {
	      val = this._properties;
	    }
	    return val;
	  };


	  /*
	  	 * This method does not guarantee the same list to be returned for the same set of ids.
	  	 * That said, the items contained in the list are gauranteed to be equal to the items in other lists.
	  	 * If you require getting the same List instance on every call, you must cache the results yourself.
	  	 * Use Store::cache for this.
	  	 *
	  	 * @return The items with the given ids, in the same order as specified in ids
	   */

	  EntityStore.prototype.getItemsWithIds = function(ids) {
	    var id, items, result, _i, _len;
	    if (Immutable.Iterable.isIterable(ids)) {
	      ids = ids.toJS();
	    }
	    result = [];
	    items = this.get('items');
	    for (_i = 0, _len = ids.length; _i < _len; _i++) {
	      id = ids[_i];
	      if (items.has(id)) {
	        result.push(this.getItem(id));
	      }
	    }
	    return Immutable.List(result);
	  };

	  EntityStore.prototype.getRawItemsWithIds = function(ids) {
	    var id, items, result, _i, _len;
	    if (Immutable.Iterable.isIterable(ids)) {
	      ids = ids.toJS();
	    }
	    result = [];
	    items = this.get('items');
	    for (_i = 0, _len = ids.length; _i < _len; _i++) {
	      id = ids[_i];
	      if (items.has(id)) {
	        result.push(this.getRawItem(id));
	      }
	    }
	    return Immutable.List(result);
	  };

	  EntityStore.prototype.removeItem = function(id) {
	    var items;
	    items = this.get('items');
	    return this.set('items', items.remove(id));
	  };

	  return EntityStore;

	})(Store);


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Immutable, ListStore, Store, invariant, _,
	  __hasProp = {}.hasOwnProperty,
	  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	Store = __webpack_require__(4);

	invariant = __webpack_require__(8);

	Immutable = __webpack_require__(10);

	_ = __webpack_require__(9);

	module.exports = ListStore = (function(_super) {
	  __extends(ListStore, _super);

	  function ListStore() {
	    return ListStore.__super__.constructor.apply(this, arguments);
	  }

	  ListStore.hasOne = function() {
	    throw new Error("" + this.constructor.name + ".hasOne(...): You can't define relationships on a list store");
	  };

	  ListStore.hasMany = function() {
	    throw new Error("" + this.constructor.name + ".hasMany(...): You can't define relationships on a list store");
	  };

	  ListStore._getStoreType = function() {
	    return 'list';
	  };

	  ListStore.prototype.containsEntity = null;

	  ListStore.prototype.getInterface = function() {
	    var interfaceObj;
	    interfaceObj = ListStore.__super__.getInterface.apply(this, arguments);
	    interfaceObj.getItems = this.getItems.bind(this);
	    interfaceObj.getItem = this.getItem.bind(this);
	    return interfaceObj;
	  };

	  ListStore.prototype.initialize = function() {
	    ListStore.__super__.initialize.apply(this, arguments);
	    invariant(this.containsEntity != null, "ListStore.initialize(...): Missing @containsEntity property. \nYou need to define an entity store to use the list store.");
	    this.setIds(Immutable.List());
	    return this.containsEntity.changed.addImmediate((function(_this) {
	      return function() {
	        return _this.changed.dispatch();
	      };
	    })(this));
	  };

	  ListStore.prototype.add = function(ids) {
	    var currentIds;
	    if (Immutable.Iterable.isIterable(ids)) {
	      ids = ids.toJS();
	    }
	    invariant(_.isNumber(ids) || _.isString(ids) || _.isArray(ids), "ListStore.add(...): Add only accepts an id or an array of ids.");
	    if (!_.isArray(ids)) {
	      ids = [ids];
	    }
	    currentIds = this.getIds().withMutations(function(list) {
	      var id, _i, _len, _results;
	      _results = [];
	      for (_i = 0, _len = ids.length; _i < _len; _i++) {
	        id = ids[_i];
	        _results.push(list.push(id));
	      }
	      return _results;
	    });
	    return this.setIds(currentIds);
	  };

	  ListStore.prototype.remove = function(id) {
	    var currentIds, indexOf;
	    currentIds = this.getIds();
	    indexOf = currentIds.indexOf(id);
	    invariant(indexOf !== -1, "ListStore.remove(...): Id " + id + " was not found in the store");
	    currentIds = currentIds.remove(indexOf);
	    return this.setIds(currentIds);
	  };

	  ListStore.prototype.reset = function(ids) {
	    if (Immutable.Iterable.isIterable(ids)) {
	      ids = ids.toJS();
	    }
	    invariant((ids == null) || _.isNumber(ids) || _.isString(ids) || _.isArray(ids), "ListStore.reset(...): Reset only accepts an id, an array of ids or nothing.");
	    if (ids != null) {
	      if (!_.isArray(ids)) {
	        ids = [ids];
	      }
	    } else {
	      ids = [];
	    }
	    return this.setIds(Immutable.List(ids));
	  };

	  ListStore.prototype.getIds = function() {
	    return this.get('ids');
	  };

	  ListStore.prototype.setIds = function(ids) {
	    return this.set('ids', ids);
	  };

	  ListStore.prototype.getItems = function() {
	    var ids, items;
	    ids = this.getIds();
	    items = this.containsEntity.getItemsWithIds(ids);
	    return this.cache('ids_items', items);
	  };

	  ListStore.prototype.getItem = function(id) {
	    if (this.get('ids').includes(id)) {
	      return this.containsEntity.getItem(id);
	    }
	    return null;
	  };

	  return ListStore;

	})(Store);


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Immutable, IndexedListStore, Store, invariant, _,
	  __hasProp = {}.hasOwnProperty,
	  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	Store = __webpack_require__(4);

	invariant = __webpack_require__(8);

	Immutable = __webpack_require__(10);

	_ = __webpack_require__(9);

	module.exports = IndexedListStore = (function(_super) {
	  __extends(IndexedListStore, _super);

	  function IndexedListStore() {
	    return IndexedListStore.__super__.constructor.apply(this, arguments);
	  }

	  IndexedListStore.hasOne = function() {
	    throw new Error("" + this.constructor.name + ".hasOne(...): You can't define relationships on an indexed list store");
	  };

	  IndexedListStore.hasMany = function() {
	    throw new Error("" + this.constructor.name + ".hasMany(...): You can't define relationships on an indexed list store");
	  };

	  IndexedListStore._getStoreType = function() {
	    return 'indexed-list';
	  };

	  IndexedListStore.prototype.containsEntity = null;

	  IndexedListStore.prototype.getInterface = function() {
	    var interfaceObj;
	    interfaceObj = IndexedListStore.__super__.getInterface.apply(this, arguments);
	    interfaceObj.getItems = this.getItems.bind(this);
	    interfaceObj.getItem = this.getItem.bind(this);
	    return interfaceObj;
	  };

	  IndexedListStore.prototype.initialize = function() {
	    IndexedListStore.__super__.initialize.apply(this, arguments);
	    invariant(this.containsEntity != null, "" + this.constructor.name + ".initialize(...): Missing @containsEntity property. \nYou need to define an entity store to use the IndexedIndexedListStore.");
	    this.set('map', Immutable.Map({}));
	    return this.containsEntity.changed.addImmediate((function(_this) {
	      return function() {
	        return _this.changed.dispatch();
	      };
	    })(this));
	  };

	  IndexedListStore.prototype.add = function(index, ids) {
	    var currentIds, existingType;
	    invariant(_.isNumber(index) || _.isString(index), "" + this.constructor.name + ".add(...): First parameter should be a number (id) or a string identifier.");
	    invariant(_.isNumber(ids) || _.isString(ids) || _.isArray(ids), "" + this.constructor.name + ".add(...): Second parameter should be a number/string (id) or an array of numbers/strings (ids).");
	    if (!_.isArray(ids)) {
	      ids = [ids];
	    }
	    currentIds = this.getIds(index);
	    existingType = ids.size > 0 ? typeof ids[0] : null;
	    if (currentIds.size > 0) {
	      existingType = typeof currentIds.get(0);
	    } else if (ids.length > 0) {
	      existingType = typeof ids[0];
	    }
	    return this.setIds(index, currentIds.withMutations(function(list) {
	      var id, _i, _len, _results;
	      _results = [];
	      for (_i = 0, _len = ids.length; _i < _len; _i++) {
	        id = ids[_i];
	        invariant(existingType === typeof id, "" + this.constructor.name + ".add(...): Trying to mix numbers and strings as ids");
	        _results.push(list.push(id));
	      }
	      return _results;
	    }));
	  };

	  IndexedListStore.prototype.getIds = function(index) {
	    var _ref;
	    return (_ref = this.get('map').get(index)) != null ? _ref : Immutable.List([]);
	  };

	  IndexedListStore.prototype.setIds = function(index, ids) {
	    var map, t;
	    ids = Immutable.fromJS(ids);
	    map = this.get('map');
	    if (ids.size > 0) {
	      t = typeof (ids.get(0));
	      invariant(t === 'number' || t === 'string', "" + this.constructor.name + ".setIds(...) type of ids must be a number or a string");
	      invariant(ids.find(function(e) {
	        return typeof e !== t;
	      }) == null, "" + this.constructor.name + ".setIds(...) mixed numbers and strings in ids");
	    }
	    map = map.set(index, ids);
	    return this.set('map', map);
	  };

	  IndexedListStore.prototype.remove = function(index, id) {
	    var currentIds, indexOf;
	    currentIds = this.getIds(index);
	    indexOf = currentIds.indexOf(id);
	    invariant(indexOf !== -1, "" + this.constructor.name + ".remove(...): Id " + id + " was not found in the store");
	    currentIds = currentIds.remove(indexOf);
	    return this.setIds(index, currentIds);
	  };

	  IndexedListStore.prototype.removeIndex = function(index) {
	    var map;
	    map = this.get('map');
	    map = map.remove(index);
	    this.set('map', map);
	    return this.unset('cached_list_' + index);
	  };

	  IndexedListStore.prototype.resetAll = function() {
	    return this.set('map', Immutable.Map({}));
	  };

	  IndexedListStore.prototype.reset = function(index, ids) {
	    invariant(index != null, "" + this.constructor.name + ".reset(...): No index was provided.");
	    invariant((ids == null) || (_.isNumber(ids) || _.isString(ids) || _.isArray(ids)), "" + this.constructor.name + ".reset(...): Reset only accepts an id, an array of ids or nothing as the second parameter.");
	    if (ids != null) {
	      if (!_.isArray(ids)) {
	        ids = [ids];
	      }
	    } else {
	      ids = [];
	    }
	    return this.setIds(index, ids);
	  };

	  IndexedListStore.prototype.getItems = function(index) {
	    var ids, items;
	    ids = this.getIds(index);
	    items = this.containsEntity.getItemsWithIds(ids);
	    return this.cache('cached_list_' + index, items);
	  };

	  IndexedListStore.prototype.getItem = function(index, id) {
	    var ids;
	    ids = this.getIds(index);
	    if (ids.includes(id)) {
	      return this.containsEntity.getItem(id);
	    }
	    return null;
	  };

	  return IndexedListStore;

	})(Store);


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var InvariantError;

	InvariantError = __webpack_require__(14);


	/*
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provided arguments are automatically type checked and logged correctly to the console
	 * Chrome's console.log sprintf format.
	 *
	 * ex: invariant(!hasFired, "hasFired was expected to be true but was", hasFired)
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	module.exports = function(condition, message) {
	  var error;
	  if (!condition) {
	    if (message == null) {
	      error = new InvariantError("Minified exception occurred; use the non-minified dev environment\nfor the full error message and additional helpful warnings.");
	    } else {
	      error = new InvariantError(message);
	    }
	    error.framesToPop = 1;
	    throw error;
	  }
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var Dispatcher, invariant,
	  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  __slice = [].slice;

	invariant = __webpack_require__(8);

	'use strict';

	module.exports = new (Dispatcher = (function() {

	  /*
	  	 * @var {boolean} dispatching Wether or not the dispatcher is currently dispatching.
	  	 * @private
	   */
	  var currentAction, dispatching, finalizeDispatching, finalizers, isHandled, isPending, notifyStore, prepareForDispatching, storeID, stores;

	  function Dispatcher() {
	    this.dispatch = __bind(this.dispatch, this);
	    this.waitFor = __bind(this.waitFor, this);
	  }

	  dispatching = false;


	  /*
	  	 * @var {integer} storeID ID to use for the next store that gets registered.
	  	 * @private
	   */

	  storeID = 0;


	  /*
	  	 * @var {object} stores Store registry.
	  	 * @private
	   */

	  stores = {};


	  /*
	      * @var {object} isPending Object for tracking pending store callbacks.
	  	 * @private
	   */

	  isPending = {};


	  /*
	      * @var {object} isPending Object for tracking handled store callbacks.
	  	 * @private
	   */

	  isHandled = {};


	  /*
	      * @var {string} isPending The current action being dispatched, if any.
	  	 * @private
	   */

	  currentAction = null;


	  /*
	  	 * @var {array} finalizers An array of callbacks to be called when the store is finished dispatching.
	  	 * @private
	   */

	  finalizers = [];


	  /*
	      * Sets the dispatcher to a state where all stores are neither
	      * pending nor handled.
	      *
	  	 * @private
	   */

	  prepareForDispatching = function() {
	    var id, _results;
	    dispatching = true;
	    _results = [];
	    for (id in stores) {
	      isPending[id] = false;
	      _results.push(isHandled[id] = false);
	    }
	    return _results;
	  };


	  /*
	      * Method for hooking up a finalizer callback
	      *
	  	 * @private
	   */

	  Dispatcher.prototype.onFinalize = function(fn) {
	    return finalizers.push(fn);
	  };


	  /*
	      * Method for calling finalizer callbacks
	      *
	  	 * @private
	   */

	  Dispatcher.prototype.callFinalizers = function() {
	    var finalizer, _i, _len, _results;
	    _results = [];
	    for (_i = 0, _len = finalizers.length; _i < _len; _i++) {
	      finalizer = finalizers[_i];
	      _results.push(finalizer());
	    }
	    return _results;
	  };


	  /*
	      * Method for checking if the dispatcher is currently dispatching.
	      *
	  	 * @public
	   */

	  Dispatcher.prototype.isDispatching = function() {
	    return dispatching;
	  };


	  /*
	      * Resets the dispatcher state after dispatching, and fires store events.
	      *
	  	 * @private
	   */

	  finalizeDispatching = function() {
	    this.callFinalizers();
	    currentAction = null;
	    return dispatching = false;
	  };


	  /*
	      * Calls the action handler on a store with the current action and payload.
	      * This method is used when dispatching.
	      *
	      * @param {integer} id The ID of the store to notify
	  	 * @private
	   */

	  notifyStore = function(id) {
	    invariant(currentAction != null, "Cannot notify store without an action");
	    isPending[id] = true;
	    stores[id]._handleAction.call(stores[id], currentAction, this.waitFor);
	    return isHandled[id] = true;
	  };


	  /*
	      * Registers a store with the dispatcher so that it's notified when actions
	      * are dispatched.
	      *
	      * @param {Object} store The store to register with the dispatcher
	   */

	  Dispatcher.prototype.register = function(store) {
	    stores[storeID] = store;
	    return store._id = storeID++;
	  };


	  /*
	      * Unregisters a store from the dispatcher so that it's no longer
	      * notified when actions are dispatched.
	      *
	      * @param {Object} store The store to unregister from the dispatcher
	   */

	  Dispatcher.prototype.unregister = function(store) {
	    invariant((store._id != null) && (stores[store._id] != null), "dispatcher.unregister(...): Store is not registered with the dispatcher.");
	    return delete stores[store._id];
	  };


	  /*
	      * Method for waiting for other stores to complete their handling
	      * of actions. This method is passed along to the Stores when an action
	      * is dispatched.
	      *
	      * @see notifyStore
	   */

	  Dispatcher.prototype.waitFor = function() {
	    var dependency, id, storeDependencies, _i, _len, _results;
	    storeDependencies = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	    invariant(dispatching, "dispatcher.waitFor(): It's not possible to wait for dependencies when the dispatcher isn't dispatching.\nwaitFor() should be called in an action handler.");
	    _results = [];
	    for (_i = 0, _len = storeDependencies.length; _i < _len; _i++) {
	      dependency = storeDependencies[_i];
	      id = dependency._id;
	      invariant((id != null) && (stores[id] != null), 'dispatcher.waitFor(...): dependency is not registered with the dispatcher.');
	      if (isPending[id]) {
	        invariant(isHandled[id], 'dispatcher.waitFor(...): Circular dependency detected.');
	        continue;
	      }
	      _results.push(notifyStore.call(this, id));
	    }
	    return _results;
	  };


	  /*
	      * Method for dispatching in action. This method is used by the Action class
	      * when calling Action.dispatch().
	      *
	      * @param {string} actionName The name of the action to dispatch
	      * @param {mixed} payload The payload for the event.
	   */

	  Dispatcher.prototype.dispatch = function(actionInstance) {
	    var id, _results;
	    invariant(!dispatching, 'dispatcher.dispatch(...): Cannot dispatch in the middle of a dispatch.');
	    currentAction = actionInstance;
	    prepareForDispatching.call(this);
	    try {
	      _results = [];
	      for (id in stores) {
	        if (isPending[id]) {
	          continue;
	        }
	        _results.push(notifyStore.call(this, id));
	      }
	      return _results;
	    } finally {
	      finalizeDispatching.call(this);
	    }
	  };

	  return Dispatcher;

	})());


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Action, dispatcher;

	dispatcher = __webpack_require__(11);

	Action = (function() {

	  /*
	  	 * Constructor
	  	 *
	  	 * @param {string} The name of the action
	   */
	  function Action(type) {
	    this.type = type;
	  }


	  /*
	  	 * Magic method for coercing an action to a string
	   */

	  Action.prototype.toString = function() {
	    return this.type;
	  };

	  return Action;

	})();

	module.exports = Action;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var dispatcher, invariant,
	  __slice = [].slice;

	dispatcher = __webpack_require__(11);

	invariant = __webpack_require__(8);

	module.exports = function() {
	  var EventBroker, shouldTrigger, _immediateListeners, _listeners;
	  _listeners = [];
	  _immediateListeners = [];
	  shouldTrigger = false;
	  EventBroker = function() {
	    return EventBroker.dispatch();
	  };
	  EventBroker.add = function(fn, context) {
	    if (context == null) {
	      context = null;
	    }
	    return _listeners.push({
	      fn: fn,
	      context: context
	    });
	  };
	  EventBroker.remove = function(fn, context) {
	    var index, listener, listeners, _i, _len;
	    if (context == null) {
	      context = null;
	    }
	    listeners = [];
	    for (index = _i = 0, _len = _listeners.length; _i < _len; index = ++_i) {
	      listener = _listeners[index];
	      if (listener.fn !== fn && listener.context !== context) {
	        listeners.push(listener);
	      }
	    }
	    return _listeners = listeners;
	  };
	  EventBroker.addImmediate = function(fn, context) {
	    return _immediateListeners.push({
	      fn: fn,
	      context: context
	    });
	  };
	  EventBroker.removeImmediate = function(fn, context) {
	    var index, listener, listeners, _i, _len;
	    if (context == null) {
	      context = null;
	    }
	    listeners = [];
	    for (index = _i = 0, _len = _immediateListeners.length; _i < _len; index = ++_i) {
	      listener = _immediateListeners[index];
	      if (listener.fn !== fn && listener.context !== context) {
	        listeners.push(listener);
	      }
	    }
	    return _immediateListeners = listeners;
	  };
	  EventBroker.dispatch = function() {
	    var args, listener, _i, _len;
	    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	    invariant(args.length === 0, "EventBroker.dispatch(...): You can't dispatch with a payload. \nThis is due to events being batched by the dispatcher, to avoid unnecessary computations. \nIf you have a good reason to send a payload, you can use the unbatched dispatchImmediate and addImmediate.");
	    if (dispatcher.isDispatching()) {
	      shouldTrigger = true;
	    } else {
	      for (_i = 0, _len = _listeners.length; _i < _len; _i++) {
	        listener = _listeners[_i];
	        listener.fn();
	      }
	    }
	    return EventBroker.dispatchImmediate();
	  };
	  EventBroker.dispatchImmediate = function() {
	    var args, listener, _i, _len, _results;
	    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	    _results = [];
	    for (_i = 0, _len = _immediateListeners.length; _i < _len; _i++) {
	      listener = _immediateListeners[_i];
	      _results.push(listener.fn.apply(listener, args));
	    }
	    return _results;
	  };
	  dispatcher.onFinalize(function() {
	    var listener, _i, _len;
	    if (shouldTrigger === true) {
	      for (_i = 0, _len = _listeners.length; _i < _len; _i++) {
	        listener = _listeners[_i];
	        listener.fn();
	      }
	    }
	    return shouldTrigger = false;
	  });
	  return EventBroker;
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var InvariantError,
	  __hasProp = {}.hasOwnProperty,
	  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	module.exports = InvariantError = (function(_super) {
	  __extends(InvariantError, _super);

	  function InvariantError(message) {
	    this.name = "Invariant Error";
	    this.message = message;
	  }

	  return InvariantError;

	})(Error);


/***/ }
/******/ ])
});
;
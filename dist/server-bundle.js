module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 33);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* script */
__vue_exports__ = __webpack_require__(7)

/* template */
var __vue_template__ = __webpack_require__(25)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (typeof __vue_exports__.default === "object") {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

module.exports = __vue_exports__


/***/ },
/* 1 */
/***/ function(module, exports) {

module.exports = require("vue");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lru_cache__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lru_cache___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lru_cache__);
/* harmony export */ exports["a"] = fetchIdsByType;/* unused harmony export fetchItem *//* harmony export */ exports["b"] = fetchItems;/* harmony export */ exports["c"] = fetchUser;/* harmony export */ exports["d"] = watchList;


var inBrowser = typeof window !== 'undefined';

// When using bundleRenderer, the server-side application code runs in a new
// context for each request. To allow caching across multiple requests, we need
// to attach the cache to the process which is shared across all requests.
var cache = inBrowser ? null : process.__API_CACHE__ || (process.__API_CACHE__ = createCache());

function createCache() {
  return __WEBPACK_IMPORTED_MODULE_1_lru_cache___default()({
    max: 1000,
    maxAge: 1000 * 60 * 15 // 15 min cache
  });
}

// create a single api instance for all server-side requests
var api = inBrowser ? new __WEBPACK_IMPORTED_MODULE_0_firebase___default.a('https://hacker-news.firebaseio.com/v0') : process.__API__ || (process.__API__ = createServerSideAPI());

function createServerSideAPI() {
  var api = new __WEBPACK_IMPORTED_MODULE_0_firebase___default.a('https://hacker-news.firebaseio.com/v0');

  // cache the latest story ids
  api.__ids__ = {};['top', 'new', 'show', 'ask', 'job'].forEach(function (type) {
    api.child(type + 'stories').on('value', function (snapshot) {
      api.__ids__[type] = snapshot.val();
    });
  });

  // warm the front page cache every 15 min
  warmCache();
  function warmCache() {
    fetchItems((api.__ids__.top || []).slice(0, 30));
    setTimeout(warmCache, 1000 * 60 * 15);
  }

  return api;
}

function fetch(child) {
  if (cache && cache.has(child)) {
    return Promise.resolve(cache.get(child));
  } else {
    return new Promise(function (resolve, reject) {
      api.child(child).once('value', function (snapshot) {
        var val = snapshot.val();
        // mark the timestamp when this item is cached
        val.__lastUpdated = Date.now();
        cache && cache.set(child, val);
        resolve(val);
      }, reject);
    });
  }
}

function fetchIdsByType(type) {
  return api.__ids__ && api.__ids__[type] ? Promise.resolve(api.__ids__[type]) : fetch(type + 'stories');
}

function fetchItem(id) {
  return fetch('item/' + id);
}

function fetchItems(ids) {
  return Promise.all(ids.map(function (id) {
    return fetchItem(id);
  }));
}

function fetchUser(id) {
  return fetch('user/' + id);
}

function watchList(type, cb) {
  var first = true;
  var ref = api.child(type + 'stories');
  var handler = function handler(snapshot) {
    if (first) {
      first = false;
    } else {
      cb(snapshot.val());
    }
  };
  ref.on('value', handler);
  return function () {
    ref.off('value', handler);
  };
}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App_vue__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__router__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex_router_sync__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex_router_sync___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vuex_router_sync__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__filters__ = __webpack_require__(10);

/* harmony export */ __webpack_require__.d(exports, "c", function() { return app; });var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };








// sync the router with the vuex store.
// this registers `store.state.route`
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_vuex_router_sync__["sync"])(__WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__router__["a" /* default */]);

// register global utility filters.
Object.keys(__WEBPACK_IMPORTED_MODULE_5__filters__).forEach(function (key) {
  __WEBPACK_IMPORTED_MODULE_0_vue___default.a.filter(key, __WEBPACK_IMPORTED_MODULE_5__filters__[key]);
});

// create the app instance.
// here we inject the router and store to all child components,
// making them available everywhere as `this.$router` and `this.$store`.
var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(_extends({
  router: __WEBPACK_IMPORTED_MODULE_3__router__["a" /* default */],
  store: __WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */]
}, __WEBPACK_IMPORTED_MODULE_1__App_vue___default.a));

// expose the app, the router and the store.
// note we not mounting the app here, since bootstrapping will be
// different depending on whether we are in browser or on the server.
/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_3__router__, "a")) __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__router__["a"]; });
/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_2__store__, "a")) __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__store__["a"]; });


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ exports["default"] = {
  name: 'comment',
  props: ['id'],
  data: function data() {
    return {
      open: true
    };
  },

  computed: {
    comment: function comment() {
      return this.$store.state.items[this.id];
    }
  },
  beforeMount: function beforeMount() {
    this.$store.dispatch('FETCH_ITEMS', {
      ids: [this.id]
    });
  },

  methods: {
    pluralize: function pluralize(n) {
      return n + (n === 1 ? ' reply' : ' replies');
    }
  }
};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ exports["default"] = {
  name: 'news-item',
  props: ['item'],
  // https://github.com/vuejs/vue/blob/next/packages/vue-server-renderer/README.md#component-caching
  serverCacheKey: function serverCacheKey(props) {
    return props.item.id + '::' + props.item.__lastUpdated;
  }
};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Spinner_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Spinner_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Spinner_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Item_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Item_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Item_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_api__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ exports["default"] = {
  name: 'item-list',

  components: {
    Spinner: __WEBPACK_IMPORTED_MODULE_0__Spinner_vue___default.a,
    Item: __WEBPACK_IMPORTED_MODULE_1__Item_vue___default.a
  },

  props: {
    type: String
  },

  data: function data() {
    var isInitialRender = !this.$root._isMounted;
    return {
      loading: false,
      transition: 'slide-left',
      // if this is the initial render, directly render with the store state
      // otherwise this is a page switch, start with blank and wait for data load.
      // we need these local state so that we can precisely control the timing
      // of the transitions.
      displayedPage: isInitialRender ? Number(this.$store.state.route.params.page) || 1 : -1,
      displayedItems: isInitialRender ? this.$store.getters.activeItems : []
    };
  },


  computed: {
    page: function page() {
      return Number(this.$store.state.route.params.page) || 1;
    },
    maxPage: function maxPage() {
      var _$store$state = this.$store.state;
      var itemsPerPage = _$store$state.itemsPerPage;
      var lists = _$store$state.lists;

      return Math.ceil(lists[this.type].length / itemsPerPage);
    },
    hasMore: function hasMore() {
      return this.page < this.maxPage;
    }
  },

  beforeMount: function beforeMount() {
    var _this = this;

    if (this.$root._isMounted) {
      this.loadItems(this.page);
    }
    // watch the current list for realtime updates
    this.unwatchList = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__store_api__["d" /* watchList */])(this.type, function (ids) {
      _this.$store.commit('SET_LIST', { type: _this.type, ids: ids });
      _this.$store.dispatch('ENSURE_ACTIVE_ITEMS').then(function () {
        _this.displayedItems = _this.$store.getters.activeItems;
      });
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.unwatchList();
  },


  watch: {
    page: function page(to, from) {
      this.loadItems(to, from);
    }
  },

  methods: {
    loadItems: function loadItems() {
      var _this2 = this;

      var to = arguments.length <= 0 || arguments[0] === undefined ? this.page : arguments[0];
      var from = arguments.length <= 1 || arguments[1] === undefined ? -1 : arguments[1];

      this.loading = true;
      this.$store.dispatch('FETCH_LIST_DATA', {
        type: this.type
      }).then(function () {
        if (_this2.page < 0 || _this2.page > _this2.maxPage) {
          _this2.$router.replace('/' + _this2.type + '/1');
          return;
        }
        _this2.transition = to > from ? 'slide-left' : 'slide-right';
        _this2.displayedPage = to;
        _this2.displayedItems = _this2.$store.getters.activeItems;
        _this2.loading = false;
      });
    }
  }
};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
//
//
//
//
//
//

/* harmony default export */ exports["default"] = {
  props: ['show']
};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Spinner_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Spinner_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_Spinner_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Comment_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Comment_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_Comment_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




function fetchItem(store) {
  return store.dispatch('FETCH_ITEMS', {
    ids: [store.state.route.params.id]
  });
}

/* harmony default export */ exports["default"] = {
  name: 'item-view',
  components: { Spinner: __WEBPACK_IMPORTED_MODULE_0__components_Spinner_vue___default.a, Comment: __WEBPACK_IMPORTED_MODULE_1__components_Comment_vue___default.a },
  computed: {
    item: function item() {
      return this.$store.state.items[this.$route.params.id];
    }
  },
  preFetch: fetchItem,
  beforeMount: function beforeMount() {
    fetchItem(this.$store);
  }
};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Spinner_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Spinner_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_Spinner_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



function fetchUser(store) {
  return store.dispatch('FETCH_USER', {
    id: store.state.route.params.id
  });
}

/* harmony default export */ exports["default"] = {
  name: 'user-view',
  components: { Spinner: __WEBPACK_IMPORTED_MODULE_0__components_Spinner_vue___default.a },
  computed: {
    user: function user() {
      return this.$store.state.users[this.$route.params.id];
    }
  },
  preFetch: fetchUser,
  beforeMount: function beforeMount() {
    fetchUser(this.$store);
  }
};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export */ exports["host"] = host;/* harmony export */ exports["timeAgo"] = timeAgo;function host(url) {
  var host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  var parts = host.split('.').slice(-3);
  if (parts[0] === 'www') parts.shift();
  return parts.join('.');
}

function timeAgo(time) {
  var between = Date.now() / 1000 - Number(time);
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute');
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour');
  } else {
    return pluralize(~~(between / 86400), ' day');
  }
}

function pluralize(time, label) {
  if (time === 1) {
    return time + label;
  }
  return time + label + 's';
}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_CreateListView__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_ItemView_vue__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_ItemView_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__views_ItemView_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_UserView_vue__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_UserView_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__views_UserView_vue__);



__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_router___default.a);





/* harmony default export */ exports["a"] = new __WEBPACK_IMPORTED_MODULE_1_vue_router___default.a({
  mode: 'history',
  scrollBehavior: function scrollBehavior() {
    return { y: 0 };
  },
  routes: [{ path: '/top/:page(\\d+)?', component: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__views_CreateListView__["a" /* createListView */])('top') }, { path: '/new/:page(\\d+)?', component: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__views_CreateListView__["a" /* createListView */])('new') }, { path: '/show/:page(\\d+)?', component: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__views_CreateListView__["a" /* createListView */])('show') }, { path: '/ask/:page(\\d+)?', component: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__views_CreateListView__["a" /* createListView */])('ask') }, { path: '/job/:page(\\d+)?', component: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__views_CreateListView__["a" /* createListView */])('job') }, { path: '/item/:id(\\d+)', component: __WEBPACK_IMPORTED_MODULE_3__views_ItemView_vue___default.a }, { path: '/user/:id', component: __WEBPACK_IMPORTED_MODULE_4__views_UserView_vue___default.a }, { path: '*', redirect: '/top' }]
});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vuex__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api__ = __webpack_require__(2);




__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vuex___default.a);

var store = new __WEBPACK_IMPORTED_MODULE_1_vuex___default.a.Store({
  state: {
    activeType: null,
    itemsPerPage: 20,
    items: {/* [id: number]: Item */},
    users: {/* [id: string]: User */},
    lists: {
      top: [/* number */],
      new: [],
      show: [],
      ask: [],
      job: []
    }
  },

  actions: {
    // ensure data for rendering given list type
    FETCH_LIST_DATA: function FETCH_LIST_DATA(_ref, _ref2) {
      var commit = _ref.commit;
      var dispatch = _ref.dispatch;
      var state = _ref.state;
      var type = _ref2.type;

      commit('SET_ACTIVE_TYPE', { type: type });
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__api__["a" /* fetchIdsByType */])(type).then(function (ids) {
        return commit('SET_LIST', { type: type, ids: ids });
      }).then(function () {
        return dispatch('ENSURE_ACTIVE_ITEMS');
      });
    },

    // ensure all active items are fetched
    ENSURE_ACTIVE_ITEMS: function ENSURE_ACTIVE_ITEMS(_ref3) {
      var dispatch = _ref3.dispatch;
      var getters = _ref3.getters;

      return dispatch('FETCH_ITEMS', {
        ids: getters.activeIds
      });
    },

    FETCH_ITEMS: function FETCH_ITEMS(_ref4, _ref5) {
      var commit = _ref4.commit;
      var state = _ref4.state;
      var ids = _ref5.ids;

      // only fetch items that we don't already have.
      ids = ids.filter(function (id) {
        return !state.items[id];
      });
      if (ids.length) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__api__["b" /* fetchItems */])(ids).then(function (items) {
          return commit('SET_ITEMS', { items: items });
        });
      } else {
        return Promise.resolve();
      }
    },

    FETCH_USER: function FETCH_USER(_ref6, _ref7) {
      var commit = _ref6.commit;
      var state = _ref6.state;
      var id = _ref7.id;

      return state.users[id] ? Promise.resolve(state.users[id]) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__api__["c" /* fetchUser */])(id).then(function (user) {
        return commit('SET_USER', { user: user });
      });
    }
  },

  mutations: {
    SET_ACTIVE_TYPE: function SET_ACTIVE_TYPE(state, _ref8) {
      var type = _ref8.type;

      state.activeType = type;
    },

    SET_LIST: function SET_LIST(state, _ref9) {
      var type = _ref9.type;
      var ids = _ref9.ids;

      state.lists[type] = ids;
    },

    SET_ITEMS: function SET_ITEMS(state, _ref10) {
      var items = _ref10.items;

      items.forEach(function (item) {
        if (item) {
          __WEBPACK_IMPORTED_MODULE_0_vue___default.a.set(state.items, item.id, item);
        }
      });
    },

    SET_USER: function SET_USER(state, _ref11) {
      var user = _ref11.user;

      __WEBPACK_IMPORTED_MODULE_0_vue___default.a.set(state.users, user.id, user);
    }
  },

  getters: {
    // ids of the items that should be currently displayed based on
    // current list type and current pagination
    activeIds: function activeIds(state) {
      var activeType = state.activeType;
      var itemsPerPage = state.itemsPerPage;
      var lists = state.lists;

      var page = Number(state.route.params.page) || 1;
      if (activeType) {
        var start = (page - 1) * itemsPerPage;
        var end = page * itemsPerPage;
        return lists[activeType].slice(start, end);
      } else {
        return [];
      }
    },


    // items that should be currently displayed.
    // this Array may not be fully fetched.
    activeItems: function activeItems(state, getters) {
      return getters.activeIds.map(function (id) {
        return state.items[id];
      }).filter(function (_) {
        return _;
      });
    }
  }
});

/* harmony default export */ exports["a"] = store;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_ItemList_vue__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_ItemList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_ItemList_vue__);
/* harmony export */ exports["a"] = createListView;

// This is a factory function for dynamically creating root-level list views,
// since they share most of the logic except for the type of items to display.
// They are essentially higher order components wrapping ItemList.vue.
function createListView(type) {
  return {
    name: type + '-stories-view',
    // this will be called during SSR to pre-fetch data into the store!
    preFetch: function preFetch(store) {
      return store.dispatch('FETCH_LIST_DATA', { type: type });
    },
    render: function render(h) {
      return h(__WEBPACK_IMPORTED_MODULE_0__components_ItemList_vue___default.a, { props: { type: type } });
    }
  };
}

/***/ },
/* 14 */
/***/ function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAIAAADYYG7QAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0QwQUQ3MDQ1ODRDMTFFNjg3RTY4OTk2MDI5RjY0NEEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0QwQUQ3MDM1ODRDMTFFNjg3RTY4OTk2MDI5RjY0NEEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkIxQUFERjk1ODRCMTFFNkEzNzlDMEVFOEY2NTE3RDEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkIxQUFERkE1ODRCMTFFNkEzNzlDMEVFOEY2NTE3RDEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6R9N1XAAADmklEQVR42uxZW0hUQRj+zrrrqizqakmWuV0gMBQlpOihkOgC9qIF4kOPQSAYlIW59tCF6qGgBKGgoDJpJbQrlaEo2YumgmhiopUt5L1Myk1dPaeZWXV3jmue3bMuG+ywHM7+M2fmO9/3z//PzBEkSUIgFQ0CrAQcIK3zdqALbTWI0EMQ/Dc+cRjbFNL2IT5pEaC2ZzhdhET/siYCVuDqFXeAIowUzTrAjwRBmh/ajWREKQ1DI/jdjV2cJDjLPJhl/1ZacpHSca+Z94DFRWDeuvgRwSeASJPfwCjfO0GzBtABs0uQPgzY5x9xoIkDwoEZlYBIR0PAnsPYnoOJH3PepwvD935YzAgF/ckKGXIMyC2AKQX2ybleDEbUlqKlATFL86oUEHnjPivycuRVnY14+xybGBMLJYS9wIZk5F6Tt79jVqKHZvnARahubUb5KXlV7gU6/NQizyCkZBfIG986ip5exC5Dj7JZRiRYC1Rex2gfZzelYud+fHPpQ8NcbWM8dh/hWvZ34/Vd2ondJ9OevFMkYBNRYZZXZRVRFewu+o4De49B4LWxFGFShGF5ehTHITKVEoBqC760cPatGdi2CwPMFYl8P4F4Aw7yen1qRP0TrHc3H70HJLEZS673T8qrsospQ9PsfojRE2bgGpQX0qteET2eRGoHSU3v0F7N2VMPIC0NI0RTwKhFZj5X21GLpgaasGeVjqMYkMR0IVHndr686tBZ6vgEU0YOYkxc1b3j9CmtUno8zGVk1HjgQy9qbnL2HdnYvIW6c9YZzv6+Cm1dNKDPeDCIh8mVNF8NPDqHqV+cNT0LyUlISHEJYCIsxYhi6WUFs/0sA/R5GI8vc/bMPJjLOAthsaPbU3q8Wn6ITLinNzA+6DTGmpCY7vw7PYHK80riso8ARZOQM4mHhUu2eVWCryOUS9E/CzSHd78og7XdTa1tDBWXKD0z3vTtFSAihIG9/YMTbmqrLmLUBqM3eqlYwpLoTLJBYx1aX3L2wR68KaH8ebtBV7Gm1jJRZKqND2NWpIlC9D8gkcWYiGjOqNNDp1GeKFZi1+Hjw5PgviwIKAhInvzDIzlLVBxdXauYeVpVgFYB9aXorIPIdh5CCP6MQS+q6VIdIJLRPjahucm5hw9lG0sV4UkdIDtbihj5MKmKIJWABLXD/18HVpI0d8rkz+KQ2OVrgpZb6Vn9zprjWJgMveAFzm8dgXFwLgQ/vvxvgP4KMAC8TAc1j4IsCQAAAABJRU5ErkJggg=="

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* template */
var __vue_template__ = __webpack_require__(21)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (typeof __vue_exports__.default === "object") {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

module.exports = __vue_exports__


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* script */
__vue_exports__ = __webpack_require__(4)

/* template */
var __vue_template__ = __webpack_require__(26)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (typeof __vue_exports__.default === "object") {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

module.exports = __vue_exports__


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* script */
__vue_exports__ = __webpack_require__(5)

/* template */
var __vue_template__ = __webpack_require__(27)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (typeof __vue_exports__.default === "object") {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

module.exports = __vue_exports__


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* script */
__vue_exports__ = __webpack_require__(6)

/* template */
var __vue_template__ = __webpack_require__(24)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (typeof __vue_exports__.default === "object") {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

module.exports = __vue_exports__


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* script */
__vue_exports__ = __webpack_require__(8)

/* template */
var __vue_template__ = __webpack_require__(23)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (typeof __vue_exports__.default === "object") {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

module.exports = __vue_exports__


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* script */
__vue_exports__ = __webpack_require__(9)

/* template */
var __vue_template__ = __webpack_require__(22)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (typeof __vue_exports__.default === "object") {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

module.exports = __vue_exports__


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){with(this) {
  return _h('div', {
    attrs: {
      "id": "app"
    }
  }, [_h('div', {
    staticClass: "header"
  }, [_h('div', {
    staticClass: "inner"
  }, [_h('router-link', {
    attrs: {
      "to": "/",
      "exact": ""
    }
  }, [_m(0)]), " ", _h('router-link', {
    attrs: {
      "to": "/top"
    }
  }, ["Top"]), " ", _h('router-link', {
    attrs: {
      "to": "/new"
    }
  }, ["New"]), " ", _h('router-link', {
    attrs: {
      "to": "/show"
    }
  }, ["Show"]), " ", _h('router-link', {
    attrs: {
      "to": "/ask"
    }
  }, ["Ask"]), " ", _h('router-link', {
    attrs: {
      "to": "/job"
    }
  }, ["Jobs"]), " ", _m(1)])]), " ", _h('transition', {
    attrs: {
      "name": "fade",
      "mode": "out-in"
    }
  }, [_h('router-view', {
    staticClass: "view"
  })])])
}},staticRenderFns: [function (){with(this) {
  return _h('img', {
    staticClass: "logo",
    attrs: {
      "src": __webpack_require__(14),
      "alt": "logo"
    }
  })
}},function (){with(this) {
  return _h('a', {
    staticClass: "github",
    attrs: {
      "href": "https://github.com/vuejs/vue-hackernews-2.0",
      "target": "_blank"
    }
  }, ["\n        Built with Vue.js\n      "])
}}]}

/***/ },
/* 22 */
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _h('div', {
    staticClass: "user-view"
  }, [_h('spinner', {
    attrs: {
      "show": !user
    }
  }), " ", (user) ? [_h('h1', ["User : " + _s(user.id)]), " ", _h('ul', {
    staticClass: "meta"
  }, [_h('li', [_m(0), " " + _s(_f("timeAgo")(user.created)) + " ago"]), " ", _h('li', [_m(1), " " + _s(user.karma)]), " ", (user.about) ? _h('li', {
    staticClass: "about",
    domProps: {
      "innerHTML": _s(user.about)
    }
  }) : _e()]), " ", _h('p', {
    staticClass: "links"
  }, [_h('a', {
    attrs: {
      "href": 'https://news.ycombinator.com/submitted?id=' + user.id
    }
  }, ["submissions"]), " |\n      ", _h('a', {
    attrs: {
      "href": 'https://news.ycombinator.com/threads?id=' + user.id
    }
  }, ["comments"])])] : _e()])
}},staticRenderFns: [function (){with(this) {
  return _h('span', {
    staticClass: "label"
  }, ["Created:"])
}},function (){with(this) {
  return _h('span', {
    staticClass: "label"
  }, ["Karma:"])
}}]}

/***/ },
/* 23 */
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return (item) ? _h('div', {
    staticClass: "item-view"
  }, [_h('spinner', {
    attrs: {
      "show": !item
    }
  }), " ", (item) ? [_h('div', {
    staticClass: "item-view-header"
  }, [_h('a', {
    attrs: {
      "href": item.url,
      "target": "_blank"
    }
  }, [_h('h1', [_s(item.title)])]), " ", (item.url) ? _h('span', {
    staticClass: "host"
  }, ["\n        (" + _s(_f("host")(item.url)) + ")\n      "]) : _e(), " ", _h('p', {
    staticClass: "meta"
  }, ["\n        " + _s(item.score) + " points\n        | by ", _h('router-link', {
    attrs: {
      "to": '/user/' + item.by
    }
  }, [_s(item.by)]), "\n        " + _s(_f("timeAgo")(item.time)) + " ago\n      "])]), " ", _h('div', {
    staticClass: "item-view-comments"
  }, [_h('p', {
    staticClass: "item-view-comments-header"
  }, ["\n        " + _s(item.kids ? item.descendants + ' comments' : 'No comments yet.') + "\n      "]), " ", (item.kids) ? _h('ul', {
    staticClass: "comment-children"
  }, [(item.kids) && _l((item.kids), function(id) {
    return _h('comment', {
      attrs: {
        "id": id
      }
    })
  })]) : _e()])] : _e()]) : _e()
}},staticRenderFns: []}

/***/ },
/* 24 */
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _h('div', {
    staticClass: "news-view"
  }, [_h('spinner', {
    attrs: {
      "show": loading
    }
  }), " ", _h('div', {
    staticClass: "news-list-nav"
  }, [(page > 1) ? _h('router-link', {
    attrs: {
      "to": '/' + type + '/' + (page - 1)
    }
  }, ["< prev"]) : _h('a', {
    staticClass: "disabled"
  }, ["< prev"]), " ", " ", _h('span', [_s(page) + "/" + _s(maxPage)]), " ", (hasMore) ? _h('router-link', {
    attrs: {
      "to": '/' + type + '/' + (page + 1)
    }
  }, ["more >"]) : _h('a', {
    staticClass: "disabled"
  }, ["more >"]), " "]), " ", _h('transition', {
    attrs: {
      "name": transition
    }
  }, [(displayedPage > 0) ? _h('div', {
    key: displayedPage,
    staticClass: "news-list"
  }, [_h('transition-group', {
    attrs: {
      "tag": "ul",
      "name": "item"
    }
  }, [(displayedItems) && _l((displayedItems), function(item) {
    return _h('item', {
      key: item.id,
      attrs: {
        "item": item
      }
    })
  })])]) : _e()])])
}},staticRenderFns: []}

/***/ },
/* 25 */
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _h('svg', {
    staticClass: "spinner",
    class: {
      show: show
    },
    attrs: {
      "width": "44px",
      "height": "44px",
      "viewBox": "0 0 44 44"
    }
  }, [_h('circle', {
    staticClass: "path",
    attrs: {
      "fill": "none",
      "stroke-width": "4",
      "stroke-linecap": "round",
      "cx": "22",
      "cy": "22",
      "r": "20"
    }
  })])
}},staticRenderFns: []}

/***/ },
/* 26 */
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return (comment) ? _h('li', {
    staticClass: "comment"
  }, [_h('div', {
    staticClass: "by"
  }, [_h('router-link', {
    attrs: {
      "to": '/user/' + comment.by
    }
  }, [_s(comment.by)]), "\n    " + _s(_f("timeAgo")(comment.time)) + " ago\n    ", (comment.kids && comment.kids.length) ? _h('span', ["\n      | ", _h('a', {
    staticClass: "expand",
    on: {
      "click": function($event) {
        open = !open
      }
    }
  }, ["\n        " + _s((open ? 'collapse ' : 'expand ') + pluralize(comment.kids.length)) + "\n      "])]) : _e()]), " ", _h('div', {
    staticClass: "text",
    domProps: {
      "innerHTML": _s(comment.text)
    }
  }), " ", _h('ul', {
    directives: [{
      name: "show",
      value: (open),
      expression: "open"
    }],
    staticClass: "comment-children"
  }, [(comment.kids) && _l((comment.kids), function(id) {
    return _h('comment', {
      attrs: {
        "id": id
      }
    })
  })])]) : _e()
}},staticRenderFns: []}

/***/ },
/* 27 */
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _h('li', {
    staticClass: "news-item"
  }, [_h('span', {
    staticClass: "score"
  }, [_s(item.score)]), " ", _h('span', {
    staticClass: "title"
  }, [(item.url) ? [_h('a', {
    attrs: {
      "href": item.url,
      "target": "_blank"
    }
  }, [_s(item.title)]), " ", _h('span', {
    staticClass: "host"
  }, ["(" + _s(_f("host")(item.url)) + ")"])] : [_h('router-link', {
    attrs: {
      "to": '/item/' + item.id
    }
  }, [_s(item.title)])], " "]), " ", _m(0), " ", _h('span', {
    staticClass: "meta"
  }, [(item.type !== 'job') ? _h('span', {
    staticClass: "by"
  }, ["\n      by ", _h('router-link', {
    attrs: {
      "to": '/user/' + item.by
    }
  }, [_s(item.by)])]) : _e(), " ", _h('span', {
    staticClass: "time"
  }, ["\n      " + _s(_f("timeAgo")(item.time)) + " ago\n    "]), " ", (item.type !== 'job') ? _h('span', {
    staticClass: "comments-link"
  }, ["\n      | ", _h('router-link', {
    attrs: {
      "to": '/item/' + item.id
    }
  }, [_s(item.descendants) + " comments"])]) : _e()]), " ", (item.type !== 'story') ? _h('span', {
    staticClass: "label"
  }, [_s(item.type)]) : _e()])
}},staticRenderFns: [function (){with(this) {
  return _h('br')
}}]}

/***/ },
/* 28 */
/***/ function(module, exports) {

module.exports = require("firebase");

/***/ },
/* 29 */
/***/ function(module, exports) {

module.exports = require("lru-cache");

/***/ },
/* 30 */
/***/ function(module, exports) {

module.exports = require("vue-router");

/***/ },
/* 31 */
/***/ function(module, exports) {

module.exports = require("vuex");

/***/ },
/* 32 */
/***/ function(module, exports) {

module.exports = require("vuex-router-sync");

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app__ = __webpack_require__(3);


var isDev = "production" !== 'production';

// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
/* harmony default export */ exports["default"] = function (context) {
  // set router's location
  __WEBPACK_IMPORTED_MODULE_0__app__["a" /* router */].push(context.url);

  var s = isDev && Date.now();

  // Call preFetch hooks on components matched by the route.
  // A preFetch hook dispatches a store action and returns a Promise,
  // which is resolved when the action is complete and store state has been
  // updated.
  return Promise.all(__WEBPACK_IMPORTED_MODULE_0__app__["a" /* router */].getMatchedComponents().map(function (component) {
    if (component.preFetch) {
      return component.preFetch(__WEBPACK_IMPORTED_MODULE_0__app__["b" /* store */]);
    }
  })).then(function () {
    isDev && console.log('data pre-fetch: ' + (Date.now() - s) + 'ms');
    // After all preFetch hooks are resolved, our store is now
    // filled with the state needed to render the app.
    // Expose the state on the render context, and let the request handler
    // inline the state in the HTML response. This allows the client-side
    // store to pick-up the server-side state without having to duplicate
    // the initial data fetching on the client.
    context.initialState = __WEBPACK_IMPORTED_MODULE_0__app__["b" /* store */].state;
    return __WEBPACK_IMPORTED_MODULE_0__app__["c" /* app */];
  });
};

/***/ }
/******/ ]);
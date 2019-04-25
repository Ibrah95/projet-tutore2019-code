/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var WINDOW_WIDTH = exports.WINDOW_WIDTH = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var WINDOW_HEIGHT = exports.WINDOW_HEIGHT = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
var WORLD_SIZE = exports.WORLD_SIZE = { width: 2048, height: 1000 };
var ASSETS_URL = exports.ASSETS_URL = '../assets';
var LIMIT_TOP = exports.LIMIT_TOP = 100;
var LIMIT_BOTTOM = exports.LIMIT_BOTTOM = 1100;
var LIMIT_LEFT = exports.LIMIT_LEFT = 100;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var isDown = exports.isDown = function isDown(game, key) {
  return game.input.keyboard.isDown(key);
};
var createText = exports.createText = function createText(game, target) {
  return game.add.text(target.x, target.y, '', {
    fontSize: '12px',
    fill: '#FFF',
    align: 'center'
  });
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _config = __webpack_require__(0);

var _Game = __webpack_require__(3);

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Phaser$Game) {
  _inherits(App, _Phaser$Game);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, _config.WINDOW_WIDTH - 30, _config.WINDOW_HEIGHT - 150, Phaser.AUTO));

    _this.state.add('Game', _Game2.default);
    _this.state.start('Game');
    return _this;
  }

  return App;
}(Phaser.Game);

var SimpleGame = new App();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(0);

var _utils = __webpack_require__(1);

var _fileloader = __webpack_require__(4);

var _fileloader2 = _interopRequireDefault(_fileloader);

var _createWorld = __webpack_require__(5);

var _createWorld2 = _interopRequireDefault(_createWorld);

var _player = __webpack_require__(6);

var _player2 = _interopRequireDefault(_player);

var _newPlayer = __webpack_require__(9);

var _newPlayer2 = _interopRequireDefault(_newPlayer);

var _config2 = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SERVER_IP = 'localhost:8000/'; //'192.168.1.2:8080/'
var socket = null;
var otherPlayers = {};
var bmd = null;
var est_arriver = false;
var est_placer_sur_zone_fin = false;
var rang = 0;

var Game = function (_Phaser$State) {
  _inherits(Game, _Phaser$State);

  function Game() {
    _classCallCheck(this, Game);

    var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this));

    _this.player = {};
    //this.physics.enable(sprite, Phaser.Physics.ARCADE)
    return _this;
  }

  _createClass(Game, [{
    key: 'preload',
    value: function preload() {
      // Loads files
      (0, _fileloader2.default)(this.game);
    }
  }, {
    key: 'create',
    value: function create() {
      var width = _config.WORLD_SIZE.width,
          height = _config.WORLD_SIZE.height;
      // Creates the world

      (0, _createWorld2.default)(this.game);
      // Connects the player to the server
      socket = io(SERVER_IP);

      // recuperer le type de POPCORN
      var customName = document.getElementById('custom_name').textContent;
      console.log(customName);

      // Creates the player passing the X, Y, game and socket as arguments
      this.player = (0, _player2.default)(Math.random() * (300 - 100) + 100, Math.random() * (_config2.WINDOW_HEIGHT - 100 - 100) + 100, customName, this.game, socket);
      // Creates the player name text
      this.player.playerName = (0, _utils.createText)(this.game, this.player.sprite.body);
      // Creates the player speed text
      this.player.speedText = (0, _utils.createText)(this.game, this.player.sprite.body);

      // Sends a new-player event to the server
      (0, _newPlayer2.default)(socket, this.player);
      // update all players
      // updatePlayers(socket, otherPlayers, this.game)

      // create load bar for bonus
      bmd = this.game.add.bitmapData(200, 50);
      bmd.ctx.beginPath();
      bmd.ctx.rect(0, 0, 200, 50);
      bmd.ctx.fillStyle = '#b90f28';
      bmd.ctx.fill();
      healthBar = this.game.add.sprite(50, 252, bmd);
      healthBar.anchor.y = 0.5;

      // Configures the game camera
      this.game.camera.x = this.player.sprite.x - 800 / 2;
      this.game.camera.y = this.player.sprite.y - 600 / 2;

      // Scale game to fit the entire window
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    }
  }, {
    key: 'update',
    value: function update() {
      // gerer le déplacement du popcorn
      this.player.drive(this.game);

      // gerer la capture du popcorn
      socket.on('notifier-capture', function (data) {
        if (data === String(socket.id)) {
          if ("vibrate" in window.navigator) {
            window.navigator.vibrate(500);
          }
          setTimeout(function () {
            window.alert('Vous avez été capturé !!');
          }, 800);
        }
      });
      // gerer l'arrivé du popcorn à la zone de fin
      socket.on('est-arriver', function (data) {
        if (data.id === String(socket.id)) {
          est_arriver = true;
          rang = data.rang;
        }
      });
      console.log('est_arriver = ' + est_arriver);
      if (!est_arriver) {
        this.player.drive(this.game);
      } else {
        if (!est_placer_sur_zone_fin) {
          this.player.sprite.body.x = 1800;
          socket.emit('move-player', {
            estCapturer: this.player.estCapturer,
            nombreCapture: this.player.nombreCapture,
            position: this.player.position,
            customName: this.player.customName,
            speedText: {
              x: this.player.sprite.body.x,
              y: this.player.sprite.body.y
            },
            type: this.player.type,
            x: this.player.sprite.body.x,
            y: this.player.sprite.body.y,
            angle: this.player.sprite.body.rotation,
            playerName: {
              name: this.player.playerName.text,
              x: this.player.playerName.x,
              y: this.player.playerName.y
            },
            speed: {
              value: this.player.speed,
              x: this.player.speedText.x,
              y: this.player.speedText.y
            }
          });
          est_placer_sur_zone_fin = true;
          if ("vibrate" in window.navigator) {
            window.navigator.vibrate(500);
          }
          setTimeout(function () {
            window.alert('F\xE9licitation vous \xEAtes arriv\xE9 \xE0 la ' + rang + ' ' + (rang === 1 ? 'ère' : 'ème') + ' place');
          }, 800);
        }
      }
      // Interpolates the players movement
      // playerMovementInterpolation(otherPlayers)
    }
  }]);

  return Game;
}(Phaser.State);

exports.default = Game;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = __webpack_require__(0);

var fileLoader = function fileLoader(game) {
  game.load.crossOrigin = 'Anonymous';
  game.stage.backgroundColor = '#1E1E1E';
  game.load.image('asphalt', _.ASSETS_URL + '/sprites/asphalt/greyBg.png');
  game.load.image('popcorn', _.ASSETS_URL + '/sprites/popcorn/pop_marley.png');
  game.load.atlas('arcade', _.ASSETS_URL + '/virtualjoystick/skins/arcade-joystick.png', _.ASSETS_URL + '/virtualjoystick/skins/arcade-joystick.json');
};

exports.default = fileLoader;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var width = _config.WORLD_SIZE.width,
    height = _config.WORLD_SIZE.height;


var worldCreator = function worldCreator(game) {
  // Start P2 physics engine
  game.physics.startSystem(Phaser.Physics.P2JS);
  // We set this to true so our game won't pause if we focus
  // something else other than the browser
  game.stage.disableVisibilityChange = true;
  // Here we set the bounds of our game world
  game.world.setBounds(0, 0, width, height);
  createMap(game);
};

var createMap = function createMap(game) {
  var groundTiles = [];
  var groundSprite = game.add.sprite(0, 0, 'asphalt');
  groundSprite.width = 2920;
  groundSprite.height = 2080;
  groundTiles.push(groundSprite);
};

exports.default = worldCreator;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (x, y, customName, game, socket) {
  var player = {
    socket: socket,
    type: 'popcorn',
    customName: customName,
    sprite: (0, _createPlayer2.default)(x, y, game),
    joystick: (0, _createJoystick2.default)(x, y, game),
    playerName: null,
    speed: 0,
    speedText: null,
    estCapturer: false,
    nombreCapture: 0,
    position: 0,
    drive: function drive(game) {
      this.joystick.onDown.add(this.startPlayer, this);
      this.joystick.onUpdate.add(this.movePlayer, this);
      this.joystick.onUp.add(this.stopPlayer, this);
      game.physics.arcade.collide(this);
      // Brings the player's sprite to top
      game.world.bringToTop(this.sprite);
      this.updatePlayerName();
      this.updatePlayerStatusText('speed', this.sprite.body.x - 57, this.sprite.body.y - 39, this.speedText);
    },
    startPlayer: function startPlayer() {
      this.sprite.alpha = 0;
    },
    movePlayer: function movePlayer(stick, force, forceX, forceY) {
      this.sprite.body.velocity.x = stick.forceX * 1000;
      this.sprite.body.velocity.y = stick.forceY * 1000;

      if (this.sprite.body.x <= _config.LIMIT_LEFT) {
        this.sprite.body.x += 50;
      }

      if (this.sprite.body.y <= _config.LIMIT_TOP) {
        this.sprite.body.y += 50;
      }

      if (this.sprite.body.y >= _config.LIMIT_BOTTOM) {
        this.sprite.body.y -= 50;
      }
      this.emitPlayerData();
    },
    stopPlayer: function stopPlayer() {
      this.sprite.body.velocity.set(0);
      this.sprite.alpha = 0;
    },
    emitPlayerData: function emitPlayerData() {
      // Emit the 'move-player' event, updating the player's data on the server
      socket.emit('move-player', {
        estCapturer: this.estCapturer,
        nombreCapture: this.nombreCapture,
        position: this.position,
        customName: this.customName,
        speedText: {
          x: this.sprite.body.x,
          y: this.sprite.body.y
        },
        type: this.type,
        x: this.sprite.body.x,
        y: this.sprite.body.y,
        angle: this.sprite.body.rotation,
        playerName: {
          name: this.playerName.text,
          x: this.playerName.x,
          y: this.playerName.y
        },
        speed: {
          value: this.speed,
          x: this.speedText.x,
          y: this.speedText.y
        }
      });
    },
    updatePlayerName: function updatePlayerName() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.socket.id;
      var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.sprite.body.x - 57;
      var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.sprite.body.y - 59;

      // Updates the player's name text and position
      this.playerName.text = String(name);
      this.playerName.x = x;
      this.playerName.y = y;
      this.playerName.alpha = 0;
      // Bring the player's name to top
      //game.world.bringToTop(this.playerName)
    },
    updatePlayerStatusText: function updatePlayerStatusText(status, x, y, text) {
      // Capitalize the status text
      var capitalizedStatus = status[0].toUpperCase() + status.substring(1);
      var newText = '';
      // Set the speed text to either 0 or the current speed
      this[status] < 0 ? this.newText = 0 : this.newText = this[status];
      // Updates the text position and string
      text.x = x;
      text.y = y;
      text.text = capitalizedStatus + ': ' + parseInt(this.newText);
      text.alpha = 0;
      //game.world.bringToTop(text)
    }
  };
  return player;
};

var _createPlayer = __webpack_require__(7);

var _createPlayer2 = _interopRequireDefault(_createPlayer);

var _createJoystick = __webpack_require__(8);

var _createJoystick2 = _interopRequireDefault(_createJoystick);

var _utils = __webpack_require__(1);

var _config = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var createPlayer = function createPlayer(x, y, game) {
  var sprite = game.add.sprite(x, y, 'popcorn');
  game.physics.enable(sprite, Phaser.Physics.ARCADE);
  game.physics.startSystem(Phaser.Physics.ARCADE);
  sprite.anchor.setTo(0.5, 0.5);
  sprite.width = 50;
  sprite.height = 50;
  sprite.body.allowRotation = false;
  sprite.body.collideWorldBounds = true;
  sprite.alpha = 0.0;
  return sprite;
};

exports.default = createPlayer;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var createJoystick = function createJoystick(x, y, game) {
  var pad = game.plugins.add(Phaser.VirtualJoystick);
  var stick = pad.addStick(_config.WINDOW_WIDTH / 2, _config.WINDOW_HEIGHT - _config.WINDOW_HEIGHT / 3 - 200, 300, 'arcade');
  stick.scale = 2.0;
  //stick.alignBottomLeft(0);
  return stick;
};

exports.default = createJoystick;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var newPlayer = function newPlayer(socket, player) {
  socket.on('connect', function () {
    socket.emit('new-player', {
      estCapturer: player.estCapturer,
      nombreCapture: player.nombreCapture,
      position: player.position,
      customName: player.customName,
      speedText: {
        x: player.sprite.body.x - 57,
        y: player.sprite.body.y - 39
      },
      type: player.type,
      x: player.sprite.body.x,
      y: player.sprite.body.y,
      angle: player.sprite.rotation,
      playerName: {
        name: String(socket.id),
        x: player.playerName.x,
        y: player.playerName.y
      },
      speed: {
        value: player.speed,
        x: player.speed.x,
        y: player.speed.y
      }
    });
  });
};

exports.default = newPlayer;

/***/ })
/******/ ]);
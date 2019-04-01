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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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
var WORLD_SIZE = exports.WORLD_SIZE = { width: 1024, height: 900 };
var ASSETS_URL = exports.ASSETS_URL = '../assets';

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


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (type, nombreCapture, x, y, game, socket) {
  var player = {
    socket: socket,
    type: type,
    sprite: (0, _createPlayer2.default)(type, x, y, game),
    playerName: null,
    speed: 0,
    speedText: null,
    estCapturer: false,
    nombreCapture: nombreCapture,
    drive: function drive(game) {},
    emitPlayerData: function emitPlayerData() {
      // Emit the 'move-player' event, updating the player's data on the server
      // const socket = io('localhost:8000')
      this.socket.emit('move-player', {
        estCapturer: this.estCapturer,
        nombreCapture: this.nombreCapture,
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
    emitPlayerDeletion: function emitPlayerDeletion(socket) {
      socket.emit('delete-player', {
        id: this.playerName.text
      });
    },
    emitNombreCapture: function emitNombreCapture(socket) {
      socket.emit('increment-nombreCapture', {
        id: this.playerName.text
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
      // Bring the player's name to top
      game.world.bringToTop(this.playerName);
    },
    updatePlayerStatusText: function updatePlayerStatusText(x, y, text) {
      if (this.type === 'popbox') {
        text.x = x - 57;
        text.y = y - 39;
        text.text = 'NOMBRE DE CAPTURE = ' + this.nombreCapture;
        game.world.bringToTop(text);
      }
    }
  };
  return player;
};

var _createPlayer = __webpack_require__(7);

var _createPlayer2 = _interopRequireDefault(_createPlayer);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _config = __webpack_require__(0);

var _Game = __webpack_require__(4);

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Phaser$Game) {
  _inherits(App, _Phaser$Game);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, _config.WINDOW_WIDTH, _config.WINDOW_HEIGHT, Phaser.AUTO));

    _this.state.add('Game', _Game2.default);
    _this.state.start('Game');
    return _this;
  }

  return App;
}(Phaser.Game);

var SimpleGame = new App();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(0);

var _utils = __webpack_require__(1);

var _fileloader = __webpack_require__(5);

var _fileloader2 = _interopRequireDefault(_fileloader);

var _createWorld = __webpack_require__(6);

var _createWorld2 = _interopRequireDefault(_createWorld);

var _player = __webpack_require__(2);

var _player2 = _interopRequireDefault(_player);

var _updatePlayers = __webpack_require__(8);

var _updatePlayers2 = _interopRequireDefault(_updatePlayers);

var _playerMovementInterpolation = __webpack_require__(9);

var _playerMovementInterpolation2 = _interopRequireDefault(_playerMovementInterpolation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SERVER_IP = 'localhost:8000/';
var socket = null;
var otherPlayers = {};
var tempsRestantEnSeconde = 5 * 60;
var minutesRestant = Number.parseInt(tempsRestantEnSeconde / 60);
var secondesRestant = Number.parseInt(tempsRestantEnSeconde % 60);
var text = null;
var timerlogo = null;

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

      // update all players
      (0, _updatePlayers2.default)(socket, otherPlayers, this.game);

      // CONFIGURATION DU TIMER (à modifier mais juste pour le test)
      //  Create our Timer
      var timer = this.game.time.create(false);
      //  Set a TimerEvent to occur after 1 seconds
      timer.loop(1000, updateCounter, this.game);
      //  Start the timer running - this is important!
      //  It won't start automatically, allowing you to hook it to button events and the like.
      timer.start();

      // Configures the game camera
      this.game.camera.x = width / 2;
      this.game.camera.y = height / 2;

      // Scale game to fit the entire window
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

      text = this.game.add.text(_config.WORLD_SIZE.width / 2 + 140, 50, minutesRestant + ' : ' + secondesRestant, { fontSize: '43px', fill: '#AFF', align: 'center' });

      timerlogo = this.game.add.sprite(_config.WORLD_SIZE.width / 2 + 60, 50, 'timerlogo');

      timerlogo.width = 80;
      timerlogo.height = 80;
    }
  }, {
    key: 'update',
    value: function update() {
      // Interpolates the players movement
      (0, _playerMovementInterpolation2.default)(otherPlayers, this.game, socket);

      // affichage TIMER
      //this.game.debug.text(`TIMER :  ${minutesRestant} min ${secondesRestant} s` , 32, 64);
      text.setText(minutesRestant + ' : ' + secondesRestant);
    }
  }]);

  return Game;
}(Phaser.State);

function updateCounter() {

  if (tempsRestantEnSeconde > 0) {
    tempsRestantEnSeconde--;
  } else {
    // quand le timer arrive à zero il reprend à 5, enlever le else pour garder time à 0
    tempsRestantEnSeconde = 5 * 60;
  }

  minutesRestant = Number.parseInt(tempsRestantEnSeconde / 60);
  secondesRestant = Number.parseInt(tempsRestantEnSeconde % 60);
}

exports.default = Game;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = __webpack_require__(0);

var fileLoader = function fileLoader(game) {
  game.load.crossOrigin = 'Anonymous';
  game.stage.backgroundColor = '#1E1E1E';
  game.load.image('asphalt', _.ASSETS_URL + '/sprites/asphalt/bg_ecran.jpg');
  game.load.image('popcorn', _.ASSETS_URL + '/sprites/popcorn/pop_marley.png');
  game.load.image('popbox', _.ASSETS_URL + '/sprites/car/popbox.png');
  game.load.image('timerlogo', _.ASSETS_URL + '/sprites/design/timerlogo.png');
};

exports.default = fileLoader;

/***/ }),
/* 6 */
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
  /*groundSprite.width = 1920
  groundSprite.height = 1080*/
  groundTiles.push(groundSprite);
};

exports.default = worldCreator;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var createPlayer = function createPlayer(type, x, y, game) {
  var sprite = game.add.sprite(x, y, type);
  game.physics.enable(sprite, Phaser.Physics.ARCADE);
  game.physics.startSystem(Phaser.Physics.ARCADE);
  sprite.body.collideWorldBounds = true;
  sprite.body.bounce.setTo(1, 1);
  sprite.anchor.setTo(0.5, 0.5);
  if (type === 'popcorn') {
    sprite.width = 35;
    sprite.height = 35;
  } else {
    sprite.width = 50;
    sprite.height = 100;
  }
  sprite.body.allowRotation = false;
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

var _player = __webpack_require__(2);

var _player2 = _interopRequireDefault(_player);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updatePlayers = function updatePlayers(socket, otherPlayers, game) {
  socket.on('update-players', function (playersData) {
    var playersFound = {};
    // Iterate over all players
    for (var index in playersData) {
      var data = playersData[index];
      // In case a player hasn't been created yet
      // We make sure that we won't create a second instance of it
      if (otherPlayers[index] === undefined && index !== socket.id) {
        var newPlayer = (0, _player2.default)(data.type, data.nombreCapture, data.x, data.y, game);
        newPlayer.playerName = (0, _utils.createText)(game, newPlayer);
        newPlayer.speedText = (0, _utils.createText)(game, newPlayer);
        newPlayer.updatePlayerName(data.playerName.name, data.playerName.x, data.playerName.y);
        newPlayer.updatePlayerStatusText(data.playerName.x, data.playerName.y + 60, newPlayer.speedText);
        otherPlayers[index] = newPlayer;
        playersFound[index] = true;
      }

      playersFound[index] = true;
      // supprimer les popcorn capturé
      if (data.estCapturer === true) {
        playersFound[index] = false;
      }

      // Update players data
      if (index !== socket.id && playersFound[index] === true) {
        // Update players target but not their real position
        otherPlayers[index].type = data.type;
        otherPlayers[index].updatePlayerStatusText(data.playerName.x, data.playerName.y + 60, otherPlayers[index].speedText);
        otherPlayers[index].nombreCapture = data.nombreCapture;
        otherPlayers[index].target_x = data.x;
        otherPlayers[index].target_y = data.y;
        otherPlayers[index].target_rotation = data.angle;
        otherPlayers[index].playerName.target_x = data.playerName.x;
        otherPlayers[index].playerName.target_y = data.playerName.y;
        otherPlayers[index].speedText.target_x = data.speed.x;
        otherPlayers[index].speedText.target_y = data.speed.y;
        otherPlayers[index].speed = data.speed.value;
      }
    }

    // Check if there's no missing players, if there is, delete them
    for (var id in otherPlayers) {
      if (!playersFound[id]) {
        otherPlayers[id].sprite.destroy();
        otherPlayers[id].playerName.destroy();
        otherPlayers[id].speedText.destroy();
        delete otherPlayers[id];
      }
    }
  });
};

exports.default = updatePlayers;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var playerMovementInterpolation = function playerMovementInterpolation(otherPlayers, game, socket) {
  var _loop = function _loop(id) {
    var player = otherPlayers[id];
    if (player.target_x !== undefined) {
      // Interpolate the player's position
      player.sprite.body.x += (player.target_x - player.sprite.body.x) * 0.30;
      player.sprite.body.y += (player.target_y - player.sprite.body.y) * 0.30;

      var angle = player.target_rotation;
      var direction = (angle - player.sprite.body.rotation) / (Math.PI * 2);
      direction -= Math.round(direction);
      direction *= Math.PI * 2;
      player.sprite.body.rotation += direction * 0.30;

      // Interpolate the player's name position
      player.playerName.x += (player.playerName.target_x - player.playerName.x) * 0.30;
      player.playerName.y += (player.playerName.target_y - player.playerName.y) * 0.30;

      // Interpolate the player's speed text position
      player.speedText.x += (player.speedText.target_x - player.speedText.x) * 0.30;
      player.speedText.y += (player.speedText.target_y - player.speedText.y) * 0.30;
      player.updatePlayerStatusText(player.playerName.x, player.playerName.y + 60, player.speedText);

      // collide each otherPlayer

      var _loop2 = function _loop2(subId) {
        game.physics.arcade.collide(player.sprite, otherPlayers[subId].sprite, function (player1, player2) {
          if (player.type !== otherPlayers[subId].type) {
            // otherPlayers[id].emitNombreCapture(socket);
            if (otherPlayers[id].type === 'popcorn') {
              otherPlayers[id].sprite.destroy();
              otherPlayers[id].playerName.destroy();
              otherPlayers[id].speedText.destroy();
              // ask the server to delete the popcorn that collided with a popbox
              otherPlayers[id].emitPlayerDeletion(socket);
              delete otherPlayers[id];
            }
            otherPlayers[subId].emitNombreCapture(socket);
          }
        });
      };

      for (var subId in otherPlayers) {
        _loop2(subId);
      }
    }
  };

  for (var id in otherPlayers) {
    _loop(id);
  }
};

exports.default = playerMovementInterpolation;

/***/ })
/******/ ]);
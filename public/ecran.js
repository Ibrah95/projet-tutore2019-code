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
var NBR_POPBOX_COLONNE = exports.NBR_POPBOX_COLONNE = 2;
var POS_Y_POPBOX = exports.POS_Y_POPBOX = 400;
var NBR_POPBOX_LIGNE = exports.NBR_POPBOX_LIGNE = 4;
var DIST_LIGNE = exports.DIST_LIGNE = 400;
var DIST_COLONNE = exports.DIST_COLONNE = 250;

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

exports.default = function (type, customName, nombreCapture, x, y, game, socket) {
  var player = {
    socket: socket,
    type: type,
    sprite: (0, _createPlayer2.default)(type, customName, x, y, game),
    playerName: null,
    speed: 0,
    speedText: null,
    estCapturer: false,
    nombreCapture: nombreCapture,
    customName: customName,
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

var _create = __webpack_require__(8);

var _create2 = _interopRequireDefault(_create);

var _movement = __webpack_require__(9);

var _movement2 = _interopRequireDefault(_movement);

var _updatePlayers = __webpack_require__(10);

var _updatePlayers2 = _interopRequireDefault(_updatePlayers);

var _playerMovementInterpolation = __webpack_require__(11);

var _playerMovementInterpolation2 = _interopRequireDefault(_playerMovementInterpolation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SERVER_IP = 'localhost:8000/';
var socket = null;
var otherPlayers = {};
var tempsRestantEnSeconde = 3 * 60;
var minutesRestant = Number.parseInt(tempsRestantEnSeconde / 60);
var secondesRestant = Number.parseInt(tempsRestantEnSeconde % 60);
var text = null;
var timerlogo = null;
var tempsEcouler = false;
var tempsIA = false;
var tempsrestantIA = 2;
var direction = 1;
var direction2 = -1;
var vitesse = 0.5;
var listPopbox = []; // tableau contenant les popbox manipuler par l'IA

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

      // creer les popbox manipuler par l'IA
      listPopbox = (0, _create2.default)(this.game);

      // CONFIGURATION DU TIMER (à modifier mais juste pour le test)
      //  Create our Timer
      var timer = this.game.time.create(false);
      //  Set a TimerEvent to occur after 1 seconds
      timer.loop(1000, updateCounter, this.game);
      //  Start the timer running - this is important!
      //  It won't start automatically, allowing you to hook it to button events and the like.
      timer.start();

      var timerIA = this.game.time.create(false);
      timerIA.loop(1000, updateCounterIA, this.game);
      timerIA.start();

      // Configures the game camera
      this.game.camera.x = width / 2;
      this.game.camera.y = height / 2;

      // Scale game to fit the entire window
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

      text = this.game.add.text(_config.WORLD_SIZE.width / 2 + 140, 50, minutesRestant + ' : ' + secondesRestant, { fontSize: '43px', fill: '#AFF', align: 'center' });

      timerlogo = this.game.add.sprite(_config.WORLD_SIZE.width / 2 + 60, 50, 'timerlogo');

      timerlogo.width = 50;
      timerlogo.height = 50;
    }
  }, {
    key: 'update',
    value: function update() {
      // Interpolates the players movement et gerer les collisions
      (0, _playerMovementInterpolation2.default)(otherPlayers, listPopbox, this.game, socket);
      var retour = (0, _movement2.default)(listPopbox, this.game, tempsIA, direction, vitesse, direction2);
      tempsIA = false;

      vitesse = retour.vitesse;
      direction = retour.direction;
      direction2 = retour.direction2;

      socket.on('notification-temps-ecouler', function (data) {
        window.alert('TEMPS ECOULER !!!\n\n NOMBRE POPCORN ARRIV\xC9 : ' + data.nombre_de_popcorn_arriver + ' \n NOMBRE DE POPCORN CAPTUR\xC9 : ' + data.nombre_de_popcorn_capturer);
      });

      // affichage TIMER
      //this.game.debug.text(`TIMER :  ${minutesRestant} min ${secondesRestant} s` , 32, 64);
      text.setText(minutesRestant + ' : ' + secondesRestant);
    }
  }]);

  return Game;
}(Phaser.State);

function updateCounter() {

  if (!tempsEcouler) {
    if (tempsRestantEnSeconde > 0) {
      tempsRestantEnSeconde--;
    } else {
      // quand le timer arrive à zero il reprend à 5, enlever le else pour garder time à 0
      // tempsRestantEnSeconde = 5 * 60;
      tempsEcouler = true;
      socket.emit('temps-ecouler', true);
    }
  }

  minutesRestant = Number.parseInt(tempsRestantEnSeconde / 60);
  secondesRestant = Number.parseInt(tempsRestantEnSeconde % 60);
}

function updateCounterIA() {

  if (!tempsIA) {

    if (tempsrestantIA > 0) {
      tempsrestantIA--;
    } else {
      // quand le timer arrive à zero il reprend à 5, enlever le else pour garder time à 0
      // tempsRestantEnSeconde = 5 * 60;
      tempsrestantIA = 2;
      tempsIA = true;
    }
  }
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
  game.load.image('asphalt', _.ASSETS_URL + '/sprites/asphalt/new_bg.png');

  // charger les personnages popcorn
  game.load.image('pop_marley', _.ASSETS_URL + '/sprites/popcorn/pop_marley.png');
  game.load.image('bat_pop', _.ASSETS_URL + '/sprites/popcorn/bat_pop.png');
  game.load.image('pop_soldat', _.ASSETS_URL + '/sprites/popcorn/pop_soldat.png');
  game.load.image('caramba_pop', _.ASSETS_URL + '/sprites/popcorn/caramba_pop.png');
  game.load.image('pop_vador', _.ASSETS_URL + '/sprites/popcorn/pop_vador.png');
  game.load.image('gentle_pop', _.ASSETS_URL + '/sprites/popcorn/gentle_pop.png');
  game.load.image('pop_blood', _.ASSETS_URL + '/sprites/popcorn/pop_blood.png');
  game.load.image('pop_boy', _.ASSETS_URL + '/sprites/popcorn/pop_boy.png');
  game.load.image('pop_kent', _.ASSETS_URL + '/sprites/popcorn/pop_kent.png');
  game.load.image('pop_carrey', _.ASSETS_URL + '/sprites/popcorn/pop_carrey.png');
  game.load.image('pop_minator', _.ASSETS_URL + '/sprites/popcorn/pop_minator.png');
  game.load.image('pop_ninja', _.ASSETS_URL + '/sprites/popcorn/pop_ninja.png');
  game.load.image('saint_patrick_pop', _.ASSETS_URL + '/sprites/popcorn/saint_patrick_pop.png');
  game.load.image('santa_pop', _.ASSETS_URL + '/sprites/popcorn/santa_pop.png');
  game.load.image('thug_pop', _.ASSETS_URL + '/sprites/popcorn/thug_pop.png');

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
var createPlayer = function createPlayer(type, customName, x, y, game) {
  var sprite = null;
  if (type === 'popcorn') sprite = game.add.sprite(x, y, customName);else sprite = game.add.sprite(x, y, type);

  game.physics.enable(sprite, Phaser.Physics.ARCADE);
  game.physics.startSystem(Phaser.Physics.ARCADE);
  sprite.body.collideWorldBounds = true;
  sprite.body.bounce.setTo(1, 1);
  sprite.anchor.setTo(0.5, 0.5);
  if (type === 'popcorn') {
    sprite.width = 60;
    sprite.height = 60;
  } else {
    sprite.width = 70;
    sprite.height = 110;
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

var _config = __webpack_require__(0);

// LES FONCTIONS UTILITAIRES

var createPopbox = function createPopbox(x, y, game) {
  var sprite = sprite = game.add.sprite(x, y, 'popbox');
  game.physics.enable(sprite, Phaser.Physics.ARCADE);
  game.physics.startSystem(Phaser.Physics.ARCADE);
  sprite.body.collideWorldBounds = true;
  sprite.body.bounce.setTo(1, 1);
  sprite.anchor.setTo(0.5, 0.5);
  sprite.width = 70;
  sprite.height = 110;
  sprite.body.allowRotation = false;
  return sprite;
};

// LA FONCTION PRINCIPALE

var createIA = function createIA(game) {
  var listPopbox = [];
  // creer les popbox par colonne et par ligne
  for (var i = 0; i < _config.NBR_POPBOX_LIGNE; i++) {
    for (var j = 0; j < _config.NBR_POPBOX_COLONNE; j++) {
      // calculer positions popbox
      var posX = _config.DIST_LIGNE + _config.DIST_LIGNE * i;
      var posY = _config.POS_Y_POPBOX + _config.DIST_COLONNE * j;
      var popbox = createPopbox(posX, posY, game);
      // ajouter popbox dans la liste des popbox pour pouvoir les manipuler
      listPopbox.push(popbox);
    }
  }

  return listPopbox;
};

exports.default = createIA;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = __webpack_require__(0);

var movementIA = function movementIA(listPopbox, game, tempsIA, direction, vitesse, direction2) {

	console.log(tempsIA);

	if (tempsIA == true) {
		direction = ChangeDirection(direction); // change la direction 
		direction2 = ChangeDirection(direction2);
		console.log(direction);
		console.log(direction2);
		vitesse = ChangeVitesse(vitesse);
		console.log(vitesse);
	}

	if (listPopbox[0].position.y <= 220) {
		direction = 1;
		listPopbox[0].position.y += direction * vitesse;
	}

	if (listPopbox[0].position.y >= 500) {
		direction = -1;
		listPopbox[0].position.y += direction * vitesse;
	}

	if (listPopbox[1].position.y <= 570) {
		direction2 = 1;
		listPopbox[1].position.y += direction2 * vitesse;
	}
	if (listPopbox[1].position.y >= 950) {
		direction2 = -1;
		listPopbox[1].position.y += direction2 * vitesse;
	}

	listPopbox[0].position.y += direction * vitesse;
	listPopbox[1].position.y += direction2 * vitesse;

	return { direction: direction, vitesse: vitesse, direction2: direction2 };
};

var ChangeDirection = function ChangeDirection(direction) {

	//random integer from 0 to 10 
	var random = Math.floor(Math.random() * 12);

	if (random % 2 == 0) {
		console.log('PAIR');
		direction = -1;
	} else {
		console.log('IMPAIR');

		direction = 1;
	}

	return direction;
};

var ChangeVitesse = function ChangeVitesse(vitesse) {
	var random = Math.random() * (5.0 - 2.0) + 2.0; // vitesse comprise entre 1.5 et 5.0
	vitesse = random;
	return vitesse;
};

exports.default = movementIA;

/***/ }),
/* 10 */
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
        var newPlayer = (0, _player2.default)(data.type, data.customName, data.nombreCapture, data.x, data.y, game);
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var playerMovementInterpolation = function playerMovementInterpolation(otherPlayers, listPopbox, game, socket) {
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

      // gerer collision avec les popbox IA
      for (var popboxIA in listPopbox) {
        game.physics.arcade.collide(player.sprite, listPopbox[popboxIA], function (player1, player2) {
          if (player.type === 'popcorn') {
            player.sprite.destroy();
            player.playerName.destroy();
            player.speedText.destroy();
            // ask the server to delete the popcorn that collided with a popbox
            player.emitPlayerDeletion(socket);
            delete otherPlayers[id];
          }
          player.emitNombreCapture(socket);
        });
      }

      // collide each otherPlayer
      for (var subId in otherPlayers) {
        game.physics.arcade.collide(player.sprite, otherPlayers[subId].sprite, function (player1, player2) {});
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
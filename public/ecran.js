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
var WORLD_SIZE = exports.WORLD_SIZE = { width: 2024, height: 1000 };
var ASSETS_URL = exports.ASSETS_URL = '../assets';
var NBR_POPBOX_COLONNE = exports.NBR_POPBOX_COLONNE = 2;
var POS_Y_POPBOX = exports.POS_Y_POPBOX = WORLD_SIZE.height / 2 + 200;
var NBR_POPBOX_LIGNE = exports.NBR_POPBOX_LIGNE = 4;
var NBR_MONSTRE_LIGNE = exports.NBR_MONSTRE_LIGNE = localStorage.getItem('stage') === '3' ? 1 : 2;
var NBR_MONSTRE_COLONNE = exports.NBR_MONSTRE_COLONNE = localStorage.getItem('stage') === '3' ? 3 : 2;
var DIST_LIGNE = exports.DIST_LIGNE = localStorage.getItem('stage') !== '2' ? 600 : 2000;
var DIST_COLONNE = exports.DIST_COLONNE = 600;
var LIMIT_TOP = exports.LIMIT_TOP = 200;
var LIMIT_BOTTOM = exports.LIMIT_BOTTOM = 2000;
var LIMIT_LEFT = exports.LIMIT_LEFT = 100;
var LIMIT_RIGHT = exports.LIMIT_RIGHT = 2000;

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

var _createEnemies = __webpack_require__(9);

var _createEnemies2 = _interopRequireDefault(_createEnemies);

var _movement = __webpack_require__(10);

var _updatePlayers = __webpack_require__(11);

var _updatePlayers2 = _interopRequireDefault(_updatePlayers);

var _playerMovementInterpolation = __webpack_require__(12);

var _playerMovementInterpolation2 = _interopRequireDefault(_playerMovementInterpolation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SERVER_IP = '192.168.1.2:8080/'; //'localhost:8080/'
var socket = null;
var otherPlayers = {};
var tempsRestantEnSeconde = 10; // 3 * 60;
var minutesRestant = Number.parseInt(tempsRestantEnSeconde / 60);
var secondesRestant = Number.parseInt(tempsRestantEnSeconde % 60);
var text = null;
var timerlogo = null;
var tempsEcouler = false;

// recuperer le nombre de vague dns la variable de session
var NBR_VAGUE = Number.parseInt(localStorage.getItem('nbr_vague'));

// recuperer la duree pour une vague dans la variable de session
var DUREE_VAGUE = Number.parseInt(localStorage.getItem('duree_vague'));

// recuperer la vague courant dans la variable de session
var vagueCourant = Number.parseInt(localStorage.getItem('vague_courant'));

var nbrJoueurParVague = [];

var attenteJoueurs = true;

var tempsIA = false;
var tempsrestantIA = 2;
var direction = 1;
var direction2 = -1;
var vitesse = 0.5;
var vitesseAlea = new Array(_config.NBR_POPBOX_LIGNE * _config.NBR_POPBOX_COLONNE).fill(0);
var directionAlea = new Array(_config.NBR_POPBOX_LIGNE * _config.NBR_POPBOX_COLONNE).fill(0); //tab avec des direction àleatoire
var vitesseAleaMonstre = new Array(_config.NBR_MONSTRE_LIGNE * _config.NBR_MONSTRE_COLONNE).fill(0);
var directionAleaMonstre = new Array(_config.NBR_MONSTRE_LIGNE * _config.NBR_MONSTRE_COLONNE).fill(0);

var listPopbox = []; // tableau contenant les popbox manipuler par l'IA
var listEnemy = []; // tableau contenant les enemis
var music = null; // music pendant le jeu
var isGameStarted = false;
var bird = void 0;

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
      if (localStorage.getItem('stage') !== '2') {
        listPopbox = (0, _create2.default)(this.game);
      }

      // creer les enemies manipuler par l'IA
      if (localStorage.getItem('stage') !== '1') {
        listEnemy = (0, _createEnemies2.default)(this.game);
      }

      // CONFIGURATION DU TIMER (à modifier mais juste pour le test)
      //  Create our Timer
      var timer = this.game.time.create(false);
      //  Set a TimerEvent to occur after 1 seconds
      timer.loop(1000, updateCounter, this.game);
      //  Start the timer running - this is important!
      //  It won't start automatically, allowing you to hook it to button events and the like.
      timer.start();

      // recuperer le nombre de joeur inscrit par vague
      for (var i = 0; i < NBR_VAGUE; i++) {
        nbrJoueurParVague[i] = Number.parseInt(localStorage.getItem('nbr_joueur_vague_' + (i + 1)));
      }

      var timerIA = this.game.time.create(false);
      timerIA.loop(1000, updateCounterIA, this.game);
      timerIA.start();

      // Configures the game camera
      this.game.camera.x = width / 2;
      this.game.camera.y = height / 2;

      // Scale game to fit the entire window
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

      // timer du jeu
      text = this.game.add.text(_config.WORLD_SIZE.width / 2 + 80 * 4, 50, '0' + minutesRestant + ' : ' + (secondesRestant < 10 ? '0' : '') + secondesRestant, { font: "100px Courier Black", fill: "#FF8C00" });
      text.stroke = "#FFFFFF";
      text.strokeThickness = 20;
      //  Apply the shadow to the Stroke and the Fill (this is the default)
      text.setShadow(2, 2, "#333333", 2, true, true);

      // ajouter music du jeu
      music = this.game.add.audio('music');
      //  Being mp3 files these take time to decode, so we can't play them instantly
      //  Using setDecodedCallback we can be notified when they're ALL ready for use.
      //  The audio files could decode in ANY order, we can never be sure which it'll be.
      this.game.sound.setDecodedCallback(music, start, this);
      this.game.sound.play('music', 1, true);
    }
  }, {
    key: 'update',
    value: function update() {
      // Interpolates the players movement et gerer les collisions
      (0, _playerMovementInterpolation2.default)(otherPlayers, listPopbox, listEnemy, this.game, socket);
      if (isGameStarted) {
        // move obstacles
        var retour = (0, _movement.movementIA)(listPopbox, this.game, tempsIA, directionAlea, vitesseAlea);
        vitesseAlea = retour.vitesseAlea;
        directionAlea = retour.directionAlea;
        // move enemies
        if (localStorage.getItem('stage') !== '1') {
          var sens = localStorage.getItem('stage') === '2' ? -1 : 1;
          var retour2 = (0, _movement.movementIAMonstre)(listEnemy, this.game, tempsIA, directionAleaMonstre, vitesseAleaMonstre, sens);
          vitesseAleaMonstre = retour2.vitesseAlea;
          directionAleaMonstre = retour2.directionAlea;
        }
        tempsIA = false;
      }
      socket.on('notification-temps-ecouler', function (data) {
        window.alert('TEMPS ECOULER !!!\n\n NOMBRE POPCORN ARRIV\xC9 : ' + data.nombre_de_popcorn_arriver + ' \n NOMBRE DE POPCORN CAPTUR\xC9 : ' + data.nombre_de_popcorn_capturer);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      // affichage TIMER
      //this.game.debug.text(`TIMER :  ${minutesRestant} min ${secondesRestant} s` , 32, 64);
      text.setText('0' + minutesRestant + ' : ' + (secondesRestant < 10 ? '0' : '') + secondesRestant);
    }
  }]);

  return Game;
}(Phaser.State);

// start game when music plays


function start() {
  isGameStarted = true;
  music.play();
}

function updateCounter() {

  if (!tempsEcouler && isGameStarted) {
    if (tempsRestantEnSeconde > 0) {
      if (attenteJoueurs === false) {
        tempsRestantEnSeconde--;
      } else {
        updateVagueCourant(localStorage.getItem('vague_courant'));
        // compter le nombre de joueur afficher sur l'écran
        var nbrJoueurAfficher = Object.keys(otherPlayers).length;
        // si tout les joueurs inscrits dans la vague sont sur l'écran
        if (nbrJoueurParVague[vagueCourant - 1] === nbrJoueurAfficher) {
          attenteJoueurs = false;
        }
      }
    } else {
      // quand le timer arrive à zero
      if (vagueCourant < NBR_VAGUE) {
        vagueCourant += 1;
        // temps pour une vague est achever donc
        // enregistrer la vague courant dans la session
        localStorage.setItem('vague_courant', vagueCourant);
        // notifier les joueurs en attentes de la vague en cours
        // notifierJoueursEnAttentes();
        // rediriger la page vers page de chargement vague
        window.location.replace('/chargement_vague?vague=' + vagueCourant);
      } else {
        // rediriger la page vers la page de classement
        tempsEcouler = true;
        socket.emit('temps-ecouler', true);
      }
    }
  }

  minutesRestant = Number.parseInt(tempsRestantEnSeconde / 60);
  secondesRestant = Number.parseInt(tempsRestantEnSeconde % 60);
}
function updateVagueCourant(vague) {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function (event) {
    // XMLHttpRequest.DONE === 4
    if (this.readyState === XMLHttpRequest.DONE) {
      if (this.status === 200) {}
    }
  };
  req.open('PUT', '/update_vague_courant?vague=' + vague, true);
  req.send(null);
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
  if (localStorage.getItem('stage') === '2') {
    game.load.image('asphalt', _.ASSETS_URL + '/sprites/asphalt/ground_' + localStorage.getItem('stage') + '.png');
  } else {
    game.load.image('asphalt', _.ASSETS_URL + '/sprites/asphalt/ground_' + localStorage.getItem('stage') + '.jpg');
  }
  // charger les personnages popcorn
  game.load.spritesheet('pop_marley', _.ASSETS_URL + '/sprites/popcorn/pop_marley.png', 300, 300, 4);
  game.load.spritesheet('bat_pop', _.ASSETS_URL + '/sprites/popcorn/bat_pop.png', 300, 300, 4);
  game.load.spritesheet('pop_soldat', _.ASSETS_URL + '/sprites/popcorn/pop_soldat.png', 300, 300, 4);
  game.load.spritesheet('caramba_pop', _.ASSETS_URL + '/sprites/popcorn/caramba_pop.png', 300, 300, 4);
  game.load.spritesheet('pop_vador', _.ASSETS_URL + '/sprites/popcorn/pop_vador.png', 300, 300, 4);
  game.load.spritesheet('gentle_pop', _.ASSETS_URL + '/sprites/popcorn/gentle_pop.png', 300, 300, 4);
  game.load.spritesheet('pop_blood_gang', _.ASSETS_URL + '/sprites/popcorn/pop_blood_gang.png', 300, 300, 4);
  game.load.spritesheet('pop_boy', _.ASSETS_URL + '/sprites/popcorn/pop_boy.png', 300, 300, 4);
  game.load.spritesheet('pop_kent', _.ASSETS_URL + '/sprites/popcorn/pop_kent.png', 300, 300, 4);
  game.load.spritesheet('pop_carrey', _.ASSETS_URL + '/sprites/popcorn/pop_carrey.png', 300, 300, 4);
  game.load.spritesheet('pop_minator', _.ASSETS_URL + '/sprites/popcorn/pop_minator.png', 300, 300, 4);
  game.load.spritesheet('pop_ninja', _.ASSETS_URL + '/sprites/popcorn/pop_ninja.png', 300, 300, 4);
  game.load.spritesheet('saint_patrick_pop', _.ASSETS_URL + '/sprites/popcorn/saint_patrick_pop.png', 300, 300, 4);
  game.load.spritesheet('santa_pop', _.ASSETS_URL + '/sprites/popcorn/santa_pop.png', 300, 300, 4);
  game.load.spritesheet('thug_pop', _.ASSETS_URL + '/sprites/popcorn/thug_pop.png', 300, 300, 4);

  // charger les obstacles
  game.load.image('popbox', _.ASSETS_URL + '/sprites/popbox/popbox' + localStorage.getItem('stage') + '.png');

  // charger les énemies
  game.load.spritesheet('bird', _.ASSETS_URL + '/sprites/enemies/birds_1.png', 183, 168, 14);

  // charger les voitures
  game.load.image('car', _.ASSETS_URL + '/sprites/enemies/car_2.png');

  // charger les musiques selons le level d'avancement
  game.load.audio('music', [_.ASSETS_URL + '/audio/music_' + localStorage.getItem('stage') + '.mp3', _.ASSETS_URL + '/audio/music_' + localStorage.getItem('stage') + '.ogg']);
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
  // let groundTiles = []
  // const groundSprite = game.add.sprite(0, 0, 'asphalt')
  // /*groundSprite.width = 1920
  // groundSprite.height = 1080*/
  // groundTiles.push(groundSprite)

  var groundTiles = [];
  for (var i = 0; i <= width / 64; i++) {
    for (var j = 0; j <= height / 64; j++) {
      var groundSprite = game.add.sprite(i * 400, j * 400, 'asphalt');
      groundSprite.width = 400;
      groundSprite.height = 400;
      groundTiles.push(groundSprite);
    }
  }
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
  sprite.width = 150;
  sprite.height = 150;
  // if (type === 'popcorn') {
  //   sprite.width = 100
  //   sprite.height = 100
  // } else {
  //   sprite.width = 70
  //   sprite.height = 110
  // }
  sprite.body.allowRotation = false;
  sprite.animations.add('run');
  sprite.animations.play('run', 2, true);
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
  sprite.body.collideWorldBounds = false;
  sprite.body.checkCollision.up = true;
  sprite.body.checkCollision.down = true;
  sprite.body.checkCollision.right = true;
  sprite.body.checkCollision.left = true;
  sprite.body.bounce.setTo(1, 1);
  sprite.anchor.setTo(0.5, 0.5);
  sprite.width = 200;
  sprite.height = 200;
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

// LES FONCTIONS UTILITAIRES

var create = function create(x, y, game) {
  var sprite = void 0;
  if (localStorage.getItem('stage') === '3') {
    sprite = game.add.sprite(x, y, 'bird');
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    sprite.body.collideWorldBounds = false;
    sprite.body.checkCollision.up = true;
    sprite.body.checkCollision.down = true;
    sprite.body.checkCollision.left = true;
    sprite.body.checkCollision.right = true;
    sprite.body.bounce.setTo(1, 1);
    sprite.anchor.setTo(0.5, 0.5);
    sprite.animations.add('run');
    sprite.animations.play('run', 14, true);
  } else {
    sprite = game.add.sprite(x, y, 'car');
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    sprite.body.collideWorldBounds = false;
    sprite.body.checkCollision.up = true;
    sprite.body.checkCollision.down = true;
    sprite.body.checkCollision.right = true;
    sprite.body.checkCollision.left = true;
    sprite.body.bounce.setTo(1, 1);
    sprite.anchor.setTo(0.5, 0.5);
    sprite.width = 400;
    sprite.height = 300;
  }

  return sprite;
};

// LA FONCTION PRINCIPALE

var createEnemies = function createEnemies(game) {
  var listEnemy = [];
  // creer les enemies par colonne et par ligne
  for (var i = 0; i < _config.NBR_MONSTRE_LIGNE; i++) {
    for (var j = 0; j < _config.NBR_MONSTRE_COLONNE; j++) {
      // calculer positions popbox
      var posX = _config.DIST_LIGNE + _config.DIST_LIGNE * i;
      var posY = _config.POS_Y_POPBOX + _config.DIST_COLONNE * j;
      var enemy = create(posX, posY, game);
      // ajouter popbox dans la liste des popbox pour pouvoir les manipuler
      listEnemy.push(enemy);
    }
  }

  return listEnemy;
};

exports.default = createEnemies;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.movementIAMonstre = exports.movementIA = undefined;

var _config = __webpack_require__(0);

var movementIA = function movementIA(listPopbox, game, tempsIA, directionAlea, vitesseAlea) {

  //console.log(tempsIA)
  if (tempsIA == true) {
    directionAlea = ChangeDirection(listPopbox); // change la direction
    vitesseAlea = ChangeVitesse(listPopbox);
  }

  for (var i = 0; i < listPopbox.length; i++) {
    if (i % 2 === 0) {
      // pair (correspond aux popbox sur la rangé supérieur)
      if (listPopbox[i].position.y <= _config.LIMIT_TOP) {
        directionAlea[i] = 1;
      }
      if (listPopbox[i].position.y >= _config.LIMIT_BOTTOM / 2 - 40) {
        directionAlea[i] = -1;
      }
    } else {
      // impair (correspond aux popbox sur la rangé inférieur)
      if (listPopbox[i].position.y <= _config.LIMIT_BOTTOM / 2 - 40) {
        directionAlea[i] = 1;
      }
      if (listPopbox[i].position.y >= _config.LIMIT_BOTTOM) {
        directionAlea[i] = -1;
      }
    }
    listPopbox[i].position.y += directionAlea[i] * vitesseAlea[i];
  }

  return { directionAlea: directionAlea, vitesseAlea: vitesseAlea };
};

var movementIAMonstre = function movementIAMonstre(listPopbox, game, tempsIA, directionAlea, vitesseAlea) {
  var sens = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;


  //console.log(tempsIA)
  if (tempsIA == true) {
    directionAlea = ChangeDirection(listPopbox); // change la direction
    vitesseAlea = ChangeVitesse(listPopbox);
  }

  for (var i = 0; i < listPopbox.length; i++) {
    if (i % 2 === 0) {
      // pair (correspond aux popbox sur la rangé supérieur)
      if (listPopbox[i].position.y <= _config.LIMIT_TOP) {
        directionAlea[i] = 1;
      }
      if (listPopbox[i].position.y >= _config.LIMIT_BOTTOM / 2 - 40) {
        directionAlea[i] = -1;
      }
    } else {
      // impair (correspond aux popbox sur la rangé inférieur)
      if (listPopbox[i].position.y <= _config.LIMIT_BOTTOM / 2 - 40) {
        directionAlea[i] = 1;
      }
      if (listPopbox[i].position.y >= _config.LIMIT_BOTTOM) {
        directionAlea[i] = -1;
      }
    }
    if (sens > 0) {
      movementZigZagIA(listPopbox[i], vitesseAlea[i]);
    } else {
      movementZigZagIARevert(listPopbox[i], vitesseAlea[i]);
    }
    listPopbox[i].position.y += directionAlea[i] * vitesseAlea[i];
  }

  return { directionAlea: directionAlea, vitesseAlea: vitesseAlea };
};

var ChangeDirection = function ChangeDirection(listPopbox) {
  var directionAlea = [];
  var random = void 0;
  for (var i = 0; i < listPopbox.length; i++) {
    random = Math.floor(Math.random() * 12); //random integer from 0 to 11


    if (random % 2 == 0) {
      //console.log('PAIR')
      directionAlea[i] = -1;
    } else {
      //console.log('IMPAIR')

      directionAlea[i] = 1;
    }
  }
  return directionAlea;
};

var ChangeVitesse = function ChangeVitesse(listPopbox) {
  var vitesseAlea = [];
  var random = void 0;
  for (var i = 0; i < listPopbox.length; i++) {

    random = Math.random() * (10.0 - 5.0) + 5.0; // vitesse comprise entre 1.5 et 5.0

    vitesseAlea[i] = random;
  }
  return vitesseAlea;
};

var movementVoitureIA = function movementVoitureIA(listPopbox) {

  var random = Math.floor(Math.random() * 3);

  if (listPopbox[0].position.x == 2100) {
    if (random == 0) {

      listPopbox[0].position.y = _config.POS_Y_POPBOX;
      listPopbox[0].position.x = _config.POS_Y_POPBOX;
    } else if (random == 1) {
      listPopbox[0].position.y = _config.POS_Y_POPBOX + _config.DIST_COLONNE;
      listPopbox[0].position.x = _config.POS_Y_POPBOX;
    } else {
      listPopbox[0].position.y = _config.POS_Y_POPBOX + _config.DIST_COLONNE * 2;
      listPopbox[0].position.x = _config.POS_Y_POPBOX;
    }
  }listPopbox[0].position.x += 1 * 2.0;
};

var movementZigZagIA = function movementZigZagIA(popbox, vitesseAlea) {
  // remettre le popbox à un position initial aléatoire lorsqu'il dépase la
  // limite à droite de l'écran
  var j = Math.floor(Math.random() * _config.NBR_POPBOX_COLONNE);
  if (popbox.position.x >= _config.WINDOW_WIDTH) {
    popbox.position.x = -200;
    popbox.position.y = _config.POS_Y_POPBOX + _config.DIST_COLONNE * j;
  }
  popbox.position.x += 1 * vitesseAlea;
};

var movementZigZagIARevert = function movementZigZagIARevert(popbox, vitesseAlea) {
  // remettre le popbox à un position initial aléatoire lorsqu'il dépase la
  // limite à gauche de l'écran
  var j = Math.floor(Math.random() * _config.NBR_POPBOX_COLONNE);
  if (popbox.position.x < 0) {
    popbox.position.x = _config.WINDOW_WIDTH + 200;
    popbox.position.y = _config.POS_Y_POPBOX + _config.DIST_COLONNE * j;
  }
  popbox.position.x += -1 * vitesseAlea;
};

exports.movementIA = movementIA;
exports.movementIAMonstre = movementIAMonstre;

/***/ }),
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var playerMovementInterpolation = function playerMovementInterpolation(otherPlayers, listPopbox, listEnemy, game, socket) {
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
          //if (player.type === 'popcorn') {
          player.sprite.destroy();
          player.playerName.destroy();
          player.speedText.destroy();
          // ask the server to delete the popcorn that collided with a popbox
          player.emitPlayerDeletion(socket);
          delete otherPlayers[id];
          console.log('collision');
          //}
          player.emitNombreCapture(socket);
        });
      }
      // gerer collision avec les enemies
      for (var enemyIA in listEnemy) {
        game.physics.arcade.collide(player.sprite, listEnemy[enemyIA], function (player1, player2) {
          //if (player.type === 'popcorn') {
          player.sprite.destroy();
          player.playerName.destroy();
          player.speedText.destroy();
          // ask the server to delete the popcorn that collided with a popbox
          player.emitPlayerDeletion(socket);
          delete otherPlayers[id];
          console.log('collision');
          //}
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
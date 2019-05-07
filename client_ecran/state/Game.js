import { WORLD_SIZE } from '../config'
import { createText } from './utils'
import fileLoader from '../config/fileloader'
import createWorld from './world/createWorld'
import player from './player'
import createIA from './ia/create'
import createEnemies from './ia/createEnemies'
import { movementIA, movementIAMonstre } from './ia/movement'
import updatePlayers from './sockets/updatePlayers'
import playerMovementInterpolation from './predictions/playerMovementInterpolation'
import {
  NBR_POPBOX_LIGNE,
  NBR_POPBOX_COLONNE,
  NBR_MONSTRE_LIGNE,
  NBR_MONSTRE_COLONNE
} from '../config'

const SERVER_IP = 'localhost:8000/'
let socket = null
let otherPlayers = {}
let tempsRestantEnSeconde = 3 * 60;
let minutesRestant = Number.parseInt(tempsRestantEnSeconde / 60);
let secondesRestant = Number.parseInt(tempsRestantEnSeconde % 60);
let text = null;
let timerlogo = null;
let tempsEcouler = false;
let tempsIA = false
let tempsrestantIA = 2;
let direction = 1
let direction2 = -1
let vitesse = 0.5
let vitesseAlea = new Array(NBR_POPBOX_LIGNE * NBR_POPBOX_COLONNE).fill(0);
let directionAlea = new Array(NBR_POPBOX_LIGNE * NBR_POPBOX_COLONNE).fill(0); //tab avec des direction àleatoire
let vitesseAleaMonstre = new Array(NBR_MONSTRE_LIGNE * NBR_MONSTRE_COLONNE).fill(0);
let directionAleaMonstre = new Array(NBR_MONSTRE_LIGNE * NBR_MONSTRE_COLONNE).fill(0);
let listPopbox = []; // tableau contenant les popbox manipuler par l'IA
let listEnemy = []; // tableau contenant les enemis
let music = null // music pendant le jeu
let isGameStarted = false;
let bird;


class Game extends Phaser.State {
  constructor () {
    super()
    this.player = {}
    //this.physics.enable(sprite, Phaser.Physics.ARCADE)
  }

  preload () {
    // Loads files
    fileLoader(this.game)
  }

  create () {
    const { width, height } = WORLD_SIZE
    // Creates the world
    createWorld(this.game)
    // Connects the player to the server
    socket = io(SERVER_IP)

    // update all players
    updatePlayers(socket, otherPlayers, this.game)

    // creer les popbox manipuler par l'IA
    if (localStorage.getItem('stage') !== '2') {
      listPopbox = createIA(this.game);
    }

    // creer les enemies manipuler par l'IA
    if (localStorage.getItem('stage') !== '1') {
      listEnemy = createEnemies(this.game);
    }

    // CONFIGURATION DU TIMER (à modifier mais juste pour le test)
    //  Create our Timer
    const timer = this.game.time.create(false);
    //  Set a TimerEvent to occur after 1 seconds
    timer.loop(1000, updateCounter, this.game);
    //  Start the timer running - this is important!
    //  It won't start automatically, allowing you to hook it to button events and the like.
    timer.start();


   const timerIA = this.game.time.create(false);
   timerIA.loop(1000,updateCounterIA, this.game);
   timerIA.start();



    // Configures the game camera
    this.game.camera.x = width / 2
    this.game.camera.y = height / 2

    // Scale game to fit the entire window
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL


    // timer du jeu
    text = this.game.add.text((WORLD_SIZE.width/2)+ (80*4),50,`0${minutesRestant} : ${(secondesRestant < 10) ? '0' : ''}${secondesRestant}`, { font: "100px Courier Black", fill: "#FF8C00" });
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

  update () {
    // Interpolates the players movement et gerer les collisions
    playerMovementInterpolation(otherPlayers, listPopbox, listEnemy, this.game, socket)
    if (isGameStarted) {
      // move obstacles
      const retour = movementIA(listPopbox,this.game,tempsIA,directionAlea,vitesseAlea)
      vitesseAlea = retour.vitesseAlea
      directionAlea = retour.directionAlea
      // move enemies
      if (localStorage.getItem('stage') !== '1') {
        const sens = (localStorage.getItem('stage') === '2') ? -1 : 1;
        const retour2 = movementIAMonstre(listEnemy, this.game, tempsIA, directionAleaMonstre, vitesseAleaMonstre, sens);
        vitesseAleaMonstre = retour2.vitesseAlea
        directionAleaMonstre = retour2.directionAlea
      }
      tempsIA = false;
    }
    socket.on('notification-temps-ecouler', data =>{
       window.alert(`TEMPS ECOULER !!!\n\n NOMBRE POPCORN ARRIVÉ : ${data.nombre_de_popcorn_arriver} \n NOMBRE DE POPCORN CAPTURÉ : ${data.nombre_de_popcorn_capturer}`);
    })
  }

  render () {
    // affichage TIMER
    //this.game.debug.text(`TIMER :  ${minutesRestant} min ${secondesRestant} s` , 32, 64);
     text.setText(`0${minutesRestant} : ${(secondesRestant < 10) ? '0' : ''}${secondesRestant}`);
  }

}

// start game when music plays
function start() {
  isGameStarted = true;
  music.play();
}

function updateCounter() {

if (!tempsEcouler && isGameStarted) {
  if(tempsRestantEnSeconde > 0){
	   tempsRestantEnSeconde--;
  } else{ // quand le timer arrive à zero il reprend à 5, enlever le else pour garder time à 0
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

  if(tempsrestantIA > 0){
     tempsrestantIA--;

  } else{ // quand le timer arrive à zero il reprend à 5, enlever le else pour garder time à 0
    // tempsRestantEnSeconde = 5 * 60;
    tempsrestantIA = 2;
    tempsIA = true;
  }

}



}





export default Game

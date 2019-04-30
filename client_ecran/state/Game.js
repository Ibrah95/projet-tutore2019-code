import { WORLD_SIZE } from '../config'
import { createText } from './utils'
import fileLoader from '../config/fileloader'
import createWorld from './world/createWorld'
import player from './player'
import createIA from './ia/create'
import movementIA from './ia/movement'
import ChangeDirection from './ia/movement'
import ChangeVitesse from './ia/movement'
import updatePlayers from './sockets/updatePlayers'
import playerMovementInterpolation from './predictions/playerMovementInterpolation'
import { NBR_POPBOX_LIGNE, NBR_POPBOX_COLONNE } from '../config'

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
let directionAlea = new Array(NBR_POPBOX_LIGNE * NBR_POPBOX_COLONNE).fill(0);; //tab avec des direction àleatoire
let listPopbox = []; // tableau contenant les popbox manipuler par l'IA

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
    listPopbox = createIA(this.game);

    // vitesseAlea = ChangeVitesse(listPopbox);
    // directionAlea = ChangeDirection(listPopbox);

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



    text=this.game.add.text((WORLD_SIZE.width/2)+140,50,`${minutesRestant} : ${secondesRestant}`,{fontSize: '43px', fill:'#AFF',align:'center'})


    timerlogo = this.game.add.sprite((WORLD_SIZE.width/2)+60, 50, 'timerlogo')

    timerlogo.width = 50
    timerlogo.height = 50
  }

  update () {
    // Interpolates the players movement et gerer les collisions
    playerMovementInterpolation(otherPlayers, listPopbox, this.game, socket)
    const retour = movementIA(listPopbox,this.game,tempsIA,directionAlea,vitesseAlea)
    tempsIA = false;

    vitesseAlea = retour.vitesseAlea
    directionAlea = retour.directionAlea


    socket.on('notification-temps-ecouler', data =>{
       window.alert(`TEMPS ECOULER !!!\n\n NOMBRE POPCORN ARRIVÉ : ${data.nombre_de_popcorn_arriver} \n NOMBRE DE POPCORN CAPTURÉ : ${data.nombre_de_popcorn_capturer}`);
    })

    // affichage TIMER
    //this.game.debug.text(`TIMER :  ${minutesRestant} min ${secondesRestant} s` , 32, 64);
	   text.setText(`${minutesRestant} : ${secondesRestant}`);
  }

}

function updateCounter() {

if (!tempsEcouler) {
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

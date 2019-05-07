import { WORLD_SIZE } from '../config'
import { createText } from './utils'
import fileLoader from '../config/fileloader'
import createWorld from './world/createWorld'
import player from './player'
import createIA from './ia/create'
import updatePlayers from './sockets/updatePlayers'
import playerMovementInterpolation from './predictions/playerMovementInterpolation'

const SERVER_IP = 'localhost:8000/'
let socket = null
let otherPlayers = {}
let tempsRestantEnSeconde = 10 // 3 * 60;
let minutesRestant = Number.parseInt(tempsRestantEnSeconde / 60);
let secondesRestant = Number.parseInt(tempsRestantEnSeconde % 60);
let text = null;
let timerlogo = null;
let tempsEcouler = false;

// recuperer le nombre de vague dns la variable de session
let NBR_VAGUE = Number.parseInt(localStorage.getItem('nbr_vague'));

// recuperer la duree pour une vague dans la variable de session
let DUREE_VAGUE = Number.parseInt(localStorage.getItem('duree_vague'));

// recuperer la vague courant dans la variable de session
let vagueCourant = Number.parseInt(localStorage.getItem('vague_courant'));

const nbrJoueurParVague = [];

let attenteJoueurs = true;

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

    // CONFIGURATION DU TIMER (à modifier mais juste pour le test)
    //  Create our Timer
    const timer = this.game.time.create(false);
    //  Set a TimerEvent to occur after 1 seconds
    timer.loop(1000, updateCounter, this.game);
    //  Start the timer running - this is important!
    //  It won't start automatically, allowing you to hook it to button events and the like.
    timer.start();

    // recuperer le nombre de joeur inscrit par vague
    for (let i = 0; i < NBR_VAGUE; i++) {
      nbrJoueurParVague[i] = Number.parseInt(localStorage.getItem(`nbr_joueur_vague_${i+1}`));
    }


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
    if (attenteJoueurs === false) {
	     tempsRestantEnSeconde--;
    } else {
      updateVagueCourant(localStorage.getItem('vague_courant'));
      // compter le nombre de joueur afficher sur l'écran
      const nbrJoueurAfficher = Object.keys(otherPlayers).length;
      // si tout les joueurs inscrits dans la vague sont sur l'écran
      if (nbrJoueurParVague[vagueCourant - 1] ===  nbrJoueurAfficher) {
        attenteJoueurs = false;
      }
    }
  } else { // quand le timer arrive à zero
    if (vagueCourant < NBR_VAGUE) {
      vagueCourant += 1;
      // temps pour une vague est achever donc
      // enregistrer la vague courant dans la session
      localStorage.setItem('vague_courant', vagueCourant);
      // notifier les joueurs en attentes de la vague en cours
      // notifierJoueursEnAttentes();
      // rediriger la page vers page de chargement vague
      window.location.replace(`/chargement_vague?vague=${vagueCourant}`);
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
  const req = new XMLHttpRequest();
  req.onreadystatechange = function(event) {
      // XMLHttpRequest.DONE === 4
      if (this.readyState === XMLHttpRequest.DONE) {
          if (this.status === 200) {
          }
      }
  };
  req.open('PUT', `/update_vague_courant?vague=${vague}`, true);
  req.send(null);
}



export default Game

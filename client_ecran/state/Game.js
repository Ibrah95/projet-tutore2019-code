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
  NBR_MONSTRE_COLONNE,
  TEMP_INIT,
} from '../config'



const SERVER_IP = /*'192.168.1.2:8080/'*/ 'localhost:8080/'
let socket = null
let otherPlayers = {}
let tempsRestantEnSeconde = TEMP_INIT // 3 * 60;
let minutesRestant = Number.parseInt(tempsRestantEnSeconde / 60);
let secondesRestant = Number.parseInt(tempsRestantEnSeconde % 60);
let text = null;
let annonce = null;
let annonceFin = null;
let timerlogo = null;
let tempsEcouler = false;

// recuperer le nombre de vague dns la variable de session
let NBR_VAGUE = Number.parseInt(localStorage.getItem('nbr_vague'));

// recuperer la duree pour une vague dans la variable de session
let DUREE_VAGUE = Number.parseInt(localStorage.getItem('duree_vague'));

// recuperer la vague courant dans la variable de session
let vagueCourant = Number.parseInt(localStorage.getItem('vague_courant'));
let stageUpdated = false;
let vagueCourantUpdated = false;

const nbrJoueurParVague = [];

let attenteJoueurs = true;

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

    // recuperer le nombre de joeur inscrit par vague
    for (let i = 0; i < NBR_VAGUE; i++) {
      nbrJoueurParVague[i] = Number.parseInt(localStorage.getItem(`nbr_joueur_vague_${i+1}`));
    }

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

    annonce = this.game.add.text((WORLD_SIZE.width/2) + (200 * 2), (WORLD_SIZE.height/2),`G O`, { font: "400px Courier Black", fill: "#FF8C00" });
    annonce.stroke = "#FFFFFF";
    annonce.strokeThickness = 50;
    //  Apply the shadow to the Stroke and the Fill (this is the default)
    annonce.setShadow(2, 2, "#FFFFFF", 2, true, true);
    annonce.alpha = 0;

    annonceFin = this.game.add.text((WORLD_SIZE.width/2) + (200 * 2), (WORLD_SIZE.height/2),`FIN`, { font: "400px Courier Black", fill: "#FF8C00" });
    annonceFin.stroke = "#FFFFFF";
    annonceFin.strokeThickness = 50;
    //  Apply the shadow to the Stroke and the Fill (this is the default)
    annonceFin.setShadow(2, 2, "#FFFFFF", 2, true, true);
    annonceFin.alpha = 0;

  }

  update () {
    if (isGameStarted  && !
      attenteJoueurs && !tempsEcouler) {
        // Interpolates the players movement et gerer les collisions
        playerMovementInterpolation(otherPlayers, listPopbox, listEnemy, this.game, socket)
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
      socket.on('update-time', data => {
        const pseudo = data.pseudo;
        const req = new XMLHttpRequest();
        const time = TEMP_INIT - tempsRestantEnSeconde;
        req.onreadystatechange = function(event) {
          // XMLHttpRequest.DONE === 4
          if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
            }
          }
        };
        req.open('PUT', `/update_time?pseudo=${pseudo}&time=${time}`, true);
        req.send(null);
      })
    }

    render () {
      // affichage TIMER
      //this.game.debug.text(`TIMER :  ${minutesRestant} min ${secondesRestant} s` , 32, 64);
      text.setText(`0${minutesRestant} : ${(secondesRestant < 10) ? '0' : ''}${secondesRestant}`);
      // annonce depart du jeu
      if (isGameStarted && !attenteJoueurs) {
        if (tempsRestantEnSeconde > (TEMP_INIT - 2)) {
          annonce.alpha = 1;
        }
        if (tempsRestantEnSeconde <= (TEMP_INIT - 2) && annonce.alpha != 0) {
          annonce.alpha -= 0.1;
        }
        if (tempsRestantEnSeconde <= 3) {
          annonceFin.alpha += 0.1;
        }
      }
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
        if (attenteJoueurs === false) {
          tempsRestantEnSeconde--;
        } else {
          updateVagueCourant(localStorage.getItem('vague_courant'));
          // compter le nombre de joueur afficher sur l'écran
          const nbrJoueurAfficher = Object.keys(otherPlayers).length;
          // si tout les joueurs inscrits dans la vague sont sur l'écran
          if (nbrJoueurParVague[vagueCourant - 1] <=  nbrJoueurAfficher) {
            attenteJoueurs = false;
            updateJeuEnCours(true);
          }
          if (tempsRestantEnSeconde === 2) {
            socket.emit('temps-ecouler', true);
          }
        }
      } else { // quand le timer arrive à zero
        let stage = Number.parseInt(localStorage.getItem('stage'));
        otherPlayers = {};
        tempsEcouler = true;
        vagueCourant += 1;
        socket.emit('temps-ecouler', true);
        if (stage <= 3) {
          if (vagueCourant <= NBR_VAGUE) {
            updateJeuEnCours(false);
            if (!vagueCourantUpdated) {
              // temps pour une vague est achever donc
              // enregistrer la vague courant dans la session
              localStorage.setItem('vague_courant', vagueCourant);
              vagueCourantUpdated = true;
              updateJeuEnCours(false);
              socket.emit('temps-ecouler', true);
              // notifier les joueurs en attentes de la vague en cours
              // notifierJoueursEnAttentes();
              // rediriger la page vers page de chargement vague
              window.location.assign(`/chargement_vague?vague=${vagueCourant}`);
            }
          } else {
            if (!stageUpdated) {
              // rediriger la page vers la page de classement
              // tempsEcouler = true;
              // socket.emit('temps-ecouler', true);
              updateJeuEnCours(false);
              if (stage < 3) {
                vagueCourant = 1;
                localStorage.setItem('vague_courant', vagueCourant);
                stage += 1;
                localStorage.setItem('stage', stage);
                stageUpdated = true;
                socket.emit('temps-ecouler', true);
                // notifier les joueurs en attentes de la vague en cours
                // notifierJoueursEnAttentes();
                // rediriger la page vers page de chargement vague
                window.location.assign(`/chargement_vague?vague=${vagueCourant}`);
              } else {
                window.location.assign('/winner');
              }
            }
          }
        } else {
          window.location.assign('/winner');
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

  function updateJeuEnCours(value) {
    console.log('entrer dans updateJeuEnCours');
    const req = new XMLHttpRequest();
    req.onreadystatechange = function(event) {
      // XMLHttpRequest.DONE === 4
      if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 200) {
        }
      }
    };
    req.open('PUT', `/update_jeu_en_cours?valeur=${value}`, true);
    req.send(null);
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

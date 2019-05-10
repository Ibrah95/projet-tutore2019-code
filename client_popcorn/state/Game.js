import { WORLD_SIZE } from '../config'
import { createText } from './utils'
import fileLoader from '../config/fileloader'
import createWorld from './world/createWorld'
import player from './player'
import newPlayer from './sockets/newPlayer'
import { WINDOW_HEIGHT,WINDOW_WIDTH } from './../config'

const SERVER_IP = 'localhost:8080/' //'192.168.1.2:8080/'
let socket = null
let otherPlayers = {}
let bmd = null
let est_arriver= false
let estCapturer = false;
let estTerminerPartie = false;
let est_placer_sur_zone_fin = false;
let rang = 0;

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

    // recuperer le type de POPCORN
    const customName = document.getElementById('custom_name').textContent;
    console.log(customName);

    // Creates the player passing the X, Y, game and socket as arguments
    this.player = player((Math.random()* (300-100) +100 ), Math.random() * ((WINDOW_HEIGHT - 100) -100 ) + 100 , customName, this.game, socket)
    // Creates the player name text
    this.player.playerName = createText(this.game, this.player.sprite.body)
    // Creates the player speed text
    this.player.speedText = createText(this.game, this.player.sprite.body)

    // Sends a new-player event to the server
    newPlayer(socket, this.player)
    // update all players
    // updatePlayers(socket, otherPlayers, this.game)

    // create load bar for bonus
    bmd = this.game.add.bitmapData(200,50);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0,0,200,50);
    bmd.ctx.fillStyle = '#b90f28';
    bmd.ctx.fill();
    healthBar = this.game.add.sprite(50, 252,bmd);
    healthBar.anchor.y = 0.5;

    // Configures the game camera
    this.game.camera.x = this.player.sprite.x - 800 / 2
    this.game.camera.y = this.player.sprite.y - 600 / 2

    // Scale game to fit the entire window
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
  }

  update () {
    // gerer le déplacement du popcorn
    this.player.drive(this.game)

    // gerer la capture du popcorn
    socket.on('notifier-capture', data => {
      if (data === String(socket.id)) {
        if("vibrate" in window.navigator) {
          window.navigator.vibrate(500);
        }
        estCapturer = true;
      }
    })
    // gerer l'arrivé du popcorn à la zone de fin
    socket.on('est-arriver', data => {
      if(data.id === String(socket.id)){
        est_arriver = true;
        rang = data.rang;
      }
    });
    // gerer la fin d'une partie
    socket.on('partie-est-terminer', data => {
      console.log('PARTIE EST TERMINER');
      socket.emit('disconnect');
      //if (data.id === String(socket.id)) {
      // estTerminerPartie = true;
      window.location.href = '/attente';
      //}
    });
    if (!est_arriver) {
      if (!estCapturer) {
        this.player.drive(this.game)
      } else {
        this.player.sprite.body.x = 50;
        estCapturer = false;
        socket.emit('move-player', {
          pseudo: sessionStorage.getItem('pseudo'),
          estCapturer: this.player.estCapturer,
          nombreCapture: this.player.nombreCapture,
          position: this.player.position,
          customName: this.player.customName,
          speedText: {
            x: this.player.sprite.body.x,
            y: this.player.sprite.body.y,
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
        })
      }
    } else {
      if (!est_placer_sur_zone_fin) {
        this.player.sprite.body.x = 2500;
        socket.emit('move-player', {
          pseudo: sessionStorage.getItem('pseudo'),
          estCapturer: this.player.estCapturer,
          nombreCapture: this.player.nombreCapture,
          position: this.player.position,
          customName: this.player.customName,
          speedText: {
            x: this.player.sprite.body.x,
            y: this.player.sprite.body.y,
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
        })
        est_placer_sur_zone_fin = true;
        if("vibrate" in window.navigator) {
          window.navigator.vibrate(500);
        }
        // setTimeout(()=>{
        //   window.alert(`Félicitation vous êtes arrivé à la ${rang} ${(rang === 1) ? 'ère' : 'ème'} place`);
        // }, 800);
        sessionStorage.setItem('rang', rang);
        window.location.href = '/attente';
      }
    }
    // Interpolates the players movement
    // playerMovementInterpolation(otherPlayers)
  }
}

export default Game

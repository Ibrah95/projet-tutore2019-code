import { WORLD_SIZE } from '../config'
import { createText } from './utils'
import fileLoader from '../config/fileloader'
import createWorld from './world/createWorld'
import player from './player'
import newPlayer from './sockets/newPlayer'
import { WINDOW_HEIGHT,WINDOW_WIDTH } from './../config'

const SERVER_IP = '192.168.0.13:8000/'
let socket = null
let otherPlayers = {}
let bmd = null
let random
let comp1 =0 , comp2=0, comp3=0
let position = 0;

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
    // Creates the player passing the X, Y, game and socket as arguments
    //this.player = player(width / 2, Math.random() * height, this.game, socket)

    //fonction pour apparition random :
    // random = Math.floor( Math.random()* Math.floor(3) ) //random de 0 à 2
   
    // console.log(`${random} =random`)
    // recuperer tableau de position des popbox sur les colonnes
    
    // socket.on('counter-position-client', data => {
    //     console.log('entrer dans counter-position');
    //     console.log(data);
    //     tabPosition = data.tabPosition;
    // })

    // // if(random == 0 ) {
    // let i = 0
    // while (tabPosition[i] === 3) {
    //     i++;
    // }
    // // comp1 += 1
    this.player = player( 200 , Math.random() * ((WINDOW_HEIGHT - 100) -100 ) + 100 , this.game, socket)
    // tabPosition[i] += 1;
    // console.log(`tabPosition = ${tabPosition}`);
    // this.emitCounterPosition(tabPosition);
    // }

    // else if(random == 1) {
    //         this.player = player( 1200 , Math.random() * ((WINDOW_HEIGHT - 100) -100 ) + 100 , this.game, socket)
           
    //         comp2 = comp2 + 1
    //         console.log(`${comp2} = comp2`)
    // }

    // else if(random == 2){
    //         this.player = player( 1700, Math.random() * ((WINDOW_HEIGHT - 100) -100 ) + 100 , this.game, socket)
           
    //         comp3= comp3 +1
    //     	console.log(`${comp3} = comp3`)
    // }



    //this.player = player( width /2 , Math.random() * ((WINDOW_HEIGHT - 100) -100 ) + 100 , this.game, socket)
    // Creates the player name text
    this.player.playerName = createText(this.game, this.player.sprite.body)
    // Creates the player speed text
    this.player.speedText = createText(this.game, this.player.sprite.body)

    // Sends a new-player event to the server
    newPlayer(socket, this.player)

    // create load bar for bonus
    bmd = this.game.add.bitmapData(200,50);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0,0,200,50);
    bmd.ctx.fillStyle = 'orange';
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
    this.player.drive(this.game)

    socket.on('update-position-player', data => {
        if (String(socket.id) === data.id) {
            position = data.position;
        }
    })

    this.player.sprite.x = 200 + 200 * position;

    // Move the camera to follow the player
    // let cameraX = this.player.sprite.x - 800 / 2
    // let cameraY = this.player.sprite.y - 600 / 2
    // this.game.camera.x += (cameraX - this.game.camera.x) * 0.08
    // this.game.camera.y += (cameraY - this.game.camera.y) * 0.08
  }

  emitCounterPosition (tabPosition) {
    console.log('envoi tabPosition au serveur');
    console.log(tabPosition);
    socket.emit('counter-position', {
        tabPosition : tabPosition
    })
  }
}

export default Game

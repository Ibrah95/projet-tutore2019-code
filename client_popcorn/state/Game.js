import { WORLD_SIZE } from '../config'
import { createText } from './utils'
import fileLoader from '../config/fileloader'
import createWorld from './world/createWorld'
import player from './player'
import newPlayer from './sockets/newPlayer'

const SERVER_IP = '192.168.1.19:8000/'
let socket = null
let otherPlayers = {}
let bmd = null

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
    this.player = player(Math.random() * width, Math.random() * height / 2, this.game, socket)
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
    this.player.drive(this.game)
    
    // active vibration for 100 ms
    // if("vibrate" in window.navigator) {
    //   window.navigator.vibrate(100);
    // }

    // Move the camera to follow the player
    // let cameraX = this.player.sprite.x - 800 / 2
    // let cameraY = this.player.sprite.y - 600 / 2
    // this.game.camera.x += (cameraX - this.game.camera.x) * 0.08
    // this.game.camera.y += (cameraY - this.game.camera.y) * 0.08

    // Interpolates the players movement
    // playerMovementInterpolation(otherPlayers)
  }
}

export default Game

import { WORLD_SIZE } from '../config'
import { createText } from './utils'
import fileLoader from '../config/fileloader'
import createWorld from './world/createWorld'
import player from './player'
import updatePlayers from './sockets/updatePlayers'
import playerMovementInterpolation from './predictions/playerMovementInterpolation'

const SERVER_IP = 'localhost:8000/'
let socket = null
let otherPlayers = {}

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

    // Configures the game camera
    this.game.camera.x = width / 2
    this.game.camera.y = height / 2

    // Scale game to fit the entire window
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
  }

  update () {
    // Interpolates the players movement
    playerMovementInterpolation(otherPlayers, this.game, socket)
  }
}

export default Game

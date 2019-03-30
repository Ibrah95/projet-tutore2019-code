import { WORLD_SIZE } from '../config'
import { createText } from './utils'
import fileLoader from '../config/fileloader'
import createWorld from './world/createWorld'
import player from './player'
import newPlayer from './sockets/newPlayer'
import { WINDOW_HEIGHT,WINDOW_WIDTH } from './../config'

const SERVER_IP = 'localhost:8000/'
let socket = null
let otherPlayers = {}
let est_arriver= false
let est_placer_sur_zone_fin = false;
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
    this.player = player((Math.random()* (300-100) +100 ), Math.random() * ((WINDOW_HEIGHT - 100) -100 ) + 100 , this.game, socket)
    // Creates the player name text
    this.player.playerName = createText(this.game, this.player.sprite.body)
    // Creates the player speed text
    this.player.speedText = createText(this.game, this.player.sprite.body)

    // Sends a new-player event to the server
    newPlayer(socket, this.player)
    // update all players
    // updatePlayers(socket, otherPlayers, this.game)

    // Configures the game camera
    this.game.camera.x = this.player.sprite.x - 800 / 2
    this.game.camera.y = this.player.sprite.y - 600 / 2

    // Scale game to fit the entire window
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
  }

  update () {
    socket.on('est-arriver', data => {
        // console.log('est entrer dans est-arriver')
        // console.log(`data id = ${data} et ${String(socket.id)}`)
        if(data === String(socket.id)){
            est_arriver = true;
            window.alert('Félicitation vous êtes arrivé')
        }
    })
    console.log(`est_arriver = ${est_arriver}`);
    if (!est_arriver) {
        this.player.drive(this.game)
    } else {
        if (!est_placer_sur_zone_fin) {
            this.player.sprite.body.x = 1800;
            socket.emit('move-player', {
                estCapturer: this.player.estCapturer,
                nombreCapture: this.player.nombreCapture,
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
        }
    }

    // Move the camera to follow the player
    let cameraX = this.player.sprite.x - 800 / 2
    let cameraY = this.player.sprite.y - 600 / 2
    this.game.camera.x += (cameraX - this.game.camera.x) * 0.08
    this.game.camera.y += (cameraY - this.game.camera.y) * 0.08
    // Interpolates the players movement
    // playerMovementInterpolation(otherPlayers)
    }
}

export default Game

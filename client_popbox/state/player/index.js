import createPlayer from './createPlayer'
import { isDown } from '../utils'

export default function (x, y, game, socket) {
  const player = {
    socket,
    type: 'popbox',
    sprite: createPlayer(x, y, game),
    playerName: null,
    speed: 0,
    speedText: null,
    estCapturer: false,
    nombreCapture: 0,
    drive (game) {

      // Only emit if the player is moving
      if (this.speed !== 0) {
        this.emitPlayerData()
      }

    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
    this.sprite.body.angularVelocity = 0;

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      this.sprite.body.velocity.y -= 1000
      this.emitPlayerData()
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      this.sprite.body.velocity.y += 1000
      this.emitPlayerData()
    }

      // Brings the player's sprite to top
      game.world.bringToTop(this.sprite)

      this.updatePlayerName()
      this.updatePlayerStatusText('speed', this.sprite.body.x - 57, this.sprite.body.y - 39, this.speedText)
    },
    emitPlayerData () {
      // Emit the 'move-player' event, updating the player's data on the server
      socket.emit('move-player', {
        estCapturer: this.estCapturer,
        nombreCapture: this.nombreCapture,
        speedText: {
          x: this.sprite.body.x,
          y: this.sprite.body.y,
        },
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
      })
    },
    updatePlayerName (name = this.socket.id, x = this.sprite.body.x - 57, y = this.sprite.body.y - 59) {
      // Updates the player's name text and position
      this.playerName.text = String(name)
      this.playerName.x = x
      this.playerName.y = y
      // Bring the player's name to top
      game.world.bringToTop(this.playerName)
    },
    updatePlayerStatusText (status, x, y, text) {
      // Capitalize the status text
      const capitalizedStatus = status[0].toUpperCase() + status.substring(1)
      let newText = ''
      // Set the speed text to either 0 or the current speed
      this[status] < 0 ? this.newText = 0 : this.newText = this[status]
      // Updates the text position and string
      text.x = x
      text.y = y
      text.text = `${capitalizedStatus}: ${parseInt(this.newText)}`
      game.world.bringToTop(text)
    }
  }
  return player
}

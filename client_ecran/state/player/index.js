import createPlayer from './createPlayer'
import { isDown } from '../utils'

export default function (type, customName, nombreCapture, x, y, game, socket) {
  const player = {
    socket,
    type,
    sprite: createPlayer(type, customName, x, y, game),
    playerName: null,
    speed: 0,
    speedText: null,
    estCapturer: false,
    nombreCapture: nombreCapture,
    customName: customName,
    drive (game) {
    },
    emitPlayerData () {
      // Emit the 'move-player' event, updating the player's data on the server
      // const socket = io('localhost:8000')
      this.socket.emit('move-player', {
        estCapturer: this.estCapturer,
        nombreCapture: this.nombreCapture,
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
    emitPlayerDeletion (socket) {
      socket.emit('delete-player', {
        id: this.playerName.text,
      })
    },
    emitNombreCapture (socket) {
      socket.emit('increment-nombreCapture', {
        id: this.playerName.text,
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
    updatePlayerStatusText (x, y, text) {
      if (this.type === 'popbox') {
        text.x = x - 57
        text.y = y - 39
        text.text = `NOMBRE DE CAPTURE = ${this.nombreCapture}`
        game.world.bringToTop(text)
      }
    }
  }
  return player
}

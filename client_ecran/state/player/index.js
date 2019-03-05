import createPlayer from './createPlayer'
import { isDown } from '../utils'

export default function (type, x, y, game, socket) {
  const player = {
    socket,
    type,
    sprite: createPlayer(type, x, y, game),
    playerName: null,
    speed: 0,
    speedText: null,
    drive (game) {

    this.sprite.body.onCollide = new Phaser.Signal();
    this.sprite.body.onCollide.add((player1, player2) => {
      console.log('collision')
      this.emitPlayerDeletion();
      // player2.kill()
    }, game);

    //   // Only emit if the player is moving
    //   if (this.speed !== 0) {
    //     this.emitPlayerData()
    //   }
    //
    // this.sprite.body.velocity.x = 0;
    // this.sprite.body.velocity.y = 0;
    // this.sprite.body.angularVelocity = 0;
    //
    // if (game.input.mousePointer.isDown && game.input.activePointer.x !== this.sprite.body.x && game.input.activePointer.y !== this.sprite.body.y) {
    //   this.speed = 1500
    //   this.sprite.body.rotation = game.physics.arcade.moveToPointer(this.sprite, this.speed, game.input.activePointer, 0)
    // } else {
    //   this.speed = 0
    // }
    //
    //   // Brings the player's sprite to top
    //   game.world.bringToTop(this.sprite)
    //
    //   this.updatePlayerName()
    //   this.updatePlayerStatusText('speed', this.sprite.body.x - 57, this.sprite.body.y - 39, this.speedText)
    },
    emitPlayerData () {
      // Emit the 'move-player' event, updating the player's data on the server
      // const socket = io('localhost:8000')
      this.socket.emit('move-player', {
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

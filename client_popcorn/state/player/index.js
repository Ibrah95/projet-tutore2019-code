import createPlayer from './createPlayer'
import { isDown } from '../utils'

export default function (x, y, game, socket) {
  const player = {
    socket,
    type: 'popcorn',
    sprite: createPlayer(x, y, game),
    playerName: null,
    speed: 0,
    speedText: null,
    drive (game) {
      /*
      Most of the driving logic was written by Daniel Wuggenig
      https://www.anexia-it.com/blog/en/introduction-to-the-phaser-framework/
      I decided to use it since this is supposed to be an introduction to multiplayer
      online car game, his driving solution is simple and clean and fits perfectly
      */

      const KEYS = {
        W: Phaser.Keyboard.W,
        S: Phaser.Keyboard.S,
        A: Phaser.Keyboard.A,
        D: Phaser.Keyboard.D
      }

      // Only emit if the player is moving
      if (this.speed !== 0) {
        this.emitPlayerData()
      }

    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
    this.sprite.body.angularVelocity = 0;

    if (game.input.mousePointer.isDown && game.input.activePointer.x !== this.sprite.body.x && game.input.activePointer.y !== this.sprite.body.y) {
      this.speed = 1500
      this.sprite.body.rotation = game.physics.arcade.moveToPointer(this.sprite, this.speed, game.input.activePointer, 0)
    } else {
      this.speed = 0
    }
    game.physics.arcade.collide(this);
    // if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
    // {
    //     this.speed = 700
    //     game.physics.arcade.velocityFromAngle(this.sprite.angle, this.speed, this.sprite.body.velocity);
    // }

    // if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
    //   this.sprite.body.velocity.x -= 1000
    // } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    //   this.sprite.body.velocity.x += 1000
    // }
    // if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
    //   this.sprite.body.velocity.y -= 1000
    // } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
    //   this.sprite.body.velocity.y += 1000
    // }

      // // Drive forward if W is pressed down
      // if (isDown(game, KEYS.W) && this.speed <= 400) {
      //   this.speed += 10
      // } else {
      //   if (this.speed >= 10) {
      //     this.speed -= 10
      //   }
      // }
      //
      // // Drive backwards if S is pressed down
      // if (isDown(game, KEYS.S) && this.speed >= -200) {
      //   this.speed -= 5
      // } else {
      //   if (this.speed <= -5) {
      //     this.speed += 5
      //   }
      // }
      //
      // // Steers the car
      // if (isDown(game, KEYS.A)) {
      //   this.sprite.body.angularVelocity = -5 * (this.speed / 1000)
      // } else if (isDown(game, KEYS.D)) {
      //   this.sprite.body.angularVelocity = 5 * (this.speed / 1000)
      // } else {
      //   this.sprite.body.angularVelocity = 0
      // }

      //
      // Brings the player's sprite to top
      game.world.bringToTop(this.sprite)

      this.updatePlayerName()
      this.updatePlayerStatusText('speed', this.sprite.body.x - 57, this.sprite.body.y - 39, this.speedText)
    },
    emitPlayerData () {
      console.log('emit data')
      // Emit the 'move-player' event, updating the player's data on the server
      socket.emit('move-player', {
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

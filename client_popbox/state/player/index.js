import createPlayer from './createPlayer'
import { isDown } from '../utils'
import createJoystick from './createJoystick'

export default function (x, y, game, socket) {
  const player = {
    socket,
    type: 'popbox',
    sprite: createPlayer(x, y, game),
    joystick: createJoystick(x, y, game),
    playerName: null,
    speed: 0,
    speedText: null,
    estCapturer: false,
    nombreCapture: 0,
    position: 0,
    drive (game) {

      // hide the sprite
      this.sprite.alpha = 0;

      if (this.joystick.isDown) {
        this.sprite.body.velocity.set(0);
        if (this.joystick.direction === Phaser.LEFT) {
          // this.sprite.body.velocity.x -= 1000;
        } else if (this.joystick.direction === Phaser.RIGHT) {
          // this.sprite.body.velocity.x += 1000;
        } else if (this.joystick.direction === Phaser.UP) {
          this.sprite.body.velocity.y -= 1000 ;
          if( this.sprite.body.y <= 100){
            this.sprite.body.y += 50
          }
        } else if (this.joystick.direction === Phaser.DOWN) {
          this.sprite.body.velocity.y += 1000;
          if(this.sprite.body.y >= 700 ){
            this.sprite.body.y -= 50
          }
        }
        this.emitPlayerData()
      } else {
        this.sprite.body.velocity.set(0);
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
        position: this.position,
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
      this.playerName.alpha = 0;
      // Bring the player's name to top
      // game.world.bringToTop(this.playerName)
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
      text.alpha = 0;
      // game.world.bringToTop(text)
    }
  }
  return player
}

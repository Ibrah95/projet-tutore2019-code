import createPlayer from './createPlayer'
import createJoystick from './createJoystick'
import { isDown } from '../utils'
import {
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  LIMIT_TOP,
  LIMIT_LEFT,
  LIMIT_BOTTOM
} from './../../config'

export default function (x, y, customName, game, socket) {
  const player = {
    socket,
    type: 'popcorn',
    customName: customName,
    sprite: createPlayer(x, y, game),
    joystick: createJoystick(x, y, game),
    playerName: null,
    speed: 0,
    speedText: null,
    estCapturer: false,
    nombreCapture: 0,
    position: 0,
    drive (game) {
      this.joystick.onDown.add(this.startPlayer, this);
      this.joystick.onUpdate.add(this.movePlayer, this);
      this.joystick.onUp.add(this.stopPlayer, this);
      game.physics.arcade.collide(this);
      // Brings the player's sprite to top
      game.world.bringToTop(this.sprite)
      this.updatePlayerName()
      this.updatePlayerStatusText('speed', this.sprite.body.x - 57, this.sprite.body.y - 39, this.speedText)

    },
    startPlayer() {
      this.sprite.alpha = 0;
    },
    movePlayer(stick, force, forceX, forceY) {
      this.sprite.body.velocity.x = stick.forceX * 1000;
      this.sprite.body.velocity.y = stick.forceY * 1000;

      console.log('position y');
      console.log(this.sprite.body.y);
      console.log('LIMIT BOTTOM');
      console.log(LIMIT_BOTTOM)

      if( this.sprite.body.x <= LIMIT_LEFT ){
          this.sprite.body.x += 50
        }

        if(this.sprite.body.y <= LIMIT_TOP){
          this.sprite.body.y += 50
        }

        if(this.sprite.body.y >= LIMIT_BOTTOM ){
          console.log('entrer dans limit bottom')
          this.sprite.body.y -= 50
        }
      this.emitPlayerData();
    },
    stopPlayer() {
      this.sprite.body.velocity.set(0);
      this.sprite.alpha = 0;
    },
    emitPlayerData () {
      // Emit the 'move-player' event, updating the player's data on the server
      socket.emit('move-player', {
        estCapturer: this.estCapturer,
        nombreCapture: this.nombreCapture,
        position: this.position,
        customName: this.customName,
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
      //game.world.bringToTop(this.playerName)
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
      //game.world.bringToTop(text)
    }
  }
  return player
}

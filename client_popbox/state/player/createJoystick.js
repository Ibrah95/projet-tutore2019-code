import {WINDOW_WIDTH, WINDOW_HEIGHT} from './../../config'

const createJoystick = (x, y, game) => {
  const pad = game.plugins.add(Phaser.VirtualJoystick);
  const stick = pad.addDPad(WINDOW_WIDTH/2, WINDOW_HEIGHT - (WINDOW_HEIGHT/3) - 200, 300, 'dpad');
  stick.scale = 3.2;
  // stick.alignBottomLeft(250);
  return stick;
}

export default createJoystick

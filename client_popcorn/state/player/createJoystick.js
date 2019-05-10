import {WINDOW_WIDTH, WINDOW_HEIGHT} from './../../config'

const createJoystick = (x, y, game) => {
  const pad = game.plugins.add(Phaser.VirtualJoystick);
  const stick = pad.addStick(WINDOW_WIDTH/2, WINDOW_HEIGHT - (WINDOW_HEIGHT/3) - 200, 300, 'arcade');
  stick.scale = 2.0;
  //stick.alignBottomLeft(0);
  return stick;
}

export default createJoystick

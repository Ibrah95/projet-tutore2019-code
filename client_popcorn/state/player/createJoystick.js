const createJoystick = (x, y, game) => {
  const pad = game.plugins.add(Phaser.VirtualJoystick);
  const stick = pad.addStick(0, 0, 300, 'arcade');
  stick.scale = 1.5;
  stick.alignBottomLeft(250);
  return stick;
}

export default createJoystick

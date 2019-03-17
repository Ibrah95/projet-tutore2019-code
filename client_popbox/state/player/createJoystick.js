const createJoystick = (x, y, game) => {
  const pad = game.plugins.add(Phaser.VirtualJoystick);
  const stick = pad.addDPad(500, 450, 300, 'dpad');
  stick.scale = 1.5;
  stick.alignBottomLeft(250);
  return stick;
}

export default createJoystick

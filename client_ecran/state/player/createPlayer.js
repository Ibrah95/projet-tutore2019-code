const createPlayer = (type, customName, x, y, game) => {
  let sprite = null;
  if (type === 'popcorn')
    sprite = game.add.sprite(x, y, customName)
  else
    sprite = game.add.sprite(x, y, type);

  game.physics.enable(sprite, Phaser.Physics.ARCADE);
  game.physics.startSystem(Phaser.Physics.ARCADE);
  sprite.body.collideWorldBounds = true;
	sprite.body.bounce.setTo(1, 1);
  sprite.anchor.setTo(0.5, 0.5)
  sprite.width = 150;
  sprite.height = 150;
  // if (type === 'popcorn') {
  //   sprite.width = 100
  //   sprite.height = 100
  // } else {
  //   sprite.width = 70
  //   sprite.height = 110
  // }
  sprite.body.allowRotation = false
  sprite.animations.add('run');
  sprite.animations.play('run', 2, true);
  return sprite
}

export default createPlayer

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
  if (type === 'popcorn') {
    sprite.width = 60
    sprite.height = 60
  } else {
    sprite.width = 70
    sprite.height = 110
  }
  sprite.body.allowRotation = false
  return sprite
}

export default createPlayer

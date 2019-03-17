const createPlayer = (type, x, y, game) => {
  const sprite = game.add.sprite(x, y, type)
  game.physics.enable(sprite, Phaser.Physics.ARCADE);
  game.physics.startSystem(Phaser.Physics.ARCADE);
  sprite.body.collideWorldBounds = true;
	sprite.body.bounce.setTo(1, 1);
  sprite.anchor.setTo(0.5, 0.5)
  if (type === 'popcorn') {
    sprite.width = 80
    sprite.height = 80
  } else {
    sprite.width = 200
    sprite.height = 275
  }
  sprite.body.allowRotation = false
  return sprite
}

export default createPlayer

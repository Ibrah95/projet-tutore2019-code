const createPlayer = (x, y, game) => {
  const sprite = game.add.sprite(x, y, 'popcorn')
  game.physics.enable(sprite, Phaser.Physics.ARCADE);
  game.physics.startSystem(Phaser.Physics.ARCADE)
  sprite.anchor.setTo(0.5, 0.5)
  sprite.width = 50
  sprite.height = 50
  sprite.body.allowRotation = false
  sprite.body.collideWorldBounds = true;
  sprite.alpha = 0.5
  return sprite
}

export default createPlayer

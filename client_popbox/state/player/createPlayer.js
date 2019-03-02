const createPlayer = (x, y, game) => {
  const sprite = game.add.sprite(x, y, 'popbox')
  game.physics.enable(sprite, Phaser.Physics.ARCADE);
  game.physics.startSystem(Phaser.Physics.ARCADE)
  sprite.anchor.setTo(0.5, 0.5)
  sprite.width = 75
  sprite.height = 150
  sprite.body.allowRotation = false
  return sprite
}

export default createPlayer

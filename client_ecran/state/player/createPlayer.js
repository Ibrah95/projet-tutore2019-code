const createPlayer = (type, x, y, game) => {
  console.log(type);
  const sprite = game.add.sprite(x, y, type)
  game.physics.enable(sprite, Phaser.Physics.ARCADE);
  game.physics.startSystem(Phaser.Physics.ARCADE)
  sprite.anchor.setTo(0.5, 0.5)
  if (type === 'popcorn') {
    sprite.width = 50
    sprite.height = 50
  } else {
    sprite.width = 100
    sprite.height = 175
  }
  sprite.body.allowRotation = false
  return sprite
}

export default createPlayer

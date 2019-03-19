import { WORLD_SIZE } from './../../config'

const { width, height } = WORLD_SIZE

const worldCreator = game => {
  // Start P2 physics engine
  game.physics.startSystem(Phaser.Physics.P2JS)
  // We set this to true so our game won't pause if we focus
  // something else other than the browser
  game.stage.disableVisibilityChange = true
  // Here we set the bounds of our game world
  game.world.setBounds(0, 0, 2000, 2000)
  createMap(game)
}

const createMap = game => {
  let groundTiles = []
  const groundSprite = game.add.sprite(0, 0, 'asphalt')
  groundSprite.width = 1920
  groundSprite.height = 1080
  groundTiles.push(groundSprite)
}

export default worldCreator

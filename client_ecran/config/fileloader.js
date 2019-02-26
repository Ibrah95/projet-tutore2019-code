import { ASSETS_URL } from '.'

const fileLoader = game => {
  game.load.crossOrigin = 'Anonymous'
  game.stage.backgroundColor = '#1E1E1E'
  game.load.image('asphalt', `${ASSETS_URL}/sprites/asphalt/bg_ecran.jpg`)
  game.load.image('popcorn', `${ASSETS_URL}/sprites/car/car.png`)
  game.load.image('popbox', `${ASSETS_URL}/sprites/car/popbox.png`)
}

export default fileLoader

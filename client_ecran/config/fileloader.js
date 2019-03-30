import { ASSETS_URL } from '.'

const fileLoader = game => {
  game.load.crossOrigin = 'Anonymous'
  game.stage.backgroundColor = '#1E1E1E'
  game.load.image('asphalt', `${ASSETS_URL}/sprites/asphalt/bg_ecran.jpg`)
  game.load.image('popcorn', `${ASSETS_URL}/sprites/popcorn/pop_marley.png`)
  game.load.image('popbox', `${ASSETS_URL}/sprites/car/popbox.png`)
  game.load.image('timerlogo', `${ASSETS_URL}/sprites/design/timerlogo.png`)
}

export default fileLoader

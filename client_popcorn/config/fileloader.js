import { ASSETS_URL } from '.'

const fileLoader = game => {
  game.load.crossOrigin = 'Anonymous'
  game.stage.backgroundColor = '#1E1E1E'
  game.load.image('asphalt', `${ASSETS_URL}/sprites/asphalt/bg_ecran.jpg`)
  game.load.image('popcorn', `${ASSETS_URL}/sprites/popcorn/pop_marley.png`)
  game.load.atlas('arcade', `${ASSETS_URL}/virtualjoystick/skins/arcade-joystick.png`, `${ASSETS_URL}/virtualjoystick/skins/arcade-joystick.json`);
}

export default fileLoader

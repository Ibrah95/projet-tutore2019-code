import { ASSETS_URL } from '.'

const fileLoader = game => {
  game.load.crossOrigin = 'Anonymous'
  game.stage.backgroundColor = '#1E1E1E'
  game.load.image('asphalt', `${ASSETS_URL}/sprites/asphalt/bg_ecran.jpg`)
  game.load.image('popbox', `${ASSETS_URL}/sprites/car/popbox.png`)
  game.load.atlas('dpad', `${ASSETS_URL}/virtualjoystick/skins/dpad.png`, `${ASSETS_URL}/virtualjoystick/skins/dpad.json`);
}

export default fileLoader

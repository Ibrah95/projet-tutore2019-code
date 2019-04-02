import { ASSETS_URL } from '.'

const fileLoader = game => {
  game.load.crossOrigin = 'Anonymous'
  game.stage.backgroundColor = '#1E1E1E'
  game.load.image('asphalt', `${ASSETS_URL}/sprites/asphalt/bg_ecran.jpg`)

  // charger les personnages popcorn
  game.load.image('pop_marley', `${ASSETS_URL}/sprites/popcorn/pop_marley.png`)
  game.load.image('bat_pop', `${ASSETS_URL}/sprites/popcorn/bat_pop.png`)
  game.load.image('pop_soldat', `${ASSETS_URL}/sprites/popcorn/pop_soldat.png`)
  game.load.image('caramba_pop', `${ASSETS_URL}/sprites/popcorn/caramba_pop.png`)
  game.load.image('pop_vador', `${ASSETS_URL}/sprites/popcorn/pop_vador.png`)
  game.load.image('gentle_pop', `${ASSETS_URL}/sprites/popcorn/gentle_pop.png`)
  game.load.image('pop_blood', `${ASSETS_URL}/sprites/popcorn/pop_blood.png`)
  game.load.image('pop_boy', `${ASSETS_URL}/sprites/popcorn/pop_boy.png`)
  game.load.image('pop_kent', `${ASSETS_URL}/sprites/popcorn/pop_kent.png`)
  game.load.image('pop_carrey', `${ASSETS_URL}/sprites/popcorn/pop_carrey.png`)
  game.load.image('pop_minator', `${ASSETS_URL}/sprites/popcorn/pop_minator.png`)
  game.load.image('pop_ninja', `${ASSETS_URL}/sprites/popcorn/pop_ninja.png`)
  game.load.image('saint_patrick_pop', `${ASSETS_URL}/sprites/popcorn/saint_patrick_pop.png`)
  game.load.image('santa_pop', `${ASSETS_URL}/sprites/popcorn/santa_pop.png`)
  game.load.image('thug_pop', `${ASSETS_URL}/sprites/popcorn/thug_pop.png`)

  game.load.image('popbox', `${ASSETS_URL}/sprites/car/popbox.png`)
  game.load.image('timerlogo', `${ASSETS_URL}/sprites/design/timerlogo.png`)
}

export default fileLoader

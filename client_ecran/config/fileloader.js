import { ASSETS_URL } from '.'

const fileLoader = game => {
  game.load.crossOrigin = 'Anonymous'
  game.stage.backgroundColor = '#1E1E1E'
  game.load.image('asphalt', `${ASSETS_URL}/sprites/asphalt/ground_${localStorage.getItem('stage')}.jpg`)

  // charger les personnages popcorn
  game.load.image('pop_marley', `${ASSETS_URL}/sprites/popcorn/pop_marley.png`)
  game.load.image('bat_pop', `${ASSETS_URL}/sprites/popcorn/bat_pop.png`)
  game.load.spritesheet('pop_soldat', `${ASSETS_URL}/sprites/popcorn/pop_soldat.png`, 300, 300, 2)
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

  // charger les obstacles
  game.load.image('popbox', `${ASSETS_URL}/sprites/popbox/popbox2.png`)

  // charger les énemies
  game.load.spritesheet('bird', `${ASSETS_URL}/sprites/enemies/birds_1.png`, 183, 168, 14)

  // charger les musiques selons le level d'avancement
   game.load.audio('music', [`${ASSETS_URL}/audio/music_1.mp3`, `${ASSETS_URL}/audio/music_1.ogg`]);
}

export default fileLoader

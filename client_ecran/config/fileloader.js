import { ASSETS_URL } from '.'

const fileLoader = game => {
  game.load.crossOrigin = 'Anonymous'
  game.stage.backgroundColor = '#1E1E1E'
  if (localStorage.getItem('stage') === '2') {
    game.load.image('asphalt', `${ASSETS_URL}/sprites/asphalt/ground_${localStorage.getItem('stage')}.png`)
  } else {
    game.load.image('asphalt', `${ASSETS_URL}/sprites/asphalt/ground_${localStorage.getItem('stage')}.jpg`)
  }
  // charger les personnages popcorn
  game.load.spritesheet('pop_marley', `${ASSETS_URL}/sprites/popcorn/pop_marley.png`, 300, 300, 4)
  game.load.spritesheet('bat_pop', `${ASSETS_URL}/sprites/popcorn/bat_pop.png`, 300, 300, 4);
  game.load.spritesheet('pop_soldat', `${ASSETS_URL}/sprites/popcorn/pop_soldat.png`, 300, 300, 4)
  game.load.spritesheet('caramba_pop', `${ASSETS_URL}/sprites/popcorn/caramba_pop.png`, 300, 300, 4)
  game.load.spritesheet('pop_vador', `${ASSETS_URL}/sprites/popcorn/pop_vador.png`, 300, 300, 4)
  game.load.spritesheet('gentle_pop', `${ASSETS_URL}/sprites/popcorn/gentle_pop.png`, 300, 300, 4)
  game.load.spritesheet('pop_blood_gang', `${ASSETS_URL}/sprites/popcorn/pop_blood_gang.png`, 300, 300, 4)
  game.load.spritesheet('pop_boy', `${ASSETS_URL}/sprites/popcorn/pop_boy.png`, 300, 300, 4)
  game.load.spritesheet('pop_kent', `${ASSETS_URL}/sprites/popcorn/pop_kent.png`, 300, 300, 4)
  game.load.spritesheet('pop_carrey', `${ASSETS_URL}/sprites/popcorn/pop_carrey.png`, 300, 300, 4)
  game.load.spritesheet('pop_minator', `${ASSETS_URL}/sprites/popcorn/pop_minator.png`, 300, 300, 4)
  game.load.spritesheet('pop_ninja', `${ASSETS_URL}/sprites/popcorn/pop_ninja.png`, 300, 300, 4)
  game.load.spritesheet('saint_patrick_pop', `${ASSETS_URL}/sprites/popcorn/saint_patrick_pop.png`, 300, 300, 4)
  game.load.spritesheet('santa_pop', `${ASSETS_URL}/sprites/popcorn/santa_pop.png`, 300, 300, 4)
  game.load.spritesheet('thug_pop', `${ASSETS_URL}/sprites/popcorn/thug_pop.png`, 300, 300, 4)

  // charger les obstacles
  game.load.image('popbox', `${ASSETS_URL}/sprites/popbox/popbox${localStorage.getItem('stage')}.png`)

  // charger les énemies
  game.load.spritesheet('bird', `${ASSETS_URL}/sprites/enemies/birds_1.png`, 183, 168, 14)

  // charger les voitures
  game.load.image('car', `${ASSETS_URL}/sprites/enemies/car_2.png`)

  // charger les musiques selons le level d'avancement
   game.load.audio('music', [`${ASSETS_URL}/audio/music_${localStorage.getItem('stage')}.mp3`, `${ASSETS_URL}/audio/music_${localStorage.getItem('stage')}.ogg`]);
}

export default fileLoader

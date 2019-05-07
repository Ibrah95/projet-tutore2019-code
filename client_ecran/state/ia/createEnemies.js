import {
  NBR_POPBOX_COLONNE,
  POS_Y_POPBOX,
  NBR_POPBOX_LIGNE,
  DIST_LIGNE,
  DIST_COLONNE,
  NBR_MONSTRE_LIGNE,
  NBR_MONSTRE_COLONNE
} from '../../config'

// LES FONCTIONS UTILITAIRES

const create = (x, y, game) => {
  let sprite;
  if (localStorage.getItem('stage') === '3') {
    sprite = game.add.sprite(x, y, 'bird');
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    sprite.body.collideWorldBounds = false;
    sprite.body.checkCollision.up = true;
    sprite.body.checkCollision.down = true;
    sprite.body.checkCollision.left = true;
    sprite.body.checkCollision.right = true;
  	sprite.body.bounce.setTo(1, 1);
    sprite.anchor.setTo(0.5, 0.5)
    sprite.animations.add('run');
    sprite.animations.play('run', 14, true);
  } else {
    sprite = game.add.sprite(x, y, 'car');
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    sprite.body.collideWorldBounds = false;
    sprite.body.checkCollision.up = true;
    sprite.body.checkCollision.down = true;
    sprite.body.checkCollision.right = true;
    sprite.body.checkCollision.left = true;
    sprite.body.bounce.setTo(1, 1);
    sprite.anchor.setTo(0.5, 0.5)
    sprite.width = 400;
    sprite.height = 300;
  }

  return sprite;
}


// LA FONCTION PRINCIPALE

const createEnemies = (game) => {
  const listEnemy= [];
  // creer les enemies par colonne et par ligne
  for (let i = 0; i < NBR_MONSTRE_LIGNE; i++) {
    for (let j = 0; j < NBR_MONSTRE_COLONNE; j++) {
      // calculer positions popbox
      const posX = DIST_LIGNE + DIST_LIGNE * i;
      const posY = POS_Y_POPBOX + DIST_COLONNE * j;
      const enemy = create(posX, posY, game);
      // ajouter popbox dans la liste des popbox pour pouvoir les manipuler
      listEnemy.push(enemy);
    }
  }

  return listEnemy;

}



export default createEnemies

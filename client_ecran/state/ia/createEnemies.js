import {
  NBR_POPBOX_COLONNE,
  POS_Y_POPBOX,
  NBR_POPBOX_LIGNE,
  DIST_LIGNE,
  DIST_COLONNE
} from '../../config'

// LES FONCTIONS UTILITAIRES

const create = (x, y, game) => {
  let count = 0;
  let length = 400 / 20;
  let points = [];

  for (let i = 0; i < 20; i++) {
    points.push(new Phaser.Point(i * length, 0));
  }
  let rope = game.add.rope(x, y, 'snake', null, points);
  rope.scale.set(0.8);
  game.physics.enable(rope, Phaser.Physics.ARCADE);
  game.physics.startSystem(Phaser.Physics.ARCADE);
  rope.body.collideWorldBounds = true;
  rope.body.checkCollision.up = true;
  rope.body.checkCollision.up = true;
  rope.body.checkCollision.up = true;
  rope.body.checkCollision.up = true;
	rope.body.bounce.setTo(1, 1);
  rope.anchor.setTo(0.5, 0.5)
  rope.updateAnimation = function () {
    count += 0.1;
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].y = Math.sin(i * 0.5 + count) * 20;
    }
  };

  return rope;
}


// LA FONCTION PRINCIPALE

const createEnemies = (game) => {
  const listEnemy= [];
  // creer les popbox par colonne et par ligne
  for (let i = 0; i < NBR_POPBOX_LIGNE; i++) {
    for (let j = 0; j < NBR_POPBOX_COLONNE; j++) {
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

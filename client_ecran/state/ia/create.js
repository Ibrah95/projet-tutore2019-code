import {
  NBR_POPBOX_COLONNE,
  POS_Y_POPBOX,
  NBR_POPBOX_LIGNE,
  DIST_LIGNE,
  DIST_COLONNE,
  LIMIT_TOP,
  LIMIT_BOTTOM,
  LIMIT_LEFT
} from '../../config'

// LES FONCTIONS UTILITAIRES

const createPopbox = (x, y, game) => {
  let sprite = sprite = game.add.sprite(x, y, 'popbox');
  game.physics.enable(sprite, Phaser.Physics.ARCADE);
  game.physics.startSystem(Phaser.Physics.ARCADE);
  sprite.body.collideWorldBounds = true;
  sprite.body.checkCollision.up = true;
  sprite.body.checkCollision.up = true;
  sprite.body.checkCollision.up = true;
  sprite.body.checkCollision.up = true;
	sprite.body.bounce.setTo(1, 1);
  sprite.anchor.setTo(0.5, 0.5)
  sprite.width = 200
  sprite.height = 200
  sprite.body.allowRotation = false
  
  

    
 
   return sprite
}








// LA FONCTION PRINCIPALE

const createIA = (game) => {
  const listPopbox = [];
  // creer les popbox par colonne et par ligne
  for (let i = 0; i < NBR_POPBOX_LIGNE; i++) {
    for (let j = 0; j < NBR_POPBOX_COLONNE; j++) {
      // calculer positions popbox
      const posX = DIST_LIGNE + DIST_LIGNE * i;
      const posY = POS_Y_POPBOX + DIST_COLONNE * j;
      const popbox = createPopbox(posX, posY, game);

      // ajouter popbox dans la liste des popbox pour pouvoir les manipuler
      listPopbox.push(popbox);

    }

  }        game.add.tween(listPopbox[6].scale).to( { x: 0.07, y: 0.1}, 2000, Phaser.Easing.Linear.None, true, 0, 2000, true);
         /*  game.add.tween(listPopbox[2]).to( { x: [ 1100, 1100, 800, 800 ,0],
                             y: [ POS_Y_POPBOX,  600 ,600,POS_Y_POPBOX,0] }, 4000, "Sine.easeInOut", true, -1, false);*/
           game.add.tween(listPopbox[7].scale).to( { x: 0.07, y: 0.1}, 2000, Phaser.Easing.Linear.None, true, 0, 2000, true);
           listPopbox[4].alpha=0
           listPopbox[3].alpha=0
           game.add.tween(listPopbox[4]).to( { alpha: 1 }, 10000, Phaser.Easing.Linear.None, true, 0, 10000, true);
           game.add.tween(listPopbox[3]).to( { alpha: 1 }, 10000, Phaser.Easing.Linear.None, true, 0, 10000, true);

  return listPopbox;

}



export default createIA

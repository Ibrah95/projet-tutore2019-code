import {
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  LIMIT_TOP,
  LIMIT_LEFT,
  LIMIT_BOTTOM,
  LIMIT_RIGHT,
  NBR_POPBOX_COLONNE,
  POS_Y_POPBOX,
  NBR_POPBOX_LIGNE,
  DIST_LIGNE,
  DIST_COLONNE,
} from '../../config'

const movementIA = (listPopbox,game,tempsIA,directionAlea,vitesseAlea) => {


  //console.log(tempsIA)
  if(tempsIA == true){
    directionAlea = ChangeDirection(listPopbox) // change la direction
    vitesseAlea = ChangeVitesse(listPopbox)
  }

  for( let i = 0; i < listPopbox.length; i++){
    if (i % 2 === 0) { // pair (correspond aux popbox sur la rangé supérieur)
      if(listPopbox[i].position.y <= LIMIT_TOP ){
        directionAlea[i] = 1
      }
      if(listPopbox[i].position.y >= (LIMIT_BOTTOM / 2) - 40){
        directionAlea[i] = -1
      }
    } else { // impair (correspond aux popbox sur la rangé inférieur)
      if(listPopbox[i].position.y <= (LIMIT_BOTTOM / 2) - 40){
        directionAlea[i] = 1
      }
      if(listPopbox[i].position.y >= LIMIT_BOTTOM){
        directionAlea[i] = -1
      }
    }
    listPopbox[i].position.y += directionAlea[i] * vitesseAlea[i]
  }

  return {directionAlea,vitesseAlea}
}

const movementIAMonstre = (listPopbox, game, tempsIA, directionAlea, vitesseAlea, sens = 1) => {


  //console.log(tempsIA)
  if(tempsIA == true){
    directionAlea = ChangeDirection(listPopbox) // change la direction
    vitesseAlea = ChangeVitesse(listPopbox)
  }

  for( let i = 0; i < listPopbox.length; i++){
    if (i % 2 === 0) { // pair (correspond aux popbox sur la rangé supérieur)
      if(listPopbox[i].position.y <= LIMIT_TOP ){
        directionAlea[i] = 1
      }
      if(listPopbox[i].position.y >= (LIMIT_BOTTOM / 2) - 40){
        directionAlea[i] = -1
      }
    } else { // impair (correspond aux popbox sur la rangé inférieur)
      if(listPopbox[i].position.y <= (LIMIT_BOTTOM / 2) - 40){
        directionAlea[i] = 1
      }
      if(listPopbox[i].position.y >= LIMIT_BOTTOM){
        directionAlea[i] = -1
      }
    }
    if (sens > 0) {
      movementZigZagIA(listPopbox[i], vitesseAlea[i]);
    } else {
      movementZigZagIARevert(listPopbox[i], vitesseAlea[i]);
    }
    listPopbox[i].position.y += directionAlea[i] * vitesseAlea[i]
  }

  return {directionAlea,vitesseAlea}
}


const ChangeDirection=(listPopbox) => {
  const directionAlea=[]
  let random
  for(let i = 0; i < listPopbox.length; i++){
    random = Math.floor(Math.random()*12); //random integer from 0 to 11


    if ( random%2 == 0){
      //console.log('PAIR')
      directionAlea[i] = -1

    }else {
      //console.log('IMPAIR')

      directionAlea[i] = 1
    }

  }
  return directionAlea
}

const ChangeVitesse=(listPopbox) =>{
  const vitesseAlea=[]
  let random
  for (let i = 0; i < listPopbox.length ; i++){

    random = Math.random() * (20.0 - 15.0) + 15.0; // vitesse comprise entre 1.5 et 5.0
    vitesseAlea[i] = random
  }
  return vitesseAlea
}


const movementVoitureIA=(listPopbox) => {

  let random = Math.floor(Math.random()*3);

  if(listPopbox[0].position.x == 2100){
    if(random == 0){

      listPopbox[0].position.y = POS_Y_POPBOX
      listPopbox[0].position.x = POS_Y_POPBOX

    }
    else if(random == 1){
      listPopbox[0].position.y = POS_Y_POPBOX + DIST_COLONNE
      listPopbox[0].position.x = POS_Y_POPBOX
    }else{
      listPopbox[0].position.y = POS_Y_POPBOX + DIST_COLONNE *2
      listPopbox[0].position.x = POS_Y_POPBOX
    }

  }listPopbox[0].position.x += 1 *2.0
}


const movementZigZagIA=(popbox, vitesseAlea) => {
  // remettre le popbox à un position initial aléatoire lorsqu'il dépase la
  // limite à droite de l'écran
  const j = Math.floor(Math.random() * NBR_POPBOX_COLONNE);
  if(popbox.position.x >= WINDOW_WIDTH){
    popbox.position.x = -200;
    popbox.position.y = POS_Y_POPBOX + DIST_COLONNE * j;
  }
  popbox.position.x += 1 * vitesseAlea;
}


const movementZigZagIARevert = (popbox, vitesseAlea) => {
  // remettre le popbox à un position initial aléatoire lorsqu'il dépase la
  // limite à gauche de l'écran
  const j = Math.floor(Math.random() * NBR_POPBOX_COLONNE);
  if(popbox.position.x < 0){
    popbox.position.x = WINDOW_WIDTH + 200;
    popbox.position.y = POS_Y_POPBOX + DIST_COLONNE * j;
  }
  popbox.position.x += -1 * vitesseAlea;
}

export { movementIA, movementIAMonstre }

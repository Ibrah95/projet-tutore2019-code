import {
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  LIMIT_TOP,
  LIMIT_LEFT,
  LIMIT_BOTTOM
} from '../../config'

const movementIA = (listPopbox,game,tempsIA,directionAlea,vitesseAlea) => {



  //console.log(tempsIA)
  if(tempsIA == true){
    directionAlea = ChangeDirection(listPopbox) // change la direction
    //console.log(directionAlea)

    vitesseAlea = ChangeVitesse(listPopbox)
    //console.log(vitesseAlea)
  }

  for( let i = 0; i < listPopbox.length; i++){
    if (i % 2 === 0) { // pair (correspond aux popbox sur la rangé supérieur)
      if(listPopbox[i].position.y <= LIMIT_TOP ){
        directionAlea[i] = 1
        listPopbox[i].position.y += directionAlea[i] * vitesseAlea[i]
      }
      if(listPopbox[i].position.y >= (LIMIT_BOTTOM / 2) - 40){
        directionAlea[i] = -1
        listPopbox[i].position.y += directionAlea[i] * vitesseAlea[i]
      }
    } else { // impair (correspond aux popbox sur la rangé inférieur)
      if(listPopbox[i].position.y <= (LIMIT_BOTTOM / 2) - 40){
        directionAlea[i] = 1
        listPopbox[i].position.y += directionAlea[i] * vitesseAlea[i]
      }
      if(listPopbox[i].position.y >= LIMIT_BOTTOM){
        directionAlea[i] = -1
        listPopbox[i].position.y += directionAlea[i] * vitesseAlea[i]
      }
    }

    listPopbox[i].position.y += directionAlea[i] * vitesseAlea[i]
  }


  //listPopbox[0].position.y += -1 * 0.5

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


export default movementIA

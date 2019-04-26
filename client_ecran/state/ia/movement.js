import {
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  LIMIT_TOP,
  LIMIT_LEFT,
  LIMIT_BOTTOM
} from './../../config'

const movementIA = (listPopbox,game,tempsIA,direction,vitesse,direction2) => {
		
		console.log(tempsIA)
		
		if(tempsIA == true){
		direction = ChangeDirection(direction) // change la direction 
		direction2= ChangeDirection(direction2)
		console.log(direction)
		console.log(direction2)
		vitesse = ChangeVitesse(vitesse)
		console.log(vitesse)
		}

		if(listPopbox[0].position.y <= 220 ){
			direction = 1
			listPopbox[0].position.y += direction * vitesse
			
		}

		if(listPopbox[0].position.y >= 500  ){
			direction = -1
			listPopbox[0].position.y += direction * vitesse
			
		}
		
		if(listPopbox[1].position.y <= 570){
			direction2 = 1
			listPopbox[1].position.y += direction2 * vitesse
		}
		if( listPopbox[1].position.y >= 950){
			direction2 = -1
			listPopbox[1].position.y += direction2 * vitesse
		}

		listPopbox[0].position.y += direction * vitesse
		listPopbox[1].position.y += direction2 * vitesse

		return {direction,vitesse,direction2}
		
}

const ChangeDirection=(direction) => {

	//random integer from 0 to 10 
	let random = Math.floor(Math.random()*12);
	

	if ( random%2 == 0){
		console.log('PAIR')
			direction = -1
			
	}else {
		console.log('IMPAIR')
		
			direction = 1
			
		}

	
return direction
}

const ChangeVitesse=(vitesse) =>{
	let random = Math.random() * (5.0 - 2.0) + 2.0; // vitesse comprise entre 1.5 et 5.0
	vitesse = random
	return vitesse
}


export default movementIA




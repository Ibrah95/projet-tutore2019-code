// countdown
const TEMPS = 5; // temps en seconde à attendre
let timer = TEMPS
const countdown = document.getElementById('countdown');
setInterval(function(){
  console.log(timer);
  countdown.textContent = timer;
  timer -= 1;
  // qd le timer expire rediriger vers l'ecran de jeu
  if (timer === 0) {
    window.location.replace(`/ecran`);
  }
}, 1000);

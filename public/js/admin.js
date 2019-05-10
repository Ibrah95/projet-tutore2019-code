// initialiser nombre de vague
const nbrVague = document.getElementById('nbr-vague');
nbrVague.addEventListener('change', function(e) {
  const nbrVagueValue = e.target.value;
  localStorage.setItem('nbr_vague', nbrVagueValue);
}, false);

// initialiser nombre de joueur par vague
const nbrJoueurParVague = document.getElementById('nbr-joueur-vague');
nbrJoueurParVague.addEventListener('change', function(e) {
  const nbrJoueur = e.target.value;
  localStorage.setItem('nbr_joueur_par_vague', nbrJoueur);
}, false);

// initialiser vague courant
localStorage.setItem('vague_courant', 1);
// initialiser Stage
localStorage.setItem('stage', 1);

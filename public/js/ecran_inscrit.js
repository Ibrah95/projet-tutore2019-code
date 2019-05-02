// récuperer la liste des inscrits sur le jeu et mettre à jour l'affichage
const NBR_SECONDE = 1; // fréqence de répetition en seconde

setInterval(function (){
  const req2 = new XMLHttpRequest();
  req2.onreadystatechange = function(event) {
      // XMLHttpRequest.DONE === 4
      if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 200) {
          const vagues = JSON.parse(this.responseText).vagues;
          // parcourir les vagues et ajouter les pseudos des joueurs
          for (let i = 0; i < vagues.length; i++) {
            const joueurs = vagues[i];
            const ulVague = document.getElementById(`vague-${i+1}`);
            ulVague.innerHTML = '';
            joueurs.forEach((pseudo) => {
              const li = document.createElement('li');
              li.textContent = pseudo;
              ulVague.appendChild(li);
            });
          }
        }
      }
  };
  // recuperer la liste des inscrits par vague
  req2.open('GET', `/get_inscrits`, true);
  req2.send(null);
}, NBR_SECONDE * 1000);

// enregitrer les nombres de joueurs inscrit par vague lorsqu'on lance le jeu
const lancerJeuElt = document.getElementById('lancer-jeu');
lancerJeuElt.addEventListener('mousedown', function(){
  const vagueUl = document.querySelectorAll('ul');
  for(let i = 0; i < vagueUl.length; i++) {
    const nbrJoueurInscrit = vagueUl[0].children.length;
    localStorage.setItem(`nbr_joueur_vague_${i+1}`, nbrJoueurInscrit);
  }
}, false);

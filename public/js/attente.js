setTimeout(function(){
  const TEMP = 1; // temps en secondes

  setInterval(function(){
    const req2 = new XMLHttpRequest();
    req2.onreadystatechange = function(event) {
        // XMLHttpRequest.DONE === 4
        if (this.readyState === XMLHttpRequest.DONE) {
          if (this.status === 200) {
            const vague = JSON.parse(this.responseText).vague;
            const jeuEnCours = JSON.parse(this.responseText).jeuEnCours;
            const vagueJoueur = sessionStorage.getItem('vagueJoueur');
            const popName = sessionStorage.getItem('popName');
            // si le joueur appartient à la vague alors charger la manette
            if (Number.parseInt(vague) === Number.parseInt(vagueJoueur) && !jeuEnCours) {
              window.location.assign(`/popcorn?pop_name=${popName}`);
            }
          }
        }
    };
    // recuperer la liste des inscrits par vague
    req2.open('GET', `/get_vague_en_cours`, true);
    req2.send(null);
  }, TEMP * 1000);
  console.log('entrer ici');
}, 50000);

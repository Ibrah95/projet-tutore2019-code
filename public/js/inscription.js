const inputPseudo = document.getElementById('pseudo');
const inputPseudoHelp = document.getElementById('pseudo-help');
const inputsPerso = document.getElementsByName('pop_name');
// const inputPersoHelp = document.getElementById('pop-name-help');

// verifier si le pseudo est disponible pendant le saisis
inputPseudo.addEventListener('input', function(e) {
  const req = new XMLHttpRequest();
  const pseudo = inputPseudo.value;
  req.onreadystatechange = function(event) {
      // XMLHttpRequest.DONE === 4
      if (this.readyState === XMLHttpRequest.DONE) {
          if (this.status === 200) {
              const isPseudoDisponible = !JSON.parse(this.responseText).pseudoNonDispo;
              if (!isPseudoDisponible) {
                inputPseudoHelp.style.display = 'inline';
                inputPseudo.style.borderColor = 'red';
              } else {
                inputPseudoHelp.style.display = 'none';
                inputPseudo.style.borderColor = 'green';
              }
          }
      }
  };
  req.open('GET', `/check_pseudo_disponible?pseudo=${pseudo}`, true);
  req.send(null);
}, false);



// verifier si les persos sont toujours disponible
const persoChecker = setInterval(function(){
  const req2 = new XMLHttpRequest();
  req2.onreadystatechange = function(event) {
      // XMLHttpRequest.DONE === 4
      if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 200) {
          const popcornNonDispos = JSON.parse(this.responseText).popcornNonDispos;
          // cacher les popcorns non dispo de la page
          popcornNonDispos.forEach((popcorn) => {
            const inputPopcorn = document.getElementById(popcorn);
            const labelPopcorn = inputPopcorn.nextElementSibling;
            inputPopcorn.style.display = 'none';
            labelPopcorn.style.display = 'none'
          });
        }
      }
  };
  // recuperer les popcorn non disponibles
  req2.open('GET', `/check_popcorn_disponible`, true);
  req2.send(null);
}, 1000);

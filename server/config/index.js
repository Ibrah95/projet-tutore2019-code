'use strict'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

// CONFIG
let NBR_VAGUE = 2;
let NBR_JOUEUR_PAR_VAGUE = 2;
let subscribedPlayers = []; // les joueurs inscrits sur le jeu
let pseudoJoueurParVague = [];
let vagueCounter = new Array(NBR_VAGUE).fill(0); // compteur pour gerer les vagues
let takenPseudos = {}; // dictionnaire contenant les pseudos déjà pris
let takenPopcorn = {}; // tableau contenant le nombre de fois chaque popcorn a été pris
let vagueCourant = 0; // numero de vague en cours
let jeuEnCours = false;

app.use(express.static(path.join(__dirname, './../../public/')))
app.use('/assets', express.static(path.join(__dirname, './../../public/assets/')))
app.use('/vendor', express.static(path.join(__dirname, './../../vendor')))


app.put('update_time', function(req, res) {
  // mettre à jour le temps du joueur
  const pseudo = req.query.pseudo;
  const time = Number.parseInt(req.query.time);
  console.log(`UPDATE TIME ${pseudo} AVEC ${time}`);
  // chercher le joueur et le mettre à jour
  for (let i = 0; i < subscribedPlayers.length; i++) {
    if (subscribedPlayers[i].pseudo === pseudo) {
      subscribedPlayers[i].time = time;
      break;
    }
  }
  res.json({ retour: true });
});

app.get('/winner', function(req, res) {
  // trouver le joueur avec le meilleurs temps (i.e min du time)
  let keyMin = 0;
  for (let i = 1; i < subscribedPlayers.length; i++) {
    if (subscribedPlayers[i].time < subscribedPlayers[keyMin].time) {
      keyMin = i;
    }
  }
  const { pseudo, popName, time } = subscribedPlayers[keyMin];
  res.render('winner.ejs', { pseudo, popName, time });
});

app.put('/update_jeu_en_cours', function(req, res) {
  const valeur = req.query.valeur
  jeuEnCours = (valeur === 'true');
  console.log(`jeuEnCours = ${jeuEnCours}`);
  res.json({ retour: true });
});

app.get('/attente', function(req, res){
  res.render('attente.ejs');
})

app.get('/', function(req, res) {
    res.render('inscription.ejs');
});

app.get('/home', function(req, res) {
  res.render('accueil.ejs');
})

app.get('/story', function (req, res) {
  res.render('story.ejs');
})

// API POUR RECUPERER LA VAGUE EN COURS
app.get('/get_vague_en_cours', function(req, res) {
    res.json({ vague: vagueCourant, jeuEnCours});
});

app.get('/chargement_vague', function(req, res) {
    const vague = req.query.vague
    jeuEnCours = false;
    res.render('chargement_vague.ejs', { vague });
});

app.put('/update_vague_courant', function(req, res) {
  const vague = req.query.vague
  vagueCourant = (Number.parseInt(vague) > NBR_VAGUE) ? 1 : Number.parseInt(vague); // mettre à jour vague courant
  console.log(`vagueCourant = ${vagueCourant}`);
  res.json({ retour: true });
});

app.get('/ecran_inscrit', function(req, res) {
  const mdp = req.query.mdp
  const nbrVague = Number.parseInt(req.query.nbr_vague);
  const nbrJoueurParVague = Number.parseInt(req.query.nbr_joueur_par_vague);

  // reinitialiser les Config par defaut
  NBR_VAGUE = nbrVague;
  NBR_JOUEUR_PAR_VAGUE = nbrJoueurParVague;
  subscribedPlayers = [];
  vagueCounter = new Array(NBR_VAGUE).fill(0);
  takenPseudos = {};
  takenPopcorn = {};
  pseudoJoueurParVague = [];
  vagueCourant = 0;

  res.render('ecran_inscrit.ejs', { NBR_VAGUE });
});

// API pour récuperer les joueurs inscrit dans chaque vague
app.get('/get_inscrits', function(req, res) {
  res.json({ vagues: pseudoJoueurParVague });
});

app.get('/admin', function(req, res) {
    res.render('admin.ejs', { nbrVague: NBR_VAGUE, nbrJoueurParVague: NBR_JOUEUR_PAR_VAGUE  });
});

app.get('/check_pseudo_disponible', function(req, res) {
    // verifier si le pseudo est tjr dispo
    const pseudo = req.query.pseudo;
    if (takenPseudos[pseudo] === true) {
      res.json({ pseudoNonDispo: true});
    } else {
      res.json({ pseudoNonDispo: false });
    }
});

app.get('/check_popcorn_disponible', function(req, res) {
    const popcornNonDispos = [];
    // recuperer et retourner les popcorn non dispo
    for (const popName in takenPopcorn) {
      const nombreDeFoisPopcornChoisis = takenPopcorn[popName];
      if (nombreDeFoisPopcornChoisis === NBR_VAGUE) {
        popcornNonDispos.push(popName)
      }
    }
    res.json({ popcornNonDispos });
});

app.get('/inscription', function(req, res) {
  // recuperer pseudo et perso
  const pseudo = req.query.pseudo;
  const popName = req.query.pop_name;

  console.log(`vague counter = ${vagueCounter[NBR_VAGUE - 1]} et nbr joueur par vague = ${NBR_JOUEUR_PAR_VAGUE}`);

  // verifier si une place est disponible
  if (vagueCounter[NBR_VAGUE - 1] === NBR_JOUEUR_PAR_VAGUE) {
    // renvoyer vers la page d'avertissement
    res.render('jeu_complet.ejs', { pseudo });
    return;
  }

  // calculer la vague du nouveau joueur
  let vague = 0;
  for (vague = 0; vague < NBR_VAGUE; vague++) {
    if (vagueCounter[vague] < NBR_JOUEUR_PAR_VAGUE) {
      vagueCounter[vague]++;
      break; // sortir de la boucle
    }
  }
  vague++;

  // mettre à jour les infos
  takenPopcorn[popName] = (takenPopcorn[popName] === undefined) ? 1 : takenPopcorn[popName]+= 1;
  takenPseudos[pseudo] = true;

  // enregistrer nouveau joueur
  subscribedPlayers.push({ vague, pseudo, popName, time: 180 });
  if (pseudoJoueurParVague[vague - 1] === undefined) {
    pseudoJoueurParVague[vague - 1] = [];
  }
  pseudoJoueurParVague[vague - 1].push(pseudo);

  console.log(subscribedPlayers);

  // renvoyer la page d'attente
  res.render('joueur.ejs', { vague, pseudo, popName });

});

app.get('/popcorn', function(req, res) {
  let custom_popcorn = 'POP CORN';
  let splited_custom_name = req.query.pop_name.split('_');
  if (splited_custom_name && splited_custom_name.length === 2) {
    custom_popcorn = `${splited_custom_name[0].toUpperCase()} ${splited_custom_name[1].toUpperCase()}`;
  }
  res.render('popcorn.ejs', {custom_popcorn, custom_name: req.query.pop_name});
});

app.get('/popbox', function(req, res) {
    res.render('popbox.ejs', {popbox: 'POP BOX'});
});

app.get('/ecran', function(req, res) {
  res.render('ecran.ejs', {});
});
app.use(cors())

module.exports = app

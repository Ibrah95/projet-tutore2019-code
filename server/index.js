'use strict'
const http = require('http')
const app = require('./config')
const Server = http.Server(app)
const PORT = process.env.PORT || 8080
const io = require('socket.io')(Server)
let tabPosition = new Array(5).fill(0);
let dernier_rang = 0;
let nombre_popcorn = 0;
let nombre_popbox = 0;
let nombre_de_popcorn_capturer = 0;
let nombre_de_popcorn_arriver = 0;

Server.listen(PORT, () => console.log('Game server running on:', PORT))

let players = {}

io.on('connection', socket => {
  // When a player connects
  socket.on('new-player', state => {
    // console.log('New player joined with state:', state)
    const id = String(socket.id)
    players[id] = state
    if (players[id].type === 'popbox') {
      let i = 0;
      // calculer sa position
      while (tabPosition[i] === 2) {
        i++;
      }
      tabPosition[i] += 1;
      io.emit('update-position-player', {id: id, position: i});
    } else {
      // Emit the update-players method in the client side
      io.emit('update-players', players)
      console.log(players);
    }

  })

  socket.on('disconnect', state => {
    const id = String(socket.id)
    // liberer sa position si c un popbox

    if (players[id] && players[id].type === 'popbox') {

      tabPosition[players[id].position]--;
    }
    delete players[id]
    io.emit('update-players', players)

  })

  // when a player is deleted
  socket.on('delete-player', data => {
    // players[data.id].estCapturer = true;
    // nombre_de_popcorn_capturer++;
    // notifier le joueur captuerer
    io.emit('notifier-capture', data.id);
    io.emit('update-players', players)
  })

  // when a popbox caught a popcorn
  socket.on('increment-nombreCapture', data => {

    if (players[data.id] && players[data.id].type === 'popbox') {

      players[data.id].nombreCapture++;

      io.emit('update-players', players)
    }
  })

  // When a player moves
  socket.on('move-player', data => {
    // console.log('move: \n', data)
    const {type, customName, position, nombreCapture, estCapturer, x, y, angle, playerName, speed, pseudo } = data
    const id = String(socket.id)
    if(type=== 'popcorn' && x > 3000 && players[id] !== undefined){
      const rang = ++dernier_rang;
      nombre_de_popcorn_arriver++;
      io.emit('update-time', { pseudo: pseudo })
      io.emit('est-arriver', { id: id, rang: rang })
      delete players[id];
    } else {
      // If the player is invalid, return
      if (players[id] === undefined) {
        return
      }

      // Update the player's data if he moved
      players[id].nombreCapture
      players[id].estCapturer
      players[id].type = type
      players[id].position = position
      players[id].customName = customName
      players[id].x = x
      players[id].y = y
      players[id].angle = angle
      players[id].playerName = {
        name: playerName.name,
        x: playerName.x,
        y: playerName.y
      }
      players[id].speed = {
        value: speed.value,
        x: speed.x,
        y: speed.y
      }

      // Send the data back to the client
      io.emit('update-players', players)
    }
  })

  socket.on('move-player-after-collision', data => {

  })

  // gerer fin timer
  socket.on('temps-ecouler', data => {
    if (data) {
      players = {};
      console.log('temps ecouler');
      console.log(players);
      io.emit('update-players', players);
      io.emit('partie-est-terminer', { retour: true }); // notifier les popcorn
      io.emit('notification-temps-ecouler', {nombre_de_popcorn_arriver, nombre_de_popcorn_capturer});
    }
  })

  // demander counter position
  socket.on('ask-counter-position', data => {
    socket.emit('response-counter-position', tabPosition);
  })

  // GERER COMPTEUR POSITION POPBOX
  socket.on('counter-position', data => {

    if (tabPosition === null) {
      tabPosition = data.tabPosition;
    } else {
      for (let i = 0; i < tabPosition.length; i++) {
        //if (tabPosition[i] < 3)
        tabPosition[i] += data.tabPosition[i];
      }
    }
    socket.emit('counter-position-client', tabPosition);
  })
})

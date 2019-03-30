'use strict'
const http = require('http')
const app = require('./config')
const Server = http.Server(app)
const PORT = process.env.PORT || 8000
const io = require('socket.io')(Server)
let comp1 =0
let tabPosition = new Array(3).fill(0);

Server.listen(PORT, () => console.log('Game server running on:', PORT))

const players = {}

io.on('connection', socket => {
  // When a player connects
  socket.on('new-player', state => {
    // console.log('New player joined with state:', state)
    const id = String(socket.id)
    players[id] = state
    // Emit the update-players method in the client side
    io.emit('update-players', players)

    let i = 0;
    while (tabPosition[i] === 3) {
      i++;
    }
    // calcule sa position 
    // for(let i = 0; i < tabPosition.length; i++) {
    //   if (tabPosition[i] < 3) {
    tabPosition[i] += 1;
    io.emit('update-position-player', {id: id, position: i});
    //   }
    // }
    console.log(`tabPosition = ${tabPosition}`);
  })

  socket.on('disconnect', state => {
    const id = String(socket.id)
    delete players[id]
    io.emit('update-players', players)
  })

  // when a player is deleted
  socket.on('delete-player', data => {
    players[data.id].estCapturer = true;
    io.emit('update-players', players)
  })

  // when a popbox caught a popcorn
  socket.on('increment-nombreCapture', data => {
    console.log('increment-nombre Capture')
    console.log(data.id)
    if (players[data.id] && players[data.id].type === 'popbox') {
      console.log(`players[data.id] = ${players[data.id]}`);
      players[data.id].nombreCapture++;
      console.log(`players[data.id] = ${players[data.id]}`);
      io.emit('update-players', players)
    }
  })

  // When a player moves
  socket.on('move-player', data => {
    // console.log('move: \n', data)
    const {type, nombreCapture, estCapturer, x, y, angle, playerName, speed } = data
    const id = String(socket.id)
    if(type=== 'popcorn' && x > 1780 ){
      console.log(`x = ${x} y=${y}`)
      console.log(` id = ${id}`)
      io.emit('est-arriver', id)
    }
    // If the player is invalid, return
    if (players[id] === undefined) {
      return
    }

    // Update the player's data if he moved
    players[id].nombreCapture
    players[id].estCapturer
    players[id].type = type
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
  })

  socket.on('move-player-after-collision', data => {
    console.log('move after collision\n', data);
  })

  // demander counter position 
  socket.on('ask-counter-position', data => {
    socket.emit('response-counter-position', tabPosition);
  })

  // GERER COMPTEUR POSITION POPBOX
  socket.on('counter-position', data => {
    console.log(`counter position : ${data.tabPosition}`);
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

const newPlayer = (socket, player) => {
  socket.on('connect', () => {
    socket.emit('new-player', {
      estCapturer: player.estCapturer,
      nombreCapture: player.nombreCapture,
      position: player.position,
      speedText: {
        x: player.sprite.body.x - 57,
        y: player.sprite.body.y - 39,
      },
      type: player.type,
      x: player.sprite.body.x,
      y: player.sprite.body.y,
      angle: player.sprite.rotation,
      playerName: {
        name: String(socket.id),
        x: player.playerName.x,
        y: player.playerName.y
      },
      speed: {
        value: player.speed,
        x: player.speed.x,
        y: player.speed.y
      }
    })
  })
}

export default newPlayer

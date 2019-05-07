const playerMovementInterpolation = (otherPlayers, listPopbox, listEnemy, game, socket) => {
  for (let id in otherPlayers) {
    let player = otherPlayers[id]
    if (player.target_x !== undefined) {
      // Interpolate the player's position
      player.sprite.body.x += (player.target_x - player.sprite.body.x) * 0.30
      player.sprite.body.y += (player.target_y - player.sprite.body.y) * 0.30

      let angle = player.target_rotation
      let direction = (angle - player.sprite.body.rotation) / (Math.PI * 2)
      direction -= Math.round(direction)
      direction *= Math.PI * 2
      player.sprite.body.rotation += direction * 0.30

      // Interpolate the player's name position
      player.playerName.x += (player.playerName.target_x - player.playerName.x) * 0.30
      player.playerName.y += (player.playerName.target_y - player.playerName.y) * 0.30

      // Interpolate the player's speed text position
      player.speedText.x += (player.speedText.target_x - player.speedText.x) * 0.30
      player.speedText.y += (player.speedText.target_y - player.speedText.y) * 0.30
      player.updatePlayerStatusText(player.playerName.x, player.playerName.y + 60, player.speedText)

      // gerer collision avec les popbox IA
      for (let popboxIA in listPopbox) {
        game.physics.arcade.collide(player.sprite, listPopbox[popboxIA], function(player1, player2) {
          //if (player.type === 'popcorn') {
            player.sprite.destroy()
            player.playerName.destroy()
            player.speedText.destroy()
            // ask the server to delete the popcorn that collided with a popbox
            player.emitPlayerDeletion(socket);
            delete otherPlayers[id];
            console.log('collision');
          //}
          player.emitNombreCapture(socket);
        });
      }
      // gerer collision avec les enemies
      for (let enemyIA in listEnemy) {
        game.physics.arcade.collide(player.sprite, listEnemy[enemyIA], function(player1, player2) {
          //if (player.type === 'popcorn') {
            player.sprite.destroy()
            player.playerName.destroy()
            player.speedText.destroy()
            // ask the server to delete the popcorn that collided with a popbox
            player.emitPlayerDeletion(socket);
            delete otherPlayers[id];
            console.log('collision');
          //}
          player.emitNombreCapture(socket);
        });
      }

      // collide each otherPlayer
      for (let subId in otherPlayers) {
        game.physics.arcade.collide(player.sprite, otherPlayers[subId].sprite, function(player1, player2) {});
      }
    }
  }
}


export default playerMovementInterpolation

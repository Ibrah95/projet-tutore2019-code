!function(e){function t(a){if(r[a])return r[a].exports;var i=r[a]={i:a,l:!1,exports:{}};return e[a].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var r={};t.m=e,t.c=r,t.d=function(e,r,a){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=3)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.WINDOW_WIDTH=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,t.WINDOW_HEIGHT=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,t.WORLD_SIZE={width:1024,height:900},t.ASSETS_URL="../assets"},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.isDown=function(e,t){return e.input.keyboard.isDown(t)},t.createText=function(e,t){return e.add.text(t.x,t.y,"",{fontSize:"12px",fill:"#FFF",align:"center"})}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r,a,o){return{socket:o,type:e,sprite:(0,i.default)(e,t,r,a),playerName:null,speed:0,speedText:null,drive:function(e){0!==this.speed&&this.emitPlayerData(),this.sprite.body.velocity.x=0,this.sprite.body.velocity.y=0,this.sprite.body.angularVelocity=0,e.input.mousePointer.isDown&&e.input.activePointer.x!==this.sprite.body.x&&e.input.activePointer.y!==this.sprite.body.y?(this.speed=1500,this.sprite.body.rotation=e.physics.arcade.moveToPointer(this.sprite,this.speed,e.input.activePointer,0)):this.speed=0,e.physics.arcade.collide(this),e.world.bringToTop(this.sprite),this.updatePlayerName(),this.updatePlayerStatusText("speed",this.sprite.body.x-57,this.sprite.body.y-39,this.speedText)},emitPlayerData:function(){o.emit("move-player",{type:this.type,x:this.sprite.body.x,y:this.sprite.body.y,angle:this.sprite.body.rotation,playerName:{name:this.playerName.text,x:this.playerName.x,y:this.playerName.y},speed:{value:this.speed,x:this.speedText.x,y:this.speedText.y}})},updatePlayerName:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.socket.id,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.sprite.body.x-57,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.sprite.body.y-59;this.playerName.text=String(e),this.playerName.x=t,this.playerName.y=r,a.world.bringToTop(this.playerName)},updatePlayerStatusText:function(e,t,r,i){var o=e[0].toUpperCase()+e.substring(1);this[e]<0?this.newText=0:this.newText=this[e],i.x=t,i.y=r,i.text=o+": "+parseInt(this.newText),a.world.bringToTop(i)}}};var a=r(7),i=function(e){return e&&e.__esModule?e:{default:e}}(a);r(1)},function(e,t,r){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var n=r(0),s=r(4),u=function(e){return e&&e.__esModule?e:{default:e}}(s),p=function(e){function t(){a(this,t);var e=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,n.WINDOW_WIDTH,n.WINDOW_HEIGHT,Phaser.AUTO));return e.state.add("Game",u.default),e.state.start("Game"),e}return o(t,e),t}(Phaser.Game);new p},function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function n(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),u=r(0),p=(r(1),r(5)),l=a(p),c=r(6),d=a(c),y=r(2),f=(a(y),r(8)),h=a(f),b=r(9),x=a(b),_=null,m={},g=function(e){function t(){i(this,t);var e=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.player={},e}return n(t,e),s(t,[{key:"preload",value:function(){(0,l.default)(this.game)}},{key:"create",value:function(){var e=u.WORLD_SIZE.width,t=u.WORLD_SIZE.height;(0,d.default)(this.game),_=io("localhost:8000/"),(0,h.default)(_,m,this.game),this.game.camera.x=e/2,this.game.camera.y=t/2,this.game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL}},{key:"update",value:function(){(0,x.default)(m)}}]),t}(Phaser.State);t.default=g},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(0),i=function(e){e.load.crossOrigin="Anonymous",e.stage.backgroundColor="#1E1E1E",e.load.image("asphalt",a.ASSETS_URL+"/sprites/asphalt/bg_ecran.jpg"),e.load.image("popcorn",a.ASSETS_URL+"/sprites/car/car.png"),e.load.image("popbox",a.ASSETS_URL+"/sprites/car/popbox.png")};t.default=i},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(0),i=a.WORLD_SIZE.width,o=a.WORLD_SIZE.height,n=function(e){e.physics.startSystem(Phaser.Physics.P2JS),e.stage.disableVisibilityChange=!0,e.world.setBounds(0,0,i,o),s(e)},s=function(e){var t=[],r=e.add.sprite(0,0,"asphalt");r.width=1920,r.height=1080,t.push(r)};t.default=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(e,t,r,a){console.log(e);var i=a.add.sprite(t,r,e);return a.physics.enable(i,Phaser.Physics.ARCADE),a.physics.startSystem(Phaser.Physics.ARCADE),i.anchor.setTo(.5,.5),"popcorn"===e?(i.width=50,i.height=50):(i.width=100,i.height=175),i.body.allowRotation=!1,i};t.default=a},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(2),i=function(e){return e&&e.__esModule?e:{default:e}}(a),o=r(1),n=function(e,t,r){e.on("update-players",function(a){var n={};for(var s in a){var u=a[s];if(void 0===t[s]&&s!==e.id){console.log(u.type);var p=(0,i.default)(u.type,u.x,u.y,r);p.playerName=(0,o.createText)(r,p),p.speedText=(0,o.createText)(r,p),p.updatePlayerName(u.playerName.name,u.playerName.x,u.playerName.y),t[s]=p}n[s]=!0,s!==e.id&&(t[s].target_x=u.x,t[s].target_y=u.y,t[s].target_rotation=u.angle,t[s].playerName.target_x=u.playerName.x,t[s].playerName.target_y=u.playerName.y,t[s].speedText.target_x=u.speed.x,t[s].speedText.target_y=u.speed.y,t[s].speed=u.speed.value)}for(var l in t)n[l]||(t[l].sprite.destroy(),t[l].playerName.destroy(),t[l].speedText.destroy(),delete t[l])})};t.default=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(e){for(var t in e){var r=e[t];if(void 0!==r.target_x){r.sprite.body.x+=.3*(r.target_x-r.sprite.body.x),r.sprite.body.y+=.3*(r.target_y-r.sprite.body.y);var a=r.target_rotation,i=(a-r.sprite.body.rotation)/(2*Math.PI);i-=Math.round(i),i*=2*Math.PI,r.sprite.body.rotation+=.3*i,r.playerName.x+=.3*(r.playerName.target_x-r.playerName.x),r.playerName.y+=.3*(r.playerName.target_y-r.playerName.y),r.speedText.x+=.3*(r.speedText.target_x-r.speedText.x),r.speedText.y+=.3*(r.speedText.target_y-r.speedText.y),r.updatePlayerStatusText("speed",r.speedText.x,r.speedText.y,r.speedText)}}};t.default=a}]);
window.onload = function () {
  'use strict';

  var game, ns = window['drift-runners'];

  game = new Phaser.Game(960, 540, Phaser.AUTO, 'drift-runners-game');
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  game.state.add('menu', ns.Menu);
  game.state.add('lobby', ns.Lobby);
  game.state.add('room', ns.Room);
  game.state.add('game', ns.Game);
  game.state.add('control', ns.Control);
  game.state.add('result', ns.Result);
  /* yo phaser:state new-state-files-put-here */

  game.state.start('boot');
};

(function () {
  'use strict';

  function Boot() {}

  Boot.prototype = {

    preload: function () {
      this.load.image('preloader', 'assets/preloader.gif');
    },

    create: function () {
      this.game.input.maxPointers = 2;

      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.maxWidth = 1280;
      this.game.scale.maxHeight = 720;
      this.game.scale.forceOrientation(true);
      this.game.scale.pageAlignHorizontally = true;
      this.game.scale.setScreenSize(true);

      this.game.state.start('preloader');
    }
  };

  window['drift-runners'] = window['drift-runners'] || {};
  window['drift-runners'].Boot = Boot;

}());


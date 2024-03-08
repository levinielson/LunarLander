MyGame.render.Background = function(graphics, imageSrc) {
  'use strict';

  let image = new Image();
  let isReady = false;

  image.onload = function() {
    isReady = true;
  }

  image.src = imageSrc;

  function render() {
    if (isReady) {
      graphics.drawBackground(image);
    }
  }

  let api = {
    render: render
  }

  return api;
}
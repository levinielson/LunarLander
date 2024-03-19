MyGame.render.ship = function(system, graphics, imageSrc) {

  let image = new Image();
  let isReady = false;

  image.onload = function() {
    isReady = true;
  }

  image.src = imageSrc;

  function render() {
    if (isReady) {
      graphics.drawTexture(
        image,
        { x: system.ship.center.x * graphics.width / 100, y: system.ship.center.y * graphics.height / 100 },
        system.ship.rotation,
        { x: system.ship.size * graphics.width / 100, y: system.ship.size * graphics.height / 100 });
    }
  }

  let api = {
    render: render
  }

  return api;
}
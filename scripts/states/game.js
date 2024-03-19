MyGame.states.game = function(graphics) {  
  let terrain = MyGame.systems.terrain();
  terrain.initialize();

  let terrainRenderer = MyGame.render.terrain(terrain, graphics);

  let ship = MyGame.systems.ship(
    {
      center: {x: 20, y: 20},
      rotation: 0,
      speed: {x: 0, y: 0},
      fuel: 100,
      size: 5,
      rotationRate: 0.01,
      thrustRate: 0.001
    }
  );
  console.log(ship.ship)
  let shipRenderer = MyGame.render.ship(ship, graphics, './assets/ship.png');

  function render() {
    terrainRenderer.render();
    shipRenderer.render();
  }

  function update() {
    
  }

  let api = {
    render: render,
    update: update,
    pauseGame: false
  };

  return api;
}
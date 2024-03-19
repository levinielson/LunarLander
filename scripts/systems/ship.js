MyGame.systems.ship = function(spec) {

  let ship = {
    center: spec.center,
    rotation: spec.rotation,
    speed: {x: 0, y: 0},
    fuel: spec.fuel,
    size: spec.size,
    rotationRate: spec.rotationRate,
    thrustRate: spec.thrustRate
  }

  function update(elapsedTime) {

  }

  return {
    get ship() { return ship; }
  }
}
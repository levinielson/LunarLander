MyGame.systems.ship = function(spec, thrustParticles) {

  let ship = {
    center: {x: spec.center.x, y: spec.center.y},
    rotation: spec.rotation,
    speed: {x: 0, y: 0},
    fuel: spec.fuel,
    size: spec.size,
    rotationRate: spec.rotationRate,
    thrustRate: spec.thrustRate,
    fuelDepletionRate: spec.fuelDepletionRate
  }

  function resetShip() {
    ship = {
      center: {x: spec.center.x, y: spec.center.y},
      rotation: spec.rotation,
      speed: {x: 0, y: 0},
      fuel: spec.fuel,
      size: spec.size,
      rotationRate: spec.rotationRate,
      thrustRate: spec.thrustRate,
      fuelDepletionRate: spec.fuelDepletionRate
    }
  }

  function thrust(elapsedTime) {
    if (elapsedTime === -1) {
      MyGame.sounds.thrust.pause();
      return;
    }
    if (ship.fuel > 0) {
      ship.speed.x += Math.sin(ship.rotation) * ship.thrustRate * elapsedTime * 0.3;
      ship.speed.y -= Math.cos(ship.rotation) * ship.thrustRate * elapsedTime;
  
      ship.fuel -= ship.fuelDepletionRate * elapsedTime;

      thrustParticles.shipThrust();

      MyGame.sounds.thrust.play();
    }
  }

  function rotateLeft(elapsedTime) {
    if (elapsedTime == -1) return;
    ship.rotation -= ship.rotationRate * elapsedTime;
  }

  function rotateRight(elapsedTime) {
    if (elapsedTime == -1) return;
    ship.rotation += ship.rotationRate * elapsedTime;
  }

  return {
    thrust: thrust,
    rotateLeft: rotateLeft,
    rotateRight: rotateRight,
    resetShip: resetShip,
    get ship() { return ship; }
  }
}
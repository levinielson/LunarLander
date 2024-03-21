MyGame.states.game = function(graphics) {  
  let terrain = MyGame.systems.terrain();
  terrain.initialize();

  let terrainRenderer = MyGame.render.terrain(terrain, graphics);

  let speedConversion = 500;
  let gravity = 0.000005;
  let ship = MyGame.ship;
  ship.resetShip();
  let collision = false;
  let safeLanding = false;
  let pauseGame = false;
  let shipRenderer = MyGame.render.ship(ship, graphics, './assets/ship.png');
  let thrustRenderer = MyGame.render.ParticleSystem(
    MyGame.thrustParticlesSystem,
    graphics,
    'assets/smoke-2.png'
  );
  let explosionRenderer = MyGame.render.ParticleSystem(
    MyGame.explosionParticleSystem,
    graphics,
    'assets/fire.png'
  );
  let isShipRotationSafe = true;
  let isShipSpeedSafe = true;
  let rotationDeg = 0;
  let shipSpeed = 0;
  let countdown = 3000.0;
  let score = 0;
  let levelReset = false;
  let level = 1;

  function render() {
    terrainRenderer.render();
    if (collision && safeLanding && level === 2) {
      if (countdown > 2500) {
        MyGame.sounds.complete.play();
      }
      graphics.drawText(`Next level in ${Math.ceil(countdown / 1000)}`, "white", "30", {x: 40, y: 45});
    }
    else if (collision && !safeLanding) {
      MyGame.sounds.explosion.play();
      graphics.drawText(`Trying again in ${Math.ceil(countdown / 1000)}`, "white", "30", {x: 40, y: 45});
    }
    else if (collision && safeLanding && level === 3) {
      if (countdown > 2500) {
        MyGame.sounds.complete.play();
      }
      graphics.drawText(`Houston, we don't have a problem. Nice landing`, "white", "30", {x: 15, y: 45})
    }
    shipRenderer.render();
    thrustRenderer.render();
    explosionRenderer.render();
    if (ship.ship.fuel > 0) {
      graphics.drawText(`Fuel: ${Math.round(ship.ship.fuel * 100) / 100}`, "#44ff44", "20", {x: 80, y: 10});
    }
    else {
      graphics.drawText(`Fuel: 0`, "white", "20", {x: 80, y:10});
    }

    if (isShipRotationSafe) {
      graphics.drawText(`Rotation: ${rotationDeg} \u00B0`, "#44ff44", "20", {x: 80, y:13});
    }
    else {
      graphics.drawText(`Rotation: ${rotationDeg} \u00B0`, "white", "20", {x: 80, y:13});
    }
    
    if (isShipSpeedSafe) {
      graphics.drawText(`Speed: ${shipSpeed} m/s`, "#44ff44", "20", {x: 80, y:16});
    }
    else {
      graphics.drawText(`Speed: ${shipSpeed} m/s`, "white", "20", {x: 80, y: 16});
    }
  }
  
  function update(elapsedTime) {
    MyGame.thrustParticlesSystem.update(elapsedTime);

    shipSpeed = Math.sqrt(ship.ship.speed.x ** 2 + ship.ship.speed.y ** 2) * speedConversion;
    shipSpeed = Math.round(shipSpeed * 1000) / 1000;
    isShipSpeedSafe = shipSpeed <= 2; 

    rotationDeg = (ship.ship.rotation / Math.PI * 180) % 360;
    rotationDeg = rotationDeg < 0 ? rotationDeg + 360 : rotationDeg;
    rotationDeg = Math.round(rotationDeg * 100) / 100;
    isShipRotationSafe = rotationDeg <= 5 || rotationDeg >= 355;

    if (!collision) {
      testCollision();
      ship.ship.center.x += ship.ship.speed.x * elapsedTime;
      ship.ship.center.y += ship.ship.speed.y * elapsedTime;
  
      ship.ship.speed.y += elapsedTime * gravity;
    }
    if (collision) {
      pauseGame = true;
      countdown -= elapsedTime;
      let safeZones = terrain.safeZones;
      let circle = {
        center: {
          x: ship.ship.center.x,
          y: ship.ship.center.y
        },
        radius: ship.ship.size * .6
      };
      MyGame.explosionParticleSystem.update(elapsedTime);
      for (let i = 0; i < safeZones.length; i = i+2) {
        if (lineCircleIntersection(safeZones[i], safeZones[i+1], circle)) {
          safeLanding = isShipRotationSafe && isShipSpeedSafe;
        }
      }
      if (!safeLanding && countdown > 2800) {
        for (let i = 0; i < 50; i++) {
          MyGame.explosionParticleSystem.shipCrash();
        }
      }
      else if (!safeLanding && countdown < 2000) {
        MyGame.explosionParticleSystem.resetShip();
      }
      if (safeLanding && !levelReset && level === 1) {
        ship.resetShip();
        terrain.levelTwo();
        levelReset = true;
        level++;
        score += calculateScore(shipSpeed);
      }
      else if (!safeLanding && !levelReset) {
        ship.resetShip();
        terrain.initialize();
        levelReset = true;
        level = 1;
        score = 0;
      }
      if (safeLanding && !levelReset && level === 2) {
        score += calculateScore(shipSpeed);
        levelReset = true;
        level++;
        MyGame.persistence.addScore(score);
      }
      if (countdown <= 0 && level !== 3) {
        collision = false;
        safeLanding = false;
        isShipRotationSafe = true;
        isShipSpeedSafe = true;
        pauseGame = false;
        countdown = 3000;
        levelReset = false;
      }
    }
  }

  function calculateScore(shipSpeed) {
    return ship.ship.fuel * 10 + Math.abs((Math.abs(ship.ship.rotation)  * 180 / Math.PI) - 5) * 20 + Math.abs(shipSpeed - 2) * 50;
  }

  function lineCircleIntersection(pt1, pt2, circle) {
    let v1 = { x: pt2.x - pt1.x, y: pt2.y - pt1.y };
    let v2 = { x: pt1.x - circle.center.x, y: pt1.y - circle.center.y };
    let b = -2 * (v1.x * v2.x + v1.y * v2.y);
    let c =  2 * (v1.x * v1.x + v1.y * v1.y);
    let d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - circle.radius * circle.radius));
    if (isNaN(d)) { // no intercept
        return false;
    }
    // These represent the unit distance of point one and two on the line
    let u1 = (b - d) / c;  
    let u2 = (b + d) / c;
    if (u1 <= 1 && u1 >= 0) {  // If point on the line segment
        return true;
    }
    if (u2 <= 1 && u2 >= 0) {  // If point on the line segment
        return true;
    }
    return false;
}

  function testCollision() {
    let circle = {
      center: {
        x: ship.ship.center.x,
        y: ship.ship.center.y
      },
      radius: ship.ship.size * .6
    }
    let terr = terrain.terrain;
    for (let i = 0; i < terr.length - 2; i++) {
      if (lineCircleIntersection(terr[i], terr[i + 1], circle)) {
        collision = true;
      }
    }
  }

  function destroy() {

  }

  let api = {
    render: render,
    update: update,
    destroy: destroy,
    get pauseGame() { return pauseGame; }
  };

  return api;
}
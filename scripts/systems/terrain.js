MyGame.systems.terrain = function() {
  let terrain = [];
  let safeZone = [];
  
  //-------------------------------------------------------
  //
  // Initializes the terrain. The x and y values correspond
  //    to percentages of the canvas
  //
  //---------------------------------------------------------
  function initialize() {
    startX = Random.nextRange(15, 50);
    safeZone2 = Random.nextRange(50, 85);
    startY = Random.nextRange(40, 85);

    terrain = [];
    safeZone = [];
    terrain.push(
      {
        x: 0,
        y: startY
      }
    );
    // safezone start
    terrain.push(
      {
        x: startX,
        y: startY,
        safeZone: true
      }
    );
    safeZone.push(
      {
        x: startX,
        y: startY,
        safeZone: true
      }
    );

    // safezone end
    terrain.push(
      {
        x: startX + 10,
        y: startY,
        safeZone: true
      }
    );
    safeZone.push(
      {
        x: startX + 10,
        y: startY,
        safeZone: true
      }
    );

    // second safezone start
    terrain.push(
      {
        x: safeZone2,
        y: startY,
        safeZone: true
      }
    );
    safeZone.push(
      {
        x: safeZone2,
        y: startY,
        safeZone: true
      }
    );

    //second safezone end
    terrain.push(
      {
        x: safeZone2 + 10,
        y: startY,
        safeZone: true
      }
    );
    safeZone.push(
      {
        x: safeZone2 + 10,
        y: startY,
        safeZone: true
      }
    );
    terrain.push(
      {
        x: 100,
        y: startY,
      }
    );
    let distance = midpointDisplacement(1, 0, 1);
    midpointDisplacement(1, distance + 2, distance + 3);
    midpointDisplacement(1, terrain.length - 2, terrain.length - 1);
    console.log(terrain)
  }

  function midpointDisplacement(minWidth, leftPosition, rightPosition) {
    if (rightPosition != terrain.length && (terrain[rightPosition].x - terrain[leftPosition].x) < minWidth) {
      return 0;
    }
    if (leftPosition == 0) {
      terrain.splice(leftPosition + 1, 0, {x: terrain[leftPosition].x, y:terrain[leftPosition].y});
    }
    else {
      terrain.splice(leftPosition, 0, {x: terrain[leftPosition].x, y: terrain[leftPosition].y});
    }
    terrain[rightPosition].x = (terrain[rightPosition + 1].x + terrain[leftPosition].x) / 2;    
    let distance = terrain[rightPosition + 1].x - terrain[leftPosition].x;
    let r = 0.8 * Random.nextGaussian(0, 1) * Math.abs(distance);
    terrain[rightPosition].y = 0.5 * (terrain[leftPosition].y + terrain[rightPosition + 1].y) + r;
    terrain[rightPosition].y = terrain[rightPosition].y > 98 ? 98 : terrain[rightPosition].y;
    terrain[rightPosition].y = terrain[rightPosition].y < 25 ? 25 : terrain[rightPosition].y;
    lengthAdded = midpointDisplacement(minWidth, leftPosition, rightPosition);
    lengthAdded += midpointDisplacement(minWidth, rightPosition + lengthAdded, rightPosition + lengthAdded + 1);
    return lengthAdded + 1;
  }

  function levelTwo() {
    terrain = [];
    safeZone = [];

    startX = Random.nextRange(15, 85);
    startY = Random.nextRange(40, 85);
    terrain.push(
      {
        x: 0,
        y: startY
      }
    );
    // safezone start
    terrain.push(
      {
        x: startX,
        y: startY,
        safeZone: true
      }
    );
    safeZone.push(
      {
        x: startX,
        y: startY,
        safeZone: true
      }
    );

    // safezone end
    terrain.push(
      {
        x: startX + 10,
        y: startY,
        safeZone: true
      }
    );
    safeZone.push(
      {
        x: startX + 10,
        y: startY,
        safeZone: true
      }
    );

    terrain.push(
      {
        x: 100,
        y: startY,
      }
    );
    midpointDisplacement(1, 0, 1);
    midpointDisplacement(1, terrain.length - 2, terrain.length - 1);
  }

  return {
    initialize: initialize,
    levelTwo: levelTwo,
    get terrain() { return terrain; },
    get safeZones() { return safeZone; }
  }
}
//------------------------------------------------------------------
//
// This provides the "game" code.
//
//------------------------------------------------------------------
MyGame.main = (function (systems, renderer, graphics, states) {
    'use strict';

    console.log('game initializing...');

    let lastTimeStamp = performance.now();
    //
    // Define a sample particle system to demonstrate its capabilities
    let particlesFire = systems.ParticleSystem({
            center: { x: 300, y: 300 },
            size: { mean: 10, stdev: 4 },
            speed: { mean: 50, stdev: 25 },
            lifetime: { mean: 4, stdev: 1 }
        },
        graphics);
    let particlesSmoke = systems.ParticleSystem({
            center: { x: 300, y: 300 },
            size: { mean: 10, stdev: 4 },
            speed: { mean: 50, stdev: 25 },
            lifetime: { mean: 4, stdev: 1 }
        },
        graphics);
        
    let renderFire = renderer.ParticleSystem(particlesFire, graphics, 'assets/fire.png');
    let renderSmoke = renderer.ParticleSystem(particlesSmoke, graphics, 'assets/smoke-2.png');
    let background = renderer.Background(graphics, 'assets/nebula.jpg');
    
    MyGame.sounds = {};
    MyGame.sounds.explosion = new Audio("assets/explosion.mp3");
    MyGame.sounds.thrust = new Audio("assets/thrust.mp3");
    MyGame.sounds.complete = new Audio("assets/levelComplete.mp3");
    MyGame.thrustParticlesSystem = MyGame.systems.ThrustParticles(
        {
          center: { x: 300, y: 300 },
          size: { mean: 10, stdev: 4 },
          speed: { mean: 15, stdev: 7.5 },
          lifetime: { mean: 2, stdev: 1 }
        }
      );

    MyGame.explosionParticleSystem = MyGame.systems.ExplosionParticles(
        {
            center: { x: 300, y: 300 },
            size: { mean: 10, stdev: 4 },
            speed: { mean: 15, stdev: 7.5 },
            lifetime: { mean: .5, stdev: .125 }
        }
    )

    MyGame.ship = MyGame.systems.ship(
        {
          center: {x: 20, y: 20},
          rotation: 0,
          speed: {x: 0, y: 0},
          fuel: 150,
          size: 4,
          rotationRate: 0.0015,
          thrustRate: 0.000014,
          fuelDepletionRate: 0.015
        },
        MyGame.thrustParticlesSystem
      );


    MyGame.state = states.main(graphics);
    
    //----------------------------------------------------------------
    //
    // Process input from the user
    //
    //----------------------------------------------------------------
    function processInput(elapsedTime) {
        if (!MyGame.state.pauseGame) {
            MyGame.keyboard.update(elapsedTime);
        }
    }
    
    //------------------------------------------------------------------
    //
    // Update the game state
    //
    //------------------------------------------------------------------
    function update(elapsedTime) {
        MyGame.state.update(elapsedTime);
    }

    //------------------------------------------------------------------
    //
    // Render the game state
    //
    //------------------------------------------------------------------
    function render() {
        graphics.clear();

        background.render();
        MyGame.state.render();
    }

    //------------------------------------------------------------------
    //
    // This is the Game Loop function!
    //
    //------------------------------------------------------------------
    function gameLoop(time) {
        let elapsedTime = (time - lastTimeStamp);

        processInput(elapsedTime);
        update(elapsedTime);
        lastTimeStamp = time;

        render();

        requestAnimationFrame(gameLoop);
    };

    MyGame.keyboard = MyGame.input.Keyboard();
    MyGame.persistence.initialize();
    MyGame.keyboard.registerCommand(MyGame.persistence.keys["Rotate Left"], "Rotate Left", MyGame.ship.rotateLeft);
    MyGame.keyboard.registerCommand(MyGame.persistence.keys["Rotate Right"], "Rotate Right", MyGame.ship.rotateRight);
    MyGame.keyboard.registerCommand(MyGame.persistence.keys["Thrusters"], "Thrusters", MyGame.ship.thrust);
    MyGame.keyboard.registerCommand("Escape", "Escape", () => { 
        MyGame.state.destroy();
        MyGame.state = MyGame.states.main(graphics);
    });
    requestAnimationFrame(gameLoop);

}(MyGame.systems, MyGame.render, MyGame.graphics, MyGame.states));

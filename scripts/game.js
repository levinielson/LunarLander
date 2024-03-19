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

    MyGame.state = states.main(graphics);
    //------------------------------------------------------------------
    //
    // Update the game state
    //
    //------------------------------------------------------------------
    function update(elapsedTime) {
        if (!MyGame.state.pauseGame) {

        }
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

        update(elapsedTime);
        lastTimeStamp = time;

        render();

        requestAnimationFrame(gameLoop);
    };

    MyGame.keyboard = MyGame.input.Keyboard();
    MyGame.keyboard.registerCommand("ArrowLeft", "Rotate Left", MyGame.movements.rotateLeft);
    MyGame.keyboard.registerCommand("ArrowRight", "Rotate Right", MyGame.movements.rotateRight);
    MyGame.keyboard.registerCommand("ArrowUp", "Thrusters", MyGame.movements.thrust);
    requestAnimationFrame(gameLoop);

}(MyGame.systems, MyGame.render, MyGame.graphics, MyGame.states));
